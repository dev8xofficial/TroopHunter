# MFA — API Contracts
> **Module ID**: `003-mfa`

### POST /api/v1/auth/mfa/setup
Returns secret and QR code URI.

### POST /api/v1/auth/mfa/verify-setup
Validates initial setup code.

### POST /api/v1/auth/mfa/recovery
Use a recovery code to bypass TOTP.
