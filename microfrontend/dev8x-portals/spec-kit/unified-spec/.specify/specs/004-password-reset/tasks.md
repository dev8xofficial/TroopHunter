# Password Reset - Tasks

> **Module ID**: `004-password-reset`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-004-01**: Model PasswordResetToken - Finalize canonical data structures, validation rules, and ownership boundaries for password reset. `[Complexity: M]`
- [ ] **T-004-02**: Deliver core API surface - Implement the request and response contracts for POST /api/v1/auth/password/request, POST /api/v1/auth/password/verify-token, POST /api/v1/auth/password/reset. `[Complexity: L]`
- [ ] **T-004-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-004-01**: Implement password reset token lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-004-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-004-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-004-01**: Validate primary password reset workflow succeeds for the intended role.
- [ ] **V-004-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-004-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-004-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-004-05**: Confirm the expected audit event is emitted exactly once with the required payload.