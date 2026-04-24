# Candidate Interviews - Tasks

> **Module ID**: `202-candidate-interviews`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-202-01**: Model InterviewReservation - Finalize canonical data structures, validation rules, and ownership boundaries for candidate interviews. `[Complexity: M]`
- [ ] **T-202-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/candidate/interviews/availability, POST /api/v1/candidate/interviews/reservations, PATCH /api/v1/candidate/interviews/reservations/{id}. `[Complexity: L]`
- [ ] **T-202-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-202-01**: Implement candidate interview reservation lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-202-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-202-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-202-01**: Validate primary candidate interviews workflow succeeds for the intended role.
- [ ] **V-202-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-202-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-202-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-202-05**: Confirm the expected audit event is emitted exactly once with the required payload.