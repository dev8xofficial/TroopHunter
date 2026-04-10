# Rollout Strategy: Insurance Spec

## Timeline

| Phase   | Duration | Users     |
| ------- | -------- | --------- |
| Phase 0 | 1 week   | 10 (dev)  |
| Phase 1 | 1 week   | 50 (beta) |
| Phase 2 | 2 weeks  | 500+      |
| Phase 3 | Ongoing  | 100%      |

## Feature Flags

- `FF_INSURANCE_ENABLED`: Enable insurance workflow (default: false Phase 0)
- `FF_INSURANCE_QUOTES`: Show quote comparison (default: false Phase 1)

## Success Criteria

✅ Quote requests < 200ms
✅ Policy validation 100% accurate
✅ Lender integration working (policy data synced)
