document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-stagger').forEach((el) => el.classList.add('active'));
    }, 100);

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal-up').forEach((el) => {
        revealObserver.observe(el);
    });

    document.querySelectorAll('.reveal-stagger-group, .projects-grid').forEach((group) => {
        revealObserver.observe(group);
    });

    document.querySelectorAll('.project-card[data-glow]').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });


    const projectsGrid = document.querySelector('#work .projects-grid');
    if (projectsGrid) {
        const cards = [...projectsGrid.querySelectorAll('.project-card')];
        const galleryState = new WeakMap();

        function parseGallery(card) {
            const raw = card.getAttribute('data-gallery');
            if (!raw) return [];
            try {
                const list = JSON.parse(raw);
                return Array.isArray(list) ? list.filter(Boolean) : [];
            } catch {
                return [];
            }
        }

        function ensureGallery(card) {
            let state = galleryState.get(card);
            if (state) return state;
            const slides = parseGallery(card);
            const root = card.querySelector('.project-gallery');
            const img = root?.querySelector('.project-gallery-image');
            const dots = root?.querySelector('.project-gallery-dots');
            if (!root || !img || !slides.length) {
                state = { slides: [], index: 0, root: null };
                galleryState.set(card, state);
                return state;
            }
            dots.innerHTML = '';
            slides.forEach((_, i) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.setAttribute('aria-label', `Show screenshot ${i + 1}`);
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showSlide(card, i);
                });
                dots.appendChild(btn);
            });
            state = { slides, index: 0, root, img, dots };
            galleryState.set(card, state);
            showSlide(card, 0);
            return state;
        }

        function showSlide(card, index) {
            const state = ensureGallery(card);
            if (!state.slides.length || !state.img) return;
            const next = (index + state.slides.length) % state.slides.length;
            state.index = next;
            state.img.src = state.slides[next];
            state.img.alt = `${card.querySelector('h3')?.textContent.trim() || 'Project'} screenshot ${next + 1}`;
            [...state.dots.querySelectorAll('button')].forEach((btn, i) => {
                btn.classList.toggle('is-active', i === next);
            });
        }

        function collapse() {
            projectsGrid.classList.remove('is-expanded');
            cards.forEach((card) => {
                card.classList.remove('is-featured', 'is-aside');
                const gallery = card.querySelector('.project-gallery');
                if (gallery) {
                    gallery.hidden = true;
                    gallery.setAttribute('aria-hidden', 'true');
                }
            });
        }

        function expand(target) {
            const slides = parseGallery(target);
            if (!slides.length) return;
            projectsGrid.classList.add('is-expanded');
            cards.forEach((card) => {
                const featured = card === target;
                card.classList.toggle('is-featured', featured);
                card.classList.toggle('is-aside', !featured);
                const gallery = card.querySelector('.project-gallery');
                if (!gallery) return;
                if (featured) {
                    gallery.hidden = false;
                    gallery.setAttribute('aria-hidden', 'false');
                    ensureGallery(card);
                    showSlide(card, 0);
                } else {
                    gallery.hidden = true;
                    gallery.setAttribute('aria-hidden', 'true');
                }
            });
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        cards.forEach((card) => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a, .project-gallery-nav, .project-gallery-dots, .project-gallery-close')) {
                    return;
                }
                if (card.classList.contains('is-featured')) return;
                if (!parseGallery(card).length) return;
                expand(card);
            });

            card.querySelector('.project-gallery-close')?.addEventListener('click', (e) => {
                e.stopPropagation();
                collapse();
            });
            card.querySelector('.project-gallery-nav.prev')?.addEventListener('click', (e) => {
                e.stopPropagation();
                const state = ensureGallery(card);
                showSlide(card, state.index - 1);
            });
            card.querySelector('.project-gallery-nav.next')?.addEventListener('click', (e) => {
                e.stopPropagation();
                const state = ensureGallery(card);
                showSlide(card, state.index + 1);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectsGrid.classList.contains('is-expanded')) {
                collapse();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth',
                });
            }
        });
    });
});
