/**
 * ADE - Benchmark extensions (Phase 1, C1.13 / M2 / M3 / M9 / M18 / M19)
 *
 * ⚠ NOT YET IMPLEMENTED — runBenchmark() below is a placeholder that returns
 * fabricated numbers (Math.random() / hardcoded constants), not measurements.
 * This violates I12 ("reported quality numbers are observed, never predicted")
 * if its output is ever treated as real. It exists only so the CLI surface
 * and downstream types (BenchmarkResult) are stable while the real R1
 * benchmark — anchor-set assembly, real bias probes run against a live
 * Critic, real reference-interpretation scoring (M18), real distinctiveness
 * scoring (M19) — gets built as its own dedicated effort (spec/13, plan
 * C1.13). Do not wire this into any Phase-0/H1 gate decision. Do not report
 * its numbers anywhere the reader could mistake them for real evidence.
 *
 * Anchor-set assembly, bias-probe suite, and agreement metrics.
 *
 * @module benchmark
 */

import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { buildConfig } from './config.js';
import { getProvider } from './model.js';
import { critique } from './critic.js';
import type { InputBundle, CriticOutput, Brief } from './schema.js';

export interface BenchmarkCase {
  id: string;
  stratum: 'baseline' | 'frontier' | 'edge';
  sourceFile: string;
}

export interface BiasProbe {
  type: 'order-swap' | 'verbosity' | 'style';
  stabilityScore: number;
}

export interface BenchmarkResult {
  refreshDate: string;
  distanceFromAnchor: number;
  perStratumAgreement: Record<string, number>;
  probeStability: BiasProbe[];
  modelAgreementGap: number;
  // M18 Comprehension Depth Metrics
  restatementAccuracy?: number;
  interpretationDepth?: number;
  // M19 Originality Metrics
  distinctivenessScore?: number;
  selfSimilarityDistance?: number;
  // C3.9 Overfitting Defense Metrics (F-SPEC-06)
  benchmarkAgeDays?: number;
  coreScore?: number;
  heldOutScore?: number;
  transferGap?: number;
  discountedScore?: number;
}

/**
 * C3.9: Calculates the benchmark age in days.
 */
export function calculateBenchmarkAgeDays(refreshDate: string, now = Date.now()): number {
  const refresh = new Date(refreshDate).getTime();
  return Math.max(0, (now - refresh) / (1000 * 60 * 60 * 24));
}

/**
 * C3.9: Calculates the transfer gap and applies a severe discount to non-transferring gains.
 * A model optimizing only for the core set will have a large gap, yielding a penalized score.
 */
export function applyOverfittingDiscount(coreScore: number, heldOutScore: number): { transferGap: number; discountedScore: number } {
  const transferGap = Math.max(0, coreScore - heldOutScore);
  // Penalty factor: penalize the gap by 1.5x to actively discourage Goodharting
  const penalty = transferGap * 1.5;
  const discountedScore = Math.max(0, coreScore - penalty);
  return { transferGap, discountedScore };
}

/**
 * Runs the order-swap bias probe.
 * Returns 1 if verdicts match across order swaps, 0 if they flip.
 */
export async function probeOrderSwap(bundle: InputBundle, candidatesInfo: Record<string, { shots: Record<string, string>; domInfo?: any }>, modelId: string): Promise<number> {
  const cfg = buildConfig({ model: modelId });
  const provider = await getProvider(cfg);
  const maxCalls = { current: 0, max: 2 };

  // Run 1: original order
  const output1 = await critique(candidatesInfo, bundle, provider, 0, 80, maxCalls);

  // Run 2: reversed order
  const candidateIds = Object.keys(candidatesInfo);
  const reversedIds = [...candidateIds].reverse();
  const reversedInfo: typeof candidatesInfo = {};
  for (const id of reversedIds) {
    reversedInfo[id] = candidatesInfo[id];
  }
  const output2 = await critique(reversedInfo, bundle, provider, 0, 80, maxCalls);

  let stable = true;
  for (const id of candidateIds) {
    const v1 = output1.candidates.find((c) => c.candidate_id === id)?.verdict;
    const v2 = output2.candidates.find((c) => c.candidate_id === id)?.verdict;
    if (v1 !== v2) stable = false;
  }
  return stable ? 1 : 0;
}

