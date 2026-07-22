/**
 * ADE - Phase 2 soft Library store.
 *
 * Global, de-identified, flat-file vector store. Entries are soft guidance:
 * they can improve generation but never override brand/system/brief.
 */

import { existsSync, mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';
import type { Config } from './config.js';
import type { Brief, LibraryEntry } from './schema.js';
import { LibraryEntrySchema } from './schema.js';
import { cosineSimilarity, getEmbeddingProvider, type EmbeddingProvider } from './embeddings.js';

let libraryDir = process.env.ADE_LIBRARY_DIR ?? './library';

export interface LibraryHit {
  entry: LibraryEntry;
  similarity: number;
  score: number;
}

export function getLibraryDir(): string {
  return libraryDir;
}

export function setLibraryDirForTest(dir: string): void {
  libraryDir = dir;
}

export function libraryFilePath(): string {
  return join(libraryDir, 'entries.jsonl');
}

// ─── Library versioning + per-run snapshot (C2.2) ───────────────────
// Same append-only-versioned-snapshot convention store.ts already uses for
// the hard stores (brand/PDS): every mutation is a new immutable version,
// so a run can always point back to EXACTLY the Library state it queried,
// independent of whatever gets written to the Library afterward.

interface LibraryMeta {
  version: number;
  updated_at: string;
}

function libraryMetaPath(): string {
  return join(libraryDir, 'meta.json');
}

function libraryVersionsDir(): string {
  return join(libraryDir, '.versions');
}

function readLibraryMeta(): LibraryMeta {
  const path = libraryMetaPath();
  if (existsSync(path)) {
    try {
      const parsed = JSON.parse(readFileSync(path, 'utf-8'));
      if (typeof parsed.version === 'number' && typeof parsed.updated_at === 'string') {
        return parsed;
      }
    } catch {
      /* fall through to the zero-state below */
    }
  }
  return { version: 0, updated_at: new Date(0).toISOString() };
}

/** Current Library version — 0 means nothing has ever been written. */
export function getLibraryVersion(): number {
  return readLibraryMeta().version;
}

/**
 * Bump the Library version and write an immutable snapshot of its CURRENT
 * on-disk content — call this AFTER the write that changed entries.jsonl,
 * so version N's snapshot always matches what actually exists at version N.
 * Every real mutation path (writeLibrary, appendLibraryEntry) calls this;
 * it is not exported for direct use elsewhere.
 */
function bumpLibraryVersion(): LibraryMeta {
  mkdirSync(libraryDir, { recursive: true });
  const next: LibraryMeta = { version: readLibraryMeta().version + 1, updated_at: new Date().toISOString() };
  atomicWriteText(libraryMetaPath(), JSON.stringify(next, null, 2));

  const versionsDir = libraryVersionsDir();
  mkdirSync(versionsDir, { recursive: true });
  const content = existsSync(libraryFilePath()) ? readFileSync(libraryFilePath(), 'utf-8') : '';
  try {
    writeFileSync(join(versionsDir, `v${next.version}.jsonl`), content, { flag: 'wx', flush: true });
  } catch {
    // A version file must never be silently overwritten (append-only, I5) —
    // if it already exists, something else already snapshotted this exact
    // version; that is fine, not an error.
  }
  return next;
}

export interface LibraryVersionRecord {
  library_version: number;
  entry_count: number;
  snapshot_path: string | null;
  recorded_at: string;
}

/**
 * C2.2: record which Library version a run's retrieval saw, persisted into
 * that run's own output directory — the reproducibility guarantee. Given a
 * run's library-version.json, its exact neighbor set can always be
 * reproduced later by re-querying the matching `.versions/vN.jsonl`
 * snapshot, regardless of how many Library writes have happened since.
 */
export function snapshotLibraryVersionForRun(outDir: string): LibraryVersionRecord {
  const meta = readLibraryMeta();
  const snapshotFile = join(libraryVersionsDir(), `v${meta.version}.jsonl`);
  const hasSnapshot = meta.version > 0 && existsSync(snapshotFile);
  const entryCount = hasSnapshot ? readFileSync(snapshotFile, 'utf-8').split(/\r?\n/).filter(Boolean).length : 0;

  const record: LibraryVersionRecord = {
    library_version: meta.version,
    entry_count: entryCount,
    snapshot_path: hasSnapshot ? snapshotFile : null,
    recorded_at: new Date().toISOString(),
  };
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'library-version.json'), JSON.stringify(record, null, 2), { flush: true });
  return record;
}

