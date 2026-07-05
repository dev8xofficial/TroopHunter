# AI UI Generation Pipeline
**Version 1.0 — TroopHunter Design System**

A structured pipeline for generating high-fidelity UI sections for any client using extracted design DNA from source websites.

---

## Pipeline Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                       SOURCE WEBSITE(S)                          │
│                  (e.g. oliviaharperhomes.com)                     │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│  STAGE 1 — EXTRACTION                                            │
│  Analyze and document the source website                         │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│  STAGE 2 — DOCUMENTATION SYSTEM                                  │
│  The design brain. Built once per source. Reused forever.        │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│  STAGE 3 — CLIENT INPUT                                          │
│  Brand identity, content, assets for the target client           │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│  STAGE 4 — AI GENERATION ENGINE                                  │
│  Synthesizes documentation + client input → produces UI          │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────┐
│  STAGE 5 — OUTPUT                                                │
│  HTML/CSS/JS prototype + thought process document                │
└──────────────────────────────────────────────────────────────────┘
```

---

## Stage 1 — Extraction

**Input:** Source website URL
**Output:** Raw data for documentation system

| What to Extract | Method | Goes Into |
|---|---|---|
| Color palette (exact hex values) | DevTools → Computed Styles | Design DNA |
| Typography (font families, sizes, weights, line-heights) | DevTools → Fonts panel | Design DNA + Tokens |
| Spacing system (margins, padding, gaps) | DevTools → Box Model | Design DNA + Tokens |
| Border radius values | DevTools → Computed Styles | Design DNA + Tokens |
| Animation easings and durations | DevTools → Animations panel | Design DNA + Tokens |
| Component HTML structure | DevTools → Elements panel | Component Library |
| Interaction behaviors (hover, scroll, click) | Manual observation + DevTools | UX Patterns + Design Principles |
| Z-index stack | DevTools → Layers panel | Design DNA |
| JavaScript libraries (GSAP, Swiper, Lottie) | DevTools → Sources panel | Asset Fallbacks |
| Responsive breakpoints | DevTools → Responsive mode | Design DNA + Tokens |
| Brand voice and copy patterns | Manual reading | Design Intent |
| Conversion architecture (CTAs, funnels) | Manual analysis | Design Intent |

---

### Extraction Completeness Self-Audit

> **Why this exists:** Extraction is intentionally open-ended — the AI is given full
> freedom to analyze the source and surface insights a non-expert would never think to
> request. That freedom maximizes breadth, but it is non-deterministic: any single pass
> may go deep on color and shallow on motion. Whatever the DNA leaves silent becomes a
> gap that constrained generation later fills with the model's generic defaults — a
> silent deviation. This audit closes those gaps **without** making the extraction prompt
> prescriptive.

**Run immediately after `design_dna.md` is produced, in the same session:**

```
Prompt:  Audit the design DNA you just produced. List every design dimension you did
         NOT cover or covered only shallowly. For each gap, state whether the answer is
         observable on the source site. Then fill every observable gap.
