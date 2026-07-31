/**
 * ADE - Autonomy ladder policy (Phase 3 / C3.2)
 *
 * Autonomy is earned with human-calibrated evidence. This module maps the
 * Phase 3 calibration summary to rungs 0-4 and makes the active human gates
 * explicit for every run.
 *
 * C3.2 additions:
 * - Per-stratum thresholds (routine/hard/adversarial) — an aggregate pass
 *   masking a stratum failure is NOT a pass.
 * - Standing audit miss-rate — if >maxFalsePassRate, drop back to rung 1.
 * - Power-analysis citation in the explanation string.
 *
 * @module autonomy
 */

import type { CalibrationSummary, ConfusionMatrix, Stratum } from './calibration.js';
import type { AutonomyRung } from './schema.js';

export interface AutonomyPolicy {
  requestedRung: AutonomyRung;
  earnedRung: AutonomyRung;
  activeRung: AutonomyRung;
  humanGates: {
    brandApproval: boolean;
    sectionApproval: 'every-section' | 'spot-check' | 'exceptions-only' | 'none';
    finalSignoff: boolean;
  };
  spotCheckRate: number;
  reason: string;
  /** C3.2: per-stratum detail for diagnostic / CLI display */
  stratumDetail: StratumDetail[];
}

export interface StratumDetail {
  stratum: Stratum;
  accuracy: number;
  falsePassRate: number;
  total: number;
  meetsThreshold: boolean;
}

interface RungRequirement {
  rung: AutonomyRung;
  minVerdicts: number;
  minAccuracy: number;
  maxFalsePassRate: number;
  minRecentAgreement: number;
  /** Which strata must individually pass to earn this rung */
  requiredStrata: Stratum[];
  /** Minimum per-stratum sample count */
  minPerStratum: number;
}

const RUNG_REQUIREMENTS: RungRequirement[] = [
  { rung: 1, minVerdicts: 10, minAccuracy: 0.8, maxFalsePassRate: 0.1, minRecentAgreement: 0.75, requiredStrata: ['routine'], minPerStratum: 5 },
  { rung: 2, minVerdicts: 25, minAccuracy: 0.85, maxFalsePassRate: 0.08, minRecentAgreement: 0.8, requiredStrata: ['routine', 'hard'], minPerStratum: 5 },
  { rung: 3, minVerdicts: 50, minAccuracy: 0.9, maxFalsePassRate: 0.05, minRecentAgreement: 0.85, requiredStrata: ['routine', 'hard', 'adversarial'], minPerStratum: 5 },
  { rung: 4, minVerdicts: 100, minAccuracy: 0.93, maxFalsePassRate: 0.03, minRecentAgreement: 0.9, requiredStrata: ['routine', 'hard', 'adversarial'], minPerStratum: 10 },
];

export function recommendAutonomyPolicy(summary: CalibrationSummary, requestedRung: AutonomyRung = 0, currentRung: AutonomyRung = 0): AutonomyPolicy {
  const earnedRung = computeEarnedRung(summary);
  const noSkipRung = Math.min(currentRung + 1, requestedRung, earnedRung) as AutonomyRung;
  const activeRung = Math.max(0, noSkipRung) as AutonomyRung;

  return {
    requestedRung,
    earnedRung,
    activeRung,
    humanGates: humanGatesForRung(activeRung),
    spotCheckRate: spotCheckRateForRung(activeRung),
    reason: explainAutonomy(summary, requestedRung, currentRung, earnedRung, activeRung),
    stratumDetail: buildStratumDetail(summary),
  };
}

export function computeEarnedRung(summary: CalibrationSummary): AutonomyRung {
  if (summary.rewardHackingAlarm.triggered || summary.total === 0) {
    return 0;
  }

  // C3.2: standing audit miss-rate check — if the measured audit false-pass
  // rate exceeds 5%, automatically cap at rung 1 regardless of aggregate.
  if (summary.auditMissRate > 0.05) {
    return Math.min(1, computeAggregateRung(summary)) as AutonomyRung;
  }

  return computeAggregateRung(summary);
}

function computeAggregateRung(summary: CalibrationSummary): AutonomyRung {
  let earned: AutonomyRung = 0;
  const recentAgreement = summary.agreementTrend.at(-1)?.agreement ?? summary.recommendedAccuracy;

  for (const requirement of RUNG_REQUIREMENTS) {
    // Aggregate check
    if (summary.total < requirement.minVerdicts || summary.recommendedAccuracy < requirement.minAccuracy || summary.falsePassRate > requirement.maxFalsePassRate || recentAgreement < requirement.minRecentAgreement) {
      break;
    }

    // C3.2: per-stratum check — every required stratum must individually pass
    let allStrataPass = true;
    for (const s of requirement.requiredStrata) {
      const stratumMatrix = summary.strata[s];
      if (stratumMatrix.total < requirement.minPerStratum || stratumMatrix.accuracy < requirement.minAccuracy || stratumMatrix.falsePassRate > requirement.maxFalsePassRate) {
        allStrataPass = false;
        break;
      }
    }

    if (!allStrataPass) {
      break;
    }

    earned = requirement.rung;
  }

  return earned;
}

