# ADR-001: Unified Spec-Kit Consolidation

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect

---

## Context

The Dev8X platform originally maintained specifications informally — functional logic was embedded in HTML prototypes (`auth.html`, `admin-panel.html`, `candidate-portal.html`, `client-portal.html`, `crm-portal.html`) alongside UI markup and CSS styling. There was no centralized, version-controlled repository of functional specifications, leading to:

- Business logic scattered across 5 large HTML files (totaling ~1.5 MB)
- No formal data model definitions
- No RBAC documentation
- No state machine definitions
- No API contract specifications
- UI/design concerns interleaved with functional requirements

Additionally, analysis of 7 existing Burkes Group spec-kits (Admin, Agent, Attorney, Client, Main, ServicePartner, CRM) revealed significant duplication, inconsistent naming, and varying levels of quality — with the Attorney kit scoring highest for GitHub automation and the CRM kit scoring highest for content depth.

---

## Decision

Create a **single unified spec-kit** that:

1. Extracts all functional components from the 5 HTML prototypes — strictly excluding UI, CSS, layout, and design content
2. Adopts the Attorney kit's GitHub automation pattern (5 workflows, 4 issue templates, CODEOWNERS)
3. Adopts the CRM kit's content innovations (YAML declarative contracts, phase-based deliverables)
4. Establishes a 13-file-per-module standard as the "Gold Standard"
5. Uses domain-prefixed numbering (0xx–4xx) for module organization
6. Centralizes cross-cutting concerns (RBAC, events, API, state machines) in `contracts/`

---

## Consequences

### Positive

- **Single source of truth**: All functional specs in one repository
- **Automated quality**: CI validates structure, naming, schemas, and cross-references on every PR
- **Scalable**: New domains (5xx+) can be added without restructuring
- **Tech-agnostic**: Specs can drive any implementation technology
- **Auditable**: Full version history and ADR trail

### Negative

- **Large initial investment**: 507 stub files require content population
- **Migration burden**: Existing Burkes Group kits need migration path
- **Learning curve**: Contributors must learn 13-file standard and naming conventions

### Neutral

- The 5 source HTML files are preserved as reference material but not stored in the spec-kit

---

## Alternatives Considered

### Alternative 1: Per-Portal Spec-Kits

**Description**: Maintain separate spec-kit repos for each portal (auth-spec, admin-spec, candidate-spec, client-spec, crm-spec).
**Rejected Because**: Cross-cutting concerns (auth, RBAC, events) would be duplicated across repos. The Burkes Group analysis proved this leads to drift and inconsistency (7 kits with 7 different naming conventions).

### Alternative 2: Wiki-Based Documentation

**Description**: Use GitHub Wiki or Confluence for specs.
**Rejected Because**: Wikis lack CI validation, PR review gates, and version-controlled changelogs. Quality enforcement is manual-only.

### Alternative 3: Code-Embedded Specs

**Description**: Embed specifications as code comments and README files within the implementation repo.
**Rejected Because**: Specs become coupled to implementation technology. Changes to specs require code PRs. Spec review requires engineering context.

---

## References

- [spec-kit-comparison-analysis.md](../../../../burkes/prompts/spec-kit-comparison-analysis.md)
- [crm-vs-attorney-comparison.md](../../../../burkes/prompts/crm-vs-attorney-comparison.md)
- [Constitution](../memory/constitution.md)
