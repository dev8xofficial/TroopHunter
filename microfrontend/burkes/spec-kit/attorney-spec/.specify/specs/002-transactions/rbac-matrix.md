# RBAC Matrix: Transactions

## Role-by-Resource CRUD
| Resource | `closing_attorney` | `real_estate_agent` | `mortgage_lender` | `client` | `title_company` |
|---|---|---|---|---|---|
| Transactions | `READ`, `UPDATE` | `CREATE`, `READ` | `READ` | `READ` (own) | `READ` |

## Field-Level Ownership
* `transaction_status`: Strictly owned by `closing_attorney` (and System routines).
* `contract_amount`: Owned by `real_estate_agent` until state enters `under_attorney_review`, after which it is immutable unless flagged.

## Conditions on Access
* `title_company` can only `READ` when state is `title_review`, `verified`, or `completed`.
* Clients only see records where `client_id` explicitly belongs to them.
