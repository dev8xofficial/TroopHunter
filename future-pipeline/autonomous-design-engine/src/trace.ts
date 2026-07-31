/**
 * ADE — Trace (append/read trace.jsonl)
 *
 * Append one RunRecord per line, immediately + fsync (I6/F-STO-04).
 * True append (JSONL, not JSON array) — atomic, durable.
 *
 * @module trace
 */

import { writeFileSync, appendFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import type { RunRecord } from './schema.js';
import { RunRecordSchema } from './schema.js';
import { redactDeep } from './redact.js';

/**
 * Append a single RunRecord to trace.jsonl immediately (I6).
 * Creates the file/directory if needed. Uses fsync for durability.
 */
export function appendIteration(outDir: string, record: RunRecord): void {
  const tracePath = join(outDir, 'trace.jsonl');

  // Ensure directory exists
  const dir = dirname(tracePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Validate the record before writing
  const validation = RunRecordSchema.safeParse(record);
  if (!validation.success) {
    console.error('⚠ Invalid RunRecord, writing anyway for debugging:', validation.error.message);
  }

  // C0.14: redact obvious secrets/PII before persisting (baseline — see redact.ts).
  const redacted = redactDeep(record);

  // Append as JSONL (one JSON object per line)
  const line = JSON.stringify(redacted) + '\n';
  appendFileSync(tracePath, line, { flush: true });
}

/**
 * Read all RunRecords from trace.jsonl.
 * Skips invalid lines (logs a warning).
 */
export function readTrace(outDir: string): RunRecord[] {
  const tracePath = join(outDir, 'trace.jsonl');

  if (!existsSync(tracePath)) {
    return [];
  }

  const content = readFileSync(tracePath, 'utf-8');
  const lines = content.split('\n').filter((line) => line.trim());
  const records: RunRecord[] = [];

  for (let i = 0; i < lines.length; i++) {
    try {
      const parsed = JSON.parse(lines[i]);
      const validation = RunRecordSchema.safeParse(parsed);
      if (validation.success) {
        records.push(validation.data);
      } else {
        console.warn(`⚠ trace.jsonl line ${i + 1}: invalid record — ${validation.error.message}`);
        // Still include it as-is for debugging
        records.push(parsed as RunRecord);
      }
    } catch {
      console.warn(`⚠ trace.jsonl line ${i + 1}: invalid JSON, skipping`);
    }
  }

  return records;
}

/**
 * Write run config to the output directory.
 */
export function writeRunConfig(outDir: string, config: Record<string, unknown>): void {
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(join(outDir, 'config.json'), JSON.stringify(config, null, 2));
}
