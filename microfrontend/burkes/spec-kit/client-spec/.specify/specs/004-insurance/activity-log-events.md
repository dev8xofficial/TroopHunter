# Insurance Activity Log Events

| Event Name | Triggering Actor | Payload Fields | Visible To Roles | Immutability Rule |
|------------|------------------|----------------|------------------|-------------------|
| `INSURANCE_UPDATED` | `ROLE_CLIENT` | `policy_type`, `status` | `ROLE_LENDER`, `ROLE_ATTORNEY` | Permanent |
| `INSURANCE_COMPLETED`| System | `policy_type` | All participants | Permanent |

*Note: The actual PII fields modified (DOB, VIN) are never serialized into the activity log payload to prevent persistent exposure indexing.*
