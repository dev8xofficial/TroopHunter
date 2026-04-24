# Admin Settings - Tasks

> **Module ID**: `108-admin-settings`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-108-01**: Model AdminSetting and AdminUser - Finalize canonical data structures, validation rules, and ownership boundaries for admin settings. `[Complexity: L]`
- [ ] **T-108-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/admin/settings, PATCH /api/v1/admin/settings, POST /api/v1/admin/settings/users, PATCH /api/v1/admin/settings/users/{id}/role. `[Complexity: L]`
- [ ] **T-108-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-108-01**: Implement administrative setting lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-108-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-108-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-108-01**: Validate primary admin settings workflow succeeds for the intended role.
- [ ] **V-108-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-108-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-108-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-108-05**: Confirm the expected audit event is emitted exactly once with the required payload.