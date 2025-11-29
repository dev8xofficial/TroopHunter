'use client';

import React from 'react';

interface RightArrowIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const RightArrowIcon: React.FC<RightArrowIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_642_116)">
        <path
          d="M55.7729 53.6492L67.2033 42.2188C69.0594 40.2737 70.095 37.6885 70.095 35C70.095 32.3115 69.0594 29.7263 67.2033 27.7812L55.7729 16.3508C54.9525 15.5301 53.8398 15.0689 52.6793 15.0686C51.5189 15.0683 50.4059 15.529 49.5852 16.3494C48.7645 17.1697 48.3032 18.2825 48.3029 19.4429C48.3027 20.6033 48.7634 21.7164 49.5837 22.5371L57.6921 30.6483L4.46289 30.7154C3.30257 30.7154 2.18977 31.1764 1.3693 31.9968C0.548827 32.8173 0.0878906 33.9301 0.0878906 35.0904C0.0878906 36.2507 0.548827 37.3635 1.3693 38.184C2.18977 39.0045 3.30257 39.4654 4.46289 39.4654L57.6366 39.3983L49.5837 47.4629C48.7868 48.2881 48.3458 49.3932 48.3558 50.5403C48.3657 51.6874 48.8259 52.7847 49.637 53.5959C50.4482 54.407 51.5455 54.8672 52.6926 54.8771C53.8397 54.8871 54.9478 54.4461 55.7729 53.6492Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_642_116">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RightArrowIcon;
