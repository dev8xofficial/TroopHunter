# Documents Activity Log Events

## Audit Events Catalogue

| Event Type | Triggering Actor | Payload Schema | Visibility | Immutability Rule |
| --- | --- | --- | --- | --- |
| `document_uploaded` | Submitter | `{ doc_category, trx_id }` | Bound Roles | Retained indefinitely |
| `status_changed` | `admin` | `{ previous_status, new_status, reason }` | `admin`, Submitter| Cannot be pruned if `new_status` is `approved` |
