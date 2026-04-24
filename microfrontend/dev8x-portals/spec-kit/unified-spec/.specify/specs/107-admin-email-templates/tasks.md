# Admin Email Templates - Tasks

> **Module ID**: `107-admin-email-templates`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-107-01**: Model EmailTemplate - Finalize canonical data structures, validation rules, and ownership boundaries for admin email templates. `[Complexity: M]`
- [ ] **T-107-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/admin/templates, POST /api/v1/admin/templates, POST /api/v1/admin/templates/{id}/preview. `[Complexity: L]`
- [ ] **T-107-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-107-01**: Implement template lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-107-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-107-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-107-01**: Validate primary admin email templates workflow succeeds for the intended role.
- [ ] **V-107-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-107-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-107-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-107-05**: Confirm the expected audit event is emitted exactly once with the required payload.