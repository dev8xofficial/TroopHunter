# 05 — The Generation Loop (the engine)

> The core of ADE: the closed **generate → render → screenshot → critique → edit** loop — the "Eyes" capability, with the Critic as the "Taste" proxy. This is the most important behavioral spec; the MVP (`07`) implements exactly this loop for one section.

---

## 1. Inputs to a single section generation

The Orchestrator assembles one **input bundle** per section. Every input is tagged by authority (`01` §4, `04` §7).

```
   INPUT BUNDLE (assembled by the Orchestrator)
   ┌──────────────────────────────────────────────────────┐
   │ SOFT │ retrieved Library slices (top-k)               │
   │      │ ≤5 reference screenshots (direction, not copy) │
   │──────┼────────────────────────────────────────────────│
   │ HARD │ Brand Foundation                               │
   │      │ Project Design System  (exists after section 1)│
   │      │ business context + THIS section's content      │
   │      │ quality / accessibility floor                  │
   │──────┼────────────────────────────────────────────────│
   │ CTX  │ screenshots of already-built sections          │
   └──────────────────────────────────────────────────────┘
```

- **SOFT** is direction the Generator may diverge from.
- **HARD** is law the Generator must obey (and the Critic scores against).
- **CTX** is visual context so a later section *looks like it belongs* — the agent designs with the rest of the page in front of it, as a human would.

