# MFA - Activity Log Events

> **Module ID**: `003-mfa`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-003-01 | `auth.mfa.challenge_issued` | Challenge issued or rotated | system | { challenge_id, challenge_type, expires_at } |
| EVT-003-02 | `auth.mfa.verified` | Challenge verified successfully | hr_admin / super_admin | { challenge_id, verification_method } |
| EVT-003-03 | `auth.mfa.failed` | Challenge verification failed | system | { challenge_id, attempt_count } |
| EVT-003-04 | `auth.mfa.expired` | Issued challenge expired | system | { challenge_id } |

---

## Event Schema

### EVT-003-01: `auth.mfa.challenge_issued`

```json
{
  "event_id": "EVT-003-01",
  "event_name": "auth.mfa.challenge_issued",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "system"
  },
  "entity": {
    "type": "mfachallenge",
    "id": "uuid"
  },
  "payload": {
    "details": "{ challenge_id, challenge_type, expires_at }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| auth events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
