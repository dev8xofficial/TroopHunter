# Candidate Messages - Tasks

> **Module ID**: `205-candidate-messages`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-205-01**: Model CandidateThread - Finalize canonical data structures, validation rules, and ownership boundaries for candidate messages. `[Complexity: M]`
- [ ] **T-205-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/candidate/messages, GET /api/v1/candidate/messages/{id}, POST /api/v1/candidate/messages/{id}/reply, POST /api/v1/candidate/messages/{id}/read. `[Complexity: L]`
- [ ] **T-205-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-205-01**: Implement candidate thread lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-205-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-205-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-205-01**: Validate primary candidate messages workflow succeeds for the intended role.
- [ ] **V-205-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-205-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-205-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-205-05**: Confirm the expected audit event is emitted exactly once with the required payload.