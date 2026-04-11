# Changelog — Admin Portal Spec-Kit

All notable changes to the spec-kit are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.1.0] — 2026-04-12

### Added

- **Foundation Spec (000)**: Fully populated spec.md with admin-specific session context (ADMIN/TC roles), 6-screen navigation, audit log contract, 4-variant badge system
- **All Feature Supporting Artifacts**: Replaced all 42 template stubs with production-ready, feature-specific content:
  - `changelog.md` — Concrete v1.0.0 entries for each feature (000–006)
  - `metrics.md` — Feature-specific KPIs with targets and alert thresholds
  - `risks.md` — Contextual risk registers with admin-specific mitigations
  - `rollout.md` — Phased rollout plans with feature flags and success criteria
  - `test-scenarios.md` — Component tests, edge cases, and accessibility tests
  - `validation-schema.json` — JSON Schema contracts for each feature's data model
- **ADR-004**: Role-Scoped Write Operations decision record with ADMIN/TC permission matrix
- **CODEOWNERS**: Fully populated with feature-team assignments matching gold standard pattern

### Changed

- Updated CODEOWNERS from single-line stub to comprehensive file with feature-level ownership

---

## [1.0.0] — 2026-04-11

### Added

- **Foundation Spec (000)**: Design tokens, navigation, session context, audit constraints
- **Dashboard Spec (001)**: KPI stat cards, fast paths, pending queues snippet
- **Users Spec (002)**: Complete user directory and access control workflows
- **Partners Spec (003)**: Vendor approval configurations and coverage lists
- **Transactions Spec (004)**: Global transaction tracking, status overrides
- **Documents Spec (005)**: Full document compliance approval engine workflows
- **Analytics Spec (006)**: Global KPIs, dynamic ranges, and metric aggregation definitions
- **Governance**: ARCHITECTURE, GLOSSARY, FAQ, ROADMAP, CODEOWNERS, SPEC-DRIVEN
- **Supporting Artifacts**: Scaffolded full 42 artifacts implementation across spec areas.
