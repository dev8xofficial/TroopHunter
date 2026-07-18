---
name: open-questions
type: knowledge-base / tracker
scope: autonomous-design-engine (ADE)
purpose: >
  Standing questions that need a HUMAN decision before certain work can proceed
  confidently. Any agent picking up ADE work should check this file and, if it
  can get an answer from the user, update this file and (if load-bearing)
  propagate the answer into decisions-and-conventions.md and the relevant spec doc.
---

# ADE — Open Questions (needs a human decision)

> Ordered roughly by how much the answer would change everything downstream. Unlike the spec's own "open research questions" (`09 §5`, which are about *design/architecture* unknowns), these are mostly about **direction and process** — questions only the project owner can answer.

## 1. What is ADE actually for? — UNRESOLVED, asked directly, not yet answered

**The single biggest lever on the whole plan.** Four candidate answers, each implying a materially different roadmap:
- **A product** (to sell) — needs users, differentiation, and go-to-market long before "calibrated taste" matters.
- **A personal tool** (to actually use) — should stay narrow and get *used*, not broad and complete.
- **A research/portfolio project** (to learn and demonstrate) — should optimize for interesting, well-documented, measurable results, not completeness.
- **An open-ended intellectual pursuit** — timeline and "done" don't really apply the same way.

**Why it matters:** prioritization in `spec/15` is currently generic because this hasn't been answered. Resolving it should trigger a re-tuning of the roadmap's priorities (this was explicitly offered at the end of the session that produced `spec/15` — see `chat-history.md §13`).

**Status:** **Answered in part.** See [`END_GOAL.md`](../END_GOAL.md).

## 2. Build vs. buy — is building ADE from scratch the right bet?

Given how fast tools like v0, Lovable, Framer AI, Figma AI, and Anthropic's own Artifacts are commoditizing AI-driven UI generation: what is ADE's *durable* differentiation? The working thesis is "the compounding, taste-calibrated Library" (H6) — but is that worth 3–6 solo years to build, versus building just the differentiated layer (taste/memory/calibration) *on top of* an existing generation tool rather than rebuilding generation from scratch?

**Suggested resolution point:** revisit explicitly at the Phase-0 / H1 gate (~month 5), once there's real evidence the core loop works.

## 3. Taste governance — whose taste is ground truth?

When there's more than one reviewer (now or later), and they disagree, who resolves it — a single named "design lead" with final say, rolling consensus, a weighted panel? This is a prerequisite for:
- Ratifying Design Constitution amendments (`spec/12 §7`).
- Ratifying Evaluation Charter golden-core additions (`spec/13`).
- The Phase-Exit Review / autonomy-ladder mechanism generally (spec `09 §2`, `11 §2.3`) — "a gate is relaxed only where its own boundary's agreement clears the bar," but *whose* agreement, if there's more than one rater?

Tracked in the spec as failure **F-HUM-02** (reviewer-taste overfitting) and **J4** in the research agenda (`14`). **Currently answered by default as "whoever is running the project," since there's one developer** — revisit if/when a second reviewer joins.

## 4. Can the compounding-Library thesis (H6) even be tested at solo project volume?

H6 ("project N+1 beats N via the Library") likely needs *many* completed projects to show a measurable signal. A solo developer at ~8 hrs/week may complete only a handful of real projects a year. **Open question: is there a realistic volume plan (e.g. deliberately running many small/synthetic briefs through the pipeline, not just real client work) to generate enough data points to test H6 at all** — or should Phase 2 be scoped down/deferred until real project volume exists?

## 5. Pro-credit Terms of Service — is automated/near-production use actually permitted?

The entire dev access model depends on the Claude Pro plan's Agent-SDK credit sustaining an **automated, repeated, potentially high-volume** workload (the generation loop calling the model many times per section, across many briefs). This has not been confirmed against the actual ToS. **Action needed:** check the current Anthropic Claude Pro / Agent SDK terms for automated-use restrictions before scaling up run volume, and before treating this as a viable path all the way to "significantly improved" (~12-18 months of usage). **Status: Resolved** (S2 verified; unattended automated use is explicitly permitted via the official Agent SDK, which draws from a dedicated monthly SDK credit budget).

## 6. What is "good enough to actually use for real work" — separate from the H-series gates?

