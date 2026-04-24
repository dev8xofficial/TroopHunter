# ADR-003: Centralized Contracts

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect

---

## Context

Cross-cutting concerns — API contracts, RBAC, events, and state machines — apply across multiple domains. Two approaches were observed in existing spec-kits:

1. **Per-module duplication** (Admin, Agent, Client kits): Each module defines its own RBAC, events, and API contracts independently. This leads to inconsistency — the same role might have different permissions in different modules' docs.

2. **Centralized declarative layer** (CRM kit innovation): YAML files define platform-wide contracts in one place. Modules reference these contracts rather than duplicating them.

---

## Decision

Adopt the CRM kit's centralized contract pattern with 4 YAML files in `contracts/`:

| File | Purpose | Format |
|------|---------|--------|
| `api.yaml` | Unified REST API manifest | OpenAPI 3.0 |
| `access-control.yaml` | RBAC matrix (all roles × all domains) | Custom YAML |
| `events.yaml` | System-wide audit events | Custom YAML |
| `interactions.yaml` | Entity state machines & transitions | Custom YAML |

**Per-module artifacts** (`rbac-matrix.md`, `activity-log-events.md`, `api-contracts.md`, `state-machines.md`) remain as the 13-file standard requires, but they:
- Provide **module-scoped detail** and human-readable documentation
- **Reference** the centralized contracts as the authoritative source
- Add module-specific context (e.g., special access rules, error handling details) not captured in the YAML

---

## Consequences

### Positive

- **Single source of truth**: RBAC for `sales_rep` is defined once, not in 9 CRM module files
- **Cross-domain consistency**: Adding a new role updates one file, affecting all domains
- **Machine-readable**: YAML contracts can generate API stubs, RBAC middleware, event handlers
- **Diff-friendly**: YAML changes in one PR show exact impact across the platform

### Negative

- **Dual maintenance**: Both centralized YAML and per-module markdown must stay synchronized
- **Complexity**: Contributors must understand the relationship between contracts and module files
- **Merge conflicts**: High-traffic contracts files may face PR conflicts

### Neutral

- Per-module files are not redundant — they add context, rationale, and module-specific details

---

## Alternatives Considered

### Alternative 1: Per-Module Only (No Central Contracts)

**Rejected Because**: The Burkes Group analysis showed this causes drift. The Admin kit's RBAC diverged from the Client kit's RBAC for the same roles.

### Alternative 2: Central Contracts Only (No Per-Module Files)

**Rejected Because**: YAML files cannot capture module-specific context, rationale, error handling details, and human-readable documentation that reviewers need.

---

## References

- [crm-vs-attorney-comparison.md](../../../../burkes/prompts/crm-vs-attorney-comparison.md) — CRM YAML innovation analysis
- [contracts/](../../contracts/) — The centralized contracts
