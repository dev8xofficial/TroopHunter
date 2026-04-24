# Admin Pipeline - Activity Log Events

> **Module ID**: `102-admin-pipeline`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-102-01 | `admin.pipeline.stage_changed` | Applicant card moved to a new stage | hr_admin / super_admin | { applicant_id, from_stage, to_stage } |
| EVT-102-02 | `admin.pipeline.stale_flagged` | Card exceeds stage-age threshold | system | { applicant_id, stage, age_in_stage_days } |
| EVT-102-03 | `admin.pipeline.metrics_viewed` | Board metrics requested | hr_admin / super_admin / manager | { department } |

---

## Event Schema

### EVT-102-01: `admin.pipeline.stage_changed`

```json
{
  "event_id": "EVT-102-01",
  "event_name": "admin.pipeline.stage_changed",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "hr_admin"
  },
  "entity": {
    "type": "pipelinecard",
    "id": "uuid"
  },
  "payload": {
    "details": "{ applicant_id, from_stage, to_stage }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
