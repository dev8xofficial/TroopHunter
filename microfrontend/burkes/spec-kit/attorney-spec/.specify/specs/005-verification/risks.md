# Risks: Verification

## Data Integrity Risks
* **Probability:** Low
* **Impact:** Critical
* **Risk:** Floating point arithmetic leading to `99.999%` sum validation failures on asset splits.
* **Mitigation Strategy:** Backend schema stores all monetary values in integer cents and handles percentage fractions using exact decimal types (e.g. `NUMERIC(5,2)` in Postgres) rather than floats.

## Access Control Risks
* **Probability:** Low
* **Impact:** High
* **Risk:** Attorney verifies a case they are not actively assigned to via replay attack.
* **Mitigation Strategy:** Ensure verification API routes enforce standard transaction ownership checks.

## Integration Risks
* **Probability:** High
* **Impact:** Medium
* **Risk:** Discrepancy webhooks (emails/notifications) flooding external agents.
* **Mitigation Strategy:** Debounce or batch notification dispatches for `DiscrepancyFlagged` events to avoid email spam if an attorney clicks repeatedly.
