# Implementation Plan: CRM Integrations

**Feature ID**: 014-integrations
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Integrations implementation defines a shared connector control plane that makes provider health, ownership, dependency mapping, and supported remediation actions visible to administrators and business owners.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Connector inventory table | List providers, status, priority, and freshness | New |
| Connector detail drawer | Show scope, owner, impacted features, and supported actions | New |
| Status timeline | Show recent failures, retries, and recoveries | New |
| Impact map | Show dependent screens and workflows | New |

---

## Implementation Phases

### Phase 1 - Connector registry and health model

**Goal**: Define the integration inventory and common status model.
**Dependencies**: Foundation and provider-dependent features complete

#### Tasks

- [ ] Define connector inventory fields and lifecycle states
- [ ] Define health, freshness, and priority display rules
- [ ] Define planned versus live connector visibility

**Exit Criteria**: Connector status vocabulary is consistent across providers.

---

### Phase 2 - Remediation workflows and dependency mapping

**Goal**: Define how users understand and respond to provider issues.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define test, retry, and reconnect actions
- [ ] Define impact mapping to CRM features
- [ ] Define role-specific detail visibility

**Exit Criteria**: Administrators can diagnose issues and users can understand impact.

---

### Phase 3 - Alerts, auditing, and governance

**Goal**: Make integration behavior traceable and operationally trustworthy.
**Dependencies**: Phase 2 complete

#### Tasks

- [ ] Define failure and recovery event visibility
- [ ] Define audit expectations for configuration changes
- [ ] Define observability requirements for support workflows

**Exit Criteria**: Connector changes and incidents are visible and reviewable.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Connector | provider, status, priority, owner, last_synced_at | Shared integration registry |
| Connector action | connector_id, action_type, actor_id, created_at, outcome | Audit of supported remediation |
| Connector impact map | connector_id, feature_ids, department_scope | Workflow dependency visibility |

### Data Migrations

Existing provider configuration must be normalized into a single connector inventory with consistent status and freshness fields.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Outlook | Both | Email and calendar dependency tracking | Phase 1 and 2 |
| VOIP provider | Both | Call and SMS dependency tracking | Operational criticality |
| Arive | Both | Mortgage sync status and dependency tracking | Phase 2 |
| HAR | Inbound | Real estate reference health | Phase 2 |
| Vertafore / Agency Zoom | Both | Insurance transition-state visibility | Phase 2 |
| Teams / Google Meet | Outbound | Meeting launch readiness | Future-facing but visible |

---

## Security & Access Control

- Connector health may be broadly visible, but privileged configuration actions are restricted to admins.
- Secret material and raw credential values must never appear in the feature.
- Audit entries are required for reconnect or configuration-affecting actions.

---

## Testing Strategy

### Unit Tests

- Connector status rendering
- Freshness threshold behavior
- Impact-map generation

### Integration Tests

- Show mixed healthy and degraded connectors
- Retry supported connector action
- Restrict privileged details for non-admin roles

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Diagnose issues from one screen | Simulate connector degradation and review context |
| Explain workflow impact | Verify affected-feature mapping |
| Audit connector change | Confirm reconnect or retry events are recorded |

---

## Rollout & Observability

- **Feature flag**: Yes - integrations control plane
- **Rollout strategy**: Admin-first, then read-only visibility for owners
- **Key metrics to monitor**: degraded connector count, mean time to detection, mean time to recovery, stale connector ratio
- **Rollback plan**: Disable action controls and fall back to status-only visibility if remediation flows are unstable

---

## Open Questions

1. Should planned future connectors like DocuSign appear in Integrations before implementation work begins?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Status semantics vary too much by provider | Medium | High | Define one canonical health model with provider-specific notes |
| Users misread planned connectors as active | Medium | Medium | Distinguish planned, pending, and live states visually |
| Reconnect workflows create unsafe assumptions | Low | High | Limit actions to supported providers and log every attempt |
