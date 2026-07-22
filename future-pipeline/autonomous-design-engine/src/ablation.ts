/**
 * ADE — Three-arm Ablation Test (E2.2 / Phase-2 exit gate H6)
 *
 * No Library vs. Stage A Own-Client vs. Stage B Cross-Client, run across
 * MATCHED briefs through the real generate/render/critique loop, using a
 * REAL local embedding model — the plan's own explicit caveat: "the
 * default hash-embedding must NOT be used to evaluate H6... or the
 * ablation is meaningless." This module enforces that, not just documents
 * it.
 *
 * H6: does retrieval measurably beat the model's priors without it?
 *
 * @module ablation
 */

import { join } from 'path';
import type { Config } from './config.js';
import type { Brief, RunResult } from './schema.js';
import { runLoop } from './orchestrator.js';
import type { AblationArm } from './library.js';

const ABLATION_ARMS: AblationArm[] = ['memory-off', 'own-client', 'text-Library'];

/**
 * Refuse to run (or interpret results from) the ablation under the
 * deterministic hash-embedding default — every query and every entry hash
 * to the same fixed vector space regardless of actual semantic content, so
 * "retrieval beat the priors" would be unfalsifiable noise, not evidence.
 */
export function assertRealEmbeddingModelForAblation(cfg: Config): void {
  if (cfg.embeddingProvider !== 'ollama') {
    throw new Error(`H6/E2.2 ablation requires a REAL local embedding model (embeddingProvider: 'ollama'), not the deterministic ` + `hash-embedding default. Per the plan: "the default hash-embedding must not be used to evaluate H6... or the ` + `ablation is meaningless." Current embeddingProvider: "${cfg.embeddingProvider}".`);
  }
}

export interface MatchedBrief {
  brief: Brief;
  briefPath: string;
}

export interface AblationArmResult {
  arm: AblationArm;
  briefFit: number | undefined;
  weightedTotal: number | undefined;
  state: RunResult['state'];
}

/** Run ONE matched brief through the REAL generate/render/critique loop under ONE arm — runLoop itself, not a shortcut. */
export async function runAblationArm(cfg: Config, matched: MatchedBrief, arm: AblationArm, outDir: string): Promise<AblationArmResult> {
  const result = await runLoop(cfg, matched.brief, undefined, undefined, outDir, matched.briefPath, undefined, undefined, undefined, undefined, arm);
  return {
    arm,
    briefFit: result.bestScore?.brief_fit,
    weightedTotal: result.bestScore?.weighted_total,
    state: result.state,
  };
}

export interface AblationSample {
  briefFit: number;
  weightedTotal: number;
  arm: AblationArm;
}

/**
 * Run every matched brief through ALL THREE arms — the actual ablation.
 * Expensive by nature (3x real generate/render/critique per brief); this
 * is deliberate, not something to shortcut, since H6 needs REAL quality
 * outcomes to compare, not a proxy.
 */
export async function runThreeArmAblation(cfg: Config, matchedBriefs: MatchedBrief[], outDirBase: string): Promise<AblationSample[]> {
  assertRealEmbeddingModelForAblation(cfg);

  const samples: AblationSample[] = [];
  for (const [i, matched] of matchedBriefs.entries()) {
    for (const arm of ABLATION_ARMS) {
      const outDir = join(outDirBase, `brief-${i}`, arm);
      console.log(`\n🧪 H6 ablation: brief ${i + 1}/${matchedBriefs.length} ("${matched.brief.client}"), arm "${arm}"...`);
      const armResult = await runAblationArm(cfg, matched, arm, outDir);
      if (armResult.briefFit !== undefined && armResult.weightedTotal !== undefined) {
        samples.push({ briefFit: armResult.briefFit, weightedTotal: armResult.weightedTotal, arm });
      } else {
        console.warn(`⚠ H6 ablation: brief ${i + 1} arm "${arm}" produced no score (state=${armResult.state}) — excluded from the summary.`);
      }
    }
  }
  return samples;
}

