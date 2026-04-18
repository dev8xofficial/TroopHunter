/**
 * COMPONENTS/DRAWER.JS — Burkes Group Client Portal
 * Right-side slide-in drawer panel.
 * Used by: document preview, activity detail, team member info.
 * Supports header, scrollable body, optional footer CTAs.
 */

const Drawer = (() => {
  let _overlay = null;
  let _panel = null;
  let _onClose = null;

  function _ensureDOM() {
    _overlay = document.getElementById('drawer-overlay');
    if (!_overlay) return false;

    // Build interior if not already done
    if (!_overlay.querySelector('.drawer-backdrop')) {
      _overlay.innerHTML = `
        <div class="drawer-backdrop" id="drawer-backdrop"></div>
        <div class="drawer-panel" id="drawer-panel" role="dialog" aria-modal="true">
          <div class="drawer-header" id="drawer-header">
            <div class="drawer-title" id="drawer-title"></div>
            <button class="drawer-close" id="drawer-close-btn" aria-label="Close panel" type="button">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <line x1="1" y1="1" x2="13" y2="13"/>
                <line x1="13" y1="1" x2="1" y2="13"/>
              </svg>
            </button>
          </div>
          <div class="drawer-body" id="drawer-body"></div>
          <div class="drawer-footer" id="drawer-footer" style="display:none;"></div>
        </div>
      `;

      // Close on backdrop click
      _overlay.querySelector('#drawer-backdrop').addEventListener('click', close);

      // Close button
      _overlay.querySelector('#drawer-close-btn').addEventListener('click', close);

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && _overlay.classList.contains('open')) close();
      });
    }

    _panel = _overlay.querySelector('#drawer-panel');
    return true;
  }

  /**
   * Open the drawer.
   * @param {Object} options
   * @param {string}      options.title       — Header title text
   * @param {string|Node} options.body        — HTML string or DOM node for body content
   * @param {Array}       [options.footer]    — Array of { label, variant, onClick } button defs
   * @param {Function}    [options.onClose]   — Called when drawer closes
   */
  function open({ title, body, footer = [], onClose } = {}) {
    if (!_ensureDOM()) {
      console.warn('Drawer: #drawer-overlay not found in DOM');
      return;
    }

    _onClose = onClose || null;

    // Set title
    document.getElementById('drawer-title').textContent = title || '';
    _panel.setAttribute('aria-label', title || 'Panel');

    // Set body
    const bodyEl = document.getElementById('drawer-body');
    bodyEl.innerHTML = '';
    if (typeof body === 'string') {
      bodyEl.innerHTML = body;
    } else if (body instanceof Node) {
      bodyEl.appendChild(body);
    }

    // Set footer
    const footerEl = document.getElementById('drawer-footer');
    if (footer.length > 0) {
      footerEl.style.display = 'flex';
      footerEl.innerHTML = footer
        .map(
          (btn) => `
        <button
          class="btn btn--${btn.variant || 'secondary'}"
          data-drawer-action="${btn.action || btn.label}"
          type="button"
        >
          ${btn.label}
        </button>
      `,
        )
        .join('');

      footerEl.querySelectorAll('button').forEach((btn) => {
        const def = footer.find((f) => (f.action || f.label) === btn.dataset.drawerAction);
        if (def && typeof def.onClick === 'function') {
          btn.addEventListener('click', def.onClick);
        }
      });
    } else {
      footerEl.style.display = 'none';
      footerEl.innerHTML = '';
    }

    // Open
    _overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus management
    setTimeout(() => {
      const firstFocusable = _panel.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    }, 320);
  }

  function close() {
    if (!_overlay) return;
    _overlay.classList.remove('open');
    document.body.style.overflow = '';

    if (typeof _onClose === 'function') {
      _onClose();
      _onClose = null;
    }
  }

  /** Update body content without reopening */
  function updateBody(htmlOrNode) {
    const bodyEl = document.getElementById('drawer-body');
    if (!bodyEl) return;
    if (typeof htmlOrNode === 'string') {
      bodyEl.innerHTML = htmlOrNode;
    } else if (htmlOrNode instanceof Node) {
      bodyEl.innerHTML = '';
      bodyEl.appendChild(htmlOrNode);
    }
  }

  return { open, close, updateBody };
})();

window.Drawer = Drawer;
