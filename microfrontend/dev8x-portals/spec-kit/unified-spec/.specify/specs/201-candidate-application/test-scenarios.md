# Candidate Application - Test Scenarios

> **Module ID**: `201-candidate-application`
> **Version**: 1.0.0

---

## Scenarios

| Scenario ID | Category | Expected Result |
| --- | --- | --- |
| TS-201-01 | Happy path | Validate primary candidate application workflow succeeds for the intended role. |
| TS-201-02 | Permission boundary | Confirm unauthorized roles receive FORBIDDEN and no state changes occur. |
| TS-201-03 | Validation failure | Submit malformed or incomplete payloads and confirm schema rejection. |
| TS-201-04 | Invalid state transition | Attempt a disallowed lifecycle move and confirm the state remains unchanged. |
| TS-201-05 | Audit emission | Confirm the expected audit event is emitted exactly once with the required payload. |

---

## Coverage Expectations

- Cover all functional requirements in spec.md.
- Cover all state transitions in state-machines.md.
- Cover all write operations and audit events in activity-log-events.md.
- Cover every role-operation pair that should resolve to something other than `Deny`.