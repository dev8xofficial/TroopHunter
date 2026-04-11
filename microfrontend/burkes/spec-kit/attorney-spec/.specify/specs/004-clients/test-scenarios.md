# Test Scenarios: Clients (004)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-04-01 | Client table | Load Clients | All clients with correct data | P0 |
| T-04-02 | Client detail | Click client row | Detail modal with case info | P0 |
| T-04-03 | Add client | Fill form, submit | New client in table | P0 |
| T-04-04 | Quick message | Select client, type, send | Message sent confirmation | P0 |
| T-04-05 | Search | Type client name | Filtered results | P1 |
| T-04-06 | Overview sidebar | Load Clients | Correct counts | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-04-07 | Add client missing fields | Validation errors shown | P0 |
| T-04-08 | Message without client | Validation error | P1 |
| T-04-09 | No clients | Empty state message | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-04-10 | Keyboard navigation | Tab through table, modals | P1 |
| T-04-11 | Screen reader | Client data accessible | P1 |
