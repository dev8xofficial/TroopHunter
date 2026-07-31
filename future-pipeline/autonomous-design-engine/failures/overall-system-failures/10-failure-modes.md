# 10 — Failure Modes & Mitigations (index)

> **Single source of truth** for every known, expected, and potential failure across ADE — spec-level (wrong assumptions, flawed architecture, invalid hypotheses) and implementation-level (bugs, edge cases, races, model/render/storage failures). Each entry has 8 fields: **Description · Root cause · Detection · Impact · Mitigation · Recovery · Validation** (plus Level/Severity/Area metadata).
>
> This document is meant to be read *before* implementation and consulted *during* it. Add new failures here as they are discovered; do not scatter them across other docs.
>
> **This file is the index.** The catalogue grew past the point where one file was navigable, so the full 8-field entries now live in **5 companion files by theme** (below). This file still holds everything you need for a quick lookup — the mitigation primitives, the root-pattern map, and the complete ID index — and every existing cross-reference to `10-failure-modes.md` elsewhere in the spec still resolves correctly here.

---

## Where each failure lives

| File | Covers | Areas |
|---|---|---|
| **[10a](./10a-failures-input-and-generation.md)** | Getting from a brief to a rendered candidate | Input & brief, Reference processing, Brand Foundation, Design System & Crystallization, Design generation |
| **[10b](./10b-failures-eyes-judging-and-loop.md)** | Seeing, judging, and the search process across iterations | Render/Eyes, Judging (Taste), Loop dynamics & search |
| **[10c](./10c-failures-memory-and-learning.md)** | Getting smarter over time, staying consistent, human involvement | Memory & retrieval, Library write-back & learning, Consistency & coherence, Surface, Human feedback |
| **[10d](./10d-failures-quality-and-infrastructure.md)** | The deterministic floor, plumbing, and system-level risk | Accessibility & quality floor, Storage/versioning, Model & integration, Architecture/hypothesis-level |
| **[10e](./10e-failures-security-legal-and-production.md)** | Everything that matters before this ships, scales, or runs unattended | Security, Legal/IP/ethics, Production parity, Output code quality, Operations/vendor |

---

## How to use this document

- **IDs are stable** (`F-<AREA>-NN`). Reference them in code comments, trace records, and reviews.
- **Level:** `spec` (a design/assumption can be wrong) · `impl` (code/runtime can break) · `spec+impl` (both).
- **Severity:** `High` (breaks autonomy/quality/trust or loses data) · `Med` (degrades quality/cost) · `Low` (annoyance, recoverable).
- **Mitigations reference reusable primitives (`MP-n`) defined below** so entries stay short and consistent.
- **Validation** ties most failures back to a hypothesis in [08](../../spec/08-hypotheses-and-validation.md) or a deterministic check.
- **Look up an ID here first** (the index below), then follow the link to its file for the full entry.

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
| **MP-13** | **Phase-Exit Review** — a fresh-context Critic review of each *phase artifact* (Brand Foundation, Project Design System, Library entry) against a per-artifact rubric, run **before** the human gate; bounded review→fix→re-check; a pre-human filter that stops a bad artifact propagating downstream, and the surface on which per-boundary Critic↔human agreement is calibrated ([11 §2.3](../../spec/11-guardrails-and-invariants.md)) | error propagation from unreviewed phase artifacts, off-brief brand, mis-crystallization, bad abstraction |
| **MP-14** | **Harness sandboxing** — render generated code as **untrusted**: network-isolated (deny egress by default), resource-capped, ephemeral, no secrets/credentials in scope | untrusted code execution, exfiltration, SSRF |
| **MP-15** | **Production-parity validation** — before delivery, validate on the real engine set (Chromium+Firefox+WebKit), the **purged production build**, and an **SSR** harness; check cross-browser render, Core Web Vitals, SEO | judged-artifact ≠ shipped-artifact |
| **MP-16** | **Output-quality gate** — deterministic static analysis of generated code: semantic-HTML/landmark check, import/resource allowlist, security-lint (no `dangerouslySetInnerHTML`/external fetch), prop-driven (no hard-coded content), lint/format | insecure / unmaintainable / non-semantic / SEO-hostile output |
| **MP-17** | **Provenance & compliance review** — licensing checks (fonts/assets), originality/similarity screen against known sites, regulatory-content checklist, dark-pattern screen; block on violation | infringement, licensing, dark patterns, missing disclaimers |

