# SSO

> **Module ID**: `005-sso`
> **Domain**: Authentication & Identity (0xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The SSO module provides Google sign-in for candidate and client portals, plus controlled account-linking rules for existing credentials.

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

### FR-005-01: Start Google sign-in for supported portals

**Description**: The system shall initiate Google authentication only for candidate and client portal entry.

**Acceptance Criteria**:
- [ ] Admin and CRM privileged roles cannot use Google SSO to access admin-only flows.
- [ ] The provider handshake preserves the selected target portal.
- [ ] Provider state is signed and expires quickly.

### FR-005-02: Complete SSO callback safely

**Description**: The system shall validate the provider callback before issuing a platform session.

**Acceptance Criteria**:
- [ ] Invalid provider state is rejected.
- [ ] New identities are linked or provisioned only for allowed roles.
- [ ] Successful completion emits an audit event with provider context.

### FR-005-03: Support account linking

**Description**: The system shall allow an existing eligible account to link a provider identity.

**Acceptance Criteria**:
- [ ] Only candidate and client accounts may link Google identity.
- [ ] A provider identity can be bound to only one platform account.
- [ ] Linked identity can later be disabled without deleting the local account.

---

## Data Model

### SsoIdentity

Linked third-party identity for an eligible platform account.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| user_id | uuid | Yes | FK -> User.id | Linked platform user |
| provider | string | Yes | enum: google | Identity provider |
| provider_subject | string | Yes | Unique provider subject | Provider user id |
| status | string | Yes | enum: pending, linked, disabled | Link state |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-005-01: Portal eligibility

**Condition**: When SSO starts
**Action**: Allow only candidate and client portals.
**Rationale**: Admin and CRM privileged access require stricter credential controls

### BR-005-02: Unique provider binding

**Condition**: When linking a provider identity
**Action**: Reject the link if the provider subject is already attached to another platform account.
**Rationale**: Prevents identity collision

---

## State Machine

See [state-machines.md](state-machines.md) for the sso handshake lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/auth/sso/google/init`
- `POST /api/v1/auth/sso/google/callback`
- `POST /api/v1/auth/sso/google/link`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `auth.sso.started` (EVT-005-01)
- `auth.sso.completed` (EVT-005-02)
- `auth.sso.linked` (EVT-005-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 001-authentication | Upstream | Issues the resulting session after provider validation |
| 002-portal-routing | Downstream | Uses selected portal information during callback completion |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-006-portal-routing-architecture.md](../../decisions/adr-006-portal-routing-architecture.md)
- [adr-010-multi-portal-auth.md](../../decisions/adr-010-multi-portal-auth.md)