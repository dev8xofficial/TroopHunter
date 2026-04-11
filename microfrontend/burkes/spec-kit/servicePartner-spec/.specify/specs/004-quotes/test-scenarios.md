# Test Scenarios — Quotes
## Component Tests
| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-04-01 | Quote form renders | Load Quotes screen | Form with referral dropdown, cost inputs, submit button | P0 |
| TC-04-02 | Auto-total calculation | Enter labor=500, materials=200 | Total shows $700 in real-time | P0 |
| TC-04-03 | Submit quote | Fill form and click "Send Quote" | Quote created; activity event logged | P0 |
| TC-04-04 | Recent quotes sidebar | Load screen | 3 recent quotes with correct status badges | P0 |
| TC-04-05 | Quote statistics | Load screen | Stats show acceptance rate, response time, total sent | P1 |
## Edge Case Tests
| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-04-01 | Zero amount quote | Enter labor=0, materials=0 | Submit disabled; validation message |
| EC-04-02 | No referrals to quote | Load with empty referral list | Dropdown disabled; message shown |
| EC-04-03 | Duplicate quote | Quote already-quoted referral | Warning message displayed |
## Accessibility Tests
| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-04-01 | Form labels | All inputs have associated labels |
| A11Y-04-02 | Auto-total announcement | Screen reader announces updated total |
