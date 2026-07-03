# 10 — Failure Modes & Mitigations

> **Single source of truth** for every known, expected, and potential failure across ADE — spec-level (wrong assumptions, flawed architecture, invalid hypotheses) and implementation-level (bugs, edge cases, races, model/render/storage failures). Each entry has 8 fields: **Description · Root cause · Detection · Impact · Mitigation · Recovery · Validation** (plus Level/Severity/Area metadata).
>
> This document is meant to be read *before* implementation and consulted *during* it. Add new failures here as they are discovered; do not scatter them across other docs.

---

## How to use this document

- **IDs are stable** (`F-<AREA>-NN`). Reference them in code comments, trace records, and reviews.
- **Level:** `spec` (a design/assumption can be wrong) · `impl` (code/runtime can break) · `spec+impl` (both).
- **Severity:** `High` (breaks autonomy/quality/trust or loses data) · `Med` (degrades quality/cost) · `Low` (annoyance, recoverable).
- **Mitigations reference reusable primitives (`MP-n`) defined below** so entries stay short and consistent.
- **Validation** ties most failures back to a hypothesis in [08](./08-hypotheses-and-validation.md) or a deterministic check.

---

## Mitigation primitives (MP) — reusable mechanisms

| ID | Primitive | Mitigates (themes) |
|---|---|---|
| **MP-1** | **Deterministic checkers** — non-LLM validators for anything that must not be LLM-judged: contrast/a11y (e.g. axe-core), responsive-overflow, token-allowlist, render-success, JSON-schema validation | a11y, quality floor, token contradiction, broken render, schema violations |
| **MP-2** | **Fresh-context Critic** — Critic never shares the Generator's context/session | self-grading, reward hacking |
| **MP-3** | **Pairwise + human-calibrated rubric** — compare candidates head-to-head; periodic human verdicts recalibrate the rubric/examples | unreliable judge, score noise |
| **MP-4** | **Best-so-far retention + monotonic acceptance** — never replace the current best with a worse iteration | regression, non-convergence |
| **MP-5** | **Bounded loops + escalation** — `max_iters`, token/wall-clock budgets; always end in a recorded terminal state; escalate to human | runaway cost, infinite loops |
| **MP-6** | **Hard/soft tagging at assembly** — every input carries an authority label; Critic scores adherence to *hard* inputs explicitly | soft-as-hard, hard violations, reference over-influence |
| **MP-7** | **De-identification gate** — write-back must pass a check that strips client identity; blocks on any leak | privacy leaks in the Library |
| **MP-8** | **Append-only versioning + atomic writes** — every store mutation versioned; writes are temp-file + atomic rename; reads are snapshot-consistent | corruption, un-audited mutation, races |
| **MP-9** | **Confidence-weighted, decaying retrieval** — rank by similarity × confidence; confidence rises with corroboration + human verdict, decays with age/disuse; ablation-tested | bad ranking, poisoning, monoculture, stale entries |
| **MP-10** | **Render-health gate before critique** — verify the render is valid (no error overlay, fonts/images loaded, non-blank, settled) *before* the Critic judges; repair render issues separately from design | misattributing render bugs to design |
| **MP-11** | **Provider resilience** — retries with backoff, refusal fallbacks, timeouts, streaming for large output, pinned model id | model API failures, refusals, version drift |
| **MP-12** | **Human gate at the destination** — brand approval + section sign-off remain human until Critic↔human agreement is proven; autonomy ladder gated on measured agreement | over-automation, false passes |
| **MP-13** | **Phase-Exit Review** — a fresh-context Critic review of each *phase artifact* (Brand Foundation, Project Design System, Library entry) against a per-artifact rubric, run **before** the human gate; bounded review→fix→re-check; a pre-human filter that stops a bad artifact propagating downstream, and the surface on which per-boundary Critic↔human agreement is calibrated ([11 §2.3](./11-guardrails-and-invariants.md)) | error propagation from unreviewed phase artifacts, off-brief brand, mis-crystallization, bad abstraction |
| **MP-14** | **Harness sandboxing** — render generated code as **untrusted**: network-isolated (deny egress by default), resource-capped, ephemeral, no secrets/credentials in scope | untrusted code execution, exfiltration, SSRF |
| **MP-15** | **Production-parity validation** — before delivery, validate on the real engine set (Chromium+Firefox+WebKit), the **purged production build**, and an **SSR** harness; check cross-browser render, Core Web Vitals, SEO | judged-artifact ≠ shipped-artifact |
| **MP-16** | **Output-quality gate** — deterministic static analysis of generated code: semantic-HTML/landmark check, import/resource allowlist, security-lint (no `dangerouslySetInnerHTML`/external fetch), prop-driven (no hard-coded content), lint/format | insecure / unmaintainable / non-semantic / SEO-hostile output |
| **MP-17** | **Provenance & compliance review** — licensing checks (fonts/assets), originality/similarity screen against known sites, regulatory-content checklist, dark-pattern screen; block on violation | infringement, licensing, dark patterns, missing disclaimers |

---

## Index

| ID | Failure | Lvl | Sev |
|---|---|---|---|
| **Input & brief understanding** | | | |
| F-INP-01 | Brief misinterpretation | spec+impl | High |
| F-INP-02 | Under-specified brief → invented intent | spec | Med |
| F-INP-03 | Conflicting brief signals | spec | Med |
| F-INP-04 | Malformed / invalid brief file | impl | Low |
| F-INP-05 | Missing or broken content/assets | impl | Med |
| F-INP-06 | Prompt injection via brief/content | impl | High |
| **Reference processing** | | | |
| F-REF-01 | Reference treated as template (cloning) | spec | High |
| F-REF-02 | Reference over-influence | spec | Med |
| F-REF-03 | Frankenstein stitching of multiple refs | spec | Med |
| F-REF-04 | Irrelevant reference noise | spec+impl | Low |
| **Brand Foundation** | | | |
| F-BRD-01 | Off-brief derived brand | spec | Med |
| F-BRD-02 | Brand drift after freeze | impl | High |
| F-BRD-03 | Brand too vague to constrain | spec | Med |
| F-BRD-04 | Accessibility-hostile brand baked in | spec | High |
| **Design System & Crystallization** | | | |
| F-PDS-01 | Incorrect/premature crystallization | spec | High |
| F-PDS-02 | Token contradiction by later section | spec+impl | High |
| F-PDS-03 | Component-layer bloat / duplicates | impl | Low |
| F-PDS-04 | Foundation cannot express a later need | spec | Med |
| **Design generation** | | | |
| F-GEN-01 | Hard-constraint violation | spec+impl | High |
| F-GEN-02 | Generic "AI slop" output | spec | Med |
| F-GEN-03 | Non-rendering / broken component | impl | High |
| F-GEN-04 | Hallucinated imports/dependencies | impl | Med |
| F-GEN-05 | Placeholder / incomplete output | impl | Med |
| F-GEN-06 | Output truncated (max_tokens) | impl | Med |
| **Render → screenshot (Eyes)** | | | |
| F-EYE-01 | Render failure / blank screenshot | impl | High |
| F-EYE-02 | Harness / dev-server flakiness | impl | Med |
| F-EYE-03 | Fonts/images not loaded at capture | impl | Med |
| F-EYE-04 | Capture before settle (timing) | impl | Med |
| F-EYE-05 | Render bug misjudged as bad design | spec+impl | High |
| **Judging (Taste)** | | | |
| F-JDG-01 | Unreliable Critic (taste ceiling) | spec | High |
| F-JDG-02 | Reward hacking | spec | High |
| F-JDG-03 | Generator self-grading (context bleed) | impl | High |
| F-JDG-04 | False pass / false fail | spec | High |
| F-JDG-05 | Domain-blind judging | spec | Med |
| F-JDG-06 | Critic non-determinism | impl | Med |
| **Memory & retrieval** | | | |
| F-MEM-01 | Retrieval miss | impl | Med |
| F-MEM-02 | Retrieval pollution | spec+impl | Med |
| F-MEM-03 | Embedding drift (model change) | impl | Med |
| F-MEM-04 | Embed-vs-payload violation | spec | Med |
| F-MEM-05 | Cold-start blocks generation | impl | Low |
| F-MEM-06 | Soft memory obeyed as hard law | spec | Med |
| F-MEM-07 | Vector store unavailable / slow | impl | Med |
| **Library write-back & learning** | | | |
| F-WB-01 | De-identification leak | spec+impl | High |
| F-WB-02 | Over- / under-abstraction | spec | Med |
| F-WB-03 | Dedup failure → duplicates | impl | Med |
| F-WB-04 | Bad-pattern enshrinement | spec | High |
| F-WB-05 | Library poisoning / monoculture | spec | Med |
| F-LRN-01 | No compounding (H6 fails) | spec | High |
| F-LRN-02 | Calibration non-transfer across domains | spec | Med |
| **Consistency & coherence** | | | |
| F-CON-01 | Cross-section drift | spec+impl | High |
| F-CON-02 | Monotony (no variation) | spec | Med |
| F-CON-03 | Whole-artifact incoherence | spec | Med |
| F-CON-04 | Visual-context overload | impl | Low |
| **Surface (product vs marketing)** | | | |
| F-SUR-01 | App states unrepresented | spec | High |
| F-SUR-02 | Component-state explosion | spec | Med |
| F-SUR-03 | Interaction states not driven | spec+impl | Med |
| **Human feedback** | | | |
| F-HUM-01 | Verdicts not captured / lost | impl | High |
| F-HUM-02 | Reviewer-taste overfitting | spec | Med |
| F-HUM-03 | Premature autonomy relaxation | spec | High |
| **Accessibility & quality floor** | | | |
| F-QF-01 | Accessibility violations pass | spec+impl | High |
| F-QF-02 | Quality floor LLM-judged (unreliable) | spec | Med |
| **Storage, versioning, integrity** | | | |
| F-STO-01 | Partial write / corruption | impl | High |
| F-STO-02 | Un-versioned mutation of hard store | impl | High |
| F-STO-03 | Concurrent-run race condition | impl | High |
| F-STO-04 | Trace loss (measurement substrate) | impl | High |
| F-STO-05 | Orphaned / dangling references | impl | Med |
| **Model & integration** | | | |
| F-MOD-01 | Model API failure (429/5xx/timeout) | impl | Med |
| F-MOD-02 | Benign-task refusal | impl | Med |
| F-MOD-03 | Unparseable structured output | impl | Med |
| F-MOD-04 | Cost / latency blowup | impl | High |
| F-MOD-05 | Silent model-version regression | spec+impl | Med |
| F-MOD-06 | Context-window overflow | impl | Med |
| **Architecture / hypotheses** | | | |
| F-SPEC-01 | Core premise H1 false | spec | High |
| F-SPEC-02 | Taste ceiling caps autonomy | spec | High |
| F-SPEC-03 | Soft/hard conflation in design | spec | High |
| F-SPEC-04 | MVP over-scoping | spec | Med |
| F-SPEC-05 | Measurement theater | spec | High |
| F-SPEC-06 | Evaluation overfitting / benchmark Goodhart | spec | High |
| **Security** | | | |
| F-SEC-01 | Untrusted code execution in the render harness | impl | High |
| F-SEC-02 | Indirect prompt injection (references / Library) | spec+impl | High |
| F-SEC-03 | Data exfiltration by generated code | impl | High |
| F-SEC-04 | Secrets / PII leak into traces, shots, logs | impl | High |
| F-SEC-05 | SSRF via asset / reference URLs | impl | Med |
| **Legal, IP & ethics** | | | |
| F-LEG-01 | Inadvertent cloning → infringement | spec+impl | High |
| F-LEG-02 | Unlicensed fonts / imagery | impl | High |
| F-LEG-03 | Dark patterns / manipulative design | spec | High |
| F-LEG-04 | Missing regulatory / disclaimer content | spec+impl | Med |
| **Production parity** | | | |
| F-PAR-01 | Judged engine ≠ shipped engine (cross-browser) | impl | High |
| F-PAR-02 | Harness Tailwind ≠ production build | impl | High |
| F-PAR-03 | SSR / hydration unverified | impl | Med |
| F-PAR-04 | SEO / meta / structured data absent | spec+impl | Med |
| **Output code quality** | | | |
| F-COD-01 | Non-semantic HTML | spec+impl | High |
| F-COD-02 | Unmaintainable / non-integrable React | impl | Med |
| F-COD-03 | Insecure output patterns (XSS) | impl | High |
| F-COD-04 | Uncontrolled external resource loads | impl | Med |
| **Operations, repro & vendor** | | | |
| F-OPS-01 | Nondeterminism / non-reproducibility | impl | Med |
| F-OPS-02 | Schema / data-migration breakage | impl | Med |
| F-OPS-03 | No backup / disaster recovery | impl | High |
| F-OPS-04 | Unbounded storage growth / no retention | impl | Low |
| F-OPS-05 | Vendor lock-in / ToS / model deprecation | spec+impl | Med |
| F-OPS-06 | End-to-end latency / throughput blowup | impl | Med |
| **Additions to existing areas** | | | |
| F-JDG-07 | Systematic judge biases | spec+impl | High |
| F-QF-03 | Accessibility depth / false compliance | spec+impl | High |
| F-MEM-08 | Retrieval nondeterminism / flat-file scaling | impl | Med |
| F-WB-06 | Confidentiality / strategy leak via patterns | spec+impl | High |
| F-HUM-04 | Review bottleneck / rubber-stamp / taste SPOF | spec | High |
| F-SUR-04 | Unsupported high-value surfaces | spec | Med |

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

