import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import type { CompletionRequest, CompletionResult, ModelProvider } from '../src/model.js';
import type { BrandData, Brief, BrandFoundation, ProjectDesignSystem } from '../src/schema.js';
import { approveBrand, checkBrandStaleness, checkPaletteAccessibility, checkSemanticColorAccessibility, deriveBrand, reDeriveBrand, saveBrandDraft } from '../src/brand.js';
import { crystallize, addComponent, extendToken, extensionFrequency } from '../src/crystallizer.js';
import { tokenAllowlistGate } from '../src/guardrails.js';
import { listEscalations } from '../src/escalations.js';
import type { Artifact } from '../src/schema.js';
import { integrityScan, listVersions, readBrand, readPDS, setProjectsDirForTest, writeArtifact, writeBrand, writePDS } from '../src/store.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'phase1-test');

const brief: Brief = {
  client: 'Phase One Co',
  industry: 'Technology',
  audience: 'Operations leaders',
  goal: 'Explain the platform and drive demos',
  section: {
    name: 'hero',
    content: {
      headline: 'Operate With Clarity',
      subheadline: 'A calmer command center for field teams.',
      cta: { text: 'Book a demo', href: '/demo' },
    },
  },
};

const brandData: BrandData = {
  client_id: 'phase-one',
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

function providerWithJson(json: unknown): ModelProvider {
  return {
    id: 'mock:phase1',
    async complete(_req: CompletionRequest): Promise<CompletionResult> {
      return {
        text: JSON.stringify(json),
        usage: { input: 10, output: 20 },
      };
    },
  };
}

function brandIdentity(tone = 'Clear, assured, and practical.') {
  return {
    palette: [
      { role: 'text', value: '#111827', usage: 'Primary copy' },
      { role: 'background', value: '#FFFFFF', usage: 'Page surface' },
      { role: 'accent', value: '#2563EB', usage: 'Primary actions' },
    ],
    typography: brandData.typography,
    motion_voice: 'Quiet, fast, and functional.',
    personality: ['clear', 'reliable', 'modern'],
    tone,
    semanticColors: [],
    darkMode: { enabled: false },
  };
}

function frozenBrand(): BrandFoundation {
  return {
    client_id: 'phase-one',
    version: 2,
    status: 'frozen',
    identity: brandIdentity(),
    provenance: {
      palette: 'provided',
      typography: 'provided',
      motion_voice: 'derived',
      personality: 'derived',
      tone: 'derived',
      derived_from: 'brand-data v1 + brief',
    },
    approved_by: 'test',
    approved_at: new Date().toISOString(),
  };
}

function pds(): ProjectDesignSystem {
  return {
    client_id: 'phase-one',
    version: 1,
    surface: 'website',
    status: 'foundation-frozen',
    inherits: 'phase-one',
    tokens: {
      color: {
        text: '#111827',
        background: '#FFFFFF',
        accent: '#2563EB',
      },
      type: {
        display: '32px/1.1 Inter',
        body: '16px/1.5 Inter',
      },
      space: {
        section: '64px',
        card: '24px',
      },
      radius: {
        card: '8px',
      },
      shadow: {
        card: '0 12px 30px rgba(17, 24, 39, 0.12)',
      },
      motion: {
        fast: '200ms',
      },
      fluidType: {},
      fluidSpace: {},
      exportFormat: 'dtcg',
    },
    components: [],
    foundation_from: 'hero',
    foundation_frozen_at: new Date().toISOString(),
    extensionLog: [],
  };
}

describe('Phase 1 brand and consistency', () => {
  beforeEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
    setProjectsDirForTest(TEST_DIR);
  });

  afterEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it('derives a draft, approval freezes it, and hard-store versions are append-only', async () => {
    const draft = await deriveBrand(brandData, brief, providerWithJson(brandIdentity()));
    saveBrandDraft('phase-one', draft);

    const frozen = approveBrand('phase-one', 'Ada');
    const stored = readBrand('phase-one');

    expect(frozen.status).toBe('frozen');
    expect(frozen.version).toBe(2);
    expect(stored?.approved_by).toBe('Ada');
    expect(listVersions(join(TEST_DIR, 'phase-one', 'brand.json'))).toEqual([1, 2]);
  });

  it('re-derivation bumps version and recomputes derived fields as a draft', async () => {
    const draft = await deriveBrand(brandData, brief, providerWithJson(brandIdentity()));
    saveBrandDraft('phase-one', draft);
    approveBrand('phase-one', 'Ada');

    const rederived = await reDeriveBrand('phase-one', brandData, brief, providerWithJson(brandIdentity('More direct and operational.')));

    expect(rederived.version).toBe(3);
    expect(rederived.status).toBe('draft');
    expect(rederived.identity.tone).toBe('More direct and operational.');
    expect(rederived.provenance.tone).toBe('derived');
    expect(listVersions(join(TEST_DIR, 'phase-one', 'brand.json'))).toEqual([1, 2, 3]);
  });

  it('palette approval pre-check only requires accessible primary pairings', () => {
    expect(
      checkPaletteAccessibility([
        { role: 'text', value: '#111827' },
        { role: 'background', value: '#FFFFFF' },
        { role: 'accent', value: '#2563EB' },
        { role: 'muted', value: '#F9FAFB' },
      ]),
    ).toEqual([]);

    expect(
      checkPaletteAccessibility([
        { role: 'text', value: '#BBBBBB' },
        { role: 'background', value: '#FFFFFF' },
        { role: 'accent', value: '#DDDDDD' },
      ]).length,
    ).toBeGreaterThan(0);
  });

  it('C1.1: semantic/state colors verbatim from BrandData survive derivation unchanged (never AI-invented)', async () => {
    const dataWithSemantics: BrandData = {
      ...brandData,
      semanticColors: [
        { role: 'error', value: '#DC2626' },
        { role: 'success', value: '#16A34A' },
        { role: 'warning', value: '#D97706' },
      ],
    };
    const draft = await deriveBrand(dataWithSemantics, brief, providerWithJson(brandIdentity()));

    expect(draft.identity.semanticColors).toEqual(dataWithSemantics.semanticColors);
  });

  it('C1.1: an omitted semanticColors/darkMode on BrandData derives to safe, schema-complete defaults', async () => {
    const draft = await deriveBrand(brandData, brief, providerWithJson(brandIdentity()));

    expect(draft.identity.semanticColors).toEqual([]);
    expect(draft.identity.darkMode).toEqual({ enabled: false });
  });

  it('C1.1: an inaccessible semantic color (pale-on-white) fails the approval-time contrast check, same bar as the primary palette', () => {
    expect(
      checkSemanticColorAccessibility(
        [{ role: 'error', value: '#FFDDDD' }], // pale red — reads as the classic "pale-on-white" failure
        [{ role: 'background', value: '#FFFFFF' }],
      ).length,
    ).toBeGreaterThan(0);

    expect(
      checkSemanticColorAccessibility(
        [{ role: 'error', value: '#DC2626' }], // strong red — clears 3:1
        [{ role: 'background', value: '#FFFFFF' }],
      ),
    ).toEqual([]);
  });

  it('C1.1: approveBrand rejects a frozen-candidate whose semantic colors fail contrast, alongside the primary palette', async () => {
    const draft = await deriveBrand({ ...brandData, semanticColors: [{ role: 'error', value: '#FFEEEE' }] }, brief, providerWithJson(brandIdentity()));
    saveBrandDraft('phase-one', draft);

    expect(() => approveBrand('phase-one', 'Ada')).toThrow(/accessibility check/);
  });

  it('C1.1: DesignTokens schema carries fluid scales and an export format, present even when unused', () => {
    const tokens = pds().tokens;
    expect(tokens.exportFormat).toBe('dtcg');
    expect(tokens.fluidType).toEqual({});
    expect(tokens.fluidSpace).toEqual({});
  });

  it('crystallizes a PDS and component additions bump append-only versions', async () => {
    const crystal = await crystallize(
      'export default function Section(){return <section className="text-[#111827]">Operate With Clarity</section>}',
      'hero',
      frozenBrand(),
      'phase-one',
      'website',
      providerWithJson({
        tokens: pds().tokens,
        components: [
          {
            name: 'button',
            anatomy: 'Inline action with label',
            variants: ['primary'],
            states: ['default', 'hover', 'focus'],
          },
        ],
      }),
    );

    expect(crystal.status).toBe('foundation-frozen');
    expect(crystal.components[0].locked_in).toBe('hero');

    const updated = addComponent('phase-one', 'website', 'pricing', {
      name: 'pricing-card',
      anatomy: 'Plan container with price and feature list',
      variants: ['featured', 'standard'],
      states: ['default', 'hover'],
    });

    expect(updated.version).toBe(2);
    expect(readPDS('phase-one', 'website')?.components).toHaveLength(2);
    expect(listVersions(join(TEST_DIR, 'phase-one', 'website', 'pds.json'))).toEqual([1, 2]);
  });

  it('token allowlist blocks off-system color, spacing, radius, type, and motion drift', () => {
    const ok = tokenAllowlistGate('export default function Section(){return <section className="bg-[#FFFFFF] text-[32px] p-[24px] rounded-[8px] duration-[200ms]">Ok</section>}', pds());
    expect(ok.pass).toBe(true);

    const drift = tokenAllowlistGate('export default function Section(){return <section className="bg-blue-500 text-[41px] p-[19px] rounded-[13px] duration-[333ms]">Drift</section>}', pds());
    expect(drift.pass).toBe(false);
    expect(drift.violations.map((v) => v.rule)).toEqual(expect.arrayContaining(['color-tailwind-named', 'type', 'space', 'radius', 'motion']));
  });

  it('C1.8: blocks a near-duplicate component (same anatomy + majority-shared variants) even with a different name', () => {
    writePDS('phase-one', 'website', pds());
    addComponent('phase-one', 'website', 'pricing', {
      name: 'pricing-card',
      anatomy: 'Container with image, title, body, and cta',
      variants: ['featured', 'standard'],
      states: ['default', 'hover'],
    });

    expect(() =>
      addComponent('phase-one', 'website', 'testimonials', {
        name: 'testimonial-card',
        anatomy: 'Container with image, title, body, and cta',
        variants: ['featured', 'compact'],
        states: ['default'],
      }),
    ).toThrow(/near-duplicate/);

    // Rejected — never appended to the PDS.
    expect(readPDS('phase-one', 'website')?.components).toHaveLength(1);
  });

  it('C1.8: allows a genuinely distinct component (different anatomy) to be added alongside an existing one', () => {
    writePDS('phase-one', 'website', pds());
    addComponent('phase-one', 'website', 'pricing', {
      name: 'pricing-card',
      anatomy: 'Container with image, title, body, and cta',
      variants: ['featured', 'standard'],
      states: ['default', 'hover'],
    });

    const updated = addComponent('phase-one', 'website', 'faq', {
      name: 'accordion-item',
      anatomy: 'Disclosure row with question header and collapsible answer',
      variants: ['open', 'closed'],
      states: ['default', 'hover', 'focus'],
    });

    expect(updated.components).toHaveLength(2);
  });

  it('C1.7: extends the PDS additively under an "ext-" namespaced key without touching frozen tokens', () => {
    writePDS('phase-one', 'website', pds());

    const updated = extendToken('phase-one', 'website', TEST_DIR, 'run-1', {
      category: 'color',
      key: 'warning',
      value: '#F59E0B',
      reason: 'Later section needs a warning state not covered by the hero foundation.',
      addedBySection: 'pricing',
    });

    expect(updated.tokens.color['ext-warning']).toBe('#F59E0B');
    // Frozen foundation values are untouched.
    expect(updated.tokens.color.text).toBe('#111827');
    expect(updated.tokens.color.background).toBe('#FFFFFF');
    expect(extensionFrequency(updated)).toBe(1);
    expect(updated.extensionLog[0]).toMatchObject({ category: 'color', key: 'warning', addedBySection: 'pricing' });
  });

  it('C1.7: refuses and escalates an extension that would touch an existing frozen key instead of silently mutating it', () => {
    writePDS('phase-one', 'website', pds());

    expect(() =>
      extendToken('phase-one', 'website', TEST_DIR, 'run-2', {
        category: 'color',
        key: 'text', // already exists in the frozen foundation
        value: '#000000',
        reason: 'Attempting to redefine the primary text color.',
        addedBySection: 'pricing',
      }),
    ).toThrow(/would touch a frozen foundation value/);

    // Never applied.
    expect(readPDS('phase-one', 'website')?.tokens.color.text).toBe('#111827');
    expect(readPDS('phase-one', 'website')?.extensionLog).toHaveLength(0);

    // Escalated to a human instead of happening silently.
    const escalations = listEscalations(TEST_DIR);
    expect(escalations).toHaveLength(1);
    expect(escalations[0].type).toBe('other');
    expect(escalations[0].question).toMatch(/frozen foundation/);
  });

  it('C1.7: warns on high extension frequency as a signal the crystallized foundation was the wrong anchor', () => {
    writePDS('phase-one', 'website', pds());
    const categories: Array<'color' | 'type' | 'space' | 'radius' | 'shadow' | 'motion'> = ['color', 'type', 'space', 'radius', 'shadow'];

    let latest = pds();
    for (let i = 0; i < 5; i++) {
      latest = extendToken('phase-one', 'website', TEST_DIR, `run-freq-${i}`, {
        category: categories[i],
        key: `extra-${i}`,
        value: `value-${i}`,
        reason: 'Accumulating extensions to test the frequency warning.',
        addedBySection: 'pricing',
      });
    }

    expect(extensionFrequency(latest)).toBe(5);
  });

  it('C1.12: a freshly-approved brand is not flagged stale', () => {
    const result = checkBrandStaleness(frozenBrand());
    expect(result.stale).toBe(false);
    expect(result.ageDays).toBe(0);
  });

  it('C1.12: a brand approved over a year ago is flagged for a human spot-check (never auto-re-derived)', () => {
    const old = frozenBrand();
    old.approved_at = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString();

    const result = checkBrandStaleness(old);
    expect(result.stale).toBe(true);
    expect(result.ageDays).toBeGreaterThanOrEqual(365);
    expect(result.message).toMatch(/human "still feels current/);
  });

  it('C1.12: a brand with no approval timestamp (not yet frozen) is never flagged stale', () => {
    const draft = frozenBrand();
    draft.approved_at = undefined;

    const result = checkBrandStaleness(draft);
    expect(result.stale).toBe(false);
    expect(result.ageDays).toBeNull();
  });

  it('C1.0: integrity scan finds nothing wrong for a consistent brand -> PDS -> artifact chain', () => {
    writeBrand('phase-one', frozenBrand(), null);
    writePDS('phase-one', 'website', pds());

    const artifact: Artifact = {
      artifact_id: 'phase-one-website',
      client_id: 'phase-one',
      surface: 'website',
      status: 'in-progress',
      sections: [
        {
          section_id: 'phase-one_hero',
          name: 'hero',
          code: { component: 'export default function Section(){return <section>ok</section>}' },
          screenshots: {},
          final_score: { brand_adherence: 90, system_adherence: 90, brief_fit: 90, craft: 90, weighted_total: 90 },
          status: 'approved',
        },
      ],
    };
    writeArtifact('phase-one', 'website', artifact);

    expect(integrityScan()).toEqual([]);
  });

  it('C1.0: integrity scan catches a PDS whose brand.json no longer exists (dangling reference)', () => {
    writePDS('orphan-client', 'website', { ...pds(), client_id: 'orphan-client', inherits: 'orphan-client' });
    // No writeBrand('orphan-client', ...) at all — the brand is missing.

    const issues = integrityScan();
    expect(issues.some((i) => i.rule === 'pds-without-brand' && i.clientId === 'orphan-client')).toBe(true);
  });

  it('C1.0: integrity scan catches a PDS that inherits a different client than the brand actually on disk', () => {
    writeBrand('phase-one', frozenBrand(), null);
    writePDS('phase-one', 'website', { ...pds(), inherits: 'some-other-client' });

    const issues = integrityScan();
    expect(issues.some((i) => i.rule === 'pds-inherits-mismatch' && i.clientId === 'phase-one')).toBe(true);
  });

  it('C1.0: integrity scan catches an artifact with sections but no crystallized PDS for its client/surface', () => {
    writeBrand('phase-one', frozenBrand(), null);
    // No writePDS at all.
    const artifact: Artifact = {
      artifact_id: 'phase-one-website',
      client_id: 'phase-one',
      surface: 'website',
      status: 'in-progress',
      sections: [
        {
          section_id: 'phase-one_hero',
          name: 'hero',
          code: { component: 'export default function Section(){return <section>ok</section>}' },
          screenshots: {},
          final_score: { brand_adherence: 90, system_adherence: 90, brief_fit: 90, craft: 90, weighted_total: 90 },
          status: 'approved',
        },
      ],
    };
    writeArtifact('phase-one', 'website', artifact);

    const issues = integrityScan();
    expect(issues.some((i) => i.rule === 'artifact-without-pds' && i.clientId === 'phase-one')).toBe(true);
  });

  it('C1.0: integrity scan returns empty for an empty/nonexistent projects directory', () => {
    // beforeEach already wiped TEST_DIR and nothing has been written yet in this test.
    expect(integrityScan()).toEqual([]);
  });
});
