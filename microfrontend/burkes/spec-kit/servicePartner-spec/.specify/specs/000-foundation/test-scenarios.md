# Test Scenarios — Foundation

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-00-01 | Nav bar renders on all screens | Load each of 8 screens | Nav bar visible with logo, badge, 8 buttons, bell, user chip | P0 |
| TC-00-02 | Active nav state updates | Click each nav button sequentially | Clicked button shows gold background; previous active resets | P0 |
| TC-00-03 | Partner badge displays | Load any screen | Gold "SERVICE PARTNER" badge visible next to logo | P0 |
| TC-00-04 | Notification bell with unread | Set unread count > 0 | Red dot appears on notification bell | P0 |
| TC-00-05 | Notification bell without unread | Set unread count = 0 | No red dot on notification bell | P1 |
| TC-00-06 | User chip displays partner info | Load any screen | User chip shows partner initials and company name | P0 |
| TC-00-07 | Badges render all status variants | Render badges: new, contacted, quoted, scheduled, completed, declined, processing | Each badge shows correct colour and text | P0 |
| TC-00-08 | Buttons render all variants | Render primary, secondary, gold, success, table-action buttons | Each button has correct styling | P1 |

## Edge Case Tests

| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-00-01 | Very long company name | Set company name > 50 chars | Name truncates with ellipsis in user chip |
| EC-00-02 | No service categories | Set service_categories to empty array | Fallback banner displayed |
| EC-00-03 | Session expired | Simulate expired session token | Re-authentication prompt appears |

## Accessibility Tests

| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-00-01 | Nav keyboard navigation | Tab focuses each nav button sequentially; Enter activates |
| A11Y-00-02 | Colour contrast | All text meets WCAG 2.1 AA contrast ratios |
| A11Y-00-03 | Screen reader labels | Nav buttons have accessible names matching visible text |

## Responsive Tests

| ID | Breakpoint | Expected |
|----|-----------|----------|
| RWD-00-01 | ≥ 1200px | Full nav bar with all 8 items visible |
| RWD-00-02 | 768px – 1199px | Nav items may wrap or use compact layout |
| RWD-00-03 | < 768px | Mobile-optimised navigation |
