# ADE — Implementation Plan (build the system from the spec)

> **This is the build plan for the Autonomous Design Engine (ADE).** A single, self-contained document to hand to an implementer (e.g. Claude Opus 4.6). It depends only on itself + the `spec/` docs it cites (`autonomous-design-engine/spec/`, docs 00–11 + README). Build the phases in order; each is gated on a hypothesis and is independently abandonable.

## Context

The ADE specification (`autonomous-design-engine/spec/`, docs 00–11 + README) is complete and internally consistent. It defines an AI that **autonomously designs** websites/products from a business brief (Goal B): a closed **generate → render → screenshot → critique → edit** loop (the "Eyes"), a soft/hard authority model, two memories (soft Library vs hard Brand/Design-System), a deterministic **Guardrail Layer**, and 13 invariants. This plan turns that spec into code.

**Why now / constraints that shape the build:**
- The repo is **greenfield** for ADE code (no LLM client, Playwright, or vector DB exists yet).
- ADE is **standalone**: its own Node+TS project under `autonomous-design-engine/`, **not** a Turbo workspace and **not** part of the TroopHunter build. It must **not** cross-import monorepo `packages/*` (matches the spec's "one machine / one process" shape and the monorepo's no-cross-import rule).
- **Access model (decided in planning):** dev runs on the **Claude Agent SDK authenticated by the Pro plan's Agent SDK credit — no API key**; an **API key** is a drop-in provider for production only. Everything model-related goes behind a **provider abstraction** so dev↔prod↔local is a config swap, never a rewrite.
- Build order follows the spec roadmap (`09`): **Phase 0 Eyes/MVP → 1 Brand+Consistency → 2 Memory → 3 Taste → 4 Scale**. Each phase is **independently abandonable** and gated on a hypothesis (`08`). **Stop after a phase if its gate fails.**

**Intended outcome:** an engineer (or Opus 4.6) can build Phase 0 and Phase 1 from this plan with no further design decisions, and has an unambiguous component-level blueprint for Phases 2–4.

---

## How to use this plan (rules for the implementer)

1. **Build phases in order.** Do not start a phase until the previous phase's **Completion criteria** pass.
2. **The spec is canonical.** Where this plan cites a spec doc (e.g. `03 §4`), that doc holds the authoritative schema/rule; this plan adds build sequence, signatures, and tests.
3. **The 13 invariants (`11 §7`) are a test contract**, not prose. Every invariant has an assertion in the test suite (Appendix B). Code that violates an invariant is a bug regardless of behavior.
4. **Objective → code, subjective → Critic** (`11`): anything checkable (a11y, tokens, render success, schema, content) is the Guardrail Layer's job; the Critic only judges subjective quality.
5. **Every external call is fallible** (`02 §6.7`): retries+backoff, timeouts, streaming for large output, structured-output validation, pinned model id in the trace.
6. **Definition of done per file:** typechecks, has unit tests for its pure logic, and its errors are typed and handled (no silent catch).
7. **Phase numbering is 0-indexed here; the spec's `08`/`09` are 1-indexed.** When a spec doc says a hypothesis is "tested in phase N," map it with the table below, and cross-check whenever you cite `08`.

| This plan | Spec `08`/`09` | Theme | Hypotheses |
|---|---|---|---|
| Phase 0 | "phase 1" / MVP | Eyes / loop | H1 (+ first H2, H3, H7 signal) |
| Phase 1 | "phase 2" | Brand + Consistency | H4 (+ H5 setup) |
| Phase 2 | "phase 3" | Memory / Library | H6 (+ H7 at scale) |
| Phase 3 | "phase 4" | Taste / Judge | H3, H8 |
| Phase 4 | "phase 4"+ | Scale & Production | H5 (cross-surface), sustained quality |

> H3 (pairwise > absolute; first Critic↔human correlation) and H7 (context economy) are **not** Phase-3/2-only — the spec starts both at the MVP. Phase 0 *instruments* them; later phases *prove* them.

8. **Phase-Exit Review (`11 §2.3`, Phases 1–2).** Every *phase artifact* — Brand Foundation, Project Design System, Library entry — passes a **bounded (≤1–2) fresh-context Critic review** before it becomes a hard input downstream (I13). This is **not** a new component or a monolithic judge: it reuses `critic.ts` with a per-artifact rubric, sits just inside the existing human gate, and catches error propagation (F-BRD-01/F-PDS-01/F-WB-02) the section loop never sees. Sections and the assembled artifact already have their instance of it (the section Pass Gate; the whole-artifact QA).

---

## Global architecture & conventions (cross-phase)

