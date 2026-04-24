# Foundation

> **Module ID**: `000-foundation`
> **Domain**: Platform Foundation (000)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Foundation module owns the canonical role registry, domain map, audit envelope, and contract discovery surfaces used by every Dev8X portal. It prevents domain drift by keeping shared definitions centralized and versioned.

---

## Actors

| Actor | Role | Interaction |
| --- | --- | --- |
| Super Admin | super_admin | Owns canonical registries and governance updates |
| HR Admin | hr_admin | Consumes global registries for admin workflows |
| Sales Rep | sales_rep | Consumes shared contracts and role definitions |
| Manager | manager | Uses shared registries for cross-portal oversight |
| System | system | Publishes immutable contracts and activity envelopes |

---

## Functional Requirements

### FR-000-01: Publish the canonical domain registry

**Description**: The system shall expose the single approved registry of platform domains, modules, and ownership boundaries.

**Acceptance Criteria**:
- [ ] Registry lists all 39 modules with their domain grouping.
- [ ] Superseded registry versions remain discoverable for audit.
- [ ] Consumers can retrieve the current contract manifest without portal-specific knowledge.

### FR-000-02: Publish the canonical role model

**Description**: The system shall expose the approved platform roles and their cross-domain meanings.

**Acceptance Criteria**:
- [ ] All six platform roles are listed with a unique role identifier.
- [ ] Role definitions align with the constitution and access-control contract.
- [ ] Changes to role definitions are versioned before publication.

### FR-000-03: Define the immutable audit envelope

**Description**: The system shall define the append-only event wrapper shared by all domains.

**Acceptance Criteria**:
- [ ] Audit envelope includes actor, entity, payload, and timestamp.
- [ ] Envelope structure is consistent across auth, admin, candidate, client, and CRM domains.
- [ ] Envelope schema is referenced by contracts/events.yaml.

---

## Data Model

### DomainRegistry

Canonical list of platform modules and their domain ownership.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| domain_code | string | Yes | enum: 000, 0xx, 1xx, 2xx, 3xx, 4xx | Domain code group |
| module_id | string | Yes | unique | Module identifier |
| module_title | string | Yes | max 255 | Module title |
| owner_role | string | Yes | enum: super_admin, hr_admin, sales_rep, manager | Owning role |
| status | string | Yes | enum: draft, validated, published, superseded | Registry record status |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

### AuditEnvelope

Shared wrapper for immutable event records.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| event_id | string | Yes | Unique event identifier | Published event id |
| event_name | string | Yes | dot.notation | Canonical event name |
| actor_role | string | Yes | platform role id | Role responsible for the event |
| entity_type | string | Yes | max 120 | Affected entity type |
| entity_id | uuid | No | Nullable for anonymous flows | Affected entity identifier |
| occurred_at | datetime | Yes | ISO-8601 | Event timestamp |

---

## Business Rules

### BR-000-01: Single source of truth

**Condition**: When a shared platform definition changes
**Action**: Update the foundation registry before downstream module specs.
**Rationale**: Constitution P-02

### BR-000-02: Append-only history

**Condition**: When a registry version is replaced
**Action**: Mark the old record as superseded rather than deleting it.
**Rationale**: Constitution P-03 and P-07

---

## State Machine

See [state-machines.md](state-machines.md) for the specification registry lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/platform/domains`
- `GET /api/v1/platform/roles`
- `GET /api/v1/platform/contracts`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `foundation.registry.read` (EVT-000-01)
- `foundation.registry.published` (EVT-000-02)
- `foundation.contracts.published` (EVT-000-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| contracts | Shared | Owns the shared contracts directory and keeps downstream references stable |
| all modules | Downstream | Every module consumes foundation definitions for roles, module ids, or audit envelope fields |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-001-unified-spec-kit.md](../../decisions/adr-001-unified-spec-kit.md)
- [adr-003-centralized-contracts.md](../../decisions/adr-003-centralized-contracts.md)
- [adr-004-13-file-module-standard.md](../../decisions/adr-004-13-file-module-standard.md)