# Metrics — Quotes
## Key Performance Indicators
| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Quote submission rate | >80% of contacted referrals receive quotes | Track quote_sent events |
| Quote acceptance rate | >75% | Track accepted vs total quotes |
| Avg quote response time | <6 hours | Time from referral to quote_sent |
## Monitoring
| Signal | Threshold | Action |
|--------|-----------|--------|
| Quote submission failure | >0.5% | P0 alert to backend team |
| Auto-total calculation error | Any occurrence | P0 bug |
