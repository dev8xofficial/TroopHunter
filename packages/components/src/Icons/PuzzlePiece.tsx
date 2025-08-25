import React from 'react';

interface PuzzlePieceIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const PuzzlePieceIcon: React.FC<PuzzlePieceIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_2_730)">
        <path d="M2.69238 35.0001V15.6155H17.0767V12.3847C17.0767 7.03176 21.3701 2.69238 26.6663 2.69238C31.9623 2.69238 36.2558 7.03176 36.2558 12.3847V15.6155H50.6402V35.0001H57.0331C62.3294 35.0001 66.6228 39.3395 66.6228 44.6924C66.6228 50.0452 62.3294 54.3847 57.0331 54.3847H50.6402V67.3078H2.69238V54.3847H9.08543C14.3816 54.3847 18.675 50.0452 18.675 44.6924C18.675 39.3395 14.3816 35.0001 9.08543 35.0001H2.69238Z" stroke="black" strokeWidth="6.33" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2_730">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PuzzlePieceIcon;
