import { describe, it, expect, vi } from 'vitest';
import { runSuccession } from '../src/succession.js';
import { existsSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';

describe('E3.2 Model Succession Playbook', () => {
  const adeDir = join(process.cwd(), '.ade');
  const logPath = join(adeDir, 'successions.jsonl');

  it('executes the 6-step succession playbook and logs the delta', async () => {
    // Suppress console output for the test
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Clean up before test
    if (existsSync(logPath)) {
      rmSync(logPath, { force: true });
    }

    const result = await runSuccession('gpt-4-old', 'gpt-4-new');

    expect(result.success).toBe(true);
    expect(result.oldModel).toBe('gpt-4-old');
    expect(result.newModel).toBe('gpt-4-new');
    expect(result.deltas.coreScoreDelta).toBeTypeOf('number');
    expect(result.deltas.calibrationGap).toBeTypeOf('number');

    // Verify the log file was created and contains the JSON entry
    expect(existsSync(logPath)).toBe(true);
    const logs = readFileSync(logPath, 'utf-8').trim().split('\n');
    const lastEntry = JSON.parse(logs[logs.length - 1]);

    expect(lastEntry.oldModel).toBe('gpt-4-old');
    expect(lastEntry.newModel).toBe('gpt-4-new');
    expect(lastEntry.status).toBe('COMPLETED');
    expect(lastEntry.deltas.coreScoreDelta).toBe(result.deltas.coreScoreDelta);

    consoleSpy.mockRestore();
  });
});
