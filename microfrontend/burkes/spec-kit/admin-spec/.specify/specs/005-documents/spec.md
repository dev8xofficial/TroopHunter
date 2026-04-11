# Feature Specification: Documents

**Feature ID**: 005-documents
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Documents — platform-wide document review and approval queue

---

## Overview

The Documents screen is the administrator's centralised document review queue for the entire platform. It presents all transaction-related documents across all clients and agents, with their current review status. Admins can filter by category and status, search by name or transaction ID, and take approve or reject actions on individual documents.

---

## Problem Statement

Real estate transactions generate large volumes of documents across multiple categories (purchase agreements, mortgage applications, inspection reports, closing disclosures). Without a unified admin review interface, administrators cannot efficiently track which documents need attention, which have been approved, and which require rejection with feedback. Delayed document reviews create compliance risk and slow transaction timelines.

---

## Goals

- Present all platform documents in a searchable, filterable table with status indicators.
- Allow admins to approve or reject documents directly from the table.
- Allow admins to view document previews.
- Clearly distinguish documents that need immediate review ("Needs Review") from those already processed.

---

## Non-Goals

- Document creation or upload by admin is handled through individual transaction workflows.
- PDF rendering or annotation is an implementation concern, not specified here.
- Version history of edited documents is out of scope for v1.

---

## Actors

| Actor              | Role in This Feature                                                 |
| ------------------ | -------------------------------------------------------------------- |
| Administrator (TC) | Reviews, approves, and rejects all documents across all transactions |

---

## User Scenarios

### Scenario 1 — Admin Reviews Urgent Document Queue

**Actor**: Administrator
**Precondition**: 47 documents pending review; 8 marked urgent.
**Flow**:

1. Admin navigates to Documents.
2. Table shows 4 reference documents with status badges.
3. Admin clicks "👁️ View" on Purchase & Sales Agreement – Smith to preview.
4. Admin determines it is correct; clicks "✅ Approve."
5. Status changes to "Approved"; audit log records the approval.

**Success**: Document is approved; associated parties notified; audit log updated.

---

### Scenario 2 — Admin Rejects a Mortgage Document

**Actor**: Administrator
**Precondition**: Mortgage Application – Williams is "Under Review."
**Flow**:

1. Admin clicks "❌ Reject" on the Mortgage Application – Williams row.
2. Admin is prompted to provide a rejection reason (implementation detail).
3. Admin enters reason and confirms.
4. Status changes to "Rejected"; lender James Carter is notified; audit log updated.

**Success**: Document is rejected with a reason; lender can resubmit a corrected version.

---

### Scenario 3 — Admin Filters by Category

**Actor**: Administrator
**Precondition**: Documents exist across multiple categories.
**Flow**:

1. Admin selects "Mortgage Documents" from Filter by Category.
2. Table reduces to show only the Mortgage Application – Williams row.
3. Admin selects "All Categories" to restore full list.

**Success**: Category filter applies without page reload; results are correct.

---

## Functional Requirements

### FR-05-01 — Page Header

- Title: "Documents."
- Subtitle: "Review, approve, and manage all transaction documents."

### FR-05-02 — Filter Bar

- `grid-template-columns: 1fr 1fr 1fr auto`, `gap: 16px`.
- **Search Documents**: placeholder "Search by name, client, or transaction ID…"
- **Filter by Category** (select):
  - All Categories
  - Purchase & Sales Agreement
  - Closing Disclosure
  - Mortgage Documents
  - Insurance Documents
  - Title Documents
  - Divorce Agreement
  - Inspection Report
- **Filter by Status** (select):
  - All Statuses
  - Needs Review
  - Under Review
  - Approved
  - Rejected
- **"Apply Filters"** `.btn-secondary`.

### FR-05-03 — Documents Table

- Card header: "All Documents" title + "Platform-wide document review queue" subtitle.

**Columns**: Document Name, Category, Transaction ID, Uploaded By, Date, Status, Actions.

**Reference Documents**:

