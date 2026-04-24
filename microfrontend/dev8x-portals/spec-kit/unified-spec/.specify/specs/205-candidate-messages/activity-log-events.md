# Candidate Messages - Activity Log Events

> **Module ID**: `205-candidate-messages`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-205-01 | `candidate.message.received` | New message arrives in a candidate thread | system | { thread_id } |
| EVT-205-02 | `candidate.message.replied` | Candidate sends a reply | candidate | { thread_id } |
| EVT-205-03 | `candidate.message.read` | Candidate marks a thread as read | candidate | { thread_id } |

---

## Event Schema

### EVT-205-01: `candidate.message.received`

```json
{
  "event_id": "EVT-205-01",
  "event_name": "candidate.message.received",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "system"
  },
  "entity": {
    "type": "candidatethread",
    "id": "uuid"
  },
  "payload": {
    "details": "{ thread_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| candidate events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
