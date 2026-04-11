# Tasks: Attorney Portal Foundation

**Feature ID**: 000-foundation
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Not Started
**Created**: 2026-04-12

---

## Overview

Deliver the shared infrastructure layer — design tokens, session context, top navigation, activity log, notifications, and modal system — on which all five portal screens depend.

**Total Tasks**: 12
**Estimated Effort**: L

---

## Dependency Order

```
[TASK-000-01] ──► [TASK-000-02] ──► [TASK-000-04] ──► [TASK-000-06]
                                 ──► [TASK-000-05] ──► [TASK-000-07]
[TASK-000-03] ──► [TASK-000-04]
[TASK-000-06] ──► [TASK-000-08] ──► [TASK-000-10]
[TASK-000-07] ──► [TASK-000-09] ──► [TASK-000-10]
[TASK-000-10] ──► [TASK-000-11] ──► [TASK-000-12]
```

*TASK-000-01 and TASK-000-03 can begin immediately.*

---

## Tasks

---

### TASK-000-01 — Define and Register All Design Tokens

**Status**: Not Started
**Effort**: S
**Depends on**: None
**Blocks**: TASK-000-02, TASK-000-04

**Description**:
Create the canonical design token registry containing all 16 colour tokens, typography tokens (Archivo + Manrope, size scale, weight scale), spacing tokens (1400px container, 32px padding, 12px radius), four shadow levels, badge variants, and button variants. Tokens must be expressed as named constants, not hardcoded values — every screen will reference these by name.

**Acceptance Criteria**:
- [ ] All 16 colour tokens defined: primary-navy, primary-gold, accent-blue, success-green, warning-orange, error-red, info-blue, and neutral scale (neutral-50 through neutral-900)
- [ ] Typography tokens registered: Archivo loaded for display/headings, Manrope for body/UI
- [ ] Shadow tokens defined: shadow-sm, shadow-md, shadow-lg, shadow-xl
- [ ] Badge classes defined: badge-success, badge-warning, badge-error, badge-info, badge-neutral
- [ ] Button classes defined: btn-primary, btn-secondary, btn-gold, btn-success, btn-danger
- [ ] No hardcoded hex values outside the token registry

**Notes**:
Reference attorney.html for exact colour values. All tokens must be available globally before any component renders.

---

### TASK-000-02 — Build Global Layout Shell

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: TASK-000-04

**Description**:
Build the top-level viewport wrapper that provides three named slots: the navigation slot (top, 72px), the content slot (remaining viewport height, scrollable), and the modal slot (full-viewport overlay layer above content). The shell enforces the 1400px max-width container and 32px horizontal padding within the content slot.

**Acceptance Criteria**:
- [ ] Navigation slot renders at top with exactly 72px height
- [ ] Content slot fills remaining viewport height and scrolls independently
- [ ] Modal slot sits above all content at z-index above nav and content
- [ ] Container max-width of 1400px enforced with 32px horizontal padding
- [ ] Shell renders correctly at all three breakpoints (≥1200px, 768–1199px, <768px)

---

### TASK-000-03 — Implement Session Context Resolver

**Status**: Not Started
**Effort**: S
**Depends on**: None
**Blocks**: TASK-000-04

**Description**:
Implement the session resolver that reads the auth provider token on portal load and populates the `SessionContext` object: attorney name, initials, role identifier (AT), firm name, assigned transaction IDs array, and unread notification count. The resolver must fail gracefully and redirect to the auth provider if the token is absent or invalid. Seed the reference identity (Sarah Mitchell, SM, AT, The Burkes Group) for the reference implementation.

**Acceptance Criteria**:
- [ ] SessionContext populated on portal load from auth token
- [ ] Reference identity (Sarah Mitchell / SM / AT / The Burkes Group) correctly resolved from the reference token
- [ ] Invalid or absent token redirects to auth provider without rendering portal content
- [ ] SessionContext available to all screens without additional API calls per screen

---

