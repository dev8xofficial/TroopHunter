# 04 — Memory & Consistency

> The two-memory model and how consistency is *enforced* rather than hoped for. This is where "gets smarter" and "stays consistent" — two opposite jobs — are kept in separate machinery. Schemas live in `03`; this doc explains how they are used.

---

## 1. Two memories, opposite jobs

The single most important distinction in ADE. There are **two** design memories doing **opposite** things; merging them breaks the system.

| | **Global Library** | **Brand + Design System** |
|---|---|---|
| Job | get *smarter* over time | stay *consistent* |
| Scope | all clients, forever | one client / one surface |
| Used as | retrieved inspiration | binding requirement |
| AI may diverge? | **yes** — direction | **no** — law |
| Soft / hard | soft | hard |
| Written by | Write-back, after each project | Brand: human approval · System: crystallization |

The Library makes project #50 better than project #1. The Brand/System makes *one* client's hero, About page, and product app feel like the same company. They pull opposite directions — one loose, one rigid — which is exactly why they are **separate stores**, never one blended "memory."

---

## 2. The consistency hierarchy (three levels)

Consistency is **not emergent**. It is enforced by a frozen, three-level hierarchy every generation must obey.

```mermaid
flowchart TB
    BF["BRAND FOUNDATION — one per client<br/>logo · colors · type family · motion voice · personality · tone<br/><b>hard · approved once · frozen</b>"]
    WS["WEBSITE design system<br/>(conversion, storytelling)"]
    PR["PRODUCT design system<br/>(density, usability)"]
    H["hero · about · pricing …<br/><i>sections inherit the system</i>"]
    D["dashboard · settings · tables …<br/><i>screens inherit the system</i>"]
    BF -->|inherited by| WS
    BF -->|inherited by| PR
    WS --> H
    PR --> D
    WS <-. siblings: share the brand parent .-> PR
```

- **Within one artifact** (hero → about): the **Project Design System** keeps sections consistent.
- **Across artifacts** (website ↔ product): the **Brand Foundation**, sitting above both, keeps them recognizably one brand while each surface adapts to its context.

> **Lock the primitives, free the composition.** Color, type, spacing, motion, component styles are locked; layout and section structure are free. *Atoms fixed, arrangements free* — sections share tokens, but not layout. The Critic explicitly rewards purpose-appropriate variation, ensuring distinct sections do not become hero-clones (F-CON-02).

### 2.1 The Brand Foundation itself: provided givens → derived strategy

The hierarchy above *starts* at the Brand Foundation — but **how is the brand itself decided?** By the same **fix-then-derive** discipline that crystallization (§3) uses one level down. The human provides only the **givens they own** — palette + typography (a small `BrandData` file, `03` §3.1) — and the AI **derives** the rest of the foundation (personality, tone, motion voice, color-usage rules) from those givens plus the business context. It produces **2–3 distinct directions**, each with rationale tied to the business context.

```
   PROVIDED (givens — facts you own)        DERIVED (AI strategy, grounded in givens + brief)
   ─────────────────────────────────        ────────────────────────────────────────────────
   • palette (exact colors + roles)    ──►   • personality reading
   • typography (typefaces + roles)    ──►   • tone of voice
   • logo                              ──►   • motion voice
                                             • color role / usage rules
                                       (a human APPROVES the derived result, or sends it back)
```

Two rules make this safe:

- **Derive in dependency order; never patch a derived leaf.** Because every derived element is computed *from* the givens, there is no derived decision a human overrides after the fact — which is exactly what would otherwise leave the motion/tone rationale **stale** when colors change. Disagree with a derived element? Change an input (enrich the brief, or adjust a given) and **re-derive** — a new `version` (`03` §3.2), not a hand-edit.
- **Minimal givens keep the strategy objective.** Every adjective a human supplies anchors the AI's search. Providing only the visual essentials lets its brand strategy stay un-anchored; the human still holds a **veto** (approval), just not the pen. This is the Goal-B autonomy principle applied to the brand layer: constrain the *facts*, free the *strategy*.

Both the provided givens and the approved derived foundation are **hard** inputs. On approval, this frozen Brand Foundation is wired into the Generator's **authority-tagged input bundle as `hard`**. This means it explicitly outranks soft inputs (references/Library), and the Critic explicitly scores a `brand_adherence` dimension. The only difference is who authored each element, recorded per-element in `provenance` (`03` §3.2).

---

## 3. Crystallization — where per-artifact consistency is born

