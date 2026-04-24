# [Module Name] — Activity Log Events

> **Module ID**: `NNN-module-name`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
|----------|-----------|---------|-------|---------|
| EVT-NNN-01 | `domain.entity.action` | [What triggers this event] | [Which role] | `{ field1, field2 }` |
| EVT-NNN-02 | `domain.entity.action` | [What triggers this event] | [Which role] | `{ field1, field2 }` |

---

## Event Schema

### EVT-NNN-01: `domain.entity.action`

```json
{
  "event_id": "EVT-NNN-01",
  "event_name": "domain.entity.action",
  "timestamp": "ISO-8601",
  "actor": {
    "user_id": "uuid",
    "role": "role_id"
  },
  "entity": {
    "type": "entity_type",
    "id": "uuid"
  },
  "payload": {
    "field1": "value",
    "field2": "value"
  },
  "metadata": {
    "ip_address": "string",
    "user_agent": "string"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
|---------------|-----------|---------|
| Security events | Indefinite | Cold storage after 1 year |
| Business events | 3 years | Cold storage after 1 year |
| System events | 1 year | Purged |
