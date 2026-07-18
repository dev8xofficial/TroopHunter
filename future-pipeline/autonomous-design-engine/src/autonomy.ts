/**
 * ADE - Autonomy ladder policy (Phase 4)
 *
 * Autonomy is earned with human-calibrated evidence. This module maps the
 * Phase 3 calibration summary to rungs 0-4 and makes the active human gates
 * explicit for every run.
 *
 * @module autonomy
 */

import type { CalibrationSummary } from './calibration.js';
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
}

interface RungRequirement {
  rung: AutonomyRung;
  minVerdicts: number;
  minAccuracy: number;
  maxFalsePassRate: number;
  minRecentAgreement: number;
}

const RUNG_REQUIREMENTS: RungRequirement[] = [
  { rung: 1, minVerdicts: 10, minAccuracy: 0.80, maxFalsePassRate: 0.10, minRecentAgreement: 0.75 },
  { rung: 2, minVerdicts: 25, minAccuracy: 0.85, maxFalsePassRate: 0.08, minRecentAgreement: 0.80 },
  { rung: 3, minVerdicts: 50, minAccuracy: 0.90, maxFalsePassRate: 0.05, minRecentAgreement: 0.85 },
  { rung: 4, minVerdicts: 100, minAccuracy: 0.93, maxFalsePassRate: 0.03, minRecentAgreement: 0.90 },
];

export function recommendAutonomyPolicy(
  summary: CalibrationSummary,
  requestedRung: AutonomyRung = 0,
  currentRung: AutonomyRung = 0,
): AutonomyPolicy {
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
  };
}

export function computeEarnedRung(summary: CalibrationSummary): AutonomyRung {
  if (summary.rewardHackingAlarm.triggered || summary.total === 0) {
    return 0;
  }

  let earned: AutonomyRung = 0;
  const recentAgreement = summary.agreementTrend.at(-1)?.agreement ?? summary.recommendedAccuracy;
  for (const requirement of RUNG_REQUIREMENTS) {
    if (
      summary.total >= requirement.minVerdicts &&
      summary.recommendedAccuracy >= requirement.minAccuracy &&
      summary.falsePassRate <= requirement.maxFalsePassRate &&
      recentAgreement >= requirement.minRecentAgreement
    ) {
      earned = requirement.rung;
    }
  }
  return earned;
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
      return 0.10;
    case 4:
      return 0;
  }
}

export function shouldRequireHumanSectionReview(
  policy: AutonomyPolicy,
  sectionIndex: number,
  criticVerdict: 'pass' | 'fail',
): boolean {
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
  return [
    `Autonomy: requested rung ${policy.requestedRung}, earned rung ${policy.earnedRung}, active rung ${policy.activeRung}`,
    `Human gates: brand=${policy.humanGates.brandApproval ? 'yes' : 'no'}, sections=${policy.humanGates.sectionApproval}, final=${policy.humanGates.finalSignoff ? 'yes' : 'no'}`,
    `Spot-check rate: ${(policy.spotCheckRate * 100).toFixed(0)}%`,
    `Reason: ${policy.reason}`,
  ].join('\n');
}

function explainAutonomy(
  summary: CalibrationSummary,
  requestedRung: AutonomyRung,
  currentRung: AutonomyRung,
  earnedRung: AutonomyRung,
  activeRung: AutonomyRung,
): string {
  if (summary.rewardHackingAlarm.triggered) {
    return 'reward-hacking alarm is active; keep human section review';
  }
  if (summary.total === 0) {
    return 'no human calibration data yet';
  }
  if (activeRung < requestedRung) {
    if (requestedRung > currentRung + 1) {
      return `requested rung ${requestedRung} would skip from rung ${currentRung}; capped at rung ${activeRung}`;
    }
    return `requested rung ${requestedRung} exceeds earned rung ${earnedRung}`;
  }
  return 'calibration evidence supports the active rung';
}
