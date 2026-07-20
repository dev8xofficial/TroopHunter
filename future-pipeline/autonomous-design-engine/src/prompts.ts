/**
 * ADE — Prompt Builders
 *
 * buildGeneratorPrompt and buildCriticPrompt per spec 05 §6.1/6.2.
 * Output contract rules prevent F-GEN-03/04/05.
 *
 * @module prompts
 */

import type { Brief, InputBundle } from './schema.js';

export function buildBriefComprehensionPrompt(brief: Brief): { system: string; user: string } {
  const contentEntries = Object.entries(brief.section.content)
    .map(([key, value]) => `  ${key}: ${JSON.stringify(value)}`)
    .join('\n');

  const system = `You are an input-comprehension checker for an autonomous design engine.

Your job is NOT to design anything. Restate the brief faithfully and identify material ambiguities before generation spend.

Return ONLY JSON with this shape:
{
  "restated_goal": "string",
  "restated_audience": "string",
  "restated_constraints": ["string"],
  "missing_required_facts": ["string"],
  "material_mismatches": ["string"],
  "confidence": 0.0
}

Rules:
- Do not invent missing facts.
- Put only facts that block correct design execution in missing_required_facts.
- Put contradictions or mismatches between business goal, audience, section, assets, and content in material_mismatches.
- If the brief is sufficient, both arrays must be empty.`;

  const user = `Check this design brief for comprehension before generation:

Client: ${brief.client}
Industry: ${brief.industry}
${brief.location ? `Location: ${brief.location}\n` : ''}Audience: ${brief.audience}
Goal: ${brief.goal}
Section: ${brief.section.name}
Content:
${contentEntries || '  (no content fields)'}
Assets:
${brief.section.assets ? JSON.stringify(brief.section.assets, null, 2) : '  (none)'}`;

  return { system, user };
}

// ─── Generator Prompt (spec 05 §6.1) ──────────────────────────────

/** C0.17 — H7 substrate: per-part char-count proxy for token attribution (÷4 ≈ tokens). Real numbers from real block content, not estimated post-hoc. */
export interface PromptTokenBreakdown {
  hard_brief: number;
  soft_refs: number;
  visual_context: number;
  loop_state: number;
}

function charsToTokens(chars: number): number {
  return Math.ceil(chars / 4);
}

