/**
 * ADE - Human-anchored Critic calibration (Phase 3)
 *
 * Quality reporting must be anchored to human verdicts (I12). This module
 * aligns trace records with verdicts, estimates the Critic/human gap, tunes
 * threshold recommendations, and raises reward-hacking alarms.
 *
 * @module calibration
 */

import type { DimensionScores, RunRecord, VerdictEntry } from './schema.js';
import { isPositiveHumanVerdict, ratingToScore } from './verdicts.js';

export interface CalibrationExample {
  runId: string;
  section: string;
  candidateId: string;
  criticScore: number;
  criticPassed: boolean;
  humanPositive: boolean;
  ratingScore: number;
  preferred: 'iter0' | 'final';
  timestamp: string;
  notes?: string;
  scoreGain?: number;
  scores?: DimensionScores;
}

export interface ConfusionMatrix {
  truePasses: number;
  trueFails: number;
  falsePasses: number;
  falseFails: number;
  total: number;
  accuracy: number;
  falsePassRate: number;
  falseFailRate: number;
}

export interface AgreementTrendBatch {
  batch: number;
  total: number;
  agreement: number;
  falsePasses: number;
  falseFails: number;
  startTimestamp?: string;
  endTimestamp?: string;
}

export interface RewardHackingAlarm {
  triggered: boolean;
  suspectRuns: string[];
  reasons: string[];
}

export interface RubricRotationExample {
  kind: 'false-pass' | 'false-fail';
  runId: string;
  section: string;
  note: string;
}

export interface CalibrationSummary {
  total: number;
  currentThreshold: number;
  recommendedThreshold: number;
  agreement: number;
  agreementGap: number;
  currentAccuracy: number;
  recommendedAccuracy: number;
  falsePasses: number;
  falseFails: number;
  falsePassRate: number;
  falseFailRate: number;
  agreementTrend: AgreementTrendBatch[];
  rewardHackingAlarm: RewardHackingAlarm;
  autonomy: {
    currentRung: 0;
    recommendedRung: 0 | 1;
    reason: string;
  };
  weightHints: string[];
  rubricExamples: RubricRotationExample[];
}

export function calibrateFromRecords(
  records: RunRecord[],
  verdicts: VerdictEntry[],
  currentThreshold = 80,
): CalibrationSummary {
  const examples = buildCalibrationExamples(records, verdicts, currentThreshold);
  return summarizeCalibration(examples, currentThreshold);
}

