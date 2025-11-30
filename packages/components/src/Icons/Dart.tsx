'use client';

import React from 'react';

interface DartIconProps {
  size?: number | string;
  className?: string;
}

const DartIcon: React.FC<DartIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M3.42083 5.42139C3.42083 5.42139 7.63167 3.31722 9.73667 2.26389C10.1198 2.07502 10.544 1.98479 10.9708 2.00139C11.6092 2.04055 12.3683 2.65805 12.3683 2.65805L20 10.2906V18.4481H16.4475V22.0006H8.1575L0.6575 14.5006C0.2525 14.0839 0 13.4964 0 12.9214C0 12.6556 0.15 12.2397 0.263333 12.0006L3.42083 5.42139ZM3.98667 5.98722V15.8097C3.98833 16.2622 4.00417 16.6631 4.40167 17.0664L8.50333 21.1672H15.6142V17.6147L3.98667 5.98722ZM14.0325 5.42222C13.2833 4.67555 12.525 3.93889 11.7492 3.21972C11.4975 2.99722 11.2767 2.82972 10.8575 2.83472C10.5492 2.84639 10.1325 2.99722 10.1325 2.99722L5.28417 5.42139L14.0325 5.42222Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default DartIcon;
