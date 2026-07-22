/**
 * ADE Tests — Three-arm ablation / H6 (E2.2)
 *
 * assertRealEmbeddingModelForAblation is the plan's own explicit caveat
 * made enforceable ("the default hash-embedding must not be used to
 * evaluate H6, or the ablation is meaningless"); summarizeAblation/
 * formatH6Summary prove the real statistics and the honest
 * insufficient-sample refusal. The actual runAblationArm/
 * runThreeArmAblation wiring through runLoop is proven end-to-end in
 * site-loop.e2e.test.ts (real browser required), not here.
 */

import { describe, it, expect } from 'vitest';
import type { Config } from '../src/config.js';
import { buildConfig } from '../src/config.js';
import { assertRealEmbeddingModelForAblation, formatH6Summary, summarizeAblation, type AblationSample } from '../src/ablation.js';

function cfgWith(embeddingProvider: Config['embeddingProvider']): Config {
  return { ...buildConfig({ provider: 'local' }), embeddingProvider };
}

describe('assertRealEmbeddingModelForAblation (E2.2 — H6 evaluation caveat)', () => {
  it('throws under the deterministic hash-embedding default — the plan\'s own explicit "ablation is meaningless" caveat', () => {
    expect(() => assertRealEmbeddingModelForAblation(cfgWith('local-hash'))).toThrow(/ablation is meaningless/);
  });

  it('passes under a real local embedding model (ollama)', () => {
    expect(() => assertRealEmbeddingModelForAblation(cfgWith('ollama'))).not.toThrow();
  });
});

function sample(arm: AblationSample['arm'], briefFit: number): AblationSample {
  return { arm, briefFit, weightedTotal: briefFit };
}

describe('summarizeAblation / formatH6Summary (E2.2 — real statistics, honest about insufficient sample)', () => {
  it('computes real per-arm means and marks H6 as holding when retrieval measurably beats the memory-off baseline', () => {
    const samples: AblationSample[] = [...Array.from({ length: 5 }, () => sample('memory-off', 70)), ...Array.from({ length: 5 }, () => sample('own-client', 78)), ...Array.from({ length: 5 }, () => sample('text-Library', 80))];
    const summary = summarizeAblation(samples);

    expect(summary.sufficientSample).toBe(true);
    expect(summary.memoryOffBriefFit).toBe(70);
    expect(summary.ownClientDelta).toBeCloseTo(8);
    expect(summary.crossClientDelta).toBeCloseTo(10);
    expect(summary.h6Holds).toBe(true);
  });

  it('marks H6 as NOT holding when retrieval does not measurably beat the baseline, even with a sufficient sample', () => {
    const samples: AblationSample[] = [
      ...Array.from({ length: 5 }, () => sample('memory-off', 80)),
      ...Array.from({ length: 5 }, () => sample('own-client', 80.5)), // within noise, not a real improvement
      ...Array.from({ length: 5 }, () => sample('text-Library', 79)), // actually worse
    ];
    const summary = summarizeAblation(samples);

    expect(summary.sufficientSample).toBe(true);
    expect(summary.h6Holds).toBe(false);
  });

  it('refuses a verdict when any arm has too few samples, regardless of how large the delta looks', () => {
    const samples: AblationSample[] = [
      sample('memory-off', 50),
      sample('own-client', 95), // huge delta, but n=1 — must not be trusted
      sample('text-Library', 95),
    ];
    const summary = summarizeAblation(samples);

    expect(summary.sufficientSample).toBe(false);
    expect(summary.h6Holds).toBe(false); // never claims H6 holds without sufficient sample, no matter the delta
    expect(formatH6Summary(summary)).toContain('insufficient sample');
    expect(formatH6Summary(summary)).not.toContain('HOLDS');
  });

  it('handles a completely empty sample set without throwing', () => {
    const summary = summarizeAblation([]);
    expect(summary.sufficientSample).toBe(false);
    expect(summary.h6Holds).toBe(false);
    expect(summary.arms).toHaveLength(3);
    expect(summary.arms.every((a) => a.n === 0)).toBe(true);
  });

  it('formatH6Summary reports per-arm n and a clear HOLDS/DOES NOT HOLD verdict once sufficient', () => {
    const samples: AblationSample[] = [...Array.from({ length: 6 }, () => sample('memory-off', 65)), ...Array.from({ length: 6 }, () => sample('own-client', 72)), ...Array.from({ length: 6 }, () => sample('text-Library', 74))];
    const text = formatH6Summary(summarizeAblation(samples));
    expect(text).toContain('memory-off n=6');
    expect(text).toContain('own-client n=6');
    expect(text).toContain('text-Library n=6');
    expect(text).toContain('HOLDS');
  });
});
