# Metrics — Reviews
## Key Performance Indicators
| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Review response rate | >95% | Responded reviews / total reviews |
| Average review rating | >4.5 | Running average of all ratings |
| Response time to reviews | <24 hours | Time between review_received and review_responded events |
## Monitoring
| Signal | Threshold | Action |
|--------|-----------|--------|
| Response rate drop | <80% | Notification to partner |
| Rating drop below 4.0 | Any occurrence | Admin alert for quality review |
