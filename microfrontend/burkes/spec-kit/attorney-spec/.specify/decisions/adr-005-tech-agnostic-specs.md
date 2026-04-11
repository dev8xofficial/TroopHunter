# ADR-005: Technology-Agnostic Specifications

**Status**: Accepted
**Date**: 2026-04-12
**Decision**: All specifications describe *what* and *why*, never *how*.

## Context
Specification documents are consumed by PMs, designers, developers, and QA engineers. Including technology-specific references (framework names, API patterns, database schemas) creates coupling between specs and implementation, making specs fragile and harder to review by non-technical stakeholders.

## Decision
No specification may reference: framework names (React, Next.js, Vue), API technologies (REST, GraphQL, gRPC), database technologies (PostgreSQL, Redis, MongoDB), code patterns (hooks, middleware, reducers), or infrastructure (Docker, Kubernetes, AWS). Implementation details belong exclusively in plan.md and tasks.md files.

## Consequences
- Specs remain accessible to all stakeholders regardless of technical background
- Implementation technology can change without requiring spec updates
- Plans and tasks serve as the translation layer between specs and code
- Design tokens are referenced by name (e.g., `primary-navy`), never by raw values
