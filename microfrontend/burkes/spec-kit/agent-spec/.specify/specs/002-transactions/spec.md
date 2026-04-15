# Feature Specification: Transactions Processing

**Feature ID**: 002-transactions
**Status**: approved
**Created**: 2026-04-15
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Module**: Core Real Estate Deal Context

---

## Overview
The Transactions module maintains the central state machine for real estate deals, enforcing the rigid progression of transaction stages and associated payloads through API interactions.

---

## Core Data Models

### 1. Transaction Entity
- `id`: UUID (Primary Key)
- `transaction_number`: String (Unique constraint, e.g. TRX-10247)
- `agent_id`: UUID (Foreign Key -> Agent.id)
- `client_id`: UUID (Foreign Key -> Client.id)
- `type`: Enum `[`PURCHASE`, `SALE`, `REFINANCE`, `DIVORCE_ASSET_SPLIT`]`
- `property_address`: String
- `contract_amount`: Decimal
- `stage`: Enum (See State Machine below)
- `status`: Enum `[`ON_TRACK`, `CLOSING_SOON`, `DELAYED`, `AT_RISK`, `COMPLETED`]`
- `closing_date`: Date
- `mortgage_lender_id`: UUID (Foreign Key, Optional)
- `attorney_id`: UUID (Foreign Key, Optional)

---

## API Design & Endpoints

- **`GET /api/v1/transactions`**: List transactions for current `agent_id`.
- **`GET /api/v1/transactions/{id}`**: Retrieve transaction detail.
- **`POST /api/v1/transactions`**: Create new transaction.
- **`POST /api/v1/transactions/{id}/stage-update`**: Request stage update.

---

## Payload Validation Schemas

### Create Transaction Schema
```json
{
  "client_id": "uuid (Required)",
  "type": "enum: [PURCHASE, SALE, REFINANCE, DIVORCE_ASSET_SPLIT] (Required)",
  "property_address": "string (Required)",
  "contract_amount": "number (Required, min 0)",
  "stage": "string (Required, Valid Stage)",
  "closing_date": "date"
}
```

### Stage Update Request Schema
```json
{
  "new_stage": "string (Required, Valid Stage Enum)",
  "reason": "string (Required, min 10 chars)"
}
```

---

## Business Logic & State Machines

### 12-Step Transaction Pipeline
Transactions advance strictly through these accepted states:
1. `INITIAL_CONSULTATION`
2. `PROPERTY_SEARCH`
3. `OFFER_NEGOTIATION`
4. `UNDER_CONTRACT`
5. `MORTGAGE_APPLICATION`
6. `INSURANCE_DOCUMENTATION`
7. `ATTORNEY_TITLE_REVIEW`
8. `INSPECTION_APPRAISAL`
9. `CLOSING_PREPARATION`
10. `MORTGAGE_UNDERWRITING`
11. `FINAL_WALKTHROUGH`
12. `COMPLETED`

### Stage Transition Constraints
- **Agent Constraints**: Agents issue `STAGE_UPDATE_REQUESTED` asynchronously.
- **Admin Constraints**: The backend queue isolates state transitions pending an Admin's `Approve/Deny`.
- Only terminal stages trigger "Completed" analytic boundaries.
