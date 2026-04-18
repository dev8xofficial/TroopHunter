/**
 * COMPONENTS/ALERT-BANNER.JS — Burkes Group Client Portal
 * Renders ACTION_REQUIRED and info banners above the screen outlet.
 * Reads from MockData.notifications filtered for current role.
 * ERROR severity banners cannot be dismissed.
 * INFO banners are dismissible.
 */

const AlertBanner = (() => {
  let _dismissed = new Set();

  // ── Icons ─────────────────────────────────────────────────

  const ICONS = {
    error: `<svg class="alert-banner-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="8"/>
      <line x1="9" y1="6" x2="9" y2="10"/>
      <circle cx="9" cy="12.5" r="0.75" fill="currentColor" stroke="none"/>
    </svg>`,
    warning: `<svg class="alert-banner-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9 1L17 16H1L9 1z"/>
      <line x1="9" y1="7" x2="9" y2="11"/>
      <circle cx="9" cy="13.5" r="0.75" fill="currentColor" stroke="none"/>
    </svg>`,
    info: `<svg class="alert-banner-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="8"/>
      <line x1="9" y1="8" x2="9" y2="13"/>
      <circle cx="9" cy="5.5" r="0.75" fill="currentColor" stroke="none"/>
    </svg>`,
    success: `<svg class="alert-banner-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="8"/>
      <polyline points="5,9 8,12 13,6"/>
    </svg>`,
  };

  const DISMISS_ICON = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <line x1="1" y1="1" x2="13" y2="13"/>
      <line x1="13" y1="1" x2="1" y2="13"/>
    </svg>
  `;

  // ── Render ────────────────────────────────────────────────

  function render() {
    const slot = document.getElementById('alert-banner-slot');
    if (!slot) return;

    const alerts = _getAlertsForRole();
    if (alerts.length === 0) {
      slot.innerHTML = '';
      return;
    }

    slot.innerHTML = alerts
      .map((alert) => {
        const severity = alert.severity === 'ERROR' ? 'error' : alert.severity === 'WARNING' ? 'warning' : 'info';

        const isDismissible = severity !== 'error';
        const ctaBtn =
          alert.cta_label && alert.cta_screen
            ? `<button class="btn btn--sm btn--secondary alert-cta-btn" data-screen="${alert.cta_screen}" type="button">
             ${alert.cta_label} →
           </button>`
            : '';

        const dismissBtn = isDismissible
          ? `<button class="alert-banner-dismiss" data-alert-id="${alert.id}" aria-label="Dismiss this notification" type="button">
             ${DISMISS_ICON}
           </button>`
          : '';

        return `
        <div
          class="alert-banner alert-banner--${severity}"
          role="${severity === 'error' ? 'alert' : 'status'}"
          aria-live="${severity === 'error' ? 'assertive' : 'polite'}"
          data-alert-id="${alert.id}"
        >
          ${ICONS[severity] || ICONS.info}
          <div class="alert-banner-content">
            <div class="alert-banner-title">${alert.title}</div>
            ${alert.body ? `<div class="alert-banner-body">${alert.body}</div>` : ''}
          </div>
          <div class="alert-banner-actions">
            ${ctaBtn}
            ${dismissBtn}
          </div>
        </div>
      `;
      })
      .join('');

    _bindEvents(slot);
  }

  function _bindEvents(slot) {
    // CTA button → navigate to screen
    slot.querySelectorAll('.alert-cta-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const screen = btn.dataset.screen;
        if (screen && window.Router) Router.navigate(screen);
      });
    });

    // Dismiss buttons
    slot.querySelectorAll('.alert-banner-dismiss').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.alertId;
        _dismissed.add(id);
        const banner = slot.querySelector(`[data-alert-id="${id}"]`);
        if (banner) {
          banner.style.transition = 'opacity 200ms ease, max-height 300ms ease';
          banner.style.opacity = '0';
          banner.style.overflow = 'hidden';
          banner.style.maxHeight = banner.offsetHeight + 'px';
          requestAnimationFrame(() => {
            banner.style.maxHeight = '0';
          });
          setTimeout(() => banner.remove(), 320);
        }
      });
    });
  }

  // ── Get alerts for current role ───────────────────────────

  function _getAlertsForRole() {
    let raw = [];

    if (window.MockData && window.MockData.notifications) {
      raw = window.MockData.notifications;
    } else {
      // Fallback demo alerts
      raw = [
        {
          id: 'alert-001',
          severity: 'ERROR',
          title: 'Action Required: Documents need your signature',
          body: '2 documents are awaiting your signature before closing can proceed.',
          cta_label: 'Review Documents',
          cta_screen: 'documents',
          visible_to: ['CL'],
        },
        {
          id: 'alert-002',
          severity: 'WARNING',
          title: 'Home Insurance policy incomplete',
          body: 'Please upload your home insurance document to continue.',
          cta_label: 'Go to Insurance',
          cta_screen: 'insurance',
          visible_to: ['CL', 'TC'],
        },
      ];
    }

    return raw.filter((a) => {
      if (_dismissed.has(a.id)) return false;
      const visibleTo = a.visible_to || a.visibleTo || [];
      return visibleTo.length === 0 || visibleTo.includes(Session.role);
    });
  }

  // Refresh alert banner when role changes
  window.addEventListener('session:roleChanged', render);
  window.addEventListener('router:screenChanged', render);

  return { render };
})();

window.AlertBanner = AlertBanner;
