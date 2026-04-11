# Test Scenarios: Dashboard (001)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-01-01 | KPI cards render | Load Dashboard | 4 stat cards with correct values (1,247 / 324 / 156 / 47), labels, icons, breakdown tags | P0 |
| T-01-02 | Quick Management tiles | Click each of 4 tiles | Correct navigation to Users/Partners screen or summary | P0 |
| T-01-03 | Recent Activity feed | Load Dashboard with activity | 4 activity items with correct status badges and action buttons | P0 |
| T-01-04 | Approve from activity | Click "Approve Account" on Lisa Anderson item | Account approved; activity feed updates; audit log records action | P0 |
| T-01-05 | Pending Approvals summary | Load Dashboard with pending items | 3 blocks: 8 Urgent Documents (red), 15 Partner Applications (orange), 24 User Registrations (blue) | P0 |
| T-01-06 | Today's Stats sidebar | Load Dashboard | 3 items: New Users (12), Documents Processed (87), Transactions Closed (5) | P0 |
| T-01-07 | Admin Quick Actions | Click "Add New User" | Navigation to Users screen or modal trigger | P0 |
| T-01-08 | Responsive stats grid | Resize to 768px | 4-col stats collapse to 2-col | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-01-09 | KPI data delay | Loading indicator shown; values populate when available | P1 |
| T-01-10 | No pending approvals | All counts show 0; "All clear!" message below | P1 |
| T-01-11 | No recent activity | Activity feed shows "No recent platform activity" | P1 |
| T-01-12 | Approve action fails | Inline error in activity item; retry button available | P0 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-01-13 | Keyboard navigation | Tab through all cards, tiles, buttons, activity items | P1 |
| T-01-14 | Screen reader | Stat cards have ARIA labels; activity feed is semantic list | P1 |
