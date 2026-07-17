# 07 — MVP: the CLI closed loop on one section

> **The first thing to build.** A CLI that runs the closed loop (`05`) on a **single section**, from a brief, with **no** Library and **no** Brand/Design-System stores yet. Its only job: prove the **Eyes** capability — that an agent which sees its own render can improve a section against a brief with no reference to clone (**hypothesis H1**, `08`).
>
> This document is written to the **buildability bar**: an engineer should be able to implement it from this page alone, without further design decisions.

---

## 1. Scope

**In:** brief → generate → render → screenshot → critique → edit → repeat → output a finished section + a trace. One section. CLI-driven. Local.

**Out (deferred to later phases):** Library / vector DB / retrieval, Brand Foundation, Project Design System, crystallization, multi-section consistency, write-back, references (optional flag only), whole-site assembly. (These are specced in `02`–`06` but **not** built here.)

```
  MVP = the dashed box only
  ┌─────────────────────────────────────────────────────────────┐
  │  brief ──► [ generate → render → screenshot → critique ]──►  │  ← loop
  │                         ▲___________edit____________│         │
  │  ──► best section (React/TS .tsx + screenshots + trace.jsonl)    │
  └─────────────────────────────────────────────────────────────┘
   (no library · no brand store · no crystallization · no write-back)
```

### 1.1 Output is React + TypeScript (your stack), not raw HTML

The Generator outputs a **React + TypeScript component** (`.tsx`) styled with **Tailwind** — your real stack — not throwaway HTML/CSS/JS. Two reasons:

