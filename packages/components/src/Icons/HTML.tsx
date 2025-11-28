'use client';

import React from 'react';

interface HtmlIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const HtmlIcon: React.FC<HtmlIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.5431 28.8663L24.9109 21.4572L52.3334 21.4659L52.9612 14.3172L17.0403 14.3084L18.9434 36.1463H43.824L42.9359 45.4869L35.0018 47.6788L26.9453 45.4716L26.4334 39.7184H19.3196L20.2187 51.0891L34.9996 55.0419L49.6646 51.1088L51.6925 28.8706H25.5431V28.8663ZM6.37402 2.28595H63.6253L58.419 61.0728L34.9384 67.7163L11.5912 61.0706L6.37402 2.28595Z" fill="currentcolor" />
    </svg>
  );
};

export default HtmlIcon;
