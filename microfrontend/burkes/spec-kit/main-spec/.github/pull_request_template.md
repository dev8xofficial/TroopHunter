# Spec Update: [Brief Description]

## Description

<!-- Describe your changes and why you're making them -->

## Type of Change

- [ ] New spec (feature not previously covered)
- [ ] Spec update (modifying existing feature)
- [ ] Typo or clarity improvement
- [ ] Governance/process change
- [ ] Template or infrastructure update

## Related Issue(s)

Closes #

## Spec(s) Affected

<!-- Which specs does this change impact? -->

- [ ] 000-foundation
- [ ] 001-dashboard
- [ ] 002-transactions
- [ ] 003-documents
- [ ] 004-clients
- [ ] 005-messages
- [ ] 006-calendar
- [ ] 007-partner-referrals
- [ ] 008-reports
- [ ] Multiple specs (describe dependencies)

## Checklist

- [ ] **Spec Structure**: All required sections present (see STANDARDS.md)
  - [ ] Overview
  - [ ] Problem
  - [ ] Goals & Non-Goals
  - [ ] Actors & Responsibilities
  - [ ] User Scenarios
  - [ ] Functional Requirements (FR-NNN-NN format)
  - [ ] Data & State
  - [ ] Edge Cases
  - [ ] Success Criteria
  - [ ] Dependencies

- [ ] **Template Compliance**: Uses approved templates
  - [ ] spec-template.md for new/updated specs
  - [ ] plan-template.md if implementation plan included
  - [ ] Other templates where applicable

- [ ] **Changelog Updated**:
  - [ ] `changelog.md` updated with version and date
  - [ ] Version follows semver (v1.0, v1.1, v1.2, etc.)

- [ ] **Dependencies Validated**:
  - [ ] No circular dependencies created
  - [ ] All referenced specs exist
  - [ ] 000-foundation is upstream (no deps on others)

- [ ] **Schemas & Validation**:
  - [ ] Data model matches transaction-model.json
  - [ ] New schemas conform to JSON Schema draft-07
  - [ ] Validation rules are clear and testable

- [ ] **Standards Compliance**:
  - [ ] Naming conventions: feature_ids (000-XXX), requirements (FR-NNN-NN), roles (CL, AG, LN, AT, CP, TC)
  - [ ] Tone: clear, non-technical, jargon-free
  - [ ] No implementation details (no code, no framework names)
  - [ ] References constitution.md where applicable
  - [ ] No broken links

- [ ] **Cross-References**:
  - [ ] Links to related specs work correctly
  - [ ] Glossary terms used consistently
  - [ ] Design system tokens referenced (not hard-coded values)

- [ ] **Review Ready**:
  - [ ] Spell-checked
  - [ ] Markdown formatting correct
  - [ ] No sensitive data (passwords, keys, tokens)
  - [ ] Ready for PM and Tech Architecture review

## Test Coverage (if applicable)

- [ ] Test scenarios defined (test-scenarios.md)
- [ ] Edge cases covered
- [ ] Role-based access patterns verified
- [ ] State transitions validated

## Risk Assessment

- [ ] No known conflicts with existing specs
- [ ] Backwards compatible or deprecation clearly noted
- [ ] Migration path documented if breaking change
- [ ] Risk register updated (risks.md) if applicable

## Additional Notes

<!-- Anything else reviewers should know? -->

---

## Approvals Required

- [ ] **Product/PM Team**: Confirms business requirements and priority
- [ ] **Technical Architecture Team**: Validates implementation feasibility and dependencies
- [ ] **Author**: Confirms all checklist items complete

---

## Reviewer Tips

- Review against `STANDARDS.md` for consistent tone and structure
- Check `constitution.md` — all specs must honor principles P-01 through P-07
- Validate schema changes in `.specify/schemas/`
- Ensure dependencies don't create circular references
- Verify actor roles (CL, AG, LN, AT, CP, TC) are correctly scoped

Thank you for helping improve the spec-kit! 🚀
