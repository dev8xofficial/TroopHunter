import React from 'react';

interface DevicesIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DevicesIcon: React.FC<DevicesIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M29.75 57.3707H16.625C12.2792 57.3707 8.75 53.8999 8.75 49.6124V47.0164C8.75 45.5874 9.94583 44.4207 11.375 44.4207H20.7959C21.4959 44.4207 22.1666 44.7124 22.6625 45.1789L26.3667 48.8249C26.8625 49.3207 27.5332 49.5832 28.2332 49.5832H29.75" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.688 43.8958V15.7792C12.688 11.9 16.3338 8.75 20.7963 8.75H47.863C52.3547 8.75 55.9712 11.9 55.9712 15.7792V25.025" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55.4163 25.0249H43.4578C40.2363 25.0249 37.6245 27.6367 37.6245 30.8582V55.4167C37.6245 58.6384 40.2363 61.2499 43.4578 61.2499H55.4163C58.6378 61.2499 61.2495 58.6384 61.2495 55.4167V30.8582C61.2495 27.6367 58.6378 25.0249 55.4163 25.0249Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48.125 53.4917H50.75" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default DevicesIcon;
