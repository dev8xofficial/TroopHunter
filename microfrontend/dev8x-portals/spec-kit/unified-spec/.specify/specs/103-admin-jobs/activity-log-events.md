# Admin Jobs - Activity Log Events

> **Module ID**: `103-admin-jobs`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-103-01 | `admin.job.created` | Job record created | hr_admin / super_admin | { job_id, department } |
| EVT-103-02 | `admin.job.status_changed` | Job status updated | hr_admin / super_admin | { job_id, from_status, to_status } |
| EVT-103-03 | `admin.job.closed` | Job closed permanently | hr_admin / super_admin | { job_id } |

---

## Event Schema

### EVT-103-01: `admin.job.created`

```json
{
  "event_id": "EVT-103-01",
  "event_name": "admin.job.created",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "hr_admin"
  },
  "entity": {
    "type": "jobposting",
    "id": "uuid"
  },
  "payload": {
    "details": "{ job_id, department }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
