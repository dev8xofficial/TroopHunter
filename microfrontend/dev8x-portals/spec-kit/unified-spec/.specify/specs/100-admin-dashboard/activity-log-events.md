# Admin Dashboard - Activity Log Events

> **Module ID**: `100-admin-dashboard`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-100-01 | `admin.dashboard.viewed` | Dashboard summary requested | hr_admin / super_admin / manager | { department, date_from, date_to } |
| EVT-100-02 | `admin.dashboard.drilldown_opened` | User opens a funnel or queue drilldown | hr_admin / super_admin / manager | { target_stage } |

---

## Event Schema

### EVT-100-01: `admin.dashboard.viewed`

```json
{
  "event_id": "EVT-100-01",
  "event_name": "admin.dashboard.viewed",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "hr_admin"
  },
  "entity": {
    "type": "admindashboardsnapshot",
    "id": "uuid"
  },
  "payload": {
    "details": "{ department, date_from, date_to }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
