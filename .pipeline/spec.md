# Spec: Project Screenshot Showcase (Expand-on-Click Cards)

## OPEN QUESTIONS
- None — starting with "Greek Yoghurt Shop" screenshots at `assets/projects/yoghurt/`. The other two project folders (`aggre/`, `luvre/`) are empty; all 6 cards must still be expandable, with a graceful "No previews available" state for cards with no screenshots.

---

## Feature Summary

When a project card in the "Featured Projects" grid is **clicked**:
1. The **clicked card expands** to a full-width "showcase" panel with a horizontal **image carousel** of the project's screenshots.
2. All **other cards shrink** to a compact 72px-wide "icon strip" sidebar showing only the project icon + truncated name, stacked vertically to the left.
3. The expanded panel shows: project header (icon, name, tech tags, links) + carousel + a close (×) button at top-right.
4. Clicking a sidebar card's icon switches to that project.
5. Clicking the close button (or pressing Escape) collapses back to the normal grid.

---

## Files to Modify

### 1. `index.html`

Add `data-project-id` and `data-screenshots` attributes to every `.project-card` div. **Do not** change any other markup.

Cards in order (1-6):
1. Aggre: `data-project-id="aggre"` `data-screenshots=""`
2. Luvre Paris: `data-project-id="luvre"` `data-screenshots=""`
3. Greek Yoghurt Shop: `data-project-id="yoghurt"` `data-screenshots="assets/projects/yoghurt/01-home.png,assets/projects/yoghurt/02-home.png,assets/projects/yoghurt/03-home.png,assets/projects/yoghurt/04-home.png,assets/projects/yoghurt/05-home.png,assets/projects/yoghurt/06-home.png,assets/projects/yoghurt/07-products.png,assets/projects/yoghurt/08-contact.png,assets/projects/yoghurt/09-cart.png,assets/projects/yoghurt/10-checkout.png"`
4. Job Board Platform: `data-project-id="jobboard"` `data-screenshots=""`
5. Cinematrix API: `data-project-id="cinematrix"` `data-screenshots=""`
6. Disetir Atasan: `data-project-id="disetir"` `data-screenshots=""`

No other HTML structural changes. The `.showcase-carousel` / close button are injected by JS.

---

### 2. `styles.css`

Append all new rules **after line 1084** (end of file). Do NOT modify any existing rule.

```css
/* =========================================
   PROJECT SHOWCASE — EXPANDED STATE
   ========================================= */

.projects-grid.has-active {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Sidebar strip */
.project-card.card-sidebar {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    flex-shrink: 0;
    width: 72px;
    min-height: 80px;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    cursor: pointer;
    transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.35s ease,
                background 0.3s ease;
    overflow: hidden;
}

.project-card.card-sidebar .project-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 100%;
}

.project-card.card-sidebar .project-desc,
.project-card.card-sidebar .project-tech,
.project-card.card-sidebar .project-links {
    display: none;
}

.project-card.card-sidebar h3 {
    font-size: 0.6rem;
    text-align: center;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 64px;
    margin-bottom: 0;
}

.project-card.card-sidebar .project-icon {
    font-size: 1.6rem;
    margin-bottom: 0;
}

.project-card.card-sidebar .project-header {
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;
    gap: 6px;
}

.project-card.card-sidebar:hover {
    background: rgba(10, 147, 150, 0.2);
    border-color: var(--clr-cyan);
    transform: none !important;
    box-shadow: none;
    width: 88px;
}

/* Expanded card */
.project-card.card-expanded {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    flex: 1;
    min-width: 0;
    height: auto;
    padding: 30px;
    cursor: default;
    position: relative;
    transition: flex 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card.card-expanded:hover {
    transform: none !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border-color: var(--clr-cyan);
}

/* Close button */
.showcase-close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-muted);
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-smooth);
    z-index: 10;
    backdrop-filter: var(--glass-blur);
}

.showcase-close-btn:hover {
    background: rgba(187, 62, 3, 0.3);
    border-color: var(--clr-rust);
    color: var(--clr-vanilla);
    transform: rotate(90deg);
}

/* Carousel */
.showcase-carousel {
    margin-top: 24px;
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.showcase-carousel-track {
    display: flex;
    width: 100%;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
}

.showcase-slide {
    flex-shrink: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 460px;
    overflow: hidden;
}

.showcase-slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
    display: block;
    border-radius: 8px;
    max-height: 460px;
    user-select: none;
    -webkit-user-drag: none;
}

.carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--glass-border);
    background: rgba(0, 18, 25, 0.7);
    color: var(--clr-vanilla);
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    transition: var(--transition-smooth);
    backdrop-filter: blur(4px);
}

.carousel-arrow:hover {
    background: var(--clr-cyan);
    color: var(--clr-bg);
    border-color: var(--clr-cyan);
}

.carousel-arrow.prev { left: 10px; }
.carousel-arrow.next { right: 10px; }

.carousel-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.carousel-dots {
    display: flex;
    gap: 8px;
    padding: 12px 0 6px;
    justify-content: center;
    flex-wrap: wrap;
}

.carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--glass-border);
    border: none;
    cursor: pointer;
    transition: var(--transition-smooth);
    padding: 0;
}

.carousel-dot.active {
    background: var(--clr-primary);
    transform: scale(1.3);
}

.carousel-counter {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: var(--font-heading);
    padding-bottom: 4px;
}

.carousel-hint {
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0.6;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.showcase-no-previews {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 40px 20px;
    color: var(--text-muted);
    font-size: 0.95rem;
    min-height: 200px;
    margin-top: 24px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
}

.showcase-no-previews i {
    font-size: 3rem;
    color: var(--glass-border);
}

.carousel-arrow:focus-visible,
.carousel-dot:focus-visible,
.showcase-close-btn:focus-visible {
    outline: 2px solid var(--clr-primary);
    outline-offset: 2px;
}

@media (max-width: 700px) {
    .projects-grid.has-active {
        flex-direction: column-reverse;
    }

    .project-card.card-sidebar {
        width: auto;
        flex-direction: row;
        min-height: unset;
        padding: 8px 12px;
        gap: 10px;
    }

    .project-card.card-sidebar .project-header {
        flex-direction: row;
    }

    .showcase-slide {
        max-height: 260px;
    }

    .showcase-slide img {
        max-height: 260px;
    }
}
```

