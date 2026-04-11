# Tasks: Document Review and Management

**Feature ID**: 003-documents
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Not Started
**Created**: 2026-04-12

---

## Overview

Build the document management screen with review workflow, approval/rejection modals, upload zone, and document statistics.

**Total Tasks**: 9
**Estimated Effort**: M

---

## Dependency Order

```
[TASK-003-01] ──► [TASK-003-02] ──► [TASK-003-04] ──► [TASK-003-06] ──► [TASK-003-08] ──► [TASK-003-09]
[TASK-003-03] ──► [TASK-003-04]
[TASK-003-05] ──► [TASK-003-07] ──► [TASK-003-08]
```

---

## Tasks

---

### TASK-003-01 — Build Document Search and Filter Bar

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: TASK-003-02

**Description**:
Build the document search input ("Search documents by name, transaction, or type…"), a category filter (All Categories, Purchase Agreement, Closing Disclosure, Mortgage Documents, Title Documents, Court Order, Settlement Agreement), and a transaction filter (All Transactions + list of assigned transaction IDs/names).

**Acceptance Criteria**:
- [ ] Search filters by document name, transaction ID, and document category
- [ ] Category dropdown contains all 7 categories from spec
- [ ] Transaction filter lists all attorney-assigned transactions
- [ ] Filters combine correctly
- [ ] "Upload New" tab button accessible from filter bar area

---

### TASK-003-02 — Build Tabbed Document Views

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-003-01
**Blocks**: TASK-003-04

**Description**:
Build four tabs: All Documents (5), Needs Review (2), Approved (1), Upload New. Each tab shows a count badge. "Needs Review" tab shows a warning alert: "5 documents require your review." Switching tabs filters document list to the correct subset.

**Acceptance Criteria**:
- [ ] Four tabs render with correct counts
- [ ] Needs Review tab shows warning alert with count
- [ ] Switching tabs filters to correct document subset
- [ ] "Upload New" tab shows the upload zone, not a document list

---

### TASK-003-03 — Build Document List with Status Badges

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-000-01
**Blocks**: TASK-003-04

**Description**:
Build the document list displaying each document as a row/card with: document name, category badge, transaction ID, upload date, uploaded-by indicator, status badge, and action buttons (Review, Approve, Reject/Return). Reference documents from constitution §8: five documents across three transactions with varying statuses.

**Acceptance Criteria**:
- [ ] Five reference documents display with correct names, categories, transaction IDs, dates, and statuses
- [ ] Status badges: badge-warning (Needs Review), badge-info (Under Review), badge-success (Approved)
- [ ] "Review" action available for Needs Review and Under Review documents
- [ ] "Approve" and "Reject / Return" actions available during review
- [ ] Approved documents show green success border or indicator

---

### TASK-003-04 — Wire Document Approval Modal

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-003-02, TASK-003-03
**Blocks**: TASK-003-06

**Description**:
Wire the Approve action to an approval confirmation modal. Modal: document name, transaction, "Are you sure you want to approve this document?" confirmation, Cancel + "✅ Approve Document" button. On confirm: update document status to Approved, write document_approved activity event, update document list.

**Acceptance Criteria**:
- [ ] Clicking Approve opens confirmation modal with correct document name
- [ ] Confirming approval updates document status to Approved (badge-success)
- [ ] Activity event `document_approved` written with documentId and transactionId
- [ ] Rejected/returned documents cannot be approved without a new review
- [ ] Modal closes and list updates without page refresh

---

### TASK-003-05 — Wire Document Rejection Modal

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-07
**Blocks**: TASK-003-07

**Description**:
Wire the Reject / Return action to a rejection modal. Modal: document name, required rejection reason text area ("Reason for return (required)…"), Cancel + "❌ Reject / Return" (btn-danger) button. On confirm: update document status to Rejected/Returned, write document_rejected activity event, notify the uploading party.

**Acceptance Criteria**:
- [ ] Clicking Reject opens rejection modal
- [ ] Rejection reason is required — "Reject" button disabled without reason text
- [ ] Confirming rejection updates document status
- [ ] Activity event `document_rejected` written
- [ ] Rejected document visible in All Documents tab with rejected status badge

---

### TASK-003-06 — Build Document Upload Zone

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-003-04
**Blocks**: TASK-003-08

**Description**:
Build the Upload New tab upload zone. Features: drag-and-drop file zone with visual drop-state indicator, transaction selector (required), document category selector (attorney-uploadable categories only: Court Order, Settlement Agreement, Closing Verification), and "📤 Upload Document" button. Attorney role upload permissions clearly displayed. File size and type validation (PDF, DOCX; max 50MB).

**Acceptance Criteria**:
- [ ] Drag-and-drop zone shows visual feedback when file is dragged over it
- [ ] Transaction selector lists all attorney-assigned transactions
- [ ] Category selector shows only attorney-uploadable categories
- [ ] Upload permissions explanation visible ("Attorneys may upload: Court Orders, Settlement Agreements, Closing Verification documents")
- [ ] File validation rejects non-PDF/DOCX files with a clear error message
- [ ] Successful upload writes document_uploaded event and document appears in All Documents

---

### TASK-003-07 — Build Document Summary Sidebar and Recent Uploads

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-003-05
**Blocks**: TASK-003-08

**Description**:
Build the document summary sidebar with four stat counters: Total Documents, Needs Review, Under Review, Approved. Build the Recent Uploads timeline showing the 5 most recently uploaded documents with name, uploader, and relative timestamp.

**Acceptance Criteria**:
- [ ] Four stat counters reflect current document state (reference: Total 5, Needs Review 2, Under Review 2, Approved 1)
- [ ] Counters update when document status changes
- [ ] Recent uploads timeline shows 5 most recent uploads in reverse chronological order
- [ ] Each timeline item shows document name, category, transaction, and "X ago" relative time

---

### TASK-003-08 — Empty States and Responsive Layout

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-003-06, TASK-003-07
**Blocks**: TASK-003-09

**Description**:
Implement empty states for all tabs and validate responsive layout at all three breakpoints.

**Acceptance Criteria**:
- [ ] Empty state for Needs Review: "No documents require review."
- [ ] Empty state for Approved: "No approved documents yet."
- [ ] Empty state for All Documents: "No documents found."
- [ ] Document list readable at <768px (horizontal scroll or card layout)
- [ ] Upload zone usable on mobile

---

### TASK-003-09 — Acceptance Test Sign-Off

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-003-08
**Blocks**: None

**Description**:
Run all acceptance criteria from test-scenarios.md and obtain product sign-off.

**Acceptance Criteria**:
- [ ] All success criteria from spec.md verified
- [ ] All test scenarios in test-scenarios.md pass
- [ ] Approval and rejection flows write correct activity events
- [ ] Product sign-off recorded

---

## Completion Checklist

- [ ] All tasks marked Complete
- [ ] Reference documents from constitution §8 displayed correctly
- [ ] Approval and rejection modals write activity events
- [ ] Upload zone accepts correct file types and categories
- [ ] Summary counters update on status changes
- [ ] Responsive layout validated
- [ ] Product sign-off received
