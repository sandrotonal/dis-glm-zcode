# Dental Health

A premium, mobile-optimized dental clinic website. Bold typography, masked imagery and a strict black & white design language. No card boxes, no gradients — clean lines, real content, and a fast conversion path.

Note: static demo. All clinic data (phone, address, hours) is placeholder and must be replaced before production.

---

## Built With

| Icon | Tech | Details |
| --- | --- | --- |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) | HTML5 | Semantic markup, 6 pages |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) | CSS3 | Fluid clamp() typography, hairline borders, custom animations |
| ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) | Tailwind CSS | CDN + shared tailwind-config.js |
| ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) | JavaScript (ES5) | 12 vanilla modules, no frameworks, no build step |
| ![JSON-LD](https://img.shields.io/badge/JSON--LD-4B8BBE?style=for-the-badge&logo=json&logoColor=white) | Structured data | Dentist + FAQPage schema injected per page |
| ![Responsive](https://img.shields.io/badge/Responsive-Yes-28a745?style=for-the-badge) | Mobile-first | 320 / 375 / 768 / desktop tested |

---

## Features

### Design & UX
- Splash intro that plays once per session, skips when arriving at an in-page target (#testimonials) and respects prefers-reduced-motion
- Masked hero cards with focal-point aware image positioning on mobile and desktop
- Image marquees, scroll-reveal animations, hamburger menu, sticky mobile Call/Book bar
- clamp() typography scale, hairline border-row lists, hover accent lines

### Engagement
- Smile Assessment quiz: 4 questions to a recommended treatment, progress bar, retake
- FAQ accordion on the services page
- Animated counters (IntersectionObserver) — years, patients, rating

### SEO & AI readiness
- JSON-LD Dentist schema on every page, FAQPage on services
- llms.txt for AI search engines
- Semantic HTML, local business address/geo/hours, aggregate rating

### Privacy
- Editable cookie consent: banner, settings panel, toggles, localStorage persistence, Esc/backdrop close

### Imagery
- Curated local photos — clinic, dentist and team portraits — fully responsive object-cover bands with caption overlays
- Embedded Google Map plus "Get Directions"

---

## Pages

| Page | Content |
| --- | --- |
| Home (index) | Splash, masked hero, smile gallery, implant section, quiz, testimonials, contact CTA |
| Services | 6 services border rows, clinic photo band, FAQ accordion |
| About | Story with photo, animated counters, why-choose-us, team with portraits |
| Contact | Info border rows, underline form (mailto), clinic photo, Google Maps embed |
| Privacy / Terms | Legal text with border-row sections |

---

## Tech & Structure

- HTML5 + Tailwind CSS (CDN) with a shared tailwind-config.js
- Vanilla JavaScript (ES5), no frameworks, no build step
- js/core.js as the single source of truth: App state + event bus, modules subscribe to it

### Script modules

| File | Purpose |
| --- | --- |
| core.js | App state + event bus (App.on / App.set) |
| site.js | Navbar shadow/hide, mobile menu, splash guard, mobile CTA bar, back-to-top |
| masked-cards.js | Photo fill for hero masked cards |
| animations.js | Scroll reveal |
| testimonials.js | Rotating testimonials |
| quiz.js | Smile assessment wizard |
| faq.js | FAQ accordion |
| counters.js | Animated stats |
| contact.js | Mailto form |
| cookies.js | Cookie banner + settings |
| ld.js | JSON-LD schema injection |
| tailwind-config.js | Tailwind theme settings |

---

## Validation

Run the structural check:

```powershell
& "check-site.ps1"
```

Syntax check the scripts:

```powershell
Get-ChildItem js -Filter *.js | ForEach-Object { node --check $_.FullName }
```

Test at 320 / 375 / 768 / desktop widths: buttons, bands and overlays must stay balanced.

---

## Before going live

- Replace placeholder phone, address and hours
- Use real team/clinic photos (current set: stock)
- Swap dentalhealth.example in js/ld.js and llms.txt with the real domain
- Wire the form to a backend, add real analytics and a real booking widget

---

## Credits

- Photography: Unsplash
- Icons: inline SVG
- Typeface: Open Sauce One

All text content and site structure are custom-built for this project.