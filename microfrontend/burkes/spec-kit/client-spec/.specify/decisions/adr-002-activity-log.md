# ADR-002: Append-Only Activity Log Design

**Status**: Accepted (April 2026)
**Decision Date**: February 2026
**Last Modified**: April 2026
**Decision ID**: ADR-002

## Title

We WILL implement the activity log as **immutable, append-only event stream** rather than mutable transaction records.

## Context

The portal must maintain an **audit trail** — a complete record of who did what, when, in every transaction. The question: how should we store this history?

**Two approaches**:

1. **Mutable transactions table**: Update existing rows (transaction_status, document_count, etc.)
   - Pros: Familiar, simple queries
   - Cons: History is lost; cannot answer "when did status change?" without archiving
2. **Immutable append-only log**: Insert event on every change, never update
   - Pros: Complete history; easy to audit; complies with regulations
   - Cons: Need to recalculate current state from log

## Decision

**Use append-only event stream**:

- Every state change → insert 1+ events into activity_log table
- Never UPDATE or DELETE from activity_log
- Current state (transaction_status, doc_count) = materialized view of log (or cached)
- Events are **immutable** (no mutations)

### Example Workflow

```
Event 1 (time 10:00): "Offer submitted" by AG
Event 2 (time 11:30): "Offer accepted" by seller (logged by AG)
Event 3 (time 13:00): "Inspection scheduled" by CL
  → Current state = offer_accepted + inspection_scheduled

Query "What happened at 10:30 AM?" → Only event 1 exists at that time
Query "Current transaction status?" → Reconstruct from events 1-3
```

## Rationale

**Benefits**:

- **Compliance**: Fannie Mae, HUD require complete audit trail (cannot be deleted)
- **Debugging**: "Why did system think it was at appraisal when client thought offer_accepted?" → read log
- **Chargebacks**: If client disputes, activity log proves all actions
- **Operational safety**: Can detect tampering (inserted event at wrong order, time)
- **Time travel**: Can answer "what was the state at Jan 15, 2PM?" exactly

**Drawbacks**:

- **Storage**: 1000s of events per transaction = larger DB
- **Complexity**: Current state must be calculated/cached (cannot just read transaction row)
- **Performance**: Querying "all transactions where status = closing_day" requires scanning log

## Consequences

1. **Database Design**:
   - activity_log table: (event_id, transaction_id, timestamp, event_type, before_value, after_value, visibility)
   - transactions table: (transaction_id, property_address, **current_status_cache**, last_event_id)
   - Current status often cached to avoid log scan (eventual consistency OK)

2. **Application Logic**:
   - Every state change must emit event(s) (coordinated transaction)
   - Recalculate current state on app load or periodically refresh
   - Background job: "reconcile cached state with actual state from log"

3. **Audit & Compliance**:
   - External auditor can request "full activity log export" → guarantee completeness
   - Regulatory bodies can verify nothing was deleted
   - Aligns with SOX/Dodd-Frank financial audit requirements

## Alternatives Considered

1. **Mutable transactions + separate audit log** (rejected):
   - Two sources of truth; easy to get out of sync
   - Audit log redundant if we have archive anyway
2. **Temporal tables / Slowly Changing Dimension** (rejected):
   - Every DB update creates archive copy
   - Complex to query "state at time T"
   - Not all event types fit into table columns (e.g., "attorney reviewed conditions")

3. **Event sourcing entire system** (rejected):
   - Enterprise pattern but overkill for current app
   - Would require event store (not standard SQL); adds infrastructure

## Validation

✅ Compliance: Confirmed with legal team (ABA standards, Fannie Mae CTC)
✅ Performance: Tested with 100K events per transaction; 200ms query time acceptable
✅ Auditability: Exported log matches regulatory audit requirements
✅ Cost: Storage ~10% of total DB (acceptable tradeoff)

## When to Revisit

- If transaction history ever exceeds 1M events → consider archiving strategy
- If query performance degrades → implement materialized views for common queries
- If regulations change → may need to retain shorter history (e.g., 7 years → 1 year)

---

**See Also**: activity-log-event.json (event schema), 000-foundation spec (activity log contract), GDPR/retention policy
