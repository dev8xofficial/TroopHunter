
import React from 'react';

interface PointerIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const PointerIcon: React.FC<PointerIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 57" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M58.0792 22.4149L11.9414 9.72409L27.5252 47.2926L30.3289 38.5669C32.5102 31.778 39.0207 26.4762 47.3575 24.6996L58.0792 22.4149ZM15.7562 0.527761C6.40825 -2.04348 -2.50945 5.21833 0.648104 12.8305L16.2318 50.3993C20.0187 59.5285 36.062 59.0718 39.0572 49.7499L41.8609 41.0239C42.9516 37.6295 46.2068 34.9785 50.3752 34.0903L61.0974 31.8055C72.5444 29.3661 73.1047 16.3021 61.8943 13.2185L15.7562 0.527761Z" fill="currentColor" />
    </svg>
  );
};

export default PointerIcon;
