'use client';

import React from 'react';

interface HotjarIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const HotjarIcon: React.FC<HotjarIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.5192 8.05891C17.1867 2.02392 7.40671 0.702057 7.40671 0.702057C7.40671 0.702057 11.9209 5.72965 6.15163 9.70935C2.50587 12.2194 1.06169 15.4807 2.62348 19.0433C3.81834 21.7727 6.3492 22.8809 9.07858 23.298C8.37765 21.9479 8.20171 19.998 8.72012 17.9992C8.77186 17.7996 8.82925 17.5906 8.89511 17.4014C9.66001 18.5858 10.9151 19.2335 12.1401 18.9341C13.8176 18.5349 14.8017 16.5041 14.3435 14.4168C14.2391 13.964 14.0688 13.529 13.8392 13.1251C13.9051 13.1411 13.9709 13.1467 14.0387 13.1693C16.132 13.7672 17.1444 16.8996 16.2995 20.1694C16.0493 21.1598 15.6268 22.0985 15.052 22.9421C18.646 21.784 21.0366 18.8833 21.6943 16.2989C22.3877 13.609 21.8618 10.4748 20.5192 8.05891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default HotjarIcon;
