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
import { loadConstitution } from './constitution.js';
import { loadVisualExemplars } from './exemplars.js';
import { applyDualJudge } from './rewardModel.js';
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
export function normalizeCriticOutput(output: CriticOutput, candidateIds: string[], threshold: number, hasSystem: boolean): CriticOutput {
  const allowed = new Set(candidateIds);
  const byId = new Map(output.candidates.filter((candidate) => allowed.has(candidate.candidate_id)).map((candidate) => [candidate.candidate_id, candidate]));

  const candidates = candidateIds.map((candidateId) => {
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

  const candidateById = new Map(candidates.map((candidate) => [candidate.candidate_id, candidate]));
  const seen = new Set<string>();
  const pairwiseRanking = (output.ranking ?? []).filter((candidateId) => {
    if (!allowed.has(candidateId) || seen.has(candidateId)) {
      return false;
    }
    seen.add(candidateId);
    return true;
  });

  const scoreFallback = candidateIds
    .filter((candidateId) => !seen.has(candidateId))
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

export function computeWeightedTotal(scores: CriticOutput['candidates'][number]['scores'], hasSystem: boolean): number {
  return hasSystem ? Math.round(scores.brand_adherence * 0.25 + (scores.system_adherence ?? 0) * 0.25 + scores.brief_fit * 0.25 + scores.craft * 0.25) : Math.round(scores.brand_adherence * 0.35 + scores.brief_fit * 0.3 + scores.craft * 0.35);
}

import { randomizeCandidateOrder, deRandomizeScores, aggregateCriticEnsemble, extractFineDetailCrops } from './bias.js';

/**
 * Critique rendered screenshots of candidates.
 * Uses vision (screenshots as images), fresh context (I2).
 */
export async function critique(
  candidatesInfo: Record<string, { shots: Record<string, string>; domInfo?: any }>, // candidateId → { shots, domInfo }
  bundle: InputBundle,
  provider: ModelProvider,
  temperature: number,
  threshold: number,
  maxModelCalls: { current: number; max: number },
): Promise<CriticOutput> {
  const k = Number(process.env.ADE_CRITIC_ENSEMBLE_K || '1');
  const candidateIdsInOriginalOrder = Object.keys(candidatesInfo);
  const hasSystem = bundle.hardSystem?.status === 'foundation-frozen';

  const ensembleOutputs: CriticOutput[] = [];

  for (let i = 0; i < k; i++) {
    // 1. Order randomization per run
    const { shuffled, positionMap, originalToShuffled } = randomizeCandidateOrder(candidateIdsInOriginalOrder);

    // Build a shuffled candidatesInfo object
    const shuffledInfo: typeof candidatesInfo = {};
    for (const cid of shuffled) {
      shuffledInfo[cid] = candidatesInfo[cid];
    }

    const constitution = loadConstitution();
    const exemplars = loadVisualExemplars();
    const { system, user } = buildCriticPrompt(bundle, shuffledInfo, constitution, exemplars);

    // 2. Build image refs (including fine-detail crops)
    const images: ImageRef[] = [];

    // Add exemplars first (so they match the index in the prompt)
    for (const exemplar of exemplars) {
      try {
        const imageData = readFileSync(exemplar.imagePath);
        images.push({
          data: imageData.toString('base64'),
          mediaType: exemplar.imagePath.toLowerCase().endsWith('.jpg') || exemplar.imagePath.toLowerCase().endsWith('.jpeg') ? 'image/jpeg' : 'image/png',
        });
      } catch (err) {
        console.warn(`⚠ Could not read exemplar image ${exemplar.imagePath}: ${err}`);
      }
    }

    for (const candidateId of shuffled) {
      const candidateShots = candidatesInfo[candidateId].shots;
      for (const [breakpoint, shotPath] of Object.entries(candidateShots)) {
        try {
          const imageData = readFileSync(shotPath);
          images.push({
            data: imageData.toString('base64'),
            mediaType: 'image/png',
          });

          // Add fine-detail crops for desktop (to avoid doing it for every small mobile breakpoint)
          if (breakpoint === 'desktop') {
            const crops = await extractFineDetailCrops(imageData, 3);
            images.push(...crops);
          }
        } catch (err) {
          console.warn(`⚠ Could not read screenshot ${shotPath}: ${err}`);
        }
      }
    }

    // 3. Provider call
    maxModelCalls.current++;
    let result = await provider.complete({
      system,
      messages: [{ role: 'user', content: user }],
      images,
      maxTokens: 4_000,
      temperature,
    });

    let parsed: unknown;
    try {
      let jsonText = result.text.trim();
      const jsonFenceMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
      if (jsonFenceMatch) {
        jsonText = jsonFenceMatch[1].trim();
      }
      parsed = JSON.parse(jsonText);
    } catch {
      if (isCriticRefusal(result.text)) {
        console.error('⚠ Critic appears to have refused (not just malformed JSON); re-asking...');
      } else {
        console.error('⚠ Critic returned invalid JSON, re-asking...');
      }

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
          console.error('⚠ Critic JSON parse failed twice. Using fail-closed default.');
          ensembleOutputs.push(makeFailClosedDefault(shuffled, result.text));
          continue;
        }
      } else {
        ensembleOutputs.push(makeFailClosedDefault(shuffled, result.text));
        continue;
      }
    }

    const gateResult = schemaGate<CriticOutput>('criticOutput', parsed);
    let outputToPush: CriticOutput;
    if (gateResult.data) {
      outputToPush = normalizeCriticOutput(gateResult.data, shuffled, threshold, hasSystem);
    } else {
      console.error('⚠ Critic output schema validation failed:', gateResult.violations);
      outputToPush = makeFailClosedDefault(shuffled, result.text);
    }

    // Restore canonical order before adding to ensemble
    const restored = deRandomizeScores(outputToPush, candidateIdsInOriginalOrder);

    // Attach audit log mapping (mapping original_id -> shuffled_index)
    const strPosMap: Record<string, number> = {};
    for (const [origIdx, shufIdx] of Object.entries(originalToShuffled)) {
      strPosMap[candidateIdsInOriginalOrder[Number(origIdx)]] = shufIdx;
    }
    restored.position_maps = [strPosMap];

    ensembleOutputs.push(restored);
  }

  // 4. Ensemble Aggregation
  let finalOutput = aggregateCriticEnsemble(ensembleOutputs);
  // Collect all position maps from the ensemble
  finalOutput.position_maps = ensembleOutputs.flatMap((o) => o.position_maps || []);

  // C3.5 — R4 Reward Model: Dual-Judge deployment harness.
  // Pass the aggregated prompted Critic's output through the learned Reward Model,
  // which separates signals and adjusts the final score.
  finalOutput = applyDualJudge(finalOutput, bundle.brief.industry);

  return finalOutput;
}

/**
 * Detect a refusal-shaped Critic response (F-MOD-02) for logging purposes
 * only — the caller's fail-closed handling is identical either way.
 */
function isCriticRefusal(text: string): boolean {
  const lower = text.toLowerCase();
  const hasJson = text.includes('{') && text.includes('candidates');
  if (hasJson) return false;
  return ['i cannot', "i'm unable", 'i am unable', "i'm sorry", 'i apologize', 'as an ai'].some((phrase) => lower.includes(phrase));
}

/**
 * Fail-closed safe default: verdict=fail, neutral scores, feedback from raw text.
 * Never defaults to pass (spec 11 §2.1).
 */
function makeFailClosedDefault(candidateIds: string[], rawText: string): CriticOutput {
  return {
    candidates: candidateIds.map((id) => ({
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
