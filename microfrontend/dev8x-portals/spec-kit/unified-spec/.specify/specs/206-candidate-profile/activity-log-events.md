# Candidate Profile - Activity Log Events

> **Module ID**: `206-candidate-profile`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-206-01 | `candidate.profile.updated` | Candidate profile updated | candidate | { profile_id } |
| EVT-206-02 | `candidate.profile.emergency_contact_updated` | Emergency contact updated | candidate | { profile_id } |
| EVT-206-03 | `candidate.profile.verification_changed` | Support role changes profile verification state | hr_admin / super_admin | { profile_id, verification_state } |

---

## Event Schema

### EVT-206-01: `candidate.profile.updated`

```json
{
  "event_id": "EVT-206-01",
  "event_name": "candidate.profile.updated",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "candidateprofile",
    "id": "uuid"
  },
  "payload": {
    "details": "{ profile_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| candidate events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
