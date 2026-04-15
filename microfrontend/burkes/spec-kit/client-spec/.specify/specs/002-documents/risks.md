# Documents Risks

## Data Integrity Risks
- **Duplicate Signatures**: A client quickly rapid-fires the sign endpoint.
  - **Probability**: Low
  - **Impact**: Medium (Audit log spam).
  - **Mitigation Strategy**: Implement idempotency keys per signature transaction, and ensure DB state check `status != APPROVED` before applying signature.

## Access Control Risks
- **Direct Object Reference (IDOR)**: A client accesses `GET /documents/{document_id}/download` for a financial document belonging to another transaction entirely.
  - **Probability**: Critical
  - **Impact**: High (Data breach).
  - **Mitigation Strategy**: Middleware must always fetch the document metadata first and verify `document.transaction_id == auth_user.transaction_id` and check category RBAC.

## Integration Risks
- **Malware Uploads**: Users uploading malicious payloads via file upload.
  - **Probability**: Medium
  - **Impact**: Critical
  - **Mitigation Strategy**: Strictly enforce MIME type verification and pass blobs through a malware scanning service before persisting.
