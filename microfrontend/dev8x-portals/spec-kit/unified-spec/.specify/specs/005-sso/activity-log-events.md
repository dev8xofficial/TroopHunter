# SSO - Activity Log Events

> **Module ID**: `005-sso`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-005-01 | `auth.sso.started` | SSO handshake initialized | candidate / client | { provider, portal } |
| EVT-005-02 | `auth.sso.completed` | SSO callback verified and session created | candidate / client | { provider, linked_account } |
| EVT-005-03 | `auth.sso.linked` | Existing account linked to provider identity | candidate / client | { provider } |

---

## Event Schema

### EVT-005-01: `auth.sso.started`

```json
{
  "event_id": "EVT-005-01",
  "event_name": "auth.sso.started",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "ssoidentity",
    "id": "uuid"
  },
  "payload": {
    "details": "{ provider, portal }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| auth events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
