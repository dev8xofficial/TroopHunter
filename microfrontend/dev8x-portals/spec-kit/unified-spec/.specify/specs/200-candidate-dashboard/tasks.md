# Candidate Dashboard - Tasks

> **Module ID**: `200-candidate-dashboard`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-200-01**: Model CandidateProgress - Finalize canonical data structures, validation rules, and ownership boundaries for candidate dashboard. `[Complexity: M]`
- [ ] **T-200-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/candidate/dashboard/summary, GET /api/v1/candidate/dashboard/deadlines, GET /api/v1/candidate/dashboard/quick-actions. `[Complexity: L]`
- [ ] **T-200-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-200-01**: Implement candidate snapshot lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-200-02**: Wire audit events - Emit 2 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-200-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-200-01**: Validate primary candidate dashboard workflow succeeds for the intended role.
- [ ] **V-200-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-200-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-200-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-200-05**: Confirm the expected audit event is emitted exactly once with the required payload.