---

## Index

| ID | Failure | Lvl | Sev | File |
|---|---|---|---|---|
| **Input & brief understanding** | | | | |
| F-INP-01 | Brief misinterpretation | spec+impl | High | 10a |
| F-INP-02 | Under-specified brief → invented intent | spec | Med | 10a |
| F-INP-03 | Conflicting brief signals | spec | Med | 10a |
| F-INP-04 | Malformed / invalid brief file | impl | Low | 10a |
| F-INP-05 | Missing or broken content/assets | impl | Med | 10a |
| F-INP-06 | Prompt injection via brief/content | impl | High | 10a |
| F-INP-07 | Malformed / wrong-format visual assets | impl | Med | 10a |
| F-INP-08 | Non-English / mixed-language brief comprehension gap | spec | Med | 10a |
| F-INP-09 | Content-robustness fragility | spec+impl | Med | 10a |
| **Reference processing** | | | | |
| F-REF-01 | Reference treated as template (cloning) | spec | High | 10a |
| F-REF-02 | Reference over-influence | spec | Med | 10a |
| F-REF-03 | Frankenstein stitching of multiple refs | spec | Med | 10a |
| F-REF-04 | Irrelevant reference noise | spec+impl | Low | 10a |
| **Brand Foundation** | | | | |
| F-BRD-01 | Off-brief derived brand | spec | Med | 10a |
| F-BRD-02 | Brand drift after freeze | impl | High | 10a |
| F-BRD-03 | Brand too vague to constrain | spec | Med | 10a |
| F-BRD-04 | Accessibility-hostile brand baked in | spec | High | 10a |
| F-BRD-05 | Incomplete token model | spec | Med | 10a |
| F-BRD-06 | Brand staleness with no refresh trigger | spec | Med | 10a |
| **Design System & Crystallization** | | | | |
| F-PDS-01 | Incorrect/premature crystallization | spec | High | 10a |
| F-PDS-02 | Token contradiction by later section | spec+impl | High | 10a |
| F-PDS-03 | Component-layer bloat / duplicates | impl | Low | 10a |
| F-PDS-04 | Foundation cannot express a later need | spec | Med | 10a |
| **Design generation** | | | | |
| F-GEN-01 | Hard-constraint violation | spec+impl | High | 10a |
| F-GEN-02 | Generic "AI slop" output | spec | Med | 10a |
| F-GEN-03 | Non-rendering / broken component | impl | High | 10a |
| F-GEN-04 | Hallucinated imports/dependencies | impl | Med | 10a |
| F-GEN-05 | Placeholder / incomplete output | impl | Med | 10a |
| F-GEN-06 | Output truncated (max_tokens) | impl | Med | 10a |
| F-GEN-07 | Numeric / data rendering inaccuracy | spec+impl | High | 10a |
| **Render → screenshot (Eyes)** | | | | |
| F-EYE-01 | Render failure / blank screenshot | impl | High | 10b |
| F-EYE-02 | Harness / dev-server flakiness | impl | Med | 10b |
| F-EYE-03 | Fonts/images not loaded at capture | impl | Med | 10b |
| F-EYE-04 | Capture before settle (timing) | impl | Med | 10b |
| F-EYE-05 | Render bug misjudged as bad design | spec+impl | High | 10b |
| F-EYE-06 | Async/data-driven components never signal render-ready | impl | Med | 10b |
| **Judging (Taste)** | | | | |
| F-JDG-01 | Unreliable Critic (taste ceiling) | spec | High | 10b |
| F-JDG-02 | Reward hacking | spec | High | 10b |
| F-JDG-03 | Generator self-grading (context bleed) | impl | High | 10b |
| F-JDG-04 | False pass / false fail | spec | High | 10b |
| F-JDG-05 | Domain-blind judging | spec | Med | 10b |
| F-JDG-06 | Critic non-determinism | impl | Med | 10b |
| F-JDG-07 | Systematic judge biases | spec+impl | High | 10b |
| **Loop dynamics & search** | | | | |
| F-LOOP-01 | Runaway / unbounded loop | impl | High | 10b |
| F-LOOP-02 | Regression (worse iteration accepted) | impl | High | 10b |
| F-LOOP-03 | Non-convergence / oscillation | spec+impl | Med | 10b |
| F-LOOP-04 | Silent exhaustion (no escalation) | impl | High | 10b |
| F-LOOP-05 | Unbounded render-repair sub-loop | impl | Med | 10b |
| F-LOOP-06 | Greedy local-optimum trap | spec | High | 10b |
| F-LOOP-07 | Scalarization hides Pareto-dominant candidates | spec | High | 10b |
| F-LOOP-08 | No adaptive effort allocation | spec | Med | 10b |
| **Memory & retrieval** | | | | |
| F-MEM-01 | Retrieval miss | impl | Med | 10c |
| F-MEM-02 | Retrieval pollution | spec+impl | Med | 10c |
| F-MEM-03 | Embedding drift (model change) | impl | Med | 10c |
| F-MEM-04 | Embed-vs-payload violation | spec | Med | 10c |
| F-MEM-05 | Cold-start blocks generation | impl | Low | 10c |
| F-MEM-06 | Soft memory obeyed as hard law | spec | Med | 10c |
| F-MEM-07 | Vector store unavailable / slow | impl | Med | 10c |
| F-MEM-08 | Retrieval nondeterminism / flat-file scaling | impl | Med | 10c |
| F-MEM-09 | Same-domain retrieval suppresses cross-domain novelty | spec | Med | 10c |
| **Library write-back & learning** | | | | |
| F-WB-01 | De-identification leak | spec+impl | High | 10c |
| F-WB-02 | Over- / under-abstraction | spec | Med | 10c |
| F-WB-03 | Dedup failure → duplicates | impl | Med | 10c |
| F-WB-04 | Bad-pattern enshrinement | spec | High | 10c |
| F-WB-05 | Library poisoning / monoculture | spec | Med | 10c |
| F-WB-06 | Confidentiality / strategy leak via patterns | spec+impl | High | 10c |
| F-WB-07 | Approved-then-reconsidered patterns already taught the Library | spec | Med | 10c |
| F-LRN-01 | No compounding (H6 fails) | spec | High | 10c |
| F-LRN-02 | Calibration non-transfer across domains | spec | Med | 10c |
| **Consistency & coherence** | | | | |
| F-CON-01 | Cross-section drift | spec+impl | High | 10c |
| F-CON-02 | Monotony (no variation) | spec | Med | 10c |
| F-CON-03 | Whole-artifact incoherence | spec | Med | 10c |
| F-CON-04 | Visual-context overload | impl | Low | 10c |
| **Surface (product vs marketing)** | | | | |
| F-SUR-01 | App states unrepresented | spec | High | 10c |
| F-SUR-02 | Component-state explosion | spec | Med | 10c |
| F-SUR-03 | Interaction states not driven | spec+impl | Med | 10c |
| F-SUR-04 | Unsupported high-value surfaces | spec | Med | 10c |
| **Human feedback** | | | | |
| F-HUM-01 | Verdicts not captured / lost | impl | High | 10c |
| F-HUM-02 | Reviewer-taste overfitting | spec | Med | 10c |
| F-HUM-03 | Premature autonomy relaxation | spec | High | 10c |
| F-HUM-04 | Review bottleneck / rubber-stamp / taste SPOF | spec | High | 10c |
| **Accessibility & quality floor** | | | | |
| F-QF-01 | Accessibility violations pass | spec+impl | High | 10d |
| F-QF-02 | Quality floor LLM-judged (unreliable) | spec | Med | 10d |
| F-QF-03 | Accessibility depth / false compliance | spec+impl | High | 10d |
| F-QF-04 | Performance / Core Web Vitals claimed but never measured | spec | Med | 10d |
| **Storage, versioning, integrity** | | | | |
| F-STO-01 | Partial write / corruption | impl | High | 10d |
| F-STO-02 | Un-versioned mutation of hard store | impl | High | 10d |
| F-STO-03 | Concurrent-run race condition | impl | High | 10d |
| F-STO-04 | Trace loss (measurement substrate) | impl | High | 10d |
| F-STO-05 | Orphaned / dangling references | impl | Med | 10d |
| **Model & integration** | | | | |
| F-MOD-01 | Model API failure (429/5xx/timeout) | impl | Med | 10d |
| F-MOD-02 | Benign-task refusal | impl | Med | 10d |
| F-MOD-03 | Unparseable structured output | impl | Med | 10d |
| F-MOD-04 | Cost / latency blowup | impl | High | 10d |
| F-MOD-05 | Silent model-version regression | spec+impl | Med | 10d |
| F-MOD-06 | Context-window overflow | impl | Med | 10d |
| F-MOD-07 | Verdict-distribution staleness | spec | High | 10d |
| F-MOD-08 | Calibration non-transfer across model swap | spec | High | 10d |

