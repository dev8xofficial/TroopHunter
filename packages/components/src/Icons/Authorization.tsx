'use client';

import React from 'react';

interface AuthorizationIconProps {
  size?: number | string;
  className?: string;
}

const AuthorizationIcon: React.FC<AuthorizationIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M9 12C11.2094 12 13 10.0975 13 7.74999C13 5.40253 11.2094 3.5 9 3.5C6.79063 3.5 5 5.40253 5 7.74999C5 10.0975 6.79063 12 9 12ZM11.8 13.0625H11.2781C10.5844 13.4012 9.8125 13.5937 9 13.5937C8.1875 13.5937 7.41875 13.4012 6.72188 13.0625H6.2C3.88125 13.0625 2 15.0613 2 17.525V18.9062C2 19.7861 2.67188 20.5 3.5 20.5H14.5C15.3281 20.5 16 19.7861 16 18.9062V17.525C16 15.0613 14.1188 13.0625 11.8 13.0625ZM21.8938 8.79921L21.025 7.86621C20.8813 7.7102 20.6469 7.7102 20.5 7.86266L17.225 11.3158L15.8031 9.79509C15.6594 9.63908 15.425 9.63908 15.2781 9.79155L14.4 10.7179C14.2531 10.8707 14.2531 11.1197 14.3969 11.2757L16.95 14.0083C17.0938 14.1644 17.3281 14.1644 17.475 14.0119L21.8906 9.35681C22.0344 9.2008 22.0375 8.95194 21.8938 8.79921Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default AuthorizationIcon;
