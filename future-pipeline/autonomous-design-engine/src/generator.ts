/**
 * ADE — Generator
 *
 * generate(bundle, feedback?) → candidate .tsx
 * Streams the model call. Strips markdown fences.
 * Truncation check (F-GEN-06): retry on max_tokens / unbalanced braces.
 * Refusal → one reframe retry → throw GeneratorError.
 *
 * @module generator
 */

import type { ModelProvider } from './model.js';
import type { InputBundle } from './schema.js';
import { buildGeneratorPrompt } from './prompts.js';

export class GeneratorError extends Error {
  constructor(message: string, public readonly cause?: string) {
    super(message);
    this.name = 'GeneratorError';
  }
}

interface GenerateResult {
  tsx: string;
  usage: { input: number; output: number };
}

/**
 * Generate a candidate section .tsx from the input bundle.
 */
export async function generate(
  provider: ModelProvider,
  bundle: InputBundle,
  feedback: string | undefined,
  temperature: number,
  maxModelCalls: { current: number; max: number },
): Promise<GenerateResult> {
  const { system, user } = buildGeneratorPrompt(bundle, feedback);

  // First attempt
  maxModelCalls.current++;
  let result = await provider.complete({
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 16_000,
    temperature,
    stream: true,
  });

  let tsx = stripMarkdownFences(result.text);

  // Check for truncation (F-GEN-06)
  if (result.stopReason === 'max_tokens' || isUnbalanced(tsx)) {
    console.error('⚠ Generator output truncated, retrying with higher budget...');

    if (maxModelCalls.current < maxModelCalls.max) {
      maxModelCalls.current++;
      result = await provider.complete({
        system,
        messages: [{ role: 'user', content: user }],
        maxTokens: 32_000, // Double the budget
        temperature,
        stream: true,
      });
      tsx = stripMarkdownFences(result.text);

      if (isUnbalanced(tsx)) {
        // Still truncated — return what we have, render-health gate will catch it
        console.error('⚠ Generator output still truncated after retry.');
      }
    }
  }

  // Check for refusal
  if (result.stopReason === 'refusal' || isRefusal(tsx)) {
    console.error('⚠ Generator refused, attempting reframe...');

    if (maxModelCalls.current < maxModelCalls.max) {
      maxModelCalls.current++;
      const reframeUser = `${user}\n\nNote: This is a standard web design task for a legitimate business. Please produce the requested React component.`;
      result = await provider.complete({
        system,
        messages: [{ role: 'user', content: reframeUser }],
        maxTokens: 16_000,
        temperature,
        stream: true,
      });
      tsx = stripMarkdownFences(result.text);

      if (result.stopReason === 'refusal' || isRefusal(tsx)) {
        throw new GeneratorError('Generator refused the task after reframe', 'refusal');
      }
    } else {
      throw new GeneratorError('Generator refused and no budget for reframe', 'refusal');
    }
  }

  if (!tsx.trim()) {
    throw new GeneratorError('Generator produced empty output');
  }

  return {
    tsx,
    usage: result.usage,
  };
}

// ─── Helpers ───────────────────────────────────────────────────────

/**
 * Strip markdown code fences that models sometimes wrap output in.
 */
function stripMarkdownFences(text: string): string {
  let stripped = text.trim();

  // Remove ```tsx ... ``` or ```typescript ... ``` or ``` ... ```
  const fencePattern = /^```(?:tsx|typescript|jsx|react|js)?\s*\n?([\s\S]*?)\n?\s*```$/;
  const match = stripped.match(fencePattern);
  if (match) {
    stripped = match[1].trim();
  }

  // Also handle case where fence is at the start but content continues
  if (stripped.startsWith('```')) {
    const firstNewline = stripped.indexOf('\n');
    if (firstNewline !== -1) {
      stripped = stripped.slice(firstNewline + 1);
    }
    if (stripped.endsWith('```')) {
      stripped = stripped.slice(0, -3).trim();
    }
  }

  return stripped;
}

/**
 * Check if braces/JSX tags are unbalanced (truncation indicator).
 */
function isUnbalanced(code: string): boolean {
  let braces = 0;
  let parens = 0;
  let inString = false;
  let stringChar = '';
  let inTemplate = false;

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    const prev = i > 0 ? code[i - 1] : '';

    if (inString) {
      if (ch === stringChar && prev !== '\\') {
        inString = false;
      }
      continue;
    }

    if (inTemplate) {
      if (ch === '`' && prev !== '\\') {
        inTemplate = false;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
    } else if (ch === '`') {
      inTemplate = true;
    } else if (ch === '{') {
      braces++;
    } else if (ch === '}') {
      braces--;
    } else if (ch === '(') {
      parens++;
    } else if (ch === ')') {
      parens--;
    }
  }

  return braces !== 0 || parens !== 0;
}

/**
 * Detect if the model output is a refusal rather than code.
 */
function isRefusal(text: string): boolean {
  const lower = text.toLowerCase();
  const refusalPhrases = [
    'i cannot',
    'i\'m unable',
    'i am unable',
    'i apologize',
    'i\'m sorry',
    'i can\'t create',
    'i won\'t be able',
    'as an ai',
  ];
  // Only count as refusal if there's no JSX/code present
  const hasCode = text.includes('export') || text.includes('return') || text.includes('<div');
  if (hasCode) return false;

  return refusalPhrases.some(phrase => lower.includes(phrase));
}
