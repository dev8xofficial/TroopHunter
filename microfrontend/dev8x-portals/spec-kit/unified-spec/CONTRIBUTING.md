# Contributing

> Guidelines for contributing to the Dev8X Unified Spec-Kit.

---

## Getting Started

1. Fork the repository
2. Create a feature branch: `spec/[module-id]-[description]` (e.g., `spec/401-crm-contacts-add-tags`)
3. Make your changes following [STANDARDS.md](STANDARDS.md)
4. Submit a Pull Request using the [PR template](.github/pull_request_template.md)

---

## What Can Be Contributed

| Contribution | Process |
|-------------|---------|
| New module | File [spec-new issue](.github/ISSUE_TEMPLATE/spec-new.md), create all 13 artifacts |
| Module update | File [spec-update issue](.github/ISSUE_TEMPLATE/spec-update.md), update affected artifacts |
| Bug in spec | File [bug report](.github/ISSUE_TEMPLATE/bug-report.md) |
| Question | File [question](.github/ISSUE_TEMPLATE/question.md) |
| ADR | Add to `.specify/decisions/`, follow ADR template |
| Contract update | Update `contracts/*.yaml` with PR linking affected modules |

---

## Branch Naming

```
spec/[module-id]-[description]     → Module changes
fix/[module-id]-[description]      → Spec corrections
docs/[description]                 → Root documentation changes
chore/[description]                → Templates, workflows, tooling
```

---

## Commit Messages

```
[module-id] action: description

Examples:
[001] add: initial authentication spec
[402] update: pipeline kanban state machine transitions
[contracts] fix: access-control.yaml missing sales_rep role
[root] add: GLOSSARY.md document management terms
```

---

## Pull Request Checklist

Before submitting:

- [ ] All modified modules have 13 files
- [ ] Changelog updated with new entry
- [ ] Cross-references resolve correctly
- [ ] JSON schemas pass lint
- [ ] No UI/design content introduced
- [ ] RBAC matrix covers all 6 roles
- [ ] PR description explains the _why_, not just the _what_

---

## Review Process

1. **Author** submits PR with completed checklist
2. **CI** runs 5 validation workflows automatically
3. **Domain Owner** reviews for correctness and completeness
4. **Spec Reviewer** reviews for standards compliance
5. **Merge** requires 2 approvals + all CI checks passing
