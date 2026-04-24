# Candidate Documents - Activity Log Events

> **Module ID**: `203-candidate-documents`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-203-01 | `candidate.document.viewed` | Candidate opens a document | candidate | { document_id } |
| EVT-203-02 | `candidate.document.signed` | Candidate signs a document | candidate | { document_id, signature_type } |
| EVT-203-03 | `candidate.document.uploaded` | Candidate uploads a document | candidate | { document_id, file_name, version } |

---

## Event Schema

### EVT-203-01: `candidate.document.viewed`

```json
{
  "event_id": "EVT-203-01",
  "event_name": "candidate.document.viewed",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "candidate"
  },
  "entity": {
    "type": "candidatedocument",
    "id": "uuid"
  },
  "payload": {
    "details": "{ document_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| candidate events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
