# Foundation - Activity Log Events

> **Module ID**: `000-foundation`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-000-01 | `foundation.registry.read` | Shared registry requested | super_admin / hr_admin / sales_rep / manager | { domain_code, include_superseded } |
| EVT-000-02 | `foundation.registry.published` | Registry version promoted | super_admin | { module_count, published_version } |
| EVT-000-03 | `foundation.contracts.published` | Shared contract bundle updated | system | { contract_count, version } |

---

## Event Schema

### EVT-000-01: `foundation.registry.read`

```json
{
  "event_id": "EVT-000-01",
  "event_name": "foundation.registry.read",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "super_admin"
  },
  "entity": {
    "type": "domainregistry",
    "id": "uuid"
  },
  "payload": {
    "details": "{ domain_code, include_superseded }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| foundation events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
