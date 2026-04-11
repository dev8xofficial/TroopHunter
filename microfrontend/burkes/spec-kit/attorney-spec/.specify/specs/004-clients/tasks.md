# Tasks: Client Profile Management

**Feature ID**: 004-clients
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Not Started
**Created**: 2026-04-12

---

## Overview

Build the client profile management screen with a searchable table, Add Client modal, Client Detail modal, stats sidebar, and quick messaging form.

**Total Tasks**: 7
**Estimated Effort**: S

---

## Dependency Order

```
[TASK-004-01] ──► [TASK-004-02] ──► [TASK-004-04] ──► [TASK-004-06] ──► [TASK-004-07]
[TASK-004-03] ──► [TASK-004-04]
[TASK-004-05] ──► [TASK-004-06]
```

---

## Tasks

---

### TASK-004-01 — Build Client Table with Search and Filter

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: TASK-004-02

**Description**:
Build the client table with search input ("Search clients by name, email, or case ID…"), case type filter (All Case Types, Purchase, Sale, Divorce), and "+ Add Client" primary button. Table columns: Client Name (avatar + name), Email, Phone, Case Type, Property, Status badge, Action. Reference clients from constitution §7: Smith, Williams, Brown, Anderson.

**Acceptance Criteria**:
- [ ] Search filters by name, email, and case ID simultaneously
- [ ] Case type filter narrows table to correct subset
- [ ] Four reference clients display with correct data
- [ ] Status badges reflect client's active transaction status
- [ ] "+ Add Client" button opens Add Client modal

---

### TASK-004-02 — Build Add Client Modal

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-004-01
**Blocks**: TASK-004-04

**Description**:
Build the Add Client modal with fields: First Name (required), Last Name (required), Email (required, validated), Phone (optional), Case Type (Purchase / Sale / Divorce), Property Address (required). Footer: Cancel + "+ Add Client" (btn-primary). On submit: create client record, write client_created activity event, close modal, refresh client table.

**Acceptance Criteria**:
- [ ] All required fields validated before submission (name, email, property)
- [ ] Email field validates format
- [ ] Case type dropdown has Purchase, Sale, Divorce options
- [ ] On success: modal closes, new client appears in table, client_created event written
- [ ] On server error: modal stays open with error message

---

### TASK-004-03 — Build Overview Stats Sidebar

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-000-01
**Blocks**: TASK-004-04

**Description**:
Build the client overview stats sidebar with four counters: Total Clients (4), Active Cases (3), Pending Verification (2), Completed Cases (1). Counters reflect live state of the attorney's client base. Also show a role permissions reference card listing what the AT role can do in Clients (view, add, message, navigate to verification/documents).

**Acceptance Criteria**:
- [ ] Four stat counters render with correct reference values
- [ ] Counters reflect live client/transaction state
- [ ] Role permissions card visible and accurate to AT role

---

### TASK-004-04 — Build Client Detail Modal

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-004-02, TASK-004-03
**Blocks**: TASK-004-06

**Description**:
Build the Client Detail modal opened when an attorney clicks on a client table row. Displays: client name, avatar, contact details (email, phone), case ID, transaction type, property address, amount, status, lender, agent. Footer action buttons: "✅ Verify Transaction" (navigates to Verification screen and pre-selects transaction), "📄 View Documents" (navigates to Documents screen filtered to this client's transactions), "💬 Send Message" (scrolls to messaging form).

**Acceptance Criteria**:
- [ ] Modal opens with correct data for the clicked client
- [ ] Reference data for John Smith (TRX-10247, $485,000, Needs Verification) displays correctly
- [ ] "Verify Transaction" closes modal and navigates to Verification screen
- [ ] "View Documents" closes modal and navigates to Documents screen
- [ ] "Send Message" closes modal and focuses the messaging form
- [ ] Modal closes on Escape key or backdrop click

---

### TASK-004-05 — Build Quick Messaging Form

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: TASK-004-06

**Description**:
Build the Quick Message sidebar form with: Client selector (dropdown of attorney's clients), message type (General Update, Document Request, Verification Notice, Urgent Notice), message text area, and "📨 Send Message" (btn-primary) button. On send: write activity event, show success confirmation, clear form.

**Acceptance Criteria**:
- [ ] Client selector populated with all attorney clients
- [ ] Message type has 4 options from spec
- [ ] Message field required — "Send" disabled when empty
- [ ] Successful send shows confirmation and clears form fields
- [ ] Activity event written on send

---

### TASK-004-06 — Empty States, Edge Cases, and Responsive Layout

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-004-04, TASK-004-05
**Blocks**: TASK-004-07

**Description**:
Implement all empty states and validate responsive layout at all three breakpoints.

**Acceptance Criteria**:
- [ ] Empty search: "No clients match your search."
- [ ] Empty case type filter: "No [type] cases."
- [ ] No clients state: "No clients assigned to you."
- [ ] Client table is readable at all breakpoints (horizontal scroll on mobile)
- [ ] Add Client and Client Detail modals are usable on mobile

---

### TASK-004-07 — Acceptance Test Sign-Off

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-004-06
**Blocks**: None

**Description**:
Run all acceptance criteria from test-scenarios.md and obtain product sign-off.

**Acceptance Criteria**:
- [ ] All success criteria from spec.md verified
- [ ] Add Client modal creates client and writes activity event
- [ ] Client Detail modal opens correctly for all reference clients
- [ ] Navigation targets from Client Detail modal work correctly
- [ ] Product sign-off recorded

---

## Completion Checklist

- [ ] All tasks marked Complete
- [ ] Reference clients from constitution §7 displayed correctly
- [ ] Add Client and Client Detail modals function correctly
- [ ] Messaging form sends and writes activity event
- [ ] Responsive layout validated
- [ ] Product sign-off received
