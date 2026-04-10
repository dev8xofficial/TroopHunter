# Rollout Strategy: Messages Spec

## Timeline

| Phase   | Duration | Users     |
| ------- | -------- | --------- |
| Phase 0 | 1 week   | 10 (dev)  |
| Phase 1 | 1 week   | 50 (beta) |
| Phase 2 | 2 weeks  | 500+      |
| Phase 3 | Ongoing  | 100%      |

## Feature Flags

- `FF_MESSAGING_ENABLED`: Enable messaging (default: false in Phase 0)
- `FF_MESSAGE_NOTIFICATIONS`: Email notifications (default: false in Phase 1)

## Success Criteria

✅ Message delivery < 5 seconds (p95)
✅ List 200 messages without lag
✅ Thread search < 500ms
✅ Notification delivery within 1 minute
