import { ReactNode } from 'react';

import styles from './index.module.css';

interface ModularBlocksProps {
  children: ReactNode;
}

export const ModularBlocks = ({ children }: ModularBlocksProps) => {
  return <div className={styles['modular-blocks']}>{children}</div>;
};
