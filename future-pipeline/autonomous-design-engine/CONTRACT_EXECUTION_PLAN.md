# CONTRACT_EXECUTION_PLAN.md — Executing the End-Goal Feasibility Contract

> **What this is.** The ordered, small-chunk plan that implements every finding and amendment in [`END_GOAL_FEASIBILITY_CONTRACT.md`](./END_GOAL_FEASIBILITY_CONTRACT.md) (CF-1…CF-17, CA-1…CA-21), the adopted remedies from [`ARCHITECTURE_INVESTIGATION.md`](./ARCHITECTURE_INVESTIGATION.md) (AI-F1…F9 / path items 1–10), and the documentation irregularities found during a full corpus re-review. It is written so that a mid-tier implementing model (Claude Sonnet 4.6 / Sonnet 5 / Opus 4.6, Gemini 3.1 Pro) can execute **one chunk at a time without further design decisions**.
>
> **What this is not.** It does **not** replace [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) — that remains the canonical build plan for ADE itself (chunks C0.x–C4.x). This plan does three kinds of work around it: (R/D/S) repair the corpus and verify the substrate, (M) amend the spec and the canonical plan so the contract's fixes are *inside* them before they are built, and (E) add small build chunks that ride along the canonical phases. **House rule preserved: the spec is canonical for design; every M-chunk edits `spec/` first, then reflects the change in `IMPLEMENTATION_PLAN.md`.**
>
> **Status:** proposal, awaiting owner ratification (chunk D4). R-chunks are safe to execute immediately (they make the corpus match the disk; no design change). M-chunks require D4. E-chunks ride the canonical build phases.
>
> **Read §7 first if you want to know whether this plan achieves the End Goal.** It does not, and §7 says exactly which of EG-1…EG-11 arrive, which are conditional on an owner decision, and which are out by choice. §1–§6 are the *de-risking* plan (findings → chunks); §7 is the *capability* plan (end goals → chunks → gates). Both are needed; only together do they form the contract.

---

## 0. Rules for the implementing model (read before any chunk)

1. **One chunk per session/commit.** Finish its `Done when`, commit, stop. Never batch chunks.
2. **Never edit `knowledge/chat-history.md`.** It is a historical record. Corrections to living knowledge go in `decisions-and-conventions.md` / `open-questions.md`.
3. **Never set `ANTHROPIC_API_KEY`** anywhere in dev config or environment. Dev = `ADE_PROVIDER=agent-sdk` (OAuth). This overrides anything else you read.
4. **Spec before plan.** If a chunk changes design, edit the `spec/` file first, then `IMPLEMENTATION_PLAN.md`, in the same chunk.
5. **Grep-verify after every link/renumber chunk.** Each such chunk names its verification grep; run it and paste the (empty or clean) result into the commit message.
6. **Conditional chunks are marked ⚑** with the decision that unlocks them. Do not execute a ⚑ chunk before its decision is recorded in `knowledge/decisions-and-conventions.md`.
7. **Respect dependency lines.** `Depends on: —` means executable now.
8. **When a chunk edits a file section, quote the exact current text in your working notes before replacing it** — if the text isn't found verbatim, stop and report drift instead of improvising.
9. Chunk ID prefixes: **R** reconcile · **D** decide (owner) · **S** substrate · **M** amend spec/plan · **E0–E3** build ride-alongs on canonical Phases 0–3. These deliberately do not collide with the canonical plan's C-chunks.

**Phase order:** R (now, any internal order except where noted) → D (owner, ~1 hour total) → S (first executable work) → M (after D4) → E0…E3 (with the canonical build). S may run in parallel with R/D except S5 (needs D4).

---

## 1. Phase R — Corpus reconciliation (doc-only; no design changes; ≈15–40 min each)

Fixes every item in the contract's drift inventory (CF-17 #1–9) plus irregularities found in the follow-up review. After Phase R, an implementing agent following `AGENTS.md`'s reading order hits zero dead references.

### R1 — Repoint all failure-catalogue links to `failures/`
- **Solves:** CF-17 #3 (CA-21)
- **Files:** `spec/README.md`, `spec/00–09`, `spec/11–14`, `IMPLEMENTATION_PLAN.md`, `AGENTS.md` (any occurrence)
- **Build:** The catalogue moved from `spec/10*.md` to `failures/overall-system-failures/10*.md`. Grep for `](./10-failure-modes.md`, `](./10a-` … `](./10e-` in `spec/*.md` → rewrite to `](../failures/overall-system-failures/10….md`. Grep for `](./spec/10` in `IMPLEMENTATION_PLAN.md` → rewrite to `](./failures/overall-system-failures/10….md`. Do **not** move any file; only links change. Inside `failures/overall-system-failures/*.md`, links to `./07-mvp-cli.md`-style spec docs must become `../../spec/07-mvp-cli.md` (grep `](./0`, `](./1` there and fix).
- **Done when:** `grep -rn "spec/10\|(\./10" spec/ IMPLEMENTATION_PLAN.md AGENTS.md` shows no dangling catalogue link, and every rewritten link resolves to an existing file (`ls` check).

### R2 — Invariant-count consistency
- **Solves:** CF-17 #4 (CA-21)
- **Files:** `IMPLEMENTATION_PLAN.md` §0.1; `knowledge/decisions-and-conventions.md`
- **Build:** (a) Plan §0.1: change the bold lead **"13 invariants, not 12."** to **"15 invariants."** (sentence already names I13/I14/I15 — keep it). (b) Knowledge decisions file, conventions table row `Invariant count`: replace with: **15** (I1–I15; I14 Sandbox Isolation and I15 Delivery-Gate sequence added during Phase-4 specification) — anything citing fewer is stale.
- **Done when:** `grep -rn "13 invariants\|12 invariants\|Invariant count" --include=*.md .` (ADE root) returns only `chat-history.md` (historical — untouched) and the two investigation reports (historical quotes — untouched).

### R3 — Renumber `spec/11`'s duplicate §7 and fix every cross-reference
- **Solves:** CF-17 #5 (CA-21)
- **Files:** `spec/11-guardrails-and-invariants.md`; then `AGENTS.md`, `IMPLEMENTATION_PLAN.md`, `failures/overall-system-failures/10a…`, `END_GOAL_FEASIBILITY_CONTRACT.md`
- **Build:** Current headings: §5 integrity · §6 security/sandbox · §7 Brief Comprehension · §7 System invariants (duplicate) · §8 coverage map · §9 MVP-vs-later · §10 summary. Renumber to: §7 Brief Comprehension (unchanged) · **§8 System invariants** · **§9 Coverage map** · **§10 What's in the MVP vs later** · **§11 How this changes the architecture**. Then fix cross-references corpus-wide: invariants `11 §7` → `11 §8` (e.g. `AGENTS.md` "See spec/11 §7"; plan §0 rule 5, §7 preamble, C0.16); Brief Comprehension `11 §6` → `11 §7` (plan C0.2 spec-source; `10a` F-INP-08); MVP table `11 §9` → `11 §10` (plan rule 1, Phase-0 preamble, C0.4). Leave `chat-history.md` and both investigation reports untouched (historical).
- **Done when:** `spec/11` has unique ascending section numbers; `grep -rn "11 §[0-9]\|spec/11 §" --include=*.md .` — every hit outside chat-history/investigation reports points at the section whose *content* matches the citation's subject (spot-check each hit against the subject: invariants→§8, comprehension→§7, MVP table→§10, Phase-Exit→§2.3).

