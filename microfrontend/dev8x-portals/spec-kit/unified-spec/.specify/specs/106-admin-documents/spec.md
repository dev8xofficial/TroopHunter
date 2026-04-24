# Admin Documents

> **Module ID**: `106-admin-documents`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Documents module manages applicant document requests, uploads, verification, and document access for the recruiting process.

---

## Actors

| Actor | Role | Interaction |
| --- | --- | --- |
| HR Admin | hr_admin | Runs recruiting, hiring, and operational workflows |
| Super Admin | super_admin | Maintains global oversight and escalations |
| Manager | manager | Has read-only oversight for managed teams |
| System | system | Publishes calculations, alerts, and audit entries |

---

## Functional Requirements

### FR-106-01: Manage required document requests

**Description**: The system shall let admins request documents from applicants.

**Acceptance Criteria**:
- [ ] Requests identify the document type and deadline.
- [ ] Candidate-facing document queues update after a request is created.
- [ ] Outstanding requests remain visible until resolved.

### FR-106-02: Store and review uploaded files

**Description**: The system shall store applicant documents with review status.

**Acceptance Criteria**:
- [ ] Each uploaded document captures type, source, and review status.
- [ ] Admins can mark a document verified or rejected.
- [ ] Version history is preserved when a candidate uploads a replacement file.

### FR-106-03: Provide secure document access

**Description**: The system shall allow only authorized actors to view or download a document.

**Acceptance Criteria**:
- [ ] Access is scoped to the applicant and authorized support roles.
- [ ] Every download emits an audit event.
- [ ] Rejected documents remain visible for historical review.

---

## Data Model

### ApplicantDocument

Document associated with a candidate or applicant workflow.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| applicant_id | uuid | Yes | FK -> Applicant.id | Linked applicant |
| document_type | string | Yes | employment \| identity \| tax \| education \| other | Document category |
| status | string | Yes | requested, uploaded, verified, rejected, archived | Review status |
| version | integer | Yes | min 1 | Current version number |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-106-01: Version preservation

**Condition**: When a new file replaces an earlier document
**Action**: Increment the version and retain earlier versions for audit.
**Rationale**: Supports compliance reviews

### BR-106-02: Candidate queue synchronization

**Condition**: When a document is requested or reviewed
**Action**: Update the candidate-facing documents module within the same workflow.
**Rationale**: Keeps both actors aligned

---

## State Machine

See [state-machines.md](state-machines.md) for the applicant document lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/documents`
- `POST /api/v1/admin/documents/requests`
- `PATCH /api/v1/admin/documents/{id}/review`
- `GET /api/v1/admin/documents/{id}`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.document.requested` (EVT-106-01)
- `admin.document.reviewed` (EVT-106-02)
- `admin.document.downloaded` (EVT-106-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 203-candidate-documents | Downstream | Candidate document queue mirrors requested and reviewed records |
| 204-candidate-onboarding | Related | Verified documents unlock onboarding readiness |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)