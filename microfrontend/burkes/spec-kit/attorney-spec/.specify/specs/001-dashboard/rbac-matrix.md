# RBAC Matrix: Dashboard

## Role-by-Resource CRUD
| Resource | `closing_attorney` | `real_estate_agent` | `mortgage_lender` | `client` | `title_company` |
|---|---|---|---|---|---|
| Dashboard Aggregates | `READ` | None | None | None | None |

## Field-Level Ownership
* `total_value_managed`: Read-only. Computed by System.

## Access Conditions
* `closing_attorney` can only request aggregates where `attorney_id` explicitly matches their own authenticated UUID.
