/**
 * ADE — CLI
 *
 * Arg parsing → dispatch only (no logic).
 * Maps spec 07 §2 command surface.
 *
 * @module cli
 */

import { Command } from 'commander';
import { dirname, join, resolve } from 'path';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { buildConfig } from './config.js';
import { runLoop, runSectionLoop, runSiteLoop } from './orchestrator.js';
import { generateReport } from './report.js';
import { readTrace } from './trace.js';
import { BriefSchema, BrandDataSchema, PlanSchema } from './schema.js';
import type { Brief, BrandData, BrandFoundation, Plan, Artifact, SectionOutput, Surface, AutonomyRung, RunRecord, VerdictEntry, ProjectDesignSystem, ArtifactQAReport, RetestCase } from './schema.js';
import { deriveBrand, saveBrandDraft, approveBrand, reDeriveBrand, reviewAndReDeriveBrand, reviewAndSelectBrandDirection } from './brand.js';
import { crystallize } from './crystallizer.js';
import { getProvider, getProviderForRole } from './model.js';
import { getSectionRunDir, integrityScan, readArtifact, readArtifactQA, readBrand, readPDS, writeArtifact, writeArtifactQA, writeBrand } from './store.js';
import { readLibrary, getLibraryDir, detectEmbeddingModelDrift, reEmbedLibrary } from './library.js';
import { writeBackArtifact } from './writeback.js';
import { readVerdicts, recordHumanVerdict, captureVerdict } from './verdicts.js';
import { freezeRetestBaseline, retestSetPath, runRetest } from './retest.js';
import { runCrossSurfaceBrandQA, runWholeArtifactQA } from './qa.js';
import { calibrateFromRecords } from './calibration.js';
import { formatAutonomyPolicy, recommendAutonomyPolicy } from './autonomy.js';
import { computeInterRaterAgreement, detectRubberStamps, formatInterRaterReport } from './reviewers.js';
import { runBenchmark } from './benchmark.js';
import { listEscalations, answerEscalation } from './escalations.js';
import { generatePreferenceLabels, exportRLAIFDataset } from './rlaif.js';
import { executeSuccessionPlaybook } from './distillation.js';
import { runSelfAudit } from './selfaudit.js';
import { loadReferences } from './refs.js';
import { generateStrategyPlan, readSitePlan, writeSitePlan, applyStrategyToSections } from './strategy.js';
import { runThreeArmAblation, summarizeAblation, formatH6Summary } from './ablation.js';
const program = new Command();

program.name('ade').description('Autonomous Design Engine — AI that designs from a brief').version('0.1.0');

// ─── generate ──────────────────────────────────────────────────────

