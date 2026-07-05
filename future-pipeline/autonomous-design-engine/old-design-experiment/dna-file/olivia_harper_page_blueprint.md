# Olivia Harper Homes — Page Blueprints
**Target**: Production AI Page Generator (Next.js App Router / FSD Architecture)

This document provides strict compositional blueprints for every page type, detailing the exact sequence of components required to assemble each route.

---

## 1. Homepage (`/`)
**Layout Wrapper**: `PageInsetFrame` (Canvas — no default global header/footer)

| Seq | Component | Role | Data / Props |
|---|---|---|---|
| 01 | `Header` | Navigation | `isTransparent: true`, `position: sticky` |
| 02 | `HeroCanvas` | Initial Impact | Lottie Title (`timelessResidencesJSON`), Background Slideshow |
| 03 | `RollingTextHero` | Scroll Prompt | Positioned bottom-left of hero |
| 04 | `ScrollRevealText`| Narrative | "We approach every inquiry..." (GSAP SplitText trigger at 40%) |
| 05 | `StatCounters` | Social Proof | `stats: [{val: "98%", label: "..."}, {val: "$85MM", label: "..."}, {val: "87%", label: "..."}]` |
| 06 | `SlideshowSection`| Visual Teaser | Swiper slider with project thumbnails |
| 07 | `FooterCTA` | Final Action | `title: "Talk to Us"`, `bgImage: '/cta-bg.jpg'` |
| 08 | `FooterLayout` | Utilities | Links, Legal, Secondary Navigation |

---

## 2. Vision Page (`/vision`)
**Layout Wrapper**: `PageInsetFrame` + Standard App Layout

| Seq | Component | Role | Data / Props |
|---|---|---|---|
| 01 | `Header` | Navigation | `isSolid: true` |
| 02 | `BreadcrumbBar` | Wayfinding | `pageName: "Vision"` |
| 03 | `HeroInner` | Section Intro | `title: "Our Visión"`, `bgPattern: "OH_Monogram_Arches"` |
| 04 | `FloatingImage` | Grid Break | `align: "right"`, overlaps hero bottom edge by 15% |
| 05 | `DisplayHeading` | Narrative | Large mission statement text |
| 06 | `FooterCTA` | Final Action | `title: "Talk to Us"` |
| 07 | `FooterLayout` | Utilities | Links, Legal |

---

## 3. Services Page (`/services`)
**Layout Wrapper**: `PageInsetFrame` + Standard App Layout

| Seq | Component | Role | Data / Props |
|---|---|---|---|
| 01 | `Header` | Navigation | `isSolid: true` |
| 02 | `BreadcrumbBar` | Wayfinding | `pageName: "Services"` |
| 03 | `HeroInner` | Section Intro | `title: "Our Services"`, `bgImage: '/services-hero.jpg'` (80vh height) |
| 04 | `TextLink` | Wayfinding | `label: "● Last projects"`, `href: "/homes-projects"` |
| 05 | `ServiceAccordion`| Content | Array of 3+ services with `indexLetter`, `title`, `desc`, `image` |
| 06 | `FooterCTA` | Final Action | `title: "Talk to Us"` |
| 07 | `FooterLayout` | Utilities | Links, Legal |

---

## 4. About Us (`/about-us`)
**Layout Wrapper**: `PageInsetFrame` + Standard App Layout

| Seq | Component | Role | Data / Props |
|---|---|---|---|
| 01 | `Header` | Navigation | `isSolid: true` |
| 02 | `BreadcrumbBar` | Wayfinding | `pageName: "About Us"` |
| 03 | `HeroInner` | Section Intro | `title: "About Us"` |
| 04 | `SectionWrapper` | Team Container | `bgColor: "primary"` (#96847A - Warm Taupe) |
| 05 | `TeamProfileCard` | Founder 1 | `name: "Jack Echterling"`, `portraitSrc`, `candidSrc` |
| 06 | `TeamProfileCard` | Founder 2 | `name: "John Schamy"`, `portraitSrc`, `candidSrc` |
| 07 | `FooterCTA` | Final Action | `title: "Talk to Us"` |
| 08 | `FooterLayout` | Utilities | Links, Legal |

---

## 5. Contact Page (`/contact`)
**Layout Wrapper**: `PageInsetFrame` + Standard App Layout (No Scroll)

| Seq | Component | Role | Data / Props |
|---|---|---|---|
| 01 | `Header` | Navigation | `isSolid: true` |
| 02 | `BreadcrumbBar` | Wayfinding | `pageName: "Contact"` |
| 03 | `SectionWrapper` | Full-screen | `bgColor: "secondary"`, `overlay: "4% black"` |
| 04 | `TwoColumnGrid` | Layout | `split: "50/50"` |
| 05 | `ContactInfo` | Left Column | Title: "Talk to us!", Phone, Address |
| 06 | `ContactForm` | Right Column | `requiresQualification: true` (Company, Inv. Range) |
| 07 | `FooterLayout` | Utilities | Links, Legal |

---

## 6. Projects Listing (`/homes-projects`)
**Layout Wrapper**: `PageInsetFrame` + Standard App Layout

| Seq | Component | Role | Data / Props |
|---|---|---|---|
| 01 | `Header` | Navigation | `isSolid: true` |
| 02 | `BreadcrumbBar` | Wayfinding | `pageName: "Homes & Projects"` |
| 03 | `DisplayHeading` | Section Title | `text: "Our Last Projects"` |
| 04 | `FilterTabs` | Sorting | `options: ["Completed project", "Current developments"]` |
| 05 | `ProjectGrid` | Content Grid | Maps `ProjectCard` array, 2-column layout |
| 06 | `FooterCTA` | Final Action | `title: "Talk to Us"` |
| 07 | `FooterLayout` | Utilities | Links, Legal |

---

## 7. Single Project Detail (`/projects/[slug]`)
**Layout Wrapper**: `PageInsetFrame` + Standard App Layout

| Seq | Component | Role | Data / Props |
|---|---|---|---|
| 01 | `Header` | Navigation | `isTransparent: true` |
| 02 | `HeroProperty` | Cinematic | Full-bleed hero, 16:9 ratio, property name overlaid |
| 03 | `PropertySpecs` | Metadata | Location, Status, Completion Year |
| 04 | `MasonryGallery` | Visuals | Array of dynamic property images |
| 05 | `ProjectNav` | Wayfinding | Previous/Next project links |
| 06 | `FooterCTA` | Final Action | `title: "Talk to Us"` |
| 07 | `FooterLayout` | Utilities | Links, Legal |

---

## 8. Legal Pages (`/privacy-policy`, `/terms-of-service`, etc.)
**Layout Wrapper**: `PageInsetFrame` + Standard App Layout

| Seq | Component | Role | Data / Props |
|---|---|---|---|
| 01 | `Header` | Navigation | `isSolid: true` |
| 02 | `BreadcrumbBar` | Wayfinding | `pageName: "[Legal Page Name]"` |
| 03 | `SectionWrapper` | Content Block | Standard top padding |
| 04 | `RichTextProse` | Content | Markdown/HTML payload for legal text |
| 05 | `FooterLayout` | Utilities | Links, Legal (No FooterCTA to keep minimal) |
