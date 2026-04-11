# Feature Specification: Transactions Management

**Feature ID**: 004-transactions
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Transactions — platform-wide transaction oversight and management

---

## Overview

The Transactions Management screen provides administrators with a complete view of all real estate transactions across all agents and clients. It includes aggregate statistics, multi-dimensional filtering by stage/type/status, a comprehensive transaction table, a collapsible pending approvals section for attorney verifications and stage update requests, the ability to create new transactions, and modals to view or edit individual transaction records.

---

## Problem Statement

Real estate transactions involve multiple parties, span weeks or months, and require administrative oversight at key milestones — particularly stage update approvals and document verifications. Without a centralised admin transaction view, coordinators cannot efficiently monitor the pipeline, respond to approval requests, or intervene when transactions fall behind schedule.

---

## Goals

- Present all transactions across all agents in a filterable, searchable table.
- Surface pending approval requests prominently so admins can action them quickly.
- Show aggregate transaction statistics (active, closing soon, delayed, completed, total value).
- Allow admins to create new transactions and assign them to agents.
- Allow admins to view and edit any transaction record directly.

---

## Non-Goals

- The Transactions screen does not manage document uploads (spec 005).
- Client-facing transaction status communication is a Client Portal concern.
- Financial settlement or commission calculations are out of scope for v1.

---

## Actors

| Actor              | Role in This Feature                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Administrator (TC) | Views all transactions; creates transactions; approves/rejects stage update requests; edits transaction records |

---

## User Scenarios

### Scenario 1 — Admin Reviews Pending Attorney Verification

**Actor**: Administrator
**Precondition**: Attorney Sarah Mitchell has submitted a verification for TRX-10247.
**Flow**:

1. Admin navigates to Transactions.
2. "Pending Approvals" collapsible section shows "3 URGENT" badge.
3. Admin clicks the header to expand the section.
4. Attorney Verification for TRX-10247 appears: property, amount, attorney notes.
5. Admin reviews: "All documents verified. Contract amounts match. Title is clear. Approved for closing."
6. Admin clicks "✅ Approve."
7. Stage proceeds; audit log records approval.

**Success**: Verification is approved; transaction moves forward; audit log updated.

---

### Scenario 2 — Admin Creates a New Transaction

**Actor**: Administrator
**Precondition**: Admin needs to create a transaction on behalf of an agent.
**Flow**:

1. Admin clicks "+ New Transaction" in the Transactions table header.
2. "Create New Transaction" modal opens.
3. Admin selects Agent: "Sarah Anderson – Lead Agent."
4. Admin selects Client: "John Smith."
5. Admin selects Type "🏠 Purchase," enters property address and contract amount.
6. Admin selects stage, sets closing date, adds attorney and lender.
7. Admin clicks "Create Transaction."
8. Transaction created with auto-approval (no secondary approval required for admin-created transactions).

**Success**: Transaction is created and visible in the table; assigned agent is notified.

---

### Scenario 3 — Admin Filters Transactions by Stage

**Actor**: Administrator
**Precondition**: 324 active transactions exist.
**Flow**:

1. Admin selects "Closing Preparation" from Filter by Stage dropdown.
2. Table reduces to transactions in that stage.
3. Admin identifies the delayed transaction and clicks "Edit" to update the status.

**Success**: Filter applies; admin can locate and act on specific transactions.

---

## Functional Requirements

### FR-04-01 — Page Header

- Title: "Transactions Management."
- Subtitle: "Monitor and manage all real estate transactions."

### FR-04-02 — Transaction Statistics Grid

- Six stat cards in `repeat(auto-fit, minmax(280px, 1fr))`.

**Reference Transaction Stats**:

| Label                  | Value | Description         | Icon |
| ---------------------- | ----- | ------------------- | ---- |
| Total Transactions     | 847   | All time            | 📋   |
| Active Transactions    | 324   | In progress         | 🔄   |
| Closing Soon           | 89    | Within 30 days      | ⏰   |
| Completed (This Month) | 47    | Successfully closed | ✅   |
| Delayed                | 12    | Behind schedule     | ⚠️   |
| Total Value            | $127M | Active transactions | 💰   |

### FR-04-03 — Pending Approvals Collapsible Section

- Card with `border-top: 4px solid warning-orange`.
- **Header** (always visible): gradient `#fffbeb → #fef3c7`, `border-bottom: 2px solid primary-gold`, `cursor: pointer`.
  - Toggle icon: ▶ (collapsed) or ▼ (expanded); rotates 90° on expand.
  - Title: ⏳ Pending Approvals + "3 URGENT" red badge (pulsing animation).
  - Subtitle: "Click to expand and review pending approvals."
  - Right controls: "Review All" `.btn-primary` (smaller, stops propagation) + filter select (All Requests / Attorney Verifications / Transaction Updates).
