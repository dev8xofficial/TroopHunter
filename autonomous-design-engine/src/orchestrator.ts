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
import type {
  Brief,
  BrandData,
  InputBundle,
  RunRecord,
  RunResult,
  TerminalState,
  DimensionScores,
  CandidateScore,
  BrandFoundation,
  ProjectDesignSystem,
  SectionOutput,
  Artifact,
  LibraryEntry,
} from './schema.js';
import { getProvider, type ModelProvider } from './model.js';
import { generate, GeneratorError } from './generator.js';
import { render, copyAssetsToHarness, cleanup } from './eyes.js';
import {
  briefComprehensionGate,
  inputGate,
  renderHealthGate,
  hardConstraintGate,
  tokenAllowlistGate,
} from './guardrails.js';
import { critique } from './critic.js';
import { appendIteration, writeRunConfig } from './trace.js';
import { serializeFeedback } from './prompts.js';
import { crystallize } from './crystallizer.js';
import { retrieveLibraryForBrief } from './library.js';
import {
  readBrand,
  readPDS,
  readArtifact,
  writeArtifact,
  writeArtifactQA,
  getSectionRunDir,
} from './store.js';
import { runWholeArtifactQA } from './qa.js';
import {
  budgetFromConfig,
  checkCostBudget,
  formatCostSummary,
  summarizeRunResults,
  validateProductionReadiness,
} from './production.js';

/**
 * Run the full generate→render→screenshot→critique→edit loop.
 *
 * Exit codes:
 *   0 = APPROVED
 *   2 = ESCALATED (budget exhausted, best-so-far emitted)
 *   3 = ABORTED (unrepairable)
 *   1 = ERROR
 */
