# Admin Interviews - Activity Log Events

> **Module ID**: `104-admin-interviews`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-104-01 | `admin.interview.scheduled` | Interview created | hr_admin / super_admin | { interview_id, applicant_id, interviewer_id } |
| EVT-104-02 | `admin.interview.rescheduled` | Interview time changed | hr_admin / super_admin | { interview_id, previous_time, scheduled_for } |
| EVT-104-03 | `admin.interview.status_changed` | Interview status updated | hr_admin / super_admin | { interview_id, status } |

---

## Event Schema

### EVT-104-01: `admin.interview.scheduled`

```json
{
  "event_id": "EVT-104-01",
  "event_name": "admin.interview.scheduled",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "hr_admin"
  },
  "entity": {
    "type": "interview",
    "id": "uuid"
  },
  "payload": {
    "details": "{ interview_id, applicant_id, interviewer_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
