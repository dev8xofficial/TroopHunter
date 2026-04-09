# Project Constitution — The Burkes Group Client Portal

**Version**: 1.0
**Last Updated**: 2026-04-09
**Scope**: All feature specifications under `.specify/specs/`

---

## 1. Product Identity

**Product Name**: The Burkes Group — Client Portal
**Domain**: Residential real estate transaction management
**Primary User**: Homebuyer (Client) navigating a purchase transaction from offer acceptance through closing day.
**Operator**: The Burkes Group real estate brokerage and its affiliated transaction team.

---

## 2. Core Principles

These principles govern every feature specification in this project. Any requirement that conflicts with them must be flagged and resolved before planning.

### P-01 — Client-First Clarity
Every screen must answer the question: *"What do I need to do right now?"* within 60 seconds of the client loading it. Ambiguous status, hidden actions, or buried CTAs are specification defects.

### P-02 — Single Source of Truth
The portal is the authoritative record for transaction status, documents, and communications. No feature may require the client to cross-reference external email threads, PDF attachments outside the portal, or phone calls to determine their transaction status.

### P-03 — Role-Scoped Access
Every piece of data in the portal has an owning role. Clients write their own data (mortgage forms, insurance forms, uploaded personal documents). Professionals write to their own category. No role may overwrite another role's uploaded content without an explicit audit trail.

### P-04 — Progressive Disclosure
Complex workflows (mortgage application, insurance collection) are broken into sequenced sections. The client sees only what is required next; completed sections are collapsed but remain editable.

### P-05 — Graceful Incompleteness
The portal must never block navigation because a form is incomplete. Incomplete state is communicated via badges, banners, and progress indicators — never via hard locks that prevent accessing other screens.

### P-06 — Technology-Agnostic Specification
Specifications describe *what* the system does and *why*, never *how* it is implemented. No framework names, API names, database technologies, or code patterns belong in a spec. These are planning and implementation concerns.

### P-07 — Audit-Visible Activity
Every meaningful state change (document upload, signature, data save, message sent, access granted) must produce a visible activity log entry accessible to the client.

---

## 3. Actors & Permission Matrix

| Actor | Abbrev | Can Upload Docs | Can Message | Can Edit Forms | Portal Admin |
|-------|--------|----------------|-------------|----------------|--------------|
| Client (Buyer) | CL | Insurance, Financial | ✓ (receive + send) | Own forms only | ✗ |
| Real Estate Agent | AG | Purchase & Sale | ✓ (receive + send) | ✗ | ✗ |
| Mortgage Lender | LN | Mortgage & Financial | ✓ (receive + send) | ✗ | ✗ |
| Closing Attorney | AT | Legal & Closing | ✓ (receive + send) | ✗ | ✗ |
| CPA / Tax Advisor | CP | ✗ (read-only) | ✓ (receive + send) | ✗ | ✗ |
| Transaction Coordinator | TC | Any | ✓ (broadcast) | ✓ (admin) | ✓ |

---

## 4. Transaction Lifecycle — 11 Stages

All screen specifications must treat the following as the canonical stage sequence. Stage numbers are fixed and must not be renumbered by individual feature specs.

| # | Stage Name | Owner Role | Status Variants |
|---|-----------|------------|-----------------|
| 1 | Initial Consultation | AG | completed / pending |
| 2 | Property Search & Selection | AG | completed / pending |
| 3 | Offer Submitted & Accepted | AG | completed / pending |
| 4 | Under Contract — Document Collection | AG | completed / pending |
| 5 | Mortgage Application & Pre-Approval | LN + CL | in-progress / completed / pending |
| 6 | Insurance Information & Documentation | CL | in-progress / completed / pending |
| 7 | Attorney & Title Company Review | AT | in-progress / completed / pending |
| 8 | Home Inspection & Appraisal | AG | scheduled / completed / pending |
| 9 | Mortgage Underwriting & Final Approval | LN | in-progress / completed / pending |
| 10 | Final Walkthrough & Document Signing | CL + AT | scheduled / completed / pending |
| 11 | Closing Day | AT | target / completed |

---

## 5. Global Data Vocabulary

All feature specs must use these canonical field names when referencing shared entities. Diverging names in a spec are a defect.

- **transaction_id** — unique identifier for the purchase transaction
- **property_address** — full street address of the property
- **client_name** — full legal name of the buyer
- **document_status** — one of: `needs-signature`, `under-review`, `approved`
- **insurance_status** — one of: `not-started`, `pending`, `completed`
- **application_section_status** — one of: `not-started`, `in-progress`, `complete`
- **message_thread_id** — unique identifier for a two-party conversation
- **role_colour** — canonical colour assigned per role (agent=indigo, lender=blue, attorney=purple, client=green, cpa=amber)

---

## 6. Design & UX Constraints

These constraints apply to all screens. Implementation must honour them; specifications must not contradict them.

- **Navigation**: Sticky top nav, max 6 items, active item highlighted.
- **Colour System**: Primary Navy `#1a3a52`, Primary Gold `#fdb913`, Accent Blue `#2d5a7b`, Success Green `#10b981`, Warning Orange `#f59e0b`, Error Red `#ef4444`.
- **Typography**: Archivo (headings, labels), Manrope (body, UI controls).
- **Breakpoints**: Full layout ≥ 1100 px; two-column collapses to one ≥ 768 px; single-column mobile below 768 px.
- **Badges**: Colour-coded status badges are required on every status field. Colours map: green = complete/approved, amber = in-progress/pending, blue = action-required, grey = not-started, red = error/overdue.
- **Alert Banners**: Action-required items surface as top-of-screen alert banners with direct navigation CTAs. Info-only items use a blue info variant.
- **Cards**: All content panels use the standard card component (white background, 12 px border-radius, medium shadow, 1 px neutral-200 border).

---

## 7. Assumptions Applicable to All Specs

1. A single authenticated session covers all screens; per-screen authentication is not required.
2. All dates are displayed in the client's local timezone.
3. File uploads are limited to: PDF, Word (.docx), JPEG, PNG; maximum 25 MB per file.
4. All monetary values are in USD.
5. The portal supports a single active transaction per client account at this time.
6. Real-time features (typing indicators, live status updates) are desirable but degrade gracefully if the connection is interrupted.
7. E-signature functionality (triggered by "Sign Now") is delegated to a third-party provider; the portal handles navigation to and from that provider.

---

## 8. Out of Scope for All Specs

- Agent-side, lender-side, or attorney-side portal views.
- MLS property search or listing data.
- Payment processing or wire transfer functionality.
- Native mobile applications (iOS / Android).
- Multi-language (i18n) support.
- Back-office CRM, commission tracking, or brokerage reporting.
