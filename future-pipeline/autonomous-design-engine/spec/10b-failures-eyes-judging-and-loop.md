# 10b — Failure Modes: Eyes, Judging (Taste) & Loop Dynamics

> Part of the failure-mode catalogue. **Start at [10-failure-modes.md](./10-failure-modes.md)** for the index, mitigation primitives (MP-n), and how to use this document — this file holds the full 8-field entries for "seeing the render, judging it, and the search process across iterations."

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

### F-JDG-07 — Systematic judge biases
**Level:** spec+impl · **Severity:** High · **Area:** Judging
- **Description:** The Critic exhibits model biases: **position** and **verbosity** bias in pairwise, **vision-resolution** limits (cannot see kerning / 1px misalignment / small-text legibility), **sycophancy** to stated intent, **grade inflation** from safety-tuning, and cultural/aesthetic bias.
- **Root cause:** Inherent LLM/vision-model biases; a single-model judge.
- **Detection:** Randomize candidate order; test-retest; compare against humans on fine-detail and non-Western briefs.
- **Impact:** Miscalibrated verdicts; false passes; unfair cross-domain judgment (feeds F-JDG-01/04).
- **Mitigation:** Order-randomization + position-debiasing; ensemble/self-consistency; crop-based / higher-resolution inspection; ground in the constitution + anchored exemplars ([12](./12-design-constitution.md)); calibrate on the benchmark [MP-3].
- **Recovery:** Re-judge debiased / aggregated.
- **Validation:** Bias probes (swap order, vary verbosity); assert verdict stability.

---

## Loop dynamics & search

> This area resolves a pre-existing gap: `11` (RP-3, the loop-integrity table, invariants I4/I10, and the coverage map) references `F-LOOP-01/02/04/05` five separate times, but no such entries existed anywhere in this catalogue until now. It also formalizes search-dynamics problems (greedy local optima, scalarization) that had previously been named only as research bets (R7/R8/R12 in [14](./14-research-agenda.md)) without a catalogued failure behind them.

### F-LOOP-01 — Runaway / unbounded loop
**Level:** impl · **Severity:** High · **Area:** Loop dynamics
- **Description:** A section's generate→render→critique→edit loop has no effective cap, or the cap is misconfigured/too high, so it spins far past a reasonable budget without terminating.
- **Root cause:** `max_iters`/wall-clock/token budgets absent, unenforced, or set without a sane default.
- **Detection:** Iteration count or wall-clock exceeds the expected budget with no termination.
- **Impact:** Runaway cost/latency (compounds F-MOD-04); a run that never reaches a decision.
- **Mitigation:** Enforce `max_iters` + token/wall-clock budgets centrally, not per-call; on exhaustion, escalate rather than continue [MP-5].
- **Recovery:** Kill the run; escalate with best-so-far.
- **Validation:** Force a non-terminating critique loop; assert the budget cap fires and escalates.

### F-LOOP-02 — Regression (a worse iteration is accepted)
**Level:** impl · **Severity:** High · **Area:** Loop dynamics
- **Description:** A later iteration replaces the current best candidate despite scoring worse, so the run can end in a worse state than one it already produced.
- **Root cause:** No best-so-far retention; naive "use the latest candidate" selection.
- **Detection:** Final output's score is lower than an earlier iteration's recorded score in the trace.
- **Impact:** The loop actively makes things worse; undermines trust in "iteration = improvement" (the H1 premise).
- **Mitigation:** Best-so-far retention — replace only on a strictly higher score (I4) [MP-4].
- **Recovery:** Revert to the best recorded candidate.
- **Validation:** Inject a worse-scoring later candidate; assert it is never selected.

### F-LOOP-03 — Non-convergence / oscillation
**Level:** spec+impl · **Severity:** Med · **Area:** Loop dynamics
- **Description:** The loop thrashes without net progress — fixing violation A reintroduces violation B, over-correction turns one sharp note into a full redesign that loses what worked, or feedback overload (many simultaneous notes) means none are well addressed.
- **Root cause:** Feedback serialization has no priority/scope discipline; the Generator over-applies broad fixes to narrow notes.
- **Detection:** Trace shows scores oscillating rather than trending; the same violation class reappears after being fixed.
- **Impact:** Budget burned without progress; a run escalates that could have passed with better-scoped feedback.
- **Mitigation:** Scope feedback narrowly (fix *this*, preserve *that*) in the serialized prompt; cap how much a single iteration may change; track violation-class history to detect ping-pong [MP-3].
- **Recovery:** Escalate early once oscillation is detected rather than burning the full budget.
- **Validation:** A fixture that induces a known A↔B trade-off; assert the loop detects thrash rather than exhausting silently.

