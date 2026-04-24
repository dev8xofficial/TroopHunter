# Candidate Application - Activity Log Events

> **Module ID**: `201-candidate-application`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-201-01 | `candidate.application.timeline_viewed` | Candidate views the application timeline | candidate | { candidate_id } |
| EVT-201-02 | `candidate.application.step_acknowledged` | Candidate acknowledges a required step | candidate | { step_key } |

---

## Event Schema

### EVT-201-01: `candidate.application.timeline_viewed`

```json
{
  "event_id": "EVT-201-01",
  "event_name": "candidate.application.timeline_viewed",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "applicationstep",
    "id": "uuid"
  },
  "payload": {
    "details": "{ candidate_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| candidate events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
