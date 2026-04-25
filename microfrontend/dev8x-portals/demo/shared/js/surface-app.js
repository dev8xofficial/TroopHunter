import Router from './router.js';
import Shell from './shell.js';
import { MockData, Session, fmtDate } from './mock-data.js';
import { requirePortalAccess, resolveStartRoute } from './auth-guard.js';

function applySessionBindings(root, manifest, user) {
  const assignments = [
    ['data-session-name', user.name],
    ['data-session-title', user.title || user.role],
    ['data-session-email', user.email],
    ['data-session-role', user.role],
    ['data-portal-title', manifest.title],
    ['data-last-login', user.lastLogin ? fmtDate(user.lastLogin, { month: 'short', day: 'numeric' }) : 'Today']
  ];

  assignments.forEach(([attr, value]) => {
    root.querySelectorAll(`[${attr}]`).forEach((node) => {
      node.textContent = value;
    });
  });
}

function bindDemoActions(root) {
  root.querySelectorAll('[data-demo-action]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      const label = button.dataset.demoAction || 'This interaction';
      alert(`${label} is mocked for the organized demo surface.`);
    });
  });
}

export async function bootstrapSurface({
  manifestPath = './manifest.json',
  shellSelector = '#d8x-shell',
  onRouteInit = null
} = {}) {
  const manifestResponse = await fetch(manifestPath);
  if (!manifestResponse.ok) {
    throw new Error(`Unable to load manifest: ${manifestPath}`);
  }

  const manifest = await manifestResponse.json();
  const access = await requirePortalAccess({
    portalKey: manifest.portalKey,
    redirectTo: '../auth/main.html#login'
  });

  if (!access.allowed) return null;

  const datasets = await MockData.loadAll(manifest.dataSources || []);
  const user = access.user;
  let router = null;
  const routes = (manifest.routes || []).map((route) => ({
    path: route.path,
    label: route.label,
    src: route.src,
    default: Boolean(route.default),
    init: async (outlet) => {
      applySessionBindings(outlet, manifest, user);
      bindDemoActions(outlet);
      if (onRouteInit) {
        await onRouteInit({
          outlet,
          route,
          manifest,
          user,
          datasets,
          router
        });
      }
    }
  }));

  router = new Router({
    routes,
    outlet: '#d8x-screen-outlet',
    onNavigate: ({ path }) => Session.rememberRoute(manifest.portalKey, path)
  });

  const shell = new Shell({
    manifest,
    user,
    router,
    accentColor: manifest.accentColor
  });

  shell.mount(shellSelector);
  window.__D8X_SURFACE__ = { manifest, user, datasets, router };

  router.start();

  const currentHash = window.location.hash.replace(/^#\/?/, '');
  const currentIsValid = manifest.routes?.some((route) => route.path === currentHash);
  if (!currentIsValid) {
    router.navigate(resolveStartRoute(manifest));
  }

  return { manifest, user, datasets, router };
}

export default bootstrapSurface;
