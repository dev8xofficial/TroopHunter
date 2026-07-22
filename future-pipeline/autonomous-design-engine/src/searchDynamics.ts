/**
 * ADE — Search Dynamics (Phase 3 / C3.6)
 *
 * Implements R7, R8, and R12 from the research agenda to improve
 * the generator loop's search behavior over greedy, static optimization.
 *
 * @module searchDynamics
 */

import type { CandidateScore } from './schema.js';

/**
 * R7: Detects if the search has stagnated (plateaued) by checking if the
 * max variation in the recent score history is below a threshold.
 */
export function detectPlateau(scoreHistory: number[], windowSize = 3, threshold = 2): boolean {
  if (scoreHistory.length < windowSize) return false;

  const recent = scoreHistory.slice(-windowSize);
  const max = Math.max(...recent);
  const min = Math.min(...recent);

  return max - min < threshold;
}

/**
 * R7: "Abandon this direction" heuristic.
 * If we have plateaued at a failing score (e.g., < 80) and have burned
 * a significant portion of our max iterations without improvement,
 * signal the orchestrator to abandon the current tree entirely.
 */
export function shouldAbandonDirection(scoreHistory: number[], currentIteration: number, maxIterations: number, passThreshold = 80): boolean {
  if (!detectPlateau(scoreHistory, 3, 2)) return false;

  const recentScore = scoreHistory[scoreHistory.length - 1];
  const isFailing = recentScore < passThreshold;
  const isDeepInLoop = currentIteration >= Math.floor(maxIterations * 0.5);

  return isFailing && isDeepInLoop;
}

/**
 * R8: Identifies candidates that are not strictly dominated by any other
 * candidate on the axes of craft and brief_fit.
 *
 * A candidate A strictly dominates B if A is >= B on all axes, and A > B on at least one.
 */
export function getParetoFront(candidates: CandidateScore[]): CandidateScore[] {
  if (candidates.length <= 1) return candidates;

  const paretoFront: CandidateScore[] = [];

  for (let i = 0; i < candidates.length; i++) {
    const A = candidates[i];
    let dominated = false;

    for (let j = 0; j < candidates.length; j++) {
      if (i === j) continue;
      const B = candidates[j];

      // We use craft and brief_fit as the axes. (We could include brand_adherence).
      const aCraft = A.scores.craft;
      const aBrief = A.scores.brief_fit;
      const bCraft = B.scores.craft;
      const bBrief = B.scores.brief_fit;

      const B_ge_A = bCraft >= aCraft && bBrief >= aBrief;
      const B_gt_A = bCraft > aCraft || bBrief > aBrief;

      if (B_ge_A && B_gt_A) {
        dominated = true;
        break;
      }
    }

    if (!dominated) {
      paretoFront.push(A);
    }
  }

  return paretoFront.length > 0 ? paretoFront : candidates;
}

/**
 * R8: Selects the best candidate, preferring spiky excellence.
 * If paretoEnabled is true, filters to the Pareto front, then breaks ties
 * using reward_model_adjustment or raw craft score.
 */
export function selectBestCandidate(candidates: CandidateScore[], paretoEnabled = true): CandidateScore | undefined {
  if (candidates.length === 0) return undefined;
  if (!paretoEnabled) {
    // Greedy fallback
    return [...candidates].sort((a, b) => b.scores.weighted_total - a.scores.weighted_total)[0];
  }

  const front = getParetoFront(candidates);

  // Sort the Pareto front by the RM adjustment (if present), then craft, then weighted_total.
  // This heavily favors spiky-excellence in craft over balanced-mediocrity.
  return front.sort((a, b) => {
    const aAdj = a.scores.reward_model_adjustment ?? 0;
    const bAdj = b.scores.reward_model_adjustment ?? 0;
    if (aAdj !== bAdj) return bAdj - aAdj;

    if (a.scores.craft !== b.scores.craft) return b.scores.craft - a.scores.craft;

    return b.scores.weighted_total - a.scores.weighted_total;
  })[0];
}

/**
 * R12: Adaptive Effort Allocation
 * Returns a dynamic k-shot count.
 */
export function getAdaptiveK(baseK: number, iteration: number, isPlateaued: boolean, isTierA: boolean): number {
  let currentK = baseK;

  // Widen search on plateau
  if (isPlateaued) {
    currentK += 1;
  }

  // Tier A sections get more effort deeper into the loop
  if (isTierA && iteration >= 2) {
    currentK += 1;
  }

  // Cap at 4 to prevent excessive token burn
  return Math.min(4, Math.max(1, currentK));
}
