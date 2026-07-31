/**
 * ADE Tests — Phase-Exit Review at the Brand and PDS boundaries (C1.3/C1.6)
 *
 * Both boundaries previously had NO fresh-context Critic review before a
 * human ever saw a derived brand or a crystallized token set — the plan's
 * explicit requirement. These tests prove the review functions themselves
 * work (pass/fail parsing, fail-closed on garbage output) and that the
 * bounded re-derivation loop actually re-derives (not hand-patches) and
 * stops at the configured max tries.
 */

import { describe, it, expect, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import type { CompletionRequest, CompletionResult, ModelProvider } from '../src/model.js';
import type { BrandData, Brief, BrandFoundation } from '../src/schema.js';
import { reviewBrandFit, reviewAndReDeriveBrand, deriveBrandDirections, reviewAndSelectBrandDirection } from '../src/brand.js';
import { reviewCrystallizedTokens } from '../src/crystallizer.js';
import { setProjectsDirForTest } from '../src/store.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'phase-exit-review-test');

afterEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

const brief: Brief = {
  client: 'ReviewCo',
  industry: 'Finance',
  audience: 'CFOs',
  goal: 'Build trust, generate leads',
  section: { name: 'hero', content: { headline: 'Clarity for Finance Teams' } },
};

const brandData: BrandData = {
  client_id: 'review-co',
  palette: [
    { role: 'text', value: '#111827' },
    { role: 'background', value: '#FFFFFF' },
    { role: 'accent', value: '#2563EB' },
  ],
  typography: [
    { role: 'display', family: 'Inter', fallback: 'sans-serif' },
    { role: 'ui', family: 'Inter', fallback: 'sans-serif' },
  ],
  darkMode: { enabled: false },
};

function scriptedProvider(responses: string[]): ModelProvider {
  let i = 0;
  return {
    id: 'mock:review',
    async complete(_req: CompletionRequest): Promise<CompletionResult> {
      const text = responses[Math.min(i, responses.length - 1)];
      i++;
      return { text, usage: { input: 10, output: 20 } };
    },
  };
}

function brandIdentityJson(personality = ['clear', 'reliable', 'modern']) {
  return JSON.stringify({
    palette: brandData.palette.map((p) => ({ ...p, usage: 'x' })),
    typography: brandData.typography,
    motion_voice: 'Quiet and functional.',
    personality,
    tone: 'Assured.',
  });
}

function brandDirectionsJson(
  labels: { label: string; personality: string[]; rationale: string }[] = [
    { label: 'Confident Minimalist', personality: ['clear', 'assured', 'modern'], rationale: 'CFOs trust restraint over flash.' },
    { label: 'Warm Advisor', personality: ['warm', 'approachable', 'steady'], rationale: 'Finance decisions are high-stakes; warmth builds trust differently than authority.' },
  ],
) {
  return JSON.stringify({
    directions: labels.map(({ label, personality, rationale }) => ({
      label,
      rationale,
      identity: {
        palette: brandData.palette.map((p) => ({ ...p, usage: 'x' })),
        typography: brandData.typography,
        motion_voice: 'Quiet and functional.',
        personality,
        tone: 'Assured.',
      },
    })),
  });
}

const foundation = (): BrandFoundation => ({
  client_id: 'review-co',
  version: 1,
  status: 'draft',
  identity: {
    palette: brandData.palette.map((p) => ({ ...p, usage: 'x' })),
    typography: brandData.typography,
    motion_voice: 'Quiet and functional.',
    personality: ['clear', 'reliable'],
    tone: 'Assured.',
    semanticColors: [],
    darkMode: { enabled: false },
  },
  provenance: { palette: 'provided', typography: 'provided', motion_voice: 'derived', personality: 'derived', tone: 'derived' },
});

describe('reviewBrandFit (C1.3)', () => {
  it('parses a pass verdict from valid JSON', async () => {
    const provider = scriptedProvider([JSON.stringify({ verdict: 'pass', reasoning: 'Fits the finance-trust brief well.' })]);
    const result = await reviewBrandFit(foundation(), brief, provider);
    expect(result.verdict).toBe('pass');
  });

  it('parses a fail verdict with reasoning', async () => {
    const provider = scriptedProvider([JSON.stringify({ verdict: 'fail', reasoning: 'Personality reads generic-tech, not finance-trust.' })]);
    const result = await reviewBrandFit(foundation(), brief, provider);
    expect(result.verdict).toBe('fail');
    expect(result.reasoning).toContain('generic-tech');
  });

  it('fail-closed on unparseable output — never silently passes', async () => {
    const provider = scriptedProvider(['not json at all']);
    const result = await reviewBrandFit(foundation(), brief, provider);
    expect(result.verdict).toBe('fail');
  });

  it('strips markdown fences before parsing', async () => {
    const provider = scriptedProvider(['```json\n' + JSON.stringify({ verdict: 'pass', reasoning: 'ok' }) + '\n```']);
    const result = await reviewBrandFit(foundation(), brief, provider);
    expect(result.verdict).toBe('pass');
  });
});

describe('reviewAndReDeriveBrand (C1.3 — bounded retry loop)', () => {
  it('passes on the first attempt when the review immediately approves', async () => {
    const genProvider = scriptedProvider([brandIdentityJson()]);
    const criticProvider = scriptedProvider([JSON.stringify({ verdict: 'pass', reasoning: 'Good fit.' })]);
    const { tries, finalVerdict } = await reviewAndReDeriveBrand('review-co', brandData, brief, criticProvider, genProvider, TEST_DIR);
    expect(tries).toBe(1);
    expect(finalVerdict.verdict).toBe('pass');
  });

  it('re-derives (not hand-patches) on a failed review, then passes on retry', async () => {
    let genCalls = 0;
    const genProvider: ModelProvider = {
      id: 'mock:gen',
      async complete(_req) {
        genCalls++;
        // Second derivation produces a DIFFERENT personality — proof this is
        // a genuine re-derive (fresh model call), not a patch of the same object.
        return { text: brandIdentityJson(genCalls === 1 ? ['generic', 'techy'] : ['assured', 'trustworthy']), usage: { input: 10, output: 20 } };
      },
    };
    const criticProvider = scriptedProvider([JSON.stringify({ verdict: 'fail', reasoning: 'Off-brief for a finance-trust audience.' }), JSON.stringify({ verdict: 'pass', reasoning: 'Much better fit now.' })]);
    const { foundation: result, tries, finalVerdict } = await reviewAndReDeriveBrand('review-co', brandData, brief, criticProvider, genProvider, TEST_DIR);
    expect(genCalls).toBe(2); // genuinely re-derived, not patched
    expect(tries).toBe(2);
    expect(finalVerdict.verdict).toBe('pass');
    expect(result.identity.personality).toEqual(['assured', 'trustworthy']);
  });

  it('is bounded — stops at BRAND_REVIEW_MAX_TRIES even if every review fails', async () => {
    let genCalls = 0;
    const genProvider: ModelProvider = {
      id: 'mock:gen-always-fail',
      async complete(_req) {
        genCalls++;
        return { text: brandIdentityJson(), usage: { input: 10, output: 20 } };
      },
    };
    const criticProvider: ModelProvider = {
      id: 'mock:always-fail',
      async complete(_req) {
        return { text: JSON.stringify({ verdict: 'fail', reasoning: 'Still off-brief.' }), usage: { input: 10, output: 20 } };
      },
    };
    const { tries, finalVerdict } = await reviewAndReDeriveBrand('review-co', brandData, brief, criticProvider, genProvider, TEST_DIR);
    expect(tries).toBe(2); // BRAND_REVIEW_MAX_TRIES, never unbounded
    expect(finalVerdict.verdict).toBe('fail'); // returned as-is, escalated to human
    expect(genCalls).toBe(2);
  });
});

describe('deriveBrandDirections (C1.2)', () => {
  it('derives 2-3 distinct directions, each with its own label, rationale, and identity', async () => {
    const provider = scriptedProvider([brandDirectionsJson()]);
    const directions = await deriveBrandDirections(brandData, brief, provider);

    expect(directions.length).toBeGreaterThanOrEqual(2);
    expect(directions.length).toBeLessThanOrEqual(3);
    expect(new Set(directions.map((d) => d.label)).size).toBe(directions.length); // genuinely distinct labels
    for (const d of directions) {
      expect(d.rationale.length).toBeGreaterThan(0);
      expect(d.identity.personality.length).toBeGreaterThan(0);
    }
  });

  it('carries palette/typography verbatim from BrandData into EVERY direction, never AI-touched', async () => {
    const provider = scriptedProvider([brandDirectionsJson()]);
    const directions = await deriveBrandDirections(brandData, brief, provider);

    for (const d of directions) {
      expect(d.identity.palette.map((p) => ({ role: p.role, value: p.value }))).toEqual(brandData.palette);
      expect(d.identity.typography).toEqual(brandData.typography);
    }
  });

  it('rejects a response with only 1 direction (schema requires 2-3)', async () => {
    const provider = scriptedProvider([brandDirectionsJson([{ label: 'Only One', personality: ['clear'], rationale: 'Just one.' }])]);
    await expect(deriveBrandDirections(brandData, brief, provider)).rejects.toThrow(/schema validation failed/);
  });
});

describe('reviewAndSelectBrandDirection (C1.2 + C1.3 combined)', () => {
  it('reviews every direction independently and selects the best-passing one', async () => {
    const genProvider = scriptedProvider([brandDirectionsJson()]);
    // First direction reviewed fails, second passes — selection must pick the PASSING one, not the first.
    const criticProvider = scriptedProvider([JSON.stringify({ verdict: 'fail', reasoning: 'Too flashy for CFOs.' }), JSON.stringify({ verdict: 'pass', reasoning: 'Warmth still reads credible for finance.' })]);

    const result = await reviewAndSelectBrandDirection('review-co', brandData, brief, criticProvider, genProvider, TEST_DIR);

    expect(result.allDirections).toHaveLength(2);
    expect(result.direction.label).toBe('Warm Advisor');
    expect(result.finalVerdict.verdict).toBe('pass');
    expect(result.foundation.identity.personality).toEqual(['warm', 'approachable', 'steady']);
    expect(result.foundation.provenance.derived_from).toContain('Warm Advisor');
  });

  it('re-derives the FULL SET of directions (never hand-patches one) when all directions fail, then selects on retry', async () => {
    let genCalls = 0;
    const genProvider: ModelProvider = {
      id: 'mock:gen-directions',
      async complete(_req) {
        genCalls++;
        // Second round produces DIFFERENT directions — proof of genuine
        // re-derivation, not patching the failed set.
        return {
          text:
            genCalls === 1
              ? brandDirectionsJson([
                  { label: 'Round1 A', personality: ['generic'], rationale: 'r1a' },
                  { label: 'Round1 B', personality: ['techy'], rationale: 'r1b' },
                ])
              : brandDirectionsJson([
                  { label: 'Round2 A', personality: ['assured', 'trustworthy'], rationale: 'r2a' },
                  { label: 'Round2 B', personality: ['bold'], rationale: 'r2b' },
                ]),
          usage: { input: 10, output: 20 },
        };
      },
    };
    const criticProvider = scriptedProvider([
      JSON.stringify({ verdict: 'fail', reasoning: 'Generic.' }), // round 1, direction A
      JSON.stringify({ verdict: 'fail', reasoning: 'Off-tone.' }), // round 1, direction B
      JSON.stringify({ verdict: 'pass', reasoning: 'Fits well.' }), // round 2, direction A
      JSON.stringify({ verdict: 'fail', reasoning: 'Too bold.' }), // round 2, direction B
    ]);

    const result = await reviewAndSelectBrandDirection('review-co', brandData, brief, criticProvider, genProvider, TEST_DIR);

    expect(genCalls).toBe(2); // genuinely re-derived the full set, not patched
    expect(result.tries).toBe(2);
    expect(result.direction.label).toBe('Round2 A');
    expect(result.finalVerdict.verdict).toBe('pass');
  });

  it('is bounded — after BRAND_REVIEW_MAX_TRIES rounds with every direction failing, escalates the best-reasoned one as-is', async () => {
    let genCalls = 0;
    const genProvider: ModelProvider = {
      id: 'mock:gen-always-fail',
      async complete(_req) {
        genCalls++;
        return { text: brandDirectionsJson(), usage: { input: 10, output: 20 } };
      },
    };
    const criticProvider: ModelProvider = {
      id: 'mock:always-fail',
      async complete(_req) {
        return { text: JSON.stringify({ verdict: 'fail', reasoning: 'Still off-brief.' }), usage: { input: 10, output: 20 } };
      },
    };

    const result = await reviewAndSelectBrandDirection('review-co', brandData, brief, criticProvider, genProvider, TEST_DIR);

    expect(result.tries).toBe(2); // BRAND_REVIEW_MAX_TRIES, never unbounded
    expect(result.finalVerdict.verdict).toBe('fail'); // escalated to human, not silently passed
    expect(genCalls).toBe(2); // 2 rounds of the FULL SET, not per-direction unbounded retries
  });
});

describe('reviewCrystallizedTokens (C1.6)', () => {
  const brand = (): BrandFoundation => ({
    client_id: 'review-co',
    version: 2,
    status: 'frozen',
    identity: {
      palette: brandData.palette.map((p) => ({ ...p, usage: 'x' })),
      typography: brandData.typography,
      motion_voice: 'Quiet.',
      personality: ['clear'],
      tone: 'Assured.',
      semanticColors: [],
      darkMode: { enabled: false },
    },
    provenance: { palette: 'provided', typography: 'provided', motion_voice: 'derived', personality: 'derived', tone: 'derived' },
    approved_by: 'test',
    approved_at: new Date().toISOString(),
  });

  const tokens = {
    color: { text: '#111827', background: '#FFFFFF', accent: '#2563EB' },
    type: { display: '32px/1.1 Inter' },
    space: { section: '64px' },
    radius: { card: '8px' },
    shadow: {},
    motion: { fast: '200ms' },
    fluidType: {},
    fluidSpace: {},
    exportFormat: 'dtcg' as const,
  };

  it('parses a pass verdict', async () => {
    const provider = scriptedProvider([JSON.stringify({ verdict: 'pass', reasoning: 'Complete, not over-fitted.' })]);
    const result = await reviewCrystallizedTokens(tokens, brand(), 'hero', provider);
    expect(result.verdict).toBe('pass');
  });

  it('parses a fail verdict flagging over/under-specification', async () => {
    const provider = scriptedProvider([JSON.stringify({ verdict: 'fail', reasoning: 'Missing a semantic error/success color category.' })]);
    const result = await reviewCrystallizedTokens(tokens, brand(), 'hero', provider);
    expect(result.verdict).toBe('fail');
    expect(result.reasoning).toContain('error/success');
  });

  it('fail-closed on unparseable output', async () => {
    const provider = scriptedProvider(['garbage response']);
    const result = await reviewCrystallizedTokens(tokens, brand(), 'hero', provider);
    expect(result.verdict).toBe('fail');
  });
});
