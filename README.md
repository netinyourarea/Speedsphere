# Connect Sphere

# Recreate and Transform This Site Into a Premium Cable & Internet Website

You are an expert creative front-end developer and UI/UX designer.

Create a completely new **multi-page-style Cable, Internet, TV & Streaming assistance website** using the supplied **Baseline — Tennis Club & Academy** template as the structural and interaction reference.

The final website must preserve the template's high-quality design system, animation quality, responsive behavior, smooth scrolling, rounded-card layout, loader, navigation, parallax effects, carousels, modal, hover interactions, and visual rhythm — but **DO NOT retain the tennis branding, tennis terminology, tennis imagery, or tennis content**.

Transform the entire experience into an original, premium **Cable + Internet + TV + Streaming third-party assistance platform**.

The website must look like a real established connectivity and entertainment company website rather than a generic affiliate landing page.

---

# 1. CORE OBJECTIVE

Build a visually impressive, trustworthy, conversion-focused website that helps visitors explore:

* Internet
* Home Wi-Fi
* Cable TV
* Television
* Streaming entertainment
* Connectivity assistance
* Service guidance
* Customer support

The business is an **independent third-party assistance platform**.

The website must NOT falsely present itself as an ISP, cable operator, television network, or official representative of another provider.

Use language such as:

* Explore
* Find options
* Compare options
* Get assistance
* Get guidance
* Learn more
* Request assistance
* Explore services
* Connectivity support

Avoid misleading language such as:

* Official provider
* Authorized provider
* We provide your internet
* Buy internet from us
* Guaranteed savings
* Guaranteed speeds
* Cheapest
* Best provider
* Official partner

The third-party relationship must be clearly visible.

---

# 2. IMPORTANT IMPLEMENTATION REQUIREMENT

Use the supplied Baseline template as the **design and interaction foundation**.

Preserve the following qualities:

* Intro loader
* Fullscreen hero
* Transparent header
* Rounded page framing
* Oversized typography
* Clip-mask text reveals
* Spring-based motion
* Smooth Lenis scrolling
* Hero parallax
* Scroll-triggered animations
* Hover spring interactions
* Carousel behavior
* Ghost typography
* Overlapping image cards
* Stats section
* Testimonials
* Fullscreen mobile navigation
* Contact modal
* Responsive layout
* Adaptive rem scaling

However, redesign the visual language and content so the final website is unmistakably a **modern connectivity and entertainment brand**.

Do NOT make a tennis website with words replaced.

This should feel like a completely new website.

---

# 3. TECHNICAL FORMAT

Create the website using:

* HTML
* CSS
* Vanilla JavaScript
* Lenis
* ES modules
* CDN importmap

No React.

No Next.js.

No Tailwind dependency.

No framework.

No build step.

The primary implementation should remain self-contained.

Use:

```html
<script type="importmap">
{
  "imports": {
    "lenis": "https://cdn.jsdelivr.net/npm/lenis@1.1.18/+esm"
  }
}
</script>
```

Initialize Lenis:

```js
const lenis = new Lenis({
  smoothWheel: true
});

function raf(t) {
  lenis.raf(t);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

Preserve the spring-based animation philosophy from the original template.

---

# 4. BRAND DIRECTION

Create a completely new fictional cable/internet assistance brand.

Use a short, modern brand name such as:

**NEXORA CONNECT**

Logo treatment:

NEXORA

CONNECT

Create a simple custom SVG connectivity symbol beside the brand name.

The branding should feel:

* Modern
* Professional
* Reliable
* Technology-driven
* Entertainment-focused
* Premium
* Consumer-friendly

Do not use a logo copied from an existing ISP.

---

# 5. NEW COLOR SYSTEM

Replace the tennis palette with a modern connectivity palette.

Use:

```css
--background: #ffffff;
--foreground: #0a0a0a;

--brand: #6c4df6;
--brand-deep: #11152f;
--brand-light: #9b88ff;

--accent-cyan: #16b8c4;
--accent-orange: #ff8a4c;

--surface: #f4f5f8;
--surface-card: #ffffff;

--ink: #0a0a0a;
--ink-soft: #69707d;

--ghost: #dfe2ea;
--hairline: #e5e7ed;

--on-brand: #ffffff;

