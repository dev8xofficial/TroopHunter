export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const prefixed = (src: string): string => {
  const assetHost: string | undefined = process.env.NEXT_PUBLIC_ASSET_HOST;

  if (!src.startsWith('/')) return src;
  if (assetHost === undefined || assetHost.trim() === '') return src;

  const path = src.startsWith('/api') ? src.replace(/^\/api/, '') : src;

  return `${assetHost}${path}`;
};

/**
 * Determines if the current application is running on a helloabdul port.
 * Returns true for helloabdul ports (3006, 3007, 3008), false for dev8x ports (3003, 3004, 3005).
 * Works dynamically in all environments (production, staging, development/local).
 *
 * @param baseUrl - Optional base URL. If not provided, uses window.location (client) or process.env (server)
 * @returns true if running on helloabdul port, false if running on dev8x port
 */
export const isHelloabdulPort = (baseUrl?: string): boolean => {
  let url: string | undefined;

  // Client-side: use window.location
  if (typeof window !== 'undefined') {
    url = baseUrl || window.location.origin;
  }
  // Server-side: use environment variables or provided baseUrl
  else {
    url = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;

    // If VERCEL_URL doesn't include protocol, add https
    if (url && !url.startsWith('http')) {
      url = `https://${url}`;
    }
  }

  if (!url) {
    // Default to true for helloabdul project (this file is in helloabdul)
    return true;
  }

  try {
    const urlObj = new URL(url);
    const port = urlObj.port ? parseInt(urlObj.port, 10) : null;

    // If no port specified in URL (common in production with default ports)
    // Check hostname or use project-specific fallback
    if (port === null) {
      // In production, ports might not be in URL
      // Check if hostname contains project identifier
      const hostname = urlObj.hostname.toLowerCase();
      if (hostname.includes('helloabdul')) {
        return true;
      }
      if (hostname.includes('dev8x')) {
        return false;
      }
      // Default to true for helloabdul project (this file is in helloabdul)
      return true;
    }

    // helloabdul ports: 3006 (production), 3007 (staging), 3008 (development/local)
    const helloabdulPorts = [3006, 3007, 3008];

    // dev8x ports: 3003 (production), 3004 (staging), 3005 (development/local)
    const dev8xPorts = [3003, 3004, 3005];

    if (helloabdulPorts.includes(port)) {
      return true;
    }

    if (dev8xPorts.includes(port)) {
      return false;
    }

    // If port doesn't match known ports, default to true for helloabdul project
    return true;
  } catch (error) {
    // If URL parsing fails, default to true for helloabdul project
    return true;
  }
};

/**
 * Gets the submenu row value based on the current application port.
 * Returns 1 for helloabdul ports (all sections in one row), 2 for dev8x ports (default).
 *
 * @param baseUrl - Optional base URL. If not provided, uses window.location (client) or process.env (server)
 * @returns The number of rows for the submenu grid (1 for helloabdul, 2 for dev8x)
 */
export const getSubmenuRow = (baseUrl?: string): number => {
  return isHelloabdulPort(baseUrl) ? 1 : 2;
};

/**
 * Gets the submenu columns value based on the current application port.
 * Returns 4 for helloabdul ports (4 sections in one row), 3 for dev8x ports (default).
 *
 * @param baseUrl - Optional base URL. If not provided, uses window.location (client) or process.env (server)
 * @returns The number of columns for the submenu grid (4 for helloabdul, 3 for dev8x)
 */
export const getSubmenuColumns = (baseUrl?: string): number => {
  return isHelloabdulPort(baseUrl) ? 4 : 3;
};