import styles from './index.module.css';
import { ReactNode } from 'react';

interface FooterRevealPageWrapProps {
  children: ReactNode;
  variant: 'frame' | 'page';
}

export default function FooterRevealPageWrap({ children, variant }: FooterRevealPageWrapProps) {
  return <div className={variant === 'frame' ? styles['frame-wrap'] : styles['page-wrap']}>{children}</div>;
}
