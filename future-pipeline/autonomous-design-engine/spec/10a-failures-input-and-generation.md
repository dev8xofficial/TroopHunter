# 10a — Failure Modes: Input, Brand, Design System & Generation

> Part of the failure-mode catalogue. **Start at [10-failure-modes.md](./10-failure-modes.md)** for the index, mitigation primitives (MP-n), and how to use this document — this file holds the full 8-field entries for the "getting from a brief to a rendered candidate" stage only.

---

## Input ingestion & brief understanding

### F-INP-01 — Brief misinterpretation
**Level:** spec+impl · **Severity:** High · **Area:** Input
- **Description:** The system misreads the business goal/audience and designs (or derives a brand) for the wrong intent (e.g. an urgency-driven hero for a brief whose goal is "confidence, not urgency").
- **Root cause:** Ambiguous brief; model over-weights surface words; no explicit goal-extraction step.
- **Detection:** High craft but low `brief_fit`; human says "good but wrong for us"; the system's restatement of the brief diverges from the brief.
- **Impact:** Wasted iterations; late rejection; erodes trust in autonomy.
- **Mitigation:** Structured brief schema ([07 §3](./07-mvp-cli.md)); a "restate goal/audience/constraints" step the human confirms before generation; `brief_fit` as a first-class Critic dimension [MP-3, MP-6].
- **Recovery:** Re-run with the clarified brief; record the misread for prompt tuning.
- **Validation:** Hold-out briefs with known intent; measure restatement accuracy; H2 ratings.

