# Changelog — 000-foundation

**Feature ID**: [NNN-short-name]  
**Version**: 1.0  
**Last Updated**: [YYYY-MM-DD]

---

This file tracks the version history of the feature specification. Each entry documents what changed, when, and why.

---

## [1.0] — 2026-04-XX

### Added

- Initial specification created
- Feature ID: NNN-short-name
- Core user scenarios (Scenario 1, Scenario 2, etc.)
- Functional requirements (FR-NNN-01 through FR-NNN-XX)
- Data fields and state model
- Edge cases and error states
- Success criteria defined

### Changed

- N/A (initial release)

### Fixed

- N/A (initial release)

### Deprecated

- N/A

---

## [1.1] — [Future Date if Updated]

### Added

- [New FR added, new scenario, new data field, etc.]
- Example: "Added FR-NNN-05: Multi-document upload support"

### Changed

- [Requirement modified, clarification provided]
- Example: "Refined FR-NNN-03: document_status now includes 'requires-revision' state"

### Fixed

- [Typos, clarifications, link fixes]
- Example: "Clarified Scenario 2 success criteria"

### Deprecated

- [Feature or requirement marked for removal]
- Example: "Deprecated single-role message threads; all threads now include TC"

---

## [2.0] — [Future Date if Breaking Changes]

### Added

- [Major new feature added]

### Changed

- [Breaking change to existing requirements]

### Removed

- [Feature or requirement removed after deprecation period]

### Migration Guide

- [Instructions for updating dependent specs or implementations]

---

## Versioning Policy

- **Major (X.0)**: Breaking changes to requirements, data structures, or scope
- **Minor (1.Y)**: New features added (backward compatible)
- **Patch (1.0.Z)**: Clarifications, typo fixes, no new requirements

---

## How to Update This Changelog

1. When spec changes are approved (via PR review), add a new version section at the top
2. List what changed under Added / Changed / Fixed / Deprecated
3. Update "Last Updated" date
4. Update spec.md version field to match

## Format Notes

- Use present tense ("Added", "Changed", not "will add")
- Link to related specs if relevant (e.g., "Coordinate with 001-dashboard for activity log integration")
- If a change affects tests or data model, mention it (e.g., "validation-schema.json updated")
- If a change is minor (typo), use Patch version; if adding feature, use Minor; if breaking, use Major

---

See also: [STANDARDS.md](../../STANDARDS.md) (writing standards), [spec.md](./spec.md) (current spec version)

