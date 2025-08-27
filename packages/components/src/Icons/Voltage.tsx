import React from 'react';

interface VoltageIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const VoltageIcon: React.FC<VoltageIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 78 113" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M61.5315 12.1069L45.5433 41.6772C43.9676 44.7098 45.3683 48.3844 48.5193 49.4926L70.4012 57.1331C73.9606 58.4163 75.1858 63.0236 72.6768 65.9399L36.2653 107.933C34.2814 110.266 30.6636 108.458 31.0137 105.542L35.04 76.6714C35.3901 74.0468 33.9313 71.6554 31.5388 70.7809L7.55633 61.974C4.52205 60.924 3.12164 57.3081 4.58044 54.3335L28.0377 7.03279C28.913 5.22474 30.7219 4 32.7642 4H56.6883C60.8898 4.11664 63.397 8.60215 61.4715 12.2182L61.5315 12.1069Z" stroke="currentColor" strokeWidth="6.33" strokeMiterlimit="10" strokeLinecap="round" />
    </svg>
  );
};

export default VoltageIcon;