### TASK-000-04 — Build Top Navigation Bar

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-000-01, TASK-000-02, TASK-000-03
**Blocks**: TASK-000-05, TASK-000-06

**Description**:
Build the sticky top navigation bar (72px height). Left section: logo block (44×44px, primary-navy bg, primary-gold "B" glyph) + wordmark "The Burkes Group" in Archivo. Centre section: five navigation buttons — Dashboard, Transactions, Documents, Clients, Verification — with active state (white text on primary-navy). Right section: notification bell with red dot badge (when unreadCount > 0) + user chip showing attorney initials avatar and full name from SessionContext.

**Acceptance Criteria**:
- [ ] Nav bar is sticky and remains visible at the top during page scroll
- [ ] Logo and wordmark render as specified
- [ ] All 5 navigation buttons present in correct order
- [ ] Clicking any navigation button navigates to the correct screen
- [ ] Active navigation button displays white text on primary-navy background
- [ ] User chip displays "SM" avatar and "Sarah Mitchell" from SessionContext
- [ ] Notification bell shows red dot badge when unreadCount > 0

---

### TASK-000-05 — Implement Screen Routing and Transitions

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-04
**Blocks**: TASK-000-08

**Description**:
Implement the single-page screen routing system. Each of the five screens has a route ID (dashboard, transactions, documents, clients, verification). Activating a route: hides all inactive screens, shows the target screen, scrolls viewport to top, and plays a fade-in animation on the screen content. Only one screen is visible at a time.

**Acceptance Criteria**:
- [ ] Only the active screen is visible; all others are hidden
- [ ] Screen switch scrolls viewport to top of the content area
- [ ] Fade-in animation plays on screen content when it becomes visible
- [ ] Browser back/forward navigation (if applicable) correctly restores screen state
- [ ] NavigationState (activeScreen, previousScreen) updated on every switch

---

### TASK-000-06 — Implement Activity Log Service

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-000-04
**Blocks**: TASK-000-09, TASK-000-10

**Description**:
Implement the append-only activity log service. The `logEvent(type, payload)` function accepts a canonical event type and a payload, validates it against the ActivityLogEvent schema, assigns a unique eventId and ISO timestamp, and writes to the backend activity log. Implement a feed reader `getRecentEvents(attorneyId, limit)` that returns the most recent N events for the current attorney. Validate events against `.specify/schemas/activity-log-event.json`.

**Acceptance Criteria**:
- [ ] `logEvent()` accepts all 7 canonical types: document_reviewed, document_approved, document_rejected, transaction_verified, discrepancy_flagged, client_created, report_generated
- [ ] Each event written includes: eventId (unique), eventType, actorId, actorRole (AT), timestamp (ISO 8601)
- [ ] `getRecentEvents()` returns events sorted by timestamp descending
- [ ] Events written from any screen are readable from the feed reader
- [ ] Events validated against activity-log-event.json schema before write

---

### TASK-000-07 — Build Modal / Overlay System

**Status**: Not Started
**Effort**: M
**Depends on**: TASK-000-01, TASK-000-02
**Blocks**: TASK-000-09, TASK-000-10

**Description**:
Build the global modal system that all screens use for their confirmation and action dialogs. The system exposes `openModal(id, props)` and `closeModal()`. When open: a semi-transparent backdrop covers the full viewport, a centred modal card renders above it using shadow-xl, focus is trapped inside the modal, and pressing Escape closes it. The modal renders in the layout shell's modal slot.

**Acceptance Criteria**:
- [ ] `openModal(id, props)` renders the correct modal component for the given ID
- [ ] `closeModal()` removes the modal and restores focus to the triggering element
- [ ] Backdrop covers full viewport and is semi-transparent
- [ ] Focus trap prevents keyboard navigation outside the modal while it is open
- [ ] Escape key closes the modal
- [ ] Modal renders correctly at all three breakpoints

**Notes**:
Modal IDs used across the portal: verify-confirm, flag-discrepancy, add-client, generate-report, approve-document, reject-document, client-detail, modify-split.

---

