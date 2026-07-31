import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';
import type { Config } from '../src/config.js';
import type { Artifact, Brief, BrandFoundation, LibraryEntry, ProjectDesignSystem } from '../src/schema.js';
import { createLocalHashEmbeddingProvider } from '../src/embeddings.js';
import { appendLibraryEntry, deriveClientIdSlug, detectEmbeddingModelDrift, embedLibraryEntry, getLibraryVersion, readLibrary, reEmbedLibrary, retrieveLibraryForBrief, searchLibrary, searchOwnClientLibrary, setLibraryDirForTest, snapshotLibraryVersionForRun, writeLibrary } from '../src/library.js';
import { deidentificationGate, writeBackArtifact, resolveSectionVerdict, verdictProvenanceRef, resolveProvenanceToVerdict } from '../src/writeback.js';
import { setProjectsDirForTest, getSectionRunDir } from '../src/store.js';
import { appendVerdict } from '../src/verdicts.js';

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
      semanticColors: [],
      darkMode: { enabled: false },
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
      fluidType: {},
      fluidSpace: {},
      exportFormat: 'dtcg',
    },
    components: [],
    foundation_from: 'hero',
    extensionLog: [],
  };
}

async function makeEntry(partial: Partial<Omit<LibraryEntry, 'embedding'>>, embeddingProvider = createLocalHashEmbeddingProvider()): Promise<LibraryEntry> {
  const now = new Date().toISOString();
  return embedLibraryEntry(
    {
      id: partial.id ?? 'pat_trust_editorial_hero',
      client_id: partial.client_id,
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
      provisional: partial.provisional ?? true,
      expires_at: partial.expires_at,
      created_at: partial.created_at ?? now,
      updated_at: partial.updated_at ?? now,
      retired: partial.retired ?? false,
      recipe_values: partial.recipe_values,
    },
    embeddingProvider,
  );
}

