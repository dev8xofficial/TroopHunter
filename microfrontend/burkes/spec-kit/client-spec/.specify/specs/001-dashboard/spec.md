# Feature Specification: Dashboard Aggregator Service

**Feature ID**: 001-dashboard-aggregator
**Status**: approved
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**API Boundary**: Aggregator Service

---

## Overview

The Dashboard Aggregator Service acts as the API Composition layer for client frontends. Instead of requiring the client device to make 10+ sequential or parallel HTTP calls to gather transaction, document, mortgage, and insurance status telemetry, this backend service queries the underlying domain databases concurrently, applies logic to extract the most pressing "Action Items," and delivers a single, highly optimized JSON payload.

---

## Problem Statement

Direct client-to-microservice querying causes over-fetching, N+1 request problems, and pushes complex aggregation logic (like determining what constitutes an "Action Required") into the frontend codebase. This degrades mobile performance and scatters business rules. The Aggregator Service centralizes these rules into a single backend domain.

---

## Goals

- Provide a single `GET` endpoint returning a unified transaction summary.
- Compute global "completion percentages" based on domain sub-states.
- Structurally define "Action Required" items dynamically (e.g., assessing if `documents` pending signature takes precedence over `insurance` forms).
- Fetch the exact number of recent `ActivityEvents` needed for initial client hydration without querying the full log.

---

## Non-Goals

- This service is entirely read-only. It exposes no `POST/PUT/PATCH` routes. Mutations to transaction states must be made against their respective domain APIs (`002` through `006`).
- It does not persist any durable state of its own; it orchestrates data from other databases/caches.

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Any Role | Can query the aggregator; however, the response payload is dynamically filtered based on the `SessionContext` role (e.g. Clients see their outstanding actions; Lenders see lender-specific aggregate blockers). |

---

## API Scenarios

### Scenario 1 — Fetch Core Aggregation Payload

**Actor**: Client Frontend
**Precondition**: Client transmits a valid GET request.
**Flow**:
1. Request hits `GET /api/v1/dashboard/summary`.
2. Aggregator issues parallel internal queries (via gRPC or fast internal HTTP) to: `DocumentsDB`, `MortgageDB`, `InsuranceDB`, and `TransactionsDB`.
3. The internal calls block until complete (with an aggressive 200ms timeout per call).
4. Aggregator maps the results into the standard Summary Schema.
5. Service inspects the results to append dynamic `action_items` (e.g., if `requires_signature_count > 0`, append an action item flag).

**Success**: API returns HTTP 200 with the fully hydrated JSON object.

---

### Scenario 2 — Fetching Activity Log Feed

**Actor**: Any Role
**Precondition**: Role transmits a request to see recent events.
**Flow**:
1. Request hits `GET /api/v1/dashboard/feed?limit=6`.
2. Service queries the global `activity_logs` table filtering by the `SessionContext.transaction_id`.
3. Service returns the ordered JSON array.

**Success**: API returns HTTP 200 with exactly the requested limit of structured activity events.

---

## Functional Requirements

### FR-01-01 — Central Aggregation Endpoint (`GET /api/v1/dashboard/summary`)

- The endpoint MUST execute domain queries concurrently to minimize total latency.
- The response MUST contain a computed `global_completion_percentage`. This metric is determined by a hardcoded backend formula weighing stage completion against document counts.
- The response MUST contain a canonical array of `action_items`. An action item is generated if:
  - Document domain has `needs-signature` count > 0.
  - Mortgage domain reports `status === 'pending_client'`.
  - Insurance domain reports `home_status === 'not-started'`.

### FR-01-02 — Stage Timeline Construction

- The API MUST return a `timeline` block containing all 11 stages and their computed state (`complete`, `in_progress`, `pending`).
- Logic for determining an `in_progress` stage relies on the underlying domain state (e.g., Stage 5 is "in progress" if `Mortgage` is `under_underwriting`).

### FR-01-03 — Professional Team Directory Fetch

- The response MUST include a `team_members` array mapping the `UUID` of assigned professionals to their `Name`, `RoleCode`, and `Direct_Contact` info, shielding the frontend from having to resolve User UUIDs.

---

## Data & State (Contract Schemas)

### Dashboard Summary Response Schema
```json
{
  "transaction_id": "uuid",
  "global_progress": {
    "percentage": 65,
    "current_stage": 5,
    "label": "Under Contract"
  },
  "metrics": {
    "documents_total": 45,
    "documents_awaiting_signature": 2,
    "insurance_policies_pending": 1
  },
  "action_items": [
    {
      "priority": 1,
      "type": "SIGNATURE_REQUIRED",
      "message": "2 documents await your signature",
      "target_domain": "documents"
    }
  ],
  "domain_summaries": {
    "mortgage": {
      "status": "in_progress",
      "estimated_rate": 6.5,
      "loan_amount": 400000
    },
    "insurance": {
      "home_status": "completed",
      "auto_status": "pending"
    }
  },
  "team_members": [
    { "role": "ROLE_AGENT", "name": "Sarah Smith", "id": "uuid" }
  ]
}
```

---

## Edge Cases & Error States

- **Internal Service Timeout**: If `InsuranceDB` is unreachable during the parallel fetch, the API MUST NOT fail the entire request. It must return the aggregator payload with `insurance: { status: "unavailable" }` and HTTP 206 Partial Content or HTTP 200 with an internal flag.
- **Empty State**: If no actions are outstanding, the `action_items` array must be empty (`[]`), not null or omitted.

---

## Assumptions

1. The data fetched by the aggregator is eventual-consistent. Given the low-velocity nature of real-estate transactions, a caching layer (Redis) TTL of 15 seconds for this payload is perfectly acceptable.

---

## Success Criteria

1. Endpoint latency must reliably fall below 250ms at p95 under standard load.
2. If any underlying service crashes, the aggregator degrades gracefully, still serving the available domains.
3. The computed `action_items` array perfectly matches the business logic triggers across domain boundaries.
