# Candidate Documents

> **Module ID**: `203-candidate-documents`
> **Domain**: Candidate Portal (2xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Candidate Documents module organizes required and supplemental documents, supports e-signature completion, and keeps the candidate aware of outstanding document obligations.

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

### FR-203-01: List assigned documents

**Description**: The system shall return documents grouped by category and obligation state.

**Acceptance Criteria**:
- [ ] Each document includes category, current status, and available actions.
- [ ] Required documents are clearly identifiable in data terms.
- [ ] Only documents assigned to the current candidate are returned.

### FR-203-02: Support electronic signatures

**Description**: The system shall allow the candidate to sign eligible documents.

**Acceptance Criteria**:
- [ ] Only signable documents expose a sign action.
- [ ] Signature completion changes the document status to signed.
- [ ] Signed documents cannot be unsigned.

### FR-203-03: Accept supplemental uploads

**Description**: The system shall accept candidate uploads for requested or supplemental files.

**Acceptance Criteria**:
- [ ] Uploaded files are attached to the candidate record and current request when applicable.
- [ ] Uploading a replacement increments the document version.
- [ ] Upload completion emits an audit event.

---

## Data Model

### CandidateDocument

Candidate-facing document record.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| candidate_id | uuid | Yes | Candidate profile id | Candidate identifier |
| category | string | Yes | employment \| identity \| tax \| education \| other | Document category |
| status | string | Yes | pending, viewed, signed, uploaded, accepted | Candidate-facing status |
| version | integer | Yes | min 1 | Document version |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-203-01: Signature irreversibility

**Condition**: When a document reaches signed
**Action**: Do not allow the candidate to remove the signature through the same workflow.
**Rationale**: Constitution 5.6 invariant

### BR-203-02: Request linkage

**Condition**: When the upload satisfies an open request
**Action**: Link the new file to the request before marking it uploaded.
**Rationale**: Avoids orphaned documents

---

## State Machine

See [state-machines.md](state-machines.md) for the candidate document lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/candidate/documents`
- `POST /api/v1/candidate/documents/{id}/sign`
- `POST /api/v1/candidate/documents/uploads`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `candidate.document.viewed` (EVT-203-01)
- `candidate.document.signed` (EVT-203-02)
- `candidate.document.uploaded` (EVT-203-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 106-admin-documents | Upstream | Admin requests and reviews drive candidate document obligations |
| 204-candidate-onboarding | Downstream | Signed required documents unlock onboarding progress |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
