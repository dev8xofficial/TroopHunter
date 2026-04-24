# Portal Routing - Tasks

> **Module ID**: `002-portal-routing`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-002-01**: Model PortalConfig and RouteDecision - Finalize canonical data structures, validation rules, and ownership boundaries for portal routing. `[Complexity: L]`
- [ ] **T-002-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/portals/config, POST /api/v1/portals/resolve, GET /api/v1/portals/last-destination. `[Complexity: L]`
- [ ] **T-002-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-002-01**: Implement portal resolution lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-002-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-002-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-002-01**: Validate primary portal routing workflow succeeds for the intended role.
- [ ] **V-002-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-002-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-002-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-002-05**: Confirm the expected audit event is emitted exactly once with the required payload.