# Test Scenarios: CRM Foundation (000)

## Core Flow Tests

| ID | Scenario | Expected Result | Priority |
| --- | --- | --- | --- |
| T-00-01 | Operator lands after sign-in | Shared shell renders with sidebar, top bar, and user context | P0 |
| T-00-02 | Launch Dial from multiple screens | Same communication surface opens consistently | P0 |
| T-00-03 | Portal intake event arrives | Notification and activity event both appear | P0 |
| T-00-04 | Restricted role opens another department contact | Read view works, restricted actions remain unavailable | P0 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
| --- | --- | --- | --- |
| T-00-05 | Session expires | Re-auth prompt appears without corrupted shell state | P1 |
| T-00-06 | VOIP provider unavailable | Shell remains usable and communication actions show degraded state | P1 |
| T-00-07 | Intake maps to existing contact | Duplicate-safe notification appears instead of silent duplication | P0 |
| T-00-08 | Eligible device opens CRM in supported browser | Install prompt and installed-session messaging behave as documented | P1 |
