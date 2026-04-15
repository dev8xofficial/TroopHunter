# Feature Specification: Scheduling API

**Feature ID**: 006-calendar
**Status**: approved
**Created**: 2026-04-15
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Module**: Appointments

---

## Overview
Manages point-in-time and duration-based scheduling events assigned to transactions, partners, or general agent activities bounds.

---

## Core Data Models

### 1. Appointment Entity
- `id`: UUID (Primary Key)
- `agent_id`: UUID (Indexed)
- `client_id`: UUID (Indexed, Optional)
- `transaction_id`: UUID (Indexed, Optional)
- `type`: Enum `[`PROPERTY_SHOWING`, `CLIENT_CONSULTATION`, `CLOSING_MEETING`, `HOME_INSPECTION`, `FINAL_WALKTHROUGH`, `OTHER`]`
- `start_time`: Timestamp
- `end_time`: Timestamp
- `location`: String
- `notes`: Text

---

## API Design & Endpoints

- **`GET /api/v1/appointments`**
  - Crucial Query Filters: `?start_date=ISO_DATE`, `?end_date=ISO_DATE`
- **`POST /api/v1/appointments`**
  - Ingests new scheduled blocks.
- **`DELETE /api/v1/appointments/{id}`**

---

## Payload Validation Schema

```json
{
  "type": "enum (Required)",
  "client_id": "uuid (Optional)",
  "transaction_id": "uuid (Optional)",
  "start_time": "date-time (Required)",
  "end_time": "date-time (Required, must be > start_time)",
  "location": "string",
  "notes": "string"
}
```

---

## Business Logic & Contraints

- **Logical Integrity**: The API strictly enforces that `end_time` mathematically succeeds `start_time`. Timezones MUST natively transmit and store in UTC to prevent drift across localized client reads.
