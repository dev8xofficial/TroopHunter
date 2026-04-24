# Portal Routing

> **Module ID**: `002-portal-routing`
> **Domain**: Authentication & Identity (0xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-22

---

## Overview

The Portal Routing module acts as the "front door" to the Dev8X platform. It implements the pre-authentication portal selector interface and directs users to the correct authentication flow based on their relationship with the platform (Candidate, Client, or Admin/Staff).

---

## Functional Requirements

### FR-002-01: Portal Selection

**Description**: The system shall provide a pre-authentication portal selector.

**Acceptance Criteria**:
- [ ] Displays options for Candidate, Client, and Admin portals
- [ ] User selection directs to the specific portal's login flow
- [ ] Remembers the last selected portal in local storage for default selection on return visits

### FR-002-02: Auth Requirement Retrieval

**Description**: The system shall retrieve portal-specific authentication requirements via API.

**Acceptance Criteria**:
- [ ] Returns required auth methods per portal
- [ ] Returns whether registration is allowed for the portal

### FR-002-03: Post-Login Redirection

**Description**: The system shall redirect authenticated users to their portal's entry point.

**Acceptance Criteria**:
- [ ] Candidate routes to `200-candidate-dashboard`
- [ ] Client routes to `300-client-dashboard`
- [ ] HR Admin routes to `100-admin-dashboard`
- [ ] Sales Rep routes to `400-crm-dashboard`
