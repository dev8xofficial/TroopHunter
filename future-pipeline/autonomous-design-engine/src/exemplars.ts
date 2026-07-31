/**
 * ADE — Anchored Visual Exemplars (Phase 3 / C3.4)
 *
 * Provides the Critic with visual ground-truth examples. This anchors the
 * VLM's grading curve so it doesn't drift when evaluating designs.
 *
 * @module exemplars
 */

import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import type { DimensionScores } from './schema.js';

export interface VisualExemplar {
  id: string;
  imageFilename: string;
  imagePath: string; // fully resolved path
  scores: DimensionScores;
  notes: string;
}

const DEFAULT_DIR = join(process.cwd(), 'knowledge', 'exemplars');

export function loadVisualExemplars(dir: string = DEFAULT_DIR): VisualExemplar[] {
  const indexPath = join(dir, 'exemplars.json');
  if (!existsSync(indexPath)) return [];
  try {
    const data = JSON.parse(readFileSync(indexPath, 'utf-8'));
    return data.map((item: any) => ({
      ...item,
      imagePath: join(dir, item.imageFilename),
    }));
  } catch (e) {
    console.warn('Failed to load visual exemplars:', e);
    return [];
  }
}

export function saveVisualExemplars(exemplars: Omit<VisualExemplar, 'imagePath'>[], dir: string = DEFAULT_DIR): void {
  const indexPath = join(dir, 'exemplars.json');
  writeFileSync(indexPath, JSON.stringify(exemplars, null, 2), 'utf-8');
}
