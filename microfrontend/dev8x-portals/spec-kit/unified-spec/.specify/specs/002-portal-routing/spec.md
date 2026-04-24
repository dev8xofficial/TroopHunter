# Portal Routing

> **Module ID**: `002-portal-routing`
> **Domain**: Authentication & Identity (0xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Portal Routing module resolves the selected portal, verifies that the user role may enter that portal, and returns the correct destination after authentication.

---

## Actors

| Actor | Role | Interaction |
| --- | --- | --- |
| Candidate | candidate | Registers and authenticates into the candidate portal |
| Client | client | Authenticates into the client portal |
| HR Admin | hr_admin | Authenticates into the admin portal with MFA |
| Super Admin | super_admin | Authenticates into privileged administrative flows |
| Sales Rep | sales_rep | Authenticates into CRM portal access |
| Manager | manager | Authenticates for managed account oversight |
| System | system | Issues tokens, challenges, and audit events |

---

## Functional Requirements

### FR-002-01: Publish portal metadata

**Description**: The system shall expose the supported portals and their allowed entry routes.

**Acceptance Criteria**:
- [ ] Candidate, client, admin, and CRM portals are present in the registry.
- [ ] Each portal includes a default landing destination.
- [ ] Disabled or unavailable portals are omitted from the selector response.

### FR-002-02: Resolve post-auth destinations

**Description**: The system shall return the correct landing page for the current role and portal.

**Acceptance Criteria**:
- [ ] Role-to-portal mismatches are rejected.
- [ ] Managers route only to managed areas they are permitted to access.
- [ ] Users can resume the last permitted destination when one exists.

### FR-002-03: Prevent unauthorized navigation

**Description**: The system shall block direct portal entry when the session portal and route do not match.

**Acceptance Criteria**:
- [ ] Portal mismatch returns FORBIDDEN.
- [ ] Blocked navigation writes an audit event.
- [ ] Resolution logic is deterministic for the same input claims.

---

## Data Model

### PortalConfig

Canonical configuration for a navigable portal.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| portal_key | string | Yes | unique | Portal identifier |
| default_route | string | Yes | URL path | Landing route after login |
| allowed_roles | array | Yes | platform role ids | Roles permitted to enter the portal |
| enabled | boolean | Yes | default true | Portal availability flag |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

### RouteDecision

Evaluated routing result for a current user context.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| user_role | string | Yes | platform role id | Current user role |
| portal_key | string | Yes | portal identifier | Requested portal |
| resolved_route | string | Yes | URL path | Chosen destination |
| decision | string | Yes | enum: allow, deny, redirect | Routing outcome |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-002-01: Role-to-portal match

**Condition**: When resolving a route
**Action**: Allow only role and portal combinations approved by the registry.
**Rationale**: ADR-006

### BR-002-02: Last-route safety

**Condition**: When restoring a last destination
**Action**: Return the stored route only if it remains permitted for the current session.
**Rationale**: Prevents stale or leaked deep links

---

## State Machine

See [state-machines.md](state-machines.md) for the portal resolution lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/portals/config`
- `POST /api/v1/portals/resolve`
- `GET /api/v1/portals/last-destination`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `auth.portal.selected` (EVT-002-01)
- `auth.route.resolved` (EVT-002-02)
- `auth.route.blocked` (EVT-002-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 001-authentication | Upstream | Consumes authenticated role and portal claims |
| 000-foundation | Shared | Reads canonical portal and role registry definitions |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-006-portal-routing-architecture.md](../../decisions/adr-006-portal-routing-architecture.md)
- [adr-010-multi-portal-auth.md](../../decisions/adr-010-multi-portal-auth.md)