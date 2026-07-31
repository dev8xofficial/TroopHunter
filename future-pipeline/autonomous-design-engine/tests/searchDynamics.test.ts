import { describe, it, expect } from 'vitest';
import { detectPlateau, getParetoFront, selectBestCandidate, getAdaptiveK } from '../src/searchDynamics.js';
import type { CandidateScore } from '../src/schema.js';

describe('Search Dynamics (C3.6)', () => {
  describe('detectPlateau (R7)', () => {
    it('returns true if max variation < threshold over window', () => {
      expect(detectPlateau([80, 80, 81], 3, 2)).toBe(true);
      expect(detectPlateau([80, 81, 80], 3, 2)).toBe(true);
    });

    it('returns false if variation is large', () => {
      expect(detectPlateau([70, 75, 80], 3, 2)).toBe(false);
    });

    it('returns false if history is smaller than window', () => {
      expect(detectPlateau([80, 80], 3, 2)).toBe(false);
    });
  });

  describe('getParetoFront (R8)', () => {
    it('filters out strictly dominated candidates', () => {
      const c1: CandidateScore = { candidate_id: 'c1', scores: { craft: 80, brief_fit: 80, brand_adherence: 80, system_adherence: null, weighted_total: 80 }, verdict: 'pass', feedback: '' };
      const c2: CandidateScore = { candidate_id: 'c2', scores: { craft: 90, brief_fit: 75, brand_adherence: 80, system_adherence: null, weighted_total: 82 }, verdict: 'pass', feedback: '' };
      const c3: CandidateScore = { candidate_id: 'c3', scores: { craft: 75, brief_fit: 75, brand_adherence: 80, system_adherence: null, weighted_total: 75 }, verdict: 'pass', feedback: '' };

      const front = getParetoFront([c1, c2, c3]);

      // c1 is better on brief_fit than c2. c2 is better on craft than c1. Both survive.
      // c3 is strictly dominated by c1 (80/80 >= 75/75 and strictly greater). c3 is removed.
      expect(front).toHaveLength(2);
      expect(front.map((c) => c.candidate_id)).toEqual(expect.arrayContaining(['c1', 'c2']));
    });
  });

  describe('selectBestCandidate (R8)', () => {
    it('prefers spiky excellence on the Pareto front', () => {
      const balancedMediocre: CandidateScore = { candidate_id: 'c1', scores: { craft: 85, brief_fit: 85, brand_adherence: 80, system_adherence: null, weighted_total: 85 }, verdict: 'pass', feedback: '' };
      const spikyExcellent: CandidateScore = { candidate_id: 'c2', scores: { craft: 95, brief_fit: 80, brand_adherence: 80, system_adherence: null, weighted_total: 85 }, verdict: 'pass', feedback: '' };

      // Both are on the pareto front. selectBestCandidate should use craft to tie-break.
      const best = selectBestCandidate([balancedMediocre, spikyExcellent]);
      expect(best?.candidate_id).toBe('c2');
    });

    it('falls back to greedy selection if paretoEnabled is false', () => {
      const c1: CandidateScore = { candidate_id: 'c1', scores: { craft: 85, brief_fit: 85, brand_adherence: 80, system_adherence: null, weighted_total: 85 }, verdict: 'pass', feedback: '' };
      const c2: CandidateScore = { candidate_id: 'c2', scores: { craft: 95, brief_fit: 80, brand_adherence: 80, system_adherence: null, weighted_total: 82 }, verdict: 'pass', feedback: '' };

      const best = selectBestCandidate([c1, c2], false); // Greedy uses weighted_total
      expect(best?.candidate_id).toBe('c1');
    });
  });

  describe('getAdaptiveK (R12)', () => {
    it('increases k if plateaued', () => {
      expect(getAdaptiveK(1, 0, true, false)).toBe(2);
    });

    it('increases k for Tier A later in the loop', () => {
      expect(getAdaptiveK(1, 2, false, true)).toBe(2);
    });

    it('caps at 4', () => {
      expect(getAdaptiveK(3, 3, true, true)).toBe(4); // 3 + 1 + 1 = 5, caps at 4
    });
  });
});
