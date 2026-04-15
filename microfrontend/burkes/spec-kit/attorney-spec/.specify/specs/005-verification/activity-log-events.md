# Activity Log Events: Verification

## Event Catalogue

| Event Name | Triggering Actor | Payload Fields | Visible To Roles | Immutability Rule |
|---|---|---|---|---|
| `TransactionVerified` | `closing_attorney` | `sale_price`, `loan_amount`, `signature_hash` | All Assigned | Immutable record |
| `DiscrepancyFlagged` | `closing_attorney` | `discrepancy_type`, `description` | Internal | Immutable record |
| `AssetSplitModified` | `closing_attorney` | `old_ratios`, `new_ratios`, `reason` | Internal | Immutable record |
