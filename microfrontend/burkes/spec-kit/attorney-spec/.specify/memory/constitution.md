# Project Constitution — The Burkes Group Attorney Portal

**Version**: 1.0
**Last Updated**: 2026-04-12
**Scope**: All feature specifications under `.specify/specs/`

---

## 1. Product Identity

**Product Name**: The Burkes Group — Attorney Portal
**Domain**: Residential real estate closing verification and compliance
**Primary User**: Closing Attorney (AT) verifying transaction amounts, reviewing legal documents, managing client cases, and ensuring closing compliance.
**Operator**: The Burkes Group real estate brokerage.

---

## 2. Core Principles

These principles govern every feature specification in this project. Any requirement that conflicts with them must be flagged and resolved before planning.

### P-01 — Attorney-First Clarity
Every screen must answer the question: *"What requires my verification right now?"* within 60 seconds of the attorney loading it. Ambiguous status, hidden actions, or buried CTAs are specification defects.

### P-02 — Single Source of Truth
The portal is the authoritative record for transaction verification status, documents, client profiles, and closing compliance. No feature may require the attorney to cross-reference external email, spreadsheets, or phone calls to determine verification status.

### P-03 — Role-Scoped Access
The Attorney Portal is scoped to the attorney role (AT). The attorney sees only transactions assigned to them. Verification decisions (approve, flag, reject) are attorney-exclusive actions.

### P-04 — Progressive Disclosure
Complex workflows (verification confirmation, flagging discrepancies, report generation) use stepped modal forms. The attorney sees only what is required at each step; advanced options are revealed progressively.

### P-05 — Graceful Incompleteness
The portal must never block navigation because a form is incomplete. Incomplete state is communicated via badges, banners, and progress indicators — never via hard locks.

### P-06 — Technology-Agnostic Specification
Specifications describe *what* the system does and *why*, never *how* it is implemented. No framework names, API names, database technologies, or code patterns belong in a spec.

### P-07 — Audit-Visible Activity
Every meaningful state change (document approved, amount verified, discrepancy flagged, client created, report generated) must produce a visible activity log entry.

---

## 3. Actors & Permission Matrix

| Actor                   | Abbrev | Transactions | Documents   | Clients | Verification     | Reports |
|-------------------------|--------|--------------|-------------|---------|------------------|---------|
| Closing Attorney        | AT     | Assigned only| Review all, Upload legal | Own     | Verify, Flag, Approve | Own data |
| Admin / TC              | TC     | All          | Any         | All     | Read-only        | All     |
| Real Estate Agent       | AG     | Own only     | Upload P&S  | Own     | Read-only        | None    |
| Client (Buyer/Seller)   | CL     | Own only     | Own uploads | Own     | Read-only        | None    |
| Mortgage Lender         | LN     | Linked only  | Mortgage    | None    | None             | None    |
| CPA / Tax Advisor       | CP     | Linked only  | Read-only   | None    | None             | None    |

---

## 4. Verification Lifecycle — 5 Steps

All screen specifications must treat the following as the canonical verification pipeline. Step numbers are fixed.

| # | Step Name          | Owner Role | Status Variants                    |
|---|--------------------|------------|-------------------------------------|
| 1 | Docs Received      | AG         | completed / pending                 |
| 2 | Agent Reviewed     | AG         | completed / pending                 |
| 3 | Attorney Review    | AT         | in-progress / completed / pending   |
| 4 | Title Company      | AT + TC    | in-progress / completed / pending   |
| 5 | Closing            | AT + AG    | scheduled / completed / pending     |

---

## 5. Transaction Status Labels

| Label              | Description                                          |
|--------------------|------------------------------------------------------|
| Needs Verification | Awaiting attorney review of closing amounts           |
| In Progress        | Attorney is actively reviewing                        |
| Verified           | All amounts confirmed accurate by attorney            |
| Flagged            | Discrepancy identified; closing paused                |
| Completed          | Transaction closed successfully                       |
| Split Pending      | Asset split awaiting approval (divorce cases)         |

---

## 6. Reference Data — Active Transactions (Source from attorney.html)

The following transactions represent the canonical seed data for the reference implementation:

| Transaction ID | Client Name    | Property Address                              | Type     | Amount    | Closing Date | Attorney Status      |
|---------------|----------------|-----------------------------------------------|----------|-----------|--------------|----------------------|
| TRX-10247     | John Smith     | 123 Main Street, The Woodlands, TX 77380      | Purchase | $485,000  | Feb 15, 2026 | Needs Verification   |
| TRX-10198     | Sarah Williams | 789 Pine Road, The Woodlands, TX 77381        | Sale     | $389,500  | Mar 1, 2026  | In Progress          |
| TRX-10156     | Michael Brown  | 321 Elm Street, Spring, TX 77382              | Purchase | $512,000  | Mar 8, 2026  | In Progress          |
| TRX-10089     | Lisa Anderson  | 654 Maple Drive, Tomball, TX 77375            | Sale     | $467,500  | Feb 15, 2026 | Completed            |

---

## 7. Reference Data — Clients (Source from attorney.html)

