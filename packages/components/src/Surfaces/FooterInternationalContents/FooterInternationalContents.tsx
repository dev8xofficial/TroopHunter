import React from 'react';
import { useRouter } from 'next/router';
import { ICON_MAP } from '../IconCards/IconMap';
import { ExpertiseFooterForm, ExpertiseFooterSocialLink } from '../../Interfaces/Expertise/Expertise';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import ButtonStyles from '../Button/index.module.css';
import styles from './index.module.css';

type FooterInternationalContentsProps = {
  footerForm: ExpertiseFooterForm;
  footerSocialLinks: ExpertiseFooterSocialLink[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const FooterInternationalContents: React.FC<FooterInternationalContentsProps> = ({ footerForm, footerSocialLinks, onClick }): JSX.Element => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <>
      <div className={`${styles['footer-columns']} footer-columns`}>
        <div className={styles['footer-columns__column']}>
          <div className={styles['flex-row']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" className="" style={{ '--width': 16, '--height': 16 } as React.CSSProperties}>
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.64" d="M.8 8a7.2 7.2 0 1 0 14.4 0A7.2 7.2 0 0 0 .8 8Z"></path>
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.64" d="M6.643 15.072c-1.005-1.408-1.683-4.051-1.683-7.04S5.638 2.336 6.643.96M9.357 15.072c1.005-1.408 1.683-4.051 1.683-7.04S10.362 2.336 9.357.96M.8 8h14.4M1.632 11.36h12.736M1.632 4.64h12.736"></path>
            </svg>
            <h3>We work globally</h3>
          </div>
          <div>
            {!currentPath.startsWith('/contact') && (
              <button className={`${ContactFormModalStyles['contact-form-button']} ${styles['footer-contact-button']}`} data-international-footer-cta="true" data-faitracker-form-bind="true" onClick={onClick}>
                {footerForm?.button?.text}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" className="" style={{ '--width': 12, '--height': 13 } as React.CSSProperties}>
                  <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
                </svg>
              </button>
            )}
          </div>
          <a href="mailto:contact@dev8x.com">contact@dev8x.com</a>
        </div>
      </div>
      <div className={`${styles['footer-bottom']} footer-bottom`}>
        <div className={styles['footer-legal']}>
          <svg width="60" viewBox="0 0 224 77" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.355 64V24.675H21.645C32.48 24.675 39.135 31.715 39.135 44.365C39.135 57.015 32.7 64 21.81 64H6.355ZM12.9 30.23V58.445H21.315C30.115 58.445 32.59 51.9 32.59 44.365C32.59 36.83 30.115 30.23 21.315 30.23H12.9Z" fill="#3C3C3C" />
            <path d="M68.424 57.746C74.862 57.746 77.452 53.75 78.118 51.456H85.888C83.964 58.634 78.34 64.11 68.646 64.11C56.88 64.11 49.702 55.97 49.702 44.13C49.702 31.846 56.88 24.15 68.276 24.15C80.486 24.15 86.48 32.66 86.48 46.128H57.472C57.472 52.492 61.542 57.746 68.424 57.746ZM68.276 30.292C61.986 30.292 57.472 34.51 57.472 40.356H78.71C78.71 34.51 74.566 30.292 68.276 30.292ZM94.6402 25.186H102.854L112.4 54.786H112.474L122.02 25.186H130.234L116.84 63H108.034L94.6402 25.186Z" fill="#3C3C3C" />
            <path
              d="M138.595 52.275C138.595 47.05 142.005 44.355 145.635 42.76V42.65C142.94 41.22 140.41 38.855 140.41 34.565C140.41 28.02 145.855 24.17 153.28 24.17C160.705 24.17 166.15 28.02 166.15 34.565C166.15 38.855 163.565 41.22 160.925 42.65V42.76C164.5 44.355 168.02 47.05 168.02 52.275C168.02 59.975 161.585 63.825 153.28 63.825C144.975 63.825 138.595 59.975 138.595 52.275ZM153.28 40.395C157.515 40.395 160.155 38.525 160.155 34.84C160.155 31.21 157.515 29.23 153.28 29.23C149.045 29.23 146.405 31.21 146.405 34.84C146.405 38.525 149.045 40.395 153.28 40.395ZM153.28 58.6C158.45 58.6 161.64 56.07 161.64 51.89C161.64 47.765 158.45 45.235 153.28 45.235C148.165 45.235 144.92 47.765 144.92 51.89C144.92 56.07 148.165 58.6 153.28 58.6Z"
              fill="#3C3C3C"
            />
            <path d="M177.776 25.186H186.582L195.166 38.506H195.314L203.898 25.186H212.704L199.976 43.686L214.11 63H205.082L195.314 48.792H195.166L185.546 63H176.444L190.578 43.686L177.776 25.186Z" fill="#3C3C3C" />
          </svg>
          <span>
            © {footerForm?.privacy?.year} <a href="/privacy">{footerForm?.privacy?.text}</a>
          </span>
        </div>
        <ul className={styles['footer-socials']}>
          {footerSocialLinks?.map((item, index) => (
            <li className={styles['footer-socials__item']} key={index}>
              <a className={ButtonStyles['button-wrapper']} target="_blank" href={item.href}>
                <span className={`${ButtonStyles['button']} ${ButtonStyles['button--bg-transparent']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <span>{item.title}</span>
                </span>
              </a>
              {ICON_MAP[item.icon?.name]?.(item.icon?.width)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
