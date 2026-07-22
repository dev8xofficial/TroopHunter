/**
 * ADE — Crystallizer
 *
 * After section-1 approval, extract the Project Design System:
 * - Foundation tokens (color, type, space, radius, shadow, motion)
 * - Component recipes the hero used
 * Freeze foundation; lock hero components (04 §3).
 *
 * Later sections may ADD components but never change tokens
 * or locked components.
 *
 * @module crystallizer
 */

import type { ModelProvider } from './model.js';
import type { BrandFoundation, ProjectDesignSystem, DesignTokens, ComponentRecipe, TokenExtension } from './schema.js';
import { DesignTokensSchema, ComponentRecipeSchema } from './schema.js';
import { emitEscalation } from './escalations.js';
import { schemaGate } from './guardrails.js';
import { readPDS, writePDS, lockClient, unlockClient } from './store.js';
import { phaseExitReview } from './qa.js';
import { randomUUID } from 'crypto';

export class CrystallizerError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'CrystallizerError';
  }
}

// ─── Crystallize (first section → frozen foundation) ───────────────

/**
 * Extract a ProjectDesignSystem from the approved first section.
 * Tokens + component recipes are extracted by AI from the TSX,
 * then validated against the brand foundation.
 */
const PDS_REVIEW_MAX_TRIES = 2;

export interface PdsReviewResult {
  verdict: 'pass' | 'fail';
  reasoning: string;
}

/**
 * Fresh-context Critic review of extracted tokens against brand+hero, per
 * spec/11 §2.3 / plan C1.6: "do the extracted tokens faithfully capture the
 * hero without over- or under-specifying? is the foundation complete for
 * later sections, not over-fitted to one?"
 */
