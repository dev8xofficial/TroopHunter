# Single Sign-On

> **Module ID**: `005-sso`
> **Domain**: Authentication & Identity (0xx)

---

## Overview

Implements OAuth2/OIDC integration with external providers (Google) for Candidate and Client portals.

---

## Functional Requirements

### FR-005-01: Google Authentication

**Description**: The system shall allow Candidates and Clients to login via Google.

**Acceptance Criteria**:
- [ ] Implements standard OAuth2 authorization code flow
- [ ] Provisions account automatically for Candidates (if email not found)
- [ ] Refuses login for Admins (ADR-010 constraint)
