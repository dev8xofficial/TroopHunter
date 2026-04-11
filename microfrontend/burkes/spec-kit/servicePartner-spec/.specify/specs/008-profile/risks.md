# Risks — Profile
## Risk Register
| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|-----------|--------|------------|-------|
| R-08-01 | Partner enters incorrect license number | Medium | High | Admin verification workflow; soft validation | Admin Team |
| R-08-02 | Insurance coverage expires without update | Medium | High | Automated reminders; admin alerts on expiry | Platform Ops |
| R-08-03 | Profile data lost on save failure | Low | Critical | Optimistic UI; local draft saving; retry logic | Frontend Team |
| R-08-04 | Notification preference changes not propagating | Low | Medium | Event-driven notification system; preference sync on save | Backend Team |
