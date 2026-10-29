'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  ArrowsOutSimple, 
  SquaresFour, 
  Rows, 
  GitFork 
} from '@phosphor-icons/react';

export interface ScreenItem {
  id: string;
  num: string;
  title: string;
  category: 'storefront' | 'catalog' | 'checkout' | 'support';
  categoryLabel: string;
  src: string;
  description: string;
  highlight: string;
  tags: string[];
}

export const YOGURT_SCREENS: ScreenItem[] = [
  {
    id: '01-home',
    num: '01',
    title: 'Hero & Freshness Guarantee',
    category: 'storefront',
    categoryLabel: 'Storefront',
    src: '/work/yogurt/01-home.png',
    description: 'Landing hero introducing the brand headline "Healthy Happiness in Every Spoonful", daily batch indicator, nutrition credentials, and direct store actions.',
    highlight: '20g Protein badge, 4.9 average rating social proof, and immediate dual CTAs.',
    tags: ['Hero Section', 'Value Proposition', 'Brand Identity']
  },
  {
    id: '02-home',
    num: '02',
    title: 'Nutritional Pillars & Value Grid',
    category: 'storefront',
    categoryLabel: 'Storefront',
    src: '/work/yogurt/02-home.png',
    description: 'Four-card grid articulating the health benefits: High Protein (up to 22g), Gut Friendly live cultures, Kid-friendly formula, and Fresh Daily dispatch.',
    highlight: 'Clean rounded containers with icon badges and clear, digestible nutritional copy.',
    tags: ['Product Benefits', 'Health Claims', 'Trust Building']
  },
  {
    id: '03-home',
    num: '03',
    title: 'Interactive Fun Facts Carousel',
    category: 'storefront',
    categoryLabel: 'Storefront',
    src: '/work/yogurt/03-home.png',
    description: 'Approachable trivia cards like "Baby\'s First Bestie" and "Tiny Jar, Big Muscles", turning dietary education into an engaging browsing experience.',
    highlight: 'Horizontal card carousel with swipeable navigation and playful brand voice.',
    tags: ['Gamification', 'Customer Education', 'Micro-Copy']
  },
  {
    id: '04-home',
    num: '04',
    title: 'Best Sellers & Quick-Add Grid',
    category: 'storefront',
    categoryLabel: 'Storefront',
    src: '/work/yogurt/04-home.png',
    description: 'High-converting product shelf showing authentic jar photography, pricing in IDR (Rp 18.000–Rp 26.000), quantity steppers, and instant cart dispatch.',
    highlight: 'Dietary mini-tags (High Protein, Probiotic, Vitamin C) with quantity modifier controls.',
    tags: ['Best Sellers', 'E-Commerce', 'Direct Conversion']
  },
  {
    id: '05-home',
    num: '05',
    title: 'Verified Customer Testimonials',
    category: 'storefront',
    categoryLabel: 'Storefront',
    src: '/work/yogurt/05-home.png',
    description: 'Real customer feedback across distinct buyer personas: fitness trainers, parents of toddlers, certified nutritionists, and food bloggers.',
    highlight: 'Five-star rating indicators, clean attribution chips, and authentic quotes.',
    tags: ['Social Proof', 'Reviews', 'Community']
  },
  {
    id: '06-home',
    num: '06',
    title: 'Conversion Banner & Brand Footer',
    category: 'storefront',
    categoryLabel: 'Storefront',
    src: '/work/yogurt/06-home.png',
    description: 'Threshold reminder for free delivery (Rp 150.000) with dual order paths: traditional web ordering or direct WhatsApp conversation.',
    highlight: 'Olive-toned footer with store credentials, contact details, and social links.',
    tags: ['Conversion Banner', 'Free Delivery CTA', 'Footer']
  },
  {
    id: '07-products',
    num: '07',
    title: 'Product Catalog & Category Filtering',
    category: 'catalog',
    categoryLabel: 'Catalog',
    src: '/work/yogurt/07-products.png',
    description: 'Full product directory featuring debounced text search, popularity sorting, and category filter pills (Plain Greek, Fruit Series, Family Pack, High Protein).',
    highlight: 'Pill-based dietary taxonomy, dynamic product counts, and clean card grid.',
    tags: ['Catalog Directory', 'Search & Filter', 'Category Taxonomy']
  },
  {
    id: '08-contact',
    num: '08',
    title: 'WhatsApp Concierge & Delivery Guarantee',
    category: 'support',
    categoryLabel: 'Support',
    src: '/work/yogurt/08-contact.png',
    description: 'Direct conversational ordering hub customized for Jakarta same-day delivery schedules, custom batch queries, and instant customer service.',
    highlight: 'Central WhatsApp action card flanked by delivery, ordering, and return policies.',
    tags: ['WhatsApp Commerce', 'Local Delivery', 'Customer Support']
  },
  {
    id: '09-cart',
    num: '09',
    title: 'Slide-Over Cart & Free Shipping Meter',
    category: 'checkout',
    categoryLabel: 'Cart & Checkout',
    src: '/work/yogurt/09-cart.png',
    description: 'Persistent slide-out drawer maintaining context over blurred pages, equipped with a dynamic free shipping progress meter and line-item quantity controls.',
    highlight: 'Gamified progress bar ("Rp 58.000 away from free delivery!") and quick checkout trigger.',
    tags: ['Slide-Over Drawer', 'Free Shipping Meter', 'Cart Architecture']
  },
  {
    id: '10-checkout',
    num: '10',
    title: 'Frictionless Single-Page Checkout',
    category: 'checkout',
    categoryLabel: 'Cart & Checkout',
    src: '/work/yogurt/10-checkout.png',
    description: 'Two-column checkout flow dividing customer delivery credentials from a sticky order summary breakdown with transparent itemized shipping fees.',
    highlight: 'Sticky sidebar calculation, zero-distraction form inputs, and single-click order placement.',
    tags: ['Checkout Funnel', 'Sticky Order Summary', 'Order Placement']
  }
];

