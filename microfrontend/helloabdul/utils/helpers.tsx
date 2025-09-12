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
