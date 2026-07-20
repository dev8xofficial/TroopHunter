import { describe, it, expect } from 'vitest';
import type {
  Artifact,
  BrandFoundation,
  ProjectDesignSystem,
  RunRecord,
} from '../src/schema.js';
import type { CalibrationSummary } from '../src/calibration.js';
import {
  computeEarnedRung,
  recommendAutonomyPolicy,
  shouldRequireHumanSectionReview,
} from '../src/autonomy.js';
import { runCrossSurfaceBrandQA, runWholeArtifactQA } from '../src/qa.js';
import {
  checkCostBudget,
  summarizeTraceCost,
  validateProductionReadiness,
} from '../src/production.js';
import type { Config } from '../src/config.js';

describe('Phase 4 scale, autonomy, and production hardening', () => {
  it('runs whole-artifact QA and blocks incomplete assembled artifacts', () => {
    const report = runWholeArtifactQA(artifact([
      section('hero', 'approved', 92),
      section('pricing', 'draft', 72, ''),
    ]), brand(), pds('website'), { threshold: 80 });

    expect(report.pass).toBe(false);
    expect(report.violations.map(v => v.rule)).toEqual(expect.arrayContaining([
      'section-not-approved',
      'missing-code',
      'missing-screenshots',
      'section-below-threshold',
    ]));
  });

  it('passes cross-surface QA when website and product share Brand but keep separate PDSs', () => {
    const frozenBrand = brand();
    const websiteArtifact = artifact([section('hero', 'approved', 90)], 'website');
    const productArtifact = artifact([section('dashboard', 'approved', 88)], 'product');

    const result = runCrossSurfaceBrandQA(frozenBrand, [
      websiteArtifact,
      productArtifact,
    ], [
      pds('website'),
      pds('product', { compact: '8px' }),
    ]);

    expect(result.pass).toBe(true);
  });

  it('flags product PDS that loses recognizable brand tokens', () => {
    const result = runCrossSurfaceBrandQA(brand(), [
      artifact([section('dashboard', 'approved', 88)], 'product'),
    ], [
      pds('product', undefined, { color: { danger: '#FF0000' } }),
    ]);

    expect(result.pass).toBe(false);
    expect(result.violations.map(v => v.rule)).toContain('brand-token-missing');
  });

  it('requires production API mode and explicit caps before production runs', () => {
    const ready = validateProductionReadiness(config({
      productionMode: true,
      provider: 'agent-sdk',
      anthropicApiKey: undefined,
    }));

    expect(ready.pass).toBe(false);
    expect(ready.violations.map(v => v.rule)).toEqual(expect.arrayContaining([
      'provider-not-api',
      'missing-api-key',
    ]));

    const apiReady = validateProductionReadiness(config({
      productionMode: true,
      provider: 'api',
      anthropicApiKey: 'test-key',
      harness: 'next',
    }));
    expect(apiReady.pass).toBe(true);
  });

  it('summarizes H7 cost and checks per-section budget caps', () => {
    const summary = summarizeTraceCost([
      record('run-1', 'hero', 100_000, 50_000, 120_000),
      record('run-2', 'pricing', 90_000, 40_000, 180_000),
    ]);
    const violations = checkCostBudget(summary, {
      maxTokensPerSection: 100_000,
      maxSecondsPerSection: 100,
      maxUsdPerSection: 0.5,
    });

    expect(summary.tokensPerSection).toBe(140_000);
    expect(violations.map(v => v.rule)).toEqual(expect.arrayContaining([
      'tokens-per-section',
      'seconds-per-section',
      'usd-per-section',
    ]));
  });

  it('climbs autonomy rungs only when calibration evidence supports it', () => {
    const summary = calibrationSummary({
      total: 60,
      recommendedAccuracy: 0.91,
      falsePassRate: 0.04,
      recentAgreement: 0.88,
    });

    expect(computeEarnedRung(summary)).toBe(3);

    const policy = recommendAutonomyPolicy(summary, 4, 2);
    expect(policy.activeRung).toBe(3);
    expect(policy.humanGates.sectionApproval).toBe('exceptions-only');
    expect(shouldRequireHumanSectionReview(policy, 1, 'pass')).toBe(false);
    expect(shouldRequireHumanSectionReview(policy, 1, 'fail')).toBe(true);
  });
});

function brand(): BrandFoundation {
  return {
    client_id: 'phase-four',
    version: 2,
    status: 'frozen',
    identity: {
      palette: [
        { role: 'text', value: '#111827' },
        { role: 'background', value: '#FFFFFF' },
        { role: 'accent', value: '#2563EB' },
      ],
      typography: [
        { role: 'display', family: 'Inter', fallback: 'sans-serif' },
        { role: 'ui', family: 'Inter', fallback: 'sans-serif' },
      ],
      motion_voice: 'Calm and quick',
      personality: ['clear', 'trusted'],
      tone: 'Assured',
    },
    provenance: {
      palette: 'provided',
      typography: 'provided',
      motion_voice: 'derived',
      personality: 'derived',
      tone: 'derived',
    },
  };
}