| Client Name    | Email                        | Role in Transaction | Property Address                         | Type     | Property Value |
|----------------|------------------------------|---------------------|------------------------------------------|----------|---------------|
| John Smith     | john.smith@gmail.com         | Closing Attorney    | 123 Main Street, The Woodlands, TX 77380 | Purchase | $485,000      |
| Sarah Williams | sarah.williams@gmail.com     | Closing Attorney    | 789 Pine Road, The Woodlands, TX 77381   | Sale     | $389,500      |
| Michael Brown  | michael.brown@gmail.com      | Closing Attorney    | 789 Pine Road, The Woodlands, TX 77381   | Purchase | $512,000      |
| Lisa Anderson  | lisa.anderson@burkesgroup.com| Closing Attorney    | 654 Maple Drive, Tomball, TX 77375       | Sale     | $467,500      |

---

## 8. Reference Data — Documents (Source from attorney.html)

| Document Name                         | Category                  | Transaction             | Date         | Status       |
|---------------------------------------|---------------------------|-------------------------|--------------|--------------|
| Purchase & Sales Agreement – Smith    | Purchase Agreement        | TRX-10247               | Feb 1, 2026  | Needs Review |
| Closing Disclosure – Smith            | Closing Disclosure        | TRX-10247               | Feb 5, 2026  | Needs Review |
| Mortgage Documents – Brown            | Mortgage Documents        | TRX-10156               | Feb 8, 2026  | Under Review |
| Title Commitment – Smith              | Title Documents           | TRX-10247               | Feb 6, 2026  | Approved     |
| Purchase Agreement – Williams         | Purchase Agreement        | TRX-10198               | Feb 10, 2026 | Under Review |

---

## 9. Reference Data — Verification Details (Source from attorney.html)

### TRX-10247 — Smith Purchase

| Field          | Value      |
|---------------|------------|
| Sale Price    | $485,000   |
| Loan Amount   | $388,000   |
| Down Payment  | $97,000    |
| Closing Costs | $14,200    |
| Cash to Close | $111,200   |
| Closing Date  | Feb 15, 2026 |
| Lender        | First National Bank — James Carter |
| Agent         | Sarah Anderson |

### TRX-10156 — Brown Purchase

| Field          | Value      |
|---------------|------------|
| Sale Price    | $512,000   |
| Loan Amount   | ~$409,600  |
| Closing Date  | Mar 8, 2026 |
| Lender        | First National Bank — James Carter |
| Agent         | Sarah Anderson |

---

## 10. Dashboard KPI Reference (Source from attorney.html)

| KPI                     | Value | Description            |
|-------------------------|-------|------------------------|
| Active Transactions     | 12    | ↑ 2 from last month   |
| Pending Verification    | 3     | Requires attention     |
| Asset Splits            | 2     | 2 awaiting approval    |
| Total Value Managed     | $2.1M | Across all cases       |

---

## 11. Activity Log Event Types

| Event Type              | Icon | Description                                          |
|-------------------------|------|------------------------------------------------------|
| document_uploaded       | 📄   | A document was uploaded to a transaction             |
| review_started          | ✅   | Attorney began reviewing a transaction               |
| client_added            | 📝   | New client case was opened                           |
| message_received        | 💬   | Message received from another party                  |
| transaction_verified    | ✅   | Attorney confirmed all amounts as accurate           |
| discrepancy_flagged     | 🚩   | Attorney flagged a discrepancy                       |
| document_approved       | ✅   | Attorney approved a document                         |
| document_rejected       | ❌   | Attorney rejected a document with reason             |
| report_generated        | 📊   | Verification report was generated                    |

---

## 12. Global Data Vocabulary

All feature specs must use these canonical field names:

- **transaction_id** — format `TRX-NNNNN`; unique identifier for a transaction
- **property_address** — full street address of the property
- **client_name** — full name of the buyer or seller
- **transaction_type** — one of: `purchase`, `sale`, `divorce-asset-split`
- **transaction_status** — one of: `needs-verification`, `in-progress`, `verified`, `flagged`, `completed`, `split-pending`
- **document_status** — one of: `approved`, `under-review`, `needs-review`, `urgent`
- **document_category** — one of: `purchase-agreement`, `closing-disclosure`, `mortgage-documents`, `title-documents`, `divorce-agreement`, `court-order`, `legal-documents`
- **verification_status** — one of: `pending`, `verified`, `flagged`, `disputed`
- **discrepancy_type** — one of: `incorrect-sale-price`, `loan-amount-mismatch`, `missing-document`, `closing-cost-error`, `other`

---

## 13. Design & UX Constraints

- **Navigation**: Sticky top nav, 5 items (Dashboard, Transactions, Documents, Clients, Verification), active item highlighted
- **Colour System**: Primary Navy `#1a3a52`, Primary Gold `#fdb913`, Accent Blue `#2d5a7b`, Success Green `#10b981`, Warning Orange `#f59e0b`, Error Red `#ef4444`, Neutrals `#fafafa`–`#262626`
- **Typography**: Archivo (headings, labels, stat values), Manrope (body, UI controls, buttons)
- **Breakpoints**: Full layout ≥ 1200 px; two-column collapses to one ≥ 768 px; single-column mobile below 768 px
- **Shadow tokens**: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- **Border radius**: Cards `12px`, buttons `8px`, badges `6px`, inputs `8px`
