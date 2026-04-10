# Changelog: Foundation Spec

All notable changes to the Foundation specification are documented here.
Foundation (000) is the parent spec for all other features — changes here cascade to all features.

## [1.2.3] - 2026-04-10

### Added

- Documented badge system variants (green=complete, yellow=pending, blue=action-required, red=error, gray=not-started, navy=info)
- Defined 12 colour tokens normalized to Figma design system
- Added role-colour matrix (CL=teal, AG=blue, LN=gold, AT=purple, CP=navy, TC=orange)
- Specified activity log contract (every state change ≥ one event)

### Changed

- Clarified notification bell design to support role-scoped visibility
- Updated global nav bar to include Avatar dropdown (session context)
- Refined alert banner styling to match Tailwind + custom tokens

### Deprecated

- Old "Tab Navigation" pattern (replaced by sticky top nav bar in v1.2)

## [1.2.2] - 2026-03-15

### Added

- Design token system (colours, typography, shadows, spacing)
- Global navigation bar pattern (transaction status, user menu, notification bell)
- Session context requirement (transaction_id + role always in-memory)

### Fixed

- Clarified role-based access rules (no CL sees AT/CP notes, etc.)
- Specified that activity logs are append-only (immutable history)

## [1.2.1] - 2026-02-20

### Added

- Alert banner component system (info, warning, error, success variants)
- Card component layouts (horizontal, with icons and metadata)
- Badge system introduction (status indicators)

### Changed

- Renamed "User Profile" to "Session Context" for clarity

## [1.2.0] - 2026-01-10

### Added

- Defined 6 canonical roles (CL, AG, LN, AT, CP, TC)
- Established 11-stage transaction lifecycle
- Created activity log schema (events, visibility, audit trail)
- Defined global data vocabulary (transaction_id, property_address, etc.)

### Breaking Changes

- All subsequent specs MUST reference constitution.md and use canonical vocabulary
- Auth provider integration is required (no local login)

## [1.1.0] - 2025-12-01

### Added

- Core design principles (P-01 through P-07)
- Basic navigation structure and design tokens

## [1.0.0] - 2025-11-01

### Added

- Foundation spec created
- Constitutional framework established
- Role definitions and principles outlined

---

## Release Policy

**Versioning**: Semantic versioning (MAJOR.MINOR.PATCH)

- **MAJOR**: Breaking changes (new role, lifecycle stage, or principle)
- **MINOR**: New features (new component, new data field, new actor responsibility)
- **PATCH**: Fixes (clarifications, corrections, non-breaking improvements)

**Update Frequency**: Updates required when:

- Any functional requirement changes
- New badge/color/spacing token is added
- Activity log contract changes
- Session context requirements evolve
- Design system component is introduced