--radius-card: 1.5rem;
--radius-card-lg: 2rem;
--radius-pill: 62.5rem;
```

Use the colors intelligently.

Do not turn the entire site purple.

Use:

* Dark navy for hero/footer
* White for clean content sections
* Light gray for informational sections
* Purple for primary branding
* Cyan for connectivity accents
* Orange only for small attention elements

Keep the overall visual experience sophisticated.

---

# 6. TYPOGRAPHY

Use **Onest**.

```html
<link
  href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap"
  rel="stylesheet">
```

Use:

* 400 body
* 500 headings
* 600 for important UI labels

Typography should be oversized and editorial like the original Baseline design.

Use tight tracking for major headings.

---

# 7. PAGE STRUCTURE

The website should be designed as a complete multi-page website.

Create these routes/pages:

1. Home
2. Internet
3. TV & Cable
4. Streaming
5. Assistance
6. Resources
7. About
8. FAQ
9. Contact
10. Privacy Policy
11. Terms & Conditions
12. Refund Policy
13. Disclaimer

If implementing as one HTML prototype, simulate these pages using sections/views and client-side navigation.

If multiple HTML files are practical, use:

```text
index.html
internet.html
tv-cable.html
streaming.html
assistance.html
resources.html
about.html
faq.html
contact.html
privacy.html
terms.html
refund.html
disclaimer.html
```

All pages must share the same design system.

---

# 8. HERO — MAJOR REDESIGN

The original tennis hero should become a cinematic connectivity hero.

Use a large modern home/lifestyle image showing:

* Modern living room
* Smart TV
* Person using laptop
* Wi-Fi router
* Connected devices
* Entertainment environment

Hero headline:

# "Stay Connected. Stay Entertained."

Use oversized uppercase typography.

The headline should reveal word-by-word from a clipping mask exactly like the Baseline template.

Supporting text:

**Explore internet, TV, cable and streaming options with independent assistance designed to make connectivity easier to understand.**

Primary CTA:

**Explore Options →**

Secondary CTA:

**Get Assistance →**

Near the CTA, visibly show:

**Independent third-party assistance platform. We help users explore and navigate available connectivity and entertainment services.**

Do not hide this message in the footer.

---

# 9. HERO VISUAL

Create a cinematic parallax image layer.

The image should show a modern connected home.

Add a subtle overlay using:

```css
linear-gradient(
  to bottom,
  rgba(17,21,47,0.72),
  rgba(17,21,47,0.35),
  rgba(17,21,47,0.82)
)
```

Preserve the original parallax behavior.

The image should be oversized vertically so scrolling never exposes its edges.

Parallax:

```text
translateY(0%) → translateY(12%)
```

---

# 10. HERO BOTTOM CARDS

Replace the tennis collection slider with a **Services slider**.

Three slides:

### Slide 1

Label:
**Internet**

Title:
**Home Connectivity**

CTA:
**Explore Internet →**

Image:
Modern Wi-Fi router / home office.

### Slide 2

Label:
**TV & Cable**

Title:
**Home Entertainment**

CTA:
**Explore TV →**

Image:
Modern smart TV / living room.

### Slide 3

Label:
**Streaming**

Title:
**Digital Entertainment**

CTA:
**Explore Streaming →**

Image:
Person watching streaming content on a smart TV.

Keep:

* Glass card
* Blur
* Border
* Auto rotation
* Dots
* Spring transitions
* 3800ms autoplay

---

# 11. HERO TRUST CARD

Replace the "9K+ Members" card with:

### "24/7"

Caption:

**Assistance when you need it**

Use four overlapping circles with subtle brand colors.

Include a modern image showing a customer support representative or connected home.

Do not claim actual 24/7 availability unless the business genuinely provides it.

If this is placeholder content, use:

**Easy Assistance**

instead.

Prefer:

**Easy Assistance**

Caption:

**Guidance when you need it**

---

# 12. TRUST SECTION

Transform the tennis "Trusted by serious players" section into:

# "Connectivity Made Easier"

Top badge:

**100%**

Caption:

**Focused on helping you understand your options**

Second card:

# "Built Around Your Needs"

Body:

**From home internet and Wi-Fi to television and streaming entertainment, we help make complex service options easier to understand.**

---

# 13. GHOST TYPOGRAPHY CAROUSEL

Keep the giant ghost-word treatment.

Use these three slides:

### Slide 1

```text
Simple
Connected
Better
Choices
```

### Slide 2

```text
Internet
TV
Streaming
Support
```

### Slide 3

```text
Explore
Compare
Understand
Connect
```

Keep:

* Giant typography
* Ghost colors
* One highlighted word
* Clip-mask reveals
* X-axis parallax
* Carousel controls
* Cross-fading image

Highlighted words:

Slide 1 → Better

Slide 2 → Streaming

Slide 3 → Understand

---

# 14. SERVICE CATEGORIES SECTION

Replace "Training Programs" with:

Eyebrow:

**Our Services**

Headline:

# "Everything You Need To Stay Connected"

Create four large interactive rows.

### 01 — Internet Assistance

**Explore home internet and connectivity options based on how you use the internet.**

### 02 — TV & Cable

**Learn about television and cable-related service options for your home.**

### 03 — Streaming

**Explore digital entertainment and streaming-related information.**

### 04 — Connectivity Support

**Get guidance when navigating internet, television, and entertainment services.**

Each row should have:

* Number
* Large title
* Description
* Arrow
* Hover animation
* Bottom border

Keep the same elegant row interaction from the Baseline template.

---

# 15. FACILITIES → CONNECTED HOME SECTION

Transform the Facilities section into:

# "Inside The Connected Home"

Use a two-column layout.

Left:

Eyebrow:

**Connected Living**

Headline:

# "Designed For The Way You Live"

Body:

**Whether you're working remotely, streaming movies, gaming, studying, or connecting multiple devices, understanding your connectivity options can make everyday digital life easier.**

Right:

Two large tilted image cards.

### Card 1

**Home Internet**

Description:

**Connectivity for work, entertainment, browsing, and everyday life.**

Image:

Modern home office + Wi-Fi.

### Card 2

**Entertainment**

Description:

**TV, streaming, and connected entertainment for the whole household.**

Image:

Modern family watching television.

Preserve:

* Tilt
* Rounded corners
* Overlapping cards
* Glass captions
* Hover scale
* Scroll reveal

---

# 16. INTERNET FEATURE SECTION

Create a dedicated Internet section.

Headline:

# "A Better Way To Explore Internet Options"

Use a large lifestyle image.

Create three feature blocks:

### Home Internet

Understand connectivity options for everyday home use.

### Wi-Fi & Devices

Learn how routers, devices, and home networks work together.

### Connected Work

Explore considerations for remote work, study, and productivity.

CTA:

**Explore Internet →**

Do not invent speeds or prices.

---

# 17. TV & CABLE SECTION

Create a dedicated TV section.

Headline:

# "Bring More Entertainment Home"

Use a cinematic smart-TV image.

Create feature cards:

* Cable TV
* Television Services
* Entertainment Options
* Channel Information

Add CTA:

**Explore TV & Cable →**

Use informational language.

Do not display fake channel counts or pricing.

---

# 18. STREAMING SECTION

Create a visually rich streaming section.

Headline:

# "Entertainment Beyond The Cable Box"

Use a collage of:

* Smart TV
* Smartphone
* Tablet
* Streaming screen
* Movie night
* Living room

Categories:

**Movies**

**Shows**

**Sports**

**Family**

**Live Entertainment**

**On-Demand**

Important:

Do not make it appear that the website owns or operates any external streaming platform.

If third-party brands are mentioned, display them clearly as separate services.

---

# 19. HOW IT WORKS

Create a 4-step section:

### 01

**Explore**

Browse available service categories.

### 02

**Understand**

Learn what different connectivity and entertainment options mean.

### 03

**Get Assistance**

Request independent guidance.

### 04

**Move Forward**

Use the information to make your next decision.

Use large numbers and spring reveal animations.

---

# 20. STATS SECTION

Replace tennis statistics with neutral platform statistics.

Do NOT invent fake business statistics.

Instead use useful informational statistics:

### 4

**Core Service Categories**

### 3

**Main Entertainment Areas**

### 1

**Simple Assistance Experience**

### 24/7

**Online Information Access**

If these numbers are not appropriate, replace the stats with:

* Internet
* TV
* Streaming
* Support

Do not fabricate customer counts, years in business, ratings, or savings.

---

# 21. TESTIMONIAL SECTION

Create:

Eyebrow:

**What Customers Say**

Headline:

# "Built Around Simpler Choices"

Use realistic but clearly placeholder testimonials if actual testimonials are not supplied.

Example:

> "The information was much easier to understand than trying to figure everything out on my own."

— **Alex R.**

> "I needed help understanding my internet and TV options, and the process was straightforward."

— **Jordan M.**

> "The site made it easier to understand what I should look for before choosing a service."

— **Taylor K.**

Do not claim these are verified customers unless real testimonials are provided.

---

# 22. ASSISTANCE CTA

Create a large dark CTA section.

Headline:

# "Not Sure Where To Start?"

Supporting text:

**Tell us what you're looking for and get independent assistance navigating internet, TV, cable, and entertainment options.**

Primary button:

**Get Assistance →**

Secondary:

**Contact Us →**

---

# 23. CONTACT / ASSISTANCE MODAL

Keep the original modal interaction.

Change the title to:

# "Let's Find A Direction"

Eyebrow:

**Get Assistance**

Form fields:

**Full Name**

**Email**

**Phone Number**

**ZIP Code**

**What can we help you explore?**

Dropdown:

* Internet
* TV & Cable
* Streaming
* Multiple Services
* General Assistance

Message:

**Tell us what you're looking for...**

Submit:

**Request Assistance**

While submitting:

**Sending…**

Success:

# "Request Received"

Message:

**Thanks, {firstName}. Your request has been received and our team can follow up with you regarding your inquiry.**

Use a frontend-only stub.

Do not send data to an API.

---

# 24. FULLSCREEN MENU

Keep the Baseline fullscreen menu concept.

Menu links:

**Internet**

**TV & Cable**

**Streaming**

**Assistance**

**Resources**

**Contact**

Large typography.

Hover color should use the brand purple/light accent.

Bottom CTA:

**Get Assistance**

---

# 25. RESOURCES PAGE

Create an editorial-style resources page.

Headline:

# "The Connectivity Guide"

Create article cards:

### How Home Internet Works

### Understanding Wi-Fi

### What To Consider When Choosing Internet

### Cable TV vs Streaming

### Understanding Smart TV Connectivity

### How Many Devices Can Your Home Network Handle?

Each article card should contain:

* Relevant image
* Category
* Title
* Short description
* Read More arrow

Make it look like a premium technology publication.

---

# 26. ABOUT PAGE

Headline:

# "Making Connectivity Easier To Understand"

Explain:

We are an independent third-party assistance platform helping consumers explore and understand internet, television, cable, streaming, and connectivity-related services.

Sections:

* Our Approach
* What We Help With
* Why Transparency Matters
* How Assistance Works

Use real-world technology/lifestyle imagery.

---

# 27. FAQ PAGE

Create categories:

### General

### Internet

### TV & Cable

### Streaming

### Assistance

### Billing & Refunds

Example:

**Are you an internet service provider?**

Answer clearly:

**No. We are an independent third-party assistance platform. We help users explore and navigate service-related information and do not directly operate an internet or cable network.**

**Do you sell internet plans directly?**

Clearly explain the actual business relationship without misleading claims.

---

# 28. FOOTER

Create a large premium dark footer.

CTA:

Eyebrow:

**Get Started**

Headline:

# "Ready To Explore Your Options?"

Button:

**Get Assistance →**

Footer columns:

### Services

Internet

TV & Cable

Streaming

Assistance

### Resources

Guides

FAQ

Help Center

Contact

### Company

About

Disclaimer

Privacy Policy

Terms & Conditions

Refund Policy

### Contact

Phone

Email

Business Hours

Do not invent contact details.

Use placeholders if actual company information has not been supplied.

---

# 29. THIRD-PARTY DISCLOSURE

This is extremely important.

Display a clear disclosure in the footer:

**We are an independent third-party assistance platform. We do not directly provide internet, cable, television, or streaming services and are not affiliated with or endorsed by any specific service provider unless explicitly stated.**

Also display a shorter disclosure near the hero CTA:

**Independent third-party assistance platform.**

The disclosure should be readable and not hidden in tiny text.

---

# 30. LEGAL PAGES

Create:

### Privacy Policy

Professional placeholder structure covering:

* Information collected
* How information is used
* Cookies
* Communications
* Data protection
* Third-party services
* User choices
* Contact

### Terms & Conditions

Cover:

* Website usage
* Third-party assistance
* User responsibilities
* Information accuracy
* External providers
* Limitation of liability

### Refund Policy

Use placeholders for actual refund terms.

Do not invent commercial terms unless provided.

### Disclaimer

Clearly explain:

* Independent third-party status
* No direct ISP ownership
* No guaranteed service availability
* External providers operate independently
* Information may change
* Users should verify final service terms with the applicable provider

---

# 31. IMAGE DIRECTION

Replace every tennis image with highly relevant connectivity/entertainment photography.

Use images such as:

* Modern living room
* Wi-Fi router
* Home office
* Person working remotely
* Smart TV
* Family watching television
* Streaming entertainment
* Smartphone connected to Wi-Fi
* Laptop
* Smart home devices
* Customer support representative
* Modern apartment
* Home network technology

Do not reuse the same image excessively.

Each major section should have a visually relevant image.

Avoid:

* Tennis images
* Tennis terminology
* Generic handshake photos
* Random corporate stock photography
* Futuristic cyberpunk imagery
* Unrelated technology images

Use consistent photographic art direction.

---

# 32. ANIMATION SYSTEM

Preserve the original Baseline motion system.

Implement:

### Loader

Navy curtain.

Brand logo.

Progress bar.

Curtain slides upward.

### Hero

Word-by-word headline reveal.

Tagline clip reveal.

Parallax background.

Cards rise into view.

### Scroll

IntersectionObserver reveals.

Fade + rise.

Clip-mask animations.

Parallax ghost typography.

### Hover

Buttons:

Arrow moves slightly.

Cards:

Lift / scale.

Service rows:

Arrow slides right.

Images:

Scale approximately 1.03.

### Carousels

Auto-play.

Manual arrows.

Dots.

Cross-fade transitions.

### Modal

Backdrop fade.

Panel spring.

Input focus.

Success state.

### Menu

Fullscreen overlay.

Spring entrance.

Staggered navigation links.

ESC support.

---

# 33. RESPONSIVE BEHAVIOR

Maintain the original adaptive rem scaling system.

Use:

```css
html {
  font-size:16px;
}

