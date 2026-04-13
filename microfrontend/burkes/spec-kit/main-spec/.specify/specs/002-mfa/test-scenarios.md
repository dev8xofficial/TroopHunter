# MFA — Test Scenarios

## 1. Input Constraints
- **Given** I am on the MFA screen
- **When** I attempt to paste a 7-digit code
- **Then** the value is truncated to 6 digits by the browser (`maxlength="6"`).

## 2. Navigation
- **Given** I am on the MFA screen
- **When** I click 'Back to Sign In'
- **Then** `showScreen('page-1-login')` executes and the view transitions without submitting data.
