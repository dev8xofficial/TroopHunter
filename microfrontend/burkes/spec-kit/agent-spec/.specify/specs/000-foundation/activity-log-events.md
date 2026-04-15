# Activity Event Catalogue - 000-foundation

## System Audit Triggers

| Event Name | Triggering Actor | Payload Capture | Visibility Matrix | Immutability |
|---|---|---|---|---|
| `foundation_created` | Agent | `id`, `initial_state` | Agent, Admin | True |
| `foundation_mutated` | Any valid | `id`, `delta_payload` | Agent, Admin | True |
| `foundation_read_access`| Client | `id`, `ip_signature` | Admin | True |

## Retention Policy
All events emitted are written asynchronously to cold storage following a 90-day hot cache window.
