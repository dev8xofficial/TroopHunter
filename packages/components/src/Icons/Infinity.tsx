import React from 'react';

interface InfinityIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const InfinityIcon: React.FC<InfinityIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M29.063 8.41897C25.923 6.43397 22.1334 2.5 17.2611 2.5C9.10452 2.5 2.5 8.9603 2.5 16.9364C2.5 24.9125 9.14062 31.3727 17.2611 31.3727C22.7469 31.3727 27.836 28.5578 30.687 23.9381L35.018 16.9364L39.313 9.93475C42.128 5.35118 47.2168 2.5 52.7388 2.5C60.8953 2.5 67.5 8.9603 67.5 16.9364C67.5 24.9125 60.8593 31.3727 52.7388 31.3727C47.8665 31.3727 45.1955 27.9803 40.9368 25.4538" stroke="black" strokeWidth="4.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default InfinityIcon;
