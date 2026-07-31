/**
 * ADE — Multi-reviewer agreement tracking (Phase 3 / C3.3)
 *
 * Closes F-HUM-02 (reviewer-taste overfitting) and F-HUM-04 (rubber-stamp).
 * Computes inter-rater agreement (Cohen's κ) across reviewer pairs and
 * detects suspiciously uniform review patterns.
 *
 * @module reviewers
 */

import type { VerdictEntry } from './schema.js';
import { isPositiveHumanVerdict } from './verdicts.js';

// ─── Inter-Rater Agreement ─────────────────────────────────────────

export interface ReviewerPairAgreement {
  reviewerA: string;
  reviewerB: string;
  totalPairs: number;
  agreed: number;
  rawAgreement: number;
  cohensKappa: number;
}

export interface ReviewerStats {
  reviewer: string;
  totalVerdicts: number;
  approveRate: number;
  avgRating: number;
}

export interface InterRaterReport {
  pairs: ReviewerPairAgreement[];
  reviewerStats: ReviewerStats[];
  overallKappa: number;
  totalOverlapping: number;
}

const RATING_NUMERIC: Record<string, number> = {
  bad: 0,
  weak: 1,
  good: 2,
  strong: 3,
};

/**
 * Compute inter-rater agreement across all reviewer pairs.
 * Groups verdicts by (run_id, section) and finds pairs where two different
 * reviewers rated the same item.
 */
