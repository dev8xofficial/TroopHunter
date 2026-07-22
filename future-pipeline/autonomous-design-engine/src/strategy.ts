/**
 * ADE — Strategy and Information Architecture (IA) Layer (E2.4)
 *
 * Generates an upstream site-plan and narrative from the brief — audience/
 * positioning -> site plan/narrative -> per-section goals — as Phase 1.5,
 * ahead of section-by-section generation. Phase-Exit-Reviewed itself
 * (fresh-context Critic + cross-family second judge), bounded retry, never
 * hand-patched.
 *
 * @module strategy
 */

import { randomUUID } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import type { ModelProvider } from './model.js';
import type { ArtifactQAReport, Brief, RunRecord } from './schema.js';
import { phaseExitReview } from './qa.js';

export interface SitePlan {
  id: string;
  client: string;
  narrative: string;
  sections: Array<{
    name: string;
    goal: string;
    key_message: string;
  }>;
  status: 'draft' | 'approved';
  created_at: string;
}

function buildStrategyPrompt(brief: Brief): { system: string; user: string } {
  const system = `You are a Lead UX Strategist.
Given a business brief, generate a site plan and narrative.
Return ONLY valid JSON matching this schema:
{
  "narrative": "Overall story or flow of the page",
  "sections": [
    { "name": "Hero", "goal": "Primary goal", "key_message": "Main takeaway" }
  ]
}`;

  const user = `BRIEF:
Client: ${brief.client}
Industry: ${brief.industry}
Audience: ${brief.audience}
Goal: ${brief.goal}`;

  return { system, user };
}

/** Generate ONE candidate site plan from the brief — no review, no retry. Internal building block for the bounded review loop below. */
async function draftStrategyPlan(brief: Brief, provider: ModelProvider): Promise<SitePlan> {
  const { system, user } = buildStrategyPrompt(brief);
  const response = await provider.complete({ system, messages: [{ role: 'user', content: user }], temperature: 0.7, maxTokens: 2000 });

  let parsed: { narrative?: string; sections?: SitePlan['sections'] };
  try {
    let text = response.text.trim();
    const match = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (match) text = match[1].trim();
    parsed = JSON.parse(text);
  } catch (err) {
    throw new Error(`Failed to parse strategy plan JSON: ${err}`);
  }

  return {
    id: randomUUID(),
    client: brief.client,
    narrative: parsed.narrative || '',
    sections: parsed.sections || [],
    status: 'draft',
    created_at: new Date().toISOString(),
  };
}

export interface StrategyReviewResult {
  verdict: 'pass' | 'fail';
  reasoning: string;
}

/**
 * Fresh-context Critic review of a candidate site plan: does the narrative
 * and per-section goal breakdown genuinely serve THIS brief's audience and
 * business goal, or does it read as generic filler? Same rubric shape as
 * brand.ts's reviewBrandFit / crystallizer.ts's reviewCrystallizedTokens.
 */
export async function reviewStrategyPlan(plan: SitePlan, brief: Brief, criticProvider: ModelProvider): Promise<StrategyReviewResult> {
  const result = await criticProvider.complete({
    system:
      'You are a senior UX strategist reviewing a DRAFT site plan before it drives generation. ' +
      'You did not write this plan. Judge only whether the narrative and per-section goals genuinely fit the business context, ' +
      'are internally coherent (one story, not disconnected sections), and give each section a distinct, non-generic goal. ' +
      'Reply with ONLY valid JSON: {"verdict": "pass"|"fail", "reasoning": "specific, actionable reason"}.',
    messages: [
      {
        role: 'user',
        content:
          `BUSINESS CONTEXT:\n  Client: ${brief.client}\n  Industry: ${brief.industry}\n  Audience: ${brief.audience}\n  Goal: ${brief.goal}\n\n` +
          `DRAFT SITE PLAN:\n  Narrative: ${plan.narrative}\n  Sections:\n${plan.sections.map((s) => `    - ${s.name}: goal="${s.goal}", key_message="${s.key_message}"`).join('\n')}\n\n` +
          `Does this plan genuinely fit the business context and read as one coherent narrative? Verdict + reasoning as JSON.`,
      },
    ],
    maxTokens: 500,
    temperature: 0.2,
  });

  try {
    let text = result.text.trim();
    const fence = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (fence) text = fence[1].trim();
    const parsed = JSON.parse(text);
    if (parsed.verdict === 'pass' || parsed.verdict === 'fail') {
      return { verdict: parsed.verdict, reasoning: String(parsed.reasoning ?? '') };
    }
  } catch {
    // fall through to fail-closed default
  }
  return { verdict: 'fail', reasoning: `Strategy plan review output could not be parsed: ${result.text.slice(0, 200)}` };
}

