# Insurance State Machines

## Entity: `InsurancePolicy`

**States:**
- `NOT_STARTED`: The policy object exists implicitly but has zero data populated by the client.
- `PENDING`: The client has begun populating data or uploaded a document, but required validation fields are missing.
- `COMPLETED`: All schema requirements for the respective `policy_type` are satisfied, and at least one document is linked.

**Transitions:**
| From State | To State | Trigger | Actor | Guard | Side Effects |
|------------|----------|---------|-------|-------|--------------|
| `NOT_STARTED` | `PENDING` | `UPDATE_POLICY` | `ROLE_CLIENT` | Partial data provided | None |
| `PENDING` | `COMPLETED` | `UPDATE_POLICY` | `ROLE_CLIENT` | `json_schema` validation passes AND `document_ids.length > 0` | Triggers Transaction state evaluation |
| `COMPLETED` | `PENDING` | `UPDATE_POLICY` | `ROLE_CLIENT` | Client removes a required field or deletes the linked document | Triggers regression warning |

**Invariants:**
- `AUTO` policies must have a `vin_number` to reach `COMPLETED`.
- `HOME` and `WARRANTY` must have `property_address` to reach `COMPLETED`.
