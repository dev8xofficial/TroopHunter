# R2 — Human-Feedback Channel: Implementation Plan (execution-altitude, step-by-step)

> **What this is.** A build plan for **R2, the high-bandwidth human-feedback channel** — the second Tier-0 enabler ([spec/14 §4](../spec/14-research-agenda.md)). It turns the R2 design spec ([spec/19](../spec/19-r2-human-channel-specification.md)) into numbered, self-contained tasks a small model can execute one at a time, in the same format as [R1's plan](./R1-benchmark-implementation-plan.md).
>
> **Why R2 now, and not R3/R4.** The agenda's rule: *"R2 (the human channel) precedes R4 (the reward model) — a reward model trained on approve/reject/notes captured through a CLI is built on sand"* ([spec/14 §4](../spec/14-research-agenda.md)). R2 also depends on **R1 being `DONE`**, because R2's own validation experiment (§4 below) is measured using R1's Critic↔human correlation tooling.
>
> **Gate check — do this before task R2.0:** open [`plans/EXECUTION-TRACKER.md`](./EXECUTION-TRACKER.md). If R1's row is not `DONE`, **stop** — finish R1 first. Do not begin R2 against a Golden Core / correlation tool that doesn't exist yet.

---

## 0. Rules for the implementer (READ FIRST)

Same rules as [R1 §0](./R1-benchmark-implementation-plan.md#0-rules-for-the-implementer-read-first-do-not-skip), repeated because they matter every time:

1. Do tasks **in order**; one task = one commit; don't jump ahead.
2. The `DONE WHEN:` line is the only definition of done.
3. Never invent behaviour — if something's ambiguous, write it to `plans/R2-OPEN-QUESTIONS.md` and stop.
4. **Never set `ANTHROPIC_API_KEY`.** All model calls go through `src/model.ts` (`ADE_PROVIDER=agent-sdk`).
5. **Extend, don't rewrite.** This plan touches `schema.ts`, `cli.ts`, and `eyes.ts` — add to them, don't restructure what's already there.
6. TypeScript strict, ESM, `.js` import extensions, vitest for pure-logic tests — match existing `src/` style.
7. **No new npm dependency for the review server.** Use Node's built-in `node:http` (the repo's dependency list has no Express/Fastify, and none is needed for a single local reviewer tool — see R2.3). If you find yourself reaching for a framework, stop and write it to `R2-OPEN-QUESTIONS.md` first.
8. **Two "rationale" concepts exist in this codebase — do not conflate them:** `writeback.ts`/`library.ts` already have a *Library-entry* rationale (why a distilled *pattern* is stored, `LibraryOutcomeSchema` machinery). R2's rationale (below) is a *per-candidate design-decision* sidecar shown to a human reviewer — unrelated, new, and never written to the Library.

---

## 1. What you are building (the acceptance test)

R2 replaces "CLI approve/reject/notes" with a **richer, purpose-built local review tool**, and then **proves the richer data is actually worth the overhead** — it is not built on faith.

When R2 is finished, this must be true:

> 1. `ade review enqueue --out <run-dir>` queues a run's candidates for review.
> 2. `ade review serve` starts a local web UI (`http://localhost:4500`) where a reviewer sees a **pairwise comparison** (not a single design), scores the winner on **4 constitution-dimension sliders**, can **click on the screenshot to drop spatially-anchored notes**, can **paste a teach-by-example snippet**, and sees the **candidate's design rationale** (and can flag it as hallucinated/illogical) — every interaction serialized to `verdicts.jsonl` in the exact schema `spec/19 §3.1` describes.
> 3. `ade review experiment report` prints the **R2 validation result**: Critic↔human agreement gain per human-minute, thin-CLI condition vs. rich-UI condition, and a PASS/FAIL against the bet's own success criterion (`spec/19 §4.2`).

If step 3 fails (rich UI's extra time isn't worth the signal gain), **that is a valid, useful R2 result** — log it and do not proceed to build R4 on this channel without revisiting (spec/14 §6: "kill cheaply... a failed bet is a result, not a loss").

---

## 2. Architecture at a glance

### 2.0 Flow (UML — data flow)

```mermaid
flowchart TB
    subgraph GEN["existing loop (unchanged)"]
        LOOP["orchestrator.ts runLoop()"] --> BEST["best-so-far candidate<br/>ready for human review"]
    end

    subgraph RAT["R2.1/R2.2 — rationale (NEW)"]
        BEST --> RGEN["rationale.ts: generateRationale()<br/>ONE extra call, same Generator context<br/>(not the Critic — I2 doesn't apply here)"]
        RGEN --> RMD[("rationale.md sidecar<br/>next to final/Section.tsx")]
    end

    subgraph QUEUE["R2.5 — queueing (NEW)"]
        RMD --> ENQ["ade review enqueue<br/>pairs two candidates<br/>(e.g. iter0 vs final, or run vs run)"]
        ENQ --> QITEM[("review-queue/&lt;id&gt;.json"<br/>{candidateA, candidateB, rationaleA, rationaleB})]
    end

    subgraph UI["R2.3/R2.4 — the rich channel (NEW)"]
        QITEM --> SERVE["ade review serve<br/>node:http, localhost:4500"]
        SERVE --> BROWSER["reviewer's browser:<br/>pairwise choice + 4 sliders +<br/>click-to-pin annotations + teach-by-example +<br/>rationale flag"]
        BROWSER -->|click on screenshot| DOMR["domResolve.ts:<br/>reopen candidate in Playwright,<br/>elementFromPoint(x,y) -> CSS selector"]
        DOMR --> BROWSER
        BROWSER -->|POST /verdict| APPEND["verdicts.ts: appendVerdict()<br/>(schema extended, R2.1)"]
        APPEND --> VJSONL[("verdicts.jsonl"<br/>richer entries, backward-compatible)]
    end

    subgraph EXP["R2.7-R2.9 — the validation experiment (NEW)"]
        VJSONL --> CONDB["Condition B data<br/>(rich UI)"]
        OLDCLI["existing 'ade verdict' CLI<br/>(unchanged, Phase 0)"] --> CONDA["Condition A data<br/>(thin CLI)"]
        CONDA --> TUNE_A["human tunes critic.ts prompt<br/>using ONLY Condition A patterns"]
        CONDB --> TUNE_B["human tunes critic.ts prompt<br/>using ONLY Condition B patterns"]
        TUNE_A --> BENCH["R1's criticHumanCorrelation()<br/>(plans/R1, task R1.7)"]
        TUNE_B --> BENCH
        BENCH --> RESULT["ade review experiment report:<br/>agreement-gain per human-minute,<br/>B vs A -> PASS/FAIL vs spec/19 §4.2"]
    end
```

**Firewall reminder:** nothing in `review-queue/` or `verdicts.jsonl` is ever written to the Golden Core (`golden-core/`) or the Library — R2 produces *training ore for R4*, not eval ground truth. Keep the two firewalls from R1 (§0 rules 7–8 there) in mind; they still apply.

### 2.1 New files

| File | Purpose | Task |
|---|---|---|
| `src/rationale.ts` | Generate the design-rationale sidecar for a candidate | R2.2 |
| `src/reviewQueue.ts` | Build/read/consume review-queue items | R2.5 |
| `src/domResolve.ts` | Map a screenshot (x,y) click back to a DOM node / CSS selector | R2.6 |
| `src/reviewServer.ts` | `node:http` server: static UI + JSON API + verdict capture | R2.3 |
| `review-ui/index.html`, `review-ui/app.js`, `review-ui/style.css` | The browser-side UI (plain HTML/JS, no build step — mirrors `harness/` being a separate static concern) | R2.3 |
| `src/reviewCli.ts` | `ade review …` subcommand dispatch | R2.4 |
| `src/r2Experiment.ts` | Condition bookkeeping + the decisive-metric calculation | R2.7–R2.9 |
| `tests/rationale.test.ts`, `tests/reviewQueue.test.ts`, `tests/domResolve.test.ts`, `tests/r2Experiment.test.ts` | Unit tests | matching tasks |
| `plans/R2-OPEN-QUESTIONS.md` | Blockers log | R2.0 |

### 2.2 Schema changes (added to `src/schema.ts`, all backward-compatible additions)

New schemas: `RationaleArtifact`, `DimensionSliderScores`, `SpatialAnnotation`, `PairwiseChoice`, `TeachByExampleSnippet`. **Extended** (not replaced): `VerdictEntrySchema` gains optional fields; `'r2-pairwise'` is added to the existing `source` enum. Exact shapes in R2.1.

---

## 3. Task list (dependency-ordered)

| # | Task | Depends on | Kind |
|---|---|---|---|
| R2.0 | Gate check + audit | R1 `DONE` | reconcile |
| R2.1 | Schema additions (rationale, sliders, annotations, extended VerdictEntry) | R2.0 | schema |
| R2.2 | `rationale.ts` — generate + write the rationale sidecar | R2.1 | code+test |
| R2.3 | `reviewServer.ts` + `review-ui/*` — the local web UI | R2.1 | code |
| R2.4 | `reviewCli.ts` — wire `ade review serve` | R2.3 | wiring |
| R2.5 | `reviewQueue.ts` — `ade review enqueue` | R2.1, R2.2 | code+test |
| R2.6 | `domResolve.ts` — click → DOM node mapping | R2.3 | code+test |
| R2.7 | Verdict capture end-to-end (server → `verdicts.jsonl`) | R2.3, R2.5, R2.6 | integration |
| R2.8 | The A/B experiment protocol (Condition A vs B bookkeeping) | R2.7 | code+process |
| R2.9 | `r2Experiment.ts` — the decisive metric + `ade review experiment report` | R2.8, R1 (`criticHumanCorrelation`) | code+test |
| R2.10 | Contamination/firewall tests | R2.7 | test |
| R2.11 | Wire everything into the CLI + docs | all above | wiring |

You can stop at **R2.9** and have the full acceptance test from §1 satisfied.

---

## 4. The tasks

### R2.0 — Gate check + audit

**Goal:** Confirm R1 is actually done (not just "plan written") before building on its correlation tooling.

**Steps:**
1. Open `plans/EXECUTION-TRACKER.md`. Confirm R1's row is `DONE`. If not, stop — report back, do not proceed.
2. Confirm `src/benchmark.ts`'s `criticHumanCorrelation` and `src/goldenCore.ts` exist and `npx tsc --noEmit` is clean (same audit discipline as R1.0).
3. Create `plans/R2-OPEN-QUESTIONS.md` with heading `# R2 — Open Questions & Blockers`.

**DONE WHEN:** `npx tsc --noEmit && npm test` → clean, **and** `EXECUTION-TRACKER.md` shows R1 as `DONE`.

---

### R2.1 — Schema additions

**Goal:** Every new R2 data shape in `src/schema.ts`, plus a **backward-compatible** extension of `VerdictEntrySchema` — old readers (`calibration.ts`, `report.ts`) must keep working unmodified on old *and* new entries.

**Read first:** `src/schema.ts` lines 409–427 (`VerdictEntrySchema`, exactly as it stands today), spec/19 §1.1, §2.2–2.4, §3.1.

**Steps:** append to `src/schema.ts`:

```ts
// ─── R2 Human-Feedback Channel (spec/19) ───────────────────────────

export const RationaleArtifactSchema = z.object({
  candidate_id: z.string(),
  core_tradeoff: z.string().min(1),      // "I chose X over Y because..."
  discarded_option: z.string().min(1),   // "I considered X but rejected it because..."
  generated_at: z.string(),              // ISO 8601
});
export type RationaleArtifact = z.infer<typeof RationaleArtifactSchema>;

export const DimensionSliderScoresSchema = z.object({
  hierarchy: z.number().int().min(1).max(5),   // Hierarchy & Intent
  craft: z.number().int().min(1).max(5),       // Craft & Execution
  brand: z.number().int().min(1).max(5),       // Brand Adherence
  novelty: z.number().int().min(1).max(5),     // Novelty / Differentiation
});
export type DimensionSliderScores = z.infer<typeof DimensionSliderScoresSchema>;

export const SpatialAnnotationSchema = z.object({
  x: z.number().min(0).max(1),      // normalized 0..1 within the screenshot (see R2.6 Appendix A)
  y: z.number().min(0).max(1),
  note: z.string().min(1),
  dom_node: z.string().optional(),  // CSS selector, filled by domResolve.ts; optional if resolution failed
});
export type SpatialAnnotation = z.infer<typeof SpatialAnnotationSchema>;

export const PairwiseChoiceSchema = z.enum([
  'A_strongly_better',
  'A_slightly_better',
  'tie',
  'B_slightly_better',
  'B_strongly_better',
]);
export type PairwiseChoice = z.infer<typeof PairwiseChoiceSchema>;

export const TeachByExampleSnippetSchema = z.object({
  component_hint: z.string().min(1),   // what this snippet is an example FOR, e.g. "data table"
  snippet: z.string().min(1),          // pasted HTML/Tailwind
});
export type TeachByExampleSnippet = z.infer<typeof TeachByExampleSnippetSchema>;

// Extend VerdictEntrySchema (backward-compatible — every new field is optional,
// every existing field/value is untouched, calibration.ts/report.ts keep working).
export const VerdictEntrySchema = z.object({
  run_id: z.string(),
  section: z.string(),
  preferred: z.enum(['iter0', 'final']),
  rating: z.enum(['bad', 'weak', 'good', 'strong']),
  human_verdict: z.enum(['approve', 'reject']).optional(),
  candidate_id: z.string().optional(),
  critic_score: z.number().min(0).max(100).optional(),
  critic_verdict: z.enum(['pass', 'fail']).optional(),
  threshold: z.number().min(0).max(100).optional(),
  reviewer: z.string().optional(),
  source: z.enum(['blind-pair', 'approval', 'calibration', 'r2-pairwise']).optional(), // 'r2-pairwise' is NEW
  notes: z.string().optional(),
  timestamp: z.string(),
  // ── R2 additions (all optional; absent on every pre-R2 entry) ──
  pairwise_choice: PairwiseChoiceSchema.optional(),
  candidate_a_ref: z.string().optional(),          // path/hash of candidate A
  candidate_b_ref: z.string().optional(),           // path/hash of candidate B
  dimensions: DimensionSliderScoresSchema.optional(),
  spatial_annotations: z.array(SpatialAnnotationSchema).optional(),
  teach_by_example: TeachByExampleSnippetSchema.optional(),
  rationale_feedback: z.string().optional(),         // human note on the rationale itself
  rationale_flagged_hallucinated: z.boolean().optional(),
  review_duration_ms: z.number().int().min(0).optional(),  // for the R2 decisive metric (§4.2)
  experiment_condition: z.enum(['A_thin_cli', 'B_rich_ui']).optional(), // R2.8
});
export type VerdictEntry = z.infer<typeof VerdictEntrySchema>;
```

**Also update** `SCHEMA_REGISTRY` in `schema.ts` to add `rationaleArtifact: RationaleArtifactSchema`.

**Test (`tests/rationale.test.ts`, minimal for now):** construct a valid `RationaleArtifact` and assert `RationaleArtifactSchema.safeParse(x).success === true`.

**Regression check (critical for backward-compat):** write a test in `tests/schema.test.ts` (existing file) that takes a **pre-R2** verdict object (no new fields, exactly the old shape) and asserts it still validates against the new `VerdictEntrySchema`.

**DONE WHEN:** `npx tsc --noEmit && npx vitest run tests/schema.test.ts` → the old-shape backward-compat case passes alongside all pre-existing schema tests.

---

### R2.2 — `rationale.ts`

**Goal:** Produce the `rationale.md` sidecar spec/19 §1.1 describes, for a candidate about to be shown to a human (final best-so-far at a section's Pass Gate, or at a Phase-Exit Review boundary) — **not** every iteration.

**Read first:** `src/generator.ts` (`generate(bundle, feedback?)` signature and how it calls the provider), `src/model.ts` (`ModelProvider.complete()`), spec/19 §1.1.

**Why not every iteration:** cost (F-MOD-04) — rationale is a *human-review* artifact, only needed once a candidate is actually surfaced. Generating it every iteration would ~double Generator-role spend for no benefit until a human looks.

**Steps — implement in `src/rationale.ts`:**
```ts
/** Ask the model that produced `tsx` to explain its own choices — NOT the Critic (I2 doesn't
 *  apply; this is the Generator explaining itself, not grading). One extra completion call,
 *  called only when a candidate is about to be surfaced to a human. */
export async function generateRationale(
  candidateId: string,
  tsx: string,
  bundle: InputBundle,
  cfg: Config,
): Promise<RationaleArtifact>;

/** Write rationale.md next to the candidate's Section.tsx (same directory), human-readable
 *  markdown built from the RationaleArtifact — mirrors the two required fields verbatim
 *  (spec/19 §1.1): "The Core Trade-off" and "The Discarded Option". */
export function writeRationaleSidecar(candidateDir: string, artifact: RationaleArtifact): void;
```
- `generateRationale` builds a short prompt: "You wrote this component for this brief. In 1–2 sentences each, state (a) the core trade-off you made and why, (b) one option you considered and rejected and why. Respond in the `rationaleArtifact` JSON shape." Validate the response via `validate('rationaleArtifact', json)` (Schema Gate, same pattern as `critic.ts`); on failure, one re-ask, then a safe default (`core_tradeoff: "not available", discarded_option: "not available"`) — **never block the human review on this failing** (rationale is an aid, not a gate).
- `writeRationaleSidecar` writes plain markdown: `## Core Trade-off\n\n<text>\n\n## Discarded Option\n\n<text>\n`.
- Call this from `orchestrator.ts` at exactly one point: right after a section reaches `APPROVED` or `ESCALATED` (i.e., once, on the final best-so-far), before it's handed to a human gate. Do **not** call it inside the iteration loop.

**Test (`tests/rationale.test.ts`):** mock provider returns a canned rationale JSON → `generateRationale` returns a validated `RationaleArtifact`; a malformed mock response → falls back to the safe default without throwing; `writeRationaleSidecar` writes a file containing both required headings (string-search assertion).

**DONE WHEN:** `npx vitest run tests/rationale.test.ts` → all 3 cases pass.

---

### R2.3 — `reviewServer.ts` + `review-ui/*` (the local web UI)

**Goal:** A minimal `node:http` server serving a static reviewer UI and a small JSON API, satisfying spec/19 §2.1–2.4 in one page. No framework, no build step (rule 7 in §0).

**Read first:** `harness/vite.config.ts` (how the existing harness picks a port and serves static content — for the *pattern*, not to reuse Vite itself), spec/19 §2.

**Steps:**
1. `src/reviewServer.ts` exports `startReviewServer(cfg: { port: number; queueDir: string; verdictsOut: string }): http.Server`:
   - `GET /` → serves `review-ui/index.html`.
   - `GET /app.js`, `GET /style.css` → serve the static files.
   - `GET /api/queue` → reads all pending items from `queueDir` (via `reviewQueue.ts`, R2.5) as JSON.
   - `GET /api/shot?candidate=<ref>&breakpoint=<bp>` → streams the PNG for a given candidate/breakpoint.
   - `POST /api/resolve-dom` → body `{candidate, breakpoint, x, y}` → calls `domResolve.ts` (R2.6), returns `{dom_node}`.
   - `POST /api/verdict` → body validated against the **extended** `VerdictEntrySchema` (R2.1) → calls `appendVerdict` (existing `verdicts.ts`, unchanged) → 200 on success, 400 with the zod error message on failure (fail-closed, never silently drop a malformed submission).
2. `review-ui/index.html` + `style.css` + `app.js` (plain JS, `fetch`-based):
   - On load: `GET /api/queue`, render the first pending pair — screenshot A | screenshot B side by side (default breakpoint 1440, with breakpoint tabs 1440/768/375), the pairwise choice radio group (5 options, spec §2.1), the 4 dimension sliders (1–5, spec §2.2) **for whichever candidate is chosen**, a "click to annotate" mode toggle on each screenshot `<img>` (click handler computes normalized `x,y` — see R2.6 Appendix A — prompts for a note, POSTs to `/api/resolve-dom`, then renders a numbered pin), a teach-by-example textarea (optional), the rationale text for both candidates with a "flag as hallucinated/illogical" checkbox each (spec §1.2), and a **client-side timer** started on page load / item load, stopped on submit → sent as `review_duration_ms`.
   - Submit → assembles the full extended `VerdictEntry` object client-side and `POST /api/verdict`; on success, load the next queue item; on 400, show the validation error inline (do not lose the reviewer's input).
3. Keep the UI deliberately plain (no CSS framework) — it is a private local tool for one reviewer, not a product surface; don't over-invest here relative to the rest of ADE's budget discipline.

**DONE WHEN:** `node --loader tsx src/reviewServer.ts` (or via the CLI once R2.4 wires it) starts on the configured port, `GET /` returns the page, and a manual browser check confirms: pairwise choice, 4 sliders, at least one click-to-annotate round trip (a pin appears with resolved `dom_node`), and a submitted verdict appears as a new line in `verdicts.jsonl` matching the extended schema.

---

### R2.4 — `reviewCli.ts` (wire `ade review serve`)

**Goal:** `ade review serve [--port 4500] [--queue <dir>] [--out <verdicts-dir>]` starts the server; no logic beyond flag parsing → `startReviewServer`.

**Read first:** `src/cli.ts` (the `verdict` command block, lines ~168–226, for the existing flag-parsing style).

**Steps:** add a `review` command group in `src/reviewCli.ts`, registered from `src/cli.ts`, with subcommand `serve` calling R2.3's `startReviewServer`. Print the URL on start (`Review UI: http://localhost:4500`).

**DONE WHEN:** `npm run ade -- review serve --port 4500` prints the URL and the server responds to `GET /`.

---

### R2.5 — `reviewQueue.ts` (`ade review enqueue`)

**Goal:** Turn a finished run (or a pair of runs) into a review-queue item the server can serve.

**Read first:** `src/trace.ts` (`readTrace`), `src/verdicts.ts` (existing iter0-vs-final blind-pair concept — R2's pairwise queue generalizes this), R2.2 (rationale sidecar location).

**Steps — implement in `src/reviewQueue.ts`:**
```ts
export interface ReviewQueueItem {
  id: string;
  candidate_a: { ref: string; shots_dir: string; rationale?: RationaleArtifact };
  candidate_b: { ref: string; shots_dir: string; rationale?: RationaleArtifact };
  created_at: string;
}

/** Build one queue item comparing iteration-0 vs the final best-so-far of a run
 *  (the common case — mirrors verdicts.ts's existing iter0-vs-final pairing, but
 *  through the rich channel instead of the CLI). */
export function enqueueIter0VsFinal(runDir: string, queueDir: string): ReviewQueueItem;

/** Build one queue item comparing the finals of TWO arbitrary runs (e.g. for the
 *  R2 experiment's Condition A/B briefs, or A/B-testing two prompt versions). */
export function enqueueTwoRuns(runDirA: string, runDirB: string, queueDir: string): ReviewQueueItem;

/** Read all pending (not yet reviewed) items from queueDir, oldest first. */
export function readQueue(queueDir: string): ReviewQueueItem[];

/** Mark an item consumed (move to queueDir/done/ or delete — pick one and be consistent;
 *  recommend move-to-done/ so there's an audit trail). */
export function markReviewed(queueDir: string, itemId: string): void;
```

**Test (`tests/reviewQueue.test.ts`):** build a fixture run dir with `iterations/iter-0/` and `final/`, call `enqueueIter0VsFinal`, assert the returned item's paths exist and `readQueue` returns it; call `markReviewed` and assert `readQueue` no longer returns it.

**DONE WHEN:** `npx vitest run tests/reviewQueue.test.ts` → all cases pass, **and** `npm run ade -- review enqueue --out runs/<some-run>` (wired in R2.11) produces a file under `review-queue/`.

---

### R2.6 — `domResolve.ts` (click → DOM node)

**Goal:** Given a candidate + breakpoint + normalized (x,y), return a CSS selector for the DOM node at that point — spec/19 §2.3's "maps the (x,y) coordinate back to the underlying DOM node."

**Read first:** `src/eyes.ts` (how a candidate is opened in Playwright — reuse the same harness-open logic, don't reimplement it), Appendix A below (coordinate normalization).

**Steps:** implement in `src/domResolve.ts`:
```ts
/** Re-open the given candidate at the given breakpoint (reusing eyes.ts's render/open
 *  logic — do NOT re-screenshot, just re-render for querying), convert normalized (x,y)
 *  to pixel coordinates for that viewport, and return a best-effort CSS selector for
 *  document.elementFromPoint(px, py) — e.g. "main > section > button.cta". */
export async function resolveDomNodeAtPoint(
  candidateTsxPath: string,
  breakpoint: 1440 | 768 | 375,
  normalizedX: number,
  normalizedY: number,
): Promise<string | null>;  // null if resolution fails — never throws into the request handler
```
- Compute the CSS-selector string via `page.evaluate` running a small in-page function (id if present, else tag + nth-of-type chain up to a bounded depth — e.g. 4 ancestors).
- Wrap the whole thing in try/catch → return `null` on any failure (F-MOD-01-style resilience; a failed DOM lookup must never break the annotation flow — `dom_node` is `.optional()` in the schema for exactly this reason).

**Test (`tests/domResolve.test.ts`):** against a tiny fixture `.tsx` with a known button at a known position, assert the resolved selector matches (e.g. `button.cta`); an out-of-bounds (x,y) → returns `null`, not a throw.

**DONE WHEN:** `npx vitest run tests/domResolve.test.ts` → both cases pass.

---

### R2.7 — Verdict capture end-to-end

**Goal:** Prove the whole chain works together: enqueue → serve → a real submission → a valid, extended `verdicts.jsonl` line.

**Steps:** an integration test (`tests/reviewServer.test.ts`) that: starts the server on an ephemeral port against a fixture queue dir, `POST`s a fully-formed verdict payload (pairwise choice + dimensions + one spatial annotation + rationale flag) to `/api/verdict`, then reads `verdicts.jsonl` and asserts the appended line round-trips through `VerdictEntrySchema` with every R2 field populated. Also `POST` a deliberately invalid payload (e.g. `hierarchy: 7`, out of the 1–5 range) and assert a `400` with no line appended (fail-closed, mirrors the Schema Gate discipline elsewhere in the codebase).

**DONE WHEN:** `npx vitest run tests/reviewServer.test.ts` → both the valid round-trip and the invalid-rejection cases pass.

---

### R2.8 — The A/B experiment protocol

**Goal:** Set up the actual two-arm study spec/19 §4.1 describes. This task is **part code, part human-executed process** — be explicit about which is which.

**Read first:** spec/19 §4, R1's Appendix A (Spearman) — the experiment reuses R1's correlation runner, it does not reinvent one.

**Steps:**
1. **Code:** add `experiment_condition` tagging (already in the R2.1 schema) — when enqueuing/serving, the CLI accepts `--condition A_thin_cli|B_rich_ui` so every verdict produced in a session is tagged. For Condition A, reviewers keep using the **existing, unmodified** `ade verdict` CLI (`src/cli.ts`'s `verdict` command) — tag those entries after the fact with `experiment_condition: 'A_thin_cli'` via a small one-off tagging script, since the old CLI doesn't know about conditions.
2. **Process (human-executed, document this in `plans/R2-USAGE.md`, written in R2.11):**
   - Pick **10 briefs** (reuse `briefs/*.json`, excluding anything in `golden-core/` — the firewall still applies).
   - **Condition A:** review all 10 using only `ade verdict` (thin CLI). Record wall-clock time per review manually (or via `time` around each invocation) — this is Condition A's "human-minutes."
   - **Condition B:** review the *same* 10 briefs' outputs using `ade review serve` (rich UI). The UI's `review_duration_ms` is captured automatically — no manual timing needed.
   - **Tune the Critic prompt twice, independently:** once using only patterns observed in Condition A's notes, once using only patterns from Condition B's dimension/spatial/rationale data — two separate `critic.ts` prompt variants, each saved (e.g. `prompts/critic-tuned-A.md`, `prompts/critic-tuned-B.md`) so the comparison is reproducible.
3. This task's own `DONE WHEN` is procedural, not a test: confirm 10 Condition-A entries and 10 Condition-B entries exist in `verdicts.jsonl`, correctly tagged, before moving to R2.9.

**DONE WHEN:** `verdicts.jsonl` contains ≥10 entries with `experiment_condition: 'A_thin_cli'` and ≥10 with `'B_rich_ui'` (query with a one-line filter script), and both tuned-prompt files exist on disk.

---

### R2.9 — `r2Experiment.ts` (the decisive metric)

**Goal:** Compute spec/19 §4.2's metric — **Critic↔human agreement gain per human-minute**, Condition B vs A — and print PASS/FAIL against R2's own success criterion.

**Read first:** `src/benchmark.ts`'s `criticHumanCorrelation` (R1.7 — this task calls it, does not duplicate it).

**Steps:** implement in `src/r2Experiment.ts`:
```ts
export interface R2ExperimentResult {
  condition_a: { mean_spearman: number; total_human_minutes: number; gain_per_minute: number };
  condition_b: { mean_spearman: number; total_human_minutes: number; gain_per_minute: number };
  verdict: 'B_justifies_overhead' | 'A_sufficient' | 'inconclusive';
}

/** Run R1's criticHumanCorrelation() twice against the Golden Core — once with the
 *  critic prompt tuned from Condition A data loaded, once with Condition B's — and
 *  divide each mean_spearman by the total human-minutes spent producing that condition's
 *  tuning data (summed from verdicts.jsonl's review_duration_ms / manual A timings). */
export async function runR2Experiment(cfg: Config): Promise<R2ExperimentResult>;
```
- `gain_per_minute = mean_spearman / total_human_minutes` for each condition (a simple, documented ratio — swap for a more sophisticated normalization only if you have a concrete reason, logged in `R2-OPEN-QUESTIONS.md`).
- **Verdict rule** (spec/19 §4.2's "3x time for 5% gain fails" example, made concrete): `'B_justifies_overhead'` if `condition_b.gain_per_minute > condition_a.gain_per_minute` **and** `condition_b.mean_spearman - condition_a.mean_spearman >= 0.05` (a real, non-trivial absolute correlation gain, not just a per-minute artifact of B being slower); `'A_sufficient'` if B's gain_per_minute is not better; `'inconclusive'` if the two mean_spearman values are within noise (`< 0.02` apart) — don't force a verdict out of noise.
- `ade review experiment report` (wired in R2.11) prints the full table + verdict.

**Test (`tests/r2Experiment.test.ts`):** with mocked correlation results (not live model calls — same mock-provider pattern as R1.7's test), assert the three verdict branches each fire on the numbers designed to trigger them.

**DONE WHEN:** `npx vitest run tests/r2Experiment.test.ts` → all 3 verdict-branch cases pass, and (once R2.8's real data exists) `npm run ade -- review experiment report` prints a real result with an explicit verdict.

---

### R2.10 — Contamination/firewall tests

**Goal:** R2 introduces new write paths (`review-queue/`, `verdicts.jsonl` growth) — confirm neither can leak into the Golden Core or the Library.

**Steps — add to `tests/reviewQueue.test.ts` or a new `tests/r2Firewalls.test.ts`:**
1. `enqueueTwoRuns`/`enqueueIter0VsFinal` called with a path under `golden-core/` → throws (reuse `assertNotGoldenCorePath` from `src/goldenCore.ts`, R1.2 — import it, don't reimplement).
2. Nothing in `src/reviewServer.ts` or `src/reviewQueue.ts` imports `src/library.ts` or `src/writeback.ts` (a static import-graph check, or simply: confirm by code review and note it in the test file's header comment that this is enforced by *absence* of the import, not a runtime guard — R2 data is Reward-Model ore, not Library material).

**DONE WHEN:** the new firewall test passes.

---

### R2.11 — Wire everything into the CLI + docs

**Goal:** Full `ade review` command surface + a runbook.

**Steps:**
1. Finish `src/reviewCli.ts`: `enqueue --out <dir> [--pair-with <dir>] [--condition A_thin_cli|B_rich_ui]`, `serve [--port] [--queue] [--out]`, `experiment report`, `experiment tag --condition <c> --verdicts <path>` (the one-off Condition-A tagging helper from R2.8).
2. Register in `src/cli.ts`.
3. Write `plans/R2-USAGE.md`: the full runbook — generate a run → `enqueue` → `serve` → review → repeat for 10 briefs × 2 conditions (R2.8's process) → `experiment report`.
4. Update the "Implementation Status" footer in `spec/19` (same pattern as `spec/18`) and `plans/EXECUTION-TRACKER.md`.

**DONE WHEN:** `npm run ade -- review --help` lists `enqueue`, `serve`, `experiment report`, `experiment tag`; the full runbook in `R2-USAGE.md` completes without error against at least one real run.

---

## 5. Final R2 acceptance checklist

- [ ] `npx tsc --noEmit` clean; all new test files green; the backward-compat schema test passes.
- [ ] `ade review enqueue` → `ade review serve` → a real browser submission → a valid extended line in `verdicts.jsonl`, including a resolved `dom_node` from at least one annotation.
- [ ] Rationale sidecars are generated once per section (not per iteration) and shown in the UI, with a working "flag as hallucinated" control.
- [ ] The A/B experiment (R2.8) has ≥10 tagged entries per condition; `ade review experiment report` prints a real, non-mocked PASS/FAIL/inconclusive verdict.
- [ ] The two firewall tests (R2.10) pass.
- [ ] `plans/R2-USAGE.md` exists and its runbook works end-to-end.
- [ ] `spec/19`'s Implementation Status footer and `EXECUTION-TRACKER.md` both reflect the real, observed R2 result (mean_spearman gap, gain-per-minute, verdict) — never a predicted one.

**If R2's result is `'A_sufficient'` or `'inconclusive'`:** do not proceed to build R4 assuming a rich channel — that assumption just failed a real test. Revisit R4's design, or spend more review volume before deciding (spec/14 §6: kill cheaply, but don't declare victory on noise either). **If R2's result is `'B_justifies_overhead'`:** R4 (Tier 1, depends on R1+R2) is next in dependency order — but check the tracker; R3 (constitution-grounding) is also Tier 1 and only depends on R1, so it can be planned in parallel with R4 once R2 lands.

---

## Appendix A — normalized click coordinates

The browser reports a click as pixel `(clientX, clientY)` within the displayed `<img>` element. Normalize before sending to the server (so the same annotation is meaningful across the 1440/768/375 breakpoint tabs):

```
normalizedX = clientX_within_image / renderedImageWidth    // both in [0, 1]
normalizedY = clientY_within_image / renderedImageHeight
```

Server-side (`domResolve.ts`), convert back to the *actual* viewport pixels for the requested breakpoint before calling `elementFromPoint`:

```
pixelX = normalizedX * breakpointViewportWidth   // e.g. 1440
pixelY = normalizedY * breakpointViewportHeight   // use the harness's known capture height for that breakpoint
```

This round-trip (normalize on submit, denormalize on resolve) is why `SpatialAnnotationSchema.x/y` are stored as `0..1` floats rather than raw pixels — an annotation stays meaningful even if screenshots are re-captured at a different resolution later.

## Appendix B — what R2 does NOT include (explicit non-goals)

- **No automated prompt-tuning.** "Tune the Critic prompt from Condition X's data" (R2.8) is a **human/dev** action in this plan — an automated grounding mechanism is R3's job (constitution-grounding), not R2's.
- **No reward-model training.** R2 produces the ore; R4 mines it. Do not attempt to train anything here.
- **No multi-reviewer / auth / hosting.** This is a single local reviewer's tool (`localhost`), matching ADE's solo-developer scale — no login, no remote deployment. If a second rater is needed (R1 already needs this for IRR), point them at the same local server on the same machine, or extend later; don't over-build now.
