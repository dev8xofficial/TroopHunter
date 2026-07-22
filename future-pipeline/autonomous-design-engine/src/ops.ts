import { createHash } from 'crypto';
import type { Violation } from './schema.js';

export function createDeterministicSnapshot(config: { seed: number; temperature: number; libraryVersion: number; promptHashes: string[] }): string {
  const payload = JSON.stringify(config);
  return createHash('sha256').update(payload).digest('hex');
}

export function migrateRecord(record: any, currentVersion: number): any {
  const version = record.version || 1;

  if (version > currentVersion) {
    throw new Error(`Record version ${version} is from the future (current schema is ${currentVersion})`);
  }

  const migrated = { ...record };

  if (version < 2) {
    // Migrate v1 to v2: ensure 'metadata' field exists
    migrated.metadata = migrated.metadata || {};
    migrated.version = 2;
  }

  if (migrated.version < currentVersion) {
    migrated.version = currentVersion;
  }

  return migrated;
}

export function simulateRestore(payload: string): boolean {
  try {
    const data = JSON.parse(payload);
    // basic integrity check
    if (data.integrityHash) {
      const payloadCopy = { ...data };
      delete payloadCopy.integrityHash;
      const expected = createHash('sha256').update(JSON.stringify(payloadCopy)).digest('hex');
      if (expected !== data.integrityHash) {
        return false;
      }
    } else {
      return false; // must have integrity hash
    }
    return true;
  } catch {
    return false;
  }
}

export function runRetentionPolicy(artifacts: { id: string; sizeKb: number; type: string; ageDays: number }[]): string[] {
  const prunedIds: string[] = [];

  for (const artifact of artifacts) {
    // Keep traces indefinitely, but prune bulky intermediates if > 30 days or > 10MB
    if (artifact.type === 'intermediate-render') {
      if (artifact.ageDays > 30 || artifact.sizeKb > 10000) {
        prunedIds.push(artifact.id);
      }
    }
  }

  return prunedIds;
}

export function trackWallClock(startTime: number, maxBudgetMs: number): Violation[] {
  const violations: Violation[] = [];
  const elapsed = Date.now() - startTime;

  if (elapsed > maxBudgetMs) {
    violations.push({
      gate: 'ops-dr',
      rule: 'wall-clock-budget-exceeded',
      message: `Execution took ${elapsed}ms, exceeding the budget of ${maxBudgetMs}ms.`,
      severity: 'serious',
      fixable: false,
    });
  }

  return violations;
}