### TASK-000-08 — Wire Notification Count Subscriber

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-06
**Blocks**: TASK-000-10

**Description**:
Implement the notification count subscriber that keeps the nav bar bell badge updated. On portal load, fetch initial unread count. Subscribe to updates (poll interval: 60 seconds maximum). When unreadCount transitions from 0 to >0, the red dot badge becomes visible. When it reaches 0, the badge is hidden.

**Acceptance Criteria**:
- [ ] Notification bell badge appears when unreadCount > 0
- [ ] Badge disappears when unreadCount returns to 0
- [ ] Count updates at most every 60 seconds without a page refresh
- [ ] Count sourced from SessionContext on load; refreshed from notification service thereafter

---

### TASK-000-09 — Build Reference Activity Feed Seed Data

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-000-06, TASK-000-07
**Blocks**: TASK-000-10

**Description**:
Populate the activity log with the four reference seed events used in the Dashboard reference implementation: Document Uploaded (TRX-10247), Review Started (TRX-10198), Client Added (John Smith), Message Received (from lender). These events must be valid according to the ActivityLogEvent schema.

**Acceptance Criteria**:
- [ ] Four seed events exist in the activity log for attorney ID SM
- [ ] Each seed event passes schema validation
- [ ] Events appear in the Dashboard Recent Activity feed in correct order (most recent first)
- [ ] Timestamps are realistic relative to the reference closing dates

---

### TASK-000-10 — Responsive Layout Validation

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-06, TASK-000-07, TASK-000-08
**Blocks**: TASK-000-11

**Description**:
Validate that the Foundation layer renders correctly across all three responsive breakpoints: ≥1200px (full layout), 768–1199px (reduced), <768px (single-column, nav hidden, reduced padding). Fix any layout issues introduced by earlier tasks before screen-level development begins.

**Acceptance Criteria**:
- [ ] At ≥1200px: full nav renders with all elements
- [ ] At 768–1199px: nav adapts without element overlap
- [ ] At <768px: nav is hidden or collapsed; content fills full width
- [ ] Modal renders correctly and fills appropriate width at all breakpoints
- [ ] No token violations (hardcoded colours or sizes) found in any breakpoint

---

### TASK-000-11 — Foundation Integration Smoke Test

**Status**: Not Started
**Effort**: S
**Depends on**: TASK-000-10
**Blocks**: TASK-000-12

**Description**:
Run the full Foundation integration smoke test suite: portal load with session context, screen switching through all 5 routes, activity log write + read, modal open/close, notification badge update. All tests must pass before screen-level development begins. Reference the test-scenarios.md for detailed test cases.

**Acceptance Criteria**:
- [ ] Portal loads in < 2 seconds with session context populated
- [ ] All 5 screen routes switch correctly with correct active nav state
- [ ] Activity log write succeeds for all 7 event types
- [ ] Modal opens and closes correctly for the verify-confirm ID
- [ ] Notification badge updates correctly when unreadCount changes

---

### TASK-000-12 — Foundation Handoff Documentation

**Status**: Not Started
**Effort**: XS
**Depends on**: TASK-000-11
**Blocks**: None

**Description**:
Document the Foundation API surface — session context shape, logEvent signature, openModal/closeModal signatures, navigation route IDs, and design token names — in a concise developer reference. This becomes the contract that all screen-level developers depend on.

**Acceptance Criteria**:
- [ ] SessionContext shape documented with field names and types
- [ ] All 7 logEvent types documented with required payload fields
- [ ] openModal/closeModal API documented with all supported modal IDs
- [ ] All design token names listed with their purpose
- [ ] All 5 route IDs documented

---

## Completion Checklist

- [ ] All tasks marked Complete
- [ ] All acceptance criteria verified
- [ ] Spec success criteria met (see [spec.md](./spec.md))
- [ ] Design tokens reviewed against attorney.html reference
- [ ] Session context resolves correctly with reference identity
- [ ] All screen routes navigate correctly
- [ ] Activity log schema validated
- [ ] Modal system tested across all breakpoints
- [ ] Product sign-off received
