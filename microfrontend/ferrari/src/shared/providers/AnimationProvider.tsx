'use client';

import { useEffect, type ReactNode } from 'react';
import { initGSAP } from '@/shared/lib/animations/gsap';

interface AnimationProviderProps {
  children: ReactNode;
}

/**
 * Initializes GSAP and registers plugins on mount.
 * Must be rendered on the client.
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  useEffect(() => {
    initGSAP();
  }, []);

  return <>{children}</>;
}
