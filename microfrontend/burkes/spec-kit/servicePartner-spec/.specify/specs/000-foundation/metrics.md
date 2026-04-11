# Metrics — Foundation

## Key Performance Indicators

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Navigation click-through rate | >95% of sessions use nav | Analytics tracking on nav button clicks |
| Page load time (foundation layer) | <1.5s on 3G connection | Performance monitoring |
| Design token coverage | 100% of components use tokens | CI lint check for raw hex values |
| Badge rendering accuracy | 100% correct across all statuses | Visual regression testing |
| Session context availability | 100% uptime during authenticated sessions | Error monitoring |

---

## Monitoring

| Signal | Threshold | Action |
|--------|-----------|--------|
| Nav bar render failure | >0.1% of page loads | P0 alert to frontend team |
| Session context timeout | >1% of sessions | Investigate auth provider latency |
| Design token mismatch | Any raw hex in production | Block deployment; fix required |
