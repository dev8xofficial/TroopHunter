/**
 * ADE Tests — Critic (C0.8 / C0.9)
 *
 * critique(): schema-gated parsing, one re-ask on malformed JSON, fail-closed
 * safe default (never crashes, never silently passes), pairwise ranking
 * normalization, weighted-total computation.
 */

import { describe, it, expect } from 'vitest';
import { critique, computeWeightedTotal, normalizeCriticOutput } from '../src/critic.js';
import type { ModelProvider, CompletionRequest, CompletionResult } from '../src/model.js';
import type { InputBundle, Brief } from '../src/schema.js';

const testBrief: Brief = {
  client: 'TestCo',
  industry: 'Tech',
  audience: 'Devs',
  goal: 'Leads',
  section: { name: 'hero', content: { headline: 'Build Better' } },
};
const bundle: InputBundle = { brief: testBrief };

const validCandidateInfo = { 'cand-1': { shots: { '1440': '/tmp/does-not-need-to-exist.png' } } };

function budget(max = 10) {
  return { current: 0, max };
}

const validCriticJson = JSON.stringify({
  candidates: [
    {
      candidate_id: 'cand-1',
      scores: { brand_adherence: 80, system_adherence: null, brief_fit: 85, craft: 75, weighted_total: 0 },
      verdict: 'pass',
      feedback: 'Solid hierarchy.',
    },
  ],
  ranking: ['cand-1'],
  overall_feedback: 'Good overall.',
});

describe('Critic (C0.8 / C0.9)', () => {
  it('parses valid JSON and computes weighted_total (no design system: 35/30/35)', async () => {
    const provider: ModelProvider = {
      id: 'mock:critic',
      async complete(_req) {
        return { text: validCriticJson, usage: { input: 10, output: 20 } };
      },
    };
    const result = await critique(validCandidateInfo, bundle, provider, 0.2, 80, budget());
    expect(result.candidates[0].verdict).toBe('pass');
    // 80*.35 + 85*.30 + 75*.35 = 28 + 25.5 + 26.25 = 79.75 -> rounds to 80
    expect(result.candidates[0].scores.weighted_total).toBe(80);
  });

  it('strips markdown fences before parsing', async () => {
    const fenced = '```json\n' + validCriticJson + '\n```';
    const provider: ModelProvider = {
      id: 'mock:fenced',
      async complete(_req) {
        return { text: fenced, usage: { input: 10, output: 20 } };
      },
    };
    const result = await critique(validCandidateInfo, bundle, provider, 0.2, 80, budget());
    expect(result.candidates[0].candidate_id).toBe('cand-1');
  });

  it('re-asks exactly once on invalid JSON, then succeeds on the second attempt', async () => {
    let calls = 0;
    const provider: ModelProvider = {
      id: 'mock:reask',
      async complete(req) {
        calls++;
        if (calls === 1) return { text: 'not json at all {{{', usage: { input: 10, output: 20 } };
        // Second call must be a re-ask: prior assistant turn + a correction message.
        expect(req.messages.length).toBe(3);
        expect(req.messages[1].role).toBe('assistant');
        expect(req.messages[2].content).toContain('not valid JSON');
        return { text: validCriticJson, usage: { input: 10, output: 20 } };
      },
    };
    const result = await critique(validCandidateInfo, bundle, provider, 0.2, 80, budget());
    expect(calls).toBe(2);
    expect(result.candidates[0].verdict).toBe('pass');
  });

  it('falls back to a fail-closed safe default if BOTH attempts return invalid JSON (never crashes)', async () => {
    const provider: ModelProvider = {
      id: 'mock:double-invalid',
      async complete(_req) {
        return { text: 'still not json <<<', usage: { input: 10, output: 20 } };
      },
    };
    const result = await critique(validCandidateInfo, bundle, provider, 0.2, 80, budget());
    expect(result.candidates[0].verdict).toBe('fail'); // never defaults to pass
    expect(result.candidates[0].scores.weighted_total).toBe(47); // neutral 50 minus 3 from reward model
    expect(result.overall_feedback).toContain('parsing failed');
  });

  it('does not attempt a re-ask when the model-call budget is already exhausted', async () => {
    let calls = 0;
    const provider: ModelProvider = {
      id: 'mock:budget-exhausted',
      async complete(_req) {
        calls++;
        return { text: 'not json', usage: { input: 10, output: 20 } };
      },
    };
    const exhausted = { current: 10, max: 10 };
    const result = await critique(validCandidateInfo, bundle, provider, 0.2, 80, exhausted);
    expect(calls).toBe(1); // no second attempt
    expect(result.candidates[0].verdict).toBe('fail');
  });

  it('falls back to fail-closed default (never pass) when the parsed JSON fails schema validation', async () => {
    // Valid JSON, but violates the schema (verdict is not "pass"|"fail").
    const schemaInvalid = JSON.stringify({
      candidates: [{ candidate_id: 'cand-1', scores: { brand_adherence: 80, system_adherence: null, brief_fit: 85, craft: 75, weighted_total: 80 }, verdict: 'maybe', feedback: 'x' }],
    });
    const provider: ModelProvider = {
      id: 'mock:schema-invalid',
      async complete(_req) {
        return { text: schemaInvalid, usage: { input: 10, output: 20 } };
      },
    };
    const result = await critique(validCandidateInfo, bundle, provider, 0.2, 80, budget());
    expect(result.candidates[0].verdict).toBe('fail');
  });

  it('fills in a fail-closed neutral score for a candidate the model omitted entirely', async () => {
    const missingOne = JSON.stringify({
      candidates: [{ candidate_id: 'cand-1', scores: { brand_adherence: 80, system_adherence: null, brief_fit: 85, craft: 75, weighted_total: 80 }, verdict: 'pass', feedback: 'ok' }],
    });
    const provider: ModelProvider = {
      id: 'mock:omitted-candidate',
      async complete(_req) {
        return { text: missingOne, usage: { input: 10, output: 20 } };
      },
    };
    const twoCandidateInfo = { 'cand-1': { shots: {} }, 'cand-2': { shots: {} } };
    const result = await critique(twoCandidateInfo, bundle, provider, 0.2, 80, budget());
    const omitted = result.candidates.find((c) => c.candidate_id === 'cand-2');
    expect(omitted).toBeDefined();
    expect(omitted!.verdict).toBe('fail'); // never silently defaults to pass
    expect(omitted!.feedback).toContain('fail-closed');
  });

  it('never shares Generator context — the Critic call carries only its own screenshots+brief messages (I2)', async () => {
    let capturedMessages: unknown;
    const provider: ModelProvider = {
      id: 'mock:fresh-context',
      async complete(req) {
        capturedMessages = req.messages;
        return { text: validCriticJson, usage: { input: 10, output: 20 } };
      },
    };
    await critique(validCandidateInfo, bundle, provider, 0.2, 80, budget());
    expect(Array.isArray(capturedMessages)).toBe(true);
    expect((capturedMessages as unknown[]).length).toBe(1); // single fresh user turn, no history
  });
});