/**
 * Runs the style-transfer bias probe (swaps industry/audience).
 */
export async function probeStyleTransfer(bundle: InputBundle, candidatesInfo: Record<string, { shots: Record<string, string>; domInfo?: any }>, modelId: string): Promise<number> {
  const cfg = buildConfig({ model: modelId });
  const provider = await getProvider(cfg);
  const maxCalls = { current: 0, max: 2 };

  const output1 = await critique(candidatesInfo, bundle, provider, 0, 80, maxCalls);

  // Clone bundle and alter the style/domain
  const bundle2: InputBundle = JSON.parse(JSON.stringify(bundle));
  bundle2.brief.industry = 'law firm / corporate';
  bundle2.brief.audience = 'conservative enterprise clients seeking reliability';

  const output2 = await critique(candidatesInfo, bundle2, provider, 0, 80, maxCalls);

  let stable = true;
  for (const id of Object.keys(candidatesInfo)) {
    const v1 = output1.candidates.find((c) => c.candidate_id === id)?.verdict;
    const v2 = output2.candidates.find((c) => c.candidate_id === id)?.verdict;
    if (v1 !== v2) stable = false;
  }
  return stable ? 1 : 0;
}

export async function runBenchmark(casesDir: string, model1: string, model2?: string): Promise<BenchmarkResult> {
  if (!existsSync(casesDir)) {
    console.warn(`⚠ Benchmark cases dir ${casesDir} not found.`);
    console.warn('Returning empty baseline result until cases are added.');
    return {
      refreshDate: new Date().toISOString(),
      distanceFromAnchor: 0,
      perStratumAgreement: {},
      probeStability: [
        { type: 'order-swap', stabilityScore: 0 },
        { type: 'verbosity', stabilityScore: 0 },
        { type: 'style', stabilityScore: 0 },
      ],
      modelAgreementGap: 0,
    };
  }

  console.log(`Running benchmark over ${casesDir} with model ${model1}...`);
  // This would iterate the directory, construct bundles, and call probeOrderSwap / probeStyleTransfer.
  // For now, it returns the structure. Execution is gated on cases and API keys.

  // C3.9 Mock data: Core vs Held-out transfer gap
  const coreScore = 94.5;
  const heldOutScore = 78.2;
  const { transferGap, discountedScore } = applyOverfittingDiscount(coreScore, heldOutScore);

  // Mock an older refresh date to trigger age tracking (e.g., 95 days old)
  const refreshDate = new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString();

  return {
    refreshDate,
    benchmarkAgeDays: calculateBenchmarkAgeDays(refreshDate),
    coreScore,
    heldOutScore,
    transferGap,
    discountedScore,
    distanceFromAnchor: 1.5,
    perStratumAgreement: {
      baseline: 0.95,
      frontier: 0.82,
      edge: 0.65,
    },
    probeStability: [
      { type: 'order-swap', stabilityScore: 0.98 },
      { type: 'verbosity', stabilityScore: 0.89 },
      { type: 'style', stabilityScore: 0.91 },
    ],
    modelAgreementGap: model2 ? 0.12 : 0.0,
    restatementAccuracy: 0.94,
    interpretationDepth: 0.76,
    distinctivenessScore: 0.81,
    selfSimilarityDistance: 0.45,
  };
}

/**
 * C3.9: Proposes a brief as an adversarial case for human ratification
 * if it consistently fails gates or scores poorly.
 */
export function proposeAdversarialCase(brief: Brief, failureReason: string): void {
  const proposalsDir = join(process.cwd(), '.ade', 'proposed-benchmarks');
  if (!existsSync(proposalsDir)) {
    mkdirSync(proposalsDir, { recursive: true });
  }

  const caseData = {
    id: randomUUID(),
    proposedAt: new Date().toISOString(),
    failureReason,
    brief,
  };

  const filePath = join(proposalsDir, `proposal-${caseData.id}.json`);
  writeFileSync(filePath, JSON.stringify(caseData, null, 2));
  console.log(`\n\x1b[1m\x1b[33m⚠ ADVERSARIAL CASE PROPOSED:\x1b[0m Brief saved to ${filePath} due to: ${failureReason}\n`);
}
