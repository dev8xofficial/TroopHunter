# Tasks: Closing Verification Workflow

**Feature ID**: 005-verification
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Not Started
**Created**: 2026-04-12

---

## Overview

Build the attorney's core compliance screen: verification panels with 5-step pipeline, financial breakdowns, checklist, Verify Confirm modal, Flag Discrepancy modal, recently verified section, and Generate Report modal.

**Total Tasks**: 12
**Estimated Effort**: L

---

## Dependency Order

```
[TASK-005-01] ──► [TASK-005-03] ──► [TASK-005-05] ──► [TASK-005-07] ──► [TASK-005-09] ──► [TASK-005-11] ──► [TASK-005-12]
[TASK-005-02] ──► [TASK-005-04] ──► [TASK-005-05]
[TASK-005-06] ──► [TASK-005-07]
[TASK-005-08] ──► [TASK-005-09]
[TASK-005-10] ──► [TASK-005-11]
```

---

## Tasks

---

### TASK-005-01 — Build Action Required Alert

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-000-01
**Blocks**: TASK-005-03

**Description**:
Build the alert-warning banner at the top of the Verification screen: "Action Required: 3 transactions pending your verification." Description provides urgency context. "Start Review" primary button scrolls to the first Needs Verification panel.

**Acceptance Criteria**:
- [ ] Banner renders with alert-warning styling
- [ ] Count reflects actual pending verification count (reference: 3)
- [ ] "Start Review" scrolls smoothly to the first verification panel
- [ ] Banner hidden when there are no pending verifications

---

### TASK-005-02 — Build 5-Step Progress Pipeline Component

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-000-01
**Blocks**: TASK-005-04

**Description**:
Build the reusable 5-step progress pipeline component used inside each verification panel. Steps: Docs Received (1), Agent Reviewed (2), Attorney Review (3), Title Company (4), Closing (5). Three step states: done (success-green circle + ✓, green connecting line), active (primary-navy circle + number), future (neutral-200 circle + number, neutral connecting line). Component accepts a `currentStep` prop (1–5).

**Acceptance Criteria**:
- [ ] Five steps render horizontally with correct labels
- [ ] Done steps show green circle with ✓ icon and green connecting lines
- [ ] Active step shows primary-navy circle with step number
- [ ] Future steps show neutral-200 circle with step number and neutral lines
- [ ] Reference: TRX-10247 renders with steps 1–2 done, step 3 active, steps 4–5 future
- [ ] Component renders correctly at all breakpoints (stacks vertically on mobile)

---

### TASK-005-03 — Build Verification Panel — Needs Verification State

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-005-01
**Blocks**: TASK-005-05

**Description**:
Build the primary verification panel for transactions in "Needs Verification" state. Panel contents: bordered card (error-red border for urgent), header (transaction ID, client name, property, closing date, status badge, agent/lender info), 5-step progress pipeline, 3-column verification grid (Sale Price, Loan Amount, Down Payment, Closing Costs, Cash to Close, Closing Date), Attorney Notes textarea, and four action buttons: "✅ Verify All Amounts" (btn-success), "🚩 Flag Discrepancy" (btn-danger), "📄 View Documents" (btn-secondary), "💬 Message Lender" (btn-secondary). Reference: TRX-10247 Smith.

**Acceptance Criteria**:
- [ ] Panel renders with error-red border for Needs Verification state
- [ ] All six financial fields display with correct reference values (Smith: $485,000 / $388,000 / $97,000 / $14,200 / $111,200 / Feb 15, 2026)
- [ ] Agent and lender info visible (Sarah Anderson, First National Bank — James Carter)
- [ ] Attorney Notes textarea is editable
- [ ] All four action buttons render in correct positions

---

### TASK-005-04 — Build Verification Panel — In Progress State

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-005-02
**Blocks**: TASK-005-05

**Description**:
Build the verification panel variant for transactions in "In Progress" state. Same structure as Needs Verification panel but with accent-blue border, badge-info status, and showing the Brown transaction reference (TRX-10156, $512,000).

**Acceptance Criteria**:
- [ ] Panel renders with accent-blue border for In Progress state
- [ ] Brown transaction reference data displays correctly (TRX-10156, $512,000, Mar 8, 2026)
- [ ] All four action buttons available
- [ ] Progress pipeline shows correct step for In Progress (step 3 active)

---

### TASK-005-05 — Wire Verify Confirm Modal

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-005-03, TASK-005-04
**Blocks**: TASK-005-07

**Description**:
Wire "✅ Verify All Amounts" button to the Verify Confirm modal. Modal contents: title "✅ Confirm Verification", success alert with verification summary (transaction ID, client name), verification grid showing key amounts (sale price, closing costs, cash to close), attorney signature text input ("Type your full name to sign…"), footer: Cancel + "✅ Confirm & Sign" (btn-success). On confirm: validate signature is not empty, update transaction status to Verified, advance progress pipeline to step 4, write transaction_verified activity event, close modal, update panel display.

**Acceptance Criteria**:
- [ ] Modal opens with correct transaction data pre-populated
- [ ] "Confirm & Sign" disabled until attorney name is entered
- [ ] On signature + confirm: transaction status updates to Verified
- [ ] Progress pipeline advances to step 4 (Title Company)
- [ ] Activity event `transaction_verified` written with attorney signature, transactionId, timestamp
- [ ] Verified panel replaced by a "Recently Verified" entry

---

### TASK-005-06 — Wire Flag Discrepancy Modal

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-000-07
**Blocks**: TASK-005-07

