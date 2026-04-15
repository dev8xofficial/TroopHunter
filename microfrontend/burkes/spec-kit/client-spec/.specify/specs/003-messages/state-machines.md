# Messages State Machines

## Entity: `Message`

**States:**
- `UNREAD`: `read_at` is null.
- `READ`: `read_at` is populated.

**Transitions:**
| From State | To State | Trigger | Actor | Guard | Side Effects |
|------------|----------|---------|-------|-------|--------------|
| `UNREAD`   | `READ`   | `FETCH_MESSAGES` or explicit `MARK_READ` | Recipient | Actor != sender | Updates `unread_count` on conversation |

*Note: Messages are immutable. They do not have an `EDITED` or `DELETED` state in this portal.*
