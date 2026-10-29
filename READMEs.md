# Bryan Imanuel / Shades On

Next.js App Router portfolio, built from the supplied portfolio plan. The original prototype is preserved in `_prototype/`; raw footage is in `assets-src/frames/`.

## Run

```sh
npm ci
npm run dev
```

Production preview:

```sh
npm run build
npm run start
```

Open http://localhost:3000. Node 22 is used in CI. On this Windows installation, Next's compiler requires execution outside the restricted sandbox.

## Content

- `content/work/*.mdx`: validated project frontmatter and body. Populate `image` with a local `/projects/...` path, `live`, `source`, and `status` after confirming the real values. Add images to `public/projects/`.
- `lib/site.ts`: reads public contact/social/domain configuration from environment variables. Copy `.env.example` to `.env.local` and fill only confirmed values. The build deliberately omits contact actions until an email is supplied.
- `app/about/page.tsx`: draft introduction and principles from the supplied direction. Biography and experience are clearly pending.
- `/writing`: intentional empty state. No articles were supplied or invented.
- `/lab`: two live studies of the actual portrait sequence and line-mask typography.

The initial three case studies preserve the supplied facts. No project screenshots, dates, employers, detailed outcomes, or live URLs were supplied. These are content drafts, not finished evidence-rich case studies.

## Portrait pipeline

```sh
npm run frames
```

Requires the original 180 PNGs in `assets-src/frames/`, which are excluded from Git. Generated WebP assets in `public/frames/` should be committed. The pipeline handles both green spill and the existing soft alpha, then outputs 960px desktop frames and every other 540px mobile frame. The `1080` directory retains the plan's naming convention; its actual width is 960 because the source cannot be re-exported at higher resolution.

`public/frames/manifest.json` records measured bytes and the frame-150 shades beat. The build script fails if either sequence exceeds its budget. The first image is server-rendered; scroll code and progressive frame decoding activate on scroll intent. Reduced-motion users receive a still image and native scrolling.

## Verification

```sh
npm run lint
npm run typecheck
npm run test:unit
npm run build
npx playwright install chromium
npm test
npm run lighthouse
```

Lighthouse requires the production server on port 3000. Run it without concurrent browser tasks. Playwright uses installed Chrome on Windows and bundled Chromium on Linux. Tests cover routes, semantics, contrast, layout overflow, keyboard menu flow, project filtering, gallery switching, navigation, reduced motion, canvas loading, and Lab controls. Reports live in `playwright-report/`, `docs/lighthouse/`, and `docs/screenshots/`.

Lighthouse's total blocking time is a laboratory responsiveness check, **not a measurement of field INP**. Safari, Firefox, a real phone, and production-network INP require additional testing.

## Publish

The app can be imported into Vercel with the standard Next.js preset, `npm run build`, and the confirmed environment variables. No Vercel account or project was connected during this build, and no deployment was created. Set `NEXT_PUBLIC_SITE_URL` before publishing: until then, robots and metadata disable indexing. Complete `docs/content-checklist.md` first.

## Design and audit

`DESIGN.md` records the identity and motion rationale. Fonts are self-hosted. GSAP owns portrait scroll choreography, Motion owns hover/gesture springs, and CSS owns small feedback and supported scroll-driven reveals. Native View Transitions connect project titles/media to their case studies and animate the Index/Gallery change, with an instant browser fallback.

The user selected Anti Slop **afterward as an audit**. Its findings are recorded separately and are not silently implemented after that audit.