| **Architecture / hypotheses** | | | | |
| F-SPEC-01 | Core premise H1 false | spec | High | 10d |
| F-SPEC-02 | Taste ceiling caps autonomy | spec | High | 10d |
| F-SPEC-03 | Soft/hard conflation in design | spec | High | 10d |
| F-SPEC-04 | MVP over-scoping | spec | Med | 10d |
| F-SPEC-05 | Measurement theater | spec | High | 10d |
| F-SPEC-06 | Evaluation overfitting / benchmark Goodhart | spec | High | 10d |
| **Security** | | | | |
| F-SEC-01 | Untrusted code execution in the render harness | impl | High | 10e |
| F-SEC-02 | Indirect prompt injection (references / Library) | spec+impl | High | 10e |
| F-SEC-03 | Data exfiltration by generated code | impl | High | 10e |
| F-SEC-04 | Secrets / PII leak into traces, shots, logs | impl | High | 10e |
| F-SEC-05 | SSRF via asset / reference URLs | impl | Med | 10e |
| **Legal, IP & ethics** | | | | |
| F-LEG-01 | Inadvertent cloning → infringement | spec+impl | High | 10e |
| F-LEG-02 | Unlicensed fonts / imagery | impl | High | 10e |
| F-LEG-03 | Dark patterns / manipulative design | spec | High | 10e |
| F-LEG-04 | Missing regulatory / disclaimer content | spec+impl | Med | 10e |
| F-LEG-05 | Representation / bias risk in imagery | spec | Med | 10e |
| **Production parity** | | | | |
| F-PAR-01 | Judged engine ≠ shipped engine (cross-browser) | impl | High | 10e |
| F-PAR-02 | Harness Tailwind ≠ production build | impl | High | 10e |
| F-PAR-03 | SSR / hydration unverified | impl | Med | 10e |
| F-PAR-04 | SEO / meta / structured data absent | spec+impl | Med | 10e |
| **Output code quality** | | | | |
| F-COD-01 | Non-semantic HTML | spec+impl | High | 10e |
| F-COD-02 | Unmaintainable / non-integrable React | impl | Med | 10e |
| F-COD-03 | Insecure output patterns (XSS) | impl | High | 10e |
| F-COD-04 | Uncontrolled external resource loads | impl | Med | 10e |
| **Operations, repro & vendor** | | | | |
| F-OPS-01 | Nondeterminism / non-reproducibility | impl | Med | 10e |
| F-OPS-02 | Schema / data-migration breakage | impl | Med | 10e |
| F-OPS-03 | No backup / disaster recovery | impl | High | 10e |
| F-OPS-04 | Unbounded storage growth / no retention | impl | Low | 10e |
| F-OPS-05 | Vendor lock-in / ToS / model deprecation | spec+impl | Med | 10e |
| F-OPS-06 | End-to-end latency / throughput blowup | impl | Med | 10e |
| F-OPS-07 | Supply-chain risk in harness/toolchain dependencies | impl | Med | 10e |

