# Dashboard Domain Risks

## 1. Metric Aggregation Performance Risk
- **Probability**: Medium
- **Impact**: High
- **Risk**: As transaction counts scale to the thousands, on-the-fly table count aggregations (`SELECT COUNT(*)`) will lock database resources, causing Dashboard load timeouts.
- **Mitigation Strategy**: Implement materialized views or a Redis cache layer for the global dashboard metrics, updating via background queue rather than on read.

## 2. Cross-domain Information Disclosure
- **Probability**: Low
- **Impact**: Critical
- **Risk**: A bug in the dashboard aggregation resolver could accidentally expose PII via the `RecentActivityFeed` to lower-privileged operational staff if Admin roles are sub-divided in the future.
- **Mitigation Strategy**: Ensure the DB query for `RecentActivityFeed` strictly projects synthetic descriptions, sanitizing PII prior to leaving the data layer.
