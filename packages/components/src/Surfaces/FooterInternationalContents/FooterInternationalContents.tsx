import React from 'react';
import { FooterForm, FooterSocialLinks } from '../Footer/Footer';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import ButtonStyles from '../Button/index.module.css';
import styles from './index.module.css';

type FooterInternationalContentsProps = {
  footerForm: FooterForm;
  footerSocialLinks: FooterSocialLinks[];
};

export const FooterInternationalContents: React.FC<FooterInternationalContentsProps> = ({ footerForm, footerSocialLinks }): JSX.Element => {
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
            <button className={`${ContactFormModalStyles['contact-form-button']} ${styles['footer-contact-button']}`} data-international-footer-cta="true" data-faitracker-form-bind="true">
              {footerForm.button.text}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" className="" style={{ '--width': 12, '--height': 13 } as React.CSSProperties}>
                <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </button>
          </div>
          <a href="mailto:contact@dev8x.com">contact@dev8x.com</a>
        </div>
      </div>
      <div className={`${styles['footer-bottom']} footer-bottom`}>
        <div className={styles['footer-legal']}>
          <img src="/logo.png" alt="Dev8X" style={{ '--width': 63, '--height': 8, height: '24px' } as React.CSSProperties} />
          <span>
            © {footerForm.privacy.year} <a href="/privacy">{footerForm.privacy.text}</a>
          </span>
        </div>
        <ul className={styles['footer-socials']}>
          {footerSocialLinks.map((item, index) => (
            <li className={styles['footer-socials__item']} key={index}>
              <a className={ButtonStyles['button-wrapper']} target="_blank" href={item.href}>
                <span className={`${ButtonStyles['button']} ${ButtonStyles['button--bg-transparent']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <span>{item.title}</span>
                </span>
              </a>
              {item.icon}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