@media (max-width:1920px) {
  html { font-size:0.833333vw; }
}

@media (max-width:1440px) {
  html { font-size:1.111111vw; }
}

@media (max-width:1024px) {
  html { font-size:1.5625vw; }
}

@media (max-width:640px) {
  html { font-size:4.444444vw; }
}
```

Use the original scale-up JS behavior above 1920px.

Breakpoints:

* 640px
* 768px
* 1024px

Disable hover interactions at or below 768px.

Mobile must feel intentionally designed, not simply compressed desktop.

---

# 34. ACCESSIBILITY

Implement:

* Semantic HTML
* Proper headings
* ARIA labels
* Keyboard navigation
* Focus-visible states
* Accessible modal
* ESC modal close
* Accessible navigation
* Alt text on images
* Reduced-motion support
* Proper button elements
* Proper form labels

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable or dramatically shorten animations for users who prefer reduced motion.

---

# 35. SEO FOUNDATION

Add:

* Unique `<title>`
* Meta description
* Viewport
* Open Graph metadata
* Semantic headings
* Descriptive alt text
* Canonical placeholder
* Organization/service structured data only when information is accurate

Example title:

**Internet, TV & Streaming Assistance | Speedsphere**

Do not claim to be an ISP.

---

# 36. IMPORTANT VISUAL RULE

The final result must NOT look like:

* A tennis website
* A generic SaaS landing page
* A cheap ISP template
* An affiliate spam website
* An AI-generated website
* A simple one-page landing page

It should look like:

**Premium telecom website + modern entertainment platform + technology editorial website.**

The design should feel original and professionally art-directed.

---

# 37. DO NOT COPY BASELINE BRANDING

Completely remove:

* Baseline
* Tennis Club
* Tennis Academy
* Courts
* Coaches
* Players
* Membership
* Tennis balls
* Tennis court imagery
* Tennis terminology
* Tennis statistics
* Tennis testimonials
* Tennis contact details

Only retain the **design architecture and interaction philosophy**.

---

# 38. FINAL QUALITY CHECK

Before finishing, verify:

* Hero looks premium.
* Navigation works.
* Mobile menu works.
* Contact modal works.
* ESC closes modal/menu.
* Lenis works.
* Loader works.
* Hero parallax works.
* Carousels work.
* Dots work.
* Previous/next buttons work.
* Scroll animations work.
* Hover animations work on desktop.
* Hover is disabled on mobile.
* Forms do not make network requests.
* All links work or point to valid page/section destinations.
* No tennis content remains.
* No fake ISP claims remain.
* Third-party disclosure is visible.
* No fake prices are displayed.
* No fake provider affiliations are displayed.
* No fabricated business statistics are presented as facts.
* Images are relevant to cable/internet/entertainment.
* Layout works at desktop, tablet, and mobile widths.
* Typography remains proportional.
* No horizontal overflow.
* No broken images.
* No console errors.

The final website should feel like a **real, premium, production-ready Cable + Internet + TV + Streaming assistance company website**, while maintaining the exceptional visual rhythm, animation quality, rounded-card framing, and editorial confidence of the supplied Baseline design.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
