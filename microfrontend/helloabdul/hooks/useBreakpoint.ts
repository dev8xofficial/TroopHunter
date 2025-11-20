import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { isMobileAtom } from '../store/breakpoint';

export const useBreakpoint = () => {
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Set initial value
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setIsMobile]);

  return isMobile;
};
