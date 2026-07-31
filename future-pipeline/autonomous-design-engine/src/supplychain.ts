import type { Violation } from './schema.js';

export function validateDependencyAudit(auditSummary: any): Violation[] {
  const violations: Violation[] = [];

  const critical = auditSummary?.vulnerabilities?.critical || 0;
  const high = auditSummary?.vulnerabilities?.high || 0;

  if (critical > 0 || high > 0) {
    violations.push({
      gate: 'ops-supplychain',
      rule: 'vulnerable-dependency',
      message: `Audit found ${critical} critical and ${high} high vulnerabilities. Resolve before proceeding.`,
      severity: 'critical',
      fixable: false,
    });
  }

  return violations;
}

export function detectToolchainBump(previousConfig: Record<string, string>, currentConfig: Record<string, string>): Violation[] {
  const violations: Violation[] = [];

  const coreTools = ['playwright', 'vite', 'tailwindcss', 'react', 'next'];

  for (const tool of coreTools) {
    const prev = previousConfig[tool];
    const curr = currentConfig[tool];

    if (prev && curr && prev !== curr) {
      violations.push({
        gate: 'ops-supplychain',
        rule: 'toolchain-bump',
        message: `Core toolchain dependency '${tool}' bumped from ${prev} to ${curr}. A full benchmark re-baseline is required.`,
        severity: 'serious',
        fixable: false,
      });
    }
  }

  return violations;
}