const STRATEGY_REVIEW_MAX_TRIES = 2;

/**
 * Generate a Strategy/IA site plan with a REAL bounded Phase-Exit Review
 * (E2.4): fresh-context Critic rubric above + qa.ts's cross-family second
 * judge, re-DRAFTING (never hand-patching a rejected plan) on failure,
 * bounded to STRATEGY_REVIEW_MAX_TRIES. The last attempt is returned
 * regardless of verdict — a review with no bound would just replace one
 * human gate with an unremovable machine one.
 */
export async function generateStrategyPlan(brief: Brief, genProvider: ModelProvider, criticProvider: ModelProvider, outDir: string, runId: string): Promise<{ plan: SitePlan; tries: number; finalVerdict: StrategyReviewResult }> {
  console.log(`\n🧠 Generating Strategy/IA Site Plan for ${brief.client}...`);

  let plan = await draftStrategyPlan(brief, genProvider);
  let review = await reviewStrategyPlan(plan, brief, criticProvider);
  await phaseExitReview(outDir, runId, `Strategy site plan for "${brief.client}"`, JSON.stringify({ narrative: plan.narrative, sections: plan.sections }), review.verdict);

  let tries = 1;
  while (review.verdict === 'fail' && tries < STRATEGY_REVIEW_MAX_TRIES) {
    console.warn(`⚠ Strategy plan review failed (try ${tries}/${STRATEGY_REVIEW_MAX_TRIES}): ${review.reasoning}`);
    console.warn('  Re-drafting (never hand-patching a rejected plan)...');
    plan = await draftStrategyPlan(brief, genProvider);
    review = await reviewStrategyPlan(plan, brief, criticProvider);
    await phaseExitReview(outDir, runId, `Strategy site plan for "${brief.client}" (retry ${tries + 1})`, JSON.stringify({ narrative: plan.narrative, sections: plan.sections }), review.verdict);
    tries++;
  }

  if (review.verdict === 'fail') {
    console.warn(`⚠ Strategy plan review still failing after ${tries} tries — escalating to human as-is (bounded, per E2.4).`);
  } else {
    console.log(`✅ Strategy plan review passed after ${tries} attempt(s).`);
  }

  plan.status = review.verdict === 'pass' ? 'approved' : 'draft';
  return { plan, tries, finalVerdict: review };
}

// ─── Storage (file-based, matching Plan.json's existing convention) ─

export function readSitePlan(path: string): SitePlan | null {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8')) as SitePlan;
}

export function writeSitePlan(path: string, plan: SitePlan): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(plan, null, 2), { flush: true });
}

// ─── Applying the plan to section briefs ────────────────────────────

/**
 * Fold each matching Strategy/IA section's goal + key_message into that
 * section's brief.goal as a clarifying note — the SAME "note, don't
 * overwrite" pattern already used for E1.2's comprehension-answer resume
 * and C2.4's reference dissolution: the plan informs generation, it never
 * silently replaces what a human wrote in the brief itself.
 */
export function applyStrategyToSections<T extends { name: string; brief: Brief }>(sections: T[], plan: SitePlan): T[] {
  return sections.map((section) => {
    const match = plan.sections.find((s) => s.name.toLowerCase() === section.name.toLowerCase());
    if (!match) return section;
    return {
      ...section,
      brief: {
        ...section.brief,
        goal: `${section.brief.goal}\n\n(Strategy/IA layer guidance: ${match.goal} — key message: ${match.key_message})`,
      },
    };
  });
}

// ─── Evaluation against the M5 human-plan corpus (E2.4) ─────────────

export type StrategyEvalSource = 'human-m5' | 'strategy-layer';

export interface StrategyEvalSample {
  briefFit: number; // RunRecord.scores.brief_fit for the section's final/best candidate
  coherenceScore: number; // whole-artifact coherence proxy — see coherenceFromQAReport()
  source: StrategyEvalSource;
}

export interface StrategyEvalSummary {
  totalHuman: number;
  totalStrategy: number;
  meanBriefFitHuman: number;
  meanBriefFitStrategy: number;
  briefFitDelta: number; // strategy - human; positive = strategy layer measurably raised brief-fit
  meanCoherenceHuman: number;
  meanCoherenceStrategy: number;
  coherenceDelta: number;
  sufficientSample: boolean;
}

const MIN_SAMPLE_PER_ARM = 5;