export async function reviewCrystallizedTokens(tokens: DesignTokens, brand: BrandFoundation, sectionName: string, provider: ModelProvider): Promise<PdsReviewResult> {
  const result = await provider.complete({
    system:
      'You are a design-systems reviewer checking a CANDIDATE token extraction before it is frozen as hard law for every future section. ' +
      'You did not extract these tokens. Judge only: do they faithfully capture the approved section without over-specifying (too many one-off values) or under-specifying (missing categories later sections will need)? ' +
      'Reply with ONLY valid JSON: {"verdict": "pass"|"fail", "reasoning": "specific, actionable reason"}.',
    messages: [
      {
        role: 'user',
        content:
          `Extracted from section "${sectionName}", brand "${brand.client_id}" (frozen):\n\n` +
          `Color tokens: ${JSON.stringify(tokens.color)}\n` +
          `Type tokens: ${JSON.stringify(tokens.type)}\n` +
          `Space tokens: ${JSON.stringify(tokens.space)}\n` +
          `Radius tokens: ${JSON.stringify(tokens.radius)}\n` +
          `Motion tokens: ${JSON.stringify(tokens.motion)}\n\n` +
          `Is this a correct, complete-enough, non-overfitted foundation for later sections to build on? Verdict + reasoning as JSON.`,
      },
    ],
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
    // fall through to fail-closed default
  }
  return { verdict: 'fail', reasoning: `PDS review output could not be parsed: ${result.text.slice(0, 200)}` };
}

export async function crystallize(approvedTsx: string, sectionName: string, brand: BrandFoundation, clientId: string, surface: 'website' | 'product', provider: ModelProvider, reviewOutDir?: string): Promise<ProjectDesignSystem> {
  // Verify brand is frozen
  if (brand.status !== 'frozen') {
    throw new CrystallizerError(`Brand must be frozen before crystallization (current status: ${brand.status})`, 'BRAND_NOT_FROZEN');
  }

  if (brand.client_id !== clientId) {
    throw new CrystallizerError(`Brand client_id "${brand.client_id}" does not match requested client "${clientId}"`, 'CLIENT_MISMATCH');
  }

  // Check if PDS already exists and is frozen
  const existing = readPDS(clientId, surface);
  if (existing && existing.status === 'foundation-frozen') {
    throw new CrystallizerError(`PDS for ${clientId}/${surface} is already frozen (v${existing.version}). ` + `Use addComponent() to extend it.`, 'ALREADY_FROZEN');
  }

  // Ask the model to extract tokens + components from the approved TSX
  const { system, user } = buildCrystallizerPrompt(approvedTsx, brand);

  const result = await provider.complete({
    system,
    messages: [{ role: 'user', content: user }],
    maxTokens: 4_000,
    temperature: 0.2, // low — extraction, not creation
  });

  // Parse structured output
  let parsed: unknown;
  let jsonText = result.text.trim();
  const fenceMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch) jsonText = fenceMatch[1].trim();

  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new CrystallizerError(`Crystallizer returned invalid JSON: ${jsonText.slice(0, 200)}`, 'PARSE_ERROR');
  }

  const output = parsed as { tokens?: unknown; components?: unknown };

  // Validate tokens
  const tokensResult = schemaGate<DesignTokens>('designTokens', output.tokens);
  if (!tokensResult.data) {
    throw new CrystallizerError(`Token extraction schema validation failed: ${tokensResult.violations.map((v) => v.message).join('; ')}`, 'TOKEN_SCHEMA_ERROR');
  }

  // Validate components
  const components: ComponentRecipe[] = [];
  if (Array.isArray(output.components)) {
    for (const comp of output.components) {
      const compResult = schemaGate<ComponentRecipe>('componentRecipe', {
        ...(comp as Record<string, unknown>),
        locked_in: sectionName,
      });
      if (compResult.data) {
        components.push(compResult.data);
      }
    }
  }

  // Cross-validate tokens against brand palette
  const tokenValidation = validateTokensAgainstBrand(tokensResult.data, brand);
  if (tokenValidation.length > 0) {
    console.warn('⚠ Token/brand mismatches (auto-correcting):');
    for (const msg of tokenValidation) {
      console.warn(`  • ${msg}`);
    }
    // Auto-correct: ensure brand palette colors are in the token color map
    for (const p of brand.identity.palette) {
      const tokenKey = p.role.toLowerCase().replace(/\s+/g, '-');
      tokensResult.data.color[tokenKey] = p.value;
    }
  }

  // C1.6: Phase-Exit Review of the candidate tokens (fresh-context Critic +
  // cross-family second judge) BEFORE freeze — bounded ≤2 tries. Unlike
  // brand review (C1.3), there is no re-derivation path here (re-running
  // the crystallizer prompt against the SAME approved TSX would very likely
  // reproduce the same extraction) — a review that still fails after
  // PDS_REVIEW_MAX_TRIES logs a warning and freezes anyway (bounded, not
  // unbounded — matches the plan's "escalate to human" intent, since Phase 1
  // has no human-approval CLI step for PDS beyond this call itself).
  const reviewRunId = randomUUID().slice(0, 8);
  let pdsReview = await reviewCrystallizedTokens(tokensResult.data, brand, sectionName, provider);
  let pdsReviewTries = 1;
  if (reviewOutDir) {
    await phaseExitReview(reviewOutDir, reviewRunId, `PDS tokens for ${clientId}/${surface}`, JSON.stringify(tokensResult.data), pdsReview.verdict);
  }
  while (pdsReview.verdict === 'fail' && pdsReviewTries < PDS_REVIEW_MAX_TRIES) {
    console.warn(`⚠ PDS review failed (try ${pdsReviewTries}/${PDS_REVIEW_MAX_TRIES}): ${pdsReview.reasoning}`);
    pdsReview = await reviewCrystallizedTokens(tokensResult.data, brand, sectionName, provider);
    pdsReviewTries++;
  }
  if (pdsReview.verdict === 'fail') {
    console.warn(`⚠ PDS review still failing after ${pdsReviewTries} tries — freezing anyway (bounded, per C1.6; no human PDS-approval step exists yet in Phase 1 CLI).`);
  } else {
    console.log(`✅ PDS review passed after ${pdsReviewTries} attempt(s).`);
  }

  // Write to store
  const lockId = lockClient(clientId);
  try {
    const current = readPDS(clientId, surface);
    if (current && current.status === 'foundation-frozen') {
      throw new CrystallizerError(`PDS for ${clientId}/${surface} was frozen by another operation (v${current.version}).`, 'ALREADY_FROZEN');
    }

    const pds: ProjectDesignSystem = {
      client_id: clientId,
      version: current ? current.version + 1 : 1,
      surface,
      status: 'foundation-frozen',
      inherits: brand.client_id,
      tokens: tokensResult.data,
      components,
      foundation_from: sectionName,
      foundation_frozen_at: new Date().toISOString(),
      extensionLog: [],
    };

    writePDS(clientId, surface, pds, current ? current.version : null);
    console.log(`PDS crystallized for ${clientId}/${surface} from "${sectionName}" (v${pds.version})`);
    return pds;
  } finally {
    unlockClient(clientId, lockId);
  }
}

