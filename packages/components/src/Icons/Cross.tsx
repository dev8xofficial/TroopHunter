import React from 'react';

interface CrossIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const CrossIcon: React.FC<CrossIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 72L72 2M72 72L2 2" stroke="currentColor" stroke-width="15" stroke-linecap="square" stroke-linejoin="round" />
    </svg>
  );
};

export default CrossIcon;
