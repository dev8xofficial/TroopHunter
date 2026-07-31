/**
 * ADE — Store (atomic, versioned hard stores)
 *
 * File-based storage for Brand Foundation, Project Design System,
 * and Artifact. Atomic temp+rename writes (F-STO-01),
 * append-only versioning (F-STO-02), per-client lock (F-STO-03),
 * schema-validate on read.
 *
 * Storage layout:
 *   ./projects/<client>/brand.json
 *   ./projects/<client>/<surface>/pds.json
 *   ./projects/<client>/<surface>/artifact.json
 *   ./projects/<client>/<surface>/trace.jsonl
 *
 * @module store
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync, renameSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { redactDeep } from './redact.js';
import { randomUUID } from 'crypto';
import type { z } from 'zod';
import { BrandFoundationSchema, ProjectDesignSystemSchema, ArtifactSchema, ArtifactQAReportSchema, type BrandFoundation, type ProjectDesignSystem, type Artifact, type ArtifactQAReport } from './schema.js';

// ─── Configuration ─────────────────────────────────────────────────

let projectsDir = process.env.ADE_PROJECTS_DIR ?? './projects';

function projectDir(clientId: string): string {
  return join(projectsDir, clientId);
}

function surfaceDir(clientId: string, surface: string): string {
  return join(projectsDir, clientId, surface);
}

// ─── Generic atomic read/write ─────────────────────────────────────

/**
 * Atomic write: write to a temp file, then rename.
 * A crash never leaves a partial/corrupt file (F-STO-01).
 */
export function atomicWrite(filePath: string, data: unknown): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const tempPath = `${filePath}.${randomUUID().slice(0, 8)}.tmp`;
  const content = JSON.stringify(data, null, 2);

  writeFileSync(tempPath, content, { flush: true });

  // On Windows, rename fails if target exists — unlink first
  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    renameSync(tempPath, filePath);
  } catch (err) {
    // Clean up temp file on failure
    try {
      unlinkSync(tempPath);
    } catch {
      /* ignore */
    }
    throw err;
  }
}

/**
 * Read + schema-validate. Corrupt/incompatible data caught at load (F-STO-05).
 */
export function atomicRead<T>(filePath: string, schema: z.ZodType<T>): T | null {
  if (!existsSync(filePath)) {
    return null;
  }

  const raw = readFileSync(filePath, 'utf-8');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error(`⚠ Corrupt JSON at ${filePath}:`, err instanceof Error ? err.message : err);
    return null;
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    console.error(`⚠ Schema validation failed for ${filePath}:`, result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
    return null;
  }

  return result.data;
}

// ─── Version history ───────────────────────────────────────────────

/**
 * Write a versioned snapshot to the versions directory.
 * Append-only: every change is a new immutable version (F-STO-02).
 */
function writeVersionSnapshot(basePath: string, data: unknown, version: number): void {
  const versionsDir = `${basePath}.versions`;
  if (!existsSync(versionsDir)) {
    mkdirSync(versionsDir, { recursive: true });
  }
  const versionFile = join(versionsDir, `v${version}.json`);
  writeFileSync(versionFile, JSON.stringify(data, null, 2), {
    flag: 'wx',
    flush: true,
  });
}

/**
 * List all version numbers for a file.
 */
export function listVersions(basePath: string): number[] {
  const versionsDir = `${basePath}.versions`;
  if (!existsSync(versionsDir)) return [];

  return readdirSync(versionsDir)
    .filter((f) => f.startsWith('v') && f.endsWith('.json'))
    .map((f) => parseInt(f.slice(1, -5)))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
}

// ─── Client lock (F-STO-03) ────────────────────────────────────────

const activeLocks = new Map<string, { lockId: string; timestamp: number }>();
const LOCK_TIMEOUT_MS = 60_000; // 60 seconds

/**
 * Acquire a file-based lock for a client.
 * Prevents concurrent runs from clobbering stores (I5, F-STO-03).
 */
export function lockClient(clientId: string): string {
  const existing = activeLocks.get(clientId);
  if (existing) {
    const age = Date.now() - existing.timestamp;
    if (age < LOCK_TIMEOUT_MS) {
      throw new Error(`Client "${clientId}" is locked (lock: ${existing.lockId}, age: ${Math.round(age / 1000)}s). ` + `Another operation may be in progress.`);
    }
    // Expired lock — reclaim
    console.warn(`⚠ Reclaiming expired lock for client "${clientId}"`);
  }

  const lockId = randomUUID().slice(0, 8);
  const lockPath = join(projectDir(clientId), '.lock');
  mkdirSync(projectDir(clientId), { recursive: true });

  try {
    writeFileSync(lockPath, JSON.stringify({ lockId, timestamp: Date.now() }, null, 2), { flag: 'wx', flush: true });
  } catch (err) {
    const stale = readLockFile(lockPath);
    if (!stale || Date.now() - stale.timestamp < LOCK_TIMEOUT_MS) {
      throw new Error(`Client "${clientId}" is locked` + (stale ? ` (lock: ${stale.lockId}, age: ${Math.round((Date.now() - stale.timestamp) / 1000)}s).` : '.'));
    }

    unlinkSync(lockPath);
    writeFileSync(lockPath, JSON.stringify({ lockId, timestamp: Date.now() }, null, 2), { flag: 'wx', flush: true });
  }

  activeLocks.set(clientId, { lockId, timestamp: Date.now() });

  return lockId;
}

