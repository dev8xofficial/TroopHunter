# Admin Documents - Activity Log Events

> **Module ID**: `106-admin-documents`
> References: [contracts/events.yaml](../../../contracts/events.yaml)

---

## Events

| Event ID | Event Name | Trigger | Actor | Payload |
| --- | --- | --- | --- | --- |
| EVT-106-01 | `admin.document.requested` | Admin requests a document from an applicant | hr_admin / super_admin | { document_type, applicant_id } |
| EVT-106-02 | `admin.document.reviewed` | Admin verifies or rejects a document | hr_admin / super_admin | { document_id, status } |
| EVT-106-03 | `admin.document.downloaded` | Authorized actor downloads a document | hr_admin / super_admin | { document_id } |

---

## Event Schema

### EVT-106-01: `admin.document.requested`

```json
{
  "event_id": "EVT-106-01",
  "event_name": "admin.document.requested",
  "timestamp": "2026-04-24T10:00:00Z",
  "actor": {
    "user_id": "uuid",
    "role": "hr_admin"
  },
  "entity": {
    "type": "applicantdocument",
    "id": "uuid"
  },
  "payload": {
    "details": "{ document_type, applicant_id }"
  }
}
```

---

## Retention Policy

| Event Category | Retention | Archive |
| --- | --- | --- |
| admin events | Indefinite | Cold storage after 1 year |
| Security-relevant events | Indefinite | Pinned for forensic review |
