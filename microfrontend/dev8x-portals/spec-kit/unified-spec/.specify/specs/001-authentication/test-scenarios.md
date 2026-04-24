# Authentication — Test Scenarios

> **Module ID**: `001-authentication`

---

## Test Coverage Matrix

| Requirement | Positive Test | Negative Test | Edge Case | Auth Test |
|-------------|--------------|---------------|-----------|-----------|
| FR-001-01 | TS-001-01 | TS-001-02, TS-001-03 | TS-001-04 | TS-001-05 |
| FR-001-02 | TS-001-06 | TS-001-07, TS-001-08 | TS-001-09 | — |
| FR-001-03 | TS-001-10 | TS-001-11 | TS-001-12 | — |
| FR-001-04 | TS-001-13 | — | TS-001-14 | — |
| FR-001-05 | TS-001-15 | — | TS-001-16 | — |
| FR-001-06 | TS-001-17 | TS-001-18 | TS-001-19 | — |

---

## Test Scenarios

### TS-001-01: Successful Login (Positive)
**Requirement**: FR-001-01
**Preconditions**: Active user account exists with verified email
**Steps**: POST /auth/login with valid email, password, portal=candidate
**Expected**: 200 OK, JWT token returned, session created, EVT-001-01 emitted

### TS-001-02: Wrong Password (Negative)
**Requirement**: FR-001-01
**Preconditions**: Active user account exists
**Steps**: POST /auth/login with valid email, wrong password
**Expected**: 401 "INVALID_CREDENTIALS", failed_login_attempts incremented, EVT-001-03 emitted

### TS-001-03: Unknown Email (Negative)
**Requirement**: FR-001-01
**Preconditions**: Email does not exist in system
**Steps**: POST /auth/login with non-existent email
**Expected**: 401 "INVALID_CREDENTIALS" (same as wrong password — no enumeration)

### TS-001-04: Login to Locked Account (Edge Case)
**Requirement**: FR-001-01
**Preconditions**: Account locked (failed_login_attempts ≥ threshold)
**Steps**: POST /auth/login with valid credentials
**Expected**: 423 "ACCOUNT_LOCKED" with locked_until timestamp

### TS-001-05: Admin Login Without TOTP (Authorization)
**Requirement**: FR-001-01
**Preconditions**: Admin account, no totp_code in request
**Steps**: POST /auth/login with portal=admin, valid email+password, no totp_code
**Expected**: 403 "MFA_REQUIRED"

### TS-001-06: Successful Registration (Positive)
**Requirement**: FR-001-02
**Preconditions**: Email not registered
**Steps**: POST /auth/register with valid first_name, last_name, email, password, password_confirmation
**Expected**: 201 Created, verification email sent, EVT-001-04 emitted, account status=inactive

### TS-001-07: Duplicate Email Registration (Negative)
**Requirement**: FR-001-02
**Preconditions**: Email already registered
**Steps**: POST /auth/register with existing email
**Expected**: 409 "EMAIL_EXISTS"

### TS-001-08: Weak Password Registration (Negative)
**Requirement**: FR-001-02
**Preconditions**: —
**Steps**: POST /auth/register with password "12345"
**Expected**: 400 "VALIDATION_ERROR" with password complexity details

### TS-001-09: Password Mismatch (Edge Case)
**Requirement**: FR-001-02
**Preconditions**: —
**Steps**: POST /auth/register with password ≠ password_confirmation
**Expected**: 400 "VALIDATION_ERROR"

### TS-001-10: Valid Session Access (Positive)
**Requirement**: FR-001-03
**Preconditions**: Valid JWT token in Authorization header
**Steps**: GET any authenticated endpoint
**Expected**: 200 OK, request processed

### TS-001-11: Expired Token (Negative)
**Requirement**: FR-001-03
**Preconditions**: JWT token past expiry
**Steps**: GET any authenticated endpoint
**Expected**: 401 "UNAUTHORIZED"

### TS-001-12: Cross-Portal Token (Edge Case)
**Requirement**: FR-001-03
**Preconditions**: JWT with portal=candidate
**Steps**: GET /admin/dashboard/kpis
**Expected**: 403 "FORBIDDEN" (portal mismatch)

### TS-001-13: Successful Logout (Positive)
**Requirement**: FR-001-04
**Preconditions**: Authenticated session
**Steps**: POST /auth/logout
**Expected**: 200 OK, session invalidated, EVT-001-02 emitted

### TS-001-14: Logout All Devices (Edge Case)
**Requirement**: FR-001-04
**Preconditions**: User has 3 active sessions
**Steps**: POST /auth/logout with all_devices=true
**Expected**: 200 OK, sessions_revoked=3, all sessions invalidated

### TS-001-15: Account Lockout Trigger (Positive)
**Requirement**: FR-001-05
**Preconditions**: 4 failed login attempts (threshold=5 for candidate)
**Steps**: POST /auth/login with wrong password (5th attempt)
**Expected**: 401 on 5th attempt, subsequent attempt returns 423 "ACCOUNT_LOCKED", EVT-001-05 emitted

### TS-001-16: Auto-Unlock After Duration (Edge Case)
**Requirement**: FR-001-05
**Preconditions**: Account locked, lockout duration (30 min) has passed
**Steps**: POST /auth/login with valid credentials
**Expected**: 200 OK, login succeeds, failed_login_attempts reset

### TS-001-17: Email Verification (Positive)
**Requirement**: FR-001-06
**Preconditions**: Candidate registered, verification token received
**Steps**: POST /auth/verify-email with valid token
**Expected**: 200 OK, account status=active, EVT-001-07 emitted

### TS-001-18: Expired Verification Token (Negative)
**Requirement**: FR-001-06
**Preconditions**: Verification token older than 24 hours
**Steps**: POST /auth/verify-email with expired token
**Expected**: 400 "INVALID_TOKEN"

### TS-001-19: Already Verified Account (Edge Case)
**Requirement**: FR-001-06
**Preconditions**: Email already verified
**Steps**: POST /auth/verify-email with previously used token
**Expected**: 409 "ALREADY_VERIFIED"
