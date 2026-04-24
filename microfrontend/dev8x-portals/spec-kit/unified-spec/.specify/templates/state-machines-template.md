# [Module Name] — State Machines

> **Module ID**: `NNN-module-name`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## [Entity Name] Lifecycle

### States

| State | Description | Entry Condition | Terminal |
|-------|-------------|-----------------|---------|
| `state_a` | What this state means | How entity enters this state | No |
| `state_b` | What this state means | How entity enters this state | No |
| `state_terminal` | What this state means | How entity enters this state | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
|------|----|---------|-------|--------------|
| `state_a` | `state_b` | `action()` | [Condition that must be true] | Events emitted, data mutations |
| `state_b` | `state_terminal` | `complete()` | [Condition] | Events emitted |

### State Diagram

```
[state_a] --action()--> [state_b] --complete()--> [state_terminal]
                                  \--reject()---> [rejected]
```

### Invariants

| Invariant | Description |
|-----------|-------------|
| INV-NNN-01 | [What must always be true regardless of state] |
| INV-NNN-02 | [Another invariant] |

---

## Timer-Based Transitions

| State | Timeout | Auto-Transition | Alert |
|-------|---------|-----------------|-------|
| state_name | 48 hours | → escalated | Notify manager |
