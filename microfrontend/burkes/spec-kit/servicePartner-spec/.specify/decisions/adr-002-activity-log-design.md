# ADR-002: Activity Log Design

**Status**: Accepted (April 2026)
**Decision Date**: April 2026
**Last Modified**: April 2026
**Decision ID**: ADR-002

## Title

We WILL implement an append-only activity log that records all meaningful state changes across all screens, visible to the partner on their dashboard.

## Context

The platform requires an audit trail for referral actions, quote submissions, job completions, and payment receipts. Partners need visibility into their recent activity for orientation after absences.

## Decision

1. Activity log is append-only and immutable.
2. Every screen writes activity events using a canonical event structure.
3. Dashboard displays the most recent activity events.
4. Events include: referral received, quote sent, job completed, review received, payment processed.
5. Events are role-scoped — partners see only their own events.

## Rationale

- **Auditability**: Immutable log provides a clear audit trail for referral and payment disputes.
- **Orientation**: Partners can quickly see what happened since their last login.
- **Platform trust**: Transparent activity logging builds partner confidence.

## Consequences

1. Every screen feature that changes state must emit an activity event.
2. Dashboard activity feed must be refreshed when new events occur.

---

**See Also**: constitution.md (Section 2 — P-07), 000-foundation spec (FR-00-07)
