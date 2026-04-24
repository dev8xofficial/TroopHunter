# Candidate Profile - Tasks

> **Module ID**: `206-candidate-profile`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-206-01**: Model CandidateProfile and EmergencyContact - Finalize canonical data structures, validation rules, and ownership boundaries for candidate profile. `[Complexity: L]`
- [ ] **T-206-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/candidate/profile, PATCH /api/v1/candidate/profile, POST /api/v1/candidate/profile/emergency-contacts. `[Complexity: L]`
- [ ] **T-206-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-206-01**: Implement candidate profile verification lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-206-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-206-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-206-01**: Validate primary candidate profile workflow succeeds for the intended role.
- [ ] **V-206-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-206-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-206-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-206-05**: Confirm the expected audit event is emitted exactly once with the required payload.