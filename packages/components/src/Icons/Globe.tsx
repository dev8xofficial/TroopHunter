import React from 'react';

interface GlobeIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const GlobeIcon: React.FC<GlobeIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8.75 33.7749C26.1042 36.9833 43.8959 36.9833 61.25 33.7749" stroke="black" strokeWidth="6.33" strokeMiterlimit="10" />
      <path d="M35.0001 61.25C41.446 61.25 46.6669 49.4959 46.6669 35C46.6669 20.5042 41.446 8.75 35.0001 8.75C28.5544 8.75 23.3335 20.5042 23.3335 35C23.3335 49.4959 28.5544 61.25 35.0001 61.25Z" stroke="black" strokeWidth="6.33" strokeMiterlimit="10" />
      <path d="M35 61.25C49.4959 61.25 61.25 49.4959 61.25 35C61.25 20.5042 49.4959 8.75 35 8.75C20.5042 8.75 8.75 20.5042 8.75 35C8.75 49.4959 20.5042 61.25 35 61.25Z" stroke="black" strokeWidth="6.33" strokeMiterlimit="10" />
    </svg>
  );
};

export default GlobeIcon;
