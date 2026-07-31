import type { Violation } from './schema.js';

export function validateProviderConfig(env: NodeJS.ProcessEnv): void {
  if (env.ADE_ENV === 'production' || env.ADE_PROVIDER === 'api') {
    if (!env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is required for production or api provider mode.');
    }
  }
}

export function executeWithFallback<T>(primaryCall: () => T, fallbackCall: () => T): { result: T; violations: Violation[] } {
  const violations: Violation[] = [];

  try {
    const result = primaryCall();
    return { result, violations };
  } catch (err) {
    violations.push({
      gate: 'ops-provider',
      rule: 'provider-fallback-triggered',
      message: `Primary provider failed. Fell back to secondary provider. A benchmark re-baseline is required. Error: ${err instanceof Error ? err.message : String(err)}`,
      severity: 'serious',
      fixable: false,
    });

    const result = fallbackCall();
    return { result, violations };
  }
}

export function checkToSCompliance(isResolved: boolean): Violation[] {
  const violations: Violation[] = [];

  if (!isResolved) {
    violations.push({
      gate: 'ops-provider',
      rule: 'tos-unresolved',
      message: 'Pro-credit ToS compliance must be explicitly resolved and logged before scaling.',
      severity: 'critical',
      fixable: true,
    });
  }

  return violations;
}

export function reportBurnRate(spentTokens: number, limitTokens: number): Violation[] {
  const violations: Violation[] = [];

  if (spentTokens > limitTokens) {
    violations.push({
      gate: 'ops-provider',
      rule: 'burn-rate-exceeded',
      message: `Spent ${spentTokens} tokens, which exceeds the limit of ${limitTokens} tokens.`,
      severity: 'critical',
      fixable: false,
    });
  }

  return violations;
}
