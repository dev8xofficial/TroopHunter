# Candidate Interviews - Activity Log Events

> **Module ID**: `202-candidate-interviews`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-202-01 | `candidate.interview.reserved` | Candidate reserves an interview slot | candidate | { interview_id, reserved_for } |
| EVT-202-02 | `candidate.interview.rescheduled` | Candidate changes to a new slot | candidate | { interview_id, previous_slot, reserved_for } |
| EVT-202-03 | `candidate.interview.confirmed` | Candidate confirms interview attendance | candidate | { interview_id } |

---

## Event Schema

### EVT-202-01: `candidate.interview.reserved`

```json
{
  "event_id": "EVT-202-01",
  "event_name": "candidate.interview.reserved",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "interviewreservation",
    "id": "uuid"
  },
  "payload": {
    "details": "{ interview_id, reserved_for }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| candidate events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
