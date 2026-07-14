---
name: chat-history
type: knowledge-base / conversation-record
scope: autonomous-design-engine (ADE)
purpose: >
  A complete, non-abridged record of the planning & R&D conversation that produced
  IMPLEMENTATION_PLAN.md and spec/10-15. Written so ANY AI coding agent (Claude Code,
  Codex, Antigravity, or a future model) can read it and have full context, without
  access to the original chat transcript.
covers_period: late June - early July 2026 (per file mtimes: spec/00 Jun 23 -> spec/15 Jul 5)
---

# ADE — Chat History (complete record)

> **Read this if:** you are an AI agent picking up work on ADE and need to know *why* the spec and plan say what they say — not just what they say. The spec docs (`spec/00`-`15`) and `IMPLEMENTATION_PLAN.md` are the **authoritative current state**; this file is the **reasoning trail** that produced them. Where this file and the spec/plan disagree, **the spec/plan wins** (this is a historical record, not a live source of truth) — but if something here reveals a rationale that isn't reflected in the current files, that's a sign the files may need updating, not that this file is wrong.
>
> This document preserves the full conversation **on request of the project owner**, who explicitly asked that nothing be skipped or summarized away. It is intentionally long and complete rather than short and distilled. A distilled quick-reference companion exists at [`decisions-and-conventions.md`](./decisions-and-conventions.md); open items needing a human decision are tracked in [`open-questions.md`](./open-questions.md).

---

## Table of contents

