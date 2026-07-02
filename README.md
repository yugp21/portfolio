# Yug Patel — Portfolio

A single-card, swipe-only portfolio experience. Instead of scrolling, you swipe
through cards like a deck — Intro, Tech Stack, Projects, About, Education, Connect —
with cinematic GSAP intro/outro animations tying it all together.

**Live site:** [portfolio-mu-cyan-y5y2hhx6bu.vercel.app](https://portfolio-mu-cyan-y5y2hhx6bu.vercel.app/)
**Resume:** [public/Yug_Patel_Resume.pdf](public/Yug_Patel_Resume.pdf)

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/React_Three_Fiber-9-black?logo=three.js&logoColor=white)

---

## Why this exists

Most portfolios are scroll-and-skim. I wanted something that felt more like an
experience than a page — a swipeable deck with real physics (drag, velocity,
snap-back), a cinematic opening/closing sequence, and a subtle 3D backdrop that's
felt more than seen. Built to work as well on mobile as it does on desktop.

## Features

- 🎴 **Swipe-driven navigation** — drag or click through cards with real
  velocity-based physics (Framer Motion)
- 🎬 **Cinematic intro/outro** — GSAP-driven line → name → role reveal, and a
  matching summary animation before the deck loops
- 🌌 **Ambient 3D backdrop** — faint React Three Fiber wireframe scene behind
  the cards, tuned to stay in the background
- 📱 **Mobile-first** — `h-dvh` / `w-dvw` viewport units for correct mobile
  browser chrome handling, no overflow bugs
- 🧩 **Data-driven content** — all card copy lives in `src/data`, no text
  hardcoded into components

## Tech stack

React 19 · Vite · Tailwind CSS v4 · Framer Motion · GSAP · React Three Fiber · Lenis

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    OpeningAnimation.jsx   GSAP cinematic intro (line → name → role)
    SummaryAnimation.jsx   GSAP cinematic outro before the deck loops
    CardStack.jsx          Owns current index + swipe/drag physics,
                            renders each card's body by `type`
    PortfolioCard.jsx      Shared card shell (radius, border, motion variants)
    ProjectCard.jsx        Single project row (used on the Projects card)
    TechPill.jsx           Small stack-badge used on the Tech Stack card
    SocialIcons.jsx        Icon row (GitHub / LinkedIn / Email / LeetCode / X / Resume)
    Footer.jsx             Bottom-of-screen swipe hint + copyright
    DepthField.jsx         Subtle R3F wireframe + lighting behind the card
  data/
    cards.js               All card copy/content, data-driven (no hardcoded JSX text)
    links.js                Personal + project URLs in one place
  hooks/
    useLenis.js             Lenis instance, used only for micro-scroll smoothing
                             inside a card if its content overflows on short viewports
```

### Flow

Opening Animation → Intro → Tech Stack → Projects → About → Education →
Connect → Summary Animation → back to Intro (infinite loop).

### Swipe behavior

- Left swipe past a distance/velocity threshold advances to the next card
  (`CardStack.handleDragEnd`).
- Right / under-threshold drags snap back to center (`dragSnapToOrigin`,
  with `dragConstraints` locking rightward movement entirely).
- The current card exits with a small rotate + fade + move-left
  (`SWIPE_EXIT` in `PortfolioCard.jsx`); the next card springs in centered.

## Notes / next steps

- `LINKS.resume` currently points at the GitHub profile — swap in a direct
  resume URL when you have one.
- Tailwind v4 is wired via `@tailwindcss/vite`, so there's no
  `tailwind.config.js`; tokens live as CSS variables in `src/index.css`.
- `DepthField` is intentionally very faint (opacity ~0.035) — it's meant to
  be felt, not seen. Nudge `opacity` there if you want more presence.

## Connect

- GitHub: [github.com/yugp21](https://github.com/yugp21)
- LinkedIn: [linkedin.com/in/yug-patel-8aa38628a](https://www.linkedin.com/in/yug-patel-8aa38628a/)
- LeetCode: [leetcode.com/u/yugp21](https://leetcode.com/u/yugp21)