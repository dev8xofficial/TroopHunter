'use client';

import React from 'react';

interface UserIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0007 12C15.6826 12 18.6674 9.76142 18.6674 7C18.6674 4.23858 15.6826 2 12.0007 2C8.31876 2 5.33398 4.23858 5.33398 7C5.33398 9.76142 8.31876 12 12.0007 12Z" fill="currentColor" />
      <path d="M12 13.6667C6.4797 13.6713 2.00615 17.0265 2 21.1667C2 21.6269 2.49745 22 3.1111 22H20.8889C21.5026 22 22 21.6269 22 21.1667C21.9939 17.0265 17.5204 13.6713 12 13.6667Z" fill="currentColor" />
    </svg>
  );
};

export default UserIcon;
