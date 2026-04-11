# Feature Specification: Verification

**Feature ID**: 005-verification
**Status**: approved
**Created**: 2026-04-12
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Verification — closing amount verification workflow

---

## Overview

The Verification screen is the attorney's core workspace for reviewing and verifying closing amounts, tracking verification progress through a 5-step pipeline, flagging discrepancies, and generating verification reports. It displays verification panels for each pending transaction with detailed financial breakdowns, progress indicators, verification checklists, and action buttons for confirming or flagging amounts.

---

## Problem Statement

Closing attorneys must independently verify that all dollar amounts in a real estate transaction (sale price, loan amount, down payment, closing costs, cash to close) are accurate before a closing can proceed. Errors in these amounts can cause legal liability, delayed closings, and financial harm to clients. Without a structured verification workflow, attorneys perform this critical function via paper checklists and manual cross-referencing, which is slow and error-prone.

---

## Goals

- Display verification panels for all pending transactions with complete financial details.
- Show a 5-step progress pipeline for each transaction (Docs Received → Agent Reviewed → Attorney Review → Title Company → Closing).
- Enable the attorney to verify all amounts with a signed confirmation.
- Enable the attorney to flag discrepancies with type classification and party notification.
- Display a verification checklist for systematic review.
- Provide report generation for sharing verification results.
- Show recently verified transactions.

---

## Non-Goals

- This screen does not manage the full transaction lifecycle (spec 002).
- It does not host document review (spec 003), though documents can be accessed from here.
- It does not manage client profiles (spec 004).

---

## Actors

| Actor | Role |
|-------|------|
| Attorney (AT) | Verifies amounts, flags discrepancies, generates reports |
| Agent (AG) | Submits amounts for verification (visible but not actionable here) |
| Lender (LN) | Provides loan amounts (visible in verification data) |

---

## User Scenarios

### Scenario 1 — Attorney Verifies Closing Amounts

**Actor**: Attorney (Sarah Mitchell)
**Precondition**: TRX-10247 is pending verification with all documents received.
**Flow**:
1. Attorney navigates to Verification screen.
2. Warning alert: "Action Required: 3 transactions pending your verification."
3. TRX-10247 panel shows: sale price ($485,000), loan amount ($388,000), down payment ($97,000), closing costs ($14,200), cash to close ($111,200), closing date (Feb 15, 2026).
4. Progress steps show: Docs Received ✓, Agent Reviewed ✓, Attorney Review (active), Title Company (future), Closing (future).
5. Attorney reviews the verification checklist items.
6. Attorney adds notes in the Attorney Notes field.
7. Attorney clicks "✅ Verify All Amounts."
8. Modal opens with verification summary and attorney signature field.
9. Attorney types name and clicks "✅ Confirm & Sign."

**Success**: Transaction verified; activity log updated; progress moves to Title Company step.

### Scenario 2 — Attorney Flags a Discrepancy

**Actor**: Attorney
**Precondition**: Attorney finds a mismatch in loan amount.
**Flow**:
1. Attorney clicks "🚩 Flag Discrepancy" on TRX-10247.
2. Flag modal opens with warning: "This will pause the transaction."
3. Attorney selects discrepancy type: "Loan Amount Mismatch."
4. Attorney describes the discrepancy in detail.
5. Attorney selects parties to notify: ✓ Real Estate Agent, ✓ Mortgage Lender, ✓ Title Company.
6. Attorney clicks "🚩 Submit Flag."

**Success**: Transaction paused; all selected parties notified; activity log updated.

### Scenario 3 — Attorney Generates Verification Report

**Actor**: Attorney
**Precondition**: One or more transactions need reporting.
**Flow**:
1. Attorney clicks "📊 Generate Report" in the sidebar.
2. Modal opens with report type, transaction, date range, and format options.
3. Attorney selects Verification Report, TRX-10247, PDF format.
4. Clicks "📊 Generate & Download."

**Success**: Report generated and downloaded; activity log updated.

---

## Functional Requirements

### FR-05-01 — Action Required Alert

- `alert-warning` banner: "Action Required: 3 transactions pending your verification."
- Description with urgency context.
- "Start Review" primary button.

