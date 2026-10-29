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
  GitFork,
  Buildings,
  Truck,
  ArrowsLeftRight
} from '@phosphor-icons/react';

export type AggreRole = 'all' | 'rs' | 'pbf' | 'shared';

export interface AggreScreenItem {
  id: string;
  num: string;
  title: string;
  role: 'rs' | 'pbf' | 'shared';
  roleLabel: string;
  src: string;
  description: string;
  highlight: string;
  tags: string[];
}

export const AGGRE_SCREENS: AggreScreenItem[] = [
  // --- RS Specific Role (Hospital) ---
  {
    id: '01-RS-dashboard',
    num: '01',
    title: 'Hospital PO Tracking & Shipment Dashboard',
    role: 'rs',
    roleLabel: 'Hospital (RS)',
    src: '/work/aggre/01-RS-dashboard.png',
    description: 'Executive command center for hospital procurement teams, tracking overall PO requests vs shipped orders alongside a 145-PO delivery status donut breakdown.',
    highlight: 'Aggregated delivery rate donut (Fully Delivered, Partial, Not Delivered) and per-distributor fulfillment rate metrics.',
    tags: ['PO Tracking', 'Shipment Donut', 'Hospital SLA']
  },
  {
    id: '02-RS-dashboard',
    num: '02',
    title: 'Hospital PO Validity & Lifecycle Breakdown',
    role: 'rs',
    roleLabel: 'Hospital (RS)',
    src: '/work/aggre/02-RS-dashboard.png',
    description: 'Comprehensive PO lifecycle monitor categorizing purchase orders by validity status (Active, Expiring Soon, Expired) and distributor confirmation status.',
    highlight: 'Donut chart mapping active lifecycle stages from Order Review and Awaiting Shipment to Delivery and Completed.',
    tags: ['PO Lifecycle', 'Expiration Alert', 'Confirmation Status']
  },
  {
    id: '03-RS-dashboard',
    num: '03',
    title: 'Hospital Fulfillment GAP & Quantity Funnel',
    role: 'rs',
    roleLabel: 'Hospital (RS)',
    src: '/work/aggre/03-RS-dashboard.png',
    description: 'Supply discrepancy analysis view highlighting rejected shipments, GRN variances, and the complete quantity degradation funnel (Request -> Confirm -> Delivery -> Receipt).',
    highlight: '10.288 requested items traced through receipt to identify the 9.953 item GAP quantity across hospital branches.',
    tags: ['Fulfillment GAP', 'GRN Variance', 'Discrepancy Analysis']
  },
  {
    id: '04-RS-dashboard',
    num: '04',
    title: 'Hospital Service Level (SL) Performance',
    role: 'rs',
    roleLabel: 'Hospital (RS)',
    src: '/work/aggre/04-RS-dashboard.png',
    description: 'Distributor SLA scorecard measuring delivery performance, on-time delivery rates (64.03%), and overall fulfillment rates per pharmaceutical partner.',
    highlight: 'Visual donut ratio of delivered vs undelivered medical items with distributor performance benchmarks.',
    tags: ['Distributor SLA', 'On-Time Delivery', 'Vendor Scorecard']
  },
  {
    id: '05-RS-dashboard',
    num: '05',
    title: 'Hospital Medicine Product Analytics',
    role: 'rs',
    roleLabel: 'Hospital (RS)',
    src: '/work/aggre/05-RS-dashboard.png',
    description: 'Pharmaceutical procurement recap tracking total medicine spend (Rp 502M+), units ordered (7.792), and fulfillment rates segmented by pharmaceutical principal manufacturer.',
    highlight: 'Detailed manufacturer-level breakdown across Jakarta and Bitung hospital branches with spend tracking in IDR.',
    tags: ['Pharmaceutical Spend', 'Principal Analytics', 'Multi-Branch']
  },

  // --- PBF Specific Role (Distributor) ---
  {
    id: '01-PBF-dashboard',
    num: '06',
    title: 'Distributor PO Status & Acceptance Queue',
    role: 'pbf',
    roleLabel: 'Distributor (PBF)',
    src: '/work/aggre/01-PBF-dashboard.png',
    description: 'Incoming order dispatch queue for pharmaceutical distributors, monitoring PO validity, expiration dates, and pending hospital order confirmation states.',
    highlight: 'Immediate visibility into 28 purchase orders waiting confirmation and 121 active validated contracts.',
    tags: ['Incoming Orders', 'Order Acceptance', 'Distributor Queue']
  },
  {
    id: '02-PBF-dashboard',
    num: '07',
    title: 'Distributor Fulfillment GAP Analysis',
    role: 'pbf',
    roleLabel: 'Distributor (PBF)',
    src: '/work/aggre/02-PBF-dashboard.png',
    description: 'Outbound logistics monitoring tracking requested quantities (12.949) against confirmed and dispatched quantities to pinpoint stock shortages and order slippage.',
    highlight: 'Five-stage quantity reconciliation funnel paired with per-hospital fulfillment rate progress indicators.',
    tags: ['Outbound Logistics', 'Stock Shortage', 'Fulfillment Tracking']
  },
  {
    id: '03-PBF-mappingProduct',
    num: '08',
    title: 'Distributor Master Product SKU Mapping',
    role: 'pbf',
    roleLabel: 'Distributor (PBF)',
    src: '/work/aggre/03-PBF-mappingProduct.png',
    description: 'Catalog translation engine resolving discrepancies between hospital internal drug formularies and distributor warehouse SKUs, with CSV export capabilities.',
    highlight: 'Tracks mapped vs unmapped product ratios across affiliated hospital networks (e.g. 926 mapped vs 904 unmapped).',
    tags: ['SKU Translation', 'Formulary Mapping', 'Master Data']
  },
  {
    id: '04-PBF-mappingCustomer',
    num: '09',
    title: 'Distributor Customer & Branch Mapping',
    role: 'pbf',
    roleLabel: 'Distributor (PBF)',
    src: '/work/aggre/04-PBF-mappingCustomer.png',
    description: 'Multi-branch customer registry linking hospital entities to specific Ship-To IDs, Bill-To IDs, Salur Codes, BPJS/Inhealth accounts, and credit payment terms.',
    highlight: 'Branch-level routing ensuring delivery orders reach the correct regional facility (e.g. Jakarta vs Sumatera).',
    tags: ['Customer Mapping', 'Billing Accounts', 'Branch Routing']
  },
  {
    id: '05-PBF-crossSelling',
    num: '10',
    title: 'Distributor Master Cross-Selling & Substitution',
    role: 'pbf',
    roleLabel: 'Distributor (PBF)',
    src: '/work/aggre/05-PBF-crossSelling.png',
    description: 'Alternative medication mapping system allowing distributors to suggest certified therapeutic generic substitutes when primary requested drugs are out of stock.',
    highlight: 'Hospital department and supplier code alignment to ensure clinical compliance during medication substitution.',
    tags: ['Drug Substitution', 'Cross-Selling', 'Stock Replacement']
  },

  // --- Shared Workflow (Both Roles) ---
  {
    id: '01-purchaseOrder',
    num: '11',
    title: 'Central Purchase Order Registry',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/01-purchaseOrder.png',
    description: 'Shared transactional ledger displaying purchase orders across both hospital buyers and distributor fulfillers with real-time status badges.',
    highlight: 'Status indicators spanning UNMAPPED, AWAITING_SHIPMENT, and ORDER_REVIEW with date and expiry tracking.',
    tags: ['Order Registry', 'Status Ledger', 'Shared Workflow']
  },
  {
    id: '02-deliveryOrder',
    num: '12',
    title: 'Delivery Order Dispatch & Tracking',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/02-deliveryOrder.png',
    description: 'Shipment manifest index tracking issued Delivery Orders (DO), correlating DO numbers directly to parent POs with dispatch dates and transit statuses.',
    highlight: 'Bilateral visibility: distributors log dispatches while hospital receiving bays prepare for inbound deliveries.',
    tags: ['Delivery Order', 'Shipment Manifest', 'Logistics']
  },
  {
    id: '03-goodReceiptNotes',
    num: '13',
    title: 'Good Receipt Notes (GRN) Inbound Logging',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/03-goodReceiptNotes.png',
    description: 'Receiving inspection record where hospital warehouse staff confirm physical goods arrival against distributor delivery orders.',
    highlight: 'Formal receipt validation that serves as the triggering milestone for invoice generation and payment clearance.',
    tags: ['GRN Verification', 'Receiving Bay', 'Delivery Confirmation']
  },
  {
    id: '04-poDetail',
    num: '14',
    title: 'PO Detail & Oracle ERP Synchronization',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/04-poDetail.png',
    description: 'Detailed order manifest with Oracle ERP synchronization ("Send To Oracle"), unit-of-measure (Box5, Box30) handling, discounts, and PPN tax calculations.',
    highlight: 'Itemized price breakdown showing buyer SKU vs seller SKU mapping, contract pricing, and commercial terms.',
    tags: ['Oracle Integration', 'ERP Sync', 'Itemized PO']
  },
  {
    id: '05-poDetail',
    num: '15',
    title: 'PO Audit Trail, Attachments & Timeline',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/05-poDetail.png',
    description: 'Auditable transaction timeline logging milestone transitions (Unmapped -> New -> Awaiting Shipment -> Order Review -> Completed) with PDF PO downloads.',
    highlight: 'Immutable event history establishing full accountability between hospital purchasing and distributor dispatch.',
    tags: ['Audit Trail', 'PDF Attachments', 'Order Timeline']
  },
  {
    id: '06-doDetail',
    num: '16',
    title: 'Delivery Order Detail & Batch Traceability',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/06-doDetail.png',
    description: 'Pharmaceutical compliance view showing item-by-item batch numbers (e.g. AVCRC60013-1) and manufacturer expiry dates (up to 2028).',
    highlight: 'Critical medical supply chain compliance: mandatory batch tracking and expiration logging before hospital admission.',
    tags: ['Batch Tracking', 'Expiry Compliance', 'Pharmaceutical Safety']
  },
  {
    id: '07-Invoice',
    num: '17',
    title: 'Invoice Ledger & Settlement Summary',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/07-Invoice.png',
    description: 'Financial reconciliation view displaying total order value (Rp 675M+ across 145 orders), outstanding amounts, and payment status compositions.',
    highlight: 'Visual settlement breakdown separating outstanding, overdue, and completed invoice payments.',
    tags: ['Financial Ledger', 'Invoice Composition', 'Settlement Summary']
  },
  {
    id: '03-masterPartnership',
    num: '18',
    title: 'Master Partnership Directory',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/03-masterPartnership.png',
    description: 'Bilateral trading contract registry establishing legal relationships and active status between distributors and specific hospital institutions.',
    highlight: 'Authorizes access to pricing contracts and inventory feeds only between certified trading partners.',
    tags: ['Trading Partners', 'Contracts', 'Commercial Network']
  },
  {
    id: '09-masterUser',
    num: '19',
    title: 'Master User & RBAC Permissions',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/09-masterUser.png',
    description: 'Role-based access control configuring permissions for Admin PBF, Super Admin PBF, Staff PBF, and Hospital Admin users across designated regional branches.',
    highlight: 'Fine-grained data isolation ensuring hospital personnel and distributor staff only see their authorized branch data.',
    tags: ['RBAC', 'User Management', 'Data Governance']
  },
  {
    id: '10-masterCompany',
    num: '20',
    title: 'Master Company & Multi-Branch Structure',
    role: 'shared',
    roleLabel: 'Shared (Both Roles)',
    src: '/work/aggre/10-masterCompany.png',
    description: 'Enterprise organizational hierarchy managing enterprise profiles, active order channel settings, and branch networks across Bekasi, Depok, Jakarta, Surabaya, Tangerang, and Bandung.',
    highlight: 'Eight regional branch nodes structured under a parent corporate entity with individual facility codes.',
    tags: ['Multi-Branch', 'Enterprise Hierarchy', 'Facility Network']
  }
];

