import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import type { Config } from '../src/config.js';
import type { Artifact, Brief, BrandFoundation, LibraryEntry, ProjectDesignSystem } from '../src/schema.js';
import { createLocalHashEmbeddingProvider } from '../src/embeddings.js';
import {
  embedLibraryEntry,
  readLibrary,
  retrieveLibraryForBrief,
  searchLibrary,
  setLibraryDirForTest,
  writeLibrary,
} from '../src/library.js';
import { deidentificationGate, writeBackArtifact } from '../src/writeback.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'phase2-test');

const cfg: Config = {
  provider: 'local',
  modelId: 'mock',
  breakpoints: [1440, 768, 375],
  maxIters: 1,
  variations: 1,
  threshold: 80,
  renderRepairTries: 1,
  genTemperature: 0.7,
  criticTemperature: 0.2,
  maxRunTokens: 100_000,
  maxRunSeconds: 60,
  maxModelCalls: 10,
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
};

const brief: Brief = {
  client: 'Acme Advisors',
  industry: 'Premium B2B advisory',
  audience: 'Risk-averse executive buyers',
  goal: 'Generate qualified consultation leads through trust',
  section: {
    name: 'hero',
    content: {
      headline: 'Confidence Before the First Call',
      subheadline: 'A steady advisory partner for complex decisions.',
      cta: { text: 'Schedule a consultation', href: '/consult' },
    },
  },
};

function artifact(status: 'draft' | 'approved' = 'approved'): Artifact {
  return {
    artifact_id: 'artifact-acme-website',
    client_id: 'acme-advisors',
    surface: 'website',
    status: 'approved',
    sections: [
      {
        section_id: 'acme_hero',
        name: 'hero',
        code: { component: 'export default function Section(){return <section>Approved</section>}' },
        screenshots: {},
        final_score: {
          brand_adherence: 90,
          system_adherence: 88,
          brief_fit: 91,
          craft: 89,
          weighted_total: 90,
        },
        status,
      },
    ],
  };
}

function brand(): BrandFoundation {
  return {
    client_id: 'acme-advisors',
    version: 2,
    status: 'frozen',
    identity: {
      palette: [
        { role: 'text', value: '#111827' },
        { role: 'background', value: '#FFFFFF' },
      ],
      typography: [
        { role: 'display', family: 'Inter', fallback: 'sans-serif' },
        { role: 'ui', family: 'Inter', fallback: 'sans-serif' },
      ],
      motion_voice: 'Restrained',
      personality: ['trustworthy'],
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

function pds(): ProjectDesignSystem {
  return {
    client_id: 'acme-advisors',
    version: 1,
    surface: 'website',
    status: 'foundation-frozen',
    inherits: 'acme-advisors',
    tokens: {
      color: { text: '#111827', background: '#FFFFFF' },
      type: {},
      space: {},
      radius: {},
      shadow: {},
      motion: {},
    },
    components: [],
    foundation_from: 'hero',
  };
}

async function makeEntry(partial: Partial<Omit<LibraryEntry, 'embedding'>>): Promise<LibraryEntry> {
  const now = new Date().toISOString();
  return embedLibraryEntry({
    id: partial.id ?? 'pat_trust_editorial_hero',
    type: partial.type ?? 'pattern',
    title: partial.title ?? 'Trust editorial hero',
    intent: partial.intent ?? 'Build trust before a lead-generation ask for premium advisory buyers.',
    context_fit: partial.context_fit ?? {
      domain: 'premium b2b advisory',
      audience: 'risk-averse executive buyers',
      personality: ['trustworthy', 'restrained'],
      goal: 'generate qualified consultation leads through trust',
      feel: ['editorial', 'spacious'],
    },
    construction: partial.construction ?? ['Lead with credibility and a single clear action.'],
    rationale: partial.rationale ?? ['Trust is the conversion lever.'],
    pairs_with: partial.pairs_with ?? [],
    avoid: partial.avoid ?? ['Avoid urgent sales language.'],
    provenance: partial.provenance ?? ['proj_seed'],
    outcome: partial.outcome ?? {
      human_verdict: 'approved, strong',
      confidence: 0.8,
      times_used: 3,
    },
    tags: partial.tags ?? ['hero', 'trust', 'b2b'],
    created_at: partial.created_at ?? now,
    updated_at: partial.updated_at ?? now,
    recipe_values: partial.recipe_values,
  }, createLocalHashEmbeddingProvider());
}

describe('Phase 2 Library memory', () => {
  beforeEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
    setLibraryDirForTest(TEST_DIR);
  });

  afterEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it('retrieves relevant entries with confidence-aware ranking and caps at five', async () => {
    const provider = createLocalHashEmbeddingProvider();
    const relevant = await makeEntry({});
    const irrelevant = await makeEntry({
      id: 'pat_playful_consumer_sale',
      title: 'Playful consumer sale hero',
      intent: 'Create urgency for a flash sale in a playful consumer retail context.',
      context_fit: {
        domain: 'consumer retail',
        audience: 'bargain shoppers',
        personality: ['playful'],
        goal: 'drive immediate sale',
        feel: ['bright', 'urgent'],
      },
      outcome: { human_verdict: 'approved', confidence: 0.2, times_used: 1 },
    });
    writeLibrary([irrelevant, relevant]);

    const hits = await searchLibrary('premium b2b advisory trust consultation leads executive buyers', provider, 5);
    expect(hits[0].entry.id).toBe(relevant.id);
    expect(hits.length).toBeLessThanOrEqual(5);
  });

  it('de-identification gate blocks client names, copy, and exact tokens', async () => {
    const leaking = await makeEntry({
      title: 'Acme Advisors exact hero',
      intent: 'Reuse Confidence Before the First Call with #111827.',
    });

    const result = deidentificationGate(leaking, {
      artifact: artifact(),
      briefs: [brief],
      brand: brand(),
      pds: pds(),
    });

    expect(result.pass).toBe(false);
    expect(result.violations.map(v => v.rule)).toContain('identity-leak');
  });

  it('write-back learns only approved sections through the de-id gate', async () => {
    const learned = await writeBackArtifact(cfg, {
      artifact: artifact('approved'),
      briefs: [brief],
      brand: brand(),
      pds: pds(),
      humanVerdict: 'approved, strong',
    });

    expect(learned).toHaveLength(1);
    expect(readLibrary()).toHaveLength(1);
    expect(JSON.stringify(learned[0]).toLowerCase()).not.toContain('acme advisors');

    const skipped = await writeBackArtifact(cfg, {
      artifact: artifact('draft'),
      briefs: [brief],
      brand: brand(),
      pds: pds(),
    });
    expect(skipped).toHaveLength(0);
  });

  it('retrieval gracefully degrades when the embedding provider fails', async () => {
    const badCfg = {
      ...cfg,
      embeddingProvider: 'ollama' as const,
      ollamaBaseUrl: 'http://127.0.0.1:1',
      embeddingModel: 'missing-model',
    };
    writeLibrary([await makeEntry({})]);

    await expect(retrieveLibraryForBrief(badCfg, brief, 5)).resolves.toEqual([]);
  });
});
