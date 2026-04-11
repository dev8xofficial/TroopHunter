# Test Scenarios: Dashboard (001)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-01-01 | KPI cards render | Load Dashboard | 4 stat cards with correct values | P0 |
| T-01-02 | Urgent alert | Closing within 7 days | Alert banner visible with Review Now | P0 |
| T-01-03 | Asset split cards | 2 pending splits | Split cards with verify/flag actions | P0 |
| T-01-04 | Transaction table | Load Dashboard | Table shows client, property, status, actions | P0 |
| T-01-05 | Activity feed | Recent events exist | Feed shows latest 4 events | P0 |
| T-01-06 | Quick actions | Click each action | Correct navigation triggered | P0 |
| T-01-07 | Deadlines widget | Upcoming closings | Deadlines with color-coded urgency | P1 |
| T-01-08 | Verify from table | Click Verify button | Verify Confirm modal opens | P0 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-01-09 | No transactions | Empty state message shown | P1 |
| T-01-10 | No activity | No recent activity message | P1 |
| T-01-11 | KPI data delay | Loading indicator; values populate later | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-01-12 | Keyboard navigation | Tab through cards, buttons, table | P1 |
| T-01-13 | Screen reader | Stat cards have ARIA labels | P1 |
