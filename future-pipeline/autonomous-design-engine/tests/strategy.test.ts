/**
 * ADE Tests — Strategy/IA layer (E2.4)
 *
 * generateStrategyPlan() previously hardcoded 'pass' into its Phase-Exit
 * Review call — a fake review that could never actually catch a bad plan.
 * These tests prove reviewStrategyPlan is a REAL fresh-context Critic call
 * (pass/fail/fail-closed), that the bounded retry loop genuinely
 * re-DRAFTS (not hand-patches) on failure and stops at the bound, that
 * applyStrategyToSections folds guidance in without overwriting the human
 * brief, and that the M5 comparison mechanism computes a real statistic.
 */

import { describe, it, expect, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import type { CompletionRequest, CompletionResult, ModelProvider } from '../src/model.js';
import type { ArtifactQAReport, Brief, RunRecord } from '../src/schema.js';
import { applyStrategyToSections, briefFitFromRunRecords, coherenceFromQAReport, evaluateStrategyAgainstM5, formatStrategyEvalSummary, generateStrategyPlan, readSitePlan, reviewStrategyPlan, writeSitePlan, type SitePlan, type StrategyEvalSample } from '../src/strategy.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'strategy-test');

afterEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

const brief: Brief = {
  client: 'StrategyCo',
  industry: 'Finance',
  audience: 'CFOs',
  goal: 'Build trust, generate leads',
  section: { name: 'hero', content: { headline: 'Clarity for Finance Teams' } },
};

function scriptedProvider(responses: string[]): ModelProvider {
  let i = 0;
  return {
    id: 'mock:strategy',
    async complete(_req: CompletionRequest): Promise<CompletionResult> {
      const text = responses[Math.min(i, responses.length - 1)];
      i++;
      return { text, usage: { input: 10, output: 20 } };
    },
  };
}

function planJson(
  sections = [
    { name: 'Hero', goal: 'Establish trust immediately', key_message: 'We are the safe choice' },
    { name: 'Proof', goal: 'Show evidence of results', key_message: 'Real client outcomes' },
  ],
) {
  return JSON.stringify({ narrative: 'Trust, then proof, then action.', sections });
}

function samplePlan(): SitePlan {
  return {
    id: 'plan-1',
    client: 'StrategyCo',
    narrative: 'Trust, then proof, then action.',
    sections: [
      { name: 'Hero', goal: 'Establish trust immediately', key_message: 'We are the safe choice' },
      { name: 'Proof', goal: 'Show evidence of results', key_message: 'Real client outcomes' },
    ],
    status: 'approved',
    created_at: new Date().toISOString(),
  };
}

describe('reviewStrategyPlan (E2.4 — real review, not a hardcoded pass)', () => {
  it('parses a pass verdict from valid JSON', async () => {
    const provider = scriptedProvider([JSON.stringify({ verdict: 'pass', reasoning: 'Coherent, fits the finance-trust brief.' })]);
    const result = await reviewStrategyPlan(samplePlan(), brief, provider);
    expect(result.verdict).toBe('pass');
  });

  it('parses a fail verdict with reasoning', async () => {
    const provider = scriptedProvider([JSON.stringify({ verdict: 'fail', reasoning: 'Sections read as generic filler, not tied to CFOs.' })]);
    const result = await reviewStrategyPlan(samplePlan(), brief, provider);
    expect(result.verdict).toBe('fail');
    expect(result.reasoning).toContain('generic filler');
  });

  it('fails CLOSED on unparseable output — never silently passes', async () => {
    const provider = scriptedProvider(['not json at all']);
    const result = await reviewStrategyPlan(samplePlan(), brief, provider);
    expect(result.verdict).toBe('fail');
  });

  it('strips markdown fences before parsing', async () => {
    const provider = scriptedProvider(['```json\n' + JSON.stringify({ verdict: 'pass', reasoning: 'ok' }) + '\n```']);
    const result = await reviewStrategyPlan(samplePlan(), brief, provider);
    expect(result.verdict).toBe('pass');
  });
});

describe('generateStrategyPlan (E2.4 — bounded review + re-draft loop)', () => {
  it('passes on the first attempt when the review immediately approves', async () => {
    const genProvider = scriptedProvider([planJson()]);
    const criticProvider = scriptedProvider([JSON.stringify({ verdict: 'pass', reasoning: 'Good fit.' })]);
    const { tries, finalVerdict } = await generateStrategyPlan(brief, genProvider, criticProvider, TEST_DIR, 'run-1');
    expect(tries).toBe(1);
    expect(finalVerdict.verdict).toBe('pass');
  });

  it('re-DRAFTS (not hand-patches) on a failed review, then passes on retry — proven by a genuinely different plan on the second call', async () => {
    let genCalls = 0;
    const genProvider: ModelProvider = {
      id: 'mock:gen',
      async complete(_req) {
        genCalls++;
        return {
          text: genCalls === 1 ? planJson([{ name: 'Hero', goal: 'Generic goal', key_message: 'Generic message' }]) : planJson([{ name: 'Hero', goal: 'CFO-specific trust goal', key_message: 'Audited, compliant, proven' }]),
          usage: { input: 10, output: 20 },
        };
      },
    };
    const criticProvider = scriptedProvider([JSON.stringify({ verdict: 'fail', reasoning: 'Too generic for a CFO audience.' }), JSON.stringify({ verdict: 'pass', reasoning: 'Much more specific now.' })]);

    const { plan, tries, finalVerdict } = await generateStrategyPlan(brief, genProvider, criticProvider, TEST_DIR, 'run-2');
    expect(genCalls).toBe(2); // genuinely re-drafted, not patched
    expect(tries).toBe(2);
    expect(finalVerdict.verdict).toBe('pass');
    expect(plan.sections[0].goal).toBe('CFO-specific trust goal');
    expect(plan.status).toBe('approved');
  });

  it('is bounded — stops at STRATEGY_REVIEW_MAX_TRIES even if every review fails, and marks the plan draft (not silently approved)', async () => {
    let genCalls = 0;
    const genProvider: ModelProvider = {
      id: 'mock:gen-always-fail',
      async complete(_req) {
        genCalls++;
        return { text: planJson(), usage: { input: 10, output: 20 } };
      },
    };
    const criticProvider: ModelProvider = {
      id: 'mock:always-fail',
      async complete(_req) {
        return { text: JSON.stringify({ verdict: 'fail', reasoning: 'Still generic.' }), usage: { input: 10, output: 20 } };
      },
    };

    const { plan, tries, finalVerdict } = await generateStrategyPlan(brief, genProvider, criticProvider, TEST_DIR, 'run-3');
    expect(tries).toBe(2); // bounded, never unbounded
    expect(finalVerdict.verdict).toBe('fail');
    expect(genCalls).toBe(2);
    expect(plan.status).toBe('draft'); // never silently marked approved
  });
});

describe('SitePlan storage', () => {
  it('writeSitePlan then readSitePlan round-trips exactly', () => {
    const path = join(TEST_DIR, 'plan.json');
    const plan = samplePlan();
    writeSitePlan(path, plan);
    const reread = readSitePlan(path);
    expect(reread).toEqual(plan);
  });

  it('readSitePlan returns null for a nonexistent path, never throws', () => {
    expect(readSitePlan(join(TEST_DIR, 'ghost.json'))).toBeNull();
  });
});

describe('applyStrategyToSections (E2.4)', () => {
  it("folds a matching strategy section's goal/key_message into the brief.goal as a NOTE, not an overwrite", () => {
    const sections = [{ name: 'Hero', brief: { ...brief, section: { name: 'Hero', content: {} } } }];
    const result = applyStrategyToSections(sections, samplePlan());

    expect(result[0].brief.goal).toContain(brief.goal); // original goal preserved
    expect(result[0].brief.goal).toContain('Establish trust immediately'); // strategy guidance appended
    expect(result[0].brief.goal).toContain('We are the safe choice');
  });

  it('matches section names case-insensitively', () => {
    const sections = [{ name: 'hero', brief: { ...brief, section: { name: 'hero', content: {} } } }];
    const result = applyStrategyToSections(sections, samplePlan());
    expect(result[0].brief.goal).toContain('Establish trust immediately');
  });

  it('leaves a section untouched when no matching strategy section exists', () => {
    const sections = [{ name: 'Footer', brief: { ...brief, section: { name: 'Footer', content: {} } } }];
    const result = applyStrategyToSections(sections, samplePlan());
    expect(result[0].brief.goal).toBe(brief.goal);
  });
});

describe('coherenceFromQAReport (E2.4 evaluation input)', () => {
  const baseReport = (overrides: Partial<ArtifactQAReport> = {}): ArtifactQAReport => ({
    artifact_id: 'a',
    client_id: 'c',
    surface: 'website',
    pass: true,
    checked_at: new Date().toISOString(),
    section_count: 4,
    average_score: 90,
    variation_score: 0.8,
    summary: 'ok',
    violations: [],
    ...overrides,
  });

  it('scores highest for a passing report with no violations and high variation', () => {
    const score = coherenceFromQAReport(baseReport());
    expect(score).toBeGreaterThan(0.5);
    expect(score).toBeLessThanOrEqual(1);
  });

  it('scores lower for a failing report with violations', () => {
    const clean = coherenceFromQAReport(baseReport());
    const dirty = coherenceFromQAReport(
      baseReport({
        pass: false,
        violations: [
          { gate: 'x', rule: 'y', message: 'z', severity: 'serious', fixable: true },
          { gate: 'x', rule: 'y2', message: 'z2', severity: 'serious', fixable: true },
        ],
      }),
    );
    expect(dirty).toBeLessThan(clean);
  });

  it('never goes negative even with more violations than sections', () => {
    const score = coherenceFromQAReport(
      baseReport({
        pass: false,
        section_count: 1,
        violations: Array.from({ length: 5 }, (_, i) => ({ gate: 'x', rule: `r${i}`, message: 'z', severity: 'critical' as const, fixable: true })),
      }),
    );
    expect(score).toBeGreaterThanOrEqual(0);
  });
});

describe('briefFitFromRunRecords (E2.4 evaluation input)', () => {
  function record(overrides: Partial<RunRecord>): RunRecord {
    return {
      run_id: 'r1',
      section_id: 'hero',
      iteration: 0,
      candidate_id: 'c1',
      input_bundle_ref: 'x',
      output_code_ref: 'y',
      screenshots: {},
      scores: { brand_adherence: 90, system_adherence: 90, brief_fit: 85, craft: 90, weighted_total: 89 },
      verdict: 'pass',
      critic_feedback: '',
      duration_ms: 1000,
      tokens: { input: 1, output: 1 },
      model_id: 'm',
      timestamp: new Date().toISOString(),
      ...overrides,
    };
  }

  it('returns the brief_fit of the FINAL (highest-iteration) best candidate', () => {
    const records = [record({ iteration: 0, candidate_id: 'a', scores: { brand_adherence: 70, system_adherence: 70, brief_fit: 60, craft: 70, weighted_total: 68 } }), record({ iteration: 1, candidate_id: 'b', scores: { brand_adherence: 92, system_adherence: 90, brief_fit: 88, craft: 91, weighted_total: 90 } })];
    expect(briefFitFromRunRecords(records)).toBe(88);
  });

  it('returns undefined for an empty record set', () => {
    expect(briefFitFromRunRecords([])).toBeUndefined();
  });
});

describe('evaluateStrategyAgainstM5 (E2.4 — real comparison mechanism)', () => {
  it('computes real per-arm means and a positive delta when strategy genuinely outperforms', () => {
    const samples: StrategyEvalSample[] = [
      { briefFit: 70, coherenceScore: 0.6, source: 'human-m5' },
      { briefFit: 72, coherenceScore: 0.65, source: 'human-m5' },
      { briefFit: 74, coherenceScore: 0.6, source: 'human-m5' },
      { briefFit: 71, coherenceScore: 0.62, source: 'human-m5' },
      { briefFit: 73, coherenceScore: 0.64, source: 'human-m5' },
      { briefFit: 85, coherenceScore: 0.8, source: 'strategy-layer' },
      { briefFit: 87, coherenceScore: 0.82, source: 'strategy-layer' },
      { briefFit: 84, coherenceScore: 0.78, source: 'strategy-layer' },
      { briefFit: 86, coherenceScore: 0.81, source: 'strategy-layer' },
      { briefFit: 88, coherenceScore: 0.79, source: 'strategy-layer' },
    ];
    const summary = evaluateStrategyAgainstM5(samples);
    expect(summary.totalHuman).toBe(5);
    expect(summary.totalStrategy).toBe(5);
    expect(summary.briefFitDelta).toBeGreaterThan(0);
    expect(summary.coherenceDelta).toBeGreaterThan(0);
    expect(summary.sufficientSample).toBe(true);
  });

  it('marks sufficientSample false and refuses to imply a claim when the sample is too small', () => {
    const samples: StrategyEvalSample[] = [
      { briefFit: 90, coherenceScore: 0.9, source: 'human-m5' },
      { briefFit: 95, coherenceScore: 0.95, source: 'strategy-layer' },
    ];
    const summary = evaluateStrategyAgainstM5(samples);
    expect(summary.sufficientSample).toBe(false);
    expect(formatStrategyEvalSummary(summary)).toContain('insufficient sample');
  });

  it('handles an empty sample set without throwing', () => {
    const summary = evaluateStrategyAgainstM5([]);
    expect(summary.totalHuman).toBe(0);
    expect(summary.totalStrategy).toBe(0);
    expect(summary.sufficientSample).toBe(false);
  });

  it('formatStrategyEvalSummary reports a real delta once the sample is sufficient', () => {
    const humanSamples: StrategyEvalSample[] = Array.from({ length: 5 }, () => ({ briefFit: 70, coherenceScore: 0.6, source: 'human-m5' }));
    const strategySamples: StrategyEvalSample[] = Array.from({ length: 5 }, () => ({ briefFit: 80, coherenceScore: 0.7, source: 'strategy-layer' }));
    const summary = evaluateStrategyAgainstM5([...humanSamples, ...strategySamples]);
    const text = formatStrategyEvalSummary(summary);
    expect(text).toContain('raised');
    expect(text).not.toContain('insufficient sample');
  });
});
