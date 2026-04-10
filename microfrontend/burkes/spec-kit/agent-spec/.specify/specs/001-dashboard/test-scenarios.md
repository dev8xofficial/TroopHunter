# Test Scenarios: Dashboard (001)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-01-01 | KPI cards render | Load Dashboard | 4 stat cards with correct values, labels, icons | P0 |
| T-01-02 | Quick Actions | Click each quick action | Correct navigation or action triggered | P0 |
| T-01-03 | Upload zone | Drag file to upload zone | File accepted; type/transaction selectors appear | P0 |
| T-01-04 | Active Transactions table | Load Dashboard with transactions | Table shows client, property, type, amount, status | P0 |
| T-01-05 | Activity feed | State changes occur | Feed updates with latest events | P0 |
| T-01-06 | Transaction View button | Click View on table row | Transaction Detail modal opens | P0 |
| T-01-07 | Responsive stats grid | Resize to 768px | 4-col stats collapse to 2-col | P1 |
| T-01-08 | Empty state | No transactions | "No active transactions" message | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-01-09 | KPI data delay | Loading indicator shown; values populate when available | P1 |
| T-01-10 | Upload invalid file | Error message; file rejected | P0 |
| T-01-11 | Upload >25MB file | Error message with size limit | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-01-12 | Keyboard navigation | Tab through all cards, buttons, table rows | P1 |
| T-01-13 | Screen reader | Stat cards have ARIA labels; table is semantic | P1 |
