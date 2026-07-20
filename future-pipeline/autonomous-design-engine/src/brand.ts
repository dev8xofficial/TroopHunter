/**
 * ADE — Brand Derivation + Approval
 *
 * Brand establishment workflow (spec 06 §2, 04 §2.1):
 * - deriveBrand: palette/type verbatim from BrandData; personality/tone/motion DERIVED by AI
 * - approveBrand: status → frozen, version bumped
 * - reDeriveBrand: new version, recompute derived fields
 * - Brand a11y pre-check at approval (F-BRD-04)
 *
 * @module brand
 */

import type { ModelProvider } from './model.js';
import type {
  BrandData,
  BrandFoundation,
  BrandIdentity,
  Brief,
} from './schema.js';
import { schemaGate } from './guardrails.js';
import {
  readBrand,
  writeBrand,
  lockClient,
  unlockClient,
} from './store.js';
import { phaseExitReview } from './qa.js';
import { randomUUID } from 'crypto';

export class BrandError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'BrandError';
  }
}

// ─── Brand Derivation ──────────────────────────────────────────────

/**
 * Derive a Brand Foundation from BrandData + business context.
 * Palette/type are provided verbatim; personality, tone, motion_voice are DERIVED.
 */
export async function deriveBrand(
  brandData: BrandData,
  brief: Brief,
  provider: ModelProvider,
): Promise<BrandFoundation> {
  if (brandData.client_id.trim() === '') {
    throw new BrandError('BrandData client_id is required.', 'INVALID_CLIENT');
  }

  const { system, user } = buildDeriveBrandPrompt(brandData, brief);

  const result = await provider.complete({
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 4_000,
    temperature: 0.4, // moderate creativity for brand strategy
  });

  // Parse structured output
  let parsed: unknown;
  let jsonText = result.text.trim();
  const fenceMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch) jsonText = fenceMatch[1].trim();

  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new BrandError(
      `Brand derivation returned invalid JSON: ${jsonText.slice(0, 200)}`,
      'PARSE_ERROR',
    );
  }

  // Schema gate on the identity output
  const gateResult = schemaGate<BrandIdentity>('brandIdentity', parsed);
  if (!gateResult.data) {
    throw new BrandError(
      `Brand identity schema validation failed: ${gateResult.violations.map(v => v.message).join('; ')}`,
      'SCHEMA_ERROR',
    );
  }

  const identity = gateResult.data;

  // Ensure palette/type come verbatim from BrandData (never from AI)
  identity.palette = brandData.palette.map((p, i) => ({
    role: p.role,
    value: p.value,
    usage: identity.palette[i]?.usage ?? '',
  }));
  identity.typography = brandData.typography;
  if (brandData.logo_ref) {
    identity.logo_ref = brandData.logo_ref;
  }

  const foundation: BrandFoundation = {
    client_id: brandData.client_id,
    version: 1,
    status: 'draft',
    identity,
    provenance: {
      palette: 'provided',
      typography: 'provided',
      motion_voice: 'derived',
      personality: 'derived',
      tone: 'derived',
      derived_from: `brand-data v1 + brief (${brief.client} / ${brief.industry})`,
    },
  };

  return foundation;
}

// ─── Brand Phase-Exit Review (C1.3) ────────────────────────────────

export interface BrandReviewResult {
  verdict: 'pass' | 'fail';
  reasoning: string;
}

/**
 * Fresh-context Critic review of a derived Brand Foundation against a
 * brand-specific rubric, per spec/11 §2.3 / plan C1.3: "does the derived
 * personality/tone/motion fit the business context + provided palette/type?
 * are the directions distinct and justified?"
 */
