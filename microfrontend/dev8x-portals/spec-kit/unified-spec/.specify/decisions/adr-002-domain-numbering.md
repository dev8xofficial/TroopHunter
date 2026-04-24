# ADR-002: Domain Numbering Scheme

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect

---

## Context

The unified spec-kit contains 39 modules across 5 functional domains. Modules need a consistent identification scheme that:

- Communicates domain membership at a glance
- Supports future domain expansion without renumbering
- Sorts correctly in filesystem listings
- Works in requirement IDs (`FR-DDD-NN`) and event IDs (`EVT-DDD-NN`)

---

## Decision

Adopt a **3-digit, century-based numbering scheme** where the hundreds digit identifies the domain:

| Range | Domain | Capacity |
|-------|--------|----------|
| `000` | Foundation (cross-cutting) | 1 module |
| `001–099` | Authentication & Identity | 99 modules |
| `100–199` | HR Admin Panel | 100 modules |
| `200–299` | Candidate Portal | 100 modules |
| `300–399` | Client Portal | 100 modules |
| `400–499` | CRM / Sales | 100 modules |
| `500–599` | Reserved (future expansion) | 100 modules |
| `600–999` | Reserved (Burkes Group integration or new platforms) | 400 modules |

Each module directory is named `NNN-kebab-case-description` (e.g., `102-admin-pipeline`).

---

## Consequences

### Positive

- **Visual grouping**: `ls .specify/specs/1*` shows all Admin modules
- **ID clarity**: `FR-402-03` immediately identifies CRM Pipeline, requirement 3
- **Growth headroom**: 100 modules per domain exceeds foreseeable needs
- **Cross-platform ready**: 500+ range reserved for Burkes Group or new platforms

### Negative

- **Fixed domain slots**: If a domain needs 100+ modules (unlikely), numbering requires ADR revision
- **Sparse numbering**: Most domains use < 10 of 100 available slots

---

## Alternatives Considered

### Alternative 1: Sequential Numbering (001, 002, 003...)

**Rejected Because**: No visual domain grouping. Module 015 could be Admin or Candidate — you'd have to look it up.

### Alternative 2: String Prefixes (auth-001, admin-001)

**Rejected Because**: Inconsistent sorting. `admin-001` sorts before `auth-001` alphabetically, not logically. String prefixes also complicate ID formats (`FR-auth-001-01` is verbose).

---

## References

- [ADR-001: Unified Spec-Kit](adr-001-unified-spec-kit.md)
- [ARCHITECTURE.md](../../ARCHITECTURE.md)
