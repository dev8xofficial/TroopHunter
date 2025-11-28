// components/PieChartIcon.tsx
'use client';

import React from 'react';

interface PieChartIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const PieChartIcon: React.FC<PieChartIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_642_135)">
        <path d="M54.5796 35H40.8333C37.6117 35 34.9999 32.3883 34.9999 29.1666V15.3825C35.008 12.6632 33.7511 10.0945 31.599 8.43213C29.5597 6.81721 26.8858 6.24162 24.3628 6.87463C7.21416 11.1315 -3.23676 28.4843 1.02025 45.633C4.01945 57.7151 13.7549 66.9605 25.9758 69.3321C42.6705 72.5277 58.9602 62.148 63.1167 45.6663C63.752 43.14 63.1775 40.4619 61.562 38.4184C59.8805 36.2701 57.3076 35.0104 54.5796 35Z" fill="currentColor" />
        <path d="M68.9821 21.7175C68.3163 19.2426 67.3246 16.8671 66.0333 14.6534C62.1491 7.98998 55.8043 3.11773 48.3642 1.085C47.8741 0.952793 46.7774 0.875 46.7774 0.875C46.3856 0.875137 44.698 0.875 43.3621 1.95713C41.3987 3.50219 41.0899 5.25875 41.0608 5.39588C40.959 5.826 40.9061 6.26637 40.9033 6.70838V20.4168C40.9033 25.2492 44.8209 29.1668 49.6533 29.1668H63.4171C65.2431 29.172 66.9618 28.305 68.043 26.8334C68.8425 25.7554 69.2537 24.4385 69.2096 23.0971C69.1863 22.6301 69.11 22.1672 68.9821 21.7175Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_642_135">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PieChartIcon;
