# Test Scenarios — Earnings
## Component Tests
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-07-01 | Hero card renders | Load Earnings screen | Hero shows total earnings with gradient | P0 |
| TC-07-02 | KPI cards display | Load screen | 3 cards with YTD, avg job, pending values | P0 |
| TC-07-03 | Payment history table | Load screen | Table with date, client, fees, status | P0 |
| TC-07-04 | Fee calculation visible | View table row | Platform fee and net earnings shown separately | P0 |
| TC-07-05 | Status badges | View table | Paid=green, Awaiting=orange, Processing=blue | P1 |
## Edge Case Tests
| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-07-01 | No earnings | Load with $0 earnings | Hero shows "$0"; empty table message |
| EC-07-02 | All pending | Load with no paid jobs | Pending KPI highlighted |
## Accessibility Tests
| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-07-01 | Table navigation | Arrow keys navigate table cells |
| A11Y-07-02 | Monetary values | Screen reader announces with currency |
