# Implementation Plan: CRM Foundation

**Feature ID**: 000-foundation
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-13
**Estimated Effort**: L

---

## Summary

Foundation establishes the shared shell and cross-feature contracts that make the rest of the CRM implementable. The work focuses on navigation, shared interaction surfaces, role-aware session context, activity and notification contracts, portal-bridge visibility, and Phase 2 PWA installability expectations.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| App shell | Shared navigation, top bar, VOIP status bar | New |
| Session context | Role, department, unread state, active contact context | New |
| Notification service | Intake, transfer, inbound communication alerts | New |
| Activity contract | Append-only event payload for all features | New |
| Access matrix | Role and department write/read rules | New |
| PWA shell adapter | Install prompt, installed-session messaging, offline notice | New |

---

## Implementation Phases

### Phase 1 - Shell and Session

**Goal**: Define the visual shell and session state every feature consumes.
**Dependencies**: Constitution approved

#### Tasks

- [ ] Define layout, navigation groups, and quick-action model
- [ ] Define session context and active-contact carry-forward behavior
- [ ] Define global empty, loading, and error shell states

**Exit Criteria**: Layout and session contracts are stable enough for screen specs to inherit.

---

### Phase 2 - Shared Contracts

**Goal**: Define activity, notification, and access-control contracts.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Publish immutable activity payload requirements
- [ ] Publish notification event model
- [ ] Publish role and department permission matrix

**Exit Criteria**: Dashboard, Contacts, Pipeline, Calls, SMS, and Email can reference the same contracts.

---

### Phase 3 - Portal Bridge Hooks

**Goal**: Make portal-originated work visible inside the shell.

#### Tasks

- [ ] Define portal intake notification behavior
- [ ] Define origin labels and merge-safe intake handling
- [ ] Define bridge observability requirements

**Exit Criteria**: Portal events have explicit UX and event behavior in the CRM shell.

---

### Phase 4 - PWA installability and installed-session behavior

**Goal**: Define how the CRM behaves as an installable mobile-first shell in supported browsers.

#### Tasks

- [ ] Define install prompt eligibility and surfacing rules
- [ ] Define installed-session and offline-notice behavior
- [ ] Define mobile shell observability requirements

**Exit Criteria**: Phase 2 mobile and tablet usage expectations are explicit in the foundation contract.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Session context | user_id, role, department_access, organization | Shared operator state |
| Notification event | type, entity_id, actor_id, created_at, read_state | Global shell alerts |
| Activity event | type, entity_id, department, actor_id, created_at | Immutable audit trail |

### Data Migrations

No migrations are required for the specification phase. Implementation must plan for notification bootstrap and portal-intake source tagging.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Shared auth service | Inbound | Resolve session context | Provider-specific design is out of scope here |
| Portal layer | Inbound | Intake and event visibility | Requires source tagging |
| VOIP provider | Both | Global communication status | Vendor remains TBD |
| Outlook | Inbound | Notification and message context | Email system of record stays external |
| Browser install APIs | Inbound | PWA install prompt and installed-session state | Supported browsers only |

---

## Security & Access Control

- Session context must explicitly separate read visibility from write authority.
- Platform ownership metadata must always resolve to Burkes Group Marketing LLC.
- Shell contracts must not expose restricted actions to roles that cannot perform them.

---

## Testing Strategy

### Unit Tests

- Session-context derivation
- Role-based quick-action visibility
- Notification payload rendering

### Integration Tests

- Launching quick actions from multiple screens
- Portal-intake notification rendering
- Read-only mode enforcement for restricted roles

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Shared shell and contracts | Verify every Phase 1 screen references the same shell contracts |
| Global quick actions | Trigger actions from multiple routes and confirm behavior is consistent |
| Role restrictions | Validate blocked actions for restricted users |
| Portal-originated visibility | Simulate intake event and verify notification plus activity entry |
| Installable shell behavior | Validate eligible-device install prompt and installed-session notice |

---

## Rollout & Observability

- **Feature flag**: Yes - internal CRM shell bootstrap
- **Rollout strategy**: Internal-only first
- **Key metrics to monitor**: shell load time, quick-action launch latency, notification delivery time, permission error rate, install prompt eligibility success
- **Rollback plan**: Disable shell bootstrap and fall back to route-level feature access while fixing contracts

---

## Open Questions

1. Which browsers and devices should be considered first-class targets for the Phase 2 installed experience?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Overloading the shell with too many actions | Medium | Medium | Keep actions focused on Phase 1 priorities |
| Role visibility mismatch across screens | Medium | High | Centralize access rules in one contract |
| Portal intake creates duplicated notifications | Medium | Medium | Define deduplication keys and merge-safe logic |
| Install prompt behaves inconsistently across browsers | Medium | Medium | Define supported-browser expectations and degraded messaging |
