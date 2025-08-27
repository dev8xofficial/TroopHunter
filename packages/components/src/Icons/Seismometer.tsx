import React from 'react';

interface SeismometerIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SeismometerIcon: React.FC<SeismometerIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_2_726)">
        <path d="M67.1605 17.0371V52.963C67.1605 60.8041 60.8039 67.1607 52.9627 67.1607H17.0369C9.19581 67.1607 2.83936 60.8041 2.83936 52.963V17.0371C2.83936 9.19605 9.19581 2.8396 17.0369 2.8396H21.1205H50.6895H52.9627C60.8039 2.8396 67.1605 9.19605 67.1605 17.0371Z" stroke="currentColor" strokeWidth="6.33" strokeLinecap="round" />
        <path d="M12.9634 35.6482H21.5188C21.8482 35.6482 22.1614 35.5053 22.3771 35.2565L29.4698 27.0724C29.9662 26.4996 30.8739 26.5645 31.2837 27.2021L41.2578 42.7173C41.6827 43.3785 42.6345 43.4185 43.1134 42.7958L48.2706 36.0915C48.4856 35.8121 48.8181 35.6482 49.1707 35.6482H55.7411" stroke="currentColor" strokeWidth="6.33" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_2_726">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SeismometerIcon;
