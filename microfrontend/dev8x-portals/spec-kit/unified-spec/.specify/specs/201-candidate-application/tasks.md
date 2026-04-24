# Candidate Application - Tasks

> **Module ID**: `201-candidate-application`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-201-01**: Model ApplicationStep - Finalize canonical data structures, validation rules, and ownership boundaries for candidate application. `[Complexity: M]`
- [ ] **T-201-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/candidate/application/timeline, GET /api/v1/candidate/application/status, POST /api/v1/candidate/application/acknowledge-step. `[Complexity: L]`
- [ ] **T-201-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-201-01**: Implement candidate application lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-201-02**: Wire audit events - Emit 2 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-201-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-201-01**: Validate primary candidate application workflow succeeds for the intended role.
- [ ] **V-201-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-201-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-201-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-201-05**: Confirm the expected audit event is emitted exactly once with the required payload.