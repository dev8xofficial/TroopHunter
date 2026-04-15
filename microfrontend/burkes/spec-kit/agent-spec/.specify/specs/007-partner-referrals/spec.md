# Feature Specification: Partner Referrals API

**Feature ID**: 007-partner-referrals
**Status**: approved
**Created**: 2026-04-15
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Module**: Business Directory & Affiliate Engine

---

## Overview
Connects curated domain providers (plumbing, roofing, lending) to Agents and handles the dispatch event flow to alert partners of viable client referrals.

---

## Core Data Models

### 1. Partner Entity
- `id`: UUID (Primary Key)
- `name`: String
- `category`: Enum `[`PLUMBING`, `ROOFING`, `ELECTRICAL`, `CREDIT_REPAIR`, `HOME_INSPECTION`, `MOVING`]`
- `rating`: Decimal (Constraint: 0.0 to 5.0)
- `review_count`: Integer
- `service_tags`: Array[String]
- `zip_codes_serviced`: Array[String]
- `is_featured`: Boolean
- `contact_email`: String
- `contact_phone`: String

### 2. Partner Referral Request
- `id`: UUID (Primary Key)
- `agent_id`: UUID
- `client_id`: UUID
- `partner_id`: UUID
- `property_address`: String
- `notes`: Text
- `status`: Enum `[`SENT`, `ACCEPTED`, `COMPLETED`]`
- `created_at`: Timestamp

---

## API Design & Endpoints

- **`GET /api/v1/partners`**
  - Searches for valid ecosystem partners. Filters: `?category=`, `?zip_code=`.
- **`POST /api/v1/partners/referrals`**
  - Synthesizes the client data payload and emits a dispatch hook to the chosen partner.

---

## Payload Validation Schema

### Referral Creation
```json
{
  "client_id": "uuid (Required)",
  "category": "enum (Required, valid partner category limit)",
  "partner_id": "uuid (Required)",
  "property_address": "string",
  "notes": "string"
}
```

---

## Business Logic & Constraints

- A dispatched referral must snapshot the client information.
- The `POST /api/v1/partners/referrals` pushes a job into the queue to invoke an external webhook/email flow notifying the `contact_email` of the Partner.
