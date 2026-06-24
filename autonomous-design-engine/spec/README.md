# Autonomous Design Engine (ADE) — Specification

> A system in which the AI **autonomously designs** websites and products from a company's business context — drawing on accumulated design knowledge, judging its own rendered output, and getting better with every project. **Not** a tool that clones a reference site.
>
> This is a **specification**, not code. It exists to be understood at any level of detail, stress-tested against our assumptions, and built from later. **No application code exists yet** — by design.

---

## What this is (in one breath)

Three capabilities make an autonomous designer:

```
EYES    render → see → critique → edit      (build first — the MVP)
MEMORY  a soft growing Library + hard per-client Brand/System stores
TASTE   judge "is this good for this brief?" with no source to copy  (open research)
```

Everything in this spec elaborates those three and the **soft vs hard** constraint model that lets the system be autonomous (free on the *route*) and consistent (locked on the *destination*) at the same time.

---

## Reading order

Read top to bottom for the full picture, or jump by need.

| # | Document | What you'll learn |
|---|---|---|
| 0 | [00-overview.md](./00-overview.md) | Vision, why not cloning, the three capabilities, scope |
| 1 | [01-actors-and-components.md](./01-actors-and-components.md) | Every actor/component + its job + soft/hard authority (UML component diagram) |
| 2 | [02-architecture.md](./02-architecture.md) | How it all connects; control/data flow; tech-stack ingredients |
| 3 | [03-data-model.md](./03-data-model.md) | Exact schemas (Library entry, Brand, Design System, Artifact, Trace); embed-vs-payload (ER + class diagrams) |
| 4 | [04-memory-and-consistency.md](./04-memory-and-consistency.md) | Two memories; the 3-level hierarchy; crystallization; retrieval; write-back |
| 5 | [05-generation-loop.md](./05-generation-loop.md) | The engine in depth; critic rubric; prompt specs (sequence + state diagrams) |
| 6 | [06-workflows.md](./06-workflows.md) | Full project flows; website→product reuse; CLI map |
| 7 | [07-mvp-cli.md](./07-mvp-cli.md) | **What we build first** — the CLI closed-loop MVP, build-ready |
| 8 | [08-hypotheses-and-validation.md](./08-hypotheses-and-validation.md) | The assumptions, each falsifiable, with metrics |
| 9 | [09-roadmap-and-open-questions.md](./09-roadmap-and-open-questions.md) | Build phases, autonomy ladder, cost, risks, open problems |

**If you only read three:** `00` (why), `05` (the engine), `07` (what we build first).

---

## The running example

One example threads through every document so every abstract concept has a concrete instance:

> **The Burkes Group** — real-estate & mortgage, The Woodlands TX; personality *trust / legacy / reliable / modern*; goal *lead-gen via confidence, not urgency*. First artifact: a website (starting with the **hero**); later a **product** (client portal). Optional soft reference: an editorial-luxury "feel."

Wherever a doc introduces a store, schema, or loop step, it shows the Burkes instance of it.

---

## The one mental model to keep

```
   LEFT SIDE                 AUTONOMOUS WORKSPACE               RIGHT SIDE
  (human inputs)            (the agent loop lives here)      (AI design knowledge)

 references (≤5, soft)─┐                                     ┌─ GLOBAL LIBRARY (soft)
 business context ─────┤    generate → render →              │
 content + assets ─────┼──► critique → edit → repeat  ◄──────┤  BRAND + DESIGN SYSTEM
 brand approval ───────┤              │                      │  (hard)
 taste feedback ───────┘              ▼                      └─
                              finished, consistent
                              design artifacts

   Over time: the LEFT shrinks (less instruction), the RIGHT grows (more knowledge).
```

---

## Glossary

| Term | Meaning |
|---|---|
| **Goal A / Goal B** | A = clone a reference onto new content (the old pipeline). B = autonomous design from a brief (this system). |
| **Eyes** | The render→screenshot→critique→edit loop; the agent seeing its own output. |
| **Memory** | The two design memories: soft Library + hard Brand/System. |
| **Taste** | The Critic/Judge: evaluating quality with no source to diff against. |
| **Soft input** | Direction the AI may diverge from (references, Library). |
| **Hard input** | Law the AI must obey (Brand, Design System, brief, quality floor). |
| **Global Library** | Soft, cross-project, retrievable store of de-identified design knowledge. Makes the system *smarter*. |
| **Brand Foundation** | Hard, per-client identity, approved once, applies to every surface. |
| **Project Design System** | Hard, per-surface tokens + recipes, frozen after section 1. Makes one artifact *consistent*. |
| **Crystallization** | Freezing section 1's decisions into the Project Design System. |
| **Write-back** | Distilling an approved artifact into de-identified Library entries. |
| **Input bundle** | The soft + hard + visual-context set the Orchestrator assembles per section. |
| **Run/Trace record** | Per-iteration audit row; the substrate the hypotheses are measured on. |
| **The route / the destination** | Route = how to design (AI's freedom). Destination = brand/requirements (locked). |

---

## Status & next step

- **Spec:** v0.1, complete for Phase 0 understanding and validation.
- **Code:** none yet (intentional).
- **Next action:** when this spec is accepted, build **Phase 0** (the MVP in `07`), run it on the Burkes hero + ~10 briefs, and measure **H1** (`08`). Let that evidence decide whether to proceed to Phase 1.

> Guiding principle, inherited from our own logs: **report observed numbers, never predicted ones.** Every metric in this spec is a target to measure against — not a claim.
