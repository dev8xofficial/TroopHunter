# Activity Event Catalogue - 007-partner-referrals

## System Audit Triggers

| Event Name | Triggering Actor | Payload Capture | Visibility Matrix | Immutability |
|---|---|---|---|---|
| `partner-referrals_created` | Agent | `id`, `initial_state` | Agent, Admin | True |
| `partner-referrals_mutated` | Any valid | `id`, `delta_payload` | Agent, Admin | True |
| `partner-referrals_read_access`| Client | `id`, `ip_signature` | Admin | True |

## Retention Policy
All events emitted are written asynchronously to cold storage following a 90-day hot cache window.
