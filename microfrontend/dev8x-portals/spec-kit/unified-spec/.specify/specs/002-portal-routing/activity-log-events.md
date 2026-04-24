# Portal Routing - Activity Log Events

> **Module ID**: `002-portal-routing`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-002-01 | `auth.portal.selected` | Portal chosen from selector | candidate / client / hr_admin / super_admin / sales_rep / manager | { portal_key } |
| EVT-002-02 | `auth.route.resolved` | Portal route resolved | system | { portal_key, role, decision, resolved_route } |
| EVT-002-03 | `auth.route.blocked` | Unauthorized portal route attempted | system | { portal_key, role, requested_route } |

---

## Event Schema

### EVT-002-01: `auth.portal.selected`

```json
{
  "event_id": "EVT-002-01",
  "event_name": "auth.portal.selected",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "portalconfig",
    "id": "uuid"
  },
  "payload": {
    "details": "{ portal_key }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| auth events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
