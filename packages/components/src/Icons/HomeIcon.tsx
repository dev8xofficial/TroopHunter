'use client';

import React from 'react';

interface HomeIconProps {
  size?: number | string;
  className?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        <defs>
          <style>{'.cls-1,.cls-2{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;strokeWidth:1.5px;}.cls-2{fillRule:evenodd;}'}</style>
        </defs>
        <g id="ic-real-estate-flat">
          <path className="cls-1" d="M4,2h8a2,2,0,0,1,2,2V22a0,0,0,0,1,0,0H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2Z" />
          <path className="cls-2" d="M14,10h6a2,2,0,0,1,2,2v8a2,2,0,0,1-2,2H14" />
          <line className="cls-1" x1="5" y1="6" x2="6" y2="6" />
          <line className="cls-1" x1="9" y1="6" x2="11" y2="6" />
          <line className="cls-1" x1="5" y1="10" x2="6" y2="10" />
          <line className="cls-1" x1="9" y1="10" x2="11" y2="10" />
          <line className="cls-1" x1="5" y1="14" x2="6" y2="14" />
          <line className="cls-1" x1="9" y1="14" x2="11" y2="14" />
          <line className="cls-1" x1="5" y1="18" x2="6" y2="18" />
          <line className="cls-1" x1="9" y1="18" x2="11" y2="18" />
          <line className="cls-1" x1="17" y1="14" x2="19" y2="14" />
          <line className="cls-1" x1="17" y1="18" x2="19" y2="18" />
        </g>
      </g>
    </svg>
  );
};

export default HomeIcon;
