# 06 — Workflows

> End-to-end flows that compose the components (`01`), stores (`03`), memory rules (`04`), and the loop (`05`) into the things a user actually runs. Each maps to a CLI subcommand (`07`, and the full CLI surface here). The Burkes example threads through.

---

## 1. The full project lifecycle

```mermaid
flowchart TB
    NC["NEW CLIENT<br/>business context · content · assets · brand-data (palette+type) · (optional) ≤5 references"] --> B
    B["[1] BRAND ESTABLISHMENT (once per client)<br/>human provides palette+type → AI DERIVES the rest → HUMAN approves → FROZEN (hard)"] --> S1
    S1["[2] FIRST SECTION (e.g. hero)<br/>closed loop (05) → approved → CRYSTALLIZE → Project Design System frozen"] --> SR
    SR["[3] REMAINING SECTIONS (about, features, footer)<br/>closed loop, constrained by frozen system + sees built sections"] --> QA
    QA["[4] ASSEMBLE + WHOLE-ARTIFACT QA<br/>cross-section coherence pass"] --> DEL
    DEL["[5] DELIVER artifact"] --> WB
    WB["[6] LEARNING WRITE-BACK<br/>de-identified patterns + human verdicts → GLOBAL LIBRARY"]
    WB -. next surface (product): reuse SAME Brand Foundation .-> S1
    WB -. next client: starts smarter (Library grew) .-> NC
```

This is the spine. Everything below zooms into one stage.

---

## 2. Stage 1 — Brand establishment (once per client)

High-stakes and long-lived, so a human approves it; after that it is frozen and reused for every surface.

```mermaid
sequenceDiagram
    participant U as Design Lead
    participant O as Orchestrator
    participant R as Retriever
    participant G as Generator
    participant C as Critic (fresh ctx)
    participant BF as Brand Foundation

    U->>O: design brand --client burkes --context brief.md --brand-data brand-data.json [--refs ...]
    Note over U,O: human provides ONLY palette + typography (the givens)
    O->>R: retrieve brand-strategy direction (soft)
    R-->>O: top-k Library entries
    O->>G: DERIVE the rest from givens + business context (+soft direction)
    G-->>O: 2-3 distinct BrandFoundation directions (personality, tone, motion, color-usage) with rationale
    O->>C: PHASE-EXIT REVIEW — does the derived strategy fit the business context + givens? (fresh ctx)
    C-->>O: pass · or targeted issues → bounded re-derive (≤1–2) before a human sees it
    O->>U: present reviewed foundation for approval
    alt approved
        U-->>O: approve
        O->>BF: write status=frozen (palette/type=provided · rest=derived)
    else re-derive
        U-->>O: enrich an input / adjust a given
        O->>G: RE-DERIVE → re-present (never hand-patch a derived field)
    end
```

**Burkes:** the Lead provides only the **givens** — a warm-neutral palette + humanist display / clean UI families (`brand-data.json`). From those plus the real-estate business context, the AI **derives 2–3 distinct directions** for the personality (e.g. `[trust, legacy, reliable, modern]`), an assured/editorial tone, and a restrained cinematic motion voice, each with rationale; the Lead approves one; it freezes. Disagreement is resolved by re-deriving (adjust an input), not by hand-editing a derived field. Before the Lead is asked to approve, a **Phase-Exit Review** (a fresh-context Critic, [11 §2.3](./11-guardrails-and-invariants.md)) checks that the derived strategy actually fits the business context and the given palette/type, returning an off-brief derivation for bounded re-derivation first — so the human reviews a pre-filtered result, not a cold draft (F-BRD-01). Additionally, a **deterministic contrast/a11y check** runs on the brand color pairings at approval time to ensure accessible primary pairings. (This same frozen brand is reused in §6 for the product.)

---

## 3. Stage 2 — First section + crystallization

```mermaid
sequenceDiagram
    participant O as Orchestrator
    participant L as Loop (05)
    participant U as Design Lead
    participant C as Critic (fresh ctx)
    participant PDS as Project Design System

    O->>L: design section "hero" with frozen Brand Foundation (hard) (system OPEN)
    L-->>O: approved hero (passed Critic)
    O->>U: present hero
    U-->>O: approve (taste verdict recorded)
    O->>O: CRYSTALLIZE → extract candidate FOUNDATION (tokens) + hero components
    O->>C: PHASE-EXIT REVIEW — do the tokens capture the hero without over/under-specifying? (fresh ctx)
    C-->>O: pass · or issues → bounded correction (≤1–2)
    O->>PDS: freeze reviewed foundation (status: open→foundation-frozen)
```

The hero is designed with the loop, using the **frozen Brand Foundation as an authority-tagged hard input**; on human approval its **foundation** (tokens) is extracted, **Phase-Exit-Reviewed** (a fresh-context Critic checks the crystallized tokens against the brand + hero for over/under-specification before they become law — [11 §2.3](./11-guardrails-and-invariants.md)), then frozen into the Project Design System and the hero's components are locked. Later sections build against those frozen tokens and may *add* new components, never change them (`04` §3, `03` §4). The verdict is recorded for Library write-back and Critic calibration.