export async function runLoop(
  cfg: Config,
  brief: Brief,
  brandData: BrandData | undefined,
  outDir: string,
  briefPath: string,
  brand?: BrandFoundation,
  pds?: ProjectDesignSystem,
  ctxShots?: { sectionName: string; breakpoint: string; path: string }[],
): Promise<RunResult> {
  const runId = randomUUID().slice(0, 8);
  const sectionId = `${brief.client.toLowerCase().replace(/\s+/g, '-')}_${brief.section.name}`;
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
    section: brief.section.name,
    config: {
      provider: cfg.provider,
      modelId: cfg.modelId,
      maxIters: cfg.maxIters,
      variations: cfg.variations,
      threshold: cfg.threshold,
      breakpoints: cfg.breakpoints,
    },
    startedAt: new Date().toISOString(),
  });

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
  console.log(`\n🤖 Initializing ${cfg.provider} provider (${cfg.modelId})...`);
  const provider = await getProvider(cfg);

  console.log('\n🧭 Running brief comprehension gate...');
  const comprehensionResult = await briefComprehensionGate(provider, brief, modelCalls);
  totalTokens.input += comprehensionResult.usage.input;
  totalTokens.output += comprehensionResult.usage.output;
  if (!comprehensionResult.pass) {
    console.error('❌ Brief comprehension gate failed:');
    for (const v of comprehensionResult.violations) {
      console.error(`  • [${v.severity}] ${v.message}`);
    }
    return makeResult('ABORTED', outDir, 0, totalTokens, startTime);
  }
  console.log('✅ Brief comprehension gate passed.');

  // ── Copy assets to harness ───────────────────────────────────────
  let rewrittenAssets: Record<string, string> = {};
  if (brief.section.assets) {
    const briefDir = dirname(resolve(briefPath));
    rewrittenAssets = copyAssetsToHarness(brief.section.assets, briefDir);
  }

  // ── Assemble input bundle (I1 precedence) ────────────────────────
  const softLibrary = await retrieveLibraryForBrief(cfg, brief, 5);
  const bundle: InputBundle = {
    brief: {
      ...brief,
      section: {
        ...brief.section,
        assets: rewrittenAssets,
      },
    },
    brandData,
    hardBrand: brand && brand.status === 'frozen' ? brand : undefined,
    hardSystem: pds && pds.status === 'foundation-frozen' ? pds : undefined,
    ctxShots: ctxShots && ctxShots.length > 0 ? ctxShots : undefined,
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

  // ── Main Loop ────────────────────────────────────────────────────
  for (let iter = 0; iter < cfg.maxIters; iter++) {
    iterationCount = iter + 1;
    const iterDir = join(outDir, 'iterations', `iter-${iter}`);
    mkdirSync(iterDir, { recursive: true });

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  Iteration ${iter} / ${cfg.maxIters - 1}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    // Budget check (F-MOD-04)
    if (isBudgetExceeded(cfg, modelCalls, totalTokens, startTime)) {
      console.log('⚠ Budget exceeded — ESCALATED');
      terminalState = 'ESCALATED';
      break;
    }

    // ── Generate N candidates ────────────────────────────────────
    console.log(`\n🎨 Generating ${cfg.variations} candidate(s)...`);
    const candidates: { id: string; tsx: string }[] = [];

    for (let v = 0; v < cfg.variations; v++) {
      const candidateId = `iter${iter}-cand${v + 1}`;

      try {
        const genResult = await generate(
          provider,
          bundle,
          lastFeedback,
          cfg.genTemperature,
          modelCalls,
        );
        totalTokens.input += genResult.usage.input;
        totalTokens.output += genResult.usage.output;

        candidates.push({ id: candidateId, tsx: genResult.tsx });

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
    console.log(`\n👁 Rendering ${candidates.length} candidate(s)...`);
    const renderValid: { id: string; tsx: string; shots: Record<string, string>; hardPass: boolean; hardViolations: string[] }[] = [];

    for (const candidate of candidates) {
      console.log(`  Rendering ${candidate.id}...`);

      // Render
      const candDir = join(iterDir, candidate.id);
      let renderResult;
      try {
        renderResult = await render(
          candidate.tsx,
          candidate.id,
          cfg.breakpoints,
          cfg,
          join(candDir, 'render'),
          async page => (await hardConstraintGate(page, bundle.brief, constraintBrandData)).violations,
        );
      } catch (err) {
        console.error(`  ❌ Render failed for ${candidate.id}:`, err instanceof Error ? err.message : err);
        continue;
      }

      // Copy shots to candidate dir
      const shotsDir = join(candDir, 'shots');
      mkdirSync(shotsDir, { recursive: true });
      for (const [bp, path] of Object.entries(renderResult.shots)) {
        const destPath = join(shotsDir, `${bp}.png`);
        try { copyFileSync(path, destPath); } catch { /* ignore */ }
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
            healthResult.violations.map(v => `[RENDER FIX] ${v.message}`),
            '',
          );

          try {
            const repairResult = await generate(
              provider,
              bundle,
              repairFeedback,
              cfg.genTemperature,
              modelCalls,
            );
            totalTokens.input += repairResult.usage.input;
            totalTokens.output += repairResult.usage.output;

            const repairRender = await render(
              repairResult.tsx,
              `${candidate.id}-repair${repair}`,
              cfg.breakpoints,
              cfg,
              join(candDir, 'render'),
              async page => (await hardConstraintGate(page, bundle.brief, constraintBrandData)).violations,
            );
            const repairHealth = await renderHealthGate(repairResult.tsx, repairRender);

            if (repairHealth.pass) {
              candidate.tsx = repairResult.tsx;
              renderResult = repairRender;
              repaired = true;
              console.log(`  ✅ Repair succeeded.`);
              // Copy repaired shots
              for (const [bp, path] of Object.entries(repairRender.shots)) {
                const destPath = join(shotsDir, `${bp}.png`);
                try { copyFileSync(path, destPath); } catch { /* ignore */ }
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
      break;
    }

    const allShots: Record<string, Record<string, string>> = {};
    for (const c of renderValid) {
      allShots[c.id] = c.shots;
    }

    let criticOutput;
    try {
      criticOutput = await critique(allShots, bundle, provider, cfg.criticTemperature, cfg.threshold, modelCalls);
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
      const candidate = renderValid.find(c => c.id === candidateScore.candidate_id);
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
        // Eligible beats non-eligible; among same eligibility, higher weighted_total wins
        const currentEligible = bestSoFar.hardPass;
        if (
          (isEligible && !currentEligible) ||
          (isEligible === currentEligible && score.weighted_total > bestSoFar.scores.weighted_total) ||
          (isEligible === currentEligible &&
            score.weighted_total === bestSoFar.scores.weighted_total &&
            score.craft > bestSoFar.scores.craft)
        ) {
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
        tokens: { ...totalTokens },
        model_id: provider.id,
        timestamp: new Date().toISOString(),
      };

      appendIteration(outDir, record);
    }

    // ── Pass Gate check ──────────────────────────────────────────
    // Use the best candidate from ranking (or first if no ranking)
    const bestCandidateId = criticOutput.ranking?.[0] ?? criticOutput.candidates[0]?.candidate_id;
    const bestCandidate = criticOutput.candidates.find(c => c.candidate_id === bestCandidateId);
    const bestRenderCandidate = renderValid.find(c => c.id === bestCandidateId);

    if (bestCandidate && bestRenderCandidate) {
      const passGate =
        bestRenderCandidate.hardPass &&
        bestCandidate.verdict === 'pass' &&
        bestCandidate.scores.weighted_total >= cfg.threshold;

      if (passGate) {
        console.log(`\n✅ APPROVED! Score: ${bestCandidate.scores.weighted_total} (threshold: ${cfg.threshold})`);
        terminalState = 'APPROVED';
        break;
      }

      // Carry feedback forward
      const hardViolationMessages = bestRenderCandidate.hardViolations;
      lastFeedback = serializeFeedback(hardViolationMessages, bestCandidate.feedback);

      console.log(`\n📊 Score: ${bestCandidate.scores.weighted_total} (threshold: ${cfg.threshold}) — continuing...`);
    }

    // End of iteration — check if this was the last one
    if (iter === cfg.maxIters - 1) {
      terminalState = 'ESCALATED';
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
        try { copyFileSync(path, destPath); } catch { /* ignore */ }
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

function isBudgetExceeded(
  cfg: Config,
  modelCalls: { current: number; max: number },
  totalTokens: { input: number; output: number },
  startTime: number,
): boolean {
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

function makeResult(
  state: TerminalState,
  outDir: string,
  iterations: number,
  totalTokens: { input: number; output: number },
  startTime: number,
  best?: { tsx: string; scores: DimensionScores; candidateId: string } | null,
  finalShots?: Record<string, string>,
): RunResult {
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

function getConstraintBrandData(
  brandData?: BrandData,
  brand?: BrandFoundation,
): BrandData | undefined {
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
    logo_ref: brand.identity.logo_ref,
  };
}

// ─── Phase 1: Multi-Section Orchestration ────────────────────────

/**
 * Assemble the input bundle with I1 precedence enforcement:
 * floor > brand > PDS > brief > library > refs.
 */
export function assembleBundle(
  brief: Brief,
  brandData?: BrandData,
  brand?: BrandFoundation,
  pds?: ProjectDesignSystem,
  ctxShots?: { sectionName: string; breakpoint: string; path: string }[],
  softLibrary?: LibraryEntry[],
): InputBundle {
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
export async function runSectionLoop(
  cfg: Config,
  brief: Brief,
  brandData: BrandData | undefined,
  outDir: string,
  briefPath: string,
  brand?: BrandFoundation,
  pds?: ProjectDesignSystem,
  ctxShots?: { sectionName: string; breakpoint: string; path: string }[],
): Promise<RunResult> {
  // For Phase 1, the runLoop already reads hardBrand/hardSystem/ctxShots
  // from the bundle. We just need to pass them through.
  // The token-allowlist gate integration happens inside the loop
  // when we detect a frozen PDS.
  return runLoop(cfg, brief, brandData, outDir, briefPath, brand, pds, ctxShots);
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
export async function runSiteLoop(
  cfg: Config,
  clientId: string,
  surface: 'website' | 'product',
  sections: { name: string; brief: Brief; briefPath: string; brandData?: BrandData }[],
): Promise<{ artifact: Artifact; results: RunResult[] }> {
  const productionReadiness = validateProductionReadiness(cfg);
  for (const warning of productionReadiness.warnings) {
    console.warn(`Production warning [${warning.rule}]: ${warning.message}`);
  }
  if (cfg.productionMode && !productionReadiness.pass) {
    throw new Error(
      `Production readiness failed: ${productionReadiness.violations.map(v => v.message).join('; ')}`,
    );
  }

  // Load brand
  const brand = readBrand(clientId);
  if (!brand || brand.status !== 'frozen') {
    throw new Error(
      `Brand for "${clientId}" must be frozen before running design site. ` +
      `Use \`ade design brand --approve\` first.`
    );
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

  const provider = await getProvider(cfg);

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const isFirst = i === 0;
    const outDir = getSectionRunDir(clientId, surface, sec.name);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`  Section ${i + 1}/${sections.length}: ${sec.name}`);
    console.log(`${'='.repeat(60)}`);

    // Load current PDS (null for first section)
    let pds = readPDS(clientId, surface);

    // Run the section loop
    const result = await runSectionLoop(
      cfg, sec.brief, sec.brandData, outDir, sec.briefPath,
      brand, pds ?? undefined, contextShots.length > 0 ? contextShots : undefined,
    );
    results.push(result);

    if (result.state !== 'APPROVED' && result.state !== 'ESCALATED') {
      console.error(`\n❌ Section "${sec.name}" ${result.state}. Stopping site generation.`);
      break;
    }

    // Record the section
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
    builtSections.push(sectionOutput);

    // Crystallize after first approved section
    if (isFirst && result.state === 'APPROVED' && result.finalTsx) {
      console.log('\n🔮 Crystallizing design system from first section...');
      try {
        await crystallize(
          result.finalTsx, sec.name, brand, clientId, surface, provider,
        );
      } catch (err) {
        console.error('\n⚠ Crystallization failed:', err instanceof Error ? err.message : err);
        console.log('Continuing without frozen PDS...');
      }
    }

    // Collect context shots for next sections
    if (result.finalShots) {
      for (const [bp, path] of Object.entries(result.finalShots)) {
        contextShots.push({ sectionName: sec.name, breakpoint: bp, path });
      }
    }
  }

  // Update artifact
  artifact.sections = builtSections;
  const finalPds = readPDS(clientId, surface);
  const qaReport = runWholeArtifactQA(artifact, brand, finalPds, { threshold: cfg.threshold });
  writeArtifactQA(clientId, surface, qaReport);

  const costSummary = summarizeRunResults(results);
  const budgetViolations = checkCostBudget(costSummary, budgetFromConfig(cfg));
  console.log(formatCostSummary(costSummary));
  for (const violation of budgetViolations) {
    console.warn(`Budget warning [${violation.rule}]: ${violation.message}`);
  }

  artifact.status = builtSections.length > 0 &&
    builtSections.every(s => s.status === 'approved') &&
    qaReport.pass
    ? 'approved'
    : 'in-progress';
  writeArtifact(clientId, surface, artifact);

  return { artifact, results };
}
