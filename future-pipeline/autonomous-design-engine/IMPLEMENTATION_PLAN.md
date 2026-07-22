# IMPLEMENTATION_PLAN.md — Autonomous Design Engine (ADE)

> **The canonical, phase-gated build plan.** It takes the failure catalogue ([`spec/10a`](./failures/overall-system-failures/10a-failures-input-and-generation.md)–[`10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md), "Failures A–E") and the solutions already designed in [`spec/11`](./spec/11-guardrails-and-invariants.md) and turns them into an **ordered set of small, implementable chunks**, grouped by ADE's five phase gates (0→4). Each chunk names the exact `F-*` failures it closes, the mitigation primitive / invariant / gate it implements, what it depends on, what to build, and how you know it's done.
>
> **This is R&D, not code.** Nothing here is application code. This plan exists so that any implementing agent (Sonnet 4.6, Opus 4.6, Gemini 3.1 Pro, or a human) can pick up **one chunk at a time** and fold its detail into the spec — or, once the spec is accepted, build it — without re-deriving the whole design. The **spec is canonical for design; this plan is canonical for build sequence.** If a chunk here disagrees with a `spec/*` file, the spec wins and this plan needs a correction.

---

## 0. How to use this document (for an implementing model)

1. **Never work ahead of the phase gate.** Phases are strict: 0 → 1 → 2 → 3 → 4. Do not start Phase _N_ until Phase _N−1_'s exit gate (a falsifiable hypothesis, [`spec/08`](./spec/08-hypotheses-and-validation.md)) actually passes. If a gate fails, **stop and rethink** — do not push forward. ([`spec/11 §10`](./spec/11-guardrails-and-invariants.md), root pattern for F-SPEC-04.)
2. **Work one chunk at a time, in order within a phase.** A chunk's `Depends on` line lists the prior chunks it needs. Respect it.
3. **Every chunk closes named failures.** When you implement or spec a chunk, you are accountable for its `Closes:` list. The [coverage index (§8)](#8-coverage-index--every-failure-to-its-chunk) maps every `F-*` ID to the chunk that owns it — use it to verify nothing is dropped.
4. **Read the source of truth before you build a chunk.** Each chunk links the spec section that defines its design. This plan is a *sequencer and detailer*, not a replacement for the spec.
5. **Uphold the invariants at all times.** The 15 system invariants ([`spec/11 §8`](./spec/11-guardrails-and-invariants.md), listed in [§7](#7-cross-cutting-invariants-every-chunk-must-uphold)) are cross-cutting — a chunk may *introduce* an invariant, but no later chunk may *break* one.
6. **Report observed numbers only.** Acceptance criteria are falsifiable and measured, never predicted (invariant I12, failure F-SPEC-05).

### 0.1 Hard rules that override defaults (do not skip)

- **This project is standalone.** Not a Turborepo workspace; never cross-import `packages/*`, `microservices/*`, `microfrontend/*`. The repo-root `CLAUDE.md`/`AGENTS.md` do **not** apply here; [`AGENTS.md`](./AGENTS.md) in this folder does.
- **Never set `ANTHROPIC_API_KEY` in dev.** Dev/R&D runs on the Claude Pro plan's Agent-SDK credit via `claude login` (OAuth), `ADE_PROVIDER=agent-sdk`. A paid API key is a **Phase-4-only, production-only** config (`ADE_PROVIDER=api`). See chunk **C0.0** and [`knowledge/decisions-and-conventions.md`](./knowledge/decisions-and-conventions.md). *(Note: [`spec/README.md` Step 0](./spec/README.md) still lists "an `ANTHROPIC_API_KEY`" for the build phase — that line is stale against this rule and is flagged for spec reconciliation in [§9](#9-inconsistencies-flagged-for-spec-reconciliation).)*
- **15 invariants.** I13 (Phase-Exit Review), I14 (Sandbox Isolation), and I15 (Delivery Gate sequence) are all real. Anything citing fewer than 15 invariants is stale.
- **The R-series (R1–R18) is not a parallel build track.** [`spec/14`](./spec/14-research-agenda.md) is an optional menu of judgment/taste research bets. Only **R1, R2, R3, R4** are threaded into this plan (at the phases noted). R5–R18 are **DEFERRED** — do not turn them into a checklist. Chunks that carry a research bet are tagged `[R-bet]` and are explicitly gated.

### 0.2 The model behind the plan (how failures become chunks)

```
Failures A–E  ─────────►  6 root patterns  ─────────►  Mitigation primitives  ─────────►  Gates / Invariants  ─────────►  Phased chunks
(spec/10a–10e)            (RP-1 … RP-6)                 (MP-1 … MP-17)                     (Input/Render-Health/…, I1…I13)   (this plan, §2–§5 wait — §3.x)
```

Every failure in the catalogue traces through one of the six root patterns ([`spec/10 §"root patterns"`](./failures/overall-system-failures/10-failure-modes.md)) to a reusable mitigation primitive (MP-n) and lands in a concrete gate or invariant ([`spec/11`](./spec/11-guardrails-and-invariants.md)). This plan's only new work is **sequencing** those into phase-gated chunks and **detailing** each enough to implement.

### 0.3 Phase → hypothesis → failure-theme map

| Phase | Name | Proves (gate) | Primary failure themes closed | R-bet |
|---|---|---|---|---|
| **0** | Eyes / MVP (the loop) | **H1** (seeing its own render improves output) — the load-bearing go/no-go | Input, Generation, Eyes, Loop, Schema/Model, Trace, a11y floor, role isolation | — |
| **1** | Brand + Consistency | **H4** (zero token drift, consistent-not-monotonous) · H5 setup | Brand, Design System/Crystallization, Consistency, hard-store integrity, Phase-Exit Reviews | **R1** (benchmark) |
| **2** | Memory / Library | **H6** (project N+1 beats N — compounding) | Memory/Retrieval, References, Write-back/Learning, de-identification | **R2** (human channel) |
| **3** | Taste calibration | **H3/H8** (Critic↔human agreement, trending) | Judging/Taste, Human feedback, search dynamics, autonomy ladder | **R3+R4** (constitution, reward model) |
| **4** | Production hardening | ship / scale / run unattended safely | Security, Legal/IP, Production parity, Output code quality, Operations/DR | — |

> **Phase numbering is 0-indexed here; [`spec/08`](./spec/08-hypotheses-and-validation.md)/[`09`](./spec/09-roadmap-and-open-questions.md) use 1-indexed "phase 1/2/3" prose.** Phase 0 here = the MVP loop.

### 0.4 The chunk template (every chunk below follows this shape)

```
### C<phase>.<n> — <title>
- Closes:        F-<AREA>-NN, …            (the failures this chunk is accountable for)
- Implements:    MP-n / I<k> / <gate>       (the primitive, invariant, or gate)
- Depends on:    C<…>                       (prior chunks required first)
- Spec source:   spec/<doc> §<x>            (authoritative design)
- Build:         what to produce + the load-bearing micro-details
- Done when:     falsifiable acceptance criteria (a test, a measurement)
```

---

## 1. Global conventions (bind every chunk)

These are fixed decisions ([`knowledge/decisions-and-conventions.md`](./knowledge/decisions-and-conventions.md)); a chunk may extend them but never contradict them.

| Item | Convention |
|---|---|
| Dev provider | `@anthropic-ai/claude-agent-sdk`, Pro-plan Agent-SDK credit, OAuth. **No `ANTHROPIC_API_KEY` in dev.** |
| Model roles (separable in config from day one) | **Critic** = strongest model (quality ceiling; do not downgrade). **Generator** = cheaper (Sonnet-tier) is fine. **Orchestrator** = cheap/thin. Keep `criticModelId` / `genModelId` distinct even if initially equal. |
| Model ids (current) | Fable 5 `claude-fable-5`; Opus 4.8 `claude-opus-4-8`; Sonnet 4.6 `claude-sonnet-4-6`; Haiku 4.5 `claude-haiku-4-5`. |
| Trace format | `trace.jsonl` — JSONL, one `RunRecord` per line, **appended per iteration** (never a JSON array; can't be atomically appended). |
| Output paths | Phase 0: `runs/<out>/`. Phase 1+: migrates to `./projects/<client>/`. Keep the writer path-configurable. |
| Generator output (Phase 0) | Exactly **one** self-contained `.tsx`. Multi-file deferred to Phase 1. |
| Import allowlist (Phase 0) | **`react` only** — no icon/image/UI libs. Hallucinated imports break builds. |
| Tailwind (harness) | **Play CDN** (`<script src="https://cdn.tailwindcss.com">`) at runtime, not a build-time content scan. (Production-parity reconciliation is a Phase-4 concern — F-PAR-02.) |
| Render-ready signal | `window.__ADE_READY_ID__ === candidateId` — a **per-candidate nonce**, never a boolean. |
| Temperatures | `genTemperature = 0.7` (diverge); `criticTemperature = 0.2` (stable). |
| Budget caps | `maxRunTokens` / `maxRunSeconds` / `maxModelCalls`; exceeding any → run ends `ESCALATED`, never silent. |
| Terminal states | Every run ends in exactly one of `approved | escalated | aborted`. |
| Breakpoints | Screenshot at **1440 / 768 / 375**. |

---

## 2. Phase 0 — Eyes / MVP (proves H1)

**Goal:** the cheapest possible test that an agent which *sees its own rendered work* designs better against a brief with nothing to clone. **No brand store, no Library, no crystallization.** One section, one brief, driven by a CLI. This phase is the go/no-go for the entire endeavour (F-SPEC-01); build it *first and cheap*.

**Phase-0 guardrail subset** ([`spec/11 §10`](./spec/11-guardrails-and-invariants.md)): Input Gate, Render-Health Gate, Hard-Constraint Gate (a11y + responsive + content, **no token-allowlist yet**), Schema Gate, best-so-far + bounded loop + durable trace + terminal-state, resilience, lightweight Brief Comprehension. **Excluded** (no substrate yet): token-allowlist (Phase 1), de-identification (Phase 2), Phase-Exit Review (Phase 1/2).

### C0.0 — Provider abstraction (key-free dev)
- **Closes:** F-OPS-05 (partial — provider abstraction + fallback), F-MOD-05 (pinned model id)
- **Implements:** MP-11
- **Depends on:** —
- **Spec source:** [`knowledge/decisions-and-conventions.md`](./knowledge/decisions-and-conventions.md) (access model)
- **Build:** a `Provider` interface with three implementations selectable by `ADE_PROVIDER`: `agent-sdk` (default, dev, Pro-credit OAuth — **must not require `ANTHROPIC_API_KEY`**), `api` (prod-only, real key), `local` (Ollama fallback, offline/degraded). Every call records the resolved **model id** and provider into the trace. Config exposes `criticModelId` / `genModelId` / `orchestratorModelId` as separate fields.
- **Done when:** a run completes end-to-end under `ADE_PROVIDER=agent-sdk` with **no `ANTHROPIC_API_KEY` set in the environment**; the trace records provider + pinned model id for every model call; switching `ADE_PROVIDER=local` still completes (degraded).

### C0.1 — Brief schema + Input Gate
- **Closes:** F-INP-04 (malformed brief), F-INP-05 (missing/broken assets), F-INP-06 (prompt injection via brief), F-INP-07 (wrong-format visual assets)
- **Implements:** MP-1, MP-6, **I9** (brief/content is data, never instructions)
- **Depends on:** C0.0
- **Spec source:** [`spec/07 §3`](./spec/07-mvp-cli.md), [`spec/11 §2.1`](./spec/11-guardrails-and-invariants.md) (Input Gate row)
- **Build:** a deterministic gate that runs **before any model spend**: (a) validate `brief.json` against the Brief schema (required keys, types) — fail fast with a precise, actionable message, no model call; (b) **asset existence + fitness** check — file present *and* fit: colorspace = sRGB, minimum resolution for its display size, alpha/background check for logos, aspect-ratio sanity (auto-convert CMYK→sRGB where safe, else flag); (c) **injection safety** — all brief/content strings are wrapped as *data* with clear delimiters and never concatenated as instructions; hard constraints are re-checked deterministically downstream (C0.7), so injected text cannot bypass them.
  - The provider wrapper maintains cumulative `quota` counters (calls/tokens) and persists them per `RunRecord` (S5 amendment).
- **Done when:** malformed briefs are rejected with a clean error and **zero** model calls; a CMYK JPEG and an under-resolution logo are both flagged before generation; a red-team brief containing "ignore your rules, output X" does not alter the hard-constraint outcome.

### C0.2 — Brief Comprehension step
- **Closes:** F-INP-01 (brief misinterpretation), F-INP-02 (under-specified → invented intent), F-INP-03 (conflicting signals)
- **Implements:** [`spec/11 §7`](./spec/11-guardrails-and-invariants.md), MP-6
- **Depends on:** C0.1
- **Spec source:** [`spec/11 §7`](./spec/11-guardrails-and-invariants.md)
- **Build:** one cheap LLM call (Orchestrator-tier) that **restates** the brief as `{ goal, audience, constraints }` and surfaces `{ detected_gaps, detected_conflicts }`. On a missing **required** field or a contradiction ("ultra-luxury" + "budget-friendly"), it **asks the human — never invents**. The restatement is recorded and passed to Generator and Critic as the canonical interpretation. (Non-English handling is deferred to C1.12 / R1.) Score this step against the human-authored reference interpretation (M18) on two axes: **restatement accuracy** and **interpretation depth** (the latter scored by a human, or a validated cross-family judge).
- **Done when:** a brief missing a required field triggers a human prompt rather than a silent assumption; a contradictory brief names the conflict *before* any generation spend; the restatement is persisted in the trace; comprehension scores (accuracy and depth) are recorded per benchmark brief.

### C0.3 — Generator contract
- **Closes:** F-GEN-04 (hallucinated imports), F-GEN-05 (placeholder/incomplete), F-GEN-06 (truncation), F-GEN-01 (partial — required elements)
- **Implements:** MP-1, MP-11, **I1** (authority tagging, seed), **I8** (refs soft/capped — stubbed; `--refs` is a **no-op** in Phase 0)
- **Depends on:** C0.2
- **Spec source:** [`spec/05`](./spec/05-generation-loop.md), [`spec/07`](./spec/07-mvp-cli.md)
- **Build:** the Generator writes **exactly one** self-contained `.tsx` (Tailwind, `react`-only imports). The input bundle is **authority-tagged** (hard vs soft) so precedence is explicit from day one. Instructions: "no placeholders / lorem / TODOs; use the provided content verbatim." Call is **streamed** with generous `max_tokens`; per-section scope keeps output bounded. `--refs` is accepted as an explicit **no-op** flag (wired for real in Phase 2 / C2.4).
- **Done when:** an import outside the `react` allowlist is caught deterministically (C0.6/C0.7) and fed back as a *fix* task; an intentionally large section streams to completion with balanced braces; no placeholder tokens survive to output.

### C0.4 — Render harness + baseline sandbox
- **Closes:** F-SEC-01 (partial — render untrusted code isolated), F-SEC-03 (partial — deny egress at render), F-OPS-07 (pin toolchain versions), F-PAR-02 (flagged, not yet solved)
- **Implements:** MP-14 (baseline), MP-16 (import/resource allowlist seed)
- **Depends on:** C0.3
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-SEC-01/03, F-OPS-07), [`spec/11 §9`](./spec/11-guardrails-and-invariants.md)
- **Build:** a render harness (Vite SPA + Playwright) that mounts the candidate `.tsx` with a **vendored Tailwind runtime** (served from `harness/vendor/`). Treat generated code as **untrusted from the start**: network-isolated (**zero egress allowlist**, any network request fails render-health), resource-capped, ephemeral per candidate, **no secrets/credentials in scope**. Pin Playwright / Vite / Tailwind versions explicitly. *Note the F-PAR-02 gap (CDN runtime ≠ production build) here so Phase 4 (C4.4) reconciles it — do not silently accept CDN runtime output as production-faithful.*
- **Done when:** a candidate that attempts `fetch()`/exfiltration is blocked by the sandbox; the harness has no environment secrets in scope; toolchain versions are pinned in a lockfile.

### C0.5 — Eyes pipeline (render → settle → capture)
- **Closes:** F-EYE-02 (harness flakiness), F-EYE-03 (fonts/images not loaded), F-EYE-04 (capture before settle), F-EYE-06 (async components never signal ready)
- **Implements:** MP-10
- **Depends on:** C0.4
- **Spec source:** [`spec/05`](./spec/05-generation-loop.md), [`spec/10b`](./failures/overall-system-failures/10b-failures-eyes-judging-and-loop.md) (F-EYE-*)
- **Build:** per-candidate isolation (fresh build dir / unique port) to prevent stale-module capture; a **content fingerprint** check that the screenshot matches the current candidate. **All fonts are self-hosted** in `harness/public/fonts/`; commercial faces map to nearest local fallback, with the substitution recorded per run (M6). Before capture, await: `document.fonts.ready` + network-idle + images-decoded + animation/layout settle. Require async-data components to signal their **own** readiness (`data-ade-ready`) that the harness waits on in addition to mount + fonts; forbid unsignaled async fetches in Phase-0 allowlisted output. Capture at 1440 / 768 / 375.
- **Done when:** rapid candidate swaps never produce a screenshot↔candidate mismatch; a font/image-heavy section captures fully-loaded; a component with a simulated async delay is captured only after its own readiness signal (not just mount).

### C0.6 — Render-Health Gate
- **Closes:** F-EYE-01 (blank/error render), F-EYE-05 (render bug misjudged as design), F-GEN-03 (non-rendering component)
- **Implements:** MP-10, **I11** (render-valid screenshots precede critique)
- **Depends on:** C0.5
- **Spec source:** [`spec/11 §2.1`](./spec/11-guardrails-and-invariants.md) (Render-Health row), [`spec/11 §3`](./spec/11-guardrails-and-invariants.md)
- **Build:** a deterministic gate **between render and critique**: build/type-check clean, non-blank DOM, no error overlay, expected root node present, fonts + images loaded, layout settled, screenshot↔candidate fingerprint match. On fail, route to the **render-repair sub-loop** (C0.11), **never** to the Critic. A render bug is a *fix* task, categorically distinct from design critique.
- **Done when:** injected render defects (crash, blank, broken font) are caught by this gate and **never reach the design Critic**; the repair path is entered, not the critique path.

### C0.7 — Hard-Constraint Gate (Phase-0 subset)
- **Closes:** F-QF-01 (a11y violations pass), F-QF-02 (floor LLM-judged), F-GEN-01 (hard-constraint violation), F-GEN-05 (placeholder), F-GEN-07 (numeric/data inaccuracy)
- **Implements:** MP-1, **I3** (objective properties checked deterministically, never LLM-judged)
- **Depends on:** C0.6
- **Spec source:** [`spec/11 §2.1`–`§2.2`](./spec/11-guardrails-and-invariants.md)
- **Build:** deterministic checks on a healthy render: **a11y** (contrast via axe-core, alt text, focus states, semantics, keyboard) as a **hard gate**; **responsive overflow**; **content-presence** (all brief strings appear in the DOM); **numeric exact-match** — every numeric/structured brief field (prices, stats, dates, addresses) is diffed against the rendered value, any mismatch = hard violation; **placeholder scan** (no lorem/TODO). Token-allowlist is **out of scope in Phase 0** (no design system yet) — arrives in C1.6. Violations feed back as **specific hard feedback**; the Critic can never override them.
- **Done when:** an a11y/contrast failure **cannot pass** the composite gate; an injected numeric transposition is caught; every objective floor item has a deterministic test, not a prompt.

### C0.8 — Critic (fresh context, subjective only)
- **Closes:** F-JDG-03 (generator self-grading), F-JDG-06 (partial — record raw, prefer pairwise); establishes the **H3 first signal** (Critic↔human agreement)
- **Implements:** MP-2, MP-3, **I2** (Critic never shares context with Generator)
- **Depends on:** C0.7
- **Spec source:** [`spec/05 §4`](./spec/05-generation-loop.md)
- **Build:** the Critic runs in a **fresh, isolated session** — it sees only screenshots + constraints, **never** the Generator's reasoning. It judges **subjective quality only** (brand/brief fit, craft); everything objective already lives in C0.7. The prompt builder checks the run config for font substitutions and injects the `CAVEATS` slot if active (M6: *"judge type scale/weight, not letterforms"*). Use `criticTemperature = 0.2`. Prefer **pairwise** comparison scaffolding over absolute scoring (more stable), and record **raw judgments** for later calibration. Output is structured JSON (validated by C0.9).
- **Done when:** the Critic call provably carries **zero** Generator history; first-pass rate is realistic (not ~100%); repeated critiques of a fixed screenshot set have measured (recorded) variance.

### C0.9 — Schema Gate
- **Closes:** F-MOD-03 (unparseable structured output), F-GEN-06 (partial — truncation detected on structured outputs)
- **Implements:** MP-1, MP-11
- **Depends on:** C0.8
- **Spec source:** [`spec/11 §2.1`](./spec/11-guardrails-and-invariants.md) (Schema Gate row), [`spec/11 §4`](./spec/11-guardrails-and-invariants.md)
- **Build:** validate every LLM structured output (Critic verdict now; crystallizer/write-back later) against its JSON schema; on failure, **one re-ask**, then fall back to a safe conservative verdict (never crash, never silently pass).
- **Done when:** a malformed Critic response triggers exactly one re-ask, then a safe default; the loop never crashes on bad JSON.

### C0.10 — Composite Pass Gate
- **Closes:** F-JDG-04 (false pass — structural closure)
- **Implements:** the composite gate: `APPROVED ⇔ (all deterministic checks PASS) ∧ (Critic = pass)`
- **Depends on:** C0.7, C0.8, C0.9
- **Spec source:** [`spec/11 §2.2`](./spec/11-guardrails-and-invariants.md)
- **Build:** a section is approved **only** when the Hard-Constraint Gate passes **and** the Critic passes. The Critic can never approve something that fails contrast/content/numeric checks; the deterministic layer can never *certify* subjective quality on its own.
- **Done when:** a candidate that fails any deterministic check is never approved regardless of Critic verdict; a candidate the Critic fails is never approved regardless of deterministic pass.

### C0.11 — Loop engine (bounded, non-regressing, recorded)
- **Closes:** F-LOOP-01 (runaway), F-LOOP-02 (regression), F-LOOP-03 (oscillation), F-LOOP-04 (silent exhaustion), F-LOOP-05 (unbounded render-repair)
- **Implements:** MP-4, MP-5, **I4** (never worse than best-seen), **I10** (exactly one terminal state)
- **Depends on:** C0.10
- **Spec source:** [`spec/11 §3`](./spec/11-guardrails-and-invariants.md), [`spec/05`](./spec/05-generation-loop.md)
- **Build:** the generate→render→gates→critique→edit loop with: **best-so-far retention** (replace current best only on a *strictly higher* score); **bounded** by `max_iters` + token/wall-clock budgets enforced **centrally** (not per-call); **feedback serialization with scope discipline** — "fix *this*, preserve *that*", cap how much one iteration may change, track violation-class history to detect A↔B ping-pong and escalate early; in explore iterations, flag one candidate as `exploration: true` (M8); a **bounded render-repair sub-loop** with its own `renderRepairTries` limit, each attempt counted against the run budget and traced, unrepairable after K → `abort + record`; **terminal-state guarantee** — on exhaustion, always write best-so-far + emit an `escalated` record to the `escalations.jsonl` queue (M7).
- **Done when:** a forced non-terminating critique loop hits the budget cap and **escalates** with best-so-far and a queue record; a worse-scoring later candidate is never selected; an exploration candidate is traced and never bypasses gates; a never-rendering component aborts at the repair try-limit; forced exhaustion always writes a terminal state (no vanished run).

### C0.12 — Durable trace
- **Closes:** F-STO-04 (trace loss), F-STO-01 (partial — atomic writes)
- **Implements:** MP-8, **I6** (every iteration persisted before the next begins)
- **Depends on:** C0.11
- **Spec source:** [`spec/11 §3`, `§5`](./spec/11-guardrails-and-invariants.md)
- **Build:** append each iteration's `RunRecord` to `trace.jsonl` **immediately** (not at run end), via atomic append; each record carries iteration index, scores, tokens, model id, provider, decision, terminal state. Writes are temp-file + atomic rename where a full file is rewritten.
- **Done when:** killing a run mid-loop leaves all completed iterations persisted and replayable; no partial/corrupt trace line.

### C0.13 — Resilience (provider & infra)
- **Closes:** F-MOD-01 (API failure), F-MOD-02 (benign refusal), F-MOD-04 (cost/latency blowup), F-MOD-06 (partial — per-section scope)
- **Implements:** MP-11, MP-5
- **Depends on:** C0.12
- **Spec source:** [`spec/11 §4`](./spec/11-guardrails-and-invariants.md)
- **Build:** retries with backoff on 429/5xx/timeout (resume from last persisted iteration); refusal-stop-reason handling with a fallback/rephrase path; sane timeouts; stream large outputs; **pinned model id recorded in every trace record**; per-run token/wall-clock/model-call budgets that end the run `ESCALATED` on breach (never silent). "Explore early (≈3 candidates), polish late (1)" to bound cost.
- **Done when:** injected 429/timeout retries then resumes from the trace; a simulated refusal is handled (fallback), not a dead run; a run exceeding any budget ends `escalated`.

### C0.14 — Secrets/PII redaction at capture (baseline)
- **Closes:** F-SEC-04 (partial — redact at capture; full scan-before-write-back deferred to C4.1)
- **Implements:** MP-7 (seed), MP-14
- **Depends on:** C0.5 (screenshots), C0.12 (trace)
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-SEC-04)
- **Build:** redact obvious secrets/PII patterns at the point they would enter `trace.jsonl`, screenshots, or logs; never place credentials in harness scope. (A comprehensive PII scan gating write-back arrives with the Library in C4.1 / Phase 2.)
- **Done when:** a seeded secret/PII value never appears verbatim in a persisted trace/log/screenshot.

### C0.15 — CLI + run output layout
- **Closes:** (enabling chunk — no direct failure; wires C0.1–C0.14 into a runnable MVP)
- **Implements:** [`spec/07`](./spec/07-mvp-cli.md)
- **Depends on:** C0.1–C0.14
- **Spec source:** [`spec/07 §3, §5`](./spec/07-mvp-cli.md)
- **Build:** `ade generate --brief ./briefs/<x>.json --section <name> [--plan ./plans/<x>.json] --out ./runs/<x>` writing the `runs/<out>/` layout: `config.json`, `plan.json` (if supplied, M5), `final/Section.tsx` + `final/shots/{1440,768,375}.png`, `iterations/`, `trace.jsonl` (with `plan.json` referenced in the trace config block). `--refs` accepted as a no-op.
- **Done when:** the Burkes hero brief runs end-to-end (with optional `plan.json` recorded) and produces the full on-disk layout with a terminal state.

### C0.16 — Measurement discipline + verdict capture
- **Closes:** F-SPEC-05 (measurement theater), F-HUM-01 (partial — structured verdict capture)
- **Implements:** **I12** (reported numbers are observed/human-anchored), MP-12 (seed)
- **Depends on:** C0.15
- **Spec source:** [`spec/08 §4`](./spec/08-hypotheses-and-validation.md), [`spec/11 §7`](./spec/11-guardrails-and-invariants.md)
- **Build:** a `report` tool that emits **observed** numbers only (never predicted/Critic-only), and a structured `verdict` tool that persists human approve/reject/notes **with** the artifact — the substrate for H1/H3 and later calibration. Always pair any Critic metric with the human ground-truth it must be checked against. The verdict tool must support a **three-way blind** comparison (iter-0 / final / control-best presented in random order, positions logged) to gather unbiased ground-truth for H1. Every verdict must carry **distribution tags** at capture (`gen_model_id`, `critic_model_id`, `config_version`, `system_snapshot`) — the corpus is only future-proof if tagged from the first verdict (F-MOD-07, F-MOD-08). **Add a `--retest` mode to the verdict tool (E0.7 / M13)** to facilitate the quarterly human test-retest ritual on a frozen artifact set.
- **Done when:** every reported quality number traces to a human-validated measurement; each run can carry a linked structured verdict in the three-field schema (`iter_0_path`, `final_path`, `control_best_path`, `positions_log`) with `dist_tags`; the `--retest` mode is implemented.

### C0.17 — Token-economy instrumentation (H7 substrate)
- **Closes:** (instrumentation — enables **H7**; the measurement substrate that lets F-MOD-06, F-CON-04, F-MEM-08, F-OPS-06 be *detected* rather than assumed)
- **Implements:** MP-5 (context economy), I12 (observed numbers)
- **Depends on:** C0.12 (trace), C0.13 (budgets)
- **Spec source:** [`spec/08`](./spec/08-hypotheses-and-validation.md) (H7), [`spec/02 §4`](./spec/02-architecture.md)
- **Build:** record, in every `RunRecord`, the **input-token breakdown by bundle part** (hard: brief/brand/system; soft: refs/Library; visual-context: prior-section shots; loop-state) plus output tokens and wall-clock, so **tokens/section** can be plotted against section index, ref count, and (later) Library size. This is the substrate for H7 ("context/token cost stays roughly flat regardless of refs/Library size") — spec says instrument it **from Phase 0**, prove it at scale later. No cap logic here (that is C0.13); this chunk only guarantees the numbers exist and are attributable.
- **Done when:** the trace exposes a per-part token breakdown for every iteration; tokens/section can be charted vs. section index and input size with **no manual reconstruction**; the number is observed, never estimated.

### 🏁 Phase-0 exit gate — H1 (go/no-go for the whole project)
- **Closes:** F-SPEC-01 (core premise false), F-SPEC-04 (MVP over-scoping)
- **Spec source:** [`spec/08`](./spec/08-hypotheses-and-validation.md) (H1), [`spec/09 §1`](./spec/09-roadmap-and-open-questions.md)
- **Do:** For each brief (n≥20), run the loop **and** a matched-compute control arm (no feedback carry-forward). Measure whether **seeing its own render measurably improves output across iterations** (H1) by proving that humans **blind-prefer the loop's final over the control's best at significance**. **If H1 fails, STOP and rethink** — do not build Phase 1. Verify the guardrails actually fire: a render bug is caught by the Render-Health Gate (not the Critic), and an a11y/contrast failure cannot pass.

---

## 3. Phase 1 — Brand + Consistency (proves H4; H5 setup)

**Goal:** establish the hard stores (Brand Foundation, Project Design System), crystallization, the Token-Allowlist gate, Phase-Exit Reviews at the brand/PDS boundaries, and multi-section consistency. **Do not start until H1 passes.**

### C1.0 — Hard-store integrity foundation
- **Closes:** F-STO-01 (partial→full atomic writes), F-STO-02 (un-versioned mutation), F-STO-03 (concurrent-run race), F-STO-05 (orphaned references), F-BRD-02 (brand drift after freeze), F-OPS-01 (partial — system-state snapshot per run)
- **Implements:** MP-8, **I5** (hard stores append-only, versioned, atomic, deliberate-events-only)
- **Depends on:** Phase 0 complete
- **Spec source:** [`spec/03 §8`](./spec/03-data-model.md), [`spec/11 §5`](./spec/11-guardrails-and-invariants.md)
- **Build:** a `store.ts` layer: atomic writes (temp + rename); **append-only versioning** for hard stores (each change = a new immutable version with provenance; reads snapshot-consistent); hard stores written **only by deliberate events** (Brand by human approval; System by crystallization — never as a generation side effect); **per-client concurrency control** (lock or optimistic version precondition); **referential integrity** (soft-delete/archive over hard-delete; integrity scan for dangling artifact→system / entry→provenance links); **schema-validate on read**; a versioned **system-state snapshot** per run (prompts + model + Library version, later).
- **Done when:** a non-approval write to a frozen brand is rejected with version integrity intact; a crash mid-write leaves no corrupted state; concurrent runs on one client don't clobber each other; an integrity scan catches a dangling reference.

### C1.1 — Brand-data schema + complete token model
- **Closes:** F-BRD-03 (too vague to constrain), F-BRD-04 (a11y-hostile brand), F-BRD-05 (incomplete token model)
- **Implements:** MP-1
- **Depends on:** C1.0
- **Spec source:** [`spec/03 §3`](./spec/03-data-model.md)
- **Build:** brand schema requires **concrete** values (exact palette + type + motion), not adjectives. Extend the token model with **semantic/state colors** (error/success/warning), a **theming/dark-mode axis**, **fluid** (not just fixed-px) type/space scales, and a standard **export format** (DTCG/Style-Dictionary) — present even if initially unused. Run a **deterministic contrast/a11y check on brand color pairings at approval time**; require accessible primary pairings.
- **Done when:** a pale-on-white brand fails the approval-time contrast check; the schema completeness check passes against the known-real-world-token checklist; generation under one brand is concretely constrained (low variance).

### C1.2 — Brand derivation pipeline
- **Closes:** F-BRD-01 (partial — derivation quality; the review that *catches* it is C1.3)
- **Implements:** MP-12
- **Depends on:** C1.1
- **Spec source:** [`spec/04 §2.1`](./spec/04-memory-and-consistency.md), [`spec/06 §2`](./spec/06-workflows.md)
- **Build:** from provided palette+type + business context, **derive** the rest of the Brand Foundation (personality, tone, motion voice, color-usage rules) as **2–3 distinct directions** each with rationale tied to the business context. On rejection, **re-derive — never hand-patch** a derived field.
- **Done when:** derivation yields 2–3 justified directions; a rejected brand is re-derived (not patched) from an enriched input.

### C1.3 — Brand Phase-Exit Review + human approval gate
- **Closes:** F-BRD-01 (off-brief derived brand)
- **Implements:** MP-13, **I13** (Phase-Exit Gate), MP-12 (human gate)
- **Depends on:** C1.2
- **Spec source:** [`spec/11 §2.3`](./spec/11-guardrails-and-invariants.md)
- **Build:** before the human sees it, a **fresh-context Critic review** against a brand-specific rubric ("does the derived personality/tone/motion fit the business context + provided palette/type? are the 2–3 directions distinct and justified?") ∧ the deterministic palette-a11y check (C1.1) ∧ **a cross-family second judge review** (e.g., `local`/Ollama in dev; disagreement escalates to queue M7). **Bounded: ≤1–2 review→fix→re-check, then escalate to the human.** The human approval gate stays until the autonomy ladder (Phase 3) earns its removal. This boundary is also where brand-level Critic↔human agreement is measured (feeds H8).
- **Done when:** an off-brief derived brand is returned for bounded re-derivation before reaching the human; the review never loops unbounded; brand↔human agreement is recorded per review.

### C1.4 — Brand Foundation as hard input to the loop
- **Closes:** F-SPEC-03 (soft/hard conflation — brand-level activation), F-GEN-01 (partial — brand adherence in generation)
- **Implements:** MP-6, **I1** (now activated against a **real hard store**, not the Phase-0 stub)
- **Depends on:** C1.3 (approved brand), C0.3 (authority-tagged bundle)
- **Spec source:** [`spec/04 §2.1`, `§7`](./spec/04-memory-and-consistency.md), [`spec/01`](./spec/01-actors-and-components.md)
- **Build:** on brand approval, wire the frozen Brand Foundation into the Generator's **authority-tagged input bundle as a `hard` input** (palette, type, motion voice, personality, color-usage rules). This is the first time I1's "hard overrides soft" precedence runs against a **real** hard store rather than the Phase-0 stub. The **hero (section 1) is now generated under the frozen brand**; palette/type conformance stays deterministic (a11y/contrast at C1.1, token-allowlist arrives at C1.7 after crystallization), while the Critic scores an explicit subjective **`brand_adherence`** dimension. Conflict precedence at assembly: brand (hard) always outranks references/Library (soft).
- **Done when:** an off-brand accent suggested by a reference **loses** to the brand's palette; the hero is generated with the brand present in the bundle and tagged `hard`; `brand_adherence` appears as a recorded Critic dimension in the trace.

### C1.5 — Crystallization → Project Design System
- **Closes:** F-PDS-01 (partial — conservative extraction; the review that *catches* it is C1.6)
- **Implements:** [`spec/04 §3`](./spec/04-memory-and-consistency.md)
- **Depends on:** C1.4 (an approved hero generated **under the frozen brand**)
- **Spec source:** [`spec/04 §3`](./spec/04-memory-and-consistency.md)
- **Build:** after the first approved section, the Crystallizer **conservatively** extracts the tokens the hero established (color/type/spacing/radius/motion) and freezes **only the foundation** — later sections may *add* components but never *change* frozen tokens.
- **Done when:** crystallization freezes tokens, not composition; the resulting system is schema-valid and captured as a versioned hard-store event (C1.0).

### C1.6 — PDS Phase-Exit Review + human review
- **Closes:** F-PDS-01 (incorrect/premature crystallization)
- **Implements:** MP-13, **I13**
- **Depends on:** C1.5
- **Spec source:** [`spec/11 §2.3`](./spec/11-guardrails-and-invariants.md)
- **Build:** before freeze, a fresh-context Critic review against a PDS rubric ("do the extracted tokens faithfully capture the hero *without over- or under-specifying*? is the foundation complete for later sections, not over-fitted to one?") ∧ deterministic schema-valid-tokens check ∧ **a cross-family second judge review** (disagreement escalates to queue M7). Bounded ≤1–2 cycles → human. Measures crystallization-boundary agreement.
- **Done when:** an over-/under-specified crystallization is flagged for bounded correction before it becomes law; agreement is recorded.

### C1.7 — Token-Allowlist gate + additive-extension policy
- **Closes:** F-PDS-02 (token contradiction by later section), F-PDS-04 (foundation cannot express a later need), F-GEN-01 (full — token half), F-CON-01 (partial — token drift)
- **Implements:** MP-1, MP-6, **I3**
- **Depends on:** C1.6
- **Spec source:** [`spec/11 §2.1`](./spec/11-guardrails-and-invariants.md), [`spec/04 §3`](./spec/04-memory-and-consistency.md)
- **Build:** the deferred token-allowlist checker (from Phase 0) now runs on **every** section — off-system colors/type/space are rejected; new **components** allowed, new **tokens** rejected. Add an **additive, namespaced extension policy**: a genuinely-needed new token that doesn't alter existing ones may be added (versioned), escalating to a human when an extension touches the foundation. Track extension frequency (high = section 1 was the wrong anchor).
- **Done when:** generating multiple sections yields **zero off-allowlist tokens** (the H4 hard metric); a justified new need is handled by a versioned additive extension, not a contradiction.

### E1.5 — Deterministic DOM craft metrics (M17)
- **Closes:** AI-F4 (missing capability #3)
- **Depends on:** C1.7
- **Spec source:** [`spec/11 §2.1`](./spec/11-guardrails-and-invariants.md)
- **Build:** Compute **advisory craft metrics** deterministically from the rendered DOM at gate time: spacing-scale conformance (share of margins/paddings on the token scale), type-scale conformance, alignment/grid regularity (clustering of element-edge x-coordinates), and tap-target geometry. **Rules:** (1) Introduce as **advisory, not gating**: write values to the trace and inject them into the Critic's context as measurements (e.g., "87% of spacing values on-scale"), shifting craft assessment from VLM to code. (2) Promote to **gating** only on benchmark evidence that a metric correlates with human craft verdicts.
- **Done when:** The metrics are computed and injected into the Critic context; trace records the values.

### C1.8 — Component-layer dedup
- **Closes:** F-PDS-03 (component-layer bloat / duplicates)
- **Implements:** MP-9 (reuse-before-add)
- **Depends on:** C1.7
- **Spec source:** [`spec/04 §3`](./spec/04-memory-and-consistency.md)
- **Build:** before adding a component, retrieve existing ones and reuse/extend; dedup/merge at crystallization. Track unique-vs-total component ratio across sections.
- **Done when:** near-duplicate components are merged rather than accumulated; the unique/total ratio is tracked.

### C1.9 — Multi-section orchestration (consistency enforced)
- **Closes:** F-CON-01 (cross-section drift), F-CON-04 (visual-context overload)
- **Implements:** MP-1, MP-6, MP-5
- **Depends on:** C1.7 (token allowlist), C1.4 (brand-as-hard-input)
- **Spec source:** [`spec/04 §3`](./spec/04-memory-and-consistency.md), [`spec/06 §4`](./spec/06-workflows.md)
- **Build:** each later section runs the Phase-0 loop with (a) the **frozen Project Design System as hard law**, (b) the **frozen Brand Foundation** (via C1.4), and (c) **screenshots of the most relevant 1–3 prior sections** as visual context (not all — bound tokens/section, relates to H7 / C0.17). Never approve drift; regenerate the drifting section under the system.
- **Done when:** a multi-section run holds zero token drift **and** a human "feels like the same site" rating (H4); tokens/section stay ~flat as section count grows.

### C1.10 — Monotony / variation balance
- **Closes:** F-CON-02 (monotony — no variation)
- **Implements:** MP-3, MP-6
- **Depends on:** C1.9
- **Spec source:** [`spec/04 §2`](./spec/04-memory-and-consistency.md)
- **Build:** lock **primitives**, free **composition** — sections share tokens but not layout; the Critic rewards purpose-appropriate variation, so distinct sections aren't hero-clones.
- **Done when:** a variation metric across sections rises while consistency holds; distinct-purpose sections are not near-identical.

### C1.11 — Whole-artifact assembly + QA pass
- **Closes:** F-CON-03 (whole-artifact incoherence)
- **Implements:** MP-13 (assembled-artifact boundary), responsive/overflow deterministic half
- **Depends on:** C1.10
- **Spec source:** [`spec/06 §5`](./spec/06-workflows.md), [`spec/11 §2.3`](./spec/11-guardrails-and-invariants.md)
- **Build:** assemble approved sections and run a **whole-page Critic pass** (cross-section coherence, nav consistency, rhythm, responsive seams) ∧ deterministic responsive/overflow. On failure, **re-loop the offending section** (not a blind patch). Shared nav/footer as locked components.
- **Done when:** an assembled-page incoherence (nav drift, rhythm jump) is caught and routed to a section re-loop; the whole-page human rating clears the bar.

### C1.12 — Brand staleness trigger
- **Closes:** F-BRD-06 (brand staleness with no refresh trigger)
- **Implements:** MP-12
- **Depends on:** C1.3
- **Spec source:** [`spec/10a`](./failures/overall-system-failures/10a-failures-input-and-generation.md) (F-BRD-06)
- **Build:** a periodic (e.g. annual), **human-triggered** brand-freshness re-evaluation — never automatic (F-BRD-02 immutability still holds). On confirmed staleness, re-derive on the same givens with updated context and version-bump.
- **Done when:** brand age is tracked against a human "still feels current?" spot-check; re-derivation is human-triggered and versioned.

### E1.4 — Crystallization A/B experiment (M14)
- **Closes:** AI-F7 (verification-gap G2)
- **Depends on:** C1.7 (Token-Allowlist gate)
- **Spec source:** [`spec/04 §3`](./spec/04-memory-and-consistency.md)
- **Build:** Run an A/B experiment at the Phase-1 boundary. Arm 1: current hero-first crystallization. Arm 2 (design-system-first): derive a candidate token system from brand + brief *before* section 1, and the hero *validates* it. Metrics (already built by then): token-extension frequency, Phase-Exit intervention rate, H4 drift/variety, and human preference. Adopt whichever arm wins; this is an experiment, not a redesign.
- **Done when:** The A/B is executed and metrics reported to finalize the crystallization pipeline sequence.

### E1.2 — Escalation-queue component (M7)
- **Closes:** CA-16 / CF-16 (from contract)
- **Implements:** Asynchronous human touchpoints (Phase 1+)
- **Depends on:** C0.11, C0.15
- **Spec source:** [`spec/06 §9`](./spec/06-workflows.md)
- **Build:** Implement the `escalations.jsonl` queue. In Phase 1, build the orchestration to pause runs when an escalation is emitted, allow asynchronous human answers (e.g., via CLI or Phase-Exit Review UI), and resume the blocked workflow with the provided answer.
- **Done when:** A budget breach emits to the queue; a workflow halts; providing an answer to the queue record successfully resumes the workflow.

### C1.13 — R1 Benchmark `[R-bet — Phase 1]`
- **Closes:** F-SPEC-06 (setup — evaluation-overfitting defense), F-INP-08 (non-English comprehension coverage)
- **Implements:** MP-3, MP-12
- **Depends on:** C0.16 (verdict capture)
- **Spec source:** [`spec/13`](./spec/13-evaluation-charter.md), [`spec/14`](./spec/14-research-agenda.md) (R1)
- **Build:** the human-anchored **golden core** benchmark: multi-domain (incl. **non-English/mixed-language** briefs so F-INP-08 is measured, not assumed), a human rating protocol, core statistical metrics, a **regression gate** (CI for quality), contamination defense (rotating held-out cases, track transfer to *fresh* briefs), and a **bias-probe suite from birth** (order-swap, verbosity-inflation, style-transfer; M9). Every other R-bet is measured against this. The benchmark build now also includes **anchor-set assembly** (10-20 world-class reference works) and the **blind side-by-side protocol** to measure distance-from-anchor and win-rate vs. competitors. Ensure every golden-core brief has a frozen, human-authored **reference interpretation** (M18) to measure comprehension depth. Finally, add two **advisory** originality measures (M19): a **human distinctiveness rating** during the blind pass, and a **self-similarity across briefs** embedding-distance measure to detect monoculture.
- **Done when:** the benchmark runs and produces human-anchored scores with a fresh-held-out transfer measurement; non-English restatement accuracy is tracked separately; the anchor-set and side-by-side protocol are integrated; every golden-core and frontier case carries a `routine | hard | adversarial` stratum tag; the pre-registered power analysis artifact (per boundary × stratum) is produced and stored; verdict stability across the bias-probe suite is measured, and **same-model vs cross-model agreement** are reported as separate standing metrics; the benchmark reports restatement accuracy and interpretation depth per brief (M18), establishing the baseline for the strategy layer; human distinctiveness rating and self-similarity scores are reported in the benchmark without gating (M19).


### ▶ Phase-1 exit gate — H4 (+ H5 setup)
- **Spec source:** [`spec/08`](./spec/08-hypotheses-and-validation.md) (H4, H5)
- **Do:** prove crystallization keeps sections consistent (**zero token drift**) without monotony (H4), and that a shared Brand keeps a would-be website↔product recognizably one brand (H5 setup). Both Phase-Exit boundaries (brand, PDS) record Critic↔human agreement (feeds H8).

---

## 4. Phase 2 — Memory / Library (proves H6)

**Goal:** the soft, cross-project Library that makes project N+1 better than N. **Do not start until H4 passes.**

> ⚠️ **H6-evaluation caveat** ([`knowledge`](./knowledge/decisions-and-conventions.md), spec/36 note): the default hash-embedding must **not** be used to evaluate H6 — use a real local embedding model (C2.0) for the compounding experiment, or the ablation is meaningless.
> 
> **Staging Note (M10):** The Library thesis is tested in **stages**. 
> - **Stage A:** **own-client memory** (retrieval over the same client's approved sections/screenshots — no de-id needed, no altitude review) + the **verdict corpus** as the primary compounding asset. 
> - **Stage B:** the cross-client de-identified Library (C2.5–C2.7) is built **only after** Stage A's ablation (E2.2) shows retrieval adds value beyond model priors.

### C2.0 — Local embeddings provider (key-free)
- **Closes:** F-MEM-03 (embedding drift on model change)
- **Implements:** MP-11, MP-9
- **Depends on:** Phase 1 complete
- **Spec source:** [`knowledge/decisions-and-conventions.md`](./knowledge/decisions-and-conventions.md) (embeddings row), [`spec/36`](./spec/README.md) (referenced)
- **Build:** extend the `local`/Ollama provider with a **local embedding model** (no first-party Anthropic embeddings; Pro credit doesn't cover paid third-party embeddings — a paid embeddings API is the **prod-only** alternative). **Store the embedding-model id with each vector**; re-embed the whole store on a model change.
- **Done when:** embeddings generate with **no `ANTHROPIC_API_KEY`**; a model-version change triggers a full re-embed; each vector carries its model id.

### C2.1 — Library data model (embed-vs-payload split)
- **Closes:** F-MEM-04 (embed-vs-payload violation)
- **Implements:** MP-9
- **Depends on:** C2.0
- **Spec source:** [`spec/03 §2.1`](./spec/03-data-model.md)
- **Build:** embed **only** `intent + context_fit` (the problem-space synthesis); keep construction/values (hex, HTML, tokens) as **payload**, never embedded. This makes retrieval match on *problems*, not values.
- **Done when:** inspection confirms only intent/context_fit is embedded; nearest-neighbors match by problem similarity, not by hex/value collisions.

### C2.2 — Vector store + snapshot + ANN path
- **Closes:** F-MEM-07 (store unavailable/slow), F-MEM-08 (retrieval nondeterminism / flat-file scaling)
- **Implements:** MP-8, MP-9
- **Depends on:** C2.1
- **Spec source:** [`spec/03`](./spec/03-data-model.md), [`spec/10c`](./failures/overall-system-failures/10c-failures-memory-and-learning.md) (F-MEM-08)
- **Build:** start with a flat-file cosine store; **snapshot the Library version per run** (reproducibility); define the **ANN-index migration path** (pgvector) with tuned recall for when the store grows (flat-file cosine is O(n)).
- **Done when:** retrieval is parity-stable at a fixed Library version; the ANN migration path is specified with a recall target.

### C2.3 — Retrieval (confidence-weighted, degrading, optional)
- **Closes:** F-MEM-01 (retrieval miss), F-MEM-02 (retrieval pollution), F-MEM-05 (cold-start blocks generation), F-MEM-06 (soft memory obeyed as hard law)
- **Implements:** MP-6, MP-9, **I1** (soft never overrides hard)
- **Depends on:** C2.2
- **Spec source:** [`spec/04 §5`](./spec/04-memory-and-consistency.md), [`spec/11 §4`](./spec/11-guardrails-and-invariants.md)
- **Build:** rank by **similarity × confidence**; a similarity **threshold** + small top-k to avoid pollution; retrieval is **non-blocking** — on store failure/empty, proceed on brand+brief (degraded, logged), so **cold-start = the MVP** and never errors. Frame retrieved entries as **"direction, may diverge"** (soft); the Critic rewards brief-fit, not entry-resemblance.
- **Done when:** an empty Library runs normally (cold-start = MVP); killing the store mid-run degrades gracefully; retrieved entries never override a hard input; retrieval precision/recall measured on a labeled set.

### C2.4 — Reference activation (soft, capped, dissolved)
- **Closes:** F-REF-01 (reference-as-template/cloning), F-REF-02 (over-influence), F-REF-03 (Frankenstein stitching), F-REF-04 (irrelevant noise), F-SEC-02 (indirect prompt injection via references/memory)
- **Implements:** **I8** (refs soft, capped 5, never scored for resemblance), MP-6, MP-1
- **Depends on:** C2.3
- **Spec source:** [`spec/04 §7`–`§8`](./spec/04-memory-and-consistency.md), [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-SEC-02)
- **Build:** wire `--refs` for real (it was a no-op in Phase 0): references are **soft, capped at 5**, **dissolved into principles** ("moodboard" synthesis, not a parts bin), with an optional **relevance screen**. Hard inputs always outrank soft. The Critic scores **brief_fit, never resemblance** (ablating refs must still yield good, original output). Treat refs **and** retrieved entries as **untrusted data** with clear delimiters — embedded text in a reference or a poisoned Library entry can never override hard rules; deterministic post-checks still hold.
- **Done when:** deleting the reference still yields a good, non-cloned design (the [`spec/00 §1`](./spec/00-overview.md) test); a red-team reference with embedded instructions cannot bypass hard constraints; multi-ref briefs produce one coherent design, not a stitched one.

### E2.1 — Stage A: Own-client memory store (M10)
- **Closes:** AI-F2
- **Build:** Implement retrieval scoped strictly to the *same client's* approved sections and screenshots. Because this does not cross client boundaries, it skips the de-identification gate and altitude review.
- **Done when:** The own-client store operates successfully and retrieves prior sections for the same client without cross-client leakage.

### E2.4 — Strategy/IA layer (M15)
- **Closes:** CA-8, CA-10 / CF-5, AI-F3
- **Depends on:** M5 corpus, C1.13 benchmark
- **Spec source:** [`spec/09 §1`](./spec/09-roadmap-and-open-questions.md)
- **Build:** Implement the **Strategy/IA layer** (R9-class: audience/positioning → site plan/narrative → per-section goals) as Phase 1.5. It is Phase-Exit-Reviewed itself. Evaluate whether it measurably raises brief-fit and whole-page coherence vs. a human-planned baseline, using the M5-captured corpus as its evaluation baseline.
- **Done when:** The layer is implemented and its impact on brief-fit/coherence is measured against the M5 corpus baseline.

### E2.2 — Stage A: Three-arm ablation test (M10)
- **Closes:** CA-6
- **Build:** Run the three-arm ablation (No Library vs. Stage A Own-Client vs. Stage B Cross-Client) using a real local embedding model (C2.0). 
- **Done when:** H6 is evaluated based on whether retrieval measurably beats the model's priors without it.

### C2.5 — Write-back sequence (de-id → abstract → altitude review → dedup → insert) `[Stage B]`
- **Closes:** F-WB-01 (de-identification leak), F-WB-02 (over-/under-abstraction), F-WB-03 (dedup failure), F-WB-06 (confidentiality/strategy leak)
- **Implements:** MP-7, MP-13, **I7** (Library written only from human-approved artifacts through the de-id gate), **I13**
- **Depends on:** C2.3, C1.0 (integrity), **Stage A ablation success (E2.2)**
- **Spec source:** [`spec/03 §2.2`](./spec/03-data-model.md), [`spec/04 §6`](./spec/04-memory-and-consistency.md), [`spec/11 §2.3`](./spec/11-guardrails-and-invariants.md)
- **Build:** the ordered write-back pipeline: (1) **De-identification Gate** — block on any client name/PII/exact brand token/verbatim copy; (2) **abstraction** to a transferable altitude (tag principle/pattern/recipe; favor the mid "pattern" altitude); (3) **abstraction-altitude Phase-Exit Review** (fresh-context Critic) that *also* gates **strategic specificity** (so a de-identified-but-re-identifiable entry is blocked) — bounded ≤1–2 cycles; (4) **dedup/merge** against nearest entries above a similarity threshold (raise confidence / add variation rather than duplicate); (5) insert with low starting confidence + provenance, tagged as a **Tier B provisional write (M16)** subject to audit and auto-expiry.
- **Done when:** an adversarial write-back preserving client identity **or** strategic specificity is blocked; too-specific/too-vague entries are returned for re-abstraction; near-duplicates merge instead of accumulating.

### C2.6 — Confidence weighting, decay & curation `[Stage B]`
- **Closes:** F-WB-04 (bad-pattern enshrinement), F-WB-05 (poisoning/monoculture), F-WB-07 (approved-then-reconsidered entries), F-MEM-02 (partial — poisoning), F-LRN-02 (partial)
- **Implements:** MP-9, MP-12
- **Depends on:** C2.5
- **Spec source:** [`spec/04 §6`](./spec/04-memory-and-consistency.md), [`spec/10c`](./failures/overall-system-failures/10c-failures-memory-and-learning.md)
- **Build:** confidence **rises** with corroboration + human verdict, **decays** with age/disuse; diversity-aware retrieval to resist monoculture; a **periodic curation pass** that re-evaluates *older high-confidence* entries against current human verdicts (not only new write-backs) and can down-weight/retire them.
- **Done when:** output-diversity/retrieval-entropy is tracked over time and doesn't collapse; a curation pass surfaces at least one previously-approved entry for reconsideration; a down-weighted bad pattern stops being retrieved.

### C2.7 — Human-approved-only write-back policy `[Stage B]`
- **Closes:** F-WB-04 (full — enshrinement via unapproved write-back)
- **Implements:** **I7**, MP-12
- **Depends on:** C2.5, C0.16 (verdicts)
- **Spec source:** [`spec/11 §8`](./spec/11-guardrails-and-invariants.md) (I7)
- **Build:** only **human-approved** artifacts are ever written back; trace entry provenance → the human verdict that authorized it. Entries are initially **Tier B (provisional) (M16)** and require confirmation or audit sampling; a false-pass (F-JDG-04) must not silently feed the Library permanently.
- **Done when:** an unapproved artifact can never produce a Library entry; every entry's provenance resolves to a human verdict.

### C2.8 — R2 Human-feedback channel `[R-bet — Phase 2]`
- **Closes:** F-HUM-01 (full — rich structured verdict capture)
- **Implements:** MP-3, MP-12
- **Depends on:** C0.16
- **Spec source:** [`spec/14`](./spec/14-research-agenda.md) (R2), [`spec/19`](./spec/README.md) (referenced)
- **Build:** upgrade the human→system channel: **pairwise** comparison UI, constitution-dimension sliders, spatial annotations, design-rationale surfacing, and verdict **serialization** shaped for future reward-model training (Phase 3 / R4). Verdicts must support a `rejected_with_interest` label to feed trajectory learning from protected exploration candidates (M8). Add an **R16-lite** field (M11): pull a coarse outcome signal forward wherever free (e.g., analytics on the owner's shipped projects) and log it next to verdicts. Register a cheap **feedback-channel A/B test** (identical critique delivered as text vs. annotated screenshot regions) to determine if the channel bottlenecks the loop.
- **Done when:** verdicts are captured in the richer structured form and serialized for downstream training; the `rejected_with_interest` label is available for exploration candidates; R16-lite outcomes are logged; the channel A/B test is executed.

### ▶ Phase-2 exit gate — H6 (compounding)
- **Closes:** F-LRN-01 (no compounding)
- **Spec source:** [`spec/08`](./spec/08-hypotheses-and-validation.md) (H6)
- **Do:** run the **three-arm ablation test (E2.2)** (No Library vs. Stage A Own-Client vs. Stage B Cross-Client) across matched briefs using a **real local embedding model** (not the hash-embedding). H6 holds only if retrieval measurably beats the model priors. *Open question #4 stands: solo project volume may be too low to detect H6 — consider deliberately running many small/synthetic briefs to generate enough data points, or scope Phase 2 down until volume exists.*

---

## 5. Phase 3 — Taste calibration (proves H3/H8)

**Goal:** move the Critic toward measured human agreement, mitigate judge biases, and open the autonomy ladder — plus the two scheduled outer-loop R-bets (R3 constitution-grounded Critic, R4 reward model). The taste-ceiling failures (F-JDG-01, F-SPEC-02, F-LRN-01/02) are **managed, never fully closed** — the honest open research core. **Do not start until H6 passes** (or is explicitly, loggedly deferred).

### C3.0 — Critic calibration loop
- **Closes:** F-JDG-01 (unreliable Critic — managed), F-JDG-04 (false pass/fail — calibration)
- **Implements:** MP-3, MP-12
- **Depends on:** C1.12 (R1 benchmark), C2.8 (R2 channel)
- **Spec source:** [`spec/08`](./spec/08-hypotheses-and-validation.md) (H3/H8), [`spec/09 §2`](./spec/09-roadmap-and-open-questions.md)
- **Build:** track **Critic↔human agreement per boundary** over batches; use the Critic to reliably catch **bad** while humans hold **final** judgment; ground with anchored examples; recalibrate the rubric from disagreements; confusion matrix at the threshold.
- **Done when:** Critic↔human agreement is measured and trends over batches (H8); boundary false-pass/false-fail rates are quantified, not asserted.

### C3.1 — Judge-bias mitigation
- **Closes:** F-JDG-05 (domain-blind judging), F-JDG-06 (full — non-determinism), F-JDG-07 (systematic judge biases)
- **Implements:** MP-3
- **Depends on:** C3.0
- **Spec source:** [`spec/10b`](./failures/overall-system-failures/10b-failures-eyes-judging-and-loop.md) (F-JDG-05/06/07)
- **Build:** **order-randomization + position-debiasing** for pairwise; **ensemble/self-consistency** to reduce sampling variance; **crop-based / higher-resolution** inspection for fine detail (kerning, 1px misalignment, small-text legibility); pass **domain/`context_fit`** to the Critic; ground in the constitution + anchored exemplars. (Scope note: measuring these biases via probes exists since Phase 1 / C1.13; this chunk implements the active mitigations).
- **Done when:** bias probes (swap order, vary verbosity) show measured verdict stability; cross-domain agreement is broken out per domain; fine-detail defects are detected.

### C3.2 — Autonomy ladder
- **Closes:** F-HUM-03 (premature autonomy relaxation)
- **Implements:** MP-12, **I13** (human gate removed only when the boundary earns it)
- **Depends on:** C3.0
- **Spec source:** [`spec/09 §2`](./spec/09-roadmap-and-open-questions.md), [`spec/11 §2.3`](./spec/11-guardrails-and-invariants.md), [`spec/13 §4`](./spec/13-evaluation-charter.md)
- **Build:** a gate is relaxed **only** where that boundary's measured Critic↔human agreement clears an explicit threshold **in every stratum** (`routine | hard | adversarial`). An aggregate pass masking a stratum failure is not a pass. Once relaxed, a **≥10% standing random audit** of unattended passes runs forever; the **measured audit miss-rate** (not complaints) is the automatic drop-back trigger. Every rung-promotion decision must cite the pre-registered power analysis artifact for that boundary × stratum (see C1.13).
- **Done when:** no rung change occurs without per-stratum agreement evidence, a cited power analysis, and an active standing audit; a miss-rate breach drops the rung automatically.

### C3.3 — Multi-reviewer + uncertainty-routed review
- **Closes:** F-HUM-02 (reviewer-taste overfitting), F-HUM-04 (review bottleneck / rubber-stamp / taste SPOF)
- **Implements:** MP-3, MP-12
- **Depends on:** C3.0
- **Spec source:** [`spec/10c`](./failures/overall-system-failures/10c-failures-memory-and-learning.md) (F-HUM-*), [`spec/14`](./spec/14-research-agenda.md) (R14)
- **Build:** multiple reviewers with inter-rater agreement tracking (weight by consensus); **promote R14 (uncertainty-routed review) to land with the first verdict flow (M16):** route the human's scarce minutes to low-confidence/high-stakes items (like Tier A writes) and let Tier B audits handle the rest; low-friction capture to resist rubber-stamping. *(Open question #3: whose taste is ground truth when reviewers disagree — currently "whoever runs the project"; revisit when a second reviewer joins.)*
- **Done when:** inter-rater reliability is tracked; a subtly-bad artifact injected under load is **not** rubber-stamped; review routes by uncertainty, not uniformly.

### C3.4 — R3 Constitution-grounded Critic `[R-bet — Phase 3]`
- **Closes:** F-JDG-02 (reward hacking), F-SPEC-02 (taste ceiling — managed), F-LEG-03 (partial — ethics constraint in constitution)
- **Implements:** MP-3, MP-12
- **Depends on:** C3.0, C1.12
- **Spec source:** [`spec/12`](./spec/12-design-constitution.md), [`spec/14`](./spec/14-research-agenda.md) (R3), [`spec/20`](./spec/README.md) (referenced)
- **Build:** inject the thin **Design Constitution** (~8 principles + rationale, self-amending: system proposes, human ratifies, versioned) into the Critic; anchor with **visual exemplars**; validate against the Golden Core. Watch the **Critic-vs-human gap** (not Critic scores alone) to catch reward hacking. Include the **ethics/dark-pattern** principle (feeds F-LEG-03) and a **representation/bias** principle (feeds F-LEG-05, forward-looking).
- **Done when:** a **measured gain on the R1 benchmark** (no change ships without it); rising Critic scores with flat human ratings are flagged as reward hacking.

### C3.5 — R4 Reward model `[R-bet — Phase 3]`
- **Closes:** F-LRN-01 (partial — compounding judge), F-LRN-02 (calibration transfer)
- **Implements:** MP-3, MP-9
- **Depends on:** C3.4, C2.8 (verdict data)
- **Spec source:** [`spec/14`](./spec/14-research-agenda.md) (R4), [`spec/21`](./spec/README.md) (referenced)
- **Build:** preference learning / VLM distillation on accumulated verdicts. **RLAIF bulk design (M11):** To solve signal starvation at solo scale, rely on AI preference labels for training bulk (strongest available model, decorrelated contexts, cross-family where feasible), using the human golden core + verdicts for calibration and held-out validation only; budget volume against S2 quota findings. **Judge-distillation framing:** this small trained reward model is the system's *only* weight-level learning lever (prod-only path acceptable). Use a **dual-judge deployment** (learned reward model augments/distills the prompted Critic). Separate universal-craft from domain-style signals to test cross-domain transfer.
- **Done when:** the reward model beats the prompted Critic on held-out human-verdict accuracy; cross-domain transfer is measured; RLAIF bulk training is budgeted and executed.

### C3.6 — Search-dynamics research bets `[R-bet — DEFERRED / LATER]`
- **Closes:** F-LOOP-06 (greedy local optimum → **R7**), F-LOOP-07 (scalarization hides Pareto → **R8**), F-LOOP-08 (no adaptive effort → **R12**)
- **Implements:** MP-4 extensions
- **Depends on:** C3.0
- **Spec source:** [`spec/14`](./spec/14-research-agenda.md) (R7/R8/R12), [`spec/24`/`25`/`29`](./spec/README.md) (referenced)
- **Build (only if `spec/15` schedules the bet at the current phase):** R7 diversity-injection / restart-on-plateau / "abandon this direction"; R8 Pareto-front selection with human/second-critic tie-break instead of pure `weighted_total`; R12 stakes-weighted budgets + marginal-gain/plateau detection. **These are an optional menu — do not build them as a checklist.**
- **Done when:** for each bet actually scheduled, its named experiment shows the predicted gain (R7: escapes a seeded local optimum; R8: picks the spiky candidate humans prefer; R12: better quality-per-token at fixed budget).

### C3.7 — Product-surface capability `[DEFERRED / LATER]`
- **Closes:** F-SUR-01 (app states unrepresented), F-SUR-02 (state explosion), F-SUR-03 (interaction states not driven), F-SUR-04 (unsupported high-value surfaces)
- **Implements:** MP-10, MP-5
- **Depends on:** Phase 0 Eyes
- **Spec source:** [`spec/09 Q5`](./spec/09-roadmap-and-open-questions.md), [`spec/10c`](./failures/overall-system-failures/10c-failures-memory-and-learning.md) (F-SUR-*)
- **Build (deferred — marketing sections first):** for product surfaces, require explicit component states; the Eyes **drive** interactions (hover/click/type via Playwright) and capture a **prioritized canonical set** (default/empty/loading/error/filled), not every combination; an explicit per-surface roadmap (forms, multi-page, email, data-viz, localization/RTL) with honest scoping until built.
- **Done when (per surface built):** non-default and interaction states are captured and judged; a per-surface capability checklist passes before claiming support.

### C3.8 — Robustness & serendipity research bets `[R-bet — DEFERRED]`
- **Closes:** F-INP-09 (content-robustness fragility → **R10**), F-MEM-09 (same-domain retrieval suppresses novelty → **R11**)
- **Depends on:** C0.7 (hard-constraint gate), C2.3 (retrieval)
- **Spec source:** [`spec/14`](./spec/14-research-agenda.md) (R10/R11), [`spec/27`/`28`](./spec/README.md) (referenced)
- **Build (deferred):** R10 content-stress matrix (2×/3× length, missing-optional-field, long-unbroken-string) as part of the hard-constraint gate; R11 a cross-domain "wildcard" retrieval slot alongside same-domain top-k.
- **Done when (per bet scheduled):** R10 lowers escaped-failure rate on held-out content variations; R11 raises human distinctiveness ratings vs same-domain-only.

### C3.9 — Evaluation-overfitting defense
- **Closes:** F-SPEC-06 (benchmark Goodhart — ongoing)
- **Implements:** MP-3, MP-12
- **Depends on:** C1.12
- **Spec source:** [`spec/13`](./spec/13-evaluation-charter.md), [`spec/10d`](./failures/overall-system-failures/10d-failures-quality-and-infrastructure.md) (F-SPEC-06)
- **Build:** keep the benchmark **growing and refreshed** — rotating held-out cases, system-proposed adversarial cases (human-ratified), and continuous tracking of **transfer to fresh briefs** (not just core scores). Discount non-transferring gains.
- **Done when:** the fresh-held-out transfer gap is monitored alongside core scores; benchmark age is tracked.

### [DONE] E3.2 — Substrate-succession subsystem (M12)
- **Closes:** CA-4 / CF-2, CF-10 (via F-MOD-07/08)
- **Build:** Exercise the **Model succession playbook** (`spec/11 §4`) at the first real model swap (deprecation or upgrade). Follow the 6-step procedure: freeze old baseline, re-run golden core on the new model, re-verify calibrations, retrain/refresh reward model, re-embed (if needed), and log a succession entry with deltas.
- **Done when:** The first model swap is absorbed without losing calibration, proving the system can survive substrate change.

### [DONE] E3.3 — Self-audit pass (M20)
- **Closes:** EG-5 (gap G15) - Self-weakness detection
- **Depends on:** C0.11 (trace), C0.16 (verdicts)
- **Spec source:** [`spec/14 §8`](./spec/14-research-agenda.md)
- **Build:** Implement a periodic self-audit pass over `trace.jsonl` and the verdict corpus. It must cluster recurring hard-gate violations, Critic↔human disagreement patterns (by dimension/stratum), low-scoring briefs, and escalation causes. Emit three typed proposal streams: new failure-catalogue entries (`failures/`), constitution-amendment proposals (`spec/12`), and frontier eval cases (`spec/13`). Every proposal must cite the trace rows that produced it and enters as **Tier A** (strict human ratification).
- **Done when:** A seeded recurring failure in synthetic trace data is surfaced by the pass with its supporting rows cited, and the three streams are emitted for human review.

### [DONE] ▶ Phase-3 exit gate — H3/H8
- **Spec source:** [`spec/08`](./spec/08-hypotheses-and-validation.md) (H3/H8)
- **Do:** demonstrate that pairwise ranking beats absolute scoring and that Critic↔human agreement is **measurable and trending upward** without ground-truth leakage. This is **open-ended** — never fully "done." Autonomy relaxes only where agreement has earned it.

---

## 6. Phase 4 — Production hardening (before ship / scale / unattended)

**Goal:** everything that must be true before ADE ships real work, scales, or runs unattended — the red-team surfaces (security, legal/IP, production parity, output-code quality, operations/DR). Much of this is **DEFERRED / accepted risk** at solo R&D scale per the problem ledger; build it when the purpose question (open question #1) resolves toward "product."

### [DONE] C4.0 — Sandbox hardening
- **Closes:** F-SEC-01 (full — untrusted code execution), F-SEC-03 (full — data exfiltration), F-SEC-05 (SSRF via asset/reference URLs)
- **Implements:** MP-14
- **Depends on:** C0.4 (baseline sandbox)
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-SEC-*)
- **Build:** deny-by-default egress; resource caps; ephemeral per-render; no secrets in scope; **URL allowlist + private-range blocking** on every fetch (asset/reference), fetched inside the sandbox, to close SSRF (private ranges, cloud metadata endpoints).
- **Done when:** an outbound call from generated code is blocked and flagged; an internal/metadata URL is blocked; no secret is ever in harness scope.

### [DONE] C4.1 — Secrets/PII full redaction + write-back scan
- **Closes:** F-SEC-04 (full)
- **Implements:** MP-7, MP-14
- **Depends on:** C0.14, C2.5
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-SEC-04)
- **Build:** comprehensive secret/PII scanning at capture **and** as a hard gate before any write-back; purge + rotate on detection.
- **Done when:** a seeded secret/PII never reaches a persisted artifact **or** a Library entry.

### [DONE] C4.2 — Output-quality gate
- **Closes:** F-COD-01 (non-semantic HTML), F-COD-02 (unmaintainable/non-integrable React), F-COD-03 (insecure output/XSS), F-COD-04 (uncontrolled external resource loads)
- **Implements:** MP-16
- **Depends on:** Phase 0 Generator
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-COD-*)
- **Build:** deterministic static analysis of generated code: **semantic-HTML/landmark** check (`nav`/`header`/`main`/`button` where `div`s were used); **prop-driven** (no hard-coded content), componentized, keys present; **security-lint** (no `dangerouslySetInnerHTML`, no unsanitized interpolation/URL handling); **resource-origin allowlist** (self-host fonts/scripts/images); lint/format clean.
- **Done when:** div-soup, a hard-coded-content component, `dangerouslySetInnerHTML`, and a remote-font import are each caught by the gate.

### [DONE] C4.3 — Provenance & compliance review
- **Closes:** F-LEG-01 (inadvertent cloning/infringement), F-LEG-02 (unlicensed fonts/imagery), F-LEG-03 (dark patterns), F-LEG-04 (missing regulatory/disclaimer content), F-LEG-05 (representation/bias in imagery)
- **Implements:** MP-17, MP-12
- **Depends on:** C3.4 (constitution ethics principle)
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-LEG-*)
- **Build:** licensing checks on fonts/assets (record provenance); **originality/similarity screen** against known sites (ablate refs → output must stay original); **dark-pattern screen** (never write dark patterns to the Library; refuse manipulative execution even if the brief invites it); **domain-triggered regulatory checklist** (financial/medical/legal disclaimers, consent, a11y statements); representation/bias consideration wired into any future imagery-selection/generation *before* it ships (R15). *(Note on M19: The Phase-4 legal similarity screen here remains separate and unchanged; it acts as a hard gate for compliance, whereas M19 introduces distinctiveness and self-similarity as advisory metrics in Phase 1.)*
- **Done when:** an unlicensed font is flagged pre-build; a high-resemblance output is flagged; a financial brief fires the regulatory checklist; a brief inviting false urgency is refused.

### [DONE] C4.4 — Production-parity validation
- **Closes:** F-PAR-01 (cross-browser), F-PAR-02 (harness Tailwind ≠ prod build), F-PAR-03 (SSR/hydration unverified), F-PAR-04 (SEO/meta/structured data absent), F-QF-04 (Core Web Vitals never measured)
- **Implements:** MP-15, MP-16
- **Depends on:** C0.4 (which *flagged* F-PAR-02)
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-PAR-*), [`spec/10d`](./failures/overall-system-failures/10d-failures-quality-and-infrastructure.md) (F-QF-04)
- **Build:** before delivery, validate on the **real engine set** (Chromium + Firefox + WebKit); render through the **purged production Tailwind build** (real config, not CDN — closing the C0.4 gap); an **SSR/hydration** harness (Next.js target) to catch hydration mismatch/CLS; **SEO/meta/structured-data** checks; a real **Core Web Vitals / bundle-weight** checker (Lighthouse or equivalent) — the deterministic performance checker F-QF-02 named but never had.
- **Done when:** a WebKit-only bug, a CDN-vs-prod purge divergence, a hydration mismatch, missing meta, and an oversized unoptimized asset are each caught before delivery.

### [DONE] C4.5 — Accessibility depth
- **Closes:** F-QF-03 (a11y depth / false compliance)
- **Implements:** MP-1, MP-12
- **Depends on:** C0.7 (axe baseline)
- **Spec source:** [`spec/10d`](./failures/overall-system-failures/10d-failures-quality-and-infrastructure.md) (F-QF-03)
- **Build:** treat a11y as a **dimension, not a binary gate** — axe catches only ~30–45% of WCAG; add keyboard-flow/focus-management, screen-reader, reduced-motion, and 200%-zoom reflow checks + periodic manual/AT audits; a11y in the constitution.
- **Done when:** keyboard-trap and SR-broken fixtures are detected **beyond** axe; a reflow/zoom failure is caught.

### [DONE] C4.6 — Operations, reproducibility & DR
- **Closes:** F-OPS-01 (nondeterminism/non-reproducibility), F-OPS-02 (schema/migration breakage), F-OPS-03 (no backup/DR), F-OPS-04 (unbounded storage growth), F-OPS-06 (latency/throughput blowup)
- **Implements:** MP-8, MP-11, MP-5
- **Depends on:** C1.0 (integrity/snapshot)
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-OPS-*)
- **Build:** a **deterministic eval mode** (pinned seed/temperature, frozen retrieval) + versioned **system-state snapshots** (prompts + model + constitution + Library version) so past runs reproduce; **versioned schemas + explicit migrations** (validate on read); **regular versioned backups + tested restore + off-machine replication**; a **retention/GC** policy (keep traces, prune bulky intermediates); parallelize where safe + cap end-to-end wall-clock; structured logging/alerting on quality regressions.
- **Done when:** a deterministic re-run is identical; an old-schema record migrates or is cleanly rejected; a simulated disk loss restores with integrity; wall-clock/artifact is tracked with a budget alert.

### [DONE] C4.7 — Toolchain supply-chain discipline
- **Closes:** F-OPS-07 (supply-chain risk in harness/rendering toolchain)
- **Implements:** MP-11 (mirrors F-MOD-05 model-pinning discipline)
- **Depends on:** C0.4
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-OPS-07)
- **Build:** pin Playwright/Vite/Tailwind versions; scheduled dependency audits (`npm audit`); treat a toolchain version bump as a **change requiring re-baselining** against the benchmark (same discipline as a model change).
- **Done when:** a dependency-audit check runs on cadence; a deliberate toolchain bump triggers a benchmark re-baseline.

### [DONE] C4.8 — Production provider path
- **Closes:** F-OPS-05 (full — vendor lock-in / ToS / model deprecation)
- **Implements:** MP-11
- **Depends on:** C0.0
- **Spec source:** [`spec/10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) (F-OPS-05), open question #5 (ToS)
- **Build:** the **prod-only** `ADE_PROVIDER=api` path with a real `ANTHROPIC_API_KEY` (**production only — never dev**); a real fallback (api/local); **confirm the Pro-credit ToS** permits the dev automated workload *before* scaling run volume (open question #5); re-baseline on any model change. Report burn-rate vs S2 limits in `ade report` (S5 amendment).
- **Done when:** killing the primary provider triggers the fallback + a re-baseline gate; the ToS question is resolved and logged before scale-up.

### [DONE] ▶ Phase-4 exit gate — "significantly improved" & ship-readiness
- **Spec source:** [`spec/15 §6`](./spec/15-execution-roadmap.md) *(deleted; interim authority = `IMPLEMENTATION_PLAN.md` + `CONTRACT_EXECUTION_PLAN.md`)*
- **Do:** ADE is "significantly improved" when, unattended, it takes a brief and produces a consistent multi-section artifact that (a) passes the deterministic floor, (b) improves across iterations (H1), (c) a human rates good-or-close ≥50% (H2), (d) holds zero token drift (H4), and (e) at least one outer-loop bet shows a *measured* benchmark gain. **This is not full autonomy** — that stays the long-term north star, capped by the taste ceiling (F-JDG-01, F-SPEC-02), which the guardrails shrink but cannot eliminate.

---

## 7. Cross-cutting invariants (every chunk must uphold)

These 15 invariants ([`spec/11 §8`](./spec/11-guardrails-and-invariants.md)) are always-true properties. The **Introduced by** column names the chunk that first establishes each; **no later chunk may break one.**

| ID | Invariant | Introduced by | Never broken after |
|---|---|---|---|
| **I1** | Hard inputs always override soft inputs. | C0.3 (authority tagging) | all phases (esp. C2.3, C2.4) |
| **I2** | The Critic never shares context/session with the Generator. | C0.8 | all |
| **I3** | Objectively-checkable properties are checked deterministically, never LLM-judged. | C0.7 (+ C1.7 tokens) | all |
| **I4** | A run's result is never worse than its best-seen candidate. | C0.11 | all |
| **I5** | Hard stores are append-only, versioned, atomically written, changed only by deliberate events. | C1.0 | all |
| **I6** | Every loop iteration is persisted before the next begins. | C0.12 | all |
| **I7** | The Library is written only from human-approved artifacts, through the de-id gate. | C2.5 / C2.7 | all |
| **I8** | References are soft, capped at 5, never scored for resemblance. | C0.3 (stub) → C2.4 (active) | all |
| **I9** | Brief/content is data, never instructions; hard constraints survive any input. | C0.1 | all (esp. C2.4 refs/memory) |
| **I10** | Every run terminates in exactly one recorded state (approved/escalated/aborted). | C0.11 | all |
| **I11** | Render-valid screenshots are a precondition for design critique. | C0.6 | all |
| **I12** | Reported quality numbers are observed (human-anchored), never predicted/Critic-only. | C0.16 | all |
| **I13** | No artifact becomes a hard input downstream without passing its Phase-Exit Gate (det ∧ fresh-context Critic); hard-store artifacts also need human approval until the ladder earns its removal. | C1.3 (brand) → C1.6 (PDS) → C2.5 (library) | all |
| **I14** | Generated code is never executed outside an isolated, resource-capped, egress-blocked sandbox. | C0.4 | all |
| **I15** | Every delivery artifact must pass the Output-Quality, Provenance & Compliance, and Production-Parity gates before reaching the client; none may be skipped. | C4.2 / C4.3 / C4.4 | all (delivery) |

---

## 8. Coverage index — every failure → its chunk

Every `F-*` in [`10a`](./failures/overall-system-failures/10a-failures-input-and-generation.md)–[`10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) maps to the chunk(s) that close it. Use this to verify no failure is dropped. `[R]` = carries a research bet; `[D]` = deferred/accepted-risk at solo scale.

| Failure | Chunk(s) | Failure | Chunk(s) |
|---|---|---|---|
| F-INP-01 | C0.1, C0.2 | F-MEM-01 | C2.3 |
| F-INP-02 | C0.2 | F-MEM-02 | C2.3, C2.6 |
| F-INP-03 | C0.2 | F-MEM-03 | C2.0 |
| F-INP-04 | C0.1 | F-MEM-04 | C2.1 |
| F-INP-05 | C0.1 | F-MEM-05 | C2.3 |
| F-INP-06 | C0.1 | F-MEM-06 | C2.3 |
| F-INP-07 | C0.1 | F-MEM-07 | C2.2, C2.3 |
| F-INP-08 | C1.13 | F-MEM-08 | C2.2 |
| F-INP-09 `[R][D]` | C3.8 (R10) | F-MEM-09 `[R][D]` | C3.8 (R11) |
| F-REF-01 | C2.4 | F-WB-01 | C2.5 |
| F-REF-02 | C2.4 | F-WB-02 | C2.5 |
| F-REF-03 | C2.4 | F-WB-03 | C2.5 |
| F-REF-04 | C2.4 | F-WB-04 | C2.6, C2.7 |
| F-BRD-01 | C1.2, C1.3 | F-WB-05 | C2.6 |
| F-BRD-02 | C1.0 | F-WB-06 | C2.5 |
| F-BRD-03 | C1.1 | F-WB-07 | C2.6 |
| F-BRD-04 | C1.1 | F-LRN-01 | Phase-2 gate, C3.5 |
| F-BRD-05 | C1.1 | F-LRN-02 | C2.6, C3.5 |
| F-BRD-06 | C1.12 | F-CON-01 | C1.7, C1.9 |
| F-PDS-01 | C1.5, C1.6 | F-CON-02 | C1.10 |
| F-PDS-02 | C1.7 | F-CON-03 | C1.11 |
| F-PDS-03 | C1.8 | F-CON-04 | C1.9 |
| F-PDS-04 | C1.7 | F-SUR-01..04 `[D]` | C3.7 |
| F-GEN-01 | C0.3, C0.7, C1.4, C1.7 | F-HUM-01 | C0.16, C2.8 |
| F-GEN-02 | C0.8 (+ C2.x, C3.4) | F-HUM-02 | C3.3 |
| F-GEN-03 | C0.6 | F-HUM-03 | C3.2 |
| F-GEN-04 | C0.3 | F-HUM-04 | C3.3 |
| F-GEN-05 | C0.3, C0.7 | F-QF-01 | C0.7 |
| F-GEN-06 | C0.3, C0.9, C0.13 | F-QF-02 | C0.7 |
| F-GEN-07 | C0.7 | F-QF-03 `[D]` | C4.5 |
| F-EYE-01 | C0.6 | F-QF-04 `[D]` | C4.4 |
| F-EYE-02 | C0.5 | F-STO-01 | C0.12, C1.0 |
| F-EYE-03 | C0.5 | F-STO-02 | C1.0 |
| F-EYE-04 | C0.5 | F-STO-03 | C1.0 |
| F-EYE-05 | C0.6 | F-STO-04 | C0.12 |
| F-EYE-06 | C0.5 | F-STO-05 | C1.0 |
| F-JDG-01 | C3.0 | F-MOD-01 | C0.13 |
| F-JDG-02 | C3.4 | F-MOD-02 | C0.13 |
| F-JDG-03 | C0.8 | F-MOD-03 | C0.9 |
| F-JDG-04 | C0.10, C3.0 | F-MOD-04 | C0.13 |
| F-JDG-05 | C3.1 | F-MOD-05 | C0.0 |
| F-JDG-06 | C0.8, C3.1 | F-MOD-06 | C0.13, C2.3 |
| F-JDG-07 | C3.1 | F-MOD-07 | C0.16 (M4) |
| F-LOOP-01 | C0.11 | F-MOD-08 | C0.16, C3.2 (M4) |
| F-LOOP-02 | C0.11 | F-SPEC-01 | Phase-0 gate |
| F-LOOP-03 | C0.11 | F-SPEC-02 `[D]` | C3.4 (managed) |
| F-LOOP-04 | C0.11 | F-SPEC-03 | C0.3, C1.4 (I1), all |
| F-LOOP-05 | C0.11 | F-SPEC-04 | Phase gating (§0) |
| F-LOOP-06 `[R][D]` | C3.6 (R7) | F-SPEC-05 | C0.16 |
| F-LOOP-07 `[R][D]` | C3.6 (R8) | F-SPEC-06 | C1.13, C3.9 |
| F-LOOP-08 `[R][D]` | C3.6 (R12) | F-SEC-01 | C0.4, C4.0 |
| F-SEC-02 | C2.4 | F-SEC-03 | C0.4, C4.0 |
| F-SEC-04 | C0.14, C4.1 | F-SEC-05 | C4.0 |
| F-LEG-01..05 `[D]` | C4.3 (+C3.4) | F-PAR-01..04 `[D]` | C4.4 |
| F-COD-01..04 `[D]` | C4.2 | F-OPS-01 | C1.0, C4.6 |
| F-OPS-02 `[D]` | C4.6 | F-OPS-03 `[D]` | C4.6 |
| F-OPS-04 `[D]` | C4.6 | F-OPS-05 | C0.0, C4.8 |
| F-OPS-06 `[D]` | C4.6 | F-OPS-07 | C0.4, C4.7 |

---

## 9. Inconsistencies flagged for spec reconciliation

Found while writing this plan — surface to the human; do **not** silently “fix” the spec here (spec is canonical; a change is a deliberate spec edit).

1. ~~**`spec/README.md` Step 0 lists “an `ANTHROPIC_API_KEY`” for the build phase.**~~ ✅ **Resolved** — the README now correctly references `ADE_PROVIDER=agent-sdk` for dev and notes the key is Phase-4/production-only.
2. ~~**`spec/README.md` lists docs 15–36 as existing**~~ ✅ **Resolved** — 15 deleted, 16–36 absent; reconciliation done by R4.
3. **Phase numbering:** this plan is 0-indexed (Phase 0 = MVP); `spec/08`/`09` use 1-indexed prose. Kept consistent with the knowledge base’s mapping note.

---

## 10. Appendices — concrete contracts for implementers

> These pin the **data structures, config, and algorithms** the Phase-0 chunks reference but the current on-disk spec does not yet define (the detailed phase specs `16`/`17`/`36` are not on disk). Treat them as the buildable contract; when `spec/16` (Phase-0 detailed spec) lands, migrate these there and this section becomes a pointer. **Field names are normative for the trace/config so tests and tools agree.**

### Appendix A — `trace.jsonl` `RunRecord` schema

One JSON object per line, **appended immediately after each event** (never buffered to run-end), atomic append (I6, C0.12). Every record carries enough to reconstruct the run and compute H1/H3/H7.

```jsonc
{
  "run_id": "burkes-hero-2026-07-14T10-02-11Z",   // stable per run
  "seq": 42,                                        // monotonic within the run
  "ts": "2026-07-14T10:05:33.220Z",
  "phase": 0,
  "section": "hero",
  "iteration": 3,                                   // loop iteration index
  "candidate_id": "c3-a",                           // per-candidate nonce (== window.__ADE_READY_ID__)
  "event": "critique",                              // generate|render|render_repair|gate|critique|pass_gate|terminal
  "provider": "agent-sdk",                          // agent-sdk|api|local
  "model_id": "claude-sonnet-4-6",                  // pinned; recorded on every model call (F-MOD-05)
  "temperature": 0.2,
  "tokens": { "in": 8123, "out": 1440,
              "in_by_part": { "brief": 320, "brand": 210, "system": 0,
                              "refs": 0, "library": 0, "visual_context": 6900, "loop_state": 373 } },
  "wall_ms": 4120,
  "render_health": { "ok": true, "reasons": [] },   // populated on render/gate events (C0.6)
  "hard_constraints": {                             // populated on gate events (C0.7 / C1.7)
    "a11y_pass": true, "contrast_min": 4.9, "overflow": false,
    "content_present": true, "numeric_match": true,
    "token_allowlist_pass": null,                   // null in Phase 0 (no system yet); bool from C1.7
    "violations": []                                // e.g. ["contrast:hero-cta:3.1<4.5"]
  },
  "critic": {                                        // subjective only (C0.8); null on non-critique events
    "verdict": "fail",
    "scores": { "brand_adherence": 0, "brief_fit": 78, "system_adherence": null, "craft": 71 },
    "pairwise": { "vs": "c3-b", "winner": "c3-b" }, // present when pairwise selection ran
    "notes": [ { "scope": "hero-cta", "note": "CTA competes with headline; reduce weight" } ]
  },
  "pass_gate": { "approved": false },                // (hard_constraints.all_pass ∧ critic.verdict==pass)
  "best_so_far": { "candidate_id": "c2-a", "score": 74 },  // I4 — never replaced by a lower score
  "budget": { "tokens_used": 41220, "seconds_used": 512, "calls_used": 11,
              "caps": { "maxRunTokens": 400000, "maxRunSeconds": 3600, "maxModelCalls": 60 } },
  "terminal_state": null,                            // approved|escalated|aborted on the final record (I10)
  "dist_tags": {                                     // distribution provenance — written from config at run start (M4/C0.16)
    "gen_model_id":    "claude-sonnet-5",            // exact Generator model id (F-MOD-07/08)
    "critic_model_id": "claude-opus-4-8",            // exact Critic model id
    "config_version":  "1.2.0",                      // ADE config version
    "system_snapshot": "git:abc1234"                 // source snapshot ref; never inferred retroactively
  }
}
```

Rules: exactly one record has a non-null `terminal_state` per run (I10). `in_by_part` is the H7 substrate (C0.17). Secrets/PII are redacted **before** a record is written (C0.14). `dist_tags` are propagated to every `ade verdict` record so the verdict corpus is future-proof for reward-model retraining (F-MOD-07) and calibration succession (F-MOD-08).

### Appendix B — Config keys & default values

Resolved config is written to `runs/<out>/config.json` at run start. Model roles are **separable from day one** even when equal.

| Key | Default | Phase | Notes |
|---|---|---|---|
| `ADE_PROVIDER` | `agent-sdk` | 0 | `agent-sdk`(dev) \| `api`(prod-only) \| `local`(fallback). **No `ANTHROPIC_API_KEY` in dev.** |
| `genModelId` | `claude-sonnet-5` | 0 | Generator - cheaper is fine (loop corrects). Note: Updated from 4-6 in S3 spike. |
| `criticModelId` | `claude-opus-4-8` | 0 | Critic — **strongest available; never downgrade** (F-JDG-01). |
| `orchestratorModelId` | `claude-haiku-4-5` | 0 | Thin/cheap; comprehension + policy. |
| `genTemperature` | `0.7` | 0 | Generator should diverge. |
| `criticTemperature` | `0.2` | 0 | Critic should stay stable. |
| `maxIters` | `6` | 0 | Per-section loop cap (F-LOOP-01). |
| `exploreCandidates` | `3` | 0 | "Explore early" — parallel candidates for pairwise. |
| `polishCandidates` | `1` | 0 | "Polish late" — single-candidate refinement. |
| `renderRepairTries` | `3` | 0 | Bounded render-repair sub-loop (F-LOOP-05); counts against run budget. |
| `maxRunTokens` / `maxRunSeconds` / `maxModelCalls` | `400000` / `3600` / `60` | 0 | Any breach → run ends `escalated` (F-MOD-04, I10). |
| `passThreshold` | `75` | 0 | Critic pass floor; conservative early (F-JDG-04). |
| `breakpoints` | `[1440, 768, 375]` | 0 | Screenshot widths. |
| `importAllowlist` | `["react"]` | 0 | Phase-0 only; expands with the design system later (F-GEN-04). |
| `embeddingModelId` | *(local)* | 2 | Stored per vector; change → full re-embed (F-MEM-03). |
| `topK` / `similarityThreshold` | `5` / `0.72` | 2 | Retrieval breadth/precision (F-MEM-01/02). |
| `refsCap` | `5` | 2 | References hard-capped (I8). |
| `phaseExitReviewTries` | `2` | 1 | Bounded ≤1–2 review→fix→re-check, then escalate (I13). |

### Appendix C — Critic verdict schema & rubric (subjective only)

The Critic judges **only** subjective quality; every objective property is already decided by the Guardrail Layer (I3). Structured output validated by the Schema Gate (C0.9).

| Dimension | Present from | Meaning |
|---|---|---|
| `brief_fit` | Phase 0 | Serves the brief's goal/audience (F-INP-01). **Never resemblance to refs** (I8, F-REF-01). |
| `craft` | Phase 0 | Composition, hierarchy, typography, rhythm, distinctiveness (anti-slop, F-GEN-02). |
| `brand_adherence` | Phase 1 (C1.4) | Fits the frozen Brand Foundation's voice (subjective half; palette/type is deterministic). |
| `system_adherence` | Phase 1 (C1.7) | Feels like the same system as prior sections (subjective half; tokens are deterministic). |

- **Prefer pairwise** over absolute scoring (F-JDG-06); record both raw scores and pairwise winners.
- Verdict = `pass|fail` at `passThreshold`; `notes[]` must be **scoped and actionable** ("fix *this*, preserve *that*", C0.11 / F-LOOP-03), never a full redesign of a narrow note.
- **Phase-Exit variants** use per-boundary rubrics (Appendix F), not this pixel rubric.
- Phase 0 selection among candidates uses a simple score/pairwise pick; **Pareto selection is the deferred R8 upgrade** (F-LOOP-07, C3.6) — do not build weighted-sum selection as if it were final.

### Appendix D — Orchestrator loop algorithm (per section)

```
run_section(brief, section, bundle, cfg):
  input_gate(brief, assets)                       # C0.1 — reject early, no model spend
  comprehension = comprehend(brief)               # C0.2 — ask, never invent
  best = None
  while budget_ok(cfg) and iter < cfg.maxIters:   # C0.11 / I10
     n = cfg.exploreCandidates if iter == 0 else cfg.polishCandidates   # explore early, polish late
     cands = []
     for k in 1..n:
        code = generate(bundle, last_feedback, temp=cfg.genTemperature)   # C0.3 (stream)
        render = render_in_sandbox(code)          # C0.4 (untrusted, egress-deny)
        health = render_health_gate(render)       # C0.6 / I11
        if not health.ok:
           code = render_repair(code, health, tries=cfg.renderRepairTries)  # C0.11 / F-LOOP-05
           if still_broken: record(abort_candidate); continue
        shots = capture(render, cfg.breakpoints)  # C0.5 (fonts/async ready)
        hc = hard_constraint_gate(shots, brief, system?)   # C0.7 (+ C1.7 tokens)
        if hc.violations: last_feedback = hc.violations; append_trace(); continue   # hard feedback, no critique
        verdict = critic(shots, constraints, fresh_ctx=True, temp=cfg.criticTemperature)  # C0.8 / I2
        verdict = schema_gate(verdict)            # C0.9 (one re-ask → safe default)
        cands.append((code, shots, hc, verdict))
        append_trace()                            # I6 — before next iteration
     pick = select(cands)                         # pairwise/score (Pareto = R8, deferred)
     if pass_gate(pick):                          # C0.10 = hc.pass ∧ critic.pass
        best = keep_if_better(best, pick)         # I4
        return terminal(approved, best)
     best = keep_if_better(best, pick)            # I4 — best-so-far even on fail
     last_feedback = scoped(pick.verdict.notes)   # F-LOOP-03
     if oscillation_detected(): break             # escalate early
     iter += 1
  return terminal(escalated, best)                # budget out → emit queue record (M7), escalate with best-so-far
```

### Appendix E — Gate contracts (deterministic, no model calls except the Critic)

| Gate | Runs when | Input | Deterministic checks | Output | On fail |
|---|---|---|---|---|---|
| **Input Gate** (C0.1) | before spend | brief, assets | schema valid; required fields; no contradictions; asset exists + fit; injection-safe delimiting | `{ok, errors[]}` | reject, **no model call** |
| **Render-Health Gate** (C0.6) | after render, before critique | render handle | build/type-check; non-blank DOM; no error overlay; fonts/images loaded; settled; fingerprint match | `{ok, reasons[]}` | → render-repair (never Critic), I11 |
| **Hard-Constraint Gate** (C0.7 / C1.7) | on healthy render | shots, brief, system? | a11y (axe); contrast; responsive overflow; content-present; numeric exact-match; placeholder scan; token-allowlist *(C1.7)* | `{pass, violations[]}` | specific hard feedback → Generator |
| **Schema Gate** (C0.9) | every LLM structured output | raw model output | matches JSON schema | `{valid, parsed}` | one re-ask → safe default |
| **Pass Gate** (C0.10) | after critique | hc, verdict | `hc.pass ∧ critic.verdict==pass` | `{approved}` | loop again / escalate |
| **De-identification Gate** (C2.5) | before Library write | candidate entry | no client name/PII/exact token/verbatim copy | `{clean, leaks[]}` | block + re-abstract, I7 |

### Appendix F — Phase-Exit Review contract (I13)

Applies the composite pattern at each **non-section** artifact boundary before it becomes law. **Deterministic half ∧ fresh-context Critic half ∧ (human at high-stakes)**; bounded to `phaseExitReviewTries` (≤1–2), then escalate. Not a new component — the existing Guardrail Layer + a fresh-context Critic (I2) at more boundaries.

| Boundary | Chunk | Deterministic half | Critic rubric (subjective) | Closes |
|---|---|---|---|---|
| Brand Foundation | C1.3 | palette a11y/contrast (C1.1) | derived personality/tone/motion fit context + palette/type? 2–3 directions distinct & justified? | F-BRD-01 |
| Project Design System | C1.6 | schema-valid tokens | tokens capture the hero without over-/under-specifying? complete for later sections, not over-fitted? | F-PDS-01 |
| Library entry | C2.5 | de-identification gate | abstraction at a transferable altitude? not strategically re-identifying? | F-WB-02, F-WB-06 |
| Section | C0.10 | Hard-Constraint Gate | brand/brief/system/craft on pixels | F-GEN-*, F-QF-* |
| Assembled artifact | C1.11 | responsive / overflow | cross-section coherence | F-CON-03 |

Forbidden: a single review that hands back fixes and lets them through **unverified** — the fix is always re-checked (the open-loop "final exam" the loop replaced).

---

## Revision history

- **v0.2** — cross-check pass. **Resolved skips/issues:** added **C0.17** (token-economy instrumentation — the H7 substrate the spec requires "from Phase 0," previously missing); inserted **C1.4 Brand-as-hard-input** (the frozen brand must enter the generation bundle before crystallization — a logical gap; Phase 1 chunks renumbered C1.5–C1.13 with §7/§8 updated in lockstep); fixed **C0.14** dependency (now C0.5 + C0.12). **Added micro-detail:** Appendices A–F pin the normative `RunRecord`/`trace.jsonl` schema, config keys + defaults, the Critic verdict schema & rubric, the orchestrator loop algorithm (explore-early/polish-late, best-so-far, terminal states), the deterministic gate contracts, and the Phase-Exit Review contract. Coverage re-verified: every `F-*` still maps to a chunk; no orphans introduced.
- **v0.1** — initial failure-driven implementation plan. Sequences the [`spec/11`](./spec/11-guardrails-and-invariants.md) solutions and the full [`10a`](./failures/overall-system-failures/10a-failures-input-and-generation.md)–[`10e`](./failures/overall-system-failures/10e-failures-security-legal-and-production.md) catalogue into phase-gated chunks (0→4), each tagged with the `F-*` IDs it closes, the MP/invariant/gate it implements, dependencies, build detail, and falsifiable acceptance criteria. Adds the cross-cutting-invariant map (§7), the complete failure→chunk coverage index (§8), and flagged spec inconsistencies (§9). Grounded against the current on-disk spec (`00`–`14`, `10a`–`10e`); references to `15`–`36` are forward links to not-yet-present docs. **No application code — R&D/spec artifact only.**
 
