# RBAC Matrix: Clients

## Role-by-Resource CRUD
| Resource | `closing_attorney` | `real_estate_agent` | `client` | `title_company` |
|---|---|---|---|---|
| Client Profile | `READ` | `READ` | `READ`, `UPDATE` | None |
| Secure Message | `CREATE` | None | `CREATE` | None |

## Conditions on Access
* `closing_attorney` must share at least one valid `transaction` containing the `client_id` to query profile data, otherwise `403 Forbidden` is thrown.
