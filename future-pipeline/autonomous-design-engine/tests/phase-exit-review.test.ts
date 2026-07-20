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
import { reviewBrandFit, reviewAndReDeriveBrand } from '../src/brand.js';
import { reviewCrystallizedTokens } from '../src/crystallizer.js';
import { setProjectsDirForTest } from '../src/store.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'phase-exit-review-test');

afterEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

const brief: Brief = {
  client: 'ReviewCo', industry: 'Finance', audience: 'CFOs', goal: 'Build trust, generate leads',
  section: { name: 'hero', content: { headline: 'Clarity for Finance Teams' } },
};

const brandData: BrandData = {
  client_id: 'review-co',
  palette: [{ role: 'text', value: '#111827' }, { role: 'background', value: '#FFFFFF' }, { role: 'accent', value: '#2563EB' }],
  typography: [{ role: 'display', family: 'Inter', fallback: 'sans-serif' }, { role: 'ui', family: 'Inter', fallback: 'sans-serif' }],
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
    palette: brandData.palette.map(p => ({ ...p, usage: 'x' })),
    typography: brandData.typography,
    motion_voice: 'Quiet and functional.',
    personality,
    tone: 'Assured.',
  });
}

const foundation = (): BrandFoundation => ({
  client_id: 'review-co', version: 1, status: 'draft',
  identity: {
    palette: brandData.palette.map(p => ({ ...p, usage: 'x' })),
    typography: brandData.typography,
    motion_voice: 'Quiet and functional.',
    personality: ['clear', 'reliable'],
    tone: 'Assured.',
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
    const { tries, finalVerdict } = await reviewAndReDeriveBrand(
      'review-co', brandData, brief, criticProvider, genProvider, TEST_DIR,
    );
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
    const criticProvider = scriptedProvider([
      JSON.stringify({ verdict: 'fail', reasoning: 'Off-brief for a finance-trust audience.' }),
      JSON.stringify({ verdict: 'pass', reasoning: 'Much better fit now.' }),
    ]);
    const { foundation: result, tries, finalVerdict } = await reviewAndReDeriveBrand(
      'review-co', brandData, brief, criticProvider, genProvider, TEST_DIR,
    );
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
    const { tries, finalVerdict } = await reviewAndReDeriveBrand(
      'review-co', brandData, brief, criticProvider, genProvider, TEST_DIR,
    );
    expect(tries).toBe(2); // BRAND_REVIEW_MAX_TRIES, never unbounded
    expect(finalVerdict.verdict).toBe('fail'); // returned as-is, escalated to human
    expect(genCalls).toBe(2);
  });
});

describe('reviewCrystallizedTokens (C1.6)', () => {
  const brand = (): BrandFoundation => ({
    client_id: 'review-co', version: 2, status: 'frozen',
    identity: {
      palette: brandData.palette.map(p => ({ ...p, usage: 'x' })),
      typography: brandData.typography,
      motion_voice: 'Quiet.', personality: ['clear'], tone: 'Assured.',
    },
    provenance: { palette: 'provided', typography: 'provided', motion_voice: 'derived', personality: 'derived', tone: 'derived' },
    approved_by: 'test', approved_at: new Date().toISOString(),
  });

  const tokens = {
    color: { text: '#111827', background: '#FFFFFF', accent: '#2563EB' },
    type: { display: '32px/1.1 Inter' },
    space: { section: '64px' },
    radius: { card: '8px' },
    shadow: {},
    motion: { fast: '200ms' },
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