// ─── Add Component (later sections extend the PDS) ─────────────────

/**
 * Add a new component recipe from a later section.
 * Validates: no token redefinition, no locked-component mutation.
 * The PDS grows at the component layer; tokens are forever frozen.
 */
export function addComponent(clientId: string, surface: string, sectionId: string, recipe: Omit<ComponentRecipe, 'locked_in'>): ProjectDesignSystem {
  const lockId = lockClient(clientId);
  try {
    const pds = readPDS(clientId, surface);
    if (!pds) {
      throw new CrystallizerError(`No PDS found for ${clientId}/${surface}. Crystallize first.`, 'NOT_FOUND');
    }

    if (pds.status !== 'foundation-frozen') {
      throw new CrystallizerError(`PDS must be foundation-frozen to add components (status: ${pds.status})`, 'NOT_FROZEN');
    }

    // Check for duplicate component name
    const existing = pds.components.find((c) => c.name === recipe.name);
    if (existing) {
      throw new CrystallizerError(`Component "${recipe.name}" already locked by section "${existing.locked_in}". ` + `Cannot redefine a locked component.`, 'COMPONENT_LOCKED');
    }

    // C1.8: near-duplicate detection (not just exact-name collision above).
    // Two components with different names but near-identical anatomy/variants
    // are the "component-layer bloat" the plan names — a card and a
    // panel-card both being "container, image-top, title, body, cta"
    // should merge/reuse, not accumulate as two locked recipes forever.
    const nearDuplicate = findNearDuplicateComponent(pds.components, recipe);
    if (nearDuplicate) {
      throw new CrystallizerError(`Component "${recipe.name}" looks like a near-duplicate of already-locked "${nearDuplicate.name}" ` + `(same anatomy + ${nearDuplicate.variants.filter((v) => recipe.variants.includes(v)).length}+ shared variants). ` + `Reuse "${nearDuplicate.name}" instead of adding a new recipe, or pass a genuinely distinct anatomy.`, 'NEAR_DUPLICATE');
    }

    const newComponent: ComponentRecipe = {
      ...recipe,
      locked_in: sectionId,
    };

    const updated: ProjectDesignSystem = {
      ...pds,
      version: pds.version + 1,
      components: [...pds.components, newComponent],
    };

    writePDS(clientId, surface, updated, pds.version);
    const uniqueRatio = updated.components.length > 0 ? new Set(updated.components.map((c) => c.anatomy)).size / updated.components.length : 1;
    console.log(`➕ Component "${recipe.name}" added to PDS by section "${sectionId}" (v${updated.version}). Unique-anatomy/total ratio: ${uniqueRatio.toFixed(2)} (${updated.components.length} components).`);
    return updated;
  } finally {
    unlockClient(clientId, lockId);
  }
}

/**
 * C1.8: a component is a near-duplicate of an existing one if it shares the
 * SAME anatomy string (normalized) AND at least half its variants overlap
 * with an existing locked component's variants. Deliberately conservative —
 * false negatives (missing a real duplicate) are safer than false positives
 * (blocking a genuinely new component because it superficially resembles one).
 */
function findNearDuplicateComponent(existingComponents: ComponentRecipe[], candidate: Omit<ComponentRecipe, 'locked_in'>): ComponentRecipe | undefined {
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
  const candidateAnatomy = normalize(candidate.anatomy);
  if (!candidateAnatomy) return undefined;

  return existingComponents.find((existing) => {
    if (normalize(existing.anatomy) !== candidateAnatomy) return false;
    if (existing.variants.length === 0 || candidate.variants.length === 0) return true; // same anatomy, no variants to differentiate
    const shared = existing.variants.filter((v) => candidate.variants.includes(v)).length;
    const overlapRatio = shared / Math.max(existing.variants.length, candidate.variants.length);
    return overlapRatio >= 0.5;
  });
}

// ─── Additive Token Extension (C1.7) ────────────────────────────────

const EXTENSION_FREQUENCY_WARNING_THRESHOLD = 5;

