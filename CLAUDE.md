# Full Focus Club — Project Guide

## Commands

```bash
npm start          # Dev server (http://localhost:3000)
npm run build      # Production build
npm test           # Run tests
npm run sitemap    # Generate sitemap
```

## Stack

- **React 18** + **TypeScript 5** (Create React App)
- **MobX 6** — state management
- **React Router v7** — routing
- **Leaflet / React Leaflet** — interactive map
- **Framer Motion** — animations
- **SCSS/Sass** — styles
- **react-snap** — static pre-rendering (SSR-like, hydration in `index.tsx`)
- **react-markdown** + rehype/remark plugins — markdown rendering

## Structure

```
src/
  components/    # Reusable UI (Navbar, Footer, Layout, Button, Text, ClubMapSection, MasonryGallery, DocumentLayout, ...)
  pages/         # Pages (Landing, NotFound, PersonalDataProcessingPolicy)
  assets/        # Images, media
  fonts/         # Custom fonts
  utils/         # Utility functions
  App.tsx
  index.tsx      # Entry point with hydration support
  index.scss     # Global styles
```

Path alias: `@/*` → `src/*`

Components are exported via barrel file: `src/components/index.ts`

## Code Style

- **Prettier**: 2-space indent, single quotes, semicolons, double quotes in JSX
- **ESLint**: Airbnb + unicorn + TypeScript + react-hooks
- **Stylelint**: rational-order + htmlacademy

Run before committing:
```bash
npx eslint src --ext .ts,.tsx
npx stylelint "src/**/*.scss"
```

## Notes

- `react-snap` config is in `package.json` under `"reactSnap"` — inlines CSS, removes scripts/styles/blobs after pre-render
- No MobX decorators — uses modern observable API
