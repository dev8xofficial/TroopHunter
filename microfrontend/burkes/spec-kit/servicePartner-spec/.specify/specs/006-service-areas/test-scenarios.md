# Test Scenarios — Service Areas
## Component Tests
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-06-01 | Active areas render | Load screen | 3 area cards with zip, city, referrals, earnings | P0 |
| TC-06-02 | Recommended areas display | Load screen | 3 recommended areas with demand levels | P0 |
| TC-06-03 | Add new area | Enter zip "77384", submit | New area added to active grid | P0 |
| TC-06-04 | Tips card visible | Load screen | Tips card with best practice text | P1 |
## Edge Case Tests
| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-06-01 | Invalid zip code | Enter "123" | Validation error message |
| EC-06-02 | Duplicate area | Add already-active zip | Warning message shown |
| EC-06-03 | No active areas | Load with empty areas | Banner prompting to add first area |
## Accessibility Tests
| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-06-01 | Zip code input | Label and validation messages accessible |
