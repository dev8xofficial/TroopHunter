# ADR-005: Technology-Agnostic Specifications

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect

---

## Context

The source HTML prototypes are built with vanilla HTML, CSS, and JavaScript. The target implementation may use React, Next.js, Vue, Angular, or any other framework. Specifications must not constrain implementation technology choices.

Additionally, Constitution Principle P-01 mandates: "Specifications define _what_ the system does, never _how_ it is built."

---

## Decision

All spec-kit artifacts shall be **technology-agnostic**:

1. **No framework references**: Never mention React, Next.js, Vue, Angular, Express, NestJS, Django, or any specific framework
2. **No library references**: Never mention Zod, Prisma, Sequelize, Mongoose, or any specific library
3. **No language references**: Never mention JavaScript, TypeScript, Python, Java, or any specific programming language
4. **No database references**: Never mention PostgreSQL, MongoDB, Redis, or any specific database engine
5. **No infrastructure references**: Never mention AWS, GCP, Azure, Docker, or any specific infrastructure platform
6. **No UI references**: Never mention CSS, Tailwind, Material UI, or any design framework (enforced by Constitution G-10)

**Permitted abstractions**:
- "The system shall validate the TOTP code" (not "use the `speakeasy` npm package")
- "Store the session token" (not "save to Redis")
- "Send an email notification" (not "use SendGrid API")
- "Persist to durable storage" (not "INSERT INTO PostgreSQL")

---

## Consequences

### Positive

- **Implementation freedom**: Engineering can choose the best technology for each domain
- **Future-proof**: Specs survive technology migrations (e.g., moving from REST to GraphQL)
- **Cross-team usable**: Backend, frontend, mobile, and QA all read the same specs
- **No vendor lock-in**: Specs don't tie the platform to specific services

### Negative

- **Less prescriptive**: Engineers must make implementation decisions not covered by specs
- **Potential ambiguity**: "Persist to durable storage" doesn't specify consistency guarantees

---

## Alternatives Considered

### Alternative 1: Technology-Specific Specs

**Rejected Because**: Specs become obsolete during technology migrations. A "Next.js App Router spec" is useless if the team moves to Remix.

---

## References

- [Constitution](../memory/constitution.md) — Principle P-01, Guardrail G-10
- [STANDARDS.md](../../STANDARDS.md) — Quality checklist item: "No technology-specific references"
