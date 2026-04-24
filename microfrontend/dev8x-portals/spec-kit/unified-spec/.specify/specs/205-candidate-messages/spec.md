# Candidate Messages

> **Module ID**: `205-candidate-messages`
> **Domain**: Candidate Portal (2xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Candidate Messages module provides inbox and thread views for candidate communications with HR and support teams.

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

### FR-205-01: Show inbox overview

**Description**: The system shall return a candidate-scoped inbox of message threads.

**Acceptance Criteria**:
- [ ] Inbox rows include sender, subject, preview, timestamp, and read state.
- [ ] Unread threads are distinguishable in data terms.
- [ ] Only candidate-owned threads are returned.

### FR-205-02: Support thread replies

**Description**: The system shall allow the candidate to reply within an existing thread.

**Acceptance Criteria**:
- [ ] Reply body is required.
- [ ] Replies append to the existing thread rather than creating a new one.
- [ ] Reply activity emits an audit event.

### FR-205-03: Track read state

**Description**: The system shall let the candidate mark messages as read.

**Acceptance Criteria**:
- [ ] Read state change records the timestamp.
- [ ] Marking an already-read thread does not duplicate events.
- [ ] Read state updates remain visible in the inbox summary.

---

## Data Model

### CandidateThread

Message thread visible to a candidate.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| candidate_id | uuid | Yes | Candidate profile id | Candidate identifier |
| subject | string | Yes | max 255 | Thread subject |
| status | string | Yes | unread, read, replied, closed | Thread state |
| last_message_at | datetime | Yes | ISO-8601 | Timestamp of latest message |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-205-01: Thread ownership

**Condition**: When loading or mutating a thread
**Action**: Ensure the thread belongs to the current candidate.
**Rationale**: Constitution G-03

### BR-205-02: Append-only messaging

**Condition**: When a reply is sent
**Action**: Append the message to the thread and preserve prior content.
**Rationale**: Supports audit history

---

## State Machine

See [state-machines.md](state-machines.md) for the candidate thread lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/candidate/messages`
- `GET /api/v1/candidate/messages/{id}`
- `POST /api/v1/candidate/messages/{id}/reply`
- `POST /api/v1/candidate/messages/{id}/read`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `candidate.message.received` (EVT-205-01)
- `candidate.message.replied` (EVT-205-02)
- `candidate.message.read` (EVT-205-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 107-admin-email-templates | Related | Template-based outbound messages may appear in candidate inbox history |
| 200-candidate-dashboard | Downstream | Dashboard quick actions may route into inbox threads |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
