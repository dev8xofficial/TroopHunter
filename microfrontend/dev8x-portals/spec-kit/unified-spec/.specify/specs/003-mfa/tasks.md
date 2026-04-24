# MFA - Tasks

> **Module ID**: `003-mfa`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-003-01**: Model MfaChallenge - Finalize canonical data structures, validation rules, and ownership boundaries for mfa. `[Complexity: M]`
- [ ] **T-003-02**: Deliver core API surface - Implement the request and response contracts for POST /api/v1/auth/mfa/challenge, POST /api/v1/auth/mfa/verify, POST /api/v1/auth/mfa/recovery. `[Complexity: L]`
- [ ] **T-003-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-003-01**: Implement mfa challenge lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-003-02**: Wire audit events - Emit 4 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-003-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-003-01**: Validate primary mfa workflow succeeds for the intended role.
- [ ] **V-003-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-003-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-003-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-003-05**: Confirm the expected audit event is emitted exactly once with the required payload.