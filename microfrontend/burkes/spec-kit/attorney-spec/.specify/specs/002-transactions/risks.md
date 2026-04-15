# Risks: Transactions

## Data Integrity Risks
* **Probability:** Medium
* **Impact:** Critical
* **Risk:** Concurrency race condition allowing `verified` state while a document is simultaneously uploaded.
* **Mitigation Strategy:** Database-level transactional locks. An optimistic concurrency version integer on the transaction row prevents updates if the version has mutated.

## Access Control Risks
* **Probability:** Low
* **Impact:** High
* **Risk:** Client accesses another client's transaction history.
* **Mitigation Strategy:** Implement row-level security (RLS) in postgres or strict middleware guards verifying `client_id == auth_user_id`.

## Integration Risks
* **Probability:** Medium
* **Impact:** Medium
* **Risk:** Title Company webhook fails to update final closing status to `completed`.
* **Mitigation Strategy:** Implement dead-letter queue and automatic retry mechanisms for webhook consumption.