**Description**:
Wire "🚩 Flag Discrepancy" button to the Flag Discrepancy modal. Modal: title "🚩 Flag Discrepancy", warning alert "This will pause the transaction.", Discrepancy Type dropdown (Incorrect Sale Price, Loan Amount Mismatch, Missing Document, Closing Cost Error, Other), Description textarea (required), Notify checkboxes (Real Estate Agent ✓, Mortgage Lender ✓, Client, Title Company ✓), footer: Cancel + "🚩 Submit Flag" (btn-danger). On submit: update transaction to Flagged status, write discrepancy_flagged event, notify selected parties, close modal.

**Acceptance Criteria**:
- [ ] Modal opens with warning alert visible
- [ ] All 5 discrepancy types available in dropdown
- [ ] Description field required — submit disabled without it
- [ ] Default notifications: Agent, Lender, Title Company checked
- [ ] On submit: transaction status → Flagged, activity event written
- [ ] Flag modal closes and panel updates to show Flagged status badge

---

### TASK-005-07 — Build Verification Checklist Component

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-005-05, TASK-005-06
**Blocks**: TASK-005-09

**Description**:
Build the verification checklist component displayed inside verification panels. Checklist items: Sale Price Verified, Loan Amount Confirmed, Down Payment Accurate, Closing Costs Reviewed, Title Commitment Received, All Documents Signed. Each item is a checkbox the attorney can check off. Progress indicator shows N of 6 items complete. Checklist state persists within the session.

**Acceptance Criteria**:
- [ ] Six checklist items render with checkboxes
- [ ] Checking an item persists within the session (not reset on screen switch)
- [ ] Progress indicator (e.g. "4/6 Complete") updates as items are checked
- [ ] Checklist state included in the Verify Confirm modal summary

---

### TASK-005-08 — Build Recently Verified Section

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-06
**Blocks**: TASK-005-09

**Description**:
Build the "Recently Verified" section below the active verification panels. Shows transactions that have been verified in the current session or recent history. Each item: transaction ID, client name, property, verification date, attorney name, success border. Reference: TRX-10089 Anderson (Completed).

**Acceptance Criteria**:
- [ ] Section renders with correct title "Recently Verified"
- [ ] Anderson reference transaction displays with Completed/Verified status
- [ ] Newly verified transactions appear here immediately after verification confirmation
- [ ] Empty state: "No recently verified transactions."

---

### TASK-005-09 — Build Generate Report Modal

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-005-07, TASK-005-08
**Blocks**: TASK-005-11

**Description**:
Build the "📊 Generate Report" modal opened from the sidebar quick action. Modal: Report Type dropdown (Verification Report, Discrepancy Report, Closing Summary), Transaction selector (attorney's assigned transactions), Date Range inputs (From, To), Format selector (PDF, DOCX). Footer: Cancel + "📊 Generate & Download" (btn-primary). On submit: trigger report generation, write report_generated activity event, initiate file download.

**Acceptance Criteria**:
- [ ] All four report configuration fields render
- [ ] Report Type has 3 options from spec
- [ ] Transaction selector lists all assigned transactions
- [ ] Format has PDF and DOCX options
- [ ] On generate: activity event `report_generated` written
- [ ] File download initiated (or download link presented if async)

---

### TASK-005-10 — Build Verification Sidebar — Summary and Quick Actions

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: TASK-005-11

**Description**:
Build the Verification screen sidebar with two cards: (1) Verification Summary — stat counts for Pending Verification (3), In Progress (1), Verified This Month (2), Flagged (0); (2) Quick Actions — "📊 Generate Report" button (opens Generate Report modal) and "📋 View All Transactions" button (navigates to Transactions screen).

**Acceptance Criteria**:
- [ ] Summary card shows correct reference counts
- [ ] Counts update when verification actions are taken in the session
- [ ] "Generate Report" opens the Generate Report modal
- [ ] "View All Transactions" navigates to Transactions screen

---

### TASK-005-11 — Responsive Layout and Edge Cases

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-005-09, TASK-005-10
**Blocks**: TASK-005-12

**Description**:
Validate the Verification screen at all three breakpoints. The 5-step pipeline must stack vertically on mobile. Financial grid collapses to single column at <768px. All modals (Verify Confirm, Flag Discrepancy, Generate Report) are usable on mobile.

**Acceptance Criteria**:
- [ ] Progress pipeline steps readable at all breakpoints
- [ ] Financial grid readable at all breakpoints
- [ ] All three modals usable on mobile (no overflow or clipping)
- [ ] Empty state when no pending verifications: "No pending verifications. All transactions are up to date."

---

### TASK-005-12 — Acceptance Test Sign-Off

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-005-11
**Blocks**: None

**Description**:
Run all acceptance criteria from test-scenarios.md. Confirm all three modal flows (verify, flag, report) write correct activity events. Obtain product sign-off.

**Acceptance Criteria**:
- [ ] All success criteria from spec.md verified
- [ ] Verify Confirm flow: signature required, event written, status updated
- [ ] Flag Discrepancy flow: description required, parties notified, status updated
- [ ] Generate Report flow: event written, download initiated
- [ ] Progress pipeline advances correctly after verification
- [ ] Product sign-off recorded

---

## Completion Checklist

- [ ] All tasks marked Complete
- [ ] Reference verification data from constitution §9 displayed correctly
- [ ] All three modals function end-to-end
- [ ] All three modals write correct activity events
- [ ] Progress pipeline advances through all 5 steps correctly
- [ ] Checklist state persists within session
- [ ] Responsive layout validated at all breakpoints
- [ ] Product sign-off received
