# Olivia Harper Homes — Component Library Reference
**Target**: Production AI UI Generator (React, Tailwind CSS, Framer Motion, GSAP)

This document translates the visual language of `oliviaharperhomes.com` into highly structured component definitions. Each component specifies its anatomy, props, layout rules, and animation behaviors.

---

## 1. Global Layout & Structural Components

### 1.1. `PageInsetFrame`
**Purpose**: Creates the signature 15px gallery frame effect around the entire site.
**Anatomy**:
```tsx
const PageInsetFrame = ({ children }) => (
  <main className="p-[15px] bg-[#EEEBE4] min-h-screen text-[#313131] font-display selection:bg-[#96847A] selection:text-white">
    {children}
  </main>
);
```

### 1.2. `CustomCursor` (JPTV Puntero Circular Fluido)
**Purpose**: Replaces the default pointer on specific footer/brand elements.
**Anatomy**:
```tsx
// Requires lerp logic via Framer Motion or requestAnimationFrame
<motion.div 
  className="fixed top-0 left-0 z-[999999] pointer-events-none flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#B6AB99]/65 shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
  animate={{ x: mouseX, y: mouseY, scale: isHovering ? 1 : 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }} // Matches cubic-bezier(0.34, 1.56, 0.64, 1)
>
  <svg className="w-[35%] h-[35%] fill-[#313131]" viewBox="0 0 24 24">
    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"/>
  </svg>
</motion.div>
```

---

## 2. Navigation Components

### 2.1. `Header`
**Purpose**: Primary navigation bar with 3-column layout.
**State**: 
- `isTransparent` (Homepage hero: text white, bg transparent)
- `isSolid` (Inner pages: text charcoal, bg ivory)
**Anatomy**:
```tsx
<header className={`sticky top-0 z-50 px-[15px] flex items-center justify-between h-[80px] ${isTransparent ? 'bg-black/10 text-white' : 'bg-[#EEEBE4] text-[#313131]'}`}>
  <nav className="flex gap-6 font-ui text-[17px] font-normal">
    {/* Nav Items */}
  </nav>
  <div className="absolute left-1/2 -translate-x-1/2">
    <LogoSVG className="hover:scale-95 transition-transform duration-300" />
  </div>
  <div className="flex gap-4 items-center">
    <Button variant="outline">Contact Us</Button>
    <SocialIcon type="instagram" />
  </div>
</header>
```

### 2.2. `NavItem`
**Purpose**: Navigation link with animated slide-in underline.
**Anatomy**:
```tsx
<a href={href} className="group relative overflow-hidden py-2">
  {label}
  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
</a>
```

---

## 3. UI Primitives

### 3.1. `Button` (CTA)
**Purpose**: Primary interaction points.
**Design Rules**: Always sharp corners (0px radius). Fill animates from bottom to top.
**Anatomy**:
```tsx
<button className="relative overflow-hidden border border-current px-6 py-3 text-[17px] font-ui group">
  <span className="relative z-10 group-hover:text-[#EEEBE4] transition-colors duration-300">{children}</span>
  <div className="absolute bottom-0 left-0 w-full h-0 bg-[#424242] group-hover:h-full transition-all duration-300 z-0" />
</button>
```

### 3.2. `SocialIcon`
**Purpose**: Social links with glare and spring animation.
**Anatomy**:
```tsx
<a className="relative flex items-center justify-center w-10 h-10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.05)] overflow-hidden group">
  <div className="absolute bottom-0 left-0 w-full h-0 bg-[#96847A] group-hover:h-full transition-all duration-350" />
  <i className="fab fa-instagram text-current z-10 scale-80 group-hover:scale-100 transition-transform duration-350 ease-[cubic-bezier(0.31,-0.105,0.43,1.59)]" />
</a>
```

---

## 4. Typography & Storytelling Components

### 4.1. `ScrollRevealText`
**Purpose**: Paragraphs that change color line-by-line on scroll.
**Implementation Notes**: Requires GSAP ScrollTrigger + SplitText.
**Anatomy**:
```tsx
// The text starts as #B6AB99 (Sand) and transitions to #313131 (Charcoal)
<p className="font-display font-light text-[17px] leading-[1.4em] text-[#B6AB99]" data-scroll-reveal>
  {/* GSAP splits this into lines. ScrollTrigger animates color to #313131 */}
</p>
```

### 4.2. `DisplayHeading`
**Purpose**: Large, tight-leading section headers.
**Anatomy**:
```tsx
<h2 className="font-display font-normal text-[65px] md:text-[75px] leading-[1em] text-[#96847A]">
  {children}
</h2>
```

---

## 5. Form Components

