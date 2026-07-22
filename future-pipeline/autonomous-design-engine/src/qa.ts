/**
 * ADE - Whole-artifact and cross-surface QA (Phase 4)
 *
 * Section-level approval is not enough for a finished site/product. These
 * checks cover assembly coherence, frozen-token adherence, and shared-brand
 * recognition across website/product sibling surfaces.
 *
 * @module qa
 */

import type { Artifact, ArtifactQAReport, BrandFoundation, GateResult, ProjectDesignSystem, SectionOutput, Surface, Violation } from './schema.js';
import { tokenAllowlistGate } from './guardrails.js';
import { getProvider } from './model.js';
import { buildConfig } from './config.js';
import { emitEscalation } from './escalations.js';

export interface ArtifactQAOptions {
  threshold?: number;
  requireScreenshots?: boolean;
}

export function runWholeArtifactQA(artifact: Artifact, brand?: BrandFoundation | null, pds?: ProjectDesignSystem | null, options: ArtifactQAOptions = {}): ArtifactQAReport {
  const threshold = options.threshold ?? 80;
  const requireScreenshots = options.requireScreenshots ?? true;
  const violations: Violation[] = [];

  if (artifact.sections.length === 0) {
    violations.push(violation('artifact-qa', 'empty-artifact', 'Artifact has no sections.', 'critical'));
  }

  const seenSectionNames = new Set<string>();
  const seenSectionIds = new Set<string>();
  for (const section of artifact.sections) {
    if (seenSectionNames.has(section.name)) {
      violations.push(violation('artifact-qa', 'duplicate-section-name', `Duplicate section name "${section.name}".`, 'serious'));
    }
    if (seenSectionIds.has(section.section_id)) {
      violations.push(violation('artifact-qa', 'duplicate-section-id', `Duplicate section id "${section.section_id}".`, 'serious'));
    }
    seenSectionNames.add(section.name);
    seenSectionIds.add(section.section_id);

    violations.push(...checkSection(section, threshold, requireScreenshots));
    if (pds) {
      const tokenGate = tokenAllowlistGate(section.code.component, pds);
      for (const tokenViolation of tokenGate.violations) {
        violations.push({
          ...tokenViolation,
          gate: 'artifact-qa',
          rule: `section-token-drift:${section.name}:${tokenViolation.rule}`,
        });
      }
    }
  }

  if (pds) {
    if (pds.client_id !== artifact.client_id || pds.surface !== artifact.surface) {
      violations.push(violation('artifact-qa', 'pds-surface-mismatch', `PDS ${pds.client_id}/${pds.surface} does not match artifact ${artifact.client_id}/${artifact.surface}.`, 'critical'));
    }
    if (brand && pds.inherits !== brand.client_id) {
      violations.push(violation('artifact-qa', 'pds-brand-mismatch', `PDS inherits "${pds.inherits}" but frozen brand is "${brand.client_id}".`, 'critical'));
    }
  }

  if (brand && pds && sharedPaletteTokenCount(brand, pds) === 0) {
    violations.push(violation('artifact-qa', 'brand-token-missing', `No frozen brand palette tokens are present in the ${artifact.surface} PDS.`, 'serious'));
  }

  if (artifact.sections.length > 1 && allSectionsHaveSameCode(artifact.sections)) {
    violations.push(violation('artifact-qa', 'no-section-variety', 'All sections have identical component code; cross-section variety was not preserved.', 'serious'));
  }

  // C1.10: graduated variation metric, distinct from the binary
  // all-sections-identical check above — "lock primitives, free
  // composition" means near-identical (not just byte-identical) layouts
  // across distinct-purpose sections are ALSO monotony, and deserve a
  // measured signal, not just a pass/fail.
  const variationScore = artifact.sections.length > 1 ? sectionVariationScore(artifact.sections) : 1;
  if (artifact.sections.length > 1 && variationScore < MIN_VARIATION_SCORE) {
    violations.push(violation('artifact-qa', 'low-section-variation', `Cross-section structural variation is low (${variationScore.toFixed(2)}, floor ${MIN_VARIATION_SCORE}) — ` + `distinct-purpose sections read as near-clones of each other's layout.`, 'moderate'));
  }

  const averageScore = average(artifact.sections.map((section) => section.final_score.weighted_total));
  const pass = violations.length === 0;
  return {
    artifact_id: artifact.artifact_id,
    client_id: artifact.client_id,
    surface: artifact.surface,
    pass,
    checked_at: new Date().toISOString(),
    section_count: artifact.sections.length,
    average_score: averageScore,
    variation_score: variationScore,
    summary: pass ? `Whole-artifact QA passed for ${artifact.sections.length} ${artifact.surface} section(s).` : `Whole-artifact QA found ${violations.length} issue(s).`,
    violations,
  };
}

