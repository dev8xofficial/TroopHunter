# MFA

> **Module ID**: `003-mfa`
> **Domain**: Authentication & Identity (0xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The MFA module issues and verifies second-factor challenges for privileged login flows, with recovery-code fallback and auditable challenge state changes.

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

### FR-003-01: Issue MFA challenges for privileged sessions

**Description**: The system shall issue an MFA challenge whenever a privileged portal session reaches the credentials-validated state.

**Acceptance Criteria**:
- [ ] Admin and super admin sessions require a challenge before activation.
- [ ] Challenge issuance records a short-lived expiry timestamp.
- [ ] Repeated challenge requests invalidate previous unverified challenges.

### FR-003-02: Verify TOTP or recovery code

**Description**: The system shall verify a valid second factor before elevating the session.

**Acceptance Criteria**:
- [ ] Valid TOTP code activates the pending session.
- [ ] Recovery code may be used once and is consumed on success.
- [ ] Three failed attempts invalidate the challenge.

### FR-003-03: Support step-up verification

**Description**: The system shall support additional verification for high-risk actions.

**Acceptance Criteria**:
- [ ] Step-up challenge inherits the actor role and target action.
- [ ] Successful verification is limited to the requested action window.
- [ ] Expired challenges cannot be reused.

---

## Data Model

### MfaChallenge

One-time verification challenge bound to an in-progress session.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| session_id | uuid | Yes | FK -> Session.id | Pending session |
| challenge_type | string | Yes | enum: totp, recovery_code, step_up | Challenge type |
| status | string | Yes | enum: issued, verified, failed, expired | Challenge status |
| expires_at | datetime | Yes | short-lived | Challenge expiry |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-003-01: Single active challenge

**Condition**: When a new challenge is issued for the same session
**Action**: Expire any older unverified challenge.
**Rationale**: Avoid parallel challenge reuse

### BR-003-02: Recovery code consumption

**Condition**: When a recovery code succeeds
**Action**: Mark the code as consumed immediately.
**Rationale**: Prevents replay

---

## State Machine

See [state-machines.md](state-machines.md) for the mfa challenge lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `POST /api/v1/auth/mfa/challenge`
- `POST /api/v1/auth/mfa/verify`
- `POST /api/v1/auth/mfa/recovery`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `auth.mfa.challenge_issued` (EVT-003-01)
- `auth.mfa.verified` (EVT-003-02)
- `auth.mfa.failed` (EVT-003-03)
- `auth.mfa.expired` (EVT-003-04)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 001-authentication | Upstream | Consumes pending sessions created by privileged authentication |
| 108-admin-settings | Related | Administrative policies determine MFA enrollment and recovery rules |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-006-portal-routing-architecture.md](../../decisions/adr-006-portal-routing-architecture.md)
- [adr-010-multi-portal-auth.md](../../decisions/adr-010-multi-portal-auth.md)