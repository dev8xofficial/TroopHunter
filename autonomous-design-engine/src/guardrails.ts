/**
 * ADE — Guardrails (deterministic gates)
 *
 * No model calls (spec 11 §2.1). Gates:
 * - inputGate: validate brief + brand-data
 * - renderHealthGate: syntax check + render validation
 * - hardConstraintGate: a11y, responsive, content, color allowlist
 * - schemaGate: validate structured LLM output
 * - tokenAllowlistGate: (Phase 1) enforce frozen PDS tokens
 *
 * Each gate returns { pass: boolean; violations: Violation[] }
 *
 * @module guardrails
 */

import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { transform } from 'esbuild';
import type { Page } from 'playwright';
import type {
  Brief,
  BrandData,
  RenderResult,
  GateResult,
  Violation,
  ProjectDesignSystem,
} from './schema.js';
import { BriefSchema, BrandDataSchema, validate } from './schema.js';

// ─── Input Gate (spec 11 §2.1) ─────────────────────────────────────

/**
 * Validate brief and brand-data before any generation spend.
 * Fails → precise error, exit before spend.
 */
export function inputGate(brief: unknown, brandData?: unknown, briefPath?: string): GateResult {
  const violations: Violation[] = [];

  // 1. Schema validation
  const briefResult = BriefSchema.safeParse(brief);
  if (!briefResult.success) {
    for (const issue of briefResult.error.issues) {
      violations.push({
        gate: 'input',
        rule: 'schema',
        message: `Brief: ${issue.path.join('.')}: ${issue.message}`,
        severity: 'critical',
        fixable: true,
      });
    }
    return { pass: false, violations };
  }

  const validBrief = briefResult.data;

  // 2. Brand-data validation (if provided)
  if (brandData !== undefined) {
    const brandResult = BrandDataSchema.safeParse(brandData);
    if (!brandResult.success) {
      for (const issue of brandResult.error.issues) {
        violations.push({
          gate: 'input',
          rule: 'schema',
          message: `BrandData: ${issue.path.join('.')}: ${issue.message}`,
          severity: 'critical',
          fixable: true,
        });
      }
    }
  }

  // 3. Contradiction check (F-INP-03)
  const contradictions = detectContradictions(validBrief);
  for (const c of contradictions) {
    violations.push({
      gate: 'input',
      rule: 'contradiction',
      message: c,
      severity: 'moderate',
      fixable: true,
    });
  }

  // 4. Assets exist on disk (F-INP-05)
  if (validBrief.section.assets && briefPath) {
    const briefDir = dirname(resolve(briefPath));
    for (const [key, assetPath] of Object.entries(validBrief.section.assets)) {
      const fullPath = resolve(briefDir, assetPath);
      if (!existsSync(fullPath)) {
        violations.push({
          gate: 'input',
          rule: 'asset-exists',
          message: `Asset "${key}" not found: ${fullPath}`,
          severity: 'serious',
          fixable: true,
        });
      }
    }
  }

  // 5. Content sanitization check (I9 — brief-as-data, not instructions)
  const injectionPatterns = [
    /ignore\s+(all\s+)?previous/i,
    /disregard\s+(all\s+)?instructions/i,
    /you\s+are\s+now/i,
    /system\s*:\s*/i,
    /\<\s*script/i,
  ];

  const allContent = JSON.stringify(validBrief);
  for (const pattern of injectionPatterns) {
    if (pattern.test(allContent)) {
      violations.push({
        gate: 'input',
        rule: 'injection-safety',
        message: `Brief content contains suspicious pattern: ${pattern.source}`,
        severity: 'serious',
        fixable: true,
      });
    }
  }

  return {
    pass: violations.filter(v => v.severity === 'critical' || v.severity === 'serious').length === 0,
    violations,
  };
}

// ─── Render Health Gate (spec 11 §2.1) ─────────────────────────────

/**
 * Check render health before critique (I11).
 * Pre-render: esbuild syntax check + import allowlist.
 * Post-render: non-blank DOM, no error overlay, fonts/images loaded.
 */
