# Implementation Plan: Attorney Portal Foundation

**Feature ID**: 000-foundation
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-12
**Estimated Effort**: L

---

## Summary

The Foundation layer establishes the shared infrastructure that all five portal screens depend on. Implementation focuses on building the design token system, authenticated session context, top navigation bar, activity log contract, notification service interface, and modal/overlay system — all before any screen-specific development begins. This layer is the prerequisite for every subsequent feature delivery.

---

## Architecture Overview

The Foundation layer is a set of global, stateless-unless-seeded services consumed by every screen. It does not render business content; it provides the structural, stylistic, and contractual scaffolding that screens plug into.

### Components

| Component | Responsibility | New / Modified / Existing |
|-----------|---------------|--------------------------|
| Session Context Provider | Supplies attorney identity (name, initials, role, assigned transaction IDs, unread count) to all screens | New |
| Design Token Registry | Canonical colour, typography, spacing, shadow, and component tokens | New |
| Top Navigation Bar | Sticky 72px nav with logo, 5 screen buttons, user chip, notification bell | New |
| Activity Log Service | Append-only event writer and real-time feed subscriber | New |
| Notification Service | Manages unread notification count and badge display | New |
| Modal / Overlay System | Full-screen overlay with focus trap, backdrop, and keyboard dismiss | New |
| Global Layout Shell | Viewport-level wrapper: nav + content area + modal layer | New |

---

## Implementation Phases

### Phase 1 — Design System Bootstrap

**Goal**: Establish all design tokens and the global layout shell so that every subsequent phase has correct visual building blocks.
**Dependencies**: None — this is the first deliverable.

#### Tasks

- [ ] Define and register all 16 colour tokens (primary-navy, primary-gold, accent-blue, semantic, neutral scale)
- [ ] Define typography tokens: font families (Archivo, Manrope), size scale, weight scale
- [ ] Define spacing tokens: container max-width (1400px), padding (32px), card radius (12px)
- [ ] Define shadow tokens: sm, md, lg, xl
- [ ] Define badge variants: success, warning, error, info, neutral
- [ ] Define button variants: primary, secondary, gold, success, danger
- [ ] Build global layout shell: nav slot + content slot + modal slot
- [ ] Validate token application with a blank reference screen

**Exit Criteria**: All design tokens are applied to a reference layout and produce correct visual output matching attorney.html reference implementation.

---

### Phase 2 — Session Context & Authentication Boundary

**Goal**: Inject attorney identity into the portal so that every screen can consume it without making individual auth calls.
**Dependencies**: Phase 1 complete (layout shell must exist to host the session boundary).

#### Tasks

- [ ] Define `SessionContext` data contract: name, initials, role, firmName, assignedTransactionIds[], unreadCount
- [ ] Implement session resolver: reads identity from the auth provider token on portal load
- [ ] Seed reference identity: Sarah Mitchell, initials SM, role AT, firm The Burkes Group
- [ ] Expose session context to all screens via the global provider pattern
- [ ] Verify session persists across screen switches without re-authentication

**Exit Criteria**: Any screen can read `session.attorney.name` and receive "Sarah Mitchell" in the reference implementation.

---

### Phase 3 — Top Navigation Bar

**Goal**: Deliver the sticky navigation bar with correct active state, routing contract, and user chip.
**Dependencies**: Phase 1 (tokens), Phase 2 (session context for user chip).

#### Tasks

- [ ] Build nav bar at 72px height, sticky positioning
- [ ] Render logo: 44×44px block, primary-navy background, primary-gold "B" glyph + wordmark
- [ ] Render 5 navigation buttons in order: Dashboard, Transactions, Documents, Clients, Verification
- [ ] Implement active state: white text on primary-navy background for current screen
- [ ] Render user chip: attorney initials avatar + name from session context
- [ ] Render notification bell: red dot badge when unreadCount > 0
- [ ] Wire screen routing: clicking a nav button shows the target screen, hides all others
- [ ] Add scroll-to-top and fade-in animation on screen switch

**Exit Criteria**: All 5 screens switch correctly; active state is always accurate; user chip shows "SM / Sarah Mitchell".

---

### Phase 4 — Activity Log Contract

**Goal**: Establish the append-only event writer and feed subscriber so all screens can write and read activity events.
**Dependencies**: Phase 2 (session context provides attorney ID for event authorship).

#### Tasks

