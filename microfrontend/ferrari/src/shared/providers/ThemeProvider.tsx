'use client';

import type { ReactNode } from 'react';
import React from 'react';
import { BRAND_REGISTRY, BRAND_TOKENS, type BrandId, type BrandTokenMap } from '@/shared/config/theme';

type ThemeContextValue = {
  brandId: BrandId;
  tokens: BrandTokenMap;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  brandId,
  children
}: {
  brandId: BrandId;
  children: ReactNode;
}) {
  const className = BRAND_REGISTRY[brandId].className;
  const tokens = BRAND_TOKENS[brandId];

  return (
    <ThemeContext.Provider value={{ brandId, tokens }}>
      <div className={className}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useThemeTokens(): BrandTokenMap {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeTokens must be used within ThemeProvider');
  }
  return ctx.tokens;
}

export function useBrandId(): BrandId {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useBrandId must be used within ThemeProvider');
  }
  return ctx.brandId;
}
