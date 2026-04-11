# Metrics — Dashboard

## Key Performance Indicators

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Dashboard load time | <2 seconds | Performance monitoring |
| Referral response rate from dashboard | >80% within 4 hours | Track "View Details" / "Provide Quote" clicks |
| Quick action utilisation | >60% of sessions | Analytics on quick action button clicks |
| KPI card accuracy | 100% match with backend data | Automated comparison tests |

## Monitoring

| Signal | Threshold | Action |
|--------|-----------|--------|
| Dashboard load time >3s | >5% of page loads | P1 alert to frontend team |
| KPI data mismatch | Any discrepancy | P0 alert to data team |
| Zero referral cards when referrals exist | Any occurrence | P0 bug — data fetch failure |
