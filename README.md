# CV Master (Vue 3 + Vite)

Professional resume builder rebuilt with Vue 3, Vite, Pinia, Vue Router and vue-i18n.

## Features
- Bilingual (English/Arabic) with RTL support
- Dark mode
- Interactive CV builder with live preview
- Multiple resume templates (Classic / Modern / Executive)
- PDF export
- Accent color picker
- Import/Export JSON (backup & restore)
- Persistent data (localStorage)
- Web Vitals reporting (LCP, CLS, and other supported metrics)
- Accessibility basics: keyboard navigation, labeled fields, and a skip-to-content link
- Page-specific titles and descriptions, plus Open Graph and Twitter metadata
- Unit tests (Vitest) + E2E (Playwright)

## Tech Stack
- Vue 3 (Composition API)
- Vite
- Pinia
- Vue Router
- vue-i18n
- Vitest + Playwright

## Getting started
```bash
npm install
npm run dev
```

## Cloud backups and deployment

The builder remains usable without an account and keeps a local copy in the
browser. Supabase is optional and provides email/password accounts plus
user-private cloud backup and restore.

1. Create a Supabase project and run
   [`supabase/migrations/20261025000000_create_user_resumes.sql`](./supabase/migrations/20261025000000_create_user_resumes.sql)
   in the Supabase SQL Editor.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` to the Supabase project URL and publishable key.
   These browser-side values are public; database access is protected by the
   migration's row-level security policies. Never use a `service_role` key in
   this frontend.
3. In Supabase Authentication URL Configuration, set the Site URL and allowed
   redirect URL to `https://novastacka-crypto.github.io/cv-master-vue/`.
4. In the GitHub repository, add the same two values as repository Actions
   variables named `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Push to `main`. GitHub Actions builds, tests, and deploys the site to
   [CV Master on GitHub Pages](https://novastacka-crypto.github.io/cv-master-vue/).

Use the Cloud Account link in the builder to create an account. Cloud sync is
manual: users explicitly choose when to back up or restore a resume. The
existing browser-local data is not uploaded until the user selects backup.

## Scripts
```bash
npm run dev          # dev server
npm run build        # production build
npm run preview      # preview build
npm run test         # unit tests
npm run test:watch   # watch mode
npm run test:coverage  # coverage
npm run test:e2e     # E2E tests
npm run lint         # ESLint
```

## Accessibility, performance, and SEO

The application includes basic accessibility support, responsive layouts, Web
Vitals reporting, and route-aware page metadata. The automated browser tests
check keyboard access, the skip link, form labels, selected color contrast,
metadata on supported routes, and basic page-load resource budgets.

Latest local verification:
- `npm run build` — passed. Vite reports that `public/assets/js/site-chrome.js`
  is not bundled because it is a classic script; this does not fail the build.
- `npm test -- --reporter=dot` — 14 unit tests passed.
- `npm run test:e2e -- --reporter=line` — 13 browser tests passed.
- `npm run lint` — passed.
- A local production-browser measurement recorded approximately 273 ms
  DOMContentLoaded, 180 ms LCP, 0 CLS, and 96 KB initial transferred data.
  These are environment-specific observations, not performance guarantees.

These checks are not a complete WCAG conformance audit and do not represent a
Lighthouse or axe report. Because the app uses a hash-based single-page router,
route-specific metadata is applied by JavaScript after the app loads. Server
rendering or prerendering may be needed for stronger crawler support. Add the
deployment URL before configuring canonical URLs or a sitemap.

## Build
```bash
npm run build
npm run preview
```

## Structure
```
src/
  components/   # reusable components
  views/        # route views
  stores/       # Pinia stores
  i18n/         # vue-i18n locales
  data/         # static data
  assets/       # styles
public/
  templates/    # standalone template pages
  assets/       # css/js for templates
```

## Live Demo
_Add your deployed URL here._

## Screenshots
_Add screenshots here._

## License
MIT