# Test Scenarios: Messages Spec

## Test Matrix

| Role | Action               | Expected                                       |
| ---- | -------------------- | ---------------------------------------------- |
| CL   | Send message to AG   | Message appears in both inboxes; AG notified   |
| AT   | Reply to CL          | Thread grows; CL sees read receipt (blue)      |
| AG   | Mute attorney thread | Notifications disabled; messages still visible |
| LN   | View message         | Cannot see attorney notes (visibility scoped)  |

## Edge Cases

1. **Message sent to multiple roles** → All recipients see thread
2. **Message with > 5000 chars** → Rejected with error
3. **Deleted message** → Removed from view but audit logged
4. **Offline user receives message** → Queued; delivered on reconnect

## Success Criteria

✅ Messages delivered within 5 seconds
✅ Read receipts accurate
✅ Role-scoped recipients enforced
✅ Notification system working (email + portal)
