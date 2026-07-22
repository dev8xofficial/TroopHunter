/**
 * ADE - Agent SDK Provider (dev default)
 *
 * Wraps @anthropic-ai/claude-agent-sdk for Pro-credit/OAuth usage.
 * This adapter deliberately strips API-key environment variables before
 * spawning the SDK process so ADE does not accidentally switch to API billing.
 *
 * @module providers/agentSdk
 */

import { query, type SDKMessage, type SDKResultMessage, type SDKUserMessage } from '@anthropic-ai/claude-agent-sdk';
import type { MessageParam } from '@anthropic-ai/sdk/resources';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Config } from '../config.js';
import type { ModelProvider, CompletionRequest, CompletionResult, ImageRef, Msg } from '../model.js';
import { withRetry } from '../model.js';

type Usage = CompletionResult['usage'];

export function createAgentSdkProvider(cfg: Config): ModelProvider {
  const provider: ModelProvider = {
    id: `agent-sdk:${cfg.modelId}`,

    async complete(req: CompletionRequest): Promise<CompletionResult> {
      return withRetry(async () => runAgentSdkCompletion(cfg, req), `agent-sdk:${cfg.modelId}`);
    },
  };

  return provider;
}

async function runAgentSdkCompletion(cfg: Config, req: CompletionRequest): Promise<CompletionResult> {
  const prompt = makePrompt(req.messages);
  const sdkMessages = makeSdkMessages(prompt, req.images ?? []);
  let resultMessage: SDKResultMessage | undefined;
  let assistantText = '';

  const stream = query({
    prompt: sdkMessages,
    options: {
      cwd: process.cwd(),
      env: envWithoutApiKeys(),
      model: cfg.modelId,
      systemPrompt: req.system,
      tools: [],
      disallowedTools: ['Bash', 'Edit', 'MultiEdit', 'NotebookEdit', 'Read', 'Write', 'WebFetch', 'WebSearch'],
      permissionMode: 'dontAsk',
      maxTurns: 1,
      thinking: { type: 'disabled' },
      promptSuggestions: false,
      includePartialMessages: Boolean(req.stream),
      settingSources: ['user'],
    },
  });

  for await (const message of stream) {
    if (message.type === 'assistant') {
      assistantText += textFromAssistantMessage(message);
    }
    if (message.type === 'result') {
      resultMessage = message;
    }
  }

  if (!resultMessage) {
    throw new Error('Agent SDK query ended without a result message.');
  }

  const usage = usageFromResult(resultMessage);
  if (resultMessage.subtype !== 'success') {
    const errors = 'errors' in resultMessage ? resultMessage.errors.join('; ') : 'unknown Agent SDK error';
    throw new Error(`Agent SDK completion failed (${resultMessage.subtype}): ${errors}`);
  }

  const quota = trackTelemetry(usage);

  return {
    text: resultMessage.result || assistantText,
    usage,
    stopReason: normalizeStopReason(resultMessage.stop_reason),
    quota,
  };
}

// ─── Telemetry (Phase E0 - S5) ─────────────────────────────────────────

function getISOWeek(d: Date) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

function trackTelemetry(usage: Usage) {
  const TELEMETRY_FILE = join(process.cwd(), '.ade_telemetry.json');
  let data = {
    tokens_today: 0,
    calls_today: 0,
    last_day: '',
    tokens_this_week: 0,
    calls_this_week: 0,
    last_week: '',
  };

  if (existsSync(TELEMETRY_FILE)) {
    try {
      data = JSON.parse(readFileSync(TELEMETRY_FILE, 'utf-8'));
    } catch (e) {}
  }

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const thisWeek = `${now.getFullYear()}-W${getISOWeek(now)}`;

  if (data.last_day !== today) {
    data.tokens_today = 0;
    data.calls_today = 0;
    data.last_day = today;
  }
  if (data.last_week !== thisWeek) {
    data.tokens_this_week = 0;
    data.calls_this_week = 0;
    data.last_week = thisWeek;
  }

  data.calls_today += 1;
  data.calls_this_week += 1;
  data.tokens_today += usage.input + usage.output;
  data.tokens_this_week += usage.input + usage.output;

  writeFileSync(TELEMETRY_FILE, JSON.stringify(data, null, 2), 'utf-8');

  return {
    tokens_today: data.tokens_today,
    calls_today: data.calls_today,
    tokens_this_week: data.tokens_this_week,
    calls_this_week: data.calls_this_week,
  };
}

async function* makeSdkMessages(prompt: string, images: ImageRef[]): AsyncIterable<SDKUserMessage> {
  const content: NonNullable<Extract<MessageParam['content'], unknown[]>> = [{ type: 'text', text: prompt }];

  for (const image of images) {
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: image.mediaType,
        data: image.data,
      },
    });
  }

  yield {
    type: 'user',
    message: {
      role: 'user',
      content,
    },
    parent_tool_use_id: null,
    shouldQuery: true,
  };
}

function makePrompt(messages: Msg[]): string {
  return messages
    .map((message) => {
      const label = message.role === 'assistant' ? 'ASSISTANT CONTEXT' : 'USER REQUEST';
      return `${label}:\n${message.content}`;
    })
    .join('\n\n');
}

function textFromAssistantMessage(message: Extract<SDKMessage, { type: 'assistant' }>): string {
  const content = message.message.content;
  if (!Array.isArray(content)) {
    return '';
  }

  return content
    .map((block) => {
      if (block.type === 'text') {
        return block.text;
      }
      return '';
    })
    .join('');
}

function usageFromResult(result: SDKResultMessage): Usage {
  const usage = result.usage as Record<string, unknown>;
  const input = numberField(usage, 'input_tokens') + numberField(usage, 'cache_creation_input_tokens') + numberField(usage, 'cache_read_input_tokens');
  const output = numberField(usage, 'output_tokens');

  if (input > 0 || output > 0) {
    return { input, output };
  }

  const modelUsage = result.modelUsage;
  const totals = Object.values(modelUsage).reduce<Usage>(
    (sum, item) => ({
      input: sum.input + item.inputTokens + item.cacheCreationInputTokens + item.cacheReadInputTokens,
      output: sum.output + item.outputTokens,
    }),
    { input: 0, output: 0 },
  );

  return totals;
}

function numberField(record: Record<string, unknown>, key: string): number {
  const value = record[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function normalizeStopReason(stopReason: string | null): string | undefined {
  if (!stopReason) {
    return undefined;
  }
  if (stopReason === 'max_tokens' || stopReason === 'max_output_tokens') {
    return 'max_tokens';
  }
  return stopReason;
}

export function envWithoutApiKeys(): Record<string, string | undefined> {
  const env: Record<string, string | undefined> = { ...process.env };
  delete env.ANTHROPIC_API_KEY;
  delete env.ANTHROPIC_AUTH_TOKEN;
  return env;
}
