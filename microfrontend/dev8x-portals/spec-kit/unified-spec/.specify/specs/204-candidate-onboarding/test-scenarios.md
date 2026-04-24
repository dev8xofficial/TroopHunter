# Candidate Onboarding - Test Scenarios

> **Module ID**: `204-candidate-onboarding`
> **Version**: 1.0.0

---

## Scenarios

| Scenario ID | Category | Expected Result |
| --- | --- | --- |
| TS-204-01 | Happy path | Validate primary candidate onboarding workflow succeeds for the intended role. |
| TS-204-02 | Permission boundary | Confirm unauthorized roles receive FORBIDDEN and no state changes occur. |
| TS-204-03 | Validation failure | Submit malformed or incomplete payloads and confirm schema rejection. |
| TS-204-04 | Invalid state transition | Attempt a disallowed lifecycle move and confirm the state remains unchanged. |
| TS-204-05 | Audit emission | Confirm the expected audit event is emitted exactly once with the required payload. |

---

## Coverage Expectations

- Cover all functional requirements in spec.md.
- Cover all state transitions in state-machines.md.
- Cover all write operations and audit events in activity-log-events.md.
- Cover every role-operation pair that should resolve to something other than `Deny`.