export interface AblationArmSummary {
  arm: AblationArm;
  n: number;
  meanBriefFit: number;
  meanWeightedTotal: number;
}

export interface H6Summary {
  arms: AblationArmSummary[];
  memoryOffBriefFit: number;
  ownClientDelta: number; // own-client mean brief_fit MINUS memory-off mean brief_fit
  crossClientDelta: number; // text-Library mean brief_fit MINUS memory-off mean brief_fit
  h6Holds: boolean;
  sufficientSample: boolean;
}

const MIN_SAMPLE_PER_ARM = 5;
// A real, above-noise brief_fit improvement — not "any positive number,"
// which would call H6 proven on a single lucky sample.
const H6_MEANINGFUL_DELTA = 2;

/**
 * Real per-arm statistics + the H6 verdict. Mirrors strategy.ts's
 * evaluateStrategyAgainstM5: correct arithmetic over whatever real samples
 * exist, honest about refusing a verdict on too small a sample — matches
 * the plan's own open question #4 ("solo project volume may be too low to
 * detect H6").
 */
export function summarizeAblation(samples: AblationSample[]): H6Summary {
  const arms: AblationArmSummary[] = ABLATION_ARMS.map((arm) => {
    const armSamples = samples.filter((s) => s.arm === arm);
    return {
      arm,
      n: armSamples.length,
      meanBriefFit: average(armSamples.map((s) => s.briefFit)),
      meanWeightedTotal: average(armSamples.map((s) => s.weightedTotal)),
    };
  });

  const memoryOff = arms.find((a) => a.arm === 'memory-off')!;
  const ownClient = arms.find((a) => a.arm === 'own-client')!;
  const crossClient = arms.find((a) => a.arm === 'text-Library')!;

  const ownClientDelta = ownClient.meanBriefFit - memoryOff.meanBriefFit;
  const crossClientDelta = crossClient.meanBriefFit - memoryOff.meanBriefFit;
  const sufficientSample = arms.every((a) => a.n >= MIN_SAMPLE_PER_ARM);

  return {
    arms,
    memoryOffBriefFit: memoryOff.meanBriefFit,
    ownClientDelta,
    crossClientDelta,
    h6Holds: sufficientSample && (ownClientDelta >= H6_MEANINGFUL_DELTA || crossClientDelta >= H6_MEANINGFUL_DELTA),
    sufficientSample,
  };
}

export function formatH6Summary(summary: H6Summary): string {
  if (!summary.sufficientSample) {
    const counts = summary.arms.map((a) => `${a.arm}=${a.n}`).join(', ');
    return `H6 ablation: insufficient sample (${counts}; need >=${MIN_SAMPLE_PER_ARM} per arm). ` + `No H6 verdict can be supported yet — per the plan's open question #4, solo project volume may be too low to detect H6; ` + `consider running additional small/synthetic matched briefs.`;
  }

  const own = summary.arms.find((a) => a.arm === 'own-client')!;
  const cross = summary.arms.find((a) => a.arm === 'text-Library')!;
  const lines = [
    `H6 ablation (${summary.arms.map((a) => `${a.arm} n=${a.n}`).join(', ')}):`,
    `  memory-off (baseline):  brief_fit=${summary.memoryOffBriefFit.toFixed(1)}`,
    `  own-client:             brief_fit=${own.meanBriefFit.toFixed(1)} (delta ${summary.ownClientDelta >= 0 ? '+' : ''}${summary.ownClientDelta.toFixed(1)})`,
    `  text-Library:           brief_fit=${cross.meanBriefFit.toFixed(1)} (delta ${summary.crossClientDelta >= 0 ? '+' : ''}${summary.crossClientDelta.toFixed(1)})`,
    `H6 ${summary.h6Holds ? 'HOLDS' : 'DOES NOT HOLD'}: retrieval ${summary.h6Holds ? 'measurably beats' : 'does not measurably beat'} the model's priors without it.`,
  ];
  return lines.join('\n');
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}
