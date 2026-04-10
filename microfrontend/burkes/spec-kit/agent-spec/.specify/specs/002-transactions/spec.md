# Feature Specification: Transactions

**Feature ID**: 002-transactions
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Transactions — full transaction management screen

---

## Overview

The Transactions screen is the agent's authoritative list of all real estate transactions — active, pending, and completed. It provides filtering and search, a full transaction table with stage badges and action buttons, and the ability to create new transactions (via modal) or update transaction stages (pending admin approval). The screen is the operational heart of the agent's workflow.

---

## Problem Statement

Agents managing multiple transactions simultaneously need a single place to see all deal status, filter by stage or type, take action on individual transactions, and create new ones. Without this, agents lose track of deals in progress and cannot efficiently move transactions through the 12-stage lifecycle.

---

## Goals

- Present all agent transactions in a sortable, filterable table with key deal information.
- Allow agents to filter by status, transaction type, and stage.
- Allow agents to search transactions by client name, property address, or transaction ID.
- Allow agents to view full transaction details via modal.
- Allow agents to submit stage update requests (pending admin approval) via modal.
- Allow agents to create new transactions via a structured modal form.

---

## Non-Goals

- Agents cannot approve their own stage updates — that is an admin/TC function.
- The Transactions screen does not manage document uploads (spec 003).
- It does not show client profile details (spec 004).

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Agent (AG) | Creates transactions, views all own transactions, submits stage updates |
| Admin (TC) | Approves or rejects stage update requests |

---

## User Scenarios

### Scenario 1 — Agent Reviews Full Transaction List

**Actor**: Agent
**Precondition**: Agent is authenticated with 5 transactions (4 active, 1 completed).
**Flow**:
1. Agent navigates to Transactions via the top nav.
2. All 5 transactions render in the table.
3. Agent uses the Status filter to select "Delayed" — table filters to show TRX-10156 only.
4. Agent resets filter to "All Statuses" — full list returns.

**Success**: Filters apply immediately without page reload; table state is consistent.

---

### Scenario 2 — Agent Creates a New Transaction

**Actor**: Agent
**Precondition**: A new buyer client (already in the Clients list) has signed a purchase agreement.
**Flow**:
1. Agent clicks "+ New Transaction" in the filter bar.
2. New Transaction modal opens.
3. Agent selects the client from the dropdown, selects type "Purchase," enters property address, contract amount, stage, and expected closing date.
4. Agent optionally adds mortgage lender and attorney names.
5. Agent adds internal notes and clicks "Create Transaction."
6. Modal closes; new transaction appears in the table with a generated TRX-NNNNN ID.
7. Activity event written: "New Transaction Created – [Property Address]."

**Success**: Transaction is created and immediately visible in the table; activity log updated.

---

### Scenario 3 — Agent Submits a Stage Update Request

**Actor**: Agent
**Precondition**: Transaction TRX-10247 is at "Attorney / Title Review" and is ready for the next stage.
**Flow**:
1. Agent clicks "Update Stage" button on the TRX-10247 row.
2. Update Stage modal opens; "Current Stage" field shows "Attorney / Title Review" (read-only).
3. Agent selects "Closing Preparation" from the New Stage dropdown.
4. Agent enters reason: "All attorney review items resolved. Ready for closing prep."
5. Agent clicks "Submit for Approval."
6. Modal closes; a confirmation alert appears: "Stage update submitted for admin approval."
7. Activity event written: "Stage Update Requested – TRX-10247 → Closing Preparation."

**Success**: Stage update is submitted; agent is notified it is pending approval; admin receives notification.

---

## Functional Requirements

### FR-02-01 — Filter Bar

The filter bar must appear above the transactions table and contain:

- Label: "Filter by:"
- **Status** dropdown with options: All Statuses, On Track, Closing Soon, Delayed, At Risk, Completed.
- **Type** dropdown with options: All Types, Purchase, Sale.
- **Stage** dropdown with all 12 canonical stages:
  - Initial Consultation
  - Property Search / Listing
  - Offer / Negotiation
  - Under Contract
  - Mortgage Application / Pre-Approval
  - Insurance Information / Documentation
  - Attorney / Title Company Review
  - Inspection / Appraisal
  - Closing Preparation
  - Mortgage Underwriting / Final Approval
  - Final Walkthrough / Document Signing
  - Completed
- **Search bar** with 🔍 icon prefix and placeholder "Search transactions..."
- **"+ New Transaction"** `.btn-primary` button (right-aligned).

### FR-02-02 — Transactions Table

- Columns (left to right): Transaction ID, Client Name, Property Address, Transaction Type, Contract Amount, Stage, Closing Date, Status, Actions.
- Transaction ID cells must render in `font-weight: 700`, `color: accent-blue`.
- Stage and Status cells use `.table-status` badges.
- Actions column for active transactions: "View" button (`.table-action-btn`) + "Update Stage" button (`.table-action-btn.stage`).
- Actions column for completed transactions: "View" button only (`.table-action-btn.secondary`).

**Reference Rows (from agent.html)**:

| ID       | Client              | Property                                         | Type              | Amount   | Stage                        | Closing     | Status       |
|----------|---------------------|--------------------------------------------------|-------------------|----------|------------------------------|-------------|--------------|
| TRX-10247 | John Smith         | 123 Main Street, The Woodlands, TX 77380         | Purchase          | $485,000 | Attorney / Title Review      | Feb 15, 2026| Closing Soon |
| TRX-10198 | Sarah Williams     | 789 Pine Road, The Woodlands, TX 77381           | Sale              | $389,500 | Under Contract               | Mar 1, 2026 | On Track     |
| TRX-10156 | Michael Brown      | 789 Pine Road, The Woodlands, TX 77381           | Purchase          | $512,000 | Inspection / Appraisal       | Mar 8, 2026 | Delayed      |
| TRX-10134 | Johnson vs. Johnson| 456 Oak Avenue, The Woodlands, TX 77380          | Divorce–Asset Split | —      | Offer / Negotiation          | Mar 20, 2026| On Track     |
| TRX-10089 | Lisa Anderson      | 654 Maple Drive, Tomball, TX 77375               | Sale              | $467,500 | Completed                    | Dec 20, 2025| Completed    |

- Stage badges: TRX-10247 and TRX-10198 → `active`; TRX-10156 → `pending`; TRX-10134 → `active`; TRX-10089 → `completed`.
- Status badges: TRX-10247 Closing Soon → `active`; TRX-10198 On Track → `active`; TRX-10156 Delayed → `pending`; TRX-10134 On Track → `active`; TRX-10089 Completed → `completed`.

### FR-02-03 — New Transaction Modal

Modal title: "New Transaction." Subtitle: "Create a new real estate transaction and link it to a client."

**Section 1 — 👤 Client & Transaction Information**
- "Select Client" dropdown (required): all clients in the agent's client list (John Smith, Sarah Williams, Michael Brown, Michael Brown, Lisa Anderson).
- "Transaction Type" dropdown (required): 🏠 Purchase, 🏘️ Sale, 💰 Refinance.

**Section 2 — 🏠 Property Details**
- "Property Address" text input (required): placeholder "123 Main Street, The Woodlands, TX 77380."
- "Contract Amount" number input (required): placeholder "485000"; help text "Enter amount in USD (without $ symbol)."
- "Transaction Stage" dropdown (required): all 12 canonical stages.
- "Expected Closing Date" date input (optional).

**Section 3 — 👥 Involved Parties (Optional)**
- "Mortgage Lender" text input: placeholder "James Carter – First National Bank Home Mortgage."
- "Attorney" text input: placeholder "Sarah Mitchell, Esq. – Mitchell Law Group."
- "Title Company / Insurance Notes" text input.