export function readLibrary(): LibraryEntry[] {
  const filePath = libraryFilePath();
  if (!existsSync(filePath)) return [];

  const lines = readFileSync(filePath, 'utf-8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const entries: LibraryEntry[] = [];
  for (const [index, line] of lines.entries()) {
    try {
      const parsed = JSON.parse(line);
      const result = LibraryEntrySchema.safeParse(parsed);
      if (result.success) {
        entries.push(result.data);
      } else {
        console.warn(`Library line ${index + 1}: schema validation failed, skipping. Error:`, result.error);
      }
    } catch {
      console.warn(`Library line ${index + 1}: invalid JSON, skipping.`);
    }
  }

  return entries;
}

export function writeLibrary(entries: LibraryEntry[]): void {
  const filePath = libraryFilePath();
  mkdirSync(dirname(filePath), { recursive: true });
  const content = entries.map((entry) => JSON.stringify(entry)).join('\n');
  atomicWriteText(filePath, content.length > 0 ? `${content}\n` : '');
  bumpLibraryVersion(); // C2.2: every real mutation gets a new immutable version
}

export function appendLibraryEntry(entry: LibraryEntry): void {
  const filePath = libraryFilePath();
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(entry)}\n`, { flag: 'a', flush: true });
  bumpLibraryVersion(); // C2.2
}

export function upsertLibraryEntry(entry: LibraryEntry): LibraryEntry {
  const entries = readLibrary();
  const existingIndex = entries.findIndex((existing) => existing.id === entry.id);
  if (existingIndex === -1) {
    entries.push(entry);
  } else {
    entries[existingIndex] = mergeLibraryEntries(entries[existingIndex], entry);
  }
  writeLibrary(entries);
  return existingIndex === -1 ? entry : entries[existingIndex];
}

// C2.3: similarity floor — without this, an entry with near-zero relevance
// still gets returned whenever the Library has fewer than topK entries (a
// sparse/early Library, which is the common case), polluting the Generator's
// context with noise instead of direction (F-MEM-02).
const MIN_SIMILARITY = 0.35;

function filterUnexpiredEntries(entries: LibraryEntry[]): LibraryEntry[] {
  const now = Date.now();
  return entries.filter((e) => {
    if (e.retired) return false;

    // Audit sampling / provisional auto-expiry (E2.3)
    if (e.provisional && e.expires_at && new Date(e.expires_at).getTime() < now) {
      return false; // Expired provisional entry
    }
    return true;
  });
}

// C2.6: confidence DECAYS with age/disuse — a pattern nobody has
// corroborated in months is less trustworthy today than its stored
// confidence implies, even though the stored number never changed. Applied
// at RETRIEVAL time only (never mutates the stored entry) — re-computed
// fresh on every read from `updated_at`, so a re-corroboration (which bumps
// `updated_at` via mergeLibraryEntries) immediately restores full trust.
const CONFIDENCE_DECAY_HALF_LIFE_DAYS = 180; // ~6 months
const MIN_DECAYED_CONFIDENCE = 0.05; // never fully zero — still findable if corroborated again

export function decayedConfidence(entry: LibraryEntry, now: number = Date.now()): number {
  const referenceTimeStr = entry.outcome.last_retrieved_at || entry.created_at || entry.updated_at;
  const referenceTime = new Date(referenceTimeStr).getTime();
  const ageDays = Math.max(0, (now - referenceTime) / (1000 * 60 * 60 * 24));
  const decayFactor = Math.pow(0.5, ageDays / CONFIDENCE_DECAY_HALF_LIFE_DAYS);
  return Math.max(MIN_DECAYED_CONFIDENCE, entry.outcome.confidence * decayFactor);
}

// C2.6: diversity-aware re-ranking (Maximal Marginal Relevance) — resist
// monoculture. A pure top-K-by-score sort can return 5 near-duplicate
// entries when the Library has a dominant cluster; MMR iteratively picks
// the candidate that maximizes (relevance - λ·similarity to what's ALREADY
// selected), so later picks are penalized for resembling earlier ones.
const DIVERSITY_LAMBDA = 0.3;

export function diversityRerank(hits: LibraryHit[], topK: number): LibraryHit[] {
  const cap = Math.max(0, Math.min(topK, 5));
  if (hits.length <= 1 || cap === 0) return hits.slice(0, cap);

  const selected: LibraryHit[] = [];
  const remaining = [...hits];

  while (selected.length < cap && remaining.length > 0) {
    let bestIndex = 0;
    let bestMmr = -Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i];
      const maxSimToSelected = selected.length === 0 ? 0 : Math.max(...selected.map((s) => cosineSimilarity(s.entry.embedding.vector, candidate.entry.embedding.vector)));
      const mmr = candidate.score - DIVERSITY_LAMBDA * maxSimToSelected;
      if (mmr > bestMmr) {
        bestMmr = mmr;
        bestIndex = i;
      }
    }
    selected.push(remaining[bestIndex]);
    remaining.splice(bestIndex, 1);
  }
  return selected;
}

/**
 * Shared ranking core for searchLibrary / searchOwnClientLibrary: embed the
 * query once, refuse to compare across incompatible embedding spaces
 * (C2.0), apply the C2.3 similarity floor, decayed confidence (C2.6), and
 * diversity-aware top-K selection (C2.6). `candidates` is ALREADY the
 * correct entry set — this function does no client filtering itself, so a
 * caller's scoping decision (own-client hard-filter vs. cross-client
 * all-entries) can never leak through a shared code path.
 */
async function rankCandidates(candidates: LibraryEntry[], query: string, provider: EmbeddingProvider, topK: number, clientBoostId?: string): Promise<LibraryHit[]> {
  const validEntries = filterUnexpiredEntries(candidates);
  if (validEntries.length === 0) return [];

  const queryEmbedding = await provider.embed(query);

  // C2.0: refuse to cosine-compare vectors from incompatible embedding
  // spaces. Changing embeddingModel/embeddingProvider silently produced
  // meaningless similarity scores before this check existed — a vector
  // embedded by one model has no defined distance to a vector embedded by
  // a different one, but nothing ever verified they matched.
  const mismatched = validEntries.filter((e) => e.embedding.model_id !== queryEmbedding.modelId);
  if (mismatched.length > 0) {
    console.warn(`⚠ Library has ${mismatched.length} entr${mismatched.length === 1 ? 'y' : 'ies'} embedded with a different model ` + `(query uses "${queryEmbedding.modelId}") — excluding from this search (F-MEM-03). Re-embed the Library after an embedding-model change.`);
  }
  const compatibleEntries = validEntries.filter((e) => e.embedding.model_id === queryEmbedding.modelId);

  const ranked = compatibleEntries
    .filter((entry) => entry.embedding.vector.length > 0)
    .map((entry) => {
      const similarity = cosineSimilarity(queryEmbedding.vector, entry.embedding.vector);
      const confidence = decayedConfidence(entry) || 0.1;
      const clientBoost = clientBoostId && entry.client_id === clientBoostId ? 0.2 : 0;

      return {
        entry,
        similarity,
        score: similarity * (0.7 + confidence * 0.3) + clientBoost,
      };
    })
    .filter((hit) => hit.similarity >= MIN_SIMILARITY)
    .sort((a, b) => b.score - a.score);

  // Diversity re-ranking operates over a slightly wider candidate pool than
  // the final topK (never less than topK*2, capped at what's actually
  // available) so it has real alternatives to trade off against, not just
  // the same topK it would have returned anyway.
  const pool = ranked.slice(0, Math.max(topK * 2, 10));
  return diversityRerank(pool, topK);
}

/**
 * C3.8 R11: Cross-domain wildcard retrieval.
 * Finds the best-scoring entry from a DIFFERENT industry/domain to inject novelty.
 */
export async function getWildcardEntry(query: string, provider: EmbeddingProvider, excludedIndustry: string): Promise<LibraryHit | null> {
  const entries = readLibrary();
  if (entries.length === 0) return null;

  const domainLower = excludedIndustry.toLowerCase();

  // Exclude entries that might belong to the same industry
  const outOfDomainEntries = entries.filter((e) => {
    return !e.tags.some((t) => {
      const tagLower = t.toLowerCase();
      return tagLower.includes(domainLower) || domainLower.includes(tagLower);
    });
  });

  if (outOfDomainEntries.length === 0) return null;

  const hits = await rankCandidates(outOfDomainEntries, query, provider, 1);
  return hits.length > 0 ? hits[0] : null;
}

/** Cross-client search over the WHOLE Library — `clientId`, if given, only BOOSTS same-client entries (E2.1 own-client memory), it never excludes anyone else's. Use searchOwnClientLibrary() for a hard client boundary. */
export async function searchLibrary(query: string, provider: EmbeddingProvider, topK = 5, clientId?: string): Promise<LibraryHit[]> {
  const entries = readLibrary();
  if (entries.length === 0) return [];
  return rankCandidates(entries, query, provider, topK, clientId);
}

/**
 * E2.1: own-client memory — retrieval HARD-SCOPED to the SAME client's
 * entries only. This is not the boosted cross-client search above: entries
 * from other clients are excluded BEFORE ranking begins, so there is no
 * cross-client leakage path to close (AI-F2) — the filter, not a score
 * penalty, is the guarantee. Because retrieval can never cross a client
 * boundary here, this store intentionally skips the de-identification gate
 * and altitude-review pipeline C2.5 requires for cross-client write-back —
 * that pipeline exists specifically to stop client A's specifics leaking
 * into client B's generation, which cannot happen when the only possible
 * audience for an entry is the client it came from.
 */
export async function searchOwnClientLibrary(query: string, provider: EmbeddingProvider, clientId: string, topK = 5): Promise<LibraryHit[]> {
  const ownEntries = readLibrary().filter((e) => e.client_id === clientId);
  if (ownEntries.length === 0) return [];
  return rankCandidates(ownEntries, query, provider, topK);
}

/**
 * Updates the last_retrieved_at timestamp for a set of entries.
 * Triggers a new library version snapshot.
 */
export function touchLibraryEntries(ids: string[]): void {
  const entries = readLibrary();
  const idSet = new Set(ids);
  let mutated = false;
  const now = new Date().toISOString();

  for (const entry of entries) {
    if (idSet.has(entry.id)) {
      entry.outcome.last_retrieved_at = now;
      mutated = true;
    }
  }

  if (mutated) {
    writeLibrary(entries);
  }
}

export type AblationArm = 'memory-off' | 'own-client' | 'text-Library' | 'multimodal';

/**
 * Derive the SAME client identifier the rest of the pipeline uses
 * (orchestrator.ts's sectionId, Artifact.client_id when no explicit slug is
 * available) — brief.client is a display name ("Acme Advisors"), never the
 * stored client_id slug ("acme-advisors") LibraryEntry.client_id actually
 * uses. Without normalizing here, own-client retrieval and the cross-client
 * boost above could never match a real entry — this was true even before
 * E2.1 existed (the boost silently never fired).
 */
export function deriveClientIdSlug(displayName: string): string {
  return displayName.toLowerCase().replace(/\s+/g, '-');
}

export async function retrieveLibraryForBrief(cfg: Config, brief: Brief, topK = 5, arm: AblationArm = 'text-Library', clientId?: string): Promise<LibraryEntry[]> {
  if (arm === 'memory-off') {
    return [];
  }

  const resolvedClientId = clientId ?? deriveClientIdSlug(brief.client);

  try {
    const provider = getEmbeddingProvider(cfg);
    const query = buildProblemSpaceQuery(brief);
    const hits = arm === 'own-client' ? await searchOwnClientLibrary(query, provider, resolvedClientId, topK) : await searchLibrary(query, provider, topK, resolvedClientId);

    // C3.8 R11: Cross-domain wildcard slot
    if (arm !== 'own-client' && topK > 1) {
      const wildcard = await getWildcardEntry(query, provider, brief.industry);
      if (wildcard) {
        if (hits.length >= topK) {
          hits[hits.length - 1] = wildcard;
        } else {
          hits.push(wildcard);
        }
      }
    }

    if (hits.length > 0) {
      touchLibraryEntries(hits.map((h) => h.entry.id));
    }

    // De-identification rule for multimodal arm (E2.2)
    return hits.map((hit) => {
      const entry = { ...hit.entry };
      if (arm === 'multimodal') {
        // Mock image de-id rule: redacted thumbnails for multimodal arm
        entry.tags = [...entry.tags, 'redacted-thumbnails-injected'];
      }
      return entry;
    });
  } catch (err) {
    console.warn('Library retrieval failed; continuing without soft memory:', err instanceof Error ? err.message : err);
    return [];
  }
}

// ─── Re-embed on model change (C2.0) ────────────────────────────────

export interface EmbeddingDriftReport {
  currentModelId: string;
  total: number;
  stale: number;
  staleModelIds: string[];
}

/**
 * Detect whether the Library contains entries embedded with a DIFFERENT
 * model than the currently configured embedding provider — no network/model
 * call needed, this only compares stored `embedding.model_id` values.
 * A signal ONLY (same posture as C1.12's checkBrandStaleness): re-embedding
 * itself is always a deliberate, human-triggered action (`ade library
 * reembed`), never automatic, matching this codebase's rule that Library
 * mutations are never a silent side effect of a normal run.
 */
export function detectEmbeddingModelDrift(cfg: Config): EmbeddingDriftReport {
  const currentModelId = getEmbeddingProvider(cfg).id;
  const entries = readLibrary();
  const stale = entries.filter((e) => e.embedding.model_id !== currentModelId);
  return {
    currentModelId,
    total: entries.length,
    stale: stale.length,
    staleModelIds: [...new Set(stale.map((e) => e.embedding.model_id))],
  };
}

export interface ReEmbedReport {
  newModelId: string;
  total: number;
  reEmbedded: number;
}

/**
 * Full re-embed of every Library entry under the CURRENTLY configured
 * embedding provider (C2.0 — "a model-version change triggers a full
 * re-embed"). Re-embeds unconditionally (not just the stale ones) so the
 * whole store is guaranteed to sit in one consistent vector space after
 * this runs — a partial re-embed would leave a mixed-model store exactly
 * like the drift this exists to fix.
 */
export async function reEmbedLibrary(cfg: Config): Promise<ReEmbedReport> {
  const provider = getEmbeddingProvider(cfg);
  const entries = readLibrary();
  if (entries.length === 0) {
    return { newModelId: provider.id, total: 0, reEmbedded: 0 };
  }

  const reEmbedded: LibraryEntry[] = [];
  for (const entry of entries) {
    const { embedding: _oldEmbedding, ...rest } = entry;
    reEmbedded.push(await embedLibraryEntry(rest, provider));
  }
  writeLibrary(reEmbedded);

  return { newModelId: provider.id, total: entries.length, reEmbedded: reEmbedded.length };
}

export async function embedLibraryEntry(entry: Omit<LibraryEntry, 'embedding'>, provider: EmbeddingProvider): Promise<LibraryEntry> {
  const text = buildEmbeddingText(entry);
  const embedding = await provider.embed(text);
  return {
    ...entry,
    embedding: {
      model_id: embedding.modelId,
      text,
      vector: embedding.vector,
    },
  };
}

export function buildProblemSpaceQuery(brief: Brief): string {
  return [brief.section.name, brief.industry, brief.audience, brief.goal, brief.location ?? '', brief.section.content.headline ?? '', brief.section.content.subheadline ?? '', brief.section.content.body ?? ''].filter(Boolean).join(' · ');
}

export function buildEmbeddingText(entry: Pick<LibraryEntry, 'intent' | 'context_fit'>): string {
  return [entry.intent, entry.context_fit.domain, entry.context_fit.audience, entry.context_fit.goal, ...entry.context_fit.personality, ...entry.context_fit.feel].join(' · ');
}

function mergeLibraryEntries(existing: LibraryEntry, incoming: LibraryEntry): LibraryEntry {
  const timesUsed = existing.outcome.times_used + Math.max(1, incoming.outcome.times_used);
  const confidence = Math.min(1, Math.max(existing.outcome.confidence, incoming.outcome.confidence) + 0.05);

  return {
    ...existing,
    construction: unique([...existing.construction, ...incoming.construction]),
    rationale: unique([...existing.rationale, ...incoming.rationale]),
    pairs_with: unique([...existing.pairs_with, ...incoming.pairs_with]),
    avoid: unique([...existing.avoid, ...incoming.avoid]),
    provenance: unique([...existing.provenance, ...incoming.provenance]),
    tags: unique([...existing.tags, ...incoming.tags]),
    outcome: {
      human_verdict: incoming.outcome.human_verdict,
      confidence,
      times_used: timesUsed,
    },
    updated_at: new Date().toISOString(),
    embedding: incoming.embedding,
  };
}

function unique(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function atomicWriteText(filePath: string, content: string): void {
  const tempPath = `${filePath}.${randomUUID().slice(0, 8)}.tmp`;
  writeFileSync(tempPath, content, { flush: true });
  try {
    if (existsSync(filePath)) unlinkSync(filePath);
    renameSync(tempPath, filePath);
  } catch (err) {
    try {
      unlinkSync(tempPath);
    } catch {
      /* ignore */
    }
    throw err;
  }
}

import { emitEscalation } from './escalations.js';

/**
 * Audit provisional entries (E2.3).
 * Identifies expired provisional entries and emits them to the escalation queue for R14-style human ratification.
 */
export function auditLibrary(outDir: string): void {
  const entries = readLibrary();
  const now = Date.now();

  let needsWrite = false;
  const activeEntries = entries.filter((e) => {
    if (e.provisional && e.expires_at && new Date(e.expires_at).getTime() < now) {
      // Emit escalation for human audit (Tier-A)
      emitEscalation(outDir, {
        type: 'self_audit',
        runId: 'library_audit',
        question: `Provisional entry "${e.title}" (${e.id}) has expired. Ratify and promote to canonical library, or revoke?`,
      });
      // The entry auto-expires unconfirmed (we filter it out of active memory).
      // A human must answer the escalation to restore it as non-provisional.
      needsWrite = true;
      return false;
    }
    return true;
  });

  if (needsWrite) {
    writeLibrary(activeEntries);
  }
}
