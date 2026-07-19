# R* Games Portal — Responsive Clone

Vite + React + TypeScript + Tailwind CSS v4. Fully responsive (mobile / tablet / desktop),
built as reusable components (`src/components/*`), with content data separated in `src/data/siteData.ts`.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL. Build for production with `npm run build`.

## Structure

- `src/components/Header.tsx` — sticky nav + mobile hamburger menu
- `src/components/Hero.tsx` — sunset banner with palm trees
- `src/components/FeaturedGames.tsx` — filterable game grid (scrolls on mobile, grid on desktop)
- `src/components/LatestNews.tsx` — news grid
- `src/components/LauncherPromo.tsx` — launcher promo card
- `src/components/Footer.tsx` — footer with link columns and socials
- `src/data/siteData.ts` — all editable text content
- `src/types.ts` — shared TypeScript types
