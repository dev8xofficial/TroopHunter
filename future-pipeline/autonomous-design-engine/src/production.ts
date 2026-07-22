/**
 * ADE - Production readiness and cost controls (Phase 4)
 *
 * Production scale must use the API provider with explicit spend/latency caps.
 * Trace-derived H7 metrics keep cost visible as autonomy rises.
 *
 * @module production
 */

import type { Config } from './config.js';
import type { RunRecord, RunResult, Violation } from './schema.js';

export interface ProductionReadiness {
  pass: boolean;
  violations: Violation[];
  warnings: Violation[];
}

export interface CostBudget {
  maxTokensPerSection: number;
  maxSecondsPerSection: number;
  maxUsdPerSection: number;
}

export interface CostSummary {
  sections: number;
  runs: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  durationMs: number;
  tokensPerSection: number;
  secondsPerSection: number;
  estimatedUsd: number;
  estimatedUsdPerSection: number;
  quota?: {
    tokens_today: number;
    calls_today: number;
    tokens_this_week: number;
    calls_this_week: number;
  };
}

const DEFAULT_PRICE = {
  inputUsdPerMillion: 3,
  outputUsdPerMillion: 15,
};

export function validateProductionReadiness(cfg: Config): ProductionReadiness {
  const violations: Violation[] = [];
  const warnings: Violation[] = [];

  if (!cfg.productionMode) {
    warnings.push(violation('production-readiness', 'production-mode-off', 'ADE_PRODUCTION is not enabled; treating this as an R&D run.', 'minor'));
  }

  if (cfg.productionMode && cfg.provider !== 'api') {
    violations.push(violation('production-readiness', 'provider-not-api', `Production mode requires ADE_PROVIDER=api, found "${cfg.provider}".`, 'critical'));
  }

  if (cfg.productionMode && !cfg.anthropicApiKey) {
    violations.push(violation('production-readiness', 'missing-api-key', 'Production API mode requires ANTHROPIC_API_KEY.', 'critical'));
  }

  if (cfg.productionMode && cfg.harness !== 'next') {
    warnings.push(violation('production-readiness', 'vite-harness-in-production', 'Vite harness is acceptable for R&D; use ADE_HARNESS=next before external production parity checks.', 'moderate'));
  }

  if (cfg.maxRunTokens > cfg.maxTokensPerSection * Math.max(1, cfg.maxIters)) {
    warnings.push(violation('production-readiness', 'loose-run-token-cap', 'ADE_MAX_RUN_TOKENS is loose relative to ADE_MAX_TOKENS_PER_SECTION and max iterations.', 'moderate'));
  }

  if (cfg.maxModelCalls > cfg.maxIters * cfg.variations * 3 + 4) {
    warnings.push(violation('production-readiness', 'loose-model-call-cap', 'ADE_MAX_MODEL_CALLS leaves broad headroom; production runs should cap runaway loops tightly.', 'moderate'));
  }

  return {
    pass: violations.length === 0,
    violations,
    warnings,
  };
}

export function summarizeTraceCost(records: RunRecord[], sectionCount?: number): CostSummary {
  const finalByRun = new Map<string, RunRecord>();
  for (const record of records) {
    const existing = finalByRun.get(record.run_id);
    if (!existing || record.duration_ms > existing.duration_ms) {
      finalByRun.set(record.run_id, record);
    }
  }

  const finalRecords = Array.from(finalByRun.values());
  const inputTokens = finalRecords.reduce((sum, record) => sum + record.tokens.input, 0);
  const outputTokens = finalRecords.reduce((sum, record) => sum + record.tokens.output, 0);
  const durationMs = finalRecords.reduce((sum, record) => sum + record.duration_ms, 0);
  const sections = sectionCount ?? new Set(records.map((record) => record.section_id)).size;
  const safeSections = Math.max(1, sections);
  const estimatedUsd = (inputTokens / 1_000_000) * DEFAULT_PRICE.inputUsdPerMillion + (outputTokens / 1_000_000) * DEFAULT_PRICE.outputUsdPerMillion;

  return {
    sections,
    runs: finalRecords.length,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    durationMs,
    tokensPerSection: (inputTokens + outputTokens) / safeSections,
    secondsPerSection: durationMs / 1000 / safeSections,
    estimatedUsd,
    estimatedUsdPerSection: estimatedUsd / safeSections,
    quota: finalRecords[finalRecords.length - 1]?.quota,
  };
}

