---
name: decisions-and-conventions
type: knowledge-base / quick-reference
scope: autonomous-design-engine (ADE)
purpose: >
  Fast-scan index of load-bearing decisions and standing conventions for ADE.
  This is a DISTILLATION for quick lookup, not the full record — see
  chat-history.md for complete reasoning, and the spec/plan files themselves
  for authoritative current detail. If this file and a spec/plan file disagree,
  the spec/plan file is correct (this file may lag).
---

# ADE — Decisions & Conventions (quick reference)

> Read this first if you just need "what did we decide and why," without the full narrative. Every row links to where the full reasoning lives.

## Access model / provider (load-bearing, do not violate)

| Decision | Detail |
|---|---|
| Dev provider | `@anthropic-ai/claude-agent-sdk` on the **Claude Pro plan's Agent-SDK credit**, auth via `claude login` (OAuth) |
| **Hard rule** | **Never set `ANTHROPIC_API_KEY`** in dev/local config — its mere presence forces API billing, defeating the whole point |
| Prod provider | Real Anthropic API key — **deferred to Phase 4 only** |
| Local fallback | Ollama, for offline/degraded operation |
| Why | User has a Pro plan only and will not buy a paid API key/SDK for dev/R&D. This was clarified across multiple prior sessions — don't re-suggest "just get an API key" for dev |
| Embeddings (Phase 2) | No first-party Anthropic embeddings API; Pro credit doesn't cover paid third-party embeddings either → **extend the `local`/Ollama provider with a local embedding model** to stay key-free. A paid embeddings API is explicitly the prod-only alternative |

## Model-to-role assignment

| Role | Assignment | Why |
|---|---|---|
| **Critic** (incl. Phase-Exit Reviews) | **Strongest available model** | It is the system's quality ceiling and weakest link (failure F-JDG-01) — do not downgrade it |
| **Generator** | Cheaper model (e.g. Sonnet-tier) is fine | Most-called role (N variations × iterations); the loop's own critique-and-edit mechanism corrects for a weaker draft. Matches the spec's own stated preference (`02 §5`, `09 §3`) |
| **Orchestrator** | Cheap/thin model | Mostly deterministic policy + one cheap "Brief Comprehension" call — does not need a frontier model |
| Config requirement | Keep `criticModelId` / `genModelId` separable in config from day one, even if both point at the same model initially |
| Model naming (correct as of this conversation) | **Fable 5** (`claude-fable-5`), **Opus 4.8** (`claude-opus-4-8`), **Sonnet 4.6** (`claude-sonnet-4-6`), **Haiku 4.5** (`claude-haiku-4-5`). There is no "Sonnet 5." |

## The Phase-Exit Review (a core architectural concept — spec `11 §2.3`, invariant I13)

