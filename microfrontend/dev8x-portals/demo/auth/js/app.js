import Router from '../../shared/js/router.js';
import {
  MockData,
  Session,
  loadPortalRegistry,
  loadRoleRegistry
} from '../../shared/js/mock-data.js';
import {
  canAccessPortal,
  portalEntryUrl
} from '../../shared/js/auth-guard.js';

const PORTAL_GRADIENTS = {
  admin: { start: '#3b1d8a', mid: '#5a3abd', end: '#7048e8' },
  candidate: { start: '#ff5a5f', mid: '#fc642d', end: '#ff8c42' },
  client: { start: '#164b5b', mid: '#157b72', end: '#00a699' },
  crm: { start: '#991b1b', mid: '#dc2626', end: '#f97316' },
  default: { start: '#182033', mid: '#2d3a58', end: '#4d5678' }
};

const DEFAULT_RAIL = {
  tag: 'Multi-portal access',
  title: 'One entry point for every Dev8X workspace.',
  description:
    'Select the right portal first, then the flow adapts to login, MFA, password reset, or SSO requirements from the shared contracts.',
  portalLabel: 'Choose a portal',
  portalCopy:
    'The selected portal controls the allowed roles, the authentication method, and the destination route after sign-in.',
  steps: [
    'Choose the workspace that matches your role.',
    'Authenticate with portal-aware rules from the shared contracts.',
    'Land in the correct surface with the session scoped to that portal.'
  ]
};

const ROUTE_COPY = {
  'portal-select': {
    tag: 'Portal selection',
    title: 'Pick the workspace that matches your role.',
    description:
      'The portal selector is the first decision point in module 002. It decides which login experience and destination rules apply next.'
  },
  login: {
    tag: 'Credential check'
  },
  signup: {
    tag: 'Candidate registration',
    title: 'Create a candidate account with the portal already scoped.',
    description:
      'Candidate registration stays limited to the candidate portal and follows the account activation rules described in module 001.'
  },
  'forgot-password': {
    tag: 'Password recovery',
    title: 'Recover access without exposing whether the account exists.',
    description:
      'The response stays intentionally generic while the selected portal keeps the recovery flow aligned to the right experience.'
  },
  mfa: {
    tag: 'Privileged verification',
    title: 'Finish the privileged login with MFA before the admin portal opens.',
    description:
      'Admin and super-admin sessions remain pending until the second factor succeeds, matching module 003.'
  },
  sso: {
    tag: 'Google SSO',
    title: 'Complete the provider handshake for the selected portal.',
    description:
      'Google SSO is available only for candidate and client access paths in module 005.'
  }
};

const state = {
  manifest: null,
  router: null,
  users: [],
  portals: {},
  roles: {},
  selectedProvider: 'google'
};

const railNodes = {
  tag: document.getElementById('auth-rail-tag'),
  title: document.getElementById('auth-rail-title'),
  description: document.getElementById('auth-rail-description'),
  portal: document.getElementById('auth-rail-portal'),
  portalCopy: document.getElementById('auth-rail-portal-copy'),
  steps: document.getElementById('auth-rail-steps')
};

function getPortalKey() {
  return Session.selectedPortal() || 'candidate';
}

function getPortalConfig(portalKey = getPortalKey()) {
  return state.portals?.[portalKey] || null;
}

function setPortalKey(portalKey) {
  Session.selectPortal(portalKey);
  applyRailCopy(state.router?.current || 'portal-select');
}

function applyPortalTheme(portalKey) {
  const portal = getPortalConfig(portalKey);
  const palette = PORTAL_GRADIENTS[portalKey] || PORTAL_GRADIENTS.default;

  document.documentElement.style.setProperty('--color-primary', portal?.accentColor || '#ff5a5f');
  document.documentElement.style.setProperty('--accent', portal?.accentColor || '#ff5a5f');
  document.documentElement.style.setProperty('--grad-start', palette.start);
  document.documentElement.style.setProperty('--grad-mid', palette.mid);
  document.documentElement.style.setProperty('--grad-end', palette.end);
}

