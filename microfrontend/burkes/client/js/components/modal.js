/**
 * COMPONENTS/MODAL.JS — Burkes Group Client Portal
 * Confirmation and form dialog overlay.
 * Used for: confirm actions, upload prompts, sign document.
 */

const Modal = (() => {
  let _overlay = null;

  function _ensureDOM() {
    _overlay = document.getElementById('modal-overlay');
    if (!_overlay) return false;

    if (!_overlay.querySelector('.modal-panel')) {
      _overlay.innerHTML = `
        <div class="modal-panel" role="dialog" aria-modal="true" id="modal-panel">
          <div class="modal-header" id="modal-header">
            <div class="modal-title" id="modal-title"></div>
            <button class="drawer-close" id="modal-close-btn" aria-label="Close dialog" type="button">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <line x1="1" y1="1" x2="13" y2="13"/>
                <line x1="13" y1="1" x2="1" y2="13"/>
              </svg>
            </button>
          </div>
          <div class="modal-body" id="modal-body"></div>
          <div class="modal-footer" id="modal-footer"></div>
        </div>
      `;

      _overlay.querySelector('#modal-close-btn').addEventListener('click', close);

      _overlay.addEventListener('click', (e) => {
        if (e.target === _overlay) close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && _overlay.classList.contains('open')) close();
      });
    }

    return true;
  }

  /**
   * @param {Object} options
   * @param {string}          options.title    — Dialog title
   * @param {string|Node}     options.body     — Content
   * @param {Array}           options.actions  — [{ label, variant, onClick, closeOnClick? }]
   */
  function open({ title, body, actions = [] } = {}) {
    if (!_ensureDOM()) return;

    document.getElementById('modal-title').textContent = title || '';
    document.getElementById('modal-panel').setAttribute('aria-label', title || 'Dialog');

    const bodyEl = document.getElementById('modal-body');
    bodyEl.innerHTML = '';
    if (typeof body === 'string') {
      bodyEl.innerHTML = body;
    } else if (body instanceof Node) {
      bodyEl.appendChild(body);
    }

    const footerEl = document.getElementById('modal-footer');
    footerEl.innerHTML = actions
      .map(
        (a) => `
      <button class="btn btn--${a.variant || 'secondary'}" data-action="${a.label}" type="button">
        ${a.label}
      </button>
    `,
      )
      .join('');

    footerEl.querySelectorAll('button').forEach((btn) => {
      const def = actions.find((a) => a.label === btn.dataset.action);
      if (def) {
        btn.addEventListener('click', () => {
          if (typeof def.onClick === 'function') def.onClick();
          if (def.closeOnClick !== false) close();
        });
      }
    });

    _overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const first = document.getElementById('modal-panel').querySelector('button:not(#modal-close-btn), input, select, textarea');
      if (first) first.focus();
    }, 50);
  }

  /** Quick confirm dialog */
  function confirm({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, variant = 'primary' }) {
    open({
      title,
      body: `<p style="color:var(--color-neutral-600);font-size:var(--text-sm);line-height:1.6">${message}</p>`,
      actions: [
        { label: cancelLabel, variant: 'secondary' },
        {
          label: confirmLabel,
          variant,
          onClick: onConfirm,
          closeOnClick: true,
        },
      ],
    });
  }

  function close() {
    if (!_overlay) return;
    _overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { open, confirm, close };
})();

window.Modal = Modal;
