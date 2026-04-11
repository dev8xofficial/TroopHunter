# Spec-Driven Development (SDD)

## What is SDD?

Spec-Driven Development is a methodology where **specifications are the single source of truth** for product requirements. Code is an implementation of specs — not the other way around.

### The SDD Cycle

```
Constitution → Specs → Plans → Tasks → Code → Tests → Validation
      ↑                                                    │
      └────────────────────────────────────────────────────┘
                    (Feedback loop)
```

### Key Principles

1. **Specs before code**. No feature is built without an approved spec.
2. **Constitution governs all**. Every spec must align with the constitution's principles (P-01 through P-07).
3. **Technology-agnostic specs**. Specs describe *what* and *why* — never *how*.
4. **Atomic traceability**. Every requirement (FR-NN-NN) traces to test cases, implementation tasks, and acceptance criteria.
5. **Documentation as code**. Specs live in version control alongside the codebase, reviewed and merged through the same PR process.

---

## SDD in the Admin Portal

### Artifact Chain

| Artifact | Purpose | Lives In |
|----------|---------|----------|
| **Constitution** | Immutable principles and constraints | `.specify/memory/constitution.md` |
| **Spec** | Feature requirements | `.specify/specs/NNN-name/spec.md` |
| **Supporting artifacts** | Validation, testing, rollout, metrics, risks | `.specify/specs/NNN-name/*.md, *.json` |
| **Plan** | Implementation phases | `.specify/specs/NNN-name/plan.md` (generated) |
| **Tasks** | Developer-ready work items | `.specify/specs/NNN-name/tasks.md` (generated) |
| **Schemas** | Data contracts | `.specify/schemas/*.json` |
| **ADRs** | Design decisions | `.specify/decisions/adr-NNN-*.md` |

### Workflow

1. **Product Manager** opens a feature request issue
2. **Spec Author** writes `spec.md` using the template + Copilot prompts
3. **PM + Tech Lead** review and approve the spec
4. **Architect** generates `plan.md` from the spec (using plan prompt)
5. **Tech Lead** generates `tasks.md` from the plan (using tasks prompt)
6. **Developers** implement tasks, referencing FRs for acceptance criteria
7. **QA** validates against `test-scenarios.md`
8. **Ops** rolls out per `rollout.md`, monitoring `metrics.md`
9. **Feedback** flows back into spec updates → changelog → next version

---

## Benefits

- **Single source of truth**: No "it was in the Slack thread" — it's in the spec
- **Reduced ambiguity**: Clear acceptance criteria prevent scope creep
- **Auditable decisions**: ADRs explain *why*, not just *what*
- **Faster onboarding**: New team members read specs, not legacy code
- **Automated validation**: CI workflows verify spec structure and schema compliance

---

**Version**: 1.0
**Last Updated**: April 11, 2026

