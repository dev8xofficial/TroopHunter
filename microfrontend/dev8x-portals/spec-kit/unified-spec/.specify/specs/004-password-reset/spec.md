# Password Reset

> **Module ID**: `004-password-reset`
> **Domain**: Authentication & Identity (0xx)

---

## Overview

Handles secure password recovery via email links.

---

## Functional Requirements

### FR-004-01: Initiate Reset

**Description**: The system shall allow users to request a password reset link.

**Acceptance Criteria**:
- [ ] Takes email address
- [ ] Rate limited to 3 per hour
- [ ] Does not reveal if email exists

### FR-004-02: Reset Execution

**Description**: The system shall allow users to set a new password using a valid token.

**Acceptance Criteria**:
- [ ] Token is single-use and expires in 1 hour
- [ ] Validates password complexity
- [ ] Emits `auth.password.reset` event