### F-LOOP-04 — Silent exhaustion (no escalation)
**Level:** impl · **Severity:** High · **Area:** Loop dynamics
- **Description:** The budget/iteration cap is reached but the run does not escalate — it stops, hangs, or exits without a recorded terminal state.
- **Root cause:** Exhaustion path not wired to the escalation/trace-write logic; an uncaught exception on the last iteration.
- **Detection:** A run directory with no `final/` output and no terminal state in the trace.
- **Impact:** Violates "every run ends in exactly one recorded state" (I10); a vanished run is indistinguishable from a crash, and wastes the spend that produced it.
- **Mitigation:** Exhaustion is a first-class, tested code path that always writes best-so-far + an `escalated` terminal record [MP-5].
- **Recovery:** Reconstruct from the last persisted iteration in the trace.
- **Validation:** Force budget exhaustion; assert a terminal state is always written.

### F-LOOP-05 — Unbounded render-repair sub-loop
**Level:** impl · **Severity:** Med · **Area:** Loop dynamics
- **Description:** The render-repair path (fixing a broken render, distinct from design critique) is not itself bounded or counted against the run budget, so a persistently broken candidate can loop inside "repair" indefinitely without ever reaching `abort`.
- **Root cause:** Repair treated as outside the loop's own accounting rather than a bounded sub-loop with its own try-limit.
- **Detection:** Repair attempts exceed a sane count (e.g. >`renderRepairTries`) without aborting.
- **Impact:** The same runaway-cost risk as F-LOOP-01, hidden inside a path that looks like "fixing," not "looping."
- **Mitigation:** Bound render-repair with its own explicit try-limit; each attempt counts against the overall run budget and is traced as a `RunRecord`; unrepairable after K tries → abort + record, never silently retry forever [MP-5].
- **Recovery:** Abort the candidate; continue the outer loop with remaining budget, or escalate if none remains.
- **Validation:** A component that never renders validly; assert repair aborts at the try-limit rather than looping.

### F-LOOP-06 — Greedy local-optimum trap
**Level:** spec · **Severity:** High · **Area:** Loop dynamics
- **Description:** Best-so-far retention plus iterative editing is a **greedy hill-climber**: it can only ever accept a strictly-better candidate and edit *the current best*. It can polish a mediocre direction to its local peak but can never make the discontinuous jump to a structurally different, better design.
- **Root cause:** No restart, no direction-switching, no accept-worse-to-explore, no stagnation escape — the search has exactly one move (small edit to the current best).
- **Detection:** Scores plateau well below the threshold across remaining iterations; candidates converge to visibly the same layout/direction.
- **Impact:** The loop reliably finds *locally*-good, never *globally*-best designs — caps craft below what the same budget could achieve with real exploration.
- **Mitigation:** Diversity injection / restart-on-plateau / an explicit "abandon this direction" move, tested as research bet **R7** ([14](./14-research-agenda.md)) before being adopted.
- **Recovery:** On detected stagnation, spend remaining budget on a fresh direction rather than further polishing.
- **Validation:** A seeded local optimum (a mediocre direction with no small edit that improves it); assert plain best-so-far gets stuck and a restart-capable variant escapes it — the R7 experiment.

### F-LOOP-07 — Scalarization hides Pareto-dominant candidates
**Level:** spec · **Severity:** High · **Area:** Loop dynamics
- **Description:** Collapsing brand/system/brief/craft into one `weighted_total` is scalarization — a candidate that is exceptional on one dimension and merely good on others (e.g. 95-craft/75-brief-fit) can lose to a flat, uniformly mediocre candidate (82/82/82/82), even when the former is the better design.
- **Root cause:** Single weighted-sum selection has no concept of a Pareto front; it structurally rewards balanced compromise over spiky excellence.
- **Detection:** A human prefers a lower-`weighted_total` candidate over the one the sum selected.
- **Impact:** The system is biased toward competent-but-forgettable output — directly opposed to the "excellence is spiky, not balanced" principle ([12](./12-design-constitution.md) P8).
- **Mitigation:** Pareto-front selection with human/second-critic tie-break among non-dominated candidates instead of pure summation, tested as research bet **R8** ([14](./14-research-agenda.md)).
- **Recovery:** Re-rank candidates by Pareto-dominance before falling back to the sum.
- **Validation:** A synthetic candidate pair with this exact trade-off; assert Pareto-aware selection picks the spiky one and humans agree — the R8 experiment.

### F-LOOP-08 — No adaptive effort allocation
**Level:** spec · **Severity:** Med · **Area:** Loop dynamics
- **Description:** Every section gets the same iteration/variation budget regardless of stakes (a make-or-break hero vs. a throwaway footer), and the loop has no plateau/diminishing-returns detection to reallocate spend toward sections still improving.
- **Root cause:** Budgets are configured per-run, not per-section-by-stakes or by observed marginal gain.
- **Detection:** A high-stakes section escalates at the same budget a low-stakes one passed easily; iterations continue past the point scores stopped moving.
- **Impact:** Wasted spend on sections that plateaued early; under-spend on the sections that would benefit most from more iterations.
- **Mitigation:** Stakes-weighted budgets + marginal-gain/plateau detection to reallocate effort, tested as research bet **R12** ([14](./14-research-agenda.md)).
- **Recovery:** N/A — an efficiency gap, not a correctness failure.
- **Validation:** Compare quality-per-token at fixed total budget, adaptive vs. uniform allocation — the R12 experiment.