type CategoryFilter = 'all' | 'storefront' | 'catalog' | 'checkout' | 'support';
type ViewMode = 'showcase' | 'grid' | 'flow';

export function YoGurtGallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('showcase');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredScreens = YOGURT_SCREENS.filter(screen => {
    if (activeCategory === 'all') return true;
    return screen.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const nextScreen = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredScreens.length);
  }, [lightboxIndex, filteredScreens.length]);

  const prevScreen = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredScreens.length) % filteredScreens.length);
  }, [lightboxIndex, filteredScreens.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextScreen();
      if (e.key === 'ArrowLeft') prevScreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextScreen, prevScreen]);

  return (
    <section className="yogurt-gallery-root" aria-label="YoGurt Interface Screens Archive">
      <header className="yogurt-gallery-header">
        <div className="yogurt-gallery-title-row">
          <div>
            <span className="mono yogurt-eyebrow">Interface System</span>
            <h3 className="yogurt-gallery-heading">Complete Screen Architecture</h3>
          </div>
          <div className="yogurt-view-controls" aria-label="Gallery view mode">
            <button 
              type="button"
              className={`view-mode-btn ${viewMode === 'showcase' ? 'active' : ''}`}
              onClick={() => setViewMode('showcase')}
              title="Editorial Showcase View"
              aria-pressed={viewMode === 'showcase'}
            >
              <Rows size={16} weight={viewMode === 'showcase' ? 'bold' : 'regular'} />
              <span>Showcase</span>
            </button>
            <button 
              type="button"
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Compact Bento Grid View"
              aria-pressed={viewMode === 'grid'}
            >
              <SquaresFour size={16} weight={viewMode === 'grid' ? 'bold' : 'regular'} />
              <span>Grid</span>
            </button>
            <button 
              type="button"
              className={`view-mode-btn ${viewMode === 'flow' ? 'active' : ''}`}
              onClick={() => setViewMode('flow')}
              title="User Journey Flow View"
              aria-pressed={viewMode === 'flow'}
            >
              <GitFork size={16} weight={viewMode === 'flow' ? 'bold' : 'regular'} />
              <span>User Journey</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="yogurt-category-tabs" role="tablist" aria-label="Filter screens by area">
          {[
            { id: 'all', label: 'All Screens', count: 10 },
            { id: 'storefront', label: 'Storefront', count: 6 },
            { id: 'catalog', label: 'Product Catalog', count: 1 },
            { id: 'checkout', label: 'Cart & Checkout', count: 2 },
            { id: 'support', label: 'Support & WhatsApp', count: 1 },
          ].map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeCategory === tab.id}
              className={`category-tab ${activeCategory === tab.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.id as CategoryFilter)}
            >
              <span>{tab.label}</span>
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Screen Displays */}
      {viewMode === 'showcase' && (
        <div className="yogurt-showcase-list">
          {filteredScreens.map((screen, idx) => (
            <article key={screen.id} className="yogurt-showcase-card">
              <div 
                className="yogurt-screen-frame-wrap" 
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openLightbox(idx)}
                aria-label={`Inspect ${screen.title} in full resolution`}
              >
                <div className="browser-chrome-bar">
                  <div className="traffic-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="browser-url">yogurt.id/{screen.category === 'storefront' ? '' : screen.category}</span>
                  <div className="inspect-badge">
                    <ArrowsOutSimple size={13} />
                    <span>Inspect</span>
                  </div>
                </div>
                <div className="screen-image-container">
                  <Image
                    src={screen.src}
                    alt={screen.title}
                    width={1616}
                    height={972}
                    className="screen-img"
                    sizes="(max-width: 1024px) 100vw, 960px"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="yogurt-card-meta">
                <div className="card-meta-header">
                  <span className="mono screen-number">{screen.num}</span>
                  <span className="screen-cat-badge">{screen.categoryLabel}</span>
                  <div className="screen-tags">
                    {screen.tags.map(tag => (
                      <span key={tag} className="screen-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <h4 className="screen-title">{screen.title}</h4>
                <p className="screen-desc">{screen.description}</p>
                <div className="screen-highlight-box">
                  <span className="mono highlight-label">Highlight</span>
                  <p className="highlight-text">{screen.highlight}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="yogurt-bento-grid">
          {filteredScreens.map((screen, idx) => (
            <article 
              key={screen.id} 
              className="yogurt-grid-card"
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && openLightbox(idx)}
              aria-label={`Inspect ${screen.title}`}
            >
              <div className="grid-card-media">
                <div className="browser-chrome-bar compact">
                  <div className="traffic-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="mono screen-number-small">{screen.num}</span>
                </div>
                <div className="screen-image-container">
                  <Image
                    src={screen.src}
                    alt={screen.title}
                    width={1616}
                    height={972}
                    className="screen-img"
                    sizes="(max-width: 768px) 100vw, 480px"
                    loading="lazy"
                  />
                  <div className="grid-card-overlay">
                    <span className="overlay-inspect">
                      <ArrowsOutSimple size={18} />
                      <span>Zoom Screen</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid-card-body">
                <div className="grid-card-tags">
                  <span className="mono screen-num-pill">{screen.num}</span>
                  <span className="screen-cat-badge">{screen.categoryLabel}</span>
                </div>
                <h4 className="grid-card-title">{screen.title}</h4>
                <p className="grid-card-desc">{screen.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      {viewMode === 'flow' && (
        <div className="yogurt-flow-view">
          <div className="flow-track">
            {[
              {
                step: '01',
                phase: 'Brand & Value Introduction',
                screens: YOGURT_SCREENS.slice(0, 3),
                summary: 'The customer lands on a welcoming, appetite-stimulating homepage that instantly communicates daily fresh production, gut health probiotics, and protein density.'
              },
              {
                step: '02',
                phase: 'Social Proof & Product Discovery',
                screens: YOGURT_SCREENS.slice(3, 7),
                summary: 'Customers explore best-selling jars, customer reviews, conversion guarantees, and dive into the dedicated catalog with dynamic dietary search and filtering.'
              },
              {
                step: '03',
                phase: 'Frictionless Cart & Conversion Funnel',
                screens: YOGURT_SCREENS.slice(8, 10),
                summary: 'Items enter a slide-out cart featuring a live progress bar toward free shipping. Moving to checkout presents a transparent, distraction-free single-page order form.'
              },
              {
                step: '04',
                phase: 'Local Concierge & Ongoing Care',
                screens: [YOGURT_SCREENS[7]],
                summary: 'For custom batches and rapid same-day Jakarta delivery, a direct WhatsApp connection provides personal, conversational service.'
              }
            ].map(stage => (
              <section key={stage.step} className="flow-stage">
                <div className="flow-stage-header">
                  <div className="flow-step-badge">
                    <span className="mono">Stage {stage.step}</span>
                  </div>
                  <h4 className="flow-stage-title">{stage.phase}</h4>
                  <p className="flow-stage-summary">{stage.summary}</p>
                </div>

                <div className="flow-stage-screens">
                  {stage.screens.map(screen => {
                    const globalIdx = filteredScreens.findIndex(s => s.id === screen.id);
                    return (
                      <div 
                        key={screen.id} 
                        className="flow-screen-item"
                        onClick={() => openLightbox(globalIdx >= 0 ? globalIdx : 0)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && openLightbox(globalIdx >= 0 ? globalIdx : 0)}
                      >
                        <div className="browser-chrome-bar compact">
                          <div className="traffic-dots">
                            <span className="dot dot-red" />
                            <span className="dot dot-yellow" />
                            <span className="dot dot-green" />
                          </div>
                          <span className="flow-screen-label">{screen.num} · {screen.title}</span>
                          <ArrowsOutSimple size={12} />
                        </div>
                        <div className="screen-image-container">
                          <Image
                            src={screen.src}
                            alt={screen.title}
                            width={1616}
                            height={972}
                            className="screen-img"
                            sizes="(max-width: 1024px) 100vw, 720px"
                            loading="lazy"
                          />
                        </div>
                        <p className="flow-screen-caption">{screen.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredScreens[lightboxIndex] && (
        <div 
          className="yogurt-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view: ${filteredScreens[lightboxIndex].title}`}
        >
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-header">
              <div className="lightbox-meta">
                <span className="mono lightbox-counter">
                  {filteredScreens[lightboxIndex].num} / {String(filteredScreens.length).padStart(2, '0')}
                </span>
                <span className="screen-cat-badge">
                  {filteredScreens[lightboxIndex].categoryLabel}
                </span>
                <span className="lightbox-title">
                  {filteredScreens[lightboxIndex].title}
                </span>
              </div>
              <div className="lightbox-actions">
                <button 
                  type="button" 
                  className="lightbox-nav-btn" 
                  onClick={prevScreen}
                  aria-label="Previous screen"
                  title="Previous screen (Left Arrow)"
                >
                  <ArrowLeft size={18} />
                </button>
                <button 
                  type="button" 
                  className="lightbox-nav-btn" 
                  onClick={nextScreen}
                  aria-label="Next screen"
                  title="Next screen (Right Arrow)"
                >
                  <ArrowRight size={18} />
                </button>
                <button 
                  type="button" 
                  className="lightbox-close-btn" 
                  onClick={closeLightbox}
                  aria-label="Close viewer"
                  title="Close (Escape)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="lightbox-image-wrap">
              <Image
                src={filteredScreens[lightboxIndex].src}
                alt={filteredScreens[lightboxIndex].title}
                width={1616}
                height={972}
                priority
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-footer">
              <p className="lightbox-desc">{filteredScreens[lightboxIndex].description}</p>
              <div className="lightbox-highlight">
                <span className="mono highlight-label">Design Note:</span>
                <span>{filteredScreens[lightboxIndex].highlight}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
