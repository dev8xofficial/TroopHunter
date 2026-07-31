/**
 * ADE — Retest (quarterly human test-retest ritual, C0.16 / E0.7 / M13)
 *
 * A frozen set of held-out cases, each with a baseline rating captured
 * once. Later (e.g. quarterly), the SAME cases are re-presented blind via
 * the existing captureVerdict() flow, and self-agreement against the
 * baseline is computed — a real measurement of rater consistency, not a
 * mocked/predicted number.
 *
 * @module retest
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { RetestCase, RetestSet, VerdictEntry } from './schema.js';
import { RetestSetSchema } from './schema.js';
import { atomicWrite } from './store.js';
import { captureVerdict } from './verdicts.js';

/** Presents one case blind and returns the resulting verdict — captureVerdict's exact signature (minus the run_id/section/dirs, folded into the case). */
export type BlindPresenter = (runId: string, section: string, iter0ShotsDir: string, finalShotsDir: string, outPath: string) => Promise<VerdictEntry>;

export class RetestError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'RetestError';
  }
}

export function retestSetPath(outDirOrFile: string): string {
  return outDirOrFile.endsWith('.json') ? outDirOrFile : join(outDirOrFile, 'retest-set.json');
}

export function readRetestSet(outDirOrFile: string): RetestSet | null {
  const path = retestSetPath(outDirOrFile);
  if (!existsSync(path)) return null;
  const parsed = JSON.parse(readFileSync(path, 'utf-8'));
  const result = RetestSetSchema.safeParse(parsed);
  if (!result.success) {
    throw new RetestError(`Retest set at ${path} failed schema validation: ${result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`, 'INVALID_SET');
  }
  return result.data;
}

/**
 * Freeze a baseline case into the retest set. FROZEN means exactly that —
 * this refuses to run at all if a set already exists at this path. The
 * quarterly ritual re-presents the SAME cases; silently appending to or
 * overwriting an "existing" baseline would defeat the entire measurement
 * (you'd be comparing a rating against itself, not against a genuinely
 * earlier judgment).
 */
export function freezeRetestBaseline(outDirOrFile: string, cases: RetestCase[]): RetestSet {
  const path = retestSetPath(outDirOrFile);
  if (existsSync(path)) {
    throw new RetestError(`A retest baseline already exists at ${path}. The set is frozen by design — ` + `delete it explicitly first if you genuinely intend to start a new baseline (this discards the prior one).`, 'ALREADY_FROZEN');
  }
  if (cases.length === 0) {
    throw new RetestError('At least one case is required to freeze a retest baseline.', 'EMPTY_SET');
  }

  const set: RetestSet = { frozen_at: new Date().toISOString(), cases };
  const validated = RetestSetSchema.parse(set); // fail loudly on a malformed case, not silently
  atomicWrite(path, validated);
  return validated;
}

export interface RetestAgreementResult {
  total: number;
  ratingAgreement: number; // exact same 4-point rating vs baseline
  preferredAgreement: number; // same iter0/final pick vs baseline
  agreementRate: number; // ratingAgreement / total — the headline self-consistency number
  perCase: {
    caseId: string;
    baselineRating: string;
    retestRating: string;
    ratingAgreed: boolean;
    baselinePreferred: string;
    retestPreferred: string;
    preferredAgreed: boolean;
  }[];
}

/**
 * Run the retest: re-present every frozen case blind (via the SAME
 * captureVerdict() flow used for a first-time verdict — genuinely blind,
 * not a re-display of the original rating), then compute agreement against
 * the recorded baseline. This is a REAL measurement over re-collected human
 * input, not a mock/predicted number (I12).
 */
export async function runRetest(outDirOrFile: string, retestVerdictsOutPath: string, presentBlind: BlindPresenter = captureVerdict): Promise<RetestAgreementResult> {
  const set = readRetestSet(outDirOrFile);
  if (!set) {
    throw new RetestError(`No frozen retest baseline found at ${retestSetPath(outDirOrFile)}. ` + `Freeze one first with \`ade verdict --retest-freeze\` before running \`--retest\`.`, 'NO_BASELINE');
  }

  const perCase: RetestAgreementResult['perCase'] = [];
  for (const c of set.cases) {
    console.log(`\n🔁 Retest case "${c.case_id}" (originally rated "${c.baseline_rating}", preferred "${c.baseline_preferred}", frozen ${set.frozen_at})`);
    const entry = await presentBlind(c.run_id, c.section, c.iter0_shots_dir, c.final_shots_dir, retestVerdictsOutPath);
    // captureVerdict only ever assigns 'iter0' | 'final' (never 'control_best'); narrow for the comparison below.
    const retestPreferred: 'iter0' | 'final' = entry.preferred === 'iter0' ? 'iter0' : 'final';
    perCase.push({
      caseId: c.case_id,
      baselineRating: c.baseline_rating,
      retestRating: entry.rating,
      ratingAgreed: entry.rating === c.baseline_rating,
      baselinePreferred: c.baseline_preferred,
      retestPreferred,
      preferredAgreed: retestPreferred === c.baseline_preferred,
    });
  }

  const ratingAgreement = perCase.filter((p) => p.ratingAgreed).length;
  const preferredAgreement = perCase.filter((p) => p.preferredAgreed).length;
  const total = perCase.length;

  return {
    total,
    ratingAgreement,
    preferredAgreement,
    agreementRate: total > 0 ? ratingAgreement / total : 0,
    perCase,
  };
}
