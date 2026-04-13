# Test Scenarios: CRM Email (008)

| ID | Scenario | Expected Result | Priority |
| --- | --- | --- | --- |
| T-08-01 | Send email from contact | Outbound email logs to the correct contact | P0 |
| T-08-02 | Receive inbound email for matched contact | Inbox and activity history update | P0 |
| T-08-03 | Resolve unknown sender | Message links to existing or new contact | P0 |
| T-08-04 | Provider degraded state | Compose/send shows explicit outage behavior | P1 |
| T-08-05 | Attachment indicator present | Message shows attachment-aware state | P1 |
