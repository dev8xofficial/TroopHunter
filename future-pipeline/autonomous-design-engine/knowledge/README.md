# ADE — Shared Knowledge Base (cross-agent)

> **This folder is the single, canonical place where context about ADE's planning history lives — readable by any AI coding agent working in this repository** (Claude Code, Codex, Antigravity, or any future tool), not just whichever one happened to have the conversation. It exists because working across multiple AI tools means no single tool's private memory/context is visible to the others — the fix is one shared, plain-file location committed to the repo, not a separate memory file per tool.

## Why this exists (read once)

The project owner works across several AI coding agents. Each tool has its own private conventions for "memory" or "instructions" (Claude Code's own memory system, Codex's `AGENTS.md`, etc.), and those are **invisible to each other** — information one tool's session produces doesn't reach the others. The fix adopted here:

1. **One canonical knowledge base** (this folder), plain Markdown, committed to git — any tool operating on this working directory can read it with no special integration.
2. **Each tool's own instruction file becomes a thin pointer to here**, not a duplicate copy of the content. See `../AGENTS.md` and `../CLAUDE.md`.
3. **Organized by content type**, not by tool or by raw chronology, so it stays useful as it grows.

## What's in this folder

| File | What it's for | Read it when |
|---|---|---|
| [`chat-history.md`](./chat-history.md) | The **complete, non-abridged record** of the planning/R&D conversation that produced `spec/10`'s red-team pass and `spec/12`–`15` plus the hardening of `IMPLEMENTATION_PLAN.md`. Written to be comprehensive, not distilled — nothing was skipped, per explicit request. | You need to understand **why** the spec/plan say what they say, not just what they say |
| [`decisions-and-conventions.md`](./decisions-and-conventions.md) | A fast-scan distillation of the load-bearing decisions (access model, model-role assignment, file/naming conventions, the Phase-Exit Review concept, the hypothesis table) | You need a quick answer and don't have time for the full narrative |
| [`open-questions.md`](./open-questions.md) | Standing questions that need a **human** decision before certain work can proceed confidently (e.g. "what is ADE actually for") | You're about to make a decision that depends on one of these, or you got an answer from the user and should record it here |

## The authority order (what wins if things disagree)

```
spec/*.md  and  IMPLEMENTATION_PLAN.md         ← AUTHORITATIVE current design & build plan
        ↑
        is explained/motivated by
        ↑
knowledge/chat-history.md                       ← the reasoning trail (historical record)
knowledge/decisions-and-conventions.md          ← quick-reference distillation of the same
knowledge/open-questions.md                     ← things not yet decided
```

If `chat-history.md` says one thing and a current spec file says another, **the spec file is correct** — this knowledge base is a record of how we got here, not a live source of truth. If you find a disagreement, that's a signal the knowledge base needs a small update, not that the spec is wrong.

## How to use this folder as an AI agent

1. Before starting non-trivial ADE work, skim `decisions-and-conventions.md` (short) and check `open-questions.md` for anything relevant to your task.
2. If you need deep context on a specific past decision, search `chat-history.md` by topic (it has a table of contents).
3. **After a substantive session that produces a real decision, fact, or resolved question** — append a short, distilled entry to `decisions-and-conventions.md` (or resolve/remove an item in `open-questions.md`). **Do not** dump another raw transcript here; `chat-history.md` was a one-time, explicitly-requested exception to full-preserve one specific conversation, not the ongoing pattern. Going forward, distill.
4. If you're a *human* reading this to get oriented: start with `decisions-and-conventions.md`, then `spec/README.md` for the actual system design.

## Related, not duplicated here

- **`../spec/`** — the canonical system specification (docs `00`–`15`). Do not copy its content here; link to it.
- **`../IMPLEMENTATION_PLAN.md`** — the canonical build plan.
- **`../AGENTS.md`** / **`../CLAUDE.md`** — thin, tool-specific pointers into this folder and into `spec/`. Keep them thin; put real content here or in `spec/`, never duplicate it into those files.
