# Test Scenarios — Profile
## Component Tests
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-08-01 | Form pre-population | Load Profile screen | All fields show current values | P0 |
| TC-08-02 | Save profile | Update phone, click Save | Changes persisted; activity event logged | P0 |
| TC-08-03 | Service categories | Check/uncheck categories | Selections update; min 1 required | P0 |
| TC-08-04 | Notification toggles | Toggle each preference | Preference state updates | P1 |
| TC-08-05 | Account status card | Load screen | Membership, since date, status badge displayed | P0 |
## Edge Case Tests
| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-08-01 | Invalid email | Enter "notanemail" | Validation error message |
| EC-08-02 | No categories checked | Uncheck all categories | Validation: "At least one required" |
| EC-08-03 | Save failure | Simulate network error | Error banner with retry button |
## Accessibility Tests
| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-08-01 | Form labels | All inputs have associated labels |
| A11Y-08-02 | Error messages | Errors announced by screen reader |
| A11Y-08-03 | Checkbox groups | Categories announced as group |
