/**
 * ADE — Zod Schemas + Inferred TypeScript Types
 *
 * MVP subset of spec 03. Every schema is the single source of truth
 * for its shape; inferred types are exported alongside.
 *
 * @module schema
 */

import { z } from 'zod';

// ─── Brief (spec 07 §3) ────────────────────────────────────────────

export const SectionContentSchema = z.object({
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cta: z.object({
    text: z.string(),
    href: z.string(),
  }).optional(),
  nav: z.array(z.string()).optional(),
  body: z.string().optional(),
  items: z.array(z.record(z.string(), z.unknown())).optional(),
}).passthrough(); // allow extra content fields per section type

export const SectionSpecSchema = z.object({
  name: z.string().min(1),
  content: SectionContentSchema,
  assets: z.record(z.string(), z.string()).optional(),
});

export const BriefSchema = z.object({
  client: z.string().min(1),
  industry: z.string().min(1),
  location: z.string().optional(),
  audience: z.string().min(1),
  goal: z.string().min(1),
  section: SectionSpecSchema,
});

export type Brief = z.infer<typeof BriefSchema>;

export const BriefComprehensionSchema = z.object({
  restated_goal: z.string().min(1),
  restated_audience: z.string().min(1),
  restated_constraints: z.array(z.string()).default([]),
  missing_required_facts: z.array(z.string()).default([]),
  material_mismatches: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(1),
});

export type BriefComprehension = z.infer<typeof BriefComprehensionSchema>;

// ─── BrandData (spec 03 §3.1) ──────────────────────────────────────

export const PaletteEntrySchema = z.object({
  role: z.string().min(1),
  value: z.string().regex(/^#[0-9a-fA-F]{3,8}$/, 'Must be a valid hex color'),
});

export const TypographyEntrySchema = z.object({
  role: z.enum(['display', 'ui', 'mono']),
  family: z.string().min(1),
  fallback: z.string().min(1),
});

export const BrandDataSchema = z.object({
  client_id: z.string().min(1),
  palette: z.array(PaletteEntrySchema).min(1),
  typography: z.array(TypographyEntrySchema).min(1),
  logo_ref: z.string().optional(),
});

export type BrandData = z.infer<typeof BrandDataSchema>;

// ─── Plan (spec 07 §3.1) ───────────────────────────────────────────────

export const PlanSchema = z.object({
  sections: z.array(z.object({
    name: z.string(),
    order: z.number(),
    purpose: z.string()
  })),
  narrative_rationale: z.string().optional(),
  copy_decisions: z.array(z.object({
    element: z.string(),
    choice: z.string(),
    rationale: z.string()
  })).optional(),
  audience_notes: z.string().optional(),
  decisions: z.array(z.object({
    decision: z.string(),
    alternatives_considered: z.boolean().optional(),
    rationale: z.string(),
    author: z.string()
  })).optional()
});

export type Plan = z.infer<typeof PlanSchema>;

// ─── Shared enums ─────────────────────────────────────────────────

export const SurfaceSchema = z.enum(['website', 'product']);
export type Surface = z.infer<typeof SurfaceSchema>;

export const AutonomyRungSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);
export type AutonomyRung = z.infer<typeof AutonomyRungSchema>;

// ─── DimensionScores (spec 03 §6) ──────────────────────────────────

export const DimensionScoresSchema = z.object({
  brand_adherence: z.number().min(0).max(100),
  system_adherence: z.number().min(0).max(100).nullable(), // null for section 1 / Phase 0
  brief_fit: z.number().min(0).max(100),
  craft: z.number().min(0).max(100),
  weighted_total: z.number().min(0).max(100),
});

export type DimensionScores = z.infer<typeof DimensionScoresSchema>;

// ─── CriticOutput ──────────────────────────────────────────────────

export const CandidateScoreSchema = z.object({
  candidate_id: z.string(),
  scores: DimensionScoresSchema,
  verdict: z.enum(['pass', 'fail']),
  feedback: z.string(),
});

