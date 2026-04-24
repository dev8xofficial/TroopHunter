# Authentication — Implementation Plan

> **Module ID**: `001-authentication`
> **Version**: 1.0.0

---

## Objective

Implement the core authentication system supporting email/password login, candidate self-registration, JWT session management, account lockout, and email verification across all 4 portal types.

---

## Prerequisites

| Prerequisite | Status |
|-------------|--------|
| User data model defined | Complete (spec.md) |
| Session data model defined | Complete (spec.md) |
| RBAC contract defined | Complete (access-control.yaml) |
| Portal routing spec | Complete (002-portal-routing) |

---

## Implementation Tasks

### Task 1: User Entity & Credential Storage

**Complexity**: M
**Priority**: P0

**Description**: Implement User entity with password hashing, email uniqueness constraint, and account status management.

**Acceptance Criteria**: FR-001-01, FR-001-02 credential storage requirements met.

### Task 2: Login Endpoint

**Complexity**: L
**Priority**: P0

**Description**: Implement POST /auth/login with portal-aware authentication flow including MFA branching for Admin portal.

**Acceptance Criteria**: FR-001-01 login flow, BR-001-01 no user enumeration, BR-001-02 portal-scoped sessions.

### Task 3: Registration Endpoint

**Complexity**: M
**Priority**: P0

**Description**: Implement POST /auth/register for candidate self-registration with email verification trigger.

**Acceptance Criteria**: FR-001-02 registration requirements.

### Task 4: Session Management

**Complexity**: L
**Priority**: P0

**Description**: Implement JWT issuance, validation, portal-scoped claims, and portal-specific TTLs.

**Acceptance Criteria**: FR-001-03 session requirements, BR-001-02 portal scoping.

### Task 5: Account Lockout

**Complexity**: M
**Priority**: P1

**Description**: Implement failed attempt tracking, lockout enforcement, and auto-unlock timer.

**Acceptance Criteria**: FR-001-05 lockout requirements.

### Task 6: Email Verification

**Complexity**: S
**Priority**: P1

**Description**: Implement email verification token generation, email dispatch, and verification endpoint.

**Acceptance Criteria**: FR-001-06 verification requirements.

### Task 7: Logout & Session Revocation

**Complexity**: S
**Priority**: P1

**Description**: Implement POST /auth/logout with single-session and all-devices options.

**Acceptance Criteria**: FR-001-04 logout requirements.

---

## Cross-Domain Dependencies

| Contract | Update Required | Description |
|----------|----------------|-------------|
| api.yaml | Yes | Auth endpoints registered |
| access-control.yaml | Yes | Auth permissions defined |
| events.yaml | Yes | 8 auth events registered |
| interactions.yaml | Yes | Session lifecycle defined |

---

## Estimated Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1 | 3 days | Tasks 1–3 (core login + register) |
| Phase 2 | 2 days | Tasks 4–5 (sessions + lockout) |
| Phase 3 | 1 day | Tasks 6–7 (verification + logout) |
