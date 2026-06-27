# AI UI Generation System — Complete Session Reference
**Date:** 2026-06-20
**Project:** TroopHunter — AI UI Generation Pipeline
**Source site used as case study:** oliviaharperhomes.com
**Client used as case study:** The Burkes Group (theburkesgrouptx.com)

---

## What This Document Is

A complete record of everything discussed, decided, and built in this session. Every concept, distinction, rule, insight, prompt, and file structure is preserved here with full reasoning.

---

## Part 1 — The Starting Problem

### What Existed Before This Session

A hero section had been generated for The Burkes Group using the Olivia Harper Homes design DNA. Six documentation files existed:

| File | What It Covered |
|---|---|
| `design_dna_olivia_harper_homes.md` | 1477-line master extraction — colors, typography, spacing, animations, components, responsive strategy, brand voice, conversion architecture |
| `olivia_harper_component_library.md` | React/Tailwind component definitions for every UI component |
| `olivia_harper_design_tokens.json` | All values in token format |
| `olivia_harper_page_blueprint.md` | Sequential component assembly for all 8 routes |
| `olivia_harper_ux_patterns.md` | Scroll/reveal mechanics, hover states, conversion psychology, brand voice |
| `olivia_harper_visual_blueprint.md` | Photography direction, iconography, Lottie/scroll animations, typography as visual element |

The generated hero lived in `hero-section/` — `index.html`, `style.css`, `script.js`, and `hero_generation_thought_process.md`.

### The Problem

Accuracy was 70–80%. The question was: why, and how to reach 90–100%.

---

## Part 2 — Root Cause Analysis

### The 6 Specific Gaps Found in the Generated Hero

Comparing the generated output to the source DNA revealed these specific deviations:

| What AI Generated | What DNA Actually Specifies | Why It Happened |
|---|---|---|
| `linear-gradient` dark overlay (top and bottom) | NO gradient — only `#E2E1E126` (14% warm tint) on nav only | DNA had no rule saying "do not add gradient" |
| SVG grain texture overlay at `opacity: 0.035` | No grain texture in DNA | AI added it as a "luxury web design trick" from training data |
| Ken Burns scale animation on single image | Swiper.js v8.4.5 slideshow (multi-image) — NOT Ken Burns | No explicit prohibition; AI defaulted to a common pattern |
| `hero__subtitle` paragraph element added | Hero content = Title → Tags → Scroll Indicator ONLY; no subtitle | No explicit "hero has no subtitle" rule existed |
| `backdrop-filter: blur(4px)` on header | Flat `#E2E1E126` tint only — no blur | DNA didn't say "no blur"; AI assumed blur was fine |
| Nav font: Inter 15px | DNA specifies Roboto 17px | No prohibition on alternate choices |
| F37 Bolton → Plus Jakarta Sans (undirected) | DNA specifies F37 Bolton; fallback was chosen without guidance | No asset fallbacks file existed |

### The Root Cause

The 6 documentation files were all **positive specs** — they described WHAT EXISTS.

No file documented:
- What must NOT be added
- What is explicitly absent from the design
- What to substitute when a premium asset is unavailable

Wherever documentation was silent, the AI filled the gap using its training data patterns. Those training patterns introduced elements that were visually reasonable in general but wrong for this specific brand.

**The key insight:** Silence in documentation = uncontrolled generation.

---

## Part 3 — The Conceptual Framework

### The Three Core Questions Every File Must Answer

Throughout this session, every file in the pipeline was reduced to the one question it answers:

| Question | File |
|---|---|
| WHAT exists? | Design DNA, Component Library, Design Tokens, Page Blueprint |
| HOW is it built? | Design Principles |
| WHY was it built this way? | Design Intent |
| WHAT must NOT be invented? | Generation Rules |
| WHAT replaces unavailable assets? | Asset Fallbacks |

### Design Principles vs Design Intent — A Critical Distinction

This distinction was made explicit during the session:

**Design Principles = HOW to build**
The construction rules. The methods. The specific instructions governing execution.

Examples:
- "Buttons use 0px border-radius"
- "Nav background = `#E2E1E126` flat tint only — no blur"
- "Hero content sequence: Title → Tags → Scroll Indicator"
- "Bottom-to-top fill animation on CTA buttons"

