# Admin Dashboard - Tasks

> **Module ID**: `100-admin-dashboard`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-100-01**: Model AdminDashboardSnapshot and FunnelMetric - Finalize canonical data structures, validation rules, and ownership boundaries for admin dashboard. `[Complexity: L]`
- [ ] **T-100-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/admin/dashboard/summary, GET /api/v1/admin/dashboard/funnel, GET /api/v1/admin/dashboard/priority-queue. `[Complexity: L]`
- [ ] **T-100-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-100-01**: Implement recruiting snapshot lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-100-02**: Wire audit events - Emit 2 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-100-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-100-01**: Validate primary admin dashboard workflow succeeds for the intended role.
- [ ] **V-100-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-100-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-100-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-100-05**: Confirm the expected audit event is emitted exactly once with the required payload.