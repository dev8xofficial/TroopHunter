/**
 * ADE — Reference Activation (C2.4)
 *
 * References are SOFT inputs (I8): capped at 5, dissolved into principles
 * (never a template to clone or a parts bin to stitch from), and treated
 * as UNTRUSTED DATA — a reference's description text can never act as an
 * instruction, and hard constraint gates downstream apply regardless of
 * what a reference tried to influence.
 *
 * @module refs
 */

import { readFileSync, existsSync } from 'fs';
import { extname } from 'path';
import type { Brief, ReferenceRef } from './schema.js';
import type { ImageRef, ModelProvider } from './model.js';

export const MAX_REFERENCES = 5;

const EXT_TO_MEDIA_TYPE: Record<string, ImageRef['mediaType']> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

/**
 * Validate and cap CLI-supplied reference paths (I8: soft, capped at 5).
 * Missing files and unsupported formats are skipped with a warning, never
 * a hard failure — references are optional inputs, a bad path should not
 * abort generation.
 */
export function loadReferences(paths: string[]): ReferenceRef[] {
  if (paths.length === 0) return [];

  const capped = paths.slice(0, MAX_REFERENCES);
  if (paths.length > MAX_REFERENCES) {
    console.warn(`⚠ ${paths.length} references provided; capping at ${MAX_REFERENCES} (I8 — refs are soft, never a primary input).`);
  }

  const refs: ReferenceRef[] = [];
  for (const path of capped) {
    if (!existsSync(path)) {
      console.warn(`⚠ Reference not found, skipping: ${path}`);
      continue;
    }
    const ext = extname(path).toLowerCase();
    if (!(ext in EXT_TO_MEDIA_TYPE)) {
      console.warn(`⚠ Reference has unsupported format (${ext}), skipping: ${path}`);
      continue;
    }
    refs.push({ path });
  }
  return refs;
}

/**
 * Read reference images as base64 for a vision-capable model call — the
 * same read-at-call-time convention critic.ts uses for candidate
 * screenshots (InputBundle carries paths, not raw bytes).
 */
export function loadReferenceImages(refs: ReferenceRef[]): ImageRef[] {
  const images: ImageRef[] = [];
  for (const ref of refs) {
    try {
      const ext = extname(ref.path).toLowerCase();
      const mediaType = EXT_TO_MEDIA_TYPE[ext] ?? 'image/png';
      const data = readFileSync(ref.path).toString('base64');
      images.push({ data, mediaType });
    } catch (err) {
      console.warn(`⚠ Could not read reference image ${ref.path}: ${err}`);
    }
  }
  return images;
}

// C2.4 / I9: refs are untrusted data — the same injection tripwire
// guardrails.ts's inputGate applies to brief content, applied here to
// reference descriptions before they ever reach a prompt.
const INJECTION_PATTERNS = [/ignore\s+(all\s+)?previous/i, /disregard\s+(all\s+)?instructions/i, /you\s+are\s+now/i, /system\s*:\s*/i, /<\s*script/i];

export interface ReferenceScreenResult {
  safe: ReferenceRef[];
  blocked: { ref: ReferenceRef; pattern: string }[];
}

/**
 * Deterministic injection-safety scan (I9) — never bypassable by a model
 * call, always applied before a reference's description reaches a prompt.
 * A blocked reference is dropped entirely, not sanitized-and-kept: this is
 * the F-SEC-02 boundary (indirect prompt injection via references).
 */
export function screenReferenceInjection(refs: ReferenceRef[]): ReferenceScreenResult {
  const safe: ReferenceRef[] = [];
  const blocked: { ref: ReferenceRef; pattern: string }[] = [];
  for (const ref of refs) {
    const text = ref.description ?? '';
    const hit = INJECTION_PATTERNS.find((p) => p.test(text));
    if (hit) {
      blocked.push({ ref, pattern: hit.source });
    } else {
      safe.push(ref);
    }
  }
  return { safe, blocked };
}

/**
 * Optional relevance screen (plan C2.4: "with an optional relevance
 * screen") — a SINGLE vision call regardless of ref count, asking the
 * given provider which references are genuinely relevant to this brief.
 * Fails OPEN (keeps all refs) on any error: refs are soft, capped, and
 * dissolved-into-principles-only, so an unscreened ref is a mild quality
 * cost, never a correctness risk — matching C2.3's non-blocking-degrade
 * posture for retrieval.
 */
export async function screenReferenceRelevance(refs: ReferenceRef[], brief: Brief, provider: ModelProvider): Promise<ReferenceRef[]> {
  if (refs.length === 0) return [];

  try {
    const images = loadReferenceImages(refs);
    if (images.length === 0) return refs; // nothing readable to screen — pass through unscreened

    const result = await provider.complete({
      system:
        'You screen visual references for relevance to a design brief before a designer sees them. ' +
        'You are NOT designing anything and you are NOT judging quality. ' +
        'Reply with ONLY JSON: {"relevant": [0, 2]} — a 0-indexed array of the reference numbers ' +
        '(in the order given) that are genuinely relevant inspiration for this brief. ' +
        "Exclude references that are off-topic, low-signal, or unrelated to the brief's domain/mood.",
      messages: [
        {
          role: 'user',
          content: `BRIEF:\n  Industry: ${brief.industry}\n  Audience: ${brief.audience}\n  Goal: ${brief.goal}\n  Section: ${brief.section.name}\n\n` + `${images.length} reference image(s) attached, numbered 0-${images.length - 1} in the order given. Which are relevant? Reply with ONLY the JSON.`,
        },
      ],
      images,
      maxTokens: 200,
      temperature: 0,
    });

    let text = result.text.trim();
    const fence = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (fence) text = fence[1].trim();
    const parsed = JSON.parse(text);

    if (Array.isArray(parsed.relevant)) {
      const keep = new Set(parsed.relevant.filter((n: unknown) => typeof n === 'number'));
      const filtered = refs.filter((_, i) => keep.has(i));
      console.log(`🖼 Reference relevance screen: kept ${filtered.length}/${refs.length}.`);
      return filtered;
    }
  } catch (err) {
    console.warn(`⚠ Reference relevance screen failed (non-blocking, all refs kept): ${err instanceof Error ? err.message : err}`);
  }
  return refs;
}