- **What it is:** the same composite gate the section loop already uses (`deterministic checks ∧ fresh-context Critic review`), applied to **three additional boundaries** that previously had no automated review: **Brand Foundation** (before human approval), **Project Design System / crystallization** (before freeze), **Library entry / write-back** (before insert).
- **What it is NOT:** not a new component, not a monolithic "master judge," not a replacement for human approval at high-stakes boundaries, not an iterative loop (it's a **bounded** gate — ≤1–2 review→fix→re-check cycles, then escalate).
- **Why it exists:** those three artifacts become *law* for everything downstream, and today they reach a human with zero automated scrutiny (closes failures F-BRD-01, F-PDS-01, F-WB-02).
- **The Critic gets a different rubric per boundary** because brand/PDS/library are *data/strategy* artifacts, not rendered pixels — see `spec/11 §2.3`'s rubric table.
- **Not built in Phase 0** (no hard stores/Library exist yet) — arrives in Phase 1 (brand, PDS) and Phase 2 (library).

## The R&D / continuous-improvement layer (specs 12–14)

| Concept | One-line summary | Doc |
|---|---|---|
| **Inner loop vs. outer loop** | ADE has the inner loop (generate→critique→revise) but was missing the outer loop (constitution + preference data + reward model + standing evals) that makes Constitutional AI *compound* across generations | `14 §1` |
| **Design Constitution** | Thin (~8 principles + rationale, not rules), explicitly states what it does NOT prescribe, self-amends (system proposes, human ratifies, versioned, retirable) | `12` |
| **Evaluation Charter** | Small, human-owned, held-out "golden core" benchmark; system can propose new eval cases (frontier), human ratifies; the anchor that makes autonomy trustworthy rather than self-graded | `13` |
| **Research Agenda** | Full gap map (A–N + cross-cutting X1–X4) as 18 falsifiable bets (R1–R18), tiered by dependency: **R1 (benchmark) and R2 (human-feedback channel) must come first**, then R3 (constitution-grounding) + R4 (reward model), then the rest | `14` |
| **Governing philosophy** | "Seed thin, grow living, anchor human" — rules/prescriptions must stay thin (they cap the AI's route); evaluation/ground-truth must NOT stay thin in *method* (only in size) — thinning the anchor removes the target, it doesn't free the AI | `14 §1`, chat-history §9 |

## File/directory conventions

| Item | Convention |
|---|---|
| Trace format | **`trace.jsonl`** (JSONL, one `RunRecord` per line) — never a JSON array (can't be atomically appended) |
| Phase 0 output path | `runs/<out>/` |
| Phase 1+ output path | migrates to `./projects/<client>/` (spec `03 §8`) — keep the writer path-configurable |
| Generator output (Phase 0) | **exactly one self-contained `.tsx`** file; multi-file `supporting/*.tsx` output is deferred to Phase 1 |
| Import allowlist (Phase 0) | **`react` only** — no icon/image/UI libraries; hallucinated imports break builds |
| Tailwind in the harness | **Play CDN** (`<script src="https://cdn.tailwindcss.com">`), not a build-time `content` scan — the candidate file is written at runtime, so JIT must happen in-browser |
| Render readiness signal | `window.__ADE_READY_ID__ === candidateId` — a **per-candidate nonce**, never a boolean (a boolean can go stale between candidates) |
| Temperatures | `genTemperature = 0.7` (Generator should diverge); `criticTemperature = 0.2` (Critic should stay stable) |
| Budget caps | `maxRunTokens` / `maxRunSeconds` / `maxModelCalls` — exceeding any ends the run `ESCALATED`, never silently |
| `--refs` in Phase 0 | Accepted as an explicit **no-op** flag; wired for real in Phase 2 |
| Invariant count | **13** (I1–I13; I13 added for Phase-Exit Review) — if you see "12 invariants" anywhere, that's stale |

## H-series hypotheses (what each phase must prove — spec `08`)

| Hyp. | One-line | Proven in (this plan's phase numbering) |
|---|---|---|
| H1 | Seeing its own render measurably improves an agent's output | Phase 0 — **the load-bearing one; if this fails, stop and rethink, do not build further** |
| H2 | Brief-only design reaches a human "good/close" bar | Phase 0 (viability signal), refined later |
| H3 | Pairwise ranking > absolute scoring; Critic↔human agreement measurable without ground truth | Phase 0 (first signal) → Phase 3 (proven) |
| H4 | Crystallization keeps sections consistent (zero token drift) without monotony | Phase 1 |
| H5 | A shared Brand keeps website↔product recognizably one brand | Phase 1 (setup) → Phase 4 |
| H6 | The Library makes project N+1 better/faster than N (compounding) | Phase 2 |
| H7 | Context/token cost stays flat regardless of refs/Library size | Instrumented from Phase 0, proven at scale later |
| H8 | Critic verdicts can be calibrated toward human verdicts over time | Phase 3 — open-ended, never fully "done" |

**Note the plan's phase numbering is 0-indexed; spec `08`/`09` use 1-indexed "phase 1/2/3" language — see the mapping table in `IMPLEMENTATION_PLAN.md`'s rule 7.**

## The "significantly improved" bar (spec `15 §6`)

ADE is **significantly improved** when, unattended, it can take a brief and produce a consistent multi-section artifact that: (a) passes the deterministic floor, (b) demonstrably improves across iterations (H1), (c) a human rates good-or-close ≥50% of the time (H2), (d) holds zero token drift across sections (H4), and (e) at least one outer-loop bet (e.g. R3) shows a *measured* gain on the benchmark. This is **not** full autonomy — that remains the long-term north star.

Estimated at this cadence (solo, ~8 hrs/week): **≈ 12–18 months** (= Phase 0 + Phase 1 + R1 + R3).

## Known project state as of this writing (not something this conversation built, discovered while writing this knowledge base)

Real Phase-0 implementation scaffolding **already exists** at `future-pipeline/autonomous-design-engine/`: `src/`, `tests/`, `harness/`, `briefs/`, `spike.ts`, `package.json` (+ installed `node_modules/`), `.env.example`, `tsconfig.json`, `vitest.config.ts`, and an `old-design-experiment/` folder. File timestamps place this **before** the planning/R&D conversation that produced specs `10`(red-team)/`12`–`15`. **This knowledge base does not describe the code's contents** — read it directly; it was never discussed in the conversation this knowledge base preserves.
