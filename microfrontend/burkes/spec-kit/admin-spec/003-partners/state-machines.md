# Partners State Machines

## Service Partner Status Flow

**Entity**: Partner
**States**: `pending_approval`, `active`, `suspended`

| From State | To State | Trigger (Operation) | Actor | Guard Condition | Side Effects |
| --- | --- | --- | --- | --- | --- |
| `[None]` | `pending_approval` | Partner Self-Registers | System | External intake payload is valid | Dispatch `partner_applied` event to Admin queue |
| `pending_approval` | `active` | System approves (`UpdatePartnerState`) | `admin` | `service_areas` array > 0 | Enable dispatch visibility |
| `active` | `suspended` | System suspends (`UpdatePartnerState`) | `admin` | None | Remove from dispatch indexing |
| `suspended` | `active` | System restores (`UpdatePartnerState`) | `admin` | None | Restore to dispatch indexing |

### Core Invariants
- A partner in `pending_approval` or `suspended` state must not be returned in any geospatial search queries (`zip_code` intersection) used for dispatching.
