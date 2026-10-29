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
  Sparkle,
  Bag,
  TShirt
} from '@phosphor-icons/react';

export type OotdCategory = 'all' | 'editorial' | 'collections' | 'commerce';

export interface OotdScreenItem {
  id: string;
  num: string;
  title: string;
  category: 'editorial' | 'collections' | 'commerce';
  categoryLabel: string;
  brandPartner?: string;
  src: string;
  description: string;
  highlight: string;
  tags: string[];
}

export const OOTD_SCREENS: OotdScreenItem[] = [
  {
    id: '01-home',
    num: '01',
    title: 'Editorial Campaign Hero ("Chase The Sun")',
    category: 'editorial',
    categoryLabel: 'Editorial',
    brandPartner: 'Jacquemus',
    src: '/work/ootd/01-home.png',
    description: 'Immersive cinematic header introducing the "Chase The Sun" summer resort capsule. High-fashion art direction by the Mediterranean, featuring stark brutalist concrete structures and seaside sunlight.',
    highlight: 'Minimalist brand typography, full-bleed visual narrative, and direct "Explore Summer Resort" conversion CTA.',
    tags: ['Hero Section', 'Editorial Campaign', 'Art Direction']
  },
  {
    id: '02-home',
    num: '02',
    title: 'Seasonal Drops & Brand Partnership Grid',
    category: 'collections',
    categoryLabel: 'Collections',
    src: '/work/ootd/02-home.png',
    description: 'Curated seasonal portals filtering capsules across the calendar: Winter Collection (Arc\'teryx), Summer Resort (Jacquemus), Eid Al-Fitr (Zara Luxe), Christmas Edit (Ralph Lauren), and Lunar New Year (Adidas).',
    highlight: 'Pill-based season switcher, verified luxury partner labels, and seamless entry into multi-brand lookbooks.',
    tags: ['Seasonal Capsules', 'Brand Partnerships', 'Category Navigation']
  },
  {
    id: '03-summerCollection',
    num: '03',
    title: 'Summer Resort Lookbook Directory',
    category: 'editorial',
    categoryLabel: 'Editorial',
    brandPartner: 'Jacquemus',
    src: '/work/ootd/03-summerCollection.png',
    description: 'Clean three-column lookbook gallery presenting the Jacquemus partnership capsule. Focuses on linen garments, flowing tiered silhouettes, and warm Mediterranean earth tones.',
    highlight: 'Micro-taxonomy filter pills (All Looks, Casual), distraction-free white space, and interactive look selection.',
    tags: ['Lookbook Grid', 'Curated Styling', 'Resort Wear']
  },
  {
    id: '04-detail',
    num: '04',
    title: '"Shop The Look" Itemization Modal',
    category: 'commerce',
    categoryLabel: 'Commerce',
    brandPartner: 'Jacquemus',
    src: '/work/ootd/04-detail.png',
    description: 'Interactive quick-view modal decomposing complete editorial outfits into purchasable individual items (La Chemise Jean $420, Le Short Gelato $310, Les Mules Blanches $590).',
    highlight: 'Two-column outfit breakdown linking lifestyle styling directly to SKU itemization with single-click "Shop The Look".',
    tags: ['Shop The Look', 'Quick View', 'Basket Building']
  },
  {
    id: '05-lunarStreetwear',
    num: '05',
    title: 'Lunar New Year Streetwear Drop',
    category: 'editorial',
    categoryLabel: 'Editorial',
    brandPartner: 'Adidas',
    src: '/work/ootd/05-lunarStreetwear.png',
    description: 'High-energy cultural streetwear lookbook developed in collaboration with Adidas. Heavy crimson satins, intricate dragon gold embroidery, and structured utility silhouettes.',
    highlight: 'Occasion filtering pills (Streetwear, Casual, Formal) demonstrating dynamic catalog filtering across styling moods.',
    tags: ['Streetwear Drop', 'Cultural Capsule', 'Athleisure']
  },
  {
    id: '06-lunarCasual',
    num: '06',
    title: 'Lunar New Year Casual Wardrobe',
    category: 'editorial',
    categoryLabel: 'Editorial',
    brandPartner: 'Adidas',
    src: '/work/ootd/06-lunarCasual.png',
    description: 'Velvet track jackets with traditional frog-button closures paired with relaxed denim and tennis skirts, bridging heritage eastern craftsmanship with western sportswear.',
    highlight: 'Instant tab switching preserving model framing and visual consistency across styling sub-categories.',
    tags: ['Casual Styling', 'Heritage Fusion', 'Sportswear']
  },
  {
    id: '07-footer',
    num: '07',
    title: 'Collection Discovery & Commerce Footer',
    category: 'collections',
    categoryLabel: 'Collections',
    src: '/work/ootd/07-footer.png',
    description: 'End-of-page discovery carousel ("More Collections") facilitating continuous browsing between seasons, backed by a comprehensive fashion commerce customer service index.',
    highlight: 'Persistent collection cross-linking, student/military discount portals, and full legal compliance footer.',
    tags: ['Cross Navigation', 'Discovery Carousel', 'Store Footer']
  }
];