- **Content** (hidden by default, max-height animated): list of approval items.
- **Collapse/Expand**: click header → max-height transitions between 0px and 2000px; icon rotates.

**Reference Approval Item — Attorney Verification TRX-10247**:

- Left border: 6px `primary-gold`, `padding: 24px`, white background.
- Header: ⚖️ icon + "Attorney Verification: TRX-10247" (18px/700 `primary-navy`).
- Sub-detail: "123 Main Street, The Woodlands, TX 77380 • Purchase • $485,000."
- Type badge: "ATTORNEY VERIFICATION" (`primary-gold` background, `primary-navy` text).
- Notes box (`neutral-50`, `border-radius: 8px`, 14px): "All documents verified. Contract amounts match. Title is clear. Approved for closing."
- Actions: "✅ Approve" (`.btn-primary` green) + "❌ Reject" (`.btn-secondary`) + "👁️ View."
- Reject flow: clicking "❌ Reject" reveals a textarea for rejection reason before allowing the action.

### FR-04-04 — Filter Bar

- `grid-template-columns: 1fr 1fr 1fr 1fr auto`, `gap: 16px`.
- **Search Transactions**: placeholder "Search by address, client, ID..."
- **Filter by Stage**: All Stages + all 12 canonical stages.
- **Filter by Type**: All Types, Purchase, Sale, Refinance.
- **Filter by Status**: All Status, On Track, Closing Soon, Delayed, At Risk.
- **"Apply Filters"** `.btn-secondary`.

### FR-04-05 — Transactions Table

- Card header: "All Transactions" title + subtitle + "+ New Transaction" `.btn-primary` button (right-aligned).

**Columns**: Transaction ID, Client Name, Property Address, Transaction Type, Contract Amount, Stage, Closing Date, Status, Actions.

**Reference Transactions Table**:

| ID        | Client                         | Property                                 | Type Badge                            | Amount   | Stage Badge                          | Closing      | Status Badge                 | Actions        |
| --------- | ------------------------------ | ---------------------------------------- | ------------------------------------- | -------- | ------------------------------------ | ------------ | ---------------------------- | -------------- |
| TRX-10247 | John Smith                     | 123 Main Street, The Woodlands, TX 77380 | `badge-info` 🏠 Purchase              | $485,000 | `badge-warning` Closing Preparation  | Feb 15, 2026 | `badge-warning` Closing Soon | View · Edit    |
| TRX-10198 | Sarah Williams                 | 789 Pine Road, The Woodlands, TX 77381   | `badge-warning` 🏘️ Sale               | $389,500 | `badge-info` Under Contract          | Mar 1, 2026  | `badge-success` On Track     | View · Edit    |
| TRX-10156 | Michael Brown                  | 321 Elm Street, Spring, TX 77382         | `badge-info` 🏠 Purchase              | $512,000 | `badge-warning` Inspection/Appraisal | Mar 15, 2026 | `badge-error` Delayed        | View · Edit    |
| TRX-10134 | Robert Johnson / Emily Johnson | 456 Oak Avenue, The Woodlands, TX 77380  | `badge-purple` ⚖️ Divorce–Asset Split | —        | `badge-info` Offer/Negotiation       | Mar 20, 2026 | `badge-success` On Track     | View · Edit    |
| TRX-10089 | Lisa Anderson                  | 654 Maple Drive, Tomball, TX 77375       | `badge-neutral` 🏘️ Sale               | $467,500 | `badge-success` Completed            | Feb 15, 2026 | `badge-success` Completed    | View · Archive |

- Transaction ID: `font-weight: 700`, `color: accent-blue`.
- Property Address: `primary-navy`, `font-weight: 600` for active; `neutral-600` for completed.
- Contract Amount: `primary-navy` bold for active; `neutral-600` for completed.
- Completed row: `opacity: 0.85`.
- Divorce/asset split amount: "—".

### FR-04-06 — Pagination

- "Showing 1-5 of 324 active transactions."
- Page buttons: Previous · 1 (active) · 2 · 3 · … · 65 · Next.

### FR-04-07 — Create New Transaction Modal

- Title: "Create New Transaction"; subtitle: "Create and assign a new real estate transaction."

**Section 1 — 👥 Agent & Client Assignment**

- **Assign to Agent** (required, select): Sarah Anderson – Lead Agent, Marcus Webb – Senior Agent, Tanya Reeves – Agent. Help: "Select the agent who will manage this transaction."
- **Select Client** (required, select): John Smith, Sarah Williams, Michael Brown, Emily Davis, Robert Wilson. Help: "Select the client for this transaction."
- **Transaction Type** (required, select): 🏠 Purchase, 🏘️ Sale, 💰 Refinance.

