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
import type {
  BrandFoundation,
  ProjectDesignSystem,
  DesignTokens,
  ComponentRecipe,
} from './schema.js';
import { DesignTokensSchema, ComponentRecipeSchema } from './schema.js';
import { schemaGate } from './guardrails.js';
import { readPDS, writePDS, lockClient, unlockClient } from './store.js';

export class CrystallizerError extends Error {
  constructor(message: string, public readonly code: string) {
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
export async function crystallize(
  approvedTsx: string,
  sectionName: string,
  brand: BrandFoundation,
  clientId: string,
  surface: 'website' | 'product',
  provider: ModelProvider,
): Promise<ProjectDesignSystem> {
  // Verify brand is frozen
  if (brand.status !== 'frozen') {
    throw new CrystallizerError(
      `Brand must be frozen before crystallization (current status: ${brand.status})`,
      'BRAND_NOT_FROZEN',
    );
  }

  if (brand.client_id !== clientId) {
    throw new CrystallizerError(
      `Brand client_id "${brand.client_id}" does not match requested client "${clientId}"`,
      'CLIENT_MISMATCH',
    );
  }

  // Check if PDS already exists and is frozen
  const existing = readPDS(clientId, surface);
  if (existing && existing.status === 'foundation-frozen') {
    throw new CrystallizerError(
      `PDS for ${clientId}/${surface} is already frozen (v${existing.version}). ` +
      `Use addComponent() to extend it.`,
      'ALREADY_FROZEN',
    );
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
    throw new CrystallizerError(
      `Crystallizer returned invalid JSON: ${jsonText.slice(0, 200)}`,
      'PARSE_ERROR',
    );
  }

  const output = parsed as { tokens?: unknown; components?: unknown };

  // Validate tokens
  const tokensResult = schemaGate<DesignTokens>('designTokens', output.tokens);
  if (!tokensResult.data) {
    throw new CrystallizerError(
      `Token extraction schema validation failed: ${tokensResult.violations.map(v => v.message).join('; ')}`,
      'TOKEN_SCHEMA_ERROR',
    );
  }

  // Validate components
  const components: ComponentRecipe[] = [];
  if (Array.isArray(output.components)) {
    for (const comp of output.components) {
      const compResult = schemaGate<ComponentRecipe>('componentRecipe', {
        ...comp as Record<string, unknown>,
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

  // Write to store
  const lockId = lockClient(clientId);
  try {
    const current = readPDS(clientId, surface);
    if (current && current.status === 'foundation-frozen') {
      throw new CrystallizerError(
        `PDS for ${clientId}/${surface} was frozen by another operation (v${current.version}).`,
        'ALREADY_FROZEN',
      );
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
export function addComponent(
  clientId: string,
  surface: string,
  sectionId: string,
  recipe: Omit<ComponentRecipe, 'locked_in'>,
): ProjectDesignSystem {
  const lockId = lockClient(clientId);
  try {
    const pds = readPDS(clientId, surface);
    if (!pds) {
      throw new CrystallizerError(
        `No PDS found for ${clientId}/${surface}. Crystallize first.`,
        'NOT_FOUND',
      );
    }

    if (pds.status !== 'foundation-frozen') {
      throw new CrystallizerError(
        `PDS must be foundation-frozen to add components (status: ${pds.status})`,
        'NOT_FROZEN',
      );
    }

    // Check for duplicate component name
    const existing = pds.components.find(c => c.name === recipe.name);
    if (existing) {
      throw new CrystallizerError(
        `Component "${recipe.name}" already locked by section "${existing.locked_in}". ` +
        `Cannot redefine a locked component.`,
        'COMPONENT_LOCKED',
      );
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
    console.log(`➕ Component "${recipe.name}" added to PDS by section "${sectionId}" (v${updated.version})`);
    return updated;
  } finally {
    unlockClient(clientId, lockId);
  }
}

// ─── Validation ────────────────────────────────────────────────────

/**
 * Validate extracted tokens against the brand foundation.
 * Brand palette colors must appear in the token color map.
 */
function validateTokensAgainstBrand(
  tokens: DesignTokens,
  brand: BrandFoundation,
): string[] {
  const issues: string[] = [];

  // Check that brand palette colors exist in the token color map
  const tokenColors = new Set(
    Object.values(tokens.color).map(v => v.toLowerCase()),
  );

  for (const p of brand.identity.palette) {
    if (!tokenColors.has(p.value.toLowerCase())) {
      issues.push(
        `Brand palette color "${p.role}" (${p.value}) not found in extracted tokens`,
      );
    }
  }

  return issues;
}

/**
 * Validate that a section's TSX only uses tokens from the frozen PDS.
 * This is the code-level companion to the render-time tokenAllowlistGate.
 */
export function validateTokenUsage(
  tsx: string,
  pds: ProjectDesignSystem,
): { valid: boolean; offSystemValues: string[] } {
  const offSystemValues: string[] = [];

  // Extract hex colors from the TSX
  const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
  const hexMatches = tsx.matchAll(hexPattern);

  const allowedColors = new Set<string>();
  for (const [, value] of Object.entries(pds.tokens.color)) {
    allowedColors.add(value.toLowerCase());
  }
  // Add neutral ramp (always allowed)
  const neutrals = [
    '#ffffff', '#fff', '#000000', '#000',
    '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db',
    '#9ca3af', '#6b7280', '#4b5563', '#374151',
    '#1f2937', '#111827', '#030712',
  ];
  for (const n of neutrals) {
    allowedColors.add(n);
  }

  for (const match of hexMatches) {
    const hex = match[0].toLowerCase();
    // Normalize 3-char hex to 6-char
    const normalized = hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
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

function buildCrystallizerPrompt(
  tsx: string,
  brand: BrandFoundation,
): { system: string; user: string } {
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

  const paletteDesc = brand.identity.palette
    .map(p => `  ${p.role}: ${p.value}`)
    .join('\n');

  const user = `CRYSTALLIZE THIS SECTION

BRAND PALETTE (must appear in tokens.color):
${paletteDesc}

BRAND TYPOGRAPHY:
${brand.identity.typography.map(t => `  ${t.role}: ${t.family}`).join('\n')}

MOTION VOICE: ${brand.identity.motion_voice}

APPROVED SECTION CODE:
\`\`\`tsx
${tsx}
\`\`\`

Extract the concrete tokens and component recipes. Return ONLY the JSON.`;

  return { system, user };
}
