'use client';

import React from 'react';

interface SupabaseIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SupabaseIcon: React.FC<SupabaseIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.7039 11.306L13.5927 19.9727C12.9992 20.556 11.8617 20.2227 11.8617 19.4727V14.431H3.25593C2.2173 14.431 1.6238 13.3893 2.26676 12.7227L10.2296 4.056C10.7736 3.431 11.9111 3.76433 11.9111 4.556V9.59766H20.6653C21.8028 9.59766 22.3963 10.5977 21.7039 11.306Z" fill="currentColor" />
    </svg>
  );
};

export default SupabaseIcon;