**Section 2 — 🏠 Property Details**

- **Property Address** (required): full-width text input.
- **Contract Amount** (required, number) · **Transaction Stage** (required, select — all 12 stages): `form-row-2`.
- **Expected Closing Date** (date) · **Transaction Status** (select: On Track / Closing Soon / Delayed / At Risk): `form-row-2`.

**Section 3 — 👥 Involved Parties (Optional)**

- **Mortgage Lender** text · **Attorney** (select: Sarah Mitchell, David Wilson…): `form-row-2`.
- **Title Company / Insurance Notes** text: full width.

**Section 4 — 📝 Internal Notes**

- Notes textarea: "Visible to admin and the assigned agent only."

Footer: "Cancel" `.btn-secondary` + "Create Transaction" `.btn-primary`.

Note: Admin-created transactions are auto-approved and do not require additional approval.

### FR-04-08 — View/Edit Transaction Modal

- Max-width: 900px.
- Title: "View Transaction Details" / "Edit Transaction Details."

**Section 1 — 🏠 Property Information**: Property Address · Transaction Type (select, disabled) · Contract Amount · Transaction ID: `form-row-3` for last three.

**Section 2 — 👤 Client & Timeline**: Client Name · Closing Date (date input): `form-row-2`.

**Section 3 — 📊 Progress & Status**: Current Stage (select, disabled) · Transaction Status (select, disabled): `form-row-2`.

**Section 4 — 📝 Transaction Notes**: Internal Notes textarea (read-only by default).

Reference pre-filled values for TRX-10247:

- Address: "123 Main Street, The Woodlands, TX 77380"
- Type: Purchase
- Amount: $485,000
- ID: TRX-10247
- Client: John Smith
- Closing: 2026-02-28
- Stage: Initial Consultation (select default)
- Status: On Track
- Notes: "Attorney Sarah Mitchell reviewing closing disclosure. Lender James Carter (First National Bank) has confirmed final mortgage approval. All docs submitted. Expected to close Feb 15 on schedule."

Footer: "Close" `.btn-secondary` + "Enable Edit" `.btn-primary` / "Save Changes" `.btn-primary`.

---

## Data & State

| Field                          | Type    | Description                                                   |
| ------------------------------ | ------- | ------------------------------------------------------------- |
| `transactions[]`               | array   | All transactions across all agents                            |
| `transaction.id`               | string  | Format `TRX-NNNNN`                                            |
| `transaction.client_name`      | string  | Full client name                                              |
| `transaction.property_address` | string  | Full street address                                           |
| `transaction.type`             | string  | `purchase`, `sale`, `refinance`, `divorce-asset-split`        |
| `transaction.amount`           | number  | Contract amount in USD (null for divorce-asset-split)         |
| `transaction.stage`            | string  | One of 12 canonical stage names                               |
| `transaction.closing_date`     | date    | Expected closing date                                         |
| `transaction.status`           | string  | `on-track`, `closing-soon`, `delayed`, `at-risk`, `completed` |
| `pending_approvals[]`          | array   | Approval requests awaiting admin action                       |
| `approval.type`                | string  | `attorney-verification`, `stage-update`                       |
| `approval.transaction_id`      | string  | Associated transaction                                        |
| `approval.notes`               | string  | Submitted notes or reason                                     |
| `collapse.is_open`             | boolean | Whether the Pending Approvals section is expanded             |

---

## Edge Cases & Error States

- **Transaction amount is null (divorce/asset split)**: Display "—" in the Contract Amount cell.
- **No transactions after filtering**: Show empty state "No transactions match your filters."
- **Reject approval without reason**: Validation "Please provide a reason for rejection."
- **Create transaction without required fields**: Native browser validation on submit.

---

## Success Criteria

1. All 5 reference transactions render correctly with correct type badges, stage badges, status badges, and action buttons.
2. TRX-10089 (Completed) renders with reduced opacity and "Archive" action.
3. TRX-10134 (Divorce/Asset Split) shows "—" for Contract Amount.
4. Pending Approvals section expands/collapses with icon rotation and max-height animation.
5. Attorney Verification approval item shows notes, approve/reject buttons, and reject textarea flow.
6. Create New Transaction modal validates required fields and auto-approves on admin submission.
7. View/Edit modal populates with TRX-10247 reference data; toggles between read and edit mode.

---

## Open Questions

1. Should the admin be able to delete (not just archive) completed transactions?
2. Should the "3 URGENT" badge count update in real time?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, modal pattern, badge system, table pattern)
- **Cross-links**: 002-users (client and agent references), 005-documents (transaction-linked documents), 001-dashboard (pending approvals count)