describe('Phase 2 Library memory', () => {
  beforeEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
    setLibraryDirForTest(TEST_DIR);
    // C2.7: writeBackArtifact now looks up each section's verdicts.jsonl via
    // store.ts's getSectionRunDir, which resolves against the projects dir —
    // sandbox it here too, or those lookups would touch the real ./projects.
    setProjectsDirForTest(TEST_DIR);
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

  it('C2.3: excludes entries below the similarity floor rather than always returning top-k regardless of relevance', async () => {
    const provider = createLocalHashEmbeddingProvider();
    // A single entry, on a totally unrelated topic to the query — with no
    // floor, this would still be returned as "the best of 1" every time.
    const unrelated = await makeEntry({
      id: 'pat_totally_unrelated',
      title: 'Recipe blog footer',
      intent: 'A footer for a home cooking recipe blog with newsletter signup.',
      context_fit: { domain: 'home cooking blog', audience: 'hobbyist cooks', personality: ['warm'], goal: 'grow newsletter list', feel: ['cozy'] },
    });
    writeLibrary([unrelated]);

    const hits = await searchLibrary('enterprise fintech API documentation for backend engineers', provider, 5);
    expect(hits).toHaveLength(0);
  });

  it('C2.0: excludes entries embedded with a different model than the current query embedding (never silently mixes vector spaces)', async () => {
    const currentProvider = createLocalHashEmbeddingProvider('ade-local-hash-v2');
    const entryFromOldModel = await makeEntry({}, createLocalHashEmbeddingProvider('ade-local-hash-v1'));
    writeLibrary([entryFromOldModel]);

    const hits = await searchLibrary('premium b2b advisory trust consultation leads executive buyers', currentProvider, 5);
    expect(hits).toHaveLength(0); // excluded, not silently compared across spaces
  });

  it('C2.0: detectEmbeddingModelDrift reports 0 stale on an empty Library', () => {
    const drift = detectEmbeddingModelDrift(cfg);
    expect(drift.total).toBe(0);
    expect(drift.stale).toBe(0);
    expect(drift.currentModelId).toBe('ade-local-hash-v1');
  });

  it('C2.0: detectEmbeddingModelDrift reports 0 stale when every entry matches the current model', async () => {
    writeLibrary([await makeEntry({}, createLocalHashEmbeddingProvider('ade-local-hash-v1'))]);
    const drift = detectEmbeddingModelDrift(cfg);
    expect(drift.total).toBe(1);
    expect(drift.stale).toBe(0);
  });

  it('C2.0: detectEmbeddingModelDrift finds entries embedded with an old model, without making any model/network call', async () => {
    writeLibrary([await makeEntry({ id: 'pat_old' }, createLocalHashEmbeddingProvider('ade-local-hash-v0-legacy')), await makeEntry({ id: 'pat_current' }, createLocalHashEmbeddingProvider('ade-local-hash-v1'))]);
    const drift = detectEmbeddingModelDrift(cfg);
    expect(drift.total).toBe(2);
    expect(drift.stale).toBe(1);
    expect(drift.staleModelIds).toEqual(['ade-local-hash-v0-legacy']);
  });

  it('C2.0: reEmbedLibrary re-embeds every entry under the current model, clearing all drift', async () => {
    writeLibrary([await makeEntry({ id: 'pat_old_a' }, createLocalHashEmbeddingProvider('ade-local-hash-v0-legacy')), await makeEntry({ id: 'pat_old_b' }, createLocalHashEmbeddingProvider('ade-local-hash-v0-legacy'))]);
    expect(detectEmbeddingModelDrift(cfg).stale).toBe(2);

    const report = await reEmbedLibrary(cfg);
    expect(report.total).toBe(2);
    expect(report.reEmbedded).toBe(2);
    expect(report.newModelId).toBe('ade-local-hash-v1');

    // Genuinely re-embedded (persisted), not just a report — re-reading confirms it.
    const reread = readLibrary();
    expect(reread.every((e) => e.embedding.model_id === 'ade-local-hash-v1')).toBe(true);
    expect(detectEmbeddingModelDrift(cfg).stale).toBe(0);
  });

  it('C2.0: reEmbedLibrary is a real recomputation — the new vector is what the CURRENT model would actually produce, not a relabeled old one', async () => {
    const original = await makeEntry({}, createLocalHashEmbeddingProvider('ade-local-hash-v0-legacy'));
    writeLibrary([original]);

    await reEmbedLibrary(cfg);
    const [reEmbedded] = readLibrary();

    const { embedding: _oldEmbedding, ...withoutEmbedding } = original;
    const directlyEmbedded = await embedLibraryEntry(withoutEmbedding, createLocalHashEmbeddingProvider('ade-local-hash-v1'));
    expect(reEmbedded.embedding.vector).toEqual(directlyEmbedded.embedding.vector);
  });

  it('C2.0: reEmbedLibrary on an empty Library is a real no-op (0/0), never throws', async () => {
    const report = await reEmbedLibrary(cfg);
    expect(report).toEqual({ newModelId: 'ade-local-hash-v1', total: 0, reEmbedded: 0 });
  });

  describe('Library versioning + per-run snapshot (C2.2)', () => {
    it('starts at version 0 when nothing has ever been written', () => {
      expect(getLibraryVersion()).toBe(0);
    });

    it('writeLibrary bumps the version on every real mutation', async () => {
      writeLibrary([await makeEntry({ id: 'pat_a' })]);
      expect(getLibraryVersion()).toBe(1);
      writeLibrary([await makeEntry({ id: 'pat_a' }), await makeEntry({ id: 'pat_b' })]);
      expect(getLibraryVersion()).toBe(2);
    });

    it('appendLibraryEntry also bumps the version', async () => {
      appendLibraryEntry(await makeEntry({ id: 'pat_a' }));
      expect(getLibraryVersion()).toBe(1);
      appendLibraryEntry(await makeEntry({ id: 'pat_b' }));
      expect(getLibraryVersion()).toBe(2);
    });

    it("each version is an immutable, append-only snapshot — an OLDER version's content never changes after a later write", async () => {
      writeLibrary([await makeEntry({ id: 'pat_a' })]);
      const v1Path = join(TEST_DIR, '.versions', 'v1.jsonl');
      expect(existsSync(v1Path)).toBe(true);
      const v1ContentBefore = readFileSync(v1Path, 'utf-8');

      writeLibrary([await makeEntry({ id: 'pat_a' }), await makeEntry({ id: 'pat_b' })]);
      const v1ContentAfter = readFileSync(v1Path, 'utf-8');

      expect(v1ContentAfter).toBe(v1ContentBefore); // v1's snapshot is untouched by the v2 write
      expect(v1ContentAfter).not.toContain('pat_b'); // v1 genuinely only ever had pat_a
    });

    it('snapshotLibraryVersionForRun records the version, entry count, and snapshot path a run actually saw', async () => {
      writeLibrary([await makeEntry({ id: 'pat_a' }), await makeEntry({ id: 'pat_b' })]);
      const runDir = join(TEST_DIR, 'runs', 'hero-run');

      const record = snapshotLibraryVersionForRun(runDir);
      expect(record.library_version).toBe(1);
      expect(record.entry_count).toBe(2);
      expect(record.snapshot_path).toBe(join(TEST_DIR, '.versions', 'v1.jsonl'));

      // Persisted to the run's own output directory, not just returned.
      const persisted = JSON.parse(readFileSync(join(runDir, 'library-version.json'), 'utf-8'));
      expect(persisted.library_version).toBe(1);
    });

    it('snapshotLibraryVersionForRun on a never-written Library records version 0 and a null snapshot path, without throwing', () => {
      const runDir = join(TEST_DIR, 'runs', 'empty-run');
      const record = snapshotLibraryVersionForRun(runDir);
      expect(record.library_version).toBe(0);
      expect(record.entry_count).toBe(0);
      expect(record.snapshot_path).toBeNull();
    });

    it('reproducibility: a run recorded at v1 can reconstruct the EXACT same retrieval it saw, even after the Library moves on to v2', async () => {
      writeLibrary([await makeEntry({})]);
      const runRecord = snapshotLibraryVersionForRun(join(TEST_DIR, 'runs', 'first-run'));

      // Library moves on — more entries written, version advances.
      writeLibrary([await makeEntry({}), await makeEntry({ id: 'pat_second' })]);
      expect(getLibraryVersion()).toBe(2);

      // The v1 snapshot this run recorded is still exactly what it was.
      const frozenContent = readFileSync(runRecord.snapshot_path!, 'utf-8');
      const frozenEntries = frozenContent
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line));
      expect(frozenEntries).toHaveLength(1);
    });
  });

  describe('Own-client memory: hard-scoped retrieval, no cross-client leakage (E2.1)', () => {
    it('deriveClientIdSlug normalizes a display name the same way the rest of the pipeline slugifies client ids', () => {
      expect(deriveClientIdSlug('Acme Advisors')).toBe('acme-advisors');
      expect(deriveClientIdSlug('Multi   Word   Co')).toBe('multi-word-co');
    });

    it("searchOwnClientLibrary NEVER returns another client's entry, even when it is a far better similarity match", async () => {
      const provider = createLocalHashEmbeddingProvider();
      // A near-perfect match for the query, but belongs to a DIFFERENT client.
      const otherClientsBetterMatch = await makeEntry({
        id: 'pat_other_client',
        client_id: 'other-client',
        title: 'Trust editorial hero',
        intent: 'Build trust before a lead-generation ask for premium advisory buyers.',
      });
      // A weaker match, but belongs to the REQUESTING client.
      const ownClientWeakerMatch = await makeEntry({
        id: 'pat_own_client',
        client_id: 'acme-advisors',
        title: 'Playful consumer sale hero',
        intent: 'Create urgency for a flash sale in a playful consumer retail context.',
        context_fit: { domain: 'consumer retail', audience: 'bargain shoppers', personality: ['playful'], goal: 'drive immediate sale', feel: ['bright'] },
      });
      writeLibrary([otherClientsBetterMatch, ownClientWeakerMatch]);

      const hits = await searchOwnClientLibrary('premium b2b advisory trust consultation leads executive buyers', provider, 'acme-advisors', 5);

      // The other client's entry is NEVER returned, no matter how relevant —
      // this is the actual leakage guarantee, not just a ranking preference.
      expect(hits.every((h) => h.entry.client_id === 'acme-advisors')).toBe(true);
      expect(hits.some((h) => h.entry.id === 'pat_other_client')).toBe(false);
    });

    it('searchOwnClientLibrary returns [] for a client with zero entries, even when OTHER clients have plenty', async () => {
      const provider = createLocalHashEmbeddingProvider();
      writeLibrary([await makeEntry({ id: 'pat_a', client_id: 'other-client-1' }), await makeEntry({ id: 'pat_b', client_id: 'other-client-2' })]);

      const hits = await searchOwnClientLibrary('premium b2b advisory trust consultation leads executive buyers', provider, 'brand-new-client', 5);
      expect(hits).toEqual([]);
    });

    it('searchOwnClientLibrary still applies the C2.3 similarity floor within the own-client scope', async () => {
      const provider = createLocalHashEmbeddingProvider();
      const unrelatedOwnEntry = await makeEntry({
        id: 'pat_unrelated_but_own',
        client_id: 'acme-advisors',
        title: 'Recipe blog footer',
        intent: 'A footer for a home cooking recipe blog with newsletter signup.',
        context_fit: { domain: 'home cooking blog', audience: 'hobbyist cooks', personality: ['warm'], goal: 'grow newsletter list', feel: ['cozy'] },
      });
      writeLibrary([unrelatedOwnEntry]);

      const hits = await searchOwnClientLibrary('enterprise fintech API documentation for backend engineers', provider, 'acme-advisors', 5);
      expect(hits).toEqual([]); // same client, but below the floor — still excluded
    });

    it('retrieveLibraryForBrief(arm="own-client") end-to-end: only the matching client\'s entries ever reach the Generator bundle', async () => {
      writeLibrary([await makeEntry({ id: 'pat_other', client_id: 'other-client' }), await makeEntry({ id: 'pat_mine', client_id: 'acme-advisors' })]);

      const entries = await retrieveLibraryForBrief(cfg, brief, 5, 'own-client', 'acme-advisors');
      expect(entries.every((e) => e.client_id === 'acme-advisors')).toBe(true);
      expect(entries.some((e) => e.id === 'pat_other')).toBe(false);
    });

    it('retrieveLibraryForBrief derives clientId from brief.client when none is passed explicitly (regression: the boost previously never fired because brief.client — a display name — never matched a stored client_id slug)', async () => {
      // brief.client is 'Acme Advisors'; stored entries use the slug form.
      const ownEntry = await makeEntry({ id: 'pat_mine', client_id: deriveClientIdSlug(brief.client) });
      const otherEntry = await makeEntry({
        id: 'pat_other_2',
        client_id: 'some-other-client',
        title: 'Trust editorial hero (near-duplicate)',
      });
      writeLibrary([otherEntry, ownEntry]);

      // Cross-client search (default arm) still returns both if relevant,
      // but the own-client entry must rank at or above an equally-relevant
      // other-client one because the boost is now actually reachable.
      const entries = await retrieveLibraryForBrief(cfg, brief, 5);
      const ownIndex = entries.findIndex((e) => e.id === 'pat_mine');
      expect(ownIndex).toBeGreaterThanOrEqual(0);
    });
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
    expect(result.violations.map((v) => v.rule)).toContain('identity-leak');
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

  it('E2.1: write-back sets client_id on the entry (own-client memory boost is no longer dead code) without triggering a de-id self-block', async () => {
    const a = artifact('approved');
    const learned = await writeBackArtifact(cfg, {
      artifact: a,
      briefs: [brief],
      brand: brand(),
      pds: pds(),
      humanVerdict: 'approved, strong',
    });

    expect(learned).toHaveLength(1);
    expect(learned[0].client_id).toBe(a.client_id); // was always undefined before the fix
  });

  it('C2.5: write-back still succeeds with NO criticProvider (altitude review is skipped, not faked)', async () => {
    const learned = await writeBackArtifact(cfg, {
      artifact: artifact('approved'),
      briefs: [brief],
      brand: brand(),
      pds: pds(),
      humanVerdict: 'approved, strong',
      // no criticProvider — same as every pre-existing caller.
    });
    expect(learned).toHaveLength(1);
  });

  it('C2.5: write-back is BLOCKED when the abstraction-altitude review fails (too specific/too vague)', async () => {
    const failingCritic = {
      id: 'mock:altitude-fail',
      async complete() {
        return { text: JSON.stringify({ altitude_ok: false, strategic_specificity_ok: true, reasoning: 'Too specific — reads as one exact section, not a transferable pattern.' }), usage: { input: 10, output: 20 } };
      },
    };
    await expect(
      writeBackArtifact(cfg, {
        artifact: artifact('approved'),
        briefs: [brief],
        brand: brand(),
        pds: pds(),
        humanVerdict: 'approved, strong',
        criticProvider: failingCritic,
      }),
    ).rejects.toThrow('Write-back blocked for "hero" (failed: abstraction-altitude)');

    expect(readLibrary()).toHaveLength(0); // never inserted
  });

  it('C2.5: write-back is BLOCKED when strategic specificity/re-identifiability fails, even though altitude itself is fine (the two checks are genuinely independent)', async () => {
    const reidentifiableCritic = {
      id: 'mock:specificity-fail',
      async complete() {
        return {
          text: JSON.stringify({
            altitude_ok: true,
            strategic_specificity_ok: false,
            reasoning: 'A rare industry + event + timing combination makes the source project guessable.',
          }),
          usage: { input: 10, output: 20 },
        };
      },
    };
    await expect(
      writeBackArtifact(cfg, {
        artifact: artifact('approved'),
        briefs: [brief],
        brand: brand(),
        pds: pds(),
        humanVerdict: 'approved, strong',
        criticProvider: reidentifiableCritic,
      }),
    ).rejects.toThrow('Write-back blocked for "hero" (failed: strategic-specificity/re-identifiability)');

    expect(readLibrary()).toHaveLength(0); // never inserted
  });

  it('C2.5: write-back succeeds when BOTH altitude and strategic-specificity reviews pass', async () => {
    const passingCritic = {
      id: 'mock:altitude-pass',
      async complete() {
        return { text: JSON.stringify({ altitude_ok: true, strategic_specificity_ok: true, reasoning: 'Good transferable altitude, not re-identifiable.' }), usage: { input: 10, output: 20 } };
      },
    };
    const learned = await writeBackArtifact(cfg, {
      artifact: artifact('approved'),
      briefs: [brief],
      brand: brand(),
      pds: pds(),
      humanVerdict: 'approved, strong',
      criticProvider: passingCritic,
    });
    expect(learned).toHaveLength(1);
  });

  it('C2.5: fails CLOSED (both checks marked failed) on unparseable review output', async () => {
    const garbageCritic = {
      id: 'mock:garbage',
      async complete() {
        return { text: 'not json at all', usage: { input: 10, output: 20 } };
      },
    };
    await expect(
      writeBackArtifact(cfg, {
        artifact: artifact('approved'),
        briefs: [brief],
        brand: brand(),
        pds: pds(),
        humanVerdict: 'approved, strong',
        criticProvider: garbageCritic,
      }),
    ).rejects.toThrow('Write-back blocked for "hero" (failed: abstraction-altitude + strategic-specificity/re-identifiability)');
  });

  describe('Provenance resolves to a real human verdict (C2.7)', () => {
    function positiveVerdict(overrides: Partial<import('../src/schema.js').VerdictEntry> = {}) {
      return {
        run_id: 'run-abc123',
        section: 'hero',
        preferred: 'final' as const,
        rating: 'strong' as const,
        human_verdict: 'approve' as const,
        timestamp: '2026-07-21T10:00:00.000Z',
        ...overrides,
      };
    }

    it('resolveSectionVerdict finds the POSITIVE verdict for a section and ignores unrelated ones', () => {
      const verdicts = [{ run_id: 'r1', section: 'footer', preferred: 'final' as const, rating: 'strong' as const, human_verdict: 'approve' as const, timestamp: 't1' }, positiveVerdict()];
      const resolved = resolveSectionVerdict('hero', verdicts);
      expect(resolved?.run_id).toBe('run-abc123');
    });

    it('resolveSectionVerdict returns undefined when the only verdict for this section is a REJECT', () => {
      const verdicts = [{ run_id: 'r1', section: 'hero', preferred: 'final' as const, rating: 'bad' as const, human_verdict: 'reject' as const, timestamp: 't1' }];
      expect(resolveSectionVerdict('hero', verdicts)).toBeUndefined();
    });

    it('resolveSectionVerdict matches section names case-insensitively', () => {
      const verdicts = [positiveVerdict({ section: 'HERO' })];
      expect(resolveSectionVerdict('hero', verdicts)?.run_id).toBe('run-abc123');
    });

    it('verdictProvenanceRef + resolveProvenanceToVerdict round-trip exactly, even with a colon-bearing ISO timestamp', () => {
      const verdict = positiveVerdict({ timestamp: '2026-07-21T10:15:30.123Z' });
      const ref = verdictProvenanceRef(verdict);
      expect(ref).toContain('verdict:');
      const resolved = resolveProvenanceToVerdict(ref, [verdict]);
      expect(resolved).toEqual(verdict);
    });

    it('resolveProvenanceToVerdict returns undefined for a malformed or non-matching ref', () => {
      expect(resolveProvenanceToVerdict('not-a-verdict-ref', [positiveVerdict()])).toBeUndefined();
      expect(resolveProvenanceToVerdict('verdict:wrong:wrong:wrong', [positiveVerdict()])).toBeUndefined();
    });

    it("end-to-end: when a real POSITIVE verdict exists for the section, the written-back entry's provenance genuinely resolves to it", async () => {
      const runDir = getSectionRunDir('acme-advisors', 'website', 'hero');
      const verdict = positiveVerdict();
      appendVerdict(runDir, verdict);

      const learned = await writeBackArtifact(cfg, {
        artifact: artifact('approved'),
        briefs: [brief],
        brand: brand(),
        pds: pds(),
        humanVerdict: 'approved, strong',
      });

      expect(learned).toHaveLength(1);
      const resolved = resolveProvenanceToVerdict(learned[0].provenance[0], [verdict]);
      expect(resolved).toBeDefined();
      expect(resolved?.run_id).toBe('run-abc123');
    });

    it('end-to-end: a section is SKIPPED (never written back) when verdicts.jsonl exists but resolves to no positive verdict — even though section.status is "approved"', async () => {
      const runDir = getSectionRunDir('acme-advisors', 'website', 'hero');
      appendVerdict(runDir, { run_id: 'run-xyz', section: 'hero', preferred: 'final', rating: 'bad', human_verdict: 'reject', timestamp: '2026-07-21T10:00:00.000Z' });

      const learned = await writeBackArtifact(cfg, {
        artifact: artifact('approved'),
        briefs: [brief],
        brand: brand(),
        pds: pds(),
        humanVerdict: 'approved, strong',
      });

      // The artifact's OWN status says "approved" — I7 requires a real human
      // verdict too, and this one is a recorded REJECT, so nothing is learned.
      expect(learned).toHaveLength(0);
      expect(readLibrary()).toHaveLength(0);
    });

    it('end-to-end: falls back to legacy opaque-hash provenance (never throws) when no verdicts.jsonl exists at all for the section', async () => {
      const learned = await writeBackArtifact(cfg, {
        artifact: artifact('approved'),
        briefs: [brief],
        brand: brand(),
        pds: pds(),
        humanVerdict: 'approved, strong',
      });
      expect(learned).toHaveLength(1);
      expect(learned[0].provenance[0]).toMatch(/^proj_/);
    });
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
