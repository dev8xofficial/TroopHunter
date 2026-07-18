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

export function readLibrary(): LibraryEntry[] {
  const filePath = libraryFilePath();
  if (!existsSync(filePath)) return [];

  const lines = readFileSync(filePath, 'utf-8')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  const entries: LibraryEntry[] = [];
  for (const [index, line] of lines.entries()) {
    try {
      const parsed = JSON.parse(line);
      const result = LibraryEntrySchema.safeParse(parsed);
      if (result.success) {
        entries.push(result.data);
      } else {
        console.warn(`Library line ${index + 1}: schema validation failed, skipping.`);
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
  const content = entries.map(entry => JSON.stringify(entry)).join('\n');
  atomicWriteText(filePath, content.length > 0 ? `${content}\n` : '');
}

export function appendLibraryEntry(entry: LibraryEntry): void {
  const filePath = libraryFilePath();
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(entry)}\n`, { flag: 'a', flush: true });
}

export function upsertLibraryEntry(entry: LibraryEntry): LibraryEntry {
  const entries = readLibrary();
  const existingIndex = entries.findIndex(existing => existing.id === entry.id);
  if (existingIndex === -1) {
    entries.push(entry);
  } else {
    entries[existingIndex] = mergeLibraryEntries(entries[existingIndex], entry);
  }
  writeLibrary(entries);
  return existingIndex === -1 ? entry : entries[existingIndex];
}

export async function searchLibrary(
  query: string,
  provider: EmbeddingProvider,
  topK = 5,
  clientId?: string,
): Promise<LibraryHit[]> {
  const entries = readLibrary();
  if (entries.length === 0) return [];

  const now = Date.now();
  const validEntries = entries.filter(e => {
    // Audit sampling / provisional auto-expiry (E2.3)
    if (e.provisional && e.expires_at && new Date(e.expires_at).getTime() < now) {
      return false; // Expired provisional entry
    }
    return true;
  });

  if (validEntries.length === 0) return [];

  const queryEmbedding = await provider.embed(query);
  return validEntries
    .filter(entry => entry.embedding.vector.length > 0)
    .map(entry => {
      const similarity = cosineSimilarity(queryEmbedding.vector, entry.embedding.vector);
      const confidence = entry.outcome.confidence || 0.1;
      // Own-client memory (E2.1): Boost score if client matches
      const clientBoost = (clientId && entry.client_id === clientId) ? 0.2 : 0;
      
      return {
        entry,
        similarity,
        score: similarity * (0.7 + confidence * 0.3) + clientBoost,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, Math.min(topK, 5)));
}

export type AblationArm = 'memory-off' | 'text-Library' | 'multimodal';

export async function retrieveLibraryForBrief(
  cfg: Config,
  brief: Brief,
  topK = 5,
  arm: AblationArm = 'text-Library',
): Promise<LibraryEntry[]> {
  if (arm === 'memory-off') {
    return [];
  }

  try {
    const provider = getEmbeddingProvider(cfg);
    const query = buildProblemSpaceQuery(brief);
    const hits = await searchLibrary(query, provider, topK, brief.client);
    
    // De-identification rule for multimodal arm (E2.2)
    return hits.map(hit => {
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

export async function embedLibraryEntry(
  entry: Omit<LibraryEntry, 'embedding'>,
  provider: EmbeddingProvider,
): Promise<LibraryEntry> {
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
  return [
    brief.section.name,
    brief.industry,
    brief.audience,
    brief.goal,
    brief.location ?? '',
    brief.section.content.headline ?? '',
    brief.section.content.subheadline ?? '',
    brief.section.content.body ?? '',
  ].filter(Boolean).join(' · ');
}

export function buildEmbeddingText(entry: Pick<LibraryEntry, 'intent' | 'context_fit'>): string {
  return [
    entry.intent,
    entry.context_fit.domain,
    entry.context_fit.audience,
    entry.context_fit.goal,
    ...entry.context_fit.personality,
    ...entry.context_fit.feel,
  ].join(' · ');
}

function mergeLibraryEntries(existing: LibraryEntry, incoming: LibraryEntry): LibraryEntry {
  const timesUsed = existing.outcome.times_used + Math.max(1, incoming.outcome.times_used);
  const confidence = Math.min(
    1,
    Math.max(existing.outcome.confidence, incoming.outcome.confidence) + 0.05,
  );

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
  return [...new Set(values.map(value => value.trim()).filter(Boolean))];
}

function atomicWriteText(filePath: string, content: string): void {
  const tempPath = `${filePath}.${randomUUID().slice(0, 8)}.tmp`;
  writeFileSync(tempPath, content, { flush: true });
  try {
    if (existsSync(filePath)) unlinkSync(filePath);
    renameSync(tempPath, filePath);
  } catch (err) {
    try { unlinkSync(tempPath); } catch { /* ignore */ }
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
  const activeEntries = entries.filter(e => {
    if (e.provisional && e.expires_at && new Date(e.expires_at).getTime() < now) {
      // Emit escalation for human audit (Tier-A)
      emitEscalation(outDir, {
        type: 'self_audit',
        runId: 'library_audit',
        question: `Provisional entry "${e.title}" (${e.id}) has expired. Ratify and promote to canonical library, or revoke?`
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
