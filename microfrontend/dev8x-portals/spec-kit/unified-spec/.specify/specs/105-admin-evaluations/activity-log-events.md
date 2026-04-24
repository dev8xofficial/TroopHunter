# Admin Evaluations - Activity Log Events

> **Module ID**: `105-admin-evaluations`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-105-01 | `admin.evaluation.saved` | Evaluation draft saved | hr_admin / super_admin | { evaluation_id, applicant_id } |
| EVT-105-02 | `admin.evaluation.submitted` | Evaluation submitted for review | hr_admin / super_admin | { evaluation_id, applicant_id } |
| EVT-105-03 | `admin.evaluation.finalized` | Evaluation finalized with recommendation | hr_admin / super_admin | { evaluation_id, recommendation } |

---

## Event Schema

### EVT-105-01: `admin.evaluation.saved`

```json
{
  "event_id": "EVT-105-01",
  "event_name": "admin.evaluation.saved",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "hr_admin"
  },
  "entity": {
    "type": "evaluation",
    "id": "uuid"
  },
  "payload": {
    "details": "{ evaluation_id, applicant_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
