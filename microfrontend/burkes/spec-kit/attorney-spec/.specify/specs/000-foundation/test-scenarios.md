# Test Scenarios: Foundation (000)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-01 | Nav bar renders | Load any screen | 5 nav buttons visible, logo, bell, user chip | P0 |
| T-00-02 | Nav active state | Click each nav button | Active button highlighted, others neutral | P0 |
| T-00-03 | User chip | Load portal | Shows SM avatar, Sarah Mitchell name | P0 |
| T-00-04 | Notification bell | Unread notifications exist | Red dot visible on bell | P0 |
| T-00-05 | Modal open/close | Trigger any modal | Opens with overlay; closes on X, outside click, ESC | P0 |
| T-00-06 | Session context | Load portal | Attorney name, role, firm available | P0 |
| T-00-07 | Activity log write | Perform state-changing action | Activity event created with all fields | P0 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-00-08 | Session expiry | Redirect to auth screen | P0 |
| T-00-09 | Unknown route | Redirect to Dashboard | P1 |
| T-00-10 | 99+ notifications | Display 99+ cap | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-00-11 | Keyboard nav | Tab through all nav buttons | P1 |
| T-00-12 | Screen reader | Nav items have ARIA labels | P1 |