**Design Intent = WHY it was built**
The purpose. The philosophy. The goal behind each decision.

Examples:
- "Create psychological tension — soft containers feel safe, sharp buttons demand decision"
- "Photography must seduce before copy convinces — never obscure it"
- "Pull the user into the narrative, never push them to convert"
- "Every animation serves storytelling, not decoration"

### Why Both Matter

**Principles alone:** AI follows the rule for the exact component listed. When it encounters a new component not in the file, it has no guidance and defaults to training.

**Intent alone:** AI understands the goal but has no concrete method to execute it.

**Both together:** AI can reason:
> "This dropdown wasn't in the principles file. But the intent says sharp edges signal action. A dropdown is a user decision moment. Therefore: 0px border-radius."

The "why" is what turns a rulebook into a design intelligence system. The AI stops copying and starts designing.

### Design Principles as Design Decision Records (DDR)

Each principle should follow this format:

```
Decision: 0px border-radius on all action buttons
Why: Psychological contrast with 15px container system.
     Soft containers = approachable space.
     Sharp buttons = confident action.
     Removing this contrast makes the UI feel indecisive.
Alternatives rejected: 4px (too neutral), 8px (breaks contrast)
Apply to: .btn, submit inputs, CTA anchors
Never apply to: .page-frame, .hero, .card, image containers
```

This format gives the AI the rule AND the reasoning. It can apply the principle correctly in edge cases because it knows the purpose behind it.

---

## Part 4 — The Boundary Philosophy

### The Key Discovery About AI Prompts

This session established a fundamental rule about how to write prompts for documentation generation:

**Over-specified prompts create boundaries.**

Example of a bad (boundary-creating) prompt:
```
Document every UI component on this site — its anatomy,
HTML structure, CSS patterns, variants, and composition rules.
```

The AI reads the list and covers exactly those items. It stops there. It misses everything you didn't think to include in the list.

Example of a correct (open) prompt:
```
Document every UI component on this site from a design
and development perspective.
```

The AI reads this and brings its full knowledge of what a component library should contain. It surfaces things you never would have thought to ask for.

### The Rule

> You don't know everything the design has. That's why you hired AI. If you list everything in the prompt, you get back only what you already knew.

### The Prompt Formula

```
[action verb] + [file name concept] + [one directional word or angle]
```

The **file name** carries the semantic weight. The AI's training contains thousands of documents of that type — it knows what a `design_intent.md` should contain. The one directional word (HOW, WHY, design perspective, development perspective) prevents misinterpretation. Nothing else is needed.

### The Only Risk: Ambiguous File Names

| Bad name | Why it fails |
|---|---|
| `rules.md` | AI guesses what kind of rules |
| `notes.md` | Completely ambiguous |
| `file1.md` | No semantic content |

| Good name | Why it works |
|---|---|
| `generation_rules.md` | AI knows: constraints for generation |
| `design_intent.md` | AI knows: the WHY behind decisions |
| `asset_fallbacks.md` | AI knows: substitution protocol |

The file name is the prompt. Name it precisely, then give the AI freedom inside it.

---

## Part 5 — Multi-Source Synthesis

### The Question

Can you instruct the AI: "Use website A at 50% dominant, website B at 20%, website C at 30%"?

### The Answer: Partially Correct

Percentages work for things that exist on a spectrum:
- Brand tone / copy voice — language blends naturally
- Photography mood — image direction has gradients
- Visual density — whitespace has degrees

Percentages break for technical design decisions that are binary:

```
Border radius:   0px  OR  15px      (no "7.5px" middle ground)
Font weight:     300  OR  700       (can't average weights)
Easing curve:    spring  OR  linear (curves don't average)
Nav layout:      3-column  OR  centered
Background:      slideshow  OR  static
```

When you say "50% Site A" for a button, the AI must make a binary choice anyway. It will pick one and quietly ignore the percentages — you get the same result as no instruction, but with false confidence you controlled it.

### The Correct Approach: Element-Level Ownership

Replace percentages with explicit ownership per element:

