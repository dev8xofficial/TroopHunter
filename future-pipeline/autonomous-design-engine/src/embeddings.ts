/**
 * ADE - Embeddings for the Phase 2 Library.
 *
 * Anthropic does not provide first-party embeddings for the no-key dev path,
 * so the default is a deterministic local hash embedding. Ollama can be used
 * when a local embedding model is available.
 */

import type { Config } from './config.js';

export interface EmbeddingResult {
  vector: number[];
  modelId: string;
}

export interface EmbeddingProvider {
  readonly id: string;
  embed(text: string): Promise<EmbeddingResult>;
}

const HASH_DIMS = 384;

export function getEmbeddingProvider(cfg: Config): EmbeddingProvider {
  if (cfg.embeddingProvider === 'ollama') {
    return createOllamaEmbeddingProvider(cfg);
  }
  return createLocalHashEmbeddingProvider(cfg.embeddingModel);
}

export function createLocalHashEmbeddingProvider(modelId = 'ade-local-hash-v1'): EmbeddingProvider {
  return {
    id: modelId,
    async embed(text: string): Promise<EmbeddingResult> {
      return {
        modelId,
        vector: hashEmbed(text, HASH_DIMS),
      };
    },
  };
}

function createOllamaEmbeddingProvider(cfg: Config): EmbeddingProvider {
  const modelId = cfg.embeddingModel;
  return {
    id: `ollama:${modelId}`,
    async embed(text: string): Promise<EmbeddingResult> {
      const response = await fetch(`${cfg.ollamaBaseUrl}/api/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: modelId, prompt: text }),
        signal: AbortSignal.timeout(30_000),
      });

      if (!response.ok) {
        throw new Error(`Ollama embeddings error: ${response.status} ${response.statusText}`);
      }

      const parsed = (await response.json()) as { embedding?: unknown };
      if (!Array.isArray(parsed.embedding) || parsed.embedding.some((v) => typeof v !== 'number')) {
        throw new Error('Ollama embeddings response did not contain a numeric embedding array.');
      }

      return {
        modelId: `ollama:${modelId}`,
        vector: normalizeVector(parsed.embedding as number[]),
      };
    },
  };
}

function hashEmbed(text: string, dims: number): number[] {
  const vector = new Array<number>(dims).fill(0);
  const tokens = tokenize(text);

  for (const token of tokens) {
    const base = fnv1a(token);
    const index = base % dims;
    const sign = (base & 1) === 0 ? 1 : -1;
    vector[index] += sign;

    // Add simple character trigrams so close phrasing still clusters.
    for (let i = 0; i < token.length - 2; i++) {
      const triHash = fnv1a(token.slice(i, i + 3));
      vector[triHash % dims] += ((triHash & 1) === 0 ? 1 : -1) * 0.35;
    }
  }

  return normalizeVector(vector);
}

function tokenize(text: string): string[] {
  const normalized = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return normalized ? normalized.split(' ') : [];
}

function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let aNorm = 0;
  let bNorm = 0;
  for (let i = 0; i < length; i++) {
    dot += a[i] * b[i];
    aNorm += a[i] * a[i];
    bNorm += b[i] * b[i];
  }
  if (aNorm === 0 || bNorm === 0) return 0;
  return dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm));
}

function normalizeVector(vector: number[]): number[] {
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (norm === 0) return vector;
  return vector.map((value) => value / norm);
}
