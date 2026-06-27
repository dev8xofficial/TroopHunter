/**
 * ADE — Report
 *
 * ade report: reads trace.jsonl and prints H-metrics.
 * Per-iteration score deltas, tokens/section (H7), pass rates,
 * iter-0→final gain per run (H1 signal A).
 *
 * @module report
 */

import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { readTrace } from './trace.js';
import type { RunRecord } from './schema.js';

/**
 * Generate and print a report from trace.jsonl.
 */
export function generateReport(dir: string, scanAll = false): void {
  if (scanAll) {
    // Scan all subdirectories for trace.jsonl
    if (!existsSync(dir)) {
      console.error(`Directory not found: ${dir}`);
      return;
    }

    const entries = readdirSync(dir, { withFileTypes: true });
    const runDirs = entries
      .filter(e => e.isDirectory())
      .map(e => join(dir, e.name))
      .filter(d => existsSync(join(d, 'trace.jsonl')));

    if (runDirs.length === 0) {
      console.log('No runs with trace.jsonl found.');
      return;
    }

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  ADE Report — ${runDirs.length} runs`);
    console.log(`${'═'.repeat(60)}\n`);

    const allGains: number[] = [];

    for (const runDir of runDirs) {
      const records = readTrace(runDir);
      if (records.length === 0) continue;

      const gain = printRunReport(runDir, records);
      if (gain !== null) allGains.push(gain);
    }

    // Summary
    if (allGains.length > 0) {
      printSummary(allGains);
    }
  } else {
    // Single run
    const records = readTrace(dir);
    if (records.length === 0) {
      console.log('No trace records found.');
      return;
    }

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  ADE Report — ${dir}`);
    console.log(`${'═'.repeat(60)}\n`);

    printRunReport(dir, records);
  }
}

function printRunReport(dir: string, records: RunRecord[]): number | null {
  const runId = records[0].run_id;
  const sectionId = records[0].section_id;

  // Group by iteration
  const byIteration = new Map<number, RunRecord[]>();
  for (const r of records) {
    const existing = byIteration.get(r.iteration) ?? [];
    existing.push(r);
    byIteration.set(r.iteration, existing);
  }

  const iterations = Array.from(byIteration.keys()).sort((a, b) => a - b);

  console.log(`Run: ${runId} | Section: ${sectionId} | Dir: ${dir}`);
  console.log(`${'─'.repeat(60)}`);

  // Per-iteration scores
  console.log('\n  Iter  | Best Score | Δ      | Verdict | Tokens (in+out)');
  console.log('  ------+-----------+--------+---------+----------------');

  let prevScore: number | null = null;
  let iter0Score: number | null = null;
  let finalScore: number | null = null;

  for (const iter of iterations) {
    const iterRecords = byIteration.get(iter)!;
    const best = iterRecords.reduce((a, b) =>
      a.scores.weighted_total >= b.scores.weighted_total ? a : b,
    );

    const score = best.scores.weighted_total;
    const delta = prevScore !== null ? score - prevScore : 0;
    const deltaStr = prevScore !== null
      ? (delta >= 0 ? `+${delta.toFixed(0)}` : `${delta.toFixed(0)}`)
      : '  —';
    const tokens = best.tokens.input + best.tokens.output;

    console.log(
      `  ${String(iter).padStart(4)}  | ${String(score.toFixed(0)).padStart(9)} | ${deltaStr.padStart(6)} | ${best.verdict.padStart(7)} | ${tokens.toLocaleString()}`,
    );

    if (iter0Score === null) iter0Score = score;
    finalScore = score;
    prevScore = score;
  }

  // H1 Signal A: iter-0 → final gain
  const gain = (iter0Score !== null && finalScore !== null) ? finalScore - iter0Score : null;

  console.log(`\n  iter-0 → final gain: ${gain !== null ? (gain >= 0 ? '+' : '') + gain.toFixed(0) : 'N/A'}`);
  console.log(`  Total iterations: ${iterations.length}`);

  // Token summary
  const lastRecord = records[records.length - 1];
  console.log(`  Total tokens: ${(lastRecord.tokens.input + lastRecord.tokens.output).toLocaleString()}`);
  console.log(`  Model: ${lastRecord.model_id}`);
  console.log('');

  return gain;
}

function printSummary(gains: number[]): void {
  const positive = gains.filter(g => g > 0).length;
  const total = gains.length;
  const pct = (positive / total) * 100;

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  H1 Signal A Summary`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`  Runs with positive iter-0→final gain: ${positive}/${total} (${pct.toFixed(0)}%)`);
  console.log(`  Target: ≥70%`);
  console.log(`  Status: ${pct >= 70 ? '✅ PASS' : '❌ BELOW TARGET'}`);
  console.log(`  Average gain: ${(gains.reduce((a, b) => a + b, 0) / total).toFixed(1)}`);
  console.log(`  Min gain: ${Math.min(...gains).toFixed(0)}`);
  console.log(`  Max gain: ${Math.max(...gains).toFixed(0)}`);
  console.log('');
}
