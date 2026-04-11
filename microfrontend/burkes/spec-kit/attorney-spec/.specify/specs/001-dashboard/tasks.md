# Tasks: Attorney Dashboard

**Feature ID**: 001-dashboard
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Not Started
**Created**: 2026-04-12

---

## Overview

Build the attorney's default landing screen with seven content regions, live activity feed, and inline verification actions.

**Total Tasks**: 10
**Estimated Effort**: M

---

## Dependency Order

```
[TASK-001-01] ──► [TASK-001-02] ──► [TASK-001-04] ──► [TASK-001-07]
[TASK-001-03] ──► [TASK-001-04]
[TASK-001-05] ──► [TASK-001-07]
[TASK-001-06] ──► [TASK-001-07]
[TASK-001-07] ──► [TASK-001-08] ──► [TASK-001-09] ──► [TASK-001-10]
```

---

## Tasks

---

### TASK-001-01 — Build KPI Stat Cards Grid

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01 (design tokens)
**Blocks**: TASK-001-02

**Description**:
Build the four-card KPI grid. Each card: label (13px, neutral-600, weight 600), large value (34px, weight 800, Archivo, primary-navy), delta description (12px, weight 600), emoji icon (28px, right-aligned). Cards have hover state: translateY(-2px) + shadow-lg + accent-blue border. Reference values: Active Transactions (12), Pending Verification (3), Asset Splits (2), Total Value Managed ($2.1M).

**Acceptance Criteria**:
- [ ] Four cards render in a responsive grid (4-col ≥1200px, 2-col 768–1199px, 1-col <768px)
- [ ] Each card displays correct label, value, description, and emoji
- [ ] Hover state applies translateY(-2px), shadow-lg, and accent-blue border
- [ ] Reference values from constitution §10 are displayed
- [ ] Empty/unavailable state shows "—" and "Data unavailable."

---

### TASK-001-02 — Build Urgent Closing Alert Banner

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-001-01
**Blocks**: TASK-001-04

**Description**:
Build the alert-warning banner displayed when a closing deadline is ≤ 7 days away. Contents: ⚠️ icon, title "Urgent: Closing Deadline Approaching", description with transaction details and days remaining, "Review Now" primary button. Reference text: "Smith transaction at 123 Main Street requires verification before Feb 15 closing date. 4 days remaining."

**Acceptance Criteria**:
- [ ] Banner renders with correct warning styling (alert-warning token)
- [ ] Reference text populated from transaction data
- [ ] "Review Now" button navigates to Verification screen
- [ ] Banner hidden when no deadline is within 7 days

---

### TASK-001-03 — Build Asset Split Review Cards

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: TASK-001-04

**Description**:
Build the Asset Split Reviews card with header "⚖️ Asset Split Reviews", subtitle "Divorce cases awaiting distribution approval.", and a "2 Pending" badge. Each split item: transaction ID, client name, property, value, closing date, status badge, split grid (Sale Price + Loan Amount, 2-column), and three action buttons: "✅ Verify Amounts", "👁 View Documents", "🚩 Flag".

**Acceptance Criteria**:
- [ ] Section header, subtitle, and pending count badge render correctly
- [ ] Two reference split cards display with correct amounts (Smith: $485,000 / $388,000)
- [ ] "Verify Amounts" opens Verify Confirm modal
- [ ] "View Documents" navigates to Documents screen
- [ ] "Flag" opens Flag Discrepancy modal

---

### TASK-001-04 — Build Client Transactions Table

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-001-02, TASK-001-03
**Blocks**: TASK-001-07

**Description**:
Build the Client Transactions table with columns: Client (avatar + name), Property, Transaction Type, Contract Amount, Status (badge), Action (Verify / Flag buttons). "View All" button in card header navigates to Transactions screen. Three reference rows from constitution §6: Smith (Needs Verification), Williams (In Progress), Brown (In Progress).

**Acceptance Criteria**:
- [ ] Table renders with all 6 columns
- [ ] Three reference rows display correct data and status badges
- [ ] Status badge variants match: badge-warning (Needs Verification), badge-info (In Progress)
- [ ] "Verify" button on Smith row opens Verify Confirm modal
- [ ] "View All" navigates to Transactions screen
- [ ] Empty state: "No active transactions assigned to you."

---

### TASK-001-05 — Build Recent Activity Feed

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-06 (Activity Log Service)
**Blocks**: TASK-001-07

