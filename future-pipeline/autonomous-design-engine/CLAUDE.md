# CLAUDE.md — Autonomous Design Engine (ADE)

> This project is **standalone** — not part of the TroopHunter monorepo above it. The monorepo's root `CLAUDE.md` (Turborepo, `npm` workspaces, `microfrontend/ferrari`, etc.) does **not** apply inside this directory. This file is deliberately thin; the real content lives in **[`AGENTS.md`](./AGENTS.md)** in this same folder — read that first. (It's kept as the single source so Claude Code, Codex, and any other tool stay in sync from one file, not near-duplicate copies.)

**The one rule to never violate, repeated here because it's easy to get wrong by habit:** dev/R&D runs on the Claude Pro plan's Agent-SDK credit — **never set `ANTHROPIC_API_KEY`** anywhere in this project's dev config or environment. Its presence forces API billing and breaks the entire access model. See `AGENTS.md` and `knowledge/decisions-and-conventions.md` for the full picture.

Everything else - architecture, build order, conventions, open questions - is in [`AGENTS.md`](./AGENTS.md), [`spec/`](./spec/), [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md), and [`knowledge/`](./knowledge/). `investigations/END_GOAL_FEASIBILITY_CONTRACT.md` contains the ratified feasibility findings, executed by `CONTRACT_EXECUTION_PLAN.md` (for the research methodology, see `knowledge/research-method.md`).
