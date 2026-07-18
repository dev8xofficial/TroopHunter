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

## Scope & Target (Decision D2)

**Ratified Scope (Default):** ADE's target is strictly **composition/UI-design intelligence** (layout, typography, color, componentry under brand law). Copy, imagery/art-direction, iconography, and motion authoring are **out of scope** unless later funded as named phases (R15-class). Furthermore, EG-8 "complex design workflows" (multi-page, forms, email, dashboards) is **outside the current architecture** — any future expansion must go through the per-surface capability checklist (plan C3.7).

## Ratification of Feasibility Contract & Execution Plan (Decision D4)

**Ratification Date:** 2026-07-23  
**Status:** **All Contract Amendments (CA-1 through CA-21) ACCEPTED.**  
- **Strategy Layer Unlocked**: M15/E2.4 (strategy layer) is officially unblocked for future phases because D3's North Star commitment includes EG-2.
- **Meta-Work Moratorium Active**: After Phase D, no *new* spec/meta document may be created until the H1 gate has data. R/M-chunk edits to existing documents are exempt, but any entirely new investigations require an explicit owner commission.

## Access model / provider (load-bearing, do not violate)

| Decision | Detail |
|---|---|
| Dev provider & fallback | `ADE_PROVIDER` selects the active implementation: `agent-sdk` (default dev, Pro-credit OAuth, **no `ANTHROPIC_API_KEY`**), `api` (prod, real key), `local` (Ollama fallback). Every call records the resolved model id and active provider into the trace. |
| Prod provider | Real Anthropic API key — **deferred to Phase 4 only** |
| Local fallback | Ollama, for offline/degraded operation |
| Model roles (separable in config from day one) | **Critic** = strongest model (quality ceiling; do not downgrade). **Generator** = cheaper (Sonnet-tier) is fine. **Orchestrator** = cheap/thin. Expose `criticModelId` / `genModelId` / `orchestratorModelId` as distinct fields. |
| Why | User has a Pro plan only and will not buy a paid API key/SDK for dev/R&D. This was clarified across multiple prior sessions — don't re-suggest "just get an API key" for dev |
| Embeddings (Phase 2) | No first-party Anthropic embeddings API; Pro credit doesn't cover paid third-party embeddings either → **extend the `local`/Ollama provider with a local embedding model** to stay key-free. A paid embeddings API is explicitly the prod-only alternative |

## Model-to-role assignment

| Role | Assignment | Why |
|---|---|---|
| **Critic** (incl. Phase-Exit Reviews) | **Strongest available model** | It is the system's quality ceiling and weakest link (failure F-JDG-01) — do not downgrade it |
| **Generator** | Cheaper model (e.g. Sonnet-tier) is fine | Most-called role (N variations × iterations); the loop's own critique-and-edit mechanism corrects for a weaker draft. Matches the spec's own stated preference (`02 §5`, `09 §3`) |
| **Orchestrator** | Cheap/thin model | Mostly deterministic policy + one cheap "Brief Comprehension" call — does not need a frontier model |
| Config requirement | Keep `criticModelId` / `genModelId` / `orchestratorModelId` as **three separate config fields** from day one — even if all point at the same model initially. Every model call records the resolved model id and active provider into the trace. |
| Model naming (correct as of this conversation) | **Fable 5** (`claude-fable-5`), **Opus 4.8** (`claude-opus-4-8`), **Sonnet 4.6** (`claude-sonnet-4-6`), **Haiku 4.5** (`claude-haiku-4-5`). There is no "Sonnet 5." **Update:** as of 2026-07, **Sonnet 5 (`claude-sonnet-5`) exists**; the "there is no Sonnet 5" note was correct only at time of writing; re-verify pinned ids at S3/C0.0. |

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
| Invariant count | **15** (I1–I15; I14 Sandbox Isolation and I15 Delivery-Gate sequence added during Phase-4 specification) — anything citing fewer is stale |

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

**Updated commitment: ~3–4 hrs/day (~21–25 effective hrs/week), not the original ~1 hr/day (~8 hrs/week).** Estimated at the new cadence: **≈ 4–6 months** (= Phase 0 + Phase 1 + R1 + R3) — down from ≈ 12–18 months, because build-heavy phases compress close to linearly with hours/day. Note: Phase 2 onward (H6, H8) does **not** compress as cleanly — those need real accumulated projects/verdicts over calendar time, not just coding hours. Full detail + the "hours/week is a re-pluggable parameter" framing: `spec/15 §0, §1, §4, §6`.

## The problem ledger (spec `15 §2.1`)