program
  .command('generate')
  .description('Run the generate→render→screenshot→critique→edit loop on one section')
  .requiredOption('--brief <path>', 'Path to brief JSON file')
  .requiredOption('--section <name>', 'Section name (e.g. hero)')
  .requiredOption('--out <dir>', 'Output directory')
  .option('--brand-data <path>', 'Path to brand-data JSON file')
  .option('--plan <path>', 'Path to plan JSON file (M5)')
  .option('--variations <n>', 'Candidates per iteration', '1')
  .option('--max-iters <n>', 'Max loop iterations', '4')
  .option('--threshold <n>', 'Pass score (0-100)', '80')
  .option('--refs <paths...>', 'Reference screenshots (≤5, soft)')
  .option('--model <id>', 'Model ID')
  .option('--headed', 'Show the browser while rendering')
  .action(async (opts) => {
    try {
      // Build config from env + CLI overrides
      const cfg = buildConfig({
        model: opts.model,
        variations: opts.variations ? parseInt(opts.variations) : undefined,
        maxIters: opts.maxIters ? parseInt(opts.maxIters) : undefined,
        threshold: opts.threshold ? parseInt(opts.threshold) : undefined,
        headed: opts.headed,
      });

      // Load brief
      const briefPath = resolve(opts.brief);
      if (!existsSync(briefPath)) {
        console.error(`❌ Brief file not found: ${briefPath}`);
        process.exit(1);
      }
      const brief: Brief = JSON.parse(readFileSync(briefPath, 'utf-8'));

      // Validate section name matches
      if (brief.section.name !== opts.section) {
        console.warn(`⚠ Section name in brief ("${brief.section.name}") differs from --section ("${opts.section}"). Using brief's name.`);
      }

      // Load brand-data (optional)
      let brandData: BrandData | undefined;
      if (opts.brandData) {
        const brandPath = resolve(opts.brandData);
        if (!existsSync(brandPath)) {
          console.error(`❌ Brand-data file not found: ${brandPath}`);
          process.exit(1);
        }
        brandData = JSON.parse(readFileSync(brandPath, 'utf-8'));
      }

      // Load plan (optional - M5)
      let plan: Plan | undefined;
      if (opts.plan) {
        const planPath = resolve(opts.plan);
        if (!existsSync(planPath)) {
          console.error(`❌ Plan file not found: ${planPath}`);
          process.exit(1);
        }
        const rawPlan = JSON.parse(readFileSync(planPath, 'utf-8'));
        const planValidation = PlanSchema.safeParse(rawPlan);
        if (!planValidation.success) {
          console.error(`❌ Invalid plan.json: ${planValidation.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
          process.exit(1);
        }
        plan = planValidation.data;
      }

      // Output directory
      const outDir = resolve(opts.out);

      // C2.4: references are soft, capped-at-5 inputs — wired for real
      // (was a no-op in Phase 0). loadReferences validates paths/formats;
      // the injection-safety screen runs unconditionally inside runLoop.
      const refs = opts.refs ? loadReferences(opts.refs as string[]) : undefined;

      console.log('\n🚀 ADE Generate');
      console.log(`   Brief: ${briefPath}`);
      console.log(`   Section: ${brief.section.name}`);
      console.log(`   Output: ${outDir}`);
      console.log(`   Provider: ${cfg.provider} (${cfg.modelId})`);
      console.log(`   Variations: ${cfg.variations}`);
      console.log(`   Max iters: ${cfg.maxIters}`);
      console.log(`   Threshold: ${cfg.threshold}`);
      if (refs && refs.length > 0) {
        console.log(`   References: ${refs.length}`);
      }
      console.log('');

      // Run the loop
      const result = await runLoop(cfg, brief, brandData, plan, outDir, briefPath, undefined, undefined, undefined, refs);

      // Exit code per spec
      switch (result.state) {
        case 'APPROVED':
          process.exit(0);
        case 'ESCALATED':
          process.exit(2);
        case 'ABORTED':
          process.exit(3);
      }
    } catch (err) {
      console.error('❌ Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ─── report ────────────────────────────────────────────────────────

program
  .command('report')
  .description('Generate a report from trace.jsonl')
  .option('--out <dir>', 'Run output directory')
  .option('--all <dir>', 'Scan all run directories under this path')
  .option('--threshold <n>', 'Calibration threshold (0-100)', '80')
  .action(async (opts) => {
    try {
      const threshold = parseNumberOption(opts.threshold, 'threshold');
      if (opts.out) {
        generateReport(resolve(opts.out), false, threshold);
      } else if (opts.all) {
        generateReport(resolve(opts.all), true, threshold);
      } else {
        console.error('❌ Specify --out <dir> or --all <dir>');
        process.exit(1);
      }
    } catch (err) {
      console.error('❌ Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ─── Control Arm ───────────────────────────────────────────────────────

program
  .command('control')
  .description('Run the control arm: generate a matched-compute blind candidate set (M1)')
  .requiredOption('--brief <path>', 'Path to brief JSON file')
  .requiredOption('--section <name>', 'Section name (e.g. hero)')
  .requiredOption('--out <dir>', 'Output directory')
  .option('--brand-data <path>', 'Path to brand-data JSON file')
  .option('--plan <path>', 'Path to plan JSON file (M5)')
  .option('--variations <n>', 'Candidates per iteration', '1')
  .option('--max-iters <n>', 'Max loop iterations', '4')
  .option('--threshold <n>', 'Pass score (0-100)', '80')
  .option('--model <id>', 'Model ID')
  .action(async (opts) => {
    try {
      const cfg = buildConfig({
        model: opts.model,
        variations: opts.variations ? parseInt(opts.variations) : undefined,
        maxIters: opts.maxIters ? parseInt(opts.maxIters) : undefined,
        threshold: opts.threshold ? parseInt(opts.threshold) : undefined,
      });

      const briefPath = resolve(opts.brief);
      if (!existsSync(briefPath)) {
        console.error(`❌ Brief file not found: ${briefPath}`);
        process.exit(1);
      }
      const brief: Brief = JSON.parse(readFileSync(briefPath, 'utf-8'));

      let brandData: BrandData | undefined;
      if (opts.brandData) {
        brandData = JSON.parse(readFileSync(resolve(opts.brandData), 'utf-8'));
      }

      let plan: Plan | undefined;
      if (opts.plan) {
        const rawPlan = JSON.parse(readFileSync(resolve(opts.plan), 'utf-8'));
        const planValidation = PlanSchema.safeParse(rawPlan);
        if (!planValidation.success) {
          console.error(`❌ Invalid plan.json: ${planValidation.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
          process.exit(1);
        }
        plan = planValidation.data;
      }

      const outDir = resolve(opts.out);

      console.log('\n🚀 ADE Control Arm');
      console.log(`   Output: ${outDir}`);

      // Run the control loop (M1) - passes a special control mode flag
      const result = await runLoop({ ...cfg, control_mode: true } as any, brief, brandData, plan, outDir, briefPath);

      if (result.state === 'APPROVED') {
        process.exit(0);
      } else {
        process.exit(2);
      }
    } catch (e: any) {
      console.error('Fatal error:', e.message);
      process.exit(1);
    }
  });

// ─── Verdict Capture ───────────────────────────────────────────────

program
  .command('verdict')
  .description('Record a human approve/reject verdict for Critic calibration')
  .requiredOption('--out <dir>', 'Run output directory')
  .option('--decision <decision>', 'Human decision: approve or reject (required unless --retest/--retest-freeze)')
  .option('--rating <rating>', 'Human rating: bad, weak, good, or strong')
  .option('--notes <text>', 'Human notes for rubric calibration')
  .option('--run-id <id>', 'Run id (defaults to trace.jsonl)')
  .option('--section <name>', 'Section name/id (defaults to trace.jsonl)')
  .option('--candidate-id <id>', 'Candidate id (defaults to final trace record)')
  .option('--critic-score <n>', 'Critic score being judged')
  .option('--critic-verdict <verdict>', 'Critic verdict: pass or fail')
  .option('--threshold <n>', 'Threshold used by the Critic')
  .option('--reviewer <name>', 'Reviewer name')
  .option('--preferred <pick>', 'iter0, final, or control_best')
  .option('--retest', 'Quarterly retest ritual (E0.7/M13): re-present the frozen case set blind and report self-agreement against the baseline')
  .option('--retest-freeze <manifest>', 'Freeze a NEW retest baseline from a case manifest JSON ([{case_id, run_id, section, iter0_shots_dir, final_shots_dir}]) — captured blind, refuses to run if a baseline already exists at --out')
  .option('--rejected-with-interest', 'Flag as rejected with interest')
  .option('--dist-tags <json>', 'JSON string of dist_tags')
  .action(async (opts) => {
    try {
      const outDir = resolve(opts.out);

      if (opts.retestFreeze) {
        const manifestPath = resolve(opts.retestFreeze);
        if (!existsSync(manifestPath)) {
          console.error(`Error: retest manifest not found: ${manifestPath}`);
          process.exit(1);
        }
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as {
          case_id: string;
          run_id: string;
          section: string;
          iter0_shots_dir: string;
          final_shots_dir: string;
        }[];
        const cases: RetestCase[] = [];
        for (const m of manifest) {
          console.log(`\n📋 Capturing BASELINE for case "${m.case_id}" (this rating is frozen — it will be compared against later, not shown again until retest time)`);
          const baselineEntry = await captureVerdict(m.run_id, m.section, m.iter0_shots_dir, m.final_shots_dir, join(outDir, 'retest-baseline-verdicts.jsonl'));
          cases.push({
            case_id: m.case_id,
            run_id: m.run_id,
            section: m.section,
            iter0_shots_dir: m.iter0_shots_dir,
            final_shots_dir: m.final_shots_dir,
            baseline_rating: baselineEntry.rating,
            baseline_preferred: baselineEntry.preferred === 'iter0' ? 'iter0' : 'final',
            baseline_reviewer: opts.reviewer,
            baseline_captured_at: baselineEntry.timestamp,
          });
        }
        const set = freezeRetestBaseline(outDir, cases);
        console.log(`\n✅ Retest baseline frozen: ${set.cases.length} case(s) at ${retestSetPath(outDir)} (${set.frozen_at}).`);
        console.log(`   Run \`ade verdict --out ${opts.out} --retest\` later (e.g. quarterly) to measure self-agreement.`);
        return;
      }

      if (opts.retest) {
        const result = await runRetest(outDir, join(outDir, `retest-verdicts-${new Date().toISOString().replace(/[:.]/g, '-')}.jsonl`));
        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`  RETEST SELF-AGREEMENT — ${result.total} case(s)`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        for (const c of result.perCase) {
          console.log(`  ${c.ratingAgreed ? '✅' : '❌'} ${c.caseId}: baseline=${c.baselineRating} retest=${c.retestRating}${c.ratingAgreed ? '' : ' (DISAGREEMENT)'}`);
        }
        console.log(`\n  Rating agreement:    ${result.ratingAgreement}/${result.total} (${(result.agreementRate * 100).toFixed(0)}%)`);
        console.log(`  Preferred agreement: ${result.preferredAgreement}/${result.total}`);
        console.log(`\n  This is an OBSERVED, human-recollected measurement (I12) — not predicted or estimated.\n`);
        return;
      }

      const records = readTrace(outDir);
      const traceRecord = opts.candidateId ? records.find((record) => record.candidate_id === opts.candidateId) : records[records.length - 1];
      if (!opts.decision) {
        console.error('Error: --decision is required unless --retest or --retest-freeze is used.');
        process.exit(1);
      }
      const decision = parseDecision(opts.decision);
      const rating = opts.rating ? parseRating(opts.rating) : undefined;
      const criticVerdict = opts.criticVerdict ? parseCriticVerdict(opts.criticVerdict) : traceRecord?.verdict;
      const criticScore = opts.criticScore !== undefined ? parseNumberOption(opts.criticScore, 'critic-score') : traceRecord?.scores.weighted_total;
      const threshold = opts.threshold !== undefined ? parseNumberOption(opts.threshold, 'threshold') : undefined;
      const runId = opts.runId ?? traceRecord?.run_id;
      const section = opts.section ?? traceRecord?.section_id;

      if (!runId || !section) {
        console.error('Error: could not infer --run-id and --section from trace.jsonl. Provide them explicitly.');
        process.exit(1);
      }

      // Auto-derive distTags from trace if omitted (E0.6 — the corpus is only
      // future-proof if tagged from the first verdict, F-MOD-07/08). Uses the
      // real per-role ids the orchestrator now records (C0.16 fix) instead of
      // guessing criticModelId from the shared model_id field.
      const distTags = opts.distTags
        ? JSON.parse(opts.distTags)
        : traceRecord
          ? {
              genModelId: traceRecord.gen_model_id ?? traceRecord.model_id,
              criticModelId: traceRecord.critic_model_id ?? traceRecord.model_id,
              configVersion: '1.2.0',
              systemSnapshot: 'HEAD',
            }
          : undefined;

      const entry = recordHumanVerdict(outDir, {
        runId,
        section,
        decision,
        rating,
        preferred: opts.preferred as any,
        notes: opts.notes,
        candidateId: opts.candidateId ?? traceRecord?.candidate_id,
        criticScore,
        criticVerdict,
        threshold,
        reviewer: opts.reviewer,
        source: 'approval',
        rejectedWithInterest: opts.rejectedWithInterest,
        distTags,
      });

      console.log(`Recorded ${entry.human_verdict} verdict for ${entry.run_id}/${entry.section}.`);
      console.log(`Saved to ${outDir}\\verdicts.jsonl`);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

const design = program.command('design').description('Design workflows: brand foundation, sections, sites, and Library learning');

design
  .command('brand')
  .description('Derive, re-derive, or approve a frozen Brand Foundation')
  .requiredOption('--client <id>', 'Client id')
  .option('--context <path>', 'Brief JSON used as business context')
  .option('--brand-data <path>', 'BrandData JSON file with provided palette/type')
  .option('--approve', 'Approve and freeze the current brand draft')
  .option('--approved-by <name>', 'Approver name for --approve', 'human')
  .option('--rederive', 'Re-derive from changed brand-data/context')
  .option('--directions', 'Derive 2-3 distinct, justified brand directions and select the best-reviewed one (C1.2)')
  .option('--model <id>', 'Model ID')
  .action(async (opts) => {
    try {
      if (opts.approve) {
        const frozen = approveBrand(opts.client, opts.approvedBy);
        console.log(JSON.stringify(frozen, null, 2));
        return;
      }

      if (!opts.context || !opts.brandData) {
        console.error('Error: design brand requires --context and --brand-data unless --approve is used.');
        process.exit(1);
      }

      const cfg = buildConfig({ model: opts.model });
      const brief = loadBrief(opts.context);
      const brandData = loadBrandData(opts.brandData);

      if (brandData.client_id !== opts.client) {
        console.error(`Error: brand-data client_id "${brandData.client_id}" does not match --client "${opts.client}".`);
        process.exit(1);
      }

      const genProvider = await getProviderForRole(cfg, 'generator');
      const criticProvider = await getProviderForRole(cfg, 'critic');
      const existing = readBrand(opts.client);
      if (existing && !opts.rederive) {
        console.error(`Error: brand for "${opts.client}" already exists. Use --rederive to create a new draft version or --approve to freeze it.`);
        process.exit(1);
      }

      // C1.3: Phase-Exit Review (fresh-context Critic + cross-family second
      // judge, bounded ≤2 tries, re-derive on failure — never hand-patch)
      // BEFORE the human ever sees the derived brand.
      const outDir = join('.', 'projects', opts.client, 'brand-review');
      let foundation: BrandFoundation, tries: number, finalVerdict: { verdict: 'pass' | 'fail'; reasoning: string };
      if (opts.directions) {
        // C1.2: 2-3 distinct directions, each independently reviewed; the
        // best-passing one is selected (full-set re-derivation on total
        // rejection, never a hand-patch of one).
        const result = await reviewAndSelectBrandDirection(opts.client, brandData, brief, criticProvider, genProvider, outDir);
        foundation = result.foundation;
        tries = result.tries;
        finalVerdict = result.finalVerdict;
        console.log(`\nDirections considered (${result.allDirections.length}):`);
        for (const { direction, review } of result.allDirections) {
          const marker = direction.label === result.direction.label ? '→ SELECTED' : '  ';
          console.log(`  ${marker} "${direction.label}" [${review.verdict}]: ${direction.rationale}`);
        }
      } else {
        const result = await reviewAndReDeriveBrand(opts.client, brandData, brief, criticProvider, genProvider, outDir);
        foundation = result.foundation;
        tries = result.tries;
        finalVerdict = result.finalVerdict;
      }

      if (opts.rederive) {
        const newVersion = existing ? existing.version + 1 : 1;
        foundation.version = newVersion;
        foundation.provenance.derived_from = `brand-data v${newVersion} + brief (${brief.client} / ${brief.industry})`;
        writeBrand(opts.client, foundation, existing ? existing.version : null);
        console.log(JSON.stringify(foundation, null, 2));
        console.log(`Brand re-derived for "${opts.client}" -> v${newVersion} (draft). Reviewed ${tries} time(s), final verdict: ${finalVerdict.verdict}.`);
      } else {
        saveBrandDraft(opts.client, foundation);
        console.log(JSON.stringify(foundation, null, 2));
        console.log(`Brand draft saved for "${opts.client}" (v${foundation.version}). Reviewed ${tries} time(s), final verdict: ${finalVerdict.verdict}. Run design brand --client ${opts.client} --approve when ready.`);
      }
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('section')
  .description('Design one section against a frozen brand and optional frozen PDS')
  .requiredOption('--client <id>', 'Client id')
  .option('--surface <surface>', 'Surface: website or product', 'website')
  .requiredOption('--name <name>', 'Section name')
  .requiredOption('--content <path>', 'Brief JSON for this section')
  .option('--brand-data <path>', 'Optional BrandData JSON fallback for Phase 0-style palette/type')
  .option('--variations <n>', 'Candidates per iteration')
  .option('--max-iters <n>', 'Max loop iterations')
  .option('--threshold <n>', 'Pass score (0-100)')
  .option('--model <id>', 'Model ID')
  .option('--production', 'Enable production readiness checks')
  .option('--harness <type>', 'Render harness: vite or next')
  .option('--autonomy-rung <n>', 'Requested autonomy rung (0-4)')
  .option('--max-tokens-per-section <n>', 'Production token cap per section')
  .option('--max-seconds-per-section <n>', 'Production latency cap per section')
  .option('--max-usd-per-section <n>', 'Production spend cap per section')
  .option('--headed', 'Show the browser while rendering')
  .action(async (opts) => {
    try {
      const surface = parseSurface(opts.surface);
      const cfg = buildConfig({
        model: opts.model,
        variations: opts.variations ? parseInt(opts.variations, 10) : undefined,
        maxIters: opts.maxIters ? parseInt(opts.maxIters, 10) : undefined,
        threshold: opts.threshold ? parseInt(opts.threshold, 10) : undefined,
        productionMode: opts.production,
        harness: opts.harness ? parseHarness(opts.harness) : undefined,
        autonomyRung: opts.autonomyRung ? parseAutonomyRung(opts.autonomyRung) : undefined,
        maxTokensPerSection: opts.maxTokensPerSection ? parseIntegerOption(opts.maxTokensPerSection, 'max-tokens-per-section') : undefined,
        maxSecondsPerSection: opts.maxSecondsPerSection ? parseNumberOption(opts.maxSecondsPerSection, 'max-seconds-per-section') : undefined,
        maxUsdPerSection: opts.maxUsdPerSection ? parseNumberOption(opts.maxUsdPerSection, 'max-usd-per-section') : undefined,
        headed: opts.headed,
      });

      const briefPath = resolve(opts.content);
      const brief = loadBrief(briefPath);
      if (brief.section.name !== opts.name) {
        console.warn(`Section name in brief ("${brief.section.name}") differs from --name ("${opts.name}"). Using brief's name.`);
      }

      const brand = readBrand(opts.client);
      if (!brand || brand.status !== 'frozen') {
        console.error(`Error: frozen brand for "${opts.client}" not found. Run design brand --client ${opts.client} --approve first.`);
        process.exit(1);
      }

      const brandData = opts.brandData ? loadBrandData(opts.brandData) : undefined;
      const pds = readPDS(opts.client, surface) ?? undefined;
      const artifact = readArtifact(opts.client, surface);
      const ctxShots = artifact?.sections.flatMap((section) =>
        Object.entries(section.screenshots).map(([breakpoint, path]) => ({
          sectionName: section.name,
          breakpoint,
          path,
        })),
      );
      const outDir = getSectionRunDir(opts.client, surface, brief.section.name);

      const result = await runSectionLoop(cfg, brief, brandData, outDir, briefPath, brand, pds, ctxShots && ctxShots.length > 0 ? ctxShots : undefined);

      upsertSectionArtifact(opts.client, surface, brief.section.name, result);

      if (!pds && result.state === 'APPROVED' && result.finalTsx) {
        const provider = await getProvider(cfg);
        await crystallize(result.finalTsx, brief.section.name, brand, opts.client, surface, provider);
      }

      process.exit(result.state === 'APPROVED' ? 0 : result.state === 'ESCALATED' ? 2 : 3);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('strategy')
  .description('E2.4: generate a Strategy/IA site plan (narrative + per-section goals) upstream of section generation, Phase-Exit-Reviewed')
  .requiredOption('--brief <path>', 'Brief JSON (client/industry/audience/goal — any one section brief works)')
  .requiredOption('--out <path>', 'Where to write the resulting site-strategy JSON')
  .option('--model <id>', 'Model ID')
  .action(async (opts) => {
    try {
      const cfg = buildConfig({ model: opts.model });
      const brief = loadBrief(opts.brief);
      const genProvider = await getProviderForRole(cfg, 'generator');
      const criticProvider = await getProviderForRole(cfg, 'critic');
      const runId = randomUUID().slice(0, 8);
      const reviewOutDir = join(dirname(resolve(opts.out)), 'strategy-review');

      const { plan, tries, finalVerdict } = await generateStrategyPlan(brief, genProvider, criticProvider, reviewOutDir, runId);
      writeSitePlan(resolve(opts.out), plan);

      console.log(JSON.stringify(plan, null, 2));
      console.log(`Strategy plan for "${brief.client}" written to ${resolve(opts.out)} (status: ${plan.status}). Reviewed ${tries} time(s), final verdict: ${finalVerdict.verdict}.`);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('site')
  .description('Sequence multiple sections from a site plan')
  .requiredOption('--client <id>', 'Client id')
  .option('--surface <surface>', 'Surface: website or product', 'website')
  .requiredOption('--plan <path>', 'Site plan JSON (section-brief manifest)')
  .option('--strategy <path>', 'E2.4: Strategy/IA site plan JSON (from `design strategy`) — per-section goals folded into each section brief as guidance')
  .option('--variations <n>', 'Candidates per iteration')
  .option('--max-iters <n>', 'Max loop iterations')
  .option('--threshold <n>', 'Pass score (0-100)')
  .option('--model <id>', 'Model ID')
  .option('--production', 'Enable production readiness checks')
  .option('--harness <type>', 'Render harness: vite or next')
  .option('--autonomy-rung <n>', 'Requested autonomy rung (0-4)')
  .option('--max-tokens-per-section <n>', 'Production token cap per section')
  .option('--max-seconds-per-section <n>', 'Production latency cap per section')
  .option('--max-usd-per-section <n>', 'Production spend cap per section')
  .option('--headed', 'Show the browser while rendering')
  .action(async (opts) => {
    try {
      const surface = parseSurface(opts.surface);
      const cfg = buildConfig({
        model: opts.model,
        variations: opts.variations ? parseInt(opts.variations, 10) : undefined,
        maxIters: opts.maxIters ? parseInt(opts.maxIters, 10) : undefined,
        threshold: opts.threshold ? parseInt(opts.threshold, 10) : undefined,
        productionMode: opts.production,
        harness: opts.harness ? parseHarness(opts.harness) : undefined,
        autonomyRung: opts.autonomyRung ? parseAutonomyRung(opts.autonomyRung) : undefined,
        maxTokensPerSection: opts.maxTokensPerSection ? parseIntegerOption(opts.maxTokensPerSection, 'max-tokens-per-section') : undefined,
        maxSecondsPerSection: opts.maxSecondsPerSection ? parseNumberOption(opts.maxSecondsPerSection, 'max-seconds-per-section') : undefined,
        maxUsdPerSection: opts.maxUsdPerSection ? parseNumberOption(opts.maxUsdPerSection, 'max-usd-per-section') : undefined,
        headed: opts.headed,
      });

      let sections = loadSitePlan(opts.plan);

      if (opts.strategy) {
        const strategyPlan = readSitePlan(resolve(opts.strategy));
        if (!strategyPlan) {
          console.error(`Error: strategy plan not found: ${resolve(opts.strategy)}`);
          process.exit(1);
        }
        sections = applyStrategyToSections(sections, strategyPlan);
        console.log(`Applied Strategy/IA guidance from ${resolve(opts.strategy)} to ${sections.length} section(s).`);
      }

      const { artifact, results } = await runSiteLoop(cfg, opts.client, surface, sections);
      console.log(`Site run complete for ${opts.client}/${surface}: ${artifact.status}`);
      console.log(`Sections: ${artifact.sections.length}; states: ${results.map((r) => r.state).join(', ')}`);
      process.exit(results.every((r) => r.state === 'APPROVED') ? 0 : 2);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('qa')
  .description('Run whole-artifact and optional cross-surface QA')
  .requiredOption('--client <id>', 'Client id')
  .option('--surface <surface>', 'Surface: website or product', 'website')
  .option('--threshold <n>', 'Pass score (0-100)', '80')
  .option('--cross-surface', 'Also check website/product brand reuse')
  .action((opts) => {
    try {
      const surface = parseSurface(opts.surface);
      const threshold = parseNumberOption(opts.threshold, 'threshold');
      const brand = readBrand(opts.client);
      const artifact = readArtifact(opts.client, surface);
      const pds = readPDS(opts.client, surface);

      if (!artifact) {
        console.error(`Error: artifact not found for ${opts.client}/${surface}.`);
        process.exit(1);
      }

      const report = runWholeArtifactQA(artifact, brand, pds, { threshold });
      writeArtifactQA(opts.client, surface, report);
      printQAReport(report);

      if (opts.crossSurface) {
        if (!brand) {
          console.error(`Error: frozen brand not found for ${opts.client}.`);
          process.exit(1);
        }
        const artifacts = (['website', 'product'] as const).map((s) => readArtifact(opts.client, s)).filter((value): value is Artifact => value !== null);
        const systems = (['website', 'product'] as const).map((s) => readPDS(opts.client, s)).filter((value): value is ProjectDesignSystem => value !== null);
        const cross = runCrossSurfaceBrandQA(brand, artifacts, systems);
        console.log(`Cross-surface QA: ${cross.pass ? 'pass' : 'fail'} (${cross.violations.length} issue(s))`);
        for (const violation of cross.violations) {
          console.log(`- [${violation.severity}] ${violation.rule}: ${violation.message}`);
        }
      }

      process.exit(report.pass ? 0 : 2);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('autonomy')
  .description('Evaluate the earned autonomy rung from human calibration data')
  .option('--out <dir>', 'Run output directory')
  .option('--all <dir>', 'Scan run directories under this path')
  .option('--requested-rung <n>', 'Requested autonomy rung (0-4)', '0')
  .option('--current-rung <n>', 'Current autonomy rung (0-4)', '0')
  .option('--threshold <n>', 'Calibration threshold (0-100)', '80')
  .action((opts) => {
    try {
      const records: RunRecord[] = [];
      const verdicts: VerdictEntry[] = [];

      if (opts.out) {
        records.push(...readTrace(resolve(opts.out)));
        verdicts.push(...readVerdicts(resolve(opts.out)));
      } else if (opts.all) {
        for (const runDir of collectTraceDirs(resolve(opts.all))) {
          records.push(...readTrace(runDir));
          verdicts.push(...readVerdicts(runDir));
        }
      } else {
        console.error('Error: specify --out <dir> or --all <dir>.');
        process.exit(1);
      }

      const threshold = parseNumberOption(opts.threshold, 'threshold');
      const requestedRung = parseAutonomyRung(opts.requestedRung);
      const currentRung = parseAutonomyRung(opts.currentRung);
      const summary = calibrateFromRecords(records, verdicts, threshold);
      const policy = recommendAutonomyPolicy(summary, requestedRung, currentRung);

      console.log(formatAutonomyPolicy(policy));
      console.log(`Calibration verdicts: ${summary.total}`);
      console.log(`Agreement: ${(summary.recommendedAccuracy * 100).toFixed(0)}%; false-pass rate: ${(summary.falsePassRate * 100).toFixed(0)}%`);

      // C3.2: audit miss-rate
      if (summary.auditMissRate > 0) {
        console.log(`Standing audit miss-rate: ${(summary.auditMissRate * 100).toFixed(0)}%`);
      }

      // C3.3: inter-rater agreement
      if (verdicts.some((v) => v.reviewer)) {
        const irr = computeInterRaterAgreement(verdicts);
        console.log('');
        console.log(formatInterRaterReport(irr));

        const stamps = detectRubberStamps(verdicts);
        if (stamps.length > 0) {
          console.log('');
          console.log('⚠ Rubber-stamp alerts:');
          for (const alert of stamps) {
            console.log(`  ${alert.reviewer}: ${alert.reasons.join('; ')}`);
          }
        }
      }
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('learn')
  .description('Write approved artifact patterns back to the soft Library')
  .requiredOption('--client <id>', 'Client id')
  .option('--surface <surface>', 'Surface: website or product', 'website')
  .option('--brief <path...>', 'Brief JSON files for approved sections')
  .option('--human-verdict <text>', 'Human verdict summary', 'approved')
  .option('--skip-review', 'Skip the C2.5 abstraction-altitude / strategic-specificity Phase-Exit Review (NOT recommended — every entry inserted without it is unreviewed)')
  .option('--model <id>', 'Model ID')
  .action(async (opts) => {
    try {
      const surface = parseSurface(opts.surface);
      const cfg = buildConfig({ model: opts.model });
      const artifact = readArtifact(opts.client, surface);
      if (!artifact) {
        console.error(`Error: artifact not found for ${opts.client}/${surface}.`);
        process.exit(1);
      }

      const briefs = Array.isArray(opts.brief) ? opts.brief.map((briefPath: string) => loadBrief(briefPath)) : undefined;

      // C2.5: wired by DEFAULT — the review was previously reachable in code
      // but never invoked from the actual write-back command, so every
      // real Library entry ever inserted skipped it. --skip-review is an
      // explicit, named opt-out for when it's genuinely wanted, not a
      // silent default.
      const criticProvider = opts.skipReview ? undefined : await getProviderForRole(cfg, 'critic');
      const reviewOutDir = opts.skipReview ? undefined : join('.', 'projects', opts.client, 'writeback-review');

      const entries = await writeBackArtifact(cfg, {
        artifact,
        briefs,
        brand: readBrand(opts.client),
        pds: readPDS(opts.client, surface),
        humanVerdict: opts.humanVerdict,
        criticProvider,
        reviewOutDir,
      });

      console.log(`Learned ${entries.length} Library entr${entries.length === 1 ? 'y' : 'ies'} into ${getLibraryDir()}.`);
      for (const entry of entries) {
        console.log(`- ${entry.id}: ${entry.title}`);
      }
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('show')
  .description('Inspect client stores and Library state')
  .option('--client <id>', 'Client id')
  .option('--surface <surface>', 'Surface: website or product', 'website')
  .action((opts) => {
    try {
      const library = readLibrary();
      console.log(`Library: ${library.length} entries (${getLibraryDir()})`);
      if (!opts.client) return;

      const surface = parseSurface(opts.surface);
      const brand = readBrand(opts.client);
      const pds = readPDS(opts.client, surface);
      const artifact = readArtifact(opts.client, surface);
      const qa = readArtifactQA(opts.client, surface);
      console.log(`Brand: ${brand ? `${brand.status} v${brand.version}` : 'missing'}`);
      console.log(`PDS ${surface}: ${pds ? `${pds.status} v${pds.version}` : 'missing'}`);
      console.log(`Artifact ${surface}: ${artifact ? `${artifact.status}, ${artifact.sections.length} sections` : 'missing'}`);
      console.log(`QA ${surface}: ${qa ? `${qa.pass ? 'pass' : 'fail'}, ${qa.violations.length} issue(s)` : 'missing'}`);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('reembed')
  .description('C2.0: detect embedding-model drift in the Library, and re-embed all entries under the current model')
  .option('--check', 'Only report drift — do not re-embed')
  .action(async (opts) => {
    try {
      const cfg = buildConfig();
      const drift = detectEmbeddingModelDrift(cfg);
      console.log(`Library: ${drift.total} entries. Current embedding model: ${drift.currentModelId}.`);
      if (drift.stale === 0) {
        console.log('✅ No embedding-model drift — every entry matches the current model.');
        return;
      }
      console.log(`⚠ ${drift.stale} entr${drift.stale === 1 ? 'y is' : 'ies are'} stale (embedded with: ${drift.staleModelIds.join(', ')}).`);

      if (opts.check) {
        console.log('(--check: reporting only, no re-embed performed.)');
        return;
      }

      console.log(`Re-embedding all ${drift.total} entries under "${drift.currentModelId}"...`);
      const report = await reEmbedLibrary(cfg);
      console.log(`✅ Re-embedded ${report.reEmbedded}/${report.total} entries under "${report.newModelId}".`);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('curate-library')
  .description('C2.6: Run a periodic curation pass to evaluate older high-confidence entries in the Library')
  .action(async () => {
    try {
      const { buildConfig } = await import('./config.js');
      const { getProviderForRole } = await import('./model.js');
      const { runPeriodicCuration } = await import('./curation.js');

      const cfg = buildConfig();
      const provider = await getProviderForRole(cfg, 'critic');
      await runPeriodicCuration(provider);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

design
  .command('library-entropy')
  .description('C2.6: Report Library retrieval entropy (diversity metric based on times_used)')
  .action(async () => {
    try {
      const { readLibrary } = await import('./library.js');
      const entries = readLibrary().filter((e) => !e.retired);
      const totalUses = entries.reduce((sum, e) => sum + e.outcome.times_used, 0);

      if (totalUses === 0) {
        console.log(`Library entropy: 0.0 (No entries have been used yet).`);
        return;
      }

      let entropy = 0;
      for (const entry of entries) {
        if (entry.outcome.times_used > 0) {
          const p = entry.outcome.times_used / totalUses;
          entropy -= p * Math.log2(p);
        }
      }

      const maxEntropy = Math.log2(entries.length);
      console.log(`Library diversity entropy: ${entropy.toFixed(3)} bits (Max possible for ${entries.length} entries: ${maxEntropy.toFixed(3)} bits).`);
      if (maxEntropy > 0) {
        console.log(`Diversity score: ${((entropy / maxEntropy) * 100).toFixed(1)}%`);
      }
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program
  .command('benchmark')
  .description('Run benchmark suite (anchor-set assembly, bias-probes)')
  .requiredOption('--cases <dir>', 'Directory containing benchmark cases')
  .requiredOption('--model <id>', 'Primary model to benchmark')
  .option('--compare <id>', 'Secondary model for cross-model gap')
  .action(async (opts) => {
    try {
      const result = await runBenchmark(resolve(opts.cases), opts.model, opts.compare);
      console.log('\n============================================================');
      console.log(' Benchmark Results — ⚠ PLACEHOLDER, NOT REAL MEASUREMENTS ⚠');
      console.log('============================================================');
      console.log(`Refresh Date: ${result.refreshDate}`);

      if (result.benchmarkAgeDays !== undefined) {
        console.log(`Benchmark Age: ${result.benchmarkAgeDays.toFixed(0)} days`);
        if (result.benchmarkAgeDays > 90) {
          console.log('\x1b[1m\x1b[31m⚠ BENCHMARK STALE (Goodhart Risk) — Rotate held-out cases\x1b[0m');
        }
      }

      if (result.coreScore !== undefined && result.heldOutScore !== undefined) {
        console.log(`\nCore Score:       ${result.coreScore.toFixed(1)}`);
        console.log(`Held-out Score:   ${result.heldOutScore.toFixed(1)}`);
        console.log(`Transfer Gap:     ${result.transferGap?.toFixed(1)}`);
        console.log(`Discounted Score: ${result.discountedScore?.toFixed(1)}`);
      }

      console.log(`\nDistance from Anchor: ${result.distanceFromAnchor.toFixed(2)}`);
      console.log('Per-Stratum Agreement:');
      for (const [s, val] of Object.entries(result.perStratumAgreement)) {
        console.log(`  - ${s}: ${(val * 100).toFixed(0)}%`);
      }
      console.log('Probe Stability:');
      for (const p of result.probeStability) {
        console.log(`  - ${p.type}: ${(p.stabilityScore * 100).toFixed(0)}%`);
      }
      if (opts.compare) {
        console.log(`Model Agreement Gap: ${(result.modelAgreementGap * 100).toFixed(0)}%`);
      }
      console.log('');
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program
  .command('ablation')
  .description('E2.2/H6: run the three-arm Library ablation (No Library vs. Own-Client vs. Cross-Client) across matched briefs')
  .requiredOption('--briefs <path>', 'Manifest JSON: [{"brief": "path/to/brief.json"}, ...] — matched briefs to run under all three arms')
  .requiredOption('--out <dir>', 'Output directory for all ablation run artifacts')
  .option('--model <id>', 'Model ID')
  .action(async (opts) => {
    try {
      const cfg = buildConfig({ model: opts.model });
      const manifestPath = resolve(opts.briefs);
      if (!existsSync(manifestPath)) {
        console.error(`Error: ablation briefs manifest not found: ${manifestPath}`);
        process.exit(1);
      }
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as { brief: string }[];
      if (!Array.isArray(manifest) || manifest.length === 0) {
        console.error('Error: ablation briefs manifest must be a non-empty array of {"brief": "path"}.');
        process.exit(1);
      }
      const baseDir = dirname(manifestPath);
      const matchedBriefs = manifest.map((m) => {
        const briefPath = resolve(baseDir, m.brief);
        return { brief: loadBrief(briefPath), briefPath };
      });

      const samples = await runThreeArmAblation(cfg, matchedBriefs, resolve(opts.out));
      const summary = summarizeAblation(samples);
      console.log('\n' + formatH6Summary(summary));
      writeFileSync(join(resolve(opts.out), 'h6-summary.json'), JSON.stringify(summary, null, 2));
      process.exit(0);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

const escalationsCmd = program.command('escalations').description('Manage the Phase 1 escalation queue');

escalationsCmd
  .command('list')
  .description('List all open escalations')
  .requiredOption('--out <dir>', 'Output directory containing escalations.jsonl')
  .action((opts) => {
    try {
      const records = listEscalations(resolve(opts.out)).filter((r) => r.status === 'open');
      console.log(`Found ${records.length} open escalations in ${opts.out}:\n`);
      for (const r of records) {
        console.log(`[${r.id}] (${r.type}) Run: ${r.runId}`);
        console.log(`  Q: ${r.question}\n`);
      }
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

escalationsCmd
  .command('answer')
  .description('Answer a specific escalation')
  .requiredOption('--out <dir>', 'Output directory containing escalations.jsonl')
  .requiredOption('--id <esc_id>', 'The ID of the escalation to answer')
  .requiredOption('--answer <text>', 'Your text answer')
  .action((opts) => {
    try {
      answerEscalation(resolve(opts.out), opts.id, opts.answer);
      console.log(`Successfully answered escalation ${opts.id}`);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// ─── Phase E3 Commands ───────────────────────────────────────────────

program
  .command('rlaif')
  .description('Generate RLAIF preference labels for a completed run')
  .requiredOption('--out <dir>', 'Output directory of the run')
  .requiredOption('--run-id <id>', 'Run ID to process')
  .action(async (opts) => {
    try {
      const outDir = resolve(opts.out);
      // Mock loading primary critic output
      const labels = await generatePreferenceLabels(outDir, opts.runId, { candidates: [], ranking: ['cand1', 'cand2'] });
      console.log(`Generated ${labels.length} preference labels.`);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program
  .command('rlaif:export')
  .description('Export accumulated verdicts as a pairwise JSONL dataset for DPO reward model training')
  .requiredOption('--verdicts-dir <dir>', 'Directory containing human verdicts.json files')
  .requiredOption('--out <file>', 'Output JSONL file path')
  .option('--budget <tokens>', 'Maximum tokens to budget for the dataset', '50000')
  .action((opts) => {
    try {
      const budget = parseInt(opts.budget, 10);
      const count = exportRLAIFDataset(resolve(opts.verdictsDir), resolve(opts.out), budget);
      console.log(`Successfully exported ${count} pairs for reward model distillation (budget: ${budget} tokens).`);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

const successionCmd = program.command('succession').description('Succession playbook commands');

successionCmd
  .command('run')
  .description('Run judge distillation experiment for model swap')
  .requiredOption('--old-model <id>', 'Old model ID')
  .requiredOption('--new-model <id>', 'New model ID')
  .action(async (opts) => {
    try {
      const provider = await getProvider(buildConfig({ model: opts.newModel }));
      await executeSuccessionPlaybook(opts.oldModel, opts.newModel, provider, []);
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program
  .command('selfaudit')
  .description('Run periodic self-audit over trace and verdict data')
  .requiredOption('--out <dir>', 'Output directory to scan')
  .action((opts) => {
    try {
      runSelfAudit(resolve(opts.out));
    } catch (err) {
      console.error('Error:', err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program
  .command('integrity')
  .description('Scan all hard stores for dangling references (C1.0 — brand/PDS/artifact referential integrity)')
  .action(() => {
    const issues = integrityScan();
    if (issues.length === 0) {
      console.log('✅ Integrity scan: no dangling references found.');
      return;
    }
    console.error(`\n❌ Integrity scan found ${issues.length} issue(s):\n`);
    for (const issue of issues) {
      console.error(`  [${issue.rule}] ${issue.clientId}${issue.surface ? `/${issue.surface}` : ''}: ${issue.message}`);
    }
    process.exit(1);
  });

import { runPhase3ExitGate } from './exitgate-phase3.js';

program
  .command('prove-taste-calibration')
  .description('Phase 3 Exit Gate (H3/H8): Prove pairwise > absolute and upward agreement trend')
  .action(async () => {
    try {
      const report = await runPhase3ExitGate();
      console.log('\n========================================');
      console.log(' Phase 3 Exit Gate Report ');
      console.log('========================================');
      console.log(`H8 (Pairwise Beats Absolute):   ${report.h8_pairwise_beats_absolute ? '✅ PASS' : '❌ FAIL'} (${(report.metrics.pairwise_accuracy * 100).toFixed(1)}% vs ${(report.metrics.absolute_accuracy * 100).toFixed(1)}%)`);
      console.log(`H3 (Upward Agreement Trend):    ${report.h3_agreement_trending_up ? '✅ PASS' : '❌ FAIL'} (Final: ${(report.metrics.agreement_trend[report.metrics.agreement_trend.length - 1] * 100).toFixed(1)}%)`);
      console.log(`Overall Pass:                   ${report.pass ? '✅ YES' : '❌ NO'}`);
      console.log('========================================\n');
      process.exit(report.pass ? 0 : 2);
    } catch (err: any) {
      console.error('\n❌ Exit gate check failed:', err.message);
      process.exit(1);
    }
  });

import { runPhase4ExitGate } from './exitgate.js';

program
  .command('prove-ship-readiness')
  .description('Phase 4 Exit Gate: Prove unattended system readiness (H1, H2, H4, benchmark gain)')
  .action(async () => {
    try {
      const report = await runPhase4ExitGate();
      console.log('\n========================================');
      console.log(' Phase 4 Exit Gate Report ');
      console.log('========================================');
      console.log(`(a) Deterministic Floor:        ${report.deterministic_floor_passed ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`(b) H1 Improves via Critic:     ${report.h1_improves_across_iterations ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`(c) H2 Human Agrees (≥50%):     ${report.h2_human_rates_good_or_close ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`(d) H4 Zero Token Drift:        ${report.h4_zero_token_drift ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`(e) Measured Benchmark Gain:    ${report.measured_benchmark_gain ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`\nOverall Readiness:              ${report.pass ? '✅ READY TO SHIP' : '❌ NOT READY'}`);
      console.log('========================================\n');
      process.exit(report.pass ? 0 : 2);
    } catch (err: any) {
      console.error('\n❌ Ship readiness check failed:', err.message);
      process.exit(1);
    }
  });

program.parse();

function loadBrief(path: string): Brief {
  const filePath = resolve(path);
  if (!existsSync(filePath)) {
    throw new Error(`Brief file not found: ${filePath}`);
  }
  const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
  const result = BriefSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Invalid brief: ${result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  }
  return result.data;
}

function loadBrandData(path: string): BrandData {
  const filePath = resolve(path);
  if (!existsSync(filePath)) {
    throw new Error(`Brand-data file not found: ${filePath}`);
  }
  const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
  const result = BrandDataSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Invalid brand-data: ${result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  }
  return result.data;
}

function parseSurface(surface: string): Surface {
  if (surface !== 'website' && surface !== 'product') {
    throw new Error(`Invalid surface "${surface}". Expected website or product.`);
  }
  return surface;
}

function parseNumberOption(value: string, name: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${name}: "${value}" is not a number.`);
  }
  return parsed;
}

function parseIntegerOption(value: string, name: string): number {
  const parsed = parseNumberOption(value, name);
  if (!Number.isInteger(parsed)) {
    throw new Error(`Invalid ${name}: "${value}" is not an integer.`);
  }
  return parsed;
}

function parseHarness(value: string): 'vite' | 'next' {
  if (value !== 'vite' && value !== 'next') {
    throw new Error(`Invalid harness "${value}". Expected vite or next.`);
  }
  return value;
}

function parseAutonomyRung(value: string | number): AutonomyRung {
  const parsed = typeof value === 'number' ? value : parseIntegerOption(value, 'autonomy-rung');
  if (parsed < 0 || parsed > 4) {
    throw new Error(`Invalid autonomy rung "${value}". Expected 0, 1, 2, 3, or 4.`);
  }
  return parsed as AutonomyRung;
}

function parseDecision(decision: string): 'approve' | 'reject' {
  if (decision !== 'approve' && decision !== 'reject') {
    throw new Error(`Invalid decision "${decision}". Expected approve or reject.`);
  }
  return decision;
}

function parseRating(rating: string): 'bad' | 'weak' | 'good' | 'strong' {
  if (rating !== 'bad' && rating !== 'weak' && rating !== 'good' && rating !== 'strong') {
    throw new Error(`Invalid rating "${rating}". Expected bad, weak, good, or strong.`);
  }
  return rating;
}

function parseCriticVerdict(verdict: string): 'pass' | 'fail' {
  if (verdict !== 'pass' && verdict !== 'fail') {
    throw new Error(`Invalid critic verdict "${verdict}". Expected pass or fail.`);
  }
  return verdict;
}

function loadSitePlan(planPath: string): { name: string; brief: Brief; briefPath: string; brandData?: BrandData }[] {
  const absolutePlan = resolve(planPath);
  if (!existsSync(absolutePlan)) {
    throw new Error(`Site plan not found: ${absolutePlan}`);
  }

  const plan = JSON.parse(readFileSync(absolutePlan, 'utf-8')) as {
    sections?: { name?: string; brief?: string; content?: string; brandData?: string; brand_data?: string }[];
  };

  if (!Array.isArray(plan.sections) || plan.sections.length === 0) {
    throw new Error('Site plan must contain a non-empty sections array.');
  }

  const baseDir = dirname(absolutePlan);
  return plan.sections.map((section, index) => {
    const briefRef = section.brief ?? section.content;
    if (!briefRef) {
      throw new Error(`Site plan section ${index + 1} is missing "brief" or "content".`);
    }
    const briefPath = resolve(baseDir, briefRef);
    const brief = loadBrief(briefPath);
    const brandRef = section.brandData ?? section.brand_data;
    return {
      name: section.name ?? brief.section.name,
      brief,
      briefPath,
      brandData: brandRef ? loadBrandData(resolve(baseDir, brandRef)) : undefined,
    };
  });
}

function collectTraceDirs(rootDir: string): string[] {
  if (!existsSync(rootDir)) {
    return [];
  }

  return readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(rootDir, entry.name))
    .filter((dir) => existsSync(join(dir, 'trace.jsonl')));
}

function printQAReport(report: ArtifactQAReport): void {
  console.log(`QA ${report.client_id}/${report.surface}: ${report.pass ? 'pass' : 'fail'}`);
  console.log(report.summary);
  console.log(`Average score: ${report.average_score.toFixed(1)}; sections: ${report.section_count}`);
  for (const violation of report.violations) {
    console.log(`- [${violation.severity}] ${violation.rule}: ${violation.message}`);
  }
}

function upsertSectionArtifact(clientId: string, surface: 'website' | 'product', sectionName: string, result: Awaited<ReturnType<typeof runSectionLoop>>): Artifact {
  const artifact = readArtifact(clientId, surface) ?? {
    artifact_id: `${clientId}-${surface}-${randomUUID().slice(0, 8)}`,
    client_id: clientId,
    surface,
    status: 'in-progress' as const,
    sections: [],
  };

  const section: SectionOutput = {
    section_id: `${clientId}_${sectionName}`,
    name: sectionName,
    code: { component: result.finalTsx ?? '' },
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

  artifact.sections = [...artifact.sections.filter((existing) => existing.name !== sectionName), section];
  artifact.status = artifact.sections.length > 0 && artifact.sections.every((existing) => existing.status === 'approved') ? 'approved' : 'in-progress';
  writeArtifact(clientId, surface, artifact);
  return artifact;
}
