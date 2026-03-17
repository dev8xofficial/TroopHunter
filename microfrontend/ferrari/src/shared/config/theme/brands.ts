import type { BrandId } from './tokens';

export const BRAND_REGISTRY: Record<
  BrandId,
  { className: string; label: string }
> = {
  ferrari: { className: 'theme-ferrari', label: 'Ferrari' },
  admin: { className: 'theme-admin', label: 'Admin' },
  client: { className: 'theme-client', label: 'Client' }
} as const;

