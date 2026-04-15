# Users State Machines

## Identity Status State Machine

**Entity**: User
**States**: `pending_approval`, `active`, `suspended`, `inactive`

| From State | To State | Trigger (Operation) | Actor | Guard Condition | Side Effects |
| --- | --- | --- | --- | --- | --- |
| `[None]` | `pending_approval` | User Self-Registers via portal | System / Auth Zero | Valid identity provider | Dispatch `user_registered` event |
| `[None]` | `active` | Admin registers (`ProvisionUser`) | `admin` | Valid provisioning payload | Send welcome/activation email |
| `pending_approval` | `active` | System approves (`UpdateUserStatus`) | `admin` | Valid permissions | Send approval notification |
| `active` | `suspended` | System suspends (`UpdateUserStatus`) | `admin` | Mandatory string `reason` supplied | Invalidate active auth sessions |
| `suspended` | `active` | System restores (`UpdateUserStatus`) | `admin` | None | Notify user via email |
| `active` | `inactive` | System deletes (`UpdateUserStatus`) | `admin` | User holds no active/in-flight transactions | Hard-lock profile |
| `suspended` | `inactive` | System deletes (`UpdateUserStatus`) | `admin` | User holds no active/in-flight transactions | Hard-lock profile |

### Core Invariants
- An Admin cannot delete (transition to `inactive`) an identity if that identity is a primary actor in an `in_progress` transaction.
