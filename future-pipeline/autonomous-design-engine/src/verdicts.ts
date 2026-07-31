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
import { redactDeep } from './redact.js';

export type HumanDecision = 'approve' | 'reject';
export type HumanRating = 'bad' | 'weak' | 'good' | 'strong';

export interface RecordHumanVerdictInput {
  runId: string;
  section: string;
  decision: HumanDecision;
  rating?: HumanRating;
  preferred?: 'iter0' | 'final' | 'control_best';
  notes?: string;
  candidateId?: string;
  criticScore?: number;
  criticVerdict?: 'pass' | 'fail';
  threshold?: number;
  reviewer?: string;
  source?: 'blind-pair' | 'approval' | 'calibration';
  timestamp?: string;
  /** Three-way blind (C0.16 / M1 / E0.1): randomized presentation order actually shown to the rater. */
  positionsLog?: string[];
  /** Distribution tags (M4 / E0.6, F-MOD-07/08): the corpus is only future-proof if tagged from the first verdict. */
  distTags?: {
    genModelId: string;
    criticModelId: string;
    configVersion: string;
    systemSnapshot: string;
  };
  /** M8: a rejected-but-interesting candidate, feeding R13 trajectory learning. */
  rejectedWithInterest?: boolean;

  // C2.8 Phase 3 Reward Modeling fields
  dimensions?: Record<string, number>;
  annotations?: { x: number; y: number; text: string; target: 'iter0' | 'final' }[];
  rationale?: string;
  r16LiteOutcome?: 'shipped' | 'abandoned' | 'reworked';
  abTestVariant?: 'text_only' | 'visual_annotated';

  // C3.3 Phase 3 Multi-reviewer + uncertainty-routed review fields
  reviewDurationMs?: number;
  reviewRoute?: 'full-review' | 'spot-check' | 'audit-only';
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
  return outDirOrFile.endsWith('.jsonl') ? outDirOrFile : join(outDirOrFile, 'verdicts.jsonl');
}

/**
 * Append one validated human verdict to verdicts.jsonl.
 */
export function appendVerdict(outDirOrFile: string, entry: VerdictEntry): VerdictEntry {
  const validation = VerdictEntrySchema.safeParse(entry);
  if (!validation.success) {
    throw new Error(`Invalid verdict entry: ${validation.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  }

  const outPath = verdictsPath(outDirOrFile);
  const dir = dirname(outPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // C0.14: redact obvious secrets/PII (e.g. leaked into free-text `notes`) before persisting.
  const redacted = redactDeep(validation.data);
  appendFileSync(outPath, JSON.stringify(redacted) + '\n', { flush: true });
  return redacted;
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

  const lines = readFileSync(outPath, 'utf-8')
    .split('\n')
    .filter((line) => line.trim());
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
export function recordHumanVerdict(outDirOrFile: string, input: RecordHumanVerdictInput): VerdictEntry {
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
    positions_log: input.positionsLog,
    dist_tags: input.distTags && {
      gen_model_id: input.distTags.genModelId,
      critic_model_id: input.distTags.criticModelId,
      config_version: input.distTags.configVersion,
      system_snapshot: input.distTags.systemSnapshot,
    },
    rejected_with_interest: input.rejectedWithInterest,
    dimensions: input.dimensions,
    annotations: input.annotations,
    rationale: input.rationale,
    r16_lite_outcome: input.r16LiteOutcome,
    ab_test_variant: input.abTestVariant,
    review_duration_ms: input.reviewDurationMs,
    review_route: input.reviewRoute,
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
 * Run an interactive blind verdict session for a run using the C2.8 web UI.
 */
export async function captureVerdict(runId: string, section: string, iter0ShotsDir: string, finalShotsDir: string, outPath: string): Promise<VerdictEntry> {
  const { captureVerdictInteractive } = await import('./verdictUI.js');
  return captureVerdictInteractive(runId, section, iter0ShotsDir, finalShotsDir, outPath);
}

// ─── Queryable Verdict-Corpus Store (E2.1) ────────────────────────

const globalVerdictsDir = process.env.ADE_VERDICTS_DIR ?? './verdicts';

export function getGlobalVerdictsPath(): string {
  return join(globalVerdictsDir, 'corpus.jsonl');
}

/**
 * Persist verdict to global queryable corpus (E2.1)
 */
export function appendToGlobalCorpus(entry: VerdictEntry): void {
  const outPath = getGlobalVerdictsPath();
  const dir = dirname(outPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  // C0.14: redact before this crown-jewel corpus (E2.1) persists anything.
  appendFileSync(outPath, JSON.stringify(redactDeep(entry)) + '\n', { flush: true });
}

/**
 * Backup discipline for the crown-jewel verdict corpus (E2.1)
 */
export function backupGlobalCorpus(): void {
  const outPath = getGlobalVerdictsPath();
  if (existsSync(outPath)) {
    const backupPath = join(globalVerdictsDir, `corpus.backup.${new Date().toISOString().replace(/[:.]/g, '-')}.jsonl`);
    try {
      appendFileSync(backupPath, readFileSync(outPath, 'utf-8'));
    } catch (e) {
      console.error('Failed to backup global verdict corpus:', e);
    }
  }
}
