/**
 * ADE — Uncertainty-routed review (Phase 3 / C3.3)
 *
 * Routes the human's scarce review minutes to low-confidence/high-stakes
 * items and lets routine passes flow through with lighter audit.
 * Implements R14 (uncertainty-routed review) from the research agenda.
 *
 * @module reviewRouting
 */

import type { CriticOutput, InputBundle } from './schema.js';
import type { AutonomyPolicy } from './autonomy.js';

export type ReviewRouteKind = 'full-review' | 'spot-check' | 'audit-only';

export interface ReviewRoute {
  route: ReviewRouteKind;
  reason: string;
  /** Critic's weighted_total for the best candidate */
  criticScore: number;
  /** Whether this section is considered Tier A (high-stakes) */
  tierA: boolean;
}

/** Sections that are high-stakes by name convention */
export const TIER_A_SECTIONS = new Set(['hero', 'pricing', 'checkout', 'signup', 'login', 'onboarding', 'payment', 'cta', 'landing']);

/**
 * Determine the review route for a section based on Critic output,
 * section characteristics, and the current autonomy policy.
 */
export function routeForReview(criticOutput: CriticOutput, sectionName: string, threshold: number, activeRung: number): ReviewRoute {
  // Find the best candidate score
  const bestCandidate = criticOutput.candidates.reduce((best, c) => (c.scores.weighted_total > best.scores.weighted_total ? c : best), criticOutput.candidates[0]);
  const score = bestCandidate.scores.weighted_total;
  const verdict = bestCandidate.verdict;

  const tierA = TIER_A_SECTIONS.has(sectionName.toLowerCase());
  const margin = score - threshold;

  // Rule 1: Any fail always gets full review
  if (verdict === 'fail') {
    return {
      route: 'full-review',
      reason: `Critic verdict is 'fail' (score ${score})`,
      criticScore: score,
      tierA,
    };
  }

  // Rule 2: Low confidence — score within ±5 of threshold
  if (Math.abs(margin) <= 5) {
    return {
      route: 'full-review',
      reason: `Score ${score} is within ±5 of threshold ${threshold} (low confidence)`,
      criticScore: score,
      tierA,
    };
  }

  // Rule 3: Score below 70 (absolute low confidence)
  if (score < 70) {
    return {
      route: 'full-review',
      reason: `Score ${score} is below 70 (low absolute confidence)`,
      criticScore: score,
      tierA,
    };
  }

  // Rule 4: Tier A section always gets at least spot-check
  if (tierA) {
    if (score > 92 && activeRung >= 3) {
      return {
        route: 'spot-check',
        reason: `Tier A section '${sectionName}' with high score ${score} at rung ${activeRung}`,
        criticScore: score,
        tierA,
      };
    }
    return {
      route: 'full-review',
      reason: `Tier A section '${sectionName}' — high-stakes, full review required`,
      criticScore: score,
      tierA,
    };
  }

  // Rule 5: Comfortable pass at high autonomy
  if (score > 92 && activeRung >= 2) {
    return {
      route: 'audit-only',
      reason: `High score ${score} on Tier B section at rung ${activeRung}`,
      criticScore: score,
      tierA,
    };
  }

  // Rule 6: Comfortable pass (>85) on Tier B
  if (score > 85) {
    return {
      route: 'spot-check',
      reason: `Comfortable pass (score ${score}) on Tier B section`,
      criticScore: score,
      tierA,
    };
  }

  // Default: full review
  return {
    route: 'full-review',
    reason: `Moderate score ${score} — default to full review`,
    criticScore: score,
    tierA,
  };
}

export function formatReviewRoute(route: ReviewRoute): string {
  const tierLabel = route.tierA ? ' [Tier A]' : ' [Tier B]';
  return `Review route: ${route.route}${tierLabel} — ${route.reason}`;
}
