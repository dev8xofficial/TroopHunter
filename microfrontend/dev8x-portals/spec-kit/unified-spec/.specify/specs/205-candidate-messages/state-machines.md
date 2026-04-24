# Candidate Messages - State Machines

> **Module ID**: `205-candidate-messages`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Candidate Thread Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| unread | Thread contains an unread message for the candidate. | No |
| read | Candidate has opened the thread. | No |
| replied | Candidate responded most recently. | No |
| closed | Thread no longer accepts new replies. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| unread | read | mark_read() | Candidate opens the thread | Emit candidate.message.read |
| read | replied | reply() | Candidate sends a reply | Emit candidate.message.replied |
| replied | unread | receive_message() | Counterparty sends a new message | Emit candidate.message.received |
| read | closed | close() | Thread resolved | Block new replies |

### State Diagram

```
[unread] -- mark_read() --> [read]
[read] -- reply() --> [replied]
[replied] -- receive_message() --> [unread]
[read] -- close() --> [closed]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-205-01 | Closed threads are immutable except for audit reads. |
| INV-205-02 | Unread always means a new inbound message exists for the candidate. |
