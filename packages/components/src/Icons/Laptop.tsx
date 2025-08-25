import React from 'react';

interface LaptopIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const LaptopIcon: React.FC<LaptopIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11.3754 46.7542H20.7962C21.4962 46.7542 22.167 47.046 22.6629 47.5126L26.3671 51.1876C26.8629 51.6835 27.5338 51.946 28.2338 51.946H41.2713C42.2629 51.946 43.1963 51.3919 43.6045 50.5169L44.7713 48.1835C45.2088 47.3085 46.142 46.7542 47.1045 46.7542H58.5963C60.0254 46.7542 61.2213 47.921 61.2213 49.3501V51.946C61.2213 56.2917 57.692 59.7626 53.3463 59.7626H16.5962C12.2504 59.7626 8.72119 56.2626 8.72119 51.946V49.3501C8.72119 47.921 9.91709 46.7542 11.3462 46.7542H11.3754Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.687 46.7541V17.5291C12.687 13.5041 16.4203 10.2083 21.0578 10.2083H48.9411C53.5495 10.2083 57.312 13.4749 57.312 17.5291V46.7541" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default LaptopIcon;
