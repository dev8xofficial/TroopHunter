import React from 'react';

interface BackendIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const BackendIcon: React.FC<BackendIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 78 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M4 11.75H4.07463M4.07463 11.75H73.9257M4.07463 11.75C4 12.9682 4 14.4699 4 16.4008V53.6008C4 57.9412 4 60.1085 4.84773 61.7662C5.5934 63.2243 6.7824 64.413 8.24587 65.156C9.90803 66 12.085 66 16.4326 66H61.5677C65.915 66 68.089 66 69.751 65.156C71.2143 64.413 72.4073 63.2243 73.153 61.7662C74 60.1098 74 57.9439 74 53.6117V16.388C74 14.4633 74 12.9655 73.9257 11.75M4.07463 11.75C4.16777 10.2298 4.3771 9.15104 4.84773 8.2307C5.5934 6.77243 6.7824 5.58771 8.24587 4.84467C9.90963 4 12.0892 4 16.4452 4H61.5563C65.9123 4 68.0873 4 69.751 4.84467C71.2143 5.58771 72.4073 6.77243 73.153 8.2307C73.6237 9.15104 73.8327 10.2298 73.9257 11.75M73.9257 11.75H74M46.7777 31.125L54.5557 38.8749L46.7777 46.6251M31.2223 46.6251L23.4444 38.8749L31.2223 31.125"
        stroke="currentColor"
        strokeWidth="6.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BackendIcon;