```markdown
| Design Element    | Source   | Specific Rule                  |
|-------------------|----------|-------------------------------|
| Color palette     | Site A   | Zero-chromatic warm neutrals  |
| Layout structure  | Site A   | 15px inset, 3-col header      |
| Typography scale  | Site A   | clamp(52px, 7.5vw, 80px)      |
| Button style      | Site B   | Sharp 0px, bottom-to-top fill |
| Scroll animation  | Site C   | Character clone reveal         |
```

Now the AI has zero ambiguity. Every decision has one source.

### The Hybrid That Works: Default + Override

If you want a "Site A dominant" feel:
```
Primary:   Site A — default for everything not listed below
Override:  Site B — buttons only
Override:  Site C — scroll animations only
```

This achieves exactly what 50/30/20 intent was — but with precision the AI can execute consistently across every session.

### What AI Actually Does With Files

| Behavior | When It Happens |
|---|---|
| Uses memory files | Files are explicit and comprehensive |
| Uses training patterns | Files are silent on that element |
| Mixes across files | You explicitly instruct it to |
| Applies creativity | Files explain the WHY, not just the WHAT |
| Generates best of multiple | Only with a synthesis map |

### How AI Uses Multiple Source Files

When all documentation files describe the same source site (single-source), the AI reads them as one coherent spec. No mixing needed.

When documentation files describe different source sites (multi-source), the AI CAN pick "button from A, animation from B" — but only if you tell it to. Without explicit instructions, it will default to whichever file it read first, or blend them randomly.

**The solution:** A `synthesis_map.md` (Tier 4) that assigns every design element category to a specific source site AND specifies which of that source's documents govern it.

### Why Synthesis Map Must Include Governing Docs, Not Just Values

When you feed full memory sets from multiple sites (dna + principles + intent + rules + fallbacks for each), the sites contradict each other at the philosophy level — three intent files, three rule sets, all fighting simultaneously. A value-only table can't resolve that. The map must say, per element: which site owns it AND which of that site's docs govern it.

---

## Part 6 — Accuracy Analysis

### What Drives Accuracy

| Problem | Simple Site | Complex Site |
|---|---|---|
| Main failure mode | AI adds things that shouldn't be there | AI doesn't know how things behave |
| Fix | Generation Rules (negative constraints) | Component States + Animation Choreography + Responsive Matrix |

### Accuracy by Tier

These are **predictions**, not measurements. The only number you may report as accuracy is an observed Stage 6 score.

| Documentation Tier | Simple Site | Complex Site |
|---|---|---|
| Tier 1 only (DNA + Library + Tokens) | 60–70% | 45–55% |
| Tier 1 + Tier 2 (+ Principles + Intent + Rules + Fallbacks) | 90–95% | 70–75% |
| Tier 1 + Tier 2 + Tier 3 (+ States + Choreography + Matrix) | 95%+ | 90–95% |
| All Tiers including Tier 4 Synthesis Map | 95%+ | 95%+ |

### Why 100% Never Appears

Any build using `asset_fallbacks.md` substitutes premium assets (fonts, animation libraries, media) with approximations. That alone caps fidelity below 100% by design.

### What Complex Sites Need Beyond Tier 2

For complex sites, the main failure is not what AI adds — it's what AI doesn't know about behavior:

| File | What It Covers | Why It's Needed for Complex Sites |
|---|---|---|
| `component_states.md` | Every state per component: hover, focus, active, disabled, loading, error, empty | Without it, AI generates only the default state — interactive components break immediately |
| `animation_choreography.md` | Full scroll timeline — what triggers what, in what order, with what delays, across sections | AI generates each component's animation in isolation; they clash or fire out of sequence |
| `responsive_matrix.md` | Component-by-component breakdown at each breakpoint | General breakpoint rules don't specify that the stats grid collapses differently than the project grid |
| `content_edge_cases.md` | Long text overflow, missing images, empty API states, truncation rules | AI assumes perfect data — complex sites always hit edge cases in real content |

---

## Part 7 — The DNA as Single Source of Truth

### The Rule

**The website is opened exactly once — during Tier 0 raw extraction and Tier 1 DNA generation.**

Every file after that uses the DNA (and Tier 0 raw notes) as its source. Never the website again.

### Why This Matters

**Token efficiency:** Opening the website at every step re-ingests the full DOM and screenshots 13+ times. That's wasted tokens.

