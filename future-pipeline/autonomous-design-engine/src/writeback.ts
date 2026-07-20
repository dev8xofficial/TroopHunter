/**
 * ADE - Phase 2 Library write-back.
 *
 * Learns only from approved artifacts and only after de-identification.
 * The output is reusable pattern knowledge, not client-specific identity.
 */

import { createHash } from 'crypto';
import type { Config } from './config.js';
import type {
  Artifact,
  BrandFoundation,
  Brief,
  LibraryEntry,
  ProjectDesignSystem,
  SectionOutput,
  Violation,
} from './schema.js';
import { LibraryEntrySchema } from './schema.js';
import { getEmbeddingProvider } from './embeddings.js';
import { embedLibraryEntry, upsertLibraryEntry } from './library.js';
import { redactString } from './redact.js';
import { phaseExitReview } from './qa.js';
import type { ModelProvider } from './model.js';
import { randomUUID } from 'crypto';

export interface WriteBackInput {
  artifact: Artifact;
  briefs?: Brief[];
  brand?: BrandFoundation | null;
  pds?: ProjectDesignSystem | null;
  humanVerdict?: string;
  /** C2.5: enables the abstraction-altitude Phase-Exit Review before insert. Optional so existing tests/callers without a critic provider keep working (review is skipped, not silently faked, if omitted). */
  criticProvider?: ModelProvider;
  reviewOutDir?: string;
}

export interface AltitudeReviewResult {
  verdict: 'pass' | 'fail';
  reasoning: string;
}

/**
 * C2.5: fresh-context Critic review of a distilled Library entry's
 * abstraction ALTITUDE before it enters the Library — "is this too
 * specific (non-transferable) or too vague (useless)?" per spec/04 §6 /
 * plan C2.5. Distinct from deidentificationGate (which checks for identity
 * LEAKAGE, not abstraction quality).
 */
export async function reviewAbstractionAltitude(
  draft: Omit<LibraryEntry, 'embedding'>,
  criticProvider: ModelProvider,
): Promise<AltitudeReviewResult> {
  const result = await criticProvider.complete({
    system: 'You are reviewing a distilled design-pattern entry before it enters a cross-project Library. ' +
      'Judge ONLY its abstraction altitude: is it too SPECIFIC (baked to one client/section, won\'t transfer) or too VAGUE (generic enough to be useless direction)? ' +
      'A good entry is a transferable PATTERN — general enough to apply elsewhere, specific enough to be actionable. ' +
      'Reply with ONLY valid JSON: {"verdict": "pass"|"fail", "reasoning": "specific, actionable reason"}.',
    messages: [{
      role: 'user',
      content: `Title: ${draft.title}\nIntent: ${draft.intent}\nConstruction: ${draft.construction.join('; ')}\nRationale: ${draft.rationale.join('; ')}\nContext fit: ${JSON.stringify(draft.context_fit)}\n\nVerdict + reasoning as JSON.`,
    }],
    maxTokens: 500,
    temperature: 0.2,
  });

  try {
    let text = result.text.trim();
    const fence = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (fence) text = fence[1].trim();
    const parsed = JSON.parse(text);
    if (parsed.verdict === 'pass' || parsed.verdict === 'fail') {
      return { verdict: parsed.verdict, reasoning: String(parsed.reasoning ?? '') };
    }
  } catch {
    // fall through to fail-closed default
  }
  return { verdict: 'fail', reasoning: `Altitude review output could not be parsed: ${result.text.slice(0, 200)}` };
}

export interface DeidentificationResult {
  pass: boolean;
  violations: Violation[];
}

