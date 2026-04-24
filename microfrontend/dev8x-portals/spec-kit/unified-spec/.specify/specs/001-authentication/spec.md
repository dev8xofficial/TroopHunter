# Authentication

> **Module ID**: `001-authentication`
> **Domain**: Authentication & Identity (0xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Authentication module validates credentials, creates portal-scoped sessions, applies account lockout, and handles candidate registration for the Dev8X platform.

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

### FR-001-01: Validate email and password credentials

**Description**: The system shall authenticate users against stored credentials without leaking whether an email exists.

**Acceptance Criteria**:
- [ ] Valid credentials create a session for the selected portal.
- [ ] Invalid email and invalid password return the same error response.
- [ ] Successful login records IP address, user agent, and portal.

### FR-001-02: Support candidate self-registration

**Description**: The system shall allow only candidates to register new accounts.

**Acceptance Criteria**:
- [ ] Registration requires first name, last name, email, and password confirmation.
- [ ] Duplicate email addresses are rejected.
- [ ] New candidate accounts remain inactive until verification completes.

### FR-001-03: Manage portal-scoped sessions

**Description**: The system shall issue sessions whose role and portal claims restrict downstream access.

**Acceptance Criteria**:
- [ ] Admin sessions require later MFA completion.
- [ ] Session lifetime follows the selected portal policy.
- [ ] Logout can revoke the current session or all active sessions for the current user.

### FR-001-04: Apply lockout policy

**Description**: The system shall lock accounts after repeated failures according to portal policy.

**Acceptance Criteria**:
- [ ] Admin accounts lock faster than non-admin accounts.
- [ ] Lockout records the responsible email, portal, and lock duration.
- [ ] Successful login resets the failed-attempt counter.

---

## Data Model

### User

Platform identity record for every authenticated actor.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| email | string | Yes | RFC 5322, max 254 | Email address |
| first_name | string | Yes | min 1, max 100 | First name |
| last_name | string | Yes | min 1, max 100 | Last name |
| role | string | Yes | platform role id | Assigned role |
| status | string | Yes | enum: active, inactive, locked | Account status |
| failed_login_attempts | integer | Yes | min 0 | Failed login counter |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

### Session

Portal-scoped authenticated session.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| user_id | uuid | Yes | FK -> User.id | Owning user |
| portal | string | Yes | enum: candidate, client, admin, crm | Portal scope |
| mfa_verified | boolean | Yes | default false | Whether MFA is complete |
| expires_at | datetime | Yes | Portal-specific TTL | Session expiry |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-001-01: No user enumeration

**Condition**: When login fails for unknown email or wrong password
**Action**: Return the same invalid-credentials response.
**Rationale**: Constitution guardrail and security hardening

### BR-001-02: Portal-scoped claims

**Condition**: When a session is created
**Action**: Bind the session to the selected portal and role claims.
**Rationale**: Prevents cross-portal access leakage

### BR-001-03: Admin lockout severity

**Condition**: When an admin or super admin exceeds the failure threshold
**Action**: Apply the stricter lockout policy before another login attempt.
**Rationale**: Administrative accounts carry elevated risk

---

## State Machine

See [state-machines.md](state-machines.md) for the authentication session lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/logout`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `auth.session.login` (EVT-001-01)
- `auth.session.logout` (EVT-001-02)
- `auth.session.login_failed` (EVT-001-03)
- `auth.account.registered` (EVT-001-04)
- `auth.account.locked` (EVT-001-05)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 002-portal-routing | Downstream | Consumes role and portal context after successful authentication |
| 003-mfa | Conditional | Admin sessions remain incomplete until MFA verification succeeds |
| 004-password-reset | Related | Shares credential recovery entities and audit rules |
| 005-sso | Alternative | Alternative identity entry path for eligible portals |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-006-portal-routing-architecture.md](../../decisions/adr-006-portal-routing-architecture.md)
- [adr-010-multi-portal-auth.md](../../decisions/adr-010-multi-portal-auth.md)