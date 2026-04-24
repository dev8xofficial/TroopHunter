# Admin Settings - Activity Log Events

> **Module ID**: `108-admin-settings`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-108-01 | `admin.setting.updated` | Administrative setting changed | super_admin / hr_admin | { setting_key, previous_value, new_value } |
| EVT-108-02 | `admin.user.provisioned` | Administrative user created | super_admin | { user_id, role } |
| EVT-108-03 | `admin.user.role_changed` | Administrative user role changed | super_admin | { user_id, previous_role, role } |

---

## Event Schema

### EVT-108-01: `admin.setting.updated`

```json
{
  "event_id": "EVT-108-01",
  "event_name": "admin.setting.updated",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "super_admin"
  },
  "entity": {
    "type": "adminsetting",
    "id": "uuid"
  },
  "payload": {
    "details": "{ setting_key, previous_value, new_value }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
