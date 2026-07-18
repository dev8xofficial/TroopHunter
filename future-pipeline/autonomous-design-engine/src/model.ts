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

export async function getProvider(cfg: Config): Promise<ModelProvider> {
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
