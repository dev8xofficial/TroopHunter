# Glossary — Admin Portal Spec-Kit

All spec authors and reviewers must use these terms consistently. If a term is missing, submit a PR to add it.

---

## Business Terms

| Term | Definition |
|------|-----------|
| **Admin** | An Administrator or Transaction Coordinator (TC) viewing this portal. Reference admin: Sarah Burke. |
| **Approval Queue** | Central queue where admins review and approve/reject agent stage update submissions or documents. |
| **Global Override** | The act of an admin forcing a state change that ignores standard portal rules or locks. |
| **Platform Integrity** | Ensuring all data changes follow policy, are audited, and maintain proper cross-agent boundaries. |
| **Zip Code Coverage** | The service area defined for a partner, determining which agents/clients see that partner. |
| **Transaction Coordinator (TC)** | An admin role that manages portal setup, approves stage updates, and has access to all transactions. |

---

## Technical Terms

| Term | Definition |
|------|-----------|
| **Action Log** | An append-only, immutable audit trail of all meaningful state changes across all screens. |
| **Feature ID** | A zero-padded identifier for a spec (e.g., `000-foundation`, `001-dashboard`). |
| **Foundation** | The base layer (spec 000) that all other specs inherit — navigation, tokens, session. |
| **FR** | Functional Requirement — a numbered requirement in a spec (format: `FR-NN-NN`). |
| **Modal** | A full-screen overlay containing a form or detail view. |

---

**Version**: 1.0
**Last Updated**: April 11, 2026
