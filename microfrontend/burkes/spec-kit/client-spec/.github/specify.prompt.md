# Specify Prompt — The Burkes Group Client Portal

## Purpose

Use this prompt to generate or update a feature specification for the Burkes Group Client Portal. This prompt is pre-loaded with portal context so you do not need to re-explain the product to Copilot.

---

## Instructions for Use

1. Open this file in GitHub Copilot Chat.
2. Replace `[FEATURE DESCRIPTION]` at the bottom with your feature description.
3. Run the prompt.

---

## Portal Context

You are writing specifications for **The Burkes Group Client Portal** — a single-page web portal used by homebuyers to manage their real estate transaction from offer acceptance through closing day.

### Existing Screens (already specified — do not re-specify these)

| ID | Screen | Spec File |
|----|--------|-----------|
| 000 | Foundation (global nav, tokens, roles) | `.specify/specs/000-foundation/spec.md` |
| 001 | Dashboard | `.specify/specs/001-dashboard/spec.md` |
| 002 | Documents | `.specify/specs/002-documents/spec.md` |
| 003 | Messages | `.specify/specs/003-messages/spec.md` |
| 004 | Insurance | `.specify/specs/004-insurance/spec.md` |
| 005 | Mortgage Application | `.specify/specs/005-mortgage/spec.md` |
| 006 | Partner Services | `.specify/specs/006-services/spec.md` |

### Canonical Roles (from constitution)

- **Client (CL)**: Primary portal user (buyer)
- **Real Estate Agent (AG)**: Uploads purchase docs; messages client
- **Mortgage Lender (LN)**: Receives mortgage app; uploads financial docs
- **Closing Attorney (AT)**: Reviews and uploads legal/closing docs
- **CPA / Tax Advisor (CP)**: Read-only document access; messages client
- **Transaction Coordinator (TC)**: Admin; manages portal setup

### Key Constraints (from constitution)

- Specs must be technology-agnostic (no framework, API, or database names).
- All monetary values are USD.
- All status badges must use the canonical badge colour system (see foundation spec).
- Every meaningful state change must produce an activity log entry.
- No feature may hard-lock navigation when data is incomplete.

---

## Template to Follow

Use the spec template at `.specify/templates/spec-template.md`. Produce a complete spec with all mandatory sections filled. Assign the next available feature ID in sequence (check existing specs in `.specify/specs/`).

---

## What to Specify

> **[FEATURE DESCRIPTION]**
>
> Replace this line with your feature description. Be as detailed or as brief as you like — the prompt will fill in reasonable defaults for anything not specified. Examples:
> - "Add a closing day checklist that the client can mark items off as they prepare for closing"
> - "Add a notification preferences screen where the client can choose how they receive alerts"
> - "Add a document request feature so professionals can formally request specific documents from the client"
