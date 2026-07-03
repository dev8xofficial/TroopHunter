# 08 — Hypotheses & Validation

> ADE rests on assumptions. This document makes each one **falsifiable**: a statement, why it matters, how to test it, the metric that decides pass/fail, and which build phase tests it. The team's own culture demanded this ("a predicted accuracy is not a measured one") — so nothing load-bearing is left as an untested belief.

---

## 1. Summary table

| ID | Hypothesis (one line) | Tested in | Decisive metric |
|---|---|---|---|
| **H1** | An agent that **sees** its render can improve a section vs a brief, no reference | MVP (`07`) | score trends up across iterations |
| **H2** | Brief-only design reaches a human "good" bar | MVP + phase 2 | human "good/close" rate |
| **H3** | A Critic with **no source to diff** still drives improvement; pairwise > absolute | MVP + phase 4 | critic↔human agreement; iter-on-iter gain |
| **H4** | Crystallization keeps later sections **consistent** without monotony | phase 2 | token-drift ≈ 0; variation present |
| **H5** | A shared Brand keeps **website ↔ product** one brand | phase 3 | human "same brand?" rate |
| **H6** | Accumulated Library makes project **N+1 better/faster** than N | phase 3 | quality↑ and/or iterations↓ with Library on |
| **H7** | Retrieval + vision + per-section keep **context bounded** | all phases | tokens/section flat vs refs & Library size |
| **H8** | The judge can be **calibrated toward human verdicts** over time | phase 4 | critic↔human agreement rises |

The ordering is also a **dependency order**: H1 must hold before H2–H8 are worth testing. If H1 fails, the whole approach is reconsidered — cheaply, at the MVP.

---

## 2. The hypotheses in detail

### H1 — Eyes (the load-bearing one)
- **Statement:** An agent that renders and sees its own output produces a measurably better section on iteration N+1 than N, judged against a brief, with no reference to clone.
- **Why it matters:** It is the entire premise. If sight doesn't improve output, ADE collapses to the old open-loop pipeline.
- **Test:** Run the MVP loop on ≥10 briefs with `--max-iters 4`. For each, record the Critic's weighted score per iteration (and have a human rank iter-0 vs final blind).
- **Pass metric:** Final score > iter-0 score in **≥70%** of runs, AND humans prefer the final over iter-0 in **≥70%** of blind pairs.
- **Fail looks like:** scores flat or random across iterations; humans can't tell final from first.

### H2 — Brief-only design is viable
- **Statement:** Given only business context (+ optional soft refs), output reaches a human "good or close" bar.
- **Why:** Goal B requires designing *from a brief*, not from a template.
- **Test:** Human rates each final MVP output on a 4-point scale (bad / weak / good / strong) for its brief.
- **Pass metric:** **≥50%** rated good-or-strong at the MVP stage (target rises with Memory). This is a *viability* bar, not a quality ceiling.
- **Note:** A low score here with a passing H1 means "the loop works but quality needs Memory/Taste" — informative, not fatal.

### H3 — Critique without ground truth
- **Statement:** A Critic with no source to diff against still produces feedback that drives improvement; **pairwise** ranking is more reliable than **absolute** scoring.
- **Why:** In Goal B there is no source to match — the Critic must judge quality, not fidelity.
- **Test:** (a) correlate Critic verdicts with human verdicts on the same outputs; (b) A/B the loop using absolute scores vs pairwise ranking, measure iter-on-iter human-preferred gain.
- **Pass metric:** Critic↔human agreement **> chance by a clear margin** (e.g. ≥0.4 rank correlation early); pairwise yields **higher** human-preferred gains than absolute.
- **This is the taste bottleneck surfacing early** — expect it to be the weakest result and the focus of phase 4.

