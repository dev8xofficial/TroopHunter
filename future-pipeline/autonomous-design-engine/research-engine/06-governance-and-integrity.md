# 06 — Governance & Integrity

> The engine is powerful precisely because it questions everything — which makes its own discipline the thing most worth getting right. This document defines who has authority, the biases the engine must actively fight (including its own), how it audits itself, and when to shut a line of research down.

---

## 1. Human authority (the non-negotiable boundary)

The Research Engine **recommends; it never decides irreversibly.** It does not edit `../spec` or `../IMPLEMENTATION_PLAN` as an accepted change, and it never touches ADE's production behavior, without a human ratifying the Decision Record ([`05 §4`](./05-artifacts-and-integration.md)). This is Invariant I-R6 ([`01 §6`](./01-operating-model.md)). The separation is deliberate: the engine supplies *evidence and options*; the human supplies *judgment and accountability*.

What the engine may do autonomously: reconstruct, question, diverge, investigate, attack, synthesize, rank the Backlog, and write Decision Records. What it may not do: adopt its own recommendations.

## 2. Integrity rules (honesty is a hard constraint)

Non-negotiable, enforced by the Grounder and any reviewer ([`00 §4`](./00-charter.md), principle 10):

- **No fabricated evidence.** If it wasn't observed, reasoned, or cited, it isn't evidence.
- **No confidence above tier.** Stated confidence may never exceed the Evidence-Ladder cap ([`01 §3`](./01-operating-model.md)). A reviewer can reject a finding on this ground alone.
- **No hidden contradictions.** Conflicting evidence is reported and logged, never averaged into a comfortable middle.
- **No selective reporting.** Evidence *against* a favored conclusion is surfaced with the same prominence as evidence for it.
- **Uncertainty is stated, not smoothed.** "We don't know, and here's what would tell us" is a complete and acceptable output.

## 3. Anti-bias defenses (against the engine's *own* incentives)

An engine whose job is "find weaknesses" has a structural incentive to *always find weaknesses* — to justify itself, to prefer novelty, to recommend change for its own sake. These defenses are built into the lifecycle, not left to good intentions:

- **Pre-registration.** Before investigating a picked item, the engine writes down *what it expects to find*. Post-hoc, any gap between expectation and result is visible — this exposes rationalization and makes surprises (the valuable findings) legible.
- **Mandatory steelman of the status quo.** No Decision Record may recommend a change without first stating the **strongest case for leaving things exactly as they are.** If the steelman wins, the outcome is a null result — which is a success (below), not a failure.
- **Null-result parity.** "This assumption held; here is the evidence" is a first-class, valuable outcome with the same standing as a discovered flaw. The success metric ([`00 §6`](./00-charter.md)) counts *prevented* failures and *confirmed* assumptions, not just problems found — precisely so the engine is not rewarded for manufacturing concern.
- **Simplicity bias, on purpose.** When two changes are equally supported, the one that *removes* complexity wins. "Add an agent/prompt/component" carries a higher burden of evidence than "remove one."

## 4. Self-application (the engine researches itself)

The engine is not exempt from being researched. When the developer points it at itself — the *Research Agenda Meta-Layer* phase is the natural home for this ([`areas/_registry.md`](./areas/_registry.md)), or any time they choose — it investigates its own effectiveness against its success metric ([`00 §6`](./00-charter.md)):

- Are accepted recommendations actually producing measured (T3+) gains, or only T0 prose?
- Is the Backlog growing faster than it is being drained of *high-EVI* items (a sign of divergence without convergence)?
- Are investigations proportional, or is ceremony exceeding value?
- Is perspective diversity real (different substrate/information) or has it decayed into theater ([`02 §1`](./02-roles-and-diversity.md))?

Findings about the engine flow through the same pipeline and can amend *this specification set* — the engine is not exempt from its own scrutiny.

## 5. Kill-gates (when to stop)

Research is not free, and not every line is worth continuing. Stop or downgrade a line of research when:

- **Evidence ceiling reached.** The question cannot exceed T0/T1 with any available instrument, *and* the stakes don't justify building a new instrument → resolve as **Needs-Evidence**, park in Backlog, move on. Do not keep re-arguing at T0.
- **Diminishing returns.** Additional perspectives are producing correlated, not new, information.
- **Disproportion.** The investigation is costing more attention/credit than the best-case improvement is worth ([`00 §3`](./00-charter.md): "it is not a bureaucracy").
- **The engine as a whole underperforms.** If self-application (§4) shows the engine is not producing validated deltas over a sustained period, that is a signal to *simplify the engine*, not to run it harder. The engine is held to the same "earn your complexity" bar as ADE.

## 6. Reproducibility & provenance

Because LLM research is nondeterministic ([`01 §7`](./01-operating-model.md)), every Investigation Report carries a provenance header — date, models/config per perspective, exact inputs, divergence prompt, ranked EVI list. This does not make a run repeatable bit-for-bit; it makes it *auditable and re-runnable* — a reader can see exactly what was asked, of what, with what context, and challenge or extend it. Auditability, not determinism, is the standard.

## 7. The governance summary in one line

> **The engine may question anything and propose anything; it may adopt nothing. Confidence never exceeds evidence, the status quo always gets its steelman, a null result counts as a win, and the engine holds itself to the same discipline it imposes on ADE.**
