# ADE Research Agenda — Execution Tracker

> **The single file to check for "what's done, what's in progress, what's next."** Every research bet (R1–R18, [spec/14](../spec/14-research-agenda.md)) gets exactly one row here and one plan file in `plans/`. Update this file the moment a task's status changes — it is the only place status is allowed to live; do not track progress anywhere else (not in chat, not in memory, not in the spec docs — those get a thin pointer back here, see each spec's "Implementation Status" footer).

**Last updated:** 2026-07-13 (manual — update this line every edit)

**Collaboration model (important):** this session's role is **R&D synthesis + spec/plan authoring** — writing the execution plans and updating the spec/tracker. Actual code implementation (running the tasks in each plan) is done by a separate executor (e.g. Gemini 3.1 Pro) following the plan files. Do not expect `src/*.ts` files to change as a direct result of a planning session; a plan's status only moves past `PLANNED` once someone has actually run its tasks and its `DONE WHEN` checks pass.

---

## How to read this file

- **Status** values: `NOT_PLANNED` (no execution plan written yet) → `PLANNED` (plan written, build not started) → `IN_PROGRESS` (some tasks done, not all) → `DONE` (acceptance checklist fully passes) → `BLOCKED` (stuck on something in "Blockers/notes").
- **Do not skip tiers.** The agenda's rule is non-negotiable: R1 before everything; R2 before R4. "Depends on" enforces this — don't start a bet until everything in its "Depends on" column is `DONE`.
- **One bet = one plan file = one row.** When a plan is written, fill in the "Plan file" column. When a task inside a plan is finished, update "Current task" here (don't make people open the plan file just to know where things stand).

---

## Status board

| # | Bet (one-line) | Tier | Depends on | Status | Plan file | Current task | Last updated |
|---|---|---|---|---|---|---|---|
| **R1** | Standing human-anchored benchmark (Golden Core + Spearman + regression gate) | 0 | — | `PLANNED` | [R1-benchmark-implementation-plan.md](./R1-benchmark-implementation-plan.md) | Not started — begin at task R1.0 | 2026-07-13 |
| **R2** | High-bandwidth human-feedback channel (pairwise + dimension ratings + annotations) | 0 | R1 | `PLANNED` | [R2-human-feedback-channel-implementation-plan.md](./R2-human-feedback-channel-implementation-plan.md) | Not started — gated on R1 reaching `DONE` (plan's own R2.0 gate check) | 2026-07-13 |
| **R3** | Constitution-grounded Critic (raises agreement, lowers variance) | 1 | R1 | `NOT_PLANNED` | — | — | — |
| **R4** | Learned reward/preference model, distilled into a cheaper judge | 1 | R1, R2 | `NOT_PLANNED` | — | — | — |
| **R5** | Motion/scroll/interaction-aware Eyes | 2 | R1 | `NOT_PLANNED` | — | — | — |
| **R6** | Divergence→convergence generation (vs. N parallel one-shots) | 2 | R1 | `NOT_PLANNED` | — | — | — |
| **R7** | Escape greedy local search (restart / diversity injection on plateau) | 2 | R1 | `NOT_PLANNED` | — | — | — |
| **R8** | Pareto / anti-scalarisation selection (surfaces spiky-excellent designs) | 2 | R1 | `NOT_PLANNED` | — | — | — |
| **R9** | Upstream strategy/IA layer (site-plan/narrative before pixels) | 3 | R1 | `NOT_PLANNED` | — | — | — |
| **R10** | Content-robustness + real performance + a11y/i18n as dimensions | 3 | R1 | `NOT_PLANNED` | — | — | — |
| **R11** | Deliberate cross-domain / serendipitous retrieval | 3 | R1 | `NOT_PLANNED` | — | — | — |
| **R12** | Stakes-weighted, plateau-aware effort allocation | 3 | R1 | `NOT_PLANNED` | — | — | — |
| **R13** | Learn from trajectories + rejections, not only approvals | 3 | R1 | `NOT_PLANNED` | — | — | — |
| **R14** | Uncertainty-routed human review | 3 | R1 | `NOT_PLANNED` | — | — | — |
| **R15** | Imagery/art-direction assessment + graphic-element capability | 3 | R1 | `NOT_PLANNED` | — | — | — |
| **R16** | Real-world outcome signal calibrates taste against results | 4 | R1 (+ deployment data) | `NOT_PLANNED` | — | — | — |
| **R17** | Aesthetic-aging + long-horizon Library simulation (guards H6) | 4 | R1 | `NOT_PLANNED` | — | — | — |
| **R18** | Goal-fit via explicit UX/conversion heuristics | 4 | R1 | `NOT_PLANNED` | — | — | — |

---

## Currently in progress

*Nothing yet — R1's plan exists but no task has been started. First action: R1.0 (audit & green-baseline the repo).*

## Next up

1. **Execute R1**, in full, tasks R1.0 → R1.12, in order (`plans/R1-benchmark-implementation-plan.md`). R1's plan is written but **no task has been run yet** — its status stays `PLANNED`, not `IN_PROGRESS`, until R1.0 actually starts.
2. **Execute R2** once R1 is `DONE` (`plans/R2-human-feedback-channel-implementation-plan.md`) — its own task R2.0 re-checks this gate.
3. **Plan authoring continues in tier order:** R3 is next to be *planned* (full depth, one at a time, per the agreed approach) — R3 and R4 are both Tier 1 and both depend only on R1+R2, so either could be planned next; R3 (constitution-grounding) is the more natural next plan since it only needs R1, not R2's richer data.

## Blockers / open questions

- **R1 rater count:** R1 needs ≥2 human raters for inter-rater reliability (spec/18 §2.2); as a solo developer this needs a decision (rate twice yourself across time vs. recruit 1–2 outside raters). Logged in `plans/R1-OPEN-QUESTIONS.md` once R1.0 is run; tracked here until resolved.
- **Existing scaffolding audit (knowledge/open-questions.md #8):** the pre-existing `src/*` code spans all phases (0–4) already — R1's task R1.0 partially covers this (typecheck + tests green), but a full reconciliation against `IMPLEMENTATION_PLAN.md`'s phase gating is still open. Not blocking R1, but should be resolved before R2+ builds on top of Phase-2/3 files (`library.ts`, `calibration.ts`) that may predate current conventions.

---

## Conventions this tracker follows

- **One plan file per bet**, named `plans/R<N>-<slug>-implementation-plan.md`, structured like R1's: rules for the implementer → acceptance test → architecture (with a Mermaid UML flow diagram) → numbered dependency-ordered tasks, each with exact schemas/signatures and a `DONE WHEN:` runnable check → final acceptance checklist → appendices for any non-trivial formulas.
- **Every plan gets a UML/data-flow diagram** (Mermaid, matching the style already used throughout `spec/`) in its "Architecture at a glance" section, added before task-writing begins — not retrofitted after, going forward.
- **Spec files are never rewritten for progress** — each `spec/18`–`35` file gets a short **"Implementation Status"** section appended at the bottom (see `spec/18` for the pattern): status, a link to its plan file, and observed metrics *only once actually measured* (spec's own "report observed, never predicted" rule, `08 §4`). This file (`EXECUTION-TRACKER.md`) is the live status; the spec footer is a pointer to it plus a permanent record of final observed numbers once a bet completes.
- **Update this file, not just the plan file**, whenever a task finishes — this is the one place a human (or another AI session) checks first.
