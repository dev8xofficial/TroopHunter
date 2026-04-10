# Test Scenarios: Insurance Spec

## Test Matrix

| Role | Action                   | Expected                                               |
| ---- | ------------------------ | ------------------------------------------------------ |
| AG   | Request homeowners quote | Quote request sent to client; deadline set             |
| CL   | Submit quote             | Quote appears in portal; AG notified                   |
| AT   | Review policy            | Coverage amount verified; lender satisfied?            |
| LN   | View insurance status    | Sees all policies; confirms coverage meets requirement |

## Edge Cases

1. **Premium rejected (too high)** → Client can request another quote
2. **Policy expires before closing** → System alerts; needs renewal
3. **Multiple quotes for same type** → Show comparison; mark best deal

## Success Criteria

✅ Quote requests delivered within 5 min
✅ Policy validation accurate (coverage meets lender requirement)
✅ Active policies tracked through closing
