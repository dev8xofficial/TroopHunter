# ADR-006 — Design Token System Architecture

**Status**: Accepted
**Date**: 2026-04-12
**Deciders**: Product Lead, Lead Designer, Architecture Lead
**Spec Context**: 000-foundation (FR-00-03 — Design Token Registry)

---

## Context

The Attorney Portal is one of three portals (Agent, Attorney, Client) sharing the same underlying brand identity — The Burkes Group. Each portal has the same primary colours (primary-navy, primary-gold) and brand typography (Archivo, Manrope), but may diverge slightly in component usage and density.

We needed to decide how to structure the design token system to:
1. Ensure visual consistency within the Attorney Portal across all 5 screens.
2. Avoid hardcoded colour, spacing, and typography values scattered throughout the implementation.
3. Allow the shared brand values to be updated in one place without hunting for all usages.
4. Remain technology-agnostic (the spec must not mandate CSS variables, design token JSON, or any specific tooling).

---

## Decision

We adopt a **two-tier named token system**:

**Tier 1 — Brand primitives**: Raw values that define the brand. Never referenced directly in components.
- Examples: `color-navy-900: #1a2744`, `color-gold-500: #c9a84c`, `font-family-display: 'Archivo'`

**Tier 2 — Semantic tokens**: Named roles that reference a primitive. These are the tokens specs and implementations use.
- Examples: `primary-navy → color-navy-900`, `primary-gold → color-gold-500`, `font-display → font-family-display`

Components and specs reference only Tier 2 tokens by name. This means if the brand colour changes, only the Tier 1 primitive changes — all component references automatically update.

The 16 canonical Tier 2 colour tokens for the Attorney Portal are:

| Token | Role |
|-------|------|
| primary-navy | Primary brand colour — nav, active states, headings |
| primary-gold | Accent brand colour — logo, highlights, gold buttons |
| accent-blue | Interactive accent — links, focus rings, panel borders |
| success-green | Positive state — verified, approved, completed |
| warning-orange | Caution state — pending, soon deadlines, alerts |
| error-red | Critical state — flagged, urgent, rejected |
| info-blue | Informational state — in-progress, info alerts |
| neutral-50 through neutral-900 | Eight-step greyscale for text, backgrounds, borders |

---

## Alternatives Considered

### Option A: Hardcoded values per component
Each developer writes the colour directly in their component. Fast initially, catastrophic at scale — any brand update requires touching every file.

**Rejected**: Creates drift, blocks brand consistency, makes the spec unverifiable.

### Option B: Single-tier tokens (no primitives)
One layer of named tokens only. Simpler, but tightly couples the token name to its value — if `primary-navy` changes to a teal, the name becomes misleading.

**Rejected**: Low cognitive overhead now, but creates naming confusion over time.

### Option C: Component-level tokens (e.g. `button-primary-bg`, `badge-warning-text`)
Define tokens at the component level rather than at the colour level.

**Partially adopted**: We use component-level class names (btn-primary, badge-success) that consume Tier 2 semantic tokens internally. This gives the expressiveness of component tokens without the explosion of raw token count.

---

## Consequences

**Positive**:
- Brand updates propagate automatically across all 5 screens.
- Specs can say "use primary-navy" without specifying a hex value — the implementation translates the token.
- Token names are self-documenting: `error-red` is always the red used for errors.

**Negative**:
- Developers must learn the token vocabulary before writing any components. A cheat-sheet or IDE integration is recommended.
- Token naming discipline must be enforced in code review — the most common violation is developers writing a raw colour value because they cannot find the right token name.

**Mitigations**:
- Foundation handoff documentation (TASK-000-12) includes the full token list.
- Code review checklist item: "No hardcoded colour or font values."
