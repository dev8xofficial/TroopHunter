'use client';

import React from 'react';

interface HtmlIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const HtmlIcon: React.FC<HtmlIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8.69647 9.84349L8.47562 7.23906L18.0553 7.24214L18.2746 4.72921L5.72612 4.72614L6.39095 12.4025H15.0827L14.7724 15.686L12.0008 16.4564L9.18631 15.6806L9.00749 13.6582H6.52239L6.83647 17.6552L12 19.0447L17.123 17.6621L17.8314 9.84502H8.69647V9.84349ZM2 0.5H22L20.1813 21.1647L11.9786 23.5L3.82256 21.1639L2 0.5Z" fill="currentcolor" />
    </svg>
  );
};

export default HtmlIcon;
