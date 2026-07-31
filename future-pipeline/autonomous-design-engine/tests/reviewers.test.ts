import { describe, it, expect } from 'vitest';
import { computeInterRaterAgreement, detectRubberStamps, formatInterRaterReport } from '../src/reviewers.js';
import type { VerdictEntry } from '../src/schema.js';

function verdict(overrides: Partial<VerdictEntry> & { run_id: string; section: string }): VerdictEntry {
  return {
    preferred: 'final',
    rating: 'good',
    timestamp: new Date().toISOString(),
    ...overrides,
  } as VerdictEntry;
}

describe('Inter-Rater Agreement (C3.3)', () => {
  it('computes perfect κ when two reviewers always agree', () => {
    const verdicts: VerdictEntry[] = [
      verdict({ run_id: 'r1', section: 'hero', reviewer: 'alice', human_verdict: 'approve', rating: 'good' }),
      verdict({ run_id: 'r1', section: 'hero', reviewer: 'bob', human_verdict: 'approve', rating: 'good' }),
      verdict({ run_id: 'r2', section: 'pricing', reviewer: 'alice', human_verdict: 'reject', rating: 'bad' }),
      verdict({ run_id: 'r2', section: 'pricing', reviewer: 'bob', human_verdict: 'reject', rating: 'bad' }),
      verdict({ run_id: 'r3', section: 'cta', reviewer: 'alice', human_verdict: 'approve', rating: 'strong' }),
      verdict({ run_id: 'r3', section: 'cta', reviewer: 'bob', human_verdict: 'approve', rating: 'strong' }),
    ];

    const report = computeInterRaterAgreement(verdicts);
    expect(report.pairs).toHaveLength(1);
    expect(report.pairs[0].rawAgreement).toBe(1);
    expect(report.pairs[0].cohensKappa).toBe(1);
    expect(report.overallKappa).toBe(1);
    expect(report.totalOverlapping).toBe(3);
  });

  it('computes low κ when two reviewers disagree on half', () => {
    const verdicts: VerdictEntry[] = [
      verdict({ run_id: 'r1', section: 'hero', reviewer: 'alice', human_verdict: 'approve', rating: 'good' }),
      verdict({ run_id: 'r1', section: 'hero', reviewer: 'bob', human_verdict: 'reject', rating: 'bad' }),
      verdict({ run_id: 'r2', section: 'pricing', reviewer: 'alice', human_verdict: 'approve', rating: 'good' }),
      verdict({ run_id: 'r2', section: 'pricing', reviewer: 'bob', human_verdict: 'approve', rating: 'good' }),
      verdict({ run_id: 'r3', section: 'cta', reviewer: 'alice', human_verdict: 'reject', rating: 'bad' }),
      verdict({ run_id: 'r3', section: 'cta', reviewer: 'bob', human_verdict: 'reject', rating: 'bad' }),
      verdict({ run_id: 'r4', section: 'footer', reviewer: 'alice', human_verdict: 'reject', rating: 'weak' }),
      verdict({ run_id: 'r4', section: 'footer', reviewer: 'bob', human_verdict: 'approve', rating: 'good' }),
    ];

    const report = computeInterRaterAgreement(verdicts);
    expect(report.pairs).toHaveLength(1);
    expect(report.pairs[0].rawAgreement).toBe(0.5);
    expect(report.pairs[0].cohensKappa).toBeLessThan(0.5);
  });

  it('returns empty report when no reviewers are tagged', () => {
    const verdicts: VerdictEntry[] = [verdict({ run_id: 'r1', section: 'hero' })];
    const report = computeInterRaterAgreement(verdicts);
    expect(report.pairs).toHaveLength(0);
    expect(report.totalOverlapping).toBe(0);
  });

  it('tracks per-reviewer stats', () => {
    const verdicts: VerdictEntry[] = [verdict({ run_id: 'r1', section: 'hero', reviewer: 'alice', human_verdict: 'approve', rating: 'strong' }), verdict({ run_id: 'r2', section: 'pricing', reviewer: 'alice', human_verdict: 'approve', rating: 'good' }), verdict({ run_id: 'r3', section: 'cta', reviewer: 'alice', human_verdict: 'reject', rating: 'bad' })];

    const report = computeInterRaterAgreement(verdicts);
    expect(report.reviewerStats).toHaveLength(1);
    expect(report.reviewerStats[0].reviewer).toBe('alice');
    expect(report.reviewerStats[0].totalVerdicts).toBe(3);
    expect(report.reviewerStats[0].approveRate).toBeCloseTo(2 / 3);
  });

  it('formatInterRaterReport handles no overlaps', () => {
    const report = computeInterRaterAgreement([]);
    const text = formatInterRaterReport(report);
    expect(text).toContain('no overlapping reviews');
  });
});

describe('Rubber-Stamp Detection (C3.3)', () => {
  it('flags a reviewer with 95% approve/good and no notes', () => {
    const verdicts: VerdictEntry[] = [];
    for (let i = 0; i < 20; i++) {
      verdicts.push(
        verdict({
          run_id: `r${i}`,
          section: 'hero',
          reviewer: 'rubber-stamper',
          human_verdict: 'approve',
          rating: 'good',
          // No notes, no rationale
        }),
      );
    }

    const alerts = detectRubberStamps(verdicts);
    expect(alerts).toHaveLength(1);
    expect(alerts[0].reviewer).toBe('rubber-stamper');
    expect(alerts[0].reasons.some((r) => r.includes('uniform'))).toBe(true);
    expect(alerts[0].reasons.some((r) => r.includes('notes'))).toBe(true);
  });

  it('does not flag a diligent reviewer with varied verdicts and notes', () => {
    const verdicts: VerdictEntry[] = [];
    const ratings: Array<'bad' | 'weak' | 'good' | 'strong'> = ['bad', 'weak', 'good', 'strong'];
    const decisions: Array<'approve' | 'reject'> = ['approve', 'reject'];
    for (let i = 0; i < 20; i++) {
      verdicts.push(
        verdict({
          run_id: `r${i}`,
          section: 'hero',
          reviewer: 'diligent',
          human_verdict: decisions[i % 2],
          rating: ratings[i % 4],
          notes: `Review comment ${i}`,
        }),
      );
    }

    const alerts = detectRubberStamps(verdicts);
    expect(alerts).toHaveLength(0);
  });

  it('flags suspiciously fast reviews', () => {
    const verdicts: VerdictEntry[] = [];
    for (let i = 0; i < 10; i++) {
      verdicts.push(
        verdict({
          run_id: `r${i}`,
          section: 'hero',
          reviewer: 'speed-clicker',
          human_verdict: i % 3 === 0 ? 'reject' : 'approve',
          rating: i % 3 === 0 ? 'bad' : 'strong',
          notes: `Note ${i}`,
          review_duration_ms: 1500, // 1.5 seconds — too fast
        }),
      );
    }

    const alerts = detectRubberStamps(verdicts);
    expect(alerts).toHaveLength(1);
    expect(alerts[0].reasons.some((r) => r.includes('fast'))).toBe(true);
  });

  it('requires minimum 5 verdicts before alerting', () => {
    const verdicts: VerdictEntry[] = [];
    for (let i = 0; i < 3; i++) {
      verdicts.push(
        verdict({
          run_id: `r${i}`,
          section: 'hero',
          reviewer: 'new-reviewer',
          human_verdict: 'approve',
          rating: 'good',
        }),
      );
    }

    const alerts = detectRubberStamps(verdicts);
    expect(alerts).toHaveLength(0);
  });
});
