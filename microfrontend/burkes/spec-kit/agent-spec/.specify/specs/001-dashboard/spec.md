# Feature Specification: Dashboard API & Analytics

**Feature ID**: 001-dashboard
**Status**: approved
**Created**: 2026-04-15
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Module**: Analytics Aggregation & Activity Feeds

---

## Overview
This module handles the aggregation of high-level Key Performance Indicators (KPIs) and the dispatch mechanisms for real-time activity event feeds for an Agent's dashboard.

---

## Core Data Models

### 1. Activity Log Event
An immutable read-model generated via domain events.
- `id`: UUID (Primary Key)
- `agent_id`: UUID (Indexed)
- `transaction_id`: UUID (Optional)
- `event_type`: Enum `[`OFFER_ACCEPTED`, `AGREEMENT_UPLOADED`, `NEW_LISTING`, `MESSAGE_RECEIVED`]`
- `title`: String
- `description`: Text
- `timestamp`: Timestamp (Indexed descending)

---

## API Design & Endpoints

### KPIs & Aggregation
- **`GET /api/v1/reports/dashboard-kpis`**
  - **Logic**: Aggregates data for the calling `agent_id`.
  - **Calculations**:
    - `activeTransactions`: COUNT of transactions where `status` IN `[`ON_TRACK`, `CLOSING_SOON`, `DELAYED`, `AT_RISK`]`
    - `pendingOffers`: COUNT of transactions where `stage` EQUALS `OFFER_NEGOTIATION`
    - `thisMonthSales`: SUM of `contract_amount` where `status` EQUALS `COMPLETED` AND `closing_date` > Start of Current Month
    - `commissionEarned`: Derived calculated percentage of `thisMonthSales` (business rules apply).
  - **Output Schema**:
```json
{
  "active_transactions": "integer",
  "pending_offers": "integer",
  "month_sales_volume": "number",
  "month_commission": "number"
}
```

### Activity Feed
- **`GET /api/v1/activity-log`**
  - **Params**: `?limit=10&offset=0`
  - **Logic**: Returns chronological events ordered by `timestamp DESC` strictly partitioned by `agent_id`.
  - **Return Type**: Array of `Activity Log Event`.

---

## Payload Validation

- No explicit POST schemas required directly for Dashboard; driven entirely by internal aggregates and domain event generation.

---

## Business Logic & Constraints
- KPI numbers must be guaranteed to eventually reflect true record states (Soft real-time).
- Caching layer (e.g., Redis) may be placed in front of `dashboard-kpis`, expiring/invalidating systematically on dependent transaction update events.
