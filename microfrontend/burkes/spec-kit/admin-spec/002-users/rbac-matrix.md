# Users RBAC Matrix

## Role-by-Resource Matrix

| Resource | Admin | Client | Agent | Attorney | Lender | CPA |
| --- | --- | --- | --- | --- | --- | --- |
| Any User Entity | CRUD | Self-Read | Self-Read | Self-Read | Self-Read | Self-Read |

*Note: In the Admin portal domain, non-admin roles do not interact directly. They are listed to show default platform bounds.*

## Field-Level Ownership
| Field | Owner | Allowed Updaters | Read Visibility |
| --- | --- | --- | --- |
| `status` | Admin | `admin` | Global (Admin) |
| `role` | Admin | `admin` | Global (Admin) |
| `email` | User | `admin`, Self | Global (Admin) |
| `full_name` | User | `admin`, Self | Global (Admin) |
