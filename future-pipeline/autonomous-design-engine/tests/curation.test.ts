import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runPeriodicCuration } from '../src/curation.js';
import { readLibrary, setLibraryDirForTest, writeLibrary } from '../src/library.js';
import { LibraryEntry } from '../src/schema.js';
import { ModelProvider } from '../src/model.js';
import { join } from 'path';
import { mkdirSync, rmSync } from 'fs';
import { tmpdir } from 'os';

describe('Library Curation (C2.6)', () => {
  let testDir: string;
  let provider: ModelProvider;

  beforeEach(() => {
    testDir = join(tmpdir(), `ade-curation-test-${Date.now()}`);
    mkdirSync(testDir, { recursive: true });
    setLibraryDirForTest(testDir);
    writeLibrary([]);

    provider = {
      id: 'mock',
      complete: vi.fn(),
    } as any;
  });

  const makeEntry = (id: string, ageDays: number, confidence: number): LibraryEntry => {
    const now = Date.now();
    const created = new Date(now - ageDays * 24 * 60 * 60 * 1000).toISOString();
    return {
      id,
      type: 'pattern',
      title: `Test ${id}`,
      intent: 'test',
      context_fit: { domain: 'test', audience: 'test', personality: [], goal: 'test', feel: [] },
      construction: [],
      rationale: [],
      avoid: [],
      outcome: { human_verdict: 'pass', confidence, times_used: 1 },
      tags: [],
      pairs_with: [],
      provenance: ['test'],
      provisional: false,
      retired: false,
      created_at: created,
      updated_at: created,
      embedding: { model_id: 'test', text: 'test', vector: [1, 2, 3] },
    };
  };

  it('retires old high-confidence entries if the critic rejects them', async () => {
    // One old entry (40 days) with high confidence (0.8)
    const oldHighConf = makeEntry('old-high', 40, 0.8);
    // One old entry with low confidence (should be skipped)
    const oldLowConf = makeEntry('old-low', 40, 0.3);
    // One new entry with high confidence (should be skipped)
    const newHighConf = makeEntry('new-high', 10, 0.8);

    writeLibrary([oldHighConf, oldLowConf, newHighConf]);

    // Mock the provider to reject
    vi.mocked(provider.complete).mockResolvedValueOnce({
      text: '```json\n{"pass": false, "reason": "Too specific"}\n```',
      usage: { input: 10, output: 10 },
    });

    await runPeriodicCuration(provider);

    // Only the old high-confidence entry should have been evaluated
    expect(provider.complete).toHaveBeenCalledTimes(1);

    const updated = readLibrary();

    const updatedOldHigh = updated.find((e) => e.id === 'old-high')!;
    expect(updatedOldHigh.retired).toBe(true);
    expect(updatedOldHigh.outcome.confidence).toBe(0.1);

    const updatedOldLow = updated.find((e) => e.id === 'old-low')!;
    expect(updatedOldLow.retired).toBe(false);
    expect(updatedOldLow.outcome.confidence).toBe(0.3);

    const updatedNewHigh = updated.find((e) => e.id === 'new-high')!;
    expect(updatedNewHigh.retired).toBe(false);
  });
});
