import React from 'react';

interface PaintSwatchIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const PaintSwatchIcon: React.FC<PaintSwatchIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M18.9583 61.2499H59.706C60.5588 61.2499 61.2508 60.5589 61.2508 59.7062L61.25 42.3769M23.2764 60.2912L60.2063 43.0707C60.979 42.7102 61.3133 41.7912 60.9528 41.0184L53.6293 25.3142C53.269 24.5413 52.35 24.2057 51.5773 24.5661L35.0883 32.2557M28.822 53.6804C27.3628 59.1264 21.7652 62.3582 16.3194 60.8989C10.8736 59.4397 7.64113 53.8427 9.10033 48.3969L19.6466 9.03759C19.8673 8.21387 20.7132 7.72484 21.537 7.94557L38.2755 12.4299C39.0993 12.6506 39.5883 13.4971 39.3675 14.3208L28.822 53.6804ZM18.9583 51.3334H18.9642L18.964 51.3394L18.9583 51.3392V51.3334Z"
        stroke="black"
        strokeWidth="6.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PaintSwatchIcon;