export function buildCalibrationExamples(
  records: RunRecord[],
  verdicts: VerdictEntry[],
  currentThreshold = 80,
): CalibrationExample[] {
  const examples: CalibrationExample[] = [];

  for (const verdict of verdicts) {
    const matched = records.filter(record => recordMatchesVerdict(record, verdict));
    const target = pickTargetRecord(matched, verdict);
    const iter0 = pickBestForIteration(matched, 0);
    const final = pickFinalRecord(matched);
    const criticScore = verdict.critic_score ?? target?.scores.weighted_total;

    if (criticScore === undefined) {
      continue;
    }

    const threshold = verdict.threshold ?? currentThreshold;
    const criticPassed = verdict.critic_verdict
      ? verdict.critic_verdict === 'pass'
      : criticScore >= threshold;

    examples.push({
      runId: verdict.run_id,
      section: verdict.section,
      candidateId: verdict.candidate_id ?? target?.candidate_id ?? 'final',
      criticScore,
      criticPassed,
      humanPositive: isPositiveHumanVerdict(verdict),
      ratingScore: ratingToScore(verdict.rating),
      preferred: verdict.preferred,
      timestamp: verdict.timestamp,
      notes: verdict.notes,
      scoreGain: iter0 && final
        ? final.scores.weighted_total - iter0.scores.weighted_total
        : undefined,
      scores: target?.scores,
    });
  }

  return examples.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

export function summarizeCalibration(
  examples: CalibrationExample[],
  currentThreshold = 80,
): CalibrationSummary {
  const current = confusionAtThreshold(examples, currentThreshold);
  const threshold = recommendThreshold(examples, currentThreshold);
  const recommended = confusionAtThreshold(examples, threshold);
  const alarm = detectRewardHacking(examples);
  const autonomy = recommendAutonomyRung(examples.length, recommended, alarm);

  return {
    total: examples.length,
    currentThreshold,
    recommendedThreshold: threshold,
    agreement: current.accuracy,
    agreementGap: 1 - current.accuracy,
    currentAccuracy: current.accuracy,
    recommendedAccuracy: recommended.accuracy,
    falsePasses: current.falsePasses,
    falseFails: current.falseFails,
    falsePassRate: current.falsePassRate,
    falseFailRate: current.falseFailRate,
    agreementTrend: computeAgreementTrend(examples, 5, currentThreshold),
    rewardHackingAlarm: alarm,
    autonomy,
    weightHints: buildWeightHints(examples, currentThreshold),
    rubricExamples: selectRubricRotationExamples(examples, 3, currentThreshold),
  };
}

export function confusionAtThreshold(
  examples: CalibrationExample[],
  threshold: number,
): ConfusionMatrix {
  let truePasses = 0;
  let trueFails = 0;
  let falsePasses = 0;
  let falseFails = 0;

  for (const example of examples) {
    const predictedPass = example.criticScore >= threshold;
    if (predictedPass && example.humanPositive) truePasses++;
    if (!predictedPass && !example.humanPositive) trueFails++;
    if (predictedPass && !example.humanPositive) falsePasses++;
    if (!predictedPass && example.humanPositive) falseFails++;
  }

  const total = examples.length;
  const accuracy = total === 0 ? 0 : (truePasses + trueFails) / total;
  return {
    truePasses,
    trueFails,
    falsePasses,
    falseFails,
    total,
    accuracy,
    falsePassRate: total === 0 ? 0 : falsePasses / total,
    falseFailRate: total === 0 ? 0 : falseFails / total,
  };
}

export function recommendThreshold(
  examples: CalibrationExample[],
  currentThreshold = 80,
): number {
  if (examples.length === 0) {
    return currentThreshold;
  }

  let bestThreshold = currentThreshold;
  let bestMatrix = confusionAtThreshold(examples, currentThreshold);
  let bestErrors = bestMatrix.falsePasses + bestMatrix.falseFails;

  for (let threshold = 0; threshold <= 100; threshold++) {
    const matrix = confusionAtThreshold(examples, threshold);
    const errors = matrix.falsePasses + matrix.falseFails;
    const better =
      errors < bestErrors ||
      (errors === bestErrors && matrix.falsePasses < bestMatrix.falsePasses) ||
      (errors === bestErrors &&
        matrix.falsePasses === bestMatrix.falsePasses &&
        Math.abs(threshold - currentThreshold) < Math.abs(bestThreshold - currentThreshold));

    if (better) {
      bestThreshold = threshold;
      bestMatrix = matrix;
      bestErrors = errors;
    }
  }

  return bestThreshold;
}

export function computeAgreementTrend(
  examples: CalibrationExample[],
  batchSize = 5,
  threshold = 80,
): AgreementTrendBatch[] {
  if (batchSize <= 0) {
    throw new Error('batchSize must be positive');
  }

  const sorted = [...examples].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  const batches: AgreementTrendBatch[] = [];

  for (let i = 0; i < sorted.length; i += batchSize) {
    const batchExamples = sorted.slice(i, i + batchSize);
    const matrix = confusionAtThreshold(batchExamples, threshold);
    batches.push({
      batch: batches.length + 1,
      total: batchExamples.length,
      agreement: matrix.accuracy,
      falsePasses: matrix.falsePasses,
      falseFails: matrix.falseFails,
      startTimestamp: batchExamples[0]?.timestamp,
      endTimestamp: batchExamples[batchExamples.length - 1]?.timestamp,
    });
  }

  return batches;
}

export function detectRewardHacking(examples: CalibrationExample[]): RewardHackingAlarm {
  if (examples.length === 0) {
    return { triggered: false, suspectRuns: [], reasons: [] };
  }

  const scoreGains = examples
    .map(example => example.scoreGain)
    .filter((gain): gain is number => gain !== undefined);
  const averageScoreGain = scoreGains.length === 0
    ? 0
    : average(scoreGains);
  const averageRating = average(examples.map(example => example.ratingScore));
  const suspectExamples = examples.filter(example =>
    (example.scoreGain ?? 0) > 0 &&
    (!example.humanPositive || example.ratingScore <= 1),
  );
  const suspectFloor = Math.max(2, Math.ceil(examples.length * 0.4));
  const triggered =
    averageScoreGain > 2 &&
    suspectExamples.length >= suspectFloor;

  const reasons: string[] = [];
  if (averageScoreGain > 2) {
    reasons.push(`critic scores rose by ${averageScoreGain.toFixed(1)} points on average`);
  }
  if (averageRating < 2) {
    reasons.push(`average human rating stayed below good (${averageRating.toFixed(1)}/3)`);
  }
  if (suspectExamples.length > 0) {
    reasons.push(`${suspectExamples.length} improving runs were rejected or rated weak/bad`);
  }

  return {
    triggered,
    suspectRuns: suspectExamples.map(example => `${example.runId}:${example.section}`),
    reasons,
  };
}

export function selectRubricRotationExamples(
  examples: CalibrationExample[],
  limit = 3,
  threshold = 80,
): RubricRotationExample[] {
  return examples
    .filter(example => example.notes && example.notes.trim().length > 0)
    .map(example => {
      const predictedPass = example.criticScore >= threshold;
      if (predictedPass && !example.humanPositive) {
        return { kind: 'false-pass' as const, example };
      }
      if (!predictedPass && example.humanPositive) {
        return { kind: 'false-fail' as const, example };
      }
      return null;
    })
    .filter((item): item is { kind: 'false-pass' | 'false-fail'; example: CalibrationExample } => item !== null)
    .sort((a, b) => b.example.timestamp.localeCompare(a.example.timestamp))
    .slice(0, limit)
    .map(item => ({
      kind: item.kind,
      runId: item.example.runId,
      section: item.example.section,
      note: item.example.notes ?? '',
    }));
}

export function formatCalibrationSummary(summary: CalibrationSummary): string {
  if (summary.total === 0) {
    return [
      'Human calibration (I12): no matching verdicts yet.',
      'Quality claims remain Critic-only until verdicts.jsonl has human decisions.',
    ].join('\n');
  }

  const lines = [
    `Human calibration (I12): ${summary.total} matched verdict${summary.total === 1 ? '' : 's'}`,
    `Agreement: ${(summary.agreement * 100).toFixed(0)}% (gap ${(summary.agreementGap * 100).toFixed(0)}%)`,
    `False pass/fail: ${summary.falsePasses}/${summary.falseFails}`,
    `Threshold: current ${summary.currentThreshold}, recommended ${summary.recommendedThreshold} (${(summary.currentAccuracy * 100).toFixed(0)}% -> ${(summary.recommendedAccuracy * 100).toFixed(0)}% accuracy)`,
    `Autonomy ladder: rung 0 -> ${summary.autonomy.recommendedRung} (${summary.autonomy.reason})`,
  ];

  if (summary.rewardHackingAlarm.triggered) {
    lines.push(`Reward-hacking alarm: ON - ${summary.rewardHackingAlarm.reasons.join('; ')}`);
  } else {
    lines.push('Reward-hacking alarm: off');
  }

  if (summary.weightHints.length > 0) {
    lines.push(`Calibration hints: ${summary.weightHints.join(' ')}`);
  }

  return lines.join('\n');
}

function recommendAutonomyRung(
  total: number,
  recommended: ConfusionMatrix,
  alarm: RewardHackingAlarm,
): CalibrationSummary['autonomy'] {
  if (total < 10) {
    return {
      currentRung: 0,
      recommendedRung: 0,
      reason: `need at least 10 human verdicts; have ${total}`,
    };
  }

  if (alarm.triggered) {
    return {
      currentRung: 0,
      recommendedRung: 0,
      reason: 'reward-hacking alarm is active',
    };
  }

  if (recommended.accuracy >= 0.8 && recommended.falsePassRate <= 0.1) {
    return {
      currentRung: 0,
      recommendedRung: 1,
      reason: 'agreement is high enough to trust most Critic passes',
    };
  }

  return {
    currentRung: 0,
    recommendedRung: 0,
    reason: 'agreement or false-pass rate is not stable enough',
  };
}

function buildWeightHints(
  examples: CalibrationExample[],
  threshold: number,
): string[] {
  const falsePasses = examples.filter(example =>
    example.criticScore >= threshold && !example.humanPositive,
  );
  const falseFails = examples.filter(example =>
    example.criticScore < threshold && example.humanPositive,
  );

  const hints: string[] = [];
  if (falsePasses.length > falseFails.length) {
    hints.push('False passes dominate; raise the threshold or penalize over-polished misses.');
  } else if (falseFails.length > falsePasses.length) {
    hints.push('False fails dominate; lower the threshold or reward human-approved craft more.');
  }

  const shinyMisses = falsePasses.filter(example =>
    example.scores &&
    example.scores.craft >= 85 &&
    example.scores.brief_fit < example.scores.craft,
  );
  if (shinyMisses.length > 0) {
    hints.push('False passes skew high-craft/low-brief-fit; increase brief_fit weight.');
  }

  return hints;
}

function recordMatchesVerdict(record: RunRecord, verdict: VerdictEntry): boolean {
  if (record.run_id !== verdict.run_id) {
    return false;
  }
  const recordSection = normalizeSection(record.section_id);
  const verdictSection = normalizeSection(verdict.section);
  return (
    recordSection === verdictSection ||
    recordSection.endsWith(`_${verdictSection}`) ||
    recordSection.endsWith(`-${verdictSection}`)
  );
}

function pickTargetRecord(records: RunRecord[], verdict: VerdictEntry): RunRecord | undefined {
  if (verdict.candidate_id) {
    const exact = records.find(record => record.candidate_id === verdict.candidate_id);
    if (exact) {
      return exact;
    }
  }
  return pickFinalRecord(records) ?? pickBestRecord(records);
}

function pickBestForIteration(records: RunRecord[], iteration: number): RunRecord | undefined {
  return pickBestRecord(records.filter(record => record.iteration === iteration));
}

function pickFinalRecord(records: RunRecord[]): RunRecord | undefined {
  if (records.length === 0) {
    return undefined;
  }
  const maxIteration = Math.max(...records.map(record => record.iteration));
  return pickBestRecord(records.filter(record => record.iteration === maxIteration));
}

function pickBestRecord(records: RunRecord[]): RunRecord | undefined {
  return records.reduce<RunRecord | undefined>((best, record) => {
    if (!best) {
      return record;
    }
    if (record.scores.weighted_total > best.scores.weighted_total) {
      return record;
    }
    if (
      record.scores.weighted_total === best.scores.weighted_total &&
      record.scores.craft > best.scores.craft
    ) {
      return record;
    }
    return best;
  }, undefined);
}

function normalizeSection(section: string): string {
  return section.trim().toLowerCase();
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