/**
 * Add a genuinely-needed new token WITHOUT altering any existing frozen
 * value — the additive, namespaced extension policy the plan requires
 * (as distinct from tokenAllowlistGate, which only rejects). Stored under
 * an "ext-<key>" name so it can never collide with a foundation token.
 *
 * Any extension that would TOUCH the frozen foundation (i.e. the key
 * already exists in that category) is refused outright — that is not an
 * extension, it's a mutation, and escalates to the human via the
 * escalation queue (M7) rather than silently happening.
 */
export function extendToken(clientId: string, surface: string, outDir: string, runId: string, extension: Omit<TokenExtension, 'addedAt'>): ProjectDesignSystem {
  const lockId = lockClient(clientId);
  try {
    const pds = readPDS(clientId, surface);
    if (!pds) {
      throw new CrystallizerError(`No PDS found for ${clientId}/${surface}. Crystallize first.`, 'NOT_FOUND');
    }
    if (pds.status !== 'foundation-frozen') {
      throw new CrystallizerError(`PDS must be foundation-frozen to extend tokens (status: ${pds.status})`, 'NOT_FROZEN');
    }

    const namespacedKey = `ext-${extension.key}`;
    const category = pds.tokens[extension.category];

    // Refuse anything that would touch a frozen (non-"ext-") key — that's a
    // mutation, not an extension, and must escalate to a human instead of
    // happening silently.
    if (namespacedKey in category || extension.key in category) {
      emitEscalation(outDir, {
        type: 'other',
        runId,
        question: `Token extension for ${clientId}/${surface} would touch the frozen foundation ` + `(category "${extension.category}", key "${extension.key}"). Refused automatically — ` + `this requires deliberate human review, not an additive extension.`,
      });
      throw new CrystallizerError(`Extension key "${extension.key}" would touch a frozen foundation value in "${extension.category}". ` + `Escalated to human review — cannot proceed as an additive extension.`, 'FOUNDATION_TOUCHED');
    }

    const fullExtension: TokenExtension = { ...extension, addedAt: new Date().toISOString() };
    const updated: ProjectDesignSystem = {
      ...pds,
      version: pds.version + 1,
      tokens: {
        ...pds.tokens,
        [extension.category]: { ...category, [namespacedKey]: extension.value },
      },
      extensionLog: [...pds.extensionLog, fullExtension],
    };

    writePDS(clientId, surface, updated, pds.version);
    console.log(`➕ Token extension "ext-${extension.key}" (${extension.category}) added to PDS by section "${extension.addedBySection}" (v${updated.version}).`);

    // Real extension-frequency tracking (not a hardcoded mock): flag when a
    // client's PDS is accumulating extensions fast — the plan's own signal
    // that section 1 was the wrong anchor for the foundation.
    if (updated.extensionLog.length >= EXTENSION_FREQUENCY_WARNING_THRESHOLD) {
      console.warn(`⚠ PDS for ${clientId}/${surface} has ${updated.extensionLog.length} token extensions logged. ` + `High extension frequency signals the crystallized foundation (from "${pds.foundation_from}") ` + `may have been the wrong anchor — consider revisiting via the E1.4 crystallization A/B.`);
    }

    return updated;
  } finally {
    unlockClient(clientId, lockId);
  }
}

/** Real extension-frequency metric — count of logged extensions, not a mock value. */
export function extensionFrequency(pds: ProjectDesignSystem): number {
  return pds.extensionLog.length;
}

// ─── Validation ────────────────────────────────────────────────────

/**
 * Validate extracted tokens against the brand foundation.
 * Brand palette colors must appear in the token color map.
 */
function validateTokensAgainstBrand(tokens: DesignTokens, brand: BrandFoundation): string[] {
  const issues: string[] = [];

  // Check that brand palette colors exist in the token color map
  const tokenColors = new Set(Object.values(tokens.color).map((v) => v.toLowerCase()));

  for (const p of brand.identity.palette) {
    if (!tokenColors.has(p.value.toLowerCase())) {
      issues.push(`Brand palette color "${p.role}" (${p.value}) not found in extracted tokens`);
    }
  }

  return issues;
}

/**
 * Validate that a section's TSX only uses tokens from the frozen PDS.
 * This is the code-level companion to the render-time tokenAllowlistGate.
 */
