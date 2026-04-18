/* =============================================================
   SERVICES SCREEN — 006-services spec
   Geo-filtered partner service directory. Read-only catalog;
   providers filtered by transaction property zip code.
   ============================================================= */

const ServicesScreen = (() => {
  // ── State ─────────────────────────────────────────────────
  let _activeCategory = 'ALL';
  let _showRecommended = false;
  let _searchQuery = '';

  // ── Category config ───────────────────────────────────────
  const CATEGORY_META = {
    ALL: { label: 'All Services', icon: '🔍' },
    PLUMBING: { label: 'Plumbing', icon: '🔧' },
    ELECTRICAL: { label: 'Electrical', icon: '⚡' },
    HVAC: { label: 'HVAC', icon: '❄️' },
    INSPECTION: { label: 'Inspection', icon: '🔎' },
    PAINTING: { label: 'Painting', icon: '🎨' },
    LANDSCAPING: { label: 'Landscaping', icon: '🌿' },
    ROOFING: { label: 'Roofing', icon: '🏠' },
    MOVING: { label: 'Moving', icon: '📦' },
    CLEANING: { label: 'Cleaning', icon: '✨' },
    CREDIT_REPAIR: { label: 'Credit Repair', icon: '💳' },
    HANDYMAN: { label: 'Handyman', icon: '🛠️' },
    LOCKSMITH: { label: 'Locksmith', icon: '🔑' },
  };

  // ── Helpers ───────────────────────────────────────────────
  function _getProviders() {
    return window.MockData?.services || [];
  }

  function _getFilteredProviders() {
    let list = _getProviders();

    if (_activeCategory !== 'ALL') {
      list = list.filter((p) => p.category === _activeCategory);
    }
    if (_showRecommended) {
      list = list.filter((p) => p.recommended || p.is_recommended);
    }
    if (_searchQuery.trim()) {
      const q = _searchQuery.toLowerCase();
      list = list.filter((p) => (p.name || '').toLowerCase().includes(q) || (p.contact || p.contact_name || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q));
    }
    return list;
  }

  function _getCategories() {
    const all = _getProviders();
    const cats = [...new Set(all.map((p) => p.category))];
    return ['ALL', ...cats.sort()];
  }

  function _stars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return `${'★'.repeat(full)}${half ? '½' : ''}${'☆'.repeat(empty)}`;
  }

  function _getZip() {
    const addr = window.MockData?.transaction?.property_address;
    return addr?.postal_code || '77380';
  }

  // ── Render ────────────────────────────────────────────────
  function render(outlet) {
    if (!outlet) return;

    // Only CL, AG, TC see services
    if (!['CL', 'AG', 'TC'].includes(Session.role)) {
      outlet.innerHTML = `
        <div class="screen">
          <div class="page-header"><h1 class="page-title">Local Services</h1></div>
          <div class="card" style="max-width:560px;margin:0 auto">
            <div class="card-bd" style="text-align:center;padding:var(--space-12)">
              <div style="font-size:2.5rem;margin-bottom:var(--space-3)">🔒</div>
              <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-navy);margin-bottom:var(--space-2)">Access Restricted</div>
              <div style="font-size:var(--text-sm);color:var(--neutral-500)">Services directory is available to the client and their real estate team.</div>
            </div>
          </div>
        </div>`;
      return;
    }

    const zip = _getZip();
    const cats = _getCategories();
    const providers = _getFilteredProviders();
    const total = _getProviders().length;

    outlet.innerHTML = `
      <div class="screen">

        <div class="page-header">
          <div class="page-header-left">
            <h1 class="page-title">Local Services</h1>
            <p class="page-subtitle">
              Trusted service providers near your property
              <span style="display:inline-flex;align-items:center;gap:4px;background:var(--neutral-100);border-radius:var(--radius-full);padding:2px 10px;font-size:var(--text-xs);font-weight:600;color:var(--color-navy);margin-left:var(--space-2)">
                📍 ${zip}
              </span>
            </p>
          </div>
          <div class="page-actions">
            <span style="font-size:var(--text-sm);color:var(--neutral-500)">${total} provider${total !== 1 ? 's' : ''} in your area</span>
          </div>
        </div>

        <!-- Info banner -->
        <div class="alert-banner alert-banner-info" style="margin-bottom:var(--space-5);border-radius:var(--radius-lg)" role="status">
          <svg class="alert-banner-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="9" r="8"/><line x1="9" y1="8" x2="9" y2="13"/><circle cx="9" cy="5.5" r=".75" fill="currentColor" stroke="none"/></svg>
          <div class="alert-banner-body">
            <div class="alert-banner-title">Pre-vetted service providers</div>
            <div class="alert-banner-desc">All providers are reviewed by the Burkes Group team. Ratings reflect verified customer feedback.</div>
          </div>
        </div>

        <!-- Category chips -->
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-5)" role="group" aria-label="Filter by category">
          ${cats
            .map((cat) => {
              const meta = CATEGORY_META[cat] || { label: cat, icon: '🔧' };
              const count = cat === 'ALL' ? _getProviders().length : _getProviders().filter((p) => p.category === cat).length;
              return `
              <button class="btn btn-sm ${_activeCategory === cat ? 'btn-primary' : 'btn-secondary'}"
                data-category="${cat}" type="button" aria-pressed="${_activeCategory === cat}">
                ${meta.icon} ${meta.label}
                <span style="font-size:10px;opacity:.7;margin-left:4px">(${count})</span>
              </button>`;
            })
            .join('')}
        </div>

        <!-- Filter bar -->
        <div class="filter-bar" style="margin-bottom:var(--space-6)">
          <div class="filter-search">
            <div class="filter-search-icon">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13"/></svg>
            </div>
            <input type="search" id="svc-search" placeholder="Search providers…" value="${_searchQuery}" autocomplete="off"/>
          </div>
          <label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--neutral-600);cursor:pointer;white-space:nowrap">
            <input type="checkbox" id="rec-filter" ${_showRecommended ? 'checked' : ''}/>
            ⭐ Recommended only
          </label>
          <div style="margin-left:auto;font-size:var(--text-xs);color:var(--neutral-500)">
            ${providers.length} of ${total} showing
          </div>
        </div>

        <!-- Provider grid -->
        ${
          providers.length === 0
            ? `<div class="card">
               <div class="card-bd empty-state" style="padding:var(--space-16)">
                 <div style="font-size:3rem;margin-bottom:var(--space-3)">🔍</div>
                 <div class="empty-state-title">No providers found</div>
                 <div class="empty-state-desc">Try adjusting your filters or search query. We're growing our network in your area.</div>
                 <button class="btn btn-secondary" style="margin-top:var(--space-4)" id="btn-clear-filters" type="button">Clear Filters</button>
               </div>
             </div>`
            : `<div class="services-grid" id="services-grid">
               ${providers.map(_renderProviderCard).join('')}
             </div>`
        }

        <!-- CTA footer -->
        <div class="card" style="margin-top:var(--space-8)">
          <div class="card-bd" style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);flex-wrap:wrap">
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--text-base);font-weight:700;color:var(--color-navy)">Can't find what you need?</div>
              <div style="font-size:var(--text-sm);color:var(--neutral-500);margin-top:2px">Contact your transaction coordinator — they can help you find additional providers.</div>
            </div>
            <button class="btn btn-secondary" onclick="Router.navigate('messages')" type="button">💬 Message Your Coordinator</button>
          </div>
        </div>

      </div>`;

    _bindEvents(outlet);
  }

  function _renderProviderCard(provider) {
    const id = provider.id || provider.provider_id;
    const name = provider.name;
    const category = provider.category;
    const meta = CATEGORY_META[category] || { icon: '🔧', label: category };
    const rating = provider.rating || 0;
    const reviews = provider.reviews || provider.review_count || 0;
    const phone = provider.phone || provider.contact_phone || '';
    const contact = provider.contact || provider.contact_name || '';
    const recommended = provider.recommended || provider.is_recommended;

    const ratingColor = rating >= 4.7 ? 'var(--color-success-dark)' : rating >= 4.0 ? 'var(--color-warning-dark)' : 'var(--color-error-dark)';

    return `
      <div class="provider-card" data-provider-id="${id}">
        ${recommended ? '<div class="provider-recommended" aria-label="Recommended provider"></div>' : ''}

        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-2)">
          <div style="display:flex;align-items:center;gap:var(--space-3)">
            <div style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--neutral-100);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
              ${meta.icon}
            </div>
            <div>
              <div class="provider-name">${name}</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-500);margin-top:1px">${meta.label}</div>
            </div>
          </div>
          ${recommended ? `<span class="badge badge-amber" style="flex-shrink:0">⭐ Recommended</span>` : ''}
        </div>

        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2) 0;border-top:var(--border-light);border-bottom:var(--border-light)">
          <div class="provider-rating">
            <span style="color:${ratingColor};font-weight:700;font-size:var(--text-base)">${rating.toFixed(1)}</span>
            <span style="color:#f59e0b;font-size:14px;letter-spacing:-1px" aria-hidden="true">${_stars(rating)}</span>
            <span style="font-size:var(--text-xs);color:var(--neutral-400)">(${reviews})</span>
          </div>
        </div>

        ${
          contact
            ? `
          <div class="provider-contact">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="6" cy="4" r="2.5"/><path d="M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/></svg>
            Contact: ${contact}
          </div>`
            : ''
        }

        ${
          phone
            ? `
          <div class="provider-contact">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M10.7 8.5l-1.4-1.4a1 1 0 0 0-1.4 0l-.7.7a6.5 6.5 0 0 1-3-3l.7-.7a1 1 0 0 0 0-1.4L3.5 1.3a1 1 0 0 0-1.4 0L1.4 2a2 2 0 0 0-.4 2.2 10.5 10.5 0 0 0 6.8 6.8 2 2 0 0 0 2.2-.4l.7-.7a1 1 0 0 0 0-1.4z"/></svg>
            ${phone}
          </div>`
            : ''
        }

        <div style="display:flex;gap:var(--space-2);margin-top:var(--space-2)">
          ${
            phone
              ? `<a href="tel:${phone.replace(/\D/g, '')}" class="btn btn-sm btn-primary" style="flex:1;justify-content:center;text-decoration:none">
            📞 Call
          </a>`
              : ''
          }
          <button class="btn btn-sm btn-secondary" data-detail-id="${id}" type="button" style="flex:1;justify-content:center">
            View Details
          </button>
        </div>

      </div>`;
  }

  // ── Detail drawer ─────────────────────────────────────────
  function _openDetail(providerId) {
    const p = _getProviders().find((x) => (x.id || x.provider_id) === providerId);
    if (!p) return;

    const meta = CATEGORY_META[p.category] || { icon: '🔧', label: p.category };
    const rating = p.rating || 0;
    const reviews = p.reviews || p.review_count || 0;
    const services = p.services_offered || [];

    Drawer.open({
      title: p.name,
      body: `
        <div style="display:flex;flex-direction:column;gap:var(--space-5)">

          <div style="display:flex;align-items:center;gap:var(--space-4)">
            <div style="width:64px;height:64px;border-radius:var(--radius-lg);background:var(--neutral-100);display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0">
              ${meta.icon}
            </div>
            <div>
              <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-navy)">${p.name}</div>
              <div style="font-size:var(--text-sm);color:var(--neutral-500)">${meta.label}</div>
              ${p.recommended || p.is_recommended ? `<span class="badge badge-amber" style="margin-top:4px">⭐ Burkes Recommended</span>` : ''}
            </div>
          </div>

          <div class="card">
            <div class="card-bd">
              <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3)">
                <span style="font-size:var(--text-3xl);font-weight:800;color:var(--color-navy)">${rating.toFixed(1)}</span>
                <div>
                  <div style="color:#f59e0b;font-size:18px;letter-spacing:-1px">${_stars(rating)}</div>
                  <div style="font-size:var(--text-xs);color:var(--neutral-400)">${reviews} verified reviews</div>
                </div>
              </div>
              <div style="height:6px;background:var(--neutral-100);border-radius:var(--radius-full);overflow:hidden">
                <div style="height:100%;width:${(rating / 5) * 100}%;background:${rating >= 4.5 ? 'var(--color-success)' : 'var(--color-warning)'};border-radius:var(--radius-full)"></div>
              </div>
            </div>
          </div>

          ${p.description ? `<p style="font-size:var(--text-sm);color:var(--neutral-600);line-height:1.65">${p.description}</p>` : ''}

          <div class="card">
            <div class="card-hdr"><div class="card-title">Contact Information</div></div>
            <div class="card-bd" style="display:flex;flex-direction:column;gap:var(--space-3)">
              ${p.contact || p.contact_name ? `<div style="display:flex;align-items:center;gap:var(--space-2)"><span style="font-size:var(--text-sm);color:var(--neutral-500)">Contact:</span><span style="font-size:var(--text-sm);font-weight:500">${p.contact || p.contact_name}</span></div>` : ''}
              ${p.phone || p.contact_phone ? `<div style="display:flex;align-items:center;gap:var(--space-2)"><span style="font-size:var(--text-sm);color:var(--neutral-500)">Phone:</span><a href="tel:${(p.phone || p.contact_phone).replace(/\D/g, '')}" style="font-size:var(--text-sm);font-weight:500;color:var(--color-accent-blue)">${p.phone || p.contact_phone}</a></div>` : ''}
              <div style="display:flex;align-items:center;gap:var(--space-2)"><span style="font-size:var(--text-sm);color:var(--neutral-500)">Service Area:</span><span style="font-size:var(--text-sm);font-weight:500">${_getZip()} + 25-mile radius</span></div>
            </div>
          </div>

          ${
            services.length > 0
              ? `
            <div>
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-navy);margin-bottom:var(--space-3)">Services Offered</div>
              <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
                ${services.map((s) => `<span class="badge badge-gray">${s}</span>`).join('')}
              </div>
            </div>`
              : ''
          }

          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            ${
              p.phone || p.contact_phone
                ? `
              <a href="tel:${(p.phone || p.contact_phone).replace(/\D/g, '')}" class="btn btn-primary" style="width:100%;justify-content:center;text-decoration:none">
                📞 Call ${p.contact || p.contact_name || 'Provider'}
              </a>`
                : ''
            }
            <button class="btn btn-secondary" style="width:100%;justify-content:center" onclick="Toast.info('Request sent to your coordinator.');Drawer.close();" type="button">
              📩 Request via Coordinator
            </button>
          </div>

        </div>`,
    });
  }

  // ── Event binding ─────────────────────────────────────────
  function _bindEvents(outlet) {
    // Category chips
    outlet.querySelectorAll('[data-category]').forEach((btn) =>
      btn.addEventListener('click', () => {
        _activeCategory = btn.dataset.category;
        render(outlet);
      }),
    );

    // Recommended filter
    outlet.querySelector('#rec-filter')?.addEventListener('change', (e) => {
      _showRecommended = e.target.checked;
      render(outlet);
    });

    // Search
    outlet.querySelector('#svc-search')?.addEventListener('input', (e) => {
      _searchQuery = e.target.value;
      render(outlet);
    });

    // Detail buttons
    outlet.querySelectorAll('[data-detail-id]').forEach((btn) => btn.addEventListener('click', () => _openDetail(btn.dataset.detailId)));

    // Card click → detail
    outlet.querySelectorAll('.provider-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('a') && !e.target.closest('button')) {
          _openDetail(card.dataset.providerId);
        }
      });
    });

    // Clear filters
    outlet.querySelector('#btn-clear-filters')?.addEventListener('click', () => {
      _activeCategory = 'ALL';
      _showRecommended = false;
      _searchQuery = '';
      render(outlet);
    });
  }

  return { render };
})();

window.ServicesScreen = ServicesScreen;
