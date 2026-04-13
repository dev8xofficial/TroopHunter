# Foundation — Test Scenarios

## 1. Visual Regression
**Scenario**: Token Application
- **Given** the portal is loaded
- **When** the CSS variables are applied
- **Then** the primary blue and gold colors should match the brand guidelines precisely.

## 2. Responsive Degradation
**Scenario**: Mobile View
- **Given** a screen width of 768px
- **When** the user loads the page
- **Then** the brand panel (`.login-brand`) is hidden and the login form takes 100% width.
