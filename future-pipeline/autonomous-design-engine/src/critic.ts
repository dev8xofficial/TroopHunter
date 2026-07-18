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
 * Normalize a Critic reply after schema validation.
 *
 * Pairwise ranking is a stronger signal than close absolute scores, so a
 * model-provided ranking is preserved first and completed with score fallback.
 */
export function normalizeCriticOutput(
  output: CriticOutput,
  candidateIds: string[],
  threshold: number,
  hasSystem: boolean,
): CriticOutput {
  const allowed = new Set(candidateIds);
  const byId = new Map(output.candidates
    .filter(candidate => allowed.has(candidate.candidate_id))
    .map(candidate => [candidate.candidate_id, candidate]));

  const candidates = candidateIds.map(candidateId => {
    const candidate = byId.get(candidateId) ?? {
      candidate_id: candidateId,
      scores: {
        brand_adherence: 50,
        system_adherence: null,
        brief_fit: 50,
        craft: 50,
        weighted_total: 50,
      },
      verdict: 'fail' as const,
      feedback: 'Critic omitted this candidate; using fail-closed neutral score.',
    };

    const scores = candidate.scores;
    if (scores.system_adherence === undefined) {
      scores.system_adherence = null;
    }
    scores.weighted_total = computeWeightedTotal(scores, hasSystem);
    candidate.verdict = scores.weighted_total >= threshold ? 'pass' : 'fail';
    return candidate;
  });

  const candidateById = new Map(candidates.map(candidate => [candidate.candidate_id, candidate]));
  const seen = new Set<string>();
  const pairwiseRanking = (output.ranking ?? []).filter(candidateId => {
    if (!allowed.has(candidateId) || seen.has(candidateId)) {
      return false;
    }
    seen.add(candidateId);
    return true;
  });

  const scoreFallback = candidateIds
    .filter(candidateId => !seen.has(candidateId))
    .sort((a, b) => {
      const candidateA = candidateById.get(a)!;
      const candidateB = candidateById.get(b)!;
      const scoreDelta = candidateB.scores.weighted_total - candidateA.scores.weighted_total;
      if (scoreDelta !== 0) {
        return scoreDelta;
      }
      return candidateB.scores.craft - candidateA.scores.craft;
    });

  return {
    ...output,
    candidates,
    ranking: [...pairwiseRanking, ...scoreFallback],
  };
}

export function computeWeightedTotal(
  scores: CriticOutput['candidates'][number]['scores'],
  hasSystem: boolean,
): number {
  return hasSystem
    ? Math.round(
      scores.brand_adherence * 0.25 +
      (scores.system_adherence ?? 0) * 0.25 +
      scores.brief_fit * 0.25 +
      scores.craft * 0.25,
    )
    : Math.round(
      scores.brand_adherence * 0.35 + scores.brief_fit * 0.30 + scores.craft * 0.35,
    );
}

/**
 * Critique rendered screenshots of candidates.
 * Uses vision (screenshots as images), fresh context (I2).
 */
export async function critique(
  candidatesInfo: Record<string, { shots: Record<string, string>, domInfo?: any }>, // candidateId → { shots, domInfo }
  bundle: InputBundle,
  provider: ModelProvider,
  temperature: number,
  threshold: number,
  maxModelCalls: { current: number; max: number },
): Promise<CriticOutput> {
  const candidateIds = Object.keys(candidatesInfo);
  const { system, user } = buildCriticPrompt(bundle, candidatesInfo);
  const hasSystem = bundle.hardSystem?.status === 'foundation-frozen';

  // Build image refs from screenshots (vision)
  const images: ImageRef[] = [];
  for (const candidateId of candidateIds) {
    const candidateShots = candidatesInfo[candidateId].shots;
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
    return normalizeCriticOutput(gateResult.data, candidateIds, threshold, hasSystem);
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
