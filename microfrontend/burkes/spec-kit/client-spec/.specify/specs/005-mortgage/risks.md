# Mortgage Risks

## Data Integrity Risks
- **Schema Validation Drift**: The `personal_info` schema expects `ssn_last_four`, but a malicious client submits a string of length 9 to inject full SSN data where it shouldn't be stored plains text.
  - **Probability**: Medium
  - **Impact**: High (PII exposure).
  - **Mitigation Strategy**: Strict JSON Schema validation using `pattern` enforcing exactly 4 digits, rejecting unexpected fields via `additionalProperties: false`.

## Integration Risks
- **Underwriting Sync Failure**: After `SUBMITTED`, if the application data must sync to the Lender's 3rd-party banking system, parsing errors could block the transaction timeline.
  - **Probability**: High
  - **Impact**: High
  - **Mitigation Strategy**: Implement a dead-letter queue for downstream syncing, and ensure the schema strictly enforces data types required by the banking API (e.g., ensuring `annual_income` is a number, not a string).