function pds(
  surface: 'website' | 'product',
  space: Record<string, string> = { section: '64px' },
  overrides: Partial<ProjectDesignSystem['tokens']> = {},
): ProjectDesignSystem {
  return {
    client_id: 'phase-four',
    version: 1,
    surface,
    status: 'foundation-frozen',
    inherits: 'phase-four',
    tokens: {
      color: { text: '#111827', background: '#FFFFFF', accent: '#2563EB' },
      type: { display: '32px/1.1 Inter', body: '16px/1.5 Inter' },
      space,
      radius: { card: '8px' },
      shadow: {},
      motion: { fast: '200ms' },
      ...overrides,
    },
    components: [{
      name: surface === 'product' ? 'data-panel' : 'hero-card',
      anatomy: 'Container',
      variants: ['default'],
      states: ['default'],
      locked_in: surface === 'product' ? 'dashboard' : 'hero',
    }],
    foundation_from: surface === 'product' ? 'dashboard' : 'hero',
  };
}

function artifact(
  sections: Artifact['sections'],
  surface: 'website' | 'product' = 'website',
): Artifact {
  return {
    artifact_id: `phase-four-${surface}`,
    client_id: 'phase-four',
    surface,
    status: 'in-progress',
    sections,
  };
}

function section(
  name: string,
  status: 'draft' | 'approved',
  score: number,
  code = 'export default function Section(){return <section className="bg-[#FFFFFF] text-[#111827] p-[64px] rounded-[8px] duration-[200ms]">Ready</section>}',
): Artifact['sections'][number] {
  return {
    section_id: `phase-four_${name}`,
    name,
    code: { component: code },
    screenshots: code ? { '1440': '/tmp/shot.png' } : {},
    final_score: {
      brand_adherence: score,
      system_adherence: score,
      brief_fit: score,
      craft: score,
      weighted_total: score,
    },
    status,
  };
}

function config(partial: Partial<Config>): Config {
  return {
    provider: 'local',
    modelId: 'mock',
    breakpoints: [1440, 768, 375],
    maxIters: 4,
    variations: 1,
    threshold: 80,
    renderRepairTries: 2,
    genTemperature: 0.7,
    criticTemperature: 0.2,
    maxRunTokens: 500_000,
    maxRunSeconds: 600,
    maxModelCalls: 30,
    genModelId: 'mock',
    criticModelId: 'mock',
    orchestratorModelId: 'mock',
    ollamaBaseUrl: 'http://localhost:11434',
    ollamaModel: 'llava',
    embeddingProvider: 'local-hash',
    embeddingModel: 'ade-local-hash-v1',
    productionMode: false,
    harness: 'vite',
    autonomyRung: 0,
    maxTokensPerSection: 200_000,
    maxSecondsPerSection: 300,
    maxUsdPerSection: 50,
    headed: false,
    harnessPort: 5199,
    ...partial,
  };
}

function record(
  runId: string,
  sectionId: string,
  input: number,
  output: number,
  durationMs: number,
): RunRecord {
  return {
    run_id: runId,
    section_id: sectionId,
    iteration: 0,
    candidate_id: 'iter0-cand1',
    input_bundle_ref: 'bundle',
    output_code_ref: 'Section.tsx',
    screenshots: {},
    scores: {
      brand_adherence: 80,
      system_adherence: null,
      brief_fit: 80,
      craft: 80,
      weighted_total: 80,
    },
    verdict: 'pass',
    critic_feedback: 'ok',
    duration_ms: durationMs,
    tokens: { input, output },
    model_id: 'mock',
    timestamp: new Date().toISOString(),
  };
}

function calibrationSummary(partial: {
  total: number;
  recommendedAccuracy: number;
  falsePassRate: number;
  recentAgreement: number;
}): CalibrationSummary {
  return {
    total: partial.total,
    currentThreshold: 80,
    recommendedThreshold: 80,
    agreement: partial.recommendedAccuracy,
    agreementGap: 1 - partial.recommendedAccuracy,
    currentAccuracy: partial.recommendedAccuracy,
    recommendedAccuracy: partial.recommendedAccuracy,
    falsePasses: Math.round(partial.falsePassRate * partial.total),
    falseFails: 0,
    falsePassRate: partial.falsePassRate,
    falseFailRate: 0,
    agreementTrend: [{
      batch: 1,
      total: partial.total,
      agreement: partial.recentAgreement,
      falsePasses: 0,
      falseFails: 0,
    }],
    rewardHackingAlarm: {
      triggered: false,
      suspectRuns: [],
      reasons: [],
    },
    autonomy: {
      currentRung: 0,
      recommendedRung: 1,
      reason: 'test',
    },
    weightHints: [],
    rubricExamples: [],
  };
}
