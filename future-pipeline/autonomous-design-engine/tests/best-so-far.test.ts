/**
 * ADE Tests — Best-so-far selection
 *
 * Verifies I4: result never worse than best-seen candidate.
 */

import { describe, it, expect } from 'vitest';
import type { DimensionScores } from '../src/schema.js';

/**
 * Simulates the best-so-far update logic from the orchestrator.
 * Returns the best candidate after all updates.
 */
function simulateBestSoFar(candidates: { id: string; scores: DimensionScores; hardPass: boolean }[]): { id: string; scores: DimensionScores } | null {
  let best: { id: string; scores: DimensionScores; hardPass: boolean } | null = null;

  for (const candidate of candidates) {
    if (!best) {
      best = candidate;
      continue;
    }

    // Eligible (hardPass) beats non-eligible
    // Among same eligibility, higher weighted_total wins
    // Tie-break: higher craft wins
    const isEligible = candidate.hardPass;
    const currentEligible = best.hardPass;

    if ((isEligible && !currentEligible) || (isEligible === currentEligible && candidate.scores.weighted_total > best.scores.weighted_total) || (isEligible === currentEligible && candidate.scores.weighted_total === best.scores.weighted_total && candidate.scores.craft > best.scores.craft)) {
      best = candidate;
    }
  }

  return best;
}

function makeScores(total: number, craft = 80): DimensionScores {
  return {
    brand_adherence: total,
    system_adherence: null,
    brief_fit: total,
    craft,
    weighted_total: total,
  };
}

describe('Best-so-far selection (I4)', () => {
  it('selects the highest scoring candidate', () => {
    const candidates = [
      { id: 'a', scores: makeScores(60), hardPass: true },
      { id: 'b', scores: makeScores(85), hardPass: true },
      { id: 'c', scores: makeScores(70), hardPass: true },
    ];

    const best = simulateBestSoFar(candidates);
    expect(best?.id).toBe('b');
  });

  it('never returns a lower score than any previously seen candidate', () => {
    // Simulate a sequence where scores go up, then down
    const sequence = [
      { id: 'iter0', scores: makeScores(60), hardPass: true },
      { id: 'iter1', scores: makeScores(75), hardPass: true },
      { id: 'iter2', scores: makeScores(65), hardPass: true }, // Regression!
      { id: 'iter3', scores: makeScores(70), hardPass: true }, // Still below iter1
    ];

    const best = simulateBestSoFar(sequence);
    expect(best?.id).toBe('iter1'); // Best-so-far should be iter1 (75)
    expect(best?.scores.weighted_total).toBe(75);
  });

  it('prefers eligible (hardPass=true) over non-eligible', () => {
    const candidates = [
      { id: 'a', scores: makeScores(90), hardPass: false },
      { id: 'b', scores: makeScores(70), hardPass: true },
    ];

    const best = simulateBestSoFar(candidates);
    expect(best?.id).toBe('b'); // Eligible beats higher-scoring ineligible
  });

  it('breaks ties with craft score', () => {
    const candidates = [
      { id: 'a', scores: makeScores(80, 70), hardPass: true },
      { id: 'b', scores: makeScores(80, 90), hardPass: true },
    ];

    const best = simulateBestSoFar(candidates);
    expect(best?.id).toBe('b'); // Higher craft wins the tie
  });

  it('returns null for empty input', () => {
    const best = simulateBestSoFar([]);
    expect(best).toBeNull();
  });
});
