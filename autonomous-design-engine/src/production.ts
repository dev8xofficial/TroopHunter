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
}

const DEFAULT_PRICE = {
  inputUsdPerMillion: 3,
  outputUsdPerMillion: 15,
};

export function validateProductionReadiness(cfg: Config): ProductionReadiness {
  const violations: Violation[] = [];
  const warnings: Violation[] = [];

  if (!cfg.productionMode) {
    warnings.push(violation(
      'production-readiness',
      'production-mode-off',
      'ADE_PRODUCTION is not enabled; treating this as an R&D run.',
      'minor',
    ));
  }

  if (cfg.productionMode && cfg.provider !== 'api') {
    violations.push(violation(
      'production-readiness',
      'provider-not-api',
      `Production mode requires ADE_PROVIDER=api, found "${cfg.provider}".`,
      'critical',
    ));
  }

  if (cfg.productionMode && !cfg.anthropicApiKey) {
    violations.push(violation(
      'production-readiness',
      'missing-api-key',
      'Production API mode requires ANTHROPIC_API_KEY.',
      'critical',
    ));
  }

  if (cfg.productionMode && cfg.harness !== 'next') {
    warnings.push(violation(
      'production-readiness',
      'vite-harness-in-production',
      'Vite harness is acceptable for R&D; use ADE_HARNESS=next before external production parity checks.',
      'moderate',
    ));
  }

  if (cfg.maxRunTokens > cfg.maxTokensPerSection * Math.max(1, cfg.maxIters)) {
    warnings.push(violation(
      'production-readiness',
      'loose-run-token-cap',
      'ADE_MAX_RUN_TOKENS is loose relative to ADE_MAX_TOKENS_PER_SECTION and max iterations.',
      'moderate',
    ));
  }

  if (cfg.maxModelCalls > cfg.maxIters * cfg.variations * 3 + 4) {
    warnings.push(violation(
      'production-readiness',
      'loose-model-call-cap',
      'ADE_MAX_MODEL_CALLS leaves broad headroom; production runs should cap runaway loops tightly.',
      'moderate',
    ));
  }

  return {
    pass: violations.length === 0,
    violations,
    warnings,
  };
}

export function summarizeTraceCost(
  records: RunRecord[],
  sectionCount?: number,
): CostSummary {
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
  const sections = sectionCount ?? new Set(records.map(record => record.section_id)).size;
  const safeSections = Math.max(1, sections);
  const estimatedUsd =
    (inputTokens / 1_000_000) * DEFAULT_PRICE.inputUsdPerMillion +
    (outputTokens / 1_000_000) * DEFAULT_PRICE.outputUsdPerMillion;

  return {
    sections,
    runs: finalRecords.length,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    durationMs,
    tokensPerSection: (inputTokens + outputTokens) / safeSections,
    secondsPerSection: (durationMs / 1000) / safeSections,
    estimatedUsd,
    estimatedUsdPerSection: estimatedUsd / safeSections,
  };
}

export function summarizeRunResults(results: RunResult[]): CostSummary {
  const inputTokens = results.reduce((sum, result) => sum + result.totalTokens.input, 0);
  const outputTokens = results.reduce((sum, result) => sum + result.totalTokens.output, 0);
  const durationMs = results.reduce((sum, result) => sum + result.totalDurationMs, 0);
  const sections = results.length;
  const safeSections = Math.max(1, sections);
  const estimatedUsd =
    (inputTokens / 1_000_000) * DEFAULT_PRICE.inputUsdPerMillion +
    (outputTokens / 1_000_000) * DEFAULT_PRICE.outputUsdPerMillion;

  return {
    sections,
    runs: results.length,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    durationMs,
    tokensPerSection: (inputTokens + outputTokens) / safeSections,
    secondsPerSection: (durationMs / 1000) / safeSections,
    estimatedUsd,
    estimatedUsdPerSection: estimatedUsd / safeSections,
  };
}

export function checkCostBudget(summary: CostSummary, budget: CostBudget): Violation[] {
  const violations: Violation[] = [];

  if (summary.tokensPerSection > budget.maxTokensPerSection) {
    violations.push(violation(
      'production-budget',
      'tokens-per-section',
      `Tokens/section ${Math.round(summary.tokensPerSection)} exceeds cap ${budget.maxTokensPerSection}.`,
      'serious',
    ));
  }
  if (summary.secondsPerSection > budget.maxSecondsPerSection) {
    violations.push(violation(
      'production-budget',
      'seconds-per-section',
      `Seconds/section ${summary.secondsPerSection.toFixed(1)} exceeds cap ${budget.maxSecondsPerSection}.`,
      'serious',
    ));
  }
  if (summary.estimatedUsdPerSection > budget.maxUsdPerSection) {
    violations.push(violation(
      'production-budget',
      'usd-per-section',
      `Estimated USD/section ${summary.estimatedUsdPerSection.toFixed(2)} exceeds cap ${budget.maxUsdPerSection}.`,
      'serious',
    ));
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
  return [
    `Cost/latency (H7): ${summary.sections} section(s), ${Math.round(summary.tokensPerSection).toLocaleString()} tokens/section`,
    `Latency: ${summary.secondsPerSection.toFixed(1)}s/section`,
    `Estimated spend: $${summary.estimatedUsdPerSection.toFixed(2)}/section`,
  ].join('\n');
}

function violation(
  gate: string,
  rule: string,
  message: string,
  severity: Violation['severity'],
): Violation {
  return {
    gate,
    rule,
    message,
    severity,
    fixable: true,
  };
}
