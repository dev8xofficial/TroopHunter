# Test Scenarios: Mortgage Spec

## Test Matrix

| Role | Action                         | Expected                                       |
| ---- | ------------------------------ | ---------------------------------------------- |
| CL   | Submit mortgage application    | Application sent to lender; confirmation email |
| LN   | Update pre-approval            | Status changes; client notified                |
| AT   | Review underwriting conditions | Lists conditions requiring resolution          |
| LN   | Issue clear-to-close           | Status → "ready"; closing team notified        |

## Edge Cases

1. **Conditional approval** → Client must resolve conditions (e.g., submit pay stubs)
2. **Appraisal (required condition)** → Order from dashboard
3. **Rate lock expires** → Alert to lock in new rate

## Success Criteria

✅ Pre-approval completed within 24 hours
✅ Underwriting conditions clearly listed
✅ Clear-to-close issued 3-5 days before closing