### FR-05-02 — Verification Panel (Needs Verification)

- Bordered panel (`accent-blue` or `error-red` border for urgent).
- Header: Transaction ID, client name, property address, closing date, status badge, agent/lender info.
- Progress steps: 5-step pipeline with done/active/future states.
- Verification grid (3-column): Sale Price, Loan Amount, Down Payment, Closing Costs, Cash to Close, Closing Date.
- Attorney Notes textarea.
- Action buttons: "✅ Verify All Amounts" (btn-success), "🚩 Flag Discrepancy" (btn-danger), "📄 View Documents" (btn-secondary), "💬 Message Lender" (btn-secondary).

### FR-05-03 — Verification Panel (In Progress)

- Same structure as FR-05-02 but with fewer detail fields.
- Border: `accent-blue`.
- Status badge: `badge-info`.

### FR-05-04 — Progress Steps Component

- 5 steps displayed horizontally with connecting lines.
- Step states: done (success-green circle with ✓), active (primary-navy circle with number), future (neutral-200 circle with number).
- Done steps have green connecting lines; future steps have neutral connecting lines.
- Step labels: "Docs Received", "Agent Reviewed", "Attorney Review", "Title Company", "Closing."

### FR-05-05 — Verify Confirm Modal

- Title: "✅ Confirm Verification."
- Success alert with verification summary (transaction ID, client name).
- Verification grid showing key amounts (sale price, closing costs, cash to close).
- Attorney Signature text input: "Type your full name to sign…"
- Footer: Cancel + "✅ Confirm & Sign" (btn-success).

### FR-05-06 — Flag Discrepancy Modal

- Title: "🚩 Flag Discrepancy."
- Warning alert: "This will pause the transaction."
- Discrepancy Type dropdown: Incorrect Sale Price, Loan Amount Mismatch, Missing Document, Closing Cost Error, Other.
- Description textarea.
- Notify checkboxes: Real Estate Agent (checked), Mortgage Lender (checked), Client, Title Company (checked).
- Footer: Cancel + "🚩 Submit Flag" (btn-danger).

### FR-05-07 — Recently Verified Section

- Card with title "Recently Verified."
- Doc-item style cards with success border for completed verifications.
- Verified date, amount, and View Record/Download Report buttons.

### FR-05-08 — Verification Summary Sidebar

- Stats: Awaiting Your Review (3), Verified This Month (2), Flagged / Disputed (0).

### FR-05-09 — Verification Checklist Sidebar

- Title: "For each closing transaction, verify:"
- 6 checkbox items: Sale price matches purchase agreement, Loan amount confirmed with lender, Closing costs itemized & accurate, Title is clear no liens, Closing date confirmed by all parties, All signatures obtained.

### FR-05-10 — Generate Report Sidebar

- Transaction selector dropdown.
- "📊 Generate Report" full-width primary button.

### FR-05-11 — Report Generation Modal

- Fields: Report Type (Transaction Summary, Verification Report, Asset Split Report, Activity Log), Transaction selector (All or specific), Date From, Date To, Format (PDF/Excel/CSV radio buttons).
- Footer: Cancel + "📊 Generate & Download" (btn-primary).

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `pending_verifications[]` | array | Transactions awaiting attorney verification |
| `recently_verified[]` | array | Completed verifications |
| `verification_stats` | object | Counts per verification status |
| `checklist_state` | object | State of each checklist item |

---

## Edge Cases & Error States

- **No pending verifications**: "All transactions verified. No pending reviews."
- **Verify without signature**: Validation error; signature is required.
- **Flag without type**: Validation error; discrepancy type is required.
- **Report generation fails**: Inline error in modal.

---

## Success Criteria

1. All pending verification panels render with correct financial data from reference.
2. Progress steps correctly show current verification stage.
3. Verify Confirm modal captures attorney signature and records verification.
4. Flag modal pauses the transaction and notifies selected parties.
5. Report generation modal produces downloadable output.
6. Verification checklist state persists during the session.

---

## Dependencies

- **Depends on**: 000-foundation (modals, tokens, activity log)
- **Cross-links**: 001-dashboard (Verify button, Manage Verifications quick action), 002-transactions (Verify action), 003-documents (View Documents button)
