# Test Scenarios: Dashboard Spec

## Overview

Dashboard (001) displays transaction overview, activity feed, progress timeline, and stats. Tests verify correct role-scoped views, real-time updates, and performance.

---

## Test Matrix: Role × Widget × Outcome

| Role | Widget        | Scenario                    | Expected                                             | Status |
| ---- | ------------- | --------------------------- | ---------------------------------------------------- | ------ |
| CL   | Overview      | Client logs in              | Sees property address, current stage, next action    | ✅     |
| CL   | Activity Feed | 10 events exist             | Shows 5 most recent (20-event pagination)            | ✅     |
| CL   | Activity Feed | Opens messages event        | Cannot see attorney notes (visibility scoped)        | ✅     |
| AG   | Progress      | Transaction at underwriting | Shows stage 9/11 with lender responsible party       | ✅     |
| LN   | Stats         | Opens dashboard             | Shows docs required, % uploaded, days to closing     | ✅     |
| AT   | Quick Actions | Views dashboard             | Sees "Review Documents", "Request Insurance" actions | ✅     |

---

## Edge Cases

### Activity Feed

1. **500 events exist**
   - Expected: Load 20 most recent; pagination works; query < 200ms
   - Acceptance Criteria: No N+1 queries; indexed by transaction_id + date

2. **No events yet (new transaction)**
   - Expected: "No activity yet" message; no crash
   - Acceptance Criteria: Empty state styled; CTA to first action

3. **Real-time event arrives during view**
   - Expected: New event appended to top; old events scroll down
   - Acceptance Criteria: No double-rendering; UX smooth

### Progress Widget

4. **Stage date is null (not yet reached)**
   - Expected: Show "In Progress" badge (yellow/pending)
   - Acceptance Criteria: Date field hidden if null

5. **Responsible party is unknown (new role added)**
   - Expected: Show role code (e.g., "CP") without error
   - Acceptance Criteria: Graceful fallback; no crash

### Stats Widget

6. **Documents required calculation fails**
   - Expected: Show "TBD" instead of 0; error logged
   - Acceptance Criteria: No incorrect zero counts; audit trail

7. **Closing date in past (transaction overdue)**
   - Expected: "Days to closing" shows negative (red badge)
   - Acceptance Criteria: Visual alert; support team notified

### Cross-Activity Feed / Progress Sync

8. **Activity shows "Appraisal completed" but progress widget still pending**
   - Expected: Reconcile within 5 seconds (data freshness)
   - Acceptance Criteria: No contradictions visible > 5s

---

## Accessibility (WCAG AA)

- [ ] Keyboard navigation: Tab through widgets; Enter to open activity feed
- [ ] Focus indicators: Visible outline on Quick Actions buttons
- [ ] Screen reader: "Dashboard for Transaction TXN-0000000001" announced on load
- [ ] Colour contrast: Stats numbers ≥ 4.5:1 against background
- [ ] Alt text: Progress timeline shows stage names (not just numbers)
- [ ] Live regions: New activity event announced via `aria-live="polite"`

---

## Performance Targets

| Metric                          | Target  |
| ------------------------------- | ------- |
| Dashboard load (first paint)    | < 1s    |
| Activity feed query (20 events) | < 200ms |
| Stats calculation               | < 100ms |
| Real-time event append          | < 500ms |
| Pagination to next 20 events    | < 300ms |

---

## Security Tests

- [ ] Client cannot view attorney-only activity (visibility enforced)
- [ ] Client cannot modify progress widget (read-only)
- [ ] API returns 403 if user role doesn't match transaction context
- [ ] XSS test: Activity description with `<script>` → sanitized
- [ ] CSRF test: Quick action form submission protected

---

## Integration Tests

### With Activity Log (Foundation)

- [ ] Activity feed pulls from activity_log table
- [ ] Visibility rules enforced (client sees public events only)
- [ ] Event timestamps match activity_log.created_date

### With Transaction Service

- [ ] Progress widget syncs with transaction_status
- [ ] Responsible party matches transaction.professionals array
- [ ] Stats (docs uploaded) matches document count in service

### With Document Service (002)

- [ ] Stats widget shows accurate doc count
- [ ] Missing docs highlighted in Quick Actions ("Upload Insurance")

---

## Test Data

### Sample Transactions

```
TXN-0000000001: Status = underwriting (stage 9/11)
  - 50 activity events (2 days of history)
  - 15 documents uploaded, 3 pending
  - 5 messages exchanged

TXN-0000000002: Status = clear_to_close (stage 10/11)
  - 130 activity events (7 days of history)
  - 28 documents uploaded, 0 pending
  - 20+ messages

TXN-0000000003: Status = initial_consultation (stage 1/11) [new]
  - 2 activity events (just created)
  - 0 documents uploaded
  - 0 messages (team intro pending)
```

---

## Regression Tests (Before Each Release)

- [ ] Activity feed displays 20 most recent events
- [ ] Progress widget shows correct current stage (1-11)
- [ ] Stats widget accurate (docs uploaded matches source of truth)
- [ ] Role-based visibility working (client cannot see internal notes)
- [ ] Quick actions render without errors
- [ ] Load time < 1s (no performance regression)
- [ ] Pagination working (next/prev pages load correctly)
- [ ] Accessibility audit (axe-core) passes

---

## Success Criteria

✅ All test scenarios pass
✅ WCAG AA compliance verified
✅ Performance targets met (< 1s load, < 200ms queries)
✅ Data consistency: no contradictions between feeds & progress
✅ Zero security/visibility violations
