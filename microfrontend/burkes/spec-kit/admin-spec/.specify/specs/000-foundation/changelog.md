# Changelog: Foundation (000)

All notable changes to the Admin Portal Foundation spec.

---

## [1.0.0] — 2026-04-11

### Added

- Design token system: 16 colour tokens, typography (Archivo/Manrope), 4 shadow levels, spacing scale
- Global navigation bar: sticky top nav, 6 screen buttons (Dashboard, Users, Partners, Transactions, Documents, Analytics), notification bell, user chip
- Session context contract: admin name, initials, role (ADMIN/TC), organisation, pending counts, unread notifications
- Audit log event contract: log_id, action_type, actor_id, target_entity_id, timestamp, reason_text
- Badge system: 4 canonical variants (active, pending, completed, error)
- Button system: btn-primary, btn-secondary, btn-gold, table-action-btn, tbl-btn-success, tbl-btn-danger
- Modal system: full-screen overlay for forms, view/edit detail modals
- Form section pattern: role-adaptive sections, form-row-2/form-row-3, required indicators
- Page layout shell: 1600px container, 32px padding, two-column layout with 380px sidebar
- Full supporting artifacts (validation schema, test scenarios, rollout, metrics, risks)
