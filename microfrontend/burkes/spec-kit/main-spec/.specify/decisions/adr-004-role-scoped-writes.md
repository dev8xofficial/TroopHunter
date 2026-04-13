# ADR-004: Stage Updates Require Admin Approval

**Status**: Accepted (April 2026)
**Decision ID**: ADR-004

## Title

We WILL require Transaction Coordinator (TC) approval for all stage update requests submitted by agents.

## Context

Transaction stages are visible to all parties (clients, lenders, attorneys). Incorrect or premature stage changes can cause confusion, trigger automated workflows at the wrong time, and create compliance issues.

## Decision

1. Agents cannot directly update a transaction's stage
2. Agents submit a stage update request with: current stage, new stage, and a reason
3. The request is routed to the TC admin for review
4. TC can approve or reject the request
5. On approval: stage is updated, activity log event created, notifications sent
6. On rejection: agent is notified with the reason

## Rationale

- **Data Integrity**: Prevents accidental stage changes that affect downstream workflows
- **Accountability**: Two-person approval creates a clear audit trail
- **Quality Control**: TC can verify that prerequisites for the new stage are met
- **Compliance**: Regulatory requirements for supervised transaction management

## Consequences

- Stage updates are not instant — there is an approval latency (target: < 4 hours)
- Agents need visibility into their pending requests (future spec consideration)
- TC workload increases proportionally to agent activity

## Alternatives Considered

1. **Direct stage updates by agents** (rejected): Too risky for data integrity
2. **Auto-approval for forward-only moves** (rejected): Even forward moves need verification
3. **Peer agent approval** (rejected): No senior/junior hierarchy established

---

**See Also**: constitution.md (P-03 — Role-Scoped Access), 002-transactions spec (Update Stage Modal)
