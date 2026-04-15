# Messages Activity Log Events

| Event Name | Triggering Actor | Payload Fields | Visible To Roles | Immutability Rule |
|------------|------------------|----------------|------------------|-------------------|
| `MESSAGE_SENT` | Sender | `message_id`, `conversation_id`, `has_attachment` | None (Audit Only) | Permanent |

*Note: Individual messages are not pushed into the global transaction activity feed visible to users on the dashboard, otherwise it would cause privacy violations and spam.*