**Consistency:** Each session sees the website slightly differently. One session captures an animation, another misses it. All files derived from the same DNA are internally consistent.

**Quality gate:** If you can re-open the website at any step, there's no pressure to make the DNA comprehensive. Forcing the DNA to be the only source means: make the DNA right first, or everything after it is wrong.

### The DNA Quality Gate

No downstream file is generated until the DNA self-audit returns no uncovered observable dimensions.

**Two passes:**
```
Pass 1 — FREE ANALYSIS    Open prompt → AI analyzes site freely → produces DNA
Pass 2 — SELF-AUDIT       AI audits its own DNA → fills every gap → gate passes
```

Checklist the self-audit must confirm:
```
□ Color system        — primary, secondary, neutral, semantic, opacity/tints
□ Typography          — families, full scale, weights, line-heights, letter-spacing
□ Spacing             — base unit, scale, section rhythm, page inset
□ Border radius       — every context (button vs container vs image)
□ Shadows             — every elevation
□ Motion              — every animation, trigger, duration, easing, sequence
□ Component patterns  — structure for every distinct component
□ Interaction states  — hover, active, focus, disabled, loading, error, empty
□ Responsive strategy — breakpoints + per-component degradation
□ Z-index stack       — every layered element
□ Brand voice         — tone, action verbs, micro-copy patterns
□ Conversion arch.    — CTA placement, funnel sequence, friction points
□ Assets              — fonts, JS libraries, media that will need fallbacks
```

**Rule:** A dimension may be marked N/A (the source genuinely does not use it), but it may never be silently omitted. Silence in the DNA = unconstrained generation downstream.

### If Output Quality Is Low: Fix the DNA First

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

The DNA is the foundation. Weak DNA means all tokens spent on downstream files are wasted.

---

## Part 8 — Where the Olivia Harper Files Fit in the Pipeline

This was a specific question: do `page_blueprint.md`, `ux_patterns.md`, and `visual_blueprint.md` already exist in the tier system, or were they missed?

### Page Blueprint

**Missed from Tier 1 — it belongs there.**

It answers WHAT goes on each page in what order. That is foundational, not a principle or intent. Without it, the AI doesn't know if Stats comes before or after Projects.

### UX Patterns

**Splits across Tier 2 — not a single file in the pipeline.**

| Content in UX Patterns | Goes into |
|---|---|
| Scroll reveal mechanics | Design Principles (HOW) |
| Hover state behaviors | Design Principles (HOW) |
| White space philosophy | Design Principles (HOW) |
| Visual hierarchy rules | Design Principles (HOW) |
| Conversion funnel psychology | Design Intent (WHY) |
| Brand voice | Design Intent (WHY) |
| Pull model reasoning | Design Intent (WHY) |

UX Patterns was written as one readable reference document. In the pipeline, its content belongs in two separate files because HOW and WHY serve different purposes for the AI.

### Visual Blueprint

**Also splits across tiers.**

| Content in Visual Blueprint | Goes into |
|---|---|
| Photography composition rules | Design DNA (Tier 1) |
| Aspect ratio specs | Design Tokens (Tier 1) |
| Iconography system | Component Library (Tier 1) |
| Photography mood / intent | Design Intent (Tier 2) |
| Lottie animation specs | Asset Fallbacks (Tier 2) |
| Swiper specs | Asset Fallbacks (Tier 2) |
| Typography as visual element | Design Principles (Tier 2) |
| Animation choreography specs | Animation Choreography (Tier 3) |

### The Core Reason for Splitting

The Olivia Harper files were written as **reference documents** — comprehensive, readable, no strict separation of concerns.

The pipeline files are written for **AI consumption** — each file answers exactly one question so the AI reads the right file at the right step and gets a clear answer without searching through 300-line multi-purpose documents.

---

## Part 9 — The Full Pipeline Structure

### 5 Stages + 1 Verification Stage

```
Stage 1 — Extraction        Source website → raw documentation
Stage 2 — Documentation     All tier files (built once, reused forever)
Stage 3 — Client Input      Brand + content + assets per client
Stage 4 — Generation        AI reads docs + client → produces UI
Stage 5 — Output            HTML/CSS/JS + thought process document
Stage 6 — Verification      Measured accuracy score vs source
```

