# ADR-003: Progressive Disclosure via Stepped Modals

**Status**: Accepted (April 2026)
**Decision ID**: ADR-003

## Title

We WILL use stepped modal forms for complex workflows (transaction creation, client onboarding) to implement the Progressive Disclosure principle (P-04).

## Context

Creating a new transaction requires capturing: client selection, transaction type, property address, contract amount, stage, closing date, involved parties, and notes. Presenting all fields at once would overwhelm the agent and increase form abandonment.

## Decision

1. Complex forms use multi-section modals with clear section headers
2. Each section groups related fields (Client Info, Property Details, Involved Parties, Notes)
3. Sections are visually separated with icons and section titles
4. Required fields are marked; optional sections can be skipped
5. The agent sees the full form but can focus on one section at a time

## Rationale

- Reduces cognitive load by grouping related inputs
- Mandatory fields are clearly marked, preventing incomplete submissions
- Mirrors the mental model of transaction setup (client → property → team → notes)

## Consequences

- Modal forms are taller and may require scrolling on smaller screens
- Form validation runs per-section or on submit (not per-field real-time)
- Adding new fields requires deciding which section they belong to

---

**See Also**: constitution.md (P-04 — Progressive Disclosure), 002-transactions spec (New Transaction Modal)
