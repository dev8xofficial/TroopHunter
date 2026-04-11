# Tasks: Transaction Management

**Feature ID**: 002-transactions
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Not Started
**Created**: 2026-04-12

---

## Overview

Build the attorney's full transaction management screen with tabbed views, search, filter, and inline verification actions.

**Total Tasks**: 8
**Estimated Effort**: M

---

## Dependency Order

```
[TASK-002-01] ──► [TASK-002-02] ──► [TASK-002-04] ──► [TASK-002-06] ──► [TASK-002-07] ──► [TASK-002-08]
[TASK-002-03] ──► [TASK-002-04]
[TASK-002-05] ──► [TASK-002-06]
```

---

## Tasks

---

### TASK-002-01 — Build Search and Filter Bar

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01 (design tokens)
**Blocks**: TASK-002-02

**Description**:
Build the search input ("Search by client name, property, or case ID…") with search icon, a status filter dropdown (All Status, Needs Verification, In Progress, Verified, Flagged, Completed), and a transaction type filter (All Types, Purchase, Sale, Divorce). Filters apply simultaneously.

**Acceptance Criteria**:
- [ ] Search input filters table rows by client name, property address, and transaction ID
- [ ] Status filter shows all 6 status values from constitution §5
- [ ] Type filter shows Purchase, Sale, Divorce options
- [ ] Filters combine: searching "Smith" with "Needs Verification" returns only matching rows
- [ ] Clear/reset action removes all active filters

---

### TASK-002-02 — Build Tabbed View Navigation

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-002-01
**Blocks**: TASK-002-04

**Description**:
Build four tabs: All (12), Pending Review (3), Divorce Cases (2), Completed (1). Each tab label shows a count badge. Switching tabs filters the transactions table to the appropriate subset. Active tab shows correct visual state. "Pending Review" tab shows an info alert: "3 transactions require your attention."

**Acceptance Criteria**:
- [ ] Four tabs render with correct counts in badges
- [ ] Switching tabs filters table to correct subset without page reload
- [ ] Active tab has correct visual state (active border/background)
- [ ] "Pending Review" tab shows the info alert when there are pending transactions
- [ ] Tab counts update when transactions change state

---

### TASK-002-03 — Build Transaction Table with Status Badges

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-000-01
**Blocks**: TASK-002-04

**Description**:
Build the full transaction table with columns: Client (avatar + name), Property Address, Transaction Type, Amount, Status (badge), Closing Date, Action. Reference rows from constitution §6: TRX-10247 Smith (Needs Verification), TRX-10198 Williams (In Progress), TRX-10156 Brown (In Progress), TRX-10089 Anderson (Completed). Status badges use correct variants (badge-warning, badge-info, badge-success, badge-error).

**Acceptance Criteria**:
- [ ] All 6 table columns present
- [ ] Four reference rows display correct data
- [ ] Status badge variants match: badge-warning (Needs Verification), badge-info (In Progress), badge-success (Verified/Completed), badge-error (Flagged)
- [ ] Closing date column highlights dates within 7 days in warning colour
- [ ] Table sortable by closing date and amount

---

### TASK-002-04 — Wire Inline Verify and Flag Actions

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-002-02, TASK-002-03
**Blocks**: TASK-002-06

**Description**:
Wire the Verify and Flag action buttons in each table row. Verify button opens the Foundation Verify Confirm modal with the transaction's data. Flag button opens the Foundation Flag Discrepancy modal. After modal confirmation, update the row's status badge and write an activity log event.

**Acceptance Criteria**:
- [ ] Clicking Verify on TRX-10247 opens Verify Confirm modal with Smith's data
- [ ] Clicking Flag opens Flag Discrepancy modal with correct transaction pre-populated
- [ ] After successful verification, row status updates to "Verified" (badge-success)
- [ ] After successful flag, row status updates to "Flagged" (badge-error)
- [ ] Activity event written for both transaction_verified and discrepancy_flagged

---

### TASK-002-05 — Build Divorce Cases Tab Content

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: TASK-002-06

**Description**:
Build the Divorce Cases tab view. In addition to the standard table, this tab shows asset split information (distribution status, party details) as an additional column or expandable row. The tab also shows an info banner: "Divorce cases require asset split approval before verification."

**Acceptance Criteria**:
- [ ] Divorce tab shows only transactions of type Divorce
- [ ] Asset split status displayed per row
- [ ] Info banner present in Divorce tab
- [ ] "Verify Amounts" action available for split-pending rows

---

### TASK-002-06 — Implement Search, Filter, and Tab State Persistence

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-002-04, TASK-002-05
**Blocks**: TASK-002-07

**Description**:
Ensure search text, active filters, and active tab are preserved when the attorney navigates away from Transactions and returns within the same session. On returning, the same view state should be restored.

**Acceptance Criteria**:
- [ ] Active tab persists on screen switch and return
- [ ] Search text persists on screen switch and return
- [ ] Active filters persist on screen switch and return
- [ ] State resets on portal logout/reload (no stale cross-session state)

---

### TASK-002-07 — Empty States and Responsive Layout

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-002-06
**Blocks**: TASK-002-08

**Description**:
Implement all empty states (no transactions matching filter, empty tab, no results for search) and validate responsive layout at all three breakpoints. Table must be horizontally scrollable on mobile.

**Acceptance Criteria**:
- [ ] Empty tab: "No [tab name] transactions found."
- [ ] Empty search: "No transactions match your search."
- [ ] Table is horizontally scrollable at <768px
- [ ] All columns visible or gracefully truncated at each breakpoint

---

### TASK-002-08 — Acceptance Test Sign-Off

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-002-07
**Blocks**: None

**Description**:
Run all acceptance criteria from test-scenarios.md. Record pass/fail and obtain product sign-off.

**Acceptance Criteria**:
- [ ] All success criteria from spec.md verified
- [ ] All test scenarios in test-scenarios.md pass
- [ ] No open P1/P2 bugs
- [ ] Product sign-off recorded

---

## Completion Checklist

- [ ] All tasks marked Complete
- [ ] Reference data from constitution §5, §6 displayed correctly
- [ ] All tabs, search, and filters function correctly
- [ ] Inline verify and flag actions write activity events
- [ ] State persistence works across screen switches
- [ ] Responsive layout validated at all breakpoints
- [ ] Product sign-off received
