# Documents Domain Risks

## 1. Compliance Voiding via Re-upload
- **Probability**: High
- **Impact**: Critical
- **Risk**: A submittor replaces an `approved` document, automatically resetting the status to `needs_review` behind the scenes, but the system continues transaction progression as if the document is fundamentally still `approved`.
- **Mitigation Strategy**: Hook the Document update endpoint: if a binary replacement occurs on an `approved` file, the transaction health must instantly flag the parent transaction as `at_risk` and emit an alert to the Admin queue for secondary ratification.

## 2. Invalid Approval Pre-requisites
- **Probability**: Medium
- **Impact**: High
- **Risk**: An administrator accidentally clicks "Approve" on an illegible PDF. 
- **Mitigation Strategy**: The schema provides no hard guard against human error. The system relies entirely on the `activity-log` immutable tracking to audit which Admin ID authorized the sub-standard artifact, enforcing strict retrospective accountability.