### The Complete File Tree

```
documentation/
├── Tier 0 — Raw Extraction (website open for this session only)
│   ├── visual-observation-notes.md     ← FIRST: DevTools closed, fresh eyes
│   ├── live-url-devtools-notes.md      ← SECOND: DevTools open, all panels
│   └── measurement-pixel-specs.yaml   ← THIRD: Responsive mode + box model
│
├── Tier 1 — Foundation (WHAT exists)
│   ├── design_dna.md                   master extraction
│   ├── design_tokens.json              all values, machine-readable
│   ├── component_library.md            component anatomy
│   ├── pattern_library.md              patterns above component level
│   └── page_blueprint.md              page/route architecture
│
├── Tier 2 — Generation Control (HOW / WHY / NOT / SUBSTITUTE)
│   ├── design_principles.md            the HOW
│   ├── design_intent.md                the WHY
│   ├── design_rationale.md             extended WHY + trade-offs
│   ├── generation_rules.md             ← the "do not invent" list — never skip
│   └── asset_fallbacks.md              substitution protocol
│
├── Tier 3 — Complex Sites (add when needed)
│   ├── component_states.md             every state per component
│   ├── interaction_system.md           hover, cursor, fills, micro-interactions
│   ├── animation_system.md             full scroll timeline
│   ├── responsive_system.md            per-component breakpoint behavior
│   ├── content_architecture.md         content model and structure
│   ├── edge_cases.md                   imperfect/missing content behavior
│   └── user_flows.md                  user journeys and funnel sequences
│
├── Tier 4 — Multi-Source (add when mixing sites)
│   └── synthesis_map.md               element + doc ownership across sources
│
└── Tier 5 — Verification (every build)
    └── design_qa_checklist.md         scoring rubric

client_input/
├── brand_identity.md
├── content.md
└── assets/

output/
├── index.html
├── style.css
├── script.js
├── thought_process.md
└── verification_report.md
```

### Tier 0 Order (Critical)

The three Tier 0 files must run in this exact order:

```
0b FIRST  — DevTools CLOSED. Experience as a user. Fresh eyes only.
0a SECOND — DevTools OPEN. Technical capture: elements, computed, 
             network, animations, z-index, sources.
0c THIRD  — DevTools Responsive mode. Exact measurements per 
             breakpoint (1440 / 768 / 375).
```

**Why 0b must come first:** Once DevTools opens, the brain enters technical mode and the qualitative perception of mood, motion weight, and brand feel is gone for that session. `visual-observation-notes.md` captures exactly this perception — it must be recorded before DevTools is opened, or it cannot be recovered.

### Stage 4 — Input Reading Order

The AI reads documentation in this specific order:

```
1. design_intent.md      → Understand the WHY first
2. design_principles.md  → Learn HOW to build
3. design_dna.md         → Learn WHAT values to use
4. component_library.md  → Learn component structure
5. design_tokens.json    → Load exact numbers
6. generation_rules.md   → Load what NOT to do
7. asset_fallbacks.md    → Load substitution protocol
8. synthesis_map.md      → Load element ownership (if multi-source)
9. client_input/         → Load client content
```

Design Intent is read first because WHY must be understood before HOW is applied. Generation Rules are read last because they are the final check before anything is generated.

### Stage 4 — Generation Process

```
Step 1: Map client content to source component slots
Step 2: Apply design principles to structure
Step 3: Check generation rules before adding ANYTHING
Step 4: Replace premium assets with fallbacks
Step 5: Apply design intent to every decision
Step 6: Document every decision in thought process
```

### Stage 6 — Verification

Accuracy is measured across four weighted dimensions:

```
| Dimension              | Weight | What it measures                             |
|------------------------|--------|----------------------------------------------|
| Tokens                 | 25%    | Exact colors, sizes, radii, spacing vs DNA   |
| Layout & Structure     | 25%    | Component anatomy, grid, hierarchy, order    |
| Typography & Visual    | 25%    | Type scale, rhythm, imagery treatment, feel  |
| Intent & Interaction   | 25%    | Animations, states, conversion logic, WHY    |
```

For every mismatch, classify the cause:

