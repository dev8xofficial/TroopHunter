# Feature Specification: Document Management

**Feature ID**: 003-documents
**Status**: approved
**Created**: 2026-04-15
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Module**: Storage & Document Workflows

---

## Overview
Handles uploading, categorization, lifecycle state, and retrieval of transaction-related documents.

---

## Core Data Models

### 1. Document Entity
- `id`: UUID (Primary Key)
- `transaction_id`: UUID (Foreign Key -> Transaction.id)
- `uploader_id`: UUID (Foreign Key -> Agent.id)
- `file_name`: String
- `file_url`: String (Internal remote storage reference)
- `file_type`: String (e.g., application/pdf)
- `category`: Enum (See Schema)
- `status`: Enum `[`UNDER_REVIEW`, `NEEDS_REVIEW`, `APPROVED`]`
- `uploaded_at`: Timestamp

---

## API Design & Endpoints

- **`GET /api/v1/documents`**: Retrieves documents, supporting `?transaction_id=` filters.
- **`POST /api/v1/documents/upload`**: Primary multipart form ingest endpoint.
- **`GET /api/v1/documents/{id}/download`**: Issues short-lived pre-signed URLs.

---

## Payload Validation Schema

```json
{
  "transaction_id": "uuid (Required)",
  "category": "enum: [PURCHASE_AGREEMENT, MORTGAGE_DOCS, INSURANCE_DOCS, INSPECTION_REPORT, TITLE_DOCS, CLOSING_DISCLOSURE] (Required)",
  "file": "binary (Required, max size 15MB, accepted: pdf, doc, docx, xls, xlsx)"
}
```

---

## Business Logic & Constraints

- **Storage Strategy**: Files must not be publicly accessible; strict generation of Pre-signed URLs mapped over AWS S3 / Cloudflare object domains.
- **Lifecycle States**:
  - Documents arrive as `UNDER_REVIEW`.
  - Admin/Compliance designates as `APPROVED` or flags into `NEEDS_REVIEW`.
- **Event Hook**: Emits `DOCUMENT_UPLOADED` to the activity feed mechanism upon successful S3 response.
