# Feature Specification: Documents

**Feature ID**: 003-documents
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Documents — document upload and management screen

---

## Overview

The Documents screen is the centralised repository for all transaction-related documents managed by the agent. It allows agents to upload new documents (by type and transaction), filter and search existing documents, view document status, and take download/view actions. It is the agent's primary interface for managing the paper trail of every deal.

---

## Problem Statement

Real estate transactions generate a large volume of documents across multiple categories (purchase agreements, mortgage docs, inspection reports, title documents, closing disclosures). Without a structured upload and tracking interface, agents lose track of what has been filed, what is under review, and what needs attention — causing delays and compliance risks.

---

## Goals

- Provide a structured upload interface with document type and transaction assignment.
- Display all documents across all transactions in a searchable, filterable table.
- Show document status clearly (Approved, Under Review, Needs Review, Needs Signature).
- Allow agents to view and download any document in the repository.

---

## Non-Goals

- Agents cannot sign documents on behalf of clients (client signing is a Client Portal concern).
- Document preview rendering (PDF viewer) is an implementation concern, not specified here.
- Version history of edited documents is out of scope for v1.

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Agent (AG) | Uploads purchase & sale agreements; views all documents across their transactions |
| Client (CL) | Can upload insurance and financial documents (via Client Portal — reflected here as read-only) |
| Admin (TC) | Can upload any document type; can delete documents |

---

## User Scenarios

### Scenario 1 — Agent Uploads a Purchase Agreement

**Actor**: Agent
**Precondition**: A signed PDF purchase agreement is ready to upload.
**Flow**:
1. Agent is on the Documents screen.
2. Agent selects Document Type: "Purchase & Sales Agreement."
3. Agent selects Transaction: "TRX-10247 – 123 Main Street – Smith Purchase."
4. Agent drags the file onto the upload zone or clicks to browse.
5. Agent clicks "Upload Document."
6. The document appears in the table with status "Under Review."
7. Activity event written: "Document Uploaded – Purchase_Agreement_Smith.pdf."

**Success**: Document is stored, assigned to the correct transaction, and visible in the table.

---

### Scenario 2 — Agent Searches for a Specific Document

**Actor**: Agent
**Precondition**: Multiple documents exist across multiple transactions.
**Flow**:
1. Agent types "Smith" in the search bar.
2. Table filters to show only documents with "Smith" in the name or transaction.
3. Agent clicks "View" on the Purchase_Agreement_Smith.pdf row to preview it.

**Success**: Search returns correct results; View action opens the document.

---

### Scenario 3 — Agent Filters Documents by Category

**Actor**: Agent
**Precondition**: Documents exist across multiple categories.
**Flow**:
1. Agent selects "Mortgage Documents" from the document type filter dropdown.
2. Table filters to show only mortgage-related documents.
3. Agent selects "TRX-10198 – 789 Pine Road" from the transaction filter.
4. Table further narrows to mortgage documents for that transaction only.

**Success**: Combined filters produce a correctly scoped document list.

---

## Functional Requirements

### FR-03-01 — Filter Bar

The filter bar must contain:
- "Filter by:" label.
- **Document Type** dropdown: All Documents, Purchase Agreements, Mortgage Documents, Insurance, Legal Documents.
- **Transaction** dropdown: All Transactions, and one option per transaction:
  - TRX-10247 – 123 Main Street
  - TRX-10198 – 789 Pine Road
  - TRX-10156 – 321 Elm Street
  - TRX-10155 – 555 Oak Avenue
  - TRX-10089 – 654 Maple Drive
- **Search bar** with 🔍 icon prefix and placeholder "Search documents..."
- **"+ Upload Document"** `.btn-primary` button (right-aligned).

### FR-03-02 — Upload Card

A white card with title "Upload New Document" and subtitle "Add documents to a transaction" must appear above the document table.

**Upload Zone**: Dashed-border area (`border: 3px dashed neutral-300`, `border-radius: 12px`, `padding: 48px`, `text-align: center`). Icon 📁, title "Drag and Drop Files Here," description "or click to browse - Supports PDF, DOC, DOCX, XLS, XLSX."

**Below the upload zone:**

- "Document Type" dropdown (required):
  - Purchase & Sales Agreement
  - Mortgage Documents
  - Insurance Documents
  - Inspection Report
  - Title Documents
  - Closing Disclosure

