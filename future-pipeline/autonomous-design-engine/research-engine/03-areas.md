# 03 — The Area System (domain-agnostic, one at a time, forever extensible)

> This is the spine that makes the engine work on **any** subject without being rebuilt. The engine does not "know about" the Generator or the Critic. It knows how to research **an Area** — and an Area is whatever you point it at, including things that do not exist yet.

---

## 1. What an Area is

An **Area** is any bounded research subject the **developer** chooses to point the engine at. It is defined at whatever altitude the developer wants — for example the broad research phases currently in the [Registry](./areas/_registry.md) (Architecture, Intelligence, Learning, Evaluation, …), a narrower decision, a single mechanism, or **something ADE does not have yet.**

Two things the engine deliberately does **not** do:

- **It does not invent or maintain the list of Areas.** The developer owns the [Registry](./areas/_registry.md), adds Areas, and decides which one runs next (§7).
- **It does not carry a hardcoded catalogue of ADE's subsystems.** When handed an Area, the engine **discovers the relevant subsystems, components, assumptions, and moving parts itself** during Reconstruct ([`01 §2`](./01-operating-model.md)). Nothing internal is pre-listed for it. Give it "Architecture Research" and it works out *which* parts of ADE that touches; give it a new subject in two years and it does the same.

The engine is therefore **domain-agnostic**: it takes an Area as input and applies the *same* lifecycle ([`01`](./01-operating-model.md)) and the *same* perspective machinery ([`02`](./02-roles-and-diversity.md)). **Only the subject changes; the machine never does.** That is the entire design goal of this document.

## 2. Two hard rules

### Rule 1 — One Area at a time
An investigation studies **exactly one Area**. "Review the whole system" is banned: it produces shallow, correlated, unactionable output and blows the budget. Depth on a bounded subject beats breadth across all of them. If an Area is too big to hold in one focused pass, **split it into sub-Areas** (§6) and research the highest-value one first.

### Rule 2 — The Area set is open-ended
There is no fixed list of researchable things. New Areas are added **forever**, by anyone, at any time. Adding one is deliberately trivial (§4) so that a new idea or a new subsystem is *never* blocked on changing the engine. This is what "not area-specific; future new areas can be researched" means, made concrete.

## 3. The Area Registry

All Areas live in one file: [`areas/_registry.md`](./areas/_registry.md). It is the engine's worklist and map. Each row records:

| Field | Meaning |
|---|---|
| **ID** | stable short slug chosen by the developer, e.g. `P1`, `P7`, `P9-retrieval` |
| **Title** | human name |
| **Kind** | subsystem / cross-cutting / decision / mechanism / new |
| **Status** | `Unexplored` → `Active` → `Investigated` → `Monitoring` (see §5) |
| **Priority** | current rank for selection (§7) |
| **Mode** | paper / empirical / mixed (which is even possible today) |
| **Parent** | parent Area if this is a sub-Area (§6) |
| **Links** | related Area IDs (cross-links, §6) |
| **Last touched** | date + investigation reference |

The Registry is the single source of truth for *what has been studied, what is next, and what remains untouched.* Seeded content — ADE's subsystems plus the R1–R18 agenda — is already in it (§8).

## 4. Adding an Area (the extensibility mechanism)

To make **any** new subject researchable:

1. **Add a row** to [`areas/_registry.md`](./areas/_registry.md) with an ID, Kind, and initial Priority. (Status starts `Unexplored`.)
2. **When you activate it, write an [Area Card](./templates/area-card.md)** at `areas/<ID>.md`.

That is the whole extension surface. No engine code, no new methodology, no new roles. The Area Card is the *only* Area-specific artifact; everything downstream is generic. When ADE introduces a subsystem that does not exist today, this same two-step makes it a first-class research subject immediately.

## 5. The Area lifecycle (status states)

```
Unexplored ──activate──▶ Active ──investigation completes──▶ Investigated ──▶ Monitoring
     ▲                                                                            │
     └──────────────── re-open when evidence, code, or context changes ◀──────────┘
```

- **Unexplored** — registered, not yet studied.
- **Active** — an investigation is currently running on it (only a few Areas should be Active at once — one-at-a-time discipline).
- **Investigated** — at least one full lifecycle completed; Decision Records exist; residual questions are in the Backlog.
- **Monitoring** — considered settled *for now*, but watched. An Area re-opens when: new code lands (paper→empirical becomes possible), a decision it depended on changed, the Knowledge Base logs a contradiction, or a benchmark regression points at it. **No Area is ever "done forever"** — knowledge is provisional ([`00 §4`](./00-charter.md)).

## 6. Sub-Areas and cross-links

- **Sub-Areas** — a large Area decomposes into smaller ones with a `Parent` link (e.g. a Phase whose investigation surfaces several distinct threads → `P9-retrieval`, `P9-writeback`, `P9-decay`). The sub-Areas are named after whatever the engine *discovers* inside the Phase, not from a pre-written list. Research them one at a time; the parent is a container, not an investigation.
- **Cross-links** — Areas interact (the Critic's quality depends on the Evaluation benchmark, which depends on human-feedback capture). Record these as `Links` so a systems-thinking pass ([`00 §4`](./00-charter.md), principle 7) can follow real dependencies instead of pretending Areas are isolated. A finding in one Area frequently spawns Backlog items tagged to a linked Area — that is expected and healthy.

## 7. Selecting the next Area

**Selection belongs to the developer, not the engine.** The developer decides which Area runs next — the [Registry](./areas/_registry.md) `Priority` column is *their* order, not a ranking the engine imposes. The engine may *advise* (surface which Areas look load-bearing, assumption-dense, cheap to move up a tier, or flagged by a live signal such as a benchmark regression), but it never reorders the program or starts an Area on its own. It researches exactly the Area it is pointed at, and nothing else.

## 8. The current program

The [Registry](./areas/_registry.md) holds the developer's current research program — the Areas they have queued and their order. The engine does not add to it. As of now that program is a set of broad research phases (Architecture, Intelligence, Learning, Evaluation, Autonomy, Generator, Critic, Vision, Knowledge, Human Collaboration, Robustness, Scaling, Production, and a Research-Agenda Meta-Layer), with Architecture first.

Whatever each Phase turns out to *contain* is discovered by the engine at investigation time (§1), not enumerated in advance. ADE's existing `R1–R18` bets and `H`-series hypotheses are executed *inside* the relevant Phase as Backlog items when an investigation reaches them ([`areas/_registry.md`](./areas/_registry.md)), not maintained as a parallel list.

## 9. Why this satisfies the requirement

| Requirement | How the Area system meets it |
|---|---|
| "capable of conducting research on **any** given area" | The lifecycle takes an Area as input and is subject-independent; the Area Card is the only per-subject artifact. |
| "perform research **area by area**, one at a time" | Rule 1 + the Active state cap; large Areas split into sub-Areas researched individually. |
| "**not area-specific**; future new areas can be researched" | Rule 2 + the two-step Add-an-Area mechanism (§4) that touches no engine internals. |