export const CriticOutputSchema = z.object({
  candidates: z.array(CandidateScoreSchema).min(1),
  ranking: z.array(z.string()).optional(), // ordered candidate_ids, best first (pairwise)
  overall_feedback: z.string().optional(),
});

export type CriticOutput = z.infer<typeof CriticOutputSchema>;
export type CandidateScore = z.infer<typeof CandidateScoreSchema>;

// ─── RunRecord (spec 03 §6) — one per iteration per candidate ──────

export const RunRecordSchema = z.object({
  run_id: z.string(),
  section_id: z.string(),
  iteration: z.number().int().min(0),
  candidate_id: z.string(),
  input_bundle_ref: z.string(),
  output_code_ref: z.string(),
  screenshots: z.record(z.string(), z.string()), // breakpoint → path
  scores: DimensionScoresSchema,
  verdict: z.enum(['pass', 'fail']),
  critic_feedback: z.string(),
  hard_violations: z.array(z.string()).optional(),
  duration_ms: z.number(),
  tokens: z.object({
    input: z.number().int(),
    output: z.number().int(),
    // C0.17 — per-part input attribution (plan Appendix A / H7 substrate).
    // Optional: populated where the caller can attribute the bundle; total
    // `input` above remains authoritative and is never derived from these.
    input_by_part: z.object({
      hard_brief: z.number().int(),
      soft_refs: z.number().int(),
      visual_context: z.number().int(),
      loop_state: z.number().int(),
    }).optional(),
  }),
  quota: z.object({
    tokens_today: z.number().int(),
    calls_today: z.number().int(),
    tokens_this_week: z.number().int(),
    calls_this_week: z.number().int()
  }).optional(),
  exploration: z.boolean().optional(),
  engine_mode: z.enum(['zero-to-one', 'refactoring']).optional(),
  // C0.16 — kept for back-compat with existing readers; equals critic_model_id
  // (the record's scores/verdict/feedback are the Critic's output).
  model_id: z.string(),
  // C0.16 — per-role ids so distTags/verdict tooling never has to guess one
  // role's id from another's (F-MOD-07/08). gen_model_id is best-effort: the
  // generator call(s) that produced this candidate may span a retry/repair,
  // so this records the id of the provider used, not a specific call.
  gen_model_id: z.string().optional(),
  critic_model_id: z.string().optional(),
  timestamp: z.string(), // ISO 8601
});

export type RunRecord = z.infer<typeof RunRecordSchema>;

// ─── Violation & GateResult ────────────────────────────────────────

export const ViolationSchema = z.object({
  gate: z.string(), // which gate caught it
  rule: z.string(), // which rule was violated
  message: z.string(), // human-readable description
  severity: z.enum(['critical', 'serious', 'moderate', 'minor']),
  fixable: z.boolean().default(true),
});

export type Violation = z.infer<typeof ViolationSchema>;

export const GateResultSchema = z.object({
  pass: z.boolean(),
  violations: z.array(ViolationSchema),
});

export type GateResult = z.infer<typeof GateResultSchema>;

// ─── RenderResult ──────────────────────────────────────────────────

export const RenderResultSchema = z.object({
  candidate_id: z.string(),
  shots: z.record(z.string(), z.string()), // breakpoint → file path
  consoleErrors: z.array(z.string()),
  hasErrorOverlay: z.boolean(),
  hardViolations: z.array(ViolationSchema).optional(),
  domInfo: z.object({
    bodyHeight: z.number(),
    hasText: z.boolean(),
    fontsLoaded: z.boolean(),
    imagesLoaded: z.boolean(),
    craftMetrics: z.object({
      spacingConformance: z.number(),
      alignmentRegularity: z.number(),
      tapTargetGeometry: z.number(),
      typeScaleConformance: z.number(),
    }).optional(),
    /** Actually-rendered computed font-family stacks (C0.8 CAVEATS — font-substitution disclosure). */
    renderedFontFamilies: z.array(z.string()).optional(),
  }).optional(),
});

