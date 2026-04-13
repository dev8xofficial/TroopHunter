# Implementation Plan: CRM Email Blast

**Feature ID**: 009-email-blast
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Email Blast extends CRM email into controlled outbound campaigns built on CRM audience data and provider-linked delivery.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Audience builder | Segment contacts and review exclusions | New |
| Campaign composer | Edit content and preview sends | New |
| Campaign history | Show status and summary results | New |

---

## Implementation Phases

### Phase 1 - Campaign and audience model

**Goal**: Define campaign states and audience-selection behavior.
**Dependencies**: Contacts and Email complete

#### Tasks

- [ ] Define campaign schema and statuses
- [ ] Define audience filters and exclusions
- [ ] Define draft and review behavior

**Exit Criteria**: Campaign and audience shapes are stable.

---

### Phase 2 - Delivery and CRM linkage

**Goal**: Define sending, degraded states, and recipient history linkage.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define provider-linked send behavior
- [ ] Define summary metrics
- [ ] Define contact-history linkage

**Exit Criteria**: Campaign outcomes are visible in the CRM.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Campaign | department, status, audience_count, content_version | Outbound campaign record |
| Campaign audience member | contact_id, status, exclusion_reason | Recipient-level tracking |
| Campaign metrics | sent, delivered, opened, clicked | Summary reporting |

### Data Migrations

No migration is required; campaigns are Phase 2-native records.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Email provider | Both | Delivery and summary results | Provider-linked |
| Contacts | Both | Audience selection and CRM linkage | Source of recipient truth |
| Activity service | Outbound | Record campaign involvement in CRM history | Summary linkage only |

---

## Security & Access Control

- Campaign creation and send rights may be role-limited.
- Recipient restrictions must be enforced before send.

---

## Testing Strategy

### Unit Tests

- Audience filtering and exclusion logic
- Campaign status transitions
- Metrics summary handling

### Integration Tests

- Build audience and preview recipients
- Send a campaign and record summary results
- Confirm contact-history linkage

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Targeted campaigns from CRM data | Build and review a sample campaign |
| Exclusion visibility | Validate blocked recipients before send |
| Campaign context visibility | Verify results in campaign and contact history |

---

## Rollout & Observability

- **Feature flag**: Yes - campaign sending
- **Rollout strategy**: Limited internal sender group first
- **Key metrics to monitor**: send success, excluded-recipient rate, metrics availability, failure rate
- **Rollback plan**: Disable send while preserving drafts and campaign history

---

## Open Questions

1. Should scheduling be included in the first release of Email Blast?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Poor targeting causes irrelevant sends | Medium | High | Strong preview and exclusion review |
| Users confuse campaigns with one-to-one email | Medium | Medium | Keep workflows clearly separated |
