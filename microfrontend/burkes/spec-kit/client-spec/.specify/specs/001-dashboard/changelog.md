# Changelog: Dashboard Spec

All notable changes to the Dashboard specification are documented here.

## [1.1.2] - 2026-04-10

### Added

- Team roster widget showing all transaction professionals (with roles and contact info)
- Transaction timeline visual (11 stages with dates and responsible parties)

### Changed

- Activity feed now groups related events (document batch uploads = 1 entry)
- Quick actions panel layout adjusted for mobile (vertical stack instead of grid)

### Fixed

- Dashboard loading state was blocking other nav interactions
- Stats widgets now update in real-time without page refresh

## [1.1.1] - 2026-03-15

### Added

- Mortgage and insurance status widgets (pull from 005 and 004 specs)
- Client educational message (explains next steps in transaction)

### Changed

- Activity feed pagination: show 20 most recent events (was 10)
- Reduced chart redraw frequency (every 5s → 10s)

## [1.1.0] - 2026-02-01

### Added

- Transaction progress widget (visual indicator of 11-stage lifecycle)
- Stats summary: docs uploaded, messages unread, milestones reached
- Role-specific views (client sees different dashboard than agent)

### Breaking Changes

- Activity feed requires activity_log schema (Foundation v1.2+)
- All dashboard data must include transaction_id context

## [1.0.0] - 2026-01-01

### Added

- Dashboard spec created
- Overview layout with navigation and cards
- Activity feed widget
- Quick actions panel

---

## Release Policy

**Versioning**: Semantic versioning (MAJOR.MINOR.PATCH)

- **MAJOR**: Breaking changes (new required field, schema change)
- **MINOR**: New widgets or features added to dashboard
- **PATCH**: Fixes, UX improvements, performance optimizations

**Update Frequency**: Update when:

- New widget added to dashboard
- Activity feed contract changes (event types, visibility)
- Role-specific view logic changes
- Stats widget calculations change