export function buildGeneratorPrompt(
  bundle: InputBundle,
  feedback?: string,
): { system: string; user: string; tokenBreakdown: PromptTokenBreakdown } {
  const { brief, brandData } = bundle;
  const hardBrand = bundle.hardBrand?.status === 'frozen' ? bundle.hardBrand : undefined;
  const section = brief.section;

  // Build brand constraints block
  let brandBlock = '';
  if (hardBrand) {
    const paletteLines = hardBrand.identity.palette
      .map(p => `  - ${p.role}: ${p.value}${p.usage ? ` (${p.usage})` : ''}`)
      .join('\n');
    const typeLines = hardBrand.identity.typography
      .map(t => `  - ${t.role}: "${t.family}" (fallback: ${t.fallback})`)
      .join('\n');
    brandBlock = `
BRAND FOUNDATION (HARD LAW - frozen v${hardBrand.version}; you MUST obey it):
  Palette:
${paletteLines}
  Typography:
${typeLines}
  Personality: ${hardBrand.identity.personality.join(', ')}
  Tone: ${hardBrand.identity.tone}
  Motion voice: ${hardBrand.identity.motion_voice}
`;
  } else if (brandData) {
    const paletteLines = brandData.palette
      .map(p => `  - ${p.role}: ${p.value}`)
      .join('\n');
    const typeLines = brandData.typography
      .map(t => `  - ${t.role}: "${t.family}" (fallback: ${t.fallback})`)
      .join('\n');
    brandBlock = `
BRAND TOKENS (HARD — you MUST use these exact values):
  Palette:
${paletteLines}
  Typography:
${typeLines}
`;
  }

  // Build frozen PDS block (Phase 1 — design system tokens as hard law)
  let pdsBlock = '';
  if (bundle.hardSystem && bundle.hardSystem.status === 'foundation-frozen') {
    const tokens = bundle.hardSystem.tokens;
    const colorLines = Object.entries(tokens.color).map(([k, v]) => `    ${k}: ${v}`).join('\n');
    const typeTokenLines = Object.entries(tokens.type).map(([k, v]) => `    ${k}: ${v}`).join('\n');
    const spaceLines = Object.entries(tokens.space).map(([k, v]) => `    ${k}: ${v}`).join('\n');
    const radiusLines = Object.entries(tokens.radius).map(([k, v]) => `    ${k}: ${v}`).join('\n');
    const motionLines = Object.entries(tokens.motion).map(([k, v]) => `    ${k}: ${v}`).join('\n');

    pdsBlock = `
DESIGN SYSTEM TOKENS (HARD LAW — you MUST use ONLY these tokens. Off-system values are a HARD FAIL):
  Colors:
${colorLines}
  Typography:
${typeTokenLines}
  Spacing:
${spaceLines}
  Border Radius:
${radiusLines}
  Motion:
${motionLines}
`;

    // Add locked component info
    if (bundle.hardSystem.components.length > 0) {
      const compLines = bundle.hardSystem.components
        .map(c => `    ${c.name}: ${c.variants.join(', ')} (locked by ${c.locked_in})`)
        .join('\n');
      pdsBlock += `  Locked Components (reuse these exactly — do NOT redefine):
${compLines}
`;
    }
  }

  // Build context shots block (Phase 1 — already-built sections)
  let ctxBlock = '';
  if (bundle.ctxShots && bundle.ctxShots.length > 0) {
    const sectionNames = [...new Set(bundle.ctxShots.map(s => s.sectionName))];
    ctxBlock = `
ALREADY-BUILT SECTIONS (screenshots attached — your section must be visually CONSISTENT with these):
  ${sectionNames.join(', ')}
  The design system tokens above were crystallized from these sections. Your section must feel like it belongs to the same page.
`;
  }

  // Build Library block (Phase 2 - soft cross-project memory)
  let libraryBlock = '';
  if (bundle.softLibrary && bundle.softLibrary.length > 0) {
    const entries = bundle.softLibrary.slice(0, 5).map((entry, index) => {
      const construction = entry.construction.slice(0, 4).map(item => `      - ${item}`).join('\n');
      const avoid = entry.avoid.slice(0, 3).map(item => `      - ${item}`).join('\n');
      return `  ${index + 1}. ${entry.title} (${entry.type}, confidence ${entry.outcome.confidence.toFixed(2)})
     Intent: ${entry.intent}
     Best fit: ${entry.context_fit.domain}; ${entry.context_fit.audience}; goal: ${entry.context_fit.goal}
     Construction:
${construction || '      - No construction notes'}
     Avoid:
${avoid || '      - No avoid notes'}`;
    }).join('\n');

    libraryBlock = `
SOFT LIBRARY MEMORY (direction only - synthesize, do not copy; hard brand/system/brief always override this):
${entries}
`;
  }

  // Build content block
  const contentEntries = Object.entries(section.content)
    .map(([key, value]) => {
      if (typeof value === 'string') return `  ${key}: "${value}"`;
      if (Array.isArray(value)) return `  ${key}: ${JSON.stringify(value)}`;
      return `  ${key}: ${JSON.stringify(value)}`;
    })
    .join('\n');

  // Build assets block
  let assetsBlock = '';
  if (section.assets && Object.keys(section.assets).length > 0) {
    const assetLines = Object.entries(section.assets)
      .map(([key, path]) => `  ${key}: "${path}"`)
      .join('\n');
    assetsBlock = `\nASSETS (use these exact paths for images/media):\n${assetLines}\n`;
  }

  // Build feedback block
  let feedbackBlock = '';
  if (feedback) {
    feedbackBlock = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FEEDBACK FROM PREVIOUS ITERATION — address each point:
${feedback}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
  }

  const system = `You are an expert product/web designer AND frontend developer. You design and BUILD one section as a complete React + TypeScript component styled with Tailwind CSS.

YOU MUST OBEY THESE RULES (violations will be rejected):
1. Output EXACTLY ONE self-contained .tsx file that default-exports the section component.
2. ONLY import from "react" — NO other imports. No icon libraries, no image libraries, no UI component libraries. Use inline SVGs for icons.
3. Use ONLY static Tailwind class strings — NO dynamic class construction (no template literals for classes, no conditional class building with variables). The Tailwind JIT compiler cannot see dynamically constructed class names.
4. NO placeholders — NO lorem ipsum, NO "TODO", NO "Coming soon", NO empty sections. Use the REAL content from the brief below.
5. The component must render in a preview harness with NO extra wiring — it receives no props and manages no external state.
6. ALL text content must come from the brief content provided below — do not invent headlines, descriptions, or CTAs.
7. Design must be fully responsive across 1440px, 768px, and 375px viewports.
8. Do NOT wrap the output in markdown code fences or any other formatting — output ONLY the raw .tsx code.
${hardBrand || brandData ? '9. Use ONLY the hard brand palette colors and design-system palette colors provided - no other colors except white, black, transparent, and approved neutral ramps.' : ''}`;

  const user = `Design and build a "${section.name}" section for ${brief.client}.

BUSINESS CONTEXT (HARD — the design must serve this):
  Client: ${brief.client}
  Industry: ${brief.industry}
${brief.location ? `  Location: ${brief.location}` : ''}
  Audience: ${brief.audience}
  Goal: ${brief.goal}
${brandBlock}
SECTION: "${section.name}"
CONTENT:
${contentEntries}
${assetsBlock}${pdsBlock}${ctxBlock}${libraryBlock}${feedbackBlock}
Produce a complete, polished, production-quality React + TypeScript component. Default export the component. Use Tailwind CSS for all styling. Make it visually stunning — this should look like a premium, professionally designed section.`;

  // hard_brief = business context + brand + PDS + section content + assets (all hard inputs);
  // soft_refs = Library entries; visual_context = prior-section screenshots note; loop_state = carried feedback.
  const hardBriefChars = system.length + brandBlock.length + pdsBlock.length + assetsBlock.length + contentEntries.length
    + brief.client.length + brief.industry.length + (brief.location?.length ?? 0) + brief.audience.length + brief.goal.length + section.name.length;
  const tokenBreakdown: PromptTokenBreakdown = {
    hard_brief: charsToTokens(hardBriefChars),
    soft_refs: charsToTokens(libraryBlock.length),
    visual_context: charsToTokens(ctxBlock.length),
    loop_state: charsToTokens(feedbackBlock.length),
  };

  return { system, user, tokenBreakdown };
}