### Project layout (`autonomous-design-engine/`)
```
autonomous-design-engine/
├─ spec/                         # existing — canonical design
├─ IMPLEMENTATION_PLAN.md        # this document
├─ package.json                  # ESM ("type":"module"), Node >=18
├─ tsconfig.json                 # strict:true
├─ .env.example                  # ADE_PROVIDER, model id, budgets
├─ .gitignore                    # runs/, node_modules, .env
├─ src/
│  ├─ cli.ts                     # arg parse → dispatch only (no logic) [02 §6.5]
│  ├─ config.ts                  # zod-validated env+flags → typed Config
│  ├─ schema.ts                  # all zod schemas + inferred TS types [03]
│  ├─ model.ts                   # ModelProvider interface + factory (access model)
│  ├─ providers/
│  │  ├─ agentSdk.ts             # Pro-credit adapter — DEV DEFAULT (no API key)
│  │  ├─ anthropicApi.ts         # API-key adapter — PRODUCTION
│  │  └─ localOllama.ts          # local open-weights adapter — FALLBACK
│  ├─ prompts.ts                 # generator/critic/(P1)crystallizer + phase-exit-review builders [05 §6, 11 §2.3]
│  ├─ generator.ts              # generate(bundle, feedback?) → candidate .tsx
│  ├─ eyes.ts                    # mount→render→screenshot (Playwright)
│  ├─ guardrails.ts              # deterministic gates [11 §2]
│  ├─ critic.ts                  # critique(shots,bundle) + (P1+) reviewArtifact() phase-exit reviews — fresh ctx
│  ├─ orchestrator.ts            # runLoop(): the 05 loop; budget, best-so-far, trace
│  ├─ trace.ts                   # append/read trace.jsonl (immediate, atomic, line-per-record)
│  ├─ report.ts                  # ade report: H-metrics from trace.jsonl [0.15]
│  ├─ verdicts.ts                # blind human-verdict log → verdicts.jsonl [0.15]
│  └─ store.ts                   # (Phase 1+) atomic, versioned hard stores [03 §8]
├─ harness/                      # Vite+React preview host (not design output)
│  ├─ index.html
│  ├─ vite.config.ts
│  └─ src/{main.tsx, candidate/Section.tsx}   # candidate/ = mount slot, overwritten per run
├─ briefs/                       # burkes-hero.json, burkes-brand.json (samples)
├─ tests/                        # vitest unit + integration + injected-failure fixtures
└─ runs/                         # output dir (gitignored)
```

### Tech stack (pinned at build, from `02 §5`)
| Concern | Choice |
|---|---|
| Runtime / language | Node ≥18, TypeScript (strict, ESM) |
| LLM (dev) | Claude Opus (`claude-opus-4-8`) via **Agent SDK on Pro credit** |
| LLM (prod) | same model via **Anthropic API key** |
| Output format | React + TypeScript `.tsx` + Tailwind |
| Render harness | Vite + React (Next.js later, Phase 4) |
| Capture | Playwright (headless Chromium) @ 1440/768/375 |
| a11y check | `@axe-core/playwright` |
| Validation | `zod` (schemas + Schema Gate) |
| Tests | `vitest` |
| Vector store | none in 0–1; flat-file → `pgvector` (Phase 2) |

### The access model / provider abstraction (`src/model.ts`) — build this first
```ts
export interface CompletionRequest {
  system: string;
  messages: Msg[];                 // text turns
  images?: ImageRef[];             // for vision (Critic)
  maxTokens: number;
  stream?: boolean;
  schemaName?: string;             // when a structured JSON reply is required
}
export interface CompletionResult { text: string; usage: { input: number; output: number }; }

export interface ModelProvider {
  readonly id: string;             // pinned model id — recorded in every RunRecord (I-resilience)
  complete(req: CompletionRequest): Promise<CompletionResult>;
}
export function getProvider(cfg: Config): ModelProvider; // selects by cfg.provider
```
- **`agentSdk.ts` (default):** wraps `@anthropic-ai/claude-agent-sdk`; auth via the local Claude Code login (OAuth, Pro Agent-SDK credit). **Must NOT read `ANTHROPIC_API_KEY`** (its presence would force API billing).
- **`anthropicApi.ts`:** wraps `@anthropic-ai/sdk`; auth via `ANTHROPIC_API_KEY`. Production.
- **`localOllama.ts`:** POSTs to a local Ollama vision model. Fallback / offline.
- **Day-0 spike (build step 0.0 — do this before anything else):** the Agent SDK is an *agentic* framework (tool loop, sessions, its own system identity), **not** a chat-completions client. Before building the loop, prove the adapter can be driven as a single-shot completer on the Pro credit: **(a)** one text completion with a custom system prompt and bounded `maxTokens`; **(b)** one **vision** completion (image in → text out) for the Critic; **(c)** **token-usage** retrieval for the trace/H7; **(d)** headless OAuth pickup with **no `ANTHROPIC_API_KEY`** set. If vision is unavailable on the credit path, route the Critic to `anthropicApi`/`localOllama` for vision while the Generator stays on `agentSdk` (the abstraction makes this per-role). **The entire dev access model depends on this spike — if it fails, stop and resolve before writing the loop.** Record the outcome in this plan's notes.
- Selected by `ADE_PROVIDER=agent-sdk|api|local` (default `agent-sdk`). All calls get retry+backoff+timeout here, centrally.
- **Per-role model selection.** The interface takes a `modelId` per call, so roles can differ: the **Critic** (section critique *and* phase-exit reviews) is the taste bottleneck and quality ceiling (F-JDG-01) → it warrants the **strongest** model; the **Orchestrator** is mostly deterministic policy → it does not. On the dev Pro credit this is usually one model; the split (cheaper Generator + strongest Critic — `09 §3`) is a Phase 4 cost lever, but keep `criticModelId`/`genModelId` separable in config from day one.