export async function reviewBrandFit(
  foundation: BrandFoundation,
  brief: Brief,
  criticProvider: ModelProvider,
): Promise<BrandReviewResult> {
  const result = await criticProvider.complete({
    system: 'You are a senior brand strategist reviewing a DERIVED brand identity before it is shown to a human for approval. ' +
      'You did not create this brand. Judge only whether the derived personality/tone/motion-voice genuinely fit the business context and the provided (fixed) palette/typography. ' +
      'Reply with ONLY valid JSON: {"verdict": "pass"|"fail", "reasoning": "specific, actionable reason"}.',
    messages: [{
      role: 'user',
      content: `BUSINESS CONTEXT:\n  Client: ${brief.client}\n  Industry: ${brief.industry}\n  Audience: ${brief.audience}\n  Goal: ${brief.goal}\n\n` +
        `DERIVED BRAND (palette/typography are FIXED givens; personality/tone/motion_voice are what you are judging):\n` +
        `  Personality: ${foundation.identity.personality.join(', ')}\n` +
        `  Tone: ${foundation.identity.tone}\n` +
        `  Motion voice: ${foundation.identity.motion_voice}\n\n` +
        `Does this derived strategy genuinely fit the business context above, or does it read as generic/off-brief? Verdict + reasoning as JSON.`,
    }],
    maxTokens: 500,
    temperature: 0.2,
  });

  try {
    let text = result.text.trim();
    const fence = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (fence) text = fence[1].trim();
    const parsed = JSON.parse(text);
    if (parsed.verdict === 'pass' || parsed.verdict === 'fail') {
      return { verdict: parsed.verdict, reasoning: String(parsed.reasoning ?? '') };
    }
  } catch {
    // fall through to fail-closed default below
  }
  return { verdict: 'fail', reasoning: `Brand review output could not be parsed: ${result.text.slice(0, 200)}` };
}

const BRAND_REVIEW_MAX_TRIES = 2;

/**
 * Bounded Phase-Exit Review before a human ever sees a derived brand
 * (C1.3): fresh-context Critic review (rubric above) + a cross-family
 * second-judge review (qa.ts phaseExitReview, local provider — disagreement
 * escalates), each cycle re-deriving on failure. Bounded to
 * BRAND_REVIEW_MAX_TRIES — never loops unbounded; the last attempt is
 * returned to the human regardless of verdict (a review that never certifies
 * "good enough" would just replace one human gate with an unremovable
 * machine one).
 */
export async function reviewAndReDeriveBrand(
  clientId: string,
  brandData: BrandData,
  brief: Brief,
  criticProvider: ModelProvider,
  genProvider: ModelProvider,
  outDir: string,
): Promise<{ foundation: BrandFoundation; tries: number; finalVerdict: BrandReviewResult }> {
  const runId = randomUUID().slice(0, 8);
  let currentBrandData = brandData;
  let foundation = await deriveBrand(currentBrandData, brief, genProvider);
  let review = await reviewBrandFit(foundation, brief, criticProvider);

  await phaseExitReview(outDir, runId, `brand foundation for "${clientId}"`, JSON.stringify(foundation.identity), review.verdict);

  let tries = 1;
  while (review.verdict === 'fail' && tries < BRAND_REVIEW_MAX_TRIES) {
    console.warn(`⚠ Brand review failed (try ${tries}/${BRAND_REVIEW_MAX_TRIES}): ${review.reasoning}`);
    console.warn('  Re-deriving (never hand-patching a derived field)...');
    foundation = await deriveBrand(currentBrandData, brief, genProvider);
    review = await reviewBrandFit(foundation, brief, criticProvider);
    await phaseExitReview(outDir, runId, `brand foundation for "${clientId}" (retry ${tries + 1})`, JSON.stringify(foundation.identity), review.verdict);
    tries++;
  }

  if (review.verdict === 'fail') {
    console.warn(`⚠ Brand review still failing after ${tries} tries — escalating to human as-is (bounded, per C1.3).`);
  } else {
    console.log(`✅ Brand review passed after ${tries} attempt(s).`);
  }

  return { foundation, tries, finalVerdict: review };
}

// ─── Brand Approval ────────────────────────────────────────────────

/**
 * Approve and freeze a brand foundation.
 * Runs a11y pre-check on the palette before freezing (F-BRD-04).
 */
