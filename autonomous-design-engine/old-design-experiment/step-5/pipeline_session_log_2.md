# Pipeline Session Log
**TroopHunter AI UI Generation Pipeline — Full Decision & Evolution Record**
*Every decision, principle, correction, and reasoning from the design session.*

---

## 1. Starting Point — What the Pipeline Was

The pipeline began as a 5-stage system:

```
Stage 1 — Extraction (from source website)
Stage 2 — Documentation System (Tiers 1–4)
Stage 3 — Client Input
Stage 4 — AI Generation Engine
Stage 5 — Output (HTML/CSS/JS + thought_process.md)
```

The original file set per source site was:

```
Tier 1: design_dna.md, component_library.md, design_tokens.json
Tier 2: design_principles.md, design_intent.md, generation_rules.md, asset_fallbacks.md
Tier 3: component_states.md, animation_choreography.md, responsive_matrix.md, content_edge_cases.md
Tier 4: synthesis_map.md (multi-source only)
```

The DNA prompt was a single short line: *"Analyze this website and extract its complete design DNA from every design perspective and angle."*

---

## 2. The Accuracy Question

**User's question:** Will this pipeline reach 90–100% accuracy?

**Honest answer established:** No — not as originally set up. Reasoning:

- The pipeline's own accuracy table distinguishes **simple sites** from **complex sites**.
- Olivia Harper Homes (the test source) is unambiguously a **complex site**: GSAP ScrollTrigger, SplitText, Lottie animation, lerp-physics custom cursor, 1600ms slow-pan image hovers, pre-qualified contact form.
- For complex sites, the pipeline's own table says Tier 1 + Tier 2 only reaches **70–75%**, not 90%.
- Tier 3 is required to reach 90–95% on a complex site.

**Critical additional insight:** The Accuracy by Tier table's numbers are **predictions, not measurements**. The pipeline had no mechanism to actually measure accuracy — only `thought_process.md` (the generator grading its own homework).

**Why "100%" never appears:** Asset fallbacks substitute premium assets (F37 Bolton → Cormorant Garamond, Lottie → CSS animation). Every substitution is a deliberate deviation. The pipeline's own ceiling is below 100% by design. Top row correctly reads "95%+", never 100%.

---

## 3. Stage 6 — Verification (Added)

**Problem:** No measurement mechanism existed. The pipeline claimed accuracy figures it could never prove.

**Solution — Stage 6 added with:**

### Weighted Accuracy Rubric (4 dimensions, 25% each)

| Dimension | What it measures |
|---|---|
| Tokens | Exact colors, sizes, radii, spacing vs DNA |
| Layout & Structure | Component anatomy, grid, hierarchy, order |
| Typography & Visual | Type scale, rhythm, imagery treatment, "feel" |
| Intent & Interaction | Animations, states, conversion logic, the WHY |

A build can score 95% on Tokens and 70% on feel — one number hides that. Always report all four sub-scores.

### Side-by-Side Diff Procedure
1. Screenshot generated output at each breakpoint (1440 / 768 / 375)
2. Place beside source screenshot for same section + breakpoint
3. Score each dimension 0–100
4. Record every mismatch as a finding: what differs, which dimension, severity

### Cause Classification (routes the fix correctly)

| Cause | Fix location |
|---|---|
| DNA was silent on this | Strengthen design_dna.md (re-extract) |
| DNA had it, generation ignored | Re-generate; add to generation_rules.md |
| Premium asset substitution | Expected ceiling — log, do not "fix" |
| Client content reshaped layout | Add to content_edge_cases.md |

### Correction Loop
- Output-level loop (distinct from the documentation loop in pipeline_prompts.md)
- The doc loop fixes the docs; the output loop fixes the build
- Both can fire from the same finding

### `verification_report.md` Structure
```
1. Scores — per-dimension + weighted total, pass/fail
2. Findings — what differs → dimension → severity → cause
3. Corrections Applied — finding → action → re-score
4. Accepted Deviations — what was not fixed and why
5. Final Verdict — observed accuracy vs. tier table prediction
```

**Pipeline Rule added:** "Every output is verified against the source (Stage 6). The tier table figures are predictions; only a Stage 6 score is an observed accuracy. Never report a predicted % as if measured."

---

## 4. Extraction Completeness Self-Audit (Added to Stage 1)