type ViewMode = 'showcase' | 'grid' | 'flow';

export function AggreGallery() {
  const [activeRole, setActiveRole] = useState<AggreRole>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('showcase');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredScreens = AGGRE_SCREENS.filter(screen => {
    if (activeRole === 'all') return true;
    return screen.role === activeRole;
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
    <section className="yogurt-gallery-root aggre-gallery-root" aria-label="Aggre Enterprise Architecture Screens">
      <header className="yogurt-gallery-header">
        <div className="yogurt-gallery-title-row">
          <div>
            <span className="mono yogurt-eyebrow">Enterprise Procurement Suite</span>
            <h3 className="yogurt-gallery-heading">Platform Interface Architecture</h3>
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
              title="Dual-Role Supply Chain Journey"
              aria-pressed={viewMode === 'flow'}
            >
              <GitFork size={16} weight={viewMode === 'flow' ? 'bold' : 'regular'} />
              <span>Supply Flow</span>
            </button>
          </div>
        </div>

        {/* Role Filter Tabs */}
        <div className="yogurt-category-tabs" role="tablist" aria-label="Filter screens by user role">
          {[
            { id: 'all', label: 'All Platform Screens', count: 20, icon: null },
            { id: 'rs', label: 'Hospital (RS) Role', count: 5, icon: Buildings },
            { id: 'pbf', label: 'Distributor (PBF) Role', count: 5, icon: Truck },
            { id: 'shared', label: 'Shared Core Workflow', count: 10, icon: ArrowsLeftRight },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeRole === tab.id}
                className={`category-tab role-tab role-tab-${tab.id} ${activeRole === tab.id ? 'active' : ''}`}
                onClick={() => setActiveRole(tab.id as AggreRole)}
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
                  <span className="browser-url">app.aggre.id/portal/{screen.role}</span>
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
                  <span className={`screen-cat-badge role-badge role-badge-${screen.role}`}>
                    {screen.roleLabel}
                  </span>
                  <div className="screen-tags">
                    {screen.tags.map(tag => (
                      <span key={tag} className="screen-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <h4 className="screen-title">{screen.title}</h4>
                <p className="screen-desc">{screen.description}</p>
                <div className="screen-highlight-box">
                  <span className="mono highlight-label">Enterprise Metric</span>
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
                  <span className={`screen-cat-badge role-badge role-badge-${screen.role}`}>
                    {screen.roleLabel}
                  </span>
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
                phase: 'Demand Planning & Order Acceptance',
                roleBadge: 'RS + PBF Bilateral',
                screens: [AGGRE_SCREENS[0], AGGRE_SCREENS[5], AGGRE_SCREENS[10]],
                summary: 'Hospital procurement teams generate demand forecasts and issue POs via the PO Tracking dashboard, while distributors process incoming requests through their confirmation queues.'
              },
              {
                step: '02',
                phase: 'Catalog & Customer Master Data Alignment',
                roleBadge: 'PBF Master Operations',
                screens: [AGGRE_SCREENS[7], AGGRE_SCREENS[8], AGGRE_SCREENS[9]],
                summary: 'Distributors maintain master SKU translation tables matching hospital drug codes to warehouse inventories, configure customer billing profiles, and establish certified therapeutic cross-selling substitutes.'
              },
              {
                step: '03',
                phase: 'Dispatch, Batch Tracking & Inbound Inspection',
                roleBadge: 'Logistics & Receiving Bay',
                screens: [AGGRE_SCREENS[11], AGGRE_SCREENS[15], AGGRE_SCREENS[12]],
                summary: 'Distributors issue Delivery Orders with mandatory pharmaceutical batch numbers and expiry dates. Hospital receiving docks verify physical cargo and issue digital Good Receipt Notes (GRN).'
              },
              {
                step: '04',
                phase: 'ERP Sync, Financial Settlement & Governance',
                roleBadge: 'Enterprise Core',
                screens: [AGGRE_SCREENS[13], AGGRE_SCREENS[14], AGGRE_SCREENS[16], AGGRE_SCREENS[18]],
                summary: 'Completed orders synchronize directly with Oracle ERP systems. Invoices trigger payment reconciliation while role-based access control enforces strict data privacy across hospital and distributor branches.'
              }
            ].map(stage => (
              <section key={stage.step} className="flow-stage">
                <div className="flow-stage-header">
                  <div className="flow-step-badge">
                    <span className="mono">Stage {stage.step} · {stage.roleBadge}</span>
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
                          <span className={`role-badge-mini role-badge-${screen.role}`}>{screen.role.toUpperCase()}</span>
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
                <span className={`screen-cat-badge role-badge role-badge-${filteredScreens[lightboxIndex].role}`}>
                  {filteredScreens[lightboxIndex].roleLabel}
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
                height={904}
                priority
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-footer">
              <p className="lightbox-desc">{filteredScreens[lightboxIndex].description}</p>
              <div className="lightbox-highlight">
                <span className="mono highlight-label">Enterprise Insight:</span>
                <span>{filteredScreens[lightboxIndex].highlight}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