### R4 — `spec/README.md` truth pass
- **Solves:** CF-17 #2 (CA-21); stale `trace.json`
- **Files:** `spec/README.md`
- **Build:** (a) Doc table: keep rows 0–14 (fix row 10's link per R1, noting the catalogue now lives in `failures/overall-system-failures/`); move rows 15–36 into a separate clearly-labeled table **"Planned / not currently on disk"** with one-line status (`15` deleted mid-rewrite by owner; `16–36` removed — targets only). (b) "Status & next step": replace the "v2.0 — COMPLETE EXPANSION" claim with the accurate state: docs 00–14 on disk; failure catalogue in `failures/`; 15 mid-rewrite; 16–36 not present; code: none (scaffolding deleted, restorable from git `28484962` — see `CONTRACT_EXECUTION_PLAN.md` S1). (c) Lines showing `trace.json` in the run layout (~309) and the MVP box (~434) → `trace.jsonl`. (d) "If you only read three" footnote: remove the instruction to read `15` for execution, point to `IMPLEMENTATION_PLAN.md` + this plan as interim execution authority (see R7).
- **Done when:** every link in `spec/README.md` resolves; no on-disk claim contradicts `ls spec/`; `grep -n "trace.json[^l]" spec/README.md` is empty.

### R5 — `spec/07` and `spec/09` internal-consistency fixes
- **Solves:** review findings (stale pre-hardening text inside otherwise-current specs)
- **Files:** `spec/07-mvp-cli.md`, `spec/09-roadmap-and-open-questions.md`, `failures/overall-system-failures/10d-…md`
- **Build:** In `spec/07`: §1 box line 20 `best section (html/css/js + screenshots + trace.json)` → `best section (React/TS .tsx + screenshots + trace.jsonl)`; §5 layout line ~170 `supporting/*.tsx` → annotate `# Phase 1+ only — Phase 0 emits exactly one self-contained Section.tsx (§6.1)`; §6 line ~199 `trace.ts # append/read trace.json` → `trace.jsonl`; §8 done-criterion 1 `trace.json` → `trace.jsonl`. In `spec/09` §7 step 4: `Read trace.json` → `Read trace.jsonl`. In `10d` F-STO-04 description: `trace.json` → `trace.jsonl`. Leave the deliberate historical quotes in `spec/13 §7` / `spec/14 R1` ("read trace.json by hand") — they describe the pre-charter workflow.
- **Done when:** `grep -rn "trace.json[^l]\|html/css/js" spec/ failures/` returns only `spec/13`, `spec/14` (the two intentional quotes) and nothing else.

### R6 — Knowledge-base living-document updates
- **Solves:** CF-17 #1, #6, #7, #8, #9 (CA-21)
- **Files:** `knowledge/decisions-and-conventions.md`, `knowledge/open-questions.md`
- **Build:** In `decisions-and-conventions.md`: (a) "Known project state" section — append a dated update: the Phase-0 scaffolding was **deleted** in commit `28a951a9` (empty `src/` remains); restorable from `28484962`; restoration decision tracked in this plan's S1. (b) "Execution plan / detailed-spec-per-phase" section — append: `spec/15` deleted mid-rewrite; `16/17/36` not on disk; the mapping table describes the **target convention**, not current state; interim execution authority = `IMPLEMENTATION_PLAN.md` + `CONTRACT_EXECUTION_PLAN.md` (per R7). (c) "The Research Engine" section — append: **engine deleted in `c2be66d0`** (superseded by the commissioned-investigation pattern: `prompt.md` → `ARCHITECTURE_INVESTIGATION.md`, `END_GOAL_FEASIBILITY_CONTRACT.md`); final disposition = decision D1. (d) Model-naming row — append: as of 2026-07, **Sonnet 5 (`claude-sonnet-5`) exists**; the "there is no Sonnet 5" note was correct only at time of writing; re-verify pinned ids at S3/C0.0. In `open-questions.md`: #8 → **MOOT** (scaffolding deleted; superseded by S1); #9/#10 → **OVERTAKEN** (engine deleted; superseded by D1); #5 → add pointer "scheduled: S2, Week 0"; #1 → add pointer "partially answered by the committed End-Goal statement; formalized in D3". Append; never delete prior text (mark resolved in place).
- **Done when:** every claim in the two files is consistent with `ls` of the repo; all four open-question statuses updated with pointers.

### R7 — Pointer files: `AGENTS.md` / `CLAUDE.md` reading order + interim authority
- **Solves:** CF-17 #1, #7 (CA-21); onboarding for implementing models
- **Depends on:** R1–R6 (so the pointers it adds are clean)
- **Files:** `AGENTS.md`, `CLAUDE.md`, `IMPLEMENTATION_PLAN.md` §9
- **Build:** (a) `AGENTS.md` reading order: replace item 6 (research-engine — deleted) with: *"`END_GOAL_FEASIBILITY_CONTRACT.md` — the ratified feasibility findings (CF/CA series); and `CONTRACT_EXECUTION_PLAN.md` — the plan executing them. `ARCHITECTURE_INVESTIGATION.md` and `prompt.md` are the investigation record behind them. Research-engine disposition: see D1 in the execution plan."* (b) Add to §"Rules that override defaults": *"`spec/15` is deleted (owner rewrite pending). Until restored, `IMPLEMENTATION_PLAN.md` + `CONTRACT_EXECUTION_PLAN.md` are the execution authority; the 'significantly improved' bar survives in `knowledge/decisions-and-conventions.md`."* Also update the one-paragraph summary's `spec/15` mention. (c) `CLAUDE.md` final line (research-engine link) → same replacement as (a), one sentence. (d) Plan §9: mark item 2 updated (15 deleted, 16–36 absent — reconciliation done by R4); Phase-4 exit-gate citation of `spec/15 §6` gains the fallback pointer.
- **Done when:** `grep -rn "research-engine\|spec/15" AGENTS.md CLAUDE.md IMPLEMENTATION_PLAN.md` — every hit is either the D1 note or carries the interim-authority fallback; no dead link remains.

### R8 — Schema source-of-truth + model-config consistency notes
- **Solves:** review findings (spec/03 §6 vs plan Appendix A divergence; spec/07 single `--model` flag vs role-separated ids)
- **Files:** `spec/03-data-model.md` §6, `spec/07-mvp-cli.md` §2/§7
- **Build:** (a) `spec/03 §6`: add a boxed note — *"Until `spec/16` exists, `IMPLEMENTATION_PLAN.md` Appendix A is **normative** for `trace.jsonl` field names (it is event-based and a superset of this section); this section remains canonical for entity semantics."* (b) `spec/07 §2/§7`: replace the single `--model claude-opus-4-8` flag/default with role-separated configuration consistent with plan Appendix B: `--gen-model` / `--critic-model` / `--orchestrator-model` (defaults from Appendix B; note that pinned ids are re-verified at S3 against the current lineup).
- **Done when:** `spec/07` exposes three role model ids; `spec/03 §6` carries the normativity note; no doc claims a single-model default.

---

## 2. Phase D — Owner decisions (~1 hour total; each recorded in `knowledge/decisions-and-conventions.md` as a dated entry)

### D1 — Choose the self-improvement mechanism
- **Solves:** CA-20 / CF-9 (EG-5)
- **Options:** **(a — default recommendation)** Bless the commissioned-investigation pattern: create `investigations/` at ADE root; move `prompt.md`, `ARCHITECTURE_INVESTIGATION.md`, `END_GOAL_FEASIBILITY_CONTRACT.md` into it (update links); add `investigations/BACKLOG.md` (permanent, append-mostly, EVI-style ranked open questions — seed it from the contract's deferred items); write `knowledge/research-method.md` — a **one-page** port of the deleted engine's load-bearing epistemics: Evidence Ladder T0–T4 with confidence caps, pre-registration, mandatory status-quo steelman, null-result parity, provenance header — plus the tier both investigations needed: **"established (direct repo observation)"** for facts read directly from the repo. **(b)** Restore the engine: `git revert`-style restore of `research-engine/` from `5d819749`, frozen (no further engine docs until it produces one validated delta). Either way: update the R6/R7 markers to the final state.
- **Done when:** decision recorded; the chosen structure exists on disk; zero remaining "pending D1" markers.

### D2 — Ratify the scope: what ADE is (and is not) building toward
- **Solves:** CA-11, CA-14 (EG-3/EG-8/EG-9 honesty); resolves open-question #1's practical core
- **Build:** One recorded paragraph choosing: **(default)** ADE's target = **composition/UI-design intelligence** (layout, typography, color, componentry under brand law) — copy, imagery/art-direction, iconography, and motion authoring are **out of scope** unless later funded as named phases (R15-class); EG-8 "complex design workflows" (multi-page, forms, email, dashboards) is **outside the current architecture** — any expansion goes through the per-surface capability checklist (plan C3.7). Alternative: fund the missing chairs — then M15/E2.4 and an imagery phase must be added to the roadmap now.
- **Done when:** recorded in knowledge; D3 reflects it.

### D3 — Commit the End Goal as a versioned, split document
- **Solves:** CA-17 (EG honesty); open-question #1
- **Files:** new `END_GOAL.md` at ADE root
- **Build:** Two sections: **Bounded Goal** (the ratified near-horizon target — take contract §5's paragraph verbatim, adjusted by D2) and **North Star** (the aspirational clauses with their named preconditions: EG-2 → strategy layer + research capability; EG-3/9 full → missing chairs + external-anchor evidence + multi-rater signal; EG-7 → substrate-succession discipline; EG-8 → workflow architecture; EG-11 → reworded to "the *system's* intelligence compounds through data, anchors, and substrate succession" per CF-2). Include inside the Bounded Goal the **"good enough to actually use for real work" bar** (open-question #6): the earlier, narrower threshold at which the owner would ship ADE output on a real section instead of hand-building — defined now so the never-done problem has a brake. Update `open-questions.md` #1 → answered-in-part and #6 → answered, pointers to `END_GOAL.md`.
- **Done when:** `END_GOAL.md` committed; referenced from `AGENTS.md` reading order.

### D4 — Ratify the contract and this plan
- **Solves:** governance (spec edits require deliberate ratification)
- **Build:** Owner reviews `END_GOAL_FEASIBILITY_CONTRACT.md` §4 and this plan; accepts or amends per-CA; records ratification (with any rejections) in knowledge. Resolve the ⚑ flags: M15/E2.4 (strategy layer) unlock only if D3's Bounded Goal or North-Star commitment includes EG-2. D4 also adopts the **meta-work moratorium** (AI-F6's remedy): after Phase D, no *new* spec/meta document may be created until the H1 gate has data — R/M-chunk edits to existing documents are exempt; new investigations require an explicit owner commission.
- **Done when:** dated ratification entry exists naming any rejected/deferred CAs; M-chunks unblocked.

---

## 3. Phase S — Substrate verification (the first executable work; S1–S4 may run in parallel with Phase D)

### S1 — Restore the Phase-0 scaffolding from git and reconcile it
- **Solves:** CA-18 precondition; AI path #2; makes open-q #8's audit possible again
- **Files:** restore from commit `28484962` (or nearest ancestor containing them): `spike.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `.env.example`, `vitest.config.ts`, `harness/`, `src/`, `tests/`, `briefs/`
- **Build:** `git show 28484962 --stat` to enumerate; restore files into the working tree (`git checkout 28484962 -- <paths>` from repo root). Then reconcile against the current contracts: diff restored config/trace/schema code against plan **Appendix A/B** (which post-date the code) and log a **keep/rewrite decision per file** in `knowledge/decisions-and-conventions.md` (one table: file → keep / rewrite / delete → reason). Expect drift: the code predates the per-candidate nonce, JSONL trace, and provider-role split; that is what the log captures. `.env.example` must not contain `ANTHROPIC_API_KEY` (delete the line if present; note it).
- **Done when:** `npm install` succeeds; `npx tsc --noEmit` runs (errors allowed, must be listed); the keep/rewrite table is committed.

### S2 — Pro-credit ToS & quota verification
- **Solves:** CA-18a / CF-14; open-question #5
- **Build:** Read the current Anthropic Consumer Terms + Claude Pro usage policy + Agent SDK docs for: automated/unattended use permissions on Pro credit, rate/weekly limits, and any prohibition relevant to ADE's loop volume. Record verbatim-quoted findings, limit numbers, and a go / conditional-go / no-go verdict in `knowledge/decisions-and-conventions.md` (access-model section). If no-go: escalate to owner before any further S/E work (the dev model changes).
- **Done when:** dated ToS note with quotes + measured/documented limits exists; open-q #5 marked resolved or accepted-risk.

### S3 — Day-0 Agent-SDK spike (restored) — run it
- **Solves:** CA-18 precondition; plan step "0.0"; assumptions A7
- **Depends on:** S1, S2
- **Build:** Using the restored/updated `spike.ts` with `ADE_PROVIDER=agent-sdk` and **no `ANTHROPIC_API_KEY`**: prove (1) headless OAuth credential pickup, (2) text completion, (3) a vision call on a local PNG, (4) token-usage retrieval per call. Also record which current model ids resolve (re-verify Appendix B's pins: `claude-sonnet-4-6` vs `claude-sonnet-5` availability — record, don't silently change; the pin change is a one-line plan edit noted in the log).
- **Done when:** all four capabilities demonstrated with logged outputs committed under `investigations/` (or `runs/spike/`); failures escalate to owner (they change the access model).

### S4 — H1 budget arithmetic under the repaired design
- **Solves:** CA-18b / CF-14
- **Depends on:** S2, S3 (real usage numbers), M1 (design — may be drafted in parallel, finalized after)
- **Build:** Compute: (briefs n=20–25) × (loop: ≤6 iters × candidates per Appendix B + repairs + critiques) × 2 (control arm, M1) ≈ total calls/tokens; compare against S2 limits per week; derive the run cadence (briefs/week) and total calendar time; if infeasible, propose the reduced design (n, iters, or serialized weeks) for owner sign-off. Record in knowledge.
- **Done when:** an arithmetic note (inputs → totals → cadence decision) is committed.

### S5 — Credit-telemetry amendment (spec/plan edit)
- **Solves:** CA-18c
- **Depends on:** D4
- **Files:** `IMPLEMENTATION_PLAN.md` C0.0, C0.13, Appendix A
- **Build:** Appendix A `RunRecord`: add `"quota": { "calls_today": n, "tokens_today": n, "window_note": str }` (cumulative counters maintained by the provider wrapper; provider APIs may not expose remaining quota — counters suffice). C0.0 build text: provider wrapper maintains counters, persisted per record. C0.13: budget section gains "report burn-rate vs S2 limits in `ade report`". Code lands in E0.4.
- **Done when:** the three plan locations updated coherently.

---

## 4. Phase M — Spec & plan amendments (each: spec first, then plan; unblocked by D4)

### M1 — Repair the H1 experiment (the matched-compute control arm)
- **Solves:** CA-1 / CF-1 — **highest priority in this phase**
- **Files:** `spec/08-hypotheses-and-validation.md` §2 (H1) + §5; `spec/07-mvp-cli.md` §8; `IMPLEMENTATION_PLAN.md` Phase-0 exit gate + C0.16
- **Build:** (a) `spec/08 §2 H1` — replace the pass metric with: *primary:* for each brief, run the loop **and** a **matched-compute control** (same brief, same total candidate count, same config, **no feedback carry-forward** — fresh independent generations at `genTemperature`, best selected by the same Critic); H1 passes iff **humans blind-prefer the loop's final over the control's best at significance** (exact binomial test, pre-registered α=0.05, n≥20 briefs; n=10 = pilot only, report CI, no gate decision). *Secondary (descriptive, not gating):* the old iter-0-vs-final prongs; per-iteration **loop-gain** (best-score delta per iteration) and plateau shape. *(b)* Add the optional **in-iteration interleave** variant: one fresh no-feedback candidate generated inside each loop iteration, flagged `control_inline`, its win-rate vs feedback-conditioned siblings reported. *(c)* `spec/08 §5` exit gate rewritten to match; note explicitly *why* (the selection confound: under a no-learning null, "final > iter-0" passes ≈(N−k)/N of the time by sampling alone). *(d)* `spec/07 §8` done-criteria: criterion 3 becomes the loop-vs-control comparison. *(e)* Plan: Phase-0 exit gate text updated; C0.16 verdict tool → **three-way blind** (iter-0 / final / control-best presented in random order, positions logged).
- **Done when:** all four locations agree; a reader of `spec/08 §5` alone can implement the study; the old metric survives only as "secondary/descriptive".

### M2 — External-anchor track in the Evaluation Charter
- **Solves:** CA-2 / CF-3
- **Files:** `spec/13-evaluation-charter.md` (new §"The external anchor"); `IMPLEMENTATION_PLAN.md` C1.13
- **Build:** New charter section: (1) **anchor set** — 10–20 world-class reference works (award/studio sources named; refreshed annually; stored as screenshots + source links; *never* used as generation direction — same held-out discipline as exemplars); (2) **blind side-by-side protocol** — ADE outputs vs anchor pieces and vs **competitor-tool outputs** (same brief run through v0/Lovable/Framer-class tools where licensable), rated blind by the owner (+ any second rater), reported as a standing **distance-from-anchor** metric alongside Critic↔human agreement; (3) reporting rule — external-anchor results can never be replaced by internal metrics in phase-gate decisions about quality claims (EG-9 language); (4) **eval-session hygiene** — golden-core and anchor briefs are used only in dedicated evaluation sessions, never as generation inputs outside eval runs (cheap insurance against slow held-out erosion, AI §7.5). Plan C1.13: benchmark build now includes anchor-set assembly + the side-by-side protocol.
- **Done when:** charter section exists; C1.13 updated; the phrase "world-class" in any gate criterion resolves to this metric.

### M3 — Autonomy-ladder stratification + standing audits
- **Solves:** CA-3 / CF-4
- **Files:** `spec/09` §2; `spec/13` §4; `IMPLEMENTATION_PLAN.md` C3.2, C1.13
- **Build:** `spec/13 §4`: golden-core/frontier cases carry a **difficulty stratum** tag (`routine | hard | adversarial`; system-proposed adversarial cases default to `adversarial`). `spec/09 §2`: a rung is climbed only when the boundary's agreement clears the threshold **in every stratum including `hard`/`adversarial`**; every relaxed gate carries a **standing random audit** (≥10% of unattended passes human-re-reviewed, forever); the **measured audit miss-rate** — not complaints — is the automatic drop-back trigger. Add the **pre-registered power analysis**: per boundary × stratum, the verdict sample size required for the agreement threshold to be statistically meaningful (the arithmetic `spec/13 §9` calls for), recorded as a standing artifact that every rung promotion must cite. Plan C3.2/C1.13 updated to match.
- **Done when:** both specs + both chunks agree; "agreement" is nowhere defined without its stratum.

### M4 — Verdict future-proofing + substrate non-stationarity (spec + 2 new failure entries)
- **Solves:** CA-7 / CF-10; verification-gap G5 (tags must start in Phase 0, not Phase 2)
- **Files:** `spec/13` (new §"What ages and what survives"); `IMPLEMENTATION_PLAN.md` C0.16 + Appendix A; `failures/overall-system-failures/10d-…md` + `10-failure-modes.md` index
- **Build:** (a) Charter section: table of **ages** (prompt calibration, thresholds, reward model, benchmark ratings — with re-earning cost) vs **survives** (verdict corpus, golden-core briefs, strategy data, deterministic gates, library payloads); rule: **every verdict is distribution-tagged** at capture (generator/critic model ids + config version + system-snapshot ref); reward-model retrain triggers on distribution shift; the output-representation commitment (React/Tailwind) gains an explicit revisit trigger. (b) Plan C0.16 verdict schema + Appendix A gain the tag fields (Phase 0 — the corpus is only future-proof if tagged from the first verdict). (c) New failure entries, 8-field format: **F-MOD-07 — verdict-distribution staleness** (verdicts collected on model-M1 outputs mistrain judges of M2's distribution) and **F-MOD-08 — calibration non-transfer across model swap** (prompt-level Critic calibration is bound to a model id and does not survive succession; distinct from F-LRN-02's *domain* non-transfer); add both to the `10` index table.
- **Done when:** charter section exists; verdict schema carries tags from Phase 0; both F-entries present in `10d` + index.

### M5 — Strategy-decision capture schema
- **Solves:** CA-9 / CF-5 (warm-start for EG-2); AI path #4b
- **Files:** `spec/07` §3 (adjacent new sub-section); `IMPLEMENTATION_PLAN.md` C0.15
- **Build:** Define `plan.json` (per run, human-authored, optional in Phase 0 single-section mode but *recorded when present*): `{ sections: [{name, order, purpose}], narrative_rationale, copy_decisions: [{element, choice, rationale}], audience_notes, decisions: [{decision, alternatives_considered?, rationale, author: "human"}] }`. Rule: whenever the human makes an IA/copy/structure choice that shapes a run, it is captured here — this corpus is the future strategy layer's training data (EG-2). Plan C0.15: persist `plan.json` (when supplied) into `runs/<out>/` and reference it from the trace.
- **Done when:** schema specified with an example; C0.15 updated; capture is explicitly *passive* (no prompt/behavior change in Phase 0).

### M6 — Sandbox/CDN reconciliation + typeface-substitution honesty
- **Solves:** CA-15 / CF-15
- **Files:** `spec/07` §6.2; `spec/05` §6.2 (Critic prompt spec); `IMPLEMENTATION_PLAN.md` C0.4, C0.5, C0.8
- **Build:** (a) `spec/07 §6.2`: replace "Tailwind via Play CDN `<script src=…>`" with **vendored runtime**: the Play-CDN script is downloaded once at setup, pinned by version + checksum, served from `harness/vendor/`; all fonts self-hosted in `harness/public/fonts/` (Google-Fonts files fetched at setup; commercial faces mapped to nearest local fallback **with the substitution recorded per run**); the sandbox's **deny-all egress now holds with zero allowlist exceptions** — a candidate render that triggers any network request fails render-health. (b) `spec/05 §6.2` Critic prompt spec: add a `CAVEATS` input slot — when a font substitution is active, the Critic is told *"'<family>' is rendered via fallback '<fallback>'; judge type scale/weight/hierarchy, not letterforms"*. (c) Plan C0.4/C0.5/C0.8 updated to match (vendor step in harness setup; caveat plumbed from run config into the critic prompt builder).
- **Done when:** no document mandates a runtime CDN/network fetch; the caveat mechanism appears in both the prompt spec and C0.8.

### M7 — Escalation-queue component (spec)
- **Solves:** CA-16 / CF-16
- **Files:** `spec/06-workflows.md` (new §9 "Escalations & asynchronous answers"); `spec/05` §5 note; `IMPLEMENTATION_PLAN.md` (register new chunk E1.2 in Phase 1)
- **Build:** Spec the queue: a persistent `escalations.jsonl` (per project; `runs/<out>/` in Phase 0) of typed records `{ id, ts, run_id, type: "question" | "budget" | "oscillation" | "render_abort" | "gate_disagreement", context_ref, question?, options?, status: "open" | "answered" | "expired", answer?, answered_at? }`. Semantics: Phase 0 = **park-and-rerun** (an answered question re-enters as input to a fresh run — no mid-run resume, consistent with the MVP's accepted no-resume gap); Phase 1+ = the queue becomes the standard surface for *all* human touchpoints (comprehension questions, budget escalations, Phase-Exit disagreements), batch-answerable asynchronously. `spec/05 §5`: escalation rows now emit queue records (escalation = a designed interaction, not just a terminal state).
- **Done when:** spec section exists with the record schema; plan lists E1.2 with a done-when; Phase-0 loop text references queue emission.

### M8 — Protected exploration + rejected-with-interest label
- **Solves:** CA-12a/b / CF-13
- **Files:** `spec/05` §5/§7; `IMPLEMENTATION_PLAN.md` C0.11 note, C2.8
- **Build:** `spec/05`: in explore iterations, **one candidate is flagged `exploration: true`** — generated at higher temperature or with an explicit "take a defensible risk" instruction, exempt from the scoped-feedback constraint, logged in full, eligible for selection **only** through the normal Pass Gate (never a quality bypass); its purpose is preserving discontinuous options and giving the human review queue interesting rejects. `spec` note for the R2 channel (and plan C2.8): verdicts support a **`rejected_with_interest`** label feeding R13 trajectory learning. Plan C0.11 gains the flag.
- **Done when:** both spec locations + both chunks updated; the flag's non-bypass property is stated explicitly.

### M9 — Cross-family second judge + bias probes
- **Solves:** CA-13 / CF-7
- **Files:** `spec/11` §2.3; `spec/13` §4; `IMPLEMENTATION_PLAN.md` C1.3, C1.6, C1.13, C3.1
- **Build:** (a) `spec/11 §2.3`: high-stakes Phase-Exit boundaries (Brand, PDS freeze, rung-promotion evidence) add a **second review by a different model family** (dev: via the `local`/Ollama provider — key-free; prod: second vendor); disagreement between judges **escalates to the human** (queue, M7), never silently averaged; both verdicts recorded. (b) `spec/13 §4`: add a **bias-probe suite** to the benchmark from birth — order-swap, verbosity-inflation, and style-transfer probes with measured verdict stability; report **same-model vs cross-model agreement** as separate standing metrics (their gap = measured correlated-blind-spot size). (c) Plan: C1.3/C1.6 gain the second-judge step; C1.13 gains probes; C3.1's scope note references the probes now existing since Phase 1.
- **Done when:** spec + all four chunks agree; the dev path is explicitly key-free.

### M10 — Phase-2 rescope: verdict corpus + own-client memory first
- **Solves:** AI-F2 (adopted by contract); CA-6 prerequisite; verification-gap G3
- **Files:** `spec/04-memory-and-consistency.md` (scope note in §1/§6); `IMPLEMENTATION_PLAN.md` Phase-2 preamble + chunk ordering
- **Build:** (a) `spec/04` note: the Library thesis is tested in **stages** — stage A: **own-client memory** (retrieval over the same client's approved sections/screenshots — no de-identification needed, no altitude review) + the **verdict corpus** as the primary compounding asset; stage B: the cross-client de-identified Library **only after** stage A's ablation shows retrieval adds value beyond model priors. (b) Plan Phase-2 preamble rewritten to this staging; C2.5–C2.7 (write-back/de-id machinery) marked **stage-B, gated on the stage-A ablation result**; new chunk **E2.1** (own-client store) registered before them; the H6 gate references the three-arm design (M11→CA-6 via E2.2).
- **Done when:** plan Phase 2 reads: E2.1 → ablation → (conditional) C2.5+; spec/04 carries the staging note; nothing builds de-id machinery before the gate.

### M11 — R4 re-plan: RLAIF bulk + human anchor; distillation; outcome-signal pull-forward
- **Solves:** AI-F1 remedy (a); CA-5; CA-12c; verification-gap G4; `spec/14` verdict-economics gap
- **Files:** `spec/14-research-agenda.md` (R4 entry + §5 Tier-0 note + R16 note); `IMPLEMENTATION_PLAN.md` C3.5, C2.8 note
- **Build:** (a) R4 rewritten: training bulk = **AI preference labels** (strongest available model, decorrelated contexts, cross-family where feasible per M9), with the human golden core + human verdicts as **calibration and held-out validation only** — the solo-scale answer to signal starvation; volume budgeted against S2 quota findings. (b) Add the **judge-distillation** framing: a small trained reward model is the system's only weight-level learning lever; prod-only path acceptable. (c) R16 note: pull a **coarse outcome signal** forward wherever free — analytics on the owner's own shipped projects — as R16-lite, logged next to verdicts. (d) §5/Tier-0: add the **verdict-economics** observation (maximum calibration per human-minute is arguably Tier-0; R14 promoted to land with first verdict flow — cross-ref M16). (e) Register the cheap **feedback-channel A/B** (identical critique delivered as text vs. annotated screenshot regions) as an R2 design input — it tests whether the *channel*, not the judge, bottlenecks the loop (AI §12.3). Plan C3.5 updated to the RLAIF design; C2.8 gains the R16-lite field and the channel-A/B note.
- **Done when:** R4's experiment text matches; C3.5 consistent; R16-lite and verdict-economics notes present.

### M12 — Substrate-succession subsystem
- **Solves:** CA-4 / CF-2, CF-10
- **Files:** `spec/13` (extends M4's section) or `spec/11 §4` — put the **playbook** in `spec/11 §4` (resilience) and the **asset inventory** in `spec/13` (M4's section); `IMPLEMENTATION_PLAN.md` (register E3.2)
- **Build:** `spec/11 §4` gains "Model succession playbook": on any model swap (deprecation or upgrade): (1) freeze current benchmark scores as the old baseline; (2) re-run golden core on the new model (regression gate); (3) re-verify gate calibrations (a11y thresholds unaffected; Critic thresholds re-earned); (4) retrain/refresh reward model per M4's triggers; (5) re-embed if the embedding model changed (existing F-MEM-03 rule); (6) record a succession entry (old id → new id → deltas) in knowledge. Frame per CF-2: **model upgrades are the system's capability escalator; the subsystem's job is absorbing them without losing calibration**. Plan registers E3.2 (exercise at first real swap).
- **Done when:** playbook exists; E3.2 registered; F-MOD-07/08 (M4) referenced as the failures it closes.

### M13 — Human test-retest ritual
- **Solves:** AI-F8; verification-gap G1
- **Files:** `spec/13` §4; `IMPLEMENTATION_PLAN.md` C0.16 note
- **Build:** Charter §4 addition: a fixed **retest set** (~10 artifacts, frozen early in Phase 0) is re-rated by the owner **quarterly**, blind to prior ratings; self-agreement (test-retest correlation) is logged with the benchmark; a drift alert (agreement below a pre-registered floor) triggers review of all thresholds calibrated on that rater. Plan C0.16: the verdict tool supports `--retest` mode (build = E0.7).
- **Done when:** ritual + floor specified; C0.16 updated.

### M14 — Crystallization mini-experiment (design-system-first vs hero-first)
- **Solves:** AI-F7; verification-gap G2
- **Files:** `spec/04` §3 (note); `IMPLEMENTATION_PLAN.md` (register E1.4)
- **Build:** `spec/04 §3` note: at the Phase-1 boundary, run the A/B — arm 1: current hero-first crystallization; arm 2: **derive a candidate token system from brand + brief before section 1**, hero *validates* it. Metrics (already built by then): token-extension frequency, Phase-Exit intervention rate, H4 drift/variety, human preference. Adopt whichever wins; this is an experiment, not a redesign. Plan registers E1.4.
- **Done when:** note + E1.4 exist with the two arms and metrics named.

### M15 — ⚑ Strategy/IA layer promotion + research-capability gating *(unlock: D3 includes EG-2)*
- **Solves:** CA-8, CA-10 / CF-5, AI-F3
- **Files:** `spec/09` §1 roadmap; `spec/11` §2.1 (Input Gate row) + `failures/…10e` F-SEC-02; `IMPLEMENTATION_PLAN.md` (register ⚑E2.4)
- **Build:** (a) `spec/09 §1`: insert a named milestone after the H4 gate — **Strategy/IA layer** (R9-class: audience/positioning → site plan/narrative → per-section goals; itself Phase-Exit-Reviewed; hypothesis: measurably raises brief-fit + whole-page coherence vs human-planned baseline **using the M5-captured corpus as its evaluation baseline**). (b) If the layer performs external research (web/competitive lookup): `spec/11` Input-Gate discipline extends to fetched content — untrusted data, delimiter-wrapped, provenance-logged, never a hard input; broaden F-SEC-02's wording from "references / Library" to "any fetched external content, including research material". (c) Plan: ⚑E2.4 registered with dependencies (M5 corpus, C1.13 benchmark).
- **Done when:** roadmap milestone + gating rules exist; ⚑ status recorded.

### M16 — Two-tier knowledge adoption + R14 promotion
- **Solves:** CA-19 / CF-12
- **Files:** `spec/12` §7; `spec/13` §5; `spec/04` §6; `IMPLEMENTATION_PLAN.md` C2.5/C2.7/C3.3 notes
- **Build:** Define the two tiers across all knowledge writes: **Tier A (strict human ratification, unchanged):** constitution amendments, golden-core changes, brand approval, gate/rung relaxation. **Tier B (provisional adoption):** Library/own-client memory entries, frontier eval candidates, low-stakes calibration exemplars — may be adopted immediately with `provisional: true`, subject to (1) mandatory random audit sampling, (2) **auto-expiry unless human-confirmed within a set window**, (3) instant revocation on audit failure. Promote **R14 (uncertainty-routed review)** to land with first verdict flow (cross-ref M11d): route the human's scarce minutes to low-confidence/high-stakes items. Update the three spec files + plan notes coherently.
- **Done when:** every knowledge-write path in spec/04/12/13 declares its tier; expiry + audit rules stated; R14's promotion is reflected in plan C3.3 (and referenced from C2.x).

### M17 — Deterministic DOM craft metrics (the middle layer between axe-core and the Critic)
- **Solves:** AI-F4 (missing capability #3) — applies the spec's own RP-1/I3 principle one level deeper; added in the v1.1 verification pass (G7)
- **Files:** `spec/11` §2.1 (Hard-Constraint Gate row — new *advisory* sub-block); `IMPLEMENTATION_PLAN.md` C1.7 note (register E1.5)
- **Build:** Specify **advisory craft metrics** computed deterministically from the rendered DOM at gate time: spacing-scale conformance (share of margins/paddings on the token scale — PDS-dependent, so Phase 1+), type-scale conformance, alignment/grid regularity (clustering of element-edge x-coordinates), tap-target geometry. Two rules: (1) **advisory, not gating, at introduction** — values are written to the trace and injected into the Critic's context as measurements ("87% of spacing values on-scale"), moving a slice of "craft" from the noisiest component (VLM) to the cheapest (code) without adding a brittle hard gate; (2) any metric is promoted to *gating* only on benchmark evidence that it correlates with human craft verdicts.
- **Done when:** the spec row exists with the advisory/gating distinction stated; E1.5 registered in the plan.

> **The four chunks below (M18–M21) come from the v1.2 End-Goal audit (§7), not from the contract's CF/CA series.** They exist because resolving findings removes blockers but does not build capability — these close the EG gaps that no finding named.

### M18 — Comprehension-depth measurement (EG-1's only honest gate)
- **Solves:** EG-1 (gap G13); gap D1 in `spec/14`'s map ("brief comprehension is a one-line restatement, not real strategy work", ★★★) — which had an R9 bet but no near-term measurement
- **Files:** `spec/13` §3 (golden-core case definition); `IMPLEMENTATION_PLAN.md` C1.13, C0.2 note
- **Build:** Every golden-core brief gains a human-authored **reference interpretation**: `{ goal, audience, constraints, audience_psychology_notes, non_obvious_implications[] }` — written *before* the system sees the brief, frozen with the case. The Brief-Comprehension step's output is scored against it on two axes: **restatement accuracy** (does it get the stated facts right — extends R1's non-English metric to all briefs) and **interpretation depth** (does it surface the non-obvious implications a competent strategist would — scored by a human, or by a cross-family judge validated against human scores per M9). This number is the *only* thing standing between "we have comprehension" and "we have a one-line paraphrase we never checked."
- **Done when:** the benchmark reports restatement accuracy and interpretation depth per brief; a deliberately subtle brief (stated goal ≠ real goal) is measurably under-interpreted by the current one-call comprehension step — establishing the baseline ⚑M15's strategy layer must beat.

### M19 — Originality as a standing metric (EG-3's named-but-unmeasured clause)
- **Solves:** EG-3 (gap G14); pulls F-LEG-01's originality screen forward from its Phase-4 grave as a *metric*
- **Files:** `spec/13` (extends M2's external-anchor section); `IMPLEMENTATION_PLAN.md` C1.13, C4.3 note
- **Build:** EG-3 names originality explicitly, and today the only mechanism is C4.3 — a Phase-4 legal gate that will never inform design decisions. Add two **advisory** measures to the benchmark from Phase 1: (1) **human distinctiveness rating** on the same blind pass as the anchor comparison (M2) — "would you recognize this as one of N generic AI outputs, or as a considered piece?"; (2) **self-similarity across briefs** — an embedding-distance measure over ADE's own outputs for *different* briefs (the monoculture early-warning: F-GEN-02/F-WB-05 at the output level, measurable long before the Library exists). Both are reported, neither gates. The Phase-4 legal similarity screen (C4.3) remains separate and unchanged.
- **Done when:** both numbers appear in the benchmark report; a deliberately generic control output scores measurably lower on distinctiveness than a considered one.

### M20 — Self-weakness detection (the outer loop's eyes — EG-5's core)
- **Solves:** EG-5 (gap G15) — the largest capability hole the contract never named
- **Files:** `spec/14` (new §"Self-directed weakness detection"); `IMPLEMENTATION_PLAN.md` (register E3.3)
- **Build:** Today *the owner* commissions investigations (D1) and *the owner* notices patterns. Nothing lets ADE surface its own weaknesses from its own data — yet the substrate for it (trace + verdicts + gate results, all structured) exists from Phase 0. Spec a **periodic self-audit pass**: over the accumulated `trace.jsonl` + verdict corpus, cluster (a) recurring hard-gate violation classes, (b) recurring Critic↔human disagreement patterns *by dimension and stratum*, (c) briefs/sections with systematically low scores, (d) escalation causes (M7's queue). Emit three typed proposal streams: **new failure-catalogue entries** (→ `failures/`), **constitution-amendment proposals** (→ `spec/12 §7`'s protocol, which is specified but was never given a mechanism), and **frontier eval cases** (→ `spec/13 §5`'s protocol, same problem). Every proposal is evidence-cited (the trace rows that produced it) and enters as **Tier A** (strict human ratification, per M16) — the system proposes, never adopts.
- **Done when:** the spec section defines the three streams with their evidence requirements; E3.3 is registered; a seeded recurring failure in synthetic trace data is surfaced by the pass with its supporting rows cited.

### M21 — ⚑ Expanded-scope roadmap: the missing chairs *(unlock: D2 chooses expanded scope)*
- **Solves:** EG-3's "complete" clause and EG-9 (gap G16) — currently foreclosed by D2's default
- **Files:** `spec/09` §1 roadmap; `IMPLEMENTATION_PLAN.md` (register the milestones)
- **Build:** D2's default scope (composition/UI intelligence) makes EG-3's *"complete design solutions"* and EG-9's *"world-class design organization"* **permanently unreachable** — a design org that cannot write copy, art-direct imagery, or author motion is not the thing EG-9 describes. If D2 chooses the expanded scope instead, this chunk registers the named, sequenced, individually-gated milestones that path requires: **copy co-optimization** (gap C4/R9-class — copy and layout designed together rather than copy frozen as input), **imagery & art direction** (R15 — selection, cropping, treatment, with F-LEG-05's representation checks built in from day one, not retrofitted), **iconography/graphic devices** (R15's second half), **motion authoring + motion-aware Eyes** (R5 — EG-3's "usability" and `spec/12` P5's "the medium is more than a frozen frame" both quietly require this). Each gets its own hypothesis and gate; none is assumed.
- **Done when:** either (a) D2 chose the default scope → this chunk closes as `not-funded`, and `END_GOAL.md`'s North Star records the missing chairs as EG-3/EG-9's explicit unmet preconditions; or (b) D2 chose expanded scope → the four milestones are in `spec/09 §1` with gates, and the roadmap's honest timeline is re-derived against S4's budget arithmetic.

---

## 5. Phases E0–E3 — Build ride-alongs (code; execute inside the corresponding canonical phase)

> Each E-chunk builds what an M/S-chunk specified. Its **spec source is the amended document** — implementers read the M-chunk's output, not this table alone.

### E0 — with canonical Phase 0 (C0.0–C0.17)

| ID | Builds | Spec source | Build summary | Done when |
|---|---|---|---|---|
| **E0.1** | Control arm + 3-way verdicts (M1) | amended `spec/08 §2/§5`, C0.16 | `ade control --brief … --out …` (or `--control-arm` flag): generates the matched-compute blind candidate set (no feedback carry), selects best via the same Critic; `ade verdict` presents iter-0 / final / control-best in random order, logs positions + pick; optional `control_inline` flag in the loop | a pilot brief yields loop + control outputs and one recorded three-way blind verdict; per-iteration loop-gain appears in `ade report` |
| **E0.2** | Strategy capture (M5) | amended `spec/07 §3` | load + validate `plan.json` when present; persist to `runs/<out>/plan.json`; trace references it; zero behavior change otherwise | a run with `plan.json` persists it and links it in the trace; a run without one is unaffected |
| **E0.3** | Vendored Tailwind + fonts (M6) | amended `spec/07 §6.2` | setup script downloads + pins (version+checksum) the Tailwind runtime into `harness/vendor/` and fonts into `harness/public/fonts/`; harness references only local assets; egress-deny test: a candidate with `fetch()`/remote `<img>` fails render-health | render completes with networking fully blocked; the egress test candidate is rejected; substitution record written when a fallback font is used |
| **E0.4** | Credit telemetry (S5) | amended C0.0/C0.13/App. A | provider wrapper maintains per-day/week call+token counters; written into every `RunRecord.quota`; `ade report` prints burn vs the S2-documented limits | counters visible in trace + report after any run |
| **E0.5** | Exploration flag (M8) | amended `spec/05` | one explore-iteration candidate generated with `exploration: true` semantics; flagged in trace; never bypasses the Pass Gate | trace shows the flag; a run's final candidate can only be an exploration candidate if it passed the normal gate |
| **E0.6** | Verdict distribution tags (M4) | amended C0.16/App. A | verdict records carry generator/critic model ids, config version, snapshot ref | every stored verdict is distribution-tagged |
| **E0.7** | Test-retest mode (M13) | amended `spec/13 §4`, C0.16 | `ade verdict --retest <set-dir>`: re-presents the frozen set blind; computes + logs self-agreement | one retest run produces an agreement number and appends it to the benchmark log |

### E1 — with canonical Phase 1 (C1.0–C1.13)

| ID | Builds | Spec source | Build summary | Done when |
|---|---|---|---|---|
| **E1.1** | Benchmark extensions (M2/M3/M9) | amended `spec/13`, C1.13 | anchor-set assembly (files + sources + refresh date); stratum tags on all cases; bias-probe suite (order-swap/verbosity/style probes) with stability reporting; same-model vs cross-model agreement metrics | benchmark emits: distance-from-anchor, per-stratum agreement, probe-stability, and the model-agreement gap |
| **E1.2** | Escalation queue (M7) | amended `spec/06 §9` | `escalations.jsonl` store + `ade escalations list/answer`; comprehension questions, budget/oscillation escalations, and judge disagreements emit records; answered questions re-enter as run inputs (park-and-rerun) | a run blocked on a comprehension question parks, is answered offline, and completes on rerun |
| **E1.3** | Cross-family second judge (M9) | amended `spec/11 §2.3` | Phase-Exit reviews for brand/PDS call judge #2 via the `local` provider; disagreement emits a `gate_disagreement` escalation | an induced disagreement (seeded fixture) escalates rather than averaging |
| **E1.4** | Crystallization A/B (M14) | amended `spec/04 §3` | run both arms on 2–3 briefs; collect extension-frequency, intervention-rate, H4 metrics, human preference; record the adoption decision in knowledge | a written comparison + decision entry exists |
| **E1.5** | DOM craft metrics (M17) | amended `spec/11 §2.1` | compute spacing/type-scale conformance, alignment regularity, tap-target geometry from the DOM at gate time; write to trace; inject into the Critic's context as measurements; strictly advisory | metrics appear in trace + Critic prompt for a multi-section run with zero gating-behavior change |

### E2 — with canonical Phase 2 (rescoped by M10)

| ID | Builds | Spec source | Build summary | Done when |
|---|---|---|---|---|
| **E2.1** | Own-client memory + verdict-corpus store (M10) | amended `spec/04` staging note | retrieval over the same client's approved sections (code + screenshots — no de-id needed); the verdict corpus as a queryable store (all tags from E0.6); backup discipline (this is the crown-jewel asset) | a second same-client run retrieves prior approved work; verdict corpus is exportable + backed up |
| **E2.2** | Three-arm H6 ablation + image de-id rules (CA-6/M10) | amended plan Phase-2 gate | arms: memory-off / text-Library / multimodal (redacted thumbnail + payload); image de-id rules (strip marks/copy) specified before arm 3; real local embeddings (C2.0), never the hash stub | ablation report with per-arm deltas; stage-B (cross-client Library, C2.5+) proceeds only if its arm wins |
| **E2.3** | Two-tier adoption enforcement (M16) | amended `spec/04 §6`/`12 §7`/`13 §5` | `provisional` flag + expiry + audit sampling wired into memory writes and frontier-case intake; R14-style routing of audit items | a provisional entry auto-expires unconfirmed; an audit failure revokes it |
| **⚑E2.4** | Strategy/IA layer (M15; unlock per D3) | amended `spec/09 §1` | upstream strategy stage: brief → site plan/narrative/per-section goals; Phase-Exit-Reviewed; evaluated against the M5 human-plan corpus | strategy-layer plans beat/equal human plans on brief-fit + coherence in blind review, per M15's hypothesis |

### E3 — with canonical Phase 3

| ID | Builds | Spec source | Build summary | Done when |
|---|---|---|---|---|
| **E3.1** | RLAIF preference pipeline + uncertainty routing (M11/M16) | amended `spec/14` R4, C3.5, C3.3 | AI-preference label generation (decorrelated contexts; cross-family where possible); human golden core as validation only; R14 routing live for all human review | reward-model validation runs on held-out *human* data; routing measurably concentrates human minutes on low-confidence items |
| **E3.2** | Succession playbook exercise + judge distillation (M12/M11b) | amended `spec/11 §4` | execute the playbook on the first real model swap; distillation experiment for the judge (prod path) | a completed succession entry (old→new, deltas, recalibration) exists; distilled-judge accuracy reported vs prompted Critic |
| **E3.3** | Self-audit + proposal pipeline (M20) | amended `spec/14` | the periodic pass over trace+verdict data; three proposal streams (failure entries / constitution amendments / frontier cases), each evidence-cited and Tier-A gated; `ade selfaudit` emits them to the escalation queue (E1.2) for batch ratification | one real audit pass over accumulated Phase-0–2 data produces at least one ratified proposal in any stream, with its trace evidence attached |

---

## 6. Verification pass

### 6.1 Coverage — contract amendments → chunks

| CA | Chunks | | CA | Chunks |
|---|---|---|---|---|
| CA-1 | M1, E0.1 | | CA-12 | M8, E0.5, M11c |
| CA-2 | M2, E1.1 | | CA-13 | M9, E1.1, E1.3 |
| CA-3 | M3, E1.1 | | CA-14 | D2 |
| CA-4 | M12, E3.2 | | CA-15 | M6, E0.3 |
| CA-5 | M11b, E3.2 | | CA-16 | M7, E1.2 |
| CA-6 | E2.2 (via M10) | | CA-17 | D3 |
| CA-7 | M4, E0.6 | | CA-18 | S1–S5, E0.4 |
| CA-8 | ⚑M15, ⚑E2.4 | | CA-19 | M16, E2.3 |
| CA-9 | M5, E0.2 | | CA-20 | D1 |
| CA-10 | M15b | | CA-21 | R1–R8 |
| CA-11 | D2, D3 | | | |

### 6.2 Coverage — findings → chunks

CF-1→M1/E0.1 · CF-2→M12/M11b · CF-3→M2/E1.1 · CF-4→M3 · CF-5→M5/M15 · CF-6→D2/D3 · CF-7→M9/E1.3 · CF-8→E2.2 · CF-9→D1 · CF-10→M4/M12 · CF-11→D2(CA-14) · CF-12→M16/E2.3 · CF-13→M8/M11c · CF-14→S2–S4/E0.4 · CF-15→M6/E0.3 · CF-16→M7/E1.2 · CF-17→R1–R7. Drift items #1→R7 · #2→R4 · #3→R1 · #4→R2 · #5→R3 · #6→R6/S1 · #7→R6/R7/D1 · #8→R6/S3 · #9→R6. AI path items: #1→D2/D3 · #2→S1–S4 · #3→canonical Phase 0 (unchanged — this plan adds, never delays it) · #4→E0.2/E0.6 + C0.16 as spec'd · #5→M1 (loop-gain/plateau) + M13 · #6→M14/E1.4 · #7→M10/E2.1 · #8→M11/E3.1 · #9→⚑M15 · #10→R1–R8. AI missing-capabilities (investigation §6): #1→M5/⚑M15 · #2→M7/E1.2 · #3→**M17/E1.5** · #4→M11/E3.1 · #5→M13/E0.7 · #6→M5 (capture) + D2 (scope) · #7→D3 (the "good enough to use" bar).

### 6.3 Gaps found during this verification pass — and fixed in the text above

The first draft of this plan was checked against the contract, the prior investigation's ten path items, and a fresh grep sweep of the corpus. Six gaps were found and are **already folded into the chunk list above** (listed here for audit honesty):

1. **G1 — human test-retest** (AI-F8) had no CA and was missing → added **M13/E0.7**.
2. **G2 — crystallization A/B** (AI-F7, path #6) was missing → added **M14/E1.4**.
3. **G3 — the Phase-2 rescope** (AI-F2, path #7) was only implicit in CA-6 → made explicit as **M10/E2.1**, with the de-id machinery (C2.5–C2.7) formally gated on the stage-A ablation.
4. **G4 — the RLAIF re-plan of R4** (AI-F1's primary remedy, path #8) had no chunk → added **M11/E3.1**, absorbing CA-5 (distillation) and CA-12c (outcome pull-forward) into the same files' single edit.
5. **G5 — verdict distribution tagging** was scheduled with Phase-2/3 non-stationarity work but must exist **from the first verdict** → moved into Phase-0 scope (**M4c/E0.6**).
6. **G6 — spec-internal irregularities** beyond the contract's drift list (stale `trace.json`/`html/css/js`/`supporting/*.tsx` in `spec/07`, `spec/09`, `spec/README`; the single-`--model` flag contradicting the role-split; spec/03-vs-Appendix-A normativity) → added **R5/R8** and extended **R4**.

### 6.4 Consistency checks (all pass)

- **No chunk edits `chat-history.md`** or either investigation report (historical records). ✓
- **No chunk introduces `ANTHROPIC_API_KEY`** into dev; M9/E1.3's second judge uses the `local` provider in dev. ✓
- **Spec-before-plan** holds in every M-chunk (each names its spec file first). ✓
- **Chunk-ID namespace** (R/D/S/M/E) does not collide with canonical C-chunks. ✓
- **Every ⚑ chunk names its unlocking decision** (M15, E2.4 → D3/D4). ✓
- **Ordering sanity:** R-chunks are decision-free; D-chunks precede all M-chunks (D4 gate); S1–S4 need no ratification (verification, not design change); E-chunks each depend on a named M/S output. R7 depends on R1–R6; S3 on S1+S2; S4 on S2/S3/M1; S5 and all M on D4. ✓
- **The canonical critical path is not delayed:** nothing in this plan blocks starting the canonical Phase-0 build (C0.0–C0.15) except S1 (which *is* its restart) — M1/E0.1 must merely land **before H1 measurement runs**, not before build. ✓
- **Every chunk has a falsifiable `Done when`.** ✓

### 6.5 Residual items intentionally *not* chunked (with reasons)

- **A second human rater** (AI-F1 remedy d): a resourcing decision, not an implementable chunk; recorded as a standing recommendation in D3's North-Star preconditions.
- **R5 (motion-aware Eyes) promotion:** not required by the Bounded Goal under D2's default scope (static marketing surfaces — the contract's EG-3 verdict routes domain breadth through D2); if D2/D3 adopt an expanded scope, add it as a ⚑ M/E pair at that time.
- **Full mid-run resume:** deliberately out (accepted MVP gap; park-and-rerun via M7 covers the need until Phase 1+ demand is evidenced).
- **R-series docs 18–35 regrowth:** correctly deleted; nothing here recreates them ahead of scheduling.
- **`spec/15` rewrite:** owner-owned; R7 installs the interim-authority fallback so nothing blocks on it.
- **EG-8 workflow architecture:** out of scope by D2 (CA-14); revisiting requires a new contract, not a chunk here.

### 6.6 Second verification pass (v1.1) — audit against the *full* analysis, not only the contract

Prompted by the owner's coverage question, the plan was re-audited against **both** investigation reports (`ARCHITECTURE_INVESTIGATION.md` + the contract), not just the CA/CF series — catching items the contract itself never converted into a CA. Six residuals were found and are now folded in:

- **G7** — deterministic DOM craft metrics (AI-F4's "under-exploited middle layer", missing-capability #3) had no chunk anywhere → new **M17 / E1.5**.
- **G8** — the "good enough to actually use for real work" bar (open-question #6; AI missing-capability #7) → folded into **D3**.
- **G9** — the meta-work moratorium (AI-F6's enforcement rule: no new spec/meta docs until H1 has data) was nowhere binding → adopted at **D4**.
- **G10** — the per-boundary × per-stratum **power analysis** (AI research-gap #1; the arithmetic `spec/13 §9` demands) → folded into **M3**.
- **G11** — eval-session hygiene against golden-core leakage (AI unknown-unknown #5) → folded into **M2**.
- **G12** — the feedback-channel A/B (AI research-gap #3) → registered as an R2 design input in **M11(e)**; and the evidence-tier taxonomy patch (AI research-gap #5) → folded into **D1**.

Confirmed deliberately uncovered after this pass (all with reasons in §6.5): R5 promotion, the second human rater, full mid-run resume, the `spec/15` rewrite, EG-8 workflow architecture.

### 6.7 Third verification pass (v1.2) — audit against the **End Goal**, not the findings

The owner asked the decisive question the first two passes never tested: *if every finding is resolved, are EG-1…EG-11 achieved?* Auditing the plan against the End-Goal decomposition (rather than the CF/CA series) exposed a **structural** gap: the plan had a CA→chunk and a CF→chunk matrix but **no EG→chunk matrix**, because findings-resolution removes blockers while end goals require capabilities. Four capability gaps had no chunk anywhere in either plan:

- **G13** — nothing measured whether Brief Comprehension is *deep* or merely a paraphrase (gap D1 in `spec/14` had a bet, no metric) → new **M18**.
- **G14** — EG-3 names *originality* explicitly; the only mechanism was C4.3, a deferred Phase-4 legal gate that could never inform design → new **M19** (advisory metrics from Phase 1).
- **G15** — **the largest hole**: nothing let the system surface its own weaknesses from its own trace/verdict data; `spec/12 §7`'s self-amendment protocol and `spec/13 §5`'s frontier-proposal protocol were *specified but had no mechanism* — only mentioned inside C3.4/C3.9 → new **M20 / E3.3**.
- **G16** — D2's default scope silently forecloses EG-3's "complete" and EG-9's "world-class"; the "fund the missing chairs" alternative had no path → new **⚑M21**.

The audit's verdict itself is now a permanent part of the document (**§7**), including the honest scoreboard: 3 EGs arrive, 4–5 partially/conditionally, 3 do not arrive under current defaults.

---

## 7. End-Goal decomposition — does resolving the findings achieve EG-1…EG-11?

> **This section exists because the answer is no.** Everything above §7 is a **de-risking plan**: it repairs the corpus, verifies the substrate, and removes false assumptions so the build stands on measured ground. That is *necessary* and it is *not sufficient*. Findings-resolution removes blockers; end goals require **capabilities**, and a capability only exists when a chunk builds it and a gate proves it. This section is the missing third matrix: **EG → what it demands → what the plan delivers → the gate that would prove it → honest verdict.**
>
> Read the verdict column as a commitment, not a hope. Where it says *Out* or *Narrowed*, that is a decision you are making at D2/D3 — reversible, but only if you reverse it deliberately.

### 7.1 The decomposition

| EG | What it actually demands | What the plan delivers | Gate that would prove it | Verdict |
|---|---|---|---|---|
| **EG-1** Understand goals, intent, objectives, audience psychology, constraints | Deep interpretation — the non-obvious implication a strategist sees | C0.2 comprehension (restatement + gap/conflict detection); **M18** measures depth for the first time; M5 captures the human's interpretation as the reference corpus | M18: interpretation-depth vs. the frozen reference interpretation, per stratum | **Partial → Conditional.** Depth becomes *measurable* (M18); real understanding lives in ⚑M15's strategy layer |
| **EG-2** Independently develop design strategies | An upstream layer that plans before it draws | M5 (the training/eval corpus, passively captured from Phase 0); **⚑M15/⚑E2.4** (the layer itself) | ⚑E2.4: strategy-layer plans match/beat human plans on brief-fit + coherence, blind | **Conditional on D3.** Unfunded, this EG does not happen at all |
| **EG-3** Complete solutions across domains — quality, coherence, usability, originality | Composition **+ copy + imagery + motion + icons**, multi-domain, original | Composition/coherence: canonical P0/P1. Quality: M2's anchor. Originality: **M19**. Multi-domain: C1.13. Copy/imagery/motion/icons: **⚑M21 only** | M2 distance-from-anchor + M19 distinctiveness + H4 coherence — *for composition only* | **Narrowed by D2.** "Complete" is **foreclosed** under the default scope. ⚑M21 is the only path to the literal clause |
| **EG-4** Critically evaluate own outputs | Deterministic floor + visual judgment + human alignment | The system's densest coverage: C0.7–C0.10 gates, **M17** DOM craft metrics, **M9** cross-family judging, **M3** stratified agreement, **M13** rater retest, **M11** RLAIF/reward model, **M2** external anchor | M3: per-stratum agreement incl. `hard`/`adversarial`, with standing audit miss-rate | **Path.** Best-covered EG. Ceiling caveat: F-JDG-01/F-SPEC-02 are *managed*, never closed |
| **EG-5** Identify own weaknesses, challenge assumptions, improve | The *system* mining its own data for its own failures | D1 (human-commissioned investigations) + **M20/E3.3** (the self-audit pass + three proposal streams — new; this was the biggest hole) | E3.3: one ratified proposal traced to its own evidence rows | **Was a gap → now Path.** Note by design: the system proposes, the human ratifies (I13 / M16 Tier A) |
| **EG-6** Accumulate knowledge without being limited by prior decisions | Compounding memory + escape from its own ruts | M10 staging, **E2.2**'s three-arm ablation, M16 expiry/revocation, M8 exploration, C2.6 decay, M19's self-similarity alarm | E2.2: does retrieval beat model priors at all? | **Test, not guarantee.** E2.2 may *falsify* the Library thesis; the fallback (verdict corpus compounds instead) is a **reframe of EG-6**, not its achievement |
| **EG-7** Adapt to new industries, aesthetics, technologies, tools | Survive substrate change; track taste change | **M12** succession playbook + **M4** ages/survives + F-MOD-07/08 (tech/tools — the big one); C1.13 multi-domain + C3.5 transfer (industries); M4's representation revisit trigger | E3.2: a real model swap absorbed with calibration re-earned and deltas recorded | **Partial.** Succession covered. **Aesthetic drift (R17) has no chunk** — named residual, deferred |
| **EG-8** Scale to complex design workflows | Multi-page, forms, email, dashboards, cross-artifact orchestration | **Nothing.** D2/CA-14 places it outside the architecture; C3.7's per-surface checklist is the only door | — | **Out by decision.** Not a gap — a choice. Reversing it requires a new contract, not a chunk |
| **EG-9** World-class org; consistently exceptional | EG-2 + EG-5 + the missing chairs + sustained anchor-parity | **M2 measures the gap. Nothing closes it.** Structurally requires ⚑M15 + ⚑M21 + M20 | M2: blind anchor/competitor parity, sustained across briefs | **Measured, not achieved.** Under D2's default, structurally unreachable — and now stated as such rather than implied |
| **EG-10** Human shifts to goals/values/signals | Earned autonomy + affordable human signal | **M3** ladder stratification + audits, **M16** two-tier adoption, R14 routing (M11d/M16), **M7** async queue, **M11** RLAIF for bulk signal | M3: rung climbs only on per-stratum agreement + audit miss-rate | **Path, resource-gated.** Gated on verdict-signal economics (CF-14/S4) — the plan makes it *reachable*, cannot manufacture the signal |
| **EG-11** Discover better approaches, create knowledge, increase own intelligence | Genuine novelty + knowledge creation + rising capability | D3's CF-2 rewording; **M20/E3.3** (knowledge creation); M11b distillation (the only weight-level lever); M8 exploration. **R7 global search deferred** | E3.3 ratified proposals + M19 distinctiveness trend | **Reframed + Partial.** Per CF-2, "its own intelligence" rises via **data, anchors, and substrate succession** — not self-modifying weights |

### 7.2 The honest scoreboard

Resolving every finding **and** executing every chunk in this plan yields:

- **3 real paths:** EG-4 (evaluation), EG-5 (self-weakness — *only after M20/E3.3*), EG-10 (autonomy shift, resource-gated).
- **4 partial/conditional/hypothesis:** EG-1 (measurable, then ⚑), EG-2 (⚑ on D3), EG-6 (a test that may fail into a reframe), EG-7 (succession yes, aesthetic drift no), EG-11 (reframed).
- **2 narrowed to unreachable-as-written:** EG-3 and EG-9 — foreclosed by D2's default scope; ⚑M21 is the named reversal.
- **1 out:** EG-8, by decision.

**So: no — 11 of 11 will not be cleared. Roughly 3 arrive, 4–5 arrive partially or conditionally, and 3 do not arrive at all under the current defaults.** Two of those three are gated on decisions only you can make (D2, D3), and the plan now forces both to be conscious rather than accidental.

### 7.3 What this means for how to read the plan

1. **The R/D/S/M/E chunks are the floor, not the building.** They make the H1 gate trustworthy and the corpus honest. If H1 fails, none of EG-1…11 matter — which is why nothing here delays it.
2. **Three EGs are decision-blocked, not effort-blocked.** ⚑M15 (EG-2, and EG-1's ceiling) and ⚑M21 (EG-3/EG-9) are each one owner decision away from existing. Neither is technically blocked; both are scope-blocked.
3. **Two EGs are reframed by evidence, and that is a feature.** EG-6 may fail its own ablation (E2.2) and EG-11's premise was already wrong (CF-2). Discovering that early *is* the plan working — the alternative is three years of building a Library that never compounded.
4. **EG-9 is the aggregate.** It cannot be chunked directly; it arrives only if EG-2 + EG-3 + EG-5 + EG-10 all land and M2's anchor metric says so. Treat it as the scoreboard, never as a task.

---

## Revision history

- **v1.0 (2026-07-16)** — Initial plan: 8 reconciliation chunks (R), 4 owner decisions (D), 5 substrate chunks (S), 16 spec/plan amendment chunks (M), 17 build ride-along chunks (E0–E3); full coverage matrices for CA-1…21, CF-1…17, drift #1–9, and the prior investigation's path items; verification pass found and folded in six gaps (G1–G6). Proposal status — no `spec/`, `knowledge/`, or canonical-plan file has been modified by this document; execution of R-chunks is safe immediately, M-chunks await D4 ratification.
- **v1.1 (2026-07-16)** — Second verification pass (§6.6), prompted by the owner's coverage question: re-audited against the full analysis (both investigation reports, beyond the CA/CF series). Added **M17/E1.5** (deterministic DOM craft metrics — AI-F4's middle layer); folded G8–G12 into **D3** (usability bar), **D4** (meta-work moratorium), **M3** (power analysis), **M2** (eval-session hygiene), **M11(e)** (feedback-channel A/B), **D1** (evidence-tier patch); §6.5 gains the R5-promotion residual with its unlock condition. Totals now: 8 R · 4 D · 5 S · **17 M** · **18 E** chunks. Coverage matrices extended with the AI missing-capabilities row.
- **v1.2 (2026-07-16)** — **Third verification pass (§6.7) — the End-Goal audit**, prompted by the owner asking whether resolving the findings clears EG-1…EG-11. It does not: the plan was a de-risking plan with no EG→capability→chunk→gate mapping. Added **§7 — End-Goal decomposition**, the missing third matrix, with an honest scoreboard (3 EGs arrive · 4–5 partial/conditional · 3 do not arrive under current defaults) and the note that EG-2/EG-3/EG-9 are **decision-blocked at D2/D3, not effort-blocked**. Four capability chunks added for gaps no finding named: **M18** (comprehension depth — EG-1), **M19** (originality metric — EG-3), **M20/E3.3** (self-weakness detection + the self-amendment/frontier proposal mechanisms `spec/12 §7` and `spec/13 §5` specified but never mechanized — EG-5/EG-11), **⚑M21** (the missing chairs: copy, imagery, icons, motion — the only path to EG-3's "complete" and EG-9's "world-class"). Totals now: 8 R · 4 D · 5 S · **21 M** · **19 E** = **57 chunks**.
