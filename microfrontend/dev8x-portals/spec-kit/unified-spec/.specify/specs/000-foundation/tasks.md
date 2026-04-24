# Foundation - Tasks

> **Module ID**: `000-foundation`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-000-01**: Model DomainRegistry and AuditEnvelope - Finalize canonical data structures, validation rules, and ownership boundaries for foundation. `[Complexity: L]`
- [ ] **T-000-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/platform/domains, GET /api/v1/platform/roles, GET /api/v1/platform/contracts. `[Complexity: L]`
- [ ] **T-000-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-000-01**: Implement specification registry lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-000-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-000-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-000-01**: Validate primary foundation workflow succeeds for the intended role.
- [ ] **V-000-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-000-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-000-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-000-05**: Confirm the expected audit event is emitted exactly once with the required payload.