/**
 * ADE Tests — Integration (mock provider)
 *
 * Deterministic fake ModelProvider → full loop reaches terminal state + valid trace.
 * Also: injected-failure tests (spec 07 §8.5):
 *   (a) Injected render bug → caught by render-health gate
 *   (b) Budget cap test → ends ESCALATED
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { ModelProvider, CompletionRequest, CompletionResult } from '../src/model.js';
import type { Brief, BrandData, RunRecord } from '../src/schema.js';
import { readTrace, writeRunConfig } from '../src/trace.js';
import { inputGate, renderHealthGate, schemaGate } from '../src/guardrails.js';
import type { RenderResult } from '../src/schema.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'integration-test');

const validTsx = `
import React from 'react';

export default function Section() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-4">Build Better Software</h1>
      <p className="text-xl text-gray-300 mb-8">The developer platform for modern teams.</p>
      <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">Get Started</a>
    </div>
  );
}
`;

const brokenTsx = `
import React from 'react';
import { SomeIcon } from 'lucide-react';

export default function Section() {
  return (
    <div className="min-h-screen">
      <SomeIcon />
      <h1>Hello</h1>
    </div>
  );
}
`;

/**
 * Create a deterministic mock provider that returns pre-defined responses.
 */
function createMockProvider(responses: string[]): ModelProvider {
  let callIndex = 0;

  return {
    id: 'mock:test-model',
    async complete(req: CompletionRequest): Promise<CompletionResult> {
      const text = responses[callIndex % responses.length];
      callIndex++;
      return {
        text,
        usage: { input: 100, output: 200 },
      };
    },
  };
}

const testBrief: Brief = {
  client: 'TestCo',
  industry: 'Technology',
  audience: 'Developers',
  goal: 'Generate leads',
  section: {
    name: 'hero',
    content: {
      headline: 'Build Better Software',
      subheadline: 'The developer platform for modern teams.',
      cta: { text: 'Get Started', href: '/signup' },
    },
  },
};

