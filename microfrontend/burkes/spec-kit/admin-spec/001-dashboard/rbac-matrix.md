# Dashboard RBAC Matrix

## Endpoint Permissions
| Resource Path | Operation | Allowed Roles | Guard Condition |
| --- | --- | --- | --- |
| `/admin/dashboard/metrics` | GET | `admin` | Valid active session |
| `/admin/dashboard/activity` | GET | `admin` | Valid active session |

## Field-Level Ownership
| Field | Owner | Readers | Immutability Rule |
| --- | --- | --- | --- |
| `stat_total_users` | System | `admin` | Read-only synthetic aggregate |
| `stat_active_tx` | System | `admin` | Read-only synthetic aggregate |
| `stat_partners` | System | `admin` | Read-only synthetic aggregate |
| `stat_pending_docs` | System | `admin` | Read-only synthetic aggregate |