export async function writeBackArtifact(
  cfg: Config,
  input: WriteBackInput,
): Promise<LibraryEntry[]> {
  const approvedSections = input.artifact.sections.filter(section => section.status === 'approved');
  if (approvedSections.length === 0) {
    return [];
  }

  const provider = getEmbeddingProvider(cfg);
  const entries: LibraryEntry[] = [];

  for (const section of approvedSections) {
    const brief = input.briefs?.find(candidate => candidate.section.name === section.name);
    const draft = makeLibraryEntryDraft(input.artifact, section, brief, input.humanVerdict);
    const deid = deidentificationGate(draft, input);
    if (!deid.pass) {
      throw new Error(
        `De-identification gate blocked write-back for "${section.name}": ` +
        deid.violations.map(v => v.message).join('; '),
      );
    }

    // C2.5: abstraction-altitude Phase-Exit Review before insert (fresh-
    // context Critic + cross-family second judge). Optional — skipped
    // (not faked) when the caller doesn't supply a criticProvider, so
    // existing embedding-only callers/tests are unaffected.
    if (input.criticProvider) {
      const altitude = await reviewAbstractionAltitude(draft, input.criticProvider);
      const runId = randomUUID().slice(0, 8);
      if (input.reviewOutDir) {
        await phaseExitReview(input.reviewOutDir, runId, `Library entry "${draft.id}"`, JSON.stringify(draft), altitude.verdict);
      }
      if (altitude.verdict === 'fail') {
        throw new Error(
          `Abstraction-altitude review blocked write-back for "${section.name}": ${altitude.reasoning} ` +
          `(bounded — re-abstract and retry; this entry was not inserted)`,
        );
      }
    }

    const parsed = LibraryEntrySchema.omit({ embedding: true }).safeParse(draft);
    if (!parsed.success) {
      throw new Error(`Library entry draft failed schema validation: ${parsed.error.message}`);
    }

    const embedded = await embedLibraryEntry(parsed.data, provider);
    const persisted = upsertLibraryEntry(embedded);
    entries.push(persisted);
  }

  return entries;
}

export function deidentificationGate(
  candidate: unknown,
  input: Pick<WriteBackInput, 'artifact' | 'briefs' | 'brand' | 'pds'>,
): DeidentificationResult {
  const violations: Violation[] = [];

  // E2.1: client_id is now a legitimate structural field (own-client memory
  // scoping — library.ts's retrieval boost) rather than a leak. Scan
  // everything else for the client's identity in PROSE (title/intent/
  // construction/etc.) but exclude this one field itself, or write-back
  // would unconditionally self-block on the very field it just added.
  const { client_id: _scopingId, ...candidateWithoutClientIdField } = (candidate ?? {}) as Record<string, unknown>;
  const rawText = JSON.stringify(candidateWithoutClientIdField);
  const text = rawText.toLowerCase();

  const forbidden = new Set<string>();
  addForbidden(forbidden, input.artifact.client_id);
  addForbidden(forbidden, input.artifact.artifact_id);
  for (const brief of input.briefs ?? []) {
    addForbidden(forbidden, brief.client);
    for (const value of extractBriefCopy(brief)) {
      addForbidden(forbidden, value);
    }
  }

  for (const color of input.brand?.identity.palette ?? []) {
    addForbidden(forbidden, color.value);
  }
  for (const value of Object.values(input.pds?.tokens.color ?? {})) {
    addForbidden(forbidden, value);
  }

  for (const value of forbidden) {
    if (value.length >= 3 && text.includes(value.toLowerCase())) {
      violations.push({
        gate: 'de-identification',
        rule: 'identity-leak',
        message: `Library entry contains forbidden client-specific value: "${value}"`,
        severity: 'critical',
        fixable: true,
      });
    }
  }

  // C4.1: the identity-token check above only catches THIS client's known
  // values (name, id, palette). A secret/PII value with no relation to the
  // client (e.g. a stray API key pasted into a brief's body copy) would slip
  // through untouched — reuse the same regex-based baseline that already
  // protects trace.jsonl/verdicts.jsonl (C0.14) so the Library gets the same
  // floor, not a weaker one.
  const redacted = redactString(rawText);
  if (redacted !== rawText) {
    violations.push({
      gate: 'de-identification',
      rule: 'secret-pii-leak',
      message: 'Library entry contains a secret/PII pattern (API key, email, etc.) unrelated to client-identity matching — see C0.14 redaction rules.',
      severity: 'critical',
      fixable: true,
    });
  }

  return {
    pass: violations.length === 0,
    violations,
  };
}