```
| Cause                          | Fix                                       |
|--------------------------------|-------------------------------------------|
| DNA was silent on this         | Strengthen design_dna.md (re-extract)     |
| DNA had it, generation ignored | Re-generate; add to generation_rules.md   |
| Premium asset substitution     | Expected ceiling — log, do not "fix"      |
| Client content reshaped layout | Add to content_edge_cases.md             |
```

---

## Part 10 — All Minimum Prompts

One prompt per file. Use in the generation order listed.

### Tier 0

**`visual-observation-notes.md`** (DevTools CLOSED)
```
Input:   The source website URL (DevTools CLOSED)
Output:  visual-observation-notes.md
Prompt:  Record manual visual observations DevTools cannot capture: mood,
         photography treatment, motion feel, hierarchy, and density.
```

**`live-url-devtools-notes.md`** (DevTools OPEN)
```
Input:   The source website URL (DevTools OPEN)
Output:  live-url-devtools-notes.md
Prompt:  Record raw DevTools observations for this site: computed styles,
         fonts, box-model spacing, animations, z-index, and network 
         libraries. Capture only — do not synthesize.
```

**`measurement-pixel-specs.yaml`** (Responsive mode)
```
Input:   The source website URL (DevTools Responsive mode + Box Model)
         live-url-devtools-notes.md
Output:  measurement-pixel-specs.yaml
Prompt:  Capture exact pixel measurements for every key element at each
         breakpoint (1440 / 768 / 375).
```

---

### Tier 1

**`design_dna.md` — Pass 1**
```
Input:   The source website URL + screenshots + Tier 0 notes (0a–0c)
Output:  design_dna.md
Prompt:  Analyze this website and extract its complete design DNA from 
         every design perspective and angle. This is the only time the 
         website will be opened. Every file in this pipeline will be 
         generated from this document alone — extract everything.
```

**`design_dna.md` — Pass 2 (Self-Audit, same session)**
```
Input:   design_dna.md (same session, immediately after Pass 1)
Output:  design_dna.md (gaps filled in place)
Prompt:  Audit the design DNA you just produced. List every design 
         dimension you did NOT cover or covered only shallowly. For each 
         gap, state whether the answer is observable on the source site. 
         Then fill every observable gap. A dimension may be marked N/A, 
         but it may never be silently omitted.
```
> GATE: No downstream file until audit returns no uncovered observable dimensions.

**`design_tokens.json`**
```
Input:   design_dna.md
         measurement-pixel-specs.yaml
Output:  design_tokens.json
Prompt:  Convert this design DNA into a structured JSON token file.
```

**`component_library.md`**
```
Input:   design_dna.md
         live-url-devtools-notes.md
Output:  component_library.md
Prompt:  Document every UI component on this site from a design and 
         development perspective.
```

**`page_blueprint.md`**
```
Input:   design_dna.md
         component_library.md
         live-url-devtools-notes.md
Output:  page_blueprint.md
Prompt:  Map the complete page architecture for every route on this site.
```

---

### Tier 2

**`design_principles.md`**
```
Input:   design_dna.md
         component_library.md
         measurement-pixel-specs.yaml
Output:  design_principles.md
Prompt:  Extract the design principles from this design system — the HOW.
```

**`design_intent.md`**
```
Input:   design_dna.md
         visual-observation-notes.md
Output:  design_intent.md
Prompt:  Extract the design intent from this design system — the WHY.
```
> `visual-observation-notes.md` is REQUIRED here. Intent built from DNA alone loses the subjective WHY.

**`design_rationale.md`**
```
Input:   design_dna.md
         design_intent.md
         visual-observation-notes.md
Output:  design_rationale.md
Prompt:  Document the extended rationale and trade-offs behind the design 
         decisions — the deeper WHY beyond the intent summary.
```

**`generation_rules.md`**
```
Input:   design_dna.md
         design_principles.md
         design_intent.md
         visual-observation-notes.md
Output:  generation_rules.md
Prompt:  Generate the generation rules for this design system.
```

**`asset_fallbacks.md`**
```
Input:   design_dna.md
         live-url-devtools-notes.md
Output:  asset_fallbacks.md
Prompt:  Generate the asset fallbacks for this design system.
```

