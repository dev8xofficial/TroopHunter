import React from 'react';
import { ExpertiseFooterForm, ExpertiseFooterMainContent, ExpertiseFooterSocialLink } from '../../Interfaces/Expertise/Expertise';
import { FooterInternationalContents } from '../FooterInternationalContents/FooterInternationalContents';
import RightArrowIcon from '../../Icons/RightArrow';

import styles from './index.module.css';

type FooterProps = {
  footerMainContent: ExpertiseFooterMainContent;
  footerForm: ExpertiseFooterForm;
  footerSocialLinks: ExpertiseFooterSocialLink[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Footer: React.FC<FooterProps> = ({ footerMainContent, footerForm, footerSocialLinks, onClick }): JSX.Element => {
  console.log(footerMainContent, footerForm, footerSocialLinks);
  return (
    <>
      <footer className={styles['footer']} id="footer-animation">
        <div className={styles['footer__sticky-inner']} style={{ transform: 'none' }}>
          <p className={styles['footer__heading']}>
            <a className={styles['footer__heading-link']} href={footerMainContent?.link}>
              <span>{footerMainContent?.start}</span>
              <br />
              <RightArrowIcon width="14" className={styles['arrow']} />
              <span className={styles['footer__word-ticker-wrapper']}>
                {footerMainContent?.end.split(' ')[0] + ' '}
                <span className={styles['word-ticker']}>{footerMainContent?.end.split(' ')[1]}</span>
              </span>
            </a>
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" width="289" height="311" fill="none" viewBox="0 0 289 311" className={styles['face']} style={{ '--width': 289, '--height': 311, display: 'none' } as React.CSSProperties}>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M137.188 169.585c15.584 0 28.264-12.681 28.264-28.265V56.528C165.452 25.358 190.81 0 221.981 0c31.17 0 56.528 25.358 56.528 56.528h-28.264c0-15.584-12.681-28.264-28.264-28.264-15.584 0-28.264 12.68-28.264 28.264v84.792c0 31.171-25.358 56.529-56.529 56.529-31.17 0-56.528-25.358-56.528-56.529h28.264c0 15.584 12.681 28.265 28.264 28.265Zm122.764-.002h28.264c0 77.925-63.396 141.321-141.321 141.321V282.64c62.339 0 113.057-50.716 113.057-113.057ZM19.986 4.137 0 24.123l32.404 32.405L0 88.93l19.986 19.986 32.405-32.402 32.401 32.402 19.986-19.986-32.404-32.402 32.404-32.404L84.792 4.137 52.391 36.542 19.986 4.137Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className={styles['footer__ballpit-wrapper']}>
            <canvas className={styles['ballpit']} width="1500" height="1157" style={{ background: '0% 0% / contain transparent' }}></canvas>
          </div>
          <FooterInternationalContents footerForm={footerForm} footerSocialLinks={footerSocialLinks} onClick={onClick} />
        </div>
      </footer>
    </>
  );
};
