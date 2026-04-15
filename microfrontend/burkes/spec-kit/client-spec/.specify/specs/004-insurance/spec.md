# Feature Specification: Insurance Forms API

**Feature ID**: 004-insurance-api
**Status**: approved
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**API Boundary**: Insurance Domain Service

---

## Overview

The Insurance Forms API is responsible for ingesting, validating, and persisting policy data packets (Home, Auto, and Warranty insurance). Because lenders require this data prior to underwriting, the API enforces strict JSON schema validation and calculates the cumulative "Insurance Ready" status for the transaction.

---

## Problem Statement

Unstructured insurance collection leads to missing VIN numbers, dates of birth in the future, and unassigned property addresses. By exposing a strict JSON schema via API, the backend prevents invalid data from ever reaching the database and ensures lenders always consume structured, pristine policy records.

---

## Goals

- Define highly strict JSON schemas for `Home`, `Auto`, and `Warranty` insurance records.
- Provide idempotent `PUT` operations for form saves.
- Track completion states to block or unblock the downstream Mortgage Underwriting process.

---

## Non-Goals

- The API does not pull quotes from actual insurance carriers.
- It does not process the document uploads directly (delegated to `002-documents`).

---

## API Scenarios

### Scenario 1 — Submitting Auto Insurance Data

**Actor**: Client App
**Precondition**: Client transmits a valid JSON payload.
**Flow**:
1. Client `PUT`s to `/api/v1/insurance/{tx_id}/auto`.
2. RBAC verifies the caller owns `{tx_id}`.
3. Schema Validation runs (checks that `vin` is exactly 17 chars and alphanumeric, `dob` is < today).
4. System updates the record.
5. System evaluates the overall `insurance_status` and emits an event `insurance.auto.updated`.

**Success**: Database mutated; 200 OK returned.

---

### Scenario 2 — Validation Rejection

**Actor**: Client App
**Precondition**: Payload has an invalid `dob` (e.g. 2040-01-01).
**Flow**:
1. Request hits `/api/v1/insurance/{tx_id}/home`.
2. AJV/Zod Schema evaluation fails on the `dob` property.
3. Request aborts immediately.

**Success**: API returns HTTP 400 Bad Request with a structured error array `[{ field: 'dob', message: 'Date must be in the past' }]`.

---

## Functional Requirements

### FR-04-01 — Insurace State Querying (`GET /api/v1/insurance/{tx_id}`)

- Service MUST return the state of all three policies.
- Responses MUST omit `null` objects for policies not yet started.

### FR-04-02 — Policy Upsert Endpoints

- Endpoints `/auto`, `/home`, and `/warranty` MUST support idempotent `PUT` (create or update).
- The `transaction.property_address` MUST be implicitly linked to the `home` and `warranty` records by the backend, prohibiting the client from submitting a mismatched address payload.

### FR-04-03 — Cross-Domain Status Recalculation

- Every successful `PUT` must trigger a recalculation of the master `insurance_readiness` state.
- Once all required policies cross into "completed", a `insurance.stage.complete` event is published.

---

## Data & State (Contract Schemas)

### Upsert Auto Policy Payload
```json
{
  "policyholder_name": "string (min 2 chars)",
  "date_of_birth": "iso8601 (past)",
  "vin": "string (pattern: ^[A-HJ-NPR-Z0-9]{17}$)",
  "notes": "string (optional)"
}
```

### Upsert Home/Warranty Payload
```json
{
  "policyholder_name": "string",
  "date_of_birth": "iso8601 (past)",
  "notes": "string (optional)"
}
```
*(Note: Property address is derived from server state, not client payload)*

### Domain Status Response
```json
{
  "transaction_id": "uuid",
  "overall_status": "enum(not-started, pending, complete)",
  "policies": {
    "auto": {
      "status": "complete",
      "data": { ... }
    },
    "home": {
      "status": "pending",
      "data": null
    }
  }
}
```

---

## Edge Cases & Error States

- **Date formatting**: Strict iso8601 parsing prevents timezone drift bugs.
- **VIN Regex**: Prevent characters `I`, `O`, `Q` in VIN payloads.

---

## Success Criteria

1. API rejects 100% of malformed data via schema without hitting application-layer code.
2. Form idempotency allows clients to retry network-failed saves without duplicating records.
