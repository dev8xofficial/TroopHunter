'use client';

import type { ReactNode } from 'react';
import { StoreProvider } from '@/shared/store/provider';
import { LenisProvider } from './LenisProvider';
import { AnimationProvider } from './AnimationProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Composite provider that wraps the entire application.
 * Order: Store → Lenis → Animation → children
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <LenisProvider>
        <ThemeProvider brandId="ferrari">
          <AnimationProvider>{children}</AnimationProvider>
        </ThemeProvider>
      </LenisProvider>
    </StoreProvider>
  );
}
