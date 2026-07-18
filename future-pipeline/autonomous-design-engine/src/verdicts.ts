/**
 * ADE — Verdicts (blind human verdict capture)
 *
 * Present iter-0 vs final screenshots in random order.
 * Record human pick + 4-point rating to verdicts.jsonl.
 * H1 signal B, H2 viability.
 *
 * @module verdicts
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { createInterface } from 'readline';
import type { VerdictEntry } from './schema.js';
import { VerdictEntrySchema } from './schema.js';

export type HumanDecision = 'approve' | 'reject';
export type HumanRating = 'bad' | 'weak' | 'good' | 'strong';

export interface RecordHumanVerdictInput {
  runId: string;
  section: string;
  decision: HumanDecision;
  rating?: HumanRating;
  preferred?: 'iter0' | 'final';
  notes?: string;
  candidateId?: string;
  criticScore?: number;
  criticVerdict?: 'pass' | 'fail';
  threshold?: number;
  reviewer?: string;
  source?: 'blind-pair' | 'approval' | 'calibration';
  timestamp?: string;
}

const RATING_SCORE: Record<HumanRating, number> = {
  bad: 0,
  weak: 1,
  good: 2,
  strong: 3,
};

/**
 * Return the canonical verdicts.jsonl path for a run directory or JSONL file.
 */
export function verdictsPath(outDirOrFile: string): string {
  return outDirOrFile.endsWith('.jsonl')
    ? outDirOrFile
    : join(outDirOrFile, 'verdicts.jsonl');
}

/**
 * Append one validated human verdict to verdicts.jsonl.
 */
export function appendVerdict(outDirOrFile: string, entry: VerdictEntry): VerdictEntry {
  const validation = VerdictEntrySchema.safeParse(entry);
  if (!validation.success) {
    throw new Error(`Invalid verdict entry: ${validation.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  }

  const outPath = verdictsPath(outDirOrFile);
  const dir = dirname(outPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  appendFileSync(outPath, JSON.stringify(validation.data) + '\n', { flush: true });
  return validation.data;
}

/**
 * Read verdicts.jsonl from a run directory or explicit JSONL file.
 * Invalid lines are skipped so one bad manual edit does not poison the run.
 */
export function readVerdicts(outDirOrFile: string): VerdictEntry[] {
  const outPath = verdictsPath(outDirOrFile);
  if (!existsSync(outPath)) {
    return [];
  }

  const lines = readFileSync(outPath, 'utf-8').split('\n').filter(line => line.trim());
  const entries: VerdictEntry[] = [];
  for (let i = 0; i < lines.length; i++) {
    try {
      const parsed = JSON.parse(lines[i]);
      const validation = VerdictEntrySchema.safeParse(parsed);
      if (validation.success) {
        entries.push(validation.data);
      } else {
        console.warn(`verdicts.jsonl line ${i + 1}: invalid verdict - ${validation.error.message}`);
      }
    } catch {
      console.warn(`verdicts.jsonl line ${i + 1}: invalid JSON, skipping`);
    }
  }
  return entries;
}

/**
 * Record an explicit approve/reject decision for calibration.
 */
export function recordHumanVerdict(
  outDirOrFile: string,
  input: RecordHumanVerdictInput,
): VerdictEntry {
  const rating = input.rating ?? (input.decision === 'approve' ? 'good' : 'weak');
  return appendVerdict(outDirOrFile, {
    run_id: input.runId,
    section: input.section,
    preferred: input.preferred ?? 'final',
    rating,
    human_verdict: input.decision,
    candidate_id: input.candidateId,
    critic_score: input.criticScore,
    critic_verdict: input.criticVerdict,
    threshold: input.threshold,
    reviewer: input.reviewer,
    source: input.source ?? 'approval',
    notes: input.notes,
    timestamp: input.timestamp ?? new Date().toISOString(),
  });
}

export function ratingToScore(rating: HumanRating): number {
  return RATING_SCORE[rating];
}

export function isPositiveHumanVerdict(entry: VerdictEntry): boolean {
  if (entry.human_verdict === 'approve') {
    return true;
  }
  if (entry.human_verdict === 'reject') {
    return false;
  }
  return entry.preferred === 'final' && ratingToScore(entry.rating) >= RATING_SCORE.good;
}

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
    source: 'blind-pair',
    notes: notes.trim() || undefined,
    timestamp: new Date().toISOString(),
  };

  appendVerdict(outPath, entry);

  console.log(`\n  ✅ Verdict recorded: preferred ${entry.preferred}, rated ${entry.rating}`);
  console.log(`  Saved to: ${outPath}\n`);

  return entry;
}
