/**
 * ADE — Critic
 *
 * critique(shots, bundle) → CriticOutput
 * Vision call via provider at criticTemperature.
 * Fresh context (I2): new message list, zero generator history.
 *
 * @module critic
 */

import { readFileSync } from 'fs';
import type { ModelProvider } from './model.js';
import type { InputBundle, CriticOutput } from './schema.js';
import { buildCriticPrompt } from './prompts.js';
import { schemaGate } from './guardrails.js';
import type { ImageRef } from './model.js';

export class CriticError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CriticError';
  }
}

/**
 * Critique rendered screenshots of candidates.
 * Uses vision (screenshots as images), fresh context (I2).
 */
export async function critique(
  shots: Record<string, Record<string, string>>, // candidateId → { breakpoint → path }
  bundle: InputBundle,
  provider: ModelProvider,
  temperature: number,
  threshold: number,
  maxModelCalls: { current: number; max: number },
): Promise<CriticOutput> {
  const candidateIds = Object.keys(shots);
  const { system, user } = buildCriticPrompt(bundle, candidateIds);

  // Build image refs from screenshots (vision)
  const images: ImageRef[] = [];
  for (const candidateId of candidateIds) {
    const candidateShots = shots[candidateId];
    for (const [breakpoint, shotPath] of Object.entries(candidateShots)) {
      try {
        const imageData = readFileSync(shotPath);
        images.push({
          data: imageData.toString('base64'),
          mediaType: 'image/png',
        });
      } catch (err) {
        console.warn(`⚠ Could not read screenshot ${shotPath}: ${err}`);
      }
    }
  }

  // Fresh context — new message list, zero generator history (I2)
  maxModelCalls.current++;
  let result = await provider.complete({
    system,
    messages: [{ role: 'user', content: user }],
    images,
    maxTokens: 4_000,
    temperature,
  });

  // Parse structured output
  let parsed: unknown;
  try {
    // Try to extract JSON from the response
    let jsonText = result.text.trim();

    // Strip markdown fences if present
    const jsonFenceMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (jsonFenceMatch) {
      jsonText = jsonFenceMatch[1].trim();
    }

    parsed = JSON.parse(jsonText);
  } catch {
    // Schema Gate: one re-ask (spec 11 §2.1)
    console.error('⚠ Critic returned invalid JSON, re-asking...');

    if (maxModelCalls.current < maxModelCalls.max) {
      maxModelCalls.current++;
      result = await provider.complete({
        system,
        messages: [
          { role: 'user', content: user },
          { role: 'assistant', content: result.text },
          {
            role: 'user',
            content: 'Your response was not valid JSON. Please return ONLY valid JSON matching the required schema, with no markdown formatting or extra text.',
          },
        ],
        images,
        maxTokens: 4_000,
        temperature,
      });

      try {
        let jsonText = result.text.trim();
        const jsonFenceMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
        if (jsonFenceMatch) {
          jsonText = jsonFenceMatch[1].trim();
        }
        parsed = JSON.parse(jsonText);
      } catch {
        // Fail-closed safe default (spec 11 §2.1)
        console.error('⚠ Critic JSON parse failed twice. Using fail-closed default.');
        return makeFailClosedDefault(candidateIds, result.text);
      }
    } else {
      return makeFailClosedDefault(candidateIds, result.text);
    }
  }

  // Schema Gate validation
  const gateResult = schemaGate<CriticOutput>('criticOutput', parsed);
  if (gateResult.data) {
    // Compute weighted_total if not provided correctly
    for (const candidate of gateResult.data.candidates) {
      const s = candidate.scores;
      if (s.system_adherence === undefined) {
        s.system_adherence = null;
      }
      // Phase 0 weighting: brand 35%, brief 30%, craft 35%
      s.weighted_total = Math.round(
        s.brand_adherence * 0.35 + s.brief_fit * 0.30 + s.craft * 0.35,
      );
      // Set verdict based on threshold
      candidate.verdict = s.weighted_total >= threshold ? 'pass' : 'fail';
    }

    return gateResult.data;
  }

  // Schema validation failed — one more try with re-ask
  console.error('⚠ Critic output schema validation failed:', gateResult.violations);
  return makeFailClosedDefault(candidateIds, result.text);
}

/**
 * Fail-closed safe default: verdict=fail, neutral scores, feedback from raw text.
 * Never defaults to pass (spec 11 §2.1).
 */
function makeFailClosedDefault(candidateIds: string[], rawText: string): CriticOutput {
  return {
    candidates: candidateIds.map(id => ({
      candidate_id: id,
      scores: {
        brand_adherence: 50,
        system_adherence: null,
        brief_fit: 50,
        craft: 50,
        weighted_total: 50,
      },
      verdict: 'fail' as const,
      feedback: `Critic output could not be parsed. Raw response snippet: ${rawText.slice(0, 200)}...`,
    })),
    ranking: candidateIds,
    overall_feedback: 'Critic output parsing failed — using fail-closed default scores.',
  };
}
