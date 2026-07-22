import { describe, it, expect } from 'vitest';
import { computeEarnedRung, recommendAutonomyPolicy, formatAutonomyPolicy } from '../src/autonomy.js';
import type { CalibrationSummary, ConfusionMatrix, Stratum } from '../src/calibration.js';

function matrix(total: number, accuracy: number, falsePassRate: number): ConfusionMatrix {
  const truePasses = Math.round(accuracy * total * 0.5);
  const trueFails = Math.round(accuracy * total * 0.5);
  const falsePasses = Math.round(falsePassRate * total);
  const falseFails = total - truePasses - trueFails - falsePasses;
  return {
    truePasses,
    trueFails,
    falsePasses,
    falseFails: Math.max(0, falseFails),
    total,
    accuracy,
    falsePassRate,
    falseFailRate: 0,
  };
}

function makeSummary(opts: { total: number; accuracy: number; falsePassRate: number; recentAgreement: number; strata: Record<Stratum, ConfusionMatrix>; auditMissRate?: number }): CalibrationSummary {
  return {
    total: opts.total,
    currentThreshold: 80,
    recommendedThreshold: 80,
    agreement: opts.accuracy,
    agreementGap: 1 - opts.accuracy,
    currentAccuracy: opts.accuracy,
    recommendedAccuracy: opts.accuracy,
    falsePasses: Math.round(opts.falsePassRate * opts.total),
    falseFails: 0,
    falsePassRate: opts.falsePassRate,
    falseFailRate: 0,
    agreementTrend: [
      {
        batch: 1,
        total: opts.total,
        agreement: opts.recentAgreement,
        falsePasses: 0,
        falseFails: 0,
      },
    ],
    rewardHackingAlarm: { triggered: false, suspectRuns: [], reasons: [] },
    autonomy: { currentRung: 0, recommendedRung: 1, reason: 'test' },
    weightHints: [],
    rubricExamples: [],
    strata: opts.strata,
    auditMissRate: opts.auditMissRate ?? 0,
  };
}

const emptyMatrix = matrix(0, 0, 0);

describe('Autonomy Ladder — C3.2 Per-Stratum Requirements', () => {
  it('denies rung 2 when aggregate is strong but hard stratum is weak', () => {
    // Aggregate: 93% accuracy across 30 examples — would normally earn rung 2.
    // But the hard stratum only has 55% accuracy.
    const summary = makeSummary({
      total: 30,
      accuracy: 0.93,
      falsePassRate: 0.03,
      recentAgreement: 0.9,
      strata: {
        routine: matrix(25, 0.96, 0.02),
        hard: matrix(5, 0.55, 0.2), // fails accuracy and false-pass requirements
        adversarial: emptyMatrix,
      },
    });

    const earned = computeEarnedRung(summary);
    // Earned should be 1 (routine passes) but NOT 2 (hard fails)
    expect(earned).toBe(1);
  });

  it('denies rung 3 when hard passes but adversarial is absent', () => {
    const summary = makeSummary({
      total: 60,
      accuracy: 0.92,
      falsePassRate: 0.04,
      recentAgreement: 0.88,
      strata: {
        routine: matrix(35, 0.94, 0.03),
        hard: matrix(25, 0.9, 0.04),
        adversarial: matrix(0, 0, 0), // no adversarial data
      },
    });

    const earned = computeEarnedRung(summary);
    // Should earn 2 (routine + hard pass) but NOT 3 (adversarial missing)
    expect(earned).toBe(2);
  });

  it('earns rung 3 when all three strata pass independently', () => {
    const summary = makeSummary({
      total: 60,
      accuracy: 0.92,
      falsePassRate: 0.04,
      recentAgreement: 0.88,
      strata: {
        routine: matrix(30, 0.93, 0.03),
        hard: matrix(20, 0.9, 0.05),
        adversarial: matrix(10, 0.9, 0.05),
      },
    });

    const earned = computeEarnedRung(summary);
    expect(earned).toBe(3);
  });

  it('drops to rung ≤1 when audit miss-rate exceeds 5%', () => {
    // All strata are excellent, but audit miss-rate is 8%
    const summary = makeSummary({
      total: 60,
      accuracy: 0.95,
      falsePassRate: 0.02,
      recentAgreement: 0.92,
      strata: {
        routine: matrix(35, 0.96, 0.01),
        hard: matrix(15, 0.93, 0.02),
        adversarial: matrix(10, 0.9, 0.03),
      },
      auditMissRate: 0.08,
    });

    const earned = computeEarnedRung(summary);
    expect(earned).toBeLessThanOrEqual(1);
  });

  it('includes per-stratum detail in the policy', () => {
    const summary = makeSummary({
      total: 30,
      accuracy: 0.9,
      falsePassRate: 0.05,
      recentAgreement: 0.85,
      strata: {
        routine: matrix(20, 0.95, 0.03),
        hard: matrix(10, 0.7, 0.15),
        adversarial: emptyMatrix,
      },
    });

    const policy = recommendAutonomyPolicy(summary, 2, 0);

    // Policy should include detail for all 3 strata
    expect(policy.stratumDetail).toHaveLength(3);
    expect(policy.stratumDetail.find((d) => d.stratum === 'routine')?.meetsThreshold).toBe(true);
    expect(policy.stratumDetail.find((d) => d.stratum === 'hard')?.meetsThreshold).toBe(false);
  });

  it('explanation cites the power analysis artifact', () => {
    const summary = makeSummary({
      total: 30,
      accuracy: 0.9,
      falsePassRate: 0.05,
      recentAgreement: 0.85,
      strata: {
        routine: matrix(30, 0.9, 0.05),
        hard: emptyMatrix,
        adversarial: emptyMatrix,
      },
    });

    const policy = recommendAutonomyPolicy(summary, 2, 0);
    expect(policy.reason).toContain('ADE-PA-01');
  });

  it('formatAutonomyPolicy includes per-stratum lines', () => {
    const summary = makeSummary({
      total: 30,
      accuracy: 0.9,
      falsePassRate: 0.05,
      recentAgreement: 0.85,
      strata: {
        routine: matrix(20, 0.95, 0.03),
        hard: matrix(10, 0.7, 0.15),
        adversarial: emptyMatrix,
      },
    });

    const policy = recommendAutonomyPolicy(summary, 2, 0);
    const formatted = formatAutonomyPolicy(policy);
    expect(formatted).toContain('Per-stratum agreement:');
    expect(formatted).toContain('routine');
    expect(formatted).toContain('hard');
    expect(formatted).toContain('adversarial');
  });
});
