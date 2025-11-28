'use client';

import React from 'react';

interface BasketIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const BasketIcon: React.FC<BasketIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} viewBox="0 0 71 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M67.9566 26.3375C66.2941 24.4125 63.8733 23.3333 61.3358 23.3333H61.0733C59.6149 10.2375 48.4733 0 34.9983 0C21.5233 0 10.3816 10.2375 8.92327 23.3333H8.74827C6.21077 23.3333 3.78993 24.4417 2.12743 26.3375C0.464934 28.2625 -0.264233 30.8 0.0857675 33.3083L3.17743 54.95C4.40243 63.525 11.8399 69.9708 20.5024 69.9708H49.5816C58.2441 69.9708 65.6816 63.525 66.9066 54.95L69.9983 33.3083C70.3483 30.8 69.6191 28.2625 67.9566 26.3375ZM34.9983 5.83333C45.2649 5.83333 53.7524 13.4458 55.1816 23.3333H14.8149C16.2441 13.4458 24.7316 5.83333 34.9983 5.83333Z" fill="currentcolor" />
    </svg>
  );
};

export default BasketIcon;
