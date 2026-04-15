# Activity Log Events: Transactions

## Event Catalogue

| Event Name | Triggering Actor | Payload Fields | Visible To Roles | Immutability Rule |
|---|---|---|---|---|
| `TransactionCreated` | `real_estate_agent` | `transaction_id`, `client_id`, `amount` | All Assigned | Immutable record |
| `StatusChanged` | `closing_attorney` / System | `old_status`, `new_status`, `reason` | All Assigned | Immutable record |
| `DiscrepancyFlagged` | `closing_attorney` | `flag_type`, `description`, `notified_parties` | All Assigned | Immutable record |
| `FlagResolved` | `closing_attorney` | `resolution_notes` | All Assigned | Immutable record |