type ViewMode = 'showcase' | 'grid' | 'flow';

export function OotdGallery() {
  const [activeCategory, setActiveCategory] = useState<OotdCategory>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('showcase');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredScreens = OOTD_SCREENS.filter(screen => {
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
    <section className="yogurt-gallery-root ootd-gallery-root" aria-label="OOTD Fashion Commerce Interface Archive">
      <header className="yogurt-gallery-header">
        <div className="yogurt-gallery-title-row">
          <div>
            <span className="mono yogurt-eyebrow">Self Project · In Progress</span>
            <h3 className="yogurt-gallery-heading">Fashion Commerce Interface</h3>
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
              title="Lookbook Editorial Journey"
              aria-pressed={viewMode === 'flow'}
            >
              <Sparkle size={16} weight={viewMode === 'flow' ? 'bold' : 'regular'} />
              <span>Lookbook Flow</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="yogurt-category-tabs" role="tablist" aria-label="Filter screens by department">
          {[
            { id: 'all', label: 'All Screens', count: 7, icon: null },
            { id: 'editorial', label: 'Lookbooks & Drops', count: 4, icon: TShirt },
            { id: 'collections', label: 'Curations & Portals', count: 2, icon: Sparkle },
            { id: 'commerce', label: 'Shop The Look', count: 1, icon: Bag },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeCategory === tab.id}
                className={`category-tab ootd-tab ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id as OotdCategory)}
              >
                {Icon && <Icon size={14} className="tab-role-icon" />}
                <span>{tab.label}</span>
                <span className="tab-count">{tab.count}</span>
              </button>
            );
          })}
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
                  <span className="browser-url">ootd.style/{screen.category === 'editorial' ? 'capsule' : screen.category}</span>
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
                    height={904}
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
                  {screen.brandPartner && (
                    <span className="ootd-partner-badge">
                      {screen.brandPartner}
                    </span>
                  )}
                  <div className="screen-tags">
                    {screen.tags.map(tag => (
                      <span key={tag} className="screen-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <h4 className="screen-title">{screen.title}</h4>
                <p className="screen-desc">{screen.description}</p>
                <div className="screen-highlight-box ootd-highlight-box">
                  <span className="mono highlight-label">Fashion UX</span>
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
                    height={904}
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
                  {screen.brandPartner && (
                    <span className="ootd-partner-badge-sm">{screen.brandPartner}</span>
                  )}
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
                phase: 'Campaign Landing & Brand Ambience',
                screens: [OOTD_SCREENS[0], OOTD_SCREENS[1]],
                summary: 'The customer enters through high-impact Mediterranean editorial photography ("Chase The Sun") before transitioning into a calendar-driven seasonal portal featuring curated capsule drops.'
              },
              {
                step: '02',
                phase: 'Brand Capsules & Lookbook Exploration',
                screens: [OOTD_SCREENS[2], OOTD_SCREENS[4], OOTD_SCREENS[5]],
                summary: 'Editorial lookbooks present curated capsules (Jacquemus Summer Resort and Adidas Lunar New Year) with instant sub-category toggles for Casual, Streetwear, and Formal occasions.'
              },
              {
                step: '03',
                phase: 'Interactive "Shop The Look" & Outfit Breakdown',
                screens: [OOTD_SCREENS[3]],
                summary: 'Clicking any styled model opens a quick-view modal decomposing the complete outfit into individual items, transparent pricing, and instant "Shop The Look" cart dispatch.'
              },
              {
                step: '04',
                phase: 'Cross-Season Discovery & Commerce Footer',
                screens: [OOTD_SCREENS[6]],
                summary: 'The experience closes with a horizontal collection carousel inviting users into adjacent seasonal capsules, backed by an accessible e-commerce service footer.'
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
                            height={904}
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
                {filteredScreens[lightboxIndex].brandPartner && (
                  <span className="ootd-partner-badge">
                    {filteredScreens[lightboxIndex].brandPartner}
                  </span>
                )}
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
                height={904}
                priority
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-footer">
              <p className="lightbox-desc">{filteredScreens[lightboxIndex].description}</p>
              <div className="lightbox-highlight">
                <span className="mono highlight-label">Fashion UX:</span>
                <span>{filteredScreens[lightboxIndex].highlight}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