---

### Tier 3 (complex sites only)

**`component_states.md`**
```
Input:   component_library.md
         design_principles.md
         visual-observation-notes.md
Output:  component_states.md
Prompt:  Document the component states for this design system.
```

**`interaction_system.md`**
```
Input:   component_library.md
         design_principles.md
         visual-observation-notes.md
         live-url-devtools-notes.md
Output:  interaction_system.md
Prompt:  Document the interaction model — hover behavior, custom cursor, 
         fills, and micro-interactions across the system.
```

**`animation_system.md`**
```
Input:   design_dna.md
         design_principles.md
         live-url-devtools-notes.md
Output:  animation_system.md
Prompt:  Document the animation choreography for this site.
```

**`responsive_system.md`**
```
Input:   component_library.md
         design_tokens.json
         measurement-pixel-specs.yaml
Output:  responsive_system.md
Prompt:  Document the responsive behavior of this design system.
```

**`edge_cases.md`**
```
Input:   component_library.md
         page_blueprint.md
Output:  edge_cases.md
Prompt:  Document the content edge cases for this design system.
```

**`user_flows.md`**
```
Input:   page_blueprint.md
         design_intent.md
Output:  user_flows.md
Prompt:  Document the user journeys and conversion funnel sequences 
         across the site.
```

---

### Tier 4 (multi-source only)

**`synthesis_map.md`**
```
Input:   Full memory set for Site A (dna, tokens, component_library,
         principles, intent, rules, fallbacks)
         Full memory set for Site B
         Full memory set for Site C
Output:  synthesis_map.md
Prompt:  Generate the synthesis map across these source sites. For each 
         design element, assign an owner AND list which of that owner's 
         docs govern it. Designate one base site that governs everything 
         not listed. Scope each source's generation_rules to the elements 
         that source owns, and give the base site's design_intent 
         precedence over all cross-element conflicts.
```

---

### Generation

**Section generation**
```
Input:   All documentation files for the source site
         Client brand_identity.md
         Client content.md
Output:  index.html / style.css / script.js / thought_process.md
Prompt:  Generate the [section name] for [client name] using this design 
         system. Produce a thought process document alongside the code.
```

---

### Verification

**`verification_report.md`**
```
Input:   Generated output (index.html / style.css / script.js)
         Source screenshots at 1440 / 768 / 375
         design_dna.md + design_tokens.json
Output:  verification_report.md
Prompt:  Compare this generated section against the source, side by side, 
         at each breakpoint. Score four dimensions 0–100 — Tokens, Layout 
         & Structure, Typography & Visual, Intent & Interaction (25% each) 
         — and give the weighted total. For every mismatch, record what 
         differs, its dimension, and classify the cause. Apply the 
         correction loop until the weighted total meets target.
```

---

## Part 11 — Thought Process Document

Every section generation must produce a `thought_process.md` alongside the code.

This is not optional. It is how you audit accuracy and trace every decision back to a source file.

Structure:
```
## 1. Source Analysis
What key directives were extracted from the documentation system

## 2. Client Content Mapping
How each piece of client content was mapped to a design slot

## 3. Design Decisions
Per decision: Rule applied → Which file it came from → Why

## 4. Asset Substitutions
Per substitution: Original asset → Fallback used → Why this fallback

## 5. Intentional Omissions
What was deliberately NOT included and why

## 6. Deviations (if any)
Any place the AI departed from the documentation and why
```

The existing `hero-section/hero_generation_thought_process.md` is an example of this document. It already captured reasoning like:

> "Reasoning: The visual blueprint explicitly noted the deliberate psychological contrast between welcoming soft 15px containers and sharp 0px action buttons."

The thought process document is where the AI's reasoning is made auditable. Without it, you cannot tell if an accurate output was accurate by design or by luck.

---

## Part 12 — Pipeline Rules