The first section is special: it is where the Project Design System gets **decided**. The moment it is approved, its decisions stop being soft direction and become hard law.

```mermaid
sequenceDiagram
    participant O as Orchestrator
    participant Loop as Generation Loop
    participant H as Human
    participant PDS as Project Design System

    O->>Loop: design section 1 (hero) — system still "open"
    Loop-->>O: approved hero (component + de-facto tokens)
    O->>H: present hero for approval
    H-->>O: approved
    O->>PDS: CRYSTALLIZE — freeze the FOUNDATION (tokens) + the hero's components
    Note over PDS: status: open → foundation-frozen
    O->>Loop: design section 2 (about) — tokens HARD; may ADD new components
```

Before crystallization the AI is choosing the system; after, it is obeying it. This is the mechanism that answers *"will the About section match the hero?"* — **yes, because the hero's decisions were frozen into law the About section must follow**, and the About generation is additionally shown the hero's screenshots as visual context.

### Freeze the foundation, grow the components

One section is enough to lock the **foundation** — colors, type scale, spacing, radii, motion, and the components the hero actually used. The Crystallizer extracts these tokens **conservatively**. But a hero cannot contain *every* component (no cards, forms, tables, or empty/error states). So crystallization is **not** "freeze everything after section 1." It freezes *only* the foundation:

```
   After section 1:   FOUNDATION (tokens)        → FROZEN, never changed
                      hero's components           → locked
   Each later section: may ADD a new component    → locked once added
                       may NOT change a token or an already-locked component
```