Every area in the failure catalogue (`10`) and every research bet (`14`) is assigned an explicit bucket — **NOW** (Phase 0), **NEXT** (Phase 1 + R1/R3), **LATER** (Phase 2–4 + R2/R4+), or **DEFERRED / accepted risk** (an explicit, logged decision not to solve something at this scope, e.g. full production-hardening, non-marketing surfaces, accessibility depth beyond axe-core — revisit only if the purpose question below resolves toward "product"). The Phase-0 weekly table (`15 §3`) additionally tags which specific failure IDs each week's work closes, so "which problem gets solved which week" is explicit, not implicit.

## Known project state as of this writing (not something this conversation built, discovered while writing this knowledge base)

Real Phase-0 implementation scaffolding **already exists** at `future-pipeline/autonomous-design-engine/`: `src/`, `tests/`, `harness/`, `briefs/`, `spike.ts`, `package.json` (+ installed `node_modules/`), `.env.example`, `tsconfig.json`, `vitest.config.ts`, and an `old-design-experiment/` folder. File timestamps place this **before** the planning/R&D conversation that produced specs `10`(red-team)/`12`–`15`. **This knowledge base does not describe the code's contents** — read it directly; it was never discussed in the conversation this knowledge base preserves.

**Update:** the Phase-0 scaffolding was **deleted** in commit `28a951a9` (empty `src/` remains); restorable from `28484962`; restoration decision tracked in this plan's S1.

## The execution plan and the "detailed specification per phase" convention (load-bearing — read before doing any phase work)

The **single authoritative execution plan is [`spec/15-execution-roadmap.md`](../spec/15-execution-roadmap.md)** — phase-gated (0 → 1 → 2 → 3 → 4), with the problem ledger (`15 §2.1`) bucketing every failure area and research bet into NOW/NEXT/LATER/DEFERRED. There is no other execution plan; when the question is "what do I do next / will this resolve the failures," the answer comes from `spec/15`, not from anywhere else.

**Convention: executing a phase produces a "detailed specification" doc for that phase** (a consolidation of the canonical design docs into one buildable spec, grounded against the actual `src/` code). Mapping:

| Phase | Detailed spec | Note |
|---|---|---|
| Phase 0 (Eyes/MVP) | [`spec/16`](../spec/16-phase-0-detailed-specification.md) | — |
| Phase 1 (Brand + Consistency) | [`spec/17`](../spec/17-phase-1-detailed-specification.md) | — |
| Phase 2 (Memory / Library) | [`spec/36`](../spec/36-phase-2-detailed-specification.md) | numbered **36**, not 18, because `18–35` were already taken by the R-series (below). It is a **sibling of 16/17**, not part of the R-series. |
| Phase 3 / Phase 4 | (future) | would continue at 37 / 38 by the same rule. |

