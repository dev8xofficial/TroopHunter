# Admin Email Templates - Activity Log Events

> **Module ID**: `107-admin-email-templates`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-107-01 | `admin.template.created` | Email template created | hr_admin / super_admin | { template_id, status } |
| EVT-107-02 | `admin.template.updated` | Email template updated | hr_admin / super_admin | { template_id, status } |
| EVT-107-03 | `admin.template.previewed` | Email template preview or test-send generated | hr_admin / super_admin | { template_id } |

---

## Event Schema

### EVT-107-01: `admin.template.created`

```json
{
  "event_id": "EVT-107-01",
  "event_name": "admin.template.created",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "hr_admin"
  },
  "entity": {
    "type": "emailtemplate",
    "id": "uuid"
  },
  "payload": {
    "details": "{ template_id, status }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
