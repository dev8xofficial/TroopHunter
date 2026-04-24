# Admin Applicants - Activity Log Events

> **Module ID**: `101-admin-applicants`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-101-01 | `admin.applicant.viewed` | Applicant detail opened | hr_admin / super_admin / manager | { applicant_id } |
| EVT-101-02 | `admin.applicant.status_changed` | Applicant status updated | hr_admin / super_admin | { applicant_id, from_status, to_status } |
| EVT-101-03 | `admin.applicant.exported` | Filtered applicant list exported | hr_admin / super_admin | { filter_signature } |

---

## Event Schema

### EVT-101-01: `admin.applicant.viewed`

```json
{
  "event_id": "EVT-101-01",
  "event_name": "admin.applicant.viewed",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "hr_admin"
  },
  "entity": {
    "type": "applicant",
    "id": "uuid"
  },
  "payload": {
    "details": "{ applicant_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
