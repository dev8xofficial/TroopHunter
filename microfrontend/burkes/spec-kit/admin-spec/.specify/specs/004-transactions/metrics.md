# Success Metrics: Transactions (004)

| KPI | Target | Alert |
|-----|--------|-------|
| Transactions page load time (p50) | < 2s | > 4s |
| Transactions page load time (p99) | < 4s | > 8s |
| Transaction search response time | < 300ms | > 1s |
| Stage filter application | < 200ms | > 500ms |
| Pending approvals expand/collapse | < 200ms | > 500ms |
| Approval action latency | < 500ms | > 2s |
| Transaction creation success rate | > 99% | < 95% |
| Rejection reason capture rate | 100% | < 100% = incident |

## Success Definition
Transactions Management is successful when for 30 days post-GA: admin can locate any transaction and act on pending approvals within 60 seconds, all attorney verifications processed within SLA, and zero stage updates approved without proper verification.
