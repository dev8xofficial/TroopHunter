# Authentication

> **Module ID**: `001-authentication`
> **Domain**: Authentication & Identity (0xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-22

---

## Overview

The Authentication module provides credential validation, session management, and login/logout flows for all Dev8X platform portals. It serves as the gateway to the entire platform — every user interaction begins with this module.

---

## Actors

| Actor | Role | Interaction |
|-------|------|-------------|
| Candidate | `candidate` | Registers, logs in via email/password or Google SSO |
| Client | `client` | Logs in via email/password or Google SSO (no self-registration) |
| HR Admin | `hr_admin` | Logs in via email/password + TOTP (mandatory 2FA) |
| Super Admin | `super_admin` | Logs in via email/password + TOTP (mandatory 2FA) |
| Sales Rep | `sales_rep` | Logs in via email/password |
| Manager | `manager` | Logs in via email/password |
| System | `system` | Enforces lockout, expires sessions, emits audit events |

---

## Functional Requirements

### FR-001-01: Email/Password Login

**Description**: The system shall authenticate users by validating email and password credentials against stored hashed passwords.

**Acceptance Criteria**:
- [ ] Valid email + correct password → session created, JWT issued
- [ ] Valid email + wrong password → error "Invalid credentials", attempt counter incremented
- [ ] Unknown email → same error as wrong password (no user enumeration)
- [ ] Locked account → error "Account locked" with lockout duration
- [ ] Successful login records IP address, user agent, and timestamp

### FR-001-02: Self-Registration (Candidate Only)

**Description**: The system shall allow candidates to create new accounts via email registration.

**Acceptance Criteria**:
- [ ] Registration form accepts: first_name, last_name, email, password, password_confirmation
- [ ] Duplicate email → error "Email already registered"
- [ ] Password must meet complexity requirements (min 8 chars, 1 upper, 1 lower, 1 digit)
- [ ] Successful registration sends email verification link
- [ ] Account is inactive until email is verified
- [ ] Only `candidate` role accounts can self-register

### FR-001-03: Session Management

**Description**: The system shall manage authenticated sessions with JWT tokens.

**Acceptance Criteria**:
- [ ] JWT contains: sub (user_id), portal, role, iat, exp, mfa_verified
- [ ] Admin sessions expire after 4 hours of inactivity
- [ ] CRM sessions expire after 8 hours
- [ ] Candidate/Client sessions expire after 24 hours
- [ ] "Remember me" extends Client/Candidate sessions to 30 days
- [ ] Concurrent sessions allowed (max 5 per user)

### FR-001-04: Logout

**Description**: The system shall terminate authenticated sessions on user request.

**Acceptance Criteria**:
- [ ] Logout invalidates the current JWT token
- [ ] Logout emits `auth.session.logout` event with session duration
- [ ] Logout redirects to portal selector
- [ ] "Logout all devices" option invalidates all active sessions for the user

### FR-001-05: Account Lockout

**Description**: The system shall lock accounts after repeated failed login attempts.

**Acceptance Criteria**:
- [ ] Admin accounts: lock after 3 failed attempts, 60-minute cooldown, manual unlock by super_admin
- [ ] All other portals: lock after 5 failed attempts, 30-minute auto-unlock
- [ ] Lockout emits `auth.account.locked` event
- [ ] Failed attempt counter resets on successful login
- [ ] Lockout applies per-email, not per-IP

### FR-001-06: Email Verification

**Description**: The system shall verify candidate email addresses during registration.

**Acceptance Criteria**:
- [ ] Verification token sent via email, valid for 24 hours
- [ ] Clicking verification link activates the account
- [ ] Expired token → prompt to resend verification email
- [ ] Resend limit: 3 per 24 hours

---

## Data Model

### User

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| email | string | Yes | RFC 5322, max 254, unique | Login email |
| password_hash | string | Yes | bcrypt/argon2 hash | Hashed password |
| first_name | string | Yes | min 1, max 100 | First name |
| last_name | string | Yes | min 1, max 100 | Last name |
| role | enum | Yes | super_admin, hr_admin, candidate, client, sales_rep, manager | Platform role |
| status | enum | Yes | active, inactive, locked | Account status |
| email_verified | boolean | Yes | Default: false | Email verification status |
| failed_login_attempts | integer | Yes | Default: 0, max 10 | Failed attempt counter |
| locked_until | datetime | No | Nullable | Lockout expiry |
| last_login | datetime | No | Nullable | Last successful login |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-generated | Last update |

### Session

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| id | uuid | Yes | Primary key | Session identifier |
| user_id | uuid | Yes | FK → User.id | Session owner |
| portal | enum | Yes | candidate, client, admin, crm | Portal scope |
| token_hash | string | Yes | SHA-256 hash of JWT | Token fingerprint |
| ip_address | string | Yes | IPv4/IPv6 | Client IP |
| user_agent | string | Yes | max 500 | Browser user agent |
| expires_at | datetime | Yes | Portal-specific TTL | Session expiry |
| created_at | datetime | Yes | Auto-generated | Login timestamp |

---

## Business Rules

### BR-001-01: No User Enumeration

**Condition**: When login fails (wrong password OR unknown email)
**Action**: Return identical error message "Invalid credentials"
**Rationale**: Prevents attackers from discovering valid email addresses

### BR-001-02: Portal-Scoped Sessions

**Condition**: When a user authenticates
**Action**: JWT `portal` claim restricts API access to the authenticated portal's endpoints
**Rationale**: A candidate token cannot access admin endpoints (see ADR-006)

### BR-001-03: Password Storage

**Condition**: When a password is stored or updated
**Action**: Hash with bcrypt (cost factor ≥ 12) or argon2id before storage. Never store plaintext.
**Rationale**: Constitution Guardrail G-08

### BR-001-04: Admin Password History

**Condition**: When an Admin/Super Admin changes their password
**Action**: Reject if the new password matches any of the last 5 passwords
**Rationale**: ADR-010 password requirements

---

## State Machine

See [state-machines.md](state-machines.md) for the Authentication Session lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/register`
- `POST /auth/verify-email`

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
|--------|----------------|-------------|
| `002-portal-routing` | Downstream | Uses portal config to route after login |
| `003-mfa` | Conditional | Admin logins require MFA verification |
| `004-password-reset` | Related | Shares user/credential data model |
| `005-sso` | Alternative | Provides alternative login flow via OAuth |

---

## References

- [Constitution](../../memory/constitution.md) — P-05 (RBAC), G-08 (no plaintext), G-09 (admin MFA)
- [ADR-006: Portal Routing](../../decisions/adr-006-portal-routing-architecture.md)
- [ADR-010: Multi-Portal Auth](../../decisions/adr-010-multi-portal-auth.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