export function computeInterRaterAgreement(verdicts: VerdictEntry[]): InterRaterReport {
  // Only consider verdicts with a reviewer tag
  const tagged = verdicts.filter((v) => v.reviewer && v.reviewer.trim().length > 0);

  // Group by (run_id, section)
  const groups = new Map<string, VerdictEntry[]>();
  for (const v of tagged) {
    const key = `${v.run_id}::${v.section}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(v);
  }

  // Find all unique reviewer pairs
  const pairMap = new Map<string, { agreed: number; total: number; aPositive: number; bPositive: number }>();
  const reviewerSet = new Set<string>();

  for (const group of groups.values()) {
    // Deduplicate by reviewer within this group
    const byReviewer = new Map<string, VerdictEntry>();
    for (const v of group) {
      // Keep the latest verdict per reviewer
      const existing = byReviewer.get(v.reviewer!);
      if (!existing || v.timestamp > existing.timestamp) {
        byReviewer.set(v.reviewer!, v);
      }
    }

    const reviewers = [...byReviewer.keys()];
    for (const r of reviewers) reviewerSet.add(r);

    // Pairwise comparison
    for (let i = 0; i < reviewers.length; i++) {
      for (let j = i + 1; j < reviewers.length; j++) {
        const rA = reviewers[i];
        const rB = reviewers[j];
        const pairKey = [rA, rB].sort().join('::');
        const vA = byReviewer.get(rA)!;
        const vB = byReviewer.get(rB)!;

        const posA = isPositiveHumanVerdict(vA);
        const posB = isPositiveHumanVerdict(vB);

        if (!pairMap.has(pairKey)) {
          pairMap.set(pairKey, { agreed: 0, total: 0, aPositive: 0, bPositive: 0 });
        }
        const pair = pairMap.get(pairKey)!;
        pair.total++;
        if (posA === posB) pair.agreed++;
        if (posA) pair.aPositive++;
        if (posB) pair.bPositive++;
      }
    }
  }

  // Compute Cohen's κ for each pair
  const pairs: ReviewerPairAgreement[] = [];
  for (const [key, data] of pairMap) {
    const [rA, rB] = key.split('::');
    const rawAgreement = data.total > 0 ? data.agreed / data.total : 0;
    const kappa = computeKappa(data.total, data.agreed, data.aPositive, data.bPositive);
    pairs.push({
      reviewerA: rA,
      reviewerB: rB,
      totalPairs: data.total,
      agreed: data.agreed,
      rawAgreement,
      cohensKappa: kappa,
    });
  }

  // Per-reviewer stats
  const reviewerStats: ReviewerStats[] = [];
  for (const reviewer of reviewerSet) {
    const mine = tagged.filter((v) => v.reviewer === reviewer);
    const approves = mine.filter((v) => isPositiveHumanVerdict(v)).length;
    const ratings = mine.map((v) => RATING_NUMERIC[v.rating] ?? 0);
    const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    reviewerStats.push({
      reviewer,
      totalVerdicts: mine.length,
      approveRate: mine.length > 0 ? approves / mine.length : 0,
      avgRating,
    });
  }

  // Overall κ: weighted average across pairs
  const totalOverlapping = pairs.reduce((sum, p) => sum + p.totalPairs, 0);
  const overallKappa = totalOverlapping > 0 ? pairs.reduce((sum, p) => sum + p.cohensKappa * p.totalPairs, 0) / totalOverlapping : 0;

  return { pairs, reviewerStats, overallKappa, totalOverlapping };
}

/**
 * Cohen's κ: (observed agreement - expected agreement) / (1 - expected agreement)
 */
function computeKappa(total: number, agreed: number, aPositive: number, bPositive: number): number {
  if (total === 0) return 0;

  const po = agreed / total; // observed agreement
  const pYesA = aPositive / total;
  const pYesB = bPositive / total;
  const pNoA = 1 - pYesA;
  const pNoB = 1 - pYesB;
  const pe = pYesA * pYesB + pNoA * pNoB; // expected agreement

  if (pe >= 1) return 1; // perfect expected = perfect observed
  return (po - pe) / (1 - pe);
}

// ─── Rubber-Stamp Detection ────────────────────────────────────────

export interface RubberStampAlert {
  reviewer: string;
  reasons: string[];
}

/**
 * Detect suspiciously uniform review patterns that suggest rubber-stamping.
 */
export function detectRubberStamps(verdicts: VerdictEntry[]): RubberStampAlert[] {
  const tagged = verdicts.filter((v) => v.reviewer && v.reviewer.trim().length > 0);

  // Group by reviewer
  const byReviewer = new Map<string, VerdictEntry[]>();
  for (const v of tagged) {
    if (!byReviewer.has(v.reviewer!)) byReviewer.set(v.reviewer!, []);
    byReviewer.get(v.reviewer!)!.push(v);
  }

  const alerts: RubberStampAlert[] = [];

  for (const [reviewer, mine] of byReviewer) {
    if (mine.length < 5) continue; // need a minimum sample

    const reasons: string[] = [];

    // Check 1: ≥90% approve + good (too uniform)
    const uniformApprove = mine.filter((v) => isPositiveHumanVerdict(v) && v.rating === 'good').length;
    const uniformRate = uniformApprove / mine.length;
    if (uniformRate >= 0.9) {
      reasons.push(`${(uniformRate * 100).toFixed(0)}% of verdicts are approve/good — suspiciously uniform`);
    }

    // Check 2: No notes/rationale on ≥80% of reviews
    const noNotes = mine.filter((v) => !v.notes?.trim() && !v.rationale?.trim()).length;
    const noNotesRate = noNotes / mine.length;
    if (noNotesRate >= 0.8) {
      reasons.push(`${(noNotesRate * 100).toFixed(0)}% of verdicts have no notes/rationale`);
    }

    // Check 3: Suspiciously fast reviews (if review_duration_ms available)
    const withDuration = mine.filter((v) => v.review_duration_ms != null);
    if (withDuration.length >= 3) {
      const avgMs = withDuration.reduce((s, v) => s + v.review_duration_ms!, 0) / withDuration.length;
      if (avgMs < 3000) {
        // < 3 seconds average
        reasons.push(`Average review time ${(avgMs / 1000).toFixed(1)}s — too fast for genuine evaluation`);
      }
    }

    if (reasons.length > 0) {
      alerts.push({ reviewer, reasons });
    }
  }

  return alerts;
}

export function formatInterRaterReport(report: InterRaterReport): string {
  if (report.totalOverlapping === 0) {
    return 'Inter-rater agreement: no overlapping reviews from multiple reviewers.';
  }

  const lines = [`Inter-rater agreement: κ = ${report.overallKappa.toFixed(2)} (${report.totalOverlapping} overlapping items)`];

  for (const p of report.pairs) {
    lines.push(`  ${p.reviewerA} ↔ ${p.reviewerB}: κ = ${p.cohensKappa.toFixed(2)}, raw ${(p.rawAgreement * 100).toFixed(0)}% (n=${p.totalPairs})`);
  }

  for (const s of report.reviewerStats) {
    lines.push(`  ${s.reviewer}: ${s.totalVerdicts} verdicts, ${(s.approveRate * 100).toFixed(0)}% approve, avg rating ${s.avgRating.toFixed(1)}`);
  }

  return lines.join('\n');
}
