/**
 * ADE — Model Provider Interface & Factory
 *
 * All LLM interaction goes through this abstraction.
 * Retry/backoff/timeout are centralized here.
 *
 * @module model
 */

import type { Config } from './config.js';

// ─── Types ─────────────────────────────────────────────────────────

export interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

export interface ImageRef {
  /** Base64-encoded image data */
  data: string;
  /** MIME type, e.g. "image/png" */
  mediaType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp';
}

export interface CompletionRequest {
  system: string;
  messages: Msg[];
  images?: ImageRef[];
  maxTokens: number;
  temperature?: number;
  stream?: boolean;
  /** When set, the LLM should return structured JSON matching this schema name */
  schemaName?: string;
}

export interface CompletionResult {
  text: string;
  usage: { input: number; output: number };
  stopReason?: string;
  quota?: {
    tokens_today: number;
    calls_today: number;
    tokens_this_week: number;
    calls_this_week: number;
  };
}

export interface ModelProvider {
  /** Pinned model id — recorded in every RunRecord (I-resilience) */
  readonly id: string;
  complete(req: CompletionRequest): Promise<CompletionResult>;
}

// ─── Retry with backoff ────────────────────────────────────────────

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const TIMEOUT_MS = 120_000;

export async function withRetry<T>(
  fn: () => Promise<T>,
  label: string,
  maxRetries = MAX_RETRIES,
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`${label}: timeout after ${TIMEOUT_MS}ms`)), TIMEOUT_MS),
        ),
      ]);
      return result;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Don't retry on non-retryable errors
      const msg = lastError.message.toLowerCase();
      const isRetryable =
        msg.includes('429') ||
        msg.includes('500') ||
        msg.includes('502') ||
        msg.includes('503') ||
        msg.includes('timeout') ||
        msg.includes('overloaded') ||
        msg.includes('rate_limit');

      if (!isRetryable || attempt === maxRetries) {
        throw lastError;
      }

      const delay = BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 500;
      console.error(
        `⚠ ${label}: attempt ${attempt + 1}/${maxRetries + 1} failed (${lastError.message}), retrying in ${Math.round(delay)}ms...`,
      );
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError ?? new Error(`${label}: unexpected retry exhaustion`);
}

// ─── Factory ───────────────────────────────────────────────────────

async function createRawProvider(cfg: Config): Promise<ModelProvider> {
  switch (cfg.provider) {
    case 'agent-sdk': {
      const { createAgentSdkProvider } = await import('./providers/agentSdk.js');
      return createAgentSdkProvider(cfg);
    }
    case 'api': {
      const { createAnthropicApiProvider } = await import('./providers/anthropicApi.js');
      return createAnthropicApiProvider(cfg);
    }
    case 'local': {
      const { createLocalOllamaProvider } = await import('./providers/localOllama.js');
      return createLocalOllamaProvider(cfg);
    }
    default:
      throw new Error(`Unknown provider: ${cfg.provider}`);
  }
}

/**
 * C4.8: resolve the configured provider, wrapped with a fallback to `local`
 * (Ollama) on PERMANENT failure — i.e. after withRetry has already exhausted
 * transient retries inside the primary provider's own complete(). Without
 * this, a dead/unreachable primary provider throws and the whole run dies;
 * a degraded local fallback keeps the run alive (matches the C0.13/F-MOD-01
 * resilience posture applied at the process level, not just per-call).
 * The `api` and `local` providers are never wrapped in a further fallback
 * (api is prod-only; local IS the fallback — no fallback-of-fallback).
 */
export async function getProvider(cfg: Config): Promise<ModelProvider> {
  const primary = await createRawProvider(cfg);
  if (cfg.provider !== 'agent-sdk') {
    return primary;
  }

  let fallback: ModelProvider | null = null;
  return {
    id: primary.id,
    async complete(req) {
      try {
        return await primary.complete(req);
      } catch (err) {
        console.error(
          `⚠ Primary provider (${primary.id}) failed permanently: ${err instanceof Error ? err.message : err}. ` +
          `Falling back to local provider — this run is now DEGRADED and should be re-baselined before its results are trusted (F-MOD-05/C4.8).`,
        );
        if (!fallback) {
          fallback = await createRawProvider({ ...cfg, provider: 'local' });
        }
        return fallback.complete(req);
      }
    },
  };
}

export type ModelRole = 'generator' | 'critic' | 'orchestrator';

/**
 * Resolve a role-scoped ModelProvider (plan §1: Critic must never silently
 * share the Generator's model — keep genModelId/criticModelId/
 * orchestratorModelId distinct even when they happen to point at the same
 * model). Reuses getProvider's provider-selection logic; only the pinned
 * model id changes per role.
 */
export async function getProviderForRole(cfg: Config, role: ModelRole): Promise<ModelProvider> {
  const modelId =
    role === 'generator' ? cfg.genModelId :
    role === 'critic' ? cfg.criticModelId :
    cfg.orchestratorModelId;
  return getProvider({ ...cfg, modelId });
}
