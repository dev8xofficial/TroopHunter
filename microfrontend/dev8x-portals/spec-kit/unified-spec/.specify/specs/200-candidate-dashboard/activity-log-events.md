# Candidate Dashboard - Activity Log Events

> **Module ID**: `200-candidate-dashboard`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-200-01 | `candidate.dashboard.viewed` | Candidate dashboard opened | candidate | { candidate_id } |
| EVT-200-02 | `candidate.dashboard.quick_action_opened` | Candidate opens a quick action | candidate | { action_key } |

---

## Event Schema

### EVT-200-01: `candidate.dashboard.viewed`

```json
{
  "event_id": "EVT-200-01",
  "event_name": "candidate.dashboard.viewed",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "candidateprogress",
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
