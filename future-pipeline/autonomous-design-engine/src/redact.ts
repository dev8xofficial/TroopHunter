/**
 * ADE — Baseline secrets/PII redaction at capture (C0.14)
 *
 * Redacts obvious secret/PII patterns from any JSON-serializable value
 * before it is persisted to trace.jsonl, verdicts.jsonl, or logs. Applied
 * recursively to every string field so it catches leaks nested at any
 * depth (a brief's free-text `body`, a Critic's `feedback`, etc.).
 *
 * Deliberately conservative and pattern-based — this is the C0.14 baseline,
 * not the comprehensive PII scan gating Library write-back (that's C4.1 /
 * Phase 2, a human-reviewable gate with more context than a regex pass can
 * have). The goal here is: a seeded secret/PII value must never appear
 * VERBATIM in a persisted artifact, not that every conceivable PII shape is
 * caught.
 *
 * @module redact
 */

interface RedactionRule {
  name: string;
  pattern: RegExp;
}

const RULES: RedactionRule[] = [
  { name: 'anthropic-api-key', pattern: /sk-ant-[a-zA-Z0-9_-]{20,}/g },
  { name: 'openai-api-key', pattern: /sk-[a-zA-Z0-9]{20,}/g },
  { name: 'aws-access-key', pattern: /AKIA[0-9A-Z]{16}/g },
  { name: 'generic-bearer-token', pattern: /\bBearer\s+[a-zA-Z0-9_\-.]{20,}/g },
  { name: 'private-key-block', pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g },
  { name: 'generic-secret-assignment', pattern: /\b(api[_-]?key|secret|token|password|passwd|pwd)\s*[:=]\s*['"]?[a-zA-Z0-9_\-.]{12,}['"]?/gi },
  { name: 'email', pattern: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g },
  { name: 'ssn-like', pattern: /\b\d{3}-\d{2}-\d{4}\b/g },
  { name: 'credit-card-like', pattern: /\b(?:\d[ -]?){13,16}\b/g },
];

/** Redact secrets/PII from a single string. Returns the string unchanged if nothing matched. */
export function redactString(input: string): string {
  let out = input;
  for (const rule of RULES) {
    out = out.replace(rule.pattern, `[REDACTED:${rule.name}]`);
  }
  return out;
}

/**
 * Scan a single string for secrets/PII without modifying it.
 * Returns an array of matched rule names.
 */
export function detectSecrets(input: string): string[] {
  const matches: string[] = [];
  for (const rule of RULES) {
    // Reset regex state since we use 'g' flag
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(input)) {
      matches.push(rule.name);
    }
  }
  return matches;
}

/**
 * Recursively redact every string value in a JSON-serializable structure.
 * Non-string primitives pass through unchanged; object keys are never
 * redacted (only values), since keys carry structure, not secrets.
 */
export function redactDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return redactString(value) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => redactDeep(v)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = redactDeep(v);
    }
    return out as T;
  }
  return value;
}
