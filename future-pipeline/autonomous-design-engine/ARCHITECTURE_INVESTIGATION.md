# ADE — Principal Architecture Investigation

> **Commissioned by:** `prompt.md` (owner-directed, 2026-07-15) — "Can ADE, as currently designed, realistically evolve into a system capable of true autonomous design?"
> **Corresponds to:** Research Engine Area **P1 — Architecture Research** (Deep proportionality, paper mode). If the owner adopts this report, `research-engine/areas/_registry.md` P1 → `Investigated`.
> **Provenance:** single investigator (Claude, Fable 5), full corpus read verbatim this session: `spec/00–14 + README`, `failures/10 + 10a–10e` (all ~100 F-IDs), `IMPLEMENTATION_PLAN.md` (v0.2, complete), `knowledge/*` (incl. full chat history), `research-engine/*`, git history of the folder.
> **Honesty limits (per `research-engine/02`):** this is a **single-substrate** investigation — my internal "perspectives" share one model's blind spots, so their agreement is weak evidence. Paper mode caps every architectural claim at **T2 / Medium confidence**; only directly observable repo facts are stated as established. Every major finding names its falsifier.

---

## 15. Executive summary (placed first, per the project's own readers-first convention)

**The verdict, in three sentences:** ADE's architectural *shape* is fundamentally sound — the inner-loop (generate→see→critique→edit) + outer-loop (constitution + human-anchored benchmark + calibrated judge) + gated-autonomy structure is the correct, literature-aligned shape for this problem, and this investigation found **no fatal structural flaw** in it. However, three structural ceilings determine how high it can actually climb **as currently operated**: (1) **taste-signal starvation** — the entire outer loop learns from one human's verdicts at solo throughput, orders of magnitude below what judge-calibration needs; (2) **judgment bandwidth** — a judge that sees three static frames and emits four scalars cannot *verify* world-class work even if the generator produces it; (3) **the missing strategy/IA layer** — the definitional core of "design" (what the page is, what it says, in what order, why) remains human-supplied, making ADE-as-scoped an autonomous *section stylist*, not an autonomous *designer*. None of the three is fatal; all three have identifiable remedies; all three are currently scheduled too late or not at all.

**Direct answer to the commissioning question ("will the end goal be achieved / is it being achieved / if not, how"):**

