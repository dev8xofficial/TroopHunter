# 000 Foundation — Specification

## 1. Overview
The **Foundation** module establishes the design system, structural css variables, and global container standards used across the Main Portal (Authentication hub).

## 2. Core Tokens
Derived directly from the CSS in `index.html`:
- **Colors**:
  - Primary: `--primary-navy` (`#1a3a52`), `--primary-gold` (`#fdb913`), `--accent-blue` (`#2d5a7b`)
  - Semantic: `--success-green`, `--warning-orange`, `--error-red`
  - Neutral Scale: `--neutral-50` through `--neutral-900`
- **Typography**: 
  - Headings: `Archivo`
  - Body: `Manrope`
- **Shadows**:
  - `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

## 3. Global Components
- **Buttons (`.btn`)**: Unified structure with primary (gradient) and secondary (outline) variants.
- **Alert Banners (`.alert-banner`)**: Used for security and permissions warnings.
- **Form Inputs (`.form-input`)**: Consistent padding, border, and focus states.

## 4. Container Layouts
- **Auth Screen (`.auth-screen`)**: Default `display: none; min-height: 100vh;`, active is `display: block`.
- **Login Container (`.login-container`)**: Grid layout for desktop, single column for mobile.
- **Brand Panel (`.login-brand`)**: Gradient background with floating background patterns and benefit bullets.

## 5. Acceptance Criteria
- All elements must use CSS variables for colors and shadows.
- Typography must load correctly from Google Fonts.
- Responsive breakpoints (max-width 1024px and 768px) must degrade gracefully.