- [ ] Define `ActivityLogEvent` schema: eventId, eventType, actorId, actorRole, transactionId?, documentId?, clientId?, description, timestamp
- [ ] Implement event writer: `logEvent(type, payload)` function available to all screens
- [ ] Define canonical event types: document_reviewed, document_approved, document_rejected, transaction_verified, discrepancy_flagged, client_created, report_generated
- [ ] Implement feed reader: returns last N events for the current attorney
- [ ] Validate event schema against `.specify/schemas/activity-log-event.json`

**Exit Criteria**: Calling `logEvent('document_approved', { documentId, transactionId })` produces a valid event readable from the feed.

---

### Phase 5 — Notification Service & Modal System

**Goal**: Deliver the notification badge update mechanism and the modal/overlay system used by Verify Confirm, Flag Discrepancy, Add Client, and Report modals.
**Dependencies**: Phase 3 (notification bell renders in nav), Phase 1 (tokens for modal styling).

#### Tasks

- [ ] Implement notification count subscriber: polls or subscribes to unread count, updates nav bell badge
- [ ] Build modal/overlay system: full-viewport backdrop, centred modal card, focus trap, Escape key dismiss
- [ ] Define modal API: `openModal(id, props)` / `closeModal()` available globally
- [ ] Implement backdrop click to close (where spec allows)
- [ ] Validate modal renders correctly at all 3 breakpoints (≥1200px, 768–1199px, <768px)

**Exit Criteria**: `openModal('verify-confirm', { transactionId })` renders the correct modal over any screen with correct backdrop and dismiss behaviour.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
|--------|-----------|---------| 
| SessionContext | name, initials, role, firmName, assignedTransactionIds[], unreadCount | Single source of attorney identity for the session |
| ActivityLogEvent | eventId, eventType, actorId, actorRole, transactionId, description, timestamp | Immutable audit record of every meaningful state change |
| NavigationState | activeScreen, previousScreen | Tracks current and previous screen for animation and back-navigation |

---

## Integration Points

| System | Direction | Purpose | Notes |
|--------|-----------|---------|-------|
| Auth Provider | Inbound | Attorney identity token resolved on portal load | Out of scope to implement auth; only consume token |
| Activity Log Backend | Outbound | Write activity events from all screens | Must handle offline buffering gracefully |
| Notification Service | Inbound | Receive unread notification count | Poll interval: 60 seconds minimum |

---

## Security & Access Control

- Session context must only be populated from a valid, verified auth token — never from URL parameters or local client input.
- Activity log events are append-only; no update or delete operations are permitted.
- Navigation does not bypass role checks; all five screens are only accessible to the AT role.
- Modal system must enforce focus trap to prevent screen reader bypass of critical confirmation dialogs.

---

## Testing Strategy

### Unit Tests

- Session context resolver returns correct fields for a given auth token
- `logEvent()` produces schema-valid events for all 7 canonical event types
- Navigation active state is correct for each of the 5 screens
- Modal opens, traps focus, and closes on Escape key

### Integration Tests

- Full portal loads in < 2 seconds with session context populated
- Screen switch updates nav active state and scrolls viewport to top
- Activity event written from Documents screen appears in Dashboard feed

### Acceptance Tests

| Success Criterion | Test Approach |
|-------------------|--------------| 
| Attorney sees personalised dashboard within 2 seconds of authentication | Load time measurement with session token present |
| Screen transition is instantaneous; active state always correct | Click through all 5 screens, assert active class |
| Notification bell shows red dot when unreadCount > 0 | Seed unreadCount = 1; verify badge visible |

---

## Rollout & Observability

- **Feature flag**: No — Foundation is a prerequisite; it ships with the first deployment
- **Rollout strategy**: Internal only until all 5 screen specs are at Phase 1 of their plans
- **Key metrics to monitor**: Portal load time (p95 < 2s), session resolution failure rate, activity log write error rate
- **Rollback plan**: Revert to previous build; no data migration risk since Foundation writes no business data

---

## Open Questions

1. What is the polling interval for the notification count in the production auth provider?
2. Should the activity log buffer events locally when the backend is unreachable, or drop them?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Auth provider token format changes before integration | Low | High | Abstract token parsing behind a single resolver function |
| Design token naming conflicts with future screen-level overrides | Medium | Medium | Enforce token-only styling in code review; no hardcoded colour values |
