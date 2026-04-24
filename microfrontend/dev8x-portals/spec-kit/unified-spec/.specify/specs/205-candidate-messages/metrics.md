# Candidate Messages - Metrics

> **Module ID**: `205-candidate-messages`
> **Version**: 1.0.0

---

## Success Metrics

| Metric | Target | Measurement Source |
| --- | --- | --- |
| Unread backlog | < 5 aged unread items per owner | message and ticket queues |
| Response SLA | 90% responded within agreed SLA | message and ticket timestamps |
| Escalation accuracy | 100% of escalations linked to a valid thread or ticket | audit events |

---

## Review Cadence

- Weekly review during active delivery.
- Monthly review after general availability.
- Immediate review when lifecycle, permission, or audit regressions are detected.