### 5.1. `ContactForm`
**Purpose**: Pre-qualifying lead generation form.
**Design Rules**: 50/50 split on desktop, no visible labels, minimal borders.
**Anatomy**:
```tsx
<form className="grid grid-cols-2 gap-4 w-full">
  <Input placeholder="First Name*" required className="col-span-1" />
  <Input placeholder="Last Name*" required className="col-span-1" />
  <Input type="email" placeholder="Email Address*" required className="col-span-2" />
  <Input type="tel" placeholder="Phone Number" className="col-span-2" />
  <Input placeholder="Company / Organization" required className="col-span-2" />
  
  <Select className="col-span-2" required>
    <option value="" disabled>Type of Inquiry</option>
    <option>Investment Opportunity</option>
    <option>Property Acquisition</option>
    {/* ... */}
  </Select>
  
  <Select className="col-span-2" required>
    <option value="" disabled>Estimated Investment Range</option>
    <option>$250K – $500K</option>
    <option>$500K – $1M</option>
    <option>$1M – $5M</option>
    <option>$5M+</option>
  </Select>
  
  <Textarea placeholder="Message" rows={4} className="col-span-2" />
  
  <Checkbox label="I agree to the Privacy Policy..." className="col-span-2" required />
  
  <button type="submit" className="col-span-2 w-full bg-[#424242] text-white py-3 font-ui flex items-center justify-center gap-2">
    <EnvelopeIcon /> Send
  </button>
</form>
```
*Note: Form fields use `.elementor-size-sm` sizing and have no visible `<label>` tags (screen-reader only).*

---

## 6. Complex Section Components

### 6.1. `StatCounters`
**Purpose**: Trust-building metric display.
**Anatomy**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1200px]">
  <div className="flex flex-col items-start border-l border-transparent md:border-[#EEEBE4]">
    <span className="font-display font-light text-[65px] text-[#B6AB99] leading-[1em]">98%</span>
    <span className="font-display font-light text-[17px] text-[#313131] mt-2">Sale price to list price ratio</span>
  </div>
  {/* Repeats for other stats */}
