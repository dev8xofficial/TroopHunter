import { Session, getPortal } from './mock-data.js';

export async function canAccessPortal(roleId, portalKey) {
  if (!roleId || !portalKey) return false;
  const portal = await getPortal(portalKey);
  return Boolean(portal?.allowedRoles?.includes(roleId));
}

export async function resolvePortalForRole(roleId, preferredPortal = null) {
  if (preferredPortal && (await canAccessPortal(roleId, preferredPortal))) {
    return preferredPortal;
  }

  const portalKeys = ['admin', 'candidate', 'client', 'crm'];
  for (const portalKey of portalKeys) {
    if (await canAccessPortal(roleId, portalKey)) {
      return portalKey;
    }
  }

  return null;
}

export async function requirePortalAccess({ portalKey, redirectTo = '../auth/main.html#login' } = {}) {
  const user = Session.current();
  if (!user) {
    window.location.href = new URL(redirectTo, window.location.href).href;
    return { allowed: false, reason: 'unauthenticated', user: null };
  }

  const permitted = await canAccessPortal(user.role, portalKey);
  if (!permitted || user.portal !== portalKey) {
    Session.clear();
    window.location.href = new URL(redirectTo, window.location.href).href;
    return { allowed: false, reason: 'forbidden', user: null };
  }

  return { allowed: true, reason: 'ok', user };
}

export function resolveStartRoute(manifest) {
  const allowedRoutes = new Set((manifest.routes || []).map((route) => route.path));
  const remembered = Session.lastRoute(manifest.portalKey);

  if (remembered && allowedRoutes.has(remembered)) {
    return remembered;
  }

  return (
    manifest.defaultRoute ||
    manifest.routes?.find((route) => route.default)?.path ||
    manifest.routes?.[0]?.path ||
    ''
  );
}

export function portalEntryUrl(portalKey, routePath = '') {
  const url = new URL(`../${portalKey}/main.html`, window.location.href);
  if (routePath) {
    url.hash = routePath;
  }
  return url.href;
}

export function authEntryUrl(routePath = 'portal-select') {
  const url = new URL('../auth/main.html', window.location.href);
  url.hash = routePath;
  return url.href;
}
