import type { Violation } from './schema.js';

export function validateCrossBrowser(engineErrors: Record<'chromium' | 'webkit' | 'firefox', string[]>): Violation[] {
  const violations: Violation[] = [];

  const chromiumErrors = new Set(engineErrors.chromium || []);

  for (const engine of ['webkit', 'firefox'] as const) {
    const errors = engineErrors[engine] || [];
    for (const error of errors) {
      if (!chromiumErrors.has(error)) {
        violations.push({
          gate: 'parity',
          rule: 'cross-browser-divergence',
          message: `${engine} rendering diverged from Chromium: ${error}`,
          severity: 'serious',
          fixable: true,
        });
      }
    }
  }

  return violations;
}

export function validateTailwindPurge(usedClasses: string[], purgedCSS: string): Violation[] {
  const violations: Violation[] = [];

  for (const cls of usedClasses) {
    const escapedCls = cls.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\//g, '\\/');
    if (!purgedCSS.includes(`.${escapedCls}`)) {
      violations.push({
        gate: 'parity',
        rule: 'purge-divergence',
        message: `Class '${cls}' is used in markup but absent from production purged CSS.`,
        severity: 'critical',
        fixable: false,
      });
    }
  }

  return violations;
}

export function validateHydration(ssrHtml: string, clientHtml: string): Violation[] {
  const violations: Violation[] = [];

  if (ssrHtml !== clientHtml) {
    violations.push({
      gate: 'parity',
      rule: 'hydration-mismatch',
      message: 'SSR HTML does not match client-rendered HTML. Suppress warning or fix state.',
      severity: 'serious',
      fixable: false,
    });
  }

  return violations;
}

export function validateSEO(html: string): Violation[] {
  const violations: Violation[] = [];

  if (!html.includes('<title>')) {
    violations.push({
      gate: 'parity',
      rule: 'missing-seo-meta',
      message: 'Missing <title> tag in document head.',
      severity: 'moderate',
      fixable: true,
    });
  }

  if (!html.includes('<meta name="description"')) {
    violations.push({
      gate: 'parity',
      rule: 'missing-seo-meta',
      message: 'Missing <meta name="description" ...> tag in document head.',
      severity: 'moderate',
      fixable: true,
    });
  }

  return violations;
}

export function validateCoreWebVitals(metrics: { bundleSizeKb: number; cls: number }): Violation[] {
  const violations: Violation[] = [];

  if (metrics.bundleSizeKb > 200) {
    violations.push({
      gate: 'parity',
      rule: 'unoptimized-asset',
      message: `Bundle size ${metrics.bundleSizeKb}KB exceeds 200KB limit.`,
      severity: 'serious',
      fixable: false,
    });
  }

  if (metrics.cls > 0.1) {
    violations.push({
      gate: 'parity',
      rule: 'poor-cwv',
      message: `Cumulative Layout Shift (CLS) of ${metrics.cls} exceeds 0.1 threshold.`,
      severity: 'serious',
      fixable: false,
    });
  }

  return violations;
}
