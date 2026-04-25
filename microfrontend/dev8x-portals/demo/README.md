# Dev8X Portal Demo

> **Status**: Phases 2, 3, and 4 implemented  
> **Preferred demo path**: `microfrontend/dev8x-portals/demo/`  
> **Authoritative spec source**: `spec-kit/unified-spec/`  
> **Legacy root HTML files** in `microfrontend/dev8x-portals/*.html` remain as reference-only prototypes.

## Purpose

This `demo/` directory is the organized Dev8X portal demo surface. The shared layer provides routing, shell chrome, session handling, access checks, and portal metadata. Each surface declares its routes, screens, mock data, and spec references through `manifest.json`.

## Directory Contract

```text
demo/
|-- README.md
|-- MAPPING.md
|-- SCREEN-INVENTORY.md
|-- manifest.schema.json
|-- validate-demo.mjs
|-- shared/
|   |-- css/
|   |-- data/
|   `-- js/
|-- auth/
|   |-- css/
|   |-- data/
|   |-- js/
|   |-- screens/
|   |-- main.html
|   `-- manifest.json
|-- admin/
|-- candidate/
|-- client/
`-- crm/
```

## Surface Map

| Surface | Module Range | Entry Point | Status |
| --- | --- | --- | --- |
| `auth/` | `001-005` | `auth/main.html` | Implemented |
| `admin/` | `100-108` | `admin/main.html` | Implemented |
| `candidate/` | `200-206` | `candidate/main.html` | Implemented |
| `client/` | `300-307` | `client/main.html` | Implemented |
| `crm/` | `400-408` | `crm/main.html` | Implemented |

## Rules

1. Shared-first: styles and behavior reused by multiple surfaces belong in `shared/`.
2. Manifest-driven: every surface reads route order, screen sources, data files, and `specRefs` from `manifest.json`.
3. Screen files use stable slugs such as `dashboard.html`, `lead-stacks.html`, or `forgot-password.html`; exact module mapping lives in `manifest.json`.
4. Data isolation: surface-specific mock data stays under `<surface>/data/`, while cross-surface role and portal metadata stays in `shared/data/`.
5. Spec references required: every route and screen entry must point back to at least one relevant spec module or contract file.
6. Validation lives in `validate-demo.mjs`; use it whenever a manifest, screen map, or mock-data contract changes.

## Entry Point

Use `auth/main.html` as the canonical demo entry. Because screens and manifests are fetched dynamically, preview the demo through a local static server instead of opening files from `file://`.

## Validation

- Run `npm run validate:dev8x-portals-demo` from the repo root to verify surface structure, manifest shape, screen references, spec links, data sources, and legacy reference files.
- Use `node --check` on updated surface scripts when you add or change route-specific behavior.

## Current Scope

- Auth is the shared access hub with portal routing, credential login, candidate signup, password recovery, MFA, and SSO states.
- Admin, candidate, client, and CRM all run on the shared shell and router.
- CRM now includes dashboard, contacts, pipeline, analytics, templates, lead stacks, scoring, archive, and settings.