function applyRailCopy(routeId) {
  const portal = routeId === 'portal-select' ? null : getPortalConfig();
  const routeCopy = ROUTE_COPY[routeId] || {};

  railNodes.tag.textContent = routeCopy.tag || DEFAULT_RAIL.tag;
  railNodes.title.textContent =
    routeCopy.title || portal?.heroTitle || DEFAULT_RAIL.title;
  railNodes.description.textContent =
    routeCopy.description || portal?.heroDescription || DEFAULT_RAIL.description;
  railNodes.portal.textContent = portal?.label || DEFAULT_RAIL.portalLabel;
  railNodes.portalCopy.textContent = portal?.description || DEFAULT_RAIL.portalCopy;

  const steps = routeId === 'portal-select' ? DEFAULT_RAIL.steps : portal?.steps || DEFAULT_RAIL.steps;
  railNodes.steps.innerHTML = steps
    .map(
      (step, index) => `
        <div class="auth-rail__step">
          <div class="auth-rail__step-index">${index + 1}</div>
          <p class="auth-rail__step-copy">${step}</p>
        </div>
      `,
    )
    .join('');

  applyPortalTheme(getPortalKey());
}

function renderMessage(node, kind, text) {
  if (!node) return;
  if (!text) {
    node.className = 'alert alert--info hidden';
    node.textContent = '';
    return;
  }

  node.className = `alert alert--${kind}`;
  node.textContent = text;
}

function routeToPortal(user) {
  const portal = getPortalConfig(user.portal);
  window.location.href = portalEntryUrl(user.portal, portal?.defaultRoute || 'dashboard');
}

function getUsersForPortal(portalKey) {
  return state.users.filter((user) => user.status === 'active' && user.portals.includes(portalKey));
}

function fillDemoAccounts(container, portalKey, emailInput, passwordInput) {
  if (!container) return;
  const users = getUsersForPortal(portalKey);
  container.innerHTML = users
    .map(
      (user) => `
        <button class="auth-demo-chip" type="button" data-demo-user="${user.id}">
          <span>${user.name}</span>
          <span class="tag">${user.role}</span>
        </button>
      `,
    )
    .join('');

  container.querySelectorAll('[data-demo-user]').forEach((button) => {
    button.addEventListener('click', () => {
      const user = users.find((entry) => entry.id === button.dataset.demoUser);
      if (!user) return;
      emailInput.value = user.email;
      passwordInput.value = user.password;
    });
  });
}

async function handleLogin(event, outlet) {
  event.preventDefault();
  const portalKey = getPortalKey();
  const portal = getPortalConfig(portalKey);
  const email = outlet.querySelector('[name="email"]').value.trim().toLowerCase();
  const password = outlet.querySelector('[name="password"]').value;
  const messageNode = outlet.querySelector('[data-auth-message]');

  const matchedUser = state.users.find(
    (user) => user.email.toLowerCase() === email && user.password === password && user.status === 'active',
  );

  if (!matchedUser) {
    renderMessage(messageNode, 'danger', 'Invalid email or password for the selected portal.');
    return;
  }

  const permitted = await canAccessPortal(matchedUser.role, portalKey);
  if (!permitted || !matchedUser.portals.includes(portalKey)) {
    renderMessage(messageNode, 'danger', 'This account cannot access the selected portal.');
    return;
  }

  const sessionPayload = {
    ...matchedUser,
    portal: portalKey,
    mfaVerified: !(matchedUser.mfaEnabled && portalKey === 'admin')
  };

  if (matchedUser.mfaEnabled && portalKey === 'admin') {
    Session.setPending(sessionPayload);
    state.router.navigate('mfa');
    return;
  }

  Session.set(sessionPayload);
  routeToPortal(sessionPayload);
}

