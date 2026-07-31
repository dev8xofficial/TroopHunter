/**
 * ADE — Report
 *
 * ade report: reads trace.jsonl and prints H-metrics.
 * Per-iteration score deltas, tokens/section (H7), pass rates,
 * iter-0→final gain per run (H1 signal A),
 * and quota burn-rate vs S2 limits (E0.4/S5).
 *
 * @module report
 */

import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { readTrace } from './trace.js';
import type { RunRecord, VerdictEntry } from './schema.js';
import { readVerdicts } from './verdicts.js';
import { calibrateFromRecords, formatCalibrationSummary } from './calibration.js';
import { formatCostSummary, summarizeTraceCost } from './production.js';

/**
 * Generate and print a report from trace.jsonl.
 */
export function generateReport(dir: string, scanAll = false, threshold = 80): void {
  if (scanAll) {
    // Scan all subdirectories for trace.jsonl
    if (!existsSync(dir)) {
      console.error(`Directory not found: ${dir}`);
      return;
    }

    const entries = readdirSync(dir, { withFileTypes: true });
    const runDirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => join(dir, e.name))
      .filter((d) => existsSync(join(d, 'trace.jsonl')));

    if (runDirs.length === 0) {
      console.log('No runs with trace.jsonl found.');
      return;
    }

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  ADE Report — ${runDirs.length} runs`);
    console.log(`${'═'.repeat(60)}\n`);

    const allGains: number[] = [];
    const allRecords: RunRecord[] = [];
    const allVerdicts: VerdictEntry[] = [];

    for (const runDir of runDirs) {
      const records = readTrace(runDir);
      if (records.length === 0) continue;

      const gain = printRunReport(runDir, records);
      if (gain !== null) allGains.push(gain);
      allRecords.push(...records);
      allVerdicts.push(...readVerdicts(runDir));
    }

    // Summary
    if (allGains.length > 0) {
      printSummary(allGains);
    }

    printCost(allRecords);
    printQuota(allRecords);
    printCalibration(allRecords, allVerdicts, threshold);
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
    printCost(records);
    printQuota(records);
    printCalibration(records, readVerdicts(dir), threshold);
  }
}

function printCost(records: RunRecord[]): void {
  console.log(`${'='.repeat(60)}`);
  console.log('  Phase 4 Scale Metrics');
  console.log(`${'='.repeat(60)}`);
  console.log(formatCostSummary(summarizeTraceCost(records)));
  console.log('');
}

/**
 * Print quota burn-rate vs S2-documented limits (E0.4/S5 requirement).
 * S2 verdict: No-Go on consumer Pro; API Tier-1 limits apply:
 *   ~50 RPM / 1,000,000 TPM per minute, daily varies.
 */
function printQuota(records: RunRecord[]): void {
  let totalCallsToday = 0;
  let totalTokensToday = 0;
  let totalCallsWeek = 0;
  let totalTokensWeek = 0;

  for (const r of records) {
    if (r.quota) {
      totalCallsToday = Math.max(totalCallsToday, r.quota.calls_today ?? 0);
      totalTokensToday = Math.max(totalTokensToday, r.quota.tokens_today ?? 0);
      totalCallsWeek = Math.max(totalCallsWeek, r.quota.calls_this_week ?? 0);
      totalTokensWeek = Math.max(totalTokensWeek, r.quota.tokens_this_week ?? 0);
    }
  }

  if (totalCallsToday === 0 && totalTokensToday === 0) return; // no quota data

  // S2 reference limits (Anthropic API Tier-1):
  const S2_DAILY_CALL_LIMIT = 10_000;
  const S2_DAILY_TOKEN_LIMIT = 5_000_000;

  console.log(`${'='.repeat(60)}`);
  console.log('  Quota Burn-Rate (E0.4 / S5)');
  console.log(`${'='.repeat(60)}`);
  console.log(`  Calls today:    ${totalCallsToday.toLocaleString()} / ${S2_DAILY_CALL_LIMIT.toLocaleString()} (${((totalCallsToday / S2_DAILY_CALL_LIMIT) * 100).toFixed(1)}%)`);
  console.log(`  Tokens today:   ${totalTokensToday.toLocaleString()} / ${S2_DAILY_TOKEN_LIMIT.toLocaleString()} (${((totalTokensToday / S2_DAILY_TOKEN_LIMIT) * 100).toFixed(1)}%)`);
  console.log(`  Calls this wk:  ${totalCallsWeek.toLocaleString()}`);
  console.log(`  Tokens this wk: ${totalTokensWeek.toLocaleString()}`);
  if (totalCallsToday > S2_DAILY_CALL_LIMIT * 0.8 || totalTokensToday > S2_DAILY_TOKEN_LIMIT * 0.8) {
    console.log('  ⚠️  Approaching daily limit — consider pausing runs.');
  }
  console.log('');
}

function printCalibration(records: RunRecord[], verdicts: VerdictEntry[], threshold: number): void {
  console.log(`${'='.repeat(60)}`);
  console.log('  Phase 3 Taste Calibration');
  console.log(`${'='.repeat(60)}`);
  const summary = calibrateFromRecords(records, verdicts, threshold);
  console.log(formatCalibrationSummary(summary));
  console.log('');
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
    const best = iterRecords.reduce((a, b) => (a.scores.weighted_total >= b.scores.weighted_total ? a : b));

    const score = best.scores.weighted_total;
    const delta = prevScore !== null ? score - prevScore : 0;
    const deltaStr = prevScore !== null ? (delta >= 0 ? `+${delta.toFixed(0)}` : `${delta.toFixed(0)}`) : '  —';
    const tokens = best.tokens.input + best.tokens.output;

    console.log(`  ${String(iter).padStart(4)}  | ${String(score.toFixed(0)).padStart(9)} | ${deltaStr.padStart(6)} | ${best.verdict.padStart(7)} | ${tokens.toLocaleString()}`);

    if (iter0Score === null) iter0Score = score;
    finalScore = score;
    prevScore = score;
  }

  // H1 Signal A: iter-0 → final gain
  const gain = iter0Score !== null && finalScore !== null ? finalScore - iter0Score : null;

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
  const positive = gains.filter((g) => g > 0).length;
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