```

Checklist the audit must confirm is present (or explicitly marked N/A):

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

**Rule:** A dimension may be marked N/A (the source genuinely does not use it), but it may
never be silently omitted. Silence in the DNA = unconstrained generation downstream.

---

## Stage 2 — Documentation System

The documentation system is the core of the pipeline. It is built once per source website and reused for every client generation.

```
documentation/
├── Tier 0 — Raw Extraction          (the unsynthesized capture; source of truth for DNA)
│   ├── live-url-devtools-notes.md       computed styles, network, libraries, z-index
│   ├── visual-observation-notes.md      manual observations: mood, motion feel, hierarchy
│   └── measurement-pixel-specs.yaml     exact pixel measurements (px-level ground truth)
│
├── Tier 1 — Foundation              (WHAT exists)
│   ├── brand-dna.md                     master DNA: color, type, spacing, voice, conversion
│   ├── design-tokens.json               all values, machine-readable
│   ├── component-library.md             component-by-component anatomy
│   ├── pattern-library.md               reusable patterns above the component level
│   └── page-screen-specs.md             page/route architecture (blueprint)
│
├── Tier 2 — Generation Control      (HOW / WHY / what NOT / what to substitute)
│   ├── design-principles.md             the HOW — construction rules
│   ├── design-intent-ux-philosophy.md   the WHY — goals and reasoning
│   ├── design-rationale.md              extended WHY — trade-offs behind decisions
│   ├── generation-rules.md          ◀  the "do not invent" negative-constraint list
│   └── data-asset-replacement-guidelines.md   asset/data fallback protocol
│
├── Tier 3 — Complex Sites           (add when needed)
│   ├── component-states.yaml            every state for every interactive component
│   ├── interaction-system.md            interaction model (hover, cursor, fills)
│   ├── animation-system.md              scroll/load animation choreography
│   ├── responsive-system.md             per-component behavior at every breakpoint
│   ├── content-architecture.yaml        content model and structure
│   ├── edge-cases.md                    imperfect/missing content behavior
│   └── user-flows.md                    user journeys and funnel sequences
│
├── Tier 4 — Multi-Source            (add when mixing sites)
│   └── synthesis-map.md                 element + doc ownership across sources
│
└── Tier 5 — Verification            (every build)
    └── design-qa-checklist.md           rubric/checklist behind verification_report.md
```

> **Naming note:** This tree reflects the **production file set** (kebab-case, split for
> granularity). The conceptual sections below use the original names — the mapping is:
> `brand-dna` ↔ design_dna, `page-screen-specs` ↔ page_blueprint,
> `design-intent-ux-philosophy` + `design-rationale` ↔ design_intent,
> `data-asset-replacement-guidelines` ↔ asset_fallbacks, `component-states` ↔ component_states,
> `animation-system` + `interaction-system` ↔ animation_choreography,
> `responsive-system` ↔ responsive_matrix, `edge-cases` + `content-architecture` ↔ content_edge_cases,
> `synthesis-map` ↔ synthesis_map, `design-qa-checklist` ↔ the Stage 6 rubric.
>
> **Tier 0** (raw extraction) and **Tier 5** (QA checklist), plus `pattern-library`,
> `user-flows`, and `design-rationale`, are enrichments beyond the original tiers — they
> raise extraction fidelity and verification rigor. **`generation-rules.md` (◀) is the one
> file most easily forgotten and the most important** — it is the proactive "never add X"
> list read last before generation. A QA checklist validates *after*; generation-rules
> prevents *before*. Keep both.

---

### Tier 0 — Raw Extraction

> Answers: **WHAT the live site literally is — captured, not yet synthesized**
>
> **Who does Tier 0:** The user opens the site in Chrome and DevTools, analyzes it, and
> provides screenshots to the AI. The AI reads the screenshots and produces the structured
> notes. The AI cannot open a browser or DevTools itself — Tier 0 is human-driven capture,
> AI-driven structuring.
>
> The three files require three different modes of engagement and must run in this order:
>
> ```
> 0b first  — Chrome open, DevTools CLOSED. Screenshot the live visual experience.
> 0a second — DevTools OPEN. Screenshot all panels: Elements, Computed, Network,
>             Animations, Sources, Z-index layers.
> 0c third  — DevTools Responsive mode. Screenshot at 1440 / 768 / 375.
>             Screenshot Box Model per key element.
> ```
>
> **Why 0b must come first:** once DevTools opens, the brain enters technical mode and
> the fresh-eyes visual perception is gone for that session. 0b captures the qualitative
> feel — mood, motion weight, brand voice — that `design-intent` and `generation-rules`
> are built from. It must be screenshotted before DevTools is opened.
>
> After Tier 0 completes, the website is never opened again. All downstream files derive
> from these artifacts. The raw capture is the audit trail you check instead of re-opening
> (see *If Output Quality Is Low*).

---

#### `visual-observation-notes.md`
What DevTools cannot read: the human-perceived qualities. **Run first — DevTools closed.**

```
Covers:
- Mood and photography treatment
- Motion feel (cinematic vs. snappy, slow-pan vs. jerk)
- Hierarchy, density gradient, white-space philosophy
- Brand voice impressions from the copy

