# Activity Event Catalogue - 003-documents

## System Audit Triggers

| Event Name | Triggering Actor | Payload Capture | Visibility Matrix | Immutability |
|---|---|---|---|---|
| `documents_created` | Agent | `id`, `initial_state` | Agent, Admin | True |
| `documents_mutated` | Any valid | `id`, `delta_payload` | Agent, Admin | True |
| `documents_read_access`| Client | `id`, `ip_signature` | Admin | True |

## Retention Policy
All events emitted are written asynchronously to cold storage following a 90-day hot cache window.
