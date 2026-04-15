# Transactions State Machines

## 12-Stage Lifecycle Flow

**Entity**: Transaction
**States**: `consultation`, `search`, `negotiation`, `contract`, `mortgage_app`, `insurance`, `attorney_review`, `inspection`, `closing_prep`, `mortgage_underwriting`, `final_walkthrough`, `completed`

| From State | To State | Trigger (Operation) | Actor | Guard Condition | Side Effects |
| --- | --- | --- | --- | --- | --- |
| `consultation` | `search` | Advance Stage RPC | `agent` / `admin` | Client profile complete | Notify agent |
| `search` | `negotiation` | Advance Stage RPC | `agent` / `admin` | Property selected | - |
| `negotiation` | `contract` | Advance Stage RPC | `agent` / `admin` | Contract amount populated | Contract document generated |
| `...` | `...` | - | - | Sequential progression | - |
| `closing_prep` | `completed` | Transaction Close | `attorney`/`admin`| All final docs approved | Lock vertex |
| `*` | `[Any Target]` | `OverrideTransactionStage` | `admin` | `override_reason` provided | Fire `stage_bypassed` audit alert |

### Core Invariants
- Normal stage progression (handled by standard domain logic) strictly requires `target == current + 1`. 
- Only an actor with the `admin` role can force a multi-step jump or a backward rollback (to un-bork a stalled workflow) via the `OverrideTransactionStage` endpoint.
- Attempting to transition out of `insurance` without verifying the insurance vendor partner ID throws a 409 Conflict.
