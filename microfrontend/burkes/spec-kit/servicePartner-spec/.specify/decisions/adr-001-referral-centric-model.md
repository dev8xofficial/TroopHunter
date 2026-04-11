# ADR-001: Referral-Centric Data Model

**Status**: Accepted (April 2026)
**Decision Date**: April 2026
**Last Modified**: April 2026
**Decision ID**: ADR-001

## Title

We WILL implement a referral-centric data model where the Referral is the primary entity, aggregating quotes, jobs, payments, and reviews as child objects.

## Context

The Service Partner Portal serves a single primary user type — home service partners — who interact with homeowners through agent-originated referrals. Key considerations:

- **SP (Service Partner)**: Receives referrals, sends quotes, performs jobs, earns revenue. This is the primary persona.
- **AG (Agent)**: Submits referrals on behalf of homeowners. Interacts through the Agent Portal.
- **CL (Client/Homeowner)**: Receives quotes, accepts/declines, leaves reviews after job completion.
- **AD (Admin)**: Verifies partner credentials, manages platform operations.

Unlike the Agent Portal which centres on transactions with 12 lifecycle stages, the Service Partner Portal centres on referrals with a simpler 6-stage lifecycle.

## Decision

1. The Referral is the central entity (identified by `TRX-NNNNN`).
2. Quote, Job, Payment, and Review are nested objects within a Referral.
3. Service Areas are managed independently as partner configuration.
4. The partner sees only their own referrals — no cross-partner visibility.
5. Referral IDs use the same `TRX-NNNNN` format as the Agent Portal for interoperability.

## Rationale

- **Simplicity**: A referral flows linearly (lead → quote → job → payment → review), unlike multi-stage transactions.
- **Interoperability**: Shared `TRX-NNNNN` IDs allow referral data to flow between Agent and Service Partner portals.
- **Partner-first**: Everything the partner needs is accessible from a single referral record.

## Consequences

1. Portal data model is simpler than the Agent Portal's transaction model.
2. Reporting aggregates across referrals, not transactions.
3. Service areas are managed as partner configuration, not referral metadata.

## When to Revisit

- If partners need to manage multi-service referrals (e.g., plumbing + electrical in one referral)
- If referral lifecycle grows beyond 6 stages

---

**See Also**: constitution.md (Section 4 — Referral Lifecycle), 000-foundation spec