### Config & env (`src/config.ts`)
zod-parse `.env` + CLI flags into a typed `Config`: `provider`, `modelId`, `breakpoints=[1440,768,375]`, `maxIters=4`, `variations=1` (**use ≥2 for H1/H3 validation runs so pairwise ranking is exercised — see 0.10**), `threshold=80`, `renderRepairTries=2`, `genTemperature=0.7`/`criticTemperature=0.2` (Generator diverges, Critic stays stable — F-JDG-06), and **hard budget caps** `maxRunTokens`/`maxRunSeconds`/`maxModelCalls` (F-MOD-04 is High-severity; the dev credit is the most constrained resource). Exceeding a cap ends the run in a recorded `ESCALATED` state, never silently. Invalid config → exit 1 with a precise message.

---

## PHASE 0 — Eyes / MVP (DEEP) — the closed loop on one section

**Spec:** `07` (build-ready) · `05` (loop) · `11 §9` (which gates are in the MVP). **Proves:** H1 (the load-bearing one). **Instruments (does not yet prove):** H2 (human "good/close" rate), H3 (pairwise vs absolute; first Critic↔human correlation), H7 (tokens/section). H1's pass metric is **two-pronged** — Critic scores up in ≥70% of runs **and** humans prefer final over iter-0 in ≥70% of blind pairs (`08` H1) — so the human-verdict capture step (0.15) is mandatory here.

### Objective
A CLI `ade generate` that takes a brief (+ optional brand-data) and runs **generate→render→screenshot→critique→edit** on **one** section, bounded, producing a finished `.tsx` + screenshots + a measurable `trace.jsonl`. **No** Library, Brand store, or Design System yet.

### Deliverables
- The 0.0 Agent-SDK spike result, recorded in this plan's notes.
- Runnable `ade generate` with the exact command surface of `07 §2`, plus `ade report`.
- All `src/*` files above except `store.ts`, plus `report.ts` + a minimal `verdicts.ts` (0.15).
- The Vite+React harness (Tailwind Play CDN, per-candidate ready-nonce, asset/font serving).
- ≥10 sample briefs; test suite incl. the two mandatory injected-failure tests.

### Dependencies (install)
`typescript tsx zod commander @anthropic-ai/claude-agent-sdk @anthropic-ai/sdk playwright @axe-core/playwright esbuild vite @vitejs/plugin-react react react-dom tailwindcss postcss autoprefixer vitest`  · then `npx playwright install chromium`.

### Build steps (ordered, micro-level)

**0.0 Agent-SDK spike (do first, throwaway).** Before scaffolding the loop, prove the dev access model end-to-end (see Global §access model): a script that runs one text completion, one **vision** completion, retrieves **token usage**, and confirms headless OAuth works with **no `ANTHROPIC_API_KEY`** set. This de-risks the single most load-bearing assumption in the build. If vision fails on the credit path, record it and plan to route Critic vision to `api`/`local`. **Do not build 0.1+ until this passes.**

**0.1 Scaffold.** `package.json` (ESM, scripts: `dev`, `build`, `test`, `ade`), `tsconfig.json` (strict), `.gitignore`, `.env.example`. Bin entry maps `ade` → `tsx src/cli.ts`.

**0.2 Schemas (`schema.ts`).** zod schemas + inferred types for the MVP subset of `03`:
- `Brief` (`07 §3`): client, industry, location, audience, goal, section{name, content{...}, assets}.
- `BrandData` (`03 §3.1`): client_id, palette[{role,value}], typography[{role,family,fallback}], logo_ref?.
- `DimensionScores` (`03 §6`): brand_adherence, system_adherence(nullable), brief_fit, craft, weighted_total.
- `CriticOutput`: { scores, ranking?, verdict:'pass'|'fail', feedback }.
- `RunRecord` (`03 §6`): run/section/iteration/candidate, refs, scores, verdict, feedback, duration_ms, tokens, modelId.
- `InputBundle` (`03 §7`) — define the **Phase 0 minimal subset** now so Phase 1 extends a real type: `{ brief; brandData?; refs?: ReferenceRef[]; lastFeedback?: string }`. (Phase 1 adds `hardBrand`, `hardSystem`, `softLibrary`, `ctxShots`.)
- Export a `validate(schemaName, json)` used by the **Schema Gate**.

**0.3 Config (`config.ts`)** — as above.

**0.4 Provider (`model.ts` + `providers/*`)** — as above. Centralize retry/backoff/timeout/streaming here.

**0.5 Prompts (`prompts.ts`).** `buildGeneratorPrompt(bundle, feedback?)` and `buildCriticPrompt(shots, bundle)` per `05 §6.1/6.2`. Generator hard inputs = brief + (if brand-data) palette/type as fixed tokens; **no** design system; personality/tone inferred per-section. **Output contract (state these as explicit rules — they prevent F-GEN-03/04/05):** (1) **exactly one self-contained `.tsx`** that default-exports the section and renders in the harness with no extra wiring (defer `supporting/*.tsx` from `03 §5` to Phase 1); (2) **import allowlist — `react` only**; no icon/image/UI libraries (hallucinated imports break the build, F-GEN-04); inline SVGs instead; (3) **static Tailwind class strings only** — no runtime-constructed class names (the JIT can't see what isn't a literal); (4) **no placeholders** (no lorem/TODO) — use the brief's real content; (5) reference assets only by the harness-served paths the orchestrator provides (0.7). **Feedback serialization (the H1 mechanism — define it exactly):** the next iteration's prompt appends one block — hard-gate `violations[]` first (labelled "MUST FIX"), then the Critic's targeted notes ("IMPROVE"), then "keep what worked." Critic prompt: "you did NOT build this"; judge rendered pixels; return the structured `CriticOutput` shape.

