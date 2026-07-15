# 04 — Instruments (the toolbox)

> Principles say *how to think*; instruments are the concrete techniques an investigation actually runs. Each instrument produces evidence at a known tier ([`01 §3`](./01-operating-model.md)). Paper-mode instruments are available today; empirical instruments unlock per Area as ADE gets built.

---

## 1. Instrument → evidence tier map

| Instrument | Mode | Evidence tier it can reach |
|---|---|---|
| First-principles reconstruction | paper | T0 |
| Assumption archaeology | paper | T0 |
| Spec red-team / pre-mortem | paper | T0–T1 |
| Cross-domain import | paper | T1 |
| Worked-example trace | paper | T2 |
| Comparative system study | paper | T1 |
| Ablation | empirical | T3 |
| Benchmark delta (Golden Core) | empirical | T3 |
| Content / adversarial stress | empirical | T3 |
| Trace replay | empirical | T3 |
| Production A/B | empirical | T4 |

The Grounder ([`02 §2.1`](./02-roles-and-diversity.md)) pushes each finding to the **highest-tier instrument reachable for its Area right now**. In paper mode the ceiling is T2 — and that ceiling must be stated honestly, not papered over with confident prose.

## 2. Paper-mode instruments (available today)

ADE is mostly paper, so these carry most investigations for now.

- **First-principles reconstruction.** Rebuild the Area's mechanism from scratch without trusting the doc: how does information flow, where are decisions made, what actually produces the behavior. Discrepancies between your reconstruction and the spec are findings.
- **Assumption archaeology.** Enumerate every assumption the Area rests on — *especially the implicit ones* — and label each: evidenced / intuited / untested / unfalsifiable. Untested load-bearing assumptions are prime Backlog fuel.
- **Spec red-team / pre-mortem.** Assume the Area has already failed in production; work backward to the cause. Ask: what input, scale, brief, or sequence makes it break? This is the Attacker's main paper instrument.
- **Worked-example trace (T2 — the strongest paper evidence).** Take a *real* brief (the Burkes hero, or a deliberately hostile one) and walk it through the Area by hand, step by step, showing exactly where quality, consistency, or cost degrades. A concrete trace beats a paragraph of argument every time — it is the paper-mode equivalent of running the system.
- **Comparative system study.** Find the nearest real system that solved a similar problem (a design tool, an agent framework, an eval harness) and compare mechanisms. Borrow what fits; note what doesn't and why.

## 3. Empirical instruments (unlock as code lands)

Available for an Area only once that Area has running code. Declared in the Area Card's Mode field.

- **Ablation.** Turn the component/feature off (or degrade it) and measure the effect on output quality. The cleanest causal evidence available offline; the canonical way to answer "does this subsystem earn its place?" (a first-class question per [`00 §4`](./00-charter.md), principle 8).
- **Benchmark delta on the Golden Core.** Run ADE's held-out benchmark (`../spec/13-evaluation-charter.md`) before and after a change; the delta is the evidence. **This is the engine's T3 anchor** — it uses ADE's own measuring stick, not an invented one.
- **Content / adversarial stress.** Programmatically expand, shrink, or corrupt content (very long headlines, empty states, hostile copy) and observe robustness — a11y, overflow, contrast, layout collapse.
- **Trace replay.** Re-run recorded run traces against a changed component to detect regressions without regenerating from scratch.

## 4. The cross-domain import protocol (structured, not decorative)

Importing outside ideas is a first-class principle ([`00 §4`](./00-charter.md), principle 6), but it is dangerous done casually — analogies flatter and mislead. So imports follow a disciplined path:

1. **State the ADE problem** abstractly, stripped of ADE vocabulary ("a producer emits artifacts a judge scores; how do we keep the judge from drifting?").
2. **Find the field that owns this problem** (here: control theory / metrology / ML eval).
3. **Name the specific mechanism** they use (calibration against a fixed standard; drift detection; closed-loop feedback).
4. **Map it explicitly** — what in ADE corresponds to what in the source. Where the mapping is forced, stop.
5. **Adapt, don't copy.** State what changes in translation and what breaks.
6. **Tier it honestly.** "Field X uses this successfully" is **T1 precedent**, not proof it works in ADE. It becomes a hypothesis for a T2/T3 instrument, not a conclusion.

Menu of source domains (extend freely per Area): operating systems, compilers, distributed systems, databases, aviation & aerospace, medicine, control theory, robotics, manufacturing/industrial engineering, evolution & biology, economics & mechanism design, cognitive science, organizational design, security engineering, reliability engineering.

## 5. Choosing instruments per investigation

The Framer picks instruments to match the Area, the mode, and the proportionality tier ([`01 §5`](./01-operating-model.md)):

- **Light** — reconstruction + assumption archaeology + one pre-mortem. (T0, occasionally T1.)
- **Standard** — the above + one worked-example trace + one cross-domain import. (Reaches T2.)
- **Deep** — the above + comparative study + (if code exists) an ablation or benchmark delta. (Reaches T3 where possible.)

The goal is never "run all instruments." It is **"run the fewest instruments that move the key findings up one Evidence Tier."**