export function approveBrand(
  clientId: string,
  approvedBy: string,
): BrandFoundation {
  const lockId = lockClient(clientId);
  try {
    const existing = readBrand(clientId);
    if (!existing) {
      throw new BrandError(
        `No brand foundation found for client "${clientId}". Derive one first.`,
        'NOT_FOUND',
      );
    }

    if (existing.status === 'frozen') {
      throw new BrandError(
        `Brand for "${clientId}" is already frozen (v${existing.version}).`,
        'ALREADY_FROZEN',
      );
    }

    // A11y pre-check: verify palette has accessible primary pairings (F-BRD-04)
    const a11yIssues = checkPaletteAccessibility(existing.identity.palette);
    if (a11yIssues.length > 0) {
      throw new BrandError(
        `Brand palette fails accessibility check:\n${a11yIssues.join('\n')}\n` +
        `Fix the palette in brand-data and re-derive before approving.`,
        'A11Y_FAILED',
      );
    }

    const frozen: BrandFoundation = {
      ...existing,
      version: existing.version + 1,
      status: 'frozen',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    };

    writeBrand(clientId, frozen, existing.version);
    console.log(`✅ Brand frozen for "${clientId}" (v${frozen.version}), approved by ${approvedBy}`);
    return frozen;
  } finally {
    unlockClient(clientId, lockId);
  }
}

// ─── Re-Derivation ────────────────────────────────────────────────

/**
 * Re-derive brand from updated BrandData.
 * Bumps version; dependent derived fields recompute; no stale leaf (04 §2.1).
 */
export async function reDeriveBrand(
  clientId: string,
  updatedBrandData: BrandData,
  brief: Brief,
  provider: ModelProvider,
): Promise<BrandFoundation> {
  if (updatedBrandData.client_id !== clientId) {
    throw new BrandError(
      `BrandData client_id "${updatedBrandData.client_id}" does not match requested client "${clientId}".`,
      'CLIENT_MISMATCH',
    );
  }

  const lockId = lockClient(clientId);
  try {
    const existing = readBrand(clientId);
    const newVersion = existing ? existing.version + 1 : 1;

    // Re-derive everything
    const foundation = await deriveBrand(updatedBrandData, brief, provider);
    foundation.version = newVersion;
    foundation.provenance.derived_from =
      `brand-data v${newVersion} + brief (${brief.client} / ${brief.industry})`;

    // Write as draft (user must re-approve)
    writeBrand(clientId, foundation, existing ? existing.version : null);
    console.log(`Brand re-derived for "${clientId}" -> v${newVersion} (draft)`);
    return foundation;
  } finally {
    unlockClient(clientId, lockId);
  }
}

// ─── Save Draft ────────────────────────────────────────────────────

/**
 * Save a derived brand foundation as a draft.
 */
export function saveBrandDraft(clientId: string, foundation: BrandFoundation): void {
  if (foundation.client_id !== clientId) {
    throw new BrandError(
      `Brand foundation client_id "${foundation.client_id}" does not match "${clientId}".`,
      'CLIENT_MISMATCH',
    );
  }

  const lockId = lockClient(clientId);
  try {
    const existing = readBrand(clientId);
    writeBrand(clientId, foundation, existing ? existing.version : null);
  } finally {
    unlockClient(clientId, lockId);
  }
}

// ─── A11y Pre-Check (F-BRD-04) ────────────────────────────────────

/**
 * Check that the brand palette has at least one accessible text+background pairing.
 * Uses WCAG 2.1 AA: ≥4.5:1 for normal text, ≥3:1 for large text.
 * Returns array of issue strings (empty = pass).
 */