export type RenderResult = z.infer<typeof RenderResultSchema>;

// ─── InputBundle (Phase 0 minimal; Phase 1 extends) ────────────────

export const ReferenceRefSchema = z.object({
  path: z.string(),
  description: z.string().optional(),
});

export type ReferenceRef = z.infer<typeof ReferenceRefSchema>;

// ─── Library Entry (spec 03 §2) - Phase 2 soft memory ──────────────

export const LibraryEntryTypeSchema = z.enum([
  'principle',
  'pattern',
  'component-recipe',
  'anti-pattern',
]);

export const LibraryContextFitSchema = z.object({
  domain: z.string().min(1),
  audience: z.string().min(1),
  personality: z.array(z.string()).default([]),
  goal: z.string().min(1),
  feel: z.array(z.string()).default([]),
});

export const LibraryOutcomeSchema = z.object({
  human_verdict: z.string().min(1),
  confidence: z.number().min(0).max(1),
  times_used: z.number().int().min(0),
});

export const LibraryEmbeddingSchema = z.object({
  model_id: z.string().min(1),
  text: z.string().min(1),
  vector: z.array(z.number()),
});

export const LibraryEntrySchema = z.object({
  id: z.string().min(1),
  type: LibraryEntryTypeSchema,
  title: z.string().min(1),
  client_id: z.string().optional(),

  // Embedded problem-space fields.
  intent: z.string().min(1),
  context_fit: LibraryContextFitSchema,

  // Payload returned on a retrieval hit. This is reusable craft knowledge.
  construction: z.array(z.string()).default([]),
  rationale: z.array(z.string()).default([]),
  pairs_with: z.array(z.string()).default([]),
  avoid: z.array(z.string()).default([]),
  recipe_values: z.record(z.string(), z.string()).optional(),
  provenance: z.array(z.string()).default([]),
  outcome: LibraryOutcomeSchema,
  tags: z.array(z.string()).default([]),
  
  // Two-tier adoption enforcement (E2.3)
  provisional: z.boolean().default(true),
  expires_at: z.string().optional(),

  created_at: z.string(),
  updated_at: z.string(),

  // Stored with the flat-file vector record, never used as prompt payload.
  embedding: LibraryEmbeddingSchema,
});

export type LibraryEntry = z.infer<typeof LibraryEntrySchema>;
export type LibraryEntryType = z.infer<typeof LibraryEntryTypeSchema>;

// ─── BrandFoundation (spec 03 §3.2) — Phase 1 ─────────────────────

export const ProvenanceValueSchema = z.enum(['provided', 'derived']);

