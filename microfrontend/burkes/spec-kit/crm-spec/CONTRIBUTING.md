# Contributing to the CRM Spec-Kit

Thank you for contributing to the Burkes Group CRM specification repository.

---

## Quick Start

1. Read `.specify/memory/constitution.md`
2. Read `STANDARDS.md`
3. Review the relevant feature directory under `.specify/specs/`
4. Use the templates in `.specify/templates/`
5. Update supporting artifacts together with the spec
6. Submit changes through pull request review

---

## What belongs here

| Contribution type | Expected artifact |
| --- | --- |
| New feature | `spec.md`, supporting artifacts, `plan.md`, `tasks.md` |
| Requirement update | Updated `spec.md`, `changelog.md`, and affected artifacts |
| Schema change | Updated schema, impacted feature docs, and ADR if behavior changes |
| Architecture decision | New or updated ADR in `.specify/decisions/` |
| Research input | A document in `.specify/research/` linked from the relevant spec or plan |

---

## Definition of done for a spec change

- [ ] The spec aligns with the constitution
- [ ] Supporting artifacts are updated
- [ ] Any related plan or tasks stay in sync
- [ ] Changelog entries are added
- [ ] Cross-links resolve correctly
- [ ] Compliance behavior is explicit where relevant
- [ ] Reviewers can begin implementation without requesting basic clarification

---

## Review flow

1. Product review confirms business intent and scope.
2. Architecture review confirms feasibility, dependency order, and system fit.
3. Data/compliance review is required for schema, retention, or ownership changes.
4. Approved changes may move from `review` to `approved`.

---

**Version**: 1.0
**Last Updated**: 2026-04-13
