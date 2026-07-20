/**
 * ADE — Eyes (render → screenshot)
 *
 * Mount .tsx in harness → render → screenshot at breakpoints.
 * Sequential rendering per candidate in Phase 0.
 * Per-candidate nonce prevents stale screenshots (F-EYE-02).
 *
 * @module eyes
 */

import { chromium, type Browser, type Page } from 'playwright';
import { writeFileSync, unlinkSync, renameSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { spawn, type ChildProcess } from 'child_process';
import type { RenderResult, Violation } from './schema.js';
import type { Config } from './config.js';

// Module-level state (reused across candidates)
let browser: Browser | null = null;
let viteProcess: ChildProcess | null = null;
let viteReady = false;

const HARNESS_DIR = resolve(import.meta.dirname, '..', 'harness');
const CANDIDATE_PATH = join(HARNESS_DIR, 'src', 'candidate', 'Section.tsx');

/**
 * Render a candidate .tsx and capture screenshots at all breakpoints.
 */
export async function render(
  tsx: string,
  candidateId: string,
  breakpoints: number[],
  config: Config,
  outDir: string,
  pageCheck?: (page: Page, width: number) => Promise<Violation[]>,
): Promise<RenderResult> {
  // 1. Write tsx to harness/src/candidate/Section.tsx (atomic)
  writeCandidateFile(tsx);

  // 2. Ensure Vite dev server is up
  await ensureViteServer(config);

  // 3. Ensure browser is up
  if (!browser) {
    browser = await chromium.launch({
      headless: !config.headed,
    });
  }

  const harnessUrl = `http://localhost:${config.harnessPort}`;
  const shots: Record<string, string> = {};
  const consoleErrors: string[] = [];
  const hardViolations: Violation[] = [];
  let hasErrorOverlay = false;
  let domInfo: RenderResult['domInfo'] = undefined;

  // 4. For each breakpoint, screenshot
  for (const width of breakpoints) {
    // Explicit context (not the implicit default from browser.newPage()):
    // @axe-core/playwright cannot introspect the implicit default context —
    // confirmed live, it throws "Please use browser.newContext()" and the
    // a11y hard-constraint gate (F-QF-01) silently no-ops on every candidate.
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Egress Deny (C0.4 baseline + C4.0 hardening).
      //
      // C4.0 fix: the prior check used url.startsWith('http://localhost'),
      // a STRING PREFIX match — http://localhost.attacker.com also starts
      // with that prefix and would have been allowed through, defeating the
      // whole sandbox (confirmed live). Fixed by parsing the actual hostname
      // and comparing it exactly, plus an explicit private-range/cloud-
      // metadata denylist so the intent (deny SSRF targets) is deliberate,
      // not an accidental side effect of an allowlist-only policy.
      await page.route('**/*', route => {
        const url = route.request().url();
        if (isAllowedRenderUrl(url)) {
          route.continue();
        } else {
          hardViolations.push({
            gate: 'render-health',
            rule: 'zero-egress',
            message: `External resource requested: ${url}`,
            severity: 'critical',
            fixable: true
          });
          route.abort();
        }
      });

      // Capture console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', err => {
        consoleErrors.push(err.message);
      });

      // Set viewport
      await page.setViewportSize({ width, height: 900 });

      // Full navigation (not HMR — more deterministic)
      await page.goto(`${harnessUrl}?cid=${candidateId}`, {
        waitUntil: 'networkidle',
        timeout: 30_000,
      });

      // Wait for the per-candidate nonce (F-EYE-02)
      try {
        await page.waitForFunction(
          (expectedId: string) => {
            return (window as unknown as Record<string, string>).__ADE_READY_ID__ === expectedId;
          },
          candidateId,
          { timeout: 15_000 },
        );
      } catch {
        // If nonce never set, the render may have failed
        consoleErrors.push(`Ready nonce not set for candidate ${candidateId} at ${width}px`);
      }

      // Wait for fonts
      await page.evaluate(() => document.fonts.ready);

      // Wait one animation frame for layout settle
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));

      // Small extra settle time
      await page.waitForTimeout(500);

      // Check for Vite error overlay
      const errorOverlay = await page.$('vite-error-overlay');
      if (errorOverlay) {
        hasErrorOverlay = true;
        const errorText = await errorOverlay.textContent();
        if (errorText) {
          consoleErrors.push(`Vite error overlay: ${errorText.slice(0, 500)}`);
        }
      }

      // Capture DOM info (for render-health gate) — only on first breakpoint
      if (width === breakpoints[0]) {
        domInfo = await page.evaluate(() => {
          const body = document.body;

          // ── M17/E1.5: real, deterministic DOM craft metrics ──────────
          // Advisory only (never gating at introduction — plan C1.7 note).
          // No PDS exists in Phase 0, so "conformance to token scale" is
          // undefined; instead we measure internal CONSISTENCY, which is
          // honestly computable without a design system and is still a
          // real, useful signal (a section using 7 distinct spacing values
          // vs. 2 is measurably less disciplined either way).
          const els = Array.from(body.querySelectorAll<HTMLElement>('*')).filter(el => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
          });

          // Spacing consistency: distinct margin/padding px values used, as a
          // fraction of total spacing declarations (fewer distinct values = more disciplined).
          const spacingValues = new Set<number>();
          let spacingDeclCount = 0;
          for (const el of els) {
            const cs = getComputedStyle(el);
            for (const prop of ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'] as const) {
              const v = parseFloat(cs[prop]);
              if (v > 0) {
                spacingValues.add(Math.round(v));
                spacingDeclCount++;
              }
            }
          }
          const spacingConformance = spacingDeclCount > 0
            ? Math.max(0, 1 - (spacingValues.size / spacingDeclCount))
            : 1;

          // Type-scale consistency: distinct font-size values used, as a
          // fraction of elements with visible text.
          const fontSizes = new Set<number>();
          const textEls = els.filter(el => (el.innerText ?? '').trim().length > 0
            && Array.from(el.children).every(c => (c as HTMLElement).innerText?.trim() !== el.innerText?.trim()));
          for (const el of textEls) {
            fontSizes.add(Math.round(parseFloat(getComputedStyle(el).fontSize)));
          }
          const typeScaleConformance = textEls.length > 0
            ? Math.max(0, 1 - (fontSizes.size / textEls.length))
            : 1;

          // Alignment regularity: how tightly the left edges of top-level
          // block children cluster into shared columns (fewer distinct
          // left-edge x-coordinates among direct children = a stronger grid).
          const topLevel = Array.from(body.children) as HTMLElement[];
          const leftEdges = new Set<number>();
          for (const el of topLevel) {
            const r = el.getBoundingClientRect();
            if (r.width > 0) leftEdges.add(Math.round(r.left / 4) * 4); // 4px bucket tolerance
          }
          const alignmentRegularity = topLevel.length > 0
            ? Math.max(0, 1 - ((leftEdges.size - 1) / topLevel.length))
            : 1;

          // Tap-target geometry: fraction of interactive elements meeting
          // the 44x44px minimum (WCAG 2.5.5 AAA / 2.5.8 AA-adjacent floor).
          const interactive = Array.from(body.querySelectorAll<HTMLElement>('a, button, [role="button"], input, select, textarea'));
          const tapTargetGeometry = interactive.length > 0
            ? interactive.filter(el => {
              const r = el.getBoundingClientRect();
              return r.width >= 44 && r.height >= 44;
            }).length / interactive.length
            : 1;

          const craftMetrics = {
            spacingConformance,
            alignmentRegularity,
            tapTargetGeometry,
            typeScaleConformance,
          };

          // Actually-rendered font families (M6 / C0.8 CAVEATS): the harness
          // never loads brand fonts (no @font-face/self-hosting exists yet —
          // a real gap, see C0.8 reconciliation note), so a declared family
          // like "Canela" silently falls through the CSS font stack to
          // whatever the browser can resolve. Downstream code (prompts.ts)
          // diffs this against the brief's declared families to tell the
          // Critic which typeface it is ACTUALLY looking at, so it judges
          // type scale/weight/hierarchy honestly instead of grading letterforms
          // that were never rendered.
          const renderedFontFamilies = [...new Set(
            textEls.map(el => getComputedStyle(el).fontFamily),
          )];

          return {
            bodyHeight: body.scrollHeight,
            hasText: (body.innerText?.trim().length ?? 0) > 10,
            fontsLoaded: document.fonts.status === 'loaded',
            imagesLoaded: Array.from(document.images).every(img => img.complete && img.naturalHeight > 0),
            craftMetrics,
            renderedFontFamilies,
          };
        });
      }

      if (pageCheck) {
        try {
          hardViolations.push(...await pageCheck(page, width));
        } catch (err) {
          hardViolations.push({
            gate: 'hard-constraint',
            rule: 'page-check-error',
            message: `Hard constraint page check failed: ${err instanceof Error ? err.message : String(err)}`,
            severity: 'serious',
            fixable: true,
          });
        }
      }

      // Screenshot
      const shotDir = join(outDir, 'shots');
      if (!existsSync(shotDir)) {
        mkdirSync(shotDir, { recursive: true });
      }
      const shotPath = join(shotDir, `${width}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      shots[String(width)] = shotPath;
    } finally {
      await page.close();
      await context.close();
    }
  }

  return {
    candidate_id: candidateId,
    shots,
    consoleErrors,
    hasErrorOverlay,
    hardViolations: dedupeViolations(hardViolations),
    domInfo,
  };
}

/**
 * C4.0/C0.4: is this URL allowed to be fetched from inside the render
 * sandbox? Uses actual hostname parsing (never string-prefix matching —
 * `startsWith('http://localhost')` is bypassable via
 * `http://localhost.attacker.com`, confirmed live). Denies private IP
 * ranges and the cloud-metadata endpoint explicitly, in addition to only
 * allowing the exact harness host.
 */
function isAllowedRenderUrl(url: string): boolean {
  if (url.startsWith('data:')) return true;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false; // unparseable URL — deny by default
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return false;
  }

  const hostname = parsed.hostname;

  // Explicit deny: cloud metadata endpoints (AWS/GCP/Azure all use this IP).
  if (hostname === '169.254.169.254') return false;

  // Explicit deny: private/link-local IP ranges (SSRF targets), even though
  // the exact-hostname allowlist below would already exclude them — this
  // makes the intent explicit rather than incidental.
  if (
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname) ||
    /^169\.254\./.test(hostname) ||
    hostname === '0.0.0.0'
  ) {
    return false;
  }

  // Allow only the exact harness host (never a prefix/substring match).
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function dedupeViolations(violations: Violation[]): Violation[] {
  const seen = new Set<string>();
  return violations.filter(violation => {
    const key = `${violation.gate}:${violation.rule}:${violation.message}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Write candidate file atomically (temp + rename).
 * On Windows: unlink then rename if target exists.
 */
function writeCandidateFile(tsx: string): void {
  const dir = dirname(CANDIDATE_PATH);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const tempPath = CANDIDATE_PATH + '.tmp';
  writeFileSync(tempPath, tsx, 'utf-8');

  // Windows: unlink existing before rename
  if (existsSync(CANDIDATE_PATH)) {
    try {
      unlinkSync(CANDIDATE_PATH);
    } catch {
      // Ignore if already gone
    }
  }

  renameSync(tempPath, CANDIDATE_PATH);
}

/**
 * Ensure the Vite dev server is running.
 * Spawns once, reuses across candidates.
 */
async function ensureViteServer(config: Config): Promise<void> {
  if (viteReady && viteProcess && !viteProcess.killed) {
    return;
  }

  return new Promise<void>((resolvePromise, reject) => {
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    viteProcess = spawn(npmCmd, ['run', 'dev', '--', '--port', String(config.harnessPort)], {
      cwd: HARNESS_DIR,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    const timeout = setTimeout(() => {
      reject(new Error('Vite dev server failed to start within 30s'));
    }, 30_000);

    viteProcess.stdout?.on('data', (data: Buffer) => {
      const text = data.toString();
      if (text.includes('Local:') || text.includes('ready in') || text.includes('localhost')) {
        clearTimeout(timeout);
        viteReady = true;
        resolvePromise();
      }
    });

    viteProcess.stderr?.on('data', (data: Buffer) => {
      const text = data.toString();
      // Vite sometimes outputs to stderr
      if (text.includes('Local:') || text.includes('ready in')) {
        clearTimeout(timeout);
        viteReady = true;
        resolvePromise();
      }
    });

    viteProcess.on('error', err => {
      clearTimeout(timeout);
      reject(new Error(`Failed to start Vite: ${err.message}`));
    });

    viteProcess.on('exit', code => {
      if (!viteReady) {
        clearTimeout(timeout);
        reject(new Error(`Vite exited with code ${code} before ready`));
      }
    });
  });
}

/**
 * Copy brief assets to the harness public directory.
 * Rewrites paths so hero_image / logo_ref actually load (F-INP-05).
 */
export function copyAssetsToHarness(
  assets: Record<string, string>,
  briefDir: string,
): Record<string, string> {
  const publicDir = join(HARNESS_DIR, 'public', 'assets');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  const rewritten: Record<string, string> = {};
  for (const [key, assetPath] of Object.entries(assets)) {
    const sourcePath = resolve(briefDir, assetPath);
    if (existsSync(sourcePath)) {
      const filename = assetPath.split('/').pop() ?? assetPath;
      const destPath = join(publicDir, filename);
      copyFileSync(sourcePath, destPath);
      rewritten[key] = `/assets/${filename}`;
    } else {
      console.warn(`⚠ Asset not found: ${sourcePath} (key: ${key})`);
      rewritten[key] = assetPath; // Keep original, will fail at input gate
    }
  }
  return rewritten;
}

/**
 * Clean up browser and Vite process.
 */
export async function cleanup(): Promise<void> {
  if (browser) {
    await browser.close().catch(() => {});
    browser = null;
  }
  if (viteProcess && !viteProcess.killed && viteProcess.pid) {
    await killProcessTree(viteProcess.pid);
    viteProcess = null;
  }
  viteReady = false;
}

/**
 * Kill a process and its full descendant tree.
 *
 * ensureViteServer spawns with { shell: true } so the tracked PID is the
 * shell (cmd.exe on Windows), not `npm run dev` → `vite` → `esbuild.exe`
 * underneath it. A plain ChildProcess.kill() only signals the shell and
 * leaves the real dev server (and its port binding) orphaned — confirmed
 * live: a bare .kill() left a real Vite process still LISTENING on the
 * harness port after cleanup() returned. taskkill /T kills the whole tree.
 */
async function killProcessTree(pid: number): Promise<void> {
  if (process.platform === 'win32') {
    await new Promise<void>(resolvePromise => {
      const killer = spawn('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' });
      killer.on('exit', () => resolvePromise());
      killer.on('error', () => resolvePromise()); // best-effort — process may already be gone
    });
  } else {
    try {
      process.kill(-pid, 'SIGKILL'); // negative pid = the process group, if detached
    } catch {
      try { process.kill(pid, 'SIGKILL'); } catch { /* already gone */ }
    }
  }
}
