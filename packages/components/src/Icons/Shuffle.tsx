import React from 'react';

interface ShuffleIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ShuffleIcon: React.FC<ShuffleIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30.2163 43.2834L32.1996 46.6376C33.0746 48.0959 34.2996 49.2918 35.7871 50.1376C37.2746 50.9834 38.9371 51.4209 40.6288 51.4209H61.2205" stroke="currentColor" strokeWidth="6.33" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M8.75 18.5791H9.79997C11.4916 18.5791 13.1541 19.0166 14.6416 19.8624C16.1291 20.7083 17.3542 21.9041 18.2292 23.3625L20.1834 26.6291" stroke="currentColor" strokeWidth="6.33" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M8.75 51.4208H9.79997C11.4916 51.4208 13.1541 50.9833 14.6416 50.1374C16.1291 49.2916 17.3542 48.0958 18.2292 46.6374L32.025 23.3625C32.9 21.9041 34.125 20.7083 35.6125 19.8624C37.1 19.0166 38.7625 18.5791 40.4542 18.5791H61.0458" stroke="currentColor" strokeWidth="6.33" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M51.3623 41.5625L61.1915 51.3917L51.3623 61.2208" stroke="currentColor" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M51.3623 8.75L61.1915 18.6083L51.3623 28.4375" stroke="currentColor" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ShuffleIcon;
