# Test Scenarios — Referrals
## Component Tests
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-02-01 | Referral table renders | Load Referrals screen | Table displays with all referral rows | P0 |
| TC-02-02 | Status filter works | Select "New Lead" from status dropdown | Only new lead rows visible | P0 |
| TC-02-03 | Search filters table | Type "Smith" in search bar | Only rows with "Smith" in client name or address visible | P0 |
| TC-02-04 | Action buttons contextual | View table with mixed statuses | "Respond" for new, "Send Quote" for contacted, "View Details" for completed | P0 |
| TC-02-05 | Status badges correct colours | View all status values | Each badge displays correct colour per foundation spec | P1 |
## Edge Case Tests
| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-02-01 | No matching referrals | Apply filter with no results | Empty state message with reset button |
| EC-02-02 | Long property address | Referral with 100+ char address | Address truncates with ellipsis |
## Accessibility Tests
| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-02-01 | Table keyboard navigation | Tab navigates through rows and action buttons |
| A11Y-02-02 | Filter dropdowns accessible | Screen reader announces selected filter value |
