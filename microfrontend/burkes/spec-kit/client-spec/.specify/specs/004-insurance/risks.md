# Insurance Risks

## Data Integrity Risks
- **Incomplete Completion Transition**: Client manages to hit `COMPLETED` state without uploading an actual proof-of-insurance document.
  - **Probability**: Medium
  - **Impact**: High (Lender underwriting rejected).
  - **Mitigation Strategy**: The state machine guard must strictly enforce `document_ids.length > 0` before allowing the transition to `COMPLETED`.

## Access Control Risks
- **Over-Privileged Read Access**: A real estate agent accesses the client's Auto Insurance payload containing a DOB.
  - **Probability**: Medium
  - **Impact**: High (Privacy violation).
  - **Mitigation Strategy**: Rigorous application of the RBAC matrix in the API handler; `ROLE_AGENT` receives a 403 Forbidden.
