import { describe, it, expect, vi, afterEach } from 'vitest';
import { exportRLAIFDataset } from '../src/rlaif.js';
import * as fs from 'fs';

vi.mock('../src/verdicts.js', () => ({
  readVerdicts: vi.fn(() => [
    { run_id: 'r1', section: 'hero', candidate_id: 'c1', preferred: 'final', rating: 'strong', human_verdict: 'approve', notes: 'Great' },
    { run_id: 'r1', section: 'hero', candidate_id: 'c2', preferred: 'abandoned', rating: 'bad', human_verdict: 'reject', notes: 'Too messy' },
    { run_id: 'r2', section: 'footer', candidate_id: 'c3', preferred: 'final', rating: 'good', human_verdict: 'approve' },
    // no rejected candidate in r2, should not form a pair
  ]),
}));

vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  return {
    ...actual,
    writeFileSync: vi.fn(),
  };
});

describe('RLAIF Dataset Export (C3.5)', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('exports chosen/rejected pairs from human verdicts', () => {
    const count = exportRLAIFDataset('/dummy', '/out.jsonl', 5000);
    expect(count).toBe(1); // Only r1 forms a complete pair

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    const writtenData = writeCall[1] as string;

    expect(writtenData).toContain('"chosen":"c1"');
    expect(writtenData).toContain('"rejected":"c2"');
    expect(writtenData).toContain('"chosen_rating":"strong"');
    expect(writtenData).toContain('"rejected_rating":"bad"');
    expect(writtenData).toContain('"reasoning":"Great"');
  });

  it('respects token budget', () => {
    const count = exportRLAIFDataset('/dummy', '/out.jsonl', 10); // budget 10 is < 50
    expect(count).toBe(0); // Should skip because adding one pair exceeds budget

    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    const writtenData = writeCall[1] as string;
    expect(writtenData).toBe('');
  });
});
