# Feature Specification: Documents

**Feature ID**: 002-documents
**Status**: review
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Documents screen

---

## Overview

The Documents screen is the authoritative file repository for the entire real estate transaction. It organises all documents into role-sourced categories, allows the client to view, download, sign, and upload files, and provides filtering and search tools to locate any document instantly. Every professional involved in the transaction can contribute to their designated category, and the client can see who uploaded what and when.

---

## Problem Statement

Documents in a real estate transaction arrive from multiple sources (agent, lender, attorney) across weeks. Without a central, organised repository, clients lose track of what has been received, what still needs their signature, and what remains pending from professionals. This screen eliminates document scatter and missed deadlines.

---

## Goals

- Provide a single place to find, review, sign, and download every transaction document.
- Make the upload source (role) and current status visible at a glance for every document.
- Enable the client to upload their own supporting documents (financial, insurance).
- Allow fast location of documents via search and status-based filtering.
- Surface a clear signature-required alert so deadlines are never missed.

---

## Non-Goals

- The Documents screen does not host the e-signature experience itself — it initiates navigation to the third-party signing provider.
- It does not provide document editing or annotation tools.
- It does not manage document version history in this version (see Open Questions).

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Client | Views, downloads, signs, and uploads personal documents |
| Real Estate Agent | Uploads Purchase & Sale documents |
| Mortgage Lender | Uploads Mortgage & Financial documents |
| Closing Attorney | Uploads Legal & Closing documents |
| CPA | Read-only access to all documents |

---

## User Scenarios

### Scenario 1 — Client Finds and Signs a Document

**Actor**: Client
**Precondition**: Agent has uploaded "Purchase Agreement" with status `needs-signature`.
**Flow**:
1. Client opens the Documents screen.
2. A signature-required banner appears at the top listing documents needing signature and the deadline.
3. Client clicks "Sign Documents" in the banner — or locates the document in the "Purchase & Sale Documents" table and clicks "Sign Now".
4. Portal navigates to the e-signature provider with the document pre-loaded.
5. Client completes signing and returns to the portal.
6. Document status updates to `approved`; the banner disappears if no other documents need signature.
7. An activity log entry is written: "✍️ Document Signed — Purchase Agreement signed by client".

**Success**: Document status transitions to Approved; signature deadline is met; activity log is updated.

---

### Scenario 2 — Client Filters Documents by Status

**Actor**: Client
**Precondition**: Eight documents exist across categories with mixed statuses.
**Flow**:
1. Client clicks the "Needs Signature" filter tab.
2. The document tables update to show only rows where status is `needs-signature`.
3. The count in the tab badge matches the number of visible rows.
4. Client clicks "All" to restore the unfiltered view.

**Success**: Filter transitions are immediate; counts are always accurate.

---

### Scenario 3 — Client Uploads a Personal Document

**Actor**: Client
**Precondition**: Client has a bank statement PDF to upload.
**Flow**:
1. Client clicks "Upload Document" in the toolbar.
2. An upload zone (drag-and-drop + file picker) expands below the toolbar.
3. Client drags their file onto the zone (or clicks to browse).
4. File type and size are validated (PDF/Word/JPEG/PNG, max 25 MB).
5. Upload completes; the new document appears in the relevant category table (Mortgage & Financial) with the "You (Client)" role indicator and a `under-review` status badge.
6. Client can click "Cancel" to dismiss the upload zone without uploading.

**Success**: Uploaded document appears in the correct category table immediately, attributed to the client role.

---

### Scenario 4 — Client Searches for a Specific Document

**Actor**: Client
**Precondition**: Multiple documents exist.
**Flow**:
1. Client types part of a document name (e.g., "Closing") in the search input.
2. All category tables update in real time to show only rows whose names match the query.
3. Category headers remain visible even if they have zero matching rows (or optionally collapse — see Open Questions).
4. Clearing the input restores all rows.

**Success**: Matching document(s) are visible within one second of typing.

---

## Functional Requirements

### FR-02-01 — Permissions Legend

- A persistent colour-coded legend must appear above the document tables on every visit.
- It must display all five uploader roles with their role colour dot and label: Real Estate Agent, Mortgage Lender, Attorney, Client (You), CPA.
- The legend must be static (no interaction required).

### FR-02-02 — Filter Tabs

- Four tabs must be displayed: All, Needs Signature, Under Review, Approved.
- Each tab must show a count badge of documents in that status.
- The "All" tab is active by default.
- Switching tabs filters all category tables simultaneously.
- Tab counts must reflect the actual current document statuses (not static values).

### FR-02-03 — Search Input

- A text search input must filter document rows in real time by document name (case-insensitive, partial match).
- The search icon must be visible inside the input field.
- Filtering applies across all category sections simultaneously.
- The current active filter tab and search input must work together (AND logic).

### FR-02-04 — Upload Zone