export async function renderHealthGate(
  tsx: string,
  renderResult: RenderResult,
): Promise<GateResult> {
  const violations: Violation[] = [];

  // --- Pre-render checks ---

  // 1. esbuild syntax check (fast, no type-check)
  try {
    await transform(tsx, {
      loader: 'tsx',
      jsx: 'automatic',
      format: 'esm',
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    violations.push({
      gate: 'render-health',
      rule: 'syntax',
      message: `Syntax error: ${msg.slice(0, 500)}`,
      severity: 'critical',
      fixable: true,
    });
  }

  // 2. Import allowlist lint (reject imports outside react — F-GEN-04)
  const importViolations = checkImportAllowlist(tsx);
  violations.push(...importViolations);

  // --- Post-render checks ---

  // 3. No error overlay
  if (renderResult.hasErrorOverlay) {
    violations.push({
      gate: 'render-health',
      rule: 'error-overlay',
      message: `Vite error overlay detected. Console errors: ${renderResult.consoleErrors.slice(0, 3).join('; ')}`,
      severity: 'critical',
      fixable: true,
    });
  }

  // 4. Non-blank DOM (body height + text)
  if (renderResult.domInfo) {
    if (renderResult.domInfo.bodyHeight < 50) {
      violations.push({
        gate: 'render-health',
        rule: 'non-blank',
        message: `Body height too small (${renderResult.domInfo.bodyHeight}px) — possibly blank render`,
        severity: 'critical',
        fixable: true,
      });
    }
    if (!renderResult.domInfo.hasText) {
      violations.push({
        gate: 'render-health',
        rule: 'has-text',
        message: 'Rendered DOM has no visible text content',
        severity: 'serious',
        fixable: true,
      });
    }
  }

  // 5. Console errors (non-critical but recorded)
  const seriousErrors = renderResult.consoleErrors.filter(
    e => !e.includes('favicon') && !e.includes('HMR') && !e.includes('WebSocket'),
  );
  if (seriousErrors.length > 0 && !renderResult.hasErrorOverlay) {
    violations.push({
      gate: 'render-health',
      rule: 'console-errors',
      message: `Console errors: ${seriousErrors.slice(0, 3).join('; ')}`,
      severity: 'moderate',
      fixable: true,
    });
  }

  return {
    pass: violations.filter(v => v.severity === 'critical').length === 0,
    violations,
  };
}

// ─── Hard Constraint Gate (spec 11 §2.1) ───────────────────────────

/**
 * Hard-constraint checks on a healthy render.
 * a11y, responsive, content-present, no-placeholder, color-allowlist.
 */
export async function hardConstraintGate(
  page: Page,
  brief: Brief,
  brandData?: BrandData,
): Promise<GateResult> {
  const violations: Violation[] = [];

  // 1. a11y audit (@axe-core/playwright) — serious/critical only
  try {
    const { AxeBuilder } = await import('@axe-core/playwright');
    const axeResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const seriousViolations = axeResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious',
    );

    for (const v of seriousViolations) {
      violations.push({
        gate: 'hard-constraint',
        rule: `a11y:${v.id}`,
        message: `${v.impact}: ${v.description} (${v.nodes.length} instance${v.nodes.length > 1 ? 's' : ''})`,
        severity: v.impact === 'critical' ? 'critical' : 'serious',
        fixable: true,
      });
    }
  } catch (err) {
    // If axe fails, record but don't block (the tool itself shouldn't be a gate)
    console.warn('⚠ axe-core analysis failed:', err instanceof Error ? err.message : err);
  }

  // 2. Responsive overflow at 375px
  const overflowResult = await page.evaluate(() => {
    const body = document.body;
    return {
      scrollWidth: body.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });

  const epsilon = 5; // px tolerance
  if (overflowResult.scrollWidth > overflowResult.clientWidth + epsilon) {
    violations.push({
      gate: 'hard-constraint',
      rule: 'responsive-overflow',
      message: `Horizontal overflow: scrollWidth=${overflowResult.scrollWidth}px > clientWidth=${overflowResult.clientWidth}px`,
      severity: 'serious',
      fixable: true,
    });
  }

  // 3. Content-present: every brief string appears in DOM
  const contentStrings = extractContentStrings(brief);
  const pageText = await page.evaluate(() => document.body.innerText ?? '');
  const pageLower = pageText.toLowerCase();

  for (const content of contentStrings) {
    if (content.length < 3) continue; // Skip tiny strings
    if (!pageLower.includes(content.toLowerCase())) {
      violations.push({
        gate: 'hard-constraint',
        rule: 'content-present',
        message: `Brief content missing from rendered output: "${content.slice(0, 80)}"`,
        severity: 'moderate',
        fixable: true,
      });
    }
  }

  // 4. No-placeholder check
  const placeholderPatterns = [
    /lorem\s+ipsum/i,
    /\bTODO\b/,
    /\bFIXME\b/,
    /coming\s+soon/i,
    /placeholder/i,
    /\{\{[^}]+\}\}/,
    /\[insert/i,
    /sample\s+text/i,
  ];

  for (const pattern of placeholderPatterns) {
    if (pattern.test(pageText)) {
      violations.push({
        gate: 'hard-constraint',
        rule: 'no-placeholder',
        message: `Placeholder text detected: matches ${pattern.source}`,
        severity: 'serious',
        fixable: true,
      });
    }
  }

  // 5. Color allowlist (when brand-data supplied)
  if (brandData) {
    const colorViolations = await checkColorAllowlist(page, brandData);
    violations.push(...colorViolations);
  }

  return {
    pass: violations.filter(v => v.severity === 'critical' || v.severity === 'serious').length === 0,
    violations,
  };
}

// ─── Schema Gate (spec 11 §2.1) ───────────────────────────────────

/**
 * Validate structured LLM output against a named schema.
 * Returns the parsed data or null (fail-closed).
 */
export function schemaGate<T>(schemaName: string, raw: unknown): { data: T | null; violations: Violation[] } {
  const result = validate<T>(schemaName, raw);
  if (result.success) {
    return { data: result.data, violations: [] };
  }

  return {
    data: null,
    violations: [{
      gate: 'schema',
      rule: schemaName,
      message: `Schema validation failed: ${result.error}`,
      severity: 'serious',
      fixable: true,
    }],
  };
}

// ─── Helpers ───────────────────────────────────────────────────────

function detectContradictions(brief: Brief): string[] {
  const contradictions: string[] = [];
  const goal = brief.goal.toLowerCase();
  const audience = brief.audience.toLowerCase();

  // Check for conflicting signals
  const conflicts: [string, string, string][] = [
    ['luxury', 'budget', 'Brand signals both luxury and budget positioning'],
    ['minimal', 'feature-dense', 'Design asks for both minimal and feature-dense'],
    ['urgency', 'confidence', 'Goal signals both urgency and confidence (pick one)'],
    ['playful', 'corporate', 'Tone is both playful and corporate'],
  ];

  const text = `${goal} ${audience} ${brief.industry}`.toLowerCase();
  for (const [a, b, msg] of conflicts) {
    if (text.includes(a) && text.includes(b)) {
      contradictions.push(msg);
    }
  }

  return contradictions;
}

function checkImportAllowlist(tsx: string): Violation[] {
  const violations: Violation[] = [];

  // Match import statements
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s*,?\s*)*\s*from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(tsx)) !== null) {
    const source = match[1];
    // Allow only 'react' imports
    if (source !== 'react' && !source.startsWith('react/')) {
      violations.push({
        gate: 'render-health',
        rule: 'import-allowlist',
        message: `Disallowed import: "${source}" — only "react" imports are allowed (F-GEN-04)`,
        severity: 'critical',
        fixable: true,
      });
    }
  }

  // Also check require() calls
  const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((match = requireRegex.exec(tsx)) !== null) {
    const source = match[1];
    if (source !== 'react') {
      violations.push({
        gate: 'render-health',
        rule: 'import-allowlist',
        message: `Disallowed require: "${source}" — only "react" is allowed`,
        severity: 'critical',
        fixable: true,
      });
    }
  }

  return violations;
}

