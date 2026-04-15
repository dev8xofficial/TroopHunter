# Activity Log Events: Documents

## Event Catalogue

| Event Name | Triggering Actor | Payload Fields | Visible To Roles | Immutability Rule |
|---|---|---|---|---|
| `DocumentUploaded` | Uploader | `document_id`, `category`, `transaction_id` | All Assigned | Immutable record |
| `DocumentApproved` | `closing_attorney` | `document_id` | All Assigned | Immutable record |
| `DocumentRejected` | `closing_attorney` | `document_id`, `rejection_reason` | All Assigned | Immutable record |
