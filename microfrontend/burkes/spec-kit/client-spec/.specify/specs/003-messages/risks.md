# Messages Risks

## Access Control Risks
- **Participant Array Spoofting**: Forging a `POST` request to create a conversation with a third party.
  - **Probability**: Low
  - **Impact**: High
  - **Mitigation Strategy**: The backend must rigorously enforce that `ROLE_CLIENT` can only initialize conversations with `participant_2` mapped to explicitly assigned professionals on their transaction.

## Integration Risks
- **Document RBAC Bypass via Message**: If a message object carelessly serializes the entire attached document binary rather than just the metadata, it could bypass the `002-documents` module security.
  - **Probability**: Medium
  - **Impact**: High (Data leak).
  - **Mitigation Strategy**: `Message.attachment_document_id` strictly remains an ID. Clients must still hit `/api/v1/documents/{id}/download` ensuring the document RBAC gates execute.