function extractContentStrings(brief: Brief): string[] {
  const strings: string[] = [];
  const content = brief.section.content;

  if (content.headline) strings.push(content.headline);
  if (content.subheadline) strings.push(content.subheadline);
  if (content.cta?.text) strings.push(content.cta.text);
  if (content.body) strings.push(content.body);
  if (content.tags) {
    for (const tag of content.tags) {
      if (typeof tag === 'string') strings.push(tag);
    }
  }
  if (content.nav) {
    for (const item of content.nav) {
      if (typeof item === 'string') strings.push(item);
    }
  }

  return strings;
}

/**
 * Color allowlist check — sampled tolerance, not strict subset.
 * Checks color/background-color/border-color on rendered nodes.
 * Allows transparent, currentColor, inherit, and a neutral ramp.
 */
async function checkColorAllowlist(page: Page, brandData: BrandData): Promise<Violation[]> {
  const violations: Violation[] = [];
  const allowedHexes = new Set(brandData.palette.map(p => p.value.toLowerCase()));

  // Add neutral ramp (always allowed)
  const neutrals = [
    '#ffffff', '#fff', '#000000', '#000',
    '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db',
    '#9ca3af', '#6b7280', '#4b5563', '#374151',
    '#1f2937', '#111827', '#030712',
  ];
  for (const n of neutrals) {
    allowedHexes.add(n);
  }

  try {
    const sampledColors = await page.evaluate(() => {
      const colors = new Set<string>();
      const elements = document.querySelectorAll('*');
      // Sample up to 50 elements
      const step = Math.max(1, Math.floor(elements.length / 50));

      for (let i = 0; i < elements.length; i += step) {
        const el = elements[i];
        const style = window.getComputedStyle(el);
        const props = ['color', 'backgroundColor', 'borderColor'];
        for (const prop of props) {
          const value = style.getPropertyValue(
            prop.replace(/([A-Z])/g, '-$1').toLowerCase(),
          );
          if (value && value !== 'transparent' && value !== 'inherit' &&
              value !== 'currentcolor' && value !== 'currentColor' &&
              !value.startsWith('rgba(0, 0, 0, 0)')) {
            colors.add(value);
          }
        }
      }
      return Array.from(colors);
    });

    // Convert RGB values to hex and check against allowlist
    for (const color of sampledColors) {
      const hex = rgbToHex(color);
      if (hex && !isColorAllowed(hex, allowedHexes)) {
        violations.push({
          gate: 'hard-constraint',
          rule: 'color-allowlist',
          message: `Off-palette color detected: ${color} (${hex})`,
          severity: 'moderate',
          fixable: true,
        });
      }
    }
  } catch (err) {
    // Don't block on color check failure
    console.warn('⚠ Color allowlist check failed:', err instanceof Error ? err.message : err);
  }

  return violations;
}

