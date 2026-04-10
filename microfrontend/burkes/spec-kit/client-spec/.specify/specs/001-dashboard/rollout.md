# Rollout Strategy: Dashboard Spec

Dashboard (001) depends on Foundation (000) and Activity Log. Rollout is phased to validate widget functionality and performance under real usage.

---

## Rollout Timeline

| Phase       | Duration | Users         | Goals                                    |
| ----------- | -------- | ------------- | ---------------------------------------- |
| **Phase 0** | 1 week   | 10 (dev team) | Catch UI/layout bugs                     |
| **Phase 1** | 1 week   | 50 (beta)     | Validate activity feed real-time updates |
| **Phase 2** | 2 weeks  | 500           | Performance validation; mobile testing   |
| **Phase 3** | Ongoing  | 100%          | General Availability                     |

---

## Feature Flags

| Flag                        | Purpose                | Default         |
| --------------------------- | ---------------------- | --------------- |
| `FF_DASHBOARD_ENABLED`      | Show dashboard         | false (Phase 0) |
| `FF_ACTIVITY_FEED_REALTIME` | Live activity updates  | false (Phase 1) |
| `FF_PROGRESS_TIMELINE`      | Show 11-stage timeline | true (Phase 0)  |
| `FF_QUICK_ACTIONS`          | Show action buttons    | false (Phase 1) |
| `FF_STATS_ADVANCED`         | Show detailed stats    | false (Phase 2) |

---

## Canary Release

### Phase 1: Canary (5%)

- Monitor: Activity feed query latency, event append delays
- Rollback if: Activity updates delayed > 5 seconds
- Duration: 3-5 days

### Phase 2: Early Release (25%)

- Monitor: Mobile performance, pagination load times
- Rollback if: Dashboard load time > 2s (p95)
- Duration: 1 week

### Phase 3: Full Release (100%)

- Sustained: Activity feed consistency across nodes
- Rollback if: > 0.1% data loss in activity log

---

## Success Criteria

✅ Activity feed updates within 5 seconds (realtime)
✅ Dashboard load time < 1.5s (p95)
✅ Activity feed pagination < 300ms
✅ Zero activity event loss
✅ Mobile responsiveness validated (iOS + Android)
✅ Activity feed accurate (no duplicate/missing events)
