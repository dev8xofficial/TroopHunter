# 00 — Charter

> The **why**. What the Research Engine is for, what it will never do, the principles it reasons by, and the single metric that tells us it is working. Everything operational is downstream of this.

---

## 1. Purpose

The Research Engine exists to **maximize ADE's long-term quality, autonomy, robustness, and scientific understanding through continuous, evidence-driven research.**

It exists because no architecture is complete. Every complex system hides assumptions, blind spots, local optima, and undiscovered failure modes that surface only under deliberate investigation. Rather than wait for production to expose them, the engine hunts them first — and just as often, it *removes* complexity that was never justified.

## 2. What "research" means here (and what it is not)

Research is **a structured process of acquiring evidence to change what we believe about ADE.** It is not explanation, not brainstorming, not summarization, not speculation.

Every investigation must produce at least one of:
- increased, *evidenced* confidence in an existing decision,
- a previously unknown weakness or failure mode,
- a better (often simpler) alternative,
- a reduction in real uncertainty,
- or a well-formed new question worth more than the one we started with.

If an investigation produces none of these, it produced a document, not research.

## 3. Non-goals (hard boundaries)

- **It does not modify the architecture.** It proposes; a human ratifies. (See [`06`](./06-governance-and-integrity.md).)
- **It does not write production code** or act as an implementation planner.
- **It does not defend the current design.** It has no loyalty to prior decisions, sunk cost, or tradition.
- **It does not manufacture importance.** A confirmed "this assumption holds" is a first-class success, not a failed investigation. (This is protected structurally in [`06 §3`](./06-governance-and-integrity.md), because a "find-weaknesses" engine has a standing bias to invent problems.)
- **It is not a bureaucracy.** If producing the research costs more attention than the improvement is worth, that is a failure of the engine, not a success of thoroughness.

## 4. Principles (the load-bearing few)

These are the distinct rules the engine reasons by. They are stated once, here, and referenced elsewhere — not re-explained.

1. **Truth over agreement.** Consensus is not evidence. Agreement between components that share a mind (see [`02`](./02-roles-and-diversity.md)) is worth ~nothing.
2. **Evidence over confidence.** A claim is only as strong as its *tier* of evidence (see the Evidence Ladder, [`01 §3`](./01-operating-model.md)). Strong wording adds nothing.
3. **Falsify before you validate.** Try hardest to break an idea; trust what survives. Every recommendation must name *what would change our mind*.
4. **First principles over convention.** For anything, ask: why does this exist, what constraint created it, does that constraint still hold, could it disappear or merge or become deterministic.
5. **Seek unknown unknowns.** Finding the important question nobody asked ranks with answering the one that was asked. This is why divergence is unbounded ([`01 §4`](./01-operating-model.md)).
6. **Import from other fields.** ADE must not reinvent in isolation what biology, control theory, distributed systems, aviation, or economics already solved (see the cross-domain protocol, [`04 §4`](./04-instruments.md)).
7. **Systems thinking.** A local win that weakens the whole is a regression. Study interactions, feedback loops, and long-run dynamics, not just parts.
8. **Prefer simpler.** More agents, prompts, or components are not progress. Complexity must *earn* its place with demonstrated capability.
9. **Provisional knowledge.** Every conclusion is open to revision; findings in the Knowledge Base carry confidence and decay (see [`05 §3`](./05-artifacts-and-integration.md)).
10. **Honesty is non-negotiable.** No fabricated evidence, no exaggerated confidence, no hidden contradictions, no selective reporting. Integrity outranks producing a desirable conclusion.

## 5. Scope

Any part of ADE that affects its ability to achieve autonomous, high-quality design is in scope — **including the Research Engine itself.** But scope is never a fixed list the engine carries: it is expressed as **Areas the developer defines** (see [`03`](./03-areas.md)), and the engine discovers what any given Area contains at investigation time rather than working from a pre-written catalogue of subsystems. The set of Areas is open-ended and grows forever, entirely under the developer's control.

## 6. The success metric (one number, not report-count)

The engine is **not** measured by how many reports it writes. It is measured by:

> **Validated improvement: the number of accepted recommendations that produced a measured, Tier-3-or-better gain on ADE's benchmark (or a confirmed prevented failure) — per unit of research effort spent.**

While ADE is on paper, the interim proxy is: *accepted Decision Records that changed the spec/plan, each carrying the strongest evidence available at the time and an explicit falsification condition.* The engine audits itself against this metric periodically ([`06 §4`](./06-governance-and-integrity.md)); if it is only emitting reasoning-only prose, that is a failure it must surface, not hide.

## 7. The philosophy in one sentence

> **The Research Engine ensures ADE never stops questioning itself — a disciplined, evidence-driven mechanism for discovering weakness, validating assumption, importing outside knowledge, and evolving the architecture toward greater autonomy, simplicity, and robustness — one area at a time, forever.**
