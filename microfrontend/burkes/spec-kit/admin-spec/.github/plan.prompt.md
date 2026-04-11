# Plan Prompt — The Burkes Group Admin Portal

## Purpose

Use this prompt to generate an implementation plan for a specified feature. The plan translates a completed `spec.md` into phased, architect-level implementation guidance using the portal's established patterns.

---

## Instructions for Use

1. Open this file in GitHub Copilot Chat.
2. Replace `[SPEC_FILE_PATH]` with the path to the target spec (e.g., `.specify/specs/007-partner-referrals/spec.md`).
3. Run the prompt.

---

## Portal Context

You are planning implementation for **The Burkes Group Admin Portal** — a single-page web portal for real estate agents. The following shared infrastructure already exists and must be reused, not re-built:

### Established Shared Infrastructure

| Component | What it provides |
|-----------|-----------------|
| Global navigation | Sticky top nav, 8-screen switching, active state, notification bell, user chip |
| Design token system | Colours, typography (Archivo/Manrope), shadows, spacing |
| Badge system | 3 canonical badge variants (active, pending, completed) |
| Card component | Standard card with card-header / card body |
| Activity log | Append-only event feed consumed by Dashboard |
| Session context | Agent identity + brokerage + active transaction IDs |
| Modal system | Full-screen overlays for forms and detail views |
| Filter section | Filter dropdowns + search bar + action button pattern |
| Upload zone | Drag-and-drop file upload component |

### Established Screen Patterns

Any new screen must follow these patterns already present in screens 001–008:
- Page body: `padding: 32px`, `max-width: 1600px`, centred
- Page header: h1 (Archivo, 28 px, navy) + subtitle paragraph
- Responsive: 4-col stats → 2-col at 1200 px → 1-col at 768 px
- All content in standard card components
- Filter section always above content, below page header
- Status badges always from the canonical badge system

### Spec Dependencies

Before planning, read the spec file at `[SPEC_FILE_PATH]` and identify:
1. All `Depends on` specs listed in the Dependencies section.
2. Any data entities the plan introduces.
3. All integration points with existing screens (especially Dashboard activity log and nav).

---

## Template to Follow

Use the plan template at `.specify/templates/plan-template.md`. The plan must cover:

1. **Architecture Overview** — new vs. modified components
2. **Implementation Phases** — minimum 2 phases; Phase 1 is always foundational data/state; Phase 2 is UI
3. **Data Design** — any new data structures introduced
4. **Integration Points** — how this feature connects to existing screens (Dashboard, Transactions, Documents, etc.)
5. **Security & Access Control** — which roles can read/write each data element
6. **Testing Strategy** — unit, integration, and acceptance tests mapped from spec Success Criteria
7. **Rollout** — feature flag recommendation, rollout strategy, key metrics

---

## Spec to Plan

> **Spec file**: `[SPEC_FILE_PATH]`
>
> Read the spec at this path. Then generate a complete implementation plan for it following the template and the portal context above.