---

## Render → screenshot (Eyes)

### F-EYE-01 — Render failure / blank screenshot
**Level:** impl · **Severity:** High · **Area:** Eyes
- **Description:** The harness renders nothing or an error page; the screenshot is blank/error.
- **Root cause:** Component crash (F-GEN-03), harness misconfig, navigation failure.
- **Detection:** Render-health gate: non-blank DOM, no error overlay, expected root node present.
- **Impact:** Loop can't proceed or judges garbage.
- **Mitigation:** Render-health gate before critique; treat as a build/render fix, not design feedback [MP-10].
- **Recovery:** Repair loop; abort + record if persistent.
- **Validation:** Force render errors; assert the gate blocks critique.

### F-EYE-02 — Harness / dev-server flakiness
**Level:** impl · **Severity:** Med · **Area:** Eyes
- **Description:** Dev server fails to start, port conflicts, hot-reload misses, stale module cache shows the previous candidate.
- **Root cause:** Shared mutable harness across candidates/iterations; port reuse; HMR race.
- **Detection:** Screenshot mismatches the current candidate; server-start errors; content hash differs from expected.
- **Impact:** Critic judges the wrong candidate; silent wrong results.
- **Mitigation:** Isolated harness instance per candidate (fresh build dir / unique port) or a verified full reload + content fingerprint check before capture [MP-8, MP-10].
- **Recovery:** Restart harness; re-render; invalidate the suspect iteration.
- **Validation:** Stress test rapid candidate swaps; assert screenshot↔candidate correspondence.

### F-EYE-03 — Fonts/images not loaded at capture
**Level:** impl · **Severity:** Med · **Area:** Eyes
- **Description:** Screenshot taken before web fonts/images load; output looks worse/different than it is.
- **Root cause:** Capture not awaiting network idle / `document.fonts.ready`.
- **Detection:** Fallback fonts or broken images in screenshots; layout shift after capture.
- **Impact:** Critic penalizes a render artifact; F-EYE-05.
- **Mitigation:** Await fonts-ready + network-idle + images-decoded before capture [MP-10].
- **Recovery:** Re-capture once settled.
- **Validation:** Font/image-heavy sections; assert fully-loaded captures.

### F-EYE-04 — Capture before settle (animation/layout)
**Level:** impl · **Severity:** Med · **Area:** Eyes
- **Description:** Entrance animations or async layout still in motion at capture time.
- **Root cause:** No settle delay / no "animations finished" wait.
- **Detection:** Mid-animation frames; inconsistent screenshots run-to-run.
- **Impact:** Misjudged composition; flaky critique.
- **Mitigation:** Wait for animation completion / a bounded settle; optionally disable entrance animations for the critique snapshot [MP-10].
- **Recovery:** Re-capture after settle.
- **Validation:** Animated sections; assert stable repeated captures.

### F-EYE-05 — Render bug misjudged as bad design
**Level:** spec+impl · **Severity:** High · **Area:** Eyes / Judging
- **Description:** A render/harness defect (blank, broken font, cut image) is scored by the Critic as a *design* failure.
- **Root cause:** No separation between "did it render correctly?" and "is the design good?".
- **Detection:** Critic feedback references artifacts that are render bugs, not design choices.
- **Impact:** Wrong feedback drives the Generator in the wrong direction; wasted iterations; corrupted trace/learning.
- **Mitigation:** **Render-health gate precedes critique** — only render-valid screenshots reach the Critic; render issues route to a fix path [MP-10].
- **Recovery:** Discard the contaminated critique; fix render; re-critique.
- **Validation:** Inject render defects; assert they never reach the design Critic.

---

## Self-evaluation & judging (Taste)

