# Success Metrics: Documents (005)

| KPI | Target | Alert |
|-----|--------|-------|
| Documents page load time (p50) | < 2s | > 4s |
| Document search response time | < 300ms | > 1s |
| Category filter application | < 200ms | > 500ms |
| Approve action latency | < 500ms | > 2s |
| Reject action latency (with reason) | < 1s | > 3s |
| Document review throughput | 20 docs/hour per admin | < 10 docs/hour |
| Rejection reason capture rate | 100% | < 100% = incident |

## Success Definition
Documents screen is successful when for 30 days post-GA: admin can review and act on all pending documents within shift SLA, zero documents approved without review, zero rejections without reason, and support tickets < 1%.
