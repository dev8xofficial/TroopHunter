/**
 * ADE Tests — runSiteLoop end-to-end (C1.9 / C1.11)
 *
 * The only test in the suite that drives the FULL multi-section pipeline
 * for real: comprehension gate -> generate -> render (real Chromium + real
 * Vite) -> critique -> crystallize -> whole-artifact QA. Every other Phase 1
 * test exercises these pieces individually with hand-built fixtures; this
 * proves they actually compose end-to-end through runSiteLoop() itself,
 * which nothing else in the suite calls.
 *
 * No real LLM: cfg.provider='local' is pointed at an in-process fake Ollama
 * server (below) that speaks the real POST /api/generate wire format and
 * dispatches on each call's distinguishing system-prompt phrase — the SAME
 * request path createLocalOllamaProvider() uses against a real Ollama
 * install, just answered by a script instead of a model.
 */

import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { createServer, type Server } from 'http';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import { runSiteLoop } from '../src/orchestrator.js';
import { runAblationArm } from '../src/ablation.js';
import { cleanup } from '../src/eyes.js';
import { buildConfig } from '../src/config.js';
import { writeBrand, setProjectsDirForTest } from '../src/store.js';
import { embedLibraryEntry, setLibraryDirForTest, writeLibrary } from '../src/library.js';
import { createLocalHashEmbeddingProvider } from '../src/embeddings.js';
import type { Brief, BrandFoundation, LibraryEntry } from '../src/schema.js';

const TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'site-loop-e2e');
const FAKE_OLLAMA_PORT = 41999;

const heroTsx = `export default function Section() {
  return (
    <section style={{ padding: '24px', background: '#FFFFFF' }}>
      <h1 style={{ color: '#111827', fontSize: '32px' }}>Operate With Clarity</h1>
      <p style={{ color: '#111827' }}>A calmer command center for field teams.</p>
      <a href="/demo" style={{ background: '#2563EB', color: '#FFFFFF', display: 'inline-block', padding: '12px 24px' }}>Book a demo</a>
    </section>
  );
}`;

function ollamaResponse(text: string) {
  return JSON.stringify({ response: text, prompt_eval_count: 50, eval_count: 100 });
}

/**
 * Dispatches on the distinguishing phrase each real prompt builder embeds
 * in its system prompt (prompts.ts / crystallizer.ts / qa.ts) — the same
 * phrases a human reading the source would recognize each stage by.
 */
// E2.2: captures every prompt sent to the Generator stage, so the ablation
// test below can inspect exactly what the model was shown (e.g. whether a
// SOFT LIBRARY MEMORY block reached the prompt) — proof the `arm` parameter
// genuinely changes retrieval behavior, not just that it typechecks.
const capturedGeneratorPrompts: string[] = [];

function scriptedOllamaHandler(prompt: string): string {
  if (prompt.includes('expert product/web designer')) {
    capturedGeneratorPrompts.push(prompt);
  }
  if (prompt.includes('input-comprehension checker')) {
    return ollamaResponse(
      JSON.stringify({
        restated_goal: 'Explain the platform and drive demos',
        restated_audience: 'Operations leaders',
        restated_constraints: [],
        missing_required_facts: [],
        material_mismatches: [],
        confidence: 0.9,
      }),
    );
  }
  if (prompt.includes('expert product/web designer')) {
    return ollamaResponse('```tsx\n' + heroTsx + '\n```');
  }
  if (prompt.includes('senior design critic')) {
    return ollamaResponse(
      JSON.stringify({
        candidates: [
          {
            candidate_id: 'iter0-cand1',
            scores: { brand_adherence: 90, system_adherence: null, brief_fit: 90, craft: 88, weighted_total: 90 },
            verdict: 'pass',
            feedback: 'Clean, on-brief hero section.',
          },
        ],
      }),
    );
  }
  if (prompt.includes('design system extraction tool')) {
    return ollamaResponse(
      JSON.stringify({
        tokens: {
          color: { text: '#111827', background: '#FFFFFF', accent: '#2563EB' },
          type: { display: '32px/1.1 Inter' },
          space: { section: '24px' },
          radius: {},
          shadow: {},
          motion: {},
        },
        components: [{ name: 'cta-button', anatomy: 'Inline link styled as a button', variants: ['primary'], states: ['default'] }],
      }),
    );
  }
  if (prompt.includes('design-systems reviewer')) {
    return ollamaResponse(JSON.stringify({ verdict: 'pass', reasoning: 'Tokens faithfully capture the hero without over-specifying.' }));
  }
  if (prompt.includes('Judge #2')) {
    return ollamaResponse('pass');
  }
  // Unrecognized stage — fail loudly rather than silently returning something plausible-looking.
  throw new Error(`scriptedOllamaHandler: no matching stage for prompt: ${prompt.slice(0, 200)}`);
}

let fakeOllama: Server;

beforeAll(() => {
  fakeOllama = createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body) as { prompt: string };
        const text = scriptedOllamaHandler(parsed.prompt);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(text);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
      }
    });
  });
  return new Promise<void>((resolve) => fakeOllama.listen(FAKE_OLLAMA_PORT, resolve));
});

afterAll(async () => {
  await cleanup();
  await new Promise<void>((resolve) => fakeOllama.close(() => resolve()));
});

afterEach(() => {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });
});

