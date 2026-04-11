# Implementation Plan: Client Profile Management

**Feature ID**: 004-clients
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-12
**Estimated Effort**: S

---

## Summary

The Clients screen provides a searchable client table, Add Client modal, Client Detail modal, overview statistics, role permissions display, and a quick messaging form. Implementation is the lightest of the five screens.

---

## Architecture Overview

See [ARCHITECTURE.md](../../../../ARCHITECTURE.md) for the full portal architecture. This screen sits in the Screen Layer and consumes Foundation services (session context, design tokens, activity log, modal system).

### Components

| Component | Responsibility | New / Modified / Existing |
|-----------|---------------|--------------------------|
| Screen Container | Mounts the screen inside the Foundation layout shell | New |
| Tab / Filter Bar | Tabbed view selector and search/filter controls | New |
| Primary Content Region | Main data display (table, panels, or cards) | New |
| Action Modals | Confirmation dialogs for state-changing actions | New (shared via Foundation modal system) |
| Sidebar Widgets | Supporting information panels | New |

---

## Implementation Phases

### Phase 1 — Static Layout and Reference Data

**Goal**: Render the screen with all regions populated using reference data from the constitution.
**Dependencies**: 000-foundation complete (tokens, session context, nav, modal system).

#### Tasks

- [ ] Build screen container inside the Foundation layout shell
- [ ] Render primary content with reference data from constitution
- [ ] Render all tab/filter views
- [ ] Render sidebar widgets
- [ ] Apply all design tokens (no hardcoded values)

**Exit Criteria**: Screen renders all regions with reference data; passes design token review.

---

### Phase 2 — Interactions and Live Data

**Goal**: Wire all interactive elements to their correct targets (modals, navigation, API calls).
**Dependencies**: Phase 1 complete.

#### Tasks

- [ ] Wire all primary action buttons to correct modals or navigation targets
- [ ] Wire search/filter controls to filter the data set
- [ ] Wire API data loading to replace reference data with live data
- [ ] Write activity log events on all state-changing actions
- [ ] Handle loading and error states

**Exit Criteria**: All buttons, tabs, search inputs, and API calls function correctly end-to-end.

---

### Phase 3 — Edge Cases and Responsive Polish

**Goal**: Implement empty states, error states, and responsive layout.
**Dependencies**: Phase 2 complete.

#### Tasks

- [ ] Implement empty states for all data regions
- [ ] Implement error states with retry for API failures
- [ ] Validate layout at all three breakpoints (>=1200px, 768-1199px, <768px)
- [ ] Run acceptance tests from test-scenarios.md

**Exit Criteria**: All edge cases handled; responsive validation passes; acceptance tests pass.

---

## Data Design

All data shapes for this screen are defined in validation-schema.json and in the global schemas at .specify/schemas/.

---

## Integration Points

| System | Direction | Purpose | Notes |
|--------|-----------|---------|-------|
| Transaction API | Inbound | Load data scoped to attorney | Filtered by assigned transaction IDs |
| Activity Log | Outbound | Write events on all state changes | Use Foundation logEvent() |
| Foundation Modal System | Bidirectional | Open/close action modals | Use Foundation openModal() / closeModal() |

---

## Security & Access Control

- All data filtered to attorney's assigned transactions — enforced server-side.
- State-changing actions require AT role — enforced server-side.
- No client-side-only access control.

---

## Testing Strategy

Reference test-scenarios.md for detailed test cases for this screen.

| Success Criterion | Test Approach |
|-------------------|--------------| 
| Reference data displays correctly | Assert against constitution reference values |
| All action buttons trigger correct targets | Click each; assert modal or navigation outcome |
| Empty states render when no data | Seed empty dataset; assert empty state message |

---

## Rollout & Observability

- **Feature flag**: No
- **Rollout strategy**: Staged — internal alpha, then beta attorneys, then full release
- **Key metrics**: Screen load time p95, action completion rate, error rate
- **Rollback plan**: Revert to previous build; screen owns no permanent data

---

## Open Questions

1. Are there pagination requirements for large data sets (>50 rows)?
2. What is the required API response time SLA for this screen?
