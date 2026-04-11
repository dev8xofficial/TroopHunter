# Test Scenarios: Documents (003)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-03-01 | Document list | Load Documents | All documents with status badges | P0 |
| T-03-02 | Tab switching | Click each tab | Correct documents shown | P0 |
| T-03-03 | Approve document | Click Approve | Status updates to Approved | P0 |
| T-03-04 | Reject document | Click Reject, enter reason | Rejection modal, status updates | P0 |
| T-03-05 | Upload document | Upload file with transaction | File associated correctly | P0 |
| T-03-06 | Summary sidebar | Load Documents | Correct counts displayed | P0 |
| T-03-07 | Search | Type document name | Filtered results | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-03-08 | Upload invalid file | Error message shown | P0 |
| T-03-09 | Upload > 25MB | Size limit error | P1 |
| T-03-10 | Reject without reason | Validation error | P0 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-03-11 | Keyboard navigation | Tab through docs, buttons | P1 |
| T-03-12 | Screen reader | Document items have ARIA labels | P1 |
