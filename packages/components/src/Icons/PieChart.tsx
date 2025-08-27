// components/PieChartIcon.tsx
import React from 'react';

interface PieChartIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const PieChartIcon: React.FC<PieChartIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M53.5213 38.85C53.5213 51.2166 43.4879 61.25 31.1213 61.25C18.7546 61.25 8.72119 51.2166 8.72119 38.85C8.72119 26.4833 18.7546 16.45 31.1213 16.45" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58.5958 29.6331H42.9917C41.5333 29.6331 40.3667 28.4666 40.3667 27.0081V11.404C40.3667 9.79985 41.7958 8.54566 43.3708 8.779C52.6167 10.0915 59.9083 17.4123 61.2501 26.6582C61.4833 28.2331 60.2292 29.6622 58.6251 29.6622L58.5958 29.6331Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default PieChartIcon;
