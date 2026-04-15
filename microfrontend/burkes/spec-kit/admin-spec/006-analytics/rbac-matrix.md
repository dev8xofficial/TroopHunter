# Analytics RBAC Matrix

## Role-by-Resource Matrix

| Resource | Admin | Client | Agent | Attorney | Lender | CPA |
| --- | --- | --- | --- | --- | --- | --- |
| Global Analytics API | Read | None | None | None | None | None |

## Field-Level Ownership
| Field | Owner | Allowed Updaters | Read Visibility |
| --- | --- | --- | --- |
| `total_revenue` | System | None (Computed)| `admin` |
| `closed_transactions` | System | None (Computed)| `admin` |
| `avg_close_time_days` | System | None (Computed)| `admin` |
