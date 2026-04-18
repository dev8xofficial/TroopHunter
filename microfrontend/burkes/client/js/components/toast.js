/**
 * COMPONENTS/TOAST.JS — Burkes Group Client Portal
 * Lightweight toast notification system.
 * Renders dismissible feedback messages in bottom-right corner.
 * Used by all screens and components for user feedback.
 */

const Toast = (() => {

  let _container = null;

  function _ensureContainer() {
    if (!_container) {
      _container = document.getElementById('toast-container');
      if (!_container) {
        _container = document.createElement('div');
        _container.id = 'toast-container';
        document.body.appendChild(_container);
      }
    }
    return _container;
  }

  /**
   * Show a toast notification.
   * @param {string} message  — Text to display
   * @param {'success'|'error'|'warning'|'info'} type
   * @param {number} duration — Auto-dismiss ms (default 3500; 0 = no auto-dismiss)
   */
  function show(message, type = 'info', duration = 3500) {
    const container = _ensureContainer();

    const ICONS = {
      success: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="2,8 6,12 14,4"/></svg>`,
      error:   `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"/><line x1="8" y1="5" x2="8" y2="9"/><circle cx="8" cy="11.5" r="0.5" fill="currentColor"/></svg>`,
      warning: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 1L15 14H1L8 1z"/><line x1="8" y1="7" x2="8" y2="10"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg>`,
      info:    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"/><line x1="8" y1="7" x2="8" y2="12"/><circle cx="8" cy="5" r="0.5" fill="currentColor"/></svg>`,
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      ${ICONS[type] || ICONS.info}
      <span style="flex:1">${message}</span>
      <button
        style="background:none;border:none;color:inherit;cursor:pointer;padding:0;margin-left:8px;opacity:0.6;display:flex;align-items:center;"
        aria-label="Dismiss notification"
        type="button"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <line x1="1" y1="1" x2="11" y2="11"/>
          <line x1="11" y1="1" x2="1" y2="11"/>
        </svg>
      </button>
    `;

    // Dismiss on button click
    const dismissBtn = toast.querySelector('button');
    dismissBtn.addEventListener('click', () => _dismiss(toast));

    container.appendChild(toast);

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => _dismiss(toast), duration);
    }

    return toast;
  }

  function _dismiss(toast) {
    if (!toast.parentNode) return;
    toast.style.transition = 'opacity 200ms ease, transform 200ms ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(8px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 220);
  }

  // Convenience methods
  function success(msg, duration) { return show(msg, 'success', duration); }
  function error(msg, duration)   { return show(msg, 'error',   duration); }
  function warning(msg, duration) { return show(msg, 'warning', duration); }
  function info(msg, duration)    { return show(msg, 'info',    duration); }

  return { show, success, error, warning, info };

})();

window.Toast = Toast;