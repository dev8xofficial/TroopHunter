# Candidate Onboarding - Tasks

> **Module ID**: `204-candidate-onboarding`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 - Critical Path

- [ ] **T-204-01**: Model OnboardingItem - Finalize canonical data structures, validation rules, and ownership boundaries for candidate onboarding. `[Complexity: M]`
- [ ] **T-204-02**: Deliver core API surface - Implement the request and response contracts for GET /api/v1/candidate/onboarding/checklist, POST /api/v1/candidate/onboarding/items/{id}/complete, GET /api/v1/candidate/onboarding/accounts. `[Complexity: L]`
- [ ] **T-204-03**: Enforce RBAC and data scoping - Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix. `[Complexity: M]`

### P1 - High Priority

- [ ] **T-204-01**: Implement onboarding item lifecycle - Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling. `[Complexity: M]`
- [ ] **T-204-02**: Wire audit events - Emit 3 append-only events with payloads aligned to contracts/events.yaml. `[Complexity: S]`
- [ ] **T-204-03**: Add validation and regression coverage - Cover positive, negative, permission, and lifecycle regression cases before implementation closes. `[Complexity: S]`

---

## Validation Tasks

- [ ] **V-204-01**: Validate primary candidate onboarding workflow succeeds for the intended role.
- [ ] **V-204-02**: Confirm unauthorized roles receive FORBIDDEN and no state changes occur.
- [ ] **V-204-03**: Submit malformed or incomplete payloads and confirm schema rejection.
- [ ] **V-204-04**: Attempt a disallowed lifecycle move and confirm the state remains unchanged.
- [ ] **V-204-05**: Confirm the expected audit event is emitted exactly once with the required payload.