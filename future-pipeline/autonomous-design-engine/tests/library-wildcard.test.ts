import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { retrieveLibraryForBrief, setLibraryDirForTest, writeLibrary } from '../src/library.js';
import type { Brief } from '../src/schema.js';
import type { Config } from '../src/config.js';
import * as embeddings from '../src/embeddings.js';

vi.mock('../src/embeddings.js', async () => {
  const actual = await vi.importActual<typeof import('../src/embeddings.js')>('../src/embeddings.js');
  return {
    ...actual,
    getEmbeddingProvider: vi.fn(),
  };
});

describe('Cross-Domain Wildcard Retrieval (R11)', () => {
  const testDir = join(__dirname, '.test-library-wildcard');

  const cfg = {
    embeddingModel: 'test-embed',
    embeddingProvider: 'mock',
  } as unknown as Config;

  const brief: Brief = {
    client: 'Test Client',
    industry: 'Healthcare',
    audience: 'Patients',
    goal: 'Book appointment',
    section: {
      name: 'Hero',
      content: { headline: 'Book now' },
    },
  };

  const baseEntry = {
    type: 'pattern',
    title: 'Mock Title',
    intent: 'Mock Intent',
    context_fit: { domain: 'a', audience: 'b', goal: 'c' },
    outcome: { human_verdict: 'pass', confidence: 1, times_used: 1 },
    embedding: { model_id: 'test-embed', text: 'mock text', vector: [0.9] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.mocked(embeddings.getEmbeddingProvider).mockReturnValue({
      id: 'mock',
      embed: async () => ({ modelId: 'test-embed', vector: [1] }),
    });

    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
    mkdirSync(testDir, { recursive: true });
    setLibraryDirForTest(testDir);

    // Inject mock library entries via real write
    const mockLibrary: any[] = [
      { ...baseEntry, id: 'h1', client_id: 'c1', tags: ['healthcare'], embedding: { ...baseEntry.embedding, vector: [0.9] } },
      { ...baseEntry, id: 'h2', client_id: 'c2', tags: ['healthcare'], embedding: { ...baseEntry.embedding, vector: [0.85] } },
      { ...baseEntry, id: 'h3', client_id: 'c3', tags: ['healthcare'], embedding: { ...baseEntry.embedding, vector: [0.8] } },
      { ...baseEntry, id: 'h4', client_id: 'c4', tags: ['healthcare'], embedding: { ...baseEntry.embedding, vector: [0.75] } },
      { ...baseEntry, id: 'e1', client_id: 'c5', tags: ['ecommerce'], embedding: { ...baseEntry.embedding, vector: [0.7] } },
      { ...baseEntry, id: 'e2', client_id: 'c6', tags: ['ecommerce'], embedding: { ...baseEntry.embedding, vector: [0.65] } },
    ];
    writeLibrary(mockLibrary);
  });

  afterEach(() => {
    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true });
  });

  it('injects 1 cross-domain wildcard when topK > 1 in text-Library arm', async () => {
    // Should get top 4 Healthcare and 1 wildcard (Ecommerce) since topK=5
    const hits = await retrieveLibraryForBrief(cfg, brief, 5, 'text-Library', 'test-client');

    expect(hits).toHaveLength(5);

    // Check that at least one hit is from the ecommerce domain
    const hasWildcard = hits.some((h) => h.tags.includes('ecommerce'));
    expect(hasWildcard).toBe(true);

    // And that we still have same-domain results
    const hasSameDomain = hits.some((h) => h.tags.includes('healthcare'));
    expect(hasSameDomain).toBe(true);
  });

  it('does NOT inject wildcard in own-client arm', async () => {
    // Overwrite library so own-client has multiple entries, to see if it grabs a wildcard
    // (It shouldn't, because own-client is hard-scoped)
    const mockLibrary: any[] = [
      { ...baseEntry, id: 'o1', client_id: 'test-client', tags: ['healthcare'], embedding: { ...baseEntry.embedding, vector: [0.9] } },
      { ...baseEntry, id: 'o2', client_id: 'test-client', tags: ['healthcare'], embedding: { ...baseEntry.embedding, vector: [0.85] } },
      { ...baseEntry, id: 'e1', client_id: 'other-client', tags: ['ecommerce'], embedding: { ...baseEntry.embedding, vector: [0.99] } },
    ];
    writeLibrary(mockLibrary);

    const hits = await retrieveLibraryForBrief(cfg, brief, 5, 'own-client', 'test-client');

    expect(hits).toHaveLength(2);
    // None should be from 'ecommerce'
    const hasWildcard = hits.some((h) => h.tags.includes('ecommerce'));
    expect(hasWildcard).toBe(false);
  });
});
