# Password Reset

> **Module ID**: `004-password-reset`
> **Domain**: Authentication & Identity (0xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Password Reset module supports token-based credential recovery without exposing whether a user exists or allowing stale reset tokens to be reused.

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

### FR-004-01: Issue reset requests safely

**Description**: The system shall accept password reset requests without revealing whether the email exists.

**Acceptance Criteria**:
- [ ] Known and unknown emails receive the same response envelope.
- [ ] Each reset token has a short expiry window.
- [ ] Issuing a new reset token invalidates previous unused tokens.

### FR-004-02: Verify reset tokens

**Description**: The system shall validate token integrity and expiry before allowing a password change.

**Acceptance Criteria**:
- [ ] Expired tokens are rejected.
- [ ] Consumed tokens cannot be reused.
- [ ] Token verification returns only whether the token is currently valid.

### FR-004-03: Complete password reset

**Description**: The system shall update the password only after a valid token is presented.

**Acceptance Criteria**:
- [ ] New passwords must meet complexity rules.
- [ ] Password reset writes a security audit event.
- [ ] Existing sessions are revoked after password reset completes.

---

## Data Model

### PasswordResetToken

Token issued for a single password reset attempt.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| user_id | uuid | No | Nullable when email is unknown | Associated user |
| status | string | Yes | enum: issued, verified, consumed, expired | Reset token status |
| expires_at | datetime | Yes | max 24h | Token expiry |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-004-01: Indistinguishable request response

**Condition**: When a reset request is submitted
**Action**: Return the same accepted response for unknown and known emails.
**Rationale**: Prevents enumeration

### BR-004-02: Token invalidation on completion

**Condition**: When a password reset succeeds
**Action**: Consume the token and revoke all active sessions.
**Rationale**: Restores account integrity

---

## State Machine

See [state-machines.md](state-machines.md) for the password reset token lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `POST /api/v1/auth/password/request`
- `POST /api/v1/auth/password/verify-token`
- `POST /api/v1/auth/password/reset`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `auth.password.reset_requested` (EVT-004-01)
- `auth.password.token_verified` (EVT-004-02)
- `auth.password.reset_completed` (EVT-004-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 001-authentication | Shared | Uses user identities and session revocation rules |
| 003-mfa | Related | High-risk resets may require additional verification policies |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-006-portal-routing-architecture.md](../../decisions/adr-006-portal-routing-architecture.md)
- [adr-010-multi-portal-auth.md](../../decisions/adr-010-multi-portal-auth.md)