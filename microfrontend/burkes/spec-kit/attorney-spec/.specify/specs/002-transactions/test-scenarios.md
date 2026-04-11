# Test Scenarios: Transactions (002)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-02-01 | Transaction table | Load Transactions | All transactions with correct data | P0 |
| T-02-02 | Search | Type client name | Table filters to matching rows | P0 |
| T-02-03 | Tab switching | Click each tab | Correct transactions shown, count matches | P0 |
| T-02-04 | Type filter | Select purchase | Only purchase transactions shown | P0 |
| T-02-05 | Status filter | Select Needs Verification | Only pending verification shown | P0 |
| T-02-06 | Verify action | Click Verify on row | Verify Confirm modal opens | P0 |
| T-02-07 | Flag action | Click Flag on row | Flag Discrepancy modal opens | P0 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-02-08 | No search results | No transactions match message | P1 |
| T-02-09 | Empty completed tab | No completed transactions message | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-02-10 | Keyboard navigation | Tab through search, tabs, table rows | P1 |
| T-02-11 | Screen reader | Table headers and cells are semantic | P1 |
