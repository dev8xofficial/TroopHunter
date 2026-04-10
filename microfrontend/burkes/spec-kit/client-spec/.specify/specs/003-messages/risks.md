# Risk Register: Messages Spec

## Critical Risks

| Risk      | Title                            | Probability  | Impact   | Mitigation                            |
| --------- | -------------------------------- | ------------ | -------- | ------------------------------------- |
| D-MSG-001 | Messages lost in transit         | Low (5%)     | Critical | Message queue + WAL                   |
| D-MSG-002 | Attorney notes visible to client | Medium (15%) | Critical | Recipient role filtering              |
| D-MSG-003 | Notification spam                | Medium (30%) | Medium   | Notification preferences + throttling |
| D-MSG-004 | Read status incorrect            | Low (10%)    | Medium   | Event logging + reconciliation        |

---

## Success Criteria

✅ Zero message loss incidents
✅ Role-scoped visibility enforced 100%
✅ Notification delivery > 99%
✅ Read status accuracy > 99.5%
