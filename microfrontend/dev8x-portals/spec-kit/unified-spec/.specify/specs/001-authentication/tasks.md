# Authentication — Tasks

> **Module ID**: `001-authentication`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 — Critical Path

- [ ] **T-001-01**: User Entity — Implement User data model with hashed password storage and status management `[Complexity: M]`
- [ ] **T-001-02**: Login Endpoint — Implement POST /auth/login with credential validation and portal-aware MFA branching `[Complexity: L]`
- [ ] **T-001-03**: Registration Endpoint — Implement POST /auth/register for candidate accounts with email verification trigger `[Complexity: M]`
- [ ] **T-001-04**: JWT Issuance — Implement JWT token generation with portal, role, and MFA claims `[Complexity: M]`
- [ ] **T-001-05**: Session Store — Implement session record creation, lookup, and expiry with portal-specific TTLs `[Complexity: M]`

### P1 — High Priority

- [ ] **T-001-06**: Account Lockout — Implement failed attempt tracking with configurable thresholds per portal `[Complexity: M]`
- [ ] **T-001-07**: Email Verification — Implement token generation, email dispatch, and POST /auth/verify-email endpoint `[Complexity: S]`
- [ ] **T-001-08**: Logout — Implement POST /auth/logout with single and all-devices revocation `[Complexity: S]`
- [ ] **T-001-09**: Rate Limiting — Implement per-IP rate limits on login (10/min) and register (5/min) endpoints `[Complexity: S]`

### P2 — Medium Priority

- [ ] **T-001-10**: Remember Me — Implement extended session (30 days) for Candidate/Client portals `[Complexity: S]`
- [ ] **T-001-11**: Concurrent Session Limit — Enforce max 5 active sessions per user with oldest eviction `[Complexity: S]`

### P3 — Low Priority

- [ ] **T-001-12**: Admin Password History — Implement last-5-passwords check for Admin role `[Complexity: S]`

---

## Dependency Graph

```
T-001-01 → T-001-02 → T-001-04 → T-001-05
         → T-001-03 → T-001-07
                       T-001-04 → T-001-08
                       T-001-02 → T-001-06
                       T-001-02 → T-001-09
```

---

## Validation Tasks

- [ ] **V-001-01**: Verify spec.md coverage — all 6 FRs have implementation tasks
- [ ] **V-001-02**: Verify RBAC — all 6 roles tested against all operations
- [ ] **V-001-03**: Verify state machine — all session transitions tested
- [ ] **V-001-04**: Verify API contracts — all 4 endpoints tested with success + error cases
- [ ] **V-001-05**: Verify validation schema — all request payloads validated
- [ ] **V-001-06**: Verify no user enumeration — same error for wrong password and unknown email
- [ ] **V-001-07**: Verify lockout — portal-specific thresholds enforced
