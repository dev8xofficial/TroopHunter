/**
 * ADE Tests — Redaction (C0.14)
 *
 * Done when: "a seeded secret/PII value never appears verbatim in a
 * persisted trace/log/screenshot." Verified both at the redaction-function
 * level and end-to-end through actual trace.jsonl / verdicts.jsonl writes.
 */

import { describe, it, expect, afterEach } from 'vitest';
import { existsSync, rmSync, readFileSync } from 'fs';
import { join } from 'path';
import { redactString, redactDeep } from '../src/redact.js';
import { appendIteration } from '../src/trace.js';
import { recordHumanVerdict } from '../src/verdicts.js';
import type { RunRecord } from '../src/schema.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'redact-test');

afterEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

describe('redactString', () => {
  it('redacts an Anthropic API key', () => {
    const out = redactString('here is my key: sk-ant-api03-abcdefghijklmnopqrstuvwxyz123456');
    expect(out).not.toContain('sk-ant-api03-abcdefghijklmnopqrstuvwxyz123456');
    expect(out).toContain('[REDACTED:anthropic-api-key]');
  });

  it('redacts an AWS access key', () => {
    const out = redactString('AKIA_KEY=AKIAIOSFODNN7EXAMPLE in the config');
    expect(out).not.toContain('AKIAIOSFODNN7EXAMPLE');
  });

  it('redacts an email address (PII)', () => {
    const out = redactString('contact john.doe@realclient.com for details');
    expect(out).not.toContain('john.doe@realclient.com');
    expect(out).toContain('[REDACTED:email]');
  });

  it('redacts a generic secret= assignment', () => {
    const out = redactString('password: SuperSecretValue123!');
    expect(out).not.toContain('SuperSecretValue123!');
  });

  it('leaves ordinary design content untouched', () => {
    const clean = 'Build Better Software — the developer platform for modern teams.';
    expect(redactString(clean)).toBe(clean);
  });
});

describe('redactDeep', () => {
  it('redacts strings nested at any depth in an object/array structure', () => {
    const value = {
      a: 'clean',
      nested: { b: ['fine', 'leaked key: sk-ant-api03-zzzzzzzzzzzzzzzzzzzzzzzz'] },
    };
    const out = redactDeep(value);
    expect(out.nested.b[1]).not.toContain('sk-ant-api03-zzzzzzzzzzzzzzzzzzzzzzzz');
    expect(out.a).toBe('clean'); // unaffected
  });

  it('leaves non-string values (numbers, booleans, null) unchanged', () => {
    const value = { n: 42, b: true, x: null };
    expect(redactDeep(value)).toEqual({ n: 42, b: true, x: null });
  });
});

describe('end-to-end: a seeded secret never appears verbatim in a persisted trace', () => {
  it('trace.jsonl does not contain a seeded API key placed in critic_feedback', () => {
    const seededSecret = 'sk-ant-api03-thisIsASeededTestSecretValue123456';
    const record: RunRecord = {
      run_id: 'r1',
      section_id: 's1',
      iteration: 0,
      candidate_id: 'c1',
      input_bundle_ref: 'x',
      output_code_ref: 'x',
      screenshots: {},
      scores: { brand_adherence: 80, system_adherence: null, brief_fit: 80, craft: 80, weighted_total: 80 },
      verdict: 'pass',
      critic_feedback: `Great work, but I noticed a leaked key: ${seededSecret}`,
      duration_ms: 100,
      tokens: { input: 10, output: 10 },
      model_id: 'mock',
      timestamp: new Date().toISOString(),
    };
    appendIteration(TEST_DIR, record);
    const raw = readFileSync(join(TEST_DIR, 'trace.jsonl'), 'utf-8');
    expect(raw).not.toContain(seededSecret);
  });
});

describe('end-to-end: a seeded secret never appears verbatim in a persisted verdict', () => {
  it('verdicts.jsonl does not contain a seeded secret placed in human notes', () => {
    const seededSecret = 'AKIAIOSFODNN7SEEDEDTEST';
    recordHumanVerdict(TEST_DIR, {
      runId: 'r1',
      section: 's1',
      decision: 'approve',
      notes: `Approved. Also here's an AWS key I found: ${seededSecret}`,
    });
    const raw = readFileSync(join(TEST_DIR, 'verdicts.jsonl'), 'utf-8');
    expect(raw).not.toContain(seededSecret);
  });
});
