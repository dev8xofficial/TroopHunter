# 00 — Overview

> **Autonomous Design Engine (ADE)** — specification, v0.1 (R&D).
> This document set describes a system that does not exist yet. It is written to be *understood*, *stress-tested against assumptions*, and *built from later*. No code is implied to exist.

---

## 1. The vision (Goal B)

ADE is a system in which **the AI performs the entire design process autonomously**, adapting a website or product to a company's content and business context — and getting better at design with every project it completes.

It is **not** a tool that clones a reference site onto new content. It draws on accumulated design knowledge, makes its own design decisions, **looks at its own output and corrects it**, and produces something new that serves the client.

The one-line test that separates this from everything we built before:

> **If you deleted the reference site, would the system still produce a good design?**
> In ADE, *yes* — the design intelligence lives in the AI, its accumulated library, and its ability to judge its own work. The reference is at most a direction, never a template.

---

## 2. Why not "Goal A" (and why the old pipeline is a dead end for this)

We previously built a 20-file "extract → document → regenerate" pipeline (see `../../step-6/`). It is an excellent **fidelity engine**: it clones one source site's design onto new content. But it optimizes the *opposite* of what this system needs:

| | Goal A — Design Transfer (the old pipeline) | **Goal B — ADE (this spec)** |
|---|---|---|
| Success = | fidelity to a source | good, novel design for the brief |
| The model is | constrained at generation | free at generation, judged after |
| Knowledge is | re-derived per source, thrown away | accumulated across projects |
| Output is bounded by | the reference | only the brand + the brief |
| Core mechanism | a frozen document set, decoded blind | a live render→see→critique→fix loop |

The old pipeline failed at *autonomy* for one structural reason: **its generator never sees its own output.** It generates from a frozen text spec and hopes. Every failure we logged (gradient overlays, header blur, wrong fonts) happened *because* nothing closed the loop against the rendered result. ADE makes that loop the engine.

---

## 3. The three capabilities

An autonomous designer needs the three things a human designer has. ADE builds each one explicitly; the old pipeline faked all three with human-authored files.

```
┌────────────┬───────────────────────────────────────────────┬───────────────┐
│ CAPABILITY │ WHAT IT IS                                     │ STATUS        │
├────────────┼───────────────────────────────────────────────┼───────────────┤
│ 1. EYES    │ render → screenshot → critique → edit loop.    │ BUILD FIRST   │
│            │ The agent sees what it made and fixes it.      │ (the MVP)     │
│ 2. MEMORY  │ a persistent, growing, retrievable design      │ Build second  │
│            │ library + per-client brand/system stores.      │               │
│ 3. TASTE   │ an autonomous judge: "is this good for this    │ Hardest /     │
│            │ brief?" — without a source to diff against.    │ open research │
└────────────┴───────────────────────────────────────────────┴───────────────┘
```

- **Eyes** are the prerequisite. A blind designer cannot be autonomous. (Specced in `05-generation-loop.md`; MVP in `07-mvp-cli.md`.)
- **Memory** is what makes the system *get smarter* and *stay consistent* — two different jobs, two different stores. (Specced in `03-data-model.md` and `04-memory-and-consistency.md`.)
- **Taste** is the genuine bottleneck and is treated honestly as open research, not a solved problem. (Framed in `05-generation-loop.md` and `09-roadmap-and-open-questions.md`.)

---

## 4. The system at a glance

ADE maps onto the team's original mental model — **left side (your inputs), the autonomous workspace, right side (the AI's design knowledge)** — but fills in what each zone actually contains.

```
   LEFT SIDE                 AUTONOMOUS WORKSPACE               RIGHT SIDE
  (human inputs)            (the agent loop lives here)      (AI design knowledge)

 References (≤5) ─────┐                                      ┌──── GLOBAL LIBRARY
 Business context ────┤      generate → render →             │     (grows every
 Content + assets ────┼───►  critique → edit → repeat  ◄─────┤      project — soft)
 Brand approval ──────┤                │                     │
 Taste feedback ──────┘                ▼                     └──── BRAND + DESIGN
                                finished, consistent                SYSTEM
                                design artifacts                    (per client — hard)
```

Over time the **left side shrinks** (less human instruction needed) and the **right side grows** (more accumulated knowledge). That trajectory *is* the product.

---

## 5. The constraint model (soft vs hard) — the spine of the whole spec

Every input to the engine is either **soft** (the AI may diverge from it) or **hard** (the AI must obey it). Confusing the two is what makes a system either rigid (clones) or incoherent (drifts).

```
   AUTONOMY lives in the ROUTE          CONSISTENCY lives in the DESTINATION
   ──────────────────────────          ──────────────────────────────────
   • how to compose the layout         • brand colors, type, motion voice
   • which patterns to draw on         • the frozen project design system
   • how to solve the brief            • the business requirements
   • when it is good enough            • accessibility / quality floor
        (AI decides — freely)               (locked — AI must obey)
```

- **Soft inputs:** ≤5 reference sites (direction), the global library (retrieved inspiration).
- **Hard inputs:** the brand foundation, the project design system, the business brief, the quality floor.

This is how ADE is autonomous *and* consistent at once: full freedom on the route, zero freedom on the destination. (Carried through `04`, `05`, `06`.)

---

## 6. Scope & non-goals

**In scope for the system (full vision):**
- Autonomous, brief-driven design of web (and later product) sections and whole artifacts.
- Cross-project learning (the library) and per-client consistency (brand + design system).
- A CLI as the entry interface.

**In scope for the MVP slice (what we build/test first):**
- The **closed loop on a single section** (the "eyes") — generate → render → screenshot → self-critique → edit — driven from a CLI, from a brief, with **no** library and **no** brand store yet. (`07-mvp-cli.md`.)

**Non-goals (explicitly out of scope, now and/or near-term):**
- Cloning a specific reference pixel-for-pixel (that is the old pipeline; ADE deliberately does not do this).
- A solved "taste" model — the judge is a proxy that improves with human feedback, not a finished oracle.
- Production hosting, multi-tenant infra, or a UI — the spec assumes a CLI/R&D context first.

---

## 7. The running example (used in every document)

To keep the spec concrete, one example threads through all documents:

> **The Burkes Group** — a real-estate & mortgage firm in The Woodlands, TX. Brand personality: *trust, legacy, reliability, modern*. Goal: *lead generation through confidence, not urgency*. Optional reference for direction: an editorial-luxury site (the "Olivia Harper" feel). First artifact: a marketing **website**; later a **product** (client portal).

Wherever a document introduces an abstract concept (a store, a schema, a loop step), it immediately shows the Burkes instance of it. If a concept cannot be traced to a concrete Burkes step, the spec is incomplete there (this is verification criterion #2 in the plan).

---

## 8. How to read this spec

| If you want to understand… | Read |
|---|---|
| The cast — who/what does what | `01-actors-and-components.md` |
| How the pieces connect + the tech ingredients | `02-architecture.md` |
| The exact data shapes (library entry, brand, tokens) | `03-data-model.md` |
| How consistency & learning actually work | `04-memory-and-consistency.md` |
| The engine in depth (the loop, prompts, critic) | `05-generation-loop.md` |
| Full project flows, website→product reuse | `06-workflows.md` |
| **What we build first** (the MVP) | `07-mvp-cli.md` |
| What we are assuming and how we'll test it | `08-hypotheses-and-validation.md` |
| Build order, autonomy ladder, open problems | `09-roadmap-and-open-questions.md` |

Terminology is defined on first use and collected in the glossary in `README.md`.
