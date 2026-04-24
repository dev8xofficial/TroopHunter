# Multi-Factor Authentication

> **Module ID**: `003-mfa`
> **Domain**: Authentication & Identity (0xx)
> **Version**: 1.0.0

---

## Overview

The MFA module implements Time-Based One-Time Passwords (TOTP) for securing accounts. Per ADR-010, MFA is currently mandatory for Admin/HR users.

---

## Functional Requirements

### FR-003-01: TOTP Setup

**Description**: The system shall allow users to configure TOTP using an authenticator app.

**Acceptance Criteria**:
- [ ] Generates a secure base32 secret
- [ ] Provides provisioning URI (QR code)
- [ ] Requires submission of a valid code to confirm setup
- [ ] Generates and returns 10 backup recovery codes

### FR-003-02: TOTP Verification

**Description**: The system shall verify TOTP codes during login.

**Acceptance Criteria**:
- [ ] Accepts 6-digit TOTP code
- [ ] Time tolerance of ±1 step (30 seconds)
- [ ] Verified codes cannot be reused (nonce handling)

### FR-003-03: Recovery Code Usage

**Description**: The system shall allow users to bypass TOTP using a backup recovery code.

**Acceptance Criteria**:
- [ ] Recovery codes are single-use
- [ ] Emits security alert event when triggered
