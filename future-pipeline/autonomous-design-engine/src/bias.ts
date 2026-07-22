/**
 * ADE — Judge-Bias Mitigation (Phase 3 / C3.1)
 *
 * Implements active mitigations for judge biases:
 * - Order randomization (F-JDG-07)
 * - Self-consistency ensemble (F-JDG-06)
 * - Fine-detail crop inspection
 *
 * @module bias
 */

import sharp from 'sharp';
import type { ModelProvider, ImageRef } from './model.js';
import type { InputBundle, CriticOutput } from './schema.js';

export interface PositionMap {
  [shuffledIndex: number]: number; // Maps new index -> original index
}

/**
 * Fisher-Yates shuffle that returns both the shuffled array and the
 * inverse mapping to restore the original order later.
 */
export function randomizeCandidateOrder<T>(candidates: T[]): {
  shuffled: T[];
  positionMap: PositionMap;
  originalToShuffled: Record<number, number>;
} {
  const items = candidates.map((c, i) => ({ item: c, originalIndex: i }));

  // Fisher-Yates
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  const shuffled = items.map((x) => x.item);
  const positionMap: PositionMap = {};
  const originalToShuffled: Record<number, number> = {};

  items.forEach((x, shuffledIndex) => {
    positionMap[shuffledIndex] = x.originalIndex;
    originalToShuffled[x.originalIndex] = shuffledIndex;
  });

  return { shuffled, positionMap, originalToShuffled };
}

/**
 * Given a full-page screenshot, extract N crop regions as separate image refs.
 * Helps the Critic see kerning, 1px misalignment, and small-text legibility.
 *
 * Returns base64 PNGs.
 */
export async function extractFineDetailCrops(screenshotBuffer: Buffer, numCrops = 3): Promise<ImageRef[]> {
  try {
    const image = sharp(screenshotBuffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return [];
    }

    const { width, height } = metadata;
    const cropHeight = Math.floor(height / numCrops);
    const crops: ImageRef[] = [];

    for (let i = 0; i < numCrops; i++) {
      const top = i * cropHeight;
      // Ensure we don't go out of bounds
      const actualHeight = i === numCrops - 1 ? height - top : cropHeight;

      const cropBuffer = await image.extract({ left: 0, top, width, height: actualHeight }).png().toBuffer();

      crops.push({
        data: cropBuffer.toString('base64'),
        mediaType: 'image/png',
      });
    }

    return crops;
  } catch (err) {
    console.warn('⚠ Failed to extract fine-detail crops:', err);
    return [];
  }
}

/**
 * Restore the original candidate order in the CriticOutput.
 */
export function deRandomizeScores(output: CriticOutput, candidateIdsInOriginalOrder: string[]): CriticOutput {
  // The output.candidates array and ranking array use candidate_id strings,
  // so their absolute order in the JSON array doesn't break semantics,
  // but for consistency we re-sort candidates back to original order.

  const originalOrder = new Map(candidateIdsInOriginalOrder.map((id, i) => [id, i]));

  const sortedCandidates = [...output.candidates].sort((a, b) => {
    const aIndex = originalOrder.get(a.candidate_id) ?? 999;
    const bIndex = originalOrder.get(b.candidate_id) ?? 999;
    return aIndex - bIndex;
  });

  return {
    ...output,
    candidates: sortedCandidates,
  };
}

/**
 * Aggregate multiple CriticOutputs via majority-vote for verdict
 * and median for continuous scores.
 */
export function aggregateCriticEnsemble(outputs: CriticOutput[]): CriticOutput {
  if (outputs.length === 0) {
    throw new Error('Cannot aggregate empty ensemble');
  }
  if (outputs.length === 1) {
    return outputs[0];
  }

  // We assume all outputs evaluate the same set of candidates
  const first = outputs[0];
  const candidateIds = first.candidates.map((c) => c.candidate_id);

  const aggregatedCandidates = candidateIds.map((candidateId) => {
    const candidateResults = outputs.map((o) => o.candidates.find((c) => c.candidate_id === candidateId)!);

    // Majority vote for verdict
    const passes = candidateResults.filter((c) => c.verdict === 'pass').length;
    const fails = candidateResults.length - passes;
    const verdict = (passes > fails ? 'pass' : 'fail') as 'pass' | 'fail';

    // Median for scores
    const getMedian = (extract: (scores: any) => number | null) => {
      const vals = candidateResults.map((c) => extract(c.scores)).filter((v) => v !== null) as number[];
      if (vals.length === 0) return null;
      vals.sort((a, b) => a - b);
      const mid = Math.floor(vals.length / 2);
      return vals.length % 2 !== 0 ? vals[mid] : Math.round((vals[mid - 1] + vals[mid]) / 2);
    };

    const brand_adherence = getMedian((s) => s.brand_adherence)!;
    const system_adherence = getMedian((s) => s.system_adherence);
    const brief_fit = getMedian((s) => s.brief_fit)!;
    const craft = getMedian((s) => s.craft)!;
    const weighted_total = getMedian((s) => s.weighted_total)!;

    // Concatenate feedback to see varying opinions
    const feedback = candidateResults.map((c, i) => `[Judge ${i + 1}]: ${c.feedback}`).join('\n');

    return {
      candidate_id: candidateId,
      scores: { brand_adherence, system_adherence, brief_fit, craft, weighted_total },
      verdict,
      feedback,
    };
  });

  // For ranking, use median weighted_total
  const aggregatedRanking = [...candidateIds].sort((a, b) => {
    const aCand = aggregatedCandidates.find((c) => c.candidate_id === a)!;
    const bCand = aggregatedCandidates.find((c) => c.candidate_id === b)!;
    return bCand.scores.weighted_total - aCand.scores.weighted_total;
  });

  return {
    candidates: aggregatedCandidates,
    ranking: aggregatedRanking,
    overall_feedback: `[Ensemble of ${outputs.length} judges]\n` + outputs.map((o, i) => `[Judge ${i + 1}]: ${o.overall_feedback}`).join('\n'),
  };
}
