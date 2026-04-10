# Risk Register: Insurance Spec

## Critical Risks

| Risk      | Title                            | Probability  | Impact   | Mitigation                        |
| --------- | -------------------------------- | ------------ | -------- | --------------------------------- |
| D-INS-001 | Policy lapses before closing     | Medium (30%) | Critical | Expiry alerts + renewal reminders |
| D-INS-002 | Coverage insufficient for lender | Low (10%)    | High     | lender_satisfied validation       |
| D-INS-003 | Quote data lost                  | Low (5%)     | Medium   | Backup storage + audit log        |

---

## Success Criteria

✅ Zero policies expire pre-closing
✅ Lender coverage validation 100% accurate
✅ Quote request success rate > 99%