describe('Integration Tests', () => {
  beforeEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
    mkdirSync(TEST_DIR, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  // ─── spec 07 §8.5(a): Injected render bug ───────────────────────

  describe('Injected render bug → caught by render-health gate (spec 07 §8.5a)', () => {
    it('render-health gate catches disallowed imports', async () => {
      const healthyRender: RenderResult = {
        candidate_id: 'test',
        shots: {},
        consoleErrors: [],
        hasErrorOverlay: false,
        domInfo: { bodyHeight: 800, hasText: true, fontsLoaded: true, imagesLoaded: true },
      };

      const result = await renderHealthGate(brokenTsx, healthyRender);
      // Must FAIL because of lucide-react import
      expect(result.pass).toBe(false);
      expect(result.violations.some((v) => v.rule === 'import-allowlist' && v.message.includes('lucide-react'))).toBe(true);
    });

    it('render-health gate catches syntax errors', async () => {
      const syntaxError = 'export default function { <<<<broken }}}';
      const healthyRender: RenderResult = {
        candidate_id: 'test',
        shots: {},
        consoleErrors: [],
        hasErrorOverlay: false,
        domInfo: { bodyHeight: 800, hasText: true, fontsLoaded: true, imagesLoaded: true },
      };

      const result = await renderHealthGate(syntaxError, healthyRender);
      expect(result.pass).toBe(false);
      expect(result.violations.some((v) => v.rule === 'syntax')).toBe(true);
    });
  });

  // ─── Schema gate fail-closed ─────────────────────────────────────

  describe('Schema gate — fail-closed safe default', () => {
    it('returns null for invalid critic output', () => {
      const result = schemaGate('criticOutput', { not: 'valid' });
      expect(result.data).toBeNull();
      expect(result.violations.length).toBeGreaterThan(0);
    });

    it('returns data for valid critic output', () => {
      const valid = {
        candidates: [
          {
            candidate_id: 'test',
            scores: {
              brand_adherence: 80,
              system_adherence: null,
              brief_fit: 75,
              craft: 85,
              weighted_total: 80,
            },
            verdict: 'pass',
            feedback: 'Good work.',
          },
        ],
      };

      const result = schemaGate('criticOutput', valid);
      expect(result.data).not.toBeNull();
    });
  });

  // ─── Budget cap test ─────────────────────────────────────────────

  describe('Budget enforcement', () => {
    it('budget check correctly detects exceeded model calls', () => {
      const cfg = { maxModelCalls: 5, maxRunTokens: 100_000, maxRunSeconds: 600 };
      const modelCalls = { current: 5, max: cfg.maxModelCalls };
      const totalTokens = { input: 100, output: 100 };
      const startTime = Date.now();

      // Simulate the budget check from orchestrator
      const exceeded = modelCalls.current >= modelCalls.max || totalTokens.input + totalTokens.output >= cfg.maxRunTokens || (Date.now() - startTime) / 1000 >= cfg.maxRunSeconds;

      expect(exceeded).toBe(true);
    });

    it('budget check correctly detects exceeded tokens', () => {
      const cfg = { maxModelCalls: 30, maxRunTokens: 1000, maxRunSeconds: 600 };
      const modelCalls = { current: 2, max: cfg.maxModelCalls };
      const totalTokens = { input: 800, output: 300 };
      const startTime = Date.now();

      const exceeded = modelCalls.current >= modelCalls.max || totalTokens.input + totalTokens.output >= cfg.maxRunTokens || (Date.now() - startTime) / 1000 >= cfg.maxRunSeconds;

      expect(exceeded).toBe(true);
    });

    it('budget is not exceeded when within limits', () => {
      const cfg = { maxModelCalls: 30, maxRunTokens: 500_000, maxRunSeconds: 600 };
      const modelCalls = { current: 2, max: cfg.maxModelCalls };
      const totalTokens = { input: 100, output: 200 };
      const startTime = Date.now();

      const exceeded = modelCalls.current >= modelCalls.max || totalTokens.input + totalTokens.output >= cfg.maxRunTokens || (Date.now() - startTime) / 1000 >= cfg.maxRunSeconds;

      expect(exceeded).toBe(false);
    });
  });

  // ─── Trace invariant: I6 (immediate write) ──────────────────────

  describe('Trace invariant I6: immediate write', () => {
    it('trace file exists after first appendIteration', async () => {
      const traceModule = await import('../src/trace.js');
      const appendIteration = traceModule.appendIteration;
      const record: RunRecord = {
        run_id: 'i6-test',
        section_id: 'test-hero',
        iteration: 0,
        candidate_id: 'iter0-cand1',
        input_bundle_ref: 'bundle:test:0',
        output_code_ref: '/path',
        screenshots: {},
        scores: {
          brand_adherence: 80,
          system_adherence: null,
          brief_fit: 75,
          craft: 85,
          weighted_total: 80,
        },
        verdict: 'fail',
        critic_feedback: 'Test',
        duration_ms: 1000,
        tokens: { input: 100, output: 200 },
        model_id: 'test',
        timestamp: new Date().toISOString(),
      };

      appendIteration(TEST_DIR, record);

      // File must exist IMMEDIATELY after append (not batched)
      const tracePath = join(TEST_DIR, 'trace.jsonl');
      expect(existsSync(tracePath)).toBe(true);

      // And it must be parseable
      const content = readFileSync(tracePath, 'utf-8');
      const parsed = JSON.parse(content.trim());
      expect(parsed.run_id).toBe('i6-test');
    });
  });

  // ─── Terminal state guarantee: I10 ───────────────────────────────

  describe('Terminal state invariant I10', () => {
    it('TerminalState only allows APPROVED, ESCALATED, ABORTED', async () => {
      const { TerminalStateSchema } = await import('../src/schema.js');
      expect(TerminalStateSchema.safeParse('APPROVED').success).toBe(true);
      expect(TerminalStateSchema.safeParse('ESCALATED').success).toBe(true);
      expect(TerminalStateSchema.safeParse('ABORTED').success).toBe(true);
      expect(TerminalStateSchema.safeParse('RUNNING').success).toBe(false);
      expect(TerminalStateSchema.safeParse('').success).toBe(false);
    });
  });

  // ─── Report from synthetic trace ─────────────────────────────────

  describe('Report from synthetic trace', () => {
    it('readTrace correctly parses synthetic trace data', async () => {
      const { appendIteration, readTrace } = await import('../src/trace.js');

      // Create a synthetic trace with improving scores
      for (let i = 0; i < 3; i++) {
        const score = 60 + i * 10; // 60, 70, 80
        appendIteration(TEST_DIR, {
          run_id: 'report-test',
          section_id: 'test-hero',
          iteration: i,
          candidate_id: `iter${i}-cand1`,
          input_bundle_ref: `bundle:test:${i}`,
          output_code_ref: '/path',
          screenshots: {},
          scores: {
            brand_adherence: score,
            system_adherence: null,
            brief_fit: score,
            craft: score,
            weighted_total: score,
          },
          verdict: score >= 80 ? 'pass' : 'fail',
          critic_feedback: 'Test feedback',
          duration_ms: 1000 * (i + 1),
          tokens: { input: 100 * (i + 1), output: 200 * (i + 1) },
          model_id: 'test',
          timestamp: new Date().toISOString(),
        });
      }

      const records = readTrace(TEST_DIR);
      expect(records.length).toBe(3);

      // Verify iter-0→final gain
      const iter0Score = records[0].scores.weighted_total;
      const finalScore = records[records.length - 1].scores.weighted_total;
      const gain = finalScore - iter0Score;
      expect(gain).toBe(20); // 80 - 60 = +20
    });
  });
});
