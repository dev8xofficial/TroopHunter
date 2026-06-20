# Pipeline Minimum Prompts
**One prompt per file. Use in the order listed.**

---

## Generation Order

Files must be generated in this sequence. Each file depends on the ones above it.

```
─── (Tier 0 — raw extraction, WEBSITE OPEN) ───
0a. live-url-devtools-notes.md
0b. visual-observation-notes.md
0c. measurement-pixel-specs.yaml
─── (Tier 1 — foundation) ───
1.  brand-dna.md            (Pass 1: free analysis — Tier 0 notes as context)
1b. completeness_self_audit (Pass 2 — same session — GATE before step 2)
2.  design-tokens.json
3.  component-library.md
4.  pattern-library.md
5.  page-screen-specs.md    (page_blueprint)
─── (Tier 2 — generation control) ───
6.  design-principles.md
7.  design-intent-ux-philosophy.md   (design_intent)
8.  design-rationale.md
9.  generation-rules.md     ◀ the "do not invent" list — never skip
10. data-asset-replacement-guidelines.md   (asset_fallbacks)
─── (Tier 3 — only for complex sites) ───
11. component-states.yaml
12. interaction-system.md
13. animation-system.md
14. responsive-system.md
15. content-architecture.yaml
16. edge-cases.md
17. user-flows.md
─── (Tier 4 — only for multi-source) ───
18. synthesis-map.md
─── (Generation) ───
19. [section] generation
─── (Verification — every section) ───
20. design-qa-checklist.md  (rubric, built once)
21. verification_report.md  (per section)
```

---

## Tier 0 — Raw Extraction

*The only step with the website open. This raw capture is the source of truth `design_dna.md` is synthesized from — after this, the website is never opened again.*

---

### 0a. `live-url-devtools-notes.md`

```
Input:   The source website URL (open in DevTools)

Output:  live-url-devtools-notes.md

Prompt:  Record raw DevTools observations for this site: computed styles, fonts,
         box-model spacing, animations, z-index, and network libraries. Capture
         only — do not synthesize. This is the unprocessed ground truth.
```

---

### 0b. `visual-observation-notes.md`

```
Input:   The source website URL

Output:  visual-observation-notes.md

Prompt:  Record manual visual observations DevTools cannot capture: mood,
         photography treatment, motion feel, hierarchy, and density.
```

---

### 0c. `measurement-pixel-specs.yaml`

```
Input:   The source website URL + live-url-devtools-notes.md

Output:  measurement-pixel-specs.yaml

Prompt:  Capture exact pixel measurements for every key element at each breakpoint
         (1440 / 768 / 375). This is the px-level ground truth for Stage 6 scoring.
```

---

## Tier 1 — Foundation

---

### 1. `design_dna.md`  —  Pass 1: Free Analysis

```
Input:   The source website URL + screenshots + Tier 0 notes (0a–0c)

Output:  design_dna.md

Prompt:  Analyze this website and extract its complete design DNA from every design
         perspective and angle.
```

> Tier 0 notes are provided as **informational context** — richer input, richer DNA.
> No tagging, no layering. The AI reads them and writes freely.

---

### 1b. `design_dna.md`  —  Pass 2: Completeness Self-Audit

```
Input:   design_dna.md  (run in the SAME session, immediately after Pass 1)

Output:  design_dna.md  (gaps filled in place)

Prompt:  Audit the design DNA you just produced. List every design dimension you
         did NOT cover or covered only shallowly. For each gap, state whether the
         answer is observable on the source site. Then fill every observable gap.
         A dimension may be marked N/A, but it may never be silently omitted.
```

> **GATE:** No downstream file (step 2 onward) until the audit returns no uncovered
> observable dimensions. Weak DNA wastes every downstream token.

---

### 2. `design_tokens.json`

```
Input:   design_dna.md

Output:  design_tokens.json

Prompt:  Convert this design DNA into a structured JSON token file.
```

---

### 3. `component_library.md`

```
Input:   design_dna.md 

Output:  component_library.md

Prompt:  Document every UI component on this site from a design and development perspective.
```

---

### 4. `page_blueprint.md`

```
Input:   design_dna.md
        component_library.md

Output:  page_blueprint.md

Prompt:  Map the complete page architecture for every route on this site.
```

---

## Tier 2 — Generation Control

---

### 5. `design_principles.md`

```
Input:   design_dna.md
         component_library.md 

Output:  design_principles.md

Prompt:  Extract the design principles from this design system — the HOW.
```

---

### 6. `design_intent.md`

```
Input:   design_dna.md
        

Output:  design_intent.md

Prompt:  Extract the design intent from this design system — the WHY.
```

---
---

### `design-rationale.md`  

```
Input:   design-dna.md + design-intent.md

Output:  design-rationale.md

Prompt:  Document the extended rationale and trade-offs behind the design decisions —
         the deeper WHY beyond the intent summary.
```

