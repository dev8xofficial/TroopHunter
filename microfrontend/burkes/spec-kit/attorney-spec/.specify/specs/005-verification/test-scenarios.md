# Test Scenarios: Verification (005)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-05-01 | Verification panels | Load Verification | Panels with financial data | P0 |
| T-05-02 | Progress steps | View panel | 5 steps with correct states | P0 |
| T-05-03 | Verify confirm | Click Verify, sign | Verification recorded | P0 |
| T-05-04 | Flag discrepancy | Click Flag, fill form | Transaction flagged, parties notified | P0 |
| T-05-05 | Checklist | Check items | State persists during session | P0 |
| T-05-06 | Generate report | Fill form, generate | Report downloaded | P0 |
| T-05-07 | Recently verified | View section | Completed verifications shown | P1 |
| T-05-08 | Summary sidebar | Load Verification | Correct counts | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-05-09 | Verify without signature | Validation error | P0 |
| T-05-10 | Flag without type | Validation error | P0 |
| T-05-11 | No pending verifications | Success message shown | P1 |
| T-05-12 | Report generation fails | Error in modal | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-05-13 | Keyboard navigation | Tab through panels, modals | P1 |
| T-05-14 | Screen reader | Verify grid has ARIA labels | P1 |
