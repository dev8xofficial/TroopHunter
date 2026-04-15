# Feature Specification: Documents Service

**Feature ID**: 002-documents-service
**Status**: approved
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**API Boundary**: Documents Storage & Signature Orchestration

---

## Overview

The Documents Service manages the metadata indexing, cloud blob storage provisioning, and third-party e-signature orchestration for all transaction files. It operates on a strict metadata-only DB architecture, relying on Cloud Object Storage (e.g. AWS S3) for actual file bytes. The API handles pre-signed upload/download URLs, ensuring the Node.js application layer is never bottlenecked by heavy binary transfers.

---

## Problem Statement

Handling binary file streaming directly through a standard API web server consumes massive RAM and I/O capacity, leading to server crashes during large PDF uploads. Additionally, document signature workflows require secure webhook ingestion. This service abstracts storage logic and integrates asynchronously with signature providers.

---

## Goals

- Define a highly scalable File Upload architecture via Pre-Signed Cloud Storage URLs.
- Define a secure File Download architecture via temporal, short-lived URLs.
- Manage document metadata (categories, sizes, status) linked to the `transaction_id`.
- Ingest and process webhooks from e-signature vendors to transition document states.

---

## Non-Goals

- This service does not store file binary data in the relational database.
- It does not handle creating or rendering the e-signature PDF interface (delegated to third-party providers like DocuSign or PandaDoc).

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Client | Requests read access. Requests upload URLs for `mortgage` & `insurance` file categories. |
| Agent/Lender/Attorney | Requests upload URLs for their protected namespaces (`purchase-sale`, `financial`, `legal`). |
| Third-Party Vendor | (via Webhook) Transmits signature-completed events. |

---

## API Scenarios

### Scenario 1 — Securing an Upload Stream

**Actor**: Any valid authenticated role
**Precondition**: Role intends to upload `w2_form.pdf`.
**Flow**:
1. Client POSTs to `/api/v1/documents/upload-url` with `{ "filename": "w2_form.pdf", "file_size": 1500000, "category": "mortgage" }`.
2. Service validates that the Role has permission to upload to the `mortgage` category.
3. Service generates a UUID (`object_key`).
4. Service requests an S3 Pre-Signed PUT URL constrained to 1.5MB and AWS KMS encryption.
5. API Returns HTTP 200 containing the `uploadUrl` and `document_id`.

**Success**: Client receives a secure direct-to-cloud PUT URL bypassing our backend network bandwidth entirely.

---

### Scenario 2 — Finalizing an Upload

**Actor**: Any valid authenticated role
**Precondition**: Cloud upload (Scenario 1) completed successfully via PUT.
**Flow**:
1. Client POSTs to `/api/v1/documents/finalize` with `{ "document_id": "<uuid>" }`.
2. Service queries the S3 API to verify the file actually exists at the expected key.
3. Service writes the Document Metadata record to the PostgreSQL database with status `under-review`.
4. Service calls Foundation `publishEvent()` to broadcast the `document.uploaded` audit log.

**Success**: Document is fully indexed and available in the transaction scope.

---

### Scenario 3 — E-Signature Provider Webhook Callback

**Actor**: External Signature Vendor
**Precondition**: A document was dispatched for signature. The client just signed it on the vendor's platform.
**Flow**:
1. Vendor POSTs to `/api/v1/documents/webhooks/signature-status`.
2. Request skips user JWT auth, but validates a shared HMAC vendor secret signature.
3. Payload indicates `document_id` is newly signed.
4. Service updates the document DB row status to `approved`.
5. Service emits `document.signed` to the Activity Event Bus.

**Success**: Asynchronous integration automatically advances document status securely.

---

## Functional Requirements

### FR-02-01 — Document Querying (`GET /api/v1/documents`)

- MUST support querying by `transaction_id`.
- MUST support filter query parameters: `?status=needs-signature` or `?category=legal`.
- MUST NOT return the binary blob. MUST only return metadata.

### FR-02-02 — Category Restrictions Middleware

- The endpoint `/upload-url` MUST halt with HTTP 403 if the `SessionContext.role` attempts an unauthorized category.
- **Rule**: `ROLE_CLIENT` cannot request URLs for `purchase-sale` or `legal`.
- **Rule**: `ROLE_AGENT` cannot request URLs for `financial`.

### FR-02-03 — Short-Lived Download Links (`GET /api/v1/documents/{id}/download`)

- MUST verify user context has permission to view the transaction.
- MUST query the Cloud Storage provider to generate an HTTP GET Pre-Signed URL.
- The URL MUST expire strictly in 60 seconds.
- Endpoint responds with a 302 Redirect to the generated link OR a JSON wrapper `{ "url": "..." }`.

### FR-02-04 — Virus Scanning Async Workflow

- When a document is finalized (`FR-02-02`), it MUST be placed in an isolation bucket path.
- A cloud lambda/function scans the blob upon PUT.
- If safe, the lambda moves it to the main path. If infected, it deletes the blob and publishes an `infected` webhook back to the API.

---

## Data & State (Contract Schemas)

### Document Metadata Schema
```json
{
  "document_id": "uuid",
  "transaction_id": "uuid",
  "filename": "string",
  "mime_type": "enum(application/pdf, image/jpeg, image/png, application/msword)",
  "category": "enum(purchase-sale, mortgage, legal, insurance, other)",
  "size_bytes": "number",
  "status": "enum(needs-signature, under-review, approved)",
  "uploaded_by_role": "string",
  "created_at": "iso8601",
  "signature_deadline_at": "iso8601 | null"
}
```

### Upload Initialization Request
```json
{
  "filename": "tax_return_2025.pdf",
  "content_type": "application/pdf",
  "size_bytes": 4500000,
  "category": "mortgage"
}
```

---

## Edge Cases & Error States

- **Orphaned Uploads**: Client requests an `upload-url` but never calls `finalize`. The database is never dirtied with incomplete metadata; an S3 lifecycle rule auto-deletes unlinked blobs after 24 hours.
- **Mismatched Content-Types**: If a client claims PDF but S3 detects a binary EXE, the cloud verification step fails the finalize process.
- **Signature Webhook Replay Attack**: The webhook sink must verify HMAC signatures and ensure idempotency (processing the same `document_id` approval twice changes nothing).

---

## Assumptions

1. The AWS/GCP SDKs are configured securely with IAM roles mapped to this microservice, not hardcoded access keys.
2. The third-party signature provider has an accessible, documented Webhook standard supporting HMAC request signing.

---

## Success Criteria

1. API server memory consumption remains completely flat even when 100 concurrent clients are uploading 50MB files (because bandwidth is offloaded to S3).
2. Unauthorized category upload requests are predictably squashed at the gateway level.
3. E-signature webhooks reliably update the database state within 500ms of vendor dispatch.
