# Feature Specification: Reports & Analytics

**Feature ID**: 008-reports
**Status**: approved
**Created**: 2026-04-15
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Module**: Business Intelligence & Aggregation Data

---

## Overview
Exposes heavily optimized aggregate datasets and historical lookup tables to power the agent's complex volume tracking and temporal commission reporting requirements.

---

## Core Data Scope
This module strictly computes aggregations based on the immutable logs and transaction records mapped within the core operational domains (Module 002).

---

## API Design & Endpoints

- **`GET /api/v1/reports/performance`**
  - Retrieves overarching performance metrics.
  - Logic Engine returns: Total Sales Volume YTD, Commission YTD, Avg Days to Close, Platform Client Satisfaction Score.

- **`GET /api/v1/reports/pipeline`**
  - Generates the grouping distributions.
  - Logic Engine groups all active transactions by `stage` Enum and translates to Count integers.

- **`GET /api/v1/reports/areas`**
  - Aggregates the volume footprint.
  - Logic computes the SUM of `contract_amount` grouped by parsed GeoLocation or ZIP ranges extracted from `property_address`.

---

## Output Response Logic

### Performance Aggregation JSON
```json
{
  "ytd_sales_usd": 5200000,
  "ytd_commissions_usd": 156000,
  "ytd_closed_count": 18,
  "avg_days_to_close": 42
}
```

### Pipeline Distribution JSON
```json
{
  "INITIAL_CONSULTATION": 12,
  "PROPERTY_SEARCH": 6,
  "OFFER_NEGOTIATION": 3,
  "UNDER_CONTRACT": 2,
  "CLOSING_PREPARATION": 4
}
```

---

## Constraints

- Heavy database joins mapped over transactions.
- Must execute leveraging Materialized Views or nightly BI cron refreshes to guarantee performant (<100ms) payload deliveries.