function buildStratumDetail(summary: CalibrationSummary): StratumDetail[] {
  const allStrata: Stratum[] = ['routine', 'hard', 'adversarial'];
  // Use the earned rung's requirement to determine if each stratum "passes"
  const earned = computeEarnedRung(summary);
  const nextReq = RUNG_REQUIREMENTS.find((r) => r.rung === earned + 1) ?? RUNG_REQUIREMENTS[0];

  return allStrata.map((s) => {
    const m = summary.strata[s];
    return {
      stratum: s,
      accuracy: m.accuracy,
      falsePassRate: m.falsePassRate,
      total: m.total,
      meetsThreshold: m.total >= nextReq.minPerStratum && m.accuracy >= nextReq.minAccuracy && m.falsePassRate <= nextReq.maxFalsePassRate,
    };
  });
}

export function humanGatesForRung(rung: AutonomyRung): AutonomyPolicy['humanGates'] {
  switch (rung) {
    case 0:
    case 1:
      return {
        brandApproval: true,
        sectionApproval: 'every-section',
        finalSignoff: true,
      };
    case 2:
      return {
        brandApproval: true,
        sectionApproval: 'spot-check',
        finalSignoff: true,
      };
    case 3:
      return {
        brandApproval: true,
        sectionApproval: 'exceptions-only',
        finalSignoff: true,
      };
    case 4:
      return {
        brandApproval: true,
        sectionApproval: 'none',
        finalSignoff: true,
      };
  }
}

export function spotCheckRateForRung(rung: AutonomyRung): number {
  switch (rung) {
    case 0:
    case 1:
      return 1;
    case 2:
      return 0.35;
    case 3:
      return 0.1;
    case 4:
      return 0;
  }
}

export function shouldRequireHumanSectionReview(policy: AutonomyPolicy, sectionIndex: number, criticVerdict: 'pass' | 'fail'): boolean {
  if (criticVerdict === 'fail') {
    return true;
  }

  switch (policy.humanGates.sectionApproval) {
    case 'every-section':
      return true;
    case 'spot-check':
      return sectionIndex === 0 || sectionIndex % Math.max(1, Math.round(1 / policy.spotCheckRate)) === 0;
    case 'exceptions-only':
    case 'none':
      return false;
  }
}

export function formatAutonomyPolicy(policy: AutonomyPolicy): string {
  const lines = [
    `Autonomy: requested rung ${policy.requestedRung}, earned rung ${policy.earnedRung}, active rung ${policy.activeRung}`,
    `Human gates: brand=${policy.humanGates.brandApproval ? 'yes' : 'no'}, sections=${policy.humanGates.sectionApproval}, final=${policy.humanGates.finalSignoff ? 'yes' : 'no'}`,
    `Spot-check rate: ${(policy.spotCheckRate * 100).toFixed(0)}%`,
    `Reason: ${policy.reason}`,
  ];

  // C3.2: per-stratum breakdown
  if (policy.stratumDetail.length > 0) {
    lines.push('Per-stratum agreement:');
    for (const d of policy.stratumDetail) {
      const passLabel = d.meetsThreshold ? '✓' : '✗';
      lines.push(`  ${passLabel} ${d.stratum}: ${(d.accuracy * 100).toFixed(0)}% accuracy, ${(d.falsePassRate * 100).toFixed(0)}% false-pass (n=${d.total})`);
    }
  }

  return lines.join('\n');
}

function explainAutonomy(summary: CalibrationSummary, requestedRung: AutonomyRung, currentRung: AutonomyRung, earnedRung: AutonomyRung, activeRung: AutonomyRung): string {
  if (summary.rewardHackingAlarm.triggered) {
    return 'reward-hacking alarm is active; keep human section review';
  }
  if (summary.total === 0) {
    return 'no human calibration data yet';
  }

  // C3.2: audit miss-rate breach
  if (summary.auditMissRate > 0.05) {
    return `standing audit miss-rate ${(summary.auditMissRate * 100).toFixed(0)}% exceeds 5% threshold; capped at rung ${earnedRung}`;
  }

  // C3.2: per-stratum denial
  const nextReq = RUNG_REQUIREMENTS.find((r) => r.rung === earnedRung + 1);
  if (nextReq && activeRung < requestedRung) {
    for (const s of nextReq.requiredStrata) {
      const m = summary.strata[s];
      if (m.total < nextReq.minPerStratum) {
        return `denied rung ${nextReq.rung}: '${s}' stratum has ${m.total} verdicts < required ${nextReq.minPerStratum}. Cites power analysis [ADE-PA-01] for boundary × stratum confidence`;
      }
      if (m.accuracy < nextReq.minAccuracy) {
        return `denied rung ${nextReq.rung}: '${s}' stratum accuracy ${(m.accuracy * 100).toFixed(0)}% < required ${(nextReq.minAccuracy * 100).toFixed(0)}%. Cites power analysis [ADE-PA-01] for boundary × stratum confidence`;
      }
      if (m.falsePassRate > nextReq.maxFalsePassRate) {
        return `denied rung ${nextReq.rung}: '${s}' stratum false-pass rate ${(m.falsePassRate * 100).toFixed(0)}% > allowed ${(nextReq.maxFalsePassRate * 100).toFixed(0)}%. Cites power analysis [ADE-PA-01] for boundary × stratum confidence`;
      }
    }
  }

  if (activeRung < requestedRung) {
    if (requestedRung > currentRung + 1) {
      return `requested rung ${requestedRung} would skip from rung ${currentRung}; capped at rung ${activeRung}. Cites power analysis [ADE-PA-01] for boundary × stratum confidence`;
    }
    return `requested rung ${requestedRung} exceeds earned rung ${earnedRung}. Cites power analysis [ADE-PA-01] for boundary × stratum confidence`;
  }
  return `calibration evidence supports the active rung. Cites power analysis [ADE-PA-01] for boundary × stratum confidence`;
}
