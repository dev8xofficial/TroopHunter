# Dashboard State Machines

## Entity: `DashboardNotification`

**States:**
- `ACTIVE`: The notification requires attention or is newly generated.
- `DISMISSED`: The user has explicitly dismissed the notification (only for non-blocking alerts).
- `RESOLVED`: The underlying system requirement was met (e.g. document signed, app submitted). Automatically transitioned by the system.

**Transitions:**
| From State | To State | Trigger | Actor | Guard | Side Effects |
|------------|----------|---------|-------|-------|--------------|
| `ACTIVE`   | `DISMISSED` | `USER_DISMISS` | Client | Alert severity != `ERROR` | Hides from dashboard |
| `ACTIVE`   | `RESOLVED` | `SYSTEM_VERIFY` | System | Underlying logic satisfied | Removes alert |

**Invariants:**
- `ERROR` severity notifications (blocking actions like unsigned documents) cannot transition via `USER_DISMISS`. They must be `RESOLVED` by the system.
