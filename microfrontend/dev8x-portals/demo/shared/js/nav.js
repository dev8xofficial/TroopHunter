/**
 * Dev8X Spec-Kit · demo/shared/js/nav.js
 *
 * Navigation utilities: breadcrumb renderer, tab bar builder,
 * step/progress indicator, and portal switcher.
 *
 * All functions return HTML strings for injection via innerHTML.
 */

/* ── Breadcrumb ───────────────────────────────────────── */
/**
 * @param {Array<{label: string, path?: string}>} crumbs
 */
export function buildBreadcrumb(crumbs = []) {
  return crumbs
    .map((c, i) => {
      const isLast = i === crumbs.length - 1;
      const item = isLast ? `<span class="d8x-topbar__breadcrumb-item current" aria-current="page">${c.label}</span>` : `<a class="d8x-topbar__breadcrumb-item" href="#${c.path || ''}">${c.label}</a>`;
      return i === 0 ? item : `<span class="d8x-topbar__breadcrumb-sep" aria-hidden="true">›</span>${item}`;
    })
    .join('');
}

/* ── Tab bar ──────────────────────────────────────────── */
/**
 * @param {Array<{id, label, badge?}>} tabs
 * @param {string} activeId
 * @param {function(id): void} onChange
 */
export function buildTabBar(tabs = [], activeId, onChange) {
  const id = `d8x-tabs-${Math.random().toString(36).slice(2, 7)}`;

  // Inject styles once
  if (!document.getElementById('d8x-tab-styles')) {
    const style = document.createElement('style');
    style.id = 'd8x-tab-styles';
    style.textContent = `
      .d8x-tabs { display:flex; gap:0; border-bottom:1px solid var(--border-default); margin-bottom:var(--space-6); }
      .d8x-tab-btn {
        padding:var(--space-3) var(--space-5); font-size:var(--text-sm); font-weight:var(--font-medium);
        color:var(--text-muted); background:none; border:none; border-bottom:2px solid transparent;
        cursor:pointer; margin-bottom:-1px; display:flex; align-items:center; gap:var(--space-2);
        transition:color var(--transition-fast),border-color var(--transition-fast); white-space:nowrap;
      }
      .d8x-tab-btn:hover { color:var(--text-primary); }
      .d8x-tab-btn[aria-selected=true] { color:var(--color-primary); border-bottom-color:var(--color-primary); }
      .d8x-tab-panel[hidden] { display:none; }
    `;
    document.head.appendChild(style);
  }

  const html = `
    <div class="d8x-tabs" role="tablist" id="${id}">
      ${tabs
        .map(
          (t) => `
        <button class="d8x-tab-btn"
                role="tab"
                id="${id}-tab-${t.id}"
                aria-controls="${id}-panel-${t.id}"
                aria-selected="${t.id === activeId}"
                data-tab="${t.id}">
          ${t.label}
          ${t.badge != null ? `<span class="badge badge--default">${t.badge}</span>` : ''}
        </button>`,
        )
        .join('')}
    </div>`;

  // Wire up events after DOM insertion
  requestAnimationFrame(() => {
    const bar = document.getElementById(id);
    if (!bar) return;
    bar.querySelectorAll('.d8x-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.d8x-tab-btn').forEach((b) => b.setAttribute('aria-selected', 'false'));
        btn.setAttribute('aria-selected', 'true');
        if (onChange) onChange(btn.dataset.tab);
      });
    });
  });

  return html;
}

/* ── Step indicator ───────────────────────────────────── */
/**
 * @param {Array<{id, label}>} steps
 * @param {string} currentId
 */
