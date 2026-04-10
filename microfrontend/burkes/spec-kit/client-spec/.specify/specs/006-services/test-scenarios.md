# Test Scenarios: Services Spec

## Test Matrix

| Role | Action                 | Expected                                      |
| ---- | ---------------------- | --------------------------------------------- |
| CL   | Browse home inspectors | Views recommended providers with ratings      |
| AG   | Request appraisal      | Sends request to appraiser; confirmation sent |
| CL   | Book inspector         | Calendar opens; sets date/time                |
| LN   | View scheduled service | Sees appraisal date; status tracking          |

## Edge Cases

1. **No providers available** → Show "Check back soon" message
2. **Service scheduled conflicting with closing** → Alert user
3. **Provider cancels** → Auto-reassign or notify client

## Success Criteria

✅ Service booking < 2 minutes
✅ Provider ratings accurate (1-5 stars)
✅ No double-booking (same date/time)
