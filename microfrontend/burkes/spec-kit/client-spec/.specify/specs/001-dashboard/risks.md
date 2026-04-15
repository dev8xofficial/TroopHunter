# Dashboard Risks

## Data Integrity Risks
- **Desynchronised Read Models**: If the dashboard aggregates data from `Mortgage`, `Documents`, and `Insurance` independently, eventual consistency delays may show incorrect status badges.
  - **Probability**: Medium
  - **Impact**: High (Client confusion).
  - **Mitigation Strategy**: Guarantee strong consistency for metrics endpoints or compute dynamically on read.

## Access Control Risks
- **Cross-transaction Exposure**: Computing metrics for `transaction_id=123` while acting as a Client belonging to `transaction_id=999`.
  - **Probability**: Low
  - **Impact**: Critical (Data leak).
  - **Mitigation Strategy**: Middleware must strictly assert `req.user.transaction_id == requested_id`.

## Integration Risks
- **Slow Query Times**: Aggregating completion percentages across 5 distinct database modules (documents, user, insurance, etc.) for every dashboard load.
  - **Probability**: High
  - **Impact**: Medium (Slow perceived load times).
  - **Mitigation Strategy**: Maintain a materialized view or aggressively cache unchanged transaction sub-states.
