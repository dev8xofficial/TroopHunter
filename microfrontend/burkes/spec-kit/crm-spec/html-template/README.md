# Burkes CRM HTML Template

Static HTML deliverable generated from the `crm-spec` spec-kit.

## Files

- `index.html` - interactive CRM shell with all spec-defined screens
- `contracts.html` - reference page for schemas, lifecycle, access rules, events, and interaction flows
- `assets/styles.css` - shared presentation layer based on the spec tokens
- `assets/app.js` - route switching, tabs, overlays, mobile sidebar, and role-aware state handling

## Coverage

- Shell and navigation from `layout.yaml` and `components/nav.yaml`
- Colors, type, spacing, radii, and shadows from `design.tokens.yaml`
- Screen manifests from `screens/*.yaml`
- Access model from `access_control.yaml`
- Guided modals and drawers from `interactions.yaml`
- Event relationships from `events.yaml`
- Top-level data models from `schemas/*.json`

## Preview

Open `index.html` directly in a browser, or serve this directory with any static file server.
