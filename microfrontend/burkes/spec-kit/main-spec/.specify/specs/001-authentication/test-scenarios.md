# Authentication — Test Scenarios

## 1. Role Selection Persistence
- **Given** I am a user on the login screen
- **When** I click the 'Client' role card
- **Then** the card receives the 'selected' styling
- **And** the hidden role value is set to 'client'

## 2. Validation Checks
- **Given** an incomplete form
- **When** I click 'Sign In Securely'
- **Then** the browser invokes HTML5 reporting (`required` attributes)

## 3. Forgot Password Link
- **Given** I am on the login screen
- **When** I click the "Forgot your password?" link
- **Then** the `showScreen('page-9-reset')` function is executed and transitions the view.
