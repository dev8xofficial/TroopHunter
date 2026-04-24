# Authentication - Activity Log Events

> **Module ID**: `001-authentication`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-001-01 | `auth.session.login` | Successful credential validation | candidate / client / hr_admin / super_admin / sales_rep / manager | { portal, ip_address, user_agent } |
| EVT-001-02 | `auth.session.logout` | Session terminated by actor or timeout | candidate / client / hr_admin / super_admin / sales_rep / manager | { all_devices, duration_minutes } |
| EVT-001-03 | `auth.session.login_failed` | Credential validation failed | system | { email, portal, attempt_count } |
| EVT-001-04 | `auth.account.registered` | Candidate account created | candidate | { email, registration_method } |
| EVT-001-05 | `auth.account.locked` | Lockout threshold reached | system | { email, portal, locked_until } |

---

## Event Schema

### EVT-001-01: `auth.session.login`

```json
{
  "event_id": "EVT-001-01",
  "event_name": "auth.session.login",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "user",
    "id": "uuid"
  },
  "payload": {
    "details": "{ portal, ip_address, user_agent }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| auth events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
