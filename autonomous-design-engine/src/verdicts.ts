/**
 * ADE — Verdicts (blind human verdict capture)
 *
 * Present iter-0 vs final screenshots in random order.
 * Record human pick + 4-point rating to verdicts.jsonl.
 * H1 signal B, H2 viability.
 *
 * @module verdicts
 */

import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { createInterface } from 'readline';
import type { VerdictEntry } from './schema.js';

/**
 * Run an interactive blind verdict session for a run.
 */
export async function captureVerdict(
  runId: string,
  section: string,
  iter0ShotsDir: string,
  finalShotsDir: string,
  outPath: string,
): Promise<VerdictEntry> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (question: string): Promise<string> =>
    new Promise(resolve => rl.question(question, resolve));

  // Randomize presentation order
  const showFinalFirst = Math.random() > 0.5;
  const labelA = showFinalFirst ? 'final' : 'iter0';
  const labelB = showFinalFirst ? 'iter0' : 'final';
  const dirA = showFinalFirst ? finalShotsDir : iter0ShotsDir;
  const dirB = showFinalFirst ? iter0ShotsDir : finalShotsDir;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  BLIND VERDICT — compare two designs');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`  Run: ${runId}`);
  console.log(`  Section: ${section}`);
  console.log(`\n  Design A: ${dirA}`);
  console.log(`  Design B: ${dirB}`);
  console.log('\n  Open the screenshot directories above and compare the designs.\n');

  // Get preference
  let preferred: 'A' | 'B' = 'A';
  while (true) {
    const answer = await ask('  Which is better? (A or B): ');
    if (answer.toUpperCase() === 'A' || answer.toUpperCase() === 'B') {
      preferred = answer.toUpperCase() as 'A' | 'B';
      break;
    }
    console.log('  Please enter A or B.');
  }

  // Get rating
  let rating: 'bad' | 'weak' | 'good' | 'strong' = 'good';
  while (true) {
    const answer = await ask('  Rate your preferred design (bad/weak/good/strong): ');
    if (['bad', 'weak', 'good', 'strong'].includes(answer.toLowerCase())) {
      rating = answer.toLowerCase() as typeof rating;
      break;
    }
    console.log('  Please enter: bad, weak, good, or strong.');
  }

  // Optional notes
  const notes = await ask('  Any notes? (press Enter to skip): ');

  rl.close();

  // Map back from randomized labels
  const preferredLabel = preferred === 'A' ? labelA : labelB;
  const entry: VerdictEntry = {
    run_id: runId,
    section,
    preferred: preferredLabel === 'final' ? 'final' : 'iter0',
    rating,
    notes: notes.trim() || undefined,
    timestamp: new Date().toISOString(),
  };

  // Write to verdicts.jsonl
  const dir = dirname(outPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  appendFileSync(outPath, JSON.stringify(entry) + '\n', { flush: true });

  console.log(`\n  ✅ Verdict recorded: preferred ${entry.preferred}, rated ${entry.rating}`);
  console.log(`  Saved to: ${outPath}\n`);

  return entry;
}