describe('runSiteLoop end-to-end (real browser + real render, scripted local provider)', () => {
  it('sequences a single-section site through comprehension -> generate -> render -> critique -> crystallize -> whole-artifact QA, and the assembled artifact passes', async () => {
    setProjectsDirForTest(TEST_DIR);

    const clientId = 'site-loop-e2e-client';
    const frozenBrand: BrandFoundation = {
      client_id: clientId,
      version: 1,
      status: 'frozen',
      identity: {
        palette: [
          { role: 'text', value: '#111827' },
          { role: 'background', value: '#FFFFFF' },
          { role: 'accent', value: '#2563EB' },
        ],
        typography: [{ role: 'display', family: 'Inter', fallback: 'sans-serif' }],
        motion_voice: 'Calm and functional',
        personality: ['clear', 'reliable'],
        tone: 'Assured',
        semanticColors: [],
        darkMode: { enabled: false },
      },
      provenance: { palette: 'provided', typography: 'provided', motion_voice: 'derived', personality: 'derived', tone: 'derived' },
      approved_by: 'test',
      approved_at: new Date().toISOString(),
    };
    writeBrand(clientId, frozenBrand, null);

    const brief: Brief = {
      client: 'Site Loop E2E Co',
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

    const cfg = {
      ...buildConfig({ provider: 'local', maxIters: 1, variations: 1, threshold: 80 }),
      ollamaBaseUrl: `http://127.0.0.1:${FAKE_OLLAMA_PORT}`,
      breakpoints: [1440],
    };

    const { artifact, results } = await runSiteLoop(cfg, clientId, 'website', [{ name: 'hero', brief, briefPath: 'in-memory-test-brief.json' }]);

    // The section actually ran the full loop and was approved.
    expect(results).toHaveLength(1);
    expect(results[0].state).toBe('APPROVED');

    // Crystallization actually happened as a side effect of the first
    // approved section (C1.5/C1.9) — the artifact carries a real component.
    expect(artifact.sections).toHaveLength(1);
    expect(artifact.sections[0].status).toBe('approved');
    expect(artifact.sections[0].code.component).toContain('Operate With Clarity');

    // Whole-artifact QA (C1.11) genuinely ran and the assembled artifact passed.
    expect(artifact.status).toBe('approved');
  }, 90_000);
});

describe('runAblationArm end-to-end (E2.2 — the `arm` parameter genuinely changes what reaches the Generator)', () => {
  const LIBRARY_TEST_DIR = join(import.meta.dirname, '..', '.test-runs', 'ablation-e2e-library');

  afterEach(() => {
    if (existsSync(LIBRARY_TEST_DIR)) rmSync(LIBRARY_TEST_DIR, { recursive: true, force: true });
    capturedGeneratorPrompts.length = 0;
  });

  it('a "memory-off" run never shows the Generator any Library content; a "text-Library" run for the SAME brief does', async () => {
    setLibraryDirForTest(LIBRARY_TEST_DIR);

    const seededEntry: LibraryEntry = await embedLibraryEntry(
      {
        id: 'pat_ablation_seed',
        type: 'pattern',
        title: 'Operations command-center hero',
        intent: 'Explain the platform and drive demos for operations leaders in technology.',
        context_fit: {
          domain: 'technology',
          audience: 'operations leaders',
          personality: ['clear'],
          goal: 'explain the platform and drive demos',
          feel: ['calm'],
        },
        construction: ['Lead with the calm command-center framing.'],
        rationale: ['Operations buyers respond to clarity over hype.'],
        pairs_with: [],
        avoid: [],
        provenance: ['proj_seed'],
        outcome: { human_verdict: 'approved, strong', confidence: 0.9, times_used: 5 },
        tags: ['hero', 'ops'],
        provisional: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        retired: false,
      },
      createLocalHashEmbeddingProvider(),
    );
    writeLibrary([seededEntry]);

    const brief: Brief = {
      client: 'Ablation E2E Co',
      industry: 'Technology',
      audience: 'Operations leaders',
      goal: 'Explain the platform and drive demos',
      section: {
        name: 'hero',
        content: { headline: 'Operate With Clarity', subheadline: 'A calmer command center for field teams.' },
      },
    };

    const cfg = {
      // embeddingProvider stays 'local-hash' (fast, deterministic, no
      // network) — assertRealEmbeddingModelForAblation's ollama-only
      // requirement is a guard on runThreeArmAblation's SWEEP, not on
      // calling runAblationArm directly, which is all this test needs to
      // prove the wiring.
      ...buildConfig({ provider: 'local', maxIters: 1, variations: 1, threshold: 80 }),
      ollamaBaseUrl: `http://127.0.0.1:${FAKE_OLLAMA_PORT}`,
      breakpoints: [1440],
    };

    capturedGeneratorPrompts.length = 0;
    await runAblationArm(cfg, { brief, briefPath: 'in-memory-ablation-brief.json' }, 'memory-off', join(LIBRARY_TEST_DIR, 'run-memory-off'));
    expect(capturedGeneratorPrompts).toHaveLength(1);
    expect(capturedGeneratorPrompts[0]).not.toContain('SOFT LIBRARY MEMORY');
    expect(capturedGeneratorPrompts[0]).not.toContain('Operations command-center hero');

    capturedGeneratorPrompts.length = 0;
    await runAblationArm(cfg, { brief, briefPath: 'in-memory-ablation-brief.json' }, 'text-Library', join(LIBRARY_TEST_DIR, 'run-text-library'));
    expect(capturedGeneratorPrompts).toHaveLength(1);
    expect(capturedGeneratorPrompts[0]).toContain('SOFT LIBRARY MEMORY');
    expect(capturedGeneratorPrompts[0]).toContain('Operations command-center hero');
  }, 90_000);
});
