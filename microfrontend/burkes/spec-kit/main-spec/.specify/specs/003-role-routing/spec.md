# 003 Role Routing — Specification

## 1. Overview
The **Role Routing** module acts as the disclosure and authorization gate before transferring users to external sub-portals. It renders role-specific permissions and constraints.

## 2. Capabilities
- **C-01: Capability Disclosure**: Dynamically maps the user's role to a specific presentation modal (Pages 3 through 8).
  - Attorney (`page-3-attorney`)
  - CPA (`page-4-cpa`)
  - Client (`page-5-client`)
  - Agent/Lender (`page-6-agent`)
  - Service Partner (`page-7-service`)
  - Admin (`page-8-admin`)
- **C-02: Permission Rendering**: Displays "What You Can Do" and "Restrictions" explicitly using the `.role-permissions` component layout.
- **C-03: Sub-Portal Redirection**: Hard navigates via `href` to the mapped destination (`attorney.html`, `cpa.html`, `client.html`, `agent.html`, `servicePartner.html`, `admin.html`).

## 3. UI/UX Sequence
1. User completes MFA (or bypasses if trusted).
2. Backend returns user's canonical Role token.
3. System shows the `auth-screen` mapped to that token.
4. User reviews Capabilities and Restrictions.
5. User clicks the primary Call-To-Action (e.g. `Access Attorney Portal`).
6. Browser executes a full page load navigation to the sub-portal.

## 4. Security Concept
- The Main Portal DOES NOT host any transaction data. The disclosure cards are purely static information confirming what the backend permissions allow.
- Active capability checks happen exclusively inside the sub-portals.
