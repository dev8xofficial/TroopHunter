# Transactions Activity Log Events

## Audit Events Catalogue

| Event Type | Triggering Actor | Payload Schema | Visibility | Immutability Rule |
| --- | --- | --- | --- | --- |
| `transaction_created` | `agent` / `admin` | `{ trx_type, client_id }` | All Bound Roles | Retained indefinitely |
| `stage_advanced` | `agent` / `admin` | `{ previous_stage, new_stage }` | All Bound Roles | Retained indefinitely |
| `stage_bypassed` | `admin` | `{ previous_stage, new_stage, reason }` | `admin` | Flagged as high-severity audit item |
| `health_status_degraded` | System | `{ current_stage, delay_days }` | `admin`, `agent` | Prunable after 5 years |