export function buildStepIndicator(steps = [], currentId) {
  const currentIdx = steps.findIndex((s) => s.id === currentId);

  const style =
    !document.getElementById('d8x-step-styles') &&
    (() => {
      const el = document.createElement('style');
      el.id = 'd8x-step-styles';
      el.textContent = `
      .d8x-steps { display:flex; align-items:center; gap:0; margin-bottom:var(--space-8); }
      .d8x-step { display:flex; align-items:center; flex:1; }
      .d8x-step__dot {
        width:28px; height:28px; border-radius:50%; border:2px solid var(--border-strong);
        display:flex; align-items:center; justify-content:center; font-size:var(--text-xs);
        font-weight:var(--font-semibold); flex-shrink:0; background:var(--bg-base);
        color:var(--text-muted); transition:all var(--transition-normal);
      }
      .d8x-step.done .d8x-step__dot { background:var(--color-primary); border-color:var(--color-primary); color:white; }
      .d8x-step.active .d8x-step__dot { border-color:var(--color-primary); color:var(--color-primary); }
      .d8x-step__label { font-size:var(--text-xs); color:var(--text-muted); margin-left:var(--space-2); white-space:nowrap; }
      .d8x-step.active .d8x-step__label { color:var(--color-primary); font-weight:var(--font-medium); }
      .d8x-step.done  .d8x-step__label { color:var(--text-secondary); }
      .d8x-step__line { flex:1; height:2px; background:var(--border-default); margin:0 var(--space-2); }
      .d8x-step.done + .d8x-step .d8x-step__line,
      .d8x-step.done  .d8x-step__line { background:var(--color-primary); }
    `;
      document.head.appendChild(el);
    })();

  return `
    <div class="d8x-steps" role="list" aria-label="Progress">
      ${steps
        .map((step, i) => {
          const state = i < currentIdx ? 'done' : i === currentIdx ? 'active' : '';
          const checkmark = `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
          return `
          <div class="d8x-step ${state}" role="listitem" aria-label="Step ${i + 1}: ${step.label}${state === 'done' ? ' (complete)' : state === 'active' ? ' (current)' : ''}">
            ${i > 0 ? `<div class="d8x-step__line" aria-hidden="true"></div>` : ''}
            <div class="d8x-step__dot" aria-hidden="true">
              ${state === 'done' ? checkmark : i + 1}
            </div>
            <span class="d8x-step__label">${step.label}</span>
          </div>`;
        })
        .join('')}
    </div>`;
}

/* ── Portal switcher ──────────────────────────────────── */
/**
 * Renders role cards for the portal-select screen.
 * @param {Array<{role, label, description, icon, color, path}>} portals
 */
export function buildPortalCards(portals = []) {
  const style =
    !document.getElementById('d8x-portal-card-styles') &&
    (() => {
      const el = document.createElement('style');
      el.id = 'd8x-portal-card-styles';
      el.textContent = `
      .portal-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:var(--space-4); }
      .portal-card {
        background:var(--bg-base); border:2px solid var(--border-default); border-radius:var(--border-radius-xl);
        padding:var(--space-6); display:flex; flex-direction:column; gap:var(--space-3);
        cursor:pointer; text-align:left; transition:border-color var(--transition-fast),box-shadow var(--transition-fast),transform var(--transition-fast);
        text-decoration:none; color:inherit;
      }
      .portal-card:hover { border-color:var(--accent,var(--color-primary)); box-shadow:var(--shadow-md); transform:translateY(-2px); }
      .portal-card__icon { width:48px; height:48px; border-radius:var(--border-radius-lg); display:flex; align-items:center; justify-content:center; }
      .portal-card__title { font-size:var(--text-base); font-weight:var(--font-semibold); }
      .portal-card__desc { font-size:var(--text-sm); color:var(--text-secondary); line-height:var(--leading-relaxed); }
      .portal-card__arrow { margin-top:auto; color:var(--text-muted); font-size:var(--text-sm); }
    `;
      document.head.appendChild(el);
    })();

  return `
    <div class="portal-grid" role="list">
      ${portals
        .map(
          (p) => `
        <a class="portal-card" href="${p.path}" role="listitem"
           style="--accent:${p.color}"
           aria-label="Enter ${p.label} portal">
          <div class="portal-card__icon" style="background:${p.color}20; color:${p.color}">
            ${p.icon}
          </div>
          <div class="portal-card__title">${p.label}</div>
          <div class="portal-card__desc">${p.description}</div>
          <div class="portal-card__arrow">Open portal →</div>
        </a>`,
        )
        .join('')}
    </div>`;
}
