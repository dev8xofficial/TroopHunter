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
import type { RenderResult } from './schema.js';
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
  let hasErrorOverlay = false;
  let domInfo: RenderResult['domInfo'] = undefined;

  // 4. For each breakpoint, screenshot
  for (const width of breakpoints) {
    const page = await browser.newPage();

    try {
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
          return {
            bodyHeight: body.scrollHeight,
            hasText: (body.innerText?.trim().length ?? 0) > 10,
            fontsLoaded: document.fonts.status === 'loaded',
            imagesLoaded: Array.from(document.images).every(img => img.complete && img.naturalHeight > 0),
          };
        });
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
    }
  }

  return {
    candidate_id: candidateId,
    shots,
    consoleErrors,
    hasErrorOverlay,
    domInfo,
  };
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
  if (viteProcess && !viteProcess.killed) {
    viteProcess.kill();
    viteProcess = null;
  }
  viteReady = false;
}