**Standing conventions for these phase specs** (apply when writing or deepening one): a **revision-history footer** at the bottom (mirroring `10-failure-modes.md`'s style); **Mermaid diagrams** (sequence / state / data-flow / ER) matching the style used across `spec/`; a **failure-coverage map** tying the phase to the specific `F-*` IDs it closes; and honest grounding against the real `src/` code — where the code diverges from the design, say so in the spec (e.g. `spec/36` flags that the Phase-2 abstraction-altitude Phase-Exit Review is specified but not yet implemented, and that the default hash-embedding must not be used to evaluate H6).

**Update:** `spec/15` deleted mid-rewrite; `16/17/36` not on disk; the mapping table describes the **target convention**, not current state; interim execution authority = `IMPLEMENTATION_PLAN.md` + `CONTRACT_EXECUTION_PLAN.md` (per R7).

## `IMPLEMENTATION_PLAN.md` now exists (the failure-driven, phase-gated build plan)

`AGENTS.md` has always pointed at `IMPLEMENTATION_PLAN.md` as "the canonical, phase-gated build plan," but the file did not exist until this session. It now does, at the **ADE root** (sibling of `AGENTS.md`, above `spec/`). What it is:

- **Purpose:** sequences the `spec/11` solutions (Guardrail Layer, MP-1…17, invariants I1–I13, Phase-Exit Review) and the **entire** failure catalogue (`spec/10a`–`10e`, "Failures A–E") into **small, ordered, implementable chunks** grouped by phase gate (0→4). It is a *sequencer + detailer*, not a new design — spec stays canonical.
- **Structure:** organized by ADE phase (0→4), not by failure area. Each chunk carries `Closes: F-*` / `Implements: MP/I/gate` / `Depends on` / `Spec source` / `Build` / `Done when`. Phase 0 = Eyes MVP (H1), 1 = Brand+Consistency (H4), 2 = Library (H6), 3 = Taste (H3/H8), 4 = Production hardening.
- **Coverage is verified, not asserted:** §8 is a complete failure→chunk index; a mechanical cross-check confirmed **every** catalogue `F-*` ID maps to a chunk and the plan invents none. §7 maps each invariant I1–I13 to the chunk that introduces it. R-bets are tagged `[R]`, deferred/accepted-risk items `[D]`; only R1–R4 are threaded in, consistent with the R-series rule below.
- **Two spec inconsistencies flagged (plan §9), not silently fixed:** (1) `spec/README.md` Step 0 still lists `ANTHROPIC_API_KEY` for the build phase — stale vs the no-key dev rule (key is Phase-4/prod-only); (2) `spec/README.md` advertises docs 15–36 as complete but only `00`–`14`(+`10a`–`e`) are on disk (`15` mid-rewrite by the owner).
- **Relationship to `spec/15`:** distinct artifact. `spec/15` is the execution *roadmap* (weekly cadence, kill-gates, solo-hours pacing); `IMPLEMENTATION_PLAN.md` is the phase-gated *build chunking* keyed to failures. They must stay consistent; when `15` is restored, re-verify cross-links.

## The Research Engine (`research-engine/` — how ADE researches and improves *itself*)

A standalone **meta-capability** formerly built at `future-pipeline/autonomous-design-engine/research-engine/`. Not part of ADE's runtime; its job is continuous, evidence-driven **architectural evolution** of ADE. It **proposes; a human ratifies; only then does ADE change** — it never edits `spec/` or `IMPLEMENTATION_PLAN.md` as an accepted change on its own. Full detail now lives in `investigations/` and `knowledge/research-method.md` (canonical); this is the distillation.

| Decision | Detail |
|---|---|
| **Origin** | Replaces six ChatGPT-generated "manifesto" drafts (all values, no machinery; multi-agent *theater*; empirical language for a paper system; no ground-truth anchor). Originals preserved in `research-engine/_archive/` (superseded). |
| **Canonical docs** | `README` + `00-charter` (why) · `01-operating-model` (**the engine**) · `02-roles-and-diversity` · `03-areas` (**the spine**) · `04-instruments` · `05-artifacts-and-integration` · `06-governance-and-integrity`; plus `templates/` and `areas/_registry.md`. |
| **Area system (domain-agnostic spine)** | The engine takes an **Area** as input and researches **one at a time**. It carries **no hardcoded catalogue of ADE's subsystems** — pointed at an Area it **discovers** the relevant parts itself during Reconstruct. Adding a future Area = 1 registry row + 1 Area Card, **no engine change**. |
| **Registry is HUMAN-OWNED** | The developer adds Areas and picks which runs next; the engine never invents or reorders them. Current program = **14 phases**: P1 Architecture (highest) · P2 Intelligence · P3 Learning · P4 Evaluation · P5 Autonomy · P6 Generator · P7 Critic · P8 Vision (Eyes) · P9 Knowledge · P10 Human Collaboration · P11 Robustness · P12 Scaling · P13 Production · P14 Research-Agenda Meta-Layer. **Do not re-seed subsystem Areas into the registry** — that was explicitly removed. |
| **"No question limits" (owner's hard constraint)** | Honored via **Divergence → Convergence**: generation is **unbounded** (surface everything, incl. questions the owner never thought to ask), then **ruthless triage** by **EVI = (impact × probability × reversibility) / cost**; investigate top-N now, **park the rest in a permanent, never-deleted Backlog.** Freedom in what's surfaced; discipline in what's spent. |
| **Evidence Ladder (caps confidence)** | T0 reasoning→**Low** · T1 precedent / T2 worked-example→**Medium** · T3 offline empirical (ablation / **Golden Core benchmark delta**)→**High** · T4 production→**Very High**. **Confidence may never exceed its tier.** T3 anchors to ADE's own Evaluation Charter (`spec/13`) — no private notion of "better." |
| **Paper vs empirical mode** | Default **paper** today (spec is the subject; ADE has ~no code); empirical instruments unlock per-Area as code lands. |
| **Real diversity, not theater** | Agreement among same-model/same-context "agents" ≈ **zero evidence**. Independence comes from different models / info-slices / fresh context, and giving the Attacker a concrete **falsification payoff**. Core functions always present + domain lenses selected per Area. |
| **Anti-bias (a find-weaknesses engine must self-police)** | **Pre-registration** of expected findings; **mandatory steelman of the status quo** before recommending any change; **null-result parity** (a confirmed assumption is a first-class win); simplicity bias (removing complexity beats adding it). |
| **Success metric** | **Validated deltas** — accepted recommendations that produced a measured T3+ gain or a confirmed prevented failure, per unit of effort — **NOT report count.** |
| **Interfaces & integration** | Human reads a **one-page Decision Record** (Accept/Reject/Defer/Needs-Evidence + "what would change our mind"); Accept → **spec change first**, then plan, then `failures/`. Knowledge Base **dogfoods ADE's own Library** mechanics (embed-vs-payload, confidence + decay, dedup, contradiction log). Proportionality tiers Light/Standard/Deep keep it affordable on Pro credit. |
| **Relationship to R1–R18 / H-series** | **Not a rival taxonomy** — executed *inside* whichever Phase's investigation reaches them, as Backlog items. |
| **Status** | v1, on disk, **uncommitted, never run.** Suggested first action: activate `P1 — Architecture Research`, write its Area Card, run one **Light** investigation to prove the engine end-to-end. |

**Critical distinction — the R-series (R1–R18) is NOT a parallel phase track and must never be treated as one.** `spec/14-research-agenda.md` (detailed in `spec/18`–`35`) is a **separate, optional menu of judgment/taste-improvement research bets**. `spec/15` only threads **four of the eighteen** into the actual plan, at specific weeks: **R1** (benchmark, Phase 1 wk17), **R2** (feedback channel, Phase 2 wk23), **R3 + R4** (constitution / reward model, Phase 3 wk28–33). **R5–R18 are explicitly LATER / DEFERRED — "may never be reached at solo scale"** (`15 §2.1`). Do **not** turn the R-series into a build checklist, and do **not** generate per-bet execution plans for R-bets unless `spec/15` actually schedules that bet at the current phase. When asked "what's next," check `spec/15`'s phase gate and problem ledger — never "which Rn is next in numeric order." (This distinction is recorded because it was previously misread — an Rn bet was treated as the next thing to build outside the phase plan; the correction is the point of this entry.)

**Update:** **engine deleted in `c2be66d0`**. As per decision D1, it was permanently superseded by the commissioned-investigation pattern. Investigations are stored in `investigations/` (e.g., `investigations/ARCHITECTURE_INVESTIGATION.md`, `investigations/END_GOAL_FEASIBILITY_CONTRACT.md`), deferred items in `investigations/BACKLOG.md`, and methodology in `knowledge/research-method.md`.

## S1 - Phase-0 Scaffolding Audit (Decision)

Restored Phase-0 scaffolding from commit `28484962`. Diffed config/trace/schema against `IMPLEMENTATION_PLAN.md` Appendix A/B.

| File | Decision | Reason |
|---|---|---|
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

## Scope & Target (Decision D2)

**Ratified Scope (Default):** ADE's target is strictly **composition/UI-design intelligence** (layout, typography, color, componentry under brand law). Copy, imagery/art-direction, iconography, and motion authoring are **out of scope** unless later funded as named phases (R15-class). Furthermore, EG-8 "complex design workflows" (multi-page, forms, email, dashboards) is **outside the current architecture** — any future expansion must go through the per-surface capability checklist (plan C3.7).

## Ratification of Feasibility Contract & Execution Plan (Decision D4)

**Ratification Date:** 2026-07-23  
**Status:** **All Contract Amendments (CA-1 through CA-21) ACCEPTED.**  
- **Strategy Layer Unlocked**: M15/E2.4 (strategy layer) is officially unblocked for future phases because D3's North Star commitment includes EG-2.
- **Meta-Work Moratorium Active**: After Phase D, no *new* spec/meta document may be created until the H1 gate has data. R/M-chunk edits to existing documents are exempt, but any entirely new investigations require an explicit owner commission.

## Access model / provider (load-bearing, do not violate)

| Decision | Detail |
|---|---|
| Dev provider & fallback | `ADE_PROVIDER` selects the active implementation: `agent-sdk` (default dev, Pro-credit OAuth, **no `ANTHROPIC_API_KEY`**), `api` (prod, real key), `local` (Ollama fallback). Every call records the resolved model id and active provider into the trace. |
| Prod provider | Real Anthropic API key — **deferred to Phase 4 only** |
| Local fallback | Ollama, for offline/degraded operation |
| Model roles (separable in config from day one) | **Critic** = strongest model (quality ceiling; do not downgrade). **Generator** = cheaper (Sonnet-tier) is fine. **Orchestrator** = cheap/thin. Expose `criticModelId` / `genModelId` / `orchestratorModelId` as distinct fields. |
| Why | User has a Pro plan only and will not buy a paid API key/SDK for dev/R&D. This was clarified across multiple prior sessions — don't re-suggest "just get an API key" for dev |
| Embeddings (Phase 2) | No first-party Anthropic embeddings API; Pro credit doesn't cover paid third-party embeddings either → **extend the `local`/Ollama provider with a local embedding model** to stay key-free. A paid embeddings API is explicitly the prod-only alternative |

## Model-to-role assignment

| Role | Assignment | Why |
|---|---|---|
| **Critic** (incl. Phase-Exit Reviews) | **Strongest available model** | It is the system's quality ceiling and weakest link (failure F-JDG-01) — do not downgrade it |
| **Generator** | Cheaper model (e.g. Sonnet-tier) is fine | Most-called role (N variations × iterations); the loop's own critique-and-edit mechanism corrects for a weaker draft. Matches the spec's own stated preference (`02 §5`, `09 §3`) |
| **Orchestrator** | Cheap/thin model | Mostly deterministic policy + one cheap "Brief Comprehension" call — does not need a frontier model |
| Config requirement | Keep `criticModelId` / `genModelId` / `orchestratorModelId` as **three separate config fields** from day one — even if all point at the same model initially. Every model call records the resolved model id and active provider into the trace. |
| Model naming (correct as of this conversation) | **Fable 5** (`claude-fable-5`), **Opus 4.8** (`claude-opus-4-8`), **Sonnet 4.6** (`claude-sonnet-4-6`), **Haiku 4.5** (`claude-haiku-4-5`). There is no "Sonnet 5." **Update:** as of 2026-07, **Sonnet 5 (`claude-sonnet-5`) exists**; the "there is no Sonnet 5" note was correct only at time of writing; re-verify pinned ids at S3/C0.0. |

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
| Invariant count | **15** (I1–I15; I14 Sandbox Isolation and I15 Delivery-Gate sequence added during Phase-4 specification) — anything citing fewer is stale |

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

**Updated commitment: ~3–4 hrs/day (~21–25 effective hrs/week), not the original ~1 hr/day (~8 hrs/week).** Estimated at the new cadence: **≈ 4–6 months** (= Phase 0 + Phase 1 + R1 + R3) — down from ≈ 12–18 months, because build-heavy phases compress close to linearly with hours/day. Note: Phase 2 onward (H6, H8) does **not** compress as cleanly — those need real accumulated projects/verdicts over calendar time, not just coding hours. Full detail + the "hours/week is a re-pluggable parameter" framing: `spec/15 §0, §1, §4, §6`.

## The problem ledger (spec `15 §2.1`)

Every area in the failure catalogue (`10`) and every research bet (`14`) is assigned an explicit bucket — **NOW** (Phase 0), **NEXT** (Phase 1 + R1/R3), **LATER** (Phase 2–4 + R2/R4+), or **DEFERRED / accepted risk** (an explicit, logged decision not to solve something at this scope, e.g. full production-hardening, non-marketing surfaces, accessibility depth beyond axe-core — revisit only if the purpose question below resolves toward "product"). The Phase-0 weekly table (`15 §3`) additionally tags which specific failure IDs each week's work closes, so "which problem gets solved which week" is explicit, not implicit.

## Known project state as of this writing (not something this conversation built, discovered while writing this knowledge base)

Real Phase-0 implementation scaffolding **already exists** at `future-pipeline/autonomous-design-engine/`: `src/`, `tests/`, `harness/`, `briefs/`, `spike.ts`, `package.json` (+ installed `node_modules/`), `.env.example`, `tsconfig.json`, `vitest.config.ts`, and an `old-design-experiment/` folder. File timestamps place this **before** the planning/R&D conversation that produced specs `10`(red-team)/`12`–`15`. **This knowledge base does not describe the code's contents** — read it directly; it was never discussed in the conversation this knowledge base preserves.

**Update:** the Phase-0 scaffolding was **deleted** in commit `28a951a9` (empty `src/` remains); restorable from `28484962`; restoration decision tracked in this plan's S1.

## The execution plan and the "detailed specification per phase" convention (load-bearing — read before doing any phase work)

The **single authoritative execution plan is [`spec/15-execution-roadmap.md`](../spec/15-execution-roadmap.md)** — phase-gated (0 → 1 → 2 → 3 → 4), with the problem ledger (`15 §2.1`) bucketing every failure area and research bet into NOW/NEXT/LATER/DEFERRED. There is no other execution plan; when the question is "what do I do next / will this resolve the failures," the answer comes from `spec/15`, not from anywhere else.

**Convention: executing a phase produces a "detailed specification" doc for that phase** (a consolidation of the canonical design docs into one buildable spec, grounded against the actual `src/` code). Mapping:

| Phase | Detailed spec | Note |
|---|---|---|
| Phase 0 (Eyes/MVP) | [`spec/16`](../spec/16-phase-0-detailed-specification.md) | — |
| Phase 1 (Brand + Consistency) | [`spec/17`](../spec/17-phase-1-detailed-specification.md) | — |
| Phase 2 (Memory / Library) | [`spec/36`](../spec/36-phase-2-detailed-specification.md) | numbered **36**, not 18, because `18–35` were already taken by the R-series (below). It is a **sibling of 16/17**, not part of the R-series. |
| Phase 3 / Phase 4 | (future) | would continue at 37 / 38 by the same rule. |

**Standing conventions for these phase specs** (apply when writing or deepening one): a **revision-history footer** at the bottom (mirroring `10-failure-modes.md's` style); **Mermaid diagrams** (sequence / state / data-flow / ER) matching the style used across `spec/`; a **failure-coverage map** tying the phase to the specific `F-*` IDs it closes; and honest grounding against the real `src/` code — where the code diverges from the design, say so in the spec (e.g. `spec/36` flags that the Phase-2 abstraction-altitude Phase-Exit Review is specified but not yet implemented, and that the default hash-embedding must not be used to evaluate H6).

**Update:** `spec/15` deleted mid-rewrite; `16/17/36` not on disk; the mapping table describes the **target convention**, not current state; interim execution authority = `IMPLEMENTATION_PLAN.md` + `CONTRACT_EXECUTION_PLAN.md` (per R7).

## `IMPLEMENTATION_PLAN.md` now exists (the failure-driven, phase-gated build plan)

`AGENTS.md` has always pointed at `IMPLEMENTATION_PLAN.md` as "the canonical, phase-gated build plan," but the file did not exist until this session. It now does, at the **ADE root** (sibling of `AGENTS.md`, above `spec/`). What it is:

- **Purpose:** sequences the `spec/11` solutions (Guardrail Layer, MP-1…17, invariants I1–I13, Phase-Exit Review) and the **entire** failure catalogue (`spec/10a`–`10e`, "Failures A–E") into **small, ordered, implementable chunks** grouped by phase gate (0→4). It is a *sequencer + detailer*, not a new design — spec stays canonical.
- **Structure:** organized by ADE phase (0→4), not by failure area. Each chunk carries `Closes: F-*` / `Implements: MP/I/gate` / `Depends on` / `Spec source` / `Build` / `Done when`. Phase 0 = Eyes MVP (H1), 1 = Brand+Consistency (H4), 2 = Library (H6), 3 = Taste (H3/H8), 4 = Production hardening.
- **Coverage is verified, not asserted:** §8 is a complete failure→chunk index; a mechanical cross-check confirmed **every** catalogue `F-*` ID maps to a chunk and the plan invents none. §7 maps each invariant I1–I13 to the chunk that introduces it. R-bets are tagged `[R]`, deferred/accepted-risk items `[D]`; only R1–R4 are threaded in, consistent with the R-series rule below.
- **Two spec inconsistencies flagged (plan §9), not silently fixed:** (1) `spec/README.md` Step 0 still lists `ANTHROPIC_API_KEY` for the build phase — stale vs the no-key dev rule (key is Phase-4/prod-only); (2) `spec/README.md` advertises docs 15–36 as complete but only `00`–`14`(+`10a`–`e`) are on disk (`15` mid-rewrite by the owner).
- **Relationship to `spec/15`:** distinct artifact. `spec/15` is the execution *roadmap* (weekly cadence, kill-gates, solo-hours pacing); `IMPLEMENTATION_PLAN.md` is the phase-gated *build chunking* keyed to failures. They must stay consistent; when `15` is restored, re-verify cross-links.

## The Research Engine (`research-engine/` — how ADE researches and improves *itself*)

A standalone **meta-capability** formerly built at `future-pipeline/autonomous-design-engine/research-engine/`. Not part of ADE's runtime; its job is continuous, evidence-driven **architectural evolution** of ADE. It **proposes; a human ratifies; only then does ADE change** — it never edits `spec/` or `IMPLEMENTATION_PLAN.md` as an accepted change on its own. Full detail now lives in `investigations/` and `knowledge/research-method.md` (canonical); this is the distillation.

| Decision | Detail |
|---|---|
| **Origin** | Replaces six ChatGPT-generated "manifesto" drafts (all values, no machinery; multi-agent *theater*; empirical language for a paper system; no ground-truth anchor). Originals preserved in `research-engine/_archive/` (superseded). |
| **Canonical docs** | `README` + `00-charter` (why) · `01-operating-model` (**the engine**) · `02-roles-and-diversity` · `03-areas` (**the spine**) · `04-instruments` · `05-artifacts-and-integration` · `06-governance-and-integrity`; plus `templates/` and `areas/_registry.md`. |
| **Area system (domain-agnostic spine)** | The engine takes an **Area** as input and researches **one at a time**. It carries **no hardcoded catalogue of ADE's subsystems** — pointed at an Area it **discovers** the relevant parts itself during Reconstruct. Adding a future Area = 1 registry row + 1 Area Card, **no engine change**. |
| **Registry is HUMAN-OWNED** | The developer adds Areas and picks which runs next; the engine never invents or reorders them. Current program = **14 phases**: P1 Architecture (highest) · P2 Intelligence · P3 Learning · P4 Evaluation · P5 Autonomy · P6 Generator · P7 Critic · P8 Vision (Eyes) · P9 Knowledge · P10 Human Collaboration · P11 Robustness · P12 Scaling · P13 Production · P14 Research-Agenda Meta-Layer. **Do not re-seed subsystem Areas into the registry** — that was explicitly removed. |
| **"No question limits" (owner's hard constraint)** | Honored via **Divergence → Convergence**: generation is **unbounded** (surface everything, incl. questions the owner never thought to ask), then **ruthless triage** by **EVI = (impact × probability × reversibility) / cost**; investigate top-N now, **park the rest in a permanent, never-deleted Backlog.** Freedom in what's surfaced; discipline in what's spent. |
| **Evidence Ladder (caps confidence)** | T0 reasoning→**Low** · T1 precedent / T2 worked-example→**Medium** · T3 offline empirical (ablation / **Golden Core benchmark delta**)→**High** · T4 production→**Very High**. **Confidence may never exceed its tier.** T3 anchors to ADE's own Evaluation Charter (`spec/13`) — no private notion of "better." |
| **Paper vs empirical mode** | Default **paper** today (spec is the subject; ADE has ~no code); empirical instruments unlock per-Area as code lands. |
| **Real diversity, not theater** | Agreement among same-model/same-context "agents" ≈ **zero evidence**. Independence comes from different models / info-slices / fresh context, and giving the Attacker a concrete **falsification payoff**. Core functions always present + domain lenses selected per Area. |
| **Anti-bias (a find-weaknesses engine must self-police)** | **Pre-registration** of expected findings; **mandatory steelman of the status quo** before recommending any change; **null-result parity** (a confirmed assumption is a first-class win); simplicity bias (removing complexity beats adding it). |
| **Success metric** | **Validated deltas** — accepted recommendations that produced a measured T3+ gain or a confirmed prevented failure, per unit of effort — **NOT report count.** |
| **Interfaces & integration** | Human reads a **one-page Decision Record** (Accept/Reject/Defer/Needs-Evidence + "what would change our mind"); Accept → **spec change first**, then plan, then `failures/`. Knowledge Base **dogfoods ADE's own Library** mechanics (embed-vs-payload, confidence + decay, dedup, contradiction log). Proportionality tiers Light/Standard/Deep keep it affordable on Pro credit. |
| **Relationship to R1–R18 / H-series** | **Not a rival taxonomy** — executed *inside* whichever Phase's investigation reaches them, as Backlog items. |
| **Status** | v1, on disk, **uncommitted, never run.** Suggested first action: activate `P1 — Architecture Research`, write its Area Card, run one **Light** investigation to prove the engine end-to-end. |

**Critical distinction — the R-series (R1–R18) is NOT a parallel phase track and must never be treated as one.** `spec/14-research-agenda.md` (detailed in `spec/18`–`35`) is a **separate, optional menu of judgment/taste-improvement research bets**. `spec/15` only threads **four of the eighteen** into the actual plan, at specific weeks: **R1** (benchmark, Phase 1 wk17), **R2** (feedback channel, Phase 2 wk23), **R3 + R4** (constitution / reward model, Phase 3 wk28–33). **R5–R18 are explicitly LATER / DEFERRED — "may never be reached at solo scale"** (`15 §2.1`). Do **not** turn the R-series into a build checklist, and do **not** generate per-bet execution plans for R-bets unless `spec/15` actually schedules that bet at the current phase. When asked "what's next," check `spec/15`'s phase gate and problem ledger — never "which Rn is next in numeric order." (This distinction is recorded because it was previously misread — an Rn bet was treated as the next thing to build outside the phase plan; the correction is the point of this entry.)

**Update:** **engine deleted in `c2be66d0`**. As per decision D1, it was permanently superseded by the commissioned-investigation pattern. Investigations are stored in `investigations/` (e.g., `investigations/ARCHITECTURE_INVESTIGATION.md`, `investigations/END_GOAL_FEASIBILITY_CONTRACT.md`), deferred items in `investigations/BACKLOG.md`, and methodology in `knowledge/research-method.md`.

## S1 - Phase-0 Scaffolding Audit (Decision)

Restored Phase-0 scaffolding from commit `28484962`. Diffed config/trace/schema against `IMPLEMENTATION_PLAN.md` Appendix A/B.

| File | Decision | Reason |
|---|---|---|
| `src/schema.ts` | Rewrite | The `RunRecord` schema is monolithic rather than the atomic, event-based JSONL payload specified in Appendix A. |
| `src/config.ts` | Rewrite | Hardcodes single `modelId`, `maxIters=4`. Must align with Appendix B's role-separated models (`genModelId`, `criticModelId`, etc.), `exploreCandidates`, `polishCandidates`, and `maxIters=6`. |
| `src/trace.ts` | Rewrite | Needs updates to handle the new Appendix A event-based atomic append payload correctly. |
| `spike.ts` | Rewrite | Outdated against the new config/trace schema; must be updated for S3 to prove headless OAuth and token-usage retrieval for `ADE_PROVIDER=agent-sdk`. |
| `package.json`, `tsconfig.json`, `vitest.config.ts` | Keep | Standard configuration; `tsc --noEmit` passes cleanly. |
| `harness/` | Keep | The React/Vite sandbox remains structurally valid and unaffected by Appendix A/B. |
| `.env.example` | Keep (Edited) | Retained but scrubbed `ANTHROPIC_API_KEY` (per S1 rule). Needs new keys matching Appendix B. |
| `briefs/` | Keep | Valid JSON fixture data for Phase 0 testing. |
| `tests/` | Rewrite | Will require corresponding updates when `schema.ts`, `config.ts`, and `trace.ts` are rewritten. |

## S2 - Pro-credit ToS & Quota Verification (Decision)

**Verdict:** **GO (Permitted via official Agent SDK)**.

**Findings & Limits:**
- **Automated Use:** Anthropic's Consumer Terms (Section 3) prohibit accessing services through *"automated or non-human means"* (e.g., third-party scrapers/harnesses). Furthermore, the Acceptable Use Policy prohibits using services to *"utilize prompts and results to train an AI model"*.
- **Agent SDK Exception:** Automated/unattended use is **explicitly permitted** when using official first-party tools like the **Agent SDK**, provided ADE does not train models on the output.
- **Dev Access Model Limits (S2 & S4 Verification)**
- **Status:** **GO** (Permitted via official Agent SDK).
- **Provisions:** The Anthropic ToS and Agent SDK allow unattended automated use when routed through the official `agent-sdk` client, which draws from a dedicated monthly budget.
- **Budgeting (S4):** A single full H1 measurement run (20 briefs × 2 arms × ~16 calls) is estimated to cost **~$70.40** via standard API rates. Since the Claude Pro plan provides only a $20/month Agent SDK credit, the default design exceeds the monthly budget. 
- **Cadence Decision (S4):** We propose reducing the test design to `n=10` briefs, serialized over two weeks ($35.20), and expect to overflow the $20/month Pro SDK credit into pay-as-you-go, or upgrading to the Max 5x plan ($100/mo) during benchmark month to comfortably execute.
- **Exhaustion:** Once the SDK monthly credits are exhausted, further usage requires standard API-rated billing (pay-as-you-go).

**Conclusion:** ADE's high-volume autonomous loop is policy-compliant as long as it operates strictly through `ADE_PROVIDER=agent-sdk` (the official channel) and limits itself to the SDK credit budget or enabled pay-as-you-go billing.

## Phase S: Substrate Verification (S1, S2, S4)
*Date: 2026-07-18*

### S1: Scaffolding Reconciliation (Keep/Rewrite Decisions)
| File | Decision | Reason |
|---|---|---|
| orchestrator.ts | Keep & Extend | Extended to support schema changes (RunRecord nonces) and \exploration\ loops. |
| schema.ts | Keep & Extend | Extended with \dist_tags\, \quota\, \un_id\, etc., to align with Appendix A/B. |
| itest.config.ts | Keep | Standard Vite configuration; handles TypeScript parsing perfectly. |
| harness/ | Keep & Extend | Extended with \setupVendor.ts\ for offline Tailwind/Font vendoring. |
| .env.example | Rewrite | Stripped \ANTHROPIC_API_KEY\ to respect hard constraints; added \ADE_PROVIDER\ and local embedding variables. |

### S2: Pro-Credit ToS & Quota Verification
- **ToS Extract**: Anthropic's Consumer Terms prohibit using Claude Pro/Consumer accounts via automated headless bots or scraping.
- **Limits**: Claude Pro has strict per-day rolling limits (approx 50-100 msgs/5h depending on capacity), which are unreliable for bulk headless iteration. 
- **Decision**: **NO-GO** on consumer automation. ADE must use standard Console API keys (Tier 1/2) for its provider layer, or local mock/Google Agent SDK variants.

### S4: H1 Budget Arithmetic
- **Target**: H1 requires 20-25 briefs * 6 iterations = 120-150 primary generations. Plus matched-compute Control Arm (another 120-150). Total ~300 generations.
- **Tokens**: ~5,000 output tokens per generation = 1.5M output tokens. ~15,000 input tokens per generation = 4.5M input tokens.
- **Budget**: Using Claude 3.5 Sonnet / API costs, this is feasible within Tier 1 API limits (/M in, /M out). ~ .5 + .5 =  per full H1 run.
- **Cadence Decision**: The batch should be serialized across several hours to respect 50 RPM / 1,000,000 TPM rate limits, avoiding 429s.

### M21: Expanded-Scope Roadmap (The Missing Chairs)
- **Decision**: NOT-FUNDED.
- **Reason**: The default scope was ratified in D2, restricting ADE strictly to composition/UI-design intelligence. Copy, imagery/art-direction, iconography, and motion authoring remain out of scope. Because of this, EG-3 (Complete Solutions) and EG-9 (World-Class Org) are formally unreachable.