- "Assign to Transaction" dropdown (required):
  - TRX-10247 – 123 Main Street – Smith Purchase
  - TRX-10198 – 789 Pine Road – Williams Sale
  - TRX-10156 – 321 Elm Street – Brown Purchase
  - TRX-10155 – 555 Oak Avenue – Brown Purchase

- Full-width "Upload Document" `.btn-primary` button.

### FR-03-03 — Documents Table

A white card with title "Documents" and subtitle "All documents across your transactions."

**Columns**: Document Name, Category, Transaction, Date, Status, Actions.

- Document Name: rendered in `<strong>` with a file-type emoji prefix.
- Category: `.table-status` badge (active for approved/title/closing; pending for mortgage/inspection).
- Status: `.table-status` badge.
- Actions: "View" + "Download" `.table-action-btn` buttons per row.

**Reference Rows (from agent.html)**:

| Document Name                     | Category                  | Transaction                    | Date         | Status       |
|-----------------------------------|---------------------------|--------------------------------|--------------|--------------|
| 📄 Purchase_Agreement_Smith.pdf   | Purchase & Sales Agreement| 123 Main Street (TRX-10247)   | Feb 1, 2026  | Approved     |
| 📊 Mortgage_Application_Williams.pdf | Mortgage Documents      | 789 Pine Road (TRX-10198)     | Feb 5, 2026  | Under Review |
| 🏠 Inspection_Report_Brown.pdf    | Inspection Report         | 321 Elm Street (TRX-10156)    | Feb 8, 2026  | Under Review |
| 📋 Closing_Disclosure_Brown.pdf   | Closing Documents         | 555 Oak Avenue (TRX-10155)    | Feb 10, 2026 | Needs Review |
| 📑 Title_Insurance_Smith.pdf      | Title Documents           | 123 Main Street (TRX-10247)   | Feb 5, 2026  | Approved     |

**Status badge mapping**:
- Approved → `active` badge
- Under Review → `pending` badge
- Needs Review → `pending` badge
- Needs Signature → `pending` badge

---

## Data & State

| Field                     | Type   | Description                                            |
|---------------------------|--------|--------------------------------------------------------|
| `documents[]`             | array  | Full list of documents across all agent transactions   |
| `document.name`           | string | Filename including extension                           |
| `document.category`       | string | One of the canonical document category values          |
| `document.transaction_id` | string | Associated transaction ID (format `TRX-NNNNN`)         |
| `document.date`           | date   | Upload date                                            |
| `document.status`         | string | `approved`, `under-review`, `needs-review`, `needs-signature` |
| `upload.file`             | file   | Binary file object (PDF, DOC, DOCX, XLS, XLSX)         |
| `upload.type`             | string | Selected document type from dropdown                   |
| `upload.transaction_id`   | string | Selected target transaction ID                         |

---

## Edge Cases & Error States

- **No documents yet**: Table shows empty state ("No documents uploaded yet. Use the upload zone above to add your first document.").
- **Upload without file selected**: Validation error before submit; "Please select a file to upload."
- **Upload without transaction selected**: Validation error; "Please assign this document to a transaction."
- **File type not supported**: Error message "Unsupported file type. Please upload PDF, DOC, DOCX, XLS, or XLSX."
- **File too large**: Error message (file size limit to be defined at implementation).
- **No search results**: Table shows empty state "No documents match your search."

---

## Success Criteria

1. All 5 reference documents render in the table with correct badges, dates, and action buttons.
2. Document Type filter reduces the table to matching documents only.
3. Transaction filter reduces the table to documents assigned to that transaction.
4. Search matches on filename and transaction identifier.
5. Upload zone accepts drag-and-drop; file appears in table after upload.
6. Both required dropdowns (Document Type and Assign to Transaction) must be filled before upload succeeds.

---

## Open Questions

1. Should agents be able to delete documents, or is that an admin-only action?
2. Should document status (Approved/Under Review) be automatically set or manually assignable by the agent?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, upload zone pattern, badge system)
- **Depends on**: 002-transactions (transaction dropdown populated from transaction list)
- **Cross-links**: 001-dashboard (upload from dashboard routes here), 002-transactions (document list visible in transaction modal)
