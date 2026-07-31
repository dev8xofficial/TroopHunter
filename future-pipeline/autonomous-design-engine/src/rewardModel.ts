/**
 * ADE — Reward Model (Phase 3 / C3.5)
 *
 * Implements the Dual-Judge deployment harness. A (simulated) learned
 * reward model augments the prompted Critic by separating universal-craft
 * from domain-style signals, testing cross-domain transfer, and adjusting
 * the final weighted_total score.
 *
 * @module rewardModel
 */

import type { CriticOutput, CandidateScore } from './schema.js';

/**
 * Simulates a fast-pass evaluation from a small, trained Vision-Language Model
 * (the Reward Model). In production, this would invoke the learned model weights
 * via an inference API.
 *
 * Separates signals to test cross-domain transfer:
 * - universal_craft: typography scale, alignment, contrast, spacing (transfers universally)
 * - domain_style: appropriateness of the aesthetic for the specific industry/audience (domain-bound)
 */
export function evaluateWithRewardModel(candidate: CandidateScore, domainIndustry: string): { universal_craft: number; domain_style: number; adjustment: number } {
  // SIMULATION (since we cannot train/run a VLM inside this TS file):
  // We infer the simulated reward model's signals based on the Critic's raw scores,
  // adding a slight positive bump if the craft is already high (rewarding spiky excellence).

  const baseCraft = candidate.scores.craft;
  const baseBrief = candidate.scores.brief_fit;

  // Universal craft is heavily weighted by the Critic's craft score,
  // but we simulate the RM being slightly more discerning (pulling toward mean if low, boosting if high).
  let universal_craft = baseCraft;
  if (baseCraft >= 85) universal_craft += 2;
  else if (baseCraft < 70) universal_craft -= 2;

  // Domain style correlates with brief fit, but the RM separates it.
  // We just pass it through with a small variance for simulation.
  const domain_style = Math.min(100, Math.max(0, baseBrief + (Math.random() * 4 - 2)));

  // The reward model adjusts the final score based on its own preference.
  // If universal_craft is exceptional (>90), give a +3 boost to weighted_total.
  // If domain_style is poor (<60), penalize -3.
  let adjustment = 0;
  if (universal_craft >= 90) adjustment += 3;
  if (domain_style < 60) adjustment -= 3;

  return {
    universal_craft: Math.round(universal_craft),
    domain_style: Math.round(domain_style),
    adjustment,
  };
}

/**
 * The Dual-Judge harness: wraps the Critic's output.
 * For each candidate, invokes the Reward Model, logs its separated signals,
 * and applies its adjustment to the candidate's weighted_total.
 */
export function applyDualJudge(criticOutput: CriticOutput, domainIndustry: string): CriticOutput {
  const modified = { ...criticOutput };

  modified.candidates = modified.candidates.map((candidate) => {
    const rm = evaluateWithRewardModel(candidate, domainIndustry);

    // Apply the adjustment to weighted_total, clamping to [0, 100]
    const originalTotal = candidate.scores.weighted_total;
    const newTotal = Math.min(100, Math.max(0, originalTotal + rm.adjustment));

    // Update verdict if the adjustment crosses the 80 pass/fail threshold
    let newVerdict = candidate.verdict;
    if (originalTotal < 80 && newTotal >= 80) newVerdict = 'pass';
    if (originalTotal >= 80 && newTotal < 80) newVerdict = 'fail';

    return {
      ...candidate,
      scores: {
        ...candidate.scores,
        weighted_total: newTotal,
        reward_model_adjustment: rm.adjustment,
      },
      reward_model_signals: {
        universal_craft: rm.universal_craft,
        domain_style: rm.domain_style,
      },
      verdict: newVerdict,
    };
  });

  // Note: we do NOT re-sort the ranking array here. The RM adjusts scores,
  // but pairwise ranking is currently left to the prompted Critic (or could be recalculated).

  return modified;
}
