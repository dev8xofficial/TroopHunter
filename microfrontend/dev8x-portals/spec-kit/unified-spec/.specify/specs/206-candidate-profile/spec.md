# Candidate Profile

> **Module ID**: `206-candidate-profile`
> **Domain**: Candidate Portal (2xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Candidate Profile module stores the candidate personal record, editable contact details, and emergency contact information used across recruiting and onboarding.

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

### FR-206-01: Show profile details

**Description**: The system shall return the candidate personal and employment profile.

**Acceptance Criteria**:
- [ ] Profile includes contact information, address, and emergency contacts.
- [ ] Missing optional sections return empty values instead of errors.
- [ ] Only the owning candidate or approved support roles may view the profile.

### FR-206-02: Allow profile updates

**Description**: The system shall let the candidate update editable profile fields.

**Acceptance Criteria**:
- [ ] Editable fields are validated before save.
- [ ] Protected fields remain read-only.
- [ ] Each successful update emits an audit event.

### FR-206-03: Track verification state

**Description**: The system shall track whether the current profile data is complete and verified.

**Acceptance Criteria**:
- [ ] Profile may be incomplete, submitted, verified, or needs_revision.
- [ ] Verification state is visible to support roles.
- [ ] Verification changes do not expose other candidate records.

---

## Data Model

### CandidateProfile

Candidate personal profile record.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| name | string | Yes | min 1, max 255 | Display name |
| email | string | Yes | RFC 5322, max 254 | Email address |
| phone | string | Yes | max 30 | Phone number |
| address | string | No | max 500 | Address |
| verification_state | string | Yes | incomplete, submitted, verified, needs_revision | Profile verification state |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

### EmergencyContact

Candidate emergency contact record.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| candidate_id | uuid | Yes | Candidate profile id | Candidate identifier |
| contact_name | string | Yes | max 255 | Emergency contact name |
| relationship | string | Yes | max 100 | Relationship to candidate |
| phone | string | Yes | max 30 | Emergency contact phone |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-206-01: Protected identity fields

**Condition**: When the candidate edits the profile
**Action**: Keep protected identity fields read-only unless an approved support workflow is used.
**Rationale**: Preserves identity integrity

### BR-206-02: Scoped support access

**Condition**: When a support role opens the profile
**Action**: Allow read or assisted updates only for the current candidate record.
**Rationale**: Prevents cross-candidate leakage

---

## State Machine

See [state-machines.md](state-machines.md) for the candidate profile verification lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/candidate/profile`
- `PATCH /api/v1/candidate/profile`
- `POST /api/v1/candidate/profile/emergency-contacts`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `candidate.profile.updated` (EVT-206-01)
- `candidate.profile.emergency_contact_updated` (EVT-206-02)
- `candidate.profile.verification_changed` (EVT-206-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 204-candidate-onboarding | Related | Onboarding uses contact and emergency-contact data |
| 106-admin-documents | Related | Profile identity details may support document verification workflows |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
