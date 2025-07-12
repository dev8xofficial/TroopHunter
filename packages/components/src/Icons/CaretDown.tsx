import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface CaretDownProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
}

const CaretDown: React.FC<CaretDownProps> = ({ width = 16, height = 16, className, onClick }) => {
  return <ChevronDownIcon {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} />;
};

export default CaretDown;
