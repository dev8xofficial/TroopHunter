# Rollout Strategy: Foundation Spec

Foundation (000) is the parent spec for all features. Rollout must be **phased and cautious** because all subsequent features depend on it.

---

## Rollout Timeline

| Phase                             | Duration | Users                | Goals                               | Metrics                          |
| --------------------------------- | -------- | -------------------- | ----------------------------------- | -------------------------------- |
| **Phase 0: Internal Testing**     | 2 weeks  | 10 (dev team)        | Catch bugs before customer exposure | 0 crashes, 0 data loss           |
| **Phase 1: Beta**                 | 2 weeks  | 50 (pilot customers) | Validate with real usage patterns   | 99.5% uptime, zero auth failures |
| **Phase 2: Early Release**        | 2 weeks  | 100-500 (opt-in)     | Gradual ramp; monitor for issues    | Session success rate > 99.8%     |
| **Phase 3: General Availability** | Ongoing  | 100% (all)           | Full deployment; support all users  | < 0.1% error rate on nav/auth    |

---

## Feature Flags

### Global Foundation Feature Flag

```
FF_FOUNDATION_ENABLED = true/false
```

- **Purpose**: Kill switch for entire foundation layer (nav, auth, activity logging)
- **Risk**: If disabled mid-session, users see broken UI
- **Mitigation**: Never disable globally; use regional/role-based flags instead

### Sub-Feature Flags

| Flag                           | Purpose                      | Default | Rollout                         |
| ------------------------------ | ---------------------------- | ------- | ------------------------------- |
| `FF_ACTIVITY_LOG_ENABLED`      | Activity log creation        | true    | Phase 0 (internal only)         |
| `FF_ROLE_COLOURS_ENABLED`      | Show role-based nav colours  | true    | Phase 1 (all users)             |
| `FF_NOTIFICATION_BELL_ENABLED` | Notification center          | false   | Phase 2 (after full nav stable) |
| `FF_AVATAR_DROPDOWN_ENABLED`   | User menu (logout, settings) | true    | Phase 0 (all users)             |
| `FF_SESSION_TIMEOUT_HOURS`     | Session duration             | 8       | Phase 3 (adjust per feedback)   |

### Regional/Role-Based Rollout

```javascript
if (userRegion === 'CA' && FF_FOUNDATION_ENABLED) {
  // Canadian users get Foundation first
  renderFoundation();
} else if (userRole === 'AG' && FF_FOUNDATION_ENABLED) {
  // Agents get it in Phase 1
  renderFoundation();
}
```

---

## Canary Release Strategy

### Phase 1: Canary (5% of beta users)

- **Users**: 3-5 pilot customers (known early adopters)
- **Duration**: 3-5 days
- **Monitoring**: Real-time dashboards for:
  - Auth success rate
  - Navigation bar render times
  - Activity log event count
  - Session timeout issues
- **Rollback Threshold**: > 1% error rate on any metric → immediate rollback

### Phase 2: Early Release (25% of all users)

- **Users**: 500-1000 opted-in customers
- **Duration**: 1 week
- **Monitoring**: Expanded metrics from Phase 1, plus:
  - Cross-browser compatibility (Chrome, Safari, Firefox, Edge)
  - Mobile responsiveness (iOS Safari, Android Chrome)
  - Performance metrics (Core Web Vitals: LCP, FID, CLS)
- **Rollback Threshold**: > 0.5% error rate → rollback

### Phase 3: Full Release (100% of users)

- **Users**: All customers
- **Duration**: Permanent
- **Monitoring**: Ongoing alerting for:
  - Session abandonment rate
  - Auth provider downtime
  - Activity log latency (p99)
  - Badge rendering mismatches

---

## Rollback Criteria

**Automatic Rollback Triggered If**:

1. Auth failure rate > 1% for 5 minutes
2. Nav bar render time > 200ms (p99)
3. Activity log data loss detected (events dropped)
4. Session context corruption (transaction_id != user's active transaction)
5. Security breach detected (unauthorized role escalation)

**Manual Rollback Process**:

1. Disable feature flag (`FF_FOUNDATION_ENABLED = false`)
2. Route users to previous stable version
3. Log incident with timeline and root cause
4. Investigate before re-enabling (> 24 hour hold)

**Rollback Testing**:

- [ ] Test disabling feature flag with active users online
- [ ] Verify fallback UI (previous nav, no activity log)
- [ ] Confirm no data loss during rollback (activity log preserved)
- [ ] Document Rollback SOP and train ops team

---

## Deployment Steps

### Pre-Deployment (1 week before)

1. Code freeze: No new features to Foundation after Day -7
2. Security audit: Verify session handling, auth integration
3. Performance baseline: Set targets for nav render, auth latency
4. Ops runbook: Prepare rollback procedures and alert thresholds

### Deployment Day

1. Deploy to **staging** (exact production environment)
2. Run full test suite (automated + manual)
3. Load test: Simulate 1000 concurrent users logging in
4. If all pass → deploy to **Phase 0 (internal)** first

### Phase 0: Internal Testing (dev team only)

1. Deploy to production but gate behind feature flag (`FF_FOUNDATION_ENABLED` OFF for public)
2. Dev team logs in and tests for 2 weeks
3. Validate:
   - No auth failures
   - Activity log events created
   - Session context persists
   - Performance metrics nominal

### Phase 1: Beta (50 pilot users)

1. Enable `FF_FOUNDATION_ENABLED` for beta cohort
2. Monitor dashboards hourly
3. If error rate dips below 0.5% → proceed to Phase 2
4. If error rate > 1% → rollback

### Phase 2: Early Release (500-1000 users)

1. Gradually increase flag percentage (25% → 50% → 100% of opt-in)
2. Monitor daily
3. Conduct customer interviews (2-3 calls with pilot users)
4. Validate mobile experience (not just desktop)

### Phase 3: General Availability

1. Enable for all users
2. Establish on-call rotation for Foundation-related incidents
3. Weekly review of metrics

---

## Monitoring & Alerting

### Key Metrics (Dashboard Updated Every 5 Minutes)

| Metric                     | Target  | Alert Threshold  |
| -------------------------- | ------- | ---------------- |
| Auth success rate          | > 99.8% | < 99% for 10 min |
| Nav bar p50 render         | < 50ms  | > 100ms          |
| Nav bar p99 render         | < 100ms | > 200ms          |
| Activity log latency (p99) | < 500ms | > 1000ms         |
| Session timeout (errors)   | 0       | > 0 in 1 hour    |
| Identity provider uptime   | > 99.9% | < 99%            |

### Alert Channels

- **Critical** (page on-call): Auth failures, security violations
- **High** (Slack #incidents): Performance degradation, data loss
- **Medium** (email): Warnings, non-critical metrics outside range

### Dashboards

1. **Executive Dashboard**: Uptime, error rates, user count
2. **Engineering Dashboard**: Detailed metrics, traces, logs
3. **Customer Support Dashboard**: Error messages, user blockers

---

## Communication Plan

### Before Launch (Weeks -2 to 0)

- Email to all customers: "Foundation upgrade coming"
- FAQs published (new nav bar UI, session timeout info)
- Support team trained on common issues

### During Rollout

- Daily status update in Slack (% users on Foundation)
- Customer Slack channel: Direct support for beta users
- Known issues documented in FAQ

### After Launch (Post-rollout)

- Post-mortem meeting (what went well, what didn't)
- Thank you email to beta testers
- Release notes published

---

## Success Definition

Foundation rollout is **successful** when:
✅ 100% of users on Foundation
✅ Auth success rate > 99.8% (sustained for 7 days)
✅ Zero data loss incidents
✅ Zero security breaches
✅ Session timeout working as specified
✅ Activity log immutability verified
✅ All role colours rendering correctly
✅ Mobile responsiveness validated
✅ Customer complaints < 5 in first week

---

## Failure Scenario & Recovery

**If Foundation fails mid-rollout**:

1. Immediately disable feature flag (< 5 min response time)
2. Route 100% of users back to previous version
3. Preserve activity log data (don't delete new events)
4. Investigate root cause (24-48 hour analysis)
5. Fix issue + add test coverage
6. Retry rollout in 1 week (start from Phase 0 again)

**Example Failure Case**:

- Scenario: Session tokens not being set in httpOnly cookies
- Impact: XSS vulnerability exposed
- Response: Immediate rollback, security patch, re-deploy after 48-hour review
- Post-mortem: Add CSRF + XSS tests to pre-deployment checklist