**Description**:
Build the Recent Activity sidebar card. Subscribes to the Foundation activity log feed reader (`getRecentEvents(attorneyId, 4)`). Renders each event as: icon, title, description, and relative timestamp (e.g. "2 hours ago"). Four reference seed events: Document Uploaded, Review Started, Client Added, Message Received.

**Acceptance Criteria**:
- [ ] Four most recent events displayed in correct order (most recent first)
- [ ] Each event shows icon, title, description, relative timestamp
- [ ] Feed updates within the session when new events are written (no page refresh required)
- [ ] Empty state: "No recent activity."

---

### TASK-001-06 — Build Quick Actions and Upcoming Deadlines Widgets

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-05 (Screen Routing)
**Blocks**: TASK-001-07

**Description**:
Build the Quick Actions widget (4 vertical buttons: 📋 Review Pending Transactions → Transactions, ✅ Manage Verifications → Verification, 📄 View All Documents → Documents, 📊 Generate Reports → Report modal) and the Upcoming Deadlines widget (3 deadlines with left border urgency colours: error-red for urgent, warning-orange for soon, success-green for comfortable).

**Acceptance Criteria**:
- [ ] All 4 quick action buttons navigate to correct screens or open correct modal
- [ ] 3 deadline items render with correct labels, addresses, dates
- [ ] Urgency border colours: error-red (Smith, urgent), warning-orange (Williams, soon), success-green (Brown, comfortable)
- [ ] Empty state for deadlines: "No upcoming deadlines."

---

### TASK-001-07 — Wire Full Dashboard Layout and Sidebar

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-001-04, TASK-001-05, TASK-001-06
**Blocks**: TASK-001-08

**Description**:
Assemble the complete Dashboard layout: main column (stat cards → alert → asset splits → transactions table) and sidebar (activity feed → quick actions → deadlines). Ensure correct grid proportions (2/3 main + 1/3 sidebar at ≥1200px), correct spacing, and all content ordered per spec.

**Acceptance Criteria**:
- [ ] Main column and sidebar render side-by-side at ≥1200px
- [ ] Sidebar stacks below main column at <768px
- [ ] Vertical stacking order in main column matches spec (stat cards → alert → asset splits → table)
- [ ] Sidebar stacking order: activity feed → quick actions → deadlines

---

### TASK-001-08 — Implement Dashboard Data Loading States

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-001-07
**Blocks**: TASK-001-09

**Description**:
Add skeleton loading states for stat cards and the transactions table while data loads from the backend. Loading state must not block navigation to other screens. Add error state for failed data loads with a retry action.

**Acceptance Criteria**:
- [ ] Stat cards show skeleton placeholders during data load
- [ ] Transactions table shows a loading indicator row during data load
- [ ] Data load errors show a user-visible error message with a retry button
- [ ] Navigation is not blocked while Dashboard data loads

---

### TASK-001-09 — Responsive Layout and Edge Case Validation

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-001-08
**Blocks**: TASK-001-10

**Description**:
Validate all Dashboard regions at all three breakpoints. Fix layout issues. Implement and verify all empty states: no transactions, no activity, no deadlines, unavailable stat data.

**Acceptance Criteria**:
- [ ] At ≥1200px: 4-column stat grid, 2/3+1/3 main+sidebar layout
- [ ] At 768–1199px: 2-column stat grid, single-column content
- [ ] At <768px: single-column stack, all widgets readable
- [ ] All four empty states render correctly

---

### TASK-001-10 — Dashboard Acceptance Test Sign-Off

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-001-09
**Blocks**: None

**Description**:
Run all acceptance criteria from test-scenarios.md against the Dashboard. Record pass/fail per scenario and obtain product sign-off.

**Acceptance Criteria**:
- [ ] All 6 success criteria from spec.md verified and documented
- [ ] All test scenarios in test-scenarios.md pass
- [ ] No open P1/P2 bugs against the Dashboard
- [ ] Product sign-off recorded

---

## Completion Checklist

- [ ] All tasks marked Complete
- [ ] All acceptance criteria verified
- [ ] Reference data from constitution §6, §8, §10 reflected correctly
- [ ] Activity feed updates live within a session
- [ ] All quick actions navigate to correct targets
- [ ] Responsive layout validated at all three breakpoints
- [ ] Product sign-off received
