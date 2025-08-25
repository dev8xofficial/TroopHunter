import React from 'react';
import { ExpertiseFooterForm, ExpertiseFooterMainContent, ExpertiseFooterSocialLink } from '../../Interfaces/Expertise/Expertise';
import { FooterInternationalContents } from '../../Surfaces/FooterInternationalContents/FooterInternationalContents';
import RightArrowIcon from '../../Icons/RightArrow';
import { RotatingText } from '../../Animations/RotatingText';

import styles from './index.module.css';

type FooterProps = {
  footerMainContent: ExpertiseFooterMainContent;
  footerForm: ExpertiseFooterForm;
  footerSocialLinks: ExpertiseFooterSocialLink[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Footer: React.FC<FooterProps> = ({ footerMainContent, footerForm, footerSocialLinks, onClick }): JSX.Element => {
  const endWords = footerMainContent?.end.split(' ') || [];
  const rotatingWords = [endWords[1], 'epic', 'fun', 'click', 'delightfull', 'beautiful', 'original', 'extraordinary', 'engaging', 'click'].filter(Boolean);

  return (
    <footer className={styles['footer']} id="footer-animation">
      <div className={styles['footer__sticky-inner']}>
        <p className={styles['footer__heading']}>
          <a className={styles['footer__heading-link']} href={footerMainContent?.link}>
            <span>{footerMainContent?.start}</span>
            <br />
            <RightArrowIcon width="14" className={styles['arrow']} />
            <span className={styles['footer__word-ticker-wrapper']}>
              {endWords[0] + ' '}
              <RotatingText texts={rotatingWords} mainClassName={styles['word-ticker']} staggerFrom="first" initial={{ y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} staggerDuration={0.05} transition={{ duration: 0.5, ease: 'easeInOut' }} rotationInterval={3000} />
            </span>
          </a>
        </p>

        <svg width="40" height="40" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles['face']} style={{ '--width': 289, '--height': 311 } as React.CSSProperties}>
          <g filter="url(#filter0_d_80_102)">
            <path
              d="M510.4 878.75C373.55 878.75 310.3 798.25 310.3 715.45C310.3 611.95 383.9 552.15 434.5 508.45V506.15C383.9 462.45 310.3 403.8 310.3 300.3C310.3 217.5 373.55 137 510.4 137C646.1 137 709.35 217.5 709.35 300.3C709.35 403.8 624.25 462.45 573.65 506.15V508.45C624.25 552.15 709.35 611.95 709.35 715.45C709.35 798.25 646.1 878.75 510.4 878.75ZM616.2 695.9C616.2 632.65 549.5 586.65 509.25 554.45C469 586.65 401.15 632.65 401.15 695.9C401.15 748.8 434.5 786.75 509.25 786.75C584 786.75 616.2 748.8 616.2 695.9ZM616.2 319.85C616.2 266.95 584 229 509.25 229C434.5 229 401.15 266.95 401.15 319.85C401.15 383.1 469 429.1 509.25 461.3C549.5 429.1 616.2 383.1 616.2 319.85Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <filter id="filter0_d_80_102" x="260.3" y="91" width="499.05" height="841.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="25" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_80_102" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_80_102" result="shape" />
            </filter>
          </defs>
        </svg>

        <div className={styles['footer__ballpit-wrapper']}>
          <canvas className={styles['ballpit']} width="1500" height="1157" style={{ background: '0% 0% / contain transparent' }}></canvas>
        </div>

        <FooterInternationalContents footerForm={footerForm} footerSocialLinks={footerSocialLinks} onClick={onClick} />
      </div>
    </footer>
  );
};
