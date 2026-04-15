# Dashboard RBAC Matrix

| Resource | `ROLE_CLIENT` | `ROLE_AGENT` | `ROLE_LENDER` | `ROLE_ATTORNEY` | `ROLE_CPA` | `ROLE_ADMIN` |
|----------|---------------|--------------|---------------|-----------------|------------|--------------|
| `DashboardMetrics` | Read | Read | Read | Read | Read | Read |
| `Notification` | Read, Update (Dismiss)| None | None | None | None | Read |
| `Timeline` | Read | Read | Read | Read | Read | Read |
| `RecentActivity` | Read | Read | Read | Read | Read | Read |

## Field-Level Rules
- `ROLE_CLIENT` can only view `DashboardMetrics` scoped to their active `transaction_id`.
- The dashboard is fundamentally a read-projection of state owned by other modules. No direct modification of base entities occurs here, except for dismissing client notifications.