> **Output representation.** The Generator produces a **React + TypeScript** component (`.tsx`) styled with **Tailwind** (the team's stack) — **not** raw HTML/CSS/JS. The Eyes render it through a **preview harness** (a thin Vite/Next app that mounts the component) and screenshot that. Components are real, reusable stack output (they drop into Next.js later), and a component representation is also what product *apps* need — so this choice both matches the team and moves the system toward app-readiness (see `02` §5, `07`, and `09` open question #5).

---

## 2. Sequence diagram — one section, with the loop

```mermaid
sequenceDiagram
    autonumber
    participant O as Orchestrator
    participant R as Retriever
    participant G as Generator (LLM)
    participant E as Eyes (browser)
    participant C as Critic (LLM, fresh ctx)
    participant T as Trace store

    O->>R: query Library with brief
    R-->>O: top-k soft entries
    O->>O: assemble input bundle (soft+hard+ctx)

    loop until pass OR budget exhausted
        O->>G: generate N candidate(s) from bundle (+ last feedback)
        G-->>O: candidate code [1..N]
        par render each candidate
            O->>E: render + screenshot @1440/768/375
            E-->>O: screenshots
        end
        O->>C: score each + rank pairwise vs bundle
        C-->>O: scores + ordering + targeted feedback
        O->>T: record iteration (inputs, shots, scores, verdict)
        alt best candidate passes threshold
            O->>O: select best → exit loop
        else fail
            O->>O: keep best; feed feedback into next iteration
        end
    end

    O-->>O: approved section (or escalate to human if budget exhausted)
```

Notes:
- **Variation (N candidates)** is optional per iteration; even N=1 works for the MVP. Pairwise ranking is used whenever N>1.
- The **Critic sees screenshots**, never the thought process — judging rendered pixels is the whole point.
- Every iteration is **traced** (this is the data the `08` hypotheses are measured on).

---

## 3. State diagram — the loop's lifecycle

```mermaid
stateDiagram-v2
    [*] --> Assembling
    Assembling --> Generating: bundle ready
    Generating --> Rendering: candidate(s) produced
    Rendering --> Critiquing: screenshots captured
    Critiquing --> Selecting: scored + ranked
    Selecting --> Passed: best ≥ threshold
    Selecting --> Generating: fail & budget remaining (feedback fed back)
    Selecting --> Escalated: fail & budget exhausted
    Critiquing --> Aborted: unrepairable hard-constraint violation
    Passed --> Crystallizing: section 1 only
    Passed --> Approved: section ≥ 2
    Crystallizing --> Approved
    Approved --> [*]
    Escalated --> [*]
    Aborted --> [*]
```

Three terminal states: **Approved** (success), **Escalated** (budget exhausted → human decides), **Aborted** (a hard constraint cannot be satisfied → recorded, surfaced). No silent failure.

---

## 4. The Critic rubric (the Taste proxy)

The Critic scores the rendered section on four weighted dimensions. The weights differ for section 1 (no design system exists yet).

| Dimension | What it measures | Weight (≥2) | Weight (section 1) |
|---|---|---|---|
| **Brand adherence** | fit to Brand Foundation (palette, type, motion voice, personality) | 25% | 35% |
| **System adherence** | fit to Project Design System (exact tokens, component recipes) | 25% | n/a |
| **Brief fit** | does it serve the business goal/audience? | 25% | 30% |
| **Craft** | hierarchy, rhythm, restraint, polish, responsiveness | 25% | 35% |

Rules:
- **Pairwise over absolute.** When ranking candidates, the Critic compares them head-to-head ("A or B, and why") — far more reliable than absolute 0–100 scores. Absolute scores are still recorded for trend tracking.
- **Feedback must be actionable.** Each fail returns specific, addressable notes ("the CTA competes with the headline; the photo is cropped too tight at 375") — not "make it better."
- **The Critic is a proxy, not an oracle.** It is the system's weakest link; it is calibrated over time by human verdicts (see `08` H3/H8). Until then, a human spot-checks Critic "passes."

---

## 5. Stop conditions & budgets

| Condition | Action |
|---|---|
| Best candidate ≥ pass threshold | exit → Approved |
| `iterations == max_iterations` (default 4) | exit → Escalated (human reviews best-so-far) |
| Hard-constraint violation the Generator cannot repair across K tries | Aborted + recorded |
| Wall-clock / token budget per section exceeded | Escalated |

Budgets are configurable. The point is **bounded** autonomy: the loop never spins forever and always ends in a recorded, inspectable state.

---

## 6. Prompt specifications

> These are *specs* (intent + required inputs/outputs), not final wording. Final prompts are tuned during the build. The model is Claude Opus 4.8 with vision; the Generator and Critic run in **separate** contexts.

### 6.1 Generator prompt (spec)

```
ROLE: You are an expert product/web designer. Design and BUILD one section.

YOU MUST OBEY (hard):
  - Brand Foundation:        {palette, type, motion voice, personality, tone}
  - Project Design System:   {tokens, component recipes}   # if present
  - Business brief:          {industry, audience, goal, this section's content}
  - Quality floor:           responsive @1440/768/375; accessible; performant

YOU MAY DRAW ON (soft — synthesize, do not copy):
  - Library direction:       {top-k entries: intent/construction/rationale/avoid}
  - References:              {≤5 screenshots} as DIRECTION only

VISUAL CONTEXT:
  - Already-built sections:   {screenshots}  # make this section belong to the same family

LAST CRITIQUE (if any): {actionable feedback to address}

OUTPUT: a complete React + TypeScript component (.tsx) for THIS section only,
        styled with Tailwind, importing the project's design tokens.
        No placeholders. Use the brand/system tokens exactly. It must render
        in the preview harness with no extra wiring.
```

### 6.2 Critic prompt (spec)

```
ROLE: You are a senior design critic. You did NOT build this. Judge it honestly.

INPUTS:
  - Rendered screenshots @1440/768/375
  - The same hard constraints (brand, system, brief, floor)
  - (if ranking) multiple candidates' screenshots

TASK:
  1. Score each candidate on: brand_adherence, system_adherence, brief_fit, craft (0–100).
  2. If multiple: rank pairwise and justify the ordering.
  3. Verdict per candidate: pass | fail (vs threshold).
  4. For any fail or weak dimension: give SPECIFIC, ADDRESSABLE feedback.

OUTPUT (structured): { scores, weighted_total, ranking, verdict, feedback }.
Judge what is RENDERED. Do not infer intent that is not visible.
```

### 6.3 Crystallizer prompt (spec — section 1 only)

```
ROLE: Extract the design system implied by this approved section.

INPUT: approved section (React + TypeScript component) + Brand Foundation.

TASK: produce the Project Design System — exact tokens (color/type/space/radius/
      shadow/motion) and component recipes (anatomy, variants, states) that THIS
      section established. These become HARD law for all later sections.

OUTPUT: the ProjectDesignSystem (see 03 §4) — tokens as a Tailwind theme + CSS
        variables, plus typed React component recipes the hero used. Freeze the
        FOUNDATION (tokens); later sections ADD components but never change tokens.
        Specialize the brand; never contradict it.
```

---

## 7. Consistency vs. variation inside the loop

The loop must produce sections that are **consistent** (same tokens) without being **monotonous** (same layout). The mechanism:

- **Locked by hard inputs:** color, type, spacing, motion, component styles (from Brand + System).
- **Free for the Generator:** layout, composition, section structure, which patterns to draw on.

So the Critic's `system_adherence` dimension polices the *primitives*, while `craft` and `brief_fit` reward *appropriate variation*. A section that merely clones the hero's layout should score well on adherence but poorly on craft/brief-fit for its own purpose.

---

## 8. Why this loop replaces the old pipeline's machinery

| Old pipeline needed… | Because… | ADE replaces it with… |
|---|---|---|
| `generation_rules.md` per site | the generator was blind | the **Critic seeing** the mistake |
| `thought_process.md` self-grading | no external judge | a **fresh-context Critic** |
| "never re-open the site" dogma | token fear | **vision + retrieval** keep context bounded |
| predicted accuracy tables | no measurement | **traced, scored iterations** (`08`) |

The loop is not a tweak to the old pipeline — it is the thing the old pipeline's `Stage 6` was quietly trying to become, promoted from a final exam to the engine.
