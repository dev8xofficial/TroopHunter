# Plan Prompt — The Burkes Group Service Partner Portal

## Purpose

Use this prompt to generate an implementation plan for a specified feature. The plan translates a completed `spec.md` into phased, architect-level implementation guidance using the portal's established patterns.

---

## Portal Context

You are planning implementation for **The Burkes Group Service Partner Portal** — a single-page web portal for home service providers. The following shared infrastructure already exists and must be reused, not re-built:

### Established Shared Infrastructure

| Component | What it provides |
|-----------|-----------------|
| Global navigation | Sticky top nav, 8-screen switching, active state, notification bell, user chip, partner badge |
| Design token system | Colours, typography (Archivo/Manrope), shadows, spacing |
| Badge system | Canonical badge variants (new, contacted, quoted, scheduled, completed, declined, processing, paid) |
| Card component | Standard card with card-header / card body |
| Activity log | Append-only event feed consumed by Dashboard |
| Session context | Partner identity + company + service categories |
| Filter section | Filter dropdowns + search bar pattern |

### Spec Dependencies

Before planning, read the spec file at `[SPEC_FILE_PATH]` and identify:
1. All `Depends on` specs listed in the Dependencies section.
2. Any data entities the plan introduces.
3. All integration points with existing screens.

---

## Template to Follow

Use the plan template at `.specify/templates/plan-template.md`.

---

## Spec to Plan

> **Spec file**: `[SPEC_FILE_PATH]`
