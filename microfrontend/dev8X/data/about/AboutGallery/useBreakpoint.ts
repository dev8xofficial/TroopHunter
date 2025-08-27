import { useState, useEffect } from 'react';

export function useBreakpoint(width: number): boolean {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsBelowBreakpoint(window.innerWidth < width);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [width]);

  return isBelowBreakpoint;
}
