# Risks: Dashboard

## Data Integrity Risks
* **Probability:** Low
* **Impact:** High
* **Risk:** Computing `total_value_managed` across currencies or out-of-sync replicas.
* **Mitigation Strategy:** Force all value aggregations to execute against read-replicas with bounded staleness (<1s) and standardise all DB monetary values dynamically to USD.

## Access Control Risks
* **Probability:** Low
* **Impact:** Critical
* **Risk:** Insecure Direct Object Reference (IDOR) on `/api/v1/attorneys/{attorney_id}/dashboard-aggregates`.
* **Mitigation Strategy:** Extract `attorney_id` directly from the validated JWT token rather than the URL path, or enforce strict matching middleware.

## Integration Failure Risks
* **Probability:** Medium
* **Impact:** Medium
* **Risk:** Database degradation under heavy aggregation queries.
* **Mitigation Strategy:** Utilise materialized views or Redis caching refreshed incrementally on related mutation events rather than performing dynamic SUM() queries.