export function summarizeRunResults(results: RunResult[]): CostSummary {
  const inputTokens = results.reduce((sum, result) => sum + result.totalTokens.input, 0);
  const outputTokens = results.reduce((sum, result) => sum + result.totalTokens.output, 0);
  const durationMs = results.reduce((sum, result) => sum + result.totalDurationMs, 0);
  const sections = results.length;
  const safeSections = Math.max(1, sections);
  const estimatedUsd = (inputTokens / 1_000_000) * DEFAULT_PRICE.inputUsdPerMillion + (outputTokens / 1_000_000) * DEFAULT_PRICE.outputUsdPerMillion;

  return {
    sections,
    runs: results.length,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    durationMs,
    tokensPerSection: (inputTokens + outputTokens) / safeSections,
    secondsPerSection: durationMs / 1000 / safeSections,
    estimatedUsd,
    estimatedUsdPerSection: estimatedUsd / safeSections,
  };
}

export function checkCostBudget(summary: CostSummary, budget: CostBudget): Violation[] {
  const violations: Violation[] = [];

  if (summary.tokensPerSection > budget.maxTokensPerSection) {
    violations.push(violation('production-budget', 'tokens-per-section', `Tokens/section ${Math.round(summary.tokensPerSection)} exceeds cap ${budget.maxTokensPerSection}.`, 'serious'));
  }
  if (summary.secondsPerSection > budget.maxSecondsPerSection) {
    violations.push(violation('production-budget', 'seconds-per-section', `Seconds/section ${summary.secondsPerSection.toFixed(1)} exceeds cap ${budget.maxSecondsPerSection}.`, 'serious'));
  }
  if (summary.estimatedUsdPerSection > budget.maxUsdPerSection) {
    violations.push(violation('production-budget', 'usd-per-section', `Estimated USD/section ${summary.estimatedUsdPerSection.toFixed(2)} exceeds cap ${budget.maxUsdPerSection}.`, 'serious'));
  }

  return violations;
}

export function budgetFromConfig(cfg: Config): CostBudget {
  return {
    maxTokensPerSection: cfg.maxTokensPerSection,
    maxSecondsPerSection: cfg.maxSecondsPerSection,
    maxUsdPerSection: cfg.maxUsdPerSection,
  };
}

export function formatCostSummary(summary: CostSummary): string {
  const lines = [`Cost/latency (H7): ${summary.sections} section(s), ${Math.round(summary.tokensPerSection).toLocaleString()} tokens/section`, `Latency: ${summary.secondsPerSection.toFixed(1)}s/section`, `Estimated spend: $${summary.estimatedUsdPerSection.toFixed(2)}/section`];
  if (summary.quota) {
    lines.push(`Quota Burn: ${summary.quota.tokens_today.toLocaleString()} tokens today | ${summary.quota.calls_today.toLocaleString()} calls today`);
  }
  return lines.join('\n');
}

function violation(gate: string, rule: string, message: string, severity: Violation['severity']): Violation {
  return {
    gate,
    rule,
    message,
    severity,
    fixable: true,
  };
}

// --- Design-to-code strict parity (E3.1) -------------------------

export function validateDesignToCodeParity(tsx: string): Violation[] {
  const violations: Violation[] = [];

  // 1. No inline styles
  if (/style=\{\{.*\}\}/.test(tsx)) {
    violations.push({
      gate: 'ast-parity',
      rule: 'no-inline-styles',
      message: 'TSX contains inline styles. Use Tailwind classes only.',
      severity: 'critical',
      fixable: true,
    });
  }

  // 2. No un-exported top-level functions (naive regex for mock)
  const lines = tsx.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match 'function Foo' at the start of a line (or with spaces) but NOT preceded by 'export'
    if (/^\s*function\s+[A-Za-z0-9_]+/.test(line) && !/^\s*export\s+(default\s+)?function/.test(line)) {
      violations.push({
        gate: 'ast-parity',
        rule: 'no-unexported-functions',
        message: 'TSX contains an unexported top-level function. All component functions must be exported.',
        severity: 'critical',
        fixable: true,
      });
      break; // One violation per rule is enough
    }
  }

  return violations;
}

