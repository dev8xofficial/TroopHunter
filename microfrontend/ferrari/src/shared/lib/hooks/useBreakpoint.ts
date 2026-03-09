'use client';

import { useCallback, useSyncExternalStore } from 'react';

const BREAKPOINTS = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;

function subscribe(cb: () => void) {
  window.addEventListener('resize', cb);
  return () => window.removeEventListener('resize', cb);
}

function getSnapshot() {
  return window.innerWidth;
}

function getServerSnapshot() {
  return 1024;
}

export function useBreakpoint() {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isAbove = useCallback((bp: BreakpointKey) => width >= BREAKPOINTS[bp], [width]);
  const isBelow = useCallback((bp: BreakpointKey) => width < BREAKPOINTS[bp], [width]);

  return {
    width,
    isMobile: width < BREAKPOINTS.sm,
    isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.md,
    isDesktop: width >= BREAKPOINTS.md,
    isAbove,
    isBelow
  };
}
