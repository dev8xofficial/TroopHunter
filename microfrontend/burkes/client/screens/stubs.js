/**
 * SCREENS/STUBS.JS — Placeholder screens
 */

function _stubScreen(outlet, { screen, title, subtitle, icon, sprint }) {
  outlet.innerHTML = `
    <div class="screen">
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">${title}</h1>
          <p class="page-subtitle">${subtitle}</p>
        </div>
      </div>
      <div class="card" style="max-width:640px;margin:0 auto">
        <div class="card-bd" style="text-align:center;padding:var(--space-16) var(--space-8)">
          <div style="font-size:3rem;margin-bottom:var(--space-4)">${icon}</div>
          <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--color-navy);margin-bottom:var(--space-2);letter-spacing:-0.02em">
            ${title}
          </div>
          <div style="font-size:var(--text-sm);color:var(--neutral-500);margin-bottom:var(--space-6);max-width:360px;margin-left:auto;margin-right:auto;line-height:1.6">
            This screen is implemented in <strong>${sprint}</strong>.
            The full ${title.toLowerCase()} experience will be available then.
          </div>
          <div style="display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap">
            <button class="btn btn-primary" onclick="Router.navigate('dashboard')" type="button">← Back to Dashboard</button>
            <button class="btn btn-secondary" onclick="Toast.info('${title} screen is coming in ${sprint}!')" type="button">Learn more</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

const DocumentsScreen = (() => {
  function render(outlet) {
    _stubScreen(outlet, {
      screen: 'documents',
      title: 'Documents',
      subtitle: 'Upload, review, and sign transaction documents',
      icon: '📁',
      sprint: 'Sprint 3',
    });
  }
  return { render };
})();

const MessagesScreen = (() => {
  function render(outlet) {
    _stubScreen(outlet, {
      screen: 'messages',
      title: 'Messages',
      subtitle: 'Secure messaging with your transaction team',
      icon: '💬',
      sprint: 'Sprint 3',
    });
  }
  return { render };
})();

const InsuranceScreen = (() => {
  function render(outlet) {
    _stubScreen(outlet, {
      screen: 'insurance',
      title: 'Insurance',
      subtitle: 'Manage your home, auto, and warranty policies',
      icon: '🛡️',
      sprint: 'Sprint 4',
    });
  }
  return { render };
})();

const MortgageScreen = (() => {
  function render(outlet) {
    _stubScreen(outlet, {
      screen: 'mortgage',
      title: 'Mortgage',
      subtitle: 'Complete your mortgage application',
      icon: '🏦',
      sprint: 'Sprint 4',
    });
  }
  return { render };
})();

const ServicesScreen = (() => {
  function render(outlet) {
    _stubScreen(outlet, {
      screen: 'services',
      title: 'Local Services',
      subtitle: 'Find trusted service providers in your area',
      icon: '🔧',
      sprint: 'Sprint 5',
    });
  }
  return { render };
})();

window.DocumentsScreen = DocumentsScreen;
window.MessagesScreen = MessagesScreen;
window.InsuranceScreen = InsuranceScreen;
window.MortgageScreen = MortgageScreen;
window.ServicesScreen = ServicesScreen;
