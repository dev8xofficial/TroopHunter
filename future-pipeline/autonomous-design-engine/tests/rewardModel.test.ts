import { describe, it, expect } from 'vitest';
import { evaluateWithRewardModel, applyDualJudge } from '../src/rewardModel.js';
import type { CandidateScore, CriticOutput } from '../src/schema.js';

describe('Reward Model (C3.5)', () => {
  it('separates universal_craft from domain_style signals', () => {
    const candidate: CandidateScore = {
      candidate_id: 'c1',
      scores: { brand_adherence: 80, system_adherence: null, brief_fit: 80, craft: 80, weighted_total: 80 },
      verdict: 'pass',
      feedback: 'ok',
    };

    const rm = evaluateWithRewardModel(candidate, 'SaaS');
    expect(rm.universal_craft).toBeDefined();
    expect(rm.domain_style).toBeDefined();
    expect(rm.adjustment).toBeDefined();
  });

  it('boosts weighted_total if universal_craft is exceptional', () => {
    const candidate: CandidateScore = {
      candidate_id: 'c2',
      scores: { brand_adherence: 90, system_adherence: null, brief_fit: 90, craft: 95, weighted_total: 92 },
      verdict: 'pass',
      feedback: 'great',
    };

    const criticOutput: CriticOutput = {
      candidates: [candidate],
    };

    const result = applyDualJudge(criticOutput, 'SaaS');
    const updated = result.candidates[0];

    expect(updated.reward_model_signals?.universal_craft).toBeGreaterThanOrEqual(95);
    expect(updated.scores.reward_model_adjustment).toBeGreaterThan(0);
    expect(updated.scores.weighted_total).toBeGreaterThan(92);
  });

  it('penalizes weighted_total if domain_style is poor', () => {
    const candidate: CandidateScore = {
      candidate_id: 'c3',
      scores: { brand_adherence: 50, system_adherence: null, brief_fit: 50, craft: 80, weighted_total: 60 },
      verdict: 'fail',
      feedback: 'bad fit',
    };

    const criticOutput: CriticOutput = {
      candidates: [candidate],
    };

    const result = applyDualJudge(criticOutput, 'SaaS');
    const updated = result.candidates[0];

    expect(updated.reward_model_signals?.domain_style).toBeLessThan(60);
    expect(updated.scores.reward_model_adjustment).toBeLessThan(0);
    expect(updated.scores.weighted_total).toBeLessThan(60);
  });

  it('flips verdict from fail to pass if RM adjustment pushes score >= 80', () => {
    const candidate: CandidateScore = {
      candidate_id: 'c4',
      scores: { brand_adherence: 80, system_adherence: null, brief_fit: 80, craft: 95, weighted_total: 78 }, // base 78
      verdict: 'fail',
      feedback: 'almost',
    };

    const criticOutput: CriticOutput = {
      candidates: [candidate],
    };

    const result = applyDualJudge(criticOutput, 'SaaS');
    const updated = result.candidates[0];

    // craft 95 -> rm universal_craft >= 95 -> adjustment +3
    // 78 + 3 = 81 >= 80 -> pass
    expect(updated.scores.weighted_total).toBeGreaterThanOrEqual(80);
    expect(updated.verdict).toBe('pass');
  });
});
