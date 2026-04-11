# Feature Specification: Documents

**Feature ID**: 003-documents
**Status**: approved
**Created**: 2026-04-12
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Documents — document review and management

---

## Overview

The Documents screen enables the attorney to review, approve, reject, and upload legal documents across all assigned transactions. It features tabbed views (All Documents, Needs Review, Approved, Upload New), a document summary sidebar, recent uploads timeline, and upload permission guidance. The attorney's primary workflow here is reviewing documents submitted by agents and lenders, then approving or rejecting them.

---

## Problem Statement

Closing attorneys must review numerous documents from multiple sources (agents, lenders, title companies) before a closing can proceed. Without a centralised document management view, attorneys track document status via email attachments and paper files, causing version confusion, missed reviews, and closing delays.

---

## Goals

- Provide a unified view of all documents across assigned transactions.
- Enable review, approval, and rejection workflow with required reasoning.
- Support document upload for attorney-specific documents.
- Display document summary statistics and recent upload activity.
- Communicate upload permissions clearly based on attorney role.

---

## Non-Goals

- This screen does not manage transaction status (spec 002).
- It does not host verification of closing amounts (spec 005).

---

## Actors

| Actor | Role |
|-------|------|
| Attorney (AT) | Reviews, approves, rejects, uploads documents |
| Agent (AG) | Uploads purchase agreements (visible here) |
| Lender (LN) | Uploads mortgage documents (visible here) |

---

## User Scenarios

### Scenario 1 — Attorney Reviews Pending Documents

**Actor**: Attorney
**Flow**:
1. Attorney navigates to Documents → Needs Review tab.
2. Warning alert shows "5 documents require your review."
3. Attorney clicks "Review" on Purchase & Sales Agreement – Smith.
4. Attorney clicks "✅ Approve" or "❌ Reject / Return" with reason.

**Success**: Document status updated; activity event written.

### Scenario 2 — Attorney Uploads a Court Order

**Actor**: Attorney
**Flow**:
1. Attorney clicks "Upload New" tab.
2. Selects transaction (TRX-10247 – Smith).
3. Selects category (Court Order).
4. Drags file to upload zone.
5. Clicks "📤 Upload Document."

**Success**: Document associated with correct transaction; visible in All Documents.

---

## Functional Requirements

### FR-03-01 — Document Search and Filter

- Search input: "Search documents…"
- Category filter: All Categories, Purchase Agreements, Closing Disclosures, Divorce Agreements, Legal Documents, Financial Docs.

### FR-03-02 — Document Tab Navigation

- Tabs: All Documents (18), Needs Review (5), Approved (10), Upload New.

### FR-03-03 — All Documents List

- Each document as a doc-item card with: icon, document name, meta info (transaction ID, uploader, date), status badge, description text, action buttons (Review, Approve, Comment, Download).

### FR-03-04 — Needs Review List

- Warning alert banner with count.
- Doc items with: Review, Approve, and "❌ Reject / Return" buttons.
- Reject opens `modalRejectDoc` requiring a reason.

### FR-03-05 — Approved List

- Doc items with View and Download buttons only.

### FR-03-06 — Upload Zone

- Dashed border upload area: "Drop files here or click to browse."
- Supported formats: PDF, DOCX, JPG, PNG. Max 25MB.
- Transaction selector dropdown and category selector.
- Notes/description textarea.
- Upload and Cancel buttons.

### FR-03-07 — Document Summary Sidebar

- Stats: Total Documents (18), Needs Review (5), Approved (10), Under Review (3).

### FR-03-08 — Recent Uploads Sidebar

- Activity items showing latest uploads with uploader info and date.

### FR-03-09 — Upload Permissions Sidebar

- Info box explaining attorney upload scope: "Court Orders, Settlement Agreements, Closing Verifications."

### FR-03-10 — Document Rejection Modal

- Modal title: "Reject / Return Document."
- Description: "This document will be returned to the uploader with your reason. The transaction status will be updated to Needs Revision."
- Required reason textarea.
- "❌ Confirm Rejection" danger button.

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `documents[]` | array | All documents across assigned transactions |
| `document_counts` | object | Counts per status category |

---

## Edge Cases & Error States

- **No documents**: "No documents available."
- **Upload fails**: Inline error in upload card.
- **Rejection without reason**: Validation error; reason is required.

---

## Success Criteria

1. All 5 reference documents render correctly with status badges.
2. Approve and Reject actions update document status immediately.
3. Upload zone accepts files and associates them with the correct transaction.
4. Document summary sidebar counts are accurate.

---

## Dependencies

- **Depends on**: 000-foundation
- **Cross-links**: 001-dashboard (View Documents quick action), 005-verification (document links)
