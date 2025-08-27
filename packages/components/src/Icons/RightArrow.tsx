import React from 'react';

interface RightArrowIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const RightArrowIcon: React.FC<RightArrowIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 72 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.38801 28.8509H1V36.1436H56.598L34.3455 57.6313L33.385 58.5552L34.2844 59.5397L37.4102 62.9495L38.3763 64L39.4089 63.01L69.9784 33.4762L71 32.4973L69.9784 31.5073L39.4089 1.98996L38.3763 1L37.4102 2.05046L34.2844 5.46032L33.385 6.43928L34.3455 7.36875L56.598 28.8564L2.38801 28.8509Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
};

export default RightArrowIcon;
