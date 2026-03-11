import { clsx, type ClassValue } from 'clsx';

/**
 * Utility for conditionally joining classNames.
 * Thin wrapper over clsx for consistency.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a slug into a human-readable title.
 *  e.g. "my-page-slug" → "My Page Slug"
 */
export function slugToTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Prefix a path with the asset host for CDN usage.
 */
export function prefixed(path: string): string {
  const host = process.env.NEXT_PUBLIC_ASSET_HOST || '';
  return `${host}${path}`;
}