### H4 — Consistency via crystallization
- **Statement:** Freezing section-1 decisions into a Project Design System keeps later sections consistent (near-zero token drift) while still allowing compositional variety.
- **Test:** Generate hero → about → footer under a frozen system. Measure (a) **token drift**: do later sections use colors/type/spacing outside the frozen set? (b) **variety**: are layouts meaningfully different (not clones)?
- **Pass metric:** **0** unauthorized tokens in later sections (hard-checkable); human confirms sections "feel consistent" **and** "not monotonous."
- **Fail looks like:** later sections invent off-system colors, or are carbon copies of the hero.

### H5 — Brand reuse across surfaces
- **Statement:** A shared Brand Foundation keeps a website and a product recognizably one brand, despite different per-surface systems.
- **Test:** Build a Burkes website section and a Burkes product screen under the same frozen brand; show both to humans.
- **Pass metric:** Humans answer "same brand?" **yes ≥80%**, while also recognizing them as appropriately different surfaces.

### H6 — Library compounding (the "gets smarter" claim)
- **Statement:** With the Library on, project N+1 is better and/or faster than with it off.
- **Why:** Without compounding, there is no "library," only a photocopier.
- **Test:** Matched pairs of similar briefs, Library-on vs Library-off (ablation). Measure final human rating and iterations-to-pass.
- **Pass metric:** Library-on shows **higher quality** and/or **fewer iterations** at significance across a batch.
- **Fail looks like:** no difference → retrieval isn't adding signal (revisit embed/payload or entry quality).

### H7 — Context economy
- **Statement:** Retrieval + vision + per-section generation keep per-section token cost roughly flat regardless of reference count or Library size.
- **Test:** Vary refs (0→5) and Library size (0→N), measure tokens/section from the trace.
- **Pass metric:** tokens/section **does not grow materially** with refs or Library size (sub-linear, near-flat).
- **Why it's in here:** it's the structural answer to the "200K window" worry; if it fails, the architecture (`02` §4) is wrong.

### H8 — Taste calibration
- **Statement:** The judge's verdicts can be calibrated toward human verdicts over successive projects (feeding verdicts back).
- **Test:** Track Critic↔human agreement over time as human verdicts accumulate and are used to tune the rubric / examples. Track it **per boundary** — section, brand, design system, and library each have their own **Phase-Exit Review** ([11 §2.3](./11-guardrails-and-invariants.md)) and calibrate independently (agreement on brand strategy is a different measurement than agreement on section craft).
- **Pass metric:** agreement **rises** across batches (a positive trend), trending toward a usable threshold for relaxing human gates — **a gate is relaxed only where its own boundary's agreement clears the bar.**
- **This is the hardest and longest** — it is the open research problem (`09`), not an MVP deliverable.

---

## 3. How measurement is wired in

Everything above is measured from artifacts the system already produces — **no separate eval harness needed at first**:

```
trace.json (03 §6)  ──►  per-iteration scores, tokens, verdicts        → H1, H3, H7
final outputs       ──►  human ratings (4-point)                       → H2, H4, H5, H6
ablation runs       ──►  Library-on vs -off, pairwise vs absolute      → H3, H6
verdict log         ──►  critic vs human agreement over time           → H3, H8
```

A lightweight `ade eval` reporter (later) can aggregate `trace.json` across runs into these metrics. For the MVP, reading `trace.json` by hand + a simple human-rating sheet is enough to decide H1/H2.

---

## 4. Decision rules (what we do with results)

```
H1 fails            → STOP and rethink the premise (cheap, by design — only the MVP was built)
H1 passes, H2 weak  → proceed; quality gap is the job of Memory + Taste (expected)
H4 fails            → consistency mechanism is wrong → fix crystallization before scaling
H6 fails            → the Library isn't compounding → fix entry quality / embed-payload split
H8 flat for long    → keep humans in the loop longer; do not over-automate the gates
```

The spirit, carried from the team's own logs: **report observed numbers, never predicted ones.** Every percentage in this document is a *target to measure against*, not a claim.