**Section 4 — 📝 Internal Notes**
- "Transaction Notes" textarea: placeholder "Key deal terms, contingencies, timelines, special conditions..."; help text "Internal notes visible only to agents and admin."

Footer: "Cancel" (`.btn-secondary`) + "Create Transaction" (`.btn-primary`).

Validation: Client, Transaction Type, Property Address, and Contract Amount are required. Show native browser validation on submit attempt.

### FR-02-04 — Update Stage Modal

Modal title: "Update Transaction Stage." Subtitle: "Submits to admin for approval." Max-width: 600px.

**Section — 📊 Stage Update**
- "Current Stage" text input (read-only, `neutral-100` background): auto-populated from the clicked row.
- "New Stage" dropdown (required): all 12 canonical stages.
- "Reason for Update" textarea (required): placeholder "e.g. All inspections passed. Financing confirmed. Ready for closing prep."; help text "Admin will review this before approving the stage change."

Footer: "Cancel" (`.btn-secondary`) + "Submit for Approval" (`.btn-primary`).

Validation: Both New Stage and Reason are required. If either is empty, show alert ("Please select the new stage." / "Please provide a reason for this update.").

On submit: show alert "Stage update submitted for admin approval. You will be notified once approved." and close modal.

### FR-02-05 — Transaction Detail Modal (reused from 001)

Clicking "View" opens the shared transaction detail modal defined in FR-01-04. When triggered from the Transactions table, the modal must additionally display the Transaction ID (e.g., TRX-10247).

---

## Data & State

| Field                        | Type    | Description                                           |
|------------------------------|---------|-------------------------------------------------------|
| `transactions[]`             | array   | Full list of agent's transactions                     |
| `transaction.id`             | string  | Format `TRX-NNNNN`                                    |
| `transaction.client_name`    | string  | Full client name                                      |
| `transaction.property_address` | string| Full street address                                   |
| `transaction.type`           | string  | `purchase`, `sale`, `refinance`, `divorce-asset-split`|
| `transaction.amount`         | number  | Contract amount in USD (null for divorce-asset-split) |
| `transaction.stage`          | string  | One of 12 canonical stage names                       |
| `transaction.closing_date`   | date    | Expected closing date                                 |
| `transaction.status`         | string  | `on-track`, `closing-soon`, `delayed`, `at-risk`, `pending`, `completed` |
| `stage_update.new_stage`     | string  | Requested new stage                                   |
| `stage_update.reason`        | string  | Agent-provided reason for stage change                |
| `stage_update.status`        | string  | `pending-approval`, `approved`, `rejected`            |

---

## Edge Cases & Error States

- **Transaction amount is null (divorce/asset split)**: Display "—" in the Contract Amount cell.
- **No transactions found after filtering**: Show empty state row "No transactions match your filters."
- **Stage update submitted but admin rejects it**: Agent receives notification; current stage remains unchanged; activity log records the rejection.
- **New transaction form submitted with duplicate property address**: Warn agent ("A transaction for this address may already exist") but allow submission.

---

## Success Criteria

1. All 5 reference transactions render correctly with correct badge colours and action buttons.
2. Filters reduce the visible rows correctly (each filter combination produces expected results).
3. Search returns matching rows for client name, property address, and transaction ID lookups.
4. New Transaction modal validates required fields and creates the transaction on valid submission.
5. Update Stage modal reads the current stage from the correct table row and validates required fields.
6. Stage update confirmation message appears after submit; modal closes.
7. Transaction Detail modal shows correct data for each row.

---

## Open Questions

1. Should the agent be able to set stage updates for completed transactions (to retroactively correct them)?
2. Is the "divorce-asset-split" transaction type intended to be a permanent type or a legacy entry?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, modal pattern, badge system)
- **Depends on**: 004-clients (client dropdown populated from Clients list)
- **Cross-links**: 003-documents (documents associated with a transaction), 005-messages (messaging from transaction modal)
