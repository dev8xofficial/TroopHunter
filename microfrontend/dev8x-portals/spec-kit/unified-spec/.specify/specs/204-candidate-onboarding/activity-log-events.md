# Candidate Onboarding - Activity Log Events

> **Module ID**: `204-candidate-onboarding`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-204-01 | `candidate.onboarding.item_completed` | Candidate completes an onboarding item | candidate | { item_id } |
| EVT-204-02 | `candidate.onboarding.account_provisioned` | System provisions an onboarding account | system | { item_id, account_type } |
| EVT-204-03 | `candidate.onboarding.completed` | All required onboarding work is complete | system | { candidate_id } |

---

## Event Schema

### EVT-204-01: `candidate.onboarding.item_completed`

```json
{
  "event_id": "EVT-204-01",
  "event_name": "candidate.onboarding.item_completed",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "onboardingitem",
    "id": "uuid"
  },
  "payload": {
    "details": "{ item_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| candidate events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
