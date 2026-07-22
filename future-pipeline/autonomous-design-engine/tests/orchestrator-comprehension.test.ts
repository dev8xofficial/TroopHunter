/**
 * ADE Tests — Comprehension-gate abort/escalation through the ORCHESTRATOR
 * (C0.2)
 *
 * briefComprehensionGate() itself is already unit-tested (guardrails.test.ts).
 * What was never tested is the wiring around it in runLoop(): a failing
 * gate must park the run as ABORTED and emit a real, queryable escalation
 * BEFORE any generation spend — not just fail the gate function in
 * isolation. Drives runLoop() for real (cfg.provider='local' pointed at an
 * unreachable Ollama address, so the comprehension preflight call
 * genuinely fails rather than being mocked).
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { runLoop } from '../src/orchestrator.js';
import { buildConfig } from '../src/config.js';
import { listEscalations } from '../src/escalations.js';
import type { Brief } from '../src/schema.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'orchestrator-comprehension-test');

beforeEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

afterEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

const brief: Brief = {
  client: 'ComprehensionCo',
  industry: 'Technology',
  audience: 'Developers',
  goal: 'Generate leads',
  section: {
    name: 'hero',
    content: { headline: 'Test Headline' },
  },
};

// cfg.provider='local' pointed at an unreachable port — the comprehension
// preflight's provider.complete() call genuinely fails (real "fetch failed",
// not a mock), which is exactly the failure guardrails.ts's try/catch turns
// into pass:false.
const unreachableCfg = {
  ...buildConfig({ provider: 'local', maxIters: 1, variations: 1 }),
  ollamaBaseUrl: 'http://127.0.0.1:1',
};

describe('runLoop comprehension-gate wiring (C0.2)', () => {
  it('a failing comprehension preflight ABORTS the run and never reaches generation', async () => {
    const result = await runLoop(unreachableCfg, brief, undefined, undefined, TEST_DIR, 'test-brief.json');

    expect(result.state).toBe('ABORTED');
    expect(result.iterations).toBe(0); // never entered the generate/render/critique loop
    expect(result.finalTsx).toBeUndefined(); // nothing was ever generated
  }, 30_000);

  it('emits a real, queryable comprehension escalation — not just a console error', async () => {
    await runLoop(unreachableCfg, brief, undefined, undefined, TEST_DIR, 'test-brief.json');

    const escalations = listEscalations(TEST_DIR);
    const comprehensionEscalations = escalations.filter((e) => e.type === 'comprehension');
    expect(comprehensionEscalations).toHaveLength(1);
    expect(comprehensionEscalations[0].sectionId).toBe('hero');
    expect(comprehensionEscalations[0].status).toBe('open');
    expect(comprehensionEscalations[0].question).toContain('comprehension');
  }, 30_000);

  it('a brief that fails the INPUT gate aborts before comprehension ever runs — no comprehension escalation for an unrelated failure', async () => {
    // A well-typed but schema-invalid brief (goal is required, min length 1)
    // — this is the realistic malformed-input case loadBrief()'s
    // BriefSchema.safeParse would also reject before runLoop ever sees it.
    // Distinguishes THIS suite's target (the orchestrator's reaction to a
    // comprehension failure specifically) from input-gate failures, which
    // must never be mislabeled as a comprehension escalation.
    const invalidBrief: Brief = { ...brief, goal: '' };
    const inputGateOnlyCfg = { ...buildConfig({ provider: 'local' }), ollamaBaseUrl: 'http://127.0.0.1:1' };

    const result = await runLoop(inputGateOnlyCfg, invalidBrief, undefined, undefined, TEST_DIR, 'test-brief.json');

    expect(result.state).toBe('ABORTED');
    // Input gate fails BEFORE any provider is even initialized — no
    // comprehension escalation should exist for this run.
    const escalations = listEscalations(TEST_DIR);
    expect(escalations.filter((e) => e.type === 'comprehension')).toHaveLength(0);
  }, 30_000);
});
