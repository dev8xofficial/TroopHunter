# Frequently Asked Questions — Admin Portal Spec-Kit

## General

### What is a spec-kit?
A spec-kit is a structured repository of feature specifications, supporting artifacts, schemas, and governance documents that together define *what* a product does and *why*. It is the single source of truth for product requirements.

### How is the Admin Portal different from the Agent Portal?
The Admin Portal is a system-wide oversight tool for Transaction Coordinators (TC) to manage users, ensure compliance by approving/rejecting documents and stage updates, and analyze platform-wide analytics. It spans all data across the platform, unlike the Agent portal which is restricted to assigned objects.

### How many screens does the Admin Portal have?
Six screens plus a foundation layer:
| # | Screen |
|---|--------|
| 000 | Foundation |
| 001 | Dashboard |
| 002 | Users |
| 003 | Partners |
| 004 | Transactions |
| 005 | Documents |
| 006 | Analytics |

---

## Roles

### What is the difference between an Agent and a TC?
- **AG (Agent)**: Primary day-to-day user. Owns their clients and listings.
- **TC (Transaction Coordinator / Admin)**: Super-user that governs system settings and approves critical state transitions requested by Agents.

---

**Version**: 1.0
**Last Updated**: April 11, 2026
