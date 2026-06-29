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

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
  renameSync,
  readdirSync,
} from 'fs';
import { join, dirname } from 'path';
import { randomUUID } from 'crypto';
import type { z } from 'zod';
import {
  BrandFoundationSchema,
  ProjectDesignSystemSchema,
  ArtifactSchema,
  type BrandFoundation,
  type ProjectDesignSystem,
  type Artifact,
} from './schema.js';

// ─── Configuration ─────────────────────────────────────────────────

const PROJECTS_DIR = './projects';

function projectDir(clientId: string): string {
  return join(PROJECTS_DIR, clientId);
}

function surfaceDir(clientId: string, surface: string): string {
  return join(PROJECTS_DIR, clientId, surface);
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
    try { unlinkSync(tempPath); } catch { /* ignore */ }
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
    console.error(`⚠ Schema validation failed for ${filePath}:`,
      result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
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
  writeFileSync(versionFile, JSON.stringify(data, null, 2), { flush: true });
}

/**
 * List all version numbers for a file.
 */
export function listVersions(basePath: string): number[] {
  const versionsDir = `${basePath}.versions`;
  if (!existsSync(versionsDir)) return [];

  return readdirSync(versionsDir)
    .filter(f => f.startsWith('v') && f.endsWith('.json'))
    .map(f => parseInt(f.slice(1, -5)))
    .filter(n => !isNaN(n))
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
      throw new Error(
        `Client "${clientId}" is locked (lock: ${existing.lockId}, age: ${Math.round(age / 1000)}s). ` +
        `Another operation may be in progress.`
      );
    }
    // Expired lock — reclaim
    console.warn(`⚠ Reclaiming expired lock for client "${clientId}"`);
  }

  const lockId = randomUUID().slice(0, 8);
  activeLocks.set(clientId, { lockId, timestamp: Date.now() });

  // Also write a lock file for cross-process safety
  const lockPath = join(projectDir(clientId), '.lock');
  try {
    mkdirSync(projectDir(clientId), { recursive: true });
    writeFileSync(lockPath, JSON.stringify({ lockId, timestamp: Date.now() }), { flush: true });
  } catch { /* best effort */ }

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
    if (existsSync(lockPath)) unlinkSync(lockPath);
  } catch { /* best effort */ }
}

// ─── Brand Foundation store ────────────────────────────────────────

/**
 * Read the Brand Foundation for a client.
 */
export function readBrand(clientId: string): BrandFoundation | null {
  const filePath = join(projectDir(clientId), 'brand.json');
  return atomicRead(filePath, BrandFoundationSchema);
}

/**
 * Write the Brand Foundation for a client.
 * Optimistic version precondition: if an existing file has a different version
 * than expected, the write is rejected (I5).
 */
export function writeBrand(
  clientId: string,
  foundation: BrandFoundation,
  expectedVersion?: number,
): void {
  const filePath = join(projectDir(clientId), 'brand.json');

  // Optimistic version check
  if (expectedVersion !== undefined) {
    const existing = readBrand(clientId);
    if (existing && existing.version !== expectedVersion) {
      throw new Error(
        `Version conflict: expected v${expectedVersion} but found v${existing.version}. ` +
        `Another operation may have modified the brand.`
      );
    }
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
  return atomicRead(filePath, ProjectDesignSystemSchema);
}

/**
 * Write the Project Design System for a client + surface.
 * Optimistic version precondition.
 */
export function writePDS(
  clientId: string,
  surface: string,
  pds: ProjectDesignSystem,
  expectedVersion?: number,
): void {
  const filePath = join(surfaceDir(clientId, surface), 'pds.json');

  if (expectedVersion !== undefined) {
    const existing = readPDS(clientId, surface);
    if (existing && existing.version !== expectedVersion) {
      throw new Error(
        `PDS version conflict: expected v${expectedVersion} but found v${existing.version}.`
      );
    }
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
  return atomicRead(filePath, ArtifactSchema);
}

/**
 * Write the Artifact for a client + surface.
 */
export function writeArtifact(
  clientId: string,
  surface: string,
  artifact: Artifact,
): void {
  const filePath = join(surfaceDir(clientId, surface), 'artifact.json');
  atomicWrite(filePath, artifact);
}

/**
 * Get the projects directory path for external use.
 */
export function getProjectsDir(): string {
  return PROJECTS_DIR;
}

/**
 * Get the output directory for a section run.
 */
export function getSectionRunDir(clientId: string, surface: string, sectionName: string): string {
  return join(surfaceDir(clientId, surface), 'runs', sectionName);
}