The design system is **frozen at the core, extensible at the component layer** — exactly how human design systems are built (a token + component core first, more components as new screens demand them). Consistency is still guaranteed: the tokens every section draws from never move; only the *set of available components* grows. (Schema + rule in `03` §4; this resolves open question #4 in `09`.)

**Component reuse & deduplication:** Before adding a new component, the Crystallizer retrieves existing ones to **reuse or extend**. Near-duplicates are merged at crystallization rather than accumulated. The system tracks the unique-vs-total component ratio across sections to prevent component-layer bloat (F-PDS-03).

**Token extension policy:** While the foundation tokens are frozen, a genuinely new, unmet token need may arise. We use an **additive, namespaced extension policy**: a new token that doesn't alter existing ones may be added (via a versioned bump), but any extension that touches the frozen foundation must escalate to a human. Extension frequency is tracked; high frequency indicates section 1 was the wrong anchor.

**Reviewed before it becomes law.** Because the foundation is extracted from a *single* section, a bad extraction (a hero that over- or under-specifies tokens — F-PDS-01) would lock an error into every later section. So crystallization output passes a **Phase-Exit Review** before it is frozen ([11 §2.3](./11-guardrails-and-invariants.md)): a fresh-context Critic checks the candidate tokens against the brand and the approved hero — *are these the right primitives? is anything over-fitted to this one section, or missing something later sections will need?* — and returns an over/under-specified foundation for bounded correction. Only a reviewed foundation is frozen; the human still signs off, but on a pre-filtered system.

---

## 4. The "one hero → three stores" fan-out

The same approved hero deposits knowledge into **all three** stores — but a **different slice** into each. This resolves the most common confusion ("does the hero go in the vector DB?").

```
                 ┌─────────────────────────── approved Burkes hero ───────────────────────────┐
                 ▼                                   ▼                                          ▼
   GLOBAL LIBRARY (soft, vector)        BRAND FOUNDATION (hard)              PROJECT DESIGN SYSTEM (hard)
   "Trust-signal editorial hero          "Burkes = warm-neutral palette,      accent #… · display 80px/1em ·
    for B2B services"                     humanist display type,               page-inset 15px · the actual
   • abstracted, de-identified            restrained motion, legacy voice"     hero component code
   • the LESSON, not the artifact        • this client's identity             • exact tokens + literal recipe
   → reused for FUTURE, DIFFERENT        → reused for Burkes' OTHER            → reused for THIS site's other
     clients                               surfaces (the product)               sections (about/pricing/footer)
```

The test that routes each fact:
- *Helps a different client?* → Library (de-identified).
- *This client's identity across surfaces?* → Brand Foundation.
- *This surface's exact implementation?* → Project Design System.

---

## 5. Retrieval — how soft memory is used at generation time

```mermaid
flowchart LR
    B["Brief<br/>(business context)"] --> Q["query string<br/>(problem-space synthesis)"]
    Q --> E["embed"]
    E --> ANN["ANN search over Library"]
    ANN --> TOPK["top-k entries"]
    TOPK --> BUNDLE["fed into the loop as<br/><b>SOFT direction</b> (may diverge)"]
```

The query is built from the **brief**, embedded, and matched nearest-neighbor against the embedded problem-space of each entry (see `03` §2.1).

**Retrieval rules (C2.3):**
- **Ranked by similarity × confidence.** Validated knowledge surfaces; unproven guesses sink. A strict similarity **threshold** and small `top-k` prevents pollution (F-MEM-02).
- **Non-blocking (optional).** On store failure or an empty Library (cold start), the system proceeds on brand+brief alone (F-MEM-05, F-MEM-07). Cold-start *is* the MVP.
- **Soft framing.** Retrieved entries are framed as **"direction, may diverge"**. The Critic rewards brief-fit, not entry-resemblance (F-MEM-06). The *hard* constraints come from Brand/System, never from here.

**Burkes query example:**
`"hero · B2B real estate · audience: sellers/investors · personality: trust, legacy, modern · goal: lead-gen · feel: warm, editorial"`
→ returns `[trust-editorial-hero pattern, restraint principle, sharp-CTA recipe, no-gradient-on-photography anti-pattern]`.

---

## 6. Write-back — how the Library gets smarter (not just bigger)

After a **human-approved** artifact is finalized (an unapproved artifact can never produce a Library entry, preventing F-WB-04), **Learning Write-back** distills it into the Library through a strict pipeline (C2.5, C2.7):

1. **De-identification Gate:** Block on any client name, PII, exact brand token, or verbatim copy (F-WB-01).
2. **Abstraction:** Translate the instance to a transferable altitude (tag as principle, pattern, recipe; favor the mid "pattern" altitude).
3. **Phase-Exit Review:** A fresh-context Critic checks if the abstraction is transferable (not too specific, not too vague; F-WB-02) AND checks for **strategic specificity** (blocks de-identified but re-identifiable or confidential strategy leaks; F-WB-06). Bounded ≤1–2 cycles.
4. **Dedup / Merge:** Check nearest entries above a similarity threshold. If a near-duplicate exists, merge (add variation, raise confidence). If not, insert new.
5. **Insert:** Save with low starting confidence and provenance mapped to the human verdict (C2.7).

**Confidence weighting, decay, & curation (C2.6):**
- Entries are **evidence-weighted**. Confidence rises with corroboration and positive verdicts.
- Confidence **decays** with age/disuse.
- Diversity-aware retrieval resists monoculture (F-WB-05).
- A **periodic curation pass** re-evaluates older high-confidence entries against current human verdicts, down-weighting or retiring patterns that no longer meet rising taste standards (F-WB-07).

---

## 7. Conflict precedence (the rules that resolve disagreements)

When inputs disagree, resolve in this fixed order:

```
1. Quality / accessibility floor   (hard — never violated)
2. Brand Foundation                (hard)
3. Project Design System           (hard)   ← may specialize, never contradict, the brand
4. Business brief                  (hard)
─────────────────────────────────────────────
5. Global Library entries          (soft — synthesized)
6. ≤5 references                   (soft — direction only)
```

- **Hard always beats soft.** A reference suggesting a teal accent loses to a brand whose accent is warm-neutral.
- **Among hard inputs**, the floor and brand are inviolable; the project system *specializes* the brand (e.g., a denser type scale for the product) but can never contradict it.
- **Among soft inputs**, the AI synthesizes freely; nothing is stitched part-by-part (no Frankenstein merges).
- **Injection Safety (C2.4):** References and retrieved entries are **untrusted data** wrapped in clear delimiters. A poisoned Library entry or red-team reference can never override a hard rule; the deterministic post-checks always hold (F-SEC-02).

---

## 8. Why references are dissolved, never stitched

A repeated trap (and the failure of the old `synthesis_map` thinking): combining references **element-by-element** ("button from A, color from B") yields a Frankenstein. ADE treats ≤5 references as a **moodboard**:

```
   STITCHED (wrong)                         DISSOLVED (right)
   button from A + color from B +           internalize what makes each work →
   animation from C                         synthesize ONE coherent new design
   → 3 design languages colliding           → may resemble none of them; that's success
```

References inform *direction*; the business context *decides*. References pass through an optional **relevance screen** before use. Output that diverges from every reference **to better serve the client** is success, not error. The Critic scores **brief_fit, never resemblance**; ablating references must still yield good output (C2.4).
