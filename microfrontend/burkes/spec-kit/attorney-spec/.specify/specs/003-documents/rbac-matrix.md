# RBAC Matrix: Documents

## Role-by-Resource CRUD
| Resource | `closing_attorney` | `real_estate_agent` | `mortgage_lender` | `client` | `title_company` |
|---|---|---|---|---|---|
| Documents | `CREATE` (Orders), `READ`, `UPDATE` (Status) | `CREATE` (Agreements), `READ` | `CREATE` (Disclosures), `READ` | `READ` | `CREATE` (Title), `READ` |

## Field-Level Ownership
* `status`: Exclusively owned and mutated by `closing_attorney`.
* `rejection_reason`: Owned by `closing_attorney`.

## Conditions on Access
* `title_company` can only upload title-related records.
* Users can only `READ` documents attached to a `transaction_id` they operate within.
