# Implementation Plan: CRM Contacts

**Feature ID**: 002-contacts
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-13
**Estimated Effort**: L

---

## Summary

Contacts is the central data feature for Phase 1. The implementation work focuses on directory querying, cumulative profile modeling, duplicate awareness, portal-intake linkage, and ownership transfer behavior.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Contact directory | Search, filter, summary rows, pagination | New |
| Contact profile view | Detail sections and progressive enrichment | New |
| Import workflow | Legacy source ingestion and review | New |
| Duplicate matcher | Strong-identifier warnings | New |
| Transfer workflow | Department ownership reassignment | New |

---

## Implementation Phases

### Phase 1 - Core contact model

**Goal**: Define the canonical contact shape and directory query behavior.
**Dependencies**: 000-foundation complete

#### Tasks

- [ ] Define contact schema and profile sections
- [ ] Define directory columns and filters
- [ ] Define missing-data rules

**Exit Criteria**: Contact data shape and list behavior are stable.

---

### Phase 2 - Intake, transfer, and import workflows

**Goal**: Define how contacts enter and move through the CRM.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define minimal-data contact creation
- [ ] Define portal-intake linking and consent visibility
- [ ] Define transfer and import workflows

**Exit Criteria**: Manual, portal, and imported contacts all land in one unified model.

---

### Phase 3 - Duplicate awareness and validation

**Goal**: Reduce fragmentation risk without blocking real work.

#### Tasks

- [ ] Define duplicate warning thresholds
- [ ] Define exception handling for bad imports and consent issues
- [ ] Define success metrics and review flows

**Exit Criteria**: Contact integrity risks are visible and manageable.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Contact | identity, source, consent, departments, ownership | Canonical customer record |
| Duplicate candidate | match_type, confidence, candidate_contact_id | Review signal before creating duplicates |
| Import row result | source_row_id, status, contact_id, exception_reason | Migration control surface |

### Data Migrations

- Follow Up Boss imports need field mapping into the contact schema.
- Legacy ownership fields must be translated into department assignments.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Client portal | Inbound | New contact intake | Must include consent metadata |
| Follow Up Boss | Inbound | Legacy migration | Batch import and dedupe required |
| Outlook | Both | Contact-linked email context | Provider remains external system of record |
| VOIP provider | Both | Phone and SMS contact matching | Phone number must resolve to contact IDs |

---

## Security & Access Control

- Read access spans departments; write access remains scoped.
- Transfer actions must record both origin and destination ownership.
- Consent metadata must be visible but not silently editable by any role.

---

## Testing Strategy

### Unit Tests

- Duplicate detection scoring
- Missing-data flag derivation
- Transfer ownership updates

### Integration Tests

- Create minimal contact and start a communication workflow
- Portal intake creates or matches a contact
- Import batch handles clean, duplicate, and exception rows

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Minimal-data contact creation | Create contact with only required fields and continue workflow |
| Portal visibility | Simulate portal intake and verify source plus consent fields |
| Transfer behavior | Reassign departmental owner and verify history is preserved |
| Import integrity | Process mixed migration set and review outcomes |

---

## Rollout & Observability

- **Feature flag**: Yes - contacts directory and import tools
- **Rollout strategy**: Internal operator pilot, then migration rehearsal
- **Key metrics to monitor**: duplicate rate, import exception rate, contact-create latency, missing-data backlog
- **Rollback plan**: Disable imports independently from manual contact management if migration issues arise

---

## Open Questions

1. Should duplicate review happen inline during creation or as a post-create review queue?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Duplicate creation during migration | High | High | Strong dedupe review and import exceptions |
| Overly strict intake blocks live work | Medium | High | Preserve graceful incompleteness |
| Portal consent payloads vary | Medium | Medium | Normalize at the intake boundary |
