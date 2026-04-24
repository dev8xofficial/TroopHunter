# Authentication — Metrics

> **Module ID**: `001-authentication`

---

## Success Metrics

| Metric | Target | Current | Measurement Method |
|--------|--------|---------|-------------------|
| Login success rate | ≥ 95% | — | Successful logins / total login attempts |
| Registration completion rate | ≥ 80% | — | Verified accounts / registration starts |
| Median login latency | < 500ms | — | P50 of POST /auth/login response time |
| Failed login rate | < 5% (legitimate users) | — | Failed attempts by verified accounts |

---

## KPIs

| KPI | Definition | Threshold | Alert |
|-----|-----------|-----------|-------|
| Lockout rate | Locked accounts / total active accounts | Warning: > 1%, Critical: > 5% | Security team |
| Session duration (avg) | Mean time between login and logout/expiry | Informational | Product team |
| MFA adoption rate | MFA-enabled accounts / total accounts | Target: 100% Admin | Security team |
| Registration-to-verification time | Median time from register to email verify | Warning: > 1 hour | Product team |

---

## Monitoring

| Signal | Type | Frequency |
|--------|------|-----------|
| Login attempts (total) | Counter | Real-time |
| Login failures (per IP) | Counter | Real-time |
| Active sessions | Gauge | Every 5 minutes |
| Account lockouts | Counter | Real-time |
| JWT issuance rate | Counter | Real-time |
| Email verification pending | Gauge | Hourly |