---

### 7. `generation_rules.md`

```
Input:   design_dna.md
         design_principles.md
         design_intent.md
         

Output:  generation_rules.md

Prompt:  Generate the generation rules for this design system.
```

---

### 8. `asset_fallbacks.md`

```
Input:   design_dna.md
 
 Output:  asset_fallbacks.md

Prompt:  Generate the asset fallbacks for this design system.
```

---

## Tier 3 — Complex Sites

*Only generate these if the source site has interactive states, complex animations, or dynamic content.*

---

### 9. `component_states.md`

```
Input:   component_library.md
         design_principles.md
        

Output:  component_states.md

Prompt:  Document the component states for this design system.
```

---

### 10. `animation_choreography.md`

```
Input:   design_dna.md
         design_principles.md
        

Output:  animation_choreography.md

Prompt:  Document the animation choreography for this site.
```

---

### 11. `responsive_matrix.md`

```
Input:   component_library.md
         design_tokens.json
        

Output:  responsive_matrix.md

Prompt:  Document the responsive behavior of this design system.
```

---

### 12. `content_edge_cases.md`

```
Input:   component_library.md
         page_blueprint.md
        

Output:  content_edge_cases.md

Prompt:  Document the content edge cases for this design system.
```

---

---

### `user-flows.md`  

```
Input:   page-screen-specs.md + design-intent.md

Output:  user-flows.md

Prompt:  Document the user journeys and conversion funnel sequences across the site.
```

---

## Tier 4 — Multi-Source

*Only generate this when deliberately mixing design DNA from multiple source sites.*

---

### 13. `synthesis_map.md`

```
Input:   Full memory set for Site A (dna, tokens, component_library,
         principles, intent, rules, fallbacks, + any Tier 3)
         Full memory set for Site B
         Full memory set for Site C

Output:  synthesis_map.md

Prompt:  Generate the synthesis map across these source sites. For each design
         element, assign an owner AND list which of that owner's docs govern it.
         Designate one base site that governs everything not listed. Scope each
         source's generation_rules to the elements that source owns, and give the
         base site's design_intent precedence over all cross-element conflicts.
```

---

## Generation — Producing UI Sections

*Run this after all documentation files are ready. Run once per section.*

---

### 14. Section Generation

```
Input:   All documentation files for the source site
         Client brand_identity.md
         Client content.md

Output:  index.html
         style.css
         script.js
         thought_process.md

Prompt:  Generate the [section name] for [client name] using this 
         design system. Produce a thought process document alongside the code.
```

---

## Verification — Scoring the Output Against the Source

*Run after every section generation. Converts the predicted accuracy into a measured one.*

---

### 15. `verification_report.md`

```
Input:   The generated output (index.html / style.css / script.js)
         Source screenshots for the same section + breakpoints (1440 / 768 / 375)
         design_dna.md + design_tokens.json

Output:  verification_report.md

Prompt:  Compare this generated section against the source, side by side, at each
         breakpoint. Score four dimensions 0–100 — Tokens, Layout & Structure,
         Typography & Visual, Intent & Interaction (25% each) — and give the
         weighted total. For every mismatch, record what differs, its dimension,
         and classify the cause: DNA was silent / generation ignored the DNA /
         asset-fallback ceiling / client content reshaped layout. Then apply the
         correction loop: re-generate for generation misses, route doc gaps to the
         relevant file, and re-score until the weighted total meets target.
```

---

## Notes

- **Never skip order.** Each file builds on the ones before it.
- **Never merge prompts.** One session per file keeps output focused.
- **Always include thought_process.md in section generation.** It is how you audit accuracy.
- **Tier 3 and Tier 4 are optional.** Only add them when the site complexity requires it.
- **The website is opened only during the Tier 0 / design_dna extraction phase.** Tier 0 (0a–0c) and brand-dna are produced in that one open session; every downstream file uses brand-dna (+ relevant docs) as its source. Re-opening the website per file wastes tokens (it re-ingests the whole DOM/screenshots) and creates inconsistency.
- **Always run the completeness self-audit (1b) in the same session as brand-dna.md.** No downstream file until the audit returns no uncovered observable dimensions. Silence in the DNA becomes a gap the model fills with its own defaults at generation.
- **Verification (15) is not optional.** A predicted accuracy is not a measured one — never report the tier-table % as if it were observed.

---

## If Output Quality Is Low

Do not fix the downstream file. Fix the DNA first.

```
Low quality output in any file
         │
         ▼
Is the answer missing from design_dna.md?
         │
    Yes  │  No
         │   └──→ Fix the downstream file prompt
         ▼
Regenerate design_dna.md with the website open
         │
         ▼
Regenerate all files that depend on the section you fixed
```

The DNA is the foundation. Weak DNA means all tokens spent on downstream files are wasted. Strengthen the DNA first, then regenerate everything built on top of it.