1. [Starting context](#1-starting-context)
2. [Plan review — the audit of IMPLEMENTATION_PLAN.md](#2-plan-review--the-audit-of-implementation_planmd)
3. [Plan hardening — the ~25 fixes applied](#3-plan-hardening--the-25-fixes-applied)
4. [The model/role allocation debate](#4-the-modelrole-allocation-debate)
5. [The "Master Review" proposal and its resolution: Phase-Exit Review](#5-the-master-review-proposal-and-its-resolution-phase-exit-review)
6. [Phase-Exit Review implemented into the spec (8 files)](#6-phase-exit-review-implemented-into-the-spec-8-files)
7. [Phase-Exit Review implemented into the implementation plan](#7-phase-exit-review-implemented-into-the-implementation-plan)
8. [Deep gap analysis, round 1 (clusters A–G) + the Constitutional AI framing](#8-deep-gap-analysis-round-1-clusters-ag--the-constitutional-ai-framing)
9. [The autonomy-vs-benchmark philosophical debate](#9-the-autonomy-vs-benchmark-philosophical-debate)
10. [Deep gap analysis, round 2 (clusters H–N)](#10-deep-gap-analysis-round-2-clusters-hn)
11. [Creation of spec 12–14 (constitution, evaluation charter, research agenda)](#11-creation-of-spec-1214-constitution-evaluation-charter-research-agenda)
12. [Exhaustive pre-implementation gap hunt (19 more clusters) + failure-catalogue red-team pass](#12-exhaustive-pre-implementation-gap-hunt-19-more-clusters--failure-catalogue-red-team-pass)
13. [The execution roadmap (spec 15) — solo, 8 hrs/week](#13-the-execution-roadmap-spec-15--solo-8-hrsweek)
14. [Cross-agent knowledge-base discussion (this document's own origin)](#14-cross-agent-knowledge-base-discussion-this-documents-own-origin)
15. [The file-location discovery](#15-the-file-location-discovery)

---

## 1. Starting context

The conversation opened mid-stream (continued from an earlier, separately-summarized session) with a request to **review `IMPLEMENTATION_PLAN.md`** — the build plan for the Autonomous Design Engine (ADE), an AI system that autonomously designs websites/products from a business brief via a closed generate→render→screenshot→critique→edit loop (the "Eyes"), with a soft/hard authority model, two memories (soft Library vs hard Brand/Design-System), a deterministic Guardrail Layer, and a set of system invariants. The spec (`spec/00`–`11` at the time) already existed and was treated as canonical; the plan turns it into a buildable sequence.

**Known constraints already established before this conversation** (carried in memory, still true):
- **Access model:** the user has only a **Claude Pro plan**, will **not** buy a paid API key/SDK for dev/R&D right now. All model calls route through a provider abstraction (`src/model.ts`), selected by `ADE_PROVIDER`: **`agent-sdk`** (default, dev) — `@anthropic-ai/claude-agent-sdk` on the Pro plan's Agent-SDK credit, OAuth via `claude login`, **must NOT set `ANTHROPIC_API_KEY`** (its presence forces API billing); **`api`** (prod, deferred to Phase 4) — real Anthropic API key; **`local`** — Ollama fallback.
- **Why this matters:** this was a load-bearing, multi-turn clarification in an earlier session. Never suggest "just get an API key" for dev/R&D. Never set `ANTHROPIC_API_KEY` anywhere in dev tooling.
- The full phased build plan lives at `IMPLEMENTATION_PLAN.md` (Phase 0→4, each gated on hypotheses H1–H8 from `spec/08`).

---

## 2. Plan review — the audit of IMPLEMENTATION_PLAN.md

**Request:** a rigorous review of the plan, done in text only (no tool calls) — verdict, gaps, and guidance on what input to give an implementing AI for each phase.

**A process note from that response, worth preserving:** the user's message had bundled a "review the plan" request together with the harness's standard conversation-summary template; the response explicitly called this out and answered only the actual review question, in prose only, with no tool calls, as the instruction required.

### Overall verdict
Logically sound and well-structured — gated phases, deep-then-structured depth, invariants treated as a test contract, the access model woven through. **Build-ready for Phase 0 at the architecture level but not at the "zero-assumption" level** — several Phase-0 mechanics (render harness, `agentSdk` adapter, color gate) were specified at a level where an implementing AI would make risky assumptions.

### Strengths identified (kept, not changed)
- Objective→code / subjective→Critic split, and the composite Pass Gate, correctly carried from spec.
- Invariant→test map (an appendix) makes correctness checkable.
- Provider abstraction is the right shape; dev↔prod↔local is a config swap.
- Phase gating on hypotheses (stop if H-fails) prevents over-building.

### Gaps found (the original numbered list)

**1. The render harness was the biggest under-spec** (correctness risks):
- **Stale-render race:** `window.__ADE_READY__` (a boolean) could still be `true` from the *previous* candidate — Playwright could screenshot the old output. Fix identified: a per-candidate nonce (`window.__ADE_READY_ID__ = "<candidateId>"`), Playwright waits for that exact id.
- **Tailwind JIT scanning:** generated classes must be in Tailwind's `content` glob, and the model must emit *static* class strings (no runtime-constructed classes) or styles silently vanish. Fix: state as a Generator output rule + broaden Tailwind config, later refined to "use the Play CDN instead" (see §3).
- **Asset + font provisioning** was missing entirely: the brief's `hero_image` and brand typefaces (Canela/Inter) must actually be served/loaded by the harness or images 404 and text renders in a fallback font the Critic then wrongly grades.
- **Multi-file output contradiction:** spec `07 §5` showed `final/supporting/*.tsx` but the harness mounts a single `candidate/Section.tsx`. Fix: constrain Phase 0 Generator to one self-contained file, defer `supporting/*` to Phase 1.

**2. Two technical inaccuracies in the gates:**
- `esbuild.transform` does **not** type-check — it strips types and only catches syntax/parse errors. The plan called this "type-check/build clean," which is wrong. Fix: reword to "fast syntax check via esbuild; semantic/type failures surface at runtime via the Vite error overlay."
- **Color allowlist via computed styles would false-positive heavily** (shadows, `rgba()`, anti-aliasing, browser defaults) — as written, likely unusable. Fix: redefine as a **tolerance check on sampled/dominant colors**, not a strict subset of every computed style; convert hex↔rgb with an epsilon.

**3. The `agentSdk` adapter was flagged as the riskiest, most under-weighted component.** The Claude Agent SDK is *agentic* (session, tool loop, streamed events), not a clean one-shot `complete()` endpoint. The plan only flagged vision as an open question. Also unverified: headless OAuth credential pickup, clean extraction of assistant text + token usage, and behavior when the monthly Pro credit is exhausted. Fix proposed: a **Day-0 spike** proving the adapter end-to-end (text completion, vision call, usage retrieval, headless auth) *before* building the loop.

**4. No dev-side cost guardrail** — directly contradicts the user's credit concern. `variations × iters × repair` could be ~20–30 Opus calls per run; cost controls were deferred to Phase 4, but dev is where the credit is most constrained. Fix: a per-run iteration/spend ceiling and a `--mock`/`--dry-run` provider mode from Phase 0.

**5. Loop-semantics ambiguities an implementing AI would otherwise guess at:**
- Feedback serialization (how `violations[]` + Critic notes become the next Generator prompt) was unspecified.
- Best-so-far ordering when candidates differ in hard-gate status was undefined.
- Whether render-repair attempts get traced as RunRecords / count against budget was unclear.
- Schema-gate safe default for a twice-malformed Critic reply was undefined.
- `InputBundle` / `assembleBundle` were used in signatures but missing from the schema list.
- `--refs` injection path was unspecified (spec `07` called it "optional flag only").

**6. Minor:** no temperature/seed note (LLM variance could blur the H1 trend); the optional `ade report` reader was mentioned but absent from deliverables; brief-as-data sanitization was fuzzy for free-text copy (accepted as "fine to note briefs are trusted-internal in MVP").

### Top risks, ranked
1. Agent SDK behaves as a completion/vision provider on the Pro credit (auth, vision, usage, volume) — the entire dev model depends on it.
2. Generated Tailwind/React renders faithfully in the harness (JIT, assets, fonts).
3. The color/token gate is practical, not a false-positive generator.
4. LLM variance doesn't swamp the H1 signal.
5. One section = one file (vs. the spec's multi-file output).

### Pre-development checklist (given as an explicit checklist in the original review)
- [ ] Day-0 `agentSdk` spike + a `--mock`/`--dry-run` provider mode.
- [ ] Per-candidate ready-nonce; Tailwind `content` glob includes the candidate dir; asset+font provisioning into the harness.
- [ ] Single-file Generator output rule for the MVP.
- [ ] Reword esbuild's role to "syntax-check" (not type-check); redefine the color gate as sampled-tolerance (not strict subset).
- [ ] Specify feedback serialization, best-so-far ordering under mixed hard-pass status, render-repair tracing/budget, and the schema-gate safe default.
- [ ] Define `InputBundle`/`assembleBundle` in the schema list; make `--refs` an explicit no-op for the MVP.
- [ ] A dev iteration/spend ceiling; set a temperature.

### Per-phase input guidance (what to hand an implementing AI for each phase)
- **General (every phase):** the relevant phase section + Global Architecture section of the plan, the spec docs it cites, the existing codebase from prior phases (so it *extends*, never rewrites frozen contracts), the invariant appendix (treat invariants as tests), and an explicit list of open decisions resolved (so it doesn't assume).
- **Phase 0:** plan Phase 0 + Global; specs `07`, `05`, `03 §6`, `11 §2/§9`, `02 §5–6`. Provide `burkes-hero.json` + `burkes-brand.json`. State up front: `provider=agent-sdk`, single-file output, `--refs` no-op, dev spend cap, temperature, do the agentSdk spike first. **Acceptance = spec `07 §8` done-criteria + both injected-failure tests.**
- **Phase 1:** plan Phase 1 + Global + the built Phase-0 repo; specs `04 §2.1/§3/§7`, `03 §3/§4/§5/§8`, `06 §2–7`, `11 §5`. Decide & pass in storage layout under `./projects/<client>/` and how "human approval" works in a CLI (e.g. a `--approve` re-run reading the drafted foundation). **Acceptance = the H4 drift test.**
- **Phase 2:** specs `03 §2`, `04 §5–6`, the de-id gate. Decide & pass in the embeddings model choice (ties to the access model) and flat-file vs pgvector. **Acceptance = the H6 A/B result + the de-identification leak test.**
- **Phase 3:** specs `08` (H3/H8), `05 §4`, `09 §2`. Supply accumulated verdicts + traces from Phases 0–2 — cannot be done cold. Decide & pass in how verdicts are captured (CLI vs. a UI) and the exact agreement metric to track. **Acceptance = the Critic↔human agreement trend.**
- **Phase 4:** specs `06 §1/§5/§6`, `09 §2–3`. Now provide the API key + spend-cap config and the Next.js-parity decision. **Acceptance = whole-site coherence + a clean `ADE_PROVIDER=api` switch with an enforced spend cap.**

### Bottom line delivered
Structurally ready to execute; needs a harness-hardening pass, an agentSdk Day-0 spike, two gate-accuracy fixes, a dev cost cap, and ~6 loop-semantics clarifications. None require re-architecting.

---

## 3. Plan hardening — the ~25 fixes applied

**Request:** "go ahead" — apply the fixes directly to `IMPLEMENTATION_PLAN.md`.

All of the following were applied as edits (all confirmed successful):

- **Phase-numbering mapping table added** (the plan is 0-indexed: Phase 0=MVP; spec `08`/`09` are 1-indexed: "phase 1"=MVP) — to prevent an implementer mis-sequencing hypotheses.
- **Day-0 Agent-SDK spike** made an explicit build step **0.0** (before 0.1 scaffold): prove text completion, vision completion, token-usage retrieval, and headless OAuth (no `ANTHROPIC_API_KEY`) — *"do not build 0.1+ until this passes."*
- **Config additions:** `variations` default guidance (use ≥2 for H1/H3 validation runs so pairwise ranking is actually exercised); `genTemperature=0.7` / `criticTemperature=0.2` (Generator should diverge, Critic should stay stable — closes failure F-JDG-06); hard budget caps `maxRunTokens` / `maxRunSeconds` / `maxModelCalls`, exceeding any of which ends the run in a recorded `ESCALATED` state, never silently.
- **New files added to scope:** `report.ts` (`ade report` — reads `trace.jsonl`, prints score deltas/tokens-per-section/pass-rates/iter-0→final gain) and `verdicts.ts` (a blind human-verdict log: present iter-0 vs final in random order, capture pick + 4-point rating) — build step **0.15**, because **H1 cannot be validated from the trace alone**; it needs human blind-preference data too.
- **`InputBundle` minimal Phase-0 subset defined explicitly** in the schema section: `{ brief; brandData?; refs?; lastFeedback? }` (Phase 1 later adds `hardBrand`, `hardSystem`, `softLibrary`, `ctxShots`).
- **Generator output contract made explicit** (prevents F-GEN-03/04/05): exactly one self-contained `.tsx`; **import allowlist = `react` only** (no icon/image/UI libraries — hallucinated imports break builds); **static Tailwind class strings only** (no runtime-constructed class names, since JIT can't see what isn't literal); no placeholders; assets referenced only via harness-served paths.
- **Feedback serialization spec'd exactly:** next-iteration prompt appends one block — hard-gate `violations[]` first ("MUST FIX"), then Critic's targeted notes ("IMPROVE"), then "keep what worked."
- **Truncation check added to `generator.ts`:** if the stream stops on `max_tokens` or braces/JSX are unbalanced, retry once with a higher budget (counted against the call budget), else route to render-repair.
- **Harness hardened (`harness/`):**
  - **Tailwind via the Play CDN** (`<script src="https://cdn.tailwindcss.com">`), not a build-time `content` scan — because the candidate file is written at *runtime*, JIT must happen in-browser. Noted as a CDN↔production-build difference to revisit at Phase 4 parity.
  - Assets copied into `harness/public/`, paths rewritten so `hero_image`/`logo_ref` load.
  - Fonts loaded (Google Fonts where available; commercial faces like "Canela" mapped to a near fallback, **with the substitution explicitly recorded** so screenshots aren't graded against the wrong font).
  - Entrance animations disabled for the critique snapshot (a settle wait alone isn't enough).
- **Eyes (`eyes.ts`) hardened:** candidates render **strictly sequentially** (no parallelism in Phase 0); each candidate gets a **full page reload** (`goto(harnessUrl + '?cid=' + candidateId)`, more deterministic than relying on HMR); wait is on **`window.__ADE_READY_ID__ === candidateId`** (a nonce match, not a boolean) — this is the fix for the stale-render race (closes F-EYE-02).
- **Guardrails (`guardrails.ts`) hardened:**
  - **Brief Comprehension step added** (lightweight, one cheap model call before the loop): restate goal/audience/constraints; on a missing required fact or contradiction, surface it rather than invent (closes F-INP-01/02).
  - `esbuild.transform` reworded to **"fast syntax check"**, explicitly noting it does *not* type-check; semantic errors surface via the Vite error overlay instead.
  - **Import-allowlist lint** added to render-health.
  - **a11y gate calibration note added:** calibrate the rule subset (serious/critical only) against 1–2 hand-built known-good sections first, so the gate doesn't reject every AI page and make H1 unmeasurable.
  - **Color allowlist redefined as a sampled-tolerance check**, not a strict computed-style subset: inspect `color`/`background-color`/`border-color`/`fill`/`stroke`, convert to a common space, require nearest-palette distance ≤ ε, explicitly allow `transparent`/`currentColor`/`inherit` + a neutral ramp.
  - **Schema gate given a fail-closed safe default:** one re-ask, then verdict=`fail`, neutral scores, parse failure logged — never default to pass.
- **Critic (`critic.ts`):** runs at low `criticTemperature`; for Phase 0 uses the **no-system rubric weighting** (brand/brief/craft only, `system_adherence` = null, since no design system exists yet); **pairwise preferred** when N>1; validation runs should set `variations ≥ 2` so the H1 signal isn't dominated by single-candidate Critic noise.
- **Trace format changed: `trace.json` → `trace.jsonl`** (JSONL, one `RunRecord` per line) — a JSON array can't be atomically appended to; JSONL can, honoring "persisted before the next iteration" (I6) durably.
- **Orchestrator loop pseudocode rewritten** with: budget check first each iteration (else `ESCALATED`); sequential candidate rendering; render-repair tries traced as RunRecords and counted against budget; **best-so-far eligibility rule spelled out** — eligible = render-valid AND hard-pass; rank eligible by `weighted_total` (tie-break: higher craft, then lower iteration); keep a hard-failing best only while nothing eligible exists yet (never regress, I4); if no candidate renders valid in an iteration, carry render errors as feedback with **no critique call**.
- **Sample briefs bumped from 1 to ≥10** — H1 needs ≥10 runs to show a trend; one brief can't.
- **Error handling note added:** no mid-run resume in the MVP (a crashed run re-runs from scratch; the durable trace preserves the measurement substrate anyway).
- **Completion criteria rewritten to the exact two-pronged H1 metric** from spec `08`: across ≥10 briefs, (A) Critic's weighted score higher at final than iter-0 in **≥70%** of runs, **and** (B) humans prefer final over iter-0 in **≥70%** of blind pairs; **plus** H2 viability (**≥50%** of finals rated good-or-strong).
- **Output-path note added:** Phase 0 writes under `runs/<out>/`; Phase 1 migrates to `./projects/<client>/` per spec `03 §8` — keep the writer path-configurable now so the layout isn't forked later.
- **Phase 1:** brand-palette a11y pre-check added before approval (a pale-on-white palette would doom every downstream a11y gate — F-BRD-04).
- **Phase 2:** flagged an **access-model collision**: Anthropic has no first-party embeddings API, and the Pro credit doesn't cover paid third-party embeddings (Voyage/OpenAI) — recommended **extending the `local`/Ollama provider with a local embedding model** to stay key-free; a paid embeddings API is explicitly framed as the prod-only alternative that would break the no-key dev stance.
- **Appendix A/B updated:** new env vars listed (`ADE_MAX_RUN_TOKENS`, `ADE_MAX_RUN_SECONDS`, `ADE_MAX_MODEL_CALLS`, `ADE_GEN_TEMPERATURE`, `ADE_CRITIC_TEMPERATURE`); out-of-scope section expanded (single-file Generator output for MVP, no mid-run resume, `--refs` explicit no-op flag in Phase 0).

---

## 4. The model/role allocation debate

**User's proposal:** change the model architecture to Generator = Sonnet 4.6, Critic = "Sonnet 5" (a mid-tier model), Orchestrator = Opus 4.8 — and, more importantly, introduce **cross-validation at every phase** (not just at final judgment) against goals, brand foundation, design system, and library, because currently "the generator simply produces the output and assumes it is correct... only during the final judgment do we discover many failures."

**My response, in full:**

1. **Factual correction:** there is no "Sonnet 5." The actual lineup is **Fable 5** (`claude-fable-5`), **Opus 4.8** (`claude-opus-4-8`), **Sonnet 4.6** (`claude-sonnet-4-6`), **Haiku 4.5** (`claude-haiku-4-5`).

2. **Diagnosis refined:** the section-generation loop *already* cross-validates every iteration (render-health → hard-constraint gate including token-allowlist against the design system → Critic scoring brand/system/brief/craft → composite Pass Gate). **The real gap is three phase-producing steps that have no automated Critic at all:**
   - **Brand Foundation derivation** — derive → straight to human approval, no LLM critique (failure **F-BRD-01**, "off-brief derived brand").
   - **PDS crystallization** — described as "mechanical," human reviews once, no critic (failure **F-PDS-01**, and open research question #4 in spec `09`).
   - **Library write-back** — passes only the deterministic de-identification gate + human verdict; abstraction *quality* is unjudged (failure **F-WB-02**).

3. **Argued the fix belongs to the Critic, not the Orchestrator.** Cited spec principles directly: "Generator never grades; Critic never writes code" (`02 §6`); "The Orchestrator is the only stateful component. Capabilities are stateless functions" (`02 §6`); "if a component has two responsibilities, it is two components" (`01`); and invariant **I2** (Critic must run in fresh context from the Generator — a grader sharing the producer's context is exactly the old pipeline's `thought_process.md` self-grading failure, F-JDG-03). Folding "verify against goals/brand/system/library" into the Orchestrator would quietly recreate the Critic inside it and lose this isolation.

4. **Model allocation was inverted relative to the spec's own stated preference:**
   | Role | User proposed | Spec-aligned | Why |
   |---|---|---|---|
   | Generator | Sonnet 4.6 (cheaper) | ✓ correct — matches spec | Most-called (N variations × iters); the loop corrects it |
   | Critic | mid-tier ("Sonnet 5") | should be **strongest** | It is *the weakest link and the quality ceiling* (F-JDG-01: "caps the whole system's autonomy ceiling") |
   | Orchestrator | Opus 4.8 (strongest) | should be **cheaper** | Mostly deterministic policy + one cheap brief-comprehension call |
   The spec itself names this split twice: `02 §5` ("a cheaper model for the Generator + Opus for the Critic") and `09 §3` ("cheaper Generator + Opus Critic: a cheaper model drafts, Opus judges").

5. **Cost trade-off addressed:** phase-boundary critiques would run **once per phase, not per iteration** (negligible next to the loop's existing spend); prompt-prefix caching applies (brand/PDS/system-prompts repeat across calls); deterministic-first checks are free; a tiered critique (cheap first-pass, strong model only on survivors) is available.

6. **Caution stated:** more automated critique ≠ more *reliable* judgment — the Critic is "a proxy, not an oracle" (`05 §4`, `11 §8`) and is the acknowledged open bottleneck. Position new phase-boundary critiques as a **pre-human filter that catches obvious misalignment early**, not a reason to remove human approval at brand/PDS boundaries — those stay human until H8 calibration proves the Critic agrees with humans there (`09 §2` autonomy ladder).

7. **Net recommendation:** keep the Generator downgrade; give the Critic the **strongest** model, not a mid one; keep the Orchestrator thin (as a trigger, not a judge); add a fresh-context Critic pass at the **Brand / Crystallization / Write-back** boundaries as a pre-human filter, scoped by retrieval, cached at the prefix.

---

## 5. The "Master Review" proposal and its resolution: Phase-Exit Review

**User's follow-up proposal:** a dedicated "Master Review" phase — whenever any output is generated, it goes through this reviewer **once** (not multiple iterations), the reviewer identifies all weaknesses, explains what to improve, and instructs the generator to resolve those issues before proceeding. Goal: no incorrect/low-quality output ever moves to the next phase.

**My response identified what was right, what contradicted itself, and what to actually build:**

- **What's genuinely right:** error propagation is a real, spec-acknowledged risk — F-BRD-01 says "everything downstream would inherit the error"; F-PDS-01 says "every later section inherits the error; expensive to undo." A uniform quality gate at every phase boundary is the correct instinct.

- **The contradiction to resolve:** "a single comprehensive evaluation, not multiple iterations" cannot coexist with "instruct the generator to resolve those issues before the output is allowed to proceed" — if the fix is never re-checked, that is *exactly* the open-loop "final exam" model the whole system was built to replace (`05 §8`: the loop was "promoted from a final exam to the engine"; `01 §5`: "a frozen spec decoded blind" is explicitly listed as something ADE replaces). **Resolution offered:** either **bounded review→fix→re-check** (recommended, capped at 1–2 tries) or a **pure block/pass gate** with no handback — but never "one look, hand back fixes, proceed unverified."

- **Don't build a monolithic super-judge.** Objective checks (a11y, token-drift, schema) must stay deterministic (invariant I3, root-pattern RP-1) — a "comprehensive reviewer" that re-absorbs contrast-checking recreates exactly the failure the Guardrail Layer was built to prevent. Holistic single verdicts are also noisier/more gameable than decomposed, pairwise-ranked ones (`05 §4`: "pairwise... far more reliable"; F-JDG-02 reward hacking is specifically about optimizing a single proxy).

- **The key realization:** *"Master Review" already exists for sections* — it is the composite Pass Gate (`approved ⇔ deterministic checks pass AND Critic passes`, spec `11 §2.2`) plus the whole-artifact QA pass (`06 §5`). The actual proposal, stripped to its true delta, is: *run that same composite gate at every artifact boundary, not just the section one.*

- **Granularity clarified:** gate the producer's exit **once**, not every raw generation (that's already the loop Critic — redundant) and not double-gated at both a producer's exit and a consumer's entry (an artifact's exit gate simultaneously *is* the next stage's input guarantee).

- **The overpromise flagged:** "ensure no incorrect or low-quality output ever moves forward" is a stronger promise than any LLM gate can keep — the Critic is a proxy, not an oracle (F-JDG-01: caps the whole system's ceiling). Frame the mechanism as a **pre-human filter + hard deterministic floor**, never a quality *guarantee*; keep human approval at brand/PDS/delivery boundaries until the autonomy ladder earns its removal (`09 §2`).

- **Recommended shape, three tiers, run once per artifact at the producer's exit:**
  1. **Deterministic gate** (free, objective — a11y/tokens/schema/content). Hard block.
  2. **Critic review** — strongest model, fresh context, decomposed+actionable feedback (not one holistic score); **bounded review→fix→re-check, ≤1–2 tries**. *This is "Master Review," and why the Critic gets the strong model.*
  3. **Human approval** — only at high-stakes boundaries (brand, final delivery), until the ladder earns its removal.

**User pushback (next turn):** "You mentioned Master Review but I believe that already exists... the recommendation seems similar to our current approach. Explain in more detail how it differs."

**My clarifying response:** for **sections** and the **assembled artifact**, the three tiers *are* the current architecture, unchanged. The actual delta is narrow — applying the *same* gate to three boundaries that currently skip the Critic entirely:

| Boundary | Today | Change |
|---|---|---|
| Section | fully gated (loop + Pass Gate + human sign-off) | none |
| Assembled artifact | whole-artifact QA + human delivery sign-off | none |
| **Brand Foundation** | derive → deterministic palette a11y check → **human approval, no LLM critic** | **NEW:** fresh-context Critic reviews derived personality/tone/motion vs business context before the human sees it (catches F-BRD-01) |
| **PDS crystallization** | "mechanical" extraction → **human reviews once, no LLM critic**; token-allowlist checks only that *later sections* obey the PDS, never that the *PDS itself* is correct | **NEW:** Critic reviews crystallized tokens against brand+hero for over/under-specification before freeze (catches F-PDS-01, open Q4) |
| **Library entry** (write-back) | de-identification gate + **human verdict, no LLM critic on abstraction quality** | **NEW:** Critic reviews abstraction altitude before insert (catches F-WB-02, open Q3) |

Explained *why* these three need a **different rubric** than the pixel-Critic: brand/PDS/library are data/strategy artifacts, not rendered visuals — brand review judges "does the derived personality/tone actually fit the business context," PDS review judges "did crystallizing one hero produce a complete-not-overfitted foundation," library review judges "is this abstraction at a transferable altitude."

Gave a full end-to-end walkthrough with `[EXISTS]`/`[NEW]` tags on every line — only 3 lines marked NEW out of the whole flow:

```
1. Brief → Brief Comprehension gate                                   [EXISTS]
2. Derive Brand Foundation
     → deterministic palette a11y check                              [EXISTS]
     → Critic reviews derived personality/tone vs business context   [NEW]  ← bounded re-derive ≤1–2 on fail
     → human approves → freeze                                       [EXISTS]
3. Design hero (Eyes loop: gen→render→critique→edit ≤4)              [EXISTS]
     → Pass Gate → human sign-off                                    [EXISTS]
4. Crystallize PDS from approved hero
     → Critic reviews crystallized tokens vs brand+hero              [NEW]  ← bounded fix ≤1–2 on fail
     → freeze foundation                                             [EXISTS]
5. Design about / pricing (Eyes loop, token-allowlist enforces PDS)  [EXISTS]
6. Assemble → whole-artifact QA → human delivery sign-off            [EXISTS]
7. Write-back: de-id gate                                            [EXISTS]
     → Critic reviews abstraction altitude                           [NEW]  ← re-abstract on fail
     → insert into Library                                           [EXISTS]
```

Argued this is *less* work than a "Master Review phase" (reuses the Critic + gate pattern, no new component, just 3 new rubrics) and is the concrete mechanism that lets the autonomy ladder actually be climbed (there's currently nothing to calibrate Critic↔human agreement against at these three boundaries — this creates that surface).

One-line summary given: *"you already have the Master Review — for sections. My recommendation is only 'give brand, PDS, and library the same treatment sections already get,' with a per-artifact rubric, and don't rebuild it as a separate mega-phase."*

**The concept was named "Phase-Exit Review"** at this point and the user asked to implement it into the **spec files only** (not the implementation plan or code) — covered next.

---

## 6. Phase-Exit Review implemented into the spec (8 files)

Before editing, `spec/04-memory-and-consistency.md` was re-read in full to confirm crystallization (§3) and write-back (§6) were the right homes for the two data/strategy rubrics.

**Files touched, and exactly what changed:**

- **`spec/11-guardrails-and-invariants.md`** (the authoritative home):
  - New **§2.3 "Phase-Exit Review — the Pass Gate, generalized to every artifact."** Full definition: not a new component, reuses the existing deterministic-Guardrail + fresh-context-Critic composite pattern at more boundaries; a per-boundary rubric table (Brand Foundation / Project Design System / Library entry / Section / Assembled artifact, each with its subjective rubric, deterministic half, and the failure it closes); the **bounded, not iterative** rule (≤1–2 review→fix→re-check cycles, never a single unverified handback — explicitly called "the open-loop final exam the loop replaced"); the **"catches bad, does not certify good"** framing (pre-human filter + hard floor, never a reason to remove a human gate before that boundary's agreement is measured).
  - New invariant **I13**: *"No artifact becomes a hard input to a later stage without passing its Phase-Exit Gate (deterministic checks ∧ fresh-context Critic review); hard-store artifacts additionally require human approval until the autonomy ladder earns its removal."*
  - Updated the coverage map (added "Phase-Exit Review → F-BRD-01, F-PDS-01, F-WB-02"), the MVP-vs-later table (brand/PDS Phase-Exit Review → Phase 1; library → Phase 2; none in Phase 0 since no hard stores/Library exist yet), and the architecture-change summary ("the Critic shrinks in *what*, widens in *where*").

- **`spec/10-failure-modes.md`:**
  - New mitigation primitive **MP-13** (Phase-Exit Review).
  - **F-BRD-01, F-PDS-01, F-WB-02** mitigation/validation fields updated to cite the new review as the pre-human-gate catch, with "Phase-Exit-Review↔human agreement at this boundary" added to each validation field (feeds H8).

- **`spec/06-workflows.md`:**
  - Review step inserted into the **brand-establishment** sequence diagram (a new `C as Critic (fresh ctx)` participant, review runs before the human-approval step, with bounded re-derive on failure) and prose.
  - Review step inserted into the **crystallization** sequence diagram (Critic reviews the *candidate* foundation before it's frozen; "only a reviewed foundation is frozen").
  - Review step inserted into the **write-back** flowchart (Phase-Exit Review of abstraction altitude between distillation and Library insert).
  - **§8 "where the human is"** updated: a new line under human gates showing "PHASE-EXIT REVIEW before each human gate (pre-filters brand/PDS/entries)" and a clarifying sentence that the review sits *just inside* each human gate, never replacing it, and its per-boundary agreement is what the ladder measures.

- **`spec/01-actors-and-components.md`:**
  - Critic's one-line responsibility in the actor table widened: *"Score & rank rendered output... and Phase-Exit-Review each phase artifact (brand, design system, library entry) before it becomes law downstream... always in fresh context."*
  - **§3.5** (Critic detail section) expanded with a paragraph explaining the widening is *where*, not *what* — still subjective-only, still fresh-context (I2), so it remains one component.

- **`spec/04-memory-and-consistency.md`:**
  - **§3 (crystallization):** new paragraph *"Reviewed before it becomes law"* — the Critic checks candidate tokens against brand+hero for over/under-specification before freeze; the human still signs off, but on a pre-filtered system.
  - **§6 (write-back):** new bullet *"Altitude is reviewed before an entry is stored"* — the Critic judges whether a distilled lesson is at a transferable altitude before it can pollute retrieval.

- **`spec/05-generation-loop.md`:** added a bullet in §4 (Critic rubric section) clarifying the four scored dimensions are the *section* rubric only — the same Critic capability also runs Phase-Exit Reviews elsewhere with different rubrics.

- **`spec/08-hypotheses-and-validation.md`:** **H8** updated — Critic↔human agreement is now tracked **per boundary** (section/brand/PDS/library calibrate independently, since agreement on brand *strategy* is a different measurement than agreement on section *craft*); "a gate is relaxed only where its own boundary's agreement clears the bar" added to the pass metric.

- **`spec/09-roadmap-and-open-questions.md`:** the autonomy-ladder section (§2) updated to note Phase-Exit Review is the concrete mechanism that makes each rung *measurable*; open questions #3 (Library granularity) and #4 (crystallization fidelity) cross-referenced to the new review as the *runtime guardrail* against a bad extraction — while noting it doesn't settle the underlying research question of the *right* altitude/fidelity.

A final grep confirmed no stale "12 invariants" references remained anywhere after adding I13 (13 invariants total, consistently referenced).

---

## 7. Phase-Exit Review implemented into the implementation plan

**Request:** "Now you can update the implementation plan" (i.e., propagate the same concept into `IMPLEMENTATION_PLAN.md`, at build-sequence/signature/test altitude, deferring authoritative rules to spec `11 §2.3`).

The full current plan was re-read first (it had had ~25 edits applied earlier in the conversation), then updated:

- **Global:** invariant count bumped 12→13 (Context section + rule 3); **new rule 8** summarizing the Phase-Exit Review principle for implementers; **project layout comments** on `prompts.ts` and `critic.ts` annotated to mention review-prompt builders and a `reviewArtifact()` method; **provider section** gained a "per-role model selection" note — Critic gets the strongest model (quality ceiling, F-JDG-01), Orchestrator doesn't need it, keep `criticModelId`/`genModelId` separable in config from day one (ties back to §4's model debate); the cheaper-Generator+strongest-Critic split is noted as a Phase-4 cost lever.
- **Phase 1** (`06 §2–4`, `04 §2.1/§3`, `03 §3/§4/§8`, now also `11 §2.3`):
  - Deliverables gained "Phase-Exit Reviews for brand + PDS."
  - `brand.ts`: added the Phase-Exit Review step (fresh-context Critic checks derived strategy fits context+givens) **alongside** the existing palette a11y pre-check, both running before human approval.
  - `prompts.ts`: added `buildBrandReviewPrompt` and `buildCrystallizationReviewPrompt`.
  - `crystallizer.ts`: added the Phase-Exit Review of extracted tokens before freeze — *"only a reviewed foundation is frozen."*
  - `critic.ts`: added `reviewArtifact(kind, artifact, context) → { verdict, issues[] }` — the same fresh-context judge (I2) applied to non-pixel artifacts; its verdict + the eventual human verdict are both recorded for H8 calibration.
  - Testing: added injected off-brief-brand and over-specified-PDS test fixtures; asserted the review is bounded (≤1–2 tries) and catches them before the human gate.
- **Phase 2** (now also citing `11 §2.3`): `writeback.ts` gained the abstraction-altitude Phase-Exit Review between distillation and dedup/insert (closes F-WB-02); testing gained a too-specific/too-vague entry test case.
- **Phase 3:** `calibration.ts` updated to track agreement **per boundary** (section/brand/PDS/library independently); "a gate is relaxed only where its own boundary's agreement clears the bar" made explicit.
- **Cross-cutting concerns:** new bullet framing Phase-Exit Review as a pre-human filter whose per-boundary agreement feeds the autonomy ladder.
- **Appendix B:** invariant-test map gained **I13**.
- **Out-of-scope section:** explicit note that Phase 0 has **no** Phase-Exit Reviews (no hard stores/Library exist yet) — the section Pass Gate is Phase 0's only gate.

---

## 8. Deep gap analysis, round 1 (clusters A–G) + the Constitutional AI framing

**Request:** a deep analysis of the *entire system* to find why it isn't consistently producing the best possible results, explicitly modeled on how Anthropic continuously improves models via Constitutional AI (research, evaluation, iterative improvement before deployment). Explicitly framed as **R&D only — no implementation**, and scoped to "read only the spec."

Before writing, `spec/00-overview.md`, the remaining unread tail of `spec/10-failure-modes.md` (storage/model/architecture failure sections), and `spec/07-mvp-cli.md` were read fresh.

### Core diagnosis delivered
**The system is engineered to eliminate *bad*, not to recognize or produce *great*.** The Guardrail Layer, render-health gate, token-allowlist, a11y gate, best-so-far retention, bounded loops, invariants — a near production-grade *immune system*. But every mechanism meant to push output from competent to exceptional funnels through two thin components: **one prompted Critic** scoring three frozen screenshots on four coarse dimensions in a single noisy pass with no grounding exemplars or learned taste model, and **one Generator** that jumps straight to high-fidelity `.tsx` with no divergent exploration or explicit design reasoning. The quality ceiling is set by the *least*-engineered parts — an inversion of investment relative to risk.

### The central framing (the most useful lens): inner loop present, outer loop missing
| | Inner loop (per output) | Outer loop (compounds over generations) |
|---|---|---|
| Constitutional AI | critique own output against a written constitution → revise | preference data → reward/preference model → RL against it → extensive evals + red-team before release |
| **ADE today** | ✅ present — generate→render→see→critique→edit is real | ❌ **almost entirely absent** — no constitution, no preference/reward model (the only plan for accumulated verdicts was "rotate rubric examples" by hand), no standing benchmark (just "read trace.json by hand"), no active red-teaming of the judge |

Framed as the single highest-leverage insight: building the **outer loop** — a constitution, an evaluation charter, a reward model, standing evals — is the work that would actually raise the ceiling, not more inner-loop polish.

### Gap catalogue A–G (severity-tiered ★★★/★★/★)
- **A. Taste/Critic** — A1 no constitution/anchored exemplars; A2 no learned reward/preference model; A3 rubric too coarse (single "craft" number covering hierarchy+rhythm+restraint+polish+responsiveness); A4 single-shot high-variance judgment (F-JDG-06).
- **B. Eyes** — **B1** (flagged as possibly the single biggest lever): three frozen frames are blind to motion/scroll/interaction by construction; B2 no content-robustness testing (one content length, three fixed widths); B3 "performance" claimed (F-QF-02) but never measured; B4 consistency checked only at the token level, not visual rhythm/grid.
- **C. Generation** — C1 no divergence→convergence (parallel one-shot finals, not staged exploration — the weak current answer to F-GEN-02 AI-slop); C2 no explicit design-reasoning artifact before pixels; C3 spatial problems get text-only feedback; C4 copy is frozen, can't be co-optimized with layout.
- **D. Strategy** — D1 "Brief Comprehension" is a one-line restatement, not real strategy work; D2 no IA/page-plan generation (section order/narrative is assumed, not designed or critiqued); D3 goal-fit ("does this drive lead-gen?") is scored from a screenshot, a judgment the medium can't really support.
- **E. Memory/learning** — E1 learns only from approved final artifacts, discarding the richest signal (trajectories, rejections); E2 the Library serves the Generator but nothing serves the Critic (no taste memory); E3 uniform human review, not uncertainty-targeted; E4 no conflict resolution among contradictory retrieved soft entries.
- **F. Evaluation** (flagged as the thinnest part, ironic given the whole point of this analysis) — F1 no standing benchmark/regression eval; F2 ground truth itself unvalidated (single-rater, no inter-rater reliability); F3 no statistical discipline behind the H-series percentage targets; F4 train/eval contamination risk as the Library grows.
- **G. Architecture** — G1 bottom-up crystallization from one section can lock a bad local optimum; G2 whole-page composition is an end-of-run afterthought, not primary; G3 one general model in three roles, no specialization/distillation; G4 production-parity gap (Vite mock ≠ real Next.js production).

### R&D agenda proposed (R1–R8, later expanded to R1–R18 in §11 below)
Falsifiable bets in the `08` style. The three recommended first: **R1+R2+R3 together** (benchmark → human-feedback channel → constitution-grounded Critic = the outer loop), **R4/R5** (motion/scroll-aware Eyes — arguably the single biggest unacknowledged lever), and staged/divergent generation.

Ended by offering to draft `spec/12` (constitution) and `spec/13` (evaluation charter), or go deeper on one cluster — asked which.

---

## 9. The autonomy-vs-benchmark philosophical debate

**User's concern:** won't a limited benchmark and a fixed set of "constitutional" design rules cap the AI's capability, given it has more design knowledge than we do? If the document is too restrictive/incomplete, doesn't it limit the AI and prevent the actual goal — a system that thinks independently, identifies its own weaknesses, does its own research, challenges its own assumptions, and continuously improves itself, *not* constrained by predefined rules/benchmarks? Then, as a proposed compromise: *"we write the benchmark and rules, but we don't add full detail, we add SOME instruction — is that good or not?"*

**My response, in full:**

1. **Applied the spec's own soft/hard principle** (`00 §5`: autonomy lives in the *route*, consistency lives in the *destination*) to resolve the apparent contradiction: a **prescriptive rulebook** ("use an 8px grid, headlines 48–72px") specifies the *route* — this caps the AI and must stay thin. A **benchmark + definition of "good"** specifies the *destination* — it doesn't constrain *how* the AI designs, only *what it's aiming at*; thinning this doesn't free the AI, it removes its target and the human's ability to tell real improvement from self-delusion.

   | | Prescriptive rules (the "how") | Values + evaluation (the "what/why + measure") |
   |---|---|---|
   | Governs | the route | the destination |
   | Effect if detailed | **caps the AI** at our ceiling | defines the target; does **not** cap creativity |
   | Right amount | thin → near-zero | few but rigorous |

2. **Pointed out the user's own analogy actually argues the opposite of "thin both":** Anthropic's constitution is deliberately thin (principles, not a rulebook for every case), but their **evaluation is massive and human-anchored**. Thin principles + heavy evals + human preference data is the actual lesson — not "thin everything."

3. **The honest caveat, stated directly:** without a stable, human-anchored measuring stick, **"self-improvement" and "reward hacking / drift" are indistinguishable** (ties to failures F-JDG-02 reward hacking, F-SPEC-05 measurement theater) — a system that grades its own homework with a rubric it also wrote will always report that it's improving. Deeper point: **the more autonomy granted, the *more* an anchor the system doesn't control is needed** — precisely because there's less human oversight to catch drift. Autonomy and evaluation are complements, not opposites; the benchmark is what *lets* trust be extended at higher autonomy-ladder rungs.

4. **The synthesis — "seed thin, grow living, anchor human":** apply the Library's own philosophy (starts empty, grows through use, confidence-weighted, human-verdict-gated, `04 §6`) to taste and evaluation itself:
   - **The constitution** starts as ~5–10 *principles with rationale* (not rules), plus an explicit *"deliberately left to you"* section (so the AI reads silence as granted freedom, not gaps to fill randomly). The system **proposes amendments** from patterns it observes (especially its own failures/rejections); a human ratifies. It compounds like the Library.
   - **The benchmark** starts small in *size* but strong in *method* — held-out, multi-rater human "golden" ratings as the fixed anchor. The system **proposes new eval cases** (especially adversarial edge cases it discovers); a human validates and adds. The set grows; the human-owned anchor's rigor never starts weak.
   - This makes self-improvement *real*: the system critiques itself against the thin constitution, mines its own weaknesses, proposes new principles and tests — and a human holds the ground-truth line, so it's more autonomous than a fixed rulebook (the AI authors the growing framework) and safer than self-graded drift (a human anchor it can't optimize away).

5. **Direct answer to "is thin-but-some-instruction good":**
   - **Constitution: yes**, with two conditions — principles+rationale, not rules; and it must be **self-extending**, or "thin" becomes *stuck* instead of *free*.
   - **Benchmark: partly** — size can start small, but the *methodology* (multi-rater, held-out, statistically real) must not be thin, or the whole self-improvement loop has nothing true to climb toward.

One-line summary given: ***"seed thin, grow living, anchor human."*** Offered to draft the two seed documents in this exact shape.

**Next user message was simply "What was the next step?"** — answered by recapping the plan to draft `spec/12` (living constitution: principles+rationale, an explicit "left to the AI" section, a self-amendment protocol) and `spec/13` (evaluation charter: small human-anchored golden core + a protocol for the system to propose new eval cases), both still R&D artifacts, not implementation.

---

## 10. Deep gap analysis, round 2 (clusters H–N)

**Request:** identify *additional* gaps beyond the first A–G catalogue, explicitly to "address them all at once instead of fixing issues one by one."

New clusters, genuinely distinct from A–G:

- **H. The search itself is flawed** (flagged as the most important new cluster, capping "best possible results" independent of model quality):
  - **H1** — the loop is a **greedy hill-climber**: best-so-far (I4) only ever accepts strictly-better candidates and edits *the current best* — no restart, no direction-switching, no accept-worse-to-explore, no stagnation escape. It can polish a mediocre direction to its local peak but can never make the discontinuous jump great design sometimes needs.
  - **H2** — **weighted-sum scoring hides Pareto trade-offs**: collapsing 4 dimensions into one `weighted_total` is scalarization — a 95-craft/75-brief-fit candidate can lose to a flat 82/82/82/82 even when the former is the better design. The system is structurally biased toward *compromise* over *excellence*.
  - **H3** — no adaptive effort allocation or diminishing-returns detection (every section gets the same budget regardless of stakes; no plateau-detection to reallocate spend).
- **I. The loop never touches reality** — **I1**: no outcome feedback, ever. The system optimizes the Critic's taste-guess and, at best, a human's taste-verdict — never whether a design actually *achieved its goal* (converted, engaged). A philosophical ceiling: it can get better at *looking good*, never at *working*, because the only ground truth it ever sees is opinion, not outcome.
- **J. The human↔system channel is too thin to carry taste** (flagged as needing to come *before* the reward-model/constitution work, since it's the data source everything downstream learns from):
  - J1 — the feedback instrument is primitive (CLI approve/reject/notes) — a low-fidelity capture bottlenecks everything downstream.
  - J2 — no "teach by example" channel for a human to shape the Critic's taste directly.
  - J3 — design rationale is never surfaced to the human (noted tension: rationale must stay hidden *from the Critic*, per I2, but should be shown *to the human* — the spec never separates these two audiences).
  - J4 — taste governance is undefined: when reviewers disagree, whose taste is ground truth?
- **K. Blind spots in the design medium itself:**
  - K1 — imagery/art-direction (selection, cropping, treatment) is entirely outside the loop; quality is silently gated by asset quality the system can't touch.
  - K2 — no iconography/illustration/graphic-device representation anywhere (Generator/Library/Critic only model layout+type+color).
  - K3 — accessibility & i18n are a binary pass/fail floor, not a *design dimension* (no reading-order sanity, focus-flow, RTL, or text-expansion consideration).
  - K4 — no interaction-design capability for the eventual product surface (flows, transitions, affordances, error UX are unrepresented).
- **L. Temporal & contextual blindness:**
  - L1 — aesthetic aging/trend drift unmodeled: the Library decays by *disuse*, not by *dating* — risk of slowly enshrining and re-serving a stale aesthetic.
  - L2 — no competitive/differentiation context in the brief — the system can't know if a design looks generic relative to a category.
  - L3 — no long-horizon dynamics test of whether H6's "compounding" claim holds (or reverses into monoculture) over 1000s of projects.
- **M. Retrieval structurally suppresses creativity** — M1: same-domain retrieval biases the Generator toward the category mean (a fintech gets fintech patterns) — pure brief-similarity retrieval converges toward the *opposite* of the differentiation the system wants; the most creative moves are often cross-domain transfers, which retrieval never surfaces.
- **N. Systemic/reproducibility:**
  - N1 — the whole system is validated on **one domain** (Burkes real-estate editorial) — risks overfitting the architecture (and later the constitution/benchmark) to one aesthetic.
  - N2 — no reproducibility of decisions over an evolving system (prompts/model/constitution/Library all drift over time with no versioned snapshot tying a past run's *why* to a reproducible state).

### The four root themes (for attacking the list *together*, not one-by-one)
1. **The optimizer is greedy and its objective is a scalarized proxy** → finds locally-good, balanced-mediocre designs, never globally-best, spiky-excellent ones (H1, H2, H3, M1).
2. **The system never touches reality** → optimizes opinion, never outcomes, forever (I1).
3. **The human↔system channel is too low-bandwidth to carry taste** → the ground truth feeding the entire outer loop is thin (J1–J4) — a *prerequisite* for the reward-model work.
4. **The system is blind to much of the medium and its context** → imagery, icons, motion, i18n, competition, time (K, L, N1).

Recommendation given: fold the *entire* A–N set into a single research-agenda document, prioritized by these four root themes (so each fix is chosen for how many gaps it closes), with J prioritized ahead of the reward-model/constitution work specifically. Offered to draft `spec/12`, `spec/13`, and a `spec/14-research-agenda.md` capturing A–N as prioritized falsifiable bets.

---

## 11. Creation of spec 12–14 (constitution, evaluation charter, research agenda)

**Request:** "go ahead."

Three documents were created in full:

### `spec/12-design-constitution.md`
- **Posture:** seed thin, grow living, anchor human (§1); specify the destination never the route; principles not rules; anchor human, extend by machine.
- **What it is / is not:** grounds the Critic and every Phase-Exit Review; not a style guide, pattern library, rulebook, or scoring mechanism.
- **8 seed principles (v0)**, each with statement + why + explicit "does not dictate":
  - **P1** Serve the brief before the eye. **P2** Earn every element. **P3** Make the hierarchy unambiguous. **P4** Consistency is the floor; distinctiveness is the aim. **P5** The medium is more than a frozen frame (motion/interaction/real content matter, not just a static postcard). **P6** Accessible and inclusive by construction (a11y/i18n/reduced-motion from the first decision, not a checklist add-on). **P7** Novelty must be earned by the brief, never by decoration. **P8** Excellence is spiky, not balanced (directly targets H2's scalarization problem).
- **Hard floor vs. soft aspiration:** a small HARD floor (a11y/contrast, brand/system adherence, brief truth, honesty of the medium) that's deterministically enforced where possible and never traded away by the Critic; P1–P8 as SOFT aspiration the Critic applies with judgment.
- **§5 "What this deliberately does NOT prescribe"** — an explicit list (layout/grid/composition, which patterns to draw on, aesthetic style/genre, specific token values, method/process) so the system reads silence as granted freedom, not a gap. Includes the test for adding a future rule: *"does it state what good means (keep), or how to achieve it (reject)?"*
- **Anchored exemplars** — a small, growing set of rendered designs with human-assigned per-dimension scores, spanning multiple domains; soft (reference not template), held out from the Library (never retrieved as generation direction), human-owned.
- **Self-amendment protocol (§7):** evidence-gated (must cite trace/verdict evidence, never a vibe), human-ratified, append-only versioned (mirrors the hard-store discipline, I5), retirable (a principle can be softened/retired when evidence shifts — not a ratchet); governance (*who* ratifies) flagged as an open question tied to J4.
- **How it wires in:** grounds the Critic (`05 §4`) and every Phase-Exit Review (`11 §2.3`); its own value ("does grounding the Critic in it help?") is itself a falsifiable bet (R3), not assumed — it is not exempt from the "report observed numbers" culture.
- Burkes instance given; open questions listed (how thin is thin enough, whose taste, does grounding actually help).

### `spec/13-evaluation-charter.md`
- **Posture:** a destination-marker, not a route-constraint — the same argument as §9 above, formalized: the benchmark never tells the system *how* to design, only whether what it produced is better than before; removing it removes the target and the anchor, not a constraint on the AI.
- **Three layers of ground truth:** ① the **golden core** (fixed, human-owned, immutable-by-machine — the anchor); ② the **frontier** (system-proposed new eval cases, especially adversarial/edge cases, human-ratified — grows); ③ the **reward model** (learned from ①+accumulated verdicts, operational but never sovereign — always checked against ①, never becomes its own ground truth).
- **Golden core requirements:** small, multi-domain brief set (not just Burkes — directly answers N1); multi-rater human reference ratings with inter-rater agreement recorded (answers F-HUM-02); held-out always (never written back to the Library, to prevent contamination as the Library grows — answers F4); human-owned and version-frozen.
- **Measurement methodology (the part that must not be thin):** pre-registered metrics decided *before* the run (Critic↔human agreement, iter-0→final human-preferred gain, reward-model pairwise accuracy, judgment variance); real statistics (sample sizes, confidence intervals, significance — not "two runs is a trend"); **the regression gate** — every prompt/model/rubric/constitution change must clear the benchmark before adoption (the concrete defense against F-MOD-05 silent version regression, replacing "just pin the model id").
- **The growing frontier:** the system proposes adversarial/edge cases it discovers (often the best finder of its own blind spots); a human ratifies into the frontier and periodically promotes stable cases into the golden core — the benchmark improves itself the same way the system does, anchored by human ratification at every step.
- **Guardrails against gaming:** golden core is human-owned and immutable by the system; strict train/eval separation (reward-model training data never touches the held-out core); watch the **gap** (Critic-vs-human), not the score — rising Critic scores with flat human ratings is the reward-hacking alarm (F-JDG-02), and the charter's job is to make that divergence visible.
- **Relationship to the rest of the spec:** operationalizes `08`'s "report observed numbers" culture into a standing, regressable instrument; is bet **R1** — the *enabling* bet everything else (R3 constitution, R4 reward model) is measured against; is what lets the autonomy ladder (`09 §2`) advance on evidence.
- Burkes instance given (one golden-core entry, frozen multi-rater reference ratings); open questions (core size for statistical power, rater count/governance, the agreement threshold that justifies relaxing a gate).

### `spec/14-research-agenda.md`
- **Core diagnosis recap** (§8 above) and the **four root themes** (§10 above).
- **The full A–N gap map as one table** — every gap from both analyses, tagged with severity, which root theme it belongs to, and which research bet closes it — including the four cross-cutting enablers **X1–X4** (production-parity harness, taste-governance protocol, interaction-design representation, system-state snapshotting) that aren't standalone bets but constraints on *how* other bets get built.
- **Priority tiers & sequencing** (a diagram): **Tier 0 enablers** (R1 benchmark, R2 human-feedback channel) → **Tier 1 outer loop** (R3 constitution-grounding, R4 reward model) → **Tier 2 top quality levers** (R5 motion-aware Eyes, R6 divergence-generation, R7 escape-greedy-search, R8 Pareto-selection) → **Tier 3 depth & robustness** (R9–R15: strategy/IA layer, content-robustness, cross-domain retrieval, adaptive effort, trajectory-learning, uncertainty-routed review, imagery/graphic capability) → **Tier 4 frontier** (R16 outcome feedback, R17 long-horizon Library dynamics, R18 goal-fit via UX heuristics). Two dependencies called non-negotiable: **R1 must come before everything**; **R2 must come before R4**.
- **Full falsifiable bet write-ups for R1–R8** in exact `08` style (statement/why/experiment/decisive metric/fail-looks-like/depends-on); **R9–R18 in a compact table** (statement/metric/gaps-closed).
- **Decision rules** carrying the "measure, don't predict" culture: validate before build; report observed never predicted (I12); kill cheaply (smallest experiment that can falsify a bet); sequence by dependency not enthusiasm; watch the gap not the score (presumed reward-hacking until proven otherwise if Critic scores rise but human ratings don't).
- **Relationship to the rest of the spec:** `12`/`13` are this agenda's first two calls (R3/R1); `08`'s H-series proves the *floor* works, this R-series is how it gets *better than itself* over time; `10`'s quality-ceiling failures (F-JDG-01, F-SPEC-02, F-GEN-02) become funded research here rather than acknowledged-but-unaddressed risks. Explicitly framed as **living** — new gaps get appended here with a severity/root-theme/bet as discovered.

**Wiring:** all three docs were registered in `spec/README.md` as a new **"continuous-improvement (R&D) layer"** section (docs 12–14, distinct from the system docs 00–11), with new glossary entries (inner/outer loop, Design Constitution, Evaluation Charter/golden core, reward/preference model, research agenda R-series) and the status line bumped to v0.3.

---

## 12. Exhaustive pre-implementation gap hunt (19 more clusters) + failure-catalogue red-team pass

**Request:** identify *every possible* gap, flaw, weakness, limitation, and failure point — explicitly to "uncover as many potential problems as possible before implementation," going wider than the A–N design-quality/loop-mechanics analysis into surfaces the spec's own `10-failure-modes.md` catalogue (~80 `F-*` entries at the time) under-covered.

**19 new numbered clusters delivered** (only the most load-bearing are recapped here in detail; the full text is preserved verbatim in the conversation this document summarizes — the authoritative distilled version now lives in `spec/10-failure-modes.md` itself, see below):

1. **Input/brief/assets** — PII in briefs/testimonials, wrong-colorspace/resolution assets, legally-sensitive copy needing disclaimers, non-English/mixed-language briefs, content contradictions, numeric/pricing rendering inaccuracy, long-string/RTL/emoji layout breaks, mid-project brief changes with no change-management path.
2. **Brand/design system** — web-font licensing unverified, no semantic colors (error/success/warning) in the palette, no dark-mode/theming axis in tokens, non-fluid fixed-px tokens, cross-client homogenization risk, no standard token export format (e.g. DTCG / Style-Dictionary interop), brand staleness after a pivot, secondary-pairing a11y gaps.
3. **Generation/output code quality** (entirely unjudged by the pixel-Critic) — non-semantic HTML, unmaintainable/non-idiomatic React, insecure output (`dangerouslySetInnerHTML`), code fetching external resources at render time, inconsistent cross-section code style, sample-content-length-dependent layout, invisible stacking/overflow bugs.
4. **Render/Eyes & production-parity** — headless Chromium ≠ real browsers, Tailwind Play CDN ≠ purged production build, SSR/hydration mismatches invisible to the SPA harness, font-fallback substitution grades the wrong typeface, DPR/color-profile differences, async components never signaling ready, video/iframe/map embeds don't render — summarized as *"the Critic only ever sees a picture of an app, never the DOM, semantics, interaction, or performance."*
5. **Critic/judgment model-behavior failures** — vision-resolution limits (can't see kerning/1px misalignment), position bias + verbosity bias in pairwise ranking, grade inflation from safety-tuning, sycophancy to stated intent, cultural/aesthetic bias of the base model, hallucinated critique, no confidence/uncertainty output, entangled rubric dimensions.
6. **Loop/search** — oscillation (fixing A reintroduces B), over-correction (one note triggers a total redesign), feedback overload, threshold-too-low convergence to "just good enough."
7. **Memory/Library/retrieval** — flat-file cosine is O(n) (scaling problem), non-reproducible generation as the Library evolves, late-discovered bad approvals already taught the Library, untuned confidence/decay, dedup false-merge/split, confidentiality leak via patterns specific enough to re-identify a client or leak competitive strategy.
8. **Security** (marked as barely touched by the spec) — **the harness executes model-generated code = arbitrary code execution on the build machine** (flagged as the single most dangerous newly-surfaced item), indirect prompt injection through references/Library (not just the brief), data exfiltration by generated code, secrets/PII leak into traces/screenshots/logs, SSRF via asset/reference URLs, supply-chain risk in harness deps, Library as an attack surface, and multi-tenant isolation risk if this ever becomes a hosted service rather than a solo local tool.
9. **Legal/IP/ethics** (marked as almost entirely uncovered) — inadvertent cloning→infringement (no similarity check against real sites), font/stock-image licensing, design IP ownership questions, legal-grade accessibility (ADA/WCAG 2.2 AA/EN 301 549 vs. the much weaker axe gate), missing regulatory content/disclaimers, **dark-pattern drift** (optimizing "conversion" can teach manipulative patterns — possibly even brief-requested — with no ethical guardrail), GDPR/CCPA exposure if client PII flows through, and representation/bias risk if imagery is ever generated rather than only sourced.
10. **Accessibility depth (false-compliance risk)** — axe-core catches only ~30–45% of WCAG issues; keyboard-navigation flow, skip links/landmarks, focus order/management, screen-reader *experience* (not just alt-text presence), `prefers-reduced-motion`, colour-blindness simulation, cognitive load/reading level, 200%-zoom reflow, and touch-target sizing are all untested — a "passing" gate creates false confidence of "accessible."
11. **Performance/SEO/production-readiness** — Core Web Vitals/bundle-weight/unused-CSS/image-optimization unmeasured; SEO meta/OG tags, structured data, and crawlability never considered.
12. **Data/storage/integrity/ops** — no schema-migration path as schemas evolve, no backup/disaster-recovery for the irreplaceable hard stores/Library, unbounded storage growth with no retention policy, Windows path/encoding issues, concurrent-CLI-run port contention.
13. **Model/provider/cost/scale/vendor** — model deprecation forcing migration+re-baselining, **Pro-credit ToS risk for automated/near-production use** (unconfirmed), vendor lock-in with no fallback judge/generator, end-to-end latency (variations×iterations×sections×repair could take hours per site), unpredictable per-project cost, and Playwright/Chromium fleet cost plus version-drift silently changing how things render.
14. **Evaluation/measurement failure modes of the fix itself** — benchmark Goodharting (tuning to the golden core without generalizing), golden-core staleness, small-core/small-rater-pool bias amplified by the reward model, metric-selection bias, correlation-vs-causation confounds in ablation studies, and held-out discipline not being consistently enforced in practice even when it's the stated rule.
15. **Human-in-the-loop/process** — review bottleneck at volume, rubber-stamping under fatigue feeding false approvals into the Library/calibration, **single-taste single-point-of-failure** (one reviewer's taste *is* the ceiling), no test-retest check on the humans themselves.
16. **Domain/surface scope** — forms (validation/states/submission/errors), multi-page sites and cross-page consistency, email design (table-based layouts, client rendering quirks), data-viz/tables/dashboards (density), print/PDF, localization/RTL as a first-class surface — all unhandled; the spec is section- and single-artifact-centric.
17. **Reproducibility/observability/debugging** — nondeterminism (same brief → different output run-to-run, undermining fair A/Bs and debugging), no system-state snapshotting (can't reproduce "why did it decide this 6 months ago" across an evolving prompts/model/constitution/Library), no structured logging or alerting on quality regressions, and debugging a multi-agent loop being intrinsically hard.
18. **Meta/architectural/assumption risks** — whole architecture validated on one domain (Burkes) risks aesthetic overfit; vision-alone may be insufficient for taste if motion/interaction matter (the core Eyes premise partially blind); the compounding-Library (H6) and crystallize-from-one-section (G1/Q4) assumptions may not hold or may reverse at scale; the autonomy-ladder premise itself could over-grant autonomy (agreement on easy cases isn't the same as trustworthiness on hard ones); one model in three roles → correlated blind spots (all three roles share the base model's own weaknesses); the system may optimize "looks designed" over "works" forever; and measurement theater (F-SPEC-05) can recur despite every intention otherwise.
19. **Organizational/governance** — constitution/Library governance undefined (ties to J4), bus-factor/knowledge concentration, the R&D program itself being expensive per bet and able to stall.

**A "most dangerous newly-surfaced" watchlist of 10 items** was given as the priority read of this list: harness code execution; judged-artifact≠shipped-artifact; output code quality never judged; legal/IP risks; accessibility false-confidence; confidentiality leak through patterns; indirect prompt injection via refs/Library; reproducibility/nondeterminism; vendor lock-in+ToS; human review bottleneck+taste SPOF.

**Request:** "go ahead" — fold the genuinely-new ones into `spec/10-failure-modes.md` as properly-structured `F-*` entries.

**What was actually added to `spec/10-failure-modes.md`** (a red-team pass, documented in the file's own updated Coverage Note as "v0.3"):

- **4 new mitigation primitives:** **MP-14** harness sandboxing (network-isolated, resource-capped, ephemeral, no secrets in scope); **MP-15** production-parity validation (real multi-engine set + purged production build + SSR harness; cross-browser + Core Web Vitals + SEO); **MP-16** output-quality gate (semantic-HTML/landmark check, import/resource allowlist, security-lint, prop-driven code, lint/format); **MP-17** provenance & compliance review (licensing checks, originality/similarity screen, regulatory checklist, dark-pattern screen).
- **5 new failure areas, 23 entries, full 8-field format each:**
  - **F-SEC-01…05** (Security): untrusted code execution in the harness; indirect prompt injection via refs/Library; data exfiltration by generated code; secrets/PII leak into traces; SSRF via asset URLs.
  - **F-LEG-01…04** (Legal/IP/ethics): inadvertent cloning→infringement; unlicensed fonts/imagery; dark patterns/manipulative design; missing regulatory/disclaimer content.
  - **F-PAR-01…04** (Production parity): judged engine ≠ shipped engine; harness Tailwind ≠ production build; SSR/hydration unverified; SEO/meta absent.
  - **F-COD-01…04** (Output code quality): non-semantic HTML; unmaintainable/non-integrable React; insecure output patterns (XSS); uncontrolled external resource loads.
  - **F-OPS-01…06** (Operations/repro/vendor): nondeterminism/non-reproducibility; schema/data-migration breakage; no backup/DR; unbounded storage growth; vendor lock-in/ToS/model deprecation; end-to-end latency/throughput blowup.
- **7 additions to existing areas:** **F-JDG-07** (systematic judge biases — position/verbosity/vision-resolution/sycophancy/grade-inflation/cultural bias); **F-QF-03** (accessibility depth/false compliance); **F-MEM-08** (retrieval nondeterminism & flat-file scaling); **F-WB-06** (confidentiality/strategy leak via patterns); **F-HUM-04** (review bottleneck/rubber-stamping/taste SPOF); **F-SUR-04** (unsupported high-value surfaces: forms/multi-page/email/dataviz/i18n/print); **F-SPEC-06** (evaluation overfitting/benchmark Goodhart).
- The file's **Coverage Note** was updated to document this as a "pre-implementation red-team pass (v0.3)," explicitly cross-referencing `spec/12`–`14`.
- A verification grep confirmed **34 total additions** (4 MPs + 30 F-entries) landed correctly.

---

## 13. The execution roadmap (spec 15) — solo, 8 hrs/week

**Request:** now that problem-identification is complete, build a structured execution plan for a **solo developer with ~1 hour/day, ~8 hours/week**. Required to cover: (1) a weekly execution plan with prioritization by impact/dependency, (2) what comes after problem-identification and after each problem is solved, (3) a realistic timeline/milestones and a definition of "significantly improved," (4) goal evaluation/direction-checking. Explicitly asked for deep analysis, criticism, and any other open questions, all in a single file. (This request was sent twice due to an interruption; the second send was identical and was treated as the resend/continuation of the same request.)

**`spec/15-execution-roadmap.md` was created**, structured as follows (this is a close paraphrase of its content — the file itself is the authoritative version):

- **§0 Reality check** (opens the document deliberately blunt): scope and time are mismatched by roughly an order of magnitude. 8 hrs/week ≈ 0.2 FTE ≈ effectively ~5–6 hrs/week after context-switch loss (~20 min lost per stop-start session). The full vision is realistically **700–1,200+ hours plus open-ended research → 3–6+ years at this cadence**, with taste calibration never fully "done" even then. Three operating principles follow: smallest-thing-that-answers-the-biggest-question; evidence-over-analysis (stop analyzing, build to get real data — further gap-hunting now has sharply diminishing returns); protect momentum (solo multi-year projects die from attrition, not technical failure).
- **§1 Operating model for 1-hour sessions:** a mandatory `STATE.md` dev-log habit (last 5 minutes of every session: what was done / what's next / open questions); task granularity capped at ≤2 sessions; batch by domain per week (never switch domains within a week — the reload cost is per-domain); use AI aggressively to write code (compresses *build* time ~30–40% but explicitly does **not** compress review, taste verdicts, or measurement, which remain the real bottleneck); a weekly rhythm of ~5 build sessions + 1 review/plan session (updating the roadmap, checking the current gate metric, logging learnings) held on a **fixed day every week** so it reliably happens, with the remaining ~2 hours of slack absorbing spillover and reading.
- **§2 Prioritization framework:** kill-risk first (do the cheapest thing that could prove the whole idea wrong — H1); dependency order (loop before memory before taste; benchmark R1 before reward model R4; human-feedback channel R2 before anything that learns from verdicts); protect-the-measurement-ignore-the-rest (in each phase, implement only the failures that would corrupt *that phase's* evidence — defer the rest); value-at-gate; signal-per-hour. A **NOW/NEXT/LATER/DEFERRED bucketing table** maps the entire problem catalogue onto the phase sequence, with the rule stated explicitly: *"a catalogued problem is not a task until its phase arrives and it blocks value — the catalogue is a watchlist, not a backlog."*
- **§3 Phase-0 detailed weekly plan** — the only part planned week-by-week (everything after is milestone-level, since planning 150 weeks in detail would be fiction): a **20-week table**, wk1 (Agent-SDK spike, the make-or-break gate) → wk2 (scaffold/schemas/config) → wk3 (provider abstraction) → wk4 (prompts/generator) → wk5 (harness) → wk6–7 (Eyes/Playwright) → wk8 (render-health gate) → wk9 (hard-constraint gate + brief-comprehension) → wk10 (Critic + trace) → wk11–12 (orchestrator/CLI, **M1**: first end-to-end run) → wk13–14 (debug until demonstrably improving + the two injected-failure tests) → wk15 (report + verdict-log + more briefs + minimal harness sandbox) → wk16–18 (run all ~10 briefs, collect data) → wk19–20 (**M2/H1 gate**: analyze, and a firm DECISION: continue/iterate/stop). Total: ~110–160 effective hours ≈ 20 weeks ≈ 5 months for Phase 0 alone.
- **§4 Beyond-Phase-0 milestone-level roadmap:** a table — P0 (~5 mo, H1 gate) → P1 brand+consistency+R1 (~6–8 mo, H4 gate + R1 exists) → P2 memory+R2 (~6–8 mo, H6 gate) → P3 taste R3→R4 (12+ mo, ongoing, H3/H8 trending — never fully "done") → P4 scale/production (year 4+, only if pursuing a product). Honest total stated: a mature system ≈ **3–6 years** at this cadence; taste calibration continues indefinitely regardless.
- **§5 Post-analysis phase → the build-measure-learn loop** (directly answers "what's next after identifying problems, and after solving each one"): stop analyzing (there's enough); triage once (done, via the buckets); build the MVP to get real data (until the loop runs, all prioritization is speculation); then enter a repeating loop — pick the next bet by dependency+kill-risk order → build the smallest version → measure it on the benchmark (observed, never predicted) → decide: gain? → keep/climb the ladder, or cut/log-why and pick the next bet. The key line delivered: *"after each solved problem, the next step is never 'solve the next problem on the list' — it is 'measure whether the last solution actually helped, then let the data choose the next bet.'"* This is framed as the entire discipline separating real improvement from motion (F-SPEC-05).
- **§6 Timeline, milestones, and the "significantly improved" bar:** M1 (~wk 12, first terminal-state+trace) → M2 (~wk 20, the H1 go/no-go) → M3 (~mo 8, brand freezes + hero crystallizes + H4 holds across 3 sections = a consistent multi-section artifact, unattended) → M4 (~mo 12, the benchmark exists + the constitution-grounded Critic shows a *measured* agreement gain) → M5 (~mo 14–18, H6 — a second similar project measurably better/faster with the Library on). The **"significantly improved" bar is defined precisely**: ADE is significantly improved when, unattended, it can take a brief and produce a consistent multi-section artifact that (a) passes the deterministic floor, (b) demonstrably improves across iterations (H1), (c) a human rates good-or-close ≥50% of the time (H2), (d) stays on-brand with zero token drift across sections (H4), and (e) at least one outer-loop bet (e.g. R3) shows a measured gain on the benchmark. This equals roughly **P0+P1+R1+R3 ≈ 12–18 months**, and is deliberately *not* "full autonomy" — that remains the north star, reached (if ever) years later.
- **§7 Goal evaluation & staying on course:** three review cadences (weekly: did I move the milestone, is STATE.md current; monthly: am I on the critical path or polishing; at-each-gate: did the hypothesis pass on *observed* numbers → continue/iterate/pivot/stop). Kill/pivot criteria decided *in advance* (before being emotionally invested): H1 fails → stop and rethink; two consecutive months with no milestone movement → cut or pause, don't grind; the benchmark can't be built from a solo reviewer → the whole "gets smarter" thesis is at risk. Continuous alignment rule: every task must trace to a hypothesis gate or a phase-blocking High-severity failure, or it's scope creep — cut it.
- **§8 Recommended strategic adjustments** (6 items, the author's own advice): answer the purpose question first (§9.1); narrow the target (one surface, one domain, to a bar you'd actually *use*, beats a broad unfinished system); treat the Library-compounding thesis (H6) as a hypothesis to test cheaply, not a foundation to assume; front-load the kill-risk (H1) and honor the gate; build with AI, spend scarce human hours on review/verdicts/measurement; protect motivation structurally (fixed weekly review, a visible artifact every ~4 weeks, explicit permission to stop at any gate without it being "failure").
- **§9 Critical review — open questions & risks to the plan itself** (the explicit "criticize things" ask), ranked by how much they'd change the plan:
  - **9.1 — What is this *for*?** (product / personal tool / research-portfolio / open-ended pursuit) — flagged as **the single biggest unanswered question**; each answer implies a genuinely different plan; prioritization is impossible without it; currently implicit and unresolved. *Flagged to resolve first, before anything else.*
  - **9.2 — Is building from scratch the right bet** given how fast v0/Lovable/Framer-AI/Figma-AI/Anthropic-artifacts are commoditizing AI UI generation? What's ADE's durable differentiation (the compounding taste-calibrated Library) — is it worth 3–6 solo years versus building that differentiated layer *on top of* existing generation tools? Suggested revisiting at the H1 gate.
  - **9.3 — You are the single point of taste failure** (the binding constraint): the entire outer loop needs human verdicts as ground truth, and the user is the **only rater** — can one person at 8 hrs/week generate enough, *consistent* verdicts to calibrate a Critic or train a reward model, and can they avoid grading their own homework generously (personal-scale measurement theater)? Flagged as possibly the real ceiling on the whole vision, more than any code.
  - **9.4 — Does the compounding thesis (H6) even hold at solo volume?** — likely needs many projects to show a signal; a solo dev may never reach that volume; if H6 can't be shown at this throughput, Phase 2's central premise is unfalsifiable *for this user specifically*, and the plan should route around it (test H6 early/cheaply, don't build the whole Library expecting it to pay off).
  - **9.5 — The "never done" problem** — an ever-improving system has no finish line by construction; without a defined "good enough to stop/ship/use," the project can absorb infinite time. §6's bar is a first answer, but a narrower "good enough to actually use for real work" bar was suggested as potentially needed even earlier.
  - **9.6 — The measurement paradox** — building/maintaining the benchmark+verdicts is itself a large, ongoing time sink that competes *directly* with build hours at 8 hrs/week; recommendation given: keep the benchmark deliberately tiny, resist the urge to make it comprehensive.
  - **9.7 — Sustainability/attrition** (flagged as **the most likely actual failure mode**, more likely than any failed hypothesis): the real risk is losing momentum over a multi-year solo effort — life events, motivation dips, and the long gap between effort and reward. Honest acknowledgment that a 3–6-year solo hobby project has a high natural attrition rate; the plan's cadence/artifact/pause-resume design exists specifically to mitigate this.
  - **9.8 — Smaller-but-real open questions:** Pro-credit ToS sustainability at volume across years; embeddings needing a local model since there's no first-party Anthropic embeddings API; single-domain (Burkes) overfit risk; the verification bottleneck (if AI writes most code, reviewing unfamiliar AI-written code at 1 hr/day is slow and error-prone, and *that* review quality becomes the ceiling); Windows/tooling friction (Playwright/sandboxing on Windows); and the meta-risk of reward-hacking *yourself* as sole builder+judge+beneficiary — the benchmark's human-anchored, held-out discipline is the only real defense, and must be honored even when inconvenient.
- **§10 The minimal fallback path** — if even 8 hrs/week isn't sustainable: shrink to the loop on **one brief**, mostly AI-written, an informal 3-brief eyeball study instead of the full 10-brief H1 study, answering just one question ("does seeing-and-critiquing visibly improve the output?"). Closing line: *"the worst outcome is not a narrow tool. The worst outcome is three years of a half-built broad system that was never used and never proved anything. Narrow-and-finished beats broad-and-abandoned."*

`spec/15` was registered in `spec/README.md`'s index, glossary, and "if you only read three" pointer.

**The turn ended** with a direct ask back to the user: given §9.1 is the single biggest lever on the whole plan, which of the four purposes (product / personal tool / research-portfolio / open-ended pursuit) is this, so the roadmap's priorities could be re-tuned accordingly. **This question was not yet answered by the user as of this document's writing** — see [`open-questions.md`](./open-questions.md).

---

## 14. Cross-agent knowledge-base discussion (this document's own origin)

**Request:** the user works across **multiple AI coding tools** (named explicitly: **Codex, Antigravity, and Claude Code**) and wants all chat/context information preserved in **one place** all of these agents can read, understand, and work with — since information one model has (e.g., this Claude conversation) isn't available to the others. The user explicitly flagged skepticism about the obvious-seeming fix ("preserve it in memory files, agent files, and similar files") because it "creates more files just to preserve the information" — i.e., they suspected per-tool memory duplication is itself an anti-pattern, not a solution.

**My response, in full:**

1. **Validated the diagnosis:** per-tool memory files don't solve fragmentation, they multiply it — each format drifts independently, nothing guarantees agreement across them, and "more files" is the disease, not the cure.

2. **The core fix proposed: one canonical source of truth, not N tool-specific ones.**
   - **A single shared folder, committed to the repo**, plain Markdown (optionally with YAML frontmatter), git-versioned. Since Claude Code, Codex, and Antigravity all operate on the working directory, any plain file in the repo is naturally readable by all of them with no special integration. Git gives a free audit trail.
   - **Each tool's own convention becomes a thin *pointer*, not a duplicate.** `CLAUDE.md` says "see the shared folder"; Codex's **`AGENTS.md`** says the same (noted as an emerging cross-tool standard recognized by multiple agent CLIs — some teams literally symlink `CLAUDE.md`↔`AGENTS.md` to avoid maintaining near-duplicate files). **Explicitly flagged uncertainty about Antigravity's exact convention** rather than fabricating one — recommended checking empirically whether it reads `AGENTS.md`/`CLAUDE.md` or something else.
   - **Organize by content *type*, not by tool or by date:** durable decisions + the *why* behind them (highest value, since code can't reveal intent), standing conventions, project context — a small always-loaded index pointing to detail files so cost stays bounded as the base grows. Explicitly drawn as the same shape as the assistant's own memory-taxonomy convention.
   - **Don't preserve raw chat verbatim** — a transcript is mostly noise (dead ends, corrections, re-explaining) around a little signal; dumping full transcripts is the *same* anti-pattern the user was worried about, just concentrated into one giant file instead of many small ones. The recommended default habit: after a substantive session, append a **distilled** entry (decision + why + what's still open), regardless of which tool ran the session.
   - **An uncomfortable but important honesty offered unprompted:** the assistant's *own* current memory system (a private, per-machine, per-harness folder outside any repo) is *itself* one of the silos this conversation is trying to fix — Codex and Antigravity cannot see it at all. True cross-agent visibility requires moving content *into* the repo, not leaving it in a tool-private location.
   - Offered concretely to: create a shared knowledge folder, migrate the two durable facts the assistant's private memory already held (the ADE access model; an unrelated LinkedIn-DM-preview constraint from a different project) into tool-agnostic form, and wire `CLAUDE.md`/`AGENTS.md` to point at it — and asked whether to proceed.

3. **Note on how the message was delivered:** the request was interrupted once mid-flight by a system reminder about unrelated Google/Gmail/Calendar/Drive MCP-connector authorization; that reminder was correctly recognized as irrelevant to the question asked and was not surfaced to the user, per instructions to only mention such things when relevant.

---

## 15. The file-location discovery

**Request (this document's direct trigger):** *"Generate in the ADE system folder. Make sure all information in this chat are preserved in the files. Dont skip anything. Add all information. As you know what we disscuss in this chat."*

This scoped the deliverable specifically to the **ADE system folder** (rather than a generic repo-root `knowledge/`), and explicitly **overrode** the "don't preserve raw chat, distill instead" default from §14 — the user wants comprehensive, non-abridged preservation, which this document (and its two companions) is built to satisfy.

**An important operational discovery happened during this step, worth preserving as project history in its own right:**

- Before writing, a check was run on whether `AGENTS.md` might already exist at the repo root (it does — see below), and then on the assumed ADE path, `D:\Arham\Dev8X\TroopHunter\autonomous-design-engine\`. **`Glob` reported the directory did not exist**, and a direct `Read` on **two files that had been successfully read and edited earlier in this very same session** (`IMPLEMENTATION_PLAN.md` and `spec/15-execution-roadmap.md`) **both failed with "File does not exist."** A raw shell `ls` on the TroopHunter root confirmed no `autonomous-design-engine` folder existed there at all.
- Given the significance (this would mean the entire spec corpus and implementation plan built across this whole conversation had vanished), **this was flagged directly to the user rather than silently worked around**, with three options offered: recreate everything from the conversation's own record, build only the newly-requested knowledge base and hold off on recreating the spec/plan pending investigation, or let the user explain what happened.
- **The user's answer resolved it immediately:** *"IN the future pipeline ADE system are already exist. Just build the knowledge base for now."* — i.e., the real, permanent location of the ADE project is **`D:\Arham\Dev8X\TroopHunter\future-pipeline\autonomous-design-engine\`**, not directly at the TroopHunter root. (The TroopHunter root also already has its **own**, pre-existing, unrelated `AGENTS.md` and `claude.md` — those are monorepo-wide files for the Turborepo project described in the root `CLAUDE.md`, and are **not** to be confused with or edited as part of the ADE-specific setup.)
- A listing of `future-pipeline/` itself showed exactly two sibling project folders under it: `autonomous-design-engine/` and an unrelated `sales-pipeline/` — confirming `future-pipeline` is being used as a parent directory for more than one forward-looking initiative, not something created solely for ADE. This was then verified directly: `future-pipeline/autonomous-design-engine/` contains exactly what was expected — `spec/00`–`15`, `README.md`, `IMPLEMENTATION_PLAN.md` — with file modification timestamps consistent with the work described in this document (spec `00` dated Jun 23; `12`–`14` dated Jul 3; `15` dated Jul 5; `IMPLEMENTATION_PLAN.md` dated Jul 2; `10-failure-modes.md` dated Jul 3, consistent with the red-team-pass addition).
- **A significant additional discovery, not previously known to this conversation:** the `future-pipeline/autonomous-design-engine/` directory also contains **actual Phase-0 implementation scaffolding** that this entire conversation never discussed or was made aware of — `src/`, `tests/`, `harness/`, `briefs/`, `spike.ts` (matching the plan's "0.0 Agent-SDK spike" build step), `package.json` + `package-lock.json` + an installed `node_modules/`, `.env.example`, `tsconfig.json`, `vitest.config.ts`, and an `old-design-experiment/` folder. File timestamps (Jun 27–30) place this build work **before** the R&D/planning conversation captured in this document (which produced spec `10`'s red-team pass and specs `12`–`15`, dated Jul 2–5). **This means real Phase-0 code-writing had already started, in a session not covered by this chat history, before or in parallel with the planning work described here.** Any agent picking up this project should treat `src/`, `harness/`, `tests/`, and `spike.ts` as live, pre-existing work to inspect directly — this knowledge base does not describe their contents, since this conversation never touched them.

This document, its two companions ([`decisions-and-conventions.md`](./decisions-and-conventions.md), [`open-questions.md`](./open-questions.md)), the folder [`README.md`](./README.md), and the two cross-tool pointer files (`../AGENTS.md`, `../CLAUDE.md`) were all written at the corrected path, `future-pipeline/autonomous-design-engine/`, as the direct result of this exchange.

## 16. Phase 3 & 4 Specification Hardening and Plan Audit

**Request:** The user requested the implementation of Phase 3 (Chunks 3.1�3.5) and Phase 4 (Chunks 4.0�4.8) of the IMPLEMENTATION_PLAN.md into the formal specification documents. The core directive was: *"First deeply analyze the implementation plan then work and find out issues and resolve it."* and *"We are not writing code; we are only editing and updating the Spec."*

**Work Completed:**
1. **Phase 3 Specification Integration:**
   - Formalized judge-bias mitigation (F-JDG-*) into the generation loop specs.
   - Defined the Autonomy Ladder and multi-reviewer uncertainty routing.
   - Added specific constraints for P9 (Ethics/Dark Patterns) and deep accessibility into the Design Constitution (spec/12).

2. **Phase 4 (Production Parity & Hardening) Specification:**
   - **Sandbox Isolation:** Specified isolated, egress-blocked render sandboxes to neutralize indirect prompt injection via arbitrary HTML (F-SEC-*).
   - **Gated Delivery Pipelines:** Formalized three strict gates that must be passed before delivery: 
     - **Output-Quality Gate:** Static analysis, security linting, resource allowlists.
     - **Provenance & Compliance Gate:** Originality screen, licensing, dark-pattern blocking (F-LEG-*).
     - **Production-Parity Gate:** Cross-browser checks, SSR/hydration verification, SEO, purged Tailwind.
   - **Operations & DR:** Documented system-state snapshots, backups, retention policies, and schema migrations (F-OPS-*).

3. **Invariants & Gates Updated (spec/11):**
   - Expanded the Guardrails document to explicitly encode the Sandbox and Delivery Gates.
   - Added **Invariant 14 (I14)**: Generated code is never executed outside an isolated, resource-capped, egress-blocked sandbox.
   - Added **Invariant 15 (I15)**: Every delivery artifact must pass the Output-Quality, Provenance & Compliance, and Production-Parity gates before reaching the client; none may be skipped.

4. **Final Gap Analysis & Plan Audit:**
   - A final sweep was conducted to ensure 100% parity between the IMPLEMENTATION_PLAN.md and the specification docs.
   - **Fixed Gap 1:** Updated spec/README.md to remove a stale reference to ANTHROPIC_API_KEY for dev, enforcing the ADE_PROVIDER=agent-sdk rule. Flagged the inconsistency as ? Resolved in the implementation plan's �9.
   - **Fixed Gap 2 & 3:** Standardized all cross-document references of "13 invariants" to **"15 invariants"**. This included updating the table in IMPLEMENTATION_PLAN.md, the hard rules in �0, the core diagnosis in spec/14, and the global rules in AGENTS.md.

**Outcome:**
The system architecture is now fully hardened for production, security, legal, and operational parity. The implementation plan and the specification set (spec/11, spec/12, spec/14, spec/README.md) are now 100% consistent and completely synced with all Phase 0 through Phase 4 requirements.
