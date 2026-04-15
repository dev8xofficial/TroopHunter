# Documents Activity Log Events

| Event Name | Triggering Actor | Payload Fields | Visible To Roles | Immutability Rule |
|------------|------------------|----------------|------------------|-------------------|
| `DOCUMENT_UPLOADED` | Any Authorized | `document_id`, `filename`, `category`, `status` | Category Readers | Permanent |
| `DOCUMENT_SIGNED` | `ROLE_CLIENT` | `document_id`, `filename`, `ip_address` | Category Readers | Permanent |
| `DOCUMENT_APPROVED`| Any Authorized | `document_id`, `filename`, `category` | Category Readers | Permanent |
| `DOCUMENT_DELETED` | Uploader | `filename`, `category` | Category Readers | Permanent |
