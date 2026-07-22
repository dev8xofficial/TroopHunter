/**
 * ADE — Telemetry & Scaling Metrics (E3.3)
 *
 * Tracks brand foundation reuse, library recall size over time,
 * and H10 iteration efficiency (zero-to-one vs refactoring).
 */

import { existsSync, appendFileSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';

export interface ScalingEvent {
  timestamp: string;
  type: 'brand_reuse' | 'library_recall' | 'engine_mode_efficiency';
  data: any;
}

const telemetryDir = process.env.ADE_TELEMETRY_DIR ?? './telemetry';

export function getTelemetryPath(): string {
  return join(telemetryDir, 'events.jsonl');
}

/**
 * Log a telemetry event (E3.3)
 */
export function logTelemetryEvent(type: ScalingEvent['type'], data: any): void {
  const path = getTelemetryPath();
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const event: ScalingEvent = {
    timestamp: new Date().toISOString(),
    type,
    data,
  };

  appendFileSync(path, JSON.stringify(event) + '\n', { flush: true });
}

/**
 * Track Brand foundation reuse (H5)
 */
export function trackBrandReuse(clientId: string, version: number, surface: string): void {
  logTelemetryEvent('brand_reuse', {
    client_id: clientId,
    version,
    surface,
  });
}

/**
 * Track Library recall size (H9)
 */
export function trackLibraryRecall(briefId: string, query: string, hitCount: number): void {
  logTelemetryEvent('library_recall', {
    brief_id: briefId,
    query_length: query.length,
    hit_count: hitCount,
  });
}

/**
 * Track H10 Iteration Efficiency (zero-to-one vs refactoring) (E3.2)
 */
export function trackEngineModeEfficiency(runId: string, mode: 'zero-to-one' | 'refactoring', iterations: number, success: boolean, durationMs: number): void {
  logTelemetryEvent('engine_mode_efficiency', {
    run_id: runId,
    engine_mode: mode,
    iterations,
    success,
    duration_ms: durationMs,
  });
}