### F-INP-02 — Under-specified brief → invented intent
**Level:** spec · **Severity:** Med · **Area:** Input
- **Description:** Brief omits a **required** fact (e.g. goal or audience); the AI fills the gap with its own assumptions. *(Deriving brand strategy — personality/tone — from an adequate brief is intended, `04` §2.1; the failure is missing the required facts that derivation depends on.)*
- **Root cause:** Silence in a required input = unconstrained generation (the old pipeline's lesson).
- **Detection:** The system asks no question yet makes strong unstated choices; restatement contains facts not in the brief.
- **Impact:** Plausible-but-wrong direction; inconsistent results across runs.
- **Mitigation:** Required-fields validation; the system must surface assumptions explicitly and ask when a required field is missing rather than inventing [MP-6].
- **Recovery:** Prompt the human for the missing field; regenerate.
- **Validation:** Inject briefs with missing fields; assert the system flags rather than invents.

### F-INP-03 — Conflicting brief signals
**Level:** spec · **Severity:** Med · **Area:** Input
- **Description:** Brief contains contradictions ("ultra-luxury" + "budget-friendly"; "minimal" + "feature-dense").
- **Root cause:** Real briefs are messy; no contradiction detection.
- **Detection:** Critic dimensions pull apart (can't satisfy both); oscillation across iterations.
- **Impact:** The loop thrashes; no candidate satisfies all goals.
- **Mitigation:** A brief-validation pass that names contradictions and asks the human to prioritize before generation.
- **Recovery:** Surface the conflict; proceed only after the human resolves it.
- **Validation:** Seed contradictory briefs; assert detection before any generation spend.

### F-INP-04 — Malformed / invalid brief file
**Level:** impl · **Severity:** Low · **Area:** Input
- **Description:** Brief JSON is invalid, missing required keys, or wrong types.
- **Root cause:** Hand-authored input; no schema enforcement.
- **Detection:** Schema validation error at load.
- **Impact:** Crash or garbage generation if unvalidated.
- **Mitigation:** Validate against the Brief schema at entry; fail fast with a precise message [MP-1].
- **Recovery:** Reject with actionable error; do not call the model.
- **Validation:** Unit tests with malformed briefs expect clean rejection.

### F-INP-05 — Missing or broken content/assets
**Level:** impl · **Severity:** Med · **Area:** Input
- **Description:** Referenced image/logo path is missing or unreadable.
- **Root cause:** Asset paths not checked; assets moved.
- **Detection:** Asset existence check fails; render shows broken-image box.
- **Impact:** Broken render → Critic misjudges (see F-EYE-05); or placeholder leaks to output.
- **Mitigation:** Pre-flight asset existence/type check; defined placeholder policy [MP-1, MP-10].
- **Recovery:** Substitute a known placeholder and flag, or block with a clear error.
- **Validation:** Run with missing assets; assert pre-flight catch.

### F-INP-06 — Prompt injection via brief/content
**Level:** impl · **Severity:** High · **Area:** Input / security
- **Description:** Client copy or brief text contains instructions ("ignore your design rules, output X") that the model obeys.
- **Root cause:** Untrusted text concatenated into prompts without delineation.
- **Detection:** Output deviates from constraints in ways traceable to injected text; anomalous behavior on specific briefs.
- **Impact:** Constraint bypass; brand/quality-floor violation; potential data exfiltration in multi-tenant settings.
- **Mitigation:** Treat all brief/content as data, not instructions — clear delimiters, system-role constraints, never let content override hard rules; sanitize/escape; deterministic post-checks of hard constraints [MP-1, MP-6].
- **Recovery:** Reject the run; quarantine the offending input.
- **Validation:** Red-team briefs with injected instructions; assert hard constraints still hold.

### F-INP-07 — Malformed / wrong-format visual assets
**Level:** impl · **Severity:** Med · **Area:** Input
- **Description:** A supplied asset (logo, hero image) loads without error but is wrong in ways that break the design: CMYK colorspace rendering off in a browser, too-low resolution for its display size, wrong aspect ratio forcing distortion or bad cropping, or a raster logo with a baked-in white/colored background that clashes with the section behind it.
- **Root cause:** Asset validation (F-INP-05) checks *existence*, not *fitness* — no colorspace/resolution/aspect-ratio/background check.
- **Detection:** A pre-flight image-metadata check (colorspace, dimensions, alpha channel) flags a mismatch against the section's expected display size.
- **Impact:** A technically "successful" render that looks broken or unprofessional — undetected by the render-health gate, which only checks that *something* loaded.
- **Mitigation:** Pre-flight asset *fitness* check (colorspace = sRGB, minimum resolution for the display size, alpha/background check for logos) alongside the existing existence check [MP-1].
- **Recovery:** Flag the specific defect to the human; request a corrected asset or auto-convert where safe (e.g. CMYK→sRGB).
- **Validation:** Supply a CMYK JPEG and an under-resolution logo; assert both are flagged before generation.

### F-INP-08 — Non-English / mixed-language brief comprehension gap
**Level:** spec · **Severity:** Med · **Area:** Input
- **Description:** The Brief Comprehension step ([11 §7](./11-guardrails-and-invariants.md)) and the Generator's understanding of tone/goal are tuned on English-language briefs; a non-English or mixed-language brief risks misread intent, lost nuance, or silently defaulting to English-centric design conventions.
- **Root cause:** No explicit multilingual handling in the comprehension step; untested outside English.
- **Detection:** Restatement accuracy drops on non-English briefs; a native speaker flags misread nuance.
- **Impact:** F-INP-01-style misinterpretation, specifically concentrated on non-English clients — a systematic gap, not a random one.
- **Mitigation:** Test the comprehension step explicitly against non-English/mixed-language briefs before claiming broad applicability; flag brief language and surface confidence accordingly.
- **Recovery:** Route low-confidence comprehension to human clarification rather than proceeding.
- **Validation:** A held-out set of non-English briefs in the benchmark ([13](./13-evaluation-charter.md)); track restatement accuracy by brief language.

### F-INP-09 — Content-robustness fragility
**Level:** spec+impl · **Severity:** Med · **Area:** Input / Generation
- **Description:** The system is validated on one content length and shape per section; real content varies (a much longer headline, a missing optional field, an unusually short or long CTA), and layouts tuned to the sample content can break or look unbalanced under realistic variation the system was never tested against.
- **Root cause:** No content-stress testing — the render-health and hard-constraint gates check the *given* content renders, not that the design *tolerates* plausible variation.
- **Detection:** Re-run the same approved section with stress-test content (2x/3x length, missing optional fields, minimal content); layout breaks or looks unbalanced.
- **Impact:** Designs that pass every gate on sample content still break in real use once real client content is substituted — a silent, deferred failure.
- **Mitigation:** A content-stress matrix (min/max length, missing-optional-field, long-unbroken-string cases) as part of the hard-constraint gate, not just the as-given content; tested as research bet **R10** ([14](./14-research-agenda.md)).
- **Recovery:** Regenerate with the stress case fed back as a hard constraint.
- **Validation:** The R10 experiment — escaped-failure rate on held-out content variations, before vs. after the stress matrix.

---

## Reference processing

### F-REF-01 — Reference treated as template (cloning)
**Level:** spec · **Severity:** High · **Area:** Reference
- **Description:** The system reproduces a reference instead of designing for the brief — sliding back to Goal A.
- **Root cause:** References fed as targets, not direction; Critic rewards resemblance.
- **Detection:** Output strongly resembles a reference; deleting the reference would change the output drastically (the [00 §1](./00-overview.md) test fails).
- **Impact:** Defeats the entire purpose (autonomy/novelty); legal/originality risk.
- **Impact extends:** brand/brief subordinated to a stranger's design.
- **Mitigation:** References are **soft**, capped at 5, dissolved into direction not stitched; Critic scores **brief_fit**, never resemblance [MP-6].
- **Recovery:** Re-run with references demoted/removed; tune the synthesis prompt.
- **Validation:** Ablate references; output should still be good (H1/H2) and not a copy.

### F-REF-02 — Reference over-influence
**Level:** spec · **Severity:** Med · **Area:** Reference
- **Description:** Output leans on the reference more than the brand/brief warrant.
- **Root cause:** Vivid reference images dominate attention over abstract brief text.
- **Detection:** Brand/brief adherence drops when references are present vs absent.
- **Impact:** Off-brand or off-goal results.
- **Mitigation:** Hard inputs always outrank soft (conflict precedence, [04 §7](./04-memory-and-consistency.md)); limit reference count; phrase references explicitly as "direction only" [MP-6].
- **Recovery:** Reduce/remove references; regenerate.
- **Validation:** A/B with vs without references; brand adherence must not regress.

### F-REF-03 — Frankenstein stitching of multiple references
**Level:** spec · **Severity:** Med · **Area:** Reference
- **Description:** The system stitches elements from several references (button from A, color from B) into an incoherent whole.
- **Root cause:** Element-level borrowing instead of principle-level synthesis (the old `synthesis_map` trap).
- **Detection:** Visually clashing parts; multiple competing design languages in one section.
- **Impact:** Incoherent design; fails craft/brand.
- **Mitigation:** "Moodboard" synthesis — abstract each reference to principles, compose one coherent design ([04 §8](./04-memory-and-consistency.md)).
- **Recovery:** Re-synthesize from principles; drop the parts-bin framing.
- **Validation:** Multi-reference briefs; human coherence rating.

### F-REF-04 — Irrelevant reference noise
**Level:** spec+impl · **Severity:** Low · **Area:** Reference
- **Description:** A reference unrelated to the brief distracts generation.
- **Root cause:** No relevance check on supplied references.
- **Detection:** Reference content uncorrelated with brief domain/feel.
- **Impact:** Wasted attention; mild quality drag.
- **Mitigation:** Optional relevance screen; treat references as fully optional.
- **Recovery:** Drop the reference for the run.
- **Validation:** Inject off-topic references; measure quality delta.

---

## Brand Foundation

### F-BRD-01 — Off-brief derived brand
**Level:** spec · **Severity:** Med · **Area:** Brand
- **Description:** The brand identity the AI **derives** from the brand-data + business context doesn't match the business intent (e.g. a neon/techy strategy derived for a "trust, legacy" real-estate firm).
- **Root cause:** Weak mapping from business context to visual identity; model default style.
- **Detection:** Human rejects at the brand approval gate; mismatch with the business context obvious.
- **Impact:** Re-work at the foundation level; everything downstream would inherit the error.
- **Mitigation:** A **Phase-Exit Review** of the derived brand against the business context + provided givens **before** the human sees it — catches an off-brief derivation early and returns it for bounded re-derivation ([11 §2.3](./11-guardrails-and-invariants.md)) [MP-13]; human approval gate before freeze ([06 §2](./06-workflows.md)); derive 2–3 directions with rationale tied to the business context; **re-derive (don't hand-patch)** on rejection [MP-12].
- **Recovery:** Enrich an input; re-derive and re-present.
- **Validation:** Human approval rate; context-match rubric; Phase-Exit-Review↔human agreement at the brand boundary (feeds H8).

### F-BRD-02 — Brand drift after freeze
**Level:** impl · **Severity:** High · **Area:** Brand
- **Description:** A frozen Brand Foundation is mutated by a later process, silently changing identity across artifacts.
- **Root cause:** Hard store written as a side effect; no immutability enforcement.
- **Detection:** Brand version changes without an approval event; website and product diverge.
- **Impact:** Cross-artifact inconsistency (H5 fails); broken trust.
- **Mitigation:** Brand is written **only** by human approval; append-only versioning; immutability after freeze [MP-8, MP-12].
- **Recovery:** Roll back to the approved version; re-emit affected artifacts.
- **Validation:** Attempt a non-approval write; assert rejection + version integrity.

### F-BRD-03 — Brand too vague to constrain
**Level:** spec · **Severity:** Med · **Area:** Brand
- **Description:** Brand lacks concrete tokens (no exact colors/type), so it can't actually bind generation.
- **Root cause:** Brand captured as adjectives, not values.
- **Detection:** Generation varies wildly under the "same" brand; Critic can't score brand_adherence concretely.
- **Impact:** Weak consistency; the hard store isn't actually hard.
- **Mitigation:** Brand schema requires concrete palette/type/motion values, not just words ([03 §3](./03-data-model.md)).
- **Recovery:** Enrich the brand with concrete values; re-freeze.
- **Validation:** Schema completeness check; consistency across runs under one brand.

### F-BRD-04 — Accessibility-hostile brand baked in
**Level:** spec · **Severity:** High · **Area:** Brand / a11y
- **Description:** The brand palette itself can't meet contrast requirements (e.g. pale-on-white), forcing every artifact to fail a11y or break brand.
- **Root cause:** Brand approved without an a11y check.
- **Detection:** Deterministic contrast check on brand color pairings fails at approval.
- **Impact:** Systemic a11y failures downstream; unfixable without changing brand.
- **Mitigation:** Run contrast/a11y checks on the brand at approval time; require accessible primary pairings [MP-1].
- **Recovery:** Adjust palette / add accessible variants before freeze.
- **Validation:** Automated contrast check over brand pairings as an approval gate.

### F-BRD-05 — Incomplete token model
**Level:** spec · **Severity:** Med · **Area:** Brand
- **Description:** The brand/token schema is validated against the *provided* palette+typography but doesn't anticipate several real needs: semantic/state colors (error, success, warning) for later interactive sections, a dark-mode/theming axis, fluid (not just fixed-px) type/space scales, or a standard interoperable token-export format (e.g. DTCG/Style-Dictionary).
- **Root cause:** The schema was designed around the MVP's static marketing sections, not the fuller range of needs later sections/surfaces will have.
- **Detection:** A later section needs a semantic color, dark mode, or fluid scale the frozen tokens can't express (ties to F-PDS-04's "foundation cannot express a later need," but at the *brand* level, before crystallization even happens).
- **Impact:** Forces either a contradiction or an awkward workaround once a real need arises (e.g. a form's error state, or a client asking for dark mode).
- **Mitigation:** Extend the token schema to include semantic-color slots, a theming axis, and fluid-scale support from the brand-derivation step, even if unused initially; adopt a standard export format for future interoperability.
- **Recovery:** Add the missing token category via the additive-extension policy (F-PDS-04's mechanism) rather than a breaking change.
- **Validation:** Schema completeness check against a checklist of known real-world token needs.

### F-BRD-06 — Brand staleness with no refresh trigger
**Level:** spec · **Severity:** Med · **Area:** Brand
- **Description:** A frozen Brand Foundation has no mechanism to flag that it may be aesthetically dated — unlike the Library, which at least decays confidence by age/disuse (F-WB-05), a frozen brand simply stays frozen indefinitely with no periodic "does this still look current?" check.
- **Root cause:** Brand freezing (correctly) prevents accidental drift, but has no corresponding *deliberate* re-evaluation trigger.
- **Detection:** No automated signal; only a human noticing the brand "feels dated" after enough calendar time has passed.
- **Impact:** A silently aging brand identity that nothing in the system ever flags for reconsideration.
- **Mitigation:** A periodic (e.g. annual) brand-freshness check as a deliberate, human-triggered re-derivation event — never automatic, since brand changes must stay human-approved (F-BRD-02's immutability rule still applies).
- **Recovery:** Re-derive on the same givens with updated context if the human confirms staleness; version-bump per the existing re-derivation mechanism.
- **Validation:** Track brand age against a human "still feels current?" spot-check.

---

## Project Design System & Crystallization

### F-PDS-01 — Incorrect / premature crystallization
**Level:** spec · **Severity:** High · **Area:** Crystallization
- **Description:** The foundation extracted from section 1 is wrong — the hero over- or under-specifies tokens, locking bad values for the whole artifact.
- **Root cause:** One section may not represent the full system; extractor misreads the hero (open question #4, [09](./09-roadmap-and-open-questions.md)).
- **Detection:** Later sections repeatedly fight the frozen tokens; humans note token values "feel off" system-wide.
- **Impact:** Every later section inherits the error; expensive to undo.
- **Mitigation:** A **Phase-Exit Review** of the crystallized system against the brand + hero **before** it is frozen — flags over- or under-specified tokens for bounded correction, catching a bad foundation before it becomes law ([11 §2.3](./11-guardrails-and-invariants.md)) [MP-13]; freeze only the **foundation** after section 1 and grow components ([04 §3](./04-memory-and-consistency.md)); the Crystallizer extracts conservatively; human reviews the crystallized system once.
- **Recovery:** Allow a one-time foundation correction with explicit re-version (rare, audited); re-emit affected sections.
- **Validation:** Phase-1 study: does a hero alone yield a correct foundation? (relates to H4); Phase-Exit-Review↔human agreement at the crystallization boundary.

### F-PDS-02 — Token contradiction by a later section
**Level:** spec+impl · **Severity:** High · **Area:** Consistency
- **Description:** A later section uses a color/type/spacing value outside the frozen token set.
- **Root cause:** Generator drifts; no enforcement of "extend-never-contradict."
- **Detection:** Deterministic token-allowlist check finds off-system values.
- **Impact:** Visible inconsistency; the hard store stops being hard (H4 fails).
- **Mitigation:** Token-allowlist checker on every section; new *components* allowed, new *tokens* rejected [MP-1, MP-6].
- **Recovery:** Re-generate the section with the violation fed back as hard feedback; never auto-approve.
- **Validation:** Generate multiple sections; assert zero off-allowlist tokens (the H4 hard metric).

### F-PDS-03 — Component-layer bloat / duplicates
**Level:** impl · **Severity:** Low · **Area:** Design system
- **Description:** The growing component layer accumulates near-duplicate or one-off components.
- **Root cause:** Each section adds components without checking for an existing equivalent.
- **Detection:** Many components with overlapping anatomy; rising component count per section.
- **Impact:** Inconsistency creep; maintenance burden.
- **Mitigation:** Before adding a component, retrieve existing ones and reuse/extend; dedup at crystallization.
- **Recovery:** Merge duplicates; consolidate recipes.
- **Validation:** Track unique-vs-total component ratio across sections.

### F-PDS-04 — Foundation cannot express a later need
**Level:** spec · **Severity:** Med · **Area:** Design system
- **Description:** A later section legitimately needs something the frozen tokens can't express (e.g. a data-dense table needs a tighter scale).
- **Root cause:** Section 1 (a hero) couldn't anticipate later needs; "never contradict" is too rigid for genuine gaps.
- **Detection:** A section repeatedly fails because it needs an out-of-system value that is actually justified.
- **Impact:** Either a forced contradiction or a poor section.
- **Mitigation:** Allow **additive, namespaced extensions** (new tokens that don't alter existing ones) under explicit policy; escalate to human when an extension touches the foundation.
- **Recovery:** Add the extension (versioned) or split the surface (e.g. a product system, [06 §6](./06-workflows.md)).
- **Validation:** Track foundation-extension frequency; high frequency signals section 1 was the wrong anchor.

---

## Design generation

### F-GEN-01 — Hard-constraint violation
**Level:** spec+impl · **Severity:** High · **Area:** Generation
- **Description:** Output ignores a hard input (off-brand color, wrong font, missing required CTA).
- **Root cause:** Model creativity overrides constraints; constraints not re-checked post-generation.
- **Detection:** Deterministic checks (token-allowlist, required-elements) + Critic brand/system adherence.
- **Impact:** Off-brand/off-spec output; consistency loss.
- **Mitigation:** Hard constraints stated explicitly and re-checked deterministically after generation, not just trusted [MP-1, MP-6].
- **Recovery:** Feed the specific violation back as hard feedback; regenerate.
- **Validation:** Seed constraint-heavy briefs; assert post-checks catch violations.

### F-GEN-02 — Generic "AI slop" output
**Level:** spec · **Severity:** Med · **Area:** Generation
- **Description:** Bland, default-styled output (overused fonts, purple gradients, cookie-cutter layout).
- **Root cause:** Model default aesthetic; weak brand/library signal.
- **Detection:** Low craft score; human "generic"; resemblance to known default styles.
- **Impact:** Poor quality; undifferentiated work.
- **Mitigation:** Strong brand tokens + Library direction; anti-generic guidance; variation + pairwise selection to escape the default [MP-3].
- **Recovery:** More variations early; stronger direction; regenerate.
- **Validation:** Human distinctiveness ratings; H2.

### F-GEN-03 — Non-rendering / broken component
**Level:** impl · **Severity:** High · **Area:** Generation
- **Description:** Generated `.tsx` throws at runtime, won't compile, or renders blank.
- **Root cause:** Syntax errors, bad JSX, runtime exceptions, invalid Tailwind.
- **Detection:** Harness build/type error; render-health gate finds an error overlay or blank DOM.
- **Impact:** No screenshot → loop stalls; or Critic judges a blank as bad design (F-EYE-05).
- **Mitigation:** Type-check/compile in the harness; render-health gate; return build/runtime errors to the Generator as a *fix* task distinct from design critique [MP-1, MP-10].
- **Recovery:** Auto-repair loop on the error (bounded); if unrepairable after K tries, abort + record.
- **Validation:** Inject broken components; assert detection + repair-or-abort.

### F-GEN-04 — Hallucinated imports / dependencies
**Level:** impl · **Severity:** Med · **Area:** Generation
- **Description:** Component imports packages/components that don't exist in the harness.
- **Root cause:** Model assumes libraries; no dependency allowlist.
- **Detection:** Module-resolution error at build.
- **Impact:** Render failure; wasted iteration.
- **Mitigation:** Declare an allowed import/dependency surface in the prompt; lint imports against it [MP-1].
- **Recovery:** Return the bad import as a fix task; regenerate within the allowed surface.
- **Validation:** Static import-allowlist check in tests.

### F-GEN-05 — Placeholder / incomplete output
**Level:** impl · **Severity:** Med · **Area:** Generation
- **Description:** Output contains lorem ipsum, TODOs, or unfinished regions instead of the client's content.
- **Root cause:** Model shortcuts; content not fully mapped.
- **Detection:** Placeholder-text scan; client content not present in DOM.
- **Impact:** Unusable output; misleading screenshots.
- **Mitigation:** "No placeholders; use the provided content" instruction + a deterministic placeholder/content-presence check [MP-1].
- **Recovery:** Regenerate with content mapping reinforced.
- **Validation:** Assert all brief content appears; no placeholder tokens.

### F-GEN-06 — Output truncated (max_tokens)
**Level:** impl · **Severity:** Med · **Area:** Generation
- **Description:** A large section is cut off mid-file.
- **Root cause:** `max_tokens` too low; non-streaming timeout.
- **Detection:** Unbalanced braces / parse failure; truncated file.
- **Impact:** Broken render; wasted call.
- **Mitigation:** Stream the Generator call; generous `max_tokens`; per-section (not whole-page) scope keeps output bounded [MP-11].
- **Recovery:** Retry with higher budget or split the section.
- **Validation:** Generate intentionally large sections; assert completeness.

### F-GEN-07 — Numeric / data rendering inaccuracy
**Level:** spec+impl · **Severity:** High · **Area:** Generation
- **Description:** Numeric content from the brief — prices, statistics, dates, addresses — is transposed, rounded incorrectly, or otherwise rendered wrong in the generated output, unlike prose content which is checked for *presence* (F-GEN-05) but not *accuracy*.
- **Root cause:** The content-presence check (F-GEN-05) verifies brief strings appear in the DOM; it does not verify numeric/structured values are reproduced *exactly*, and the model can silently "improve" or misremember a number during generation.
- **Detection:** A deterministic diff of every numeric/structured brief value against the rendered DOM's corresponding value.
- **Impact:** A wrong price or statistic is a trust and correctness failure far more serious than an aesthetic one — this is the kind of error a client notices immediately and never forgives.
- **Mitigation:** Extend the content-presence check to an **exact-match check on all numeric/structured brief fields**, not just string presence; treat any mismatch as a hard-constraint violation [MP-1].
- **Recovery:** Feed the exact mismatch back as hard feedback; never approve with a numeric mismatch outstanding.
- **Validation:** A brief with several precise numeric values; assert the gate catches an injected transposition.