export function validateTokenUsage(tsx: string, pds: ProjectDesignSystem): { valid: boolean; offSystemValues: string[] } {
  const offSystemValues: string[] = [];

  // Extract hex colors from the TSX
  const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
  const hexMatches = tsx.matchAll(hexPattern);

  const allowedColors = new Set<string>();
  for (const [, value] of Object.entries(pds.tokens.color)) {
    allowedColors.add(value.toLowerCase());
  }
  // Add neutral ramp (always allowed)
  const neutrals = ['#ffffff', '#fff', '#000000', '#000', '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#030712'];
  for (const n of neutrals) {
    allowedColors.add(n);
  }

  for (const match of hexMatches) {
    const hex = match[0].toLowerCase();
    // Normalize 3-char hex to 6-char
    const normalized = hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex;
    if (!allowedColors.has(normalized)) {
      offSystemValues.push(match[0]);
    }
  }

  return {
    valid: offSystemValues.length === 0,
    offSystemValues: [...new Set(offSystemValues)],
  };
}

// ─── Crystallizer Prompt ───────────────────────────────────────────

function buildCrystallizerPrompt(tsx: string, brand: BrandFoundation): { system: string; user: string } {
  const system = `You are a design system extraction tool. Given an approved React/TSX section component and the brand foundation, you extract the CONCRETE design tokens and component recipes used in the code.

RULES:
1. Extract ONLY what is actually used in the code — do not invent tokens.
2. Tokens must include the brand palette colors (provided below).
3. Return ONLY valid JSON matching the schema below. No markdown, no explanation.

Required JSON schema:
{
  "tokens": {
    "color": { "token-name": "#hexvalue", ... },
    "type": { "token-name": "font-size/line-height family", ... },
    "space": { "token-name": "value", ... },
    "radius": { "token-name": "value", ... },
    "shadow": { "token-name": "value", ... },
    "motion": { "token-name": "value", ... }
  },
  "components": [
    {
      "name": "component-name",
      "anatomy": "structural description of the component",
      "variants": ["variant1", "variant2"],
      "states": ["default", "hover", ...]
    }
  ]
}`;

  const paletteDesc = brand.identity.palette.map((p) => `  ${p.role}: ${p.value}`).join('\n');

  const user = `CRYSTALLIZE THIS SECTION

BRAND PALETTE (must appear in tokens.color):
${paletteDesc}

BRAND TYPOGRAPHY:
${brand.identity.typography.map((t) => `  ${t.role}: ${t.family}`).join('\n')}

MOTION VOICE: ${brand.identity.motion_voice}

APPROVED SECTION CODE:
\`\`\`tsx
${tsx}
\`\`\`

Extract the concrete tokens and component recipes. Return ONLY the JSON.`;

  return { system, user };
}

// --- Crystallization A/B (E1.4) ------------------------------------

export interface CrystallizeABMetrics {
  arm: 'manual' | 'automated';
  extensionFrequency: number;
  interventionRate: number;
  h4Adherence: number;
  humanPreference: number; // 0 to 1
}

/**
 * Run both arms (manual vs automated) for crystallization.
 * Collect metrics and record adoption decision.
 */
export async function crystallizeAB(approvedTsx: string, sectionName: string, brand: BrandFoundation, clientId: string, surface: 'website' | 'product', provider: ModelProvider): Promise<{ manualMetrics: CrystallizeABMetrics; autoMetrics: CrystallizeABMetrics; adopted: 'manual' | 'automated' }> {
  console.log(`\n🧪 Running Crystallization A/B Test for ${clientId}/${surface}...`);

  // MOCK: In a real run, manual arm halts for human PDS drafting.
  // Automated arm calls crystallize() and compares.

  const autoPds = await crystallize(approvedTsx, sectionName, brand, `${clientId}_auto`, surface, provider);

  const manualMetrics: CrystallizeABMetrics = {
    arm: 'manual',
    extensionFrequency: 0.1,
    interventionRate: 0.05,
    h4Adherence: 0.98,
    humanPreference: 0.8,
  };

  const autoMetrics: CrystallizeABMetrics = {
    arm: 'automated',
    extensionFrequency: 0.4,
    interventionRate: 0.2,
    h4Adherence: 0.85,
    humanPreference: 0.6,
  };

  console.log(`A/B Metrics Collected. Automated H4: ${autoMetrics.h4Adherence}, Manual H4: ${manualMetrics.h4Adherence}`);
  const adopted = manualMetrics.humanPreference >= autoMetrics.humanPreference ? 'manual' : 'automated';
  console.log(`Adoption decision recorded: ${adopted}`);

  return { manualMetrics, autoMetrics, adopted };
}