function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  const [, r, g, b] = match;
  return '#' + [r, g, b].map(c => parseInt(c).toString(16).padStart(2, '0')).join('');
}

function isColorAllowed(hex: string, allowedHexes: Set<string>): boolean {
  const normalized = hex.toLowerCase();
  if (allowedHexes.has(normalized)) return true;

  // Check with tolerance (ε = 30 in each channel)
  const epsilon = 30;
  for (const allowed of allowedHexes) {
    if (hexDistance(normalized, allowed) <= epsilon) return true;
  }

  return false;
}

function hexDistance(a: string, b: string): number {
  const parse = (h: string) => {
    const hex = h.replace('#', '');
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  };

  try {
    const ca = parse(a);
    const cb = parse(b);
    return Math.max(Math.abs(ca.r - cb.r), Math.abs(ca.g - cb.g), Math.abs(ca.b - cb.b));
  } catch {
    return 255; // Unknown → not allowed
  }
}

// ─── Token-Allowlist Gate (Phase 1 — spec 11 §2.1) ────────────────

/**
 * Enforce frozen PDS tokens: off-system color/type/space/radius → hard fail.
 * This is the gate that keeps crystallized tokens enforced across sections.
 */
export function tokenAllowlistGate(
  tsx: string,
  pds: ProjectDesignSystem,
): GateResult {
  const violations: Violation[] = [];

  // 1. Color check — hex values in code must be in the PDS color tokens
  const allowedColors = new Set<string>();
  for (const [, value] of Object.entries(pds.tokens.color)) {
    allowedColors.add(value.toLowerCase());
    // Also add short form if applicable
    if (value.length === 7) {
      const short = `#${value[1]}${value[3]}${value[5]}`;
      if (value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
        allowedColors.add(short.toLowerCase());
      }
    }
  }

  // Always allow neutral ramp + transparent
  const neutrals = [
    '#ffffff', '#fff', '#000000', '#000',
    '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db',
    '#9ca3af', '#6b7280', '#4b5563', '#374151',
    '#1f2937', '#111827', '#030712',
    // Tailwind gray ramp extras
    '#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4',
    '#a3a3a3', '#737373', '#525252', '#404040',
    '#262626', '#171717', '#0a0a0a',
  ];
  for (const n of neutrals) {
    allowedColors.add(n);
  }

  // Extract hex colors from code (not from comments)
  const codeWithoutComments = tsx
    .replace(/\/\/.*$/gm, '')        // single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, ''); // block comments

  const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
  let match;
  while ((match = hexPattern.exec(codeWithoutComments)) !== null) {
    const hex = match[0].toLowerCase();
    // Normalize 3-char hex to 6-char
    const normalized = hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;

    if (!allowedColors.has(normalized) && !allowedColors.has(hex)) {
      // Check with tolerance (ε = 15 in each channel — tighter than brand-data check)
      let withinTolerance = false;
      for (const allowed of allowedColors) {
        if (allowed.length >= 7 && normalized.length >= 7) {
          if (hexDistance(normalized, allowed) <= 15) {
            withinTolerance = true;
            break;
          }
        }
      }

      if (!withinTolerance) {
        violations.push({
          gate: 'token-allowlist',
          rule: 'color',
          message: `Off-system color: ${match[0]} is not in the design system tokens`,
          severity: 'serious',
          fixable: true,
        });
      }
    }
  }

  // 2. Tailwind color class check — look for arbitrary color values [#xxx]
  const twArbitraryColor = /\[#[0-9a-fA-F]{3,8}\]/g;
  while ((match = twArbitraryColor.exec(codeWithoutComments)) !== null) {
    const hex = match[0].slice(1, -1).toLowerCase(); // strip [ ]
    const normalized = hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;

    if (!allowedColors.has(normalized) && !allowedColors.has(hex)) {
      violations.push({
        gate: 'token-allowlist',
        rule: 'color-tailwind',
        message: `Off-system Tailwind arbitrary color: ${match[0]} is not in the design system tokens`,
        severity: 'serious',
        fixable: true,
      });
    }
  }

  return {
    pass: violations.filter(v => v.severity === 'critical' || v.severity === 'serious').length === 0,
    violations,
  };
}
