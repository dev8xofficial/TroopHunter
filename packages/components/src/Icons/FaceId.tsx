import React from 'react';

interface FaceIdIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const FaceIdIcon: React.FC<FaceIdIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M45.354 8.75H50.7498C56.5248 8.75 61.2498 13.475 61.2498 19.25V24.2375" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.75 24.3542V19.25C8.75 13.475 13.475 8.75 19.25 8.75H24.2667" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.3542 61.25H19.25C13.475 61.25 8.75 56.525 8.75 50.75V45.5293" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M61.2494 45.5293V50.75C61.2494 56.525 56.5244 61.25 50.7494 61.25H45.5576" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.4995 22.1958V27.4458" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M45.499 22.1958V27.4458" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34.999 26.1331V35.3498C34.999 36.1666 34.6198 36.9248 33.9783 37.4206L32.374 38.6748" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42.2621 46.7249C40.5996 48.8539 38.0039 50.2249 35.1164 50.2249C32.2289 50.2249 29.3996 48.7374 27.7661 46.4624" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default FaceIdIcon;
