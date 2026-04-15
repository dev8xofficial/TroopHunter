# Partners RBAC Matrix

## Role-by-Resource Matrix

| Resource | Admin | Client | Agent | Attorney | Lender | CPA |
| --- | --- | --- | --- | --- | --- | --- |
| Any Partner Entity | CRUD | Read | Read | Read | Read | Read |

*Note: In the Admin portal domain, non-admin roles do not interact directly. They are listed to show default platform bounds.*

## Field-Level Ownership
| Field | Owner | Allowed Updaters | Read Visibility |
| --- | --- | --- | --- |
| `status` | Admin | `admin` | Global |
| `service_areas`| Admin | `admin` | Global |
| `rating` | System| System | Global |
