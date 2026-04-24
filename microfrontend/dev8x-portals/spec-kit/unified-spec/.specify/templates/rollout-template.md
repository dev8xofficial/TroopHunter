# [Module Name] — Rollout

> **Module ID**: `NNN-module-name`

---

## Rollout Strategy

| Phase | Audience | Percentage | Duration | Gate |
|-------|----------|------------|----------|------|
| Canary | Internal team | 5% | 2 days | No P0 bugs |
| Beta | Selected users | 25% | 5 days | Error rate < 0.1% |
| GA | All users | 100% | — | All metrics green |

---

## Feature Flags

| Flag | Default | Description |
|------|---------|-------------|
| `ff_nnn_feature_name` | OFF | Controls visibility of [feature] |

---

## Rollback Plan

**Trigger**: [Condition that triggers rollback]
**Action**: Disable feature flag `ff_nnn_feature_name`
**Recovery Time**: < 5 minutes
**Data Impact**: [What happens to data created during rollout]

---

## Communication Plan

| Event | Audience | Channel | Owner |
|-------|----------|---------|-------|
| Rollout start | Engineering | Slack | Module owner |
| Issues detected | Engineering + Product | Slack + Email | On-call |
| GA release | All stakeholders | Email | Product |
