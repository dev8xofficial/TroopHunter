# Risks — Dashboard

## Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|-----------|--------|------------|-------|
| R-01-01 | KPI data stale or incorrect | Medium | High | Real-time data refresh on screen load; cache invalidation on state change | Backend Team |
| R-01-02 | Referral cards overwhelm dashboard | Low | Medium | Limit to 5 most recent; "View All" link to Referrals screen | Frontend Team |
| R-01-03 | Service area stats slow to load | Medium | Medium | Lazy load service area section; skeleton loading state | Frontend Team |
| R-01-04 | Quick action buttons misroute | Low | High | Integration tests for all 4 navigation paths | QA Team |
