# RBAC Matrix: Verification

## Role-by-Resource CRUD
| Resource | `closing_attorney` | `real_estate_agent` | `mortgage_lender` | `client` | `title_company` |
|---|---|---|---|---|---|
| Verification Data | `CREATE`, `READ`, `UPDATE` | `READ` | `READ` | `READ` (own) | `READ` |
| Discrepancy Flag | `CREATE`, `READ`, `UPDATE` | `READ` | `READ` | None | None |

## Field-Level Ownership
* All fields in Verification payloads are strictly writable only by the `closing_attorney`.

## Conditions on Access
* Read access for external parties (`real_estate_agent`, `title_company`) is generally restricted until the state machine fully transitions, ensuring they do not see draft math.