---

## The six root patterns behind the failures

| # | Root pattern | Failures it drives | Solution (this doc) |
|---|---|---|---|
| RP-1 | **LLM is asked to judge things that must be deterministic** (a11y, token drift, render success, schema, content presence) | F-QF-01/02, F-PDS-02, F-CON-01, F-GEN-01/03/05, F-EYE-05 | **Guardrail Layer** ([11 §2](../../spec/11-guardrails-and-invariants.md)) |
| RP-2 | **No role/context isolation** (generator grades itself; render bugs read as design) | F-JDG-03, F-EYE-05 | **Invariants I2, I3** + render-health gate |
| RP-3 | **Unbounded / unrecorded processes** (runaway loops, regressions, lost trace) | F-LOOP-*, F-MOD-04, F-STO-04, F-JDG-04 | **Bounded loop + best-so-far + durable trace** ([11 §3](../../spec/11-guardrails-and-invariants.md), I4, I6, I10) |
| RP-4 | **Mutable, un-versioned state + concurrency** | F-BRD-02, F-STO-01/02/03/05 | **Integrity & concurrency rules** ([11 §5](../../spec/11-guardrails-and-invariants.md), I5) |
| RP-5 | **Provider / infra fragility** | F-MOD-01/02/03/05/06, F-MEM-07 | **Resilience rules** ([11 §4](../../spec/11-guardrails-and-invariants.md)) |
| RP-6 | **Soft/hard conflation & untrusted input** | F-SPEC-03, F-REF-01/02, F-MEM-06, F-INP-06 | **Authority tagging + injection safety** (I1, I8, I9) |

