# Specify Prompt — The Burkes Group Admin Portal

## Purpose

Use this prompt to generate or update a feature specification for the Burkes Group Admin Portal. This prompt is pre-loaded with portal context so you do not need to re-explain the product to Copilot.

---

## Instructions for Use

1. Open this file in GitHub Copilot Chat.
2. Replace `[FEATURE DESCRIPTION]` at the bottom with your feature description.
3. Run the prompt.

---

## Portal Context

You are writing specifications for **The Burkes Group Admin Portal** — a single-page web portal used by real estate agents to manage client transactions, documents, communications, appointments, partner referrals, and performance analytics.

### Existing Screens (already specified — do not re-specify these)

| ID | Screen | Spec File |
|----|--------|-----------|
| 000 | Foundation (global nav, tokens, roles) | `.specify/specs/000-foundation/spec.md` |
| 001 | Dashboard | `.specify/specs/001-dashboard/spec.md` |
| 002 | Transactions | `.specify/specs/002-transactions/spec.md` |
| 003 | Documents | `.specify/specs/003-documents/spec.md` |
| 004 | Clients | `.specify/specs/004-clients/spec.md` |
| 005 | Messages | `.specify/specs/005-messages/spec.md` |
| 006 | Calendar | `.specify/specs/006-calendar/spec.md` |
| 007 | Partner Referrals | `.specify/specs/007-partner-referrals/spec.md` |
| 008 | Reports & Analytics | `.specify/specs/008-reports/spec.md` |

### Canonical Roles (from constitution)

- **Real Estate Agent (AG)**: Primary portal user; manages transactions, clients, documents
- **Admin / Transaction Coordinator (TC)**: Approves stage updates; access to all transactions
- **Client (CL)**: Buyer/seller; own data only; read-only stage visibility
- **Mortgage Lender (LN)**: Linked transactions; mortgage documents
- **Closing Attorney (AT)**: Linked transactions; legal documents
- **CPA / Tax Advisor (CP)**: Linked transactions; read-only document access

### Key Constraints (from constitution)

- Specs must be technology-agnostic (no framework, API, or database names).
- All monetary values are USD.
- All status badges must use the canonical badge system (active, pending, completed).
- Every meaningful state change must produce an activity log entry.
- No feature may hard-lock navigation when data is incomplete.
- Stage updates from agents require admin (TC) approval.

---

## Template to Follow

Use the spec template at `.specify/templates/spec-template.md`. Produce a complete spec with all mandatory sections filled. Assign the next available feature ID in sequence (check existing specs in `.specify/specs/`).

---

## What to Specify

> **[FEATURE DESCRIPTION]**
>
> Replace this line with your feature description. Be as detailed or as brief as you like — the prompt will fill in reasonable defaults for anything not specified. Examples:
> - "Add a notification preferences screen where the agent can manage alert settings"
> - "Add an admin panel for transaction coordinators to approve/reject stage updates"
> - "Add a commission calculator tool that estimates agent earnings per transaction"