// ─── Feedback Serialization (the H1 mechanism) ────────────────────

export function serializeFeedback(
  hardViolations: string[],
  criticFeedback: string,
): string {
  const parts: string[] = [];

  if (hardViolations.length > 0) {
    parts.push('🚨 MUST FIX (hard constraint violations — these MUST be resolved):');
    for (const v of hardViolations) {
      parts.push(`  • ${v}`);
    }
  }

  if (criticFeedback) {
    parts.push('');
    parts.push('📝 IMPROVE (design critique — address these to raise quality):');
    parts.push(criticFeedback);
  }

  parts.push('');
  parts.push('✅ KEEP what worked well from the previous iteration — do not regress on strengths.');

  return parts.join('\n');
}

// ─── Critic Prompt (spec 05 §6.2) ─────────────────────────────────

export function buildCriticPrompt(
  bundle: InputBundle,
  candidatesInfo: Record<string, { shots: Record<string, string>, domInfo?: any }>,
): { system: string; user: string } {
  const candidateIds = Object.keys(candidatesInfo);
  const { brief, brandData } = bundle;
  const hardBrand = bundle.hardBrand?.status === 'frozen' ? bundle.hardBrand : undefined;

  // Build brand reference for the critic
  let brandRef = '';
  if (hardBrand) {
    brandRef = `
BRAND FOUNDATION (judge adherence to this frozen hard store):
  Palette: ${hardBrand.identity.palette.map(p => `${p.role}=${p.value}`).join(', ')}
  Typography: ${hardBrand.identity.typography.map(t => `${t.role}="${t.family}"`).join(', ')}
  Personality: ${hardBrand.identity.personality.join(', ')}
  Tone: ${hardBrand.identity.tone}
  Motion: ${hardBrand.identity.motion_voice}
`;
  } else if (brandData) {
    brandRef = `
BRAND CONSTRAINTS (judge adherence to these):
  Palette: ${brandData.palette.map(p => `${p.role}=${p.value}`).join(', ')}
  Typography: ${brandData.typography.map(t => `${t.role}="${t.family}"`).join(', ')}
`;
  }

  // Scoring weights depend on whether a design system exists
  const hasSystem = bundle.hardSystem && bundle.hardSystem.status === 'foundation-frozen';
  const weightingNote = hasSystem
    ? `
SCORING WEIGHTS (Phase 1 — with design system):
  brand_adherence: 25%
  system_adherence: 25% (ACTIVE — judge against the frozen design system tokens)
  brief_fit: 25%
  craft: 25%

weighted_total = (brand_adherence * 0.25) + (system_adherence * 0.25) + (brief_fit * 0.25) + (craft * 0.25)`
    : `
SCORING WEIGHTS (Phase 0 — no design system):
  brand_adherence: 35%
  system_adherence: N/A (set to null)
  brief_fit: 30%
  craft: 35%

weighted_total = (brand_adherence * 0.35) + (brief_fit * 0.30) + (craft * 0.35)`;

  const system = `You are a senior design critic. You did NOT build this. Judge it honestly and rigorously.

You are evaluating rendered screenshots of a web section. Judge ONLY what is RENDERED — do not infer intent that is not visible in the screenshots.

Your evaluation must be returned as valid JSON matching this exact structure:
{
  "candidates": [
    {
      "candidate_id": "<id>",
      "scores": {
        "brand_adherence": <0-100>,
        "system_adherence": <0-100 when a design system exists, otherwise null>,
        "brief_fit": <0-100>,
        "craft": <0-100>,
        "weighted_total": <computed>
      },
      "verdict": "pass" | "fail",
      "feedback": "<specific, actionable feedback>"
    }
  ],
  "ranking": ["<best_id>", "<next_id>", ...],
  "overall_feedback": "<summary>"
}

IMPORTANT RULES:
1. Be SPECIFIC in feedback — "the CTA competes with the headline" not "make it better".
2. Score craft on: visual hierarchy, rhythm, restraint, polish, responsiveness, typography usage, whitespace.
3. Score brand_adherence on: correct use of brand colors, typography, overall brand personality.
4. Score brief_fit on: does this section serve the stated business goal and audience?
5. A "pass" verdict requires weighted_total >= the threshold AND no critical issues.
6. When comparing multiple candidates, rank them pairwise — which is better and WHY.
7. Output ONLY the JSON — no markdown fences, no explanation outside the JSON.`;

  const candidateList = candidateIds.length > 1
    ? `You are comparing ${candidateIds.length} candidates: ${candidateIds.join(', ')}. Rank them pairwise.`
    : `You are evaluating candidate: ${candidateIds[0]}.`;

  // Inject DOM craft metrics
  let craftMetricsBlock = '';
  for (const cid of candidateIds) {
    const info = candidatesInfo[cid];
    if (info.domInfo?.craftMetrics) {
      const cm = info.domInfo.craftMetrics;
      craftMetricsBlock += `\nCANDIDATE ${cid} DOM CRAFT METRICS (Advisory):
  Spacing Conformance: ${(cm.spacingConformance * 100).toFixed(0)}%
  Alignment Regularity: ${(cm.alignmentRegularity * 100).toFixed(0)}%
  Type-scale Conformance: ${(cm.typeScaleConformance * 100).toFixed(0)}%
`;
    }
  }

  // CAVEATS (M6 / C0.8): the harness does not self-host brand fonts yet, so
  // a declared family (e.g. "Canela") falls through the CSS stack to a
  // system fallback. Detect this per candidate by diffing the declared
  // families against what actually rendered, and tell the Critic explicitly
  // — it must judge type SCALE/WEIGHT/HIERARCHY, never letterforms it never saw.
  //
  // Note: a section typically only exercises a subset of the brand's
  // declared roles (a hero has no code block, so "mono" never renders) —
  // that is expected and NOT a substitution. We only flag when NONE of the
  // declared families appear anywhere in what actually rendered, which is
  // the honest signal that fonts are being substituted, not merely unused.
  const declaredFamilies = (hardBrand?.identity.typography ?? brandData?.typography ?? [])
    .map(t => t.family.toLowerCase());
  let caveatsBlock = '';
  if (declaredFamilies.length > 0) {
    for (const cid of candidateIds) {
      const rendered = candidatesInfo[cid].domInfo?.renderedFontFamilies ?? [];
      if (rendered.length === 0) continue; // no data — say nothing rather than false-flag
      const renderedLower = rendered.join(' | ').toLowerCase();
      const anyDeclaredFamilyRendered = declaredFamilies.some(f => renderedLower.includes(f));
      if (!anyDeclaredFamilyRendered) {
        caveatsBlock += `\nCAVEATS for CANDIDATE ${cid}:
  Declared brand typeface(s) not found in the actual render: ${declaredFamilies.join(', ')}.
  Actually-rendered font stack(s): ${rendered.join('; ')}.
  This candidate is being shown to you in a FALLBACK font, not the true brand typeface — judge type scale, weight, and hierarchy only. Do NOT penalize or praise letterforms/character shapes you are not actually seeing.
`;
      }
    }
  }

  const user = `${candidateList}

BUSINESS BRIEF (judge against this):
  Client: ${brief.client}
  Industry: ${brief.industry}
  Audience: ${brief.audience}
  Goal: ${brief.goal}
  Section: ${brief.section.name}
  Content provided: ${Object.keys(brief.section.content).join(', ')}
${brandRef}${weightingNote}
${craftMetricsBlock}${caveatsBlock}
The screenshots for each candidate at 1440px, 768px, and 375px viewports are attached as images.

Score each candidate, provide specific actionable feedback, and return valid JSON.`;

  return { system, user };
}