describe('computeWeightedTotal', () => {
  it('uses the 4-dimension 25/25/25/25 split when a design system exists', () => {
    const total = computeWeightedTotal({ brand_adherence: 80, system_adherence: 90, brief_fit: 70, craft: 60, weighted_total: 0 }, true);
    expect(total).toBe(Math.round(80 * 0.25 + 90 * 0.25 + 70 * 0.25 + 60 * 0.25));
  });

  it('uses the 35/30/35 split (no system_adherence) in Phase 0', () => {
    const total = computeWeightedTotal({ brand_adherence: 80, system_adherence: null, brief_fit: 70, craft: 60, weighted_total: 0 }, false);
    expect(total).toBe(Math.round(80 * 0.35 + 70 * 0.3 + 60 * 0.35));
  });
});

describe('normalizeCriticOutput', () => {
  it('prefers the model-provided pairwise ranking over score-sorted fallback', () => {
    const output = normalizeCriticOutput(
      {
        candidates: [
          { candidate_id: 'a', scores: { brand_adherence: 60, system_adherence: null, brief_fit: 60, craft: 60, weighted_total: 0 }, verdict: 'fail', feedback: '' },
          { candidate_id: 'b', scores: { brand_adherence: 90, system_adherence: null, brief_fit: 90, craft: 90, weighted_total: 0 }, verdict: 'pass', feedback: '' },
        ],
        ranking: ['a', 'b'], // model explicitly ranked the LOWER-scored candidate first
      },
      ['a', 'b'],
      80,
      false,
    );
    expect(output.ranking ?? []).toEqual(['a', 'b']); // pairwise ranking wins, not score order
  });

  it('falls back to score-sorted order when the model omits a ranking', () => {
    const output = normalizeCriticOutput(
      {
        candidates: [
          { candidate_id: 'low', scores: { brand_adherence: 50, system_adherence: null, brief_fit: 50, craft: 50, weighted_total: 0 }, verdict: 'fail', feedback: '' },
          { candidate_id: 'high', scores: { brand_adherence: 90, system_adherence: null, brief_fit: 90, craft: 90, weighted_total: 0 }, verdict: 'pass', feedback: '' },
        ],
      },
      ['low', 'high'],
      80,
      false,
    );
    expect((output.ranking ?? [])[0]).toBe('high');
  });
});
