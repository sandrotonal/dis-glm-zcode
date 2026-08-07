# 🦷 Dental Health

**A premium, mobile-first dental clinic website** — bold typography, masked photo reveals, and a strict black & white editorial language. No card boxes, no clutter: just clean lines, real content, and fast UX.

> 🚨 Static demo — all clinic data (phone, hours, patients) is placeholder and must be replaced before production.

---

## ⚡ Badges

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-100%25-28a745?style=flat-square)

---

## ✨ Features

### 🎨 Design & UX
- **Splash intro** — plays once per session, skips when arriving at an anchor (`#testimonials`) and honors `prefers-reduced-motion`
- **Masked hero cards** with focal-point aware image positioning (mobile vs desktop)
- Animated **marquee strips**, scroll progress bar, hamburger menu, sticky mobile **Call / Book** bar
- `clamp()` typography scale, hairline `border-row` lists with hover accent lines

### 🧩 Engagement
- 🧠 **Smile Assessment quiz** — 4 questions → recommended treatment, progress bar, retake
- ❓ **FAQ accordion** with smooth expand physics (`grid-template-rows`)
- 📊 **Animated counters** (IntersectionObserver) — years, smiles, rating

### 🔍 SEO & AI readiness
- **JSON-LD** `Dentist` (LocalBusiness) schema on every page + `FAQPage` on services
- `llms.txt` for AI engines
- Semantic sections, local business address/geo/hours, aggregate rating 4.9 (8.2k reviews)

### 🍪 Privacy
- **Cookie consent** with editable preferences panel (toggle UI, 🥇 Strictly Necessary locked), `localStorage`-backed, accessible Esc/backdrop close

### 🖼️ Visuals
- Local curated photos — clinic, equipment, dentist & team portraits — fully responsive `object-cover` bands with caption gradient overlays
- QiƱlized Google Maps embed + "Get Directions"

---

## 📄 Pages

| Page | Path | Highlights |
|------|------|------------|
| 🏠 Home | `index.html` | Splash, masked hero, smile gallery grid, implant section, trust strip, quiz, testimonials, contact CTA |
| 🩺 Services | `services.html` | 6 border-row services + emergency, clinic photo band, FAQ accordion |
| 👥 About | `about.html` | Story + photo, animated numbers, "why choose us", team with portraits |
| 🗺️ Contact | `contact.html` | Info rows, underline form (opens email app), clinic photo, Google Maps embed |
| 📜 Privacy / Terms | `privacy.html` / `terms.html` | Legal text, border-row sections |

---

## 🛠️ Tech Stack

- Plain **HTML5 + Tailwind CSS (CDN)** with a shared `tailwind-config.js`
- Vanilla **JavaScript ES5-style modules** — no frameworks, no build step
- **`js/core.js`** acts as the single source of truth: `App.state` + event bus (`App.on`, `App.set`) — modules stay in sync (device change, scroll, scroll nav state)
- Node.js `--check` for validation (see scripts below)

### 🧩 Script modules

| File | Purpose |
`site.js` | Splash guard, navbar hide/shadow, mobile menu, hash jumping, mobile CTA bar, active footer links |
`core.js` | App state + event bus |
`masked-cards.js` | Photo focal tracking for hero/section cards |
`animations.js` | Scroll reveal + stagger delays |
`testimonials.js` | Rotating review quote + star dots (client-side) |
`quiz.js` | Smile assessment wizard |
`faq.js` | FAQ accordion (services) |
`counters.js` | Animated data counters |
`contact.js` | mailto-form submit (no backend) |
`cookies.js` | Consent banner + settings panel (`dh_cookie_prefs`) |
`ld.js` | JSON-LD schema injection |

---

## 🧪 Validation

The repo ships a PowerShell check script (`check-site.ps1` — checks splash-on-home-only, id presence) plus:

```powershell
Get-ChildItem js -Filter *.js | ForEach-Object { node --check $_.FullName }
```

Run the static checks, click through pages at 320 / 375 / 768 / desktop — buttons, bands, and overlays must stay balanced.

---

## 📝 TODO (before going live)

- [ ] Replace placeholder phone `(201) 555-0192`, address & hours
- [ ] Plan real patient photos for team & clinic (currently curated Unsplash stock)
- [ ] Swap `dentalhealth.example` in `js/ld.js` / `llms.txt` with real domain
- [ ] Optional: change form to a backend/ESP, add real analytics, real booking widget

---

## 🙏 Credits

- Photos: [Unsplash](https://unsplash.com)
- Icons: Inline SVG (check, arrow)
- Font: Open Sauce One (bundled locally)

---

<p align="center"> Made with ☕ and 🦷 </p>