**0.6 Generator (`generator.ts`).** `generate(bundle: InputBundle, feedback?: string): Promise<{tsx: string; usage}>`. Streams the model call (sections are large) at `genTemperature`. Strips markdown fences; returns raw `.tsx`. **Truncation check (F-GEN-06):** if the stream stops on `max_tokens` or braces/JSX tags are unbalanced, treat as incomplete → retry once with a higher budget (counts against `maxModelCalls`), else route to render-repair. On refusal → one reframe retry, then throw `GeneratorError`.

**0.7 Harness (`harness/`).** Vite + React. `harness/src/main.tsx` imports `./candidate/Section.tsx`, mounts it, and after mount + `document.fonts.ready` (+ one animation frame) sets `window.__ADE_READY_ID__` to the candidate id passed via the URL query (`?cid=<candidateId>`) — **a per-candidate nonce, not a boolean**, so a stale render can never be screenshotted (F-EYE-02). `vite.config.ts` on a fixed port. The candidate file is the **mount slot** the orchestrator overwrites each iteration. Four things the harness must get right or the Critic judges artifacts, not design:
- **Tailwind via the Play CDN** (`<script src="https://cdn.tailwindcss.com">` in `index.html`), **not** a build-time `content` scan — the candidate file is written at runtime, so JIT must happen in-browser for arbitrary generated classes to exist (offline/`local` fallback: a broad safelist build). Note the CDN↔production-build difference for Phase 4 parity.
- **Assets**: the orchestrator copies the brief's assets into `harness/public/` and rewrites paths so `hero_image`/`logo_ref` actually load (F-INP-05); missing assets fail the input gate before spend.
- **Fonts**: load brand typefaces (Google Fonts where available; map commercial display faces like "Canela" to a near fallback and **record the substitution** so screenshots aren't graded against a wrong font — F-EYE-03).
- **Disable entrance animations** for the critique snapshot (a settle wait isn't enough — F-EYE-04).

**0.8 Eyes (`eyes.ts`).** `render(tsx: string, candidateId: string, breakpoints): Promise<RenderResult>` — candidates render **strictly sequentially** against the single mount slot (no parallelism in Phase 0):
1. Write `tsx` to `harness/src/candidate/Section.tsx` (atomic temp+rename; on Windows, unlink-then-rename if the target exists).
2. Ensure the Vite dev server is up (spawn once via `npm`/`npm.cmd`, reuse).
3. Playwright Chromium: for each breakpoint set viewport, do a **full** `goto(harnessUrl + '?cid=' + candidateId)` (a reload per candidate is more deterministic than relying on HMR), then `waitForFunction(window.__ADE_READY_ID__ === candidateId)` — the nonce match guarantees the screenshot is *this* candidate, not the previous one (F-EYE-02). Screenshot → `RenderResult.shots`.
4. Capture console errors + the Vite error-overlay element for the render-health gate.
Cleanly close pages; reuse the browser across candidates.

**0.9 Guardrails (`guardrails.ts`)** — deterministic, no model calls (`11 §2.1`). MVP gates:
- `inputGate(brief, brandData?)`: zod-valid; required fields; **contradiction check** (name conflicting signals — F-INP-03); assets exist on disk (F-INP-05); content sanitized (treat as data — I9). Fail → precise error, exit before spend.
- **Brief Comprehension** (lightweight, MVP-required per `11 §6`; mitigates F-INP-01, the highest-severity input failure): one cheap model call that **restates goal/audience/constraints**; on a material mismatch or a missing required fact, surface it rather than invent (F-INP-02). This is the one model call allowed before the loop; it precedes generation spend.
- `renderHealthGate(tsx, renderResult)` (**before** critique, I11): pre-render `esbuild.transform` for a fast **syntax** check — esbuild strips types, it does **not** type-check; semantic errors surface at runtime via the Vite error overlay (captured in step 4); **import-allowlist lint** (reject imports outside `react` — F-GEN-04); post-render assert no error overlay, non-blank DOM (body height/text > threshold), fonts/images loaded, layout settled. Fail → **render-repair** signal (not critique).
- `hardConstraintGate(renderResult, brief, brandData?)`: `@axe-core/playwright` — fail on serious/critical only, and **calibrate the rule subset against 1–2 hand-built known-good sections first** so the gate doesn't reject every AI page and make H1 unmeasurable (F-QF-01); responsive overflow at 375 (`scrollWidth ≤ clientWidth+ε`); content-present (every brief string in DOM) & no-placeholder (lorem/TODO/`{{`); **color allowlist** when brand-data supplied — **as a sampled-tolerance check, not a strict subset of every computed style** (which false-positives on shadows/rgba/anti-aliasing): inspect `color`/`background-color`/`border-color`/`fill`/`stroke` on rendered nodes, convert to a common space, require nearest-palette distance ≤ ε, and explicitly allow `transparent`/`currentColor`/`inherit` + a defined neutral ramp. Fail → specific **hard feedback**; never approve.
- `schemaGate(schemaName, raw)`: validate structured LLM output; one re-ask, then **fail-closed safe default** (verdict=`fail`, neutral scores, parse failure logged — never default to pass).
Each gate returns `{ pass: boolean; violations: Violation[] }` (typed, machine-feedable).

**0.10 Critic (`critic.ts`).** `critique(shots, bundle): Promise<CriticOutput>` — vision call via the provider at `criticTemperature` (low, for score stability — F-JDG-06), **fresh context** (new message list, zero generator history — I2), screenshots + brief (+brand-data). For Phase 0 (always "section 1", no design system) use the **no-system rubric weighting** (`05`: brand/brief/craft only; `system_adherence` = null). Validate via `schemaGate`. **Prefer pairwise ranking** when N>1 (more reliable than absolute — H3); on close absolute calls near `threshold`, re-judge and aggregate. Because single-candidate absolute scores are noisy, **validation runs should set `variations ≥ 2`** so the H1 "scores trend up" signal isn't dominated by Critic noise.

**0.11 Trace (`trace.ts`).** `appendIteration(outDir, record)` — append one `RunRecord` per line to **`trace.jsonl`** (JSONL, not a JSON array) **immediately** after each iteration, with an fsync. True append is the only way to honor "persisted before the next iteration" durably (I6/F-STO-04); a JSON array forces a non-atomic read-modify-write each time. `readTrace(outDir)` parses lines. (The `07 §5` "trace.json" reference means this file.)

**0.12 Orchestrator (`orchestrator.ts`).** `runLoop(cfg, brief, brandData?, outDir): Promise<RunResult>` — the `05 §2` loop:
```
inputGate → assembleBundle
loop i in 0..maxIters-1:
  if budget exceeded (tokens/seconds/calls) → ESCALATED, break          # F-MOD-04
  candidates = generate N (bundle + lastFeedback)
  for each candidate (sequentially):
     render(candidateId) → renderHealthGate
        invalid → render-repair sub-loop (bounded renderRepairTries; each try is a
                  model call counted against budget and traced as a RunRecord) → else mark aborted
        valid   → hardConstraintGate
  if no candidate rendered valid this iteration → carry render errors as feedback (no critique)
  critique render-valid candidates (pairwise if N>1)
  update best-so-far  # eligible = render-valid AND hard-pass; rank eligible by weighted_total
                      # (tie-break: higher craft, then lower iteration); keep a hard-failing
                      # best only while nothing eligible exists yet — strictly better only (I4)
  appendIteration (immediate — I6)
  if hardGate.pass AND critic.verdict==pass AND score≥threshold → APPROVED, break
  else carry (hard violations + critic feedback) into next iteration
end → write final (best-so-far); terminal state APPROVED | ESCALATED | ABORTED (I10)
```
Exit codes: 0 approved, 2 escalated, 3 aborted, 1 error. Pinned `provider.id` into every record.

**0.13 CLI (`cli.ts`).** `commander` parses `07 §2` flags (`--brief --brand-data --section --out --variations --max-iters --threshold --refs --model --headed`) → `config.ts` → `runLoop`. No logic here.

**0.14 Sample inputs (`briefs/`).** `burkes-hero.json` + `burkes-brand.json` exactly as `07 §3`, **plus 7–9 more briefs** across varied domains/goals — H1 needs ≥10 runs (`08` H1) and one brief can't show a trend. Keep them small and trusted-internal (brief-as-data, I9).

**0.15 Measurement & human-verdict capture (`report.ts` + `verdicts.ts`).** H1 **cannot be validated from `trace.jsonl` alone** — its pass metric requires human blind preference, and trusting the Critic's own rising scores is the measurement-theater failure (F-SPEC-05). Build two small things now (not deferred to Phase 3):
- `ade report --out <dir>` (and `--all runs/`): reads `trace.jsonl` and prints per-iteration score deltas, tokens/section (H7), pass rates, and the iter-0→final gain per run (H1 signal A).
- A **blind verdict log**: present iter-0 vs final screenshots in random order, record the human's pick + a 4-point rating (bad/weak/good/strong) to `verdicts.jsonl` (H1 signal B, H2). This is the minimal `verdicts.ts` that Phase 3 grows into calibration.

### Workflow (one run)
`ade generate --brief briefs/burkes-hero.json --brand-data briefs/burkes-brand.json --section hero --out runs/burkes-hero` → loop runs unattended → emits the `07 §5` output tree.

### Error handling & resilience
Provider 429/5xx/timeout → backoff retry (centralized in `model.ts`). Render failure → **separate** bounded repair path, never judged as design (I11/render-repair). Refusal → reframe once → safe fail. Malformed Critic JSON → Schema Gate re-ask → fail-closed default. Budget exceeded → `ESCALATED`. Every run ends in a recorded terminal state (I10); best-so-far always retained (I4). (No mid-run resume in the MVP — a crashed run re-runs from scratch; the durable `trace.jsonl` preserves the measurement substrate either way.)

### Testing strategy (`tests/`)
- **Unit:** schema validation; color-allowlist; content/placeholder check; best-so-far selection (never regress); bundle assembly; trace append is atomic & immediate.
- **a11y gate:** known-bad fixture (low contrast) → gate fails.
- **Integration (mock provider):** deterministic fake `ModelProvider` returns canned `.tsx`/scores → full loop reaches a terminal state and writes a valid trace.
- **Mandatory injected-failure tests (`07 §8.5`):** (a) injected render bug → caught by **render-health gate**, routed to repair, **never** scored by Critic; (b) injected a11y/contrast failure → **cannot** pass the Pass Gate.
- **Budget cap:** a run that hits `maxModelCalls`/token/time cap ends `ESCALATED`, not silently (F-MOD-04).
- **Report/verdict:** `ade report` computes the iter-0→final gain from a synthetic `trace.jsonl`; blind verdict logging writes a well-formed `verdicts.jsonl`.
- **Invariant assertions:** I2 (critic call carries no generator history), I4, I6, I10, I11 (Appendix B).

### Expected outputs
The `07 §5` tree: `runs/<out>/{config.json, final/{Section.tsx, shots/*.png}, iterations/iter-*/…, trace.jsonl, verdicts.jsonl}`. (Phase 0 writes under `runs/<out>/` per `07`; Phase 1 migrates persisted artifacts/trace under `./projects/<client>/` per `03 §8` — keep the writer path-configurable so the layout isn't forked later.)

### Completion criteria (gate to Phase 1)
All `07 §8` done-criteria **and** the **two-pronged H1 metric** (`08` H1): across ≥10 briefs, (A) the Critic's weighted score is higher at final than iter-0 in **≥70%** of runs (from `trace.jsonl`), **and** (B) humans prefer the final over iter-0 in **≥70%** of blind pairs (from `verdicts.jsonl`); the loop **demonstrably edits in response to critique**; both injected-failure tests pass; and H2 viability — **≥50%** of finals rated good-or-strong. **If H1 fails (scores flat/random, or humans can't tell final from first), stop and rethink — do not build Phase 1.**

---

## PHASE 1 — Brand + Consistency (DEEP)

**Spec:** `06 §2–4` · `04 §2.1, §3` · `03 §3,§4,§8` · `11 §2.3, §5`. **Proves:** H4 (zero token drift, variety kept) + sets up H5.

### Objective
Establish a **Brand Foundation** (human provides palette+type → AI **derives** the rest → human approves → freeze), then design **multiple sections** of one artifact that stay consistent via **crystallization** (freeze section-1 tokens) + visual context.

### Deliverables
`store.ts` (atomic/versioned hard stores); brand derivation + approval; `crystallizer`; multi-section orchestration; token-allowlist gate; **Phase-Exit Reviews for brand + PDS** (reused Critic, new rubrics); new CLI subcommands `design brand` / `design section` / `design site`; whole-artifact QA.

### New/changed files & schemas
- **`schema.ts` +** `BrandData` (full), `BrandFoundation` (with **provenance** per-element `provided|derived` — `03 §3.2`), `ProjectDesignSystem` (tokens + extensible components — `03 §4`), `Artifact`/`Section` (`03 §5`).
- **`store.ts` (new):** `readBrand/writeBrand`, `readPDS/writePDS`, generic atomic temp+rename writer, **append-only versioning** for hard stores, per-client lock / optimistic version precondition (`03 §8.1`, I5). Hard stores change **only** by deliberate events: Brand by approval, PDS by crystallization.
- **`brand.ts` (new):** `deriveBrand(brandData, brief) → BrandFoundation(draft)` (palette/type verbatim, personality/tone/motion **derived**, provenance set); **two checks before a human sees the draft:** (1) **brand-palette a11y pre-check** — a deterministic contrast check on the provided palette pairings, because a pale-on-white palette would doom every downstream a11y gate (F-BRD-04, High); block until accessible primary pairings exist; (2) **Phase-Exit Review** — a fresh-context Critic checks the *derived* strategy fits the business context + givens, returning an off-brief derivation for bounded re-derivation (`11 §2.3`, F-BRD-01). `approveBrand` (human) → status frozen, version++; `reDerive` on a changed given → new version (never hand-patch a derived leaf — `04 §2.1`).
- **`prompts.ts` +** derive-brand prompt + **crystallizer** prompt (`05 §6.3`) + **phase-exit-review prompts**: `buildBrandReviewPrompt` (does the derived personality/tone/motion fit the business context + givens? — F-BRD-01) and `buildCrystallizationReviewPrompt` (do the tokens capture the hero without over/under-specifying? — F-PDS-01), each returning a structured `{ verdict, issues[] }`.
- **`crystallizer.ts` (new):** after section-1 approval, extract `ProjectDesignSystem` (tokens as Tailwind theme + CSS vars; component recipes the hero used); **Phase-Exit Review of the extracted tokens** (fresh-context Critic vs brand + hero; bounded ≤1–2 correction on over/under-specification — `11 §2.3`, F-PDS-01) **before** freezing; then freeze foundation; lock hero components (`04 §3`). Only a reviewed foundation is frozen.
- **`critic.ts` +** `reviewArtifact(kind, artifact, context) → { verdict, issues[] }` — the same fresh-context judge (I2) applied to non-pixel artifacts (brand, PDS); drives the bounded review→fix→re-check in `brand.ts`/`crystallizer.ts`. Its per-boundary verdict and the eventual human verdict are both recorded for H8 calibration (Phase 3).
- **`guardrails.ts` +** full **token-allowlist** gate (off-system color/type/space/radius → hard fail) now that a system exists.
- **`orchestrator.ts` +** `assembleInputBundle` enforcing **conflict precedence** (`04 §7`: floor > brand > PDS > brief > library > refs, I1); inject frozen PDS as hard law + **screenshots of already-built sections** as CTX; section sequencing; whole-artifact QA pass (`06 §5`).
- **`cli.ts` +** `design brand`, `design section`, `design site` (`06 §7`).

### Workflow
`design brand --client burkes --context brief --brand-data burkes-brand.json` → derive → present → `--approve` freezes. Then `design section hero` (system open) → on approval **crystallize** → later `design section about` builds against frozen tokens + sees the hero. `design site` sequences all + QA.

### Error handling
Concurrent runs on one client guarded by lock/version precondition (F-STO-03). Re-derivation bumps version with provenance; reads snapshot-consistent. Crystallization is the only PDS writer.

### Testing strategy
- **H4 drift test:** generate hero→about→pricing; assert later sections use **only** crystallized tokens (zero off-token colors/type/space) **yet** differ in layout (variety kept).
- **Re-derivation:** change a given → `version` bumps, dependent derived fields recompute, provenance correct, no stale leaf.
- **Token-allowlist** catches an injected off-system hex.
- **Store integrity:** atomic write survives simulated crash; append-only versioning; lock prevents clobber (I5).
- **Crystallization fidelity** (`09` Q4): hero → a sane token foundation (spot-checked).
- **Phase-Exit Review (I13):** an injected off-brief brand draft and an injected over-specified PDS are each **caught by `reviewArtifact` and returned for bounded correction before the human gate**; the review is bounded (≤1–2 tries then escalate); both review verdict and human verdict are persisted for calibration.

### Completion criteria (gate to Phase 2)
H4 passes (zero token drift across sections with retained variety); brand re-derivation versions correctly; the same frozen brand reused for a second surface (H5 setup). **If H4 fails, fix crystallization/precedence before Phase 2.**

---

## PHASE 2 — Memory / Library (STRUCTURED)

**Spec:** `03 §2` · `04 §5,§6` · `11 §2.3` (phase-exit review) · `11` (de-identification gate, I7). **Proves:** H6 (Library-on beats Library-off) + H7 at scale.

- **Objective:** make project N+1 better than N via a soft, cross-project, de-identified Library with retrieval + write-back.
- **Architecture / key modules:** `library.ts` (vector store — **flat-file cosine first**, then `pgvector`); `retriever.ts` (`assembleBundle` calls it: embed the brief's **problem-space synthesis**, ANN, top-k **soft** entries — `04 §5`); `writeback.ts` (post-approval: **de-identification gate** → abstract instance→pattern → **Phase-Exit Review of abstraction altitude** (reuses `critic.ts` `reviewArtifact`; too-specific/too-vague → bounded re-abstraction — `11 §2.3`, F-WB-02) → dedup/merge or create, confidence-weighted — `04 §6`); `embeddings.ts` (provider for the embed model, with stored model-id + re-embed-on-change — F-MEM-03). `LibraryEntry` schema (`03 §2`) with strict **embed-vs-payload** split.
- **Dependencies / access-model collision (decide before starting):** Anthropic has **no first-party embeddings API**, and the Pro Agent-SDK credit does not cover third-party embeddings — so to stay key-free, **extend the `local` provider with a local embedding model** (e.g. a `nomic-embed`-class model via Ollama). A paid embeddings API (Voyage/OpenAI) is the prod-only alternative and would break the no-key dev stance. Optional Postgres+pgvector (else flat-file cosine).
- **Invariants:** I7 (Library written only from approved artifacts, through de-id gate); I8 (refs soft, ≤5, never scored for resemblance); graceful degradation if retrieval fails → proceed on brand+brief (`11 §4`).
- **Testing:** **de-id gate** blocks client name/tokens/copy (no identity leak); **abstraction-altitude Phase-Exit Review** returns a too-specific and a too-vague entry for re-abstraction before insert (I13, F-WB-02); retrieval relevance on seeded entries; **H6 A/B** — same briefs Library-on vs off, compare trace scores.
- **Completion:** H6 passes (Library-on measurably better/faster). Else curate/abandon Library.

---

## PHASE 3 — Taste / Judge (STRUCTURED)

**Spec:** `08` H3/H8 · `05 §4` · `09 §2` (ladder). **Proves:** H3, H8 trending.

- **Objective:** make the Critic's verdicts track human taste well enough to relax human gates.
- **Architecture / key modules:** `verdicts.ts` (capture human approve/reject/notes → durable store, fed to calibration); pairwise-ranking refinement in `critic.ts`; `calibration.ts` (track the **Critic-vs-human agreement gap per boundary** — section, brand, PDS, library each calibrate independently off their Phase-Exit-Review vs human verdicts — I12; tune threshold/weights; rotate rubric examples); wire **autonomy ladder rung 0→1** (`09 §2`) — a gate is relaxed only where *its own* boundary's agreement clears the bar.
- **Invariants:** I12 (reported quality is **human-anchored**, never Critic-only); watch divergence (rising Critic scores + flat human ratings = reward-hacking alarm, F-JDG-02).
- **Testing:** Critic↔human agreement trend over batches; pairwise beats absolute; threshold calibration reduces false pass/fail.
- **Completion:** H3/H8 trending up — agreement high enough to trust most "passes" at rung 1. (Taste is the acknowledged open bottleneck — `09 §5`; manage, don't claim solved.)

---

## PHASE 4 — Scale & Autonomy + Production (STRUCTURED)

**Spec:** `06 §1,§5,§6` · `09 §2,§3` · access-model decision. **Proves:** sustained quality at lower human touch.

- **Objective:** whole-artifact and cross-surface runs, climb the autonomy ladder, and harden for production users.
- **Architecture / key modules:** `design site`/whole-artifact assembly + cross-section QA (`06 §5`); **website→product reuse** (shared frozen Brand → new per-surface PDS — `06 §6`); autonomy-ladder rungs 2–4 (relax gates only per H8 evidence — `09 §2`); **production access switch** — set `ADE_PROVIDER=api` (pay-as-you-go API key) with **spend caps**, per-client concurrency at scale, and a **Next.js** harness for production parity (component unchanged); cost/latency budgeting from the trace (H7), prompt-prefix caching, optional cheaper-Generator + Opus-Critic split (`09 §3`).
- **Why the provider switch here:** the Pro Agent-SDK credit is for **personal/attended R&D** (Phases 0–3); serving real users requires the **API key** path (terms + scaling) — a config change thanks to `model.ts`.
- **Testing:** whole-site coherence; brand recognizable across website+product (H5); quality holds as human touch drops; cost/section within budget.
- **Completion:** a new brief yields a good, on-brand, consistent artifact at a high ladder rung with sustained quality (`09 §6`).

---

## Cross-cutting concerns

- **Access model (two-phase):** dev = `agent-sdk` (Pro credit, `claude login`, no `ANTHROPIC_API_KEY`); prod = `api`; `local` = Ollama fallback. All behind `model.ts`. Verify Agent-SDK vision support early (§Global); split Critic vision to `api`/`local` if needed.
- **Observability:** all H-metrics derive from `trace.jsonl` + `verdicts.jsonl` (score deltas/iteration, tokens/section, pass rates, Critic↔human gap). `ade report` and the blind verdict log are **firm Phase 0 deliverables** (0.15), not optional — H1 is unreadable without them.
- **Security / safety:** brief & content are **data, never instructions** (I9); de-identification gate guards the Library (I7, Phase 2); no secrets in traces.
- **Invariants as living contract:** Appendix B is part of CI from Phase 0; expand as stores/Library land.
- **Phase-Exit Review (`11 §2.3`):** built in Phases 1–2 as reused-Critic passes on brand/PDS/library, not a new component; it is a **pre-human filter**, never a human replacement, and the per-boundary review↔human agreement it produces is exactly the signal the autonomy ladder consumes in Phases 3–4.

## Verification (end-to-end, per phase)
1. **Phase 0:** `ade generate` on the Burkes hero (no ref) → terminal state + valid trace; `npm test` green incl. both injected-failure tests; manually confirm scores rise across `iterations/`.
2. **Phase 1:** `design brand` (derive→approve→freeze) then `design site` for 3 sections → assert zero token drift + retained variety (H4 test); re-derivation versions correctly.
3. **Phase 2:** seed Library; run same briefs Library-on/off → H6 delta; de-id gate test green.
4. **Phase 3:** batch runs + recorded human verdicts → Critic-human agreement trend.
5. **Phase 4:** whole-site run; flip `ADE_PROVIDER=api`; confirm parity + spend cap.

## Appendix A — env & commands
`.env`: `ADE_PROVIDER=agent-sdk` · `ADE_MODEL=claude-opus-4-8` · `ADE_MAX_RUN_TOKENS` · `ADE_MAX_RUN_SECONDS` · `ADE_MAX_MODEL_CALLS` · `ADE_GEN_TEMPERATURE=0.7` · `ADE_CRITIC_TEMPERATURE=0.2`. Commands: `npm run dev` (harness), `npm test`, `ade generate …` (P0), `ade report --out <dir>` (P0), `ade design brand|section|site|learn …` (P1+). Prereq for dev provider: `claude login` (Pro), claim the Agent-SDK credit, **do not set `ANTHROPIC_API_KEY`**; then run the **0.0 Agent-SDK spike** before building the loop.

## Appendix B — invariant → test map (`11 §7`)
I1 precedence (assembleInputBundle) · I2 critic fresh-context (no generator history in critic call) · I3 objective→Guardrail not Critic · I4 best-so-far never regresses · I5 hard stores atomic/versioned/deliberate-events (P1) · I6 trace persisted before next iteration · I7 Library via de-id gate (P2) · I8 refs soft/≤5/never resemblance-scored · I9 brief-as-data injection safety · I10 one terminal state per run · I11 render-valid precedes critique · I12 quality human-anchored (P3) · I13 no artifact becomes a downstream hard input without passing its Phase-Exit Gate — deterministic ∧ Critic review (P1 brand/PDS, P2 library). Each = one assertion in `tests/`.

## Out of scope / explicit non-goals
- No monorepo cross-imports; ADE stays standalone.
- No vector DB, Brand store, or Design System in Phase 0 (`07` scope) — hence **no Phase-Exit Reviews in Phase 0** (they arrive with the brand/PDS/library artifacts in Phases 1–2); the section Pass Gate is Phase 0's only gate.
- Phase 0 Generator emits **one self-contained `.tsx`**; multi-file `supporting/*` output (`03 §5`) is deferred to Phase 1.
- No mid-run resume in the MVP; `--refs` is an accepted **no-op** flag in Phase 0 (wired in Phase 2).
- Taste is framed as managed-not-solved; no claim the Critic is a reliable oracle (`09 §5`, `11 §8`).
