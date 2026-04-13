# Test Scenarios: CRM SMS (007)

| ID | Scenario | Expected Result | Priority |
| --- | --- | --- | --- |
| T-07-01 | Send outbound text from contact | Message appears in the correct thread | P0 |
| T-07-02 | Receive inbound reply | Thread unread state and notification update | P0 |
| T-07-03 | Attempt send to opted-out number | Send is blocked with visible explanation | P0 |
| T-07-04 | Resolve unmatched number | Thread becomes linked to a contact | P0 |
| T-07-05 | Provider degraded state | Outbound send is blocked without losing thread history | P1 |