/**
 * C1.11: which section(s) does a whole-artifact QA violation implicate?
 * Parses the exact conventions runWholeArtifactQA/checkSection use to embed
 * a section name (message text for per-section checks, rule prefix for
 * token-drift) — co-located here so it can never drift from the producer.
 * Cross-cutting violations (empty-artifact, brand-token-missing, etc.) name
 * no single section and are correctly excluded, not guessed at.
 */
export function violationSectionName(violation: Violation, sectionNames: string[]): string | undefined {
  const driftPrefix = 'section-token-drift:';
  if (violation.rule.startsWith(driftPrefix)) {
    return violation.rule.slice(driftPrefix.length).split(':')[0];
  }
  const quoted = violation.message.match(/Section "([^"]+)"/);
  if (quoted && sectionNames.includes(quoted[1])) {
    return quoted[1];
  }
  return undefined;
}

/** C1.11: the set of sections a whole-artifact QA report implicates by name. */
export function offendingSections(report: ArtifactQAReport, sectionNames: string[]): Set<string> {
  const names = new Set<string>();
  for (const v of report.violations) {
    const name = violationSectionName(v, sectionNames);
    if (name) names.add(name);
  }
  return names;
}

export function runCrossSurfaceBrandQA(brand: BrandFoundation, artifacts: Artifact[], systems: ProjectDesignSystem[]): GateResult {
  const violations: Violation[] = [];
  const systemBySurface = new Map<Surface, ProjectDesignSystem>(systems.map((system) => [system.surface, system]));

  for (const artifact of artifacts) {
    if (artifact.client_id !== brand.client_id) {
      violations.push(violation('cross-surface-qa', 'artifact-brand-mismatch', `Artifact ${artifact.artifact_id} belongs to ${artifact.client_id}, not frozen brand ${brand.client_id}.`, 'critical'));
    }

    const pds = systemBySurface.get(artifact.surface);
    if (!pds) {
      violations.push(violation('cross-surface-qa', 'missing-surface-pds', `Missing ${artifact.surface} PDS for artifact ${artifact.artifact_id}.`, 'critical'));
      continue;
    }

    if (pds.inherits !== brand.client_id) {
      violations.push(violation('cross-surface-qa', 'pds-brand-mismatch', `${artifact.surface} PDS inherits ${pds.inherits}, not ${brand.client_id}.`, 'critical'));
    }

    if (sharedPaletteTokenCount(brand, pds) === 0) {
      violations.push(violation('cross-surface-qa', 'brand-token-missing', `${artifact.surface} PDS has no recognizable frozen brand color token.`, 'serious'));
    }
  }

  const surfaces = new Set(artifacts.map((artifact) => artifact.surface));
  if (surfaces.has('website') && surfaces.has('product')) {
    const website = systemBySurface.get('website');
    const product = systemBySurface.get('product');
    if (website && product && designSystemSignature(website) === designSystemSignature(product)) {
      violations.push(violation('cross-surface-qa', 'surface-system-not-specialized', 'Website and product PDS are identical; product should keep the brand but crystallize its own surface system.', 'moderate'));
    }
  }

  return {
    pass: violations.length === 0,
    violations,
  };
}

function checkSection(section: SectionOutput, threshold: number, requireScreenshots: boolean): Violation[] {
  const violations: Violation[] = [];

  if (section.status !== 'approved') {
    violations.push(violation('artifact-qa', 'section-not-approved', `Section "${section.name}" is ${section.status}.`, 'serious'));
  }
  if (section.code.component.trim().length === 0) {
    violations.push(violation('artifact-qa', 'missing-code', `Section "${section.name}" has no component code.`, 'critical'));
  }
  if (requireScreenshots && Object.keys(section.screenshots).length === 0) {
    violations.push(violation('artifact-qa', 'missing-screenshots', `Section "${section.name}" has no final screenshots.`, 'serious'));
  }
  if (section.final_score.weighted_total < threshold) {
    violations.push(violation('artifact-qa', 'section-below-threshold', `Section "${section.name}" scored ${section.final_score.weighted_total}, below threshold ${threshold}.`, 'serious'));
  }

  return violations;
}

function sharedPaletteTokenCount(brand: BrandFoundation, pds: ProjectDesignSystem): number {
  const brandValues = new Set(brand.identity.palette.map((entry) => normalizeToken(entry.value)));
  return Object.values(pds.tokens.color)
    .map(normalizeToken)
    .filter((value) => brandValues.has(value)).length;
}

function allSectionsHaveSameCode(sections: SectionOutput[]): boolean {
  const normalized = new Set(sections.map((section) => section.code.component.replace(/\s+/g, ' ').trim()));
  return normalized.size === 1;
}

