# Test Scenarios — Active Jobs
## Component Tests
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-03-01 | Job cards render | Load Active Jobs screen | Job cards display with correct data | P0 |
| TC-03-02 | Status filter works | Select "Scheduled" from dropdown | Only scheduled jobs visible | P0 |
| TC-03-03 | Search filters jobs | Type "Brown" in search | Only matching job cards visible | P0 |
| TC-03-04 | Contact Client button | Click "Contact Client" | Contact action initiates | P1 |
## Edge Case Tests
| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-03-01 | No active jobs | Load with empty job list | Empty state message displayed |
| EC-03-02 | Overdue job date | Job with past scheduled date | Warning indicator shown |
## Accessibility Tests
| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-03-01 | Card keyboard navigation | Tab navigates through cards and action buttons |
