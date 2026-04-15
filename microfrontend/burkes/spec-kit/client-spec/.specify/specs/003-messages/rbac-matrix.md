# Messages RBAC Matrix

| Resource | `ROLE_CLIENT` | `ROLE_AGENT` | `ROLE_LENDER` | `ROLE_ATTORNEY` | `ROLE_CPA` |
|----------|---------------|--------------|---------------|-----------------|------------|
| `Conversation` | R | R (If Participant) | R (If Participant) | R (If Participant) | R (If Participant) |
| `Message` | C, R | C, R (If Participant) | C, R (If Participant) | C, R (If Participant) | C, R (If Participant) |

*(C = Create, R = Read)*

## Field-Level Rules
- Deletion of messages is prohibited.
- `ROLE_CLIENT` can view all conversations tied to their `transaction_id`.
- Professionals can only view conversations where their `user_id` is an explicit element of the `participants` array. 
- When a professional attaches a document to a message, standard Document RBAC rules apply. If an Attorney attaches a `LEGAL` document, the Client can see the embedded block, but if an Agent somehow got that message ID, they couldn't download the specific document without `LEGAL` RBAC permissions.
