'use client';

import React from 'react';

interface ShuffleIconProps {
  size?: number | string;
  className?: string;
}

const ShuffleIcon: React.FC<ShuffleIconProps> = ({ size = 24, className }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.63281 12.3667L9.19948 13.325C9.44948 13.7417 9.79948 14.0833 10.2245 14.325C10.6495 14.5667 11.1245 14.6917 11.6078 14.6917H17.4911" stroke="black" stroke-width="2.33" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M2.5 5.30832H2.79999C3.28332 5.30832 3.75833 5.43332 4.18333 5.67499C4.60833 5.91665 4.95833 6.25833 5.20833 6.67499L5.76668 7.60832" stroke="black" stroke-width="2.33" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M2.5 14.6917H2.79999C3.28332 14.6917 3.75832 14.5667 4.18332 14.325C4.60832 14.0833 4.95833 13.7417 5.20833 13.325L9.15 6.67499C9.4 6.25833 9.75 5.91665 10.175 5.67499C10.6 5.43332 11.075 5.30832 11.5583 5.30832H17.4417" stroke="black" stroke-width="2.33" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M14.6748 11.875L17.4831 14.6833L14.6748 17.4917" stroke="black" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14.6748 2.5L17.4831 5.31667L14.6748 8.125" stroke="black" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default ShuffleIcon;
