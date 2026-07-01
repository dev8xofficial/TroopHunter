import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import type { CompletionRequest, CompletionResult, ModelProvider } from '../src/model.js';
import type { BrandData, Brief, BrandFoundation, ProjectDesignSystem } from '../src/schema.js';
import {
  approveBrand,
  checkPaletteAccessibility,
  deriveBrand,
  reDeriveBrand,
  saveBrandDraft,
} from '../src/brand.js';
import { crystallize, addComponent } from '../src/crystallizer.js';
import { tokenAllowlistGate } from '../src/guardrails.js';
import {
  listVersions,
  readBrand,
  readPDS,
  setProjectsDirForTest,
} from '../src/store.js';

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
    },
    components: [],
    foundation_from: 'hero',
    foundation_frozen_at: new Date().toISOString(),
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

    const rederived = await reDeriveBrand(
      'phase-one',
      brandData,
      brief,
      providerWithJson(brandIdentity('More direct and operational.')),
    );

    expect(rederived.version).toBe(3);
    expect(rederived.status).toBe('draft');
    expect(rederived.identity.tone).toBe('More direct and operational.');
    expect(rederived.provenance.tone).toBe('derived');
    expect(listVersions(join(TEST_DIR, 'phase-one', 'brand.json'))).toEqual([1, 2, 3]);
  });

  it('palette approval pre-check only requires accessible primary pairings', () => {
    expect(checkPaletteAccessibility([
      { role: 'text', value: '#111827' },
      { role: 'background', value: '#FFFFFF' },
      { role: 'accent', value: '#2563EB' },
      { role: 'muted', value: '#F9FAFB' },
    ])).toEqual([]);

    expect(checkPaletteAccessibility([
      { role: 'text', value: '#BBBBBB' },
      { role: 'background', value: '#FFFFFF' },
      { role: 'accent', value: '#DDDDDD' },
    ]).length).toBeGreaterThan(0);
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
    const ok = tokenAllowlistGate(
      'export default function Section(){return <section className="bg-[#FFFFFF] text-[32px] p-[24px] rounded-[8px] duration-[200ms]">Ok</section>}',
      pds(),
    );
    expect(ok.pass).toBe(true);

    const drift = tokenAllowlistGate(
      'export default function Section(){return <section className="bg-blue-500 text-[41px] p-[19px] rounded-[13px] duration-[333ms]">Drift</section>}',
      pds(),
    );
    expect(drift.pass).toBe(false);
    expect(drift.violations.map(v => v.rule)).toEqual(
      expect.arrayContaining(['color-tailwind-named', 'type', 'space', 'radius', 'motion']),
    );
  });
});