**Problem:** Free extraction is non-deterministic — a single pass may go deep on color and shallow on motion. Whatever the DNA leaves silent becomes a gap that constrained generation fills with the model's generic defaults.

**Solution — Self-Audit added immediately after DNA generation:**

```
Prompt: Audit the design DNA you just produced. List every design dimension you
        did NOT cover or covered only shallowly. For each gap, state whether the
        answer is observable on the source site. Then fill every observable gap.
        A dimension may be marked N/A, but it may never be silently omitted.
```

**13-dimension checklist the audit must confirm:**
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

---

## 5. Core Principle — Freedom at Extraction, Constraint at Generation

**User's position established:** The AI is given full freedom to analyze and extract insights from the DNA file because the user does not have enough design expertise to prescribe what to extract. The AI has extensive knowledge of design principles and best practices — this is intentional.

**Critical clarification:** This freedom applies ONLY to **extraction**. At generation, the model receives the full doc set and builds strictly from those docs — not from its own taste.

**Why this matters:**
- Free extraction = borrowing the AI's expertise into the docs ✅
- Free generation = throwing away the expertise you just captured ❌

**The failure mode:** The model's training data says "add a gradient for readability" — that IS good general design. But it's wrong for this specific source. Accuracy = fidelity to the source, not good design in the abstract.

**The double-sided risk:** free extraction → may leave gaps → free generation fills them with defaults → silent deviation. The self-audit closes this loop.

**Pipeline Rule added:** "Freedom at extraction, constraint at generation. The AI analyzes the source freely to harvest its design knowledge into the docs; at generation it builds strictly from those docs."

---

## 6. The Synthesis Map Evolution (Multi-Source)

### Original synthesis_map.md
A simple value-ownership table:
```
| Design Element | Source Site | Specific Rule |
```
Three rules: Default (Site A governs all), Override (specific rows), Conflict (Site A intent wins).