export function checkPaletteAccessibility(
  palette: { role: string; value: string; usage?: string }[],
): string[] {
  const issues: string[] = [];

  // Find primary/surface pairings to check
  const surfaceColors = palette.filter(p =>
    ['surface', 'background', 'bg', 'base'].includes(p.role.toLowerCase()),
  );
  const textColors = palette.filter(p =>
    ['primary', 'text', 'foreground', 'fg'].includes(p.role.toLowerCase()),
  );
  const accentColors = palette.filter(p =>
    ['accent', 'cta', 'action', 'link'].includes(p.role.toLowerCase()),
  );

  // If no explicit surface/text, use first two colors as a rough pair
  if (surfaceColors.length === 0 && palette.length >= 2) {
    surfaceColors.push(palette[palette.length - 1]); // lightest likely last
  }
  if (textColors.length === 0 && palette.length >= 1) {
    textColors.push(palette[0]); // darkest likely first
  }

  let hasAccessibleTextPair = false;
  let bestTextPair = { ratio: 0, text: '', surface: '' };
  let hasAccessibleAccentPair = accentColors.length === 0;
  let bestAccentPair = { ratio: 0, accent: '', surface: '' };

  // Check that the palette contains usable primary pairings.
  for (const surface of surfaceColors) {
    for (const text of textColors) {
      const ratio = contrastRatio(text.value, surface.value);
      if (ratio > bestTextPair.ratio) {
        bestTextPair = { ratio, text: text.role, surface: surface.role };
      }
      if (ratio >= 4.5) hasAccessibleTextPair = true;
    }
    for (const accent of accentColors) {
      const ratio = contrastRatio(accent.value, surface.value);
      if (ratio > bestAccentPair.ratio) {
        bestAccentPair = { ratio, accent: accent.role, surface: surface.role };
      }
      if (ratio >= 3.0) hasAccessibleAccentPair = true;
    }
  }

  if (!hasAccessibleTextPair) {
    issues.push(
      `No accessible text/surface pairing found. Best was "${bestTextPair.text}" on "${bestTextPair.surface}" at ${bestTextPair.ratio.toFixed(2)}:1; need >=4.5:1 AA.`,
    );
  }

  if (!hasAccessibleAccentPair) {
    issues.push(
      `No accessible accent/surface pairing found. Best was "${bestAccentPair.accent}" on "${bestAccentPair.surface}" at ${bestAccentPair.ratio.toFixed(2)}:1; need >=3:1 for large text/UI.`,
    );
  }

  return issues;
}

// ─── Contrast Ratio Utilities ──────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  const full = h.length === 3
    ? h.split('').map(c => c + c).join('')
    : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── Brand Derivation Prompt ───────────────────────────────────────

function buildDeriveBrandPrompt(
  brandData: BrandData,
  brief: Brief,
): { system: string; user: string } {
  const system = `You are a brand strategist AI. Given a client's visual identity (palette and typography) and their business context, you DERIVE the brand's personality, tone of voice, and motion voice.

RULES:
1. The palette and typography are FACTS the client owns — you do NOT change them.
2. You DERIVE: personality (array of 3-5 traits), tone (brand voice description), motion_voice (animation/motion style description), and usage rules for each palette color.
3. Ground every derivation in the provided givens + business context. Don't invent disconnected traits.
4. Return ONLY valid JSON matching the exact schema below. No markdown, no explanation.

Required JSON schema:
{
  "palette": [{ "role": "string", "value": "#hex", "usage": "when/how to use this color" }],
  "typography": [{ "role": "display|ui|mono", "family": "string", "fallback": "string" }],
  "motion_voice": "string describing the animation/motion style",
  "personality": ["trait1", "trait2", "trait3", ...],
  "tone": "string describing the brand's written voice"
}`;

  const paletteDesc = brandData.palette
    .map(p => `  • ${p.role}: ${p.value}`)
    .join('\n');
  const typoDesc = brandData.typography
    .map(t => `  • ${t.role}: ${t.family} (fallback: ${t.fallback})`)
    .join('\n');

  const user = `BRAND DERIVATION REQUEST

CLIENT: ${brief.client}
INDUSTRY: ${brief.industry}
${brief.location ? `LOCATION: ${brief.location}` : ''}
AUDIENCE: ${brief.audience}
GOAL: ${brief.goal}

PROVIDED PALETTE (exact — do not change):
${paletteDesc}

PROVIDED TYPOGRAPHY (exact — do not change):
${typoDesc}
${brandData.logo_ref ? `\nLOGO: ${brandData.logo_ref}` : ''}

Derive the personality, tone, motion voice, and color usage rules from these givens + the business context above. Return ONLY the JSON.`;

  return { system, user };
}
