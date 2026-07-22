/**
 * ADE — Local Ollama Provider (fallback/offline)
 *
 * POSTs to a local Ollama server for vision-capable models.
 * Used as a fallback when no API key or Agent SDK is available.
 *
 * @module providers/localOllama
 */

import type { Config } from '../config.js';
import type { ModelProvider, CompletionRequest, CompletionResult } from '../model.js';
import { withRetry } from '../model.js';

export function createLocalOllamaProvider(cfg: Config): ModelProvider {
  const baseUrl = cfg.ollamaBaseUrl;
  const modelName = cfg.ollamaModel;

  const provider: ModelProvider = {
    id: `ollama:${modelName}`,

    async complete(req: CompletionRequest): Promise<CompletionResult> {
      return withRetry(async () => {
        // Build the prompt from system + messages
        let prompt = '';
        if (req.system) {
          prompt += `System: ${req.system}\n\n`;
        }
        for (const msg of req.messages) {
          const role = msg.role === 'user' ? 'User' : 'Assistant';
          prompt += `${role}: ${msg.content}\n\n`;
        }

        // Build request body
        const body: Record<string, unknown> = {
          model: modelName,
          prompt: prompt.trim(),
          stream: false,
          options: {
            temperature: req.temperature ?? 0.7,
            num_predict: req.maxTokens,
          },
        };

        // Add images for vision
        if (req.images && req.images.length > 0) {
          body.images = req.images.map((img) => img.data);
        }

        const response = await fetch(`${baseUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(120_000),
        });

        if (!response.ok) {
          throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
        }

        const result = (await response.json()) as {
          response: string;
          prompt_eval_count?: number;
          eval_count?: number;
        };

        return {
          text: result.response,
          usage: {
            input: result.prompt_eval_count ?? 0,
            output: result.eval_count ?? 0,
          },
        };
      }, `ollama:${modelName}`);
    },
  };

  return provider;
}
