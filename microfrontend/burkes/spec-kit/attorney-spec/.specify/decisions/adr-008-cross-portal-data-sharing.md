# ADR-008 — Cross-Portal Data Sharing via Shared Backend (No Direct Portal Integration)

**Status**: Accepted
**Date**: 2026-04-12
**Deciders**: Architecture Lead, Product Lead, Engineering Lead
**Spec Context**: ARCHITECTURE.md §7 (Integration Points), 000-foundation (FR-00-01)

---

## Context

The Burkes Group operates three portals:
- **Agent Portal**: Used by real estate agents to manage transactions, documents, clients, and communications.
- **Attorney Portal** (this spec-kit): Used by closing attorneys to verify transactions, review documents, manage clients, and ensure compliance.
- **Client Portal**: Used by homebuyers to track their purchase.

All three portals operate on the same underlying transaction data. For example:
- An agent uploads a Purchase & Sales Agreement in the Agent Portal.
- The attorney must review that document in the Attorney Portal.
- The client tracks the transaction status in the Client Portal.

This means the portals are not isolated systems — they share data. We needed to decide the architectural pattern for this sharing.

---

## Decision

**No portal has a direct API dependency on another portal.**

All shared data flows through a **single shared backend** (Transaction API, Document Store, Activity Log). Each portal reads and writes to the backend independently. The portals are not aware of each other at the integration layer.

```
Agent Portal  ──►  Shared Backend  ◄──  Attorney Portal
                        │
                        ▼
                  Client Portal
```

Specifically:
- The Attorney Portal reads documents uploaded by agents via the **Document Store**, not via the Agent Portal's API.
- The Agent Portal reads verification status updated by attorneys via the **Transaction API**, not via the Attorney Portal's API.
- The Client Portal reads all status via the **Transaction API** and **Document Store**.

The Activity Log is an exception: all three portals write to the same Activity Log. But they read from it only within their own scope (filtered by actor role and assigned transaction IDs).

---

## Alternatives Considered

### Option A: Direct portal-to-portal API calls
The Attorney Portal calls the Agent Portal's API to fetch agent-uploaded documents. The Agent Portal calls the Attorney Portal to read verification status.

**Rejected**: Creates tight coupling between portal release cycles. If the Agent Portal API changes, the Attorney Portal breaks. The portals are operated by different user groups and may evolve independently.

### Option B: Event-driven messaging between portals
Portals communicate via an event bus (e.g. Kafka, SQS). The Attorney Portal subscribes to "document_uploaded" events from the Agent Portal.

**Rejected for V1**: Appropriate for high-scale systems, but introduces significant infrastructure complexity for a portal that starts with a small attorney user base. Shared backend is sufficient for current scale. Event-driven can be adopted in a future ADR as volume grows.

### Option C: Shared database layer (portals share tables directly)
All portals share the same database schema and read/write directly to shared tables.

**Rejected**: Removes backend abstraction. Schema changes in the shared backend would require coordinated updates across all three portal teams simultaneously. The backend API layer provides the necessary abstraction.

---

## Consequences

**Positive**:
- Portal teams can be developed, deployed, and released independently.
- The shared backend is the authoritative data contract — all portals see consistent data.
- Adding a fourth portal (e.g. Title Company Portal) requires no changes to existing portal APIs.

**Negative**:
- The shared backend becomes a critical dependency. Backend downtime affects all three portals simultaneously.
- Data that needs to flow quickly between portals (e.g. attorney approval immediately visible in the Client Portal) depends on the backend's propagation speed, not direct portal communication.

**Mitigations**:
- Backend availability SLA must be defined at the infrastructure level and communicated to all portal teams.
- Near-real-time propagation requirements (if any) should be resolved by the backend team via their own caching/notification layer, not by re-introducing direct portal dependencies.

---

## Cross-Portal Data Contract (Attorney Portal Perspective)

| Data | Source | The Attorney Portal Reads Via |
|------|--------|-------------------------------|
| Transaction records | Agent Portal uploads | Transaction API |
| Agent-submitted documents | Agent Portal uploads | Document Store |
| Loan documents | Lender submissions | Document Store |
| Verification results | Attorney Portal writes | Transaction API (own writes) |
| Notification count | Notification Service | Notification API |
| Activity events from agents | Agent Portal writes | Activity Log (read own scope) |

The Attorney Portal **never reads** agent portal state directly. The Transaction API is the single source of truth for all transaction and document state across portals.
