import { ChevronUpIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface CaretUpProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
}

const CaretUp: React.FC<CaretUpProps> = ({ width = 16, height = 16, className, onClick }) => {
  return <ChevronUpIcon {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} />;
};

export default CaretUp;
