# Users Activity Log Events

## Audit Events Catalogue

| Event Type | Triggering Actor | Payload Schema | Visibility | Immutability Rule |
| --- | --- | --- | --- | --- |
| `user_provisioned` | `admin` | `{ provisioned_role, email_domain }` | `admin` | Retained indefinitely |
| `status_changed` | `admin` | `{ previous_status, new_status, reason }` | `admin` | Cannot be pruned if `new_status` is `suspended` |
| `role_modified` | `admin` | `{ previous_role, new_role }` | `admin` | Retained indefinitely |
