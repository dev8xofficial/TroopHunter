# Changelog

> Spec-kit evolution log. All notable changes to this specification repository are documented here.

This format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2026-04-22

### Added

- Initial unified spec-kit scaffold
- 12 root documentation files (README, ARCHITECTURE, STANDARDS, GLOSSARY, FAQ, ROADMAP, CHANGELOG, CONTRIBUTING, GOVERNANCE, CODE_OF_CONDUCT, SPEC-DRIVEN, reference)
- 2 delivery phase documents (PHASE-1-DELIVERABLE, PHASE-2-DELIVERABLE)
- GitHub automation: 5 workflows, 4 issue templates, CODEOWNERS, PR template, AI prompts
- 14 artifact templates (13 module templates + ADR template)
- 4 centralized contract files (api.yaml, access-control.yaml, events.yaml, interactions.yaml)
- 21 JSON Schema stub files
- 39 module directories with 13 artifact stubs each (507 files total)
- 5 domain groups: Auth (0xx), Admin (1xx), Candidate (2xx), Client (3xx), CRM (4xx)
- Unified constitution
- 10 ADR stubs
- Reference archive directory

### Domain Coverage

| Domain | Modules | Source |
|--------|---------|--------|
| Auth (0xx) | 001–005 | `auth.html` |
| Admin (1xx) | 100–108 | `admin-panel.html` |
| Candidate (2xx) | 200–206 | `candidate-portal.html` |
| Client (3xx) | 300–307 | `client-portal.html` |
| CRM (4xx) | 400–408 | `crm-portal.html` |
