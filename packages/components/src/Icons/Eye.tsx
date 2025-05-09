import React from 'react';

interface EyeIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9.85829 44.829V44.7708H9.8291C22.5749 23.1583 46.7248 22.8666 59.7332 44.1874" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 18.5209V8.72095" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.3125 25.0833L8.75 15.2542" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54.6875 25.0833L61.25 15.2542" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35.0001 61.2209C40.4445 61.2209 44.8582 56.8201 44.8582 51.3916C44.8582 45.9631 40.4445 41.5625 35.0001 41.5625C29.5554 41.5625 25.1416 45.9631 25.1416 51.3916C25.1416 56.8201 29.5554 61.2209 35.0001 61.2209Z" fill="currentColor" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default EyeIcon;