1. **It matches your stack.** The component drops straight into Next.js later; nothing is rewritten.
2. **It is the representation product *apps* need.** Apps are built from components with states; starting in React means the gap between "marketing page" and "product app" is small later (the remaining work is *driving* states, not changing the output format — see `09` open question #5).

The only added cost vs raw HTML is a **preview harness**: a thin app that mounts the generated component so the Eyes can render and screenshot it. Recommended: **Vite + React** for the MVP (starts in milliseconds, ideal for rendering many candidates fast); switch/add **Next.js** when you want production parity. The *component* is final either way — only the harness differs.

---

## 2. Command surface

```
ade generate \
  --brief      ./briefs/burkes-hero.json   # required: business context + content (schema §3)
  --brand-data ./briefs/burkes-brand.json  # optional: palette + typography (hard tokens; §3)
  --section    hero                         # required: section name
  --out        ./runs/burkes-hero           # required: output dir
  --variations 2                          # optional: N candidates per iteration (default 1)
  --max-iters 4                           # optional: loop budget (default 4)
  --threshold 80                          # optional: pass score 0–100 (default 80)
  --refs     ./refs/*.png                 # optional: ≤5 reference screenshots (soft)
  --model    claude-opus-4-8              # optional (default)
  --headed                                # optional: show the browser while rendering
```

Exit codes: `0` approved (passed), `2` escalated (budget exhausted, best-so-far emitted), `3` aborted (unrepairable), `1` error.

---

## 3. Inputs: the brief + brand-data (`--brief`, `--brand-data`)

Two small JSON files. The human provides only **facts and constraints**; strategic brand cues (personality, tone, motion) are **AI-derived**, never hand-specified.

**`--brief`** — business context + this section's content. The **hard** input the section must serve:

```json
{
  "client": "The Burkes Group",
  "industry": "Real estate & mortgage",
  "location": "The Woodlands, TX",
  "audience": "home buyers, sellers, investors",
  "goal": "lead generation via confidence, not urgency",
  "section": {
    "name": "hero",
    "content": {
      "headline": "Built on Trust, Driven by Legacy.",
      "tags": ["Strategic", "Trusted", "Results-Driven"],
      "cta": { "text": "Contact Us", "href": "#contact" },
      "nav": ["About Us", "Buy", "Sell", "Services"]
    },
    "assets": { "hero_image": "./assets/hero-bg.png" }
  }
}
```

**`--brand-data`** — the **only** visual essentials you supply: palette + typography ([03 §3.1](./03-data-model.md)). The MVP uses these as fixed **hard** tokens (enforced by the color allowlist, §4); it does **not** yet derive a full Brand Foundation around them — that's the brand phase.

```json
{
  "client_id": "burkes",
  "palette": [
    { "role": "background", "value": "#F7F5F1" },
    { "role": "ink",        "value": "#1C1A17" },
    { "role": "accent",     "value": "#8A6A3B" }
  ],
  "typography": [
    { "role": "display", "family": "Canela", "fallback": "Georgia, serif" },
    { "role": "ui",      "family": "Inter",  "fallback": "system-ui" }
  ]
}
```

> **Why no `personality`/`feel` field?** Those are *strategic interpretation*, not facts you own — so the system **derives** them (full system: from business context + brand-data; MVP: the Generator infers them per-section). Specifying them by hand would anchor the AI's strategy, the opposite of Goal B. The only brand constraints you supply are the palette + typography in `--brand-data`. (Rationale: [04 §2.1](./04-memory-and-consistency.md).)

### 3.1 Input Gate: asset fitness + injection safety — C0.1

The Input Gate ([`11 §2.1`](./11-guardrails-and-invariants.md)) runs these additional checks before any model call:

**Asset fitness** — a file that exists but is unfit is rejected here, not at render time:
- **Colorspace**: must be sRGB. CMYK JPEGs are auto-converted where safe (lossless colorspace swap); if conversion is ambiguous or destructive, the file is flagged with a precise error.
- **Minimum resolution**: checked against the display size the asset will occupy (e.g. a full-bleed hero image must meet a minimum px threshold for the 1440 px breakpoint).
- **Logo alpha check**: `logo_ref` assets are checked for alpha-channel presence and background transparency — a white-background logo will be caught here before it fails silently against the brand palette.
- **Aspect-ratio sanity**: a clearly wrong crop ratio (e.g. 1:100) is flagged as a likely mistake, not silently passed.

**Injection safety** — all brief strings and content fields are wrapped as *data* with clear delimiters before they enter any model prompt (invariant I9). Hard constraints are re-checked deterministically by the Hard-Constraint Gate (C0.7) after generation — so adversarial text in a brief field cannot bypass the deterministic floor even if it alters the model's output.

**Fail behaviour**: any gate failure emits a **precise, actionable error message** and makes **zero model calls**.

---

## 4. The loop (exact behavior)

```mermaid
sequenceDiagram
    autonumber
    participant CLI
    participant O as Orchestrator (MVP)
    participant G as Generator (Anthropic SDK)
    participant E as Eyes (Playwright)
    participant C as Critic (Anthropic SDK, fresh ctx)
    participant FS as ./runs/<out>

    CLI->>O: generate --brief --section --out ...
    O->>FS: write run config
    loop iteration 0..max-iters-1
        O->>G: generate N candidates (brief + soft refs + last feedback)
        G-->>O: candidate code [1..N]
        loop each candidate
            O->>E: write files, render, screenshot @1440/768/375
            E-->>O: png paths
        end
        O->>C: score+rank candidates (screenshots + brief)
        C-->>O: {scores, ranking, verdict, feedback}
        O->>FS: append trace iteration
        alt best ≥ threshold
            O->>FS: write final section + screenshots
            O-->>CLI: exit 0 (approved)
        else more iters
            O->>O: keep best, carry feedback forward
        end
    end
    O->>FS: write best-so-far
    O-->>CLI: exit 2 (escalated)
```

Iteration detail (gates from [11](./11-guardrails-and-invariants.md) are part of the MVP):
1. **Generate** — Generator prompt (`05` §6.1, reduced: **brand-data** palette+type as hard tokens; no full design system; personality/tone inferred per-section). With `--variations N`, request N candidates.
2. **Render** (Eyes pipeline — C0.5) — each candidate gets a **fresh build directory + unique local port** (prevents stale-module bleed between candidates). Playwright loads the harness URL with a `candidateId` query parameter. Before capture, await in sequence: `document.fonts.ready` → network idle → images decoded → animation / CSS transition settle. Components with async data must set `data-ade-ready="true"` on their root element when ready; the harness awaits this attribute in addition to mount + fonts (unsignaled async fetches are forbidden in Phase-0 output). A **content fingerprint** of the DOM is checked against the current `candidateId` — a stale render from a prior candidate is detected and retried, never accepted. Screenshots captured at 1440 / 768 / 375 px.
3. **Render-health gate** (deterministic — C0.6) — **fast syntax check** (esbuild.transform: catches parse/syntax errors; does *not* type-check — semantic errors surface via the Vite error overlay), non-blank DOM, expected root node present, no error overlay, fonts + images loaded, layout settled, `window.__ADE_READY_ID__ === candidateId` per-candidate nonce match (prevents stale-render false passes). Invalid → bounded **render-repair** sub-loop (fix the code), **not** the design Critic — a render bug is categorically distinct from a design failure (I11).
4. **Hard-constraint gate** (deterministic) — a11y/contrast audit (axe-core), responsive-overflow, content-present / no-placeholder, and — when `--brand-data` is supplied — a **color allowlist** (only the provided palette may appear; off-palette hex fails). Violations are fed back as **hard** feedback. *(The full token-allowlist for spacing/radii/etc. is still skipped — no design system yet.)*
5. **Critique** — Critic prompt (`05` §6.2) in a **fresh** context (I2), screenshots + brief → structured scores + ranking + feedback (validated by the **Schema gate**).
6. **Decide — Pass Gate** = hard-gate pass **AND** Critic ≥ `--threshold`. Update **best-so-far** (never replace with worse, I4). If not passed and budget remains, carry violations + critique forward; else escalate with best-so-far.
7. **Trace** — append the iteration record (`03` §6) to `trace.jsonl` **immediately** as a new JSONL line (durable, atomic — I6). JSONL format ensures a mid-run crash leaves all completed iteration records intact and individually parseable.

---

## 5. Output layout

```
runs/burkes-hero/
├── config.json                 # the resolved run config
├── final/
│   ├── Section.tsx             # the approved (or best-so-far) React/TS component
│   ├── supporting/*.tsx        # Phase 1+ only — Phase 0 emits exactly one self-contained Section.tsx (§6.1)
│   └── shots/{1440,768,375}.png
├── iterations/
│   ├── iter-0/
│   │   ├── cand-1/{Section.tsx,…,shots/*.png}
│   │   ├── cand-2/{…}
│   │   └── critique.json
│   ├── iter-1/ …
└── trace.jsonl                 # JSONL, one RunRecord per line, atomically appended per iteration — the H1 measurement substrate
```

`trace.jsonl` is the deliverable that matters most for validation: it lets you see whether scores **rose across iterations** (the H1 signal). JSONL format (one `RunRecord` per line, not a JSON array) is required so each iteration can be appended atomically without rewriting the whole file — a JSON array cannot be atomically appended.

---

## 6. Component shape (MVP build)

A thin TypeScript program; no framework needed.

```
src/
├── cli.ts            # arg parsing → calls orchestrator (no logic here)
├── orchestrator.ts   # runLoop(): the 05 loop; owns budget, selection, trace
├── generator.ts      # generate(bundle, feedback?) → candidate Section.tsx (Anthropic SDK)
├── critic.ts         # critique(shots, brief) → scores+ranking+feedback   (Anthropic SDK, vision)
├── eyes.ts           # mount .tsx in harness → render → screenshots        (Playwright)
├── guardrails.ts     # deterministic gates: render-health, a11y, content, schema (11)
├── prompts.ts        # generator/critic prompt builders (05 §6)
├── schema.ts         # Brief, RunRecord, DimensionScores (03)
├── trace.ts          # append/read trace.jsonl (immediate, atomic)
harness/              # thin Vite + React app: mounts the candidate Section.tsx at a route
├── index.html        # harness shell (not the design output — just the preview host)
├── src/main.tsx      # imports the candidate component + renders it
└── vite.config.ts
```

### 6.1 Generator output contract (Phase 0) — C0.3

The Generator is bound by these output rules, enforced deterministically by the Guardrail Layer ([`spec/11`](./11-guardrails-and-invariants.md)):

- **Single file**: exactly one self-contained `.tsx` per candidate — no `supporting/*.tsx` in Phase 0 (deferred to Phase 1).
- **Import allowlist**: `react` only — no icon libraries, image libraries, or UI component libraries. Hallucinated imports break the build; they are caught deterministically by the Guardrail Layer and fed back as a *fix* task, never scored as a design failure.
- **Static Tailwind class strings only**: no runtime-constructed class names (e.g. no template literals computing class values — the Tailwind Play CDN's JIT cannot discover what is not a literal string in the source).
- **Streaming + truncation check**: the Generator call is streamed with a generous `max_tokens` budget. If the stream ends with `finish_reason = max_tokens` *or* braces / JSX are unbalanced, the loop retries once with a higher token budget (counted against the run's model-call budget); if the second attempt also fails, the candidate routes to the render-repair path — never to critique.
- **`--refs` is a no-op in Phase 0**: the flag is accepted by the CLI but has no effect on generation. It is wired for real in Phase 2 (C2.4).
- **No placeholders**: the Generator instruction explicitly forbids lorem ipsum, TODO comments, and placeholder copy. The Hard-Constraint Gate (C0.7) also scans for these deterministically as a downstream check.

### 6.2 Harness isolation (Phase 0) — C0.4

The preview harness treats generated code as **untrusted from the start**:

- **Tailwind via Play CDN** — `<script src="https://cdn.tailwindcss.com">` in `index.html`, not a build-time `content` scan. The candidate `.tsx` is written at runtime, so JIT class discovery must happen in-browser. *(Gap acknowledged: CDN ≠ production build — intentional and flagged as **F-PAR-02**; Phase 4 C4.4 reconciles it.)*
- **Network-isolated** — egress is denied by default at the Playwright browser level; a candidate that attempts `fetch()` or loads an external resource is blocked, not silently allowed.
- **Ephemeral per candidate** — each candidate gets its own fresh build directory and unique local port; no module cache or HMR state bleeds between candidates.
- **No secrets or credentials in scope** — the harness shell and its runtime environment must never contain `ANTHROPIC_API_KEY` or any other sensitive value.
- **Pinned toolchain** — Playwright, Vite, and the Tailwind CDN version tag are pinned explicitly in the lockfile; a supply-chain update cannot silently alter render output (F-OPS-07).

Dependencies (build phase): `@anthropic-ai/claude-agent-sdk`, `playwright`, `@axe-core/playwright` (deterministic a11y gate), a small arg parser, plus the harness stack — `react`, `react-dom`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `typescript`. Node + TS. Provider via `ADE_PROVIDER` env var — **never `ANTHROPIC_API_KEY` in dev** (see `AGENTS.md` and `knowledge/decisions-and-conventions.md`). (Swap the Vite harness for a minimal Next.js app when you want production parity — the generated component is unchanged.)

---

## 7. Config & defaults

| Setting | Default | Notes |
|---|---|---|
| model | `claude-opus-4-8` | adaptive thinking; vision for the Critic |
| breakpoints | 1440 / 768 / 375 | screenshot widths |
| variations | 1 | raise to 2–3 to enable pairwise selection |
| max-iters | 4 | loop budget |
| threshold | 80 | weighted pass score |
| output max_tokens | high; **stream** the Generator call | a full section can be large — stream to avoid timeouts |

---

## 8. Done-criteria for the MVP

The MVP is complete when, for the Burkes hero brief (no reference):

1. `ade generate` runs the full loop unattended and emits a finished section + screenshots + `trace.jsonl`.
2. The loop **demonstrably edits in response to critique** (iteration N+1 addresses iteration N's feedback) — visible in `iterations/`.
3. Across a handful of briefs, scores **trend upward** across iterations more often than not (the H1 signal; see `08`).
4. A human, shown the final output, judges it "good or close" for the brief on a meaningful fraction of runs (the H2 smell-test).
5. **The guardrails work:** an injected render bug is caught by the **render-health gate** and routed to repair (never scored as bad design), and an a11y/contrast failure **cannot** pass the Pass Gate. This proves the deterministic floor protects the H1 measurement.

These criteria are deliberately about **the loop working**, not about perfect design — the MVP proves the mechanism; quality is raised later by Memory and a calibrated Critic.

---

## 9. What the MVP intentionally does NOT prove (and defers)

| Not proven here | Where it comes | Why deferred |
|---|---|---|
| Consistency across sections | Brand + crystallization (phase 2) | needs a second section + the hard stores |
| Getting smarter over time | Library + write-back (phase 3) | needs the vector DB + multiple projects |
| Calibrated taste | human-verdict loop (phase 4) | needs accumulated verdicts |

Keeping the MVP this narrow is the point: it is the **smallest build that proves the core thesis**, cheaply, before any infrastructure is committed.
