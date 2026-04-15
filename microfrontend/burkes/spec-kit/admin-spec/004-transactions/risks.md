# Transactions Domain Risks

## 1. Stage Bypass Corruption
- **Probability**: Low
- **Impact**: Critical
- **Risk**: An administrator abuses the `OverrideTransactionStage` endpoint to skip the `attorney_review` stage without obtaining out-of-band legal confirmation, causing a non-compliant closing.
- **Mitigation Strategy**: The schema requires an `override_reason` longer than 10 characters. The backend must emit a high-severity `stage_bypassed` event, immediately routing to a secondary compliance dashboard.

## 2. Endless Wait States
- **Probability**: High
- **Impact**: Medium
- **Risk**: A transaction gets stuck in `insurance` because the client stops responding, resulting in zombie transactions filling the Active queue.
- **Mitigation Strategy**: The automated health status daemon must transition transactions to `delayed` after 14 days of stage stagnation, and finally to `at_risk` after 30 days, flagging them explicitly in the Admin portal.
