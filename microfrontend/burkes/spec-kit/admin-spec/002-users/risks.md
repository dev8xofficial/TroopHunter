# Users Domain Risks

## 1. Dangling Relations on Suspension
- **Probability**: Medium
- **Impact**: High
- **Risk**: Suspending an Attorney who is currently the single assigned verifying agent for an active closing transaction causes the transaction to lock unexpectedly.
- **Mitigation Strategy**: The status update pipeline must execute a transaction existence check. If active transactions depend on the actor, the system must warn the Administrator before committing the `suspended` state.

## 2. PII / Email Uniqueness Conflicts
- **Probability**: High
- **Impact**: Medium
- **Risk**: A Client creates an account using `john@email.com`, then decides to apply as an Agent creating a separate account for `john@email.com`. Identity collision occurs.
- **Mitigation Strategy**: Enforce strict DB-level unique constraints on the `email` column, rejecting dual registration regardless of role context.

## 3. Excessive Search Load
- **Probability**: Low
- **Impact**: Medium
- **Risk**: `LIKE %search%` queries across non-indexed attributes like `full_name` and `email` causing slow API response times as user base scales.
- **Mitigation Strategy**: Index `email` and `display_id` for exact lookups. Utilize bounded pagination requirements for all list endpoints.