---

### 3. `script.js`

**Inside the existing `DOMContentLoaded` callback, append** a call to `initProjectShowcase()` just before the closing `});`. Define `initProjectShowcase` as a named function inside the same callback.

#### Full function to append:

```js
function initProjectShowcase() {
    const grid = document.querySelector('.projects-grid');
    const allCards = Array.from(document.querySelectorAll('.project-card'));
    let activeCardEl = null;
    let currentSlide = 0;
    let keyHandler = null;

    function buildCarousel(screenshots) {
        const carousel = document.createElement('div');
        carousel.className = 'showcase-carousel';

        const track = document.createElement('div');
        track.className = 'showcase-carousel-track';

        screenshots.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'showcase-slide';
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Screenshot ${i + 1}`;
            img.loading = i === 0 ? 'eager' : 'lazy';
            slide.appendChild(img);
            track.appendChild(slide);
        });

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-arrow prev hover-target';
        prevBtn.setAttribute('aria-label', 'Previous screenshot');
        prevBtn.innerHTML = "<i class='bx bx-chevron-left'></i>";

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-arrow next hover-target';
        nextBtn.setAttribute('aria-label', 'Next screenshot');
        nextBtn.innerHTML = "<i class='bx bx-chevron-right'></i>";

        const dotsWrap = document.createElement('div');
        dotsWrap.className = 'carousel-dots';
        const dots = screenshots.map((_, i) => {
            const d = document.createElement('button');
            d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', `Go to screenshot ${i + 1}`);
            dotsWrap.appendChild(d);
            return d;
        });

        const counter = document.createElement('div');
        counter.className = 'carousel-counter';
        counter.textContent = `1 / ${screenshots.length}`;

        const hint = document.createElement('div');
        hint.className = 'carousel-hint';
        hint.innerHTML = "<i class='bx bx-pointer'></i> Swipe or use arrow keys";

        carousel.appendChild(track);
        carousel.appendChild(prevBtn);
        carousel.appendChild(nextBtn);
        carousel.appendChild(dotsWrap);
        carousel.appendChild(counter);
        carousel.appendChild(hint);

        function goTo(n) {
            const total = screenshots.length;
            n = Math.max(0, Math.min(n, total - 1));
            currentSlide = n;
            track.style.transform = `translateX(-${n * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === n));
            counter.textContent = `${n + 1} / ${total}`;
            prevBtn.disabled = n === 0;
            nextBtn.disabled = n === total - 1;
        }

        goTo(0);

        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentSlide - 1); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentSlide + 1); });
        dots.forEach((d, i) => d.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); }));

        // Touch swipe
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', (e) => {
            const delta = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 40) goTo(currentSlide + (delta > 0 ? 1 : -1));
        });

        return { carousel, goTo };
    }

    function expandCard(cardEl) {
        if (activeCardEl === cardEl) return;
        if (activeCardEl) collapseCard();

        activeCardEl = cardEl;
        currentSlide = 0;

        cardEl.classList.add('card-expanded');
        cardEl.classList.remove('hover-target');

        allCards.forEach(c => {
            if (c !== cardEl) c.classList.add('card-sidebar');
        });
        grid.classList.add('has-active');

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'showcase-close-btn hover-target';
        closeBtn.setAttribute('aria-label', 'Close showcase');
        closeBtn.innerHTML = "<i class='bx bx-x'></i>";
        closeBtn.addEventListener('click', (e) => { e.stopPropagation(); collapseCard(); });
        cardEl.appendChild(closeBtn);

        // Screenshots data from attribute
        const rawScreenshots = (cardEl.dataset.screenshots || '').trim();
        const screenshots = rawScreenshots ? rawScreenshots.split(',').map(s => s.trim()) : [];

        if (screenshots.length > 0) {
            const { carousel } = buildCarousel(screenshots);
            cardEl.appendChild(carousel);
        } else {
            const noPreview = document.createElement('div');
            noPreview.className = 'showcase-no-previews';
            noPreview.innerHTML = "<i class='bx bx-images'></i><span>No previews available yet</span>";
            cardEl.appendChild(noPreview);
        }

        // Keyboard handler
        keyHandler = (e) => {
            if (!activeCardEl) return;
            const track = activeCardEl.querySelector('.showcase-carousel-track');
            if (!track) return;
            if (e.key === 'ArrowRight') { e.preventDefault(); activeCardEl.querySelector('.carousel-arrow.next')?.click(); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); activeCardEl.querySelector('.carousel-arrow.prev')?.click(); }
            if (e.key === 'Escape')     { collapseCard(); }
        };
        document.addEventListener('keydown', keyHandler);

        // Re-register hover-target listeners for new elements (close btn, arrows, dots)
        activeCardEl.querySelectorAll('.hover-target').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    function collapseCard() {
        if (!activeCardEl) return;

        // Remove injected elements
        const carousel = activeCardEl.querySelector('.showcase-carousel');
        const noPreview = activeCardEl.querySelector('.showcase-no-previews');
        const closeBtn = activeCardEl.querySelector('.showcase-close-btn');
        if (carousel) carousel.remove();
        if (noPreview) noPreview.remove();
        if (closeBtn) closeBtn.remove();

        activeCardEl.classList.remove('card-expanded');
        activeCardEl.classList.add('hover-target');

        allCards.forEach(c => c.classList.remove('card-sidebar'));
        grid.classList.remove('has-active');

        if (keyHandler) {
            document.removeEventListener('keydown', keyHandler);
            keyHandler = null;
        }

        activeCardEl = null;
        currentSlide = 0;
    }

    // Wire up click handlers
    allCards.forEach(cardEl => {
        cardEl.addEventListener('click', (e) => {
            // Don't intercept external link clicks
            if (e.target.closest('.project-links')) return;
            // Don't intercept clicks on carousel controls (they stopPropagation already)
            if (e.target.closest('.showcase-carousel') || e.target.closest('.showcase-close-btn')) return;
            // Don't re-expand already-active card body click
            if (cardEl.classList.contains('card-expanded')) return;
            expandCard(cardEl);
        });
    });
}

initProjectShowcase();
```

---

## Edge Cases the Implementation Must Handle

1. **Reveal animation override**: `.card-expanded` and `.card-sidebar` use `!important` on `opacity`, `transform`, `animation` to beat the reveal keyframe animations already applied by `.active`.

2. **External links still work**: Guard in click handler — `if (e.target.closest('.project-links')) return;`.

3. **Re-clicking active card body**: `if (cardEl.classList.contains('card-expanded')) return;` prevents re-triggering.

4. **Switching projects**: `collapseCard()` is called before `expandCard()` to avoid double-expansion.

5. **Keyboard listener leak**: `keyHandler` reference stored in closure; removed on every `collapseCard()` call.

6. **No screenshots state**: `.showcase-no-previews` is rendered when `screenshots.length === 0`.

7. **Image performance**: First slide uses `loading="eager"`, all others use `loading="lazy"`.

8. **Cursor hover class**: `hover-target` is removed from expanded card, re-added on collapse. Dynamically injected close btn/arrows also get `hover-target` class + their own `mouseenter`/`mouseleave` listeners.

9. **Touch swipe**: `touchstart`/`touchend` on `.showcase-carousel-track` with `passive: true`; delta > 40px triggers slide change.

10. **Responsive (≤700px)**: Sidebar becomes a horizontal strip; the `flex-direction: column-reverse` makes the expanded panel appear above it.

