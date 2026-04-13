# Password Reset — Test Scenarios

## 1. Navigation from Login Screen

- **Given** I am on the login screen (`page-1-login`)
- **When** I click "Forgot your password?"
- **Then** `showScreen('page-9-reset')` executes and the reset card is displayed

## 2. Valid Email Submission

- **Given** I am on the reset request screen (`page-9-reset`)
- **When** I enter a syntactically valid email and click "Send Reset Link"
- **Then** the system transitions to `page-10-reset-success` without page reload

## 3. Invalid Email Blocked at Client

- **Given** I am on the reset request screen
- **When** I submit the form with a malformed email (e.g., `notanemail`)
- **Then** HTML5 validation prevents submission and the browser displays an inline format error

## 4. Empty Submission Blocked

- **Given** I am on the reset request screen
- **When** I click "Send Reset Link" with an empty email field
- **Then** the `required` attribute prevents submission and prompts the user to fill the field

## 5. Confirmation Screen Content

- **Given** I have successfully submitted a valid email
- **When** I land on `page-10-reset-success`
- **Then** the success icon (✉️), heading "Check your email!", and all four numbered next steps are visible

## 6. Email Enumeration Prevention

- **Given** a valid email that is NOT registered in the system
- **When** I submit it via the reset form
- **Then** the system still transitions to `page-10-reset-success` — no error indicating the address is unknown is shown

## 7. Resend Email Action

- **Given** I am on `page-10-reset-success`
- **When** I click "Resend Email"
- **Then** the system dispatches a second reset email (or queues the request) without returning to Stage 1

## 8. Back Navigation from Stage 1

- **Given** I am on `page-9-reset`
- **When** I click "← Back to Sign In"
- **Then** `showScreen('page-1-login')` executes and I return to the login gateway

## 9. Back Navigation from Stage 2

- **Given** I am on `page-10-reset-success`
- **When** I click "← Back to Sign In"
- **Then** `showScreen('page-1-login')` executes and I return to the login gateway

## 10. Reset Link Expiry

- **Given** a reset link was dispatched more than 1 hour ago
- **When** the user clicks the link
- **Then** the backend rejects the token and the user is directed to request a new reset link
