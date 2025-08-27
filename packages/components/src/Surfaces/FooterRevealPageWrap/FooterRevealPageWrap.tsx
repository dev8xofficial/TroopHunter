import React, { ReactNode } from 'react';

import styles from './index.module.css';

interface FooterRevealPageWrapProps {
  children: ReactNode;
  variant: 'frame' | 'page';
}

export const FooterRevealPageWrap: React.FC<FooterRevealPageWrapProps> = ({ children, variant }: FooterRevealPageWrapProps) => {
  return (
    <div className={variant === 'frame' ? styles['frame-wrap'] : styles['page-wrap']} id={variant === 'frame' ? '' : 'page-content'}>
      {children}
    </div>
  );
};