// C1.10: below this floor, distinct-purpose sections are flagged as
// reading like layout-clones of each other (moderate — a signal to review,
// not a hard block; some genuinely similar sections, e.g. two card grids,
// are a legitimate design choice, not automatically monotony).
const MIN_VARIATION_SCORE = 0.25;

/**
 * A section's STRUCTURAL shape — the sequence of JSX tag names in document
 * order, blind to text content, class names, and token VALUES. This is
 * deliberately the same abstraction level as crystallizer.ts's near-duplicate
 * component check (C1.8): "same shape" is a layout/anatomy property, not a
 * byte-diff property. Two sections using the same shared design tokens
 * (correct — tokens are FROZEN) can still have completely different shapes
 * (correct — composition is FREE).
 */
function sectionShapeTokens(tsx: string): string[] {
  const tagPattern = /<([A-Za-z][A-Za-z0-9.]*)\b/g;
  const tags: string[] = [];
  for (const match of tsx.matchAll(tagPattern)) {
    tags.push(match[1].toLowerCase());
  }
  return tags;
}

/**
 * Dissimilarity between two sections' shapes, via Jaccard distance over
 * bigrams of consecutive tags (captures local structure/nesting order, not
 * just "which tags appear" — a hero and a footer can share every tag name
 * while nesting them in a completely different order).
 */
function shapeDissimilarity(tagsA: string[], tagsB: string[]): number {
  const bigrams = (tags: string[]): Set<string> => {
    const out = new Set<string>();
    for (let i = 0; i < tags.length - 1; i++) {
      out.add(`${tags[i]}>${tags[i + 1]}`);
    }
    return out;
  };
  const a = bigrams(tagsA);
  const b = bigrams(tagsB);
  if (a.size === 0 && b.size === 0) return 0; // both empty — indistinguishable, not "maximally varied"

  let intersection = 0;
  for (const bg of a) {
    if (b.has(bg)) intersection++;
  }
  const union = a.size + b.size - intersection;
  const similarity = union === 0 ? 1 : intersection / union;
  return 1 - similarity;
}

/**
 * Average pairwise structural dissimilarity across all sections — 0 means
 * every section has an identical tag-nesting shape (pure monotony), 1 means
 * every pair is structurally unrelated. This is a REAL measurement over the
 * actual generated code, not a mock/hardcoded value.
 */
export function sectionVariationScore(sections: SectionOutput[]): number {
  if (sections.length < 2) return 1;
  const shapes = sections.map((s) => sectionShapeTokens(s.code.component));

  let total = 0;
  let pairs = 0;
  for (let i = 0; i < shapes.length; i++) {
    for (let j = i + 1; j < shapes.length; j++) {
      total += shapeDissimilarity(shapes[i], shapes[j]);
      pairs++;
    }
  }
  return pairs === 0 ? 1 : total / pairs;
}

function designSystemSignature(pds: ProjectDesignSystem): string {
  return JSON.stringify({
    tokens: pds.tokens,
    components: pds.components.map((component) => component.name).sort(),
  });
}

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function violation(gate: string, rule: string, message: string, severity: Violation['severity']): Violation {
  return {
    gate,
    rule,
    message,
    severity,
    fixable: true,
  };
}

/**
 * Phase-Exit Review (E1.3)
 * Calls Judge #2 via the local provider. If Judge #2 disagrees, emits a gate_disagreement escalation.
 */
export async function phaseExitReview(outDir: string, runId: string, subject: string, content: string, primaryJudgeVerdict: 'pass' | 'fail'): Promise<void> {
  console.log(`\n⚖️ Initiating Phase-Exit Review via Judge #2 (local) for ${subject}...`);
  try {
    const localProvider = await getProvider(buildConfig({ provider: 'local', model: 'judge-v2' }));
    const result = await localProvider.complete({
      system: 'You are Judge #2, a strict design quality assessor. Reply with only "pass" or "fail".',
      messages: [{ role: 'user', content: `Assess this ${subject} for quality:\n\n${content}\n\nVerdict (pass/fail):` }],
      maxTokens: 10,
      temperature: 0,
    });

    const judge2Verdict = result.text.trim().toLowerCase().includes('pass') ? 'pass' : 'fail';
    console.log(`  Judge #2 verdict: ${judge2Verdict} (Primary was: ${primaryJudgeVerdict})`);

    if (judge2Verdict !== primaryJudgeVerdict) {
      console.warn(`⚠ Gate disagreement detected! Escalating.`);
      emitEscalation(outDir, {
        type: 'gate_disagreement',
        runId,
        question: `Judge disagreement on ${subject}. Primary: ${primaryJudgeVerdict}, Judge #2: ${judge2Verdict}. Resolve manually.`,
      });
    } else {
      console.log(`  ✅ Judges agree.`);
    }
  } catch (err) {
    console.warn(`  ⚠ Phase-Exit Review skipped (local judge unavailable or failed): ${err}`);
  }
}