### Problem Identified
When feeding **full memory sets** (not just DNA files, but each source's tokens, principles, intent, rules, fallbacks), the sites contradict each other at the **philosophy level**, not just the value level — three intent files, three rule sets, all fighting simultaneously.

### Fixed synthesis_map.md
Expanded to **element → owner → governing docs**:

```
| Design Element | Owner  | Governing docs that apply              |
|----------------|--------|----------------------------------------|
| Color palette  | Site A | A.dna, A.tokens, A.principles          |
| Button style   | Site B | B.principles, B.rules, B.fallbacks     |
| Scroll anim.   | Site C | C.intent, C.choreography, C.principles |
```

**Four explicit rules added:**
1. **Default:** Site A governs everything not listed
2. **Override:** Specific rows take precedence
3. **Rule scoping:** A source's generation_rules apply ONLY to elements that source owns (Site A's "no overlay" rule cannot veto Site C's owned dramatic photography)
4. **Doc scoping:** Only listed governing docs may influence an element
5. **Intent precedence:** For cross-element conflicts, base site's design_intent wins

**Context load warning added:** Full memory sets for multiple sites is a large, contradictory instruction payload. Lost-in-the-middle risk multiplies. Stage 6 is mandatory in multi-source mode.

---

## 7. Token Efficiency — Selective Feeding at Generation

**Problem raised:** With 3 sources × ~20 files each, the context payload blows past the window. More text = higher theoretical ceiling BUT greater adherence risk (lost-in-the-middle).

**Solution — Generate context assembly rules:**

### Never feed at generation (authoring/verification artifacts):
- Tier 0 raw extraction files (their content already flowed into DNA)
- design-rationale (informs principles/intent upstream)
- user-flows (informs page-specs upstream)
- design-qa-checklist (Stage 6 only)
- measurement-pixel-specs (Stage 6 only)

### Always feed at generation:
- design-tokens (section-relevant subset)
- design-principles
- design-intent (distilled)
- generation-rules (always — the guardrail)
- data-asset-replacement-guidelines
- component/pattern/states — section-relevant only
- synthesis-map + owned slices (multi-source only)

### Multi-source: feed base site fully + only OWNED SLICES of B and C
The synthesis-map becomes a **loader manifest** — it tells you which slices to include, so 3 full sets collapse into 1 full set + a handful of slices.

### Generate per-section, not whole-site
A hero only needs the hero's components/patterns/states/rules.

---

## 8. Format Decisions — YAML vs JSON vs Markdown

**Rule established: format by content type**

**The deciding question:** Is this data the model **looks up**, or reasoning the model **follows**?

- **Lookup data** (values, measurements, matrices, state lists) → YAML/JSON
- **Reasoning/instruction** (WHY, HOW, "never add X because Y") → Markdown prose

| Convert to YAML/JSON | Keep as Markdown |
|---|---|
| design-tokens.json ✓ | brand-dna (narrative parts) |
| measurement-pixel-specs.yaml ✓ | design-intent-ux-philosophy |
| component-states.yaml ✓ | design-rationale |
| content-architecture.yaml ✓ | animation-system / interaction-system |
| responsive-system → YAML (it's a matrix) | user-flows, edge-cases |
| synthesis-map → YAML (ownership table) | visual-observation-notes |
| design-qa-checklist → YAML (a checklist) | |

**YAML vs JSON:** YAML is leaner than pretty-printed JSON for same data. Keep design-tokens as JSON (tooling standard). Use YAML for document-style structured files.

**Hybrid approach for generation-rules and component-library:** Use YAML for structure (`- never: …`, `why: …`, `common-mistake: …`) but keep value fields as prose. Compact, enforceable structure without flattening the reasoning.

---

## 9. Website Opening Rule

### Original rule (ambiguous):
"The website is opened exactly once — during design_dna.md extraction only."

### Problem identified:
Could be misread as "open it for 30 seconds, close it, never touch it again." Also contradicted the per-file prompts which listed `+ The source website URL` as input for principles, intent, component_library, etc.

### Fixed rule:
"The website stays open for the full Tier 0 extraction session (0b → 0a → 0c). After Tier 0 completes, the website is never opened again."

### All per-file URL inputs removed from downstream prompts
Every file after Tier 0 derives from brand-dna + relevant docs, never from re-opening the live site. Re-opening per file wastes tokens (re-ingests the whole DOM/screenshots) and creates inconsistency.

---

## 10. The Expanded Production File Set

**Your team's file set (20 files) was audited against the pipeline:**

```
brand-dna.md
design-intent-ux-philosophy.md
design-principles.md
design-rationale.md
design-tokens.json
component-library.md
component-states.yaml
interaction-system.md
animation-system.md
responsive-system.md
page-screen-specs.md
pattern-library.md
user-flows.md
content-architecture.yaml
edge-cases.md
measurement-pixel-specs.yaml
visual-observation-notes.md
live-url-devtools-notes.md
design-qa-checklist.md
data-asset-replacement-guidelines.md
```

### Coverage verdict:
- All four original tiers → covered ✅
- 6 enrichment files beyond the original pipeline → upgrade ✅
- **Critical gap found:** `generation-rules.md` — **MISSING** ❌

### The generation-rules.md gap (most important finding)
This is the negative-constraint "do not invent" list — the explicit "Never add X / Why / Common AI mistake" list read LAST before generation to stop the model's defaults before they happen.

`design-qa-checklist.md` was the closest equivalent — but it's **reactive** (validates after building), whereas `generation-rules.md` is **proactive** (stops bad additions before they happen). These are not interchangeable. A QA checklist catches the gradient overlay after it's added; generation-rules stops it from being added.

**This is the single most important Tier 2 file for accuracy.**

### New tier structure established:

```
Tier 0 — Raw Extraction          (human-driven capture, website open)
  live-url-devtools-notes.md
  visual-observation-notes.md
  measurement-pixel-specs.yaml

Tier 1 — Foundation              (WHAT exists)
  brand-dna.md
  design-tokens.json
  component-library.md
  pattern-library.md
  page-screen-specs.md

Tier 2 — Generation Control      (HOW / WHY / what NOT / what to substitute)
  design-principles.md
  design-intent-ux-philosophy.md
  design-rationale.md
  generation-rules.md  ◀ CRITICAL — never skip
  data-asset-replacement-guidelines.md

Tier 3 — Complex Sites           (add when needed)
  component-states.yaml
  interaction-system.md
  animation-system.md
  responsive-system.md
  content-architecture.yaml
  edge-cases.md
  user-flows.md

Tier 4 — Multi-Source            (add when mixing sites)
  synthesis-map.yaml

Tier 5 — Verification            (every build)
  design-qa-checklist.yaml
```

### Lifecycle roles — why non-fed files exist

Every file must justify itself by at least one lifecycle role:
- **Feeds a generation file** (derivation source)
- **Serves verification** (Stage 6 input)
- **Conditionally fed** (fed for the sections it touches)
- **Enables regeneration/maintenance** (audit trail)

A file used at no stage is overhead — don't generate it.

Specific roles:
- `live-url-devtools-notes` → builds brand-dna + audit trail (derivation)
- `visual-observation-notes` → builds brand-dna (the "feel") + direct input to intent/rules (conditional feed)
- `measurement-pixel-specs` → Stage 6 ground truth (verification)
- `design-qa-checklist` → Stage 6 rubric (verification)
- `pattern-library` → fed per-section (conditional feed)
- `content-architecture` → fed for content sections (conditional feed)

---

## 11. Dependency Chain Audit — The Full Fix

**Problem:** Several files were listed as dependent on DNA alone but actually needed specific Tier 0 files directly.

**Pattern identified:**
- Files producing **numbers** → need `measurement-pixel-specs.yaml`
- Files producing **structure** → need `live-url-devtools-notes.md`
- Files producing **feel** → need `visual-observation-notes.md`

### Full corrected dependency chains:

| File | Was | Fixed to |
|---|---|---|
| design-tokens.json | DNA only | DNA + measurement-pixel-specs |
| component-library.md | DNA only | DNA + live-url-devtools-notes |
| page-screen-specs.md | DNA + component-library | DNA + component-library + live-url-devtools-notes |
| design-principles.md | DNA + component-library | DNA + component-library + measurement-pixel-specs |
| design-intent-ux-philosophy.md | DNA only | DNA + visual-observation-notes |
| design-rationale.md | DNA + intent | DNA + intent + visual-observation-notes |
| generation-rules.md | DNA + principles + intent | DNA + principles + intent + visual-observation-notes |
| data-asset-replacement-guidelines.md | DNA only | DNA + live-url-devtools-notes |
| component-states.yaml | component-library + principles | component-library + principles + visual-observation-notes |
| interaction-system.md | component-library + principles | component-library + principles + visual-observation-notes + live-url-devtools-notes |
| animation-system.md | DNA + principles | DNA + principles + live-url-devtools-notes |
| responsive-system.md | component-library + tokens | component-library + tokens + measurement-pixel-specs |
| user-flows.md | page-screen-specs + intent | ✅ unchanged — correct |
| edge-cases.md | component-library + page-blueprint | ✅ unchanged — correct |

### Why design-principles DOESN'T need visual-observation-notes
Principles are **rule-extractions from observable patterns** the DNA already describes. If DNA says "0px buttons / 15px containers" — the principle is right there. DNA is the correct and sufficient source for principles. Visual observation is for FELT qualities (intent/rationale/rules/states).

### Why design-intent DOES need visual-observation-notes
Intent is the WHY — rooted in qualitative feel. DNA captures this partially; the observation notes capture it raw. Without them, intent risks being derived purely from measurable facts, losing the subjective WHY that makes it meaningful.

---

## 12. DNA Reliability Protocol — Iterations

### First attempt (overcomplicated — reverted):
- Two-layer structure (Observed/Interpretation per section)
- Confidence tags `[measured]` / `[inferred]` / `[assumed]` on every line
- Pass 3 Grounding Gate (checking DNA against Tier 0 notes)

**Why it was reverted:**
- Two-layer structure fragmented holistic design analysis into categories, working against free analysis
- Confidence tags added overhead on every line — less insight, more annotation
- Pass 3 was checking one AI output against another AI output (DNA vs Tier 0 notes) — not real verification, just two AIs agreeing

**The principle violated:** "Reliability comes from structure AROUND the prompt, not FROM inside it."

### Final correct approach (2 passes only):

```
Pass 1 — FREE ANALYSIS
Input: URL + screenshots + Tier 0 notes (as context, not constraints)
The AI reads Tier 0 notes and writes freely. No imposed structure.
Richer input → richer DNA.

Pass 2 — COMPLETENESS SELF-AUDIT
AI audits its own DNA for coverage gaps.
Fills every observable gap.
No downstream file until audit returns no uncovered dimensions.
```

**Tier 0's real roles:**
- At DNA time: **informational context** (richer input)
- At Stage 6: **ground truth** (measurement against source)
Neither role involves checking DNA against Tier 0 between passes.

**The DNA gate:** No downstream file (step 2 onward) until Pass 2 completes with no uncovered observable dimensions. Fixing the DNA here costs one pass; a broken DNA wastes every downstream token.

---

## 13. Tier 0 — The Ordering Principle

### The key insight:
All three Tier 0 files require the website open, but in three **different modes** requiring different states of mind.

### Why order matters:

**0b (visual-observation-notes) MUST come first:**
Once DevTools opens, the brain enters technical analysis mode and the fresh-eyes visual perception is gone permanently for that session. You can't un-see computed styles and return to feeling the atmosphere freshly.

Analogy: Walking into a luxury store — *before* checking price tags you feel the atmosphere (lighting, scent, exclusivity). *After* checking price tags, that genuine first impression is gone. You're now in analytical mode.

0b captures the raw qualitative material that design-intent and generation-rules depend on. Contaminate it with DevTools first and the observations become technical re-descriptions, not genuine perception.

### Correct order:
```
0b first  — Chrome open, DevTools CLOSED. Fresh eyes. Screenshot the visual experience.
0a second — Chrome open, DevTools OPEN. Elements, Computed, Network, Animations, Sources.
0c third  — DevTools Responsive mode. Screenshot at 1440 / 768 / 375. Box Model per element.
```

---

## 14. Who Does Tier 0 — The Playwright MCP Decision

### The capability question:
A standard AI session CANNOT:
- Open a browser
- Navigate to URLs autonomously
- Open or use DevTools
- Read computed styles (only raw CSS, not browser-computed values)
- Measure actual pixel dimensions as rendered
- Observe animations playing

### What a standard AI CAN do:
- Fetch raw HTML/CSS source from a URL
- Analyze HTML/CSS from source code
- NOT see the rendered visual output

**The problem:** DNA generated from raw HTML/CSS source misses computed styles, rendered visuals, animations, and pixel measurements. This produces a shallow DNA — the heart of the pipeline is weak.

### The workflow clarification:
The user opens Chrome DevTools themselves, analyzes the site, and provides the raw data to the AI as text (copy-pasted computed styles, described animations, noted measurements). AI structures that raw input into the Tier 0 files.

No screenshots, no URL fetching — user provides what they observed, AI formats it.

### Path options evaluated:

| Option | What it enables | Verdict |
|---|---|---|
| Standard AI prompt | Fetches raw HTML/CSS only — no rendering, no computed styles | Low DNA quality |
| Claude Computer Use | Full browser control — opens Chrome, navigates, uses DevTools | Overkill for focused extraction |
| Browser MCP (Playwright) | Programmatic browser control — computed styles, screenshots, network | **Recommended** |
| Human-in-the-loop | User opens DevTools, provides data, AI structures | Current default |

### Why Playwright MCP over Computer Use:
Computer Use is a general tool (controls your entire computer). Playwright MCP is purpose-built for web extraction:

| Pipeline need | Playwright capability |
|---|---|
| Exact computed styles | `getComputedStyle()` — reads what browser actually renders |
| Font and library detection | Network interception — every font/JS library loaded |
| Animation timing and easing | Performance API + animation inspection |
| Pixel measurements at breakpoints | Set viewport to exact sizes, measure precisely |
| Screenshots for visual analysis | Full page or element screenshots at any size |
| Repeatable for every client site | Same extraction quality every time |

### Playwright modes:
- `headless: false` → **Headed mode** — Chrome opens visibly, you can watch navigation in real time
- `headless: true` → Headless — Chrome runs invisibly in background

**For this pipeline: headed mode recommended** so you can watch and catch any issues.

### Important distinction:
Playwright doesn't open the DevTools **panel** as a visible UI. It uses the Chrome DevTools Protocol (CDP) — the same underlying API that powers DevTools — to access data programmatically. Same data. No visible panel. Faster and more accurate than manually reading the DevTools UI.

### With Playwright MCP: Tier 0 and DNA collapse into one step
```
AI receives URL
      ↓
Playwright opens Chrome (visible)
  - Visual pass (DevTools closed) → screenshots for feel/mood
  - DevTools pass (CDP) → computed styles, network, animations
  - Responsive pass → measurements at 1440 / 768 / 375
      ↓
AI synthesizes all captured data → generates DNA
```

### Setup required (not yet done):
```bash
npm install -g @playwright/mcp
npx playwright install chromium
```

Config to add to `C:\Users\Arham\.claude\settings.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp", "--headed"]
    }
  }
}
```

**Status: Pending** — npm not accessible from current shell environment. User needs to run the two commands manually, then config can be written.

---

## 15. Pipeline Rules — Full List (Current State)

1. Documentation is built once per source site. Never rebuild it for each client.
2. Client input never modifies the documentation system. The two are always separate.
3. Generation Rules are always read last before generating. They are the final check.
4. Every output must include a thought process document. This is not optional.
5. Asset fallbacks are always specified. Never let the AI choose its own substitute.
6. Tier 3 files are only required for complex sites. Do not over-document simple sites.
7. Synthesis maps only exist when mixing multiple source sites. Single-source projects do not need them.
8. Design Intent takes precedence over Design Principles when they conflict. WHY overrides HOW.
9. Freedom at extraction, constraint at generation. Free extraction captures expertise — free generation would discard it.
10. Every output is verified against the source (Stage 6). Never report a predicted % as if measured.
11. The DNA passes the self-audit before any downstream file is generated. No downstream file until both passes complete.

---

## 16. Accuracy — Current Realistic Estimate

| Scenario | Realistic accuracy |
|---|---|
| Single simple site, full pipeline + Stage 6 | 93–97% |
| Single complex site, full pipeline + Stage 6 | **90–95%** |
| Multi-source, well-scoped synthesis-map + Stage 6 | 85–92% |
| Multi-source, loose map | 75–85% |
| Any build using asset fallbacks | Hard ceiling below 100% by design |

**What moves a build from prediction toward the ceiling:**
- Extraction Completeness Self-Audit (Pass 2) — removes silent gaps
- Stage 6 Verification — closes the gap to the ceiling by catching adherence misses
- Multi-source requires tight synthesis-map scoping

**The honest caveat:** Until Stage 6 is run on an actual build, every number above is still a prediction. The pipeline now has no measurement debt — run one section through Stage 6 and you'll have a real score.

---

## 17. Open Items (Not Yet Done)

1. **Playwright MCP setup** — user needs to run `npm install -g @playwright/mcp` and `npx playwright install chromium`. Then Claude writes the settings.json config.

2. **Pipeline docs Tier 0 framing** — still partially says "website URL / screenshots" in some places. Needs updating to reflect: user provides raw DevTools data as text, AI structures it (current human-in-the-loop reality before Playwright MCP is set up).

3. **Accuracy by Tier table note** — flagged as predictions, not measurements. Once real Stage 6 scores exist from actual builds, the numbers should be updated with observed data.

4. **`pattern-library.md` prompt** — exists in the enrichment section but not formally numbered in the generation order. Should be formalized as step 4 in Tier 1.

5. **`design-qa-checklist.yaml`** — referenced as Tier 5 but prompt block exists only in the enrichment section. Should be promoted to a formal numbered step.

---

## 18. Key Principles Established (Summary)

> **The DNA is the heart of the pipeline.** Every downstream file derives from it. Weak DNA wastes every downstream token. Fix the DNA first, then regenerate everything built on it.

> **Constrain the facts, free the insight.** Tier 0 facts are grounded in direct observation. DNA interpretation stays free. Reliability comes from structure around the prompt, not from making the prompt prescriptive.

> **Freedom at extraction, constraint at generation.** The AI borrows its own expertise during extraction. At generation it spends that expertise — it doesn't invent new opinions.

> **Silence in the DNA = unconstrained generation downstream.** Every gap the DNA leaves is filled by the model's training defaults. The self-audit closes those gaps before they propagate.

> **A predicted accuracy is not a measured one.** Only Stage 6 produces a real number. Never report the tier table % as if it were observed.

> **The website opens once per source site — for the full Tier 0 session.** After Tier 0, every downstream file derives from captured artifacts. Re-opening wastes tokens and creates inconsistency.

> **0b before DevTools.** Fresh-eyes visual perception cannot be recovered once technical analysis begins. Run 0b (visual observation) before opening DevTools for 0a.

> **generation-rules.md is the most important Tier 2 file.** It is the proactive "never add X" list that prevents defaults before they happen. The QA checklist validates after; generation-rules prevents before. Never skip it.

> **Every file must justify its existence by a lifecycle role.** Derivation source, conditional feed, verification input, or maintenance audit trail. No role = overhead.
