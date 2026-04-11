# Metrics — Service Areas
## Key Performance Indicators
| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Average areas per partner | >3 | Count active areas per partner |
| New area additions per month | Growth trend | Track service_area_added events |
| Referral fill rate per area | >70% | Referrals matched vs total in area |
## Monitoring
| Signal | Threshold | Action |
|--------|-----------|--------|
| Area data fetch failure | >0.1% | P0 alert |
| Recommendation engine down | Any occurrence | P1 alert; hide recommendations section |
