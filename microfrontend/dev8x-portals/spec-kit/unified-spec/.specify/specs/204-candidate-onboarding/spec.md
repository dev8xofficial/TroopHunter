# Candidate Onboarding

> **Module ID**: `204-candidate-onboarding`
> **Domain**: Candidate Portal (2xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Candidate Onboarding module manages new-hire setup tasks, account provisioning visibility, and the gating rules that prevent completion before required prerequisites are satisfied.

---

## Actors

| Actor | Role | Interaction |
| --- | --- | --- |
| Candidate | candidate | Acts on their own application, interviews, and onboarding |
| HR Admin | hr_admin | Supports candidate progress and exception handling |
| Super Admin | super_admin | Reviews escalations and compliance issues |
| Manager | manager | Has limited read-only oversight for managed placements |
| System | system | Calculates progress, deadlines, and audit events |

---

## Functional Requirements

### FR-204-01: Show onboarding checklist

**Description**: The system shall return onboarding tasks grouped by setup category.

**Acceptance Criteria**:
- [ ] Checklist includes account provisioning, software setup, and policy acknowledgements.
- [ ] Each item shows whether it is pending, in progress, blocked, or complete.
- [ ] Checklist completion percentage updates after each completed item.

### FR-204-02: Support candidate completion updates

**Description**: The system shall let the candidate mark eligible tasks complete.

**Acceptance Criteria**:
- [ ] Only candidate-owned tasks may be completed directly by the candidate.
- [ ] Blocked tasks cannot be marked complete.
- [ ] Task completion is auditable.

### FR-204-03: Enforce onboarding gates

**Description**: The system shall prevent onboarding completion until required documents and policies are complete.

**Acceptance Criteria**:
- [ ] Unsigned required documents block onboarding completion.
- [ ] Provisioning-only tasks controlled by the system cannot be manually completed by the candidate.
- [ ] Overall onboarding completion reflects both candidate and system-owned steps.

---

## Data Model

### OnboardingItem

Single onboarding task or provisioning item.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| candidate_id | uuid | Yes | Candidate profile id | Candidate identifier |
| category | string | Yes | accounts \| software \| policy \| first_day | Checklist category |
| status | string | Yes | not_started, in_progress, blocked, completed | Onboarding item status |
| owner_type | string | Yes | candidate \| system | Owning actor type |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-204-01: Document gate

**Condition**: When computing onboarding completion
**Action**: Block overall completion until required signed documents exist.
**Rationale**: Constitution G-07

### BR-204-02: Owner-respecting completion

**Condition**: When an item is system-owned
**Action**: Do not allow the candidate to mark it complete directly.
**Rationale**: Preserves workflow integrity

---

## State Machine

See [state-machines.md](state-machines.md) for the onboarding item lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/candidate/onboarding/checklist`
- `POST /api/v1/candidate/onboarding/items/{id}/complete`
- `GET /api/v1/candidate/onboarding/accounts`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `candidate.onboarding.item_completed` (EVT-204-01)
- `candidate.onboarding.account_provisioned` (EVT-204-02)
- `candidate.onboarding.completed` (EVT-204-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 203-candidate-documents | Upstream | Signed required documents unlock onboarding completion |
| 200-candidate-dashboard | Downstream | Dashboard progress reflects onboarding state |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
