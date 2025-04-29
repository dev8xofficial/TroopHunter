import React from 'react';

import styles from './index.module.css';
import { FooterInternationalContents } from '../FooterInternationalContents/FooterInternationalContents';

type mainContent = {
  link: string;
  start: string;
  end: string;
};

type footerContent = {
  logo: {
    src: string;
    alt?: string;
  };
  privacy: {
    text: string;
    href: string;
  };
  button?: {
    text: string;
  };
};

type socialLinks = {
  title: string | React.ReactNode;
  href: string;
  icon?: React.ReactNode;
};

type FooterProps = {
  mainContent: mainContent;
  footerContent: footerContent;
  socialLinks: socialLinks[];
};

export const Footer: React.FC<FooterProps> = ({ mainContent, footerContent, socialLinks }): JSX.Element => {
  return (
    <>
      <footer className={styles['footer']}>
        <div className={styles['sticky-inner']} style={{ transform: 'none' }}>
          <p className={styles['footer__heading']}>
            <a className={styles['footer__heading-link']} target="_tab" href={mainContent.link}>
              <span>{mainContent.start}</span>
              <br />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" className={styles['arrow']} style={{ '--width': 14, '--height': 13 } as React.CSSProperties}>
                <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
              </svg>
              <span className={styles['word-ticker-wrapper']}>
                {mainContent.end.split('client!')[0]}
                <span className={styles['word-ticker']}>
                  <span style={{ opacity: 1 }}>client!</span>
                </span>
              </span>
            </a>
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" width="289" height="311" fill="none" viewBox="0 0 289 311" className={styles['face']} style={{ '--width': 289, '--height': 311 } as React.CSSProperties}>
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M137.188 169.585c15.584 0 28.264-12.681 28.264-28.265V56.528C165.452 25.358 190.81 0 221.981 0c31.17 0 56.528 25.358 56.528 56.528h-28.264c0-15.584-12.681-28.264-28.264-28.264-15.584 0-28.264 12.68-28.264 28.264v84.792c0 31.171-25.358 56.529-56.529 56.529-31.17 0-56.528-25.358-56.528-56.529h28.264c0 15.584 12.681 28.265 28.264 28.265Zm122.764-.002h28.264c0 77.925-63.396 141.321-141.321 141.321V282.64c62.339 0 113.057-50.716 113.057-113.057ZM19.986 4.137 0 24.123l32.404 32.405L0 88.93l19.986 19.986 32.405-32.402 32.401 32.402 19.986-19.986-32.404-32.402 32.404-32.404L84.792 4.137 52.391 36.542 19.986 4.137Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className={styles['footer__ballpit-wrapper']}>
            <canvas className={styles['ballpit']} width="1500" height="1157" style={{ background: '0% 0% / contain transparent;' }}></canvas>
          </div>
          <FooterInternationalContents />
        </div>
      </footer>
    </>
  );
};