- A toggle button labelled "📤 Upload Document" must show/hide the upload zone.
- The upload zone must support drag-and-drop and click-to-browse file selection.
- Accepted formats: PDF, Word (.docx), JPEG, PNG.
- Maximum file size: 25 MB per file.
- If a file fails validation, an inline error must display the specific reason (invalid type / file too large).
- "Cancel" dismisses the upload zone without any upload occurring.

### FR-02-05 — Signature-Required Alert Banner

- Must appear when one or more documents have status `needs-signature`.
- Must name the documents and include a deadline date.
- Must include a "Sign Documents" CTA button.
- The banner must disappear automatically when no `needs-signature` documents remain.

### FR-02-06 — Document Category Sections

Documents are organised into three permanent categories. Each category renders as a separate card with its own table:

1. **🏠 Purchase & Sale Documents** — uploaded by Real Estate Agent
2. **🏦 Mortgage & Financial Documents** — uploaded by Mortgage Lender or Client
3. **⚖️ Legal & Closing Documents** — uploaded by Closing Attorney

Each category card header must display: category emoji, category name, and file count (e.g., "3 files").

### FR-02-07 — Document Table Row

Each row in a category table must display the following columns:

| Column | Content |
|--------|---------|
| Document | File type icon (colour-coded by type: PDF=red bg, Word=blue bg) + document name (bold) + file size |
| Uploaded By | Role colour dot + role label |
| Date | Upload date (formatted) |
| Status | Status badge (see FR-00-06 for colours) |
| Actions | Contextual buttons based on status (see FR-02-08) |

### FR-02-08 — Contextual Action Buttons

Action buttons in the table must be contextual based on document status:

| Status | Primary Button | Secondary Buttons |
|--------|---------------|------------------|
| `needs-signature` | Sign Now (navy) | View (ghost) |
| `under-review` | View (ghost) | — |
| `approved` | View (ghost) | Download (ghost) |

Client-uploaded documents in any status must always show a Download button.

### FR-02-09 — Role-Based Upload Categories

Client may only upload to: Mortgage & Financial, and Insurance (Insurance screen, spec 004). The client may not add documents to the Purchase & Sale or Legal & Closing categories — those are restricted to their respective professional roles.

### FR-02-10 — Activity Log on Upload

Every document upload by any role must produce an activity log entry (format: "📄 New Document — [document name] uploaded by [role]").

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `document.document_id` | string | Unique identifier |
| `document.name` | string | Display file name |
| `document.category` | enum | purchase-sale / mortgage-financial / legal-closing |
| `document.file_type` | enum | PDF / DOCX / JPEG / PNG |
| `document.file_size_bytes` | number | Used for display (converted to KB/MB) |
| `document.uploaded_by_role` | enum | agent / lender / attorney / client / cpa |
| `document.upload_date` | date | Display date |
| `document.status` | enum | needs-signature / under-review / approved |
| `active_filter_tab` | string | all / needs-signature / under-review / approved |
| `search_query` | string | Current search input value |
| `upload_zone_visible` | boolean | Whether the upload zone is expanded |

---

## Edge Cases & Error States

- **No documents in a category**: The category card still renders with its header and an empty-state message ("No documents yet in this category").
- **All documents signed**: Signature-required banner disappears; "Needs Signature" tab shows count "0".
- **File exceeds 25 MB**: Upload zone shows an inline error; file is not uploaded.
- **Unsupported file type**: Upload zone shows an inline error; file is not uploaded.
- **Search with no matches**: Tables show empty-state rows; filter tab counts show "0" for affected tabs.

---

## Assumptions

1. Document versioning (replacing an existing document) is not in scope for this release. Documents are append-only.
2. E-signature is handled by a third-party provider. The portal's "Sign Now" action initiates navigation to that provider and handles the return callback to update document status.
3. CPA access to documents is granted by the Transaction Coordinator at transaction setup; the client does not manage CPA access from the Documents screen.

---

## Success Criteria

1. A client can locate any specific document by name using search in under 10 seconds.
2. The filter tabs accurately reflect real-time document counts with zero lag.
3. A successfully signed document transitions from `needs-signature` to `approved` status and removes itself from the "Needs Signature" tab count within the same session.
4. A client-uploaded file appears in the correct category table within 5 seconds of upload completion.
5. The signature-required banner disappears immediately when the last `needs-signature` document is signed.

---

## Open Questions

1. Should category sections collapse (hide their table) when a search or filter produces zero matching documents in that category, or remain visible with an empty-state message?
2. Should there be a document version history — i.e., can a professional replace an existing document and have the client see both old and new versions?
3. Should the client receive a notification (bell indicator) when a new document is added by a professional?

---

## Dependencies

- **Depends on**: 000-foundation (tokens, badge system, alert banners, activity log)
- **Required by**: 001-dashboard (recent documents widget consumes document data)
