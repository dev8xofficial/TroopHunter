# Feature Specification: Mortgage Underwriting Service

**Feature ID**: 005-mortgage
**Status**: approved
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**API Boundary**: Mortgage Logic & LOS Integration

---

## Overview

The Mortgage Underwriting Service manages the strict State Machine of the borrower's loan application. It processes complex, deeply nested JSON payloads of employment and financial history, locks submissions, and orchestrates bidirectional webhooks with external Loan Origination Systems (LOS) to track approval status.

---

## Problem Statement

Mortgage progress relies on both client-submitted data and asynchronous lender decisions. If the portal merely records UI text, state drifts out of sync with the actual LOS. This backend service guarantees rigid progression logic and serves as the integration sink for lender updates, maintaining referential integrity across the transaction.

---

## Goals

- Implement a State Machine API preventing invalid application transitions (e.g., submitting before employment data exists).
- Model strict JSON payload schemas for Personal, Property, and Employment data.
- Expose a secure Webhook endpoint for external Lender tools to inject "Pre-Approval" or "Conditions" data.

---

## Non-Goals

- The API does not run predictive credit models.
- It does not automatically generate PDF versions of the Uniform Residential Loan Application (URLA); it only structures the raw data.

---

## API Scenarios

### Scenario 1 — Incremental Progress via PATCH

**Actor**: Client App
**Precondition**: Client has saved `personal_info`.
**Flow**:
1. Client POSTs to `/api/v1/mortgage/application/employment`.
2. Service validates that the preceding states (`personal_info`, `property_details`) are completed.
3. Service validates the employment array schema.
4. Service mutates the `mortgage` record and advances the internal `application_step`.

**Success**: API returns 200 OK. State machine advanced.

### Scenario 2 — Application Locking & Submission

**Actor**: Client App
**Precondition**: All sections 1-4 are verified complete.
**Flow**:
1. Client POSTs to `/api/v1/mortgage/application/submit`.
2. Backend verifies all state requirements (including required document checks against `002-documents`).
3. Backend sets `status = 'submitted'`, immediately locking the record from further client `PATCH` requests.
4. An event `mortgage.application.submitted` fires.
5. The Event Bus triggers an outbound Webhook delivery to the Lender's LOS API.

**Success**: Record is locked securely. External system is notified.

### Scenario 3 — Lender Webhook Integration

**Actor**: External LOS System
**Precondition**: Lender makes a credit decision.
**Flow**:
1. External system POSTs a signed payload to `/api/v1/webhooks/lender/decision`.
2. Webhook middleware verifies the HMAC signature using the configured lender secret.
3. The payload contains `{ "decision": "pre-approved", "loan_amount": 400000, "rate": 6.5 }`.
4. Service updates the `mortgage` database schema and sets `underwriting_status`.
5. Event `mortgage.decision.received` is broadcasted.

**Success**: Asynchronous system sync completes securely.

---

## Functional Requirements

### FR-05-01 — Strict Payload Schemas

- The service MUST validate employment arrays to ensure no overlapping "Current" jobs exist, and `start_date` < `end_date`.
- The service MUST validate financial numeric values to reject non-finite inputs.

### FR-05-02 — State Transition Guards

- The `/submit` endpoint MUST reject requests with HTTP 409 Conflict if preceding states (`employment`, `financial_docs`) do not resolve to complete. This ensures the frontend cannot spoof a submission.

### FR-05-03 — Mutability Locking

- If `status !== 'draft'`, all `PATCH` endpoints for personal/employment data MUST return HTTP 403 Forbidden unless the `actor` has `ROLE_ADMIN_TC` override privileges.

### FR-05-04 — Cross-Service Document Verification

- The submission logic REQUIRES verifying document existence. The Mortgage Service must issue an internal query to the Documents Service: `if (docs.count(category: 'mortgage') < required_threshold) throw Error()`.

---

## Data & State (Contract Schemas)

### Application Submission State Matrix

| State Name | Allowed Mutator | Downstream Blockers |
|------------|----------------|--------------------|
| `draft` | Client | Submission Locked |
| `submitted`| None | Awaiting Underwriting |
| `under_review`| Lender | None |
| `conditional` | Lender | Requires Client Action |
| `cleared` | Lender | Triggers Title workflows |

### Webhook Reception Schema
```json
{
  "entity_id": "uuid",
  "source_system": "string (Envoy / Encompass)",
  "payload": {
    "status": "enum(pre-approved, denied, conditions_required)",
    "rate_lock_date": "iso8601",
    "financials": {
        "loan_amount": "number",
        "rate": "number"
    }
  }
}
```

---

## Edge Cases & Error States

- **LOS Sync Failures**: If the outbound hook to the Lender LOS fails, the service leverages a dead-letter queue (DLQ) to retry with exponential backoff.
- **Race conditions**: Concurrent PATCH requests on the employment array must use optimistic locking (e.g. tracking `record_version`) to prevent data interleaving.

---

## Success Criteria

1. End-to-end application submission locks the database row reliably and triggers the LOS webhook 100% of the time.
2. Form completion sequence logic resides entirely in the backend, meaning client API spoofers cannot jump stages.
