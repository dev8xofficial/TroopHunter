# Admin Pipeline - Metrics

> **Module ID**: `102-admin-pipeline`
> **Version**: 1.0.0

---

## Success Metrics

| Metric | Target | Measurement Source |
| --- | --- | --- |
| Invalid transition rate | < 1% of attempted stage moves rejected | stage change audit events |
| Stale record visibility | 100% of stale records flagged within SLA | staleness job output |
| Transition completion time | p95 under 2 seconds | workflow timing metrics |

---

## Review Cadence

- Weekly review during active delivery.
- Monthly review after general availability.
- Immediate review when lifecycle, permission, or audit regressions are detected.