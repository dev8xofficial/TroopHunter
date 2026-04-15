# RBAC Matrix - 001-dashboard

## Access Policies
This matrix dictates the enforcement rules applied at the middleware gateway.

| Role | Operations (CRUD) | Scope Limitation |
|---|---|---|
| Agent | C, R, U | Restricted to `agent_id == session.user_id` |
| Client | R | Restricted to explicitly associated relations. |
| Attorney | R, U | Read-only general; Update limited to legal review fields. |
| Admin | C, R, U, D | Global Tenant Scope |

## Field-Level Ownership
- `status`: Settable primarily via state-machine triggers only.
- `audit_metadata`: System injected immutable fields.
