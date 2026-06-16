# Creative Process — Elena Vasquez Designer Portfolio

> A complete record of every thought, decision, and iteration involved in building this Awwwards-worthy landing page — from the first spark of an idea to the final pixel.

---

## Table of Contents

1. [Initial Brief & Requirements Analysis](#1-initial-brief--requirements-analysis)
2. [Concept & Art Direction](#2-concept--art-direction)
3. [Color Palette Development](#3-color-palette-development)
4. [Typography Selection](#4-typography-selection)
5. [Technology Stack Decisions](#5-technology-stack-decisions)
6. [Section-by-Section Design Thinking](#6-section-by-section-design-thinking)
7. [Three.js Shader Design](#7-threejs-shader-design)
8. [Animation Architecture](#8-animation-architecture)
9. [Responsive Strategy](#9-responsive-strategy)
10. [Image Generation & Asset Pipeline](#10-image-generation--asset-pipeline)
11. [Implementation Order](#11-implementation-order)
12. [Bug Fixes & Iterations](#12-bug-fixes--iterations)
13. [Verification & QA](#13-verification--qa)
14. [Final Reflections](#14-final-reflections)

---

## 1. Initial Brief & Requirements Analysis

### The Brief
> "Design & build a modern, Awwwards-worthy winning landing page for a fictional UI/UX designer portfolio. You can use GSAP and/or Three.js to create a visually captivating experience. Be sure to check your work with chrome dev tools and ensure it's mobile-friendly. Produce home page with first 3 sections only to avoid session limit. Work at the root directory inside new folder."

### Unpacking the Requirements

**Must-haves identified:**
- Awwwards-quality visual design (not just "good" — award-winning)
- Fictional designer persona (needs a name, identity, backstory)
- GSAP and/or Three.js (decided to use **both** for maximum impact)
- Mobile-friendly (responsive, tested in DevTools)
- Only 3 sections (efficiency constraint — each section must carry its weight)
- New folder at root (standalone project, no framework dependencies)

**Key constraint realization:** With only 3 sections, every section must be a showpiece. There's no room for filler. The three sections need to cover the essential portfolio narrative: *who you are → what you believe → what you've done*.

### Choosing the 3 Sections

Several combinations were considered:

| Option | Sections | Verdict |
|--------|----------|---------|
| A | Hero, About, Works | ✅ Classic portfolio flow, covers identity + philosophy + proof |
| B | Hero, Works, Testimonials | ❌ No personal story, testimonials feel thin with 3 sections |
| C | Hero, Services, Works | ❌ Services are boring visually, hard to make award-worthy |
| D | Hero, About, Contact | ❌ No portfolio work — defeats the purpose |

**Decision: Option A** — Hero → About → Selected Works. This is the narrative spine of every great designer portfolio: announce yourself, tell your story, prove your skill.

---

## 2. Concept & Art Direction

### Persona Creation

The fictional designer needed to feel real. Several names were brainstormed:

- "Kai Nakamura" — Japanese-Scandinavian fusion feel
- "Elena Vasquez" — Mediterranean warmth, Barcelona base
- "Alex Renier" — Gender-neutral, Franco-American
- "Sofia Chen" — East-meets-West creative

**Decision: Elena Vasquez** — The name carries a natural elegance. "Elena" is internationally recognizable. "Vasquez" grounds her in Barcelona, which is a well-known design hub (home of studios like Mucho, Hey Studio, Folch). The initials "EV" also work beautifully as a minimal logo mark with a lime accent dot.

### Role & Positioning

She needed a role that sounds premium but isn't generic:
- ~~"UI/UX Designer"~~ — Too common, sounds like a job listing
- ~~"Product Designer"~~ — Corporate, not creative enough
- **"Digital Designer & Creative Director"** — Implies both craft and leadership, suggests she works at the intersection of design and strategy

### Visual Mood

The art direction was guided by studying patterns across award-winning portfolio sites:

**Sites that informed the direction:**
- **Dennis Snellenberg** (dennissnellenberg.com) — Hover image follower on project list, clean typography hierarchy
- **Lusion** (lusion.co) — Three.js integration, organic 3D forms
- **Aristide Benoist** (aristidebenoist.com) — Dark palette, massive typography
- **Locomotive** (locomotive.ca) — Smooth scroll, text reveal animations
- **Rino & Pelle** — Outlined marquee text, editorial feel

**Core aesthetic principles decided:**
1. **Dark, moody base** — Near-black backgrounds create gallery-like focus
2. **Oversized typography** — Display text should dominate the viewport
3. **Single accent color** — One bold color creates a signature look
4. **Texture over flatness** — Film grain, noise, organic shapes
5. **Purposeful animation** — Every motion should reveal meaning, not just move

---

## 3. Color Palette Development

### The Search for the Right Accent

The accent color is the single most important design decision in a dark-mode portfolio. It defines the entire personality.

**Colors considered:**

| Color | Hex | Feel | Verdict |
|-------|-----|------|---------|
| Coral/Salmon | `#e8655a` | Warm, approachable | Too safe, seen on many portfolios |
| Gold | `#c9a96e` | Luxurious, classic | Skews old-fashioned, not digital-native |
| Electric Blue | `#4d9fff` | Tech, modern | Too "SaaS startup" |
| Violet | `#9b6dff` | Creative, bold | Hard to read on dark backgrounds |
| **Electric Lime** | **`#c8ff00`** | **Energetic, fresh, edgy** | **✅ Trendy, high contrast, distinctive** |

**Decision: Electric Lime `#c8ff00`** — This color is trending heavily on award-winning sites in 2024-2025. It has excellent contrast against dark backgrounds (WCAG AAA for large text), feels energetic without being aggressive, and immediately signals "this designer is current." It also photographs well in screenshots — critical for an Awwwards submission.

### Complete Palette

```
--bg:          #0a0a0a     Near-black base (not pure black — pure black feels dead)
--bg-elevated: #121212     Subtle lift for hover states
--bg-surface:  #1a1a1a     Card/surface backgrounds
--text:        #f0ece2     Warm off-white (pure white is too harsh on dark)
--text-dim:    #7d786e     Secondary text, feels like aged parchment
--text-muted:  #2e2b27     Borders, dividers, barely visible structure
--accent:      #c8ff00     Electric lime, used sparingly for maximum impact
```

**Key reasoning on `--text: #f0ece2`:** Pure white (`#ffffff`) on pure black creates too much contrast and causes eye fatigue. The warm off-white has subtle yellow/cream undertones that make it feel more natural, like reading text on quality paper. This is a detail that separates good dark themes from great ones.

**Key reasoning on `--bg: #0a0a0a`:** Not `#000000`. Pure black has no depth — it looks like a void. `#0a0a0a` has just enough lightness to feel like a very dark surface rather than emptiness. This allows elements on top to "sit" on the background rather than float in nothing.

---

## 4. Typography Selection

### Display Font: Syne

**Fonts considered for headings:**
- **Space Grotesk** — Geometric, clean, popular. But too many sites use it now.
- **Clash Display** — Bold, distinctive. But only available via Fontshare, not Google Fonts.
- **Outfit** — Modern, versatile. But too rounded, feels friendly rather than authoritative.
- **Syne** — Geometric with personality, bold weight is punchy, not overused. **✅ Winner**

**Why Syne:** At weight 800, Syne characters have a distinctive wide proportion with subtle quirks (the crossbar on the 'A', the curved 'Q'). It feels both technical and human — perfect for a designer who bridges strategy and artistry. It also has excellent letterform recognition at massive display sizes, which is critical when the hero title is 11rem+.

### Body Font: DM Sans

**Fonts considered for body:**
- **Inter** — The industry default. Too ubiquitous, feels generic.
- **Roboto** — Material Design associations. Wrong aesthetic.
- **DM Sans** — Clean, slightly geometric, has excellent weight range including light (300). **✅ Winner**

**Why DM Sans:** At weight 300 (light), DM Sans has an elegant, airy quality that contrasts beautifully with Syne 800. The light weight also makes body text feel less dominant, maintaining the typographic hierarchy. The pairing creates clear visual tension: **Syne 800 = impact, DM Sans 300 = refinement**.

### Typographic Scale

```
Hero title:     clamp(3.5rem, 11vw, 11rem)   — Viewport-filling, responsive
Works title:    clamp(3rem, 7vw, 7rem)         — Large but secondary
Marquee:        clamp(2.5rem, 7vw, 7rem)       — Decorative scale
Project names:  clamp(1.8rem, 4vw, 3.5rem)     — Scannable
Body:           clamp(1rem, 1.3vw, 1.25rem)    — Readable
Labels:         0.8rem                          — Structural
Nav:            0.85rem uppercase               — Compact, professional
```

**Why `clamp()` everywhere:** This eliminates the need for dozens of media queries just for font sizing. The browser smoothly interpolates between the min and max values based on viewport width. The middle value (the preferred size) is in `vw` units, making typography truly fluid.

---

## 5. Technology Stack Decisions

### Why Vanilla HTML/CSS/JS (No Framework)

**Options considered:**
- **Next.js/Vite** — Overkill for 1 page, adds build complexity, no routing needed
- **Astro** — Great for static sites, but adds tooling overhead for a demo
- **Vanilla** — Zero dependencies, instant load, full control over every line

**Decision: Pure vanilla** — A portfolio landing page doesn't need React's component model or a build pipeline. Vanilla code also means the page loads instantly with no JS bundle overhead — just 3 CDN scripts (GSAP, ScrollTrigger, Three.js) that can be cached independently.

### CDN Choices

```html
<!-- GSAP 3.12.5 — stable release with ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Three.js r128 — reliable, well-tested revision -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

**Why GSAP over alternatives:**
- Anime.js — Smaller but no scroll-linked animation support
- Framer Motion — React-only
- CSS animations — No scroll triggering, no timeline sequencing, no elastic easing
- GSAP + ScrollTrigger — Industry standard for award-winning sites, used by 90%+ of Awwwards winners

**Why Three.js r128:**
- Stable, well-documented revision
- `IcosahedronGeometry` exists (renamed from BufferGeometry in r125)
- `ShaderMaterial` fully functional
- Small enough for CDN loading

### What Was Deliberately NOT Used

- **Lenis** (smooth scroll library) — Would add another CDN dependency. Native `scroll-behavior: smooth` combined with GSAP scroll-linked animations provides 90% of the benefit without the extra 12KB.
- **SplitText plugin** — It's a GSAP Club member (paid) plugin. Instead, text splitting was implemented manually with 10 lines of vanilla JS, achieving the same visual result.
- **Tailwind CSS** — User rules don't recommend it, and for this project, hand-crafted CSS provides finer control over the exact aesthetic.

---

## 6. Section-by-Section Design Thinking

### 6.1 Hero Section

**The Hero's Job:** In 3 seconds, the visitor must understand: *this is a designer's portfolio, and this designer is world-class.*

**Layout architecture:**

```
┌──────────────────────────────────────────────────────┐
│  EV.              ABOUT  WORKS  CONTACT    LET'S TALK│  ← Nav
│                                                      │
│  DIGITAL DESIGNER & CREATIVE DIRECTOR                │  ← Eyebrow (accent)
│                                                      │
│  ████████  █     ████████  █   █   ████████          │
│  █         █     █         ██  █   █     █           │  ← ELENA
│  ████████  █     ████████  █ █ █   ████████          │
│  █         █     █         █  ██   █     █           │
│  ████████  █████ ████████  █   █   █     █           │
│                                                      │
│       █     █   ████████  ██████  █████  █   █ ████  │
│       █     █   █     █  █       █     █ █   █ █     │  ← VASQUEZ (indented)
│       █     █   ████████  ██████ █     █ █   █ ████  │
│        █   █    █     █        █ █   █ █ █   █ █     │
│         ███     █     █  ██████   ████   █████ ████  │
│                                                      │
│  Crafting immersive digital            |             │
│  experiences since 2015              SCROLL          │  ← Bottom bar
└──────────────────────────────────────────────────────┘
         ↑ Three.js canvas behind everything
```

**Key decisions:**

1. **The name IS the design.** Rather than a small name with a big image, the name itself becomes the visual centerpiece. At 11rem, "ELENA VASQUEZ" literally fills the viewport. This is a confidence statement.

2. **Indent on "VASQUEZ."** The second line is offset with `padding-left: clamp(2rem, 6vw, 7rem)`. This creates visual rhythm — the eye follows a diagonal line from the top-left of "ELENA" to the bottom-right of "VASQUEZ". Without the indent, two stacked lines feel static and blocky.

3. **Three.js behind, not beside.** The morphing blob sits behind the text rather than next to it. This creates depth (text feels like it's floating in front of a living organism) and avoids the common "50/50 split" layout that makes portfolios look like landing page templates.

4. **Vignette overlay.** A radial gradient darkens the edges of the hero, creating a natural spotlight effect on the center where the blob and text intersect. Without this, the blob's edges feel abruptly cut off by the viewport.

5. **Bottom bar split.** Tagline on the left ("Crafting immersive digital experiences since 2015") anchors the page with a human detail. Scroll indicator on the right provides directional cue. This creates a visual frame: the hero content is bracketed between the nav (top) and bottom bar (bottom).

### 6.2 About Section

**The About Section's Job:** Transition from visual spectacle to human connection. The visitor should think: *this person is experienced, thoughtful, and accomplished.*

**Design decisions:**

1. **Marquee as transitional element.** The outlined text marquee ("DESIGN IS STORYTELLING ✦ CREATIVITY MEETS STRATEGY") serves as a visual bridge between the hero and the content-heavy about section. It's decorative, not functional — the `-webkit-text-stroke` outlined style makes it clearly ornamental. It also creates scroll engagement: the text moves horizontally as you scroll vertically, which feels rewarding.

2. **Why outlined text?** Solid text at this size would overpower the bio below. Outlined text has visual presence without visual weight — it decorates without dominating. The lime `✦` separators add a pop of accent color at this scale.

3. **Two-column grid (1.3fr / 1fr).** The left column (bio) gets more space because text needs room to breathe. The right column (stats) is more compact since numbers are inherently dense. The 1.3:1 ratio feels natural — it's not a harsh 2:1 split but a gentle imbalance that creates visual interest.

4. **Stats as proof points.** Three stats were chosen deliberately:
   - **10+ Years of Experience** — Establishes seniority
   - **50+ Projects Completed** — Demonstrates volume/trust
   - **12 Design Awards** — External validation (no "+" suffix because specific numbers feel more authentic than rounded estimates)

5. **Stats layout: vertical list, not horizontal grid.** On award sites, stats are often displayed in a horizontal row. The vertical list with border separators was chosen because it creates more visual rhythm when paired with the scroll-reveal animation — each stat enters the viewport one at a time, creating a sequential "counting up" narrative.

### 6.3 Selected Works Section

**The Works Section's Job:** Prove the designer's skill through presented projects. The visitor should think: *I want to see more of this work.*

**Design decisions:**

1. **List format over card grid.** A card grid is the default portfolio layout. The list format (full-width items with number + name + category + year) is more editorial and implies curation — these aren't all the projects, these are the *selected* works. The list also creates more opportunities for interaction (each item is a hover target).

2. **Hover image follower.** This is the signature interaction. When the cursor hovers over a project item, a preview image appears and follows the cursor. This is used by many Awwwards winners (Dennis Snellenberg, Locomotive, etc.) because:
   - It reveals information progressively (images appear on demand)
   - It creates a sense of discovery
   - It's delightful — the image "chasing" the cursor feels alive
   - It keeps the default view clean (no images cluttering the list)

3. **Numbering (01, 02, 03, 04).** Zero-padded numbers feel intentional and designed. They also create a subtle left column that aligns everything vertically.

4. **Project names in Syne 700.** Large enough to be scannable, distinct enough from body text to feel like titles. The weight drops from 800 (hero) to 700 (works) to create hierarchy — the hero is the biggest statement, the works are supporting.

5. **Lime accent on hover.** Only the project name changes color on hover (not the whole row). This creates a targeted, refined effect. Changing the entire row color would feel clumsy.

6. **Arrow icons.** Small SVG arrows in the top-right corner of each item suggest "view project." They translate diagonally on hover (`translate(4px, -4px)`), mimicking the gesture of "going to" something.

---

## 7. Three.js Shader Design

### The Morphing Blob Concept

**Why a blob and not something else?**

| 3D Option | Pros | Cons | Verdict |
|-----------|------|------|---------|
| Particle field | Ethereal, common on award sites | Can feel disconnected from the page, hard to see on dark bg | ❌ |
| Geometric shape | Clean, minimal | Too corporate, not organic enough | ❌ |
| Morphing blob | Organic, alive, creates visual gravity | Requires custom shaders | ✅ |
| 3D text | Dramatic, literal | Clashes with 2D text overlay, loading complexity | ❌ |
| Abstract mesh | Unique | Undefined aesthetic, hard to control | ❌ |

**Decision: Morphing blob** — It creates a focal point that draws the eye. The organic movement makes the page feel alive without being distracting. The blob also provides a natural "glow" that illuminates the text behind it, creating depth.

### Geometry Choice

**IcosahedronGeometry vs SphereGeometry:**

- `SphereGeometry(1.8, 128, 128)` — Has UV coordinates and even segments, but vertices cluster at the poles, causing visible pinching when displaced
- `IcosahedronGeometry(1.8, 5)` — Distributes vertices more evenly across the surface (no poles), creating smoother deformation. Trade-off: less standard UV mapping, but UVs aren't needed for this shader

**Decision: IcosahedronGeometry** with radius 1.8 and detail level 5 (20,480 faces). This provides smooth-enough geometry for noise displacement without overloading the GPU.

**Mobile reduction:** On screens < 768px, radius drops to 1.3 and detail to 4 (5,120 faces) to maintain 60fps on weaker GPUs.

### Vertex Shader: Multi-Octave Noise

The deformation uses **Ashima Arts' simplex 3D noise** — the de facto standard noise function for WebGL. The key creative decision was using **three octaves** of noise at different frequencies and amplitudes:

```glsl
float n  = snoise(position * uFrequency + uTime * 0.25);          // Base shape
      n += snoise(position * uFrequency * 2.0 + uTime * 0.4) * 0.4;  // Medium detail
      n += snoise(position * uFrequency * 4.0 + uTime * 0.6) * 0.15; // Fine detail
```

**Why three octaves?**
- **1 octave alone** produces smooth, blobby deformation — looks like a stress ball
- **2 octaves** adds medium-frequency detail — starts to look geological
- **3 octaves** adds fine-frequency ripples — creates an organic, almost biological texture

Each octave doubles in frequency (`uFrequency * 1, 2, 4`) and halves in amplitude (`1.0, 0.4, 0.15`), following the standard Perlin noise fractal pattern.

**Time offsets are different per octave** (`0.25, 0.4, 0.6`). If all octaves animated at the same speed, the blob would morph uniformly. Different speeds create complex, unpredictable movement that feels truly alive.

### Fragment Shader: Color & Lighting

The fragment shader creates the blob's visual identity through three techniques:

1. **Displacement-based coloring:**
```glsl
float t = clamp(vDisplacement * 2.0 + 0.5, 0.0, 1.0);
vec3 color = mix(dark, mid, smoothstep(0.0, 0.45, t));
color = mix(color, accent, smoothstep(0.55, 1.0, t));
```
Peaks (high displacement) glow lime green. Valleys (low displacement) are near-black. The transition zone is a dark olive-green that bridges the two. This creates a topographic map effect — the blob looks like it's lit from within.

2. **Fresnel rim glow:**
```glsl
float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 3.5);
color += accent * fresnel * 0.18;
```
The edges of the sphere glow with a subtle lime outline. The Fresnel effect mimics how real objects reflect more light at glancing angles. This separates the blob from the background and gives it a holographic quality. The exponent (3.5) was tuned to be subtle — too strong and it looks like an X-ray, too weak and it disappears.

3. **Ambient occlusion simulation:**
```glsl
color *= 0.72 + 0.28 * smoothstep(-0.4, 0.4, vDisplacement);
```
Valleys (negative displacement) are darkened, simulating how real concave surfaces receive less light. This adds depth and prevents the blob from looking flat despite having no actual light sources.

### Position & Scale

- **Desktop:** `blob.position.x = 0.5` — Shifted slightly right of center. This prevents the blob from sitting directly behind the title text (which is left-aligned), creating a more dynamic composition where the text and blob overlap asymmetrically.
- **Mobile:** `blob.position.x = 0, blob.position.y = 0.3` — Centered and slightly raised. On mobile, the title text stacks vertically and needs the blob centered behind it.
- **Camera:** `FOV 55, z = 4.2` (desktop) / `z = 5` (mobile). Lower FOV than the default 75 reduces perspective distortion, making the blob feel less "in your face." Mobile pulls the camera back to fit the smaller blob in frame.

---

## 8. Animation Architecture

### Preloader Sequence

**Why a preloader?** Award-winning sites use preloaders not just to hide loading times, but to create anticipation. The transition from preloader to hero is the site's "opening act."

**Timeline:**
```
0.0s ─────── Counter 0 → 100 ─────── 2.2s ── 0.15s gap ── Slide up ── 0.9s
                                                              │
                                                              ▼
                                                        initApp() fires
                                                        Hero animations begin
```

The counter animation uses `power2.inOut` easing — it starts slow, accelerates in the middle (creating excitement), and decelerates at the end (creating anticipation before the reveal). The 0.15s gap between counter completion and slide-up gives the user a moment to register "100%" before the reveal.

### Hero Entry Sequence

After the preloader slides up, elements enter in a carefully staggered order:

```
0.0s  Nav fades in (opacity: 0 → 1, y: -20 → 0)
0.1s  Eyebrow text slides up from mask
0.25s Title characters enter (y: 110%, rotationX: -60° → 0)
        └── Each character has 0.025s stagger
0.8s  Tagline lines slide up from masks
1.1s  Scroll indicator fades in
```

**Why this order?** The human eye naturally reads top-to-bottom, left-to-right. The animation follows this pattern: nav (top) → eyebrow (above title) → title (center) → tagline (bottom-left) → scroll indicator (bottom-right). This creates a waterfall effect that guides attention naturally.

**Character animation detail:** Each title character enters with both `y: 110%` and `rotationX: -60°`. The Y-translation creates a mask-reveal effect (characters slide up from behind the `.title-line` overflow). The X-rotation adds a 3D "flipping up" quality that would be impossible with Y-translation alone. The stagger of 0.025s (25ms per character) makes the entire "ELENA" title resolve in ~125ms — fast enough to feel snappy, slow enough to be perceivable.

### Scroll-Triggered Animations

**Marquee parallax:**
```javascript
gsap.to(track, {
  xPercent: -25,
  scrub: 0.5   // 500ms delay behind scroll position
});
```
The marquee moves 25% of its width as the about section scrolls through. `scrub: 0.5` means the marquee position lags 500ms behind the actual scroll, creating a smooth, elastic feel rather than 1:1 mechanical movement.

**Stat counter animation:**
```javascript
gsap.to(obj, {
  val: target,
  duration: 2,
  ease: 'power2.out'
});
```
Numbers count up with deceleration (`power2.out`) — they start fast and slow down as they approach the target. This feels natural because our brains expect counting to slow as numbers get larger. A linear count feels robotic.

**Staggered work items:**
```javascript
gsap.utils.toArray('.work-item').forEach((item, i) => {
  gsap.from(item, {
    y: 50,
    delay: i * 0.1
  });
});
```
Each work item enters 100ms after the previous one. This creates a cascading "domino" effect that makes the list feel like it's being revealed sequentially, matching the numbered ordering (01, 02, 03, 04).

### Custom Cursor Implementation

**Two-element approach:**
- **Dot** (8px, lime, 0.08s delay) — Represents precision, moves almost instantly
- **Outline** (40px, white border, 0.28s delay) — Represents influence area, follows with elasticity

**Why two elements?** A single cursor element feels static. The separation between the fast dot and the slower outline creates a satisfying "stretch and snap" feel that makes cursor movement feel physical. The `mix-blend-mode: difference` inverts colors under the cursor, ensuring visibility on both light and dark areas.

**Hover state change:** When hovering over interactive elements, the outline expands to 64px and the dot disappears (`scale: 0`). This signals "this element is clickable" without using the traditional pointer cursor, which would feel generic on a site with a custom cursor.

### Magnetic Buttons

```javascript
btn.addEventListener('mousemove', (e) => {
  var x = e.clientX - rect.left - rect.width / 2;
  var y = e.clientY - rect.top - rect.height / 2;
  gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3 });
});
```

Nav links and the CTA button "pull" toward the cursor when it's nearby. The displacement is 25% of the cursor offset from center (`x * 0.25`), creating a gentle tug. On mouse leave, the element springs back with `elastic.out(1, 0.5)` easing — a bouncy, playful return that makes the interaction feel fun.

**Disabled on touch devices** — Magnetic effects only make sense with a hovering cursor. On touch, they would cause elements to shift under the finger, creating a frustrating experience.

---

## 9. Responsive Strategy

### Breakpoint Philosophy

Rather than mobile-first, a **desktop-first** approach was chosen because:
1. The hero's Three.js blob and massive typography are designed for large viewports
2. Award-winning sites are typically experienced first on desktop
3. Mobile adaptations are subtractive (remove complexity) rather than additive

### Breakpoint Map

```
> 1024px    Desktop (full experience)
≤ 1024px    Tablet (single-column about, stacked work info)
≤ 768px     Mobile (hidden CTA, smaller title, no hover effects)
≤ 480px     Small mobile (further reduced spacing)
```

### Key Responsive Decisions

**Hero title scaling journey:**

| Viewport | Font Size | Calculation | Result |
|----------|-----------|-------------|--------|
| 1920px | 11vw | 211px → capped at 11rem (176px) | 176px |
| 1440px | 11vw | 158px | 158px |
| 1024px | 11vw | 113px | 113px |
| 768px | 11vw → overridden to 11vw, max 4.5rem | 72px | 72px |
| 390px | 11vw | 42.9px → clamped at min 2.5rem (40px) | 42.9px |

**"VASQUEZ" fitting calculation for 390px mobile:**
```
Available width = 390px - (1.5rem × 2 padding) - 0.5rem indent
                = 390 - 48 - 8 = 334px

"VASQUEZ" = 7 characters × ~0.7em avg width × 42.9px font-size
          = 7 × 0.7 × 42.9 ≈ 210px

210px < 334px ✅ fits with room to spare
```

**Mobile interactions removed:**
- Custom cursor → Hidden (touch devices have no hover cursor)
- Hover image follower → Hidden (no hover on touch)
- Magnetic buttons → Disabled (would cause touch drift)
- Work item hover padding → Reduced from 3rem to 1.5rem

**Mobile layout shifts:**
- About grid: 2 columns → 1 column
- Hero bottom: horizontal → vertical stack
- Scroll indicator: vertical line → horizontal line
- Work item info: inline → stacked

### Accessibility: `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is not optional — it's a moral imperative. Users with vestibular disorders or motion sensitivity can experience nausea from animations. The query disables all animations instantly, providing a static but fully functional experience.

---

## 10. Image Generation & Asset Pipeline

### Why Generated Images Instead of Placeholders

The brief says "don't use placeholders." Using gray boxes or Lorem Picsum photos would undermine the premium feel of the portfolio. Each project needs to look like a real design piece.

### Image Prompt Strategy

Each prompt was crafted to produce an image that looks like a real portfolio piece:

| Project | Prompt Focus | Visual Characteristics |
|---------|-------------|----------------------|
| **Luminary** | Luxury lighting brand website | Dark bg, golden fixtures, serif typography, warm glow |
| **Nomad** | Travel app mobile UI | Card-based interface, mountain landscape, glass morphism |
| **Velvet** | Fashion e-commerce | Editorial layout, model in minimal clothing, thin serifs |
| **Prism** | Digital art gallery | Abstract 3D art, neon colors, asymmetric grid |

**Deliberate variety:** The four projects span different design disciplines (brand identity, mobile app, e-commerce, creative direction) to demonstrate Elena's range as a "multidisciplinary designer."

### Asset Pipeline

```
generate_image → Artifacts directory → copy → designer-portfolio/assets/
```

Images were generated as PNGs, copied to the project's `assets/` folder, and referenced via relative paths (`assets/luminary.png`). This keeps the project self-contained and portable.

---

## 11. Implementation Order

### Why This Specific Order

```
1. HTML structure (skeleton)
2. CSS design system (visual foundation)
3. JavaScript interactions (life)
4. Image generation (content)
5. Image integration (assembly)
6. Browser verification (quality)
7. Bug fixes (polish)
8. Re-verification (confidence)
```

**HTML first** — because it defines the DOM structure that CSS and JS will reference. Changing HTML later means cascading changes to selectors and query selectors.

**CSS second** — because the visual design needs to be right before animations are layered on. Animating to wrong positions wastes time.

**JS third** — because animations and interactions are the final layer. GSAP animates from/to CSS-defined states, so CSS must be stable first.

**All three files were created in parallel** — since they're independent file-creation operations, writing them simultaneously saved significant time.

### File Size Budget

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | ~145 | Semantic structure, CDN imports, content |
| `styles.css` | ~500 | Complete design system + responsive |
| `main.js` | ~350 | Three.js, GSAP, interactions |
| **Total** | **~995** | Entire site in under 1000 lines |

This constraint was intentional — a portfolio page should be lean. Every line earns its place.

---

## 12. Bug Fixes & Iterations

### Issue 1: "VASQUEZ" Wrapping on Desktop

**Problem:** At the original `clamp(3.5rem, 12vw, 14rem)`, "VASQUEZ" wrapped into three lines ("VASQU" / "EZ") on the first desktop test.

**Root cause:** 14rem = 224px per character × 7 characters = ~1,568px, which exceeds the content area width (max-width 1600px minus padding).

**Fix:** Reduced to `clamp(3.5rem, 11vw, 11rem)` and added `white-space: nowrap`. The `nowrap` acts as a safety net — if the text ever threatens to wrap, it stays on one line and the `overflow: hidden` on `.title-line` clips it (though at 11rem max, it fits comfortably).

### Issue 2: Mobile Title Clipping

**Problem:** On 390px viewports, "VASQUEZ" was clipped by the `.title-line` overflow hidden. The font size at `15vw` = 58.5px was too large.

**Root cause:** The mobile breakpoint font size (`clamp(2.8rem, 15vw, 5rem)`) combined with the 1rem indent exceeded the available width.

**Fix:** Reduced to `clamp(2.5rem, 11vw, 4.5rem)` and indent to `0.5rem`. At 390px, 11vw = 42.9px, giving "VASQUEZ" approximately 210px width in a 334px container — comfortably fitting.

### Issue 3: Hover Image Z-Index Overlap

**Problem:** The works hover image (z-index 900) appeared above the navigation bar, creating visual hierarchy confusion.

**Fix:** Reduced hover image z-index to 100, well below the nav (z-index 1000) but above the works section content.

---

## 13. Verification & QA

### Desktop Verification ✅

- **Hero:** "ELENA" on line 1, "VASQUEZ" on line 2, no wrapping
- **Three.js blob:** Renders correctly, morphing animation plays, lime-green shading visible
- **Preloader:** Counter animates 0→100, bar fills, slides up
- **Navigation:** Fixed at top, all 4 links visible, CTA button with border
- **About marquee:** Outlined text visible, scroll-driven movement works
- **About grid:** Two-column layout, stats display correctly (10+, 50+, 12)
- **Works list:** All 4 items visible, numbered, categorized, dated
- **Hover effects:** Project names highlight lime, arrows translate
- **Console:** Zero errors (only expected 404 for favicon.ico)

### Mobile Verification ✅

- **Layout shifts correctly** at 768px breakpoint
- **Nav:** CTA hidden, links remain with smaller font
- **Hero:** Title visible and readable
- **Scroll indicator:** Converts from vertical to horizontal
- **About:** Single column, stats stack vertically
- **Works:** Items display cleanly, year and arrow hidden

---

## 14. Final Reflections

### What Makes This "Awwwards-Worthy"

1. **The Three.js blob is a real 3D scene** with custom GLSL shaders, not a CSS animation or pre-rendered video. Judges notice genuine technical craft.

2. **Typography does the heavy lifting.** The hero title at 11rem with Syne 800 creates immediate visual impact. Most portfolios use 3-4rem titles — going 3x larger signals confidence.

3. **The interaction model is layered.** Custom cursor + magnetic buttons + hover image follower + scroll-triggered reveals = every moment of browsing feels crafted.

4. **Restraint in color.** Using a single accent color (lime) on a near-black base creates a gallery-like focus. Sites with 4-5 colors feel cluttered.

5. **Film grain adds texture.** The subtle SVG noise overlay prevents the dark background from feeling like a flat screen. It adds the tactile quality of printed media.

6. **Performance consciousness.** No framework overhead, reduced Three.js complexity on mobile, will-change hints on animated elements, requestAnimationFrame for the render loop.

### What Would Come Next (Sections 4+)

If the session limit weren't a constraint, the next sections would be:

- **Section 4: Process** — A horizontal scroll section showing the designer's methodology (Research → Ideate → Design → Test → Ship) with animated illustrations
- **Section 5: Testimonials** — Large pull quotes from clients with subtle parallax
- **Section 6: Contact** — Split layout with a form on the left and social links/availability on the right, animated on scroll entry
- **Footer** — Minimal, with copyright, a "made with ♥ in Barcelona" tagline, and back-to-top functionality

### The Underlying Philosophy

This portfolio follows a single design principle: **every element earns its place.** There are no decorative elements without function, no animations without meaning, no technical choices without reasoning. The blob isn't just cool — it communicates creativity. The stat counters don't just animate — they create narrative tension. The hover images don't just appear — they reward curiosity.

This is what separates award-winning work from good work: intentionality at every level.

---

*Document created: June 15, 2026*
*Project: Elena Vasquez Designer Portfolio*
*Location: `designer-portfolio/`*