function bindPortalSelect(outlet) {
  const session = Session.current();
  const banner = outlet.querySelector('[data-session-banner]');
  const summary = outlet.querySelector('[data-session-summary]');

  outlet.querySelectorAll('[data-select-portal]').forEach((button) => {
    button.addEventListener('click', () => {
      setPortalKey(button.dataset.selectPortal);
      state.router.navigate('login');
    });
  });

  if (session && banner && summary) {
    banner.classList.remove('hidden');
    summary.textContent = `${session.name} is already signed in to the ${getPortalConfig(session.portal)?.label || session.portal}.`;
    banner.querySelector('[data-continue-session]')?.addEventListener('click', () => routeToPortal(session));
    banner.querySelector('[data-sign-out-session]')?.addEventListener('click', () => {
      Session.clear();
      state.router.navigate('portal-select');
      window.location.reload();
    });
  }
}

function bindLogin(outlet) {
  const portal = getPortalConfig();
  const messageNode = outlet.querySelector('[data-auth-message]');
  const emailInput = outlet.querySelector('[name="email"]');
  const passwordInput = outlet.querySelector('[name="password"]');
  const demoAccounts = outlet.querySelector('[data-demo-accounts]');
  const ssoButton = outlet.querySelector('[data-sso-trigger]');
  const signupHelper = outlet.querySelector('[data-signup-helper]');

  outlet.querySelector('[data-login-badge]').textContent = `${portal.label} access`;
  outlet.querySelector('[data-login-title]').textContent = `Sign in to ${portal.label}`;
  outlet.querySelector('[data-login-copy]').textContent = portal.description;
  outlet.querySelector('[data-login-portal-name]').textContent = portal.label;
  outlet.querySelector('[data-login-route-note]').textContent = `Successful sign-in routes to #${portal.defaultRoute}.`;

  fillDemoAccounts(demoAccounts, portal.key, emailInput, passwordInput);

  if (portal.ssoProviders.includes('google')) {
    ssoButton.classList.remove('hidden');
    ssoButton.addEventListener('click', () => {
      state.selectedProvider = 'google';
      state.router.navigate('sso');
    });
  }

  if (portal.key === 'candidate') {
    signupHelper.classList.remove('hidden');
    signupHelper.querySelector('[data-go-signup]').addEventListener('click', () => {
      state.router.navigate('signup');
    });
  }

  outlet.querySelector('[data-login-form]').addEventListener('submit', (event) => {
    renderMessage(messageNode, 'info', '');
    handleLogin(event, outlet);
  });

  outlet.querySelector('[data-go-forgot]').addEventListener('click', () => {
    state.router.navigate('forgot-password');
  });

  outlet.querySelector('[data-change-portal]').addEventListener('click', () => {
    state.router.navigate('portal-select');
  });
}

function bindSignup(outlet) {
  setPortalKey('candidate');
  const messageNode = outlet.querySelector('[data-auth-message]');

  outlet.querySelector('[data-signup-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
    const missing = fields.some((field) => !String(form.get(field) || '').trim());
    const passwordsMatch = form.get('password') === form.get('confirmPassword');
    const acceptedTerms = form.get('terms') === 'on';

    if (missing || !passwordsMatch || !acceptedTerms) {
      renderMessage(messageNode, 'danger', 'Complete all fields, confirm the password, and accept the terms to continue.');
      return;
    }

    renderMessage(
      messageNode,
      'success',
      'Candidate registration is mocked for this demo. The next real state would be email verification before activation.',
    );
  });

  outlet.querySelector('[data-back-login]').addEventListener('click', () => {
    state.router.navigate('login');
  });
}

function bindForgotPassword(outlet) {
  const portal = getPortalConfig();
  const messageNode = outlet.querySelector('[data-auth-message]');
  outlet.querySelector('[data-forgot-portal-name]').textContent = portal.label;

  outlet.querySelector('[data-forgot-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    renderMessage(
      messageNode,
      'success',
      'If an account exists for that email, a reset link would be sent. The response stays intentionally identical for known and unknown emails.',
    );
  });

  outlet.querySelector('[data-back-login]').addEventListener('click', () => {
    state.router.navigate('login');
  });
}

