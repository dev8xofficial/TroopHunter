# Transactions RBAC Matrix

## Role-by-Resource Matrix

| Resource | Admin | Client | Agent | Attorney | Lender | CPA |
| --- | --- | --- | --- | --- | --- | --- |
| Any Transaction | CRUD | Self-Read | Assigned-Read | Assigned-Read| Assigned-Read| Assigned-Read|
| Stage Progress  | Bypass | Read | Update | Update | Update | Read |

*Note: In the Admin portal domain, non-admin roles do not interact directly. They are listed to show default platform bounds.*

## Field-Level Ownership
| Field | Owner | Allowed Updaters | Read Visibility |
| --- | --- | --- | --- |
| `stage` | System | System, `admin` (bypass) | Global |
| `health_status` | System | System | Global |
| `contract_amount`| Agent | `agent`, `admin` | Bound roles |
| `closing_date` | Agent | `agent`, `admin` | Bound roles |
