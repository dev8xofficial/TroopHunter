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
export type Brand = 'faang' | 'dev8x' | 'helloabdul';
export const getBrandFromBaseURL = (baseUrl?: string): Brand => {
  let url: string | undefined;
  let hostname: string | undefined;

  // Client-side: use window.location
  if (typeof window !== 'undefined') {
    url = baseUrl || window.location.origin;
    hostname = baseUrl ? new URL(baseUrl).hostname : window.location.hostname;
  }
  // Server-side: use environment variables or provided baseUrl
  else {
    url = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;

    // Check for NEXT_PUBLIC_BRAND environment variable first (most reliable)
    if (process.env.NEXT_PUBLIC_BRAND) {
      const envBrand = process.env.NEXT_PUBLIC_BRAND.toLowerCase();
      if (['faang', 'dev8x', 'helloabdul'].includes(envBrand)) {
        return envBrand as Brand;
      }
    }

    // If VERCEL_URL doesn't include protocol, add https
    if (url && !url.startsWith('http')) {
      url = `https://${url}`;
    }

    try {
      hostname = url ? new URL(url).hostname : undefined;
    } catch (error) {
      // Invalid URL, will handle in fallback
    }
  }

  // Strategy 1: Check hostname for brand identifiers
  if (hostname) {
    const lowerHostname = hostname.toLowerCase();

    if (lowerHostname.includes('faang')) {
      return 'faang';
    }
    if (lowerHostname.includes('helloabdul')) {
      return 'helloabdul';
    }
    if (lowerHostname.includes('dev8x') || lowerHostname.includes('dev8')) {
      return 'dev8x';
    }
  }

  // Strategy 2: Check port numbers if URL is available
  if (url) {
    try {
      const urlObj = new URL(url);
      const port = urlObj.port ? parseInt(urlObj.port, 10) : null;

      if (port !== null) {
        // faang ports: 3000 (production), 3001 (staging), 3002 (development/local)
        const faangPorts = [3009, 3010, 3011];
        // dev8x ports: 3003 (production), 3004 (staging), 3005 (development/local)
        const dev8xPorts = [3003, 3004, 3005];
        // helloabdul ports: 3006 (production), 3007 (staging), 3008 (development/local)
        const helloabdulPorts = [3006, 3007, 3008];

        if (faangPorts.includes(port)) {
          return 'faang';
        }
        if (dev8xPorts.includes(port)) {
          return 'dev8x';
        }
        if (helloabdulPorts.includes(port)) {
          return 'helloabdul';
        }
      }
    } catch (error) {
      // URL parsing failed, continue to fallback
    }
  }

  // Strategy 3: Check process.cwd() or file system path (development fallback)
  if (typeof process !== 'undefined' && process.cwd) {
    const cwd = process.cwd().toLowerCase();
    if (cwd.includes('faang')) {
      return 'faang';
    }
    if (cwd.includes('helloabdul')) {
      return 'helloabdul';
    }
    if (cwd.includes('dev8x')) {
      return 'dev8x';
    }
  }

  // Default fallback: return 'dev8x' as it's the most common
  return 'dev8x';
};

const BRAND_OFFERS_ROUTES: Record<Brand, string[]> = {
  faang: ['/offers', '/pricing'],
  dev8x: ['/offers', '/pricing'],
  helloabdul: []
};

const matchesRoute = (pathname: string, route: string): boolean => {
  const normalizedRoute = route.toLowerCase();
  return pathname === normalizedRoute || pathname.startsWith(`${normalizedRoute}/`);
};

export const shouldRenderOffersSurfaces = (brand: Brand, pathname: string): boolean => {
  const normalizedPath = pathname.toLowerCase();
  const supportedRoutes = BRAND_OFFERS_ROUTES[brand] || [];

  if (!supportedRoutes.length) {
    return false;
  }

  return supportedRoutes.some((route) => matchesRoute(normalizedPath, route));
};

export const shouldShowOffersCategories = (brand: Brand, pathname: string): boolean => {
  return shouldRenderOffersSurfaces(brand, pathname);
};

const BRAND_PILL_VISIBILITY: Record<Brand, boolean> = {
  faang: true,
  dev8x: false,
  helloabdul: false
};

export const shouldShowOffersPill = (brand: Brand): boolean => {
  return Boolean(BRAND_PILL_VISIBILITY[brand]);
};

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
    // Fallback: check hostname from environment
    const hostname = typeof window !== 'undefined' ? window.location.hostname : process.env.NEXT_PUBLIC_BASE_URL || '';
    if (hostname.includes('helloabdul')) {
      return true;
    }
    if (hostname.includes('dev8x')) {
      return false;
    }
    // Default fallback - check package name if available
    return false;
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
      // Default fallback
      return false;
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

    // If port doesn't match known ports, default to dev8x
    return false;
  } catch (error) {
    // If URL parsing fails, default to dev8x
    return false;
  }
};