| Document Name                         | Category Badge                          | TRX ID    | Uploaded By             | Date         | Status Badge                 | Actions                          |
| ------------------------------------- | --------------------------------------- | --------- | ----------------------- | ------------ | ---------------------------- | -------------------------------- |
| 📋 Purchase & Sales Agreement – Smith | `badge-info` Purchase & Sales Agreement | TRX-10247 | Agent Sarah Anderson    | Feb 1, 2026  | `badge-error` Needs Review   | 👁️ View · ✅ Approve · ❌ Reject |
| 📊 Mortgage Application – Williams    | `badge-warning` Mortgage Documents      | TRX-10198 | Lender James Carter     | Feb 5, 2026  | `badge-warning` Under Review | 👁️ View · ✅ Approve · ❌ Reject |
| 🏠 Home Inspection Report – Brown     | `badge-green` Inspection Report         | TRX-10156 | Attorney Sarah Mitchell | Feb 8, 2026  | `badge-success` Approved     | 👁️ View                          |
| 📋 Closing Disclosure – Brown         | `badge-info` Closing Disclosure         | TRX-10134 | CPA David Thompson      | Feb 10, 2026 | `badge-error` Needs Review   | 👁️ View · ✅ Approve · ❌ Reject |

- Document Name: `font-weight: 600`, `color: primary-navy`, file-type emoji prefix.
- Transaction ID: `font-weight: 700`, `color: accent-blue`.
- Uploaded By: `color: neutral-600`.
- Date: `color: neutral-600`.
- Approved documents show only "👁️ View" — no approve/reject actions.

### FR-05-04 — Approve Action

- "✅ Approve" rendered as `.tbl-btn-success` (green background, white text).
- On click: confirm action → status updates to "Approved" → action buttons change to "👁️ View" only → audit log written.

### FR-05-05 — Reject Action

- "❌ Reject" rendered as `.tbl-btn-danger` (white background, red border and text).
- On click: prompt for rejection reason (textarea) → confirm → status updates to "Rejected" → affected party notified → audit log written.

### FR-05-06 — Pagination

- "Showing 1–4 of 47 documents pending review."
- Page buttons: Previous · 1 (active) · 2 · 3 · Next.

---

## Data & State

| Field                     | Type   | Description                                                                                                                  |
| ------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `documents[]`             | array  | All platform documents                                                                                                       |
| `document.name`           | string | Document display name (with emoji prefix)                                                                                    |
| `document.category`       | string | `purchase-sales-agreement`, `closing-disclosure`, `mortgage-documents`, `insurance`, `title`, `divorce`, `inspection-report` |
| `document.transaction_id` | string | Associated transaction ID (format `TRX-NNNNN`)                                                                               |
| `document.uploaded_by`    | string | Uploader display name and role                                                                                               |
| `document.date`           | date   | Upload date                                                                                                                  |
| `document.status`         | string | `needs-review`, `under-review`, `approved`, `rejected`                                                                       |
| `filter.category`         | string | Currently selected category filter                                                                                           |
| `filter.status`           | string | Currently selected status filter                                                                                             |
| `filter.search`           | string | Current search query                                                                                                         |

---

## Edge Cases & Error States

- **No documents pending**: Table shows "No documents pending review. All documents are up to date."
- **No documents match filter**: "No documents match your search."
- **Approve fails (server error)**: Inline error on row; retry option.
- **Reject without reason provided**: Validation error before allowing the action.
- **Approved document shown in "Needs Review" filter**: Must not appear — filter is exclusive.

---

## Success Criteria

1. All 4 reference documents render with correct name (including emoji prefix), category badges, transaction IDs, uploaders, dates, and status badges.
2. Home Inspection Report – Brown shows only "👁️ View" (no approve/reject) because it is already Approved.
3. "✅ Approve" is green (tbl-btn-success); "❌ Reject" is white with red text/border (tbl-btn-danger).
4. Category filter reduces table to documents of that category only.
5. Status filter "Needs Review" shows only the two Needs Review documents.
6. Pagination shows "1–4 of 47 documents pending review."

---

## Open Questions

1. Should the admin be able to upload a replacement document after rejecting one?
2. Should rejected documents be permanently removed from the queue or remain visible with "Rejected" status?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, badge system, table pattern)
- **Cross-links**: 004-transactions (document linked to transaction), 001-dashboard (documents pending count, urgent documents count)