export const BrandIdentitySchema = z.object({
  palette: z.array(z.object({
    role: z.string().min(1),
    value: z.string().regex(/^#[0-9a-fA-F]{3,8}$/, 'Must be a valid hex color'),
    usage: z.string().optional(), // AI-assigned usage rule
  })).min(1),
  typography: z.array(TypographyEntrySchema).min(1),
  motion_voice: z.string(),       // DERIVED — "restrained, cinematic, no bounce"
  personality: z.array(z.string().min(1)).min(1), // DERIVED — ["trust","legacy","reliable","modern"]
  tone: z.string(),               // DERIVED — brand voice for copy
  logo_ref: z.string().optional(),
});

export type BrandIdentity = z.infer<typeof BrandIdentitySchema>;

export const BrandProvenanceSchema = z.object({
  palette: ProvenanceValueSchema.default('provided'),
  typography: ProvenanceValueSchema.default('provided'),
  motion_voice: ProvenanceValueSchema.default('derived'),
  personality: ProvenanceValueSchema.default('derived'),
  tone: ProvenanceValueSchema.default('derived'),
  derived_from: z.string().optional(), // what the derivation consumed
});

export type BrandProvenance = z.infer<typeof BrandProvenanceSchema>;

export const BrandFoundationSchema = z.object({
  client_id: z.string().min(1),
  version: z.number().int().min(1).default(1),
  status: z.enum(['draft', 'approved', 'frozen']),
  identity: BrandIdentitySchema,
  provenance: BrandProvenanceSchema,
  approved_by: z.string().optional(),
  approved_at: z.string().optional(), // ISO 8601
});

export type BrandFoundation = z.infer<typeof BrandFoundationSchema>;

// ─── ProjectDesignSystem (spec 03 §4) — Phase 1 ───────────────────

export const DesignTokensSchema = z.object({
  color: z.record(z.string(), z.string()),   // e.g. accent: "#B45309"
  type: z.record(z.string(), z.string()),    // e.g. "display": "80px/1em Playfair Display"
  space: z.record(z.string(), z.string()),   // e.g. "page-inset": "15px"
  radius: z.record(z.string(), z.string()),  // e.g. "sm": "4px", "lg": "12px"
  shadow: z.record(z.string(), z.string()),  // e.g. "card": "0 2px 8px rgba(0,0,0,0.1)"
  motion: z.record(z.string(), z.string()),  // e.g. "duration-fast": "150ms"
});

export type DesignTokens = z.infer<typeof DesignTokensSchema>;

export const ComponentRecipeSchema = z.object({
  name: z.string().min(1),       // "button", "card", "nav"
  anatomy: z.string(),           // structural description
  variants: z.array(z.string()), // e.g. ["primary", "secondary", "ghost"]
  states: z.array(z.string()),   // e.g. ["default", "hover", "active", "focus", "disabled"]
  locked_in: z.string(),         // section_id that introduced & locked this component
});

export type ComponentRecipe = z.infer<typeof ComponentRecipeSchema>;

export const ProjectDesignSystemSchema = z.object({
  client_id: z.string().min(1),
  version: z.number().int().min(1).default(1),
  surface: SurfaceSchema,
  status: z.enum(['open', 'foundation-frozen']),
  inherits: z.string().min(1),   // → BrandFoundation.client_id
  tokens: DesignTokensSchema,
  components: z.array(ComponentRecipeSchema),
  foundation_from: z.string(),   // section_id that established the foundation
  foundation_frozen_at: z.string().optional(), // ISO 8601
});

export type ProjectDesignSystem = z.infer<typeof ProjectDesignSystemSchema>;

// ─── Artifact & Section (spec 03 §5) — Phase 1 ────────────────────

export const SectionOutputSchema = z.object({
  section_id: z.string().min(1),
  name: z.string().min(1),
  code: z.object({
    component: z.string(),       // the .tsx source
    styles: z.string().optional(),
    files: z.record(z.string(), z.string()).optional(), // supporting components
  }),
  screenshots: z.record(z.string(), z.string()), // breakpoint → file ref
  final_score: DimensionScoresSchema,
  status: z.enum(['draft', 'approved']),
});

export type SectionOutput = z.infer<typeof SectionOutputSchema>;

export const ArtifactSchema = z.object({
  artifact_id: z.string().min(1),
  client_id: z.string().min(1),
  surface: SurfaceSchema,
  status: z.enum(['in-progress', 'approved', 'delivered']),
  sections: z.array(SectionOutputSchema),
});

export type Artifact = z.infer<typeof ArtifactSchema>;

export const ArtifactQAReportSchema = z.object({
  artifact_id: z.string().min(1),
  client_id: z.string().min(1),
  surface: SurfaceSchema,
  pass: z.boolean(),
  checked_at: z.string(),
  section_count: z.number().int().min(0),
  average_score: z.number().min(0).max(100),
  summary: z.string(),
  violations: z.array(ViolationSchema),
});

export type ArtifactQAReport = z.infer<typeof ArtifactQAReportSchema>;

// ─── InputBundle (extended for Phase 1) ────────────────────────────

export const InputBundleSchema = z.object({
  brief: BriefSchema,
  brandData: BrandDataSchema.optional(),
  refs: z.array(ReferenceRefSchema).max(5).optional(),
  lastFeedback: z.string().optional(),
  // Phase 1 additions:
  hardBrand: BrandFoundationSchema.optional(),   // frozen brand foundation
  hardSystem: ProjectDesignSystemSchema.optional(), // frozen PDS
  ctxShots: z.array(z.object({                   // screenshots of already-built sections
    sectionName: z.string(),
    breakpoint: z.string(),
    path: z.string(),
  })).optional(),
  // Phase 2 additions:
  softLibrary: z.array(LibraryEntrySchema).max(5).optional(),
});

export type InputBundle = z.infer<typeof InputBundleSchema>;

// ─── RunResult (orchestrator output) ───────────────────────────────

export const TerminalStateSchema = z.enum(['APPROVED', 'ESCALATED', 'ABORTED']);
export type TerminalState = z.infer<typeof TerminalStateSchema>;

export const RunResultSchema = z.object({
  state: TerminalStateSchema,
  finalTsx: z.string().optional(),
  finalShots: z.record(z.string(), z.string()).optional(),
  bestScore: DimensionScoresSchema.optional(),
  iterations: z.number().int(),
  totalTokens: z.object({ input: z.number(), output: z.number() }),
  totalDurationMs: z.number(),
  traceFile: z.string(),
  outDir: z.string(),
});

export type RunResult = z.infer<typeof RunResultSchema>;

// ─── VerdictEntry (human verdict log — 0.15, expanded in Phase 3) ───────────

export const VerdictEntrySchema = z.object({
  run_id: z.string(),
  section: z.string(),
  preferred: z.enum(['iter0', 'final', 'control_best']),
  rating: z.enum(['bad', 'weak', 'good', 'strong']),
  human_verdict: z.enum(['approve', 'reject']).optional(),
  candidate_id: z.string().optional(),
  critic_score: z.number().min(0).max(100).optional(),
  critic_verdict: z.enum(['pass', 'fail']).optional(),
  threshold: z.number().min(0).max(100).optional(),
  reviewer: z.string().optional(),
  source: z.enum(['blind-pair', 'approval', 'calibration']).optional(),
  notes: z.string().optional(),
  timestamp: z.string(),
  positions_log: z.array(z.string()).optional(),
  dist_tags: z.object({
    gen_model_id: z.string(),
    critic_model_id: z.string(),
    config_version: z.string(),
    system_snapshot: z.string()
  }).optional(),
  rejected_with_interest: z.boolean().optional(),
});

export type VerdictEntry = z.infer<typeof VerdictEntrySchema>;

// ─── Schema Gate utility ───────────────────────────────────────────

const SCHEMA_REGISTRY: Record<string, z.ZodType> = {
  brief: BriefSchema,
  briefComprehension: BriefComprehensionSchema,
  brandData: BrandDataSchema,
  criticOutput: CriticOutputSchema,
  runRecord: RunRecordSchema,
  verdictEntry: VerdictEntrySchema,
  dimensionScores: DimensionScoresSchema,
  libraryEntry: LibraryEntrySchema,
  artifactQAReport: ArtifactQAReportSchema,
  // Phase 1:
  brandFoundation: BrandFoundationSchema,
  brandIdentity: BrandIdentitySchema,
  projectDesignSystem: ProjectDesignSystemSchema,
  designTokens: DesignTokensSchema,
  componentRecipe: ComponentRecipeSchema,
  artifact: ArtifactSchema,
  sectionOutput: SectionOutputSchema,
};

/**
 * Validate JSON against a named schema (the Schema Gate).
 * Returns { success, data?, error? }.
 */
export function validate<T = unknown>(
  schemaName: string,
  json: unknown,
): { success: true; data: T } | { success: false; error: string } {
  const schema = SCHEMA_REGISTRY[schemaName];
  if (!schema) {
    return { success: false, error: `Unknown schema: ${schemaName}` };
  }
  const result = schema.safeParse(json);
  if (result.success) {
    return { success: true, data: result.data as T };
  }
  return {
    success: false,
    error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '),
  };
}
