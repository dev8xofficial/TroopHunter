# Admin Documents - Tasks

> **Module ID**: `106-admin-documents`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-106-01**: Model ApplicantDocument - Finalize canonical data structures, validation rules, and ownership boundaries for admin documents. `[Complexity: M]`
- [ ] **T-106-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/admin/documents, POST /api/v1/admin/documents/requests, PATCH /api/v1/admin/documents/{id}/review, GET /api/v1/admin/documents/{id}. `[Complexity: L]`
- [ ] **T-106-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-106-01**: Implement applicant document lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-106-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-106-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-106-01**: Validate primary admin documents workflow succeeds for the intended role.
- [ ] **V-106-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-106-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-106-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-106-05**: Confirm the expected audit event is emitted exactly once with the required payload.