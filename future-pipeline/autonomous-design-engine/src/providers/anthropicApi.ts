/**
 * ADE — Anthropic API Provider (production)
 *
 * Uses @anthropic-ai/sdk with ANTHROPIC_API_KEY.
 * Handles streaming, vision, and structured output.
 *
 * @module providers/anthropicApi
 */

import Anthropic from '@anthropic-ai/sdk';
import type { Config } from '../config.js';
import type { ModelProvider, CompletionRequest, CompletionResult } from '../model.js';
import { withRetry } from '../model.js';

export function createAnthropicApiProvider(cfg: Config): ModelProvider {
  const client = new Anthropic({
    apiKey: cfg.anthropicApiKey,
  });

  const provider: ModelProvider = {
    id: cfg.modelId,

    async complete(req: CompletionRequest): Promise<CompletionResult> {
      return withRetry(async () => {
        // Build message content
        const userContent: Anthropic.MessageCreateParams['messages'][0]['content'] = [];

        // Add images if present (vision for Critic)
        if (req.images && req.images.length > 0) {
          for (const img of req.images) {
            userContent.push({
              type: 'image',
              source: {
                type: 'base64',
                media_type: img.mediaType,
                data: img.data,
              },
            });
          }
        }

        // Build messages
        const messages: Anthropic.MessageCreateParams['messages'] = [];
        for (const msg of req.messages) {
          if (msg.role === 'user') {
            // Merge images into the first user message
            if (messages.length === 0 && userContent.length > 0) {
              userContent.push({ type: 'text', text: msg.content });
              messages.push({ role: 'user', content: userContent });
            } else {
              messages.push({ role: 'user', content: msg.content });
            }
          } else {
            messages.push({ role: 'assistant', content: msg.content });
          }
        }

        // If no user messages but we have images, create a user message
        if (messages.length === 0 && userContent.length > 0) {
          userContent.push({ type: 'text', text: '(see images above)' });
          messages.push({ role: 'user', content: userContent });
        }

        if (req.stream) {
          // Streaming mode for large Generator output
          let text = '';
          let inputTokens = 0;
          let outputTokens = 0;
          let stopReason = '';

          const stream = client.messages.stream({
            model: cfg.modelId,
            max_tokens: req.maxTokens,
            temperature: req.temperature,
            system: req.system,
            messages,
          });

          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              text += event.delta.text;
            }
            if (event.type === 'message_delta') {
              stopReason = event.delta.stop_reason ?? '';
            }
          }

          const finalMessage = await stream.finalMessage();
          inputTokens = finalMessage.usage.input_tokens;
          outputTokens = finalMessage.usage.output_tokens;

          return { text, usage: { input: inputTokens, output: outputTokens }, stopReason };
        } else {
          // Non-streaming mode
          const response = await client.messages.create({
            model: cfg.modelId,
            max_tokens: req.maxTokens,
            temperature: req.temperature,
            system: req.system,
            messages,
          });

          const text = response.content
            .filter((block): block is Anthropic.TextBlock => block.type === 'text')
            .map((block) => block.text)
            .join('');

          return {
            text,
            usage: {
              input: response.usage.input_tokens,
              output: response.usage.output_tokens,
            },
            stopReason: response.stop_reason ?? undefined,
          };
        }
      }, `anthropic-api:${cfg.modelId}`);
    },
  };

  return provider;
}
