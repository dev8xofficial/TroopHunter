# The Burkes Group Admin System - Glossary

## Domain Concepts

**Administrator**
The system-level authority responsible for platform governance, issue mitigation, and overriding state conflicts spanning across multiple domain silos.

**Document**
A verified digital artifact bound to a specific user profile (e.g., license) or a transaction (e.g., deed). Its lifecycle runs through initial upload, review queueing, and final status (approved/rejected).

**Service Partner**
An external vendor categorized by trade (e.g., Plumbing, Roofing) approved to conduct business within specific coverage zip codes on the platform.

**Transaction**
The definitive source of truth representing a physical real estate lifecycle or asset maneuver (Purchase, Sale, Refinance, Divorce). It orchestrates exactly one target property, multiple participating users, and a sequential multi-stage state machine.

**Urgent Item**
A heuristically flagged system entity (Transaction, Document, User) whose state SLA is approaching violation, demanding immediate administrative intervention to prevent workflow blockage.

**Verification Request**
A formalized approval workflow triggered when high-risk states occur (e.g., Attorney confirming escrow), routed to the Admin queue for secondary ratification.
