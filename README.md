# Yug Patel — Portfolio

A single-card, swipe-only portfolio experience built with React 19 + Vite,
Tailwind CSS v4, Framer Motion, GSAP, React Three Fiber, and Lenis.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Architecture

```
src/
  components/
    OpeningAnimation.jsx   GSAP cinematic intro (line → name → role)
    SummaryAnimation.jsx   GSAP cinematic outro before the deck loops
    CardStack.jsx          Owns current index + swipe/drag physics,
                            renders each card's body by `type`
    PortfolioCard.jsx      Shared card shell (radius, border, motion variants)
    ProjectCard.jsx        Single project row (used on the Projects card)
    TechPill.jsx            Small stack-badge used on the Tech Stack card
    SocialIcons.jsx        Icon row (GitHub / LinkedIn / Email / LeetCode / X / Resume)
    Footer.jsx              Bottom-of-screen swipe hint + copyright
    DepthField.jsx          Subtle R3F wireframe + lighting behind the card
  data/
    cards.js               All card copy/content, data-driven (no hardcoded JSX text)
    links.js                Personal + project URLs in one place
  hooks/
    useLenis.js              Lenis instance, used only for micro-scroll smoothing
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

### Notes / next steps

- `LINKS.resume` currently points at the GitHub profile — swap in a direct
  resume URL when you have one.
- Tailwind v4 is wired via `@tailwindcss/vite`, so there's no
  `tailwind.config.js`; tokens live as CSS variables in `src/index.css`.
- `DepthField` is intentionally very faint (opacity ~0.035) — it's meant to
  be felt, not seen. Nudge `opacity` there if you want more presence.