/**
 * A 0-1 whole-artifact coherence proxy from an ArtifactQAReport — this
 * codebase's existing, real measurements of "does this read as one
 * coherent page" (C1.10's structural variation score is about
 * purpose-appropriate DIFFERENCE; overall coherence also needs the QA pass/
 * violation signal, since a page that "passes" but is riddled with
 * violations is not coherent even if sections vary).
 */
export function coherenceFromQAReport(report: ArtifactQAReport): number {
  const violationPenalty = report.section_count > 0 ? Math.min(1, report.violations.length / report.section_count) : report.violations.length > 0 ? 1 : 0;
  return Math.max(0, (report.pass ? 1 : 0.5) - violationPenalty * 0.5) * (0.5 + report.variation_score * 0.5);
}

/** Extract the brief_fit of a section's FINAL (highest-iteration) candidate from its RunRecords — the same "final" convention calibration.ts already uses. */
export function briefFitFromRunRecords(records: RunRecord[]): number | undefined {
  if (records.length === 0) return undefined;
  const maxIteration = Math.max(...records.map((r) => r.iteration));
  const finalRecords = records.filter((r) => r.iteration === maxIteration);
  const best = finalRecords.reduce((a, b) => (b.scores.weighted_total > a.scores.weighted_total ? b : a));
  return best.scores.brief_fit;
}

/**
 * Real comparison mechanism (E2.4's "Done when: impact IS measured"): given
 * ALREADY-LABELED samples (the caller ran matched briefs once with a human
 * M5 plan and once with the Strategy/IA layer, and tags each result's
 * source), compute the mean brief_fit/coherence per arm and the delta.
 *
 * This function is honest about its own limits: it computes a REAL,
 * correct statistic over whatever samples exist — it does not fabricate a
 * corpus. `sufficientSample` stays false until enough paired runs have
 * actually accumulated (MIN_SAMPLE_PER_ARM per arm) for the delta to mean
 * anything; building that corpus is a real, ongoing evaluation exercise
 * across many runs, not something a single function call can manufacture.
 */
export function evaluateStrategyAgainstM5(samples: StrategyEvalSample[]): StrategyEvalSummary {
  const human = samples.filter((s) => s.source === 'human-m5');
  const strategy = samples.filter((s) => s.source === 'strategy-layer');

  const meanBriefFitHuman = average(human.map((s) => s.briefFit));
  const meanBriefFitStrategy = average(strategy.map((s) => s.briefFit));
  const meanCoherenceHuman = average(human.map((s) => s.coherenceScore));
  const meanCoherenceStrategy = average(strategy.map((s) => s.coherenceScore));

  return {
    totalHuman: human.length,
    totalStrategy: strategy.length,
    meanBriefFitHuman,
    meanBriefFitStrategy,
    briefFitDelta: meanBriefFitStrategy - meanBriefFitHuman,
    meanCoherenceHuman,
    meanCoherenceStrategy,
    coherenceDelta: meanCoherenceStrategy - meanCoherenceHuman,
    sufficientSample: human.length >= MIN_SAMPLE_PER_ARM && strategy.length >= MIN_SAMPLE_PER_ARM,
  };
}

export function formatStrategyEvalSummary(summary: StrategyEvalSummary): string {
  if (!summary.sufficientSample) {
    return `Strategy vs. M5 comparison: insufficient sample (human=${summary.totalHuman}, strategy=${summary.totalStrategy}; need >=${MIN_SAMPLE_PER_ARM} each). ` + `No claim about impact on brief-fit/coherence can be supported yet.`;
  }
  const briefFitVerdict = summary.briefFitDelta > 0 ? 'raised' : summary.briefFitDelta < 0 ? 'lowered' : 'did not change';
  const coherenceVerdict = summary.coherenceDelta > 0 ? 'raised' : summary.coherenceDelta < 0 ? 'lowered' : 'did not change';
  return [
    `Strategy vs. M5 comparison (human=${summary.totalHuman}, strategy=${summary.totalStrategy}):`,
    `  Brief-fit: human ${summary.meanBriefFitHuman.toFixed(1)} vs strategy ${summary.meanBriefFitStrategy.toFixed(1)} (${briefFitVerdict}, delta ${summary.briefFitDelta.toFixed(1)})`,
    `  Coherence: human ${summary.meanCoherenceHuman.toFixed(2)} vs strategy ${summary.meanCoherenceStrategy.toFixed(2)} (${coherenceVerdict}, delta ${summary.coherenceDelta.toFixed(2)})`,
  ].join('\n');
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}
