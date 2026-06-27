/**
 * ADE Tests — Trace (append/read)
 *
 * Verifies atomic immediate append (I6) and read-back.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, existsSync, readFileSync, writeFileSync as fsWriteFileSync } from 'fs';
import { join } from 'path';
import { appendIteration, readTrace } from '../src/trace.js';
import type { RunRecord } from '../src/schema.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'trace-test');

function makeRecord(overrides: Partial<RunRecord> = {}): RunRecord {
  return {
    run_id: 'test-run',
    section_id: 'test-hero',
    iteration: 0,
    candidate_id: 'iter0-cand1',
    input_bundle_ref: 'bundle:test:0',
    output_code_ref: '/path/to/Section.tsx',
    screenshots: { '1440': '/path/1440.png' },
    scores: {
      brand_adherence: 80,
      system_adherence: null,
      brief_fit: 75,
      craft: 85,
      weighted_total: 80,
    },
    verdict: 'fail',
    critic_feedback: 'Improve contrast.',
    duration_ms: 5000,
    tokens: { input: 1000, output: 500 },
    model_id: 'claude-sonnet-4-20250514',
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

describe('Trace', () => {
  beforeEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
    mkdirSync(TEST_DIR, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it('creates trace.jsonl and appends a record', () => {
    const record = makeRecord();
    appendIteration(TEST_DIR, record);

    const tracePath = join(TEST_DIR, 'trace.jsonl');
    expect(existsSync(tracePath)).toBe(true);

    const content = readFileSync(tracePath, 'utf-8');
    const lines = content.trim().split('\n');
    expect(lines.length).toBe(1);

    const parsed = JSON.parse(lines[0]);
    expect(parsed.run_id).toBe('test-run');
    expect(parsed.candidate_id).toBe('iter0-cand1');
  });

  it('appends multiple records (JSONL — I6)', () => {
    const r1 = makeRecord({ iteration: 0, candidate_id: 'iter0-cand1' });
    const r2 = makeRecord({ iteration: 1, candidate_id: 'iter1-cand1' });
    const r3 = makeRecord({ iteration: 2, candidate_id: 'iter2-cand1' });

    appendIteration(TEST_DIR, r1);
    appendIteration(TEST_DIR, r2);
    appendIteration(TEST_DIR, r3);

    const records = readTrace(TEST_DIR);
    expect(records.length).toBe(3);
    expect(records[0].iteration).toBe(0);
    expect(records[1].iteration).toBe(1);
    expect(records[2].iteration).toBe(2);
  });

  it('readTrace returns empty array for missing file', () => {
    const emptyDir = join(TEST_DIR, 'empty');
    mkdirSync(emptyDir, { recursive: true });
    const records = readTrace(emptyDir);
    expect(records).toEqual([]);
  });

  it('readTrace skips invalid JSON lines', () => {
    const tracePath = join(TEST_DIR, 'trace.jsonl');
    const validLine = JSON.stringify(makeRecord());
    fsWriteFileSync(tracePath, `${validLine}\n{invalid json}\n${validLine}\n`);

    const records = readTrace(TEST_DIR);
    // Should have 2 valid records (the invalid line is skipped)
    expect(records.length).toBeGreaterThanOrEqual(2);
  });

  it('trace is truly append-only (not read-modify-write)', () => {
    // Write first record
    appendIteration(TEST_DIR, makeRecord({ candidate_id: 'first' }));
    const content1 = readFileSync(join(TEST_DIR, 'trace.jsonl'), 'utf-8');

    // Write second record
    appendIteration(TEST_DIR, makeRecord({ candidate_id: 'second' }));
    const content2 = readFileSync(join(TEST_DIR, 'trace.jsonl'), 'utf-8');

    // Content2 should START with content1 (pure append)
    expect(content2.startsWith(content1)).toBe(true);
    expect(content2.length).toBeGreaterThan(content1.length);
  });
});
