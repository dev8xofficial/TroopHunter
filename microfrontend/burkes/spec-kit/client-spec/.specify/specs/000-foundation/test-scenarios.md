# Test Scenarios: Foundation Spec

## Overview

Foundation (000) covers global navigation, design tokens, session context, and activity logging.
These test scenarios validate that all UIs conform to the design system and that session/audit requirements are met.

---

## Test Matrix: Role × Component × Outcome

| Role | Component     | Scenario                                 | Expected Outcome                                    | Status |
| ---- | ------------- | ---------------------------------------- | --------------------------------------------------- | ------ |
| CL   | Global Nav    | User logs in via identity provider       | Nav bar displays transaction ID + role badge (teal) | ✅     |
| AG   | Global Nav    | Navigate between dashboard and documents | Nav bar sticky, maintains context across routes     | ✅     |
| LN   | Global Nav    | Click notification bell                  | Dropdown shows lender-only alerts                   | ✅     |
| AT   | Global Nav    | Click user avatar                        | Dropdown shows session info + logout                | ✅     |
| CP   | Design Tokens | CPA role applied to a field              | Field uses navy (#1e3a8a) colour from token system  | ✅     |
| TC   | Design Tokens | Coordinator badge appears on status      | Badge uses orange (#ea580c) from role_mapping       | ✅     |

---

## Edge Cases & Exception Handling

### Session Context

1. **Expired Session**
   - User idle for 8+ hours
   - Expected: Route to login, preserve transaction_id in URL
   - Acceptance Criteria: User can resume after re-auth without losing context

2. **Missing Transaction_ID**
   - User navigates to nav bar without active transaction
   - Expected: Display "No active transaction" state
   - Acceptance Criteria: Nav bar doesn't crash; shows disabled state

3. **Role Change Mid-Session**
   - User's role updated (e.g., promoted to attorney)
   - Expected: Session refreshed; nav bar updates with new role colour
   - Acceptance Criteria: Immediate UI refresh; audit log records role change event

### Activity Log

4. **Rapid State Changes**
   - 10+ events fire in < 1 second (e.g., bulk document upload)
   - Expected: All events appended in order, no dropped events
   - Acceptance Criteria: Event timestamps differ by ≥ 1ms; audit log is complete

5. **Visibility Scope Violation**
   - Client tries to view attorney-only notes via API
   - Expected: API returns 403 Forbidden; activity log records access attempt
   - Acceptance Criteria: No data leak; violation logged with actor, timestamp, intent

6. **Event Immutability Breach**
   - System attempts to edit a historical activity event
   - Expected: Database constraint prevents edit; system logs integrity check failure
   - Acceptance Criteria: Event unchanged; alert to ops team

### Design System

7. **Unsupported Colour Token Used**
   - Developer hardcodes #FF00FF instead of using token
   - Expected: Linting error during build
   - Acceptance Criteria: Build fails; developer must use defined token

8. **Missing Badge Variant**
   - New status (e.g., "on_hold") doesn't map to badge system
   - Expected: Spec violation caught in review
   - Acceptance Criteria: PR cannot merge without updating badge_system in validation schema

---

## Accessibility Requirements (WCAG 2.1 Level AA)

### Navigation Bar

- [ ] Keyboard navigation: Tab key cycles through nav items, Avatar dropdown
- [ ] Focus indicators: Visible outline on all interactive elements
- [ ] Colour contrast: All text ≥ 4.5:1 contrast ratio against backgrounds
- [ ] Screen reader: Nav items labeled with `aria-label`; dropdown status announced
- [ ] Touch targets: Nav items ≥ 44px × 44px on mobile

### Alert Banners

- [ ] Semantic markup: `<role="alert">` for dynamic alerts
- [ ] Dismiss button: Keyboard-accessible (Space/Enter to dismiss)
- [ ] Live regions: Screen reader announces new alerts
- [ ] Colour alone: Icon or text reinforces info beyond colour

### Badge System

- [ ] Colour + icon: No status communicated by colour alone
- [ ] Text alternatives: Badges have `title` or `aria-label`
- [ ] High contrast: Variants meet 4.5:1 WCAG ratio

---

## Performance Targets

| Metric                          | Target  | Rationale                          |
| ------------------------------- | ------- | ---------------------------------- |
| Nav bar render                  | < 50ms  | Always visible; jank is noticeable |
| Activity log query (100 events) | < 200ms | Dashboard shows recent events      |
| Design token resolution         | < 10ms  | Used on every component render     |
| Badge system lookup             | < 5ms   | Lightweight lookup by variant name |
| Session context refresh         | < 500ms | Acceptable delay on role/tx change |

---

## Security Scenarios

### Session & Auth

- [ ] Test: User session token revoked → automatic logout on next action
- [ ] Test: Concurrent sessions (same user, 2 browsers) → only latest active
- [ ] Test: CSRF protection on form submissions (if applicable)
- [ ] Test: Session token in httpOnly cookie (not accessible to JS)

### Activity Log

- [ ] Test: Non-admin cannot query other users' activity logs
- [ ] Test: Activity events cannot be tampered with (immutability enforced)
- [ ] Test: PII in event data is redacted for client-visible events
- [ ] Test: Audit trail survives database restore/backup

### Design Tokens

- [ ] Test: No sensitive data hardcoded in token definitions
- [ ] Test: Colour tokens don't embed user data (only aliases)

---

## Integration Tests

### With Auth System

- [ ] Test: Login returns valid session context (transaction_id, role, token)
- [ ] Test: Identity provider endpoint failure → graceful fallback

### With Database

- [ ] Test: Activity log entries persisted immediately (no batching)
- [ ] Test: Millions of activity events don't slow query performance

### With Microservices

- [ ] Test: Service-to-service calls include transaction_id in headers
- [ ] Test: Activity log events created by backend services for data changes

---

## Regression Test Checklist

Before each release:

- [ ] All 6 role colours render correctly in nav bar
- [ ] Badge system still matches design system (no hardcoded values)
- [ ] Activity log append-only constraint enforced
- [ ] Session context persists across page reloads
- [ ] Navigation bar sticky positioning works on all viewports
- [ ] Alert dismissal doesn't break layout
- [ ] No new console errors or warnings
- [ ] Accessibility audit (axe-core) passes

---

## Testing Tools & Approach

| Tool           | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| **Chromatic**  | Visual regression (design tokens, badge variants)       |
| **axe-core**   | Accessibility compliance (WCAG AA)                      |
| **Jest**       | Unit tests (session context, activity log immutability) |
| **Cypress**    | E2E (navigation, logout/login, role switch)             |
| **OWASP ZAP**  | Security scanning (session handling, CSRF)              |
| **Lighthouse** | Performance baseline (nav render, LCP)                  |

---

## Test Data Requirements

### Sample Transactions

```
TXN-0000000001: CL + AG (simple case)
TXN-0000000002: CL + AG + LN + AT (full team)
TXN-0000000003: Multi-property (CL with 2 addresses — tests multiple nav contexts)
```

### Sample Activity Events

```
500 completed events (historical)
50 new events (last 24 hours)
Spanning all 6 event types (status_changed, document_uploaded, message_sent, etc.)
```

---

## Success Criteria

✅ All test scenarios pass with 0 failures
✅ Accessibility audit returns 0 violations
✅ Performance metrics within targets
✅ No security/integrity breaches detected
✅ Audit trail is complete and immutable for 100M+ transaction history
