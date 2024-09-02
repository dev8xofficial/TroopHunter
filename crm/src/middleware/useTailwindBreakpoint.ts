import { useState, useEffect } from 'react';

// Define TailwindCSS breakpoints (these are the default Tailwind breakpoints)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

type Breakpoint = keyof typeof breakpoints;

const useTailwindBreakpoint = (): Breakpoint => {
  // State to store the current breakpoint
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('sm');

  // Function to determine the current breakpoint based on window width
  const getBreakpoint = (width: number): Breakpoint => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    return 'sm';
  };

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = (): void => {
      const width = window.innerWidth;
      setCurrentBreakpoint(getBreakpoint(width));
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return currentBreakpoint;
};

export default useTailwindBreakpoint;
