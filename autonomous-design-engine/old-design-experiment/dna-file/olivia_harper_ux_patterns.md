# Olivia Harper Homes — UX Patterns & Interaction Logic
**Target**: Production AI Generator Behavior Engine

This document defines the invisible logic, interaction states, and user psychology patterns required to replicate the exact feel of `oliviaharperhomes.com`.

---

## 1. Scroll & Reveal Mechanics

### 1.1 Storytelling Through Scrolling
- **Trigger**: Scroll position relative to viewport (`ScrollTrigger`).
- **Pattern**: Sections load initially blank or muted. As the user reaches `40%` into the viewport, content activates.
- **Implementation**: 
  - GSAP SplitText divides paragraphs into `lines`.
  - Lines transition from inactive (`#B6AB99` Sand) to active (`#313131` Charcoal).
  - Body paragraphs slide up from an `overflow: hidden` mask.

### 1.2 "Arriving to Viewport" Auto-play
- **Trigger**: Element intersects viewport.
- **Pattern**: Lottie SVG animations (like the hero title) trigger exactly once when they enter the viewport (`loop: false`).
- **Dependency**: Must wait for `document.fonts.ready` before firing to prevent layout snapping.

---

## 2. Interactive Hover States (The "Delight" Layer)

### 2.1 The Custom Cursor (`.cursor-areaolivia`)
- **Condition**: Mouse enters specific brand elements (primarily the large Footer CTA image).
- **Behavior**: System cursor disappears (`cursor: none`).
- **Visual**: A 60x60px sand-colored circle (`#B6AB99A6`) with a dark arrow appears.
- **Physics**: Does not snap to mouse instantly. Uses a Linear Interpolation (Lerp) factor of `0.15` to smoothly trail behind the mouse. Uses a spring curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) to scale up from 0 to 1 on entry.

### 2.2 Fluid Fills & Glare Effects
- **Buttons**: Hovering a CTA button triggers a background fill that rises from `bottom: 0` to `height: 100%` over 300ms. Text color simultaneously inverts.
- **Social Icons**: Hovering triggers a spring-eased scale effect (`transform: scale(0.8) -> scale(1)`) while the background fills.

### 2.3 Image Interaction
- **Project Cards**: Hovering scales the inner image by `5%` (`scale-105`) over an extremely slow duration (`1600ms`) to create a cinematic, slow-pan feel rather than a fast jerk.
- **Footer CTA**: Hovering increases the opacity of the taupe multiply-blend overlay from `0.63` to `1.0`.

---

## 3. Conversion Funnel Psychology

### 3.1 "Pull, Don't Push" Architecture
- **Pattern**: The interface never uses hard-sell language. There are no "Buy Now" or "Book a Call" buttons.
- **Funnel**: 
  1. Awe (Hero images) → 
  2. Story (Scroll reveals) → 
  3. Trust (Stat counters) → 
  4. Aspiration (Project cards) → 
  5. Action (Contact Form).

### 3.2 The Pre-Qualified Contact Form
- **Friction as a Feature**: The contact form requires users to enter their `Company / Organization` and select an `Estimated Investment Range` (e.g., "$1M – $5M").
- **UX Goal**: Filters out unqualified leads. Adds a layer of exclusivity.
- **Visuals**: Inputs use placeholder text instead of external labels (`elementor-screen-only` for accessibility) to keep the UI minimalist.

---

## 4. Brand Voice & Micro-copy

### 4.1 Tone Definitions
- **Style**: Understated, professional, measured, exclusive.
- **Keywords**: Quality, intention, long-term value, timeless, crafted.
- **Action Verbs**: "Talk", "Explore", "See". (Avoids: "Submit", "Buy", "Click").

### 4.2 Typographic Nuances
- **The Fading Whisper**: The footer tagline ("...defined by quality, intention...") wraps the latter half in a `<span color="#B6AB99">`. This creates a visual "fade out" effect, resembling a quiet, confident statement rather than a loud claim.
- **Display vs. Functional**: Emotion is carried by `F37 Bolton` (warm, serif-like curves). Function is carried by `Roboto` (mechanical, legible).

### 4.3 Divider & Wayfinding Patterns
- **The Breadcrumb Line**: Inner pages (Vision, Services, About, Contact) feature a subtle breadcrumb bar at the very top of the hero section.
- **Design**: Text reading "Olivia Harper Homes [PageName]" followed by a full-width, 1px ivory (`#EEEBE4`) horizontal line.
- **Purpose**: Creates structural grounding before the massive hero images take over the screen.

---

## 5. Responsive Degradation Patterns

### 5.1 Breakpoint Rules
- **Tablet (1024px)**: 
  - Main navigation collapses to a hamburger icon.
  - Header CTA button is hidden.
- **Mobile (767px)**:
  - Complex 2 or 3 column grids (Stats, Projects, Form) degrade to 1 column.
  - The Instagram icon in the header is replaced with an Envelope icon (prioritizing direct contact over social media browsing).

### 5.2 Performance Overrides
- Lazy loading is strictly enforced for backgrounds below the 3rd section.
- The `Awwwards` fixed side-badge remains visible but scales down appropriately.

### 5.3 Perceived Performance (Speculation Rules)
- **Strategy**: The site implements the **Speculation Rules API** for prefetching.
- **Rule**: `eagerness: "conservative"`. It prefetches document HTML for internal links on hover/interaction, excluding admin and nofollow links.
- **UX Impact**: Makes navigation between the heavy, image-rich pages feel nearly instantaneous without overburdening the initial load.

---

## 6. Structural & Psychological Architecture

### 6.1 White Space Philosophy & Content Density
- **Breathing Room**: Text never touches container edges; minimum 15-20px buffer. 
- **Density Gradient**: The top of the page is intentionally sparse (e.g., Hero sections are 90% image/negative space, 10% text). Density increases as the user scrolls, culminating in a highly dense, utilitarian footer. 
- **Asymmetry**: Body text is often strictly left-aligned within a narrow column (50-60% width), leaving vast empty space on the right to build visual tension.

### 6.2 Visual Hierarchy & F-Pattern Adaptation
- **Eye Flow**: The design exploits a modified F-pattern. A user scans the top nav, drops down to a massive display heading on the left, scrolls down to read the body text, and then hits the horizontal stats bar which forces the eye horizontally across three columns.
- **Navigational Friction**: The primary header navigation intentionally omits a "Contact" text link. It relies entirely on the isolated "Contact Us" button to create an unambiguous exit ramp.

### 6.3 Subliminal Branding Textures
- **The Monogram Arch**: On inner pages like the Vision page, massive, semi-transparent monogram arches (derived from the "OH" logo) are used as background watermarks. This creates a subliminal, architectural brand presence without using heavy colors.