1. Documentation is built once per source site. Never rebuild it for each client.
2. Client input never modifies the documentation system. The two are always separate.
3. Generation Rules are always read last before generating. They are the final check.
4. Every output must include a thought process document. This is not optional.
5. Asset fallbacks are always specified. Never let the AI choose its own substitute.
6. Tier 3 files are only required for complex sites. Do not over-document simple sites.
7. Synthesis maps only exist when mixing multiple source sites.
8. Design Intent takes precedence over Design Principles when they conflict. WHY overrides HOW.
9. Freedom at extraction, constraint at generation. The AI analyzes the source freely to harvest its design knowledge; at generation it builds strictly from those docs.
10. Every output is verified against the source (Stage 6). The tier table figures are predictions — only a Stage 6 score is an observed accuracy.
11. The DNA passes the self-audit before any downstream file is generated. No downstream file until both passes complete with no uncovered observable dimensions.

---

## Part 13 — Quick Reference

### Which File Answers Which Question

| Question | File to Read |
|---|---|
| What color goes here? | design_dna.md → design_tokens.json |
| How do I build this component? | design_principles.md → component_library.md |
| Why was this decision made? | design_intent.md |
| Can I add this element? | generation_rules.md |
| What replaces this premium asset? | asset_fallbacks.md |
| Which source site owns this element? | synthesis_map.md |
| What happens at mobile? | responsive_system.md |
| What does this component look like on hover? | component_states.md |
| Did the DNA miss anything? | Extraction Completeness Self-Audit |
| Is the output actually accurate? | verification_report.md |

### Files in the Project

| File | What It Is |
|---|---|
| `ai_generation_pipeline.md` | Full pipeline architecture reference |
| `pipeline_prompts.md` | Minimum prompts for every file in order |
| `session_complete_reference.md` | This document — complete session record |
| `hero-section/index.html` | Generated hero for The Burkes Group |
| `hero-section/style.css` | Generated styles |
| `hero-section/script.js` | Generated interactions |
| `hero-section/hero_generation_thought_process.md` | AI's reasoning for the hero generation |
| `design_dna_olivia_harper_homes.md` | Source Olivia Harper DNA (1477 lines) |
| `olivia_harper_component_library.md` | Source component library |
| `olivia_harper_design_tokens.json` | Source design tokens |
| `olivia_harper_page_blueprint.md` | Source page blueprint |
| `olivia_harper_ux_patterns.md` | Source UX patterns |
| `olivia_harper_visual_blueprint.md` | Source visual blueprint |

---

## Part 14 — Key Insights Summary

These are the insights that were either non-obvious or counter-intuitive — the things worth keeping.

1. **The original diagnosis was correct from the start.** "I haven't generated the design principle file. I think because of it I do not go to 100% accuracy." — This was right. The missing piece was the files that answered HOW and WHY, plus the file that answered WHAT NOT TO DO.

2. **Positive specs alone are insufficient.** Six documentation files describing what exists still left a 20-30% accuracy gap. The gap was filled by what the AI invented from training data. Negative constraints (Generation Rules) close that gap.

3. **The file name is the prompt.** AI knows what a `design_intent.md` is. Over-specifying what it should contain creates a boundary. Under-specifying gives the AI freedom to surface things you didn't know existed.

4. **Design Principles (HOW) and Design Intent (WHY) are separate files.** Conflating them into one document weakens both. The AI needs to understand the goal before the method.

5. **DNA is the single source of truth.** Every file after the DNA should be generated from the DNA, not from the website. Opening the website at every step wastes tokens and creates inconsistency.

6. **For multi-source mixing, element-level ownership beats percentage-based dominance.** Percentages can't resolve binary design decisions (0px or 15px — no middle). A synthesis map with explicit element ownership can.

7. **Accuracy percentages are predictions, not measurements.** The only real accuracy number comes from Stage 6 verification — a scored side-by-side comparison of the generated output against the source at each breakpoint.

8. **For complex sites, the main failure is different from simple sites.** Simple site: AI adds things that shouldn't be there → fix with Generation Rules. Complex site: AI doesn't know how things behave → fix with Component States, Animation Choreography, Responsive Matrix.

9. **Tier 0 (Raw Extraction) must run in a specific order.** Visual observations first (DevTools closed), technical capture second (DevTools open), measurements third (Responsive mode). The order matters because opening DevTools permanently ends the qualitative perception for that session.

10. **WHY overrides HOW when they conflict.** Design Intent takes precedence over Design Principles. If a principle says "do X" but the intent says "X contradicts the goal," the intent wins.
