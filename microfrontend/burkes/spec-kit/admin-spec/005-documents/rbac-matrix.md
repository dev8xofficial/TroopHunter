# Documents RBAC Matrix

## Role-by-Resource Matrix

| Resource | Admin | Client | Agent | Attorney | Lender | CPA |
| --- | --- | --- | --- | --- | --- | --- |
| All Documents | Read | Self-Read | Assigned-Read | Assigned-Read | Assigned-Read | Assigned-Read |
| Document Stat | Update | Read | Read | Read | Read | Read |

*Note: In the Admin portal domain, non-admin roles do not interact directly. They are listed to show default platform bounds.*

## Field-Level Ownership
| Field | Owner | Allowed Updaters | Read Visibility |
| --- | --- | --- | --- |
| `status` | Admin | `admin` | Bound roles |
| `rejection_reason`| Admin | `admin` | Bound roles |
| `category` | Submitter| Submitter | Bound roles |
