# Happy Birthday, Rashmi Jiii 🌸

A handcrafted birthday greeting: Apple-inspired glass, Japanese minimalism, soft pink and gold.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # serve the production build
```

Requires Node 18+.

## The experience

1. A short loading moment ("Preparing a little surprise...")
2. An envelope flies in addressed to **Rashmi Jiii 🌸**. Click it, or focus it and press Enter or Space.
3. The flap opens and the card slides up.
4. **Open Surprise** fires confetti and fireworks, the card expands, and the message types itself out.

A soft music toggle sits top-right. The melody is generated live with the Web Audio API, so there is no audio file to ship. It starts only when clicked.

## Stack

React 18 · Vite · Framer Motion · canvas-confetti · React Icons · hand-written CSS (no UI frameworks)

## Structure

```
src/
  assets/       SVG petals, wax seal, ornament
  components/   Loader, Background, FloatingPetals, Envelope, BirthdayCard,
                ConfettiEffect, Fireworks, Typewriter, MusicPlayer, Footer, SurpriseButton
  hooks/        usePrefersReducedMotion, useTypewriter
  styles/       global, background, loader, envelope, card, ui
public/         favicon
```

## Accessibility and performance

- Semantic landmarks (`main`, `article`, `footer`), real `<button>` controls, visible focus rings
- `prefers-reduced-motion`: petals, orbs, confetti and fireworks are switched off, and the typewriter text appears at once
- The full message is available to screen readers immediately, before it is typed
- The card, confetti, fireworks and music player are code-split with `React.lazy`
- Fonts: Playfair Display and Poppins from Google Fonts, with system fallbacks

## Customising

- Name and copy live in `Envelope.jsx` and `BirthdayCard.jsx`
- Colours and fonts are CSS variables at the top of `src/styles/global.css`
