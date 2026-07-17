# AGENTS.md — Autonomous Design Engine (ADE)

> Instructions for any AI coding agent (Codex, Claude Code, Antigravity, or other) working in this directory. **This file is intentionally thin** — it points at the real content rather than duplicating it, so there is exactly one place to update, not one per tool.

## Read these, in order

1. **[`knowledge/README.md`](./knowledge/README.md)** — the shared, cross-agent context/history for this project. Explains why it exists and how to use it.
2. **[`spec/README.md`](./spec/README.md)** — the canonical system specification (docs `00`–`15`). This is the authoritative design; nothing here should contradict it.
3. **[`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md)** — the canonical, phase-gated build plan.
4. **[`knowledge/decisions-and-conventions.md`](./knowledge/decisions-and-conventions.md)** — fast-reference for load-bearing decisions before you start coding.
5. **[`knowledge/open-questions.md`](./knowledge/open-questions.md)** — things that need a human decision; check before assuming.
6. **[`END_GOAL_FEASIBILITY_CONTRACT.md`](./END_GOAL_FEASIBILITY_CONTRACT.md)** — the ratified feasibility findings (CF/CA series); and **[`CONTRACT_EXECUTION_PLAN.md`](./CONTRACT_EXECUTION_PLAN.md)** — the plan executing them. `ARCHITECTURE_INVESTIGATION.md` and `prompt.md` are the investigation record behind them. Research-engine disposition: see D1 in the execution plan.

## Rules that override defaults (do not skip this section)

- **This project is standalone.** It is its own Node+TypeScript project under `future-pipeline/autonomous-design-engine/` — **not** a Turborepo workspace, **not** part of the wider TroopHunter monorepo build, and it must **never** cross-import from `packages/*`, `microservices/*`, or `microfrontend/*` at the repo root. The root-level `CLAUDE.md`/`AGENTS.md` for the TroopHunter monorepo do **not** apply here — this file is the one that does.
- **Never set `ANTHROPIC_API_KEY`.** Dev/R&D runs on the Claude Pro plan's Agent-SDK credit via `claude login` (OAuth) through `ADE_PROVIDER=agent-sdk`. Setting the API key env var forces API billing and defeats the entire point of the access model. A paid API key is a Phase-4-only, production-only config (`ADE_PROVIDER=api`). See `knowledge/decisions-and-conventions.md` for the full provider table.
- **Build phases in strict order** (Phase 0 → 1 → 2 → 3 → 4). Do not start a phase until the previous phase's completion criteria in `IMPLEMENTATION_PLAN.md` actually pass. Each phase is gated on a falsifiable hypothesis (`spec/08`) — if a gate fails, stop and rethink rather than pushing forward.
- **The spec is canonical for design; the plan is canonical for build sequence.** If you need to change how the system is designed (not just how it's built), that's a `spec/` change — do it there first, then reflect it in the plan, matching the pattern already used for the Phase-Exit Review concept (see `knowledge/chat-history.md §§5–7`).
- **15 invariants, not 13.** If you see anything referencing fewer than 15 invariants, it's stale — invariants I14 (Sandbox Isolation) and I15 (Delivery Gate sequence) were added during Phase 4 specification. See `spec/11 §8`.
- **Before writing implementation code, check `knowledge/open-questions.md` item 8** — there is already Phase-0 scaffolding in this directory (`src/`, `tests/`, `harness/`, `spike.ts`) from an earlier session not covered by the knowledge base's chat history. Read it directly and reconcile against the current plan before assuming it needs to be built from scratch or is already correct.
- **`spec/15` is deleted** (owner rewrite pending). Until restored, `IMPLEMENTATION_PLAN.md` + `CONTRACT_EXECUTION_PLAN.md` are the execution authority; the 'significantly improved' bar survives in `knowledge/decisions-and-conventions.md`.

## What this project is, in one paragraph

ADE is a system that autonomously designs websites/products from a business brief via a closed **generate → render → screenshot → critique → edit** loop (the "Eyes"), governed by a soft/hard authority model (autonomy in *how* it designs, hard law in *what* it must obey — brand, design system, brief, quality floor), two memories with opposite jobs (a soft cross-project Library that gets smarter vs. hard per-client Brand/Design-System stores that stay consistent), and a deterministic Guardrail Layer that owns everything objectively checkable so the LLM Critic only ever judges genuinely subjective quality. It is being built in gated phases, each proving a specific hypothesis before the next is attempted, by a single developer at roughly 8 hours/week — see `IMPLEMENTATION_PLAN.md` and `CONTRACT_EXECUTION_PLAN.md` for what that actually implies about pacing and priority.