function makeLibraryEntryDraft(
  artifact: Artifact,
  section: SectionOutput,
  brief: Brief | undefined,
  humanVerdict = 'approved',
): Omit<LibraryEntry, 'embedding'> {
  const now = new Date().toISOString();
  const sectionName = section.name.toLowerCase();
  const domain = generalizeDomain(brief?.industry ?? artifact.surface);
  const audience = generalizeAudience(brief?.audience ?? 'site visitors');
  const goal = generalizeGoal(brief?.goal ?? 'support the artifact goal');
  const id = `pat_${slug(sectionName)}_${slug(goal)}_${slug(domain)}`.slice(0, 96);

  return {
    id,
    // E2.1 fix: own-client memory's retrieval boost (library.ts searchLibrary)
    // reads entry.client_id, but write-back never set it — the boost was
    // unreachable dead code for every entry the real write-back path ever
    // produced. artifact.client_id is a structural reference (like
    // provenance's proj_ hash below), not client-identifying PROSE — the
    // deidentificationGate scans entry TEXT content for the client's name/
    // copy/tokens, which this field is not.
    client_id: artifact.client_id,
    type: sectionName.includes('nav') || sectionName.includes('button') ? 'component-recipe' : 'pattern',
    title: `${titleCase(sectionName)} pattern for ${domain}`,
    intent: `Solve a ${sectionName} design problem for ${domain} where the goal is ${goal}.`,
    context_fit: {
      domain,
      audience,
      personality: [],
      goal,
      feel: inferFeel(section, brief),
    },
    construction: [
      `Use a ${sectionName} section as a focused step in the artifact narrative.`,
      'Preserve a clear hierarchy between primary content and supporting details.',
      'Make the primary action obvious without adding competing exits.',
    ],
    rationale: [
      'The pattern keeps the business goal visible while allowing surface-specific composition.',
      'It transfers because it describes structure and intent, not client identity.',
    ],
    pairs_with: [],
    avoid: [
      'Do not copy exact brand tokens, literal client copy, or client-specific imagery.',
      'Do not score future outputs for resemblance to this source artifact.',
    ],
    provenance: [`proj_${hashStable(artifact.artifact_id).slice(0, 12)}`],
    outcome: {
      human_verdict: humanVerdict,
      confidence: humanVerdict.includes('strong') ? 0.25 : 0.2,
      times_used: 1,
    },
    tags: unique([sectionName, artifact.surface, domain, goal]),
    // Two-tier adoption (M16/E2.3): every new write-back starts provisional —
    // adopted immediately but subject to audit sampling and auto-expiry
    // unless a human confirms it within the review window.
    provisional: true,
    created_at: now,
    updated_at: now,
  };
}

function extractBriefCopy(brief: Brief): string[] {
  const values: string[] = [];
  const content = brief.section.content;
  if (content.headline) values.push(content.headline);
  if (content.subheadline) values.push(content.subheadline);
  if (content.body) values.push(content.body);
  if (content.cta?.text) values.push(content.cta.text);
  for (const item of content.tags ?? []) values.push(item);
  for (const item of content.nav ?? []) values.push(item);
  return values;
}

function addForbidden(set: Set<string>, value: string | undefined): void {
  const normalized = value?.trim();
  if (!normalized) return;
  set.add(normalized);
}

function generalizeDomain(industry: string): string {
  return industry
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|company|co)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generalizeAudience(audience: string): string {
  return audience
    .toLowerCase()
    .replace(/\bfor\s+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generalizeGoal(goal: string): string {
  return goal
    .toLowerCase()
    .replace(/\b(client|customer|brand)\b/g, 'buyer')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferFeel(section: SectionOutput, brief: Brief | undefined): string[] {
  const text = `${section.name} ${brief?.goal ?? ''} ${brief?.audience ?? ''}`.toLowerCase();
  const feel: string[] = [];
  if (text.includes('trust') || text.includes('confidence')) feel.push('trust-building');
  if (text.includes('premium') || text.includes('luxury')) feel.push('premium');
  if (text.includes('developer') || text.includes('technical')) feel.push('technical');
  if (text.includes('demo') || text.includes('lead')) feel.push('conversion-focused');
  return feel.length > 0 ? feel : ['clear', 'focused'];
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 36) || 'general';
}

function titleCase(value: string): string {
  return value.replace(/\b\w/g, letter => letter.toUpperCase());
}

function hashStable(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function unique(values: string[]): string[] {
  return [...new Set(values.map(value => value.trim()).filter(Boolean))];
}
