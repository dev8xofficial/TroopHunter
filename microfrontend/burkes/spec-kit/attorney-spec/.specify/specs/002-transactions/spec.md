# Feature Specification: Transactions

**Feature ID**: 002-transactions
**Status**: approved
**Created**: 2026-04-12
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Transactions — full transaction management

---

## Overview

The Transactions screen provides the attorney with a comprehensive view of all real estate transactions assigned to them. It features a searchable, filterable transaction table with tabbed views (All, Pending Review, Divorce Cases, Completed), allowing the attorney to quickly locate and act on specific transactions. Each row provides direct verify and flag actions.

---

## Problem Statement

Attorneys managing multiple closings simultaneously need a single view to see all their assigned transactions, filter by status or type, and take action. Without a dedicated transactions screen, attorneys rely on scattered emails and paper files to track their caseload, leading to missed deadlines and verification gaps.

---

## Goals

- Display all attorney-assigned transactions in a sortable, filterable table.
- Provide tabbed views for different transaction categories.
- Enable search by client name, property address, or transaction ID.
- Allow direct verify and flag actions from the table.
- Show transaction counts per tab.

---

## Non-Goals

- This screen does not display verification details (spec 005).
- It does not host document review (spec 003).
- It does not manage client profiles (spec 004).

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Attorney (AT) | Views all transactions, verifies, flags |
| Agent (AG) | Submits transactions visible here |

---

## User Scenarios

### Scenario 1 — Attorney Searches for a Transaction

**Actor**: Attorney
**Flow**:
1. Attorney navigates to Transactions.
2. Types "Smith" in search bar.
3. Table filters to show only Smith-related transactions.
4. Attorney clicks "Verify" to begin verification.

**Success**: Transaction found and action initiated within 10 seconds.

### Scenario 2 — Attorney Filters by Pending Status

**Actor**: Attorney
**Flow**:
1. Attorney clicks "Pending Review (3)" tab.
2. An info alert says "3 transactions require your attention."
3. Table shows only pending transactions with closing dates highlighted.
4. Attorney reviews each and takes appropriate action.

**Success**: All pending transactions visible with clear urgency indicators.

---

## Functional Requirements

### FR-02-01 — Search and Filter Bar

- Search input with icon: "Search by client name, property, or case ID…"
- Transaction type filter dropdown: All Types, Purchase – Closing, Sale – Closing, Divorce – Asset Split.
- Status filter dropdown: All Statuses, Needs Verification, In Progress, Split Pending, Verified, Completed.

### FR-02-02 — Tab Navigation

- Tab bar with: All (12), Pending Review (3), Divorce Cases (2), Completed (5).
- Active tab: `primary-navy` text with bottom border.
- Tab content switches without page reload.

### FR-02-03 — All Transactions Table

- Columns: Transaction ID, Client, Property Address, Transaction Type, Contract Amount, Closing Date, Status, Action.
- Transaction IDs rendered in `accent-blue` font-weight: 700.
- Client column uses avatar + name + role pattern.
- Action column: Verify (btn-primary) and Flag (btn-secondary with error styling) for active transactions; View for completed.

### FR-02-04 — Pending Review View

- Info alert banner: "3 transactions require your attention."
- Same table structure with closing date badges showing urgency.

### FR-02-05 — Divorce Cases View

- Card header "Active Closing Cases" with subtitle.
- Table filtered to show only attorney/title review transactions.

### FR-02-06 — Completed View

- Table showing completed transactions (status badge-success "Completed").
- No action buttons except "View."

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `transactions[]` | array | All transaction objects assigned to attorney |
| `search_query` | string | Current search filter text |
| `active_tab` | string | Currently selected tab ID |
| `type_filter` | string | Transaction type filter value |
| `status_filter` | string | Status filter value |

---

## Edge Cases & Error States

- **No matching results**: "No transactions match your search criteria."
- **Empty completed tab**: "No completed transactions yet."

---

## Success Criteria

1. All 4 reference transactions render in the All tab.
2. Search filters correctly by client name, property, and transaction ID.
3. Tab counts are accurate and update when filters change.
4. Verify and Flag buttons open correct modals.

---

## Dependencies

- **Depends on**: 000-foundation
- **Cross-links**: 001-dashboard (View All button), 005-verification (Verify modal)
