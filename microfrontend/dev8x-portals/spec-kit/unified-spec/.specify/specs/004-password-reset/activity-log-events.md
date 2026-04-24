# Password Reset - Activity Log Events

> **Module ID**: `004-password-reset`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-004-01 | `auth.password.reset_requested` | Password reset request accepted | system | { email, token_expires_at } |
| EVT-004-02 | `auth.password.token_verified` | Reset token verified | system | { token_id } |
| EVT-004-03 | `auth.password.reset_completed` | Password successfully reset | candidate / client / hr_admin / super_admin / sales_rep / manager | { sessions_revoked } |

---

## Event Schema

### EVT-004-01: `auth.password.reset_requested`

```json
{
  "event_id": "EVT-004-01",
  "event_name": "auth.password.reset_requested",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "system"
  },
  "entity": {
    "type": "passwordresettoken",
    "id": "uuid"
  },
  "payload": {
    "details": "{ email, token_expires_at }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| auth events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
