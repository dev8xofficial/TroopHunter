import { describe, it, expect } from 'vitest';
import { randomizeCandidateOrder, deRandomizeScores, aggregateCriticEnsemble, extractFineDetailCrops } from '../src/bias.js';
import type { CriticOutput } from '../src/schema.js';

describe('Bias Mitigation (C3.1)', () => {
  describe('randomizeCandidateOrder', () => {
    it('shuffles the input array and provides an inverse map', () => {
      const candidates = ['A', 'B', 'C', 'D', 'E'];

      // Run enough times to ensure it shuffles
      let wasShuffled = false;
      for (let i = 0; i < 10; i++) {
        const { shuffled, positionMap, originalToShuffled } = randomizeCandidateOrder(candidates);
        expect(shuffled.length).toBe(candidates.length);

        // Check the map correctness
        for (let j = 0; j < shuffled.length; j++) {
          const originalIdx = positionMap[j];
          expect(candidates[originalIdx]).toBe(shuffled[j]);
          expect(originalToShuffled[originalIdx]).toBe(j);
        }

        if (shuffled.join('') !== 'ABCDE') {
          wasShuffled = true;
          break;
        }
      }
      expect(wasShuffled).toBe(true);
    });
  });

  describe('deRandomizeScores', () => {
    it('restores candidates to their original order', () => {
      const originalIds = ['c1', 'c2', 'c3'];

      const shuffledOutput: CriticOutput = {
        candidates: [
          { candidate_id: 'c2', scores: {} as any, verdict: 'fail', feedback: '' },
          { candidate_id: 'c3', scores: {} as any, verdict: 'pass', feedback: '' },
          { candidate_id: 'c1', scores: {} as any, verdict: 'pass', feedback: '' },
        ],
        ranking: ['c3', 'c1', 'c2'],
      };

      const restored = deRandomizeScores(shuffledOutput, originalIds);

      // Candidates array should now be c1, c2, c3
      expect(restored.candidates.map((c) => c.candidate_id)).toEqual(['c1', 'c2', 'c3']);
      // Ranking remains unchanged
      expect(restored.ranking).toEqual(['c3', 'c1', 'c2']);
    });
  });

  describe('aggregateCriticEnsemble', () => {
    it('throws on empty ensemble', () => {
      expect(() => aggregateCriticEnsemble([])).toThrow();
    });

    it('returns the first if only one output is provided', () => {
      const out: CriticOutput = {
        candidates: [{ candidate_id: 'c1', scores: {} as any, verdict: 'pass', feedback: '' }],
      };
      expect(aggregateCriticEnsemble([out])).toEqual(out);
    });

    it('aggregates verdicts via majority vote and scores via median', () => {
      const makeOutput = (verdict: 'pass' | 'fail', score: number, fb: string): CriticOutput => ({
        candidates: [
          {
            candidate_id: 'c1',
            scores: { brand_adherence: score, system_adherence: score, brief_fit: score, craft: score, weighted_total: score },
            verdict,
            feedback: fb,
          },
        ],
      });

      const o1 = makeOutput('pass', 70, 'good');
      const o2 = makeOutput('pass', 80, 'great');
      const o3 = makeOutput('fail', 60, 'bad');

      const aggregated = aggregateCriticEnsemble([o1, o2, o3]);

      // Verdict: 2 passes vs 1 fail -> 'pass'
      expect(aggregated.candidates[0].verdict).toBe('pass');

      // Median of 70, 80, 60 is 70
      expect(aggregated.candidates[0].scores.weighted_total).toBe(70);
      expect(aggregated.candidates[0].scores.craft).toBe(70);

      // Feedback concatenated
      expect(aggregated.candidates[0].feedback).toContain('[Judge 1]: good');
      expect(aggregated.candidates[0].feedback).toContain('[Judge 2]: great');
      expect(aggregated.candidates[0].feedback).toContain('[Judge 3]: bad');
    });
  });
});