`spec/15 §6` defines "significantly improved" as a hypothesis-gate bar (H1+H2+H4+one R-bet, ~12–18 months out). But there may be a **narrower, earlier bar** — "good enough that I'd actually use this instead of hand-building a section" — that's worth defining separately, since an ever-improving system has no natural finish line (`15 §9.5`, the "never done" problem). **Status:** **Answered.** See the "Good Enough" Threshold in [`END_GOAL.md`](../END_GOAL.md).

## 7. Antigravity's actual cross-tool-instruction convention — unconfirmed

While setting up the cross-agent knowledge base (`chat-history.md §14`), it was explicitly flagged that the assistant does not know with confidence what file/convention Google's Antigravity reads for project instructions (unlike `AGENTS.md` for Codex and `CLAUDE.md` for Claude Code, both fairly well-established). **Action needed:** check Antigravity's own docs or test empirically whether it reads `AGENTS.md`, a `CLAUDE.md`-equivalent, or something else, and update `AGENTS.md`/`CLAUDE.md` at the ADE root accordingly if a third pointer file is needed.

## 8. What actually happened to the Phase-0 scaffolding relative to this conversation? — **SCHEDULED as Wk 0**

While building this knowledge base, real Phase-0 implementation files (`src/`, `tests/`, `harness/`, `spike.ts`, `package.json`, etc.) were discovered already present at `future-pipeline/autonomous-design-engine/`, dated *before* the planning conversation this knowledge base preserves — but **this conversation never discussed or reviewed that code**. Open question for whoever picks this up next: **what is the actual current state of that code** — does it reflect an early, possibly since-superseded draft of Phase 0 (e.g. before the harness-hardening fixes in `chat-history.md §3` — per-candidate nonce, Tailwind Play CDN, asset/font provisioning, import allowlist, JSONL trace — were specified), or is it already up to date with them? **This needs a direct read of `src/`, `harness/`, and `spike.ts` against the current `IMPLEMENTATION_PLAN.md` before any further build work continues on it**, so effort isn't wasted building against an outdated version of the plan, or conversely, so already-good code isn't needlessly rewritten.

**Update:** this is no longer just a question sitting in a list — it has been made the literal first task in the execution roadmap: `spec/15 §3`'s weekly table now opens with a **"Wk 0" row** requiring this exact audit, with a logged keep/rewrite decision, *before* Wk 1 begins. See `spec/15 §7.1` ("Direction check — this pass") for why it was elevated ahead of everything else. **Status: MOOT** (scaffolding deleted; superseded by S1).

## 9. Research Engine — adopt it, commit it, and prove it works? — NEW, unresolved

A standalone **Research Engine** capability was designed and built this session at `research-engine/` (see `decisions-and-conventions.md` → "The Research Engine", and `chat-history.md §17`). Three open items for the owner:
- **Adoption:** is the redesigned engine (which *replaced* the six ChatGPT manifesto drafts) accepted as the way ADE will do self-research? The drafts are archived, not deleted, so this is reversible.
- **Commit safety:** the entire `research-engine/` tree (and `failures/`) is **untracked** — no git safety net. During this session six untracked files were briefly lost from disk and had to be restored from the conversation record (`chat-history.md §17.6`). **Action:** commit `research-engine/` before further edits so this can't recur.
- **Validation:** the engine is **v1, never run.** Its own effectiveness is unproven. Suggested first action: activate `P1 — Architecture Research`, write its Area Card, and run one **Light**-proportionality investigation end-to-end — treat that first run as the engine's own H1-style viability test before investing in heavier ceremony.
**Status: OVERTAKEN** (engine deleted; superseded by D1).

## 10. Does the 14-phase research program need a mode/sequencing check against the build plan?

The owner-owned research program (P1 Architecture → P14 Meta-Layer, in `research-engine/areas/_registry.md`) is **paper-mode** today because ADE has little running code. Several phases (P6 Generator, P7 Critic, P8 Vision, P11 Robustness, P12 Scaling, P13 Production) can only reach **T3 empirical evidence** once the corresponding subsystem is built (Phase 0–4 of `IMPLEMENTATION_PLAN.md`). **Open question:** should research phase order be loosely coupled to build phase order (research a subsystem deeply just *before* building it, so findings feed the build), or kept fully independent under the owner's manual selection? Currently fully manual/owner-driven by design — flag only if paper-mode findings start piling up with no empirical path to close them.

**Status: OVERTAKEN** (engine deleted; superseded by D1).
