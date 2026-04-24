# Candidate Dashboard - Test Scenarios

> **Module ID**: `200-candidate-dashboard`
> **Version**: 1.0.0

---

## Scenarios

| Scenario ID | Category | Expected Result |
| --- | --- | --- |
| TS-200-01 | Happy path | Validate primary candidate dashboard workflow succeeds for the intended role. |
| TS-200-02 | Permission boundary | Confirm unauthorized roles receive FORBIDDEN and no state changes occur. |
| TS-200-03 | Validation failure | Submit malformed or incomplete payloads and confirm schema rejection. |
| TS-200-04 | Invalid state transition | Attempt a disallowed lifecycle move and confirm the state remains unchanged. |
| TS-200-05 | Audit emission | Confirm the expected audit event is emitted exactly once with the required payload. |

---

## Coverage Expectations

- Cover all functional requirements in spec.md.
- Cover all state transitions in state-machines.md.
- Cover all write operations and audit events in activity-log-events.md.
- Cover every role-operation pair that should resolve to something other than `Deny`.