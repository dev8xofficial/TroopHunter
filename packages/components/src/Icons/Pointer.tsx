'use client';

import React from 'react';

interface PointerIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const PointerIcon: React.FC<PointerIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30.3484 69.9821C31.0163 69.9821 31.6755 69.9208 32.3142 69.8042C36.593 69.0254 40.9096 65.5371 40.9096 59.5025V40.8533H59.515C65.5555 40.8562 69.0438 36.5367 69.8225 32.255C70.6013 27.9762 68.8571 22.7087 63.2075 20.5796L15.3917 0.766659C11.0955 -0.852091 6.50464 0.136659 3.32839 3.31583C0.146309 6.49499 -0.842445 11.0829 0.744217 15.2887L20.6651 63.2883C22.4471 68.0162 26.5334 69.9821 30.3484 69.9821Z" fill="currentColor" />
    </svg>
  );
};

export default PointerIcon;
