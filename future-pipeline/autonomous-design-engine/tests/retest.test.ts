/**
 * ADE Tests — Retest (C0.16 / E0.7 quarterly test-retest ritual)
 */

import { describe, it, expect, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import type { RetestCase, VerdictEntry } from '../src/schema.js';
import { freezeRetestBaseline, readRetestSet, retestSetPath, runRetest, RetestError } from '../src/retest.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'retest-test');

afterEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

function makeCase(overrides: Partial<RetestCase> = {}): RetestCase {
  return {
    case_id: 'case-1',
    run_id: 'run-1',
    section: 'hero',
    iter0_shots_dir: '/shots/run-1/iter0',
    final_shots_dir: '/shots/run-1/final',
    baseline_rating: 'good',
    baseline_preferred: 'final',
    baseline_captured_at: new Date().toISOString(),
    ...overrides,
  };
}

describe('freezeRetestBaseline (C0.16)', () => {
  it('freezes a case set and it becomes readable via readRetestSet', () => {
    const set = freezeRetestBaseline(TEST_DIR, [makeCase()]);
    expect(set.cases).toHaveLength(1);
    expect(existsSync(retestSetPath(TEST_DIR))).toBe(true);

    const reread = readRetestSet(TEST_DIR);
    expect(reread?.cases[0].case_id).toBe('case-1');
    expect(reread?.cases[0].baseline_rating).toBe('good');
  });

  it('refuses to freeze a SECOND baseline over an existing one — "frozen" means frozen', () => {
    freezeRetestBaseline(TEST_DIR, [makeCase()]);
    expect(() => freezeRetestBaseline(TEST_DIR, [makeCase({ case_id: 'case-2' })])).toThrow(RetestError);
    expect(() => freezeRetestBaseline(TEST_DIR, [makeCase({ case_id: 'case-2' })])).toThrow(/already exists/);

    // The original baseline is untouched by the refused attempt.
    const reread = readRetestSet(TEST_DIR);
    expect(reread?.cases).toHaveLength(1);
    expect(reread?.cases[0].case_id).toBe('case-1');
  });

  it('refuses to freeze an empty case set', () => {
    expect(() => freezeRetestBaseline(TEST_DIR, [])).toThrow(/at least one case/i);
  });

  it('readRetestSet returns null (not throw) when no baseline has ever been frozen', () => {
    expect(readRetestSet(TEST_DIR)).toBeNull();
  });
});

describe('runRetest (C0.16 — self-agreement is a REAL measurement, not mocked)', () => {
  it('throws NO_BASELINE if --retest is run before any baseline was frozen', async () => {
    await expect(
      runRetest(TEST_DIR, join(TEST_DIR, 'out.jsonl'), async () => {
        throw new Error('should never be called — no baseline exists');
      }),
    ).rejects.toThrow(/No frozen retest baseline/);
  });

  it('computes 100% agreement when every retest rating matches its baseline exactly', async () => {
    freezeRetestBaseline(TEST_DIR, [makeCase({ case_id: 'a', run_id: 'run-a', baseline_rating: 'strong', baseline_preferred: 'final' }), makeCase({ case_id: 'b', run_id: 'run-b', baseline_rating: 'weak', baseline_preferred: 'iter0' })]);

    const fakePresenter = async (runId: string, section: string): Promise<VerdictEntry> => {
      const rating = runId === 'run-a' ? ('strong' as const) : ('weak' as const);
      const preferred = rating === 'strong' ? ('final' as const) : ('iter0' as const);
      return { run_id: runId, section, preferred, rating, timestamp: new Date().toISOString() };
    };

    const result = await runRetest(TEST_DIR, join(TEST_DIR, 'out.jsonl'), fakePresenter);
    expect(result.total).toBe(2);
    expect(result.ratingAgreement).toBe(2);
    expect(result.agreementRate).toBe(1);
    expect(result.perCase.every((c) => c.ratingAgreed)).toBe(true);
  });

  it('correctly detects and reports a DISAGREEMENT — never inflates the number', async () => {
    freezeRetestBaseline(TEST_DIR, [makeCase({ case_id: 'a', baseline_rating: 'strong', baseline_preferred: 'final' }), makeCase({ case_id: 'b', baseline_rating: 'good', baseline_preferred: 'final' })]);

    let callIndex = 0;
    const fakePresenter = async (runId: string, section: string): Promise<VerdictEntry> => {
      callIndex++;
      // Second case rates DIFFERENTLY on retest than its baseline — a genuine disagreement.
      const rating = callIndex === 1 ? ('strong' as const) : ('bad' as const);
      const preferred = callIndex === 1 ? ('final' as const) : ('iter0' as const);
      return { run_id: runId, section, preferred, rating, timestamp: new Date().toISOString() };
    };

    const result = await runRetest(TEST_DIR, join(TEST_DIR, 'out.jsonl'), fakePresenter);
    expect(result.total).toBe(2);
    expect(result.ratingAgreement).toBe(1); // NOT 2 — the disagreement must survive into the count
    expect(result.agreementRate).toBe(0.5);
    expect(result.perCase.find((c) => c.caseId === 'b')?.ratingAgreed).toBe(false);
    expect(result.perCase.find((c) => c.caseId === 'b')?.retestRating).toBe('bad');
  });

  it('presents each case to the SAME blind mechanism used for a first-time verdict — never a re-display of the original rating', async () => {
    freezeRetestBaseline(TEST_DIR, [makeCase()]);

    let presentedRunId: string | undefined;
    let presentedSection: string | undefined;
    const fakePresenter = async (runId: string, section: string): Promise<VerdictEntry> => {
      presentedRunId = runId;
      presentedSection = section;
      // Deliberately does NOT receive the baseline rating as input — proves
      // the presenter is genuinely blind, not fed the answer.
      return { run_id: runId, section, preferred: 'final', rating: 'good', timestamp: new Date().toISOString() };
    };

    await runRetest(TEST_DIR, join(TEST_DIR, 'out.jsonl'), fakePresenter);
    expect(presentedRunId).toBe('run-1');
    expect(presentedSection).toBe('hero');
  });
});
