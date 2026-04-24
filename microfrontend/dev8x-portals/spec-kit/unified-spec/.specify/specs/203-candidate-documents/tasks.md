# Candidate Documents - Tasks

> **Module ID**: `203-candidate-documents`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-203-01**: Model CandidateDocument - Finalize canonical data structures, validation rules, and ownership boundaries for candidate documents. `[Complexity: M]`
- [ ] **T-203-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/candidate/documents, POST /api/v1/candidate/documents/{id}/sign, POST /api/v1/candidate/documents/uploads. `[Complexity: L]`
- [ ] **T-203-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-203-01**: Implement candidate document lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-203-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-203-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-203-01**: Validate primary candidate documents workflow succeeds for the intended role.
- [ ] **V-203-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-203-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-203-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-203-05**: Confirm the expected audit event is emitted exactly once with the required payload.