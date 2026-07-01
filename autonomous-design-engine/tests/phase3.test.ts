import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import type { CriticOutput, RunRecord, VerdictEntry } from '../src/schema.js';
import {
  buildCalibrationExamples,
  calibrateFromRecords,
  computeAgreementTrend,
  confusionAtThreshold,
  detectRewardHacking,
} from '../src/calibration.js';
import { normalizeCriticOutput } from '../src/critic.js';
import {
  readVerdicts,
  recordHumanVerdict,
} from '../src/verdicts.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'phase3-test');

describe('Phase 3 Taste / Judge calibration', () => {
  beforeEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it('records explicit human approve/reject verdicts durably', () => {
    const entry = recordHumanVerdict(TEST_DIR, {
      runId: 'run-1',
      section: 'hero',
      decision: 'approve',
      rating: 'strong',
      candidateId: 'iter2-cand1',
      criticScore: 87,
      criticVerdict: 'pass',
      threshold: 80,
      notes: 'Clear hierarchy and the CTA finally feels earned.',
    });

    const verdicts = readVerdicts(TEST_DIR);
    expect(verdicts).toHaveLength(1);
    expect(verdicts[0]).toEqual(entry);
    expect(verdicts[0].human_verdict).toBe('approve');
  });

  it('tracks Critic-human agreement trend over batches', () => {
    const records = [
      makeRecord('run-1', 0, 90),
      makeRecord('run-2', 0, 85),
      makeRecord('run-3', 0, 45),
      makeRecord('run-4', 0, 91),
      makeRecord('run-5', 0, 88),
      makeRecord('run-6', 0, 35),
    ];
    const verdicts: VerdictEntry[] = [
      makeVerdict('run-1', 'approve', 'good', '2026-01-01T00:00:00.000Z'),
      makeVerdict('run-2', 'reject', 'weak', '2026-01-02T00:00:00.000Z'),
      makeVerdict('run-3', 'approve', 'good', '2026-01-03T00:00:00.000Z'),
      makeVerdict('run-4', 'approve', 'strong', '2026-01-04T00:00:00.000Z'),
      makeVerdict('run-5', 'approve', 'good', '2026-01-05T00:00:00.000Z'),
      makeVerdict('run-6', 'reject', 'bad', '2026-01-06T00:00:00.000Z'),
    ];

    const examples = buildCalibrationExamples(records, verdicts, 80);
    const trend = computeAgreementTrend(examples, 3, 80);

    expect(trend).toHaveLength(2);
    expect(trend[0].agreement).toBeCloseTo(1 / 3);
    expect(trend[1].agreement).toBe(1);
  });

  it('recommends a threshold that reduces false pass/fail mistakes', () => {
    const records = [
      makeRecord('run-a', 0, 72),
      makeRecord('run-b', 0, 76),
      makeRecord('run-c', 0, 88),
    ];
    const verdicts: VerdictEntry[] = [
      makeVerdict('run-a', 'approve', 'good', '2026-01-01T00:00:00.000Z'),
      makeVerdict('run-b', 'approve', 'strong', '2026-01-02T00:00:00.000Z'),
      makeVerdict('run-c', 'reject', 'weak', '2026-01-03T00:00:00.000Z'),
    ];

    const summary = calibrateFromRecords(records, verdicts, 80);
    const examples = buildCalibrationExamples(records, verdicts, 80);
    const current = confusionAtThreshold(examples, 80);
    const recommended = confusionAtThreshold(examples, summary.recommendedThreshold);

    expect(summary.recommendedThreshold).toBe(72);
    expect(recommended.accuracy).toBeGreaterThan(current.accuracy);
    expect(recommended.falsePasses + recommended.falseFails)
      .toBeLessThan(current.falsePasses + current.falseFails);
  });

  it('raises a reward-hacking alarm when Critic scores climb but humans reject', () => {
    const records = [
      makeRecord('run-1', 0, 50),
      makeRecord('run-1', 1, 70),
      makeRecord('run-2', 0, 55),
      makeRecord('run-2', 1, 75),
      makeRecord('run-3', 0, 60),
      makeRecord('run-3', 1, 85),
    ];
    const verdicts: VerdictEntry[] = [
      makeVerdict('run-1', 'reject', 'weak', '2026-01-01T00:00:00.000Z'),
      makeVerdict('run-2', 'reject', 'bad', '2026-01-02T00:00:00.000Z'),
      makeVerdict('run-3', 'reject', 'weak', '2026-01-03T00:00:00.000Z'),
    ];

    const examples = buildCalibrationExamples(records, verdicts, 80);
    const alarm = detectRewardHacking(examples);

    expect(alarm.triggered).toBe(true);
    expect(alarm.suspectRuns).toContain('run-3:hero');
  });

  it('keeps pairwise Critic ranking ahead of absolute score fallback', () => {
    const output: CriticOutput = {
      candidates: [
        makeCandidate('a', 92),
        makeCandidate('b', 81),
        makeCandidate('c', 70),
      ],
      ranking: ['b', 'a'],
    };

    const normalized = normalizeCriticOutput(output, ['a', 'b', 'c'], 80, false);

    expect(normalized.ranking).toEqual(['b', 'a', 'c']);
    expect(normalized.candidates.find(candidate => candidate.candidate_id === 'b')?.verdict).toBe('pass');
  });
});

function makeRecord(
  runId: string,
  iteration: number,
  score: number,
  candidateId = `iter${iteration}-cand1`,
): RunRecord {
  return {
    run_id: runId,
    section_id: 'client_hero',
    iteration,
    candidate_id: candidateId,
    input_bundle_ref: `bundle:${runId}:${iteration}`,
    output_code_ref: '/tmp/Section.tsx',
    screenshots: {},
    scores: {
      brand_adherence: score,
      system_adherence: null,
      brief_fit: score,
      craft: score,
      weighted_total: score,
    },
    verdict: score >= 80 ? 'pass' : 'fail',
    critic_feedback: 'synthetic',
    duration_ms: 100,
    tokens: { input: 10, output: 10 },
    model_id: 'mock',
    timestamp: `2026-01-01T00:00:0${iteration}.000Z`,
  };
}

function makeVerdict(
  runId: string,
  decision: 'approve' | 'reject',
  rating: 'bad' | 'weak' | 'good' | 'strong',
  timestamp: string,
): VerdictEntry {
  return {
    run_id: runId,
    section: 'hero',
    preferred: decision === 'approve' ? 'final' : 'iter0',
    rating,
    human_verdict: decision,
    timestamp,
  };
}

function makeCandidate(candidateId: string, score: number): CriticOutput['candidates'][number] {
  return {
    candidate_id: candidateId,
    scores: {
      brand_adherence: score,
      system_adherence: null,
      brief_fit: score,
      craft: score,
      weighted_total: score,
    },
    verdict: 'fail',
    feedback: 'synthetic',
  };
}
