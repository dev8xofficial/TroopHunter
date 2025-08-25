import React from 'react';

interface MobileIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const MobileIcon: React.FC<MobileIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 84" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M21 14H49C52.866 14 56 17.134 56 21V63C56 66.866 52.866 70 49 70H21C17.134 70 14 66.866 14 63V21C14 17.134 17.134 14 21 14ZM0 21C0 9.40205 9.40205 0 21 0H49C60.5979 0 70 9.40205 70 21V63C70 74.5983 60.5979 84 49 84H21C9.40205 84 0 74.5983 0 63V21ZM28 56C26.067 56 24.5 57.567 24.5 59.5C24.5 61.433 26.067 63 28 63H42C43.933 63 45.5 61.433 45.5 59.5C45.5 57.567 43.933 56 42 56H28Z" fill="currentColor" />
    </svg>
  );
};

export default MobileIcon;
