import React, { ReactNode } from 'react';

import styles from './index.module.css';

export const WorkCategories: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={styles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={`${styles['category']} ${styles['is-active']}`} href="/work">
            Featured
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={styles['category']} href="/work/category/commercial">
            Commercial
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={styles['category']} href="/work/category/not-for-profit">
            Not for Profit
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={styles['category']} href="/work/category/education">
            Education
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={styles['category']} href="/work/category/community-purpose">
            Community &amp; Purpose
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={styles['category']} href="/work/category/innovation">
            Innovation
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={styles['category']} href="/work/category/ui-ux">
            UI &amp; UX
          </a>
        </div>
      </div>
    </>
  );
};