// --- Output-quality gate (C4.2) -----------------------------------

/**
 * Deterministic static analysis distinct from validateDesignToCodeParity
 * (E3.1, which checks inline-styles/export shape). C4.2 closes F-COD-01..04:
 * non-semantic HTML, insecure output/XSS, uncontrolled external resources.
 */
export function outputQualityGate(tsx: string): Violation[] {
  const violations: Violation[] = [];

  // F-COD-03: no dangerouslySetInnerHTML — the direct XSS vector.
  if (/dangerouslySetInnerHTML/.test(tsx)) {
    violations.push({
      gate: 'output-quality',
      rule: 'dangerously-set-inner-html',
      message: 'TSX uses dangerouslySetInnerHTML — unsanitized HTML injection is not allowed in generated output.',
      severity: 'critical',
      fixable: true,
    });
  }

  // F-COD-01: div-soup — a section with no semantic landmark at all.
  const hasLandmark = /<(nav|header|main|footer|section|article|aside|button|h[1-6])\b/i.test(tsx);
  if (hasLandmark === false) {
    violations.push({
      gate: 'output-quality',
      rule: 'non-semantic-html',
      message: 'TSX contains no semantic landmark elements (nav/header/main/footer/section/article/aside/button/heading) — likely div-soup.',
      severity: 'serious',
      fixable: true,
    });
  }

  // F-COD-04: remote resource loads — fonts/scripts/images must be self-hosted,
  // not pulled from an external origin at render/runtime.
  const remoteResourcePattern = /(?:src|href)\s*=\s*["'`](https?:)?\/\/(?!localhost|127\.0\.0\.1)[^"'`]+["'`]/gi;
  const remoteMatches = [...tsx.matchAll(remoteResourcePattern)];
  if (remoteMatches.length > 0) {
    violations.push({
      gate: 'output-quality',
      rule: 'remote-resource-origin',
      message: `TSX loads ${remoteMatches.length} resource(s) from an external origin (fonts/scripts/images must be self-hosted): ${remoteMatches
        .slice(0, 3)
        .map((m) => m[0])
        .join(', ')}`,
      severity: 'serious',
      fixable: true,
    });
  }

  // F-COD-03: unsanitized URL interpolation into href/src via template
  // literals — a template-literal `href`/`src` built from a variable, not a
  // static string, is the injectable case worth catching deterministically.
  if (/(?:src|href)\s*=\s*\{`[^`]*\$\{/i.test(tsx)) {
    violations.push({
      gate: 'output-quality',
      rule: 'unsanitized-url-interpolation',
      message: 'TSX interpolates a variable directly into a href/src template literal — sanitize or use a static/allowlisted value.',
      severity: 'serious',
      fixable: true,
    });
  }

  // C4.2: prop-driven (no hard-coded content). Components must take props and
  // text must be derived from variables, not hardcoded strings in JSX.
  const hasNoProps = /(?:function\s+[A-Z]\w*\s*\(\s*\)|const\s+[A-Z]\w*\s*=\s*\(\s*\)\s*=>)/.test(tsx);
  const hasHardcodedText = />\s*([a-zA-Z0-9][^<{]*)\s*</.test(tsx) || />\s*\{['"`][a-zA-Z0-9][^'"`]*['"`]\}\s*</.test(tsx);

  if (hasNoProps || hasHardcodedText) {
    violations.push({
      gate: 'output-quality',
      rule: 'hardcoded-content',
      message: 'Component contains hard-coded text or takes no props. All content must be prop-driven.',
      severity: 'serious',
      fixable: true,
    });
  }

  // C4.2: missing keys in list rendering.
  if (/\.map\s*\(/.test(tsx) && !/\bkey\s*=\s*[{'"]/.test(tsx)) {
    violations.push({
      gate: 'output-quality',
      rule: 'missing-list-keys',
      message: 'Component uses .map() but is missing a key prop on the rendered elements.',
      severity: 'serious',
      fixable: true,
    });
  }

  return violations;
}
