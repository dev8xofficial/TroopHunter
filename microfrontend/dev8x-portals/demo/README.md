# Dev8X Portal Demo

> **Status**: Phase 1 — Baseline & Mapping  
> **Authoritative spec source**: `spec-kit/unified-spec/`  
> **Do not modify** `.specify/`, `contracts/`, `schemas/`, or `.github/` in the spec-kit.

---

## Purpose

This `demo/` directory contains the organised, screen-level interactive prototypes for the Dev8X multi-portal platform. It supersedes the legacy single-file HTML prototypes (`auth.html`, `admin-panel.html`, `candidate-portal.html`, `client-portal.html`, `crm-portal.html`) which are kept at their original locations **for parity checking only**.

Every demo screen is traceable to one or more spec modules via `specRefs` in each surface's `manifest.json`.

---

## Directory Contract

```
demo/
├── README.md                  ← You are here
├── MAPPING.md                 ← Source-to-target migration matrix
├── SCREEN-INVENTORY.md        ← Full screen list with module refs
├── manifest.schema.json       ← JSON Schema for all manifest.json files
│
├── shared/                    ← Reused across all five surfaces
│   ├── css/
│   │   ├── tokens.css         ← Design tokens (colours, spacing, type scale)
│   │   ├── shell.css          ← App chrome: nav, sidebar, top-bar
│   │   └── components.css     ← Shared UI primitives
│   ├── js/
│   │   ├── router.js          ← Client-side hash router
│   │   ├── nav.js             ← Navigation helpers
│   │   ├── auth-guard.js      ← RBAC-based route guard
│   │   └── mock-loader.js     ← Loads JSON mock data into screens
│   └── data/
│       ├── roles.json         ← Platform roles from access-control.yaml
│       └── portals.json       ← Portal config from 002-portal-routing
│
├── auth/                      ← Modules 001–005
│   ├── css/                   ← Auth-specific overrides only
│   ├── js/                    ← Auth-specific behaviour
│   ├── data/                  ← Mock sessions, SSO payloads
│   ├── screens/               ← One .html file per screen
│   ├── main.html              ← Surface entry point
│   └── manifest.json          ← Screen inventory + specRefs
│
├── admin/                     ← Modules 100–108
│   ├── css/
│   ├── js/
│   ├── data/
│   ├── screens/
│   ├── main.html
│   └── manifest.json
│
├── candidate/                 ← Modules 200–206
│   ├── css/
│   ├── js/
│   ├── data/
│   ├── screens/
│   ├── main.html
│   └── manifest.json
│
├── client/                    ← Modules 300–307
│   ├── css/
│   ├── js/
│   ├── data/
│   ├── screens/
│   ├── main.html
│   └── manifest.json
│
└── crm/                       ← Modules 400–408
    ├── css/
    ├── js/
    ├── data/
    ├── screens/
    ├── main.html
    └── manifest.json
```

---

## Surface–Module Map

| Demo Surface | Module Range | Entry Point           |
| ------------ | ------------ | --------------------- |
| `auth/`      | 001–005      | `auth/main.html`      |
| `admin/`     | 100–108      | `admin/main.html`     |
| `candidate/` | 200–206      | `candidate/main.html` |
| `client/`    | 300–307      | `client/main.html`    |
| `crm/`       | 400–408      | `crm/main.html`       |

---

## Folder Contract Rules

1. **Shared-first**: If a CSS rule or JS behaviour applies to two or more surfaces it belongs in `shared/`.
2. **No duplication**: Surface folders import from `shared/`; they do not copy shared files.
3. **Screen granularity**: Each screen corresponds to one spec module or a clearly bounded sub-flow within a module. Screen filenames use `NNN-<slug>.html` where `NNN` is the module ID.
4. **Manifest required**: Every surface must have a valid `manifest.json` before any screen is considered "added". See `manifest.schema.json` for required fields.
5. **specRefs required**: Every screen entry in `manifest.json` must reference at least one spec module ID or contract path.
6. **Mock data isolated**: Surface-specific JSON lives in `<surface>/data/`. Shared reference data (roles, portals) lives in `shared/data/`.
7. **Spec-kit is read-only**: The demo never writes to or restructures `spec-kit/unified-spec/`.

---

## Build Phases

| Phase | Scope                              | Status         |
| ----- | ---------------------------------- | -------------- |
| 1     | Baseline & Mapping                 | ✅ In Progress |
| 2     | Shared Foundation + Auth Surface   | ⬜ Pending     |
| 3     | Admin, Candidate, Client Surfaces  | ⬜ Pending     |
| 4     | CRM Surface + Validation Hardening | ⬜ Pending     |

---

## Entry Point

Open `auth/main.html` in a browser. Select a portal and role to enter the corresponding surface demo.

---

## Spec-Kit Reference

| Resource       | Path                                                    |
| -------------- | ------------------------------------------------------- |
| Module specs   | `spec-kit/unified-spec/.specify/specs/`                 |
| API contracts  | `spec-kit/unified-spec/contracts/api.yaml`              |
| RBAC matrix    | `spec-kit/unified-spec/contracts/access-control.yaml`   |
| Events         | `spec-kit/unified-spec/contracts/events.yaml`           |
| State machines | `spec-kit/unified-spec/contracts/interactions.yaml`     |
| Constitution   | `spec-kit/unified-spec/.specify/memory/constitution.md` |
