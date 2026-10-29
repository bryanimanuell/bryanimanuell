# Changes: Project Screenshot Showcase

## Files Modified

### `index.html`
- Added `data-project-id` and `data-screenshots` attributes to all 6 `.project-card` divs.
- Greek Yoghurt Shop card gets all 10 screenshot paths in `data-screenshots`.
- All other cards get an empty `data-screenshots=""`.
- No structural markup was changed.

### `styles.css`
- Appended ~300 lines after the final `}` (line 1084); no existing rule was touched.
- New classes: `.projects-grid.has-active`, `.card-sidebar`, `.card-expanded`, `.showcase-close-btn`, `.showcase-carousel`, `.showcase-carousel-track`, `.showcase-slide`, `.carousel-arrow`, `.carousel-dots`, `.carousel-dot`, `.carousel-counter`, `.carousel-hint`, `.showcase-no-previews`.
- Added `@media (max-width: 700px)` block for mobile layout (sidebar becomes horizontal strip, expanded panel stacks above it).

### `script.js`
- Appended `initProjectShowcase()` function definition + call inside the existing `DOMContentLoaded` callback.
- Implements `expandCard()`, `collapseCard()`, `buildCarousel()`, `registerHover()` helpers.
- Handles: click-to-expand, close-button collapse, Escape key, ArrowLeft/ArrowRight keyboard nav, touch swipe (40px threshold), external link passthrough, no-screenshot fallback state.

## Tester Focus Areas

1. **Greek Yoghurt Shop** — clicking the card should expand it and display a 10-slide carousel (`01-home.png` → `10-checkout.png`). First image must load immediately (eager), rest lazy.
2. **Other 5 cards** — clicking any should expand with "No previews available yet" placeholder. No JS errors.
3. **Close button** — clicking × must fully restore the grid (all 6 cards visible, no leftover `.card-expanded`/`.card-sidebar` classes).
4. **Escape key** — pressing Escape while a card is expanded must collapse it.
5. **Arrow keys** — ArrowRight/Left must advance/retreat the carousel; must not fire when no card is expanded.
6. **Switch project** — with card A expanded, click a sidebar card; A must collapse and the clicked card must expand without a flash.
7. **External links** — the globe/GitHub icons on any card must still navigate to their URLs even when the card is a sidebar or expanded.
8. **Cursor hover class** — expanded card body must NOT trigger the body `.hovering` class; close button and carousel arrows must.
9. **Keyboard listener leak** — open a card, close it, confirm no leftover keydown listeners (open DevTools → Event Listeners on `document`).
10. **Mobile (≤700px)** — sidebar cards stack horizontally below; expanded panel is above; no horizontal overflow.

