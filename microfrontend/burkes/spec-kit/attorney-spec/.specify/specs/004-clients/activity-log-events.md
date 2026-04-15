# Activity Log Events: Clients

## Event Catalogue

| Event Name | Triggering Actor | Payload Fields | Visible To Roles | Immutability Rule |
|---|---|---|---|---|
| `ClientCreated` | System/Admin | `client_id` | Admin Only | Immutable record |
| `ProfileUpdated` | `client` | `client_id`, `updated_fields_array` | None | Immutable record |
| `MessageSent` | `closing_attorney`, `client` | `message_id`, `transaction_id`, `recipient_id` | All Assigned | Immutable record |