---

## 4. Stage 3 — Remaining sections (consistency enforced)

```mermaid
sequenceDiagram
    participant O as Orchestrator
    participant PDS as Project Design System
    participant L as Loop (05)

    loop each remaining section
        O->>PDS: load frozen tokens + recipes (HARD)
        O->>L: design section with PDS (hard) + Brand Foundation (hard) + 1-3 prior screenshots (ctx)
        L-->>O: approved section (Critic polices system_adherence)
    end
```

Each later section is generated **against** the frozen Project Design System and Brand Foundation, and **sees** the most relevant 1–3 already-built sections as visual context — the mechanisms that guarantee the About page matches the hero (`04` §3). **Drift is never approved;** a drifting section must be regenerated to comply with the hard laws, keeping the total token count across sections bounded.

---

## 5. Stages 4–6 — Assemble, deliver, learn

```mermaid
flowchart LR
    A["assemble sections → full artifact"] --> Q["whole-artifact QA<br/>(Critic pass over the assembled page:<br/>cross-section coherence, nav, responsive)"]
    Q -->|pass| D["deliver"]
    Q -->|fail| FIX["re-loop the offending section"]
    D --> WB["write-back:<br/>distill de-identified entries + verdicts"]
    WB --> PER["Phase-Exit Review<br/>(abstraction altitude:<br/>transferable, not too specific/vague)"]
    PER -->|pass| LIB[("Library")]
    PER -->|fail| REAB["bounded re-abstraction"]
```

- **QA** is a Critic pass over the *assembled* artifact (cross-section coherence, nav consistency, rhythm, responsive seams) ∧ **deterministic responsive/overflow checks**. If it fails, the system **re-loops the offending section** rather than applying a blind patch. Shared structural elements like the nav and footer are treated as locked components. *(This whole-artifact QA is itself a Phase-Exit Review — the artifact-level instance of the same pattern, [11 §2.3](./11-guardrails-and-invariants.md).)*
- **Write-back** runs once, post-delivery (`04` §6); each distilled entry passes a **Phase-Exit Review** of its abstraction altitude before it enters the Library, so a too-specific or too-vague lesson is re-abstracted rather than stored (F-WB-02).

---

## 6. Cross-artifact reuse — website → product

The website and product are **siblings** under one Brand Foundation. The product run reuses the frozen brand and builds its **own** per-surface design system.

```mermaid
flowchart TB
    BF[("Brand Foundation — Burkes (frozen)")]
    subgraph WSITE["Website project (done)"]
        WPDS[("Website Design System")]
        W["hero · about · pricing"]
    end
    subgraph PROD["Product project (new)"]
        PPDS[("Product Design System (new)")]
        P["dashboard · settings · tables"]
    end
    BF --> WPDS --> W
    BF --> PPDS --> P
    note["Same brand → recognizably one company.<br/>Different per-surface system → product adapts for density/usability."]
```

The product's **first screen** is its section-1: it runs the loop under the (already frozen) brand, then **crystallizes a new Product Design System**. Subsequent product screens inherit that. Brand consistency across artifacts is guaranteed by the shared parent; surface-appropriate difference is enabled by the separate child systems.

---

## 7. CLI subcommand → workflow map

| CLI subcommand | Workflow stage | Notes |
|---|---|---|
| `design brand --client <c> --context <brief> --brand-data <f>` | Stage 1 | derives the foundation from brand-data + context, then (with `--approve`) freezes it |
| `design section --client <c> --surface <s> --name <n> --content <f>` | Stages 2–3 | runs the loop; first approved section crystallizes the system |
| `design site --client <c> --surface <s> --plan <f>` | Stages 2–4 | sequences sections + assemble/QA |
| `design learn --artifact <id>` | Stage 6 | write-back to Library |
| `design show --client <c>` | — | inspect brand/system/artifacts/trace |

> The **MVP** (`07`) implements only a reduced `design section` — one section, no brand/library — to prove the loop. The other subcommands are the target surface this workflow doc describes.

---

## 8. Where the human is in the loop (and where they are not)

```
HUMAN gates (destination):                 AI runs unattended (route):
  • brand approval (Stage 1)                 • section design loop (05)
  • section approval / taste verdict         • retrieval + synthesis
  • final delivery sign-off                  • crystallization (mechanical)
                                             • write-back distillation
                                             • PHASE-EXIT REVIEW before each human gate
                                               (pre-filters brand / PDS / entries — 11 §2.3)
```

Over successive projects, as the Critic calibrates to human verdicts (`08` H8), the human gates can be relaxed — the **autonomy ladder** in `09`. Early on, every Critic "pass" is human-spot-checked; later, only exceptions are. The **Phase-Exit Review** ([11 §2.3](./11-guardrails-and-invariants.md)) sits just *inside* each human gate: it never replaces the human, but it pre-filters what reaches them, and its per-boundary agreement with the human is exactly what the ladder measures before a gate is relaxed.