Full solution design (the Guardrail Layer, invariants, resilience/integrity rules, and the Phase-Exit Review) lives in [11-guardrails-and-invariants.md](../../spec/11-guardrails-and-invariants.md), which maps each solution back to the specific `F-*` failures it closes.

---

## Coverage note

This catalogue maps onto every area in the system docs: input ([07](../../spec/07-mvp-cli.md)), references & memory ([04](../../spec/04-memory-and-consistency.md)), brand/system/crystallization ([03](../../spec/03-data-model.md), [04](../../spec/04-memory-and-consistency.md)), the loop & judging ([05](../../spec/05-generation-loop.md)), workflows & coherence ([06](../../spec/06-workflows.md)), architecture & model integration ([02](../../spec/02-architecture.md)), and the hypotheses ([08](../../spec/08-hypotheses-and-validation.md)).

**Revision history:**
- **v0.3** — a pre-implementation red-team pass added five surfaces the original catalogue under-covered: **security (F-SEC-\*)**, **legal/IP/ethics (F-LEG-\*)**, **production parity (F-PAR-\*)**, **output code quality (F-COD-\*)**, and **operations/reproducibility (F-OPS-\*)** — plus additions to existing areas (F-JDG-07, F-QF-03, F-MEM-08, F-WB-06, F-HUM-04, F-SUR-04, F-SPEC-06); several tie to the R&D program in [12](../../spec/12-design-constitution.md)–[14](../../spec/14-research-agenda.md).
- **v0.4** — added **loop dynamics & search (F-LOOP-\*)**: this resolved a real, pre-existing gap where [11](../../spec/11-guardrails-and-invariants.md) referenced `F-LOOP-01/02/04/05` five times with no corresponding entries anywhere in this file, and formalized two search-dynamics problems (greedy local-optimum trapping, scalarization hiding Pareto-dominant candidates) that had only ever existed as research bets (R7/R8 in [14](../../spec/14-research-agenda.md)) without a catalogued failure behind them.
- **v0.5** — this file split into 5 theme files (**10a–10e**) as the catalogue outgrew a single document; the "additions to existing areas" entries from v0.3 were merged into their natural home area (e.g. F-JDG-07 now sits with F-JDG-01–06 in [10b](./10b-failures-eyes-judging-and-loop.md)) rather than staying segregated by when they were added. No content was changed, only reorganized — every ID and every field is identical to before.
- **v0.6** — a targeted audit cross-checked every gap raised across the full planning conversation (the A–N clusters, the 19-cluster exhaustive hunt, and the search-dynamics work) against what had actually landed here, and added **12 genuine misses** that earlier passes named in discussion but never gave a catalogued entry: **F-INP-07/08/09** (wrong-format assets, non-English comprehension, content-robustness fragility), **F-BRD-05/06** (incomplete token model, brand staleness), **F-GEN-07** (numeric/data rendering inaccuracy — High severity, a real trust failure), **F-EYE-06** (async components never signal ready), **F-MEM-09** (same-domain retrieval suppresses cross-domain novelty — the mirror image of F-MEM-02's pollution), **F-WB-07** (approved-then-reconsidered patterns already taught the Library), **F-QF-04** (performance/Core Web Vitals claimed but never measured — closing a gap F-QF-02 itself names but doesn't close), **F-LEG-05** (representation/bias risk in imagery, forward-looking), and **F-OPS-07** (supply-chain risk in the harness/rendering toolchain, distinct from F-OPS-05's model-vendor risk). F-OPS-01's mitigation was also enriched to include structured logging/alerting, which an earlier summary had implied but the entry itself hadn't stated. This pass deliberately did **not** add every conceivable minor gap (e.g. Windows path/encoding quirks, several small token-schema details folded into F-BRD-05 instead of getting separate IDs) — the goal was genuine, load-bearing misses, not exhaustive padding.

New failures discovered during implementation should be appended to the relevant theme file (10a–10e) with the same 8-field structure and a new `F-<AREA>-NN` id, and added to the index above — this file and its 5 companions stay the single source of truth.
