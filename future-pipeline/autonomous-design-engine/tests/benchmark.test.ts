import { describe, it, expect, vi } from 'vitest';
import { calculateBenchmarkAgeDays, applyOverfittingDiscount, runBenchmark, proposeAdversarialCase } from '../src/benchmark.js';

describe('C3.9 Evaluation-Overfitting Defense', () => {
  it('correctly calculates benchmark age', () => {
    const now = new Date('2025-01-10T00:00:00Z').getTime();
    // 10 days ago
    const refresh = new Date('2024-12-31T00:00:00Z').toISOString();

    const age = calculateBenchmarkAgeDays(refresh, now);
    expect(age).toBe(10);
  });

  it('never returns negative age for future dates', () => {
    const now = new Date('2025-01-01T00:00:00Z').getTime();
    const future = new Date('2025-02-01T00:00:00Z').toISOString();
    const age = calculateBenchmarkAgeDays(future, now);
    expect(age).toBe(0);
  });

  it('calculates transfer gap and discounts non-transferring gains', () => {
    // High core score, low held-out score -> massive penalty
    const core = 95;
    const heldOut = 70;

    const { transferGap, discountedScore } = applyOverfittingDiscount(core, heldOut);

    expect(transferGap).toBe(25);
    // Penalty is 25 * 1.5 = 37.5. Discounted = 95 - 37.5 = 57.5
    expect(discountedScore).toBe(57.5);
  });

  it('does not penalize zero transfer gap', () => {
    const { transferGap, discountedScore } = applyOverfittingDiscount(90, 90);
    expect(transferGap).toBe(0);
    expect(discountedScore).toBe(90);
  });

  it('does not give bonus for heldOut > core, and floors score at 0', () => {
    const { transferGap, discountedScore } = applyOverfittingDiscount(80, 90);
    expect(transferGap).toBe(0); // Gap is floored at 0
    expect(discountedScore).toBe(80);

    const severe = applyOverfittingDiscount(50, 0);
    expect(severe.transferGap).toBe(50);
    // Penalty is 75. 50 - 75 = -25, which should be floored at 0
    expect(severe.discountedScore).toBe(0);
  });

  it('runBenchmark populates C3.9 mock fields', async () => {
    // Use a mock directory that exists, e.g., the test directory itself
    const result = await runBenchmark(__dirname, 'test-model');

    expect(result.benchmarkAgeDays).toBeDefined();
    expect(result.coreScore).toBeDefined();
    expect(result.heldOutScore).toBeDefined();
    expect(result.transferGap).toBeDefined();
    expect(result.discountedScore).toBeDefined();

    // We mocked a stale date of 95 days in runBenchmark
    expect(result.benchmarkAgeDays).toBeGreaterThanOrEqual(95);
  });

  it('proposes adversarial cases for failing briefs', () => {
    const brief = { client: 'A', industry: 'B', audience: 'C', goal: 'D', section: { name: 'E', content: {} } };
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const proposalsDir = require('path').join(process.cwd(), '.ade', 'proposed-benchmarks');
    const { rmSync, existsSync } = require('fs');
    if (existsSync(proposalsDir)) {
      rmSync(proposalsDir, { recursive: true, force: true });
    }

    proposeAdversarialCase(brief as any, 'Severe gate failure');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ADVERSARIAL CASE PROPOSED'));
    expect(existsSync(proposalsDir)).toBe(true);

    consoleSpy.mockRestore();
  });
});
