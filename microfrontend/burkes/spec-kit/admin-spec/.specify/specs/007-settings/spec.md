---
title: 007 Settings Spec
description: Global configuration objects regulating environment integrations and security postures.
schema_version: 1.0.0
---

# 1. Module Overview
The Settings module controls the highest-level operational configurations of the platform. Data updated here directly modifies internal constants and integration keys across downstream node processes.

# 2. Config Object Definitions

### 2.1 Security Configurations (`SecuritySettings`)
* **force_mfa_global**: `boolean` (If TRUE, all users must utilize 2FA upon authentication)
* **session_timeout_minutes**: `int`
* **password_expiry_days**: `int` (0 for never)

### 2.2 Integration Keys (`IntegrationsConfig`)
Managed securely using vault or KMS mapping.
* **Stripe**: `stripe_api_key_sandbox`, `stripe_api_key_prod`
* **Twilio**: `twilio_sid`, `twilio_auth_token`
* **SendGrid**: `sendgrid_api_key`
* **DocuSign**: `docusign_integration_key`

### 2.3 Email Operations (`NotificationRules`)
* **auto_notify_clients_stage_movement**: `boolean`
* **admin_digest_frequency**: `enum` [ `daily`, `weekly`, `never` ]

# 3. API Design & Endpoints

### 3.1 Load Settings
#### `GET /api/v1/settings`
Returns current system settings configuration.
* **Security Filter**: `IntegrationsConfig` strings are obfuscated in the response model (e.g., `sk_live_****3fa`).

### 3.2 Update Settings Block
#### `PATCH /api/v1/settings`
Updates global configuration properties.
* **Payload Outline (Example for Security)**:
  ```json
  {
    "category": "security",
    "configurations": {
      "force_mfa_global": true,
      "session_timeout_minutes": 60
    }
  }
  ```
* **Audit Enforcement**: Strict compliance triggered inside the `AuditService`. Every mutation to global settings drops a `SYSTEM_SETTING_CHANGED` event containing the previous and new value, immutable.

# 4. Critical Dependencies
Settings changes necessitate a coordinated broadcast. When `force_mfa_global` flips to `true`, the interceptor middleware dynamically invalidates all non-compliant active sessions (triggering forced re-authentication).