</div>
```

### 6.2. `ProjectCard`
**Purpose**: Portfolio grid item.
**Anatomy**:
```tsx
<div className="relative rounded-[15px] overflow-hidden aspect-[3/2] group cursor-pointer">
  {/* Badge */}
  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm font-ui text-[13px] text-[#313131]">
    {status} {/* e.g. "Completed project" */}
  </div>
  
  {/* Image with zoom hover */}
  <img src={src} className="w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
  
  {/* Gradient Overlay */}
  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
  
  {/* Content */}
  <div className="absolute bottom-4 left-4 z-20 text-white">
    <h3 className="font-display text-[32px]">{title}</h3>
    <p className="font-ui text-[15px] flex items-center gap-2 mt-1">
      <span className="text-[10px]">●</span> See more
    </p>
  </div>
</div>
```

### 6.3. `FooterCTA`
**Purpose**: Half-viewport "Talk to Us" block.
**Anatomy**:
```tsx
<section className="relative w-full min-h-[50vh] rounded-[20px] overflow-hidden flex items-end p-10 cursor-areaolivia">
  <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" />
  
  {/* Multiply blend overlay in Taupe */}
  <div className="absolute inset-0 bg-[#96847A] mix-blend-multiply opacity-[0.63] transition-opacity duration-500 hover:opacity-100" />
  
  <div className="relative z-10 text-white">
    <h2 className="font-display text-[75px] leading-[1em]">Talk to Us</h2>
  </div>
</section>
```

---

## 7. Informational & Layout Components

### 7.1. `TeamProfileCard`
**Purpose**: Dual-photo team member presentation.
**Anatomy**:
```tsx
<div className="flex flex-col gap-6">
  <div className="flex gap-4">
    {/* Portrait (3:4) */}
    <div className="w-1/2 aspect-[3/4] overflow-hidden rounded-[15px]">
      <img src={portraitSrc} className="w-full h-full object-cover" />
    </div>
    {/* Working Candid (16:9) */}
    <div className="w-1/2 aspect-[16/9] mt-auto overflow-hidden rounded-[15px]">
      <img src={candidSrc} className="w-full h-full object-cover" />
    </div>
  </div>
  <div>
    <h3 className="font-display text-[45px] text-[#EEEBE4]">{name}</h3>
    <p className="font-ui text-[15px] text-[#EEEBE4]/70">{title}</p>
    <p className="font-display font-light text-[17px] text-[#EEEBE4] mt-4">{bio}</p>
  </div>
</div>
```

### 7.2. `ServiceAccordion`
**Purpose**: Expandable service listing with alphabetical indexing.
**Anatomy**:
```tsx
<div className="border-t border-[#313131]/20 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start cursor-pointer group">
  <div className="flex items-start gap-6">
    {/* Alphabet Index */}
    <div className="w-12 h-12 flex-shrink-0 bg-[#96847A] text-white flex justify-center items-center font-ui text-[15px]">
      {indexLetter} {/* e.g., "A" */}
    </div>
    <div>
      <h3 className="font-display text-[32px] group-hover:text-[#96847A] transition-colors">{title}</h3>
      <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300 mt-4">
        <p className="font-display font-light text-[17px] text-[#313131]/80">{description}</p>
      </div>
    </div>
  </div>
  <div className="aspect-[16/9] rounded-[15px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <img src={imageSrc} className="w-full h-full object-cover" />
  </div>
</div>
```

### 7.3. `AwwwardsBadge`
**Purpose**: Credibility signal anchored to the right side of the screen.
**Anatomy**:
```tsx
<aside className="fixed right-0 top-1/2 -translate-y-1/2 z-[999]">
  <a href="https://www.awwwards.com/sites/olivia-harper-homes" target="_blank" rel="noopener noreferrer">
    <div className="bg-white text-black py-4 px-2 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
      {/* SVG Badge Content */}
      <span className="[writing-mode:vertical-rl] font-ui text-[13px] font-bold tracking-widest uppercase">
        W. Nominee
      </span>
    </div>
  </a>
</aside>
```

### 7.4. `MobileMenuOverlay`
**Purpose**: Hamburger menu overlay for tablet/mobile.
**Anatomy**:
```tsx
<div className="fixed inset-0 z-40 bg-[#EEEBE4] flex flex-col justify-center items-center p-8 transition-transform duration-500">
  <button className="absolute top-6 right-6 p-2" onClick={closeMenu}>
    <CloseXIcon className="w-8 h-8 fill-[#313131]" />
  </button>
  <nav className="flex flex-col gap-6 text-center">
    <a href="/projects" className="font-display text-[45px] text-[#313131] hover:text-[#96847A]">Projects</a>
    <a href="/services" className="font-display text-[45px] text-[#313131] hover:text-[#96847A]">Services</a>
    {/* ... */}
  </nav>
</div>
```

### 7.5 `RollingTextHero` (GSAP)
**Purpose**: Homepage "Scroll to explore" text with character-level clone rolling animation.
**Anatomy**:
```tsx
<a href="#explore" className="group flex items-center gap-4 cursor-pointer">
  {/* Mouse indicator with bounce animation */}
  <div className="w-[30px] h-[50px] border border-[#EEEBE4] rounded-[50px] flex justify-center p-2">
    <div className="w-[4px] h-[4px] bg-[#EEEBE4] rounded-full animate-[scroll_2.2s_infinite]" />
  </div>
  
  {/* Rolling Text wrapper */}
  <div className="relative overflow-hidden font-ui text-[17px] text-[#EEEBE4]">
    <span className="block group-hover:-translate-y-full transition-transform duration-300 will-change-transform">
      Scroll to explore
    </span>
    <span className="absolute top-0 left-0 text-[#EEEBE4] translate-y-full group-hover:translate-y-0 transition-transform duration-300 will-change-transform">
      Scroll to explore
    </span>
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#EEEBE4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </div>
</a>
```

### 7.6 `LottieTitle`
**Purpose**: Animated "Timeless residences" SVG title on homepage load.
**Anatomy**:
```tsx
<div className="w-full max-w-[800px]">
  <Lottie 
    animationData={timelessResidencesJSON} 
    loop={false}
    speed={1.6} // Fast, crisp reveal
    renderer="svg" // Vector rendering required
    className="w-full h-auto"
  />
</div>
```

### 7.7 `FooterLayout`
**Purpose**: Final page endpoint with dense utility linking.
**Anatomy**:
```tsx
<footer className="w-full bg-[#96847A] rounded-t-[20px] pt-20 px-10 pb-10 text-[#EEEBE4]">
  {/* ... FooterCTA sits above this ... */}
  
  <div className="flex flex-col items-center text-center my-16">
    <LogoSVG className="w-[200px] h-auto fill-[#EEEBE4]" />
    <h3 className="font-display italic text-[36px] mt-8 max-w-[800px] leading-[1.2em]">
      Decades of combined experience, shaping homes defined 
      <span className="text-[#B6AB99]"> by quality, intention, and long-term value.</span>
    </h3>
  </div>
  
  <hr className="border-[#EEEBE4]/20 my-12" />
  
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-ui text-[15px]">
    <nav className="flex flex-col gap-2">
      <h4 className="text-[#B6AB99] mb-4">Navigation</h4>
      <a href="#">About Us</a>
      <a href="#">Services</a>
      {/* ... */}
    </nav>
    <nav className="flex flex-col gap-2">
      <h4 className="text-[#B6AB99] mb-4">Legal</h4>
      <a href="#">Privacy Policy</a>
      {/* ... */}
    </nav>
    <div className="flex flex-col gap-2">
      <h4 className="text-[#B6AB99] mb-4">Last Projects</h4>
      <span>1000 89 St, Surfside</span>
      {/* ... */}
    </div>
    <div className="flex flex-col gap-2">
      <h4 className="text-[#B6AB99] mb-4">Contact Us</h4>
      <span>305-336-7195</span>
      <span>4770 Biscayne Blvd...</span>
      <div className="flex gap-4 mt-4">
        <SocialIcon type="whatsapp" />
        <SocialIcon type="instagram" />
      </div>
    </div>
  </div>
</footer>
```
