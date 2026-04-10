# Risk Register: Services Spec

## Critical Risks

| Risk      | Title                                  | Probability  | Impact | Mitigation                        |
| --------- | -------------------------------------- | ------------ | ------ | --------------------------------- |
| D-SVC-001 | Provider no-show                       | Medium (40%) | High   | Reminders + backup provider list  |
| D-SVC-002 | Double booking (same slot)             | Low (5%)     | Medium | Calendar locking + real-time sync |
| D-SVC-003 | Service scheduled too close to closing | Medium (30%) | High   | Schedule conflict checking        |

---

## Success Criteria

✅ Provider no-show rate < 5%
✅ Zero double-booking incidents
✅ Schedule conflicts detected 100%
