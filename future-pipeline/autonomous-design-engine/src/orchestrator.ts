/**
 * ADE — Orchestrator
 *
 * runLoop(): the spec 05 §2 loop (Phase 0).
 * runSectionLoop(): extended loop with brand/PDS/ctxShots (Phase 1).
 * runSiteLoop(): multi-section sequencing + crystallization + QA (Phase 1).
 * generate → render → screenshot → critique → edit, bounded.
 * Budget enforcement, best-so-far retention, terminal state guarantee.
 *
 * @module orchestrator
 */

import { mkdirSync, existsSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { randomUUID } from 'crypto';
import type { Config } from './config.js';
import type { Brief, BrandData, InputBundle, RunRecord, RunResult, TerminalState, DimensionScores, CandidateScore, BrandFoundation, ProjectDesignSystem, SectionOutput, Artifact, LibraryEntry, Plan, RenderResult, ReferenceRef } from './schema.js';
import { screenReferenceInjection } from './refs.js';
import { getProviderForRole, type ModelProvider } from './model.js';
import { generate, GeneratorError } from './generator.js';
import { render, copyAssetsToHarness, cleanup } from './eyes.js';
import { briefComprehensionGate, inputGate, renderHealthGate, hardConstraintGate, tokenAllowlistGate } from './guardrails.js';
import { critique } from './critic.js';
import { appendIteration, writeRunConfig } from './trace.js';
import { serializeFeedback } from './prompts.js';
import { getEmbeddingProvider } from './embeddings.js';
import { crystallize } from './crystallizer.js';
import { libraryFilePath, retrieveLibraryForBrief, snapshotLibraryVersionForRun, writeLibrary, deriveClientIdSlug, type AblationArm } from './library.js';
import { proposeAdversarialCase } from './benchmark.js';
import { emitEscalation, listEscalations } from './escalations.js';
import { readBrand, readPDS, readArtifact, writeArtifact, writeArtifactQA, getSectionRunDir } from './store.js';
import { runWholeArtifactQA, offendingSections } from './qa.js';
import { detectPlateau, getAdaptiveK, selectBestCandidate } from './searchDynamics.js';
import { TIER_A_SECTIONS } from './reviewRouting.js';
import { budgetFromConfig, checkCostBudget, formatCostSummary, summarizeRunResults, validateProductionReadiness } from './production.js';

/**
 * Run the full generate→render→screenshot→critique→edit loop.
 *
 * Exit codes:
 *   0 = APPROVED
 *   2 = ESCALATED (budget exhausted, best-so-far emitted)
 *   3 = ABORTED (unrepairable)
 *   1 = ERROR
 */
export async function runLoop(cfg: Config & { control_mode?: boolean }, brief: Brief, brandData: BrandData | undefined, plan: Plan | undefined, outDir: string, briefPath: string, brand?: BrandFoundation, pds?: ProjectDesignSystem, ctxShots?: { sectionName: string; breakpoint: string; path: string }[], refs?: ReferenceRef[], libraryArm: AblationArm = 'text-Library'): Promise<RunResult> {
  const runId = randomUUID().slice(0, 8);
  // A frozen brand's client_id is the canonical slug when one exists;
  // otherwise derive the SAME way Library retrieval does (library.ts's
  // deriveClientIdSlug) so sectionId and Library client-scoping never drift
  // apart into two different ideas of "this client's id."
  const clientId = brand?.client_id ?? deriveClientIdSlug(brief.client);
  const sectionId = `${clientId}_${brief.section.name}`;
  const startTime = Date.now();
  const modelCalls = { current: 0, max: cfg.maxModelCalls };
  let totalTokens = { input: 0, output: 0 };

  // Ensure output directory
  mkdirSync(outDir, { recursive: true });

  // Write run config
  writeRunConfig(outDir, {
    runId,
    brief: briefPath,
    brandData: brandData ? true : false,
    plan: plan ? 'plan.json' : undefined,
    section: brief.section.name,
    config: {
      provider: cfg.provider,
      modelId: cfg.modelId,
      control_mode: cfg.control_mode,
      maxIters: cfg.maxIters,
      variations: cfg.variations,
      threshold: cfg.threshold,
      breakpoints: cfg.breakpoints,
    },
    startedAt: new Date().toISOString(),
  });

  // C0.15/M5: persist the strategy-capture plan when supplied (passive —
  // no behavior change; a corpus for a future strategy layer to train
  // against). Referenced in config.json above so the trace can find it.
  if (plan) {
    writeFileSync(join(outDir, 'plan.json'), JSON.stringify(plan, null, 2));
  }

  // ── Input Gate ───────────────────────────────────────────────────
  console.log('\n🔍 Running input gate...');
  const inputResult = inputGate(brief, brandData, briefPath);
  if (!inputResult.pass) {
    console.error('❌ Input gate failed:');
    for (const v of inputResult.violations) {
      console.error(`  • [${v.severity}] ${v.message}`);
    }
    return makeResult('ABORTED', outDir, 0, totalTokens, startTime);
  }
  console.log('✅ Input gate passed.');

  // ── Provider + brief comprehension preflight ────────────────────
  // Three role-scoped providers (never one shared instance — plan §1:
  // "keep criticModelId/genModelId distinct even if initially equal").
  console.log(`\n🤖 Initializing ${cfg.provider} provider — gen=${cfg.genModelId} critic=${cfg.criticModelId} orch=${cfg.orchestratorModelId}...`);
  const genProvider = await getProviderForRole(cfg, 'generator');
  const criticProvider = await getProviderForRole(cfg, 'critic');
  const orchProvider = await getProviderForRole(cfg, 'orchestrator');

  // E1.2 resume check: if a prior invocation on this SAME outDir parked on a
  // comprehension escalation that has since been answered, skip re-running
  // the gate (which could re-fail identically on the same brief) and resume
  // with the human's answer folded in as an additional fact. Without this,
  // `answerEscalation()` updates the JSONL record but nothing ever reads it
  // back — the "park-and-rerun" contract was answer-only, never resume.
  const priorEscalations = listEscalations(outDir);
  const resolvedComprehension = priorEscalations.find((e) => e.type === 'comprehension' && e.sectionId === brief.section.name && e.status === 'resolved' && e.answer);

  let comprehensionAnswerNote: string | undefined;
  if (resolvedComprehension) {
    console.log(`\n🧭 Resuming from resolved comprehension escalation (${resolvedComprehension.id}): "${resolvedComprehension.answer}"`);
    comprehensionAnswerNote = resolvedComprehension.answer;
  } else {
    console.log('\n🧭 Running brief comprehension gate...');
    const comprehensionResult = await briefComprehensionGate(orchProvider, brief, modelCalls);
    totalTokens.input += comprehensionResult.usage.input;
    totalTokens.output += comprehensionResult.usage.output;
    if (!comprehensionResult.pass) {
      console.error('❌ Brief comprehension gate failed:');
      for (const v of comprehensionResult.violations) {
        console.error(`  • [${v.severity}] ${v.message}`);
      }
      emitEscalation(outDir, {
        type: 'comprehension',
        runId,
        sectionId: brief.section.name,
        question: `Brief comprehension failed with violations: ${comprehensionResult.violations.map((v) => v.message).join(', ')}`,
      });
      console.error('Escalation emitted. Parking run until answered. Answer it with `ade escalation answer` and re-run the same --out to resume.');
      return makeResult('ABORTED', outDir, 0, totalTokens, startTime);
    }
    console.log('✅ Brief comprehension gate passed.');
  }

  // ── Copy assets to harness ───────────────────────────────────────
  let rewrittenAssets: Record<string, string> = {};
  if (brief.section.assets) {
    const briefDir = dirname(resolve(briefPath));
    rewrittenAssets = copyAssetsToHarness(brief.section.assets, briefDir);
  }

  // ── Reference activation (C2.4) ──────────────────────────────────
  // I9/F-SEC-02: refs are untrusted data — the injection screen ALWAYS
  // runs, unconditionally, before any reference reaches a prompt. A
  // blocked reference is dropped and logged, never sanitized-and-kept.
  let activeRefs: ReferenceRef[] = [];
  if (refs && refs.length > 0) {
    const { safe, blocked } = screenReferenceInjection(refs);
    for (const b of blocked) {
      console.warn(`⚠ Reference blocked (I9 injection-safety, pattern ${b.pattern}): ${b.ref.path}`);
    }
    activeRefs = safe;
  }

  // ── Assemble input bundle (I1 precedence) ────────────────────────
  const softLibrary = await retrieveLibraryForBrief(cfg, brief, 5, libraryArm, clientId);
  // C2.2: record exactly which Library version this run retrieved against —
  // reproducibility. A run's neighbor set can always be reconstructed later
  // from this version's snapshot, independent of later Library writes.
  snapshotLibraryVersionForRun(outDir);
  const bundle: InputBundle = {
    brief: {
      ...brief,
      // E1.2 resume: fold the human's comprehension-escalation answer into
      // the hard brief as a clarifying note, so it actually reaches the
      // Generator rather than existing only in escalations.jsonl.
      goal: comprehensionAnswerNote ? `${brief.goal}\n\n(Human clarification: ${comprehensionAnswerNote})` : brief.goal,
      section: {
        ...brief.section,
        assets: rewrittenAssets,
      },
    },
    brandData,
    hardBrand: brand && brand.status === 'frozen' ? brand : undefined,
    hardSystem: pds && pds.status === 'foundation-frozen' ? pds : undefined,
    ctxShots: ctxShots && ctxShots.length > 0 ? ctxShots : undefined,
    refs: activeRefs.length > 0 ? activeRefs : undefined,
    softLibrary: softLibrary.length > 0 ? softLibrary : undefined,
  };
  const constraintBrandData = getConstraintBrandData(brandData, brand);

  // ── State ────────────────────────────────────────────────────────
  let bestSoFar: {
    tsx: string;
    scores: DimensionScores;
    candidateId: string;
    iteration: number;
    hardPass: boolean;
    shots: Record<string, string>;
  } | null = null;

  let lastFeedback: string | undefined;
  let terminalState: TerminalState = 'ESCALATED';
  let iterationCount = 0;

  // C3.6: Search Dynamics state
  const scoreHistory: number[] = [];
  const isTierA = TIER_A_SECTIONS.has(brief.section.name.toLowerCase());

  // ── Main Loop ────────────────────────────────────────────────────
  for (let iter = 0; iter < cfg.maxIters; iter++) {
    iterationCount = iter + 1;
    const isPlateaued = detectPlateau(scoreHistory);
    const currentK = getAdaptiveK(cfg.variations, iter, isPlateaued, isTierA);

    const iterDir = join(outDir, 'iterations', `iter-${iter}`);
    mkdirSync(iterDir, { recursive: true });

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  Iteration ${iter} / ${cfg.maxIters - 1}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    // Budget check (F-MOD-04)
    if (isBudgetExceeded(cfg, modelCalls, totalTokens, startTime)) {
      console.log('⚠ Budget exceeded — ESCALATED');
      terminalState = 'ESCALATED';
      emitEscalation(outDir, {
        type: 'budget',
        runId,
        sectionId,
        question: `Model-call/token/time budget exceeded at start of iteration ${iter}.`,
      });
      break;
    }

    // ── Generate N candidates ────────────────────────────────────
    // ── Generate N candidates ────────────────────────────────────
    console.log(`\n🎨 Generating ${currentK} candidate(s) (C3.6 adaptive k)...`);
    const candidates: { id: string; tsx: string; quota?: any; exploration?: boolean; tokenBreakdown?: import('./prompts.js').PromptTokenBreakdown }[] = [];

    for (let v = 0; v < currentK; v++) {
      const candidateId = `iter${iter}-cand${v + 1}`;

      try {
        const isExploration = iter === 0 && v === 0 && !cfg.control_mode;
        const genResult = await generate(genProvider, bundle, lastFeedback, cfg.genTemperature, modelCalls, isExploration);
        totalTokens.input += genResult.usage.input;
        totalTokens.output += genResult.usage.output;

        candidates.push({
          id: candidateId,
          tsx: genResult.tsx,
          quota: genResult.quota,
          exploration: isExploration,
          tokenBreakdown: genResult.tokenBreakdown,
        });

        // Save candidate code
        const candDir = join(iterDir, candidateId);
        mkdirSync(candDir, { recursive: true });
        writeFileSync(join(candDir, 'Section.tsx'), genResult.tsx);
      } catch (err) {
        console.error(`❌ Generation failed for ${candidateId}:`, err instanceof Error ? err.message : err);
        if (err instanceof GeneratorError && err.cause === 'refusal') {
          continue; // Skip this candidate, try others
        }
      }

      // Budget check between candidates
      if (isBudgetExceeded(cfg, modelCalls, totalTokens, startTime)) break;
    }

    if (candidates.length === 0) {
      console.error('❌ No candidates generated this iteration.');
      lastFeedback = 'Previous generation failed completely. Start fresh with a simpler approach.';
      continue;
    }

    // ── Render & gate each candidate (sequentially) ──────────────
    // ── Render & gate each candidate (sequentially) ──────────────
    console.log(`\n👁 Rendering ${candidates.length} candidate(s)...`);
    const renderValid: { id: string; tsx: string; shots: Record<string, string>; hardPass: boolean; hardViolations: string[]; quota?: any; exploration?: boolean; tokenBreakdown?: import('./prompts.js').PromptTokenBreakdown; domInfo?: RenderResult['domInfo'] }[] = [];

    for (const candidate of candidates) {
      console.log(`  Rendering ${candidate.id}...`);

      // Render
      const candDir = join(iterDir, candidate.id);
      let renderResult;
      try {
        renderResult = await render(candidate.tsx, candidate.id, cfg.breakpoints, cfg, join(candDir, 'render'), async (page) => (await hardConstraintGate(page, bundle.brief, constraintBrandData)).violations);
      } catch (err) {
        console.error(`  ❌ Render failed for ${candidate.id}:`, err instanceof Error ? err.message : err);
        continue;
      }

      // Copy shots to candidate dir
      const shotsDir = join(candDir, 'shots');
      mkdirSync(shotsDir, { recursive: true });
      for (const [bp, path] of Object.entries(renderResult.shots)) {
        const destPath = join(shotsDir, `${bp}.png`);
        try {
          copyFileSync(path, destPath);
        } catch {
          /* ignore */
        }
        renderResult.shots[bp] = destPath;
      }

      // Render-health gate
      const healthResult = await renderHealthGate(candidate.tsx, renderResult);
      if (!healthResult.pass) {
        console.log(`  ⚠ Render-health gate FAILED for ${candidate.id}`);
        for (const v of healthResult.violations) {
          console.log(`    • [${v.severity}] ${v.message}`);
        }

        // Render-repair sub-loop (bounded)
        let repaired = false;
        for (let repair = 0; repair < cfg.renderRepairTries; repair++) {
          if (isBudgetExceeded(cfg, modelCalls, totalTokens, startTime)) break;

          console.log(`  🔧 Repair attempt ${repair + 1}/${cfg.renderRepairTries}...`);
          const repairFeedback = serializeFeedback(
            healthResult.violations.map((v) => `[RENDER FIX] ${v.message}`),
            '',
          );

          try {
            const repairResult = await generate(genProvider, bundle, repairFeedback, cfg.genTemperature, modelCalls);
            totalTokens.input += repairResult.usage.input;
            totalTokens.output += repairResult.usage.output;

            const repairRender = await render(repairResult.tsx, `${candidate.id}-repair${repair}`, cfg.breakpoints, cfg, join(candDir, 'render'), async (page) => (await hardConstraintGate(page, bundle.brief, constraintBrandData)).violations);
            const repairHealth = await renderHealthGate(repairResult.tsx, repairRender);

            if (repairHealth.pass) {
              candidate.tsx = repairResult.tsx;
              renderResult = repairRender;
              repaired = true;
              console.log(`  ✅ Repair succeeded.`);
              // Copy repaired shots
              for (const [bp, path] of Object.entries(repairRender.shots)) {
                const destPath = join(shotsDir, `${bp}.png`);
                try {
                  copyFileSync(path, destPath);
                } catch {
                  /* ignore */
                }
                renderResult.shots[bp] = destPath;
              }
              break;
            }
          } catch (err) {
            console.error(`  ❌ Repair failed:`, err instanceof Error ? err.message : err);
          }
        }

        if (!repaired) {
          console.log(`  ❌ ${candidate.id} unrepairable, skipping.`);
          continue;
        }
      }

      // Hard constraints are collected during render while the Playwright page is live.
      let hardPass = true;
      const hardViolations: string[] = [];

      for (const violation of renderResult.hardViolations ?? []) {
        hardViolations.push(`[${violation.rule}] ${violation.message}`);
        if (violation.severity === 'critical' || violation.severity === 'serious') {
          hardPass = false;
        }
      }

      if (!hardPass) {
        console.log(`  ⚠ Hard-constraint gate FAILED for ${candidate.id}`);
        for (const violation of renderResult.hardViolations ?? []) {
          console.log(`    • [${violation.severity}] ${violation.message}`);
        }
      }

      // Token-allowlist gate (Phase 1) — check frozen PDS tokens
      if (bundle.hardSystem && bundle.hardSystem.status === 'foundation-frozen') {
        const tokenResult = tokenAllowlistGate(candidate.tsx, bundle.hardSystem);
        if (!tokenResult.pass) {
          console.log(`  ⚠ Token-allowlist gate FAILED for ${candidate.id}`);
          for (const v of tokenResult.violations) {
            console.log(`    • [${v.severity}] ${v.message}`);
            hardViolations.push(`[TOKEN] ${v.message}`);
          }
          hardPass = false;
        }
      }

      // Content and placeholder checks from the rendered text (simplified for non-page context)
      // These are the checks we can do without axe-core page access
      // Full a11y check runs during the render phase
      // For now, record as render-valid
      renderValid.push({
        id: candidate.id,
        tsx: candidate.tsx,
        shots: renderResult.shots,
        hardPass,
        hardViolations,
        quota: candidate.quota,
        exploration: candidate.exploration,
        tokenBreakdown: candidate.tokenBreakdown,
        domInfo: renderResult.domInfo,
      });

      console.log(`  ✅ ${candidate.id} render-valid.`);
    }

    if (renderValid.length === 0) {
      console.log('\n⚠ No render-valid candidates this iteration.');
      lastFeedback = 'All candidates had render failures. Simplify the component, ensure valid JSX, and use only react imports.';
      continue;
    }

    // ── Critique (render-valid candidates only) ──────────────────
    console.log(`\n🧐 Critiquing ${renderValid.length} candidate(s)...`);

    if (isBudgetExceeded(cfg, modelCalls, totalTokens, startTime)) {
      terminalState = 'ESCALATED';
      emitEscalation(outDir, {
        type: 'budget',
        runId,
        sectionId,
        question: `Cost/Time budget exceeded before passing gates.`,
      });
      break;
    }

    const candidatesInfo = buildCandidatesInfo(renderValid);

    let criticOutput;
    try {
      criticOutput = await critique(candidatesInfo, bundle, criticProvider, cfg.criticTemperature, cfg.threshold, modelCalls);
      // Track tokens from critique (approximate — provider tracks internally)
    } catch (err) {
      console.error('❌ Critique failed:', err instanceof Error ? err.message : err);
      lastFeedback = 'Previous critique failed. Continue improving the design.';
      continue;
    }

    // Save critique
    writeFileSync(join(iterDir, 'critique.json'), JSON.stringify(criticOutput, null, 2));

    // ── Update best-so-far (I4 — never regress) ─────────────────
    for (const candidateScore of criticOutput.candidates) {
      const candidate = renderValid.find((c) => c.id === candidateScore.candidate_id);
      if (!candidate) continue;

      const isEligible = candidate.hardPass && candidateScore.verdict === 'pass';
      const score = candidateScore.scores;

      // Update best-so-far: strictly better only (I4)
      if (!bestSoFar) {
        bestSoFar = {
          tsx: candidate.tsx,
          scores: score,
          candidateId: candidate.id,
          iteration: iter,
          hardPass: candidate.hardPass,
          shots: candidate.shots,
        };
      } else {
        const currentEligible = bestSoFar.hardPass;
        if (isEligible && !currentEligible) {
          bestSoFar = {
            tsx: candidate.tsx,
            scores: score,
            candidateId: candidate.id,
            iteration: iter,
            hardPass: candidate.hardPass,
            shots: candidate.shots,
          };
        } else if (isEligible === currentEligible) {
          // C3.6 - R8 Pareto-front selection for best-so-far
          const mockBestSoFar: CandidateScore = {
            candidate_id: bestSoFar.candidateId,
            scores: bestSoFar.scores,
            verdict: 'pass', // placeholder, eligibility is checked outside
            feedback: '',
          };
          const winner = selectBestCandidate([mockBestSoFar, candidateScore], true);
          if (winner?.candidate_id === candidateScore.candidate_id) {
            bestSoFar = {
              tsx: candidate.tsx,
              scores: score,
              candidateId: candidate.id,
              iteration: iter,
              hardPass: candidate.hardPass,
              shots: candidate.shots,
            };
          }
        }
      }

      // ── Trace: append iteration record (I6) ──────────────────
      const record: RunRecord = {
        run_id: runId,
        section_id: sectionId,
        iteration: iter,
        candidate_id: candidateScore.candidate_id,
        input_bundle_ref: `bundle:${runId}:${iter}`,
        output_code_ref: join(iterDir, candidateScore.candidate_id, 'Section.tsx'),
        screenshots: candidate.shots,
        scores: score,
        verdict: candidateScore.verdict,
        critic_feedback: candidateScore.feedback,
        hard_violations: candidate.hardViolations,
        duration_ms: Date.now() - startTime,
        tokens: {
          ...totalTokens,
          input_by_part: candidate.tokenBreakdown,
        },
        quota: candidate.quota,
        exploration: candidate.exploration,
        // The Critic produced scores/verdict/feedback for this record — its
        // model id is what a reader needs to interpret them (F-MOD-05).
        model_id: criticProvider.id,
        // C0.16 — real per-role ids, not a guess (distTags no longer has to
        // fall back to assuming gen==critic when deriving from the trace).
        gen_model_id: genProvider.id,
        critic_model_id: criticProvider.id,
        timestamp: new Date().toISOString(),
      };

      appendIteration(outDir, record);
    }

    // ── Pass Gate check ──────────────────────────────────────────
    // C3.6 - R8 Pareto selection instead of pure ranking fallback
    const bestCandidate = selectBestCandidate(criticOutput.candidates, true);
    const bestCandidateId = bestCandidate?.candidate_id;
    const bestRenderCandidate = renderValid.find((c) => c.id === bestCandidateId);

    if (bestCandidate && bestRenderCandidate) {
      scoreHistory.push(bestCandidate.scores.weighted_total); // Record for plateau detection

      const passGate = bestRenderCandidate.hardPass && bestCandidate.verdict === 'pass' && bestCandidate.scores.weighted_total >= cfg.threshold;

      if (passGate) {
        console.log(`\n✅ APPROVED! Score: ${bestCandidate.scores.weighted_total} (threshold: ${cfg.threshold})`);
        terminalState = 'APPROVED';
        break;
      }

      // Carry feedback forward
      const hardViolationMessages = bestRenderCandidate.hardViolations;
      lastFeedback = serializeFeedback(hardViolationMessages, bestCandidate.feedback);

      // C3.6 - R7 Diversity Injection (Restart on Plateau)
      if (detectPlateau(scoreHistory)) {
        console.log(`\n🔄 R7: Plateau detected! Max variation < 2 over recent iterations. Injecting diversity...`);
        lastFeedback = 'ABANDON PREVIOUS DIRECTION. We are stuck in a local optimum. Discard the current layout and try a radically different structural or aesthetic approach that still fits the brief.';
        // We do NOT clear bestSoFar (so we never regress), but we push the generator to start over.
      }

      console.log(`\n📊 Score: ${bestCandidate.scores.weighted_total} (threshold: ${cfg.threshold}) — continuing...`);
    }

    // End of iteration — check if this was the last one
    if (iter === cfg.maxIters - 1) {
      terminalState = 'ESCALATED';
      emitEscalation(outDir, {
        type: 'oscillation',
        runId,
        sectionId,
        question: `Max iterations (${cfg.maxIters}) reached without passing gates.`,
      });

      // C3.9: Propose adversarial case if severely failed
      let failureReason = '';
      if (!bestSoFar) {
        failureReason = 'All candidates failed render/health gates across all iterations.';
      } else if (!bestSoFar.hardPass) {
        failureReason = 'Consistently failed hard-constraint gate despite max iterations.';
      } else if (bestSoFar.scores.weighted_total < 40) {
        failureReason = `Critic score plateaued at severely low value (${bestSoFar.scores.weighted_total}).`;
      }

      if (failureReason) {
        proposeAdversarialCase(bundle.brief, failureReason);
      }
    }
  }

  // ── Write final output ─────────────────────────────────────────
  const finalDir = join(outDir, 'final');
  mkdirSync(finalDir, { recursive: true });
  let finalShots: Record<string, string> | undefined;

  if (bestSoFar) {
    writeFileSync(join(finalDir, 'Section.tsx'), bestSoFar.tsx);

    // Copy best shots to final
    const finalShotsDir = join(finalDir, 'shots');
    mkdirSync(finalShotsDir, { recursive: true });
    finalShots = {};
    // Re-render the best for clean final shots
    try {
      const finalRender = await render(bestSoFar.tsx, 'final', cfg.breakpoints, cfg, finalDir);
      for (const [bp, path] of Object.entries(finalRender.shots)) {
        const destPath = join(finalShotsDir, `${bp}.png`);
        try {
          copyFileSync(path, destPath);
        } catch {
          /* ignore */
        }
        finalShots[bp] = destPath;
      }
    } catch {
      // If re-render fails, copy from best iteration
      console.warn('⚠ Final re-render failed, using iteration shots.');
      for (const [bp, path] of Object.entries(bestSoFar.shots)) {
        const destPath = join(finalShotsDir, `${bp}.png`);
        try {
          copyFileSync(path, destPath);
          finalShots[bp] = destPath;
        } catch {
          finalShots[bp] = path;
        }
      }
    }

    console.log(`\n${'═'.repeat(50)}`);
    console.log(`  Run complete: ${terminalState}`);
    console.log(`  Best score: ${bestSoFar.scores.weighted_total}`);
    console.log(`  From: iteration ${bestSoFar.iteration}, candidate ${bestSoFar.candidateId}`);
    console.log(`  Iterations: ${iterationCount}`);
    console.log(`  Total tokens: ${totalTokens.input + totalTokens.output}`);
    console.log(`  Output: ${outDir}`);
    console.log(`${'═'.repeat(50)}\n`);
  }

  // Cleanup
  await cleanup();

  return makeResult(terminalState, outDir, iterationCount, totalTokens, startTime, bestSoFar, finalShots);
}

// ─── Helpers ───────────────────────────────────────────────────────

/**
 * C1.9: bound visual context to the most recent MAX_CONTEXT_SECTIONS
 * sections' screenshots, not every section built so far. The plan requires
 * "screenshots of the most relevant 1-3 prior sections" specifically to
 * keep tokens/section flat as an artifact grows (H7/C0.17) — without this,
 * runSiteLoop accumulated every prior section's shots unboundedly, so a
 * 10-section site would pass 10x the visual-context tokens of a 1-section
 * one into every subsequent generation call.
 */
const MAX_CONTEXT_SECTIONS = 3;

export function boundedContextShots(contextShots: { sectionName: string; breakpoint: string; path: string }[]): { sectionName: string; breakpoint: string; path: string }[] | undefined {
  if (contextShots.length === 0) return undefined;
  const recentSectionNames = [...new Set(contextShots.map((s) => s.sectionName))].slice(-MAX_CONTEXT_SECTIONS);
  const bounded = contextShots.filter((s) => recentSectionNames.includes(s.sectionName));
  return bounded.length > 0 ? bounded : undefined;
}

/**
 * C0.8: builds the exact payload the Critic receives per candidate.
 * Extracted to a named function (not left as an inline loop) after a real
 * regression where the inline version silently dropped `domInfo` —
 * craft metrics + font-substitution disclosure (prompts.ts's CAVEATS
 * block) never reached the Critic despite being fully implemented and
 * correct in isolation. This function is the single place that
 * transformation happens, so it can be tested directly.
 */
export function buildCandidatesInfo(renderValid: { id: string; shots: Record<string, string>; domInfo?: RenderResult['domInfo'] }[]): Record<string, { shots: Record<string, string>; domInfo?: RenderResult['domInfo'] }> {
  const candidatesInfo: Record<string, { shots: Record<string, string>; domInfo?: RenderResult['domInfo'] }> = {};
  for (const c of renderValid) {
    candidatesInfo[c.id] = { shots: c.shots, domInfo: c.domInfo };
  }
  return candidatesInfo;
}

function isBudgetExceeded(cfg: Config, modelCalls: { current: number; max: number }, totalTokens: { input: number; output: number }, startTime: number): boolean {
  if (modelCalls.current >= modelCalls.max) {
    console.warn(`⚠ Model call budget exceeded: ${modelCalls.current}/${modelCalls.max}`);
    return true;
  }

  const totalTok = totalTokens.input + totalTokens.output;
  if (totalTok >= cfg.maxRunTokens) {
    console.warn(`⚠ Token budget exceeded: ${totalTok}/${cfg.maxRunTokens}`);
    return true;
  }

  const elapsed = (Date.now() - startTime) / 1000;
  if (elapsed >= cfg.maxRunSeconds) {
    console.warn(`⚠ Time budget exceeded: ${Math.round(elapsed)}s/${cfg.maxRunSeconds}s`);
    return true;
  }

  return false;
}

function makeResult(state: TerminalState, outDir: string, iterations: number, totalTokens: { input: number; output: number }, startTime: number, best?: { tsx: string; scores: DimensionScores; candidateId: string } | null, finalShots?: Record<string, string>): RunResult {
  return {
    state,
    finalTsx: best?.tsx,
    finalShots,
    bestScore: best?.scores,
    iterations,
    totalTokens: { ...totalTokens },
    totalDurationMs: Date.now() - startTime,
    traceFile: join(outDir, 'trace.jsonl'),
    outDir,
  };
}

function getConstraintBrandData(brandData?: BrandData, brand?: BrandFoundation): BrandData | undefined {
  if (brandData) {
    return brandData;
  }
  if (!brand || brand.status !== 'frozen') {
    return undefined;
  }

  return {
    client_id: brand.client_id,
    palette: brand.identity.palette.map(({ role, value }) => ({ role, value })),
    typography: brand.identity.typography,
    darkMode: { enabled: false }, // frozen BrandFoundation doesn't carry the dark-mode axis
    logo_ref: brand.identity.logo_ref,
  };
}

// ─── Phase 1: Multi-Section Orchestration ────────────────────────

/**
 * Assemble the input bundle with I1 precedence enforcement:
 * floor > brand > PDS > brief > library > refs.
 */
export function assembleBundle(brief: Brief, brandData?: BrandData, brand?: BrandFoundation, pds?: ProjectDesignSystem, ctxShots?: { sectionName: string; breakpoint: string; path: string }[], softLibrary?: LibraryEntry[]): InputBundle {
  return {
    brief,
    brandData,
    hardBrand: brand && brand.status === 'frozen' ? brand : undefined,
    hardSystem: pds && pds.status === 'foundation-frozen' ? pds : undefined,
    ctxShots: ctxShots && ctxShots.length > 0 ? ctxShots : undefined,
    softLibrary: softLibrary && softLibrary.length > 0 ? softLibrary.slice(0, 5) : undefined,
  };
}

/**
 * Run a section loop with brand/PDS/ctxShots support (Phase 1).
 * This wraps the base runLoop with Phase 1 inputs.
 */
export async function runSectionLoop(cfg: Config, brief: Brief, brandData: BrandData | undefined, outDir: string, briefPath: string, brand?: BrandFoundation, pds?: ProjectDesignSystem, ctxShots?: { sectionName: string; breakpoint: string; path: string }[]): Promise<RunResult> {
  // For Phase 1, the runLoop already reads hardBrand/hardSystem/ctxShots
  // from the bundle. We just need to pass them through.
  // The token-allowlist gate integration happens inside the loop
  // when we detect a frozen PDS.
  return runLoop(cfg, brief, brandData, undefined, outDir, briefPath, brand, pds, ctxShots);
}

/**
 * Run a full site: sequence sections with crystallization + QA (Phase 1).
 *
 * Flow:
 * 1. Load frozen brand
 * 2. For each section in order:
 *    a. If first section: run with open system
 *    b. On approval: crystallize → freeze PDS foundation
 *    c. Later sections: run against frozen PDS + context shots
 * 3. Assemble + whole-artifact QA
 */
export async function runSiteLoop(cfg: Config, clientId: string, surface: 'website' | 'product', sections: { name: string; brief: Brief; briefPath: string; brandData?: BrandData }[]): Promise<{ artifact: Artifact; results: RunResult[] }> {
  const productionReadiness = validateProductionReadiness(cfg);
  for (const warning of productionReadiness.warnings) {
    console.warn(`Production warning [${warning.rule}]: ${warning.message}`);
  }
  if (cfg.productionMode && !productionReadiness.pass) {
    throw new Error(`Production readiness failed: ${productionReadiness.violations.map((v) => v.message).join('; ')}`);
  }

  // Load brand
  const brand = readBrand(clientId);
  if (!brand || brand.status !== 'frozen') {
    throw new Error(`Brand for "${clientId}" must be frozen before running design site. ` + `Use \`ade design brand --approve\` first.`);
  }

  const results: RunResult[] = [];
  const builtSections: SectionOutput[] = [];
  const contextShots: { sectionName: string; breakpoint: string; path: string }[] = [];

  // Initialize or load artifact
  let artifact: Artifact = readArtifact(clientId, surface) ?? {
    artifact_id: `${clientId}-${surface}-${randomUUID().slice(0, 8)}`,
    client_id: clientId,
    surface,
    status: 'in-progress',
    sections: [],
  };

  // Crystallization is a judgment call over the approved hero (spec/04 §3) — critic-tier, not generator-tier.
  const criticProvider = await getProviderForRole(cfg, 'critic');

  // Builds (or rebuilds) a single section in place and returns whether it's
  // now approved. Factored out so C1.11's re-loop pass below can re-run the
  // exact same path a first-time build takes — never a blind patch.
  const buildSection = async (i: number): Promise<boolean> => {
    const sec = sections[i];
    const isFirst = i === 0;
    const outDir = getSectionRunDir(clientId, surface, sec.name);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`  Section ${i + 1}/${sections.length}: ${sec.name}`);
    console.log(`${'='.repeat(60)}`);

    // Load current PDS (null for first section)
    const pds = readPDS(clientId, surface);

    // Context shots from every OTHER already-built section (never this one's
    // own stale shots on a re-loop).
    const priorShots = contextShots.filter((s) => s.sectionName !== sec.name);

    // Run the section loop
    const result = await runSectionLoop(cfg, sec.brief, sec.brandData, outDir, sec.briefPath, brand, pds ?? undefined, boundedContextShots(priorShots));
    results.push(result);

    if (result.state !== 'APPROVED' && result.state !== 'ESCALATED') {
      console.error(`\n❌ Section "${sec.name}" ${result.state}. Stopping site generation.`);
      return false;
    }

    // Record (or replace) the section
    const sectionOutput: SectionOutput = {
      section_id: `${clientId}_${sec.name}`,
      name: sec.name,
      code: {
        component: result.finalTsx ?? '',
      },
      screenshots: result.finalShots ?? {},
      final_score: result.bestScore ?? {
        brand_adherence: 0,
        system_adherence: null,
        brief_fit: 0,
        craft: 0,
        weighted_total: 0,
      },
      status: result.state === 'APPROVED' ? 'approved' : 'draft',
    };
    const existingIdx = builtSections.findIndex((s) => s.name === sec.name);
    if (existingIdx >= 0) {
      builtSections[existingIdx] = sectionOutput;
    } else {
      builtSections.push(sectionOutput);
    }

    // Crystallize after first approved section
    if (isFirst && result.state === 'APPROVED' && result.finalTsx) {
      console.log('\n🔮 Crystallizing design system from first section...');
      try {
        await crystallize(result.finalTsx, sec.name, brand, clientId, surface, criticProvider, getSectionRunDir(clientId, surface, `${sec.name}-crystallize-review`));
      } catch (err) {
        console.error('\n⚠ Crystallization failed:', err instanceof Error ? err.message : err);
        console.log('Continuing without frozen PDS...');
      }
    }

    // Collect (or replace) context shots for next sections
    for (let j = contextShots.length - 1; j >= 0; j--) {
      if (contextShots[j].sectionName === sec.name) contextShots.splice(j, 1);
    }
    if (result.finalShots) {
      for (const [bp, path] of Object.entries(result.finalShots)) {
        contextShots.push({ sectionName: sec.name, breakpoint: bp, path });
      }
    }

    return result.state === 'APPROVED';
  };

  for (let i = 0; i < sections.length; i++) {
    const ok = await buildSection(i);
    if (!ok) break;
  }

  // Update artifact
  artifact.sections = builtSections;
  let finalPds = readPDS(clientId, surface);
  let qaReport = runWholeArtifactQA(artifact, brand, finalPds, { threshold: cfg.threshold });

  // C1.11: on a whole-artifact QA failure that names specific section(s)
  // (nav/rhythm drift, token drift, below-threshold), re-loop exactly those
  // sections — never hand-patch the assembled artifact — then re-check.
  // Bounded (not unbounded): a section that still fails after retrying is
  // left as the QA report's problem to surface, not silently looped forever.
  const sectionNames = sections.map((s) => s.name);
  const ARTIFACT_QA_MAX_RELOOP_TRIES = 2;
  let qaReloopTries = 0;
  while (!qaReport.pass && qaReloopTries < ARTIFACT_QA_MAX_RELOOP_TRIES) {
    const offending = offendingSections(qaReport, sectionNames);
    if (offending.size === 0) {
      // No violation names a specific section (e.g. empty-artifact,
      // brand-token-missing) — a section re-loop cannot fix this.
      break;
    }
    console.warn(`\n⚠ Whole-artifact QA failed (try ${qaReloopTries + 1}/${ARTIFACT_QA_MAX_RELOOP_TRIES}): ` + `re-looping offending section(s): ${[...offending].join(', ')}`);
    for (const name of offending) {
      const idx = sections.findIndex((s) => s.name === name);
      if (idx >= 0) await buildSection(idx);
    }
    artifact.sections = builtSections;
    finalPds = readPDS(clientId, surface);
    qaReport = runWholeArtifactQA(artifact, brand, finalPds, { threshold: cfg.threshold });
    qaReloopTries++;
  }
  if (qaReport.pass && qaReloopTries > 0) {
    console.log(`✅ Whole-artifact QA passed after ${qaReloopTries} section re-loop pass(es).`);
  } else if (!qaReport.pass && qaReloopTries > 0) {
    console.warn(`⚠ Whole-artifact QA still failing after ${qaReloopTries} re-loop pass(es) — leaving as-is for human review.`);
  }
  writeArtifactQA(clientId, surface, qaReport);

  const costSummary = summarizeRunResults(results);
  const budgetViolations = checkCostBudget(costSummary, budgetFromConfig(cfg));
  console.log(formatCostSummary(costSummary));
  for (const violation of budgetViolations) {
    console.warn(`Budget warning [${violation.rule}]: ${violation.message}`);
  }

  artifact.status = builtSections.length > 0 && builtSections.every((s) => s.status === 'approved') && qaReport.pass ? 'approved' : 'in-progress';
  writeArtifact(clientId, surface, artifact);

  return { artifact, results };
}