/**
 * Release the client lock.
 */
export function unlockClient(clientId: string, lockId: string): void {
  const existing = activeLocks.get(clientId);
  if (existing && existing.lockId === lockId) {
    activeLocks.delete(clientId);
  }

  const lockPath = join(projectDir(clientId), '.lock');
  try {
    const fileLock = readLockFile(lockPath);
    if (fileLock?.lockId === lockId) {
      unlinkSync(lockPath);
    }
  } catch {
    /* best effort */
  }
}

function readLockFile(lockPath: string): { lockId: string; timestamp: number } | null {
  if (!existsSync(lockPath)) return null;

  try {
    const parsed = JSON.parse(readFileSync(lockPath, 'utf-8')) as {
      lockId?: unknown;
      timestamp?: unknown;
    };
    if (typeof parsed.lockId === 'string' && typeof parsed.timestamp === 'number') {
      return { lockId: parsed.lockId, timestamp: parsed.timestamp };
    }
  } catch {
    return null;
  }

  return null;
}

// ─── Brand Foundation store ────────────────────────────────────────

/**
 * Read the Brand Foundation for a client.
 */
export function readBrand(clientId: string): BrandFoundation | null {
  const filePath = join(projectDir(clientId), 'brand.json');
  return atomicRead<BrandFoundation>(filePath, BrandFoundationSchema);
}

/**
 * Write the Brand Foundation for a client.
 * Optimistic version precondition: if an existing file has a different version
 * than expected, the write is rejected (I5).
 */
export function writeBrand(clientId: string, foundation: BrandFoundation, expectedVersion?: number | null): void {
  const filePath = join(projectDir(clientId), 'brand.json');
  const existing = readBrand(clientId);

  // Optimistic version check
  if (expectedVersion !== undefined) {
    if (expectedVersion === null && existing) {
      throw new Error(`Version conflict: expected no existing brand but found v${existing.version}.`);
    }
    if (expectedVersion !== null && existing && existing.version !== expectedVersion) {
      throw new Error(`Version conflict: expected v${expectedVersion} but found v${existing.version}. ` + `Another operation may have modified the brand.`);
    }
  }

  if (foundation.client_id !== clientId) {
    throw new Error(`Brand client_id mismatch: ${foundation.client_id} cannot be written under ${clientId}.`);
  }

  if (existing && foundation.version <= existing.version) {
    throw new Error(`Version conflict: new brand version v${foundation.version} must be greater than existing v${existing.version}.`);
  }

  // Write current + version snapshot
  atomicWrite(filePath, foundation);
  writeVersionSnapshot(filePath, foundation, foundation.version);
}

// ─── Project Design System store ───────────────────────────────────

/**
 * Read the Project Design System for a client + surface.
 */
export function readPDS(clientId: string, surface: string): ProjectDesignSystem | null {
  const filePath = join(surfaceDir(clientId, surface), 'pds.json');
  return atomicRead<ProjectDesignSystem>(filePath, ProjectDesignSystemSchema);
}

/**
 * Write the Project Design System for a client + surface.
 * Optimistic version precondition.
 */
export function writePDS(clientId: string, surface: string, pds: ProjectDesignSystem, expectedVersion?: number | null): void {
  const filePath = join(surfaceDir(clientId, surface), 'pds.json');
  const existing = readPDS(clientId, surface);

  if (expectedVersion !== undefined) {
    if (expectedVersion === null && existing) {
      throw new Error(`PDS version conflict: expected no existing PDS but found v${existing.version}.`);
    }
    if (expectedVersion !== null && existing && existing.version !== expectedVersion) {
      throw new Error(`PDS version conflict: expected v${expectedVersion} but found v${existing.version}.`);
    }
  }

  if (pds.client_id !== clientId || pds.surface !== surface) {
    throw new Error(`PDS identity mismatch: cannot write ${pds.client_id}/${pds.surface} under ${clientId}/${surface}.`);
  }

  if (existing && pds.version <= existing.version) {
    throw new Error(`PDS version conflict: new version v${pds.version} must be greater than existing v${existing.version}.`);
  }

  atomicWrite(filePath, pds);
  writeVersionSnapshot(filePath, pds, pds.version);
}

// ─── Artifact store ────────────────────────────────────────────────

