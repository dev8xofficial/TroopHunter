# Olivia Harper Homes — Visual Blueprint
**Target**: Production AI UI Generator / Asset Rendering Engine

This document defines the strict visual guidelines, photography rules, iconography, and graphic elements required to accurately render the visual aesthetics of the `oliviaharperhomes.com` brand.

---

## 1. Photography & Imagery Direction

### 1.1 Architectural Photography (Hero & Projects)
- **Composition**: Cinematic, wide-angle, highly structured lines.
- **Aspect Ratios**: 
  - Hero Backgrounds: `16:9` (Cinematic, full viewport width, 80-94vh height)
  - Project Cards: `3:2` (Landscape, classic gallery proportion)
  - Supporting Ratios (System Presets): `1:1` (Square), `4:3`, `2:3`, `9:16`
- **Lighting**: Natural, warm sunlight. High contrast but not overexposed. Emphasizes texture (stone, wood, glass).
- **Post-Processing Overlay Rules**:
  - **Footer CTA Images**: Must use a multiply blend overlay (`mix-blend-multiply`) in Warm Taupe (`#96847A`) at `63%` opacity (`#96847AA1`) to allow white text to pop while maintaining brand color dominance.
  - **Project Cards**: Apply a bottom-to-top gradient (`from-black/80 to-transparent`) covering the bottom 50% of the image to ensure high contrast for the title text.
  - **Contact Form Background**: Use `#B6AB99` (Muted Sand) with a precise `4% black` overlay (`rgba(0,0,0,0.04)`) to create a slightly darker, focused inset area.
  - **Header Nav Tint**: When transparent over photography, apply a `14%` warm tint (`#E2E1E126`) behind the header text to ensure readability without a solid bar.

### 1.2 Human & Team Photography
- **Dual Representation Strategy**: Every team member must have two photos.
- **Photo A (The Formal Portrait)**:
  - Ratio: `3:4` (Vertical/Portrait)
  - Style: Professional, looking at the camera, warm lighting.
- **Photo B (The Working Candid)**:
  - Ratio: `16:9` (Landscape)
  - Style: Looking away, interacting with plans or sites, active posture.
- **Background Context**: Place team photos against the primary Warm Taupe (`#96847A`) background to create a "warm embrace" effect.

---

## 2. Iconography System

### 2.1 Interface Icons (Line Art & Typographic)
- **Style**: Ultra-minimalist, geometric line art. `1px` or `1.5px` stroke weights.
- **Color**: Matches the text/UI context (usually `#313131` Charcoal or `#EEEBE4` Ivory).
- **Key Assets**:
  - **Hamburger Menu**: 3-line horizontal stack, equal width.
  - **Close X**: Diagonal cross, sharp edges.
  - **Phone Icon**: Custom SVG on the contact page.
  - **Location Pin**: Custom outline SVG.
  - **Typographic Bullet**: `●` (Small filled circle) used strictly for editorial wayfinding links ("● Last projects", "● See more").

### 2.2 Social & Utility Icons (Font Awesome)
- **Engine**: Font Awesome 6.
- **Usage**:
  - `fab fa-instagram` (Header & Footer)
  - `fab fa-whatsapp` (Footer)
  - `far fa-envelope` (Mobile header & Submit button)
- **Interaction**: Icons sit inside a circular container. On hover, the container scales and fills with a background color, while the icon scales down slightly and bounces via a cubic-bezier spring.

### 2.3 The Custom Cursor
- **Anatomy**: A custom SVG arrow pointing Northeast.
- **Housing**: Encased in a `60x60px` circle colored `#B6AB99A6` (Muted Sand at 65% opacity).
- **Shadow**: `#000000` at `20%` opacity, `y: 5px`, `blur: 15px`.
- **Purpose**: Appears only on highly interactive, wide areas (like the footer CTA) to signal "click to explore".

---

## 3. Graphic Elements & Decorative Accents

### 3.1 The Brand Monogram Arches
- **Usage**: Subliminal background texturing on inner pages (e.g., the Vision page).
- **Execution**: Large, semi-transparent stylized "OH" arch shapes.
- **Coloring**: Tone-on-tone. For an ivory background, use a slightly darker ivory/sand color to create an emboss/watermark effect rather than a highly visible graphic.

### 3.2 The Lottie Title & Scroll Animations
- **Asset**: `timeless-residences.json` (Lottie animation).
- **Rendering**: Must be rendered as `svg` to maintain infinite vector crispness.
- **Animation Speed**: Played at `1.6x` speed for a sharp, confident reveal rather than a sluggish draw.
- **Scroll Bounce Indicator**: A `4x4px` ivory dot inside a pill-shaped container, featuring an infinite `2.2s` slide-and-fade animation loop (`.animate-[scroll_2.2s_infinite]`).

### 3.3 Lines and Dividers
- **Inner Breadcrumbs**: A `1px` solid line spanning the full width of the content container. Color: `#EEEBE4` (Warm Ivory) when used over dark elements, or `#313131` at `20%` opacity over light elements.
- **Footer Rule**: A thin horizontal rule separating the brand tagline from the utility link columns.

---

## 4. Typography as a Visual Element

### 4.1 Display Font (F37 Bolton)
- **Visual Weight**: Very light (`300` for body) or normal (`400` for headings). Never bold.
- **Scale Contrast**: Extreme ratio between Display headings (`75px`) and Body text (`17px`) — a `4.4x` multiplier.
- **Leading**: Ultra-tight on headings (`1em`) to create a solid visual block; relaxed on body text (`1.4em`) for breathability.

### 4.2 Utility Font (Roboto)
- **Role**: Functional data, UI navigation, tiny labels.
- **Scale**: `17px` for nav, down to `13px` for badges and `10px` for the "● See more" bullets.

---

## 5. The Awwwards Badge
- **Position**: Fixed to the right edge of the viewport, centered vertically (`top: 50%`, `transform: translateY(-50%)`).
- **Visuals**: Vertical text reading "W. Nominee". Pure white background, pure black text. Provides high-contrast punctuation against the warm, muted tones of the rest of the site.
