# 05 — Artifacts & Integration (outputs and wiring)

> An investigation is only worth its outputs and where they go. This document defines the four artifacts the engine maintains and how accepted findings actually change ADE without destabilizing it.

---

## 1. The four artifacts

| Artifact | What it is | Lifetime |
|---|---|---|
| **Backlog** | ranked store of every generated question/hypothesis/attack, across all Areas | permanent, append-mostly |
| **Knowledge Base** | validated findings the engine has learned, with confidence + decay | permanent, evolving |
| **Investigation Report** | the full record of one Area's investigation | one per investigation |
| **Decision Record** | the one-page human-facing proposal that ends a finding | one per decidable finding |

## 2. The Backlog (`areas/` tagged; the home of "the 1,000 questions")

Every item produced during divergence ([`01 §4`](./01-operating-model.md)) is a Backlog entry ([`templates/backlog-entry.md`](./templates/backlog-entry.md)) with: id, Area tag, the question/claim, EVI score and its four factors, status (`open` / `investigating` / `answered` / `obsolete`), and a link to the finding if answered.

Rules:
- **Append-mostly.** Items are never deleted — only re-ranked, promoted, or closed *with a reason*. (Invariant I-R5, [`01 §6`](./01-operating-model.md).)
- **Cross-Area.** A finding in one Area routinely spawns items tagged to a linked Area; that is how systemic threads get pulled over time.
- **The queue is the plan.** "What should the engine do next" is answered by the top of the Backlog + the Area Registry priorities — not by a fixed roadmap.

## 3. The Knowledge Base (dogfood ADE's own Library)

Validated findings must compound, or the engine relearns the same lessons forever. Rather than invent storage, the Knowledge Base **reuses the mechanics ADE already specified for its Global Library** (`../spec/36-phase-2-detailed-specification.md`): the engine dogfoods its own product.

Each entry carries:
- **Claim** (the learned fact) and **Area**(s) it applies to;
- **Evidence tier + confidence** at time of writing ([`01 §3`](./01-operating-model.md));
- **Support** — what evidence/instruments backed it; **Falsifier** — what would overturn it;
- **Confidence decay** — findings lose confidence over time and as ADE changes around them, so stale conclusions resurface for re-checking instead of ossifying;
- **De-duplication** — a new finding near an existing one updates it rather than spawning a duplicate;
- **Contradiction log** — when a new finding contradicts an old one, both are kept and the conflict is recorded (never silently overwritten), so reversals are visible and traceable.

Retrieval: before investigating an Area, the engine pulls related Knowledge-Base entries so it builds on prior work instead of repeating it ([research-process principle: "each investigation makes the next more informed"]).

## 4. The Decision Record (the human interface — the artifact that matters most)

A finding is not useful until a human can act on it in one screen. Every decidable finding produces a **one-page Decision Record** ([`templates/decision-record.md`](./templates/decision-record.md)):

```
Claim              one sentence: what we now believe
Area               which Area(s) this touches
Evidence tier      T0–T4, and the single strongest piece of evidence
Confidence         capped by tier — Low / Medium / High / Very High
Blast radius       what changes if we act; how many Areas/specs it touches
Reversibility      one-way door or easily undone?
Recommendation     Accept / Reject / Defer / Needs-Evidence
What would change our mind   the explicit falsification condition
Proposed change    the concrete spec/plan edit, if Accept
```

The long Investigation Report is the appendix; the Decision Record is what a human reads to ratify. Keeping the human interface to one page is deliberate — a 12-section report nobody reads is not governance.

### Outcome classes
Every finding resolves to one of: **Accept** (ratify → change ADE), **Reject** (discard, reason logged), **Defer** (park in Backlog with a trigger for revisiting), **Needs-Evidence** (name the experiment that would decide it; re-enters Backlog). A **null result** — "this assumption held, here is the evidence" — is a valid, valuable Accept-class outcome, not a wasted investigation ([`06 §3`](./06-governance-and-integrity.md)).

## 5. Integration into ADE (research → architecture, safely)

The engine **proposes**; a human **ratifies**; only then does ADE change. The pipeline:

```
Decision Record (Accept, ratified by human)
        ↓
Spec change first        edit ../spec/*  — design is authoritative for design
        ↓
Plan change              edit ../IMPLEMENTATION_PLAN.md — build order follows design
        ↓
Failure catalogue        if a new failure mode was found → ../failures/*
        ↓
Knowledge base + Registry updated; Area → Investigated/Monitoring
```

This matches ADE's existing rule: **the spec is canonical for design, the plan for build sequence** — so a design change is a `spec/` edit *first*, then reflected in the plan (`../AGENTS.md`). The engine never jumps straight to code or plan without the spec catching up.

## 6. Traceability

Every architectural change the engine causes must stay answerable, forever:

- **Which investigation** introduced it (Investigation Report id)?
- **What evidence** supported it, at what tier?
- **What alternatives** were considered and why rejected?
- **What would reverse it** (the falsifier)?
- **Which assumptions changed**?

Decision Records + the Knowledge Base's contradiction log provide this. Traceability is what prevents slow architectural drift as investigations accumulate over years.
