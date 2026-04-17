/* drawer.js — Right-slide drawer component */

const Drawer = (() => {
  let overlay;

  function init() {
    overlay = document.getElementById('drawer-overlay');
    if (!overlay) return;

    const backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.addEventListener('click', close);

    const panel = document.createElement('div');
    panel.className = 'drawer-panel';
    panel.id = 'drawer-panel';

    overlay.appendChild(backdrop);
    overlay.appendChild(panel);
  }

  function open({ title, body, footer = '' }) {
    if (!overlay) init();
    const panel = document.getElementById('drawer-panel');
    if (!panel) return;

    panel.innerHTML = `
      <div class="drawer-header">
        <div class="drawer-title">${title}</div>
        <button class="drawer-close" onclick="Drawer.close()" aria-label="Close drawer">
          ${Utils.ICONS.x}
        </button>
      </div>
      <div class="drawer-body">${body}</div>
      ${footer ? `<div class="drawer-footer">${footer}</div>` : ''}
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { open, close, init };
})();

window.Drawer = Drawer;


/* modal.js — Modal dialog component */
const Modal = (() => {
  let overlay;

  function init() {
    overlay = document.getElementById('modal-overlay');
    if (!overlay) return;
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });
  }

  function open({ title, body, footer = '' }) {
    if (!overlay) init();
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <div class="modal-title" id="modal-title">${title}</div>
          <button class="drawer-close" onclick="Modal.close()" aria-label="Close">
            ${Utils.ICONS.x}
          </button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>`;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { open, close, init };
})();

window.Modal = Modal;