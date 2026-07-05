# 🧬 Design DNA — Olivia Harper Homes

> **Source**: [oliviaharperhomes.com](https://oliviaharperhomes.com/)
> **Industry**: Luxury Real Estate / Homebuilding (South Florida)
> **Design Agency**: [Bangluxor Agency](http://bangluxor.agency)
> **Extracted**: June 2026 — from source code, Elementor Kit CSS, and multi-page visual analysis

---

## 1. Tech Stack & Platform

| Layer | Technology | Version |
|---|---|---|
| **CMS** | WordPress | 6.9.4 |
| **Page Builder** | Elementor Pro | 4.1.1 / 3.35.1 |
| **Theme** | Hello Elementor (canvas template) | 3.4.6 |
| **Animation Engine** | GSAP (GreenSock) | Custom widgets |
| **Animation Format** | Lottie (SVG renderer) | via Elementor widget |
| **Slider** | Swiper.js | v8.4.5 |
| **SEO** | Rank Math | Active |
| **Custom Widgets** | Unlimited Elements for Elementor (Premium) | Multiple custom widgets |
| **Dynamic Content** | JetEngine | 3.8.4.1 |
| **Icon Library** | Font Awesome 6 | via UE plugin |
| **jQuery** | jQuery + jQuery Migrate | 3.7.1 / 3.4.1 |

> [!NOTE]
> The homepage uses `elementor_canvas` template (no theme header/footer), while inner pages use the default theme template with Elementor's Theme Builder for header/footer. This is a key architectural decision enabling full design control on the homepage.

---

## 2. Color System

### 2.1 Primary Brand Palette (from Elementor Kit `post-7.css`)

These are the **exact CSS custom property values** extracted from the Elementor Kit:

```css
/* ── Elementor Global Colors ── */
--e-global-color-primary:   #96847A;   /* Warm Taupe — Brand anchor, footer bg, overlays */
--e-global-color-secondary: #B6AB99;   /* Muted Sand — Decorative text, inactive scroll reveals */
--e-global-color-text:      #313131;   /* Charcoal — Primary body text */
--e-global-color-accent:    #424242;   /* Dark Gray — Nav hover, active elements */
--e-global-color-be8821f:   #EEEBE4;   /* Warm Ivory — Page background, hover states, line colors */
--e-global-color-81af2a9:   #FFFFFF;   /* Pure White — Nav text on homepage hero */
```

### 2.2 Extended Color Usage Map

| Token | Hex | Usage |
|---|---|---|
| **Page Background** | `#EEEBE4` | Dominant surface color across all pages — warm off-white |
| **Hero Overlay** | `#E2E1E126` | Translucent warm tint over header nav background (14% opacity) |
| **Warm Taupe** | `#96847A` | Footer background, CTA sections, image overlay on hover (multiply blend) |
| **Muted Sand** | `#B6AB99` | Scroll text animation inactive color, decorative large text, stat counters |
| **Charcoal** | `#313131` | Active scroll-reveal text, body paragraph text |
| **Dark Gray** | `#424242` | Nav hover/active states, subtle accents |
| **Pure White** | `#FFFFFF` | Homepage hero nav text, text on dark backgrounds, social icon colors |
| **Deep Black** | `#000000` | Paragraph text in some sections (`.p-1`) |
| **Clone Text** | `#EEEBE4` | GSAP animated text clones for rolling text effect |
| **Line Color** | `#EEEBE4` | Hover line under animated rolling text (CSS variable `--line-color`) |
| **Overlay Opacity** | `0.63` | Image overlay in footer/CTA sections with multiply blend mode |

### 2.3 Color Psychology & Brand Positioning

```
┌─────────────────────────────────────────────────────────┐
│  WARM NEUTRALS SPECTRUM                                 │
│                                                         │
│  #EEEBE4 ─── #B6AB99 ─── #96847A ─── #424242 ─── #313131  │
│  Ivory      Sand       Taupe      Dk Gray    Charcoal  │
│  (BG)       (Decor)    (Brand)    (Accent)   (Text)    │
│                                                         │
│  Strategy: Zero chromatic color. Entire palette is      │
│  warm neutral tones — communicates timelessness,        │
│  luxury, understated sophistication.                    │
└─────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Zero-Chromatic Design Decision**: The entire website uses ZERO saturated/chromatic colors. No blues, greens, or reds. This is an intentional luxury branding choice — warm neutrals signal timelessness, sophistication, and understated wealth. The only "color" comes from photography.

---

## 3. Typography System

### 3.1 Font Stack (from Elementor Kit CSS)

```css
/* ── Primary Typography (Display/Headings) ── */
--e-global-typography-primary-font-family:    "F37 Bolton";
--e-global-typography-primary-font-size:      75px;
--e-global-typography-primary-font-weight:    normal;    /* 400 */
--e-global-typography-primary-line-height:    1em;       /* Tight */

/* ── Secondary Typography (Sub-headings) ── */
--e-global-typography-secondary-font-family:  "F37 Bolton";
--e-global-typography-secondary-font-size:    65px;
--e-global-typography-secondary-font-weight:  400;
--e-global-typography-secondary-line-height:  1em;

/* ── Text Typography (Body) ── */
--e-global-typography-text-font-family:       "F37 Bolton";
--e-global-typography-text-font-size:         17px;
--e-global-typography-text-font-weight:       300;       /* Light */
--e-global-typography-text-line-height:       1.4em;

/* ── Accent Typography (Navigation/UI) ── */
--e-global-typography-accent-font-family:     "Roboto";
--e-global-typography-accent-font-size:       17px;
--e-global-typography-accent-font-weight:     normal;    /* 400 */
--e-global-typography-accent-line-height:     (inherited);
```

### 3.2 Font Specimens

| Role | Font | Weight | Size | Line-Height | Usage |
|---|---|---|---|---|---|
| **Hero Display** | F37 Bolton | 400 (Normal) | 75px | 1em (tight) | "Timeless residences", hero headlines |
| **Section Titles** | F37 Bolton | 400 | 65px | 1em | "Our Vision", "Our Services", "Our Last Projects" |
| **Body Text** | F37 Bolton | 300 (Light) | 17px | 1.4em | Descriptions, paragraphs, long-form copy |
| **Navigation** | Roboto | 400 (Normal) | 17px | — | Nav links, button labels, UI text |
| **Stat Numbers** | F37 Bolton | 300 (Light) | ~65px+ | — | "98%", "$85MM", "87%" counter displays |
| **Footer Tagline** | F37 Bolton (Italic) | — | ~36px | — | "Decades of combined experience..." |
| **Labels/Tags** | Roboto | 400 | ~13px | — | "Completed project", "Current developments" badges |

### 3.3 About F37 Bolton

> [!TIP]
> **F37 Bolton** is a premium, proprietary display typeface by F37 Foundry. It features:
> - Elegant, humanist sans-serif with subtle warmth
> - Slightly rounded terminals giving an approachable yet refined feel
> - Used across ALL text roles (display, body, captions) — creating extreme typographic consistency
> - Self-hosted (not Google Fonts) — a premium design choice
>
> **Roboto** (Google Fonts) is used only for navigation and UI elements — a deliberate contrast providing mechanical precision for functional text against Bolton's warmth for brand expression.

### 3.4 Typographic Hierarchy Strategy

```
LEVEL 1  ─  Hero Display     ─  F37 Bolton 75px / 1em / Normal
LEVEL 2  ─  Section Heading  ─  F37 Bolton 65px / 1em / 400
LEVEL 3  ─  Sub-heading      ─  F37 Bolton 36px / — / 400
LEVEL 4  ─  Body Text        ─  F37 Bolton 17px / 1.4em / 300 (Light)
LEVEL 5  ─  UI/Nav Text      ─  Roboto 17px / — / 400
LEVEL 6  ─  Small/Labels     ─  Roboto 13px / — / 400
```

> **Design Decision**: Extremely tight `1em` line-height on display text creates a dense, impactful headline presence. Body text uses comfortable `1.4em` for readability. This contrast between tight headlines and relaxed body text is a hallmark of modern luxury web design.

---

## 4. Spacing & Layout Architecture

### 4.1 WordPress/Elementor Spacing Scale

```css
--wp--preset--spacing--20: 0.44rem;   /* ~7px */
--wp--preset--spacing--30: 0.67rem;   /* ~11px */
--wp--preset--spacing--40: 1rem;      /* 16px */
--wp--preset--spacing--50: 1.5rem;    /* 24px */
--wp--preset--spacing--60: 2.25rem;   /* 36px */
--wp--preset--spacing--70: 3.38rem;   /* 54px */
--wp--preset--spacing--80: 5.06rem;   /* 81px */
```

### 4.2 Content Width System

```css
--wp--style--global--content-size: 800px;     /* Narrow reading width */
--wp--style--global--wide-size:   1200px;     /* Full content width */
--wp--style--block-gap:           24px;       /* Default block gap */
```

### 4.3 Container & Section Spacing

| Element | Padding | Notes |
|---|---|---|
| **Outer Page Wrapper** | `15px` all sides | Creates the signature "inset frame" effect |
| **Hero Container** | Inherits 15px frame | Inside the 15px wrapper |
| **Header/Navbar** | `0px top/bottom`, `15px left/right` | Flush to hero top, padded sides |
| **Footer CTA Section** | `0px top`, `20px bottom/left`, `0px right` | Asymmetric — text hugs left |
| **Section Gap** | `0px` (footer sections) | Tight section-to-section joins |
| **Nav Item Padding** | `10px left/right` | Minimal navigation spacing |

### 4.4 Layout Grid Architecture

```
┌──────────────────────────────────────────────────────┐
│  15px INSET FRAME (all sides)                        │
│  ┌────────────────────────────────────────────────┐  │
│  │  HEADER (flex-row, align-center)               │  │
│  │  [Nav Links]  [Logo Center]  [CTA + Social]    │  │
│  ├────────────────────────────────────────────────┤  │
│  │  HERO (min-height: 94vh, border-radius: 15px) │  │
│  │  Full-bleed background with rounded corners    │  │
│  │  ┌───────────────────────┐                     │  │
│  │  │ Lottie Animation      │ ← Text reveal      │  │
│  │  │ "Timeless residences" │                     │  │
│  │  │ [Scroll Icon]         │                     │  │
│  │  │ [Scroll to explore]   │                     │  │
│  │  └───────────────────────┘                     │  │
│  ├────────────────────────────────────────────────┤  │
│  │  CONTENT SECTIONS (stacked, full-width)        │  │
│  ├────────────────────────────────────────────────┤  │
│  │  SLIDESHOW / CTA SECTION                       │  │
│  ├────────────────────────────────────────────────┤  │
│  │  FOOTER (20px rounded, overflow hidden)        │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### 4.5 Key Layout Decisions

| Decision | Implementation | Rationale |
|---|---|---|
| **15px Page Inset** | `padding: 15px` on outermost container | Creates a "gallery frame" effect — content feels curated, like a photo in a mat |
| **94vh Hero** | `min-height: 94vh` on hero container | Not quite full-screen — reveals a hint of the next section, encouraging scroll |
| **Flex-based Layout** | All containers use `e-flex` (Elementor flex) | No CSS Grid — everything is flex-based for maximum Elementor compatibility |
| **Three-column Header** | `[Nav] [Logo] [CTA+Social]` — flex row | Logo is centred with nav left and actions right — symmetrical, editorial |

---

## 5. Border Radius & Shape Language

### 5.1 Radius Values

| Element | Radius | CSS |
|---|---|---|
| **Hero Section** | `15px` | `border-radius: 15px 15px 15px 15px` |
| **Navbar Background** | `15px` | `border-radius: 15px 15px 15px 15px` |
| **Footer Wrapper** | `20px` | `border-radius: 20px 20px 20px 20px` |
| **Project Cards** | `15px` (estimated) | Rounded corners on image cards |
| **CTA Buttons** | `0px` (rectangular) | Sharp-edged buttons — deliberate contrast |
| **Social Icons** | Circular | Rounded icon containers |
| **Mouse Scroll Indicator** | `50px` (pill) | Fully rounded scroll indicator |

### 5.2 Shape Philosophy

> **Soft Containers, Sharp Buttons**: The design uses softly rounded containers (15–20px) for sections and cards, but keeps CTA buttons with sharp/zero radius. This creates a visual hierarchy where containers feel welcoming and organic, while buttons feel precise and actionable. This is a sophisticated luxury design pattern.

---

## 6. Animation & Motion Design

### 6.1 Animation Library Stack

| Engine | Usage | Trigger |
|---|---|---|
| **GSAP (GreenSock)** | Text rolling animation, scroll text reveal, character-by-character animations | Viewport entry, hover |
| **Lottie (SVG)** | Hero title "Timeless residences" text animation | Viewport arrival (`arriving_to_viewport`) |
| **CSS Transitions** | Button hovers, nav underlines, social icon glares | Hover, focus |
| **CSS Keyframes** | Mouse scroll indicator bounce | Infinite loop |
| **Elementor Pro** | Sticky header, motion effects, float animations, shrink on logo hover | Scroll, hover |

### 6.2 Detailed Animation Inventory

#### GSAP Text Rolling (Custom Widget: "JPTV Texto Rodante GSAP")
```css
/* Character-by-character text rolling on hover */
.trg-char { display: block; will-change: transform; }
.trg-char.clone {
    position: absolute; top: 0; left: 0;
    color: #EEEBE4;                /* Clone appears in ivory */
    pointer-events: none;
}
.trg-line {
    background-color: var(--line-color);  /* #EEEBE4 */
    transform: scaleX(0);                /* Scales in on hover */
}
```
- Used for: "Scroll to explore" text on homepage hero
- Effect: Each character rolls upward revealing a clone underneath + underline scales in

#### Scroll Text Reveal (Custom Widget)
```css
/* Inactive state */
data-active-color="#313131"     /* Charcoal when revealed */
data-inactive-color="#B6AB99"   /* Sand when unrevealed */
data-reveal-type="lines"       /* Reveals by line */
data-reveal-speed="50"
data-animation-easing="power1.out"
data-animation-start="40"      /* 40% viewport trigger */
data-animation-end="30"
```
- Used for: Long description text on homepage
- Effect: Text transitions from muted sand (#B6AB99) to charcoal (#313131) line-by-line as user scrolls

#### Text Appearance Animation (Custom Widget: "Texto aparición sutil animado")
```css
.mask { overflow: hidden; }  /* Lines slide up from hidden */
.p-1 { color: #000; }
```
- Used for: Body paragraphs that reveal with subtle upward slide

#### Mouse Scroll Indicator
```css
@keyframes scroll {
    0%   { opacity: 0; }
    10%  { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(15px); opacity: 0; }
}
/* Duration: 2.2s, easing: cubic-bezier(.15,.41,.69,.94), infinite */
```

#### Creative Button Hovers (Btn-7 style — primary pattern)
```css
/* Bottom-to-top fill on hover */
.uc_btn-7::after {
    height: 0; left: 0; bottom: 0; width: 100%;
}
.uc_btn-7:hover:after {
    height: 100%;  /* Fills upward */
}
/* All transitions: 0.3s (fast, responsive feel) */
```

#### Social Icons Glare Effect
```css
.uc_social-button {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
    /* ↑ Spring/bounce easing — overshoots slightly */
}
.uc_social-button::before {
    /* Color fill rises from bottom on hover */
    top: 100% → top: 0%;
}
.uc_social-button i {
    transform: scale(0.8);  /* Icons start slightly shrunk */
    /* Spring to scale(1) on hover */
}
```

#### Logo Interaction
```css
/* Elementor "shrink" animation on logo hover */
.elementor-animation-shrink  /* Applied to main logo image */
```

#### Lottie Animation Config
```json
{
    "source": "media_file",
    "play_speed": 1.6,
    "trigger": "arriving_to_viewport",
    "renderer": "svg",
    "start_point": 0,
    "end_point": 100
}
```

### 6.3 Motion Design Principles

| Principle | Implementation |
|---|---|
| **Scroll-Driven Narrative** | All content reveals are triggered by scroll position — the page tells a story as you scroll down |
| **Subtle Over Flashy** | Animations are understated (opacity fades, line-by-line reveals) — nothing jarring |
| **Spring Easing** | Social icons use spring easing `cubic-bezier(0.31, -0.105, 0.43, 1.59)` for organic feel |
| **GSAP Power1** | Scroll text uses `power1.out` easing — smooth deceleration |
| **Performance** | `will-change: transform` used on animated characters; Lottie renders as SVG |
| **No Page Transitions** | Standard page navigation (no SPA-style route transitions) |

---

## 7. Component Patterns

### 7.1 Navigation Header

```
┌─────────────────────────────────────────────────────────────┐
│  [Projects  Services  About Us  Vision]   [LOGO]   [CTA] [IG] │
│   ← Roboto 17px, white on hero          Center     Right →  │
│   Underline slide animation on hover     SVG logo           │
│   Active state: #EEEBE4 color                               │
└─────────────────────────────────────────────────────────────┘
```

**Key Details:**
- **Layout**: Three-column flex row — nav left, logo center, actions right
- **Homepage Header**: Transparent/semi-transparent (`#E2E1E126`) over hero image, white text
- **Inner Page Header**: Opaque background, sticky behavior
- **Nav Pointer**: `e--pointer-underline` with `e--animation-slide` — underline slides in from left
- **Hamburger**: Collapses at tablet breakpoint (`elementor-nav-menu--dropdown-tablet`)
- **Logo**: SVG format with `shrink` hover animation

### 7.2 Hero Section Pattern

**Homepage (Canvas Template):**
- Full-viewport Lottie animation for "Timeless residences"
- Background slideshow with multiple luxury property images
- Animated scroll indicator (mouse icon) + "Scroll to explore" rolling text
- Tags: "Architectural • Crafted • Considered" — inline icon list with circle bullets
- Min-height: 94vh with 15px border-radius

**Inner Pages (Vision, Services, About Us):**
- Full-width hero with background image
- Overlay with brand name "Olivia Harper Homes [Page]" breadcrumb bar
- Large serif/display heading ("Our Vision", "Our Services")
- Description text overlay at bottom of hero
- Floating image inset (rotated/offset) on Vision page

### 7.3 Statistics/Metrics Section

```
┌────────────────────┬────────────────────┬────────────────────┐
│       98%           │      $85MM         │       87%          │
│  Sale price to     │  Million in        │  repeat investor   │
│  list price ratio  │  current devs      │  participation     │
│                    │                    │                    │
│  F37 Bolton ~65px  │  F37 Bolton ~65px  │  F37 Bolton ~65px  │
│  #B6AB99 (muted)   │  #B6AB99 (muted)   │  #B6AB99 (muted)   │
│  Light (300)       │  Light (300)       │  Light (300)       │
└────────────────────┴────────────────────┴────────────────────┘
```
- Three-column grid, separated by implied vertical dividers
- Large stat numbers in muted sand (#B6AB99)
- Small descriptive text underneath

### 7.4 Project Cards (Projects Page)

```
┌──────────────────────────────┐
│  [Completed project] badge   │  ← Small rounded tag, top-left
│                              │
│                              │
│  ┌──── Property Image ────┐  │
│  │                        │  │
│  │                        │  │
│  │  1716 S. Bayshore Dr   │  │  ← White text, bottom-left overlay
│  │  • See more            │  │  ← Circle bullet + link
│  └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```
- Two-column grid layout
- Full-bleed imagery with dark gradient overlay at bottom
- Status badge: "Current developments" or "Completed project"
- Property name in white overlaid at bottom
- "See more" link with circle bullet (●)
- Filter tabs at top: "Completed project" | "Current developments"

### 7.5 Service Accordion/Cards (Services Page)

```
┌──────────────────────────────────────────────────────────┐
│  • Property acquisition and development                   │
│  ┌─────────────────┐ ┌──────────────────────────┐        │
│  │  [A] Icon        │ │  Property Image          │        │
│  │  Description     │ │                          │        │
│  │  text here...    │ │                          │        │
│  └─────────────────┘ └──────────────────────────┘        │
└──────────────────────────────────────────────────────────┘
```
- Expandable sections with titled headers
- Two-column layout inside: text left, image right
- Alternating background colors (white/taupe)
- Alphabetical index icons (A, B, C...) in taupe squares

### 7.6 Team Profile Section (About Us)

```
┌─────────────────────────────┐ ┌─────────────────────────────┐
│  Jack Echterling             │ │  John Schamy                 │
│  Co-Founder                  │ │  Co-Founder                  │
│  ┌──────────────────────┐   │ │  ┌──────────────────────┐   │
│  │  Portrait Photo       │   │ │  │  Portrait Photo       │   │
│  │  (Cropped, 3:4 ratio) │   │ │  │  (Cropped, 3:4 ratio) │   │
│  └──────────────────────┘   │ │  └──────────────────────┘   │
│  ┌──────────────────────┐   │ │  ┌──────────────────────┐   │
│  │  Working Photo        │   │ │  │  Working Photo        │   │
│  │  (Full composition)   │   │ │  │  (Full composition)   │   │
│  └──────────────────────┘   │ │  └──────────────────────┘   │
│  Bio text...                │ │  Bio text...                │
└─────────────────────────────┘ └─────────────────────────────┘
```
- Two-column side-by-side profiles
- Name in large display font (F37 Bolton)
- Two photos per person: formal portrait + working candid
- Background: warm taupe (#96847A) for the section

### 7.7 Footer Pattern

```
┌──────────────────────────────────────────────────────────┐
│  [CTA Section — "Talk to Us" with background image]       │
│  border-radius: 20px, overflow: hidden                   │
│  bg: #96847A with image overlay (0.63 opacity, multiply) │
├──────────────────────────────────────────────────────────┤
│            [Logo — Large centered SVG]                    │
│       "Decades of combined experience,                    │
│        shaping homes defined by quality,                  │
│        intention, and long-term value."                   │
│        ← Italic/decorative, partially faded text          │
├──────────────────────────────────────────────────────────┤
│  Navigation    Legal           Last Projects   Contact   │
│  About Us      Privacy Policy  1000 89 St...   305-336.. │
│  Services      Cookies Policy  1710 S. Bay...  4770 Bis..│
│  Projects      Terms of Svc    1716 S. Bay...  [WA] [IG] │
│  Services      Accessibility   Normandy...              │
│  Vision                                                  │
├──────────────────────────────────────────────────────────┤
│  2026 Web design by Bangluxor                            │
└──────────────────────────────────────────────────────────┘
```

### 7.8 CTA Button Styles

| Variant | Background | Text | Border | Hover Effect |
|---|---|---|---|---|
| **Primary (Header)** | Transparent | White (#FFF) | 1px solid white | Bottom-to-top fill (uc_btn-7) |
| **Primary (Content)** | Transparent/Dark | Dark text | Border | Bottom-to-top color fill |
| **Icon + Text** | Transparent | Brand text | — | ● Circle icon + text "Last projects" |
| **Social Icon** | Shadow (`0 0 30px rgba(0,0,0,0.05)`) | White icon | — | Color fill rises from bottom, icon springs to full scale |

---

## 8. Image & Photography Direction

### 8.1 Photography Style

| Aspect | Direction |
|---|---|
| **Subject Matter** | Ultra-luxury Miami waterfront homes, interiors, and team portraits |
| **Tone** | Warm, natural light — golden hour preferred |
| **Composition** | Architectural — clean lines, symmetry, wide angles |
| **Color Grading** | Warm, slightly desaturated — matches the warm neutral palette |
| **Portraits** | Professional but approachable — business casual in tropical settings |
| **Interior Shots** | Staged, aspirational — open floor plans, ocean views |

### 8.2 Image Treatment

| Treatment | CSS | Usage |
|---|---|---|
| **Hero Background** | `background-size: cover`, `object-fit: cover` | Full-bleed hero images |
| **Overlay** | `opacity: 0.63`, `mix-blend-mode: multiply` | Footer CTA image overlay in taupe |
| **Hover Overlay** | `--overlay-opacity: 0 → 1` on hover | Footer section reveals taupe overlay |
| **Rounded Corners** | `border-radius: 15px` | Applied to image containers, not images directly |
| **Image Slideshow** | Swiper.js slideshow for hero backgrounds | Multiple property images cycle |
| **Aspect Ratios** | 3:2 (landscape), 3:4 (portrait) | Consistent ratios across grid cards |

### 8.3 Logo Assets

| Variant | File | Usage |
|---|---|---|
| **Homepage Logo** | `Logo-Olivia-Harper.svg` (512×227) | White/light version for hero overlay |
| **Inner Pages Logo** | `Logo-2-2.svg` (512×250) | Dark version for light backgrounds |
| **Icon Mark** | Monogram icon above wordmark | Circular "OH" monogram |
| **Favicon** | `cropped-Favicon-*.png` (32/180/192/270) | Multiple sizes for all devices |

---

## 9. Interaction Design Patterns

### 9.1 Scroll Experience

| Stage | Trigger | Effect |
|---|---|---|
| **Page Load** | Automatic | Lottie animation plays "Timeless residences" title reveal |
| **Hero Scroll Hint** | Continuous | Mouse icon animates with infinite bounce |
| **Content Reveal** | 40% viewport | Text reveals line-by-line from sand (#B6AB99) to charcoal (#313131) |
| **Text Appearance** | Viewport entry | Body paragraphs slide up from hidden (`.mask { overflow: hidden }`) |
| **Rolling Text Hover** | Mouse hover | Characters roll upward with clone animation + underline scales in |

### 9.2 Hover States

| Element | Default | Hover |
|---|---|---|
| **Nav Links** | `#FFFFFF` (hero) / `#313131` (inner) | `#EEEBE4` / `#424242` + underline slide-in |
| **Logo** | Normal scale | Shrink animation (Elementor built-in) |
| **CTA Buttons** | Transparent bg | Color fills bottom-to-top (0.3s transition) |
| **Social Icons** | `scale(0.8)` + shadow | `scale(1)` with spring easing + color fill |
| **Footer CTA** | Image visible (overlay 0.63) | Full taupe overlay (opacity 1) |
| **Project Cards** | Normal | (Image zoom or overlay — standard pattern) |

### 9.3 Navigation UX

- **Desktop**: Horizontal nav, left-aligned — 4 items (Projects, Services, About Us, Vision)
- **Tablet**: Collapses to hamburger menu
- **Mobile**: Full hamburger with custom SVG icons (open: 3-line, close: X)
- **Active State**: Current page highlighted with underline + color change
- **Pointer Style**: Underline with slide animation

---

## 10. Responsive Design Strategy

### 10.1 Breakpoint Architecture

| Breakpoint | Device | Key Changes |
|---|---|---|
| **Desktop** | > 1024px | Full layout, all animations, hover effects |
| **Tablet** | ≤ 1024px | Nav collapses to hamburger, CTA button hidden |
| **Mobile** | ≤ 767px | Single column, social icon changes to envelope, CTA hidden |

### 10.2 Visibility Toggles

```css
/* Desktop-only elements */
.elementor-hidden-mobile        /* CTA button, Instagram icon */
.elementor-hidden-tablet        /* Instagram icon */

/* Mobile-only elements */
.elementor-hidden-desktop       /* Envelope/contact icon (replaces IG) */
.elementor-hidden-tablet        /* Envelope/contact icon */
```

> **Design Decision**: On mobile, the Instagram social icon in the header is replaced with an envelope/contact icon — prioritizing direct contact over social media on smaller screens. This is a conversion-focused responsive decision.

### 10.3 Lazy Loading Strategy

```css
/* Deferred background images for below-fold sections */
.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded) {
    background-image: none !important;
}
/* Stricter thresholds for shorter viewports */
@media screen and (max-height: 1024px) { nth-of-type(n+3) }
@media screen and (max-height: 640px) { nth-of-type(n+2) }
```

---

## 11. SEO & Structured Data

### 11.1 Meta Strategy

| Element | Implementation |
|---|---|
| **Title Format** | `[Page Name] - Olivia Harper Homes` |
| **Meta Description** | Descriptive, keyword-rich (luxury, South Florida, real estate) |
| **Open Graph** | Full implementation with image, title, description |
| **Twitter Cards** | `summary_large_image` format |
| **Schema.org** | Organization, WebSite, WebPage, Article, Person, Place, ImageObject |
| **Canonical URLs** | Properly set on all pages |
| **Robots** | `follow, index` with no content restrictions |

### 11.2 Structured Data (JSON-LD)

```
Organization → Place (Miami, FL 33137)
    ↓
WebSite → SearchAction (site search enabled)
    ↓
WebPage → Article (with author, dates, images)
    ↓
Person (author) → worksFor Organization
```

---

## 12. Brand Identity & UX Philosophy

### 12.1 Design Principles (Inferred)

| Principle | Evidence |
|---|---|
| **Understated Luxury** | Zero chromatic colors; let photography carry the visual weight |
| **Editorial Storytelling** | Scroll-driven narrative; content reveals progressively |
| **Architectural Precision** | 15px grid inset; consistent radius system; symmetrical layouts |
| **Warmth Over Coldness** | Warm taupe palette instead of typical cold luxury (black/gold) |
| **Photography-First** | Minimal UI chrome; large image areas; subtle overlays |
| **Typographic Authority** | Premium self-hosted font (F37 Bolton) used across all text levels |
| **Motion as Narrative** | Every animation serves the story — not decorative but narrative |
| **Trust Through Numbers** | Stats section with verifiable metrics (98%, $85MM, 87%) |
| **Personal Connection** | Team photos in both formal and working contexts |
| **Location Anchoring** | Miami address prominently displayed; project locations named |

### 12.2 Target Audience Signals

| Signal | Design Choice |
|---|---|
| **Ultra-High Net Worth** | $85MM in developments; premium typeface; no pricing on cards |
| **Discerning Taste** | Understated palette; no flashy effects; editorial quality |
| **Investors** | "87% repeat investor participation" — trust metric |
| **Miami Market** | Tropical architecture imagery; waterfront properties; South Florida copy |

### 12.3 Competitive Positioning

```
                     ┌─── MORE MODERN ───┐
                     │                    │
               ┌─────┤  OLIVIA HARPER    │
               │     │  • Warm neutrals  │
     LESS ─────┤     │  • Scroll reveals │───── MORE
   ORNAMENTAL  │     │  • GSAP + Lottie  │   ANIMATED
               │     │  • F37 Bolton     │
               │     └───────────────────┘
               │
               └─── TRADITIONAL LUXURY ───
                     (Marble textures, gold accents,
                      serif fonts, static layouts)
```

---

## 13. Shadow & Depth System

### 13.1 WordPress Preset Shadows (Available but mostly unused)

```css
--wp--preset--shadow--natural:  6px 6px 9px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--deep:     12px 12px 50px rgba(0, 0, 0, 0.4);
--wp--preset--shadow--sharp:    6px 6px 0px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--outlined: 6px 6px 0px -3px #fff, 6px 6px #000;
--wp--preset--shadow--crisp:    6px 6px 0px rgb(0, 0, 0);
```

### 13.2 Actually Used Shadows

| Element | Shadow | Notes |
|---|---|---|
| **Social Icons** | `0 0 30px 0 rgba(0, 0, 0, 0.05)` | Extremely subtle — barely visible glow |
| **Most Elements** | None | The design is intentionally flat/shadowless |

> [!TIP]
> **Flat by Design**: The near-complete absence of box-shadows is intentional. Depth is created through color layering (taupe overlays), rounded containers, and content hierarchy — not shadows. This keeps the aesthetic clean and modern.

---

## 14. Accessibility Notes

| Feature | Status |
|---|---|
| **Skip Link** | ✅ Present on inner pages (`.skip-link.screen-reader-text`) |
| **Aria Labels** | ✅ Menu toggle, scroll button, social links |
| **Alt Text** | ⚠️ Logo images have empty `alt=""` |
| **Color Contrast** | ⚠️ `#B6AB99` on `#EEEBE4` background may fail WCAG AA for small text |
| **Keyboard Navigation** | ✅ `tabindex` properly set on interactive elements |
| **Focus States** | ✅ Social icons have `:focus::before` styles |
| **Reduced Motion** | ❌ No `prefers-reduced-motion` media query detected |
| **Semantic HTML** | ✅ `<header>`, `<nav>`, `<main>` elements used |
| **Language** | ✅ `lang="en-US"` set on `<html>` |

---

## 15. Performance Optimizations

| Optimization | Implementation |
|---|---|
| **Lazy Loading** | CSS-based deferred background images by section index |
| **SVG Logo** | Vector format for crisp rendering at any size |
| **Lottie SVG** | SVG renderer (lighter than canvas) for animations |
| **External CSS** | Elementor `css_print_method-external` — CSS in external files, cacheable |
| **Font Display** | `font_display-swap` — text visible immediately, fonts swap in |
| **Image Formats** | JPEG for photos (good compression for complex images) |
| **Fetch Priority** | `fetchpriority="high"` on logo images |

---

## 16. Custom Cursor System

### 16.1 Fluid Circular Pointer (JPTV Puntero Circular Fluido)

The site implements a **custom animated cursor** that replaces the default pointer in specific areas:

```css
/* Custom cursor replaces default in designated areas */
.cursor-areaolivia, .cursor-areaolivia * {
    cursor: none !important;
}

/* Tracker follows mouse with lerp (smooth follow) */
.pcf-tracker {
    position: fixed;
    top: 0; left: 0;
    z-index: 999999;
    pointer-events: none;
    will-change: transform;
}

/* Visual: 60px circle in semi-transparent sand color */
.pcf-visual-circle {
    width: 60px; height: 60px;
    background-color: #B6AB99A6;   /* 65% opacity sand */
    border-radius: 50%;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Arrow inside cursor — northeast pointing SVG */
.pcf-arrow {
    width: 35%; height: 35%;
    fill: #313131;    /* Charcoal arrow */
}
```

### 16.2 Cursor Animation States

```css
/* Grow in when entering trigger area */
@keyframes pcfGrow {
    0%   { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
/* Spring easing: cubic-bezier(0.34, 1.56, 0.64, 1), 0.5s */

/* Shrink out when leaving */
@keyframes pcfShrink {
    0%   { transform: scale(1); opacity: 1; }
    100% { transform: scale(0); opacity: 0; }
}
/* Ease out: 0.3s */
```

### 16.3 Cursor JavaScript Logic

```javascript
/* Lerp-based smooth following (not instant snap) */
var speed = 0.15;  /* Follow delay — creates fluid trailing */
cursorX += (mouseX - cursorX) * speed;
cursorY += (mouseY - cursorY) * speed;
tracker.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
requestAnimationFrame(render);
```

| Property | Value | Notes |
|---|---|---|
| **Trigger Area** | `.cursor-areaolivia` | Applied to footer logo area |
| **Size** | 60×60px | Large enough to be noticed, not overwhelming |
| **Color** | `#B6AB99A6` (65% sand) | Matches brand palette — not black |
| **Arrow** | Northeast-pointing SVG | Suggests "click to go somewhere" |
| **Follow Speed** | `0.15` lerp factor | Creates a luxurious trailing feel |
| **Grow Easing** | Spring `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoots slightly for organic feel |
| **Disabled in Editor** | `elementor-editor-active` check | Prevents conflicts during editing |

> [!TIP]
> **Design Intent**: The custom cursor only activates on specific interactive areas (footer logo), not site-wide. This makes it a surprise delighter rather than an annoyance. The sand-colored circle with a directional arrow communicates "this is interactive" while staying on-brand.

---

## 17. Contact Form & Form Design System

### 17.1 Form Layout

```
┌──────────────────────────────────────────────────────────────┐
│  CONTACT PAGE (bg: #B6AB99 with 4% black overlay)            │
│                                                              │
│  ┌─────────────────────┐  ┌───────────────────────────────┐  │
│  │  "Talk to us!"       │  │  ┌──────────┐ ┌──────────┐   │  │
│  │   (Display heading)  │  │  │First Name*│ │Last Name*│   │  │
│  │                      │  │  ├──────────┘ └──────────┘   │  │
│  │  Body description    │  │  │Email Address*              │  │
│  │  text (white)        │  │  │Phone Number                │  │
│  │                      │  │  │Company / Organization      │  │
│  │  📞 305-336-7195     │  │  │Type of Inquiry      ▼     │  │
│  │  📍 4770 Biscayne... │  │  │Est. Investment Range ▼    │  │
│  │                      │  │  │Message                     │  │
│  │                      │  │  │[textarea — 4 rows]         │  │
│  │                      │  │  │☐ Privacy consent*          │  │
│  │                      │  │  │[reCAPTCHA v3]              │  │
│  │                      │  │  │[📧 Send]     (full-width)  │  │
│  └─────────────────────┘  └───────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### 17.2 Form Fields Specification

| Field | Type | Width | Required | Placeholder |
|---|---|---|---|---|
| First Name | `text` | 50% (col-50) | ✅ | "First Name*" |
| Last Name | `text` | 50% (col-50) | ✅ | "Last Name*" |
| Email Address | `email` | 100% | ✅ | "Email Address*" |
| Phone Number | `tel` | 100% | ✅ | "Phone Number" |
| Company / Org | `text` | 100% | ✅ | "Company / Organization" |
| Type of Inquiry | `select` | 100% | ✅ | "Type of Inquiry" |
| Investment Range | `select` | 100% | ✅ | "Estimated Investment Range" |
| Message | `textarea` | 100% | ❌ | "Message" |
| Privacy Consent | `checkbox` | 100% | ✅ | Acceptance text |
| reCAPTCHA v3 | Hidden | — | Auto | Invisible badge |

### 17.3 Inquiry Type Options (Business Segmentation)

```
• Investment Opportunity
• Property Acquisition
• Partnership
• Commercial Assets
• Residential Portfolio
• General Inquiry
```

### 17.4 Investment Range Tiers

```
• $250K – $500K
• $500K – $1M
• $1M – $5M
• $5M+
```

### 17.5 Form Design Decisions

| Decision | Implementation | Rationale |
|---|---|---|
| **Placeholder-only labels** | `elementor-screen-only` class hides labels | Minimalist aesthetic — no visible labels cluttering the form |
| **Size: Small** | `elementor-size-sm` on all fields | Compact, elegant field sizing |
| **Full-width submit** | `button_width: 100` | Submit button spans entire form width — hard to miss |
| **Submit icon + text** | `📧 Send` with envelope SVG icon | Reinforces email-sending action visually |
| **reCAPTCHA v3** | Invisible, inline badge | Zero friction — no checkbox puzzles |
| **Privacy consent** | Mandatory checkbox with policy link | GDPR compliance with explicit consent |
| **Investment qualifier** | Dropdown with price tiers | Pre-qualifies leads — filters out non-serious inquiries |
| **Company field** | Required | Targets B2B/institutional investors, not casual browsers |

> [!IMPORTANT]
> **Lead Qualification by Design**: The form requires "Company/Organization" and "Estimated Investment Range" — this is a deliberate UX decision to pre-qualify leads. Only serious investors ($250K+) with company backing will complete this form. This is conversion optimization through friction.

---

## 18. White Space & Negative Space Philosophy

### 18.1 Breathing Room Strategy

| Pattern | Evidence | Effect |
|---|---|---|
| **Generous Hero Heights** | Homepage hero: 94vh. Services hero: 80vh | Nearly full-screen heroes create dramatic first impressions, forcing users to absorb the imagery before scrolling |
| **Text-to-Edge Distance** | Body text never reaches container edges — always 15–20px minimum | Creates an "air of space" around content, like a luxury magazine spread |
| **Section Spacing** | Zero-gap between major sections | Paradoxically, tight section joins with generous internal padding creates a seamless scroll narrative |
| **Left-Heavy Text** | Most body text is left-aligned within 50–60% of viewport width, leaving right side empty | Intentional asymmetry — right half often occupied by a single image or left entirely blank |
| **Footer Tagline** | Tagline occupies ~60% viewport width but is centered with massive space above/below | Text "breathes" — feels like a whispered statement rather than a shout |
| **Hero Empty Center** | Vision/Services heroes have text at top-left and bottom-left, with vast empty center | Creates tension and draws eye to the text at edges, forcing deliberate reading |

### 18.2 Content Density Gradient

```
SPARSE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ DENSE
  │                                                │
  ├── Hero sections (10% text, 90% image/space)    │
  ├── Stat counters (3 items across full width)     │
  ├── Description text (single column, narrow)      │
  ├── Service cards (50/50 text/image)              │
  ├── Contact form (text left / fields right)       │
  └── Footer links (4-column dense grid) ──────────┘
```

> **Design Principle**: Content density progressively increases as users scroll deeper. Hero = ultra-sparse (atmospheric). Footer = dense (utilitarian). This mirrors the user's attention journey — you seduce with space, then deliver information.

---

## 19. Visual Hierarchy & Eye Flow

### 19.1 F-Pattern Adaptation

```
┌────────────────────────────────────────────────────────┐
│  [NAV] ←── Primary scan line                           │
│   ↓                                                    │
│  ← HERO HEADLINE (display font anchors the eye)       │
│   ↓                                                    │
│  ← BODY TEXT (scroll text reveals, line by line)       │
│   ↓                                                    │
│  ← STATS ROW (three points across — forces horizontal) │
│   ↓                                                    │
│  ← CTA SECTION (image + text, breaks the pattern)     │
│   ↓                                                    │
│  ← FOOTER (dense grid — utility scanning)             │
└────────────────────────────────────────────────────────┘
```

### 19.2 Hierarchy Signals (Strongest → Weakest)

| Rank | Signal | Example |
|---|---|---|
| 1 | **Size** | 75px display headlines vs 17px body text (4.4× ratio) |
| 2 | **Position** | Key messages always top-left or bottom-left of hero sections |
| 3 | **Color contrast** | White text on taupe background in hero sections |
| 4 | **Animation** | Lottie reveals draw attention first; scroll-reveals reward scrolling |
| 5 | **Weight** | 300 (Light) body vs 400 (Normal) headings — subtle but effective |
| 6 | **Typography switch** | Roboto for UI = "functional"; Bolton for content = "expressive" |

### 19.3 Z-Index Layering Stack

| Layer | Z-Index | Element |
|---|---|---|
| **Custom Cursor** | `999999` | `.pcf-tracker` — always on top |
| **Awwwards Badge** | `999` | Fixed-position badge on right edge |
| **UE Background Overlay** | `999` (front) / `0` (back) | Widget background overlays |
| **Navigation** | Sticky (default stacking) | Header sticks on scroll |
| **Content** | Default | All body sections |

---

## 20. Page-by-Page Design Anatomy

### 20.1 Homepage (Canvas Template — `post-277`)

| Section | Content | Design Decision |
|---|---|---|
| **Hero** | Lottie title + slideshow bg + scroll indicator | Canvas template removes all theme chrome for total immersion |
| **Scroll Text** | GSAP color-transition text reveal | Line-by-line storytelling — the user "discovers" the brand narrative |
| **Stats Bar** | 98%, $85MM, 87% | Social proof — positioned after brand story for maximum impact |
| **Slideshow CTA** | Project images carousel | Transitions to portfolio showcase |
| **Footer** | CTA + branding + links | Standard footer pattern |

### 20.2 Vision Page (`/vision/`)

| Section | Content | Design Decision |
|---|---|---|
| **Hero** | "Our Visión" + decorative monogram arches in bg | Background features large semi-transparent brand monogram/arch patterns — a watermark effect that reinforces brand identity |
| **Floating Image** | Property rendering, right-aligned, overlapping hero edge | Creates visual tension and breaks the grid — suggests content spilling beyond boundaries |
| **Description** | Left-aligned mission statement | Text positioned at bottom-left, leaving vast negative space |
| **Accent mark** | "Visión" with Spanish accent | Subtle nod to Miami's Latin culture — deliberate bilingual touch |

### 20.3 Services Page (`/services/`)

| Section | Content | Design Decision |
|---|---|---|
| **Hero** | Full-bleed staircase interior shot (80vh) | Architectural photography chosen for the services page — suggests craft and construction |
| **Title** | "Our Services" in ultra-light display | Positioned below the fold, emerging from the hero |
| **Accordion Cards** | A-B-C indexed service items | Alphabetical markers create structure for 5+ services |
| **"Last projects" link** | `● Last projects` with circle bullet | Cross-sells to the Projects page — not a button but an editorial-style text link |
| **Blurred image overlay** | Gaussian-blurred property image behind service content | Creates depth without competing with text content |

### 20.4 About Us Page (`/about-us/`)

| Section | Content | Design Decision |
|---|---|---|
| **Team Section** | Two co-founder profiles side-by-side | Equal visual weight — communicates partnership and equality |
| **Dual Photos** | Formal portrait + working candid per person | Shows both professionalism and approachability |
| **Background** | Warm taupe (#96847A) for entire team section | Creates a "warm embrace" effect — literally wrapping people in the brand color |
| **Bio Text** | Light body text on taupe bg | White/ivory text on taupe ensures readability while maintaining warmth |

### 20.5 Contact Page (`/contact/`)

| Section | Content | Design Decision |
|---|---|---|
| **Single Section** | Full-page form (no multi-section scroll) | Fastest path to conversion — no distractions |
| **Background** | `#B6AB99` (sand) with `4% black` overlay + `15px border-radius` | Slightly darker than hero sections — creates focus |
| **Split Layout** | 50/50: info left, form right | Classic contact page pattern adapted to luxury aesthetic |
| **Contact Info** | Phone + address with custom SVG icons at bottom-left | Essential info visible without scrolling to form |

### 20.6 Project Detail Pages (`/projects/[slug]/`)

| Section | Content | Design Decision |
|---|---|---|
| **Hero** | Full-width property rendering | Single property showcase with immersive imagery |
| **Gallery** | Multi-image grid of property angles | JetEngine-powered dynamic content from custom post type |
| **Specs** | Property details, location, status | Structured data display from custom fields |

---

## 21. Micro-copy & Brand Voice

### 21.1 Voice Characteristics

| Attribute | Evidence |
|---|---|
| **Confident but Understated** | "Timeless residences" (not "The BEST homes ever") |
| **Professional & Measured** | "We approach every inquiry with discretion, clarity, and a focus on long-term value" |
| **Value-Oriented** | Repeated emphasis on "long-term value", "quality", "intention" |
| **Exclusive** | "domestic and international investors" — signals selectivity |
| **Architectural Language** | "Architectural • Crafted • Considered" — three precise adjectives |

### 21.2 CTA Copy Analysis

| CTA | Copy Style | Psychology |
|---|---|---|
| **Header** | "Contact Us" | Direct, functional — no urgency tactics |
| **Homepage hero** | "Scroll to explore" | Invitational, not demanding — respects user autonomy |
| **Services** | "● Last projects" | Editorial breadcrumb — feels like a magazine cross-reference |
| **Contact heading** | "Talk to us!" | Warmth + exclamation — the only exclamation on the entire site |
| **Submit button** | "📧 Send" | Minimal, one word — no "Submit your inquiry" verbosity |

### 21.3 Tagline System

| Location | Copy | Style |
|---|---|---|
| **Logo lockup** | "LUXURY HOMEBUILDING" | All-caps tracking, tiny size — acts as subtitle |
| **Homepage hero** | "Timeless residences" | Two words — maximum impact |
| **Homepage sub** | "Architectural • Crafted • Considered" | Three adjectives with bullet separators |
| **Footer** | "Decades of combined experience, shaping homes defined <span style='color:#B6AB99'>by quality, intention, and long-term value.</span>" | Partially faded text — the faded portion is intentionally de-emphasized |
| **Vision** | "To develop a vertically integrated platform focused on the creation of ultra-luxury and single-family new development residences" | Mission statement — longer, more detailed on the dedicated Vision page |

> [!NOTE]
> **Fade-to-Sand Tagline**: The footer tagline uses an inline `<span style="color:#B6AB99">` to fade the second half of the sentence into the muted sand color. This creates a visual "trailing off" effect — the voice literally fades out, like a whispered ending. This is a micro-design detail that reinforces the understated luxury philosophy.

---

## 22. Conversion Architecture & CTA Funnel

### 22.1 CTA Placement Strategy

```
┌─ HOMEPAGE ──────────────────────────────────────────────┐
│                                                          │
│  [Header: "Contact Us" button — always visible] ← EXIT  │
│                                                     RAMP │
│  Hero: No CTA (pure brand immersion)                    │
│   ↓                                                      │
│  Scroll Text: No CTA (narrative building)                │
│   ↓                                                      │
│  Stats: No CTA (credibility building)                    │
│   ↓                                                      │
│  Slideshow: Implicit CTA via project images              │
│   ↓                                                      │
│  Footer CTA: "Talk to Us" with full bg image ← PRIMARY   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 22.2 Funnel Philosophy

| Principle | Implementation |
|---|---|
| **No Hard Sell** | Zero "Buy Now" or "Schedule a Call" buttons in body content |
| **Single Primary CTA** | Only "Contact Us" in header + "Talk to Us" in footer — consistent everywhere |
| **Narrative Before Action** | Users must scroll through brand story before reaching any CTA |
| **Persistent Exit Ramp** | Header "Contact Us" button is always visible as a sticky escape hatch |
| **Soft Internal Links** | Services → Projects cross-sell via editorial "● Last projects" link |
| **Pre-Qualification** | Contact form requires company + investment range — filters leads |

> **Design Philosophy**: The site operates on a **pull model**, not a push model. Instead of bombarding visitors with CTAs, it creates desire through imagery and narrative, then provides a single, clear path to action. This mirrors the buying behavior of UHNW individuals — they don't respond to urgency tactics; they respond to exclusivity and confidence.

---

## 23. Iconography & Decorative Element System

### 23.1 Icon Style

| Icon Type | Style | Usage |
|---|---|---|
| **Navigation bullet** | `●` (filled circle, small) | "● Last projects", "● See more" link indicators |
| **Phone icon** | Custom SVG (line art, 24px grid) | Contact page phone number |
| **Location pin** | Custom SVG (line art, outline, 512px) | Contact page address |
| **Instagram** | Font Awesome 6 (`fab fa-instagram`) | Header & footer social |
| **WhatsApp** | Font Awesome 6 (`fab fa-whatsapp`) | Footer social |
| **Envelope** | Font Awesome 6 (`far fa-envelope`) | Mobile header + submit button |
| **Caret down** | Elementor SVG (`e-eicon-caret-down`) | Select dropdown arrows |
| **Hamburger** | Custom SVG (3-line) | Mobile menu open |
| **Close X** | Custom SVG (diagonal X) | Mobile menu close |
| **Scroll mouse** | Custom SVG (animated) | Homepage hero scroll indicator |
| **Northeast arrow** | SVG path inside cursor | Custom cursor directional arrow |
| **Service markers** | A, B, C... alphabetical squares | Service accordion index |

### 23.2 Decorative Background Patterns

Visible on the **Vision page** hero section — large, semi-transparent brand monogram/arch shapes are rendered in the background:

```
┌──────────────────────────────────────────────────────┐
│              VISION PAGE HERO                        │
│                                                      │
│    ╭───╮     ╭───╮     ╭───╮                        │
│    │   │     │   │     │   │    ← Large arch/        │
│    │   │     │   │     │   │      monogram shapes    │
│    │   │     │   │     │   │      in semi-transparent │
│    ╰───╯     ╰───╯     ╰───╯      brand taupe       │
│                                                      │
│  "Our Visión"                   [Property render] →  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

| Property | Value | Notes |
|---|---|---|
| **Pattern type** | Brand monogram arches (stylized "OH" letterforms) | Derived from the logo mark |
| **Color** | Same as hero background, slightly lighter/darker tone | Tone-on-tone — visible but not distracting |
| **Scale** | Very large — spans most of hero height | Creates architectural grandeur |
| **Effect** | Watermark/embossment feel | Adds texture without adding color |

> **Design Decision**: The decorative arches are the brand monogram scaled up and used as a textural element. This is a classic luxury brand technique — think Louis Vuitton monogram pattern or Hermès horse motifs. It reinforces brand identity subliminally.

---

## 24. Divider & Separator System

### 24.1 Divider Patterns

| Type | Location | Appearance |
|---|---|---|
| **Full-width line** | Below breadcrumb bar on inner pages | 1px solid line spanning full content width, in `#EEEBE4` (ivory) |
| **Footer section divider** | Between tagline and link columns | Elementor divider widget — thin horizontal rule |
| **Visual section breaks** | Between hero and content | Achieved through background color change, not explicit dividers |
| **Stat column separators** | Between stat items | Implied by spacing, no visible dividers |
| **Inner page breadcrumb** | Top of hero sections | Text breadcrumb ("Olivia Harper Homes Services") + line below |

### 24.2 Breadcrumb Bar Pattern (Inner Pages)

```
┌──────────────────────────────────────────────────────────┐
│  Olivia Harper Homes Services    ← Small text, top-left  │
│  ─────────────────────────────── ← Full-width thin line   │
│                                                          │
│  [Hero content below]                                    │
└──────────────────────────────────────────────────────────┘
```

- Present on: Services, Vision, Contact, About Us pages
- Format: `"Olivia Harper Homes [PageName]"` — always includes brand name
- Line: `#EEEBE4` ivory divider, full width
- Provides wayfinding without traditional breadcrumb navigation

---

## 25. Emotional Design Journey

### 25.1 User Emotional Arc

```
                    ▲ TRUST
                    │
        DESIRE ─────┤          ┌── COMMITMENT
                    │         │
    AWE ────────────┤    ┌────┤
                    │   │    │
                    │  │    │
 CURIOSITY ─────────┤ │    │
                    ││    │
────────────────────┼┼────┼──────────────────────── Time
                    ││    │
    Hero    Scroll  Stats  Projects  Contact
    (94vh)  Text    (98%)  Gallery   Form
```

### 25.2 Emotion-to-Design Mapping

| Stage | Emotion | Design Tool |
|---|---|---|
| **Landing** | Awe / Intrigue | Full-screen hero with animated title reveal, architectural photography |
| **Scrolling** | Discovery / Curiosity | Line-by-line text reveal — rewards scrolling behavior |
| **Stats Section** | Trust / Confidence | Hard numbers ($85MM, 98%, 87%) — shifts from emotion to logic |
| **Projects** | Desire / Aspiration | Full-bleed property imagery — "I want to live there" |
| **Team** | Connection / Warmth | Dual photos (formal + candid) — humanizes the brand |
| **Contact** | Commitment / Intent | Pre-qualification fields filter for serious inquiries |
| **Footer** | Closure / Authority | Brand tagline + comprehensive legal links = legitimacy |

---

## 26. Site-Wide Information Architecture

### 26.1 Site Map

```
oliviaharperhomes.com
├── / (Homepage — Canvas template)
├── /homes-projects/ (Projects listing)
│   └── /projects/[slug]/ (Individual project detail — CPT)
│       ├── /projects/1000-89-st-surfside/
│       ├── /projects/1710-s-bayshore-drive/
│       ├── /projects/1716-s-bayshore-drive/
│       └── /projects/normandy-shores/
├── /services/
├── /about-us/
├── /vision/
├── /contact/
├── /privacy-policy/
├── /cookie-policy/
├── /terms-of-service/
└── /accessibility-statement/
```

### 26.2 Content Types

| Type | Engine | Usage |
|---|---|---|
| **Pages** | WordPress Pages + Elementor | All primary pages (Home, Services, Vision, About, Contact) |
| **Projects** | Custom Post Type via JetEngine | Dynamic project entries with custom fields |
| **Header** | Elementor Theme Builder (post-617) | Shared header template across inner pages |
| **Footer** | Elementor Theme Builder (post-738) | Shared footer template across all pages |
| **Homepage** | Elementor Canvas (post-277) | Full-canvas template — no theme header/footer |

### 26.3 Navigation Architecture

| Primary Nav (Header) | Footer Nav | Footer Legal | Footer Projects |
|---|---|---|---|
| Projects | About Us | Privacy Policy | 1000 89 St, Surfside |
| Services | Services | Cookies Policy | 1710 S. Bayshore Drive |
| About Us | Projects | Terms of Service | 1716 S. Bayshore Drive |
| Vision | Services (dup) | Accessibility Statement | Normandy Shores |
| | Vision | | |

> **Navigation Note**: The footer contains a duplicate "Services" link — this appears to be an oversight, not intentional. The primary nav has only 4 items + no "Contact" link (Contact is in the CTA button instead) — a deliberate choice to keep nav minimal and push contact into a more prominent button.

---

## 27. Industry Awards & Third-Party Signals

### 27.1 Awwwards Nominee Badge

```css
/* Fixed-position badge on right viewport edge */
#awwwards {
    position: fixed;
    z-index: 999;
    transform: translateY(-50%);
    top: 50%;
    right: 0;
}
```

- **Badge**: "W. Nominee" Awwwards nominee badge — vertical strip on right edge
- **Visibility**: Always visible, fixed position, vertically centered
- **Link**: Points to `awwwards.com/sites/olivia-harper-homes`
- **Design colors**: White background, black text — high contrast against site palette

> **Credibility Signal**: The permanent Awwwards badge serves dual purpose — it validates the design quality to visitors AND positions the agency (Bangluxor) as an award-caliber studio. For luxury real estate, having an award-winning website communicates attention to detail.

### 27.2 Prefetch Strategy (Speculation Rules)

```json
{
  "prefetch": [{
    "source": "document",
    "where": {
      "and": [
        {"href_matches": "/*"},
        {"not": {"href_matches": ["/wp-*.php", "/wp-admin/*", ...]}},
        {"not": {"selector_matches": "a[rel~=\"nofollow\"]"}},
        {"not": {"selector_matches": ".no-prefetch, .no-prefetch a"}}
      ]
    },
    "eagerness": "conservative"
  }]
}
```

- Uses the modern **Speculation Rules API** for conservative prefetching
- Excludes admin pages, upload files, and nofollow links
- Improves perceived navigation speed between pages

---

## 28. Aspect Ratio System

### 28.1 Defined Aspect Ratios (WordPress Presets)

```css
--wp--preset--aspect-ratio--square:  1;
--wp--preset--aspect-ratio--4-3:     4/3;
--wp--preset--aspect-ratio--3-4:     3/4;
--wp--preset--aspect-ratio--3-2:     3/2;
--wp--preset--aspect-ratio--2-3:     2/3;
--wp--preset--aspect-ratio--16-9:    16/9;
--wp--preset--aspect-ratio--9-16:    9/16;
```

### 28.2 Applied Ratios

| Context | Ratio | Usage |
|---|---|---|
| **Hero sections** | ~16:9 (via viewport height) | 80-94vh heroes create wide cinematic compositions |
| **Project cards** | ~3:2 landscape | Property thumbnails on projects listing |
| **Team portraits** | ~3:4 portrait | Vertical cropping emphasizes faces |
| **Footer CTA** | 50vh minimum | Half-viewport creates impactful CTA block |
| **Working photos** | ~16:9 landscape | Candid team shots in landscape orientation |

---

## 29. GSAP Animation Deep-Dive

### 29.1 GSAP Module Stack

```html
<!-- Core GSAP (Business License) -->
<script src=".../gsap-business/gsap-business/minified/gsap.min.js"></script>
<!-- SplitText plugin — premium, character/line splitting -->
<script src=".../gsap-business/gsap-business/minified/SplitText.min.js"></script>
<!-- ScrollTrigger — scroll-based animation triggers -->
<script src=".../gsap-business/gsap-business/minified/ScrollTrigger.min.js"></script>
```

> [!IMPORTANT]
> The site uses **GSAP Business license** (not the free version). This provides access to premium plugins like **SplitText** which enables character-level and line-level text splitting for scroll reveals.

### 29.2 SplitText Integration Pattern

```javascript
// Contact page text reveal pattern:
gsap.registerPlugin(ScrollTrigger, SplitText);

document.fonts.ready.then(() => {
    const paragraph = document.querySelector(".p-2-contact");
    // Split into lines, wrap each in overflow:hidden mask
    const {lines} = new SplitText(paragraph, {
        type: "lines",
        linesClass: "line"
    });
    
    // Wrap each line in a mask div for clip animation
    lines.forEach(line => {
        line.outerHTML = `<div class="mask">${line.outerHTML}</div>`;
    });
    
    // Animate lines sliding up from 100% below
    gsap.from(".p-2-contact .line", {
        y: "100%",
        stagger: 0.01,        // 10ms between each line
        duration: 1.6,         // 1.6s per line reveal
        scrollTrigger: {
            trigger: ".p-2-contact",
            start: "top bottom",
            end: "bottom end",
            toggleActions: "play none none none"  // Play once only
        }
    });
});
```

### 29.3 Font Loading Awareness

```javascript
/* Animations wait for fonts to load before splitting text */
document.fonts.ready.then(() => {
    init();  // Only then initialize GSAP SplitText
});
```

> **Design Decision**: Text animations deliberately wait for `document.fonts.ready` before executing SplitText. This prevents layout shifts from font loading after text has been split — a crucial detail for maintaining animation quality with self-hosted F37 Bolton.

---

## 30. Design DNA Quick-Reference Card

```
╔═══════════════════════════════════════════════════════╗
║          OLIVIA HARPER HOMES — DESIGN DNA             ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  COLORS                                               ║
║  Primary:     #96847A (Warm Taupe)                    ║
║  Secondary:   #B6AB99 (Muted Sand)                    ║
║  Background:  #EEEBE4 (Warm Ivory)                    ║
║  Text:        #313131 (Charcoal)                      ║
║  Accent:      #424242 (Dark Gray)                     ║
║  White:       #FFFFFF                                 ║
║                                                       ║
║  TYPOGRAPHY                                           ║
║  Display:     F37 Bolton 75px / Normal / 1em          ║
║  Heading:     F37 Bolton 65px / 400 / 1em             ║
║  Body:        F37 Bolton 17px / 300 / 1.4em           ║
║  UI/Nav:      Roboto 17px / 400                       ║
║                                                       ║
║  SPACING                                              ║
║  Page Inset:  15px                                    ║
║  Content:     800px narrow / 1200px wide              ║
║  Block Gap:   24px                                    ║
║                                                       ║
║  RADIUS                                               ║
║  Sections:    15px                                    ║
║  Footer:      20px                                    ║
║  Buttons:     0px (sharp)                             ║
║                                                       ║
║  MOTION                                               ║
║  Engine:      GSAP Business + Lottie + CSS            ║
║  GSAP:        SplitText + ScrollTrigger               ║
║  Easing:      power1.out / cubic-bezier spring        ║
║  Duration:    0.3s buttons / 0.35s icons / 1.6s text  ║
║  Trigger:     Scroll (40% viewport) / Hover           ║
║                                                       ║
║  CURSOR                                               ║
║  Custom:      60px sand circle + NE arrow             ║
║  Follow:      Lerp 0.15 (fluid trailing)              ║
║  Trigger:     .cursor-areaolivia zones only            ║
║                                                       ║
║  FORM                                                 ║
║  Fields:      9 fields + privacy consent              ║
║  Qualifier:   Investment range ($250K–$5M+)           ║
║  Security:    reCAPTCHA v3 invisible                  ║
║  Submit:      Full-width, icon + text                 ║
║                                                       ║
║  VOICE                                                ║
║  Tone:        Understated, confident, measured         ║
║  CTAs:        Pull model — narrative before action     ║
║  Tagline:     "Timeless residences"                   ║
║                                                       ║
║  AWARDS                                               ║
║  Awwwards:    Nominee (fixed badge, right edge)       ║
║  Agency:      Bangluxor (bangluxor.com)               ║
║                                                       ║
║  STACK                                                ║
║  WordPress 6.9 + Elementor Pro 4.1 + Hello Elementor  ║
║  GSAP Business + Lottie + Swiper + JetEngine          ║
║  SplitText + ScrollTrigger + Rank Math SEO            ║
║  Speculation Rules API (prefetch)                     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```
