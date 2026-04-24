# Authentication — Activity Log Events

> **Module ID**: `001-authentication`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
|----------|-----------|---------|-------|---------|
| EVT-001-01 | `auth.session.login` | Successful credential validation | Any role | `{ portal, ip_address, user_agent }` |
| EVT-001-02 | `auth.session.logout` | User terminates session | Any role | `{ session_duration, all_devices }` |
| EVT-001-03 | `auth.session.login_failed` | Invalid credentials submitted | anonymous | `{ email, failure_reason, attempt_count }` |
| EVT-001-04 | `auth.account.registered` | New candidate account created | candidate | `{ email, registration_method }` |
| EVT-001-05 | `auth.account.locked` | Max failed login attempts reached | system | `{ email, lock_duration, portal }` |
| EVT-001-06 | `auth.account.unlocked` | Account unlocked (manual or auto) | super_admin / system | `{ email, unlock_method }` |
| EVT-001-07 | `auth.email.verified` | Email verification completed | candidate | `{ email }` |
| EVT-001-08 | `auth.session.expired` | Session timed out | system | `{ user_id, session_duration }` |

---

## Event Schema

### EVT-001-01: `auth.session.login`

```json
{
  "event_id": "EVT-001-01",
  "event_name": "auth.session.login",
  "timestamp": "2026-04-22T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "session",
    "id": "uuid"
  },
  "payload": {
    "portal": "candidate",
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0...",
    "mfa_verified": false,
    "login_method": "email_password"
  },
  "metadata": {
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0..."
  }
}
```

### EVT-001-03: `auth.session.login_failed`

```json
{
  "event_id": "EVT-001-03",
  "event_name": "auth.session.login_failed",
  "timestamp": "2026-04-22T10:00:00Z",
  "actor": {
    "user_id": null,
    "role": "anonymous"
  },
  "entity": {
    "type": "user",
    "id": null
  },
  "payload": {
    "email": "user@example.com",
    "failure_reason": "invalid_password",
    "attempt_count": 3,
    "portal": "admin"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
|---------------|-----------|---------|
| All auth events | Indefinite | Cold storage after 1 year |
| Login failures | Indefinite | Critical for security forensics |