### F-JDG-01 — Unreliable Critic (the taste ceiling)
**Level:** spec · **Severity:** High · **Area:** Judging
- **Description:** The Critic can't reliably tell good from great, so it can't drive autonomy. The deepest risk in the system.
- **Root cause:** Judging "good design for a brief" with no reference is genuinely hard (open question #1).
- **Detection:** Low Critic↔human agreement; "passes" humans reject.
- **Impact:** Caps the whole system's autonomy ceiling (H3/H8); false confidence if unmeasured.
- **Mitigation:** Use the Critic to catch *bad* (reliable) while keeping humans on *final* judgment; pairwise comparison; ground with examples; calibrate with verdicts over time [MP-3, MP-12].
- **Recovery:** Lower the autonomy rung; route more to humans until agreement improves.
- **Validation:** Track Critic↔human agreement (H3); trend over batches (H8).

### F-JDG-02 — Reward hacking
**Level:** spec · **Severity:** High · **Area:** Judging
- **Description:** The Generator learns to satisfy the rubric literally while producing worse real design (e.g. maximizing a measurable proxy).
- **Root cause:** Optimizing to a proxy metric; rubric gameable.
- **Detection:** Rising Critic scores with flat/declining human ratings (divergence).
- **Impact:** Metrics improve while quality stalls — measurement theater (F-SPEC-05).
- **Mitigation:** Pairwise + holistic judgment over single proxies; periodic human ground-truth; rotate/refresh rubric examples [MP-3, MP-12].
- **Recovery:** Recalibrate the rubric; reweight toward human verdicts.
- **Validation:** Watch the Critic-vs-human gap, not Critic scores alone.

### F-JDG-03 — Generator self-grading (context bleed)
**Level:** impl · **Severity:** High · **Area:** Judging
- **Description:** The Critic shares context/history with the Generator and rubber-stamps it.
- **Root cause:** Same session/messages reused for both roles.
- **Detection:** Critic praises its own choices; near-100% first-pass rate; no critical findings.
- **Impact:** The loop stops improving; false passes.
- **Mitigation:** Fresh, isolated context for the Critic; it sees only screenshots + constraints, not the Generator's reasoning [MP-2].
- **Recovery:** Re-run critique in a clean context.
- **Validation:** Assert the Critic call carries no Generator history; check first-pass rate is realistic.

### F-JDG-04 — False pass / false fail
**Level:** spec · **Severity:** High · **Area:** Judging
- **Description:** Mediocre work passes the threshold, or good work is rejected.
- **Root cause:** Threshold miscalibration; absolute-score noise.
- **Detection:** Human disagreement with pass/fail at the boundary; high variance near threshold.
- **Impact:** Ships mediocre work (false pass) or wastes iterations (false fail).
- **Mitigation:** Pairwise selection; human spot-checks of passes at low rungs; conservative threshold early [MP-3, MP-12].
- **Recovery:** Human override; recalibrate threshold from disagreements.
- **Validation:** Confusion matrix of Critic vs human at the threshold.

### F-JDG-05 — Domain-blind judging
**Level:** spec · **Severity:** Med · **Area:** Judging
- **Description:** The Critic applies one domain's conventions to another (judges a fintech app by real-estate aesthetics).
- **Root cause:** Taste calibration is partly domain-specific (open question #2).
- **Detection:** Good in-domain work scored poorly; mismatch between verdict and domain norms.
- **Impact:** Misleading scores; poor cross-domain performance.
- **Mitigation:** Pass domain/`context_fit` to the Critic; collect verdicts across domains; domain-aware examples [MP-3].
- **Recovery:** Re-judge with domain context supplied.
- **Validation:** Cross-domain agreement study (H8); per-domain breakdowns.

### F-JDG-06 — Critic non-determinism
**Level:** impl · **Severity:** Med · **Area:** Judging
- **Description:** The same output gets different verdicts across runs.
- **Root cause:** Model sampling variance.
- **Detection:** Repeated critiques of one screenshot diverge.
- **Impact:** Flaky loop decisions; noisy metrics.
- **Mitigation:** Prefer pairwise (more stable); average/aggregate multiple judgments for boundary cases; record raw judgments [MP-3].
- **Recovery:** Re-judge and aggregate on close calls.
- **Validation:** Test-retest reliability on a fixed screenshot set.

---

## Memory & retrieval

### F-MEM-01 — Retrieval miss
**Level:** impl · **Severity:** Med · **Area:** Retrieval
- **Description:** Relevant Library entries aren't returned for a brief.
- **Root cause:** Poor query synthesis; weak embeddings; bad index.
- **Detection:** Known-relevant entry not in top-k; generation lacks available knowledge.
- **Impact:** Library adds no value (undermines H6).
- **Mitigation:** Embed the problem-space synthesis ([03 §2.1](./03-data-model.md)); tune top-k; query expansion [MP-9].
- **Recovery:** Broaden the query; re-retrieve.
- **Validation:** Retrieval recall on a labeled query→entry set.

### F-MEM-02 — Retrieval pollution
**Level:** spec+impl · **Severity:** Med · **Area:** Retrieval
- **Description:** Irrelevant entries are retrieved and distract the Generator.
- **Root cause:** Loose similarity threshold; embedding noise.
- **Detection:** Returned entries off-domain; generation pulled off-brief.
- **Impact:** Quality drag; wasted context.
- **Mitigation:** Similarity threshold + confidence weighting; small top-k; treat as soft only [MP-6, MP-9].
- **Recovery:** Tighten retrieval; regenerate.
- **Validation:** Retrieval precision; ablate retrieval and compare.

### F-MEM-03 — Embedding drift (model change)
**Level:** impl · **Severity:** Med · **Area:** Retrieval
- **Description:** Changing the embedding model leaves old vectors incompatible with new queries.
- **Root cause:** Vectors not re-embedded after a model swap.
- **Detection:** Retrieval quality collapses after an embedding change; mixed vector dimensions.
- **Impact:** Library effectively breaks.
- **Mitigation:** Version the embedding model; re-embed the whole store on change; store the model id with each vector [MP-8].
- **Recovery:** Bulk re-embed; rebuild the index.
- **Validation:** Re-embed test; retrieval parity before/after.

### F-MEM-04 — Embed-vs-payload violation
**Level:** spec · **Severity:** Med · **Area:** Retrieval
- **Description:** Hex codes / HTML / payload fields get embedded, polluting the vector.
- **Root cause:** Embedding the whole entry instead of the problem-space synthesis.
- **Detection:** Retrieval matches on values, not problems; odd nearest-neighbors.
- **Impact:** Poor matching; the Library retrieves by the wrong signal.
- **Mitigation:** Embed only `intent + context_fit`; keep construction/values as payload ([03 §2.1](./03-data-model.md)).
- **Recovery:** Re-embed with the correct field selection.
- **Validation:** Inspect what's embedded; retrieval quality by problem similarity.

### F-MEM-05 — Cold-start blocks generation
**Level:** impl · **Severity:** Low · **Area:** Retrieval
- **Description:** With an empty Library, retrieval returns nothing and the pipeline errors or stalls.
- **Root cause:** Generation assumes non-empty retrieval.
- **Detection:** Empty top-k path; first-project failure.
- **Impact:** Can't start until the Library is seeded.
- **Mitigation:** Library is **optional** input; the system designs from brand+brief alone (exactly the MVP) [MP-6].
- **Recovery:** Proceed with zero entries.
- **Validation:** Run with an empty Library; assert normal operation (this is the MVP).

### F-MEM-06 — Soft memory obeyed as hard law
**Level:** spec · **Severity:** Med · **Area:** Retrieval
- **Description:** The Generator treats retrieved entries as mandatory, reproducing them instead of synthesizing.
- **Root cause:** Soft/hard distinction not enforced in the prompt.
- **Detection:** Output closely mirrors a Library entry; brief-fit suffers.
- **Impact:** Monoculture; loss of brief-driven novelty.
- **Mitigation:** Explicit "direction, may diverge" framing; Critic rewards brief-fit not entry-resemblance [MP-6].
- **Recovery:** Reframe inputs; regenerate.
- **Validation:** Compare outputs to retrieved entries; resemblance should be low when the brief differs.

### F-MEM-07 — Vector store unavailable / slow
**Level:** impl · **Severity:** Med · **Area:** Retrieval
- **Description:** The vector DB is down or high-latency.
- **Root cause:** Infra failure; connection limits.
- **Detection:** Retrieval timeout/error.
- **Impact:** Stalls generation if retrieval is on the critical path.
- **Mitigation:** Retrieval is non-blocking — on failure, proceed with brand+brief (degraded, logged); timeouts + retries [MP-5, MP-11].
- **Recovery:** Continue without Library; backfill later.
- **Validation:** Kill the store mid-run; assert graceful degradation.

---

## Library write-back & learning

### F-WB-01 — De-identification leak
**Level:** spec+impl · **Severity:** High · **Area:** Write-back / privacy
- **Description:** A Library entry contains a client's name, literal copy, or exact brand tokens.
- **Root cause:** Abstraction step fails to strip identity.
- **Detection:** Identity scan finds client name/PII/exact hex/verbatim copy in an entry.
- **Impact:** Privacy/confidentiality breach; one client's identity leaks into another's design.
- **Mitigation:** A **de-identification gate** that blocks write-back on any leak; entries store abstracted lessons only ([03 §2.2](./03-data-model.md)) [MP-7].
- **Recovery:** Reject the entry; re-abstract; purge any leaked entry + reindex.
- **Validation:** Adversarial write-back tests; assert the gate blocks identity.

### F-WB-02 — Over- / under-abstraction
**Level:** spec · **Severity:** Med · **Area:** Write-back
- **Description:** Entries are too specific (non-transferable) or too vague (useless).
- **Root cause:** Wrong altitude during distillation (open question #3).
- **Detection:** Entries never retrieved (too specific) or always retrieved but unhelpful (too vague).
- **Impact:** Library doesn't compound (H6).
- **Mitigation:** A **Phase-Exit Review** of each distilled entry's abstraction altitude **before** insert — too-specific or too-vague entries are returned for bounded re-abstraction ([11 §2.3](./11-guardrails-and-invariants.md)) [MP-13]; tag by type (principle/pattern/recipe); favor the mid "pattern" altitude; let retrieval+reuse select altitude [MP-9].
- **Recovery:** Re-distill at a better altitude; merge/split entries.
- **Validation:** Track retrieval+reuse rates by altitude; measure H6.

### F-WB-03 — Dedup failure → duplicate entries
**Level:** impl · **Severity:** Med · **Area:** Write-back
- **Description:** Near-identical entries accumulate instead of merging.
- **Root cause:** No similarity check before insert.
- **Detection:** Many high-similarity entry pairs; library grows without diversity.
- **Impact:** Retrieval returns redundant entries; confidence fragments across duplicates.
- **Mitigation:** On write-back, retrieve nearest entries; merge (raise confidence/add variation) above a similarity threshold ([04 §6](./04-memory-and-consistency.md)) [MP-9].
- **Recovery:** Periodic dedup/merge pass.
- **Validation:** Duplicate-rate metric; merge correctness checks.

### F-WB-04 — Bad-pattern enshrinement
**Level:** spec · **Severity:** High · **Area:** Write-back / learning
- **Description:** A poor or rejected design gets written as a positive pattern, then propagates.
- **Root cause:** Write-back not gated on human verdict; a false-pass (F-JDG-04) feeds the Library.
- **Detection:** Low-quality patterns gaining confidence; later projects degrade.
- **Impact:** Self-reinforcing quality decay across projects.
- **Mitigation:** Only write back **human-approved** artifacts; confidence starts low; verdicts weight entries [MP-9, MP-12].
- **Recovery:** Down-weight/delete the offending entry; re-rank.
- **Validation:** Trace entry provenance → human verdict; assert no unapproved write-backs.

### F-WB-05 — Library poisoning / monoculture
**Level:** spec · **Severity:** Med · **Area:** Learning
- **Description:** One dominant style or a bad batch skews all future retrievals; outputs converge to sameness.
- **Root cause:** Popularity feedback loop; no diversity/decay.
- **Detection:** Declining output diversity; the same few entries always retrieved.
- **Impact:** Homogenized designs; novelty loss.
- **Mitigation:** Confidence decay with age/disuse; diversity-aware retrieval; periodic curation [MP-9, MP-12].
- **Recovery:** Rebalance/curate the Library; inject fresh references.
- **Validation:** Output-diversity metric over time; retrieval entropy.

### F-LRN-01 — No compounding (H6 fails)
**Level:** spec · **Severity:** High · **Area:** Learning
- **Description:** The Library doesn't make later projects better/faster — it's a junk drawer, not a brain.
- **Root cause:** Entry quality, retrieval, or abstraction is too weak to add signal.
- **Detection:** Library-on vs Library-off ablation shows no difference.
- **Impact:** The "gets smarter" premise of Goal B fails; no compounding value.
- **Mitigation:** Fix entry altitude (F-WB-02), retrieval (F-MEM-*), and confidence weighting; gate phase-2 on a passing ablation [MP-9].
- **Recovery:** Iterate on the memory subsystem before scaling.
- **Validation:** H6 ablation across matched briefs.

### F-LRN-02 — Calibration non-transfer across domains
**Level:** spec · **Severity:** Med · **Area:** Learning
- **Description:** Verdicts learned in one domain don't improve judging in another.
- **Root cause:** Domain-specific taste (open question #2).
- **Detection:** Critic improves in-domain but not cross-domain after calibration.
- **Impact:** Must re-learn taste per domain; slower scaling.
- **Mitigation:** Separate universal-craft from domain-style signals; collect verdicts per domain [MP-3].
- **Recovery:** Add domain-specific calibration data.
- **Validation:** Cross-domain transfer study.

---

## Consistency & cross-section coherence

### F-CON-01 — Cross-section drift
**Level:** spec+impl · **Severity:** High · **Area:** Consistency
- **Description:** A later section (About) doesn't match the established hero — different feel/values.
- **Root cause:** Section generated without the frozen system as hard input or without seeing prior sections.
- **Detection:** Token-allowlist check + Critic system_adherence + human "doesn't feel like the same site."
- **Impact:** Incoherent artifact (H4 fails).
- **Mitigation:** Crystallized system as hard law + prior-section screenshots as context for every later section ([04 §3](./04-memory-and-consistency.md)) [MP-1, MP-6].
- **Recovery:** Regenerate the drifting section under the system; never approve drift.
- **Validation:** Multi-section runs; zero token drift + human consistency rating (H4).

### F-CON-02 — Monotony (no variation)
**Level:** spec · **Severity:** Med · **Area:** Consistency
- **Description:** Over-constrained — every section is a near-clone of the hero.
- **Root cause:** Consistency mechanism locks composition, not just primitives.
- **Detection:** Sections look identical; low craft/brief-fit for sections with distinct purposes.
- **Impact:** Boring, ineffective pages.
- **Mitigation:** Lock primitives, free composition ([04 §2](./04-memory-and-consistency.md)); Critic rewards purpose-appropriate variation [MP-3, MP-6].
- **Recovery:** Loosen compositional constraints; regenerate.
- **Validation:** Variation metric across sections alongside consistency.

### F-CON-03 — Whole-artifact incoherence
**Level:** spec · **Severity:** Med · **Area:** Coherence
- **Description:** Sections are individually fine but the assembled page breaks (nav inconsistent, rhythm jumps, spacing between sections off).
- **Root cause:** Per-section generation can't see whole-page relationships.
- **Detection:** Whole-artifact Critic pass flags cross-section issues; human review.
- **Impact:** Poor end-to-end experience despite good parts.
- **Mitigation:** A whole-artifact QA pass over the assembled page ([06 §5](./06-workflows.md)); shared nav/footer as locked components.
- **Recovery:** Re-loop the offending section(s) with whole-page context.
- **Validation:** Assembled-page QA scores; human whole-page rating.

### F-CON-04 — Visual-context overload
**Level:** impl · **Severity:** Low · **Area:** Coherence
- **Description:** Feeding too many prior-section screenshots dilutes attention / blows context.
- **Root cause:** Naive "include all prior sections."
- **Detection:** Rising tokens/section; the Generator ignores context.
- **Impact:** Cost + weaker consistency.
- **Mitigation:** Include the most relevant 1–3 prior sections + the design system, not all [MP-5].
- **Recovery:** Trim context; regenerate.
- **Validation:** Tokens/section flat as section count grows (relates to H7).

---

## Surface: product vs marketing & component/state representation

### F-SUR-01 — App states unrepresented
**Level:** spec · **Severity:** High · **Area:** Surface
- **Description:** A product screen is generated as a single static view; empty/loading/error/filled states are missing.
- **Root cause:** Marketing assumptions (one rendered state) applied to an app (open question #5).
- **Detection:** Screen has no state handling; Critic/human note missing states.
- **Impact:** Broken/incomplete product UI in real use.
- **Mitigation:** For product surfaces, require explicit states per component; the Eyes drive and capture each state ([09 Q5](./09-roadmap-and-open-questions.md)); defer apps until this is built.
- **Recovery:** Re-generate with state requirements; capture all states.
- **Validation:** State-coverage checklist per component; multi-state screenshots.

### F-SUR-02 — Component-state explosion
**Level:** spec · **Severity:** Med · **Area:** Surface
- **Description:** The number of state combinations becomes unbounded and unmanageable.
- **Root cause:** Combinatorial states; no prioritization.
- **Detection:** Exploding state matrix; capture/critique time blows up.
- **Impact:** Cost/latency blowup; incomplete coverage.
- **Mitigation:** Capture a prioritized canonical set of states (default/empty/loading/error/filled), not every combination [MP-5].
- **Recovery:** Reduce to the canonical set.
- **Validation:** Bounded state count; coverage of the canonical set.

### F-SUR-03 — Interaction states not driven
**Level:** spec+impl · **Severity:** Med · **Area:** Surface / Eyes
- **Description:** The Eyes only screenshot the default view; hover/focus/expanded states never get exercised.
- **Root cause:** Capture doesn't drive interactions.
- **Detection:** Only default-state screenshots exist for interactive components.
- **Impact:** Interactive design unjudged; broken states ship.
- **Mitigation:** Playwright drives interactions (hover/click/type) and captures each resulting state [MP-10].
- **Recovery:** Add interaction scripts for components with states.
- **Validation:** Assert non-default states captured for interactive components.

---

## Human feedback incorporation

### F-HUM-01 — Verdicts not captured / lost
**Level:** impl · **Severity:** High · **Area:** Feedback
- **Description:** Human approve/reject/notes aren't recorded in a structured, durable way.
- **Root cause:** Feedback taken informally; not persisted with the artifact.
- **Detection:** Artifacts lack a linked verdict; calibration has no data.
- **Impact:** No taste calibration (H8), no learning signal (the system can't improve).
- **Mitigation:** Structured verdict capture persisted with each section/artifact; verdicts feed write-back + Critic calibration [MP-8, MP-12].
- **Recovery:** Backfill verdicts where possible; fix capture.
- **Validation:** Every approved artifact has a linked structured verdict.

### F-HUM-02 — Reviewer-taste overfitting
**Level:** spec · **Severity:** Med · **Area:** Feedback
- **Description:** The Critic calibrates to one reviewer's idiosyncratic taste.
- **Root cause:** Single-reviewer verdicts; small sample.
- **Detection:** Critic agrees with reviewer A, disagrees with B/C.
- **Impact:** Biased, brittle taste; poor generalization.
- **Mitigation:** Multiple reviewers; track inter-rater agreement; weight by consensus [MP-3].
- **Recovery:** Broaden the reviewer pool; reweight.
- **Validation:** Inter-rater reliability; multi-reviewer agreement.

### F-HUM-03 — Premature autonomy relaxation
**Level:** spec · **Severity:** High · **Area:** Feedback / autonomy
- **Description:** Human gates are removed before the Critic is proven calibrated.
- **Root cause:** Over-trust; skipping rungs on the autonomy ladder.
- **Detection:** Rising unreviewed "passes" that later prove wrong; quality complaints.
- **Impact:** Bad work ships unattended; trust collapse.
- **Mitigation:** Autonomy ladder gated strictly on measured Critic↔human agreement ([09 §2](./09-roadmap-and-open-questions.md)) [MP-12].
- **Recovery:** Drop back a rung; reinstate gates.
- **Validation:** Agreement thresholds enforced before each rung change.

---

## Accessibility & quality floor

### F-QF-01 — Accessibility violations pass
**Level:** spec+impl · **Severity:** High · **Area:** a11y
- **Description:** Output ships with contrast failures, missing alt text, no focus states, poor semantics/keyboard nav.
- **Root cause:** a11y left to the LLM's judgment; not deterministically checked.
- **Detection:** Automated a11y audit (axe-core or equivalent) fails.
- **Impact:** Legal/usability risk; excludes users; quality-floor breach.
- **Mitigation:** Deterministic a11y checks as a **hard gate** (not Critic-judged); brand a11y pre-checked (F-BRD-04) [MP-1].
- **Recovery:** Feed specific a11y failures back; regenerate; block approval until clean.
- **Validation:** Automated a11y audit in the pass gate; zero criticals to pass.

### F-QF-02 — Quality floor LLM-judged (unreliable)
**Level:** spec · **Severity:** Med · **Area:** Quality floor
- **Description:** Objective floor items (responsiveness, contrast, performance, no overflow) are judged by the Critic instead of measured.
- **Root cause:** Over-reliance on the LLM for things that are deterministically checkable.
- **Detection:** Floor violations slip through despite Critic "pass."
- **Impact:** Inconsistent floor enforcement.
- **Mitigation:** Move all objectively-checkable floor items to deterministic checkers; reserve the Critic for subjective quality [MP-1].
- **Recovery:** Add the missing checker; re-gate.
- **Validation:** Each floor item has a deterministic test, not a prompt.

---

## Storage, versioning & data integrity

### F-STO-01 — Partial write / corruption
**Level:** impl · **Severity:** High · **Area:** Storage
- **Description:** A crash mid-write leaves a store/file half-written and unreadable.
- **Root cause:** Non-atomic writes.
- **Detection:** Parse/load error; checksum mismatch.
- **Impact:** Lost brand/system/artifact/trace; broken project.
- **Mitigation:** Atomic writes (temp + rename), checksums, schema-validate on read [MP-8].
- **Recovery:** Restore last good version; replay from trace if possible.
- **Validation:** Crash-injection during writes; assert no corrupted state.

### F-STO-02 — Un-versioned mutation of a hard store
**Level:** impl · **Severity:** High · **Area:** Storage / consistency
- **Description:** Brand/Design-System changes with no version/history.
- **Root cause:** In-place mutation; no append-only discipline.
- **Detection:** Hard-store content changed but no version bump/audit entry.
- **Impact:** Silent inconsistency (F-BRD-02); can't roll back or audit.
- **Mitigation:** Append-only versioning for all hard stores; every change is a new immutable version [MP-8].
- **Recovery:** Restore the prior version.
- **Validation:** Assert each hard-store change produces a new version with provenance.

### F-STO-03 — Concurrent-run race condition
**Level:** impl · **Severity:** High · **Area:** Storage / concurrency
- **Description:** Two runs touch the same client's stores simultaneously and clobber each other (e.g. both crystallize, both write-back).
- **Root cause:** No locking/isolation across concurrent runs.
- **Detection:** Lost updates; inconsistent system state; interleaved trace.
- **Impact:** Corrupted brand/system/library; non-reproducible behavior.
- **Mitigation:** Per-client locking or optimistic concurrency with version preconditions; isolate run workspaces [MP-8].
- **Recovery:** Reconcile from versions; re-run the loser.
- **Validation:** Concurrent-run stress test; assert no lost updates.

### F-STO-04 — Trace loss (measurement substrate)
**Level:** impl · **Severity:** High · **Area:** Storage / measurement
- **Description:** `trace.json` (iterations/scores/tokens) is not written or is lost.
- **Root cause:** Trace written only at the end; crash loses it; not flushed.
- **Detection:** Missing/empty trace after a run.
- **Impact:** Can't validate any hypothesis (08) or debug the loop — flies blind.
- **Mitigation:** Append each iteration to the trace immediately (not at the end); durable, atomic appends [MP-8].
- **Recovery:** Partial trace still usable; reconstruct from iteration dirs.
- **Validation:** Kill mid-run; assert completed iterations are persisted.

### F-STO-05 — Orphaned / dangling references
**Level:** impl · **Severity:** Med · **Area:** Storage / integrity
- **Description:** An artifact references a deleted/renamed design system or brand; a Library entry's provenance points nowhere.
- **Root cause:** Deletes without referential-integrity checks.
- **Detection:** Reference resolution fails; integrity scan finds dangling links.
- **Impact:** Broken regeneration/audit; confusing state.
- **Mitigation:** Referential-integrity checks; soft-delete/archive instead of hard delete; cascade rules [MP-8].
- **Recovery:** Re-link or restore the target; mark orphans.
- **Validation:** Integrity scan in tests after deletes.

---

## Model & integration

### F-MOD-01 — Model API failure (429/5xx/timeout)
**Level:** impl · **Severity:** Med · **Area:** Model
- **Description:** Generator/Critic calls fail with rate-limit, server, or timeout errors.
- **Root cause:** Provider limits/outages; large requests.
- **Detection:** Non-2xx responses; timeouts.
- **Impact:** Loop stalls; partial runs.
- **Mitigation:** Retries with backoff, sane timeouts, stream large outputs, respect rate limits [MP-11].
- **Recovery:** Resume from the last persisted iteration (trace).
- **Validation:** Fault-injection on API calls; assert retry/resume.

### F-MOD-02 — Benign-task refusal
**Level:** impl · **Severity:** Med · **Area:** Model
- **Description:** A safety classifier refuses a legitimate design request.
- **Root cause:** False-positive refusal on benign content.
- **Detection:** `stop_reason: refusal` on a normal design task.
- **Impact:** Run blocked with no output.
- **Mitigation:** Handle the refusal stop reason; configure refusal fallbacks; rephrase/retry [MP-11].
- **Recovery:** Fallback model / retry; escalate if persistent.
- **Validation:** Simulate a refusal; assert fallback handling.

### F-MOD-03 — Unparseable structured output
**Level:** impl · **Severity:** Med · **Area:** Model / integration
- **Description:** The Critic returns scores/feedback that don't match the expected schema (bad JSON, missing fields).
- **Root cause:** Free-form generation; no structured-output enforcement.
- **Detection:** JSON-schema validation fails on the Critic response.
- **Impact:** Loop can't make a decision; crash if unhandled.
- **Mitigation:** Structured outputs / schema-constrained responses; validate + one re-ask on failure [MP-1, MP-11].
- **Recovery:** Re-prompt for valid structure; default to a safe conservative verdict on repeated failure.
- **Validation:** Malformed-response handling tests.

### F-MOD-04 — Cost / latency blowup
**Level:** impl · **Severity:** High · **Area:** Model / performance
- **Description:** `variations × iterations × vision calls` makes a run slow and expensive.
- **Root cause:** Unbounded loops; too many variations; large contexts.
- **Detection:** Tokens/section and wall-clock exceed budget (tracked from trace).
- **Impact:** Unsustainable cost; slow iteration.
- **Mitigation:** Bounded loops + budgets; "explore early (3 candidates), polish late (1)"; per-section scope; prompt-cache the stable bundle prefix [MP-5, MP-11].
- **Recovery:** Cap and escalate; reduce variations.
- **Validation:** Track cost/latency per section (H7); alert on budget breach.

### F-MOD-05 — Silent model-version regression
**Level:** spec+impl · **Severity:** Med · **Area:** Model
- **Description:** A model/version change shifts behavior (quality, style, token counts) without notice.
- **Root cause:** Unpinned model; provider updates.
- **Detection:** Metric shift after a version change; style drift.
- **Impact:** Unexplained quality/cost changes; broken calibration.
- **Mitigation:** Pin model ids; record the model id in every trace; re-baseline metrics on change [MP-11].
- **Recovery:** Roll back to the pinned version; recalibrate.
- **Validation:** Regression suite across model versions before adopting.

### F-MOD-06 — Context-window overflow
**Level:** impl · **Severity:** Med · **Area:** Model
- **Description:** The assembled bundle (refs + memory + context + content) exceeds the model's window.
- **Root cause:** Over-stuffing inputs; not honoring the context-economy design.
- **Detection:** Context-length error or silent truncation.
- **Impact:** Failed calls or dropped constraints (silent quality loss).
- **Mitigation:** Retrieval (top-k), vision over text, per-section scope, trimmed visual context ([02 §4](./02-architecture.md)) [MP-5].
- **Recovery:** Trim inputs by priority (hard kept, soft trimmed); retry.
- **Validation:** H7 — tokens/section flat vs refs & Library size; assert no overflow.

---

## Architecture & hypothesis-level failures

### F-SPEC-01 — Core premise H1 false
**Level:** spec · **Severity:** High · **Area:** Architecture
- **Description:** Seeing its own render does **not** help the agent design better — the loop adds no value.
- **Root cause:** The central assumption of ADE could be wrong.
- **Detection:** MVP shows no upward score/quality trend across iterations (H1 fails).
- **Impact:** The entire approach is invalidated.
- **Mitigation:** Build the MVP **first and cheap** specifically to test H1 before any larger investment [MP-5].
- **Recovery:** Stop; rethink the premise (better critique, different signal) before building more.
- **Validation:** H1 ([08](./08-hypotheses-and-validation.md)) — decisive go/no-go gate.

### F-SPEC-02 — Taste ceiling caps autonomy
**Level:** spec · **Severity:** High · **Area:** Architecture
- **Description:** The Critic never reaches reliability good enough to remove human gates; full autonomy stays out of reach.
- **Root cause:** Judging good design without a reference may be fundamentally hard (open question #1).
- **Detection:** Critic↔human agreement plateaus below a usable threshold (H3/H8).
- **Impact:** Goal B's autonomy ceiling is capped; the product stays human-assisted, not autonomous.
- **Mitigation:** Treat taste as the long-term R&D focus; keep humans in the loop; harvest value at lower rungs meanwhile [MP-3, MP-12].
- **Recovery:** Operate at the highest *proven* rung; keep investing in calibration.
- **Validation:** H8 trend over many batches; explicit ceiling acknowledgment.

### F-SPEC-03 — Soft/hard conflation in design
**Level:** spec · **Severity:** High · **Area:** Architecture
- **Description:** The build blurs soft and hard inputs — making the system either rigid (clones) or incoherent (drifts).
- **Root cause:** The soft/hard model (the spine of the spec) not carried into implementation.
- **Detection:** References behaving as law (rigid) or brand behaving as suggestion (drift).
- **Impact:** Loses both autonomy and consistency — the core value proposition.
- **Mitigation:** Authority tags on every input at assembly; conflict precedence enforced; Critic scores hard-adherence ([04 §7](./04-memory-and-consistency.md)) [MP-6].
- **Recovery:** Re-tag inputs; fix precedence; regenerate.
- **Validation:** Tests that hard always wins over soft; references never override brand.

### F-SPEC-04 — MVP over-scoping
**Level:** spec · **Severity:** Med · **Area:** Process
- **Description:** Building memory/brand/library before the eyes loop is proven.
- **Root cause:** Skipping the capability order (eyes → memory → taste).
- **Detection:** Large surface built before any H1 result.
- **Impact:** Wasted effort if H1 fails; slow, expensive first result.
- **Mitigation:** Strict phase gating; MVP = the loop only, no stores ([07](./07-mvp-cli.md), [09 §1](./09-roadmap-and-open-questions.md)) [MP-5].
- **Recovery:** Cut scope back to the loop; defer the rest.
- **Validation:** Phase-gate review; MVP done-criteria met before phase 1.

### F-SPEC-05 — Measurement theater
**Level:** spec · **Severity:** High · **Area:** Process / measurement
- **Description:** Reporting predicted or gamed metrics as if they were real, observed quality (the old pipeline's exact sin).
- **Root cause:** Trusting Critic scores without human ground truth; optimizing proxies.
- **Detection:** Critic scores rise while human ratings don't (the divergence in F-JDG-02).
- **Impact:** False confidence; shipping worse work while "metrics improve."
- **Mitigation:** Report **observed** numbers only; always pair Critic metrics with periodic human ground truth; watch the Critic-vs-human gap [MP-3, MP-12].
- **Recovery:** Re-anchor on human verdicts; discount proxy-only gains.
- **Validation:** Every reported quality number traces to a human-validated measurement (08 §4 decision rules).

### F-SPEC-06 — Evaluation overfitting / benchmark Goodhart
**Level:** spec · **Severity:** High · **Area:** Process / measurement
- **Description:** The system is tuned to the golden-core benchmark until its scores rise but generalization does not — Goodhart's law on the evaluation itself; a stale golden core compounds it (yesterday's "90" looks dated today).
- **Root cause:** A fixed, small, aging benchmark optimized against directly.
- **Detection:** Benchmark gains that do not transfer to fresh held-out briefs; benchmark age.
- **Impact:** Measurement theater one level up (F-SPEC-05); false confidence in the whole outer loop.
- **Mitigation:** A growing, refreshed benchmark with rotating held-out cases and system-proposed adversarial cases ([13](./13-evaluation-charter.md)); track transfer to *fresh* briefs, not just the core [MP-3, MP-12].
- **Recovery:** Refresh/expand the benchmark; discount non-transferring gains.
- **Validation:** Monitor the fresh-held-out transfer gap alongside core scores.

---

## Security

### F-SEC-01 — Untrusted code execution in the render harness
**Level:** impl · **Severity:** High · **Area:** Security
- **Description:** The harness renders model-generated `.tsx` — it **executes untrusted code** on the build machine; a malicious or hallucinated component can run arbitrary JS (network, resource abuse, tooling-mediated file access).
- **Root cause:** Generated code is executed without isolation; the harness is implicitly trusted.
- **Detection:** Unexpected outbound network during a render; anomalous CPU/file activity; static scan of candidates.
- **Impact:** Machine compromise, data exfiltration, poisoned screenshots.
- **Mitigation:** Treat all generated code as untrusted — network-isolated, resource-capped, ephemeral sandbox, no secrets in scope [MP-14]; import/resource allowlist [MP-16].
- **Recovery:** Kill the sandbox; discard the candidate; rotate any exposed secret.
- **Validation:** Inject a component that attempts `fetch`/exfiltration; assert the sandbox blocks it.

### F-SEC-02 — Indirect prompt injection via references or retrieved memory
**Level:** spec+impl · **Severity:** High · **Area:** Security
- **Description:** Injected instructions arrive not in the brief (F-INP-06) but inside a **reference image** (embedded text) or a **retrieved Library entry**, and the Generator/Critic obey them.
- **Root cause:** Soft inputs (refs, memory) are trusted as data but can carry adversarial instructions; only the brief is sanitized.
- **Detection:** Output deviates from constraints traceable to a specific ref/entry; anomalous behavior on particular retrievals.
- **Impact:** Constraint bypass; brand/quality-floor violation; memory-mediated attack propagation across projects.
- **Mitigation:** Treat *all* soft inputs as untrusted data with clear delimiters; retrieved/reference content can never override hard rules; screen entries at write-back; deterministic post-checks [MP-1, MP-6, MP-7].
- **Recovery:** Quarantine the offending ref/entry; re-run; purge poisoned entries + reindex.
- **Validation:** Red-team refs and seeded poisoned entries; assert hard constraints hold.

### F-SEC-03 — Data exfiltration by generated code
**Level:** impl · **Severity:** High · **Area:** Security
- **Description:** Generated code issues outbound requests at render time (hidden `fetch`, tracking pixel, third-party script) that exfiltrate data or phone home.
- **Root cause:** No egress control on the render sandbox; no output network allowlist.
- **Detection:** Outbound connections from the render; disallowed `fetch`/`<script src>` in static scan.
- **Impact:** Data leak; privacy breach; supply-chain beachhead in shipped code.
- **Mitigation:** Deny-by-default egress in the sandbox [MP-14]; static resource/network allowlist on output [MP-16].
- **Recovery:** Block the domain; regenerate within the allowed surface.
- **Validation:** Generate code with an outbound call; assert it is blocked and flagged.

### F-SEC-04 — Secrets / PII leak into traces, screenshots, or logs
**Level:** impl · **Severity:** High · **Area:** Security / privacy
- **Description:** API keys, credentials, or client PII (from briefs/testimonials) are captured into `trace.jsonl`, screenshots, or logs that are then shared or written back.
- **Root cause:** No redaction; sensitive content flows verbatim through the pipeline.
- **Detection:** Secret/PII scan of traces and artifacts.
- **Impact:** Credential/PII exposure; compliance breach; poisoned Library.
- **Mitigation:** Redact secrets/PII at capture; never place credentials in the harness scope; PII scan before any write-back [MP-7, MP-14].
- **Recovery:** Purge and rotate; scrub artifacts.
- **Validation:** Seed a secret/PII; assert it never reaches a persisted artifact.

### F-SEC-05 — SSRF via asset / reference URLs
**Level:** impl · **Severity:** Med · **Area:** Security
- **Description:** A brief/asset/reference URL points at an internal or malicious endpoint; fetching it enables server-side request forgery.
- **Root cause:** Unvalidated URL fetching.
- **Detection:** Requests to private ranges / disallowed hosts.
- **Impact:** Internal network access; cloud metadata-endpoint theft.
- **Mitigation:** URL allowlist + private-range blocking on all fetches; fetch inside the sandbox [MP-14].
- **Recovery:** Reject the input; log.
- **Validation:** Supply an internal URL; assert it is blocked.

---

## Legal, IP & ethics

### F-LEG-01 — Inadvertent cloning → infringement
**Level:** spec+impl · **Severity:** High · **Area:** Legal / IP
- **Description:** Output lands too close to an existing site (model priors), creating copyright/trade-dress exposure — and silently violating Goal B (originality).
- **Root cause:** No originality/similarity check against real-world sites.
- **Detection:** Similarity screen flags high resemblance; a human recognizes a source.
- **Impact:** Legal exposure; the system's core premise (novel design) is breached.
- **Mitigation:** Originality/similarity screen against known sites; Critic rewards brief-fit not resemblance; refs are direction only [MP-17, MP-6].
- **Recovery:** Regenerate away from the resemblance; drop the offending reference.
- **Validation:** Ablate refs; output must remain original (the [00 §1](./00-overview.md) test).

### F-LEG-02 — Unlicensed fonts or imagery
**Level:** impl · **Severity:** High · **Area:** Legal / IP
- **Description:** Brand typefaces or images lack a valid web/commercial license; the design cannot ship legally.
- **Root cause:** No licensing verification on provided/loaded assets.
- **Detection:** License check on fonts/assets fails at input or delivery.
- **Impact:** Legal exposure; forced last-minute substitution that breaks the design.
- **Mitigation:** Licensing checks at input and delivery; record license provenance [MP-17].
- **Recovery:** Substitute a licensed equivalent; re-derive affected type tokens.
- **Validation:** Supply an unlicensed font; assert it is flagged before build.

### F-LEG-03 — Dark patterns / manipulative design
**Level:** spec · **Severity:** High · **Area:** Ethics
- **Description:** Optimizing "conversion" teaches or applies manipulative patterns (false urgency, confirmshaming, hidden costs) — possibly even requested by the brief.
- **Root cause:** A conversion objective with no ethical constraint; the Library can learn and propagate dark patterns.
- **Detection:** Dark-pattern screen; human review; anti-pattern tagging.
- **Impact:** User harm; brand/legal risk (consumer-protection law); ethical breach.
- **Mitigation:** An explicit ethics constraint in the constitution ([12](./12-design-constitution.md)); dark-pattern screen; never write dark patterns to the Library [MP-17, MP-12].
- **Recovery:** Reject; regenerate under the ethics constraint.
- **Validation:** A brief inviting urgency; assert the system refuses manipulative execution.

### F-LEG-04 — Missing regulatory / disclaimer content
**Level:** spec+impl · **Severity:** Med · **Area:** Legal / compliance
- **Description:** Regulated domains (financial, medical, legal) ship without required disclaimers, consent, or accessibility statements.
- **Root cause:** No regulatory-content awareness; the brief is treated as complete.
- **Detection:** Domain-triggered regulatory checklist; human review.
- **Impact:** Non-compliance; legal exposure.
- **Mitigation:** Domain-triggered regulatory-content checklist; surface required elements to the human [MP-17].
- **Recovery:** Add required content; re-emit.
- **Validation:** A financial brief; assert the checklist fires.

---

## Production parity

### F-PAR-01 — Judged engine ≠ shipped engine (cross-browser)
**Level:** impl · **Severity:** High · **Area:** Parity
- **Description:** The Critic judges a single headless Chromium render; the shipped site runs in Safari/Firefox/real devices where it may break.
- **Root cause:** Single-engine capture; no cross-browser validation.
- **Detection:** Cross-browser render diff before delivery.
- **Impact:** Approved designs broken in production for a large user share.
- **Mitigation:** Validate on Chromium+Firefox+WebKit before delivery [MP-15].
- **Recovery:** Fix the cross-browser break; re-loop.
- **Validation:** A WebKit-only bug; assert the parity check catches it.

### F-PAR-02 — Harness Tailwind ≠ production build
**Level:** impl · **Severity:** High · **Area:** Parity
- **Description:** The harness uses the Tailwind Play CDN (runtime JIT of any class); the production build purges/configures differently, so shipped styling diverges from what was judged.
- **Root cause:** Preview convenience (CDN) not equal to the production toolchain.
- **Detection:** Diff the CDN render vs a purged production build.
- **Impact:** You approve a design you do not ship; silent style loss at delivery (F-EYE-05 at the finish line).
- **Mitigation:** Before delivery, render through the **production build** (purged Tailwind, real config) and re-verify [MP-15].
- **Recovery:** Reconcile config/safelist; re-verify.
- **Validation:** A class present in CDN but purged in prod; assert the parity check flags it.

### F-PAR-03 — SSR / hydration unverified
**Level:** impl · **Severity:** Med · **Area:** Parity
- **Description:** The Vite SPA harness cannot surface SSR/hydration mismatches, layout shift on hydrate, or server-only failures the Next.js production target will hit.
- **Root cause:** The preview harness is client-only.
- **Detection:** Render through an SSR harness; hydration-warning capture.
- **Impact:** Hydration errors / CLS in production not seen in R&D.
- **Mitigation:** A Next.js/SSR parity harness before delivery [MP-15].
- **Recovery:** Fix hydration issues; re-verify.
- **Validation:** A component with a hydration mismatch; assert the SSR harness catches it.

### F-PAR-04 — SEO / meta / structured data absent
**Level:** spec+impl · **Severity:** Med · **Area:** Parity / SEO
- **Description:** Output has no meta/OG tags, structured data, or crawlable semantic structure — invisible in a screenshot, costly in production.
- **Root cause:** The pipeline judges pixels; SEO is never a consideration.
- **Detection:** SEO/meta lint on output.
- **Impact:** Poor discoverability; rework post-launch.
- **Mitigation:** SEO/meta/structured-data checks in the output-quality gate [MP-16, MP-15]; semantic HTML (F-COD-01).
- **Recovery:** Add metadata/structure; re-emit.
- **Validation:** Assert required meta/semantic elements are present.

---

## Output code quality

### F-COD-01 — Non-semantic HTML
**Level:** spec+impl · **Severity:** High · **Area:** Code quality
- **Description:** The component uses `div`s where semantic elements/landmarks (`nav`,`header`,`main`,`button`) belong — fine in a screenshot, damaging for SEO, a11y, and maintainability.
- **Root cause:** Pixel-only judgment; no structural check.
- **Detection:** Semantic-HTML/landmark linter on output.
- **Impact:** Accessibility (F-QF-\*), SEO (F-PAR-04), and maintainability loss shipped invisibly.
- **Mitigation:** Deterministic semantic/landmark check in the output-quality gate [MP-16].
- **Recovery:** Return as a fix task; regenerate.
- **Validation:** A div-soup component; assert the gate fails it.

### F-COD-02 — Unmaintainable / non-integrable React
**Level:** impl · **Severity:** Med · **Area:** Code quality
- **Description:** Output hard-codes content instead of props, lacks componentization/keys, and is idiosyncratic per section — so it does not "drop into Next.js," is not CMS-integrable, and yields a messy codebase.
- **Root cause:** Each section generated independently, optimized for pixels not code.
- **Detection:** Static analysis: hard-coded content, missing props/keys, cross-section style drift.
- **Impact:** The promised stack fit is false; expensive human rework.
- **Mitigation:** Output-quality gate requires prop-driven, componentized, lint/format-clean code [MP-16]; shared conventions across sections.
- **Recovery:** Refactor task; regenerate.
- **Validation:** Assert content is prop-driven and lint passes.

### F-COD-03 — Insecure output patterns (XSS)
**Level:** impl · **Severity:** High · **Area:** Code quality / security
- **Description:** Generated code uses `dangerouslySetInnerHTML`, unsanitized interpolation, or unsafe URL handling — shipping XSS vectors.
- **Root cause:** No security lint on output.
- **Detection:** Security linter flags dangerous constructs.
- **Impact:** XSS / injection in the shipped product.
- **Mitigation:** Security-lint in the output-quality gate; forbid dangerous constructs [MP-16].
- **Recovery:** Return as a fix task; regenerate safely.
- **Validation:** Inject `dangerouslySetInnerHTML`; assert the gate blocks it.

### F-COD-04 — Uncontrolled external resource loads
**Level:** impl · **Severity:** Med · **Area:** Code quality / privacy
- **Description:** Output loads fonts/scripts/images from arbitrary third-party origins (privacy, performance, supply-chain) and still renders "fine."
- **Root cause:** No resource-origin allowlist on output.
- **Detection:** Resource-origin scan.
- **Impact:** Privacy leakage, third-party dependency, GDPR exposure (e.g. hosted fonts).
- **Mitigation:** Resource-origin allowlist in the output-quality gate; self-host assets [MP-16].
- **Recovery:** Replace with allowed/self-hosted resources.
- **Validation:** A remote-font import; assert it is flagged.

---

## Operations, reproducibility & vendor

### F-OPS-01 — Nondeterminism / non-reproducibility
**Level:** impl · **Severity:** Med · **Area:** Operations
- **Description:** The same brief yields materially different output run-to-run (model sampling + evolving Library), and past decisions cannot be reproduced — undermining A/B testing, debugging, and the eval program.
- **Root cause:** Sampling variance; retrieval drift; no system-state snapshot.
- **Detection:** Re-run variance; inability to reproduce a past run.
- **Impact:** Unfair A/Bs; un-debuggable regressions; eroded trust.
- **Mitigation:** A deterministic eval mode (pinned seed/temperature, frozen retrieval); versioned **system-state snapshots** per run (prompts+model+constitution+Library version) [MP-8, MP-11].
- **Recovery:** Reproduce from the snapshot.
- **Validation:** Re-run in deterministic mode; assert identical output.

### F-OPS-02 — Schema / data-migration breakage
**Level:** impl · **Severity:** Med · **Area:** Storage
- **Description:** As schemas evolve, previously stored artifacts/traces/Library entries fail to load or silently mis-parse.
- **Root cause:** No versioned schema + migration path.
- **Detection:** Schema-validate on read; version mismatch.
- **Impact:** Lost history / measurement substrate; broken Library.
- **Mitigation:** Versioned schemas + explicit migrations; schema-validate on read [MP-8].
- **Recovery:** Migrate or quarantine incompatible records.
- **Validation:** Load an old-schema record; assert clean migration or rejection.

### F-OPS-03 — No backup / disaster recovery
**Level:** impl · **Severity:** High · **Area:** Storage
- **Description:** The hard stores and Library — the irreplaceable accumulated assets — have no backup/DR; a disk loss erases the "gets smarter" value.
- **Root cause:** Local files, no backup strategy.
- **Detection:** DR drill; backup-freshness check.
- **Impact:** Catastrophic, irreversible loss of brand/system/Library.
- **Mitigation:** Regular versioned backups; tested restore; off-machine replication [MP-8].
- **Recovery:** Restore from backup.
- **Validation:** Simulate disk loss; restore and verify integrity.

### F-OPS-04 — Unbounded storage growth / no retention
**Level:** impl · **Severity:** Low · **Area:** Storage
- **Description:** Per-run screenshots, candidate trees, and JSONL traces accumulate without limit → disk/inode exhaustion.
- **Root cause:** No retention/GC policy.
- **Detection:** Disk/inode monitoring.
- **Impact:** Runs fail; slow directories.
- **Mitigation:** Retention/GC policy; compress/prune old runs; keep traces, prune bulky intermediates.
- **Recovery:** GC old runs.
- **Validation:** Retention job prunes as configured.

### F-OPS-05 — Vendor lock-in / ToS / model deprecation
**Level:** spec+impl · **Severity:** Med · **Area:** Vendor
- **Description:** Single-provider dependency: an outage halts the system; the dev **Pro-credit** path may violate ToS for automated/near-production use; a pinned model can be **deprecated**, forcing migration + re-baselining.
- **Root cause:** One vendor, one credit path, one pinned model.
- **Detection:** Provider status; ToS review; deprecation notices.
- **Impact:** Downtime; account risk; forced re-calibration.
- **Mitigation:** Provider abstraction with a real fallback (api/local); confirm ToS for the credit path; re-baseline on model change [MP-11].
- **Recovery:** Switch provider/model; recalibrate on the benchmark ([13](./13-evaluation-charter.md)).
- **Validation:** Kill the primary provider; assert fallback + a re-baseline gate.

### F-OPS-06 — End-to-end latency / throughput blowup
**Level:** impl · **Severity:** Med · **Area:** Performance
- **Description:** variations × iterations × sections × repair × cross-browser makes a whole-site run take many minutes to hours — beyond model cost (F-MOD-04), a product-level throughput problem.
- **Root cause:** A serial, unbounded end-to-end pipeline.
- **Detection:** Wall-clock per artifact from the trace.
- **Impact:** Unusable turnaround at scale; human idle time.
- **Mitigation:** Parallelize where safe; adaptive effort ([14](./14-research-agenda.md) R12); cache prefixes; cap end-to-end wall-clock [MP-5].
- **Recovery:** Cap and escalate; reduce breadth.
- **Validation:** Track wall-clock/artifact; alert on budget breach.

---

## Additions to existing areas (red-team v0.3)

### F-JDG-07 — Systematic judge biases
**Level:** spec+impl · **Severity:** High · **Area:** Judging
- **Description:** The Critic exhibits model biases: **position** and **verbosity** bias in pairwise, **vision-resolution** limits (cannot see kerning / 1px misalignment / small-text legibility), **sycophancy** to stated intent, **grade inflation** from safety-tuning, and cultural/aesthetic bias.
- **Root cause:** Inherent LLM/vision-model biases; a single-model judge.
- **Detection:** Randomize candidate order; test-retest; compare against humans on fine-detail and non-Western briefs.
- **Impact:** Miscalibrated verdicts; false passes; unfair cross-domain judgment (feeds F-JDG-01/04).
- **Mitigation:** Order-randomization + position-debiasing; ensemble/self-consistency; crop-based / higher-resolution inspection; ground in the constitution + anchored exemplars ([12](./12-design-constitution.md)); calibrate on the benchmark [MP-3].
- **Recovery:** Re-judge debiased / aggregated.
- **Validation:** Bias probes (swap order, vary verbosity); assert verdict stability.

### F-QF-03 — Accessibility depth / false compliance
**Level:** spec+impl · **Severity:** High · **Area:** a11y
- **Description:** axe-core catches only a minority (~30–45%) of WCAG issues; keyboard flow, focus management, screen-reader experience, reduced-motion, cognitive load, and 200%-zoom reflow are untested — so a "passing" gate creates false confidence and legal exposure.
- **Root cause:** Automated a11y treated as complete compliance.
- **Detection:** Manual/AT audits; keyboard/SR test scripts; reflow/zoom checks.
- **Impact:** Inaccessible output ships as "accessible"; ADA/WCAG/EN 301 549 exposure (see F-LEG).
- **Mitigation:** Treat a11y as a *dimension*, not a binary gate — add keyboard/focus/reduced-motion/reflow checks, periodic manual audits, a11y in the constitution [MP-1, MP-12].
- **Recovery:** Fix and re-audit.
- **Validation:** Keyboard-trap / SR-broken fixtures; assert detection beyond axe.

### F-MEM-08 — Retrieval nondeterminism & flat-file scaling
**Level:** impl · **Severity:** Med · **Area:** Retrieval
- **Description:** The same brief retrieves different top-k as the Library changes (nondeterministic generation), and flat-file cosine is O(n) so precision/latency degrade as the store grows.
- **Root cause:** Evolving store + linear search; no snapshot.
- **Detection:** Retrieval variance over time; latency/precision vs Library size.
- **Impact:** Non-reproducibility (F-OPS-01); H7 pressure; retrieval-miss (F-MEM-01) at scale.
- **Mitigation:** Snapshot the Library version per run; move to an ANN index (pgvector) with tuned recall [MP-8, MP-9].
- **Recovery:** Pin the Library version; rebuild the index.
- **Validation:** Retrieval parity at a fixed Library version; recall at scale.

### F-WB-06 — Confidentiality / strategy leak via patterns
**Level:** spec+impl · **Severity:** High · **Area:** Write-back / privacy
- **Description:** A "de-identified" entry (passing F-WB-01's name/token check) is still specific enough to **re-identify a client** or to leak their confidential **design strategy** to a later (possibly rival) client.
- **Root cause:** De-id checks identity tokens, not strategic specificity.
- **Detection:** Specificity/abstraction review; cross-client similarity scan.
- **Impact:** Confidentiality/contract breach; competitive-intelligence leak.
- **Mitigation:** Abstraction-altitude review at write-back ([11 §2.3](./11-guardrails-and-invariants.md)) that also gates *strategic* specificity; per-client access controls if multi-tenant [MP-7, MP-13].
- **Recovery:** Re-abstract or purge; notify if breached.
- **Validation:** Adversarial write-back that preserves strategy; assert it is blocked.

### F-HUM-04 — Review bottleneck / rubber-stamping / taste SPOF
**Level:** spec · **Severity:** High · **Area:** Feedback
- **Description:** Human review does not scale with volume (a bottleneck), fatigue/time-pressure produce rubber-stamped approvals, and a single reviewer's taste is a single point of failure for the entire outer loop's ground truth.
- **Root cause:** Uniform, high-volume human gating on one/few reviewers.
- **Detection:** Approval-latency and reviewer test-retest consistency; agreement variance by reviewer.
- **Impact:** False approvals feed the Library and reward model; taste overfit; the autonomy-ladder premise strains.
- **Mitigation:** Uncertainty-routed review (escalate only where the Critic is unsure — [14](./14-research-agenda.md) R14); multiple reviewers with inter-rater tracking; low-friction capture [MP-3, MP-12].
- **Recovery:** Re-review disputed items; broaden the reviewer pool.
- **Validation:** Inject a subtly-bad artifact under load; assert it is not rubber-stamped.

### F-SUR-04 — Unsupported high-value surfaces
**Level:** spec · **Severity:** Med · **Area:** Surface
- **Description:** Whole classes of real work are unrepresented: **forms** (validation/states/submission), **multi-page** sites and cross-page consistency, **email**, **data viz / tables / dashboards**, **localization / RTL**, print/PDF.
- **Root cause:** The spec is single-artifact, section-centric, and marketing-first.
- **Detection:** A brief requires an unsupported surface; capability gap.
- **Impact:** The system cannot serve common real briefs; forced human fallback.
- **Mitigation:** An explicit surface roadmap with per-surface Eyes/Critic capabilities; scope honestly until built ([09](./09-roadmap-and-open-questions.md)).
- **Recovery:** Route unsupported surfaces to humans.
- **Validation:** A per-surface capability checklist before claiming support.

---

## Coverage note

This catalogue maps onto every area in the system docs: input ([07](./07-mvp-cli.md)), references & memory ([04](./04-memory-and-consistency.md)), brand/system/crystallization ([03](./03-data-model.md), [04](./04-memory-and-consistency.md)), the loop & judging ([05](./05-generation-loop.md)), workflows & coherence ([06](./06-workflows.md)), architecture & model integration ([02](./02-architecture.md)), and the hypotheses ([08](./08-hypotheses-and-validation.md)). A pre-implementation **red-team pass (v0.3)** added five surfaces the original catalogue under-covered — **security (F-SEC-\*)**, **legal/IP/ethics (F-LEG-\*)**, **production parity (F-PAR-\*)**, **output code quality (F-COD-\*)**, and **operations/reproducibility (F-OPS-\*)** — plus additions to existing areas (F-JDG-07, F-QF-03, F-MEM-08, F-WB-06, F-HUM-04, F-SUR-04, F-SPEC-06); several tie to the R&D program in [12](./12-design-constitution.md)–[14](./14-research-agenda.md). New failures discovered during implementation should be appended here with the same 8-field structure and a new `F-<AREA>-NN` id — this file stays the single source of truth.