function bindMfa(outlet) {
  const pending = Session.pending();
  if (!pending) {
    state.router.navigate('login');
    return;
  }

  outlet.querySelector('[data-mfa-user]').textContent = pending.name;
  outlet.querySelector('[data-mfa-email]').textContent = pending.email;
  outlet.querySelector('[data-mfa-role]').textContent = pending.role;

  const messageNode = outlet.querySelector('[data-auth-message]');
  const inputs = Array.from(outlet.querySelectorAll('[data-mfa-digit]'));

  inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 1);
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
  });

  outlet.querySelector('[data-mfa-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const code = inputs.map((input) => input.value).join('');
    const recoveryCode = outlet.querySelector('[name="recoveryCode"]').value.trim();

    if (code === '246810' || recoveryCode === 'DEV8X-RECOVER') {
      const session = Session.commitPending({ mfaVerified: true });
      routeToPortal(session);
      return;
    }

    renderMessage(messageNode, 'danger', 'Invalid MFA code. Use 246810 or DEV8X-RECOVER for the demo.');
  });

  outlet.querySelector('[data-back-login]').addEventListener('click', () => {
    Session.clearPending();
    state.router.navigate('login');
  });
}

function bindSso(outlet) {
  const portal = getPortalConfig();
  const provider = state.selectedProvider || 'google';
  const messageNode = outlet.querySelector('[data-auth-message]');

  if (!portal.ssoProviders.includes(provider)) {
    renderMessage(messageNode, 'danger', `${portal.label} does not allow ${provider} sign-in.`);
    return;
  }

  outlet.querySelector('[data-sso-portal]').textContent = portal.label;
  outlet.querySelector('[data-sso-provider]').textContent = provider;

  outlet.querySelector('[data-complete-sso]').addEventListener('click', () => {
    const fallbackUser = getUsersForPortal(portal.key).find((user) => user.ssoProvider === provider)
      || getUsersForPortal(portal.key)[0];

    if (!fallbackUser) {
      renderMessage(messageNode, 'danger', 'No demo SSO account is available for this portal.');
      return;
    }

    const session = Session.set({
      ...fallbackUser,
      portal: portal.key,
      mfaVerified: true
    });
    routeToPortal(session);
  });

  outlet.querySelector('[data-back-login]').addEventListener('click', () => {
    state.router.navigate('login');
  });
}

function bindRoute(outlet, routeId) {
  applyRailCopy(routeId);

  switch (routeId) {
    case 'portal-select':
      bindPortalSelect(outlet);
      break;
    case 'login':
      bindLogin(outlet);
      break;
    case 'signup':
      bindSignup(outlet);
      break;
    case 'forgot-password':
      bindForgotPassword(outlet);
      break;
    case 'mfa':
      bindMfa(outlet);
      break;
    case 'sso':
      bindSso(outlet);
      break;
    default:
      break;
  }
}

async function init() {
  const [manifestResponse, usersRegistry, portalRegistry, roleRegistry] = await Promise.all([
    fetch('./manifest.json'),
    MockData.load('./data/users.json'),
    loadPortalRegistry(),
    loadRoleRegistry()
  ]);

  state.manifest = await manifestResponse.json();
  state.users = usersRegistry.users;
  state.portals = portalRegistry.portals;
  state.roles = roleRegistry.roles;

  const routes = state.manifest.routes.map((route) => ({
    path: route.path,
    label: route.label,
    src: route.src,
    default: Boolean(route.default),
    init: async (outlet) => bindRoute(outlet, route.id)
  }));

  state.router = new Router({
    routes,
    outlet: '#auth-screen-outlet'
  });

  document.getElementById('auth-reset-flow')?.addEventListener('click', () => {
    Session.clear();
    Session.selectPortal('candidate');
    window.location.hash = '#portal-select';
    window.location.reload();
  });

  applyRailCopy('portal-select');
  state.router.start();

  const currentHash = window.location.hash.replace(/^#\/?/, '');
  const validHash = state.manifest.routes.some((route) => route.path === currentHash);
  if (!validHash) {
    state.router.navigate(state.manifest.defaultRoute);
  }
}

init().catch((error) => {
  const outlet = document.getElementById('auth-screen-outlet');
  if (outlet) {
    outlet.innerHTML = `
      <div class="auth-card">
        <div class="alert alert--danger">Failed to load the authentication demo: ${error.message}</div>
      </div>
    `;
  }
});