/**
 * Read the Artifact for a client + surface.
 */
export function readArtifact(clientId: string, surface: string): Artifact | null {
  const filePath = join(surfaceDir(clientId, surface), 'artifact.json');
  return atomicRead<Artifact>(filePath, ArtifactSchema);
}

/**
 * Write the Artifact for a client + surface.
 */
export function writeArtifact(clientId: string, surface: string, artifact: Artifact): void {
  const filePath = join(surfaceDir(clientId, surface), 'artifact.json');
  // C4.1: Ensure no seeded secret/PII reaches a persisted artifact.
  const redacted = redactDeep(artifact);
  atomicWrite(filePath, redacted);
}

/**
 * Read the latest whole-artifact QA report for a client + surface.
 */
export function readArtifactQA(clientId: string, surface: string): ArtifactQAReport | null {
  const filePath = join(surfaceDir(clientId, surface), 'qa.json');
  return atomicRead<ArtifactQAReport>(filePath, ArtifactQAReportSchema);
}

/**
 * Write the latest whole-artifact QA report for a client + surface.
 */
export function writeArtifactQA(clientId: string, surface: string, report: ArtifactQAReport): void {
  if (report.client_id !== clientId || report.surface !== surface) {
    throw new Error(`QA report identity mismatch: cannot write ${report.client_id}/${report.surface} under ${clientId}/${surface}.`);
  }

  const filePath = join(surfaceDir(clientId, surface), 'qa.json');
  atomicWrite(filePath, report);
}

/**
 * Get the projects directory path for external use.
 */
export function getProjectsDir(): string {
  return projectsDir;
}

/**
 * Get the output directory for a section run.
 */
export function getSectionRunDir(clientId: string, surface: string, sectionName: string): string {
  return join(surfaceDir(clientId, surface), 'runs', sectionName);
}

export function setProjectsDirForTest(dir: string): void {
  projectsDir = dir;
  activeLocks.clear();
}

// ─── Integrity scan (C1.0 — F-STO-05 dangling references) ──────────

export interface IntegrityIssue {
  clientId: string;
  surface?: string;
  rule: 'pds-without-brand' | 'pds-inherits-mismatch' | 'brand-not-frozen-but-pds-exists' | 'artifact-without-pds' | 'artifact-surface-mismatch';
  message: string;
}

/**
 * Walk every client/surface directory under the projects root and check the
 * referential chain brand -> PDS -> artifact is intact — the "referential
 * integrity... integrity scan for dangling artifact->system links" the plan
 * requires. Deliberately does NOT check LibraryEntry.provenance: that field
 * is a free-text string[] with no formal reference format defined anywhere
 * in the schema (unlike client_id/surface, which are concrete, checkable
 * identifiers) — silently "validating" it would be pretending to check
 * something that isn't actually specified.
 */
export function integrityScan(): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  if (!existsSync(projectsDir)) return issues;

  const clientIds = readdirSync(projectsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  for (const clientId of clientIds) {
    const brand = readBrand(clientId);
    const clientPath = projectDir(clientId);

    const surfaceNames = readdirSync(clientPath, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);

    for (const surface of surfaceNames) {
      const pds = readPDS(clientId, surface);
      if (pds) {
        if (!brand) {
          issues.push({
            clientId,
            surface,
            rule: 'pds-without-brand',
            message: `PDS ${clientId}/${surface} exists but no brand.json exists for "${clientId}" — dangling reference.`,
          });
        } else {
          if (pds.inherits !== brand.client_id) {
            issues.push({
              clientId,
              surface,
              rule: 'pds-inherits-mismatch',
              message: `PDS ${clientId}/${surface} inherits "${pds.inherits}" but the brand on disk for this client is "${brand.client_id}".`,
            });
          }
          if (brand.status !== 'frozen') {
            issues.push({
              clientId,
              surface,
              rule: 'brand-not-frozen-but-pds-exists',
              message: `PDS ${clientId}/${surface} exists (foundation-frozen) but brand.json for "${clientId}" is status "${brand.status}", not frozen — the PDS should not have been able to crystallize.`,
            });
          }
        }
      }

      const artifact = readArtifact(clientId, surface);
      if (artifact) {
        if (artifact.client_id !== clientId || artifact.surface !== surface) {
          issues.push({
            clientId,
            surface,
            rule: 'artifact-surface-mismatch',
            message: `Artifact at ${clientId}/${surface} claims identity ${artifact.client_id}/${artifact.surface} — dangling/misplaced reference.`,
          });
        }
        if (artifact.sections.length > 0 && !pds) {
          issues.push({
            clientId,
            surface,
            rule: 'artifact-without-pds',
            message: `Artifact ${clientId}/${surface} has ${artifact.sections.length} section(s) but no PDS exists for this client/surface — dangling artifact->system link.`,
          });
        }
      }
    }
  }

  return issues;
}
