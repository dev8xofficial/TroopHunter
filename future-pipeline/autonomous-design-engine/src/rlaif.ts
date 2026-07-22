/**
 * ADE — RLAIF Preference Pipeline (E3.1)
 *
 * Generates AI-preference labels and routes low-confidence items
 * to human review.
 */

import { emitEscalation } from './escalations.js';
import type { CriticOutput, VerdictEntry } from './schema.js';
import { readVerdicts } from './verdicts.js';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export interface PreferenceLabel {
  winner_id: string;
  loser_id: string;
  confidence: number;
  reasoning: string;
  human_review_required: boolean;
}

/**
 * Route to human tier if the AI judge's confidence is low.
 * Emits an escalation into the queue.
 */
export function routeToHumanIfUncertain(outDir: string, runId: string, label: PreferenceLabel, threshold = 0.8): void {
  if (label.confidence < threshold) {
    label.human_review_required = true;
    emitEscalation(outDir, {
      type: 'gate_disagreement',
      runId,
      question: `Low confidence preference (${(label.confidence * 100).toFixed(0)}%) between ${label.winner_id} and ${label.loser_id}. Please review and specify the actual winner.`,
    });
  }
}

/**
 * Generate preference labels based on secondary judge or cross-family comparison.
 * In a real implementation, this would invoke a reward model or a different LLM.
 * For E3.1 ride-along, we simulate this using the existing critic scores/variance.
 */
export async function generatePreferenceLabels(outDir: string, runId: string, primaryCritic: CriticOutput, secondaryCritic?: CriticOutput): Promise<PreferenceLabel[]> {
  const labels: PreferenceLabel[] = [];

  // Simulate label generation based on candidate pairwise rankings
  const ranking = primaryCritic.ranking ?? [];
  if (ranking.length >= 2) {
    for (let i = 0; i < ranking.length - 1; i++) {
      const winner = ranking[i];
      const loser = ranking[i + 1];

      // Simulate confidence. If secondary critic disagrees, confidence drops.
      let confidence = 0.9;
      if (secondaryCritic?.ranking && secondaryCritic.ranking[0] !== ranking[0]) {
        confidence = 0.6; // High uncertainty if judges disagree
      }

      const label: PreferenceLabel = {
        winner_id: winner,
        loser_id: loser,
        confidence,
        reasoning: 'Primary critic ranking preference',
        human_review_required: false,
      };

      // R14 Routing
      routeToHumanIfUncertain(outDir, runId, label);
      labels.push(label);
    }
  }

  return labels;
}

/**
 * C3.5 — RLAIF Bulk Training Export
 * Budgets and formats accumulated human verdicts into a pairwise JSONL dataset
 * (chosen/rejected) suitable for DPO (Direct Preference Optimization) training
 * of a VLM Reward Model.
 */
export function exportRLAIFDataset(verdictsDir: string, outFilePath: string, budgetTokens: number): number {
  const verdicts = readVerdicts(verdictsDir);
  const dataset: any[] = [];
  let tokenCount = 0;

  // We group verdicts by run_id + section
  const grouped = new Map<string, VerdictEntry[]>();
  for (const v of verdicts) {
    const key = `${v.run_id}:${v.section}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(v);
  }

  for (const [key, entries] of grouped.entries()) {
    if (tokenCount + 50 > budgetTokens) break;

    // Find the preferred final (chosen) and any rejected/abandoned (loser)
    const chosen = entries.find((e) => e.preferred === 'final' || e.human_verdict === 'approve');
    const rejected = entries.find((e) => e.preferred !== 'final' && e.human_verdict === 'reject');

    if (chosen && rejected) {
      // Create a DPO pair row
      const row = {
        prompt: `Which design is better for ${chosen.section}?`,
        chosen: chosen.candidate_id,
        rejected: rejected.candidate_id,
        chosen_rating: chosen.rating,
        rejected_rating: rejected.rating,
        domain: 'simulated_industry', // would pull from run_id's brief
        reasoning: chosen.notes || 'Human preferred',
      };

      dataset.push(row);
      // Rough token estimation: 50 tokens per pair
      tokenCount += 50;
    }
  }

  const jsonl = dataset.map((row) => JSON.stringify(row)).join('\n');
  writeFileSync(outFilePath, jsonl, 'utf-8');

  return dataset.length;
}