Rule: Subjective observation, captured before it is rationalized into intent.
      Run before opening DevTools — this perception cannot be recovered after.
```

---

#### `live-url-devtools-notes.md`
The unprocessed DevTools capture. Facts, not interpretation. **Run second — DevTools open.**

```
Covers:
- Computed styles (colors, type, spacing) as read from the DOM
- Box-model measurements per element
- Animation entries (timing, easing) from the Animations panel
- Z-index / layer stack
- Network: fonts, JS libraries (GSAP, Swiper, Lottie)
- Responsive breakpoints observed in responsive mode

Rule: Capture only. No synthesis, no "why". This is ground truth.
```

---

#### `measurement-pixel-specs.yaml`
Exact pixel measurements — px-level ground truth. **Run third — Responsive mode.**

```yaml
# Per element, per breakpoint — DevTools Responsive mode + Box Model
hero:
  height: { 1440: "94vh", 768: "94vh", 375: "85vh" }
  title-size: { 1440: "80px", 768: "60px", 375: "42px" }
  page-inset: { 1440: "15px", 768: "10px", 375: "8px" }

Used at: Stage 6 verification (the Tokens dimension's ground truth),
not fed at generation.
```

---

### Tier 1 — Foundation

> Answers: **WHAT exists on the source site**

---

#### `design_dna.md`
The master extraction document. Every measurable property of the source site.

```
Covers:
- Color system (primary, secondary, neutral, semantic)
- Typography system (families, scale, weights, line-heights)
- Spacing system (base unit, scale, margin/padding rules)
- Border radius values (every context)
- Shadow system
- Animation inventory (every motion, timing, easing)
- Component patterns (structure, not code)
- Responsive strategy
- Z-index stack
- Page-by-page anatomy
- Brand voice and tone
- Conversion architecture
```

---

#### DNA Reliability Protocol

> The DNA is the foundation — every downstream file derives from it. The goal is a
> **reliable** foundation that gives the AI **full analytical freedom**. Reliability comes
> from what wraps the prompt, not from making the prompt prescriptive.

**Two passes** (freedom lives in Pass 1):

```
Pass 1 — FREE ANALYSIS    Open prompt → AI analyzes the site with full creative
                          freedom, informed by Tier 0 notes → produces brand-dna.md

Pass 2 — SELF-AUDIT       AI audits its own DNA for coverage gaps, fills every
                          observable gap → completeness floor (see Stage 1 self-audit)
```

**Why no Pass 3 grounding gate:** checking one AI output (DNA) against another AI output
(Tier 0 notes) adds token cost without real verification — two AIs agreeing proves nothing.
Real ground truth verification happens at **Stage 6**, where generated output is scored
against the actual source. That is the only meaningful measurement.

**Tier 0's real role in DNA reliability:** the three Tier 0 files are not a checklist the
DNA must reconcile against. They are the **informational context** the AI reads before
writing the DNA — richer input, richer output. Then they become the **Stage 6 ground
truth**, used after generation, not between passes.

**The DNA gate** remains: no downstream file until both passes complete and the self-audit
returns no uncovered observable dimensions. Weak DNA wastes every downstream token.

---

#### `component_library.md`
Component-by-component anatomy. Structure, variants, and composition rules.

> **Input note:** `live-url-devtools-notes.md` is a required input alongside the DNA. The
> DevTools element capture contains the raw HTML structure and class naming that the DNA
> summarizes but does not reproduce in full structural detail.

```
Covers:
- Every UI component (Header, Hero, Card, Button, Footer, etc.)
- HTML structure per component
- CSS class naming conventions
- Component variants (e.g. Button: outline, filled, ghost)
- How components compose together
- React/Tailwind implementation examples
```

---

#### `design_tokens.json`
All values in machine-readable format. Source of truth for all numbers.

> **Input note:** `measurement-pixel-specs.yaml` is a required input alongside the DNA.
> Token values must be grounded in the px-level capture — not derived from DNA prose
> which may be imprecise. The pixel specs are the authoritative numbers.

```json
{
  "colors": { "warm-taupe": "#96847A", ... },
  "typography": { "display-size": "75px", ... },
  "spacing": { "page-inset": "15px", ... },
  "animation": { "spring-easing": "cubic-bezier(0.31, -0.105, 0.43, 1.59)", ... },
  "borderRadius": { "container": "15px", "button": "0px", ... }
}
```

---

### Tier 2 — Generation Control

> Answers: **HOW to build, WHY it was built, what NOT to do, and what to substitute**

**Input logic for the three design-definition files:**

| File | Source | Why |
|---|---|---|
| design_principles.md | DNA + component_library | Principles are rules extracted from patterns the DNA already describes. If DNA says "0px buttons / 15px containers," the principle is right there. DNA is sufficient. |
| design_intent.md | DNA + visual-observation-notes | Intent is the WHY — rooted in qualitative feel (mood, restraint, luxury). DNA captures this partially; visual-observation-notes captures it raw. Both are needed. |
| design-rationale.md | DNA + intent + visual-observation-notes | Rationale is the extended WHY + trade-offs. Needs the felt qualities (observations) alongside the reasoned intent. |

The key distinction: **Principles are derived from measurable patterns** (DNA is enough). **Intent and Rationale are derived from felt qualities** — the DNA can only partially represent these; `visual-observation-notes.md` is the direct source and must be fed alongside the DNA.

---

#### `design_principles.md`
The construction rules. HOW each design decision is executed.

```
Format per principle:
- Rule: The specific instruction
- Applies to: Which components / contexts
- Does not apply to: Exceptions

Examples:
- Rule: Buttons use 0px border-radius
  Applies to: All action elements (btn, submit, CTA)
  Does not apply to: Containers, cards, images

- Rule: Nav background = #E2E1E126 flat tint only
  Applies to: Header positioned over photography
  Does not apply to: Header after scroll (may darken with warm tones)
```

---

#### `design_intent.md`
The philosophical reasoning. WHY each decision was made.

> **Input note:** `visual-observation-notes.md` is a required input alongside the DNA. The observations file is the only place in the system that captures qualitative feel — mood, restraint, photography treatment, brand voice impressions — exactly the raw material that intent is built from. DNA alone risks producing intent derived purely from measurable facts, which loses the subjective WHY.

```
Format per intent:
- Intent: The goal or purpose
- Drives: Which principles or rules it produces
- If violated: What breaks

Examples:
- Intent: Photography must seduce before copy convinces
  Drives: No dark overlays, no blur, minimal text in hero
  If violated: User reads before feeling — conversion drops

- Intent: Pull the user, never push
  Drives: No hard CTAs in hero, narrative-first structure
  If violated: Site feels aggressive, luxury positioning breaks

- Intent: Psychological contrast between space and action
  Drives: 0px buttons against 15px containers
  If violated: UI feels indecisive, no visual tension
```

---

#### `generation_rules.md`
Negative constraints. The explicit "do not invent" list.

```
Format per rule:
- Never: The specific thing AI must not add
- Why: Which intent or principle it violates
- Common AI mistake: What training data suggests instead

Examples:
- Never: Add gradient overlays to hero background
  Why: Violates "photography must dominate" intent
  Common AI mistake: Dark top/bottom gradient for "text readability"

- Never: Add backdrop-filter blur to header
  Why: Violates flat warm tint principle
  Common AI mistake: blur(4px) because "it looks modern"

- Never: Add subtitle paragraph below hero tags
  Why: Hero content is: Title → Tags → Scroll only
  Common AI mistake: Adding context paragraph for "clarity"
```

---

#### `asset_fallbacks.md`
Substitution protocol for premium/unavailable assets.

```
Format per fallback:
- Asset: The original premium asset
- Fallback: The specific substitute
- Why this substitute: Closest match reasoning
- What to avoid: Wrong substitutes

Examples:
- Asset: F37 Bolton (paid display font)
  Fallback: Cormorant Garamond (Google Fonts)
  Why: Shares the humanist warmth and light-weight elegance
  Avoid: Plus Jakarta Sans (too geometric, too modern)

- Asset: Swiper.js background slideshow
  Fallback: CSS crossfade between 3 images (opacity transition)
  Why: Maintains multi-image narrative without JS dependency
  Avoid: Ken Burns single-image zoom (wrong motion language)

- Asset: Lottie SVG title animation
  Fallback: CSS mask + translateY reveal, stagger 250ms per line
  Why: Replicates the draw-in motion without the JSON file
  Avoid: Simple fadeIn (loses the directional reveal intent)
```

---

### Tier 3 — Complex Sites

> Add these files when the source site has interactive states, complex animations, or data-driven content

---

#### `component-states.yaml`
Every state for every interactive component.

> **Input note:** `visual-observation-notes.md` is required alongside component-library
> and principles. How a state *feels* — the spring bounce on hover, the cinematic slow-pan
> on image hover — is captured in the observations, not derivable from principles alone.

```
Covers per component:
- Default state
- Hover state (visual changes)
- Active / pressed state
- Focus state (keyboard navigation)
- Disabled state
- Loading state
- Error state
- Empty state (no data)
- Success state

Why needed: Without this, AI generates only the default state.
All interactive components will feel broken in use.
```

---

#### `interaction-system.md`
The full interaction model — hover, cursor, fills, micro-interactions.

> **Input note:** Two Tier 0 files required alongside component-library + principles:
> `visual-observation-notes.md` → how interactions feel (lerp physics, spring curves,
> cinematic weight). `live-url-devtools-notes.md` → exact easing and timing from the
> DevTools Animations panel. Feel + precision together, not either alone.

```
Covers:
- Custom cursor behavior and physics
- Button fill animations (direction, duration, easing)
- Image hover effects (scale, speed, feel)
- Social icon spring interactions
- All hover / active / focus micro-interactions
```

---

#### `animation-system.md`
The full scroll animation timeline across sections.

> **Input note:** `live-url-devtools-notes.md` is required alongside DNA + principles.
> Animation timing, easing curves, and scroll triggers are captured directly from the
> DevTools Animations panel — the DNA describes them, the DevTools notes provide the
> exact values.

```
Covers:
- What triggers what (scroll position → animation)
- Sequence across multiple sections
- Dependencies (animation B waits for animation A)
- Delays and offsets across components
- What plays on load vs. on scroll vs. on hover

Why needed: Without this, each component animates in isolation.
They fire out of sequence and clash visually.
```

---

#### `responsive-system.md`
Component-by-component behavior at every breakpoint.

> **Input note:** `measurement-pixel-specs.yaml` is required alongside component-library
> and tokens. Breakpoint values must come from the measured specs — the authoritative
> px-level capture per breakpoint — not from token prose descriptions.

```
Format:
| Component    | Desktop (1440) | Tablet (768) | Mobile (375) |
|--------------|----------------|--------------|--------------|
| Header       | 3-col flex     | 3-col flex   | Logo + hamburger |
| Hero title   | 80px           | 60px         | 42px         |
| Hero height  | 94vh           | 94vh         | 85vh         |
| Page inset   | 15px           | 10px         | 8px          |

Why needed: General breakpoint rules don't specify that the stats
grid collapses differently than the project card grid.
```

---

#### `content_edge_cases.md`
What happens when content is imperfect or missing.

```
Covers:
- Long text (headline > 3 words, title > 60 chars)
- Missing images (placeholder rules, color fallbacks)
- Empty API states (no projects, no listings)
- Text overflow rules (truncation vs. wrap vs. scroll)
- Image loading states (skeleton screens vs. blur-up)

Why needed: AI assumes perfect data. Real clients always have
edge cases. Without this, the UI breaks in production.
```

---

### Tier 4 — Multi-Source Synthesis

> Add when you are deliberately mixing design DNA from multiple source websites

---

#### `synthesis_map.md`
Element-level ownership across multiple source sites — **and** the docs that govern each element.

> **Why this is more than a value table:** When you feed full memory sets (not just each
> `design_dna.md`, but every source's tokens, principles, intent, rules, and fallbacks),
> the sites contradict each other at the *philosophy* level, not just the value level —
> three intent files, three rule sets, all fighting at once. A value-only map can't resolve
> that. The map must therefore say, per element, **which source owns it AND which of that
> source's docs govern it**, then scope every source's rules and arbitrate intent.

```
Format (element → owner → governing docs):
| Design Element    | Owner  | Governing docs that apply              |
|-------------------|--------|----------------------------------------|
| Color palette     | Site A | A.dna, A.tokens, A.principles          |
| Layout structure  | Site A | A.dna, A.component_library, A.principles |
| Typography scale  | Site A | A.dna, A.tokens                        |
| Button style      | Site B | B.principles, B.rules, B.fallbacks     |
| Scroll animation  | Site C | C.intent, C.choreography, C.principles |
| Photography mood  | Site C | C.principles, C.fallbacks              |

Rules:
- Default: Site A governs everything not listed (base site).
- Override: Specific rows above take precedence over the default.
- Rule scoping: A source's generation_rules apply ONLY to the elements that source owns.
  (Site A's "no overlay" rule cannot veto Site C's owned dramatic photography.)
- Doc scoping: Only the governing docs listed for an element may influence that element.
  Other sources' docs are ignored for that element.
- Intent precedence: For cross-element conflicts that no single owner resolves, the base
  site's design_intent wins — so the whole build reads as one coherent design, not a
  committee of three.
```

**Note on context load:** full memory sets for multiple sites is a large, contradictory
instruction payload — the lost-in-the-middle risk multiplies and the model is more likely
to silently drop a rule. Stage 6 verification is therefore **mandatory** in multi-source
mode, not optional.

---

## Stage 3 — Client Input

**Input per client. Does not change the documentation system.**

```
client_input/
├── brand_identity.md
├── content.md
└── assets/
    ├── logo.svg
    └── images/
```

---

#### `brand_identity.md`

```
Company name:    The Burkes Group
Industry:        Real Estate & Mortgage
Location:        The Woodlands, TX
Brand values:    Trust, Legacy, Reliability, Expertise
Tone:            Authoritative but approachable
Target audience: Home buyers, sellers, investors, divorce attorneys, CPAs
```

---

#### `content.md`

```
Hero title:      "Built on Trust, Driven by Legacy."
Hero tags:       Strategic • Trusted • Results-Driven
Navigation:      About Us / Buy / Sell / Services
CTA text:        Contact Us
CTA link:        #contact
Email:           jahcorrian@theburkesgrouptx.com
Phone:           832-281-5542
Social:          Instagram
```

---

## Stage 4 — AI Generation Engine

How the AI processes all inputs to produce accurate output.

```
┌─────────────────────────────────────────────────────────┐
│  INPUT READING (order matters)                          │
│                                                         │
│  1. design_intent.md      → Understand the WHY first   │
│  2. design_principles.md  → Learn HOW to build         │
│  3. design_dna.md         → Learn WHAT values to use   │
│  4. component_library.md  → Learn component structure  │
│  5. design_tokens.json    → Load exact numbers         │
│  6. generation_rules.md   → Load what NOT to do        │
│  7. asset_fallbacks.md    → Load substitution protocol │
│  8. synthesis_map.md      → Load element + doc ownership│
│  9. client_input/         → Load client content        │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  GENERATION PROCESS                                     │
│                                                         │
│  Step 1: Map client content to source component slots  │
│          (client tagline → hero title slot)            │
│                                                         │
│  Step 2: Apply design principles to structure          │
│          (3-col header, 15px inset, 94vh hero)         │
│                                                         │
│  Step 3: Check generation rules before adding anything │
│          (grain texture? → NOT in rules → DO NOT ADD)  │
│                                                         │
│  Step 4: Replace premium assets with fallbacks         │
│          (F37 Bolton → Cormorant Garamond)             │
│                                                         │
│  Step 5: Apply design intent to every decision         │
│          (photography must dominate → no dark overlay) │
│                                                         │
│  Step 6: Document every decision in thought process    │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
```

---

#### Generation Prompt Structure

```
You are generating a [section name] for [client name].

DESIGN SYSTEM (read in this order):
1. Design Intent: [paste design_intent.md]
2. Design Principles: [paste design_principles.md]
3. Design DNA: [paste design_dna.md]
4. Component Library: [paste component_library.md]
5. Design Tokens: [paste design_tokens.json]
6. Generation Rules: [paste generation_rules.md]
7. Asset Fallbacks: [paste asset_fallbacks.md]

CLIENT CONTENT:
[paste client content]

OUTPUT REQUIREMENTS:
- Vanilla HTML/CSS/JS (BEM naming)
- Fluid typography with clamp()
- Font-aware animation init (document.fonts.ready.then())
- Produce a thought process document alongside the code
- Every design decision must reference which file it came from
```

---

## Stage 5 — Output

```
output/
├── index.html            (generated UI)
├── style.css             (generated styles)
├── script.js             (generated interactions)
└── thought_process.md    (decision log)
```

---

#### `thought_process.md` Structure

The AI must produce this alongside every generation.

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

---

## Stage 6 — Verification

```
┌──────────────────────────────────────────────────────────────────┐
│  STAGE 6 — VERIFICATION                                          │
│  Measure the output against the source. Convert the predicted    │
│  accuracy % into an observed one, then correct.                  │
└──────────────────────────────────────────────────────────────────┘
```

**Why this exists:** Every percentage in the *Accuracy by Tier* table is a prediction,
not a measurement. The only built-in audit before this stage is `thought_process.md` —
the generator grading its own homework. Stage 6 replaces the estimate with an observation
and feeds the difference back into the output. Without it, the pipeline cannot *claim*
an accuracy figure; it can only guess one.

---

#### Step 1 — Define the unit of accuracy

"Accuracy" is meaningless until it names *what* is being measured. Score four weighted
dimensions; the weighted sum is the accuracy figure.

```
| Dimension              | Weight | What it measures                              |
|------------------------|--------|-----------------------------------------------|
| Tokens                 | 25%    | Exact colors, sizes, radii, spacing vs DNA    |
| Layout & Structure     | 25%    | Component anatomy, grid, hierarchy, order     |
| Typography & Visual    | 25%    | Type scale, rhythm, imagery treatment, "feel" |
| Intent & Interaction   | 25%    | Animations, states, conversion logic, the WHY |
```

A build can be 95% on tokens and 70% on feel — one number hides that. Always report the
four sub-scores alongside the weighted total.

---

#### Step 2 — Side-by-side diff

```
1. Screenshot the generated output at each breakpoint (1440 / 768 / 375).
2. Place it beside the source screenshot for the same section + breakpoint.
3. Score each of the four dimensions 0–100 against the rubric.
4. Record every mismatch as a finding: what differs, which dimension, severity.
```

For each finding, classify the cause — this routes the fix correctly:

```
| Cause                          | Fix location                              |
|--------------------------------|-------------------------------------------|
| DNA was silent on this         | Strengthen design_dna.md (re-extract)     |
| DNA had it, generation ignored | Re-generate; add to generation_rules.md   |
| Premium asset substitution     | Expected ceiling — log, do not "fix"      |
| Client content reshaped layout | Add to content_edge_cases.md              |
```

---

#### Step 3 — Correction loop

```
Score < target?
        │
        ▼
Is the finding a generation miss (DNA had it, output ignored it)?
        │
    Yes │  No
        │   └──→ Route to the doc fix (Stage 1 DNA, or the relevant Tier file)
        ▼
Re-generate the section with the missed constraints reinforced,
then re-score. Repeat until the weighted total meets target.
```

This is an **output-level** loop, distinct from the *"If Output Quality Is Low"*
documentation loop in `pipeline_prompts.md`. That one fixes the docs; this one fixes the
build. Both can fire from the same finding — fix the doc *and* re-generate.

---

#### `verification_report.md` Structure

Produced once per section, alongside `thought_process.md`.

```
## 1. Scores
Per-dimension scores + weighted total. State the target and pass/fail.

## 2. Findings
Per finding: what differs → dimension → severity → classified cause.

## 3. Corrections Applied
Per correction: finding → action taken → re-score result.

## 4. Accepted Deviations
Findings deliberately not fixed (e.g. asset-fallback ceiling) and why.

## 5. Final Verdict
Observed accuracy (measured, not predicted) vs. the tier table estimate.
```

---

## Accuracy by Tier

> **These figures are predictions, not measurements.** They estimate the *ceiling* a given
> documentation depth makes possible — assuming clean extraction and faithful generation.
> The only number you may *report* as accuracy is an **observed Stage 6 score** for an
> actual build (see `verification_report.md`). Until a section passes Stage 6, treat every
> cell below as a target, not a result. (Pipeline Rule 10.)

| Documentation Tier | Simple Site | Complex Site |
|---|---|---|
| Tier 1 only (DNA + Library + Tokens) | 60–70% | 45–55% |
| Tier 1 + Tier 2 (+ Principles + Intent + Rules + Fallbacks) | 90–95% | 70–75% |
| Tier 1 + Tier 2 + Tier 3 (+ States + Choreography + Matrix) | 95%+ | 90–95% |
| All Tiers including Tier 4 Synthesis Map | 95%+ | 95%+ |

**What moves a build from the prediction toward the ceiling:**

- **Extraction Completeness Self-Audit (Stage 1)** — removes silent gaps in the DNA, so
  constrained generation has no holes to fill with generic defaults. Without it, real
  scores land *below* the table; with it, they approach the ceiling.
- **Stage 6 Verification** — does not raise the ceiling; it *closes the gap to it* by
  catching adherence misses and correcting them. It is also what converts the prediction
  into a measured figure in the first place.
- **Multi-source mode** caps lower until the `synthesis_map.md` rule/doc scoping is tight —
  three contradictory memory sets dilute adherence, so the "95%+" cell assumes a
  well-scoped map plus mandatory Stage 6.

**Why "100%" never appears:** any build using `asset_fallbacks.md` substitutes premium
assets (fonts, animation libraries, media) with approximations — a deliberate deviation.
That alone caps fidelity below 100% by design, which is why the top row reads "95%+".

---

## Pipeline Rules

1. **Documentation is built once per source site.** Never rebuild it for each client.
2. **Client input never modifies the documentation system.** The two are always separate.
3. **Generation Rules are always read last before generating.** They are the final check.
4. **Every output must include a thought process document.** This is not optional.
5. **Asset fallbacks are always specified.** Never let the AI choose its own substitute.
6. **Tier 3 files are only required for complex sites.** Do not over-document simple sites.
7. **Synthesis maps only exist when mixing multiple source sites.** Single-source projects do not need them.
8. **Design Intent takes precedence over Design Principles when they conflict.** WHY overrides HOW.
9. **Freedom at extraction, constraint at generation.** The AI analyzes the source freely to harvest its design knowledge into the docs; at generation it builds strictly from those docs. Free extraction captures expertise — free generation would discard it.
10. **Every output is verified against the source (Stage 6).** The tier table figures are predictions; only a Stage 6 score is an observed accuracy. Never report a predicted % as if measured.
11. **The DNA passes the self-audit before any downstream file is generated.** Free analysis (Pass 1) → self-audit (Pass 2). No downstream file until both passes complete with no uncovered observable dimensions. Weak DNA wastes every downstream token.

---

## Quick Reference

| Question | File to Read |
|---|---|
| What color goes here? | design_dna.md → design_tokens.json |
| How do I build this component? | design_principles.md → component_library.md |
| Why was this decision made? | design_intent.md |
| Can I add this element? | generation_rules.md |
| What replaces this premium asset? | asset_fallbacks.md |
| Which source site owns this element? | synthesis_map.md |
| What happens at mobile? | responsive_matrix.md |
| What does this component look like on hover? | component_states.md |
| Did the DNA miss anything? | Extraction Completeness Self-Audit (Stage 1) |
| Is the output actually accurate? | verification_report.md (Stage 6) |
