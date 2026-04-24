# Authentication — Rollout

> **Module ID**: `001-authentication`

---

## Rollout Strategy

| Phase | Audience | Percentage | Duration | Gate |
|-------|----------|------------|----------|------|
| Canary | Internal team | 5% | 3 days | No P0 bugs, lockout rate < 1% |
| Beta | Selected candidates + clients | 25% | 5 days | Login success rate ≥ 95%, latency < 500ms |
| GA | All users | 100% | — | All metrics green for 48 hours |

---

## Feature Flags

| Flag | Default | Description |
|------|---------|-------------|
| `ff_001_email_password_login` | ON | Core email/password login |
| `ff_001_candidate_registration` | ON | Candidate self-registration |
| `ff_001_remember_me` | ON | Extended session option |
| `ff_001_admin_mfa_required` | ON | MFA enforcement for Admin portal |
| `ff_001_account_lockout` | ON | Failed attempt lockout |

---

## Rollback Plan

**Trigger**: Login success rate drops below 90% OR lockout rate exceeds 5%
**Action**: Disable affected feature flags; fall back to previous auth implementation
**Recovery Time**: < 5 minutes (feature flag toggle)
**Data Impact**: Active sessions remain valid; new logins use fallback path

---

## Communication Plan

| Event | Audience | Channel | Owner |
|-------|----------|---------|-------|
| Rollout start | Engineering + Security | Slack #auth-rollout | Auth lead |
| Canary metrics | Engineering | Slack #auth-rollout | On-call |
| GA announcement | All stakeholders | Email | Product |
| Incident detected | Engineering + Security | PagerDuty + Slack | On-call |
