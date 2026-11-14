# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200 (binds 0.0.0.0)
npm run build      # Production SSR build → dist/biancatemumplano/
npm run server:ssr # Run the built SSR server
npm test           # Unit tests via Karma/Jasmine (opens Chrome)
ng generate component path/to/name  # Scaffold new component (auto-uses SCSS)
```

To run a single test file, use `--include`:
```bash
ng test --include='src/app/shared/component/calendar/calendar.spec.ts'
```

## Architecture

**Routing:** Single route (`''`) lazy-loads `HomePage` via `loadComponent`. Add new pages in `app.routes.ts` using the same lazy pattern.

**Component hierarchy:**
```
AppComponent
└── HomePage          (lazy-loaded page shell)
    └── AboutSection  (layout section, owns GSAP animations)
        └── Calendar  (shared component, selector: comp-calendar)
```

**Two distinct component locations:**
- `src/app/core/` — page-level and layout components (one-offs tied to a specific route/section)
- `src/app/shared/component/` — reusable components used across multiple sections

**SSR:** Angular Universal with Express. Be mindful that `ngOnInit` runs server-side — avoid direct `window`/`document` access without `isPlatformBrowser` guard. GSAP animations in `ngOnInit` (as in `AboutSection`) will throw on the server unless guarded.

## Styling

Global SCSS files in `src/scss/`:
- `breakpoints.scss` — breakpoint variables + responsive mixins (source of truth for breakpoints)
- `mixins.scss` — `@forward`s breakpoints + `page-defaults` (responsive padding via breakpoints)
- `variables.scss` — CSS custom properties (`--primary-color: #f3dbc7`, `--white-color: #faf5eb`)
- `reset.scss` — base reset
- `global.scss` — font-face declarations (Tusker Grotesk, Migra, Migra-italic, Manbow), body defaults

### Responsive breakpoint system

`breakpoints.scss` defines two mixins consumed via `@use '@styles/mixins.scss' as *`:

| Mixin | Direction | Breakpoints |
|-------|-----------|-------------|
| `respond-to(mobile\|tablet\|desktop\|imax)` | min-width (mobile-first) | 576 / 768 / 1024 / 1280px |
| `respond-down(mobile\|tablet\|desktop\|imax)` | max-width (desktop-first) | 575.98 / 767.98 / 1023.98 / 1279.98px |

Usage pattern in any component stylesheet:
```scss
@use '@styles/mixins.scss' as *;

.element {
  font-size: 60px;           // mobile base

  @include respond-to(tablet) { font-size: 120px; }
  @include respond-to(desktop) { font-size: 175px; }
}
```

`page-defaults` (used on `:host` of page components) already applies responsive horizontal padding — do not override padding on page hosts directly.

Path aliases configured in `angular.json` (usable in both SCSS and TS):
- `@assets/` → `src/assets/`
- `@styles/` → `src/scss/`

Prettier is configured: single quotes, 100-char print width, Angular HTML parser for templates.

## AWS Image Delivery Pipeline

See [`docs/architecture-s3-images.md`](docs/architecture-s3-images.md) for full Mermaid sequence diagrams.
See [`docs/image_delivery_implementation_roadmap.md`](docs/image_delivery_implementation_roadmap.md) for the 5-week AWS setup guide (S3, Lambda, CloudFront).

### Angular implementation (Phase 3 of roadmap — already implemented)

| File | Role |
|------|------|
| `src/app/core/services/image.service.ts` | Fetches `metadata/<filename>.json` from CloudFront; builds CDN URLs and srcsets |
| `src/app/core/services/image-preloader.service.ts` | Preloads critical images on startup; prefetches gallery images on route change |
| `src/app/shared/component/responsive-image/` | `<app-responsive-image>` — renders `<picture>` with AVIF→WebP→JPEG fallback + skeleton loader |
| `src/app/shared/directive/lazy-load/lazy-load.ts` | `img[appLazyLoad]` — IntersectionObserver lazy load directive |

**Data flow:** Lambda writes `metadata/<filename>.json` to S3 → CloudFront serves it → `ImageService.getImageMetadata()` fetches it → `ResponsiveImage` builds srcsets from `variants` map.

**CDN URL:** Set `CDN_BASE_URL` in `image.service.ts` to your CloudFront distribution domain.

**`provideHttpClient(withFetch())`** is registered in `app.config.ts` (required for SSR + HttpClient).

**`ImagePreloaderService.initialize()`** must be called once — wire it in the root `App` component `ngOnInit` or an `APP_INITIALIZER`.

### Lambda + scripts

| File | Role |
|------|------|
| `lambda/index.js` | S3-triggered processor: Sharp resizes to WebP/JPEG/AVIF variants, writes to `photography-portfolio-optimized` |
| `lambda/package.json` | Lambda deps (`@aws-sdk/client-s3`); `sharp` is provided via Lambda Layer |
| `scripts/batch-process.js` | Bulk-upload local images to input bucket: `node scripts/batch-process.js ~/photos --prefix gallery/` |

Lambda image categories (auto-detected from S3 key): `hero` (1920–540px, +AVIF), `gallery` (800–400px), `default` (600–300px).

## Animations

GSAP is the animation library. Animations are initialized in `ngOnInit` using `gsap.timeline()`. Target elements by CSS class selector (e.g. `.big-title`, `.anim-sup`). The `<` position parameter means "start with previous tween", `>` means "after previous tween ends".
