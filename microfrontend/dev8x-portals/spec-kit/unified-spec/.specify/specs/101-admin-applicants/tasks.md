# Admin Applicants - Tasks

> **Module ID**: `101-admin-applicants`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-101-01**: Model Applicant - Finalize canonical data structures, validation rules, and ownership boundaries for admin applicants. `[Complexity: M]`
- [ ] **T-101-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/admin/applicants, GET /api/v1/admin/applicants/{id}, PATCH /api/v1/admin/applicants/{id}/status. `[Complexity: L]`
- [ ] **T-101-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-101-01**: Implement applicant lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-101-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-101-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-101-01**: Validate primary admin applicants workflow succeeds for the intended role.
- [ ] **V-101-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-101-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-101-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-101-05**: Confirm the expected audit event is emitted exactly once with the required payload.