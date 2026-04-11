# Test Scenarios — Reviews
## Component Tests
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-05-01 | KPI cards render | Load Reviews screen | 3 KPI cards with correct values | P0 |
| TC-05-02 | Review cards display | Load with 4 reviews | 4 review cards with stars, name, date, text | P0 |
| TC-05-03 | Respond to review | Click "Respond to Review", type, submit | Response saved; displayed under review | P0 |
| TC-05-04 | Response rate updates | Respond to last un-responded review | Response Rate KPI shows 100% | P1 |
## Edge Case Tests
| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-05-01 | No reviews | Load with empty review list | Empty state message |
| EC-05-02 | Empty response | Submit empty response text | Validation error shown |
## Accessibility Tests
| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-05-01 | Star ratings | aria-label with numeric rating value |
| A11Y-05-02 | Response form | Label and focus management on response text area |