- **Will it be achieved?** *Conditional on which end goal.* For "a highly-autonomous personal design engine producing consistently good work by your standard, with you at the brand/delivery gates" — **yes, plausibly**, and the current architecture is well-suited with the re-prioritizations below. For "true unattended autonomy at world-class quality, built and calibrated solo" — **no, not on the current trajectory**, for the three structural reasons above, chiefly signal starvation (F1). The unanswered purpose question (`knowledge/open-questions.md` #1) is therefore not administrative — **the architecture's viability verdict literally depends on it.**
- **Is it being achieved right now?** **No — nothing is running.** Zero experiments have ever executed; the Phase-0 scaffolding was deleted from the repo (commit `28a951a9`); every quality claim in the corpus is currently T0 (reasoning only). The project is at the maximum possible ratio of specification to evidence (F6).
- **If not, how will it be?** The prioritized path in §14. The single highest-leverage act is not another document — it is **running Phase 0 and letting H1 evidence flow**, with two cheap re-prioritizations folded in from day one: treat the **human verdict corpus** (not the Library) as the first-class compounding asset (F2), and log every IA/structural decision the human makes so the missing strategy layer has training data when it's built (F3).

---

## 1. Reconstruction of the architecture

Reconstructed from first principles across the full corpus (not from summaries). Compressed here; discrepancies between my reconstruction and the spec are themselves findings (flagged inline).

**Objective.** Goal B: autonomous design from a business brief — never cloning. Litmus: delete the reference and the output stays good. Three capabilities in dependency order: **Eyes** (closed visual loop, Phase 0), **Memory** (soft cross-project Library that compounds vs. hard per-client Brand/PDS stores that freeze), **Taste** (a Critic that can judge "good for this brief" with nothing to diff against — the honest open problem).

**Control flow (one section).** Orchestrator (sole stateful component) assembles an authority-tagged input bundle (HARD: brand, PDS, brief, quality floor · SOFT: top-k Library, ≤5 refs · CTX: prior-section screenshots) → Input Gate (schema, asset fitness, injection-safe delimiting; zero model spend on failure) → Brief Comprehension (cheap restate; ask-never-invent) → loop: Generator (streamed, one self-contained `.tsx`, react-only imports, static Tailwind) → sandboxed render (egress-denied, ephemeral, per-candidate nonce `__ADE_READY_ID__`) → Render-Health Gate (render bug → bounded repair, *never* the Critic — I11) → screenshots @1440/768/375 → Hard-Constraint Gate (axe a11y, responsive overflow, content presence, numeric exact-match, placeholder scan; token-allowlist from Phase 1) → fresh-context Critic (I2; subjective only — brand/brief/system/craft; pairwise when N>1; temp 0.2) → Schema Gate → **composite Pass Gate** (`approved ⇔ deterministic ∧ Critic`) → best-so-far retention (I4), scoped feedback serialization, oscillation detection, central budgets, terminal state `approved|escalated|aborted` (I10), atomic per-iteration `trace.jsonl` with per-part token breakdown (I6, H7 substrate).

**State machine of a project.** Brand: human provides palette+type facts → AI derives personality/tone/motion (fix-then-derive; re-derive, never hand-patch) → Phase-Exit Review → human approval → frozen (append-only versions, I5). Section 1 → crystallization freezes *tokens only* (components extend, never contradict; additive namespaced token extensions escalate to human) → later sections generated under frozen PDS + prior screenshots → assembly QA (re-loop offender, never blind-patch) → delivery (Phase-4 gates: output-quality, provenance/compliance, production-parity — I15) → write-back (de-id gate → abstraction → altitude Phase-Exit Review → dedup → insert at low confidence; human-approved artifacts only, I7).

**Learning systems.** Inner: critique-driven edits within a run. Outer (specs 12–14): thin living Constitution (10 principles; system proposes, human ratifies), Evaluation Charter (human-owned, held-out, multi-rater Golden Core; regression gate; watch the Critic-vs-human *gap*), verdict capture (`ade verdict`, blind iter-0-vs-final), eventually R4 reward model (trained on accumulated verdicts, never sovereign over the golden core). Autonomy ladder: gates relax only per-boundary, only on measured Critic↔human agreement.

**Governance.** 15 invariants; ~17 mitigation primitives; ~100 catalogued failure modes each mapped to an owning chunk (plan §8, verified coverage); phase gates on falsifiable hypotheses H1–H8 with pre-committed kill rules; Research Engine as a human-governed meta-layer (proposes, never adopts; Evidence Ladder caps confidence; EVI-ranked permanent backlog).

**Deployment/scale assumptions.** One machine, one process, local files; LLM calls via `ADE_PROVIDER=agent-sdk` on Pro-plan credit (**no API key in dev** — load-bearing); pgvector/backups/DR deferred to Phase 4; solo developer, originally ~8 hrs/wk (later revised ~21–25).

**Reconstruction discrepancies observed (fact, not judgment):** `spec/15` (the single authoritative execution roadmap) is deleted mid-rewrite — no execution plan exists on disk; `spec/16–36` are advertised in `spec/README` but absent; the failure catalogue moved to `failures/` while every cross-reference still points at `spec/10*`; `IMPLEMENTATION_PLAN §0.1` is headed "13 invariants" while correctly asserting 15; `spec/11` contains two sections numbered §7; and the Phase-0 scaffolding (`src/`, `harness/`, `tests/`, `spike.ts`, `package.json`) was **deleted** in commit `28a951a9` — `src/` survives as an empty directory. The knowledge base still describes that scaffolding as present, and the roadmap's "Wk 0 audit" of it is now moot.

---

## 2. Overall architectural assessment

**The shape is right.** Independently re-derived from a blank page ("if I designed a brief-to-design autonomy system today, what would it be?"), I arrive at substantially this architecture: a generator that sees its own output; deterministic ownership of everything objectively checkable; a fresh-context judge for the subjective remainder; hard/soft authority separation; human-anchored held-out evaluation; autonomy earned per-boundary on measured agreement. That convergence is meaningful: the design is not idiosyncratic — it is the Constitutional-AI/RLHF shape correctly transposed to design. **(Strong inference, T1: matches the published shape of the most successful self-improving-system programs.)**

**The proportions are wrong for the operating model.** The architecture implicitly assumes an *organization's* worth of taste signal (multi-rater golden core, thousands of verdicts for a reward model, continuous curation) while the operating model provides a *hobbyist's* worth (one rater, ≤25 hrs/wk, a few hundred verdicts/year at best). Where the spec is world-class is exactly where signal is free (deterministic gates, loop integrity, storage discipline); where it is thinnest is exactly where signal is scarce (taste ground truth). The system is superbly engineered to *eliminate bad* — its own diagnosis (`spec/14 §1`) — and structurally under-supplied to *learn great*, not because the learning machinery is missing on paper, but because its fuel is.

**The evidence base is zero.** Every architectural claim in the corpus currently rests on T0 reasoning. This is by design (spec-first), but the project's own culture ("report observed numbers, never predicted"; "stop analyzing, build" — `spec/15 §0` as preserved in chat history §13) has been violated by its own trajectory: since that directive, the repo gained a research engine, more spec, and this investigation, and *lost* its only code.

---

## 3. Major strengths (preserve these — attacked, survived)

Per null-result parity (`research-engine/06 §3`), confirmed strengths are first-class findings. Each of these was attacked during the investigation and survived:

1. **The composite Pass Gate and determinism-first split (I3).** Attack attempted: "the Guardrail Layer is over-engineering; a strong VLM can judge contrast/overflow." Falsified by the catalogue's own reasoning and external evidence (LLM judges are unreliable on objective measures; axe-core is not). This is the single best structural decision in the spec — it makes the noisy judge's job as small as possible. **Survived. Keep.**
2. **Render-health isolation (I11).** A render bug never reaching the Critic protects the H1 measurement from its most obvious confound. **Survived. Keep.**
3. **Fresh-context Critic (I2).** The old pipeline's self-grading (`thought_process.md`) is the documented counterexample. **Survived. Keep.**
4. **Hard/soft authority with fixed precedence.** Attack: "precedence is rigid; sometimes a reference *should* win." Steelman of status quo wins: a reference that should win means the brand-data is wrong — fix the input, not the precedence. Also the injection-safety backbone (I9). **Survived. Keep.**
5. **Bounded loops, best-so-far, terminal states, durable JSONL trace (I4/I6/I10).** Boring, correct, load-bearing. **Keep.**
6. **Phase gating on falsifiable kill-hypotheses with pre-committed decision rules.** The single best *process* decision; it is what makes an honest "stop" possible. **Keep — and actually honor it (F6).**
7. **Fix-then-derive brand with re-derive-never-hand-patch.** Elegant staleness prevention; provenance-per-element is the right data model. **Keep.**
8. **Phase-Exit Review as reuse, not new machinery.** Correctly resisted the "master reviewer" mega-component. **Keep.**
9. **"Seed thin, grow living, anchor human."** The constitution/charter posture is the correct resolution of the autonomy-vs-anchor debate, and the spec's own reasoning (`chat-history §9`) is sound: thinning the anchor removes the target, not the constraint. **Keep.**
10. **The access-model discipline** (provider abstraction, no-key dev, model-role separation with strongest-model Critic). **Keep.**

---

## 4. Critical weaknesses

### F1 — Taste-signal starvation is the binding ceiling *(the most important finding)*
- **Explanation.** Every path to higher quality and higher autonomy funnels through Critic↔human agreement (H3/H8, the ladder, R4). The ground truth is one person's verdicts. Preference/reward modeling that generalizes typically requires 10³–10⁵ pairwise judgments (T1: RLHF literature); statistically meaningful per-boundary agreement thresholds require sample sizes the spec itself says must come from a power analysis (`spec/13 §9`) — one that would show solo throughput (optimistically, hundreds of verdicts/year across *all* boundaries) is one to three orders of magnitude short. Worse, `spec/13 §3` *requires* multi-rater ratings with recorded inter-rater agreement — **formally unmeetable with one rater**. So as operated, the outer loop can converge at best to a low-resolution copy of one person's taste, and the ladder's rungs can never be climbed on the spec's own statistical standards.
- **Root cause.** The architecture was shaped by organizational-scale exemplars (Constitutional AI) without re-deriving the signal budget at solo scale. Acknowledged in fragments (open-questions #3/#4, `15 §9.3` taste SPOF, F-HUM-04) but never integrated into one conclusion.
- **Impact.** Autonomy: **permanently caps the ladder at low rungs** at solo scale. Quality: caps R4 entirely (unfundable with data). Scale: this is *the* scaling problem — not compute, not storage.
- **Remedies (ordered by leverage).** (a) **RLAIF-style scaling**: use abundant *AI* preference judgments (strongest model, decorrelated contexts) as the training bulk, with the tiny human golden core as the calibration/validation anchor — this is Anthropic's own answer to exactly this bottleneck, and ADE's charter (§2's three layers) already has the right slots for it; it changes R4's data plan, not the architecture. (b) Promote **R14 uncertainty-routed review** from Tier-3 to the moment verdicts start flowing — spend the scarce human-minutes only where the judge is unsure. (c) Make **every verdict maximally reusable from day 0** (structured, pairwise, blind — C0.16 already specifies this; guard it as the crown jewel per F2). (d) Long-term: a second rater is worth more than most R-bets.
- **Evidence: T1 (external precedent + arithmetic). Confidence: Medium (cap).**
- **Falsifier:** a Phase-3 pilot showing a usable, *generalizing* agreement threshold reached from ≤500 solo verdicts. If that happens, this finding is wrong and should be retired.

### F2 — Memory investment is inverted: the verdict corpus, not the Library, is the compounding asset
- **Explanation.** Rank ADE's accumulable assets by durability × marginal value: (1) **human verdict corpus** — model-independent, survives provider churn, cannot be replicated by any future model (it *is* your taste), feeds R4 and all calibration; (2) **per-client hard stores** — client data, durable; (3) **the golden-core benchmark** — durable by construction; (4) **deterministic gates** — durable code; (5) **the de-identified cross-client Library** — text-level design patterns that *compete with the improving priors of frontier models* ("trust-editorial heroes avoid gradient overlays" is already in every strong model), decay in relevance (F-WB-05/F-BRD-06 acknowledge aesthetic aging), and carry the heaviest machinery in the plan (de-id gate, altitude review, dedup, confidence decay, curation — five subsystems). The plan builds asset (5) as its own phase (Phase 2) while asset (1) is a side-effect (`ade verdict`) whose upgrade (R2) waits until Phase 2 and whose consumption (R4) waits until Phase 3.
- **Root cause.** The Library was conceived when "accumulated design knowledge" was the differentiator vision (spec 00 §4's growing right side); the rise of strong model priors since has quietly moved the differentiation to *taste data* (which open-question #2 half-recognizes: "the compounding, taste-calibrated Library").
- **Impact.** Learning: the compounding thesis (H6) is being tested on the weakest form of memory. Simplification: Phase 2 as spec'd is the largest removable complexity block in the plan.
- **Remedy.** Rescope Phase 2: **verdict corpus + per-client memory first** (retrieval over *your own client's* approved work needs no de-identification, no altitude review, and has obvious value), defer the cross-client de-identified Library until an ablation shows model priors are insufficient. This also dissolves most of F-WB-01/02/03/05/06/07's machinery until it's earned.
- **Evidence: T0–T1. Confidence: Medium (cap).**
- **Falsifier:** the H6 ablation (with real embeddings) showing Library-on significantly beats Library-off *beyond* what retrieval of own-client work achieves.

### F3 — As scoped, ADE is an autonomous section *stylist*, not an autonomous *designer*
- **Explanation.** In the current design, the human supplies: what sections exist (`design site --plan`), the narrative order, the copy, the content strategy, and the goal framing. The system decides composition and styling *within* a section. But information architecture, page narrative, and content strategy are the definitional core of design ("what should this page be?"), and they are precisely what "true autonomous design" means. The gap is catalogued (D1/D2, G2) and assigned to R9 — **Tier 3, LATER, "may never be reached at solo scale."** A worked trace (T2): for Burkes, every strategic decision — that there *is* a hero, that trust-over-urgency implies editorial restraint, that the sequence is hero→about→pricing — was made by a human or hard-coded in the brief. Delete the human's plan file and ADE cannot start.
- **Root cause.** Correct MVP scoping (prove the loop first) hardened into a roadmap where the mission-definitional capability is the last optional item.
- **Impact.** Autonomy: **definitional** — without this layer, the end-state is "human designs the site, ADE renders the sections beautifully," which is a wonderful *tool* and is not the stated mission.
- **Remedy (cheap, immediate).** Don't build R9 now — **start capturing its training data now**: whenever the human writes a plan/brief, record the structural decisions and their rationale as first-class data (a 5-minute schema addition to Phase-0 inputs). When R9 is built, it starts warm. Promote R9 from Tier-3 to the Phase-1/2 boundary in the next roadmap revision *if* the purpose question resolves toward autonomy.
- **Evidence: T2 (worked trace). Confidence: Medium (cap).**
- **Falsifier:** a redefinition of the end goal in which IA remains deliberately human (a legitimate answer to open-question #1 — but then the mission language should change).

### F4 — Judgment bandwidth caps verifiable quality
- **Explanation.** The judge sees 3 static PNGs and emits 4 scalars + notes. Invisible to it: motion/scroll/interaction (B1 — "a large fraction of perceived quality is temporal"), real performance (F-QF-04), goal-fit (D3 — conversion isn't in pixels), fine craft (F-JDG-07 — VLM resolution limits on kerning/1px), content robustness (B2). Consequence: even if the Generator produced world-class work, **the system cannot verify it** — and what can't be verified can't be selected for, so the loop optimizes toward "excellent static screenshot at three widths." The R-series knows all of this (R5/R10/R18); the finding is their *joint* effect: they are not five independent nice-to-haves, they are one ceiling.
- **Under-exploited middle layer (new, not in the catalogue):** between axe-core and VLM vibes sits a rich band of **deterministic design metrics computable from the DOM**: spacing-scale conformance (are all margins/paddings on the token scale?), type-scale conformance, alignment/grid-regularity analysis, tap-target geometry, visual-balance heuristics. These would move a chunk of "craft" from the noisiest component (VLM) to the cheapest (code) — exactly the spec's own RP-1 principle applied one level deeper. Aligns with existing plumbing (screenshots + DOM are both available at gate time).
- **Impact.** Quality: caps "world-class" at "screenshot-class." Autonomy: an unverifiable dimension can never have its human gate relaxed.
- **Evidence: T0–T1. Confidence: Medium (cap).**
- **Falsifier:** human blind studies showing static-frame judgment correlates ≥ some usable threshold with full-experience judgment for marketing surfaces (R5's experiment, inverted).

### F5 — Calibration is bound to a mortal judge-model
- **Explanation.** Months of prompt-level Critic calibration (rubric tweaks, exemplars, constitution grounding) are bound to a specific model id. Model deprecation (F-MOD-05/F-OPS-05 — pinning + re-baseline specified) forces recalibration; **prompt-tuned calibration does not transfer**. What transfers: the verdict corpus (human preferences over artifacts — model-independent) and the benchmark. This is another reason F2's asset ranking is correct, and a reason R4 (a *retrainable* judge) is more strategic than indefinite prompt-tuning of H8.
- **Evidence: T0–T1. Confidence: Medium (cap).**

### F6 — Meta-work absorption is the dominant live risk *(established by direct observation)*
- **Explanation.** Observable repo state: ~10k+ lines of spec/plan/knowledge/research-engine produced over ~3 weeks; **zero experiments ever run**; the only code (Phase-0 scaffolding incl. the make-or-break Agent-SDK spike) **deleted** (`28a951a9`); `spec/15` itself deleted mid-rewrite, so no execution plan exists on disk; the roadmap's own top directive ("stop analyzing, build to get real data — further gap-hunting has sharply diminishing returns," §0) was followed by: a 19-cluster gap hunt, a research engine, and this commissioned investigation. Each artifact is individually high-quality; jointly they exhibit the exact failure `spec/15 §9.7` predicted as most likely — attrition via meta-work, not technical failure. The Research Engine, never run, already has 8 docs + 4 templates; it fails its own proportionality test (`00-charter §3`: "not a bureaucracy") until it produces one validated delta.
- **Impact.** Project-existential. Every additional paper-month adds ~zero information about H1 while consuming the scarcest resource (motivation-hours).
- **Remedy.** A hard rule the corpus already contains but doesn't enforce: **no new spec/meta document until the H1 gate has data.** Restore the scaffolding from git (`28484962` and earlier) or rebuild minimal; run the Day-0 Agent-SDK spike; execute Phase 0.
- **Evidence: established (direct observation of repo state). Confidence: High** (the *interpretation* — that this is the dominant risk — is strong inference, Medium).

### F7 — Hero-first crystallization commits the biggest decision from the least information
- **Explanation.** The PDS — law for everything downstream — is extracted from one section, and that section is systematically unrepresentative: heroes over-index display typography and under-specify density/data/semantic tokens (the catalogue's own F-BRD-05/F-PDS-04 admit the downstream needs). The additive-extension policy then quietly converts "frozen" into "accreting," and H4's zero-drift metric measures *conformance to whatever froze*, not *whether what froze was right*. Alternative worth testing in Phase 1: **derive a candidate token system from brand + brief before section 1** (design-system-first — how human systems are actually made), then let the hero *validate* it rather than *define* it. This is a small experiment, not a redesign.
- **Evidence: T0 (+T2 partial trace). Confidence: Low–Medium.**
- **Falsifier:** Phase-1 measurement (already planned: extension frequency, Phase-Exit-Review intervention rate) showing hero-derived foundations rarely need correction.

### F8 — The single human anchor drifts, and nothing measures it
- **Explanation.** The "fixed" ground truth is one human whose taste co-adapts with the system's output distribution (rater drift is well documented in RLHF practice — T1). `spec/15 §9` mentions "no test-retest check on the humans themselves" in passing; no mechanism exists anywhere in the plan. A drifting anchor silently invalidates trend claims (H8's "agreement rises" could be the human converging on the machine).
- **Remedy (cheap):** periodic re-rating of a small fixed artifact set by the same human (self-test-retest), logged with the benchmark. One evening per quarter.
- **Evidence: T1. Confidence: Medium (cap).**

### F9 — The measurement plan's operational feasibility is unverified
- **Explanation.** Two unresolved dependencies under the entire dev model: (a) the **Pro-credit ToS** question for sustained automated volume (open-question #5 — flagged repeatedly, still unchecked); (b) **nobody has computed whether the H1 study fits the credit budget**: ≥10 briefs × ≤6 iters × 2 candidates × (gen + vision-critique) ≈ 250–400 model calls plus repairs — plausible over weeks, but it should be arithmetic, not hope, before Phase 0 starts. The Day-0 spike (deleted with the scaffolding) was supposed to answer the adjacent auth/vision/usage questions and never ran.
- **Evidence: established (that it is unverified). Confidence: High that it's unverified; unknown whether it passes.**

---

## 5. Hidden assumptions (labeled per the evidence standard)

| # | Assumption | Status | Note |
|---|---|---|---|
| A1 | A VLM can judge design well enough from screenshots to drive improvement (H1/H3) | plausible hypothesis, T1-supported | Strong external precedent for the *direction*; effect size and saturation point unknown — exactly what Phase 0 measures. Self-refinement literature warns gains often saturate in 2–3 iterations. |
| A2 | One person's verdicts are sufficient ground truth | unvalidated; **formally conflicts with `spec/13`'s own multi-rater requirement** | F1. The spec contradicts the operating model. |
| A3 | De-identified patterns transfer across clients and beat model priors (H6) | plausible hypothesis, weakly supported | F2/F8. Competes with priors; unfalsifiable at solo volume (open-q #4). |
| A4 | Design quality decomposes into 4 scored dimensions | contested *by the spec itself* (P8 spiky-excellence, R8 Pareto) | Internal tension acknowledged; weighted-sum selection is live in Phase 0 while the constitution says averaging is a failure mode. |
| A5 | Token conformance ≈ perceived consistency | untested | The allowlist checks *values*, not *usage*: a section can use only legal tokens in combinations that read as a different site. H4's human rating half covers this — keep both halves. |
| A6 | Pro credit sustains automated dev volume within ToS | untested, existential to the dev model | F9. |
| A7 | The Agent SDK works as a completion+vision provider (headless OAuth, usage retrieval) | untested — the spike never ran and was deleted | F6/F9. Still the plan's own "riskiest component." |
| A8 | The brief contains enough information to design from | untested; real briefs won't | D1 acknowledged; the human currently compensates (fine for a tool, a blocker for autonomy — F3). |
| A9 | Static marketing sections generalize to product surfaces | acknowledged unproven (F-SUR-*, deferred) | Honest in the spec. |
| A10 | A frozen brand is what clients want | acknowledged (F-BRD-06) | Annual human-triggered re-check specified. Adequate. |

---

## 6. Missing capabilities

1. **Strategy/IA layer** (F3) — definitional; currently LATER.
2. **Mid-loop clarification-seeking.** The system can ask a human only at the Input Gate. Real design is dialogic ("two hero directions are defensible — editorial or photographic; which?"). An `escalate-with-question` path exists structurally (Escalated state) but is framed as failure, not as a designed interaction. Cheap to add semantics for; large autonomy-quality payoff. *(T0, Low–Medium.)*
3. **Deterministic craft metrics** (F4's middle layer) — DOM-computable spacing/type/alignment conformance.
4. **AI-preference scaling (RLAIF slot)** in the charter's layer-③ (F1 remedy) — the charter's three-layer design has the socket; nothing fills it.
5. **Human test-retest instrumentation** (F8).
6. **Copy co-design.** Content is frozen input (C4 in the gap map, tied to R9); world-class marketing design is design-with-copy. Same data-capture-now remedy as F3.
7. **A "good enough to use" bar** (open-question #6) — still undefined; without it the never-done problem (`15 §9.5`) has no brake.

## 7. Unknown unknowns surfaced (not in the ~100-entry catalogue)

1. **Calibration↔model-mortality interaction** (F5): pinning is specified, but the *asset-class* consequence (prompt calibration is a depreciating asset; verdict data is not) is nowhere drawn.
2. **Anchor drift** (F8): rater drift of the sole human.
3. **Verdict-starvation arithmetic** (F1's quantitative core): the corpus never multiplies rater-throughput × time against reward-model data needs.
4. **Measurement-vs-budget arithmetic** (F9b).
5. **Judge-training-data leakage:** golden-core briefs will be pasted into prompts across many runs (Critic calls see constraints); over years, with provider-side training or caching unknowns, held-out discipline may erode in ways the charter's Library-contamination rule doesn't cover. Low probability, cheap hygiene (distinct eval-only provider sessions). *(Speculation.)*
6. **The spec itself as a coupling surface:** 15 invariants + 17 MPs + 100 F-IDs + cross-reference web means any conceptual change now touches 5–8 documents (observed: the Phase-Exit Review edit touched 8 files). Documentation coupling is real coupling — it raises the cost of the engine's own Accept pipeline (`research-engine/05 §5`) and is already producing drift (broken 10* links, stale counts). *(Established by observation of the current drift.)*

## 8. Architectural ceilings

Distinguishing **local issues** (fixable in place) from **fundamental ceilings** (require re-architecture or re-scoping), per the commission:

| Ceiling | Kind | Why |
|---|---|---|
| Taste-signal starvation (F1) | **Fundamental at solo scale**; *not* fundamental to the architecture | The pipes are right; the fuel doesn't exist solo. Remedy = change the signal economics (RLAIF, routing, raters), not the pipes. |
| Judgment bandwidth (F4) | Fundamental to the current Eyes/Critic *implementation*, not the shape | R5/R10 + DOM metrics widen it inside the existing loop. |
| Missing IA layer (F3) | **Scope ceiling** — a hole in the mission's center, not a flaw in what's built | Additive: an upstream stage; capture data now. |
| Greedy scalarized search (F-LOOP-06/07, R7/R8) | Local | Correctly parked as bets; the loop's plumbing accepts a better selector when funded. |
| Vision-only static output for product surfaces | Local-ish, honest | Deferred with eyes open (F-SUR-*). |
| One model in three roles (G3) | Local; watch it | Correlated blind spots — the Critic sharing the Generator's substrate softens I2's independence. Decorrelation-by-model (already the engine's own doctrine in `research-engine/02 §3`) applies to ADE's runtime too: a different-family model as second judge is the cheap hedge. |

**No ceiling was found in the storage, loop-integrity, gating, or governance layers.** The floor of this system is genuinely solid; every ceiling is in the taste/strategy stack — consistent with the spec's own core diagnosis, which this investigation independently confirms and sharpens quantitatively.

## 9. Long-term autonomy blockers (ranked)

1. **F1 signal starvation** — blocks ladder-climbing itself (thresholds can't be met at solo verdict volume).
2. **F3 missing IA** — blocks the *meaning* of autonomy (nothing to relax a gate over if the human still decides what the page is).
3. **F4 judgment bandwidth** — blocks *verification* of unattended quality (an unverifiable dimension keeps its human gate forever).
4. **A6/A7 operational unknowns** — block the dev model that everything runs on.
5. **F6 meta-absorption** — blocks arrival at any of the above.

## 10. Simplification opportunities (guilty until proven necessary)

1. **Phase 2 Library machinery** (biggest): defer de-id gate + altitude review + dedup + decay + curation until an ablation earns them; ship verdict-corpus + own-client retrieval instead (F2). Removes ~5 subsystems and 7 failure-modes' worth of surface from the near-term plan.
2. **Research Engine ceremony:** freeze the doc set (it's good), run **one Light P1-style investigation** (this report approximates it), and add nothing until it produces a ratified, validated delta — its own kill-gate (`06 §5`) applied to itself.
3. **R-series detailed spec docs:** the deletion of `18–35` was correct; don't regrow them ahead of scheduling.
4. **Weighted-total selection:** don't invest in tuning weights (the spec already flags Pareto as the successor); keep the Phase-0 version maximally dumb.
5. **Knowledge-base upkeep:** `chat-history.md` full-preservation was a one-time exception — keep it that way; the drift already visible (stale counts, broken links) is the cost of documentation mass (§7.6).
6. **What NOT to simplify** (attacked as possibly unnecessary; survived): the provider abstraction (access model demands it), Brief Comprehension (one cheap call that gates spend), the sandbox (F-SEC-01 is real), the trace's per-part token breakdown (H7 needs it, costs nothing), Phase-Exit Reviews (reuse, closes real F-IDs).

## 11. Cross-domain insights (imported per the engine's protocol — mapped, tiered T1)

1. **RLAIF (Constitutional AI's own second half):** when human feedback doesn't scale, generate preference labels with AI anchored by a small human-ratified constitution/core. ADE's charter has the exact three-layer socket for this; it changes R4's data plan only. *(→ F1.)*
2. **Metrology — calibration transfer standards:** instruments (judge models) are replaced; the *standard artifact set* (verdict corpus + golden core) is what lets a new instrument be calibrated to the old one's readings. Rank asset investments accordingly. *(→ F2/F5.)*
3. **Control theory — actuator/sensor resolution bounds the controller:** the loop's convergence is bounded by feedback fidelity (sensor = screenshots+text notes) and edit granularity (actuator = "fix this, preserve that"). Measure loop *gain* (score-delta per iteration) from the trace from day 1 — it's the cheapest health metric of the whole thesis and `trace.jsonl` already carries the fields. *(→ F4, H1 analysis.)*
4. **Aviation — minimum equipment list:** the delivery gates (I15) are all-or-nothing; a MEL-style explicit list of "which gates may be degraded for an R&D-grade delivery vs a production delivery" prevents either gate-skipping or gate-paralysis. *(Small, Phase 4.)*
5. **Organizational design — the agency org chart test:** map ADE's roles onto a real design agency: creative director (Critic) ✓, production designer (Generator) ✓, QA (gates) ✓, project manager (Orchestrator) ✓, **strategist/account planner — absent** (F3), **copywriter — absent** (C4). The two missing chairs are exactly the two most senior chairs in a real agency. *(→ F3.)*
6. **Evolutionary biology — variation maintenance:** the Library's popularity feedback (retrieve-what-worked) is selection without mutation; monoculture (F-WB-05) is the predictable end state. R11's wildcard slot is the mutation operator — if the Library survives F2's rescoping, R11 should ship *with* it, not after it. *(T1.)*
7. **Scientific methodology — pre-registration:** already imported by the engine for itself; apply it to the H-series too (H1's thresholds are pre-registered — good; keep every future gate that way).

## 12. Research gaps (in ADE's research program itself)

1. **No power analysis anywhere** — the charter demands statistics but no one has computed minimum sample sizes for any H-gate or agreement threshold (F1's quantitative core). Should precede Phase 3, ideally Phase 0's H1 design.
2. **H1's saturation curve is unmeasured by design** — the plan measures *whether* scores rise, not *where they plateau*; the plateau point drives all budget economics (R12 later). Add plateau-shape to the H1 readout for free from the same trace.
3. **No experiment tests the *feedback channel* itself** — is critic-notes-as-text the bottleneck? (Compare: same critique delivered as annotated screenshot regions vs text — a cheap Phase-0.5 A/B that informs R2's design.)
4. **The R-series lacks a "verdict-economics" bet** — nothing studies how to get maximum calibration per human-minute *before* R14; given F1, this is arguably Tier-0.
5. **The engine's Evidence Ladder has no home for "direct repo observation"** (this report needed one — used "established by observation"); trivial taxonomy patch.

## 13. Maturity assessment

| Axis | Rating | Basis |
|---|---|---|
| Architectural maturity (on paper) | **High (8/10)** | Internally consistent, failure-mapped, invariant-driven; unusually good for a solo project — arguably *too* complete relative to evidence. |
| Research maturity | **Framework high / execution zero** | World-class charter and agenda; zero experiments ever run. |
| Learning maturity | **Low (1/10)** | All learning machinery is design-only; no verdict, no benchmark, no library entry exists. |
| Evaluation maturity | **Low–Medium (2/10)** | Excellent method spec; no benchmark built; single-rater problem unresolved and load-bearing (F1). |
| Autonomy maturity | **Rung 0, pre-MVP** | No running loop; code deleted; H1 unanswered. |
| Scalability maturity | **Adequate-by-design for R&D** | Deliberately local/simple; production concerns catalogued honestly for Phase 4. |
| **Overall** | **Spec-mature, evidence-immature** | The single largest gap on every axis is the same gap: **nothing has ever run.** |

## 14. Prioritized findings & the path (what to actually do, in order)

| # | Action | Addresses | Cost | Why this order |
|---|---|---|---|---|
| 1 | **Resolve the purpose question** (open-q #1) — one paragraph from the owner | Everything; the verdict itself is conditional on it | 30 min | Changes the priority of F1/F3 more than any technical fact. |
| 2 | **Verify the operating substrate**: ToS check + restore/rebuild the Day-0 Agent-SDK spike (recoverable from git `28484962`) + the H1 call-count arithmetic | F9, A6, A7 | Days | The entire dev model rests on it; it was already the plan's step 0.0. |
| 3 | **Build and run Phase 0; measure H1** — no new meta-documents until the gate has data | F6, A1, H1 | The ~20-wk plan | The kill-risk gate; every paper-hour until then adds ~zero information. |
| 4 | Fold in two **free data-capture changes** during Phase 0: guard the verdict corpus as the crown-jewel asset (blind, pairwise, structured — C0.16 as spec'd, plus backup discipline) and log the human's IA/plan decisions as structured data | F2, F3 | ~0 | Compounding assets start accruing years before their consumers exist. |
| 5 | Add **plateau-shape + loop-gain** to the H1 readout; add the **human test-retest** ritual (quarterly) | §12.2, F8 | ~0 / 1 evening per quarter | Free from the existing trace; protects the anchor. |
| 6 | At the Phase-1 boundary: run the **design-system-first vs hero-first crystallization** mini-experiment | F7 | Small | Cheapest moment to test it; H4 machinery measures it. |
| 7 | **Rescope Phase 2** to verdict-corpus + own-client memory; Library-proper becomes a bet gated on its own ablation | F2, F8, simplification #1 | Negative (removes work) | Aligns investment with durable assets. |
| 8 | **Re-plan R4 around RLAIF** (AI-preference bulk + human golden-core anchor) and pull R14/verdict-economics earlier | F1 | Phase-3 planning change | The only known escape from the binding ceiling. |
| 9 | If purpose = autonomy: **promote the IA/strategy layer** (R9-class) into the named roadmap | F3 | Later, but *named* now | Definitional to the mission. |
| 10 | Housekeeping when convenient: restore `spec/15` (or bless the plan as interim authority), fix `spec/10*` links → `failures/`, the "13 invariants" header, duplicate `spec/11 §7`, stale scaffolding references, open-q #8 (now moot) | §1 discrepancies | Hours | Documentation drift is already producing contradictions agents will trip on. |

---

### Closing judgment

If I designed this system from a blank page today, I would arrive at this architecture's **skeleton** — and I would make three different bets on its **bloodstream**: I would treat human preference data as the scarcest resource and design everything around its economics from day one (F1/F2); I would put a strategist upstream of the stylist, or at least start recording what the human strategist does (F3); and I would have written a third as many documents and run the loop months ago (F6). None of that requires demolition. The floor of ADE — gates, loop integrity, authority model, storage discipline, governance — is the strongest solo-authored system specification I have evaluated, and the honest, falsifiable culture it's written in is itself an architectural asset. The ceiling is real but it is made of *signal and scope*, not of structure — and signal and scope are choices, not fate.

**The end goal is reachable if the end goal is chosen to match the signal you can actually feed it — or if the signal economics are changed to match the goal. It is not being reached today for one reason only: the system exists entirely on paper. Run it.**

*Every finding above names its falsifier. This report should be treated per the engine's own rule: provisional knowledge, revisable when stronger evidence — which Phase 0 will finally produce — appears.*
