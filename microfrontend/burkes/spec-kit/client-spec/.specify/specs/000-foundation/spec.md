# Feature Specification: Portal Foundation API & Global Middleware

**Feature ID**: 000-foundation
**Status**: approved
**Created**: 2026-04-09
**API Boundary**: Global Gateway — applies to all service routes

---

## Overview

The Foundation spec defines the shared backend infrastructure that every service in The Burkes Group Client Portal depends on: authentication middleware, identity context extraction, Role-Based Access Control (RBAC), global error handling, and the centralized event-bus activity logger. All specialized domain services (001–006) inherit these constraints and must register routes through this foundation gateway.

---

## Problem Statement

Without a centralized foundation layer, individual microservices risk implementing conflicting token validations, erratic error payload shapes, and scattered audit logging, resulting in a fragmented and insecure system. The Foundation establishes the definitive API contract for identifying users and tracking mutations securely.

---

## Goals

- Define how JWT session tokens are issued, verified, and mapped to a User Context.
- Establish the RBAC matrix that evaluates if an `actor` can execute a `method` on an `endpoint`.
- Standardize the JSON error response schema across all APIs.
- Define the global Activity Event Bus contract that records all state mutations.

---

## Non-Goals

- This spec does not define the external Identity Provider (e.g., Auth0/Okta) login screens or configurations. It only covers token verification within our gateway.
- It does not define domain-specific business logic (e.g., how a mortgage gets underwritten).

---

## Actors (System Roles)

| Role Code | Privileges in Foundation |
|-----------|---------------------------|
| `ROLE_CLIENT` | Scoped identity. Can only query/mutate transactions explicitly assigned to their `client_id`. |
| `ROLE_AGENT`, `ROLE_LENDER`, `ROLE_ATTORNEY` | Professional scope. Can read transaction data and mutate their respective category domains. |
| `ROLE_CPA` | Read-only scope across the transaction. |
| `ROLE_ADMIN_TC` | Global overwrite privileges. System bypass overrides. |

---

## API Scenarios

### Scenario 1 — Gateway Authenticates a Request

**Actor**: Any API Client
**Precondition**: Client transmits a request with an `Authorization: Bearer <Token>` header.
**Flow**:
1. API Gateway intercepts the request.
2. Foundation Auth Middleware validates the JWT signature using the public JWKS URI.
3. Middleware extracts `user_id`, `role`, and `transaction_ids`.
4. The resolved User Context object is attached to the request `ctx` and passed to the downstream service.

**Success**: Downstream controller receives a trusted User Context object in <10ms.

---

### Scenario 2 — RBAC Denies Unauthorized Mutation

**Actor**: Client (`ROLE_CLIENT`)
**Precondition**: Client attempts a `POST /api/v1/documents/legal` request.
**Flow**:
1. Request passes authentication.
2. RBAC Middleware checks the target endpoint `POST /api/v1/documents/legal` against the `ROLE_CLIENT` matrix.
3. The matrix specifies that clients cannot mutate the `legal` document namespace.
4. Middleware terminates the request.

**Success**: API returns HTTP 403 Forbidden with a standardized error schema. Downstream service is never invoked.

---

### Scenario 3 — Service Publishes to the Activity Log

**Actor**: Domain Service Application
**Precondition**: A meaningful mutation completes (e.g. `documents` service saves a file).
**Flow**:
1. Service commits the record to its primary database.
2. Service publishes an `ActivityEvent` to the central Redis/Kafka Event Bus.
3. The Foundation Activity Worker consumes the event.
4. The Worker writes an immutable row to the Global Activity Log database table.

**Success**: The event is permanently recorded for audit and client-dashboard consumption.

---

## Functional Requirements

### FR-00-01 — Authentication Middleware

- All routes prefixed with `/api/v1/*` (except `/webhooks/*`) MUST require a valid JWT via the HTTP `Authorization` header.
- Tokens MUST be signed using RS256.
- The middleware MUST reject expired tokens (`exp` claim) with HTTP 401 Unauthorized.
- The middleware MUST construct a readonly `SessionContext` object containing `user_id`, `email`, `role`, and `active_transaction_id` (if submitted via `X-Transaction-ID` header) to pass to controllers.

### FR-00-02 — RBAC Enforcement Engine

- A declarative permission matrix MUST be defined, mapping `(Role, HTTP Method, Route Pattern)` to a boolean authorization result.
- If a route is not explicitly allowed for a role, it MUST default to denied (HTTP 403).
- Contextual validation (e.g. "Does this client own this transaction?") MUST run in the controller layer using the `SessionContext`, not in the global RBAC middleware.

### FR-00-03 — Canonical Error Responses

- All foundation layers and downstream services MUST format API errors using the following schema:
  ```json
  {
    "error": {
      "code": "string (e.g., UNAUTHORIZED, PAYLOAD_INVALID)",
      "message": "string (human readable)",
      "details": "object (optional, array of schema validation failures)"
    },
    "request_id": "uuid"
  }
  ```
- Unhandled server exceptions MUST be caught by the global error handler, logged internally, and returned as HTTP 500 with a generic `"INTERNAL_ERROR"` message to prevent stack-trace leakage.

### FR-00-04 — Central Activity Event Bus

- The Foundation MUST expose an async `publishEvent()` utility to all services.
- Events MUST be formatted to the `ActivityEvent` schema.
- The Event Publisher MUST NOT block the HTTP response cycle of the originating request.
- A background consumer MUST process these events with at least once delivery guarantees, writing them to a centralized append-only `activity_logs` table.

### FR-00-05 — Global Request Tracing

- The Gateway MUST assign a UUID `X-Request-Id` to every incoming request.
- This UUID MUST be included in all standard HTTP responses and attached to all internal system logs and Activity Events generated during that request cycle to allow cross-service tracing.

---

## Data & State

| Model | Type | Description |
|-------|------|-------------|
| `SessionContext` | Object (In-Memory) | `{ user_id, role, transaction_id_context }` |
| `ActivityEvent` | Payload Schema | Strict structure for the event bus containing: `event_id`, `timestamp`, `actor_role`, `label`, `description`, `context_metadata`. |

---

## Edge Cases & Error States

- **Missing/Malformed Auth Header**: Immediately reject with HTTP 401.
- **Valid JWT, but deleted User in DB**: Middleware should cache revoked/deleted statuses or check against a fast Redis blocklist to reject ghost sessions.
- **Event Bus Unreachable**: If the activity broker is down, `publishEvent()` must fall back to local disk logging or a robust dead-letter queue so audit trails are never lost.

---

## Assumptions

1. An external Identity Provider (e.g. Auth0) is managing the actual passwords, MFA, and JWT generation. The foundation only validates the claims.
2. The Activity Log persistence layer can handle the high write throughput of every mutation across the platform.

---

## Success Criteria

1. An unauthenticated request to ANY protected route reliably receives a canonical 401 response in <10ms.
2. A single request trace ID successfully correlates logs from the Gateway, Auth Middleware, and a Domain Controller.
3. Every mutating endpoint in modules 001-006 successfully triggers an asynchronous record in the `activity_logs` table without adding more than 5ms overhead to the request latency.

---

## Dependencies

- **Depends on**: External JWKS Endpoint (Identity Provider). Redis/Kafka for Event Bus.
- **Required by**: Every domain service (001–006) runs behind this foundation logic.
