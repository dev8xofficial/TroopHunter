# 001 Authentication (Login Gateway) — Specification

## 1. Overview
The **Authentication** module serves as the primary entry point for all users attempting to access The Burkes Group ecosystem. It displays role selection and traditional email/password forms.

## 2. Capabilities
- **C-01: Role Inference / Selection**: User must pre-select their assumed role (from 7 available roles: Client, Attorney, CPA, Agent, Lender, Service, Admin).
- **C-02: Credential Verification**: User submits email and password. Focus validation on client-side format checks (valid email pattern).
- **C-03: Security Badging**: Display compliance elements (256-bit Encryption, SOC2 Compliant, MFA Enabled) to enforce trust.
- **C-04: Forgot Password Link**: Opens the `004-password-reset` flow.

## 3. UI/UX Sequence
1. Upon loading `index.html#page-1-login`, user is presented with the role grid block (`.role-grid`).
2. User selects a role (`selectRole` function). The `.role-card` is highlighted (`.selected`).
3. User enters email and password into the `.form-group` inputs.
4. User submits the form.
5. If valid, the system decides if MFA is required (routes to `002-mfa` or `003-role-routing`), based on backend response.

## 4. Dependencies
- Depends on `000-foundation` for design tokens (cards, inputs, badges).
- Directs to `002-mfa` or `003-role-routing`.

## 5. Security Context
- Passwords are never sent explicitly over HTTP; requires TLS/SSL connection.
- Passwords are obfuscated (`[type="password"]`).
