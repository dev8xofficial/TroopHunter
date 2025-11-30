'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ICON_MAP } from '../IconCards/IconMap';
import { ExpertiseFooterSocialLink, FooterInternationalContent } from '../../Interfaces/PageLayout/PageLayout';
import RightArrowIcon from '../../Icons/RightArrow';
import { isHelloabdulPort } from '../../../utils/helpers';

import ContactFormModalStyles from '../../Modals/ContactFormModal/index.module.css';
import ButtonStyles from '../../Input/Button/index.module.css';
import styles from './index.module.css';
import { Magnet } from '../../Animations/Magnet';

type FooterInternationalContentsProps = {
  footerSocialLinks: ExpertiseFooterSocialLink[];
  footerData: FooterInternationalContent;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const FooterInternationalContents: React.FC<FooterInternationalContentsProps> = ({ footerSocialLinks, footerData, onClick }): JSX.Element => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isHelloabdul, setIsHelloabdul] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsHelloabdul(isHelloabdulPort());
  }, []);

  return (
    <>
      <div className={`${styles['footer-columns']} footer-columns`}>
        <div className={`${styles['footer-columns__column']} ${styles['footer-columns__column--initial']}`}>
          <div className={styles['footer-columns__globally']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" style={{ '--width': 16, '--height': 16 } as React.CSSProperties}>
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.64" d="M.8 8a7.2 7.2 0 1 0 14.4 0A7.2 7.2 0 0 0 .8 8Z" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.64" d="M6.643 15.072c-1.005-1.408-1.683-4.051-1.683-7.04S5.638 2.336 6.643.96M9.357 15.072c1.005-1.408 1.683-4.051 1.683-7.04S10.362 2.336 9.357.96M.8 8h14.4M1.632 11.36h12.736M1.632 4.64h12.736" />
            </svg>
            <h3>{footerData.global.heading}</h3>
          </div>

          {!currentPath.startsWith('/contact') && (
            <div>
              <button className={`${ContactFormModalStyles['contact-form-button']} ${styles['footer-contact-button']}`} data-international-footer-cta="true" data-faitracker-form-bind="true" onClick={onClick}>
                {footerData.global.buttonText}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" style={{ '--width': 12, '--height': 13 } as React.CSSProperties}>
                  <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke" />
                </svg>
              </button>
            </div>
          )}

          <a href="mailto:contact@dev8x.com">{footerData.global.email}</a>
        </div>

        {footerData.offices &&
          footerData.offices.map((office, index) => (
            <div key={index} className={`${styles['footer-columns__column']} ${styles['footer-columns__column--address']}`}>
              <h3>{office.country}</h3>
              <address>{office.city}</address>
              <a href={`tel:${office.phone}`} className={styles['footer-columns__column--email']}>
                {office.phone}
              </a>
            </div>
          ))}

        {footerData.careers && (
          <div className={`${styles['footer-columns__column']} ${styles['footer-columns__column--address']}`}>
            <h3>{footerData.careers.heading}</h3>
            <address>{footerData.careers.description}</address>
            <a href={footerData.careers.link} className={styles['footer-columns__column--email']} target="_blank">
              {footerData.careers.linkText} <RightArrowIcon size={14} className={styles['arrow']} />
            </a>
          </div>
        )}
      </div>

      <div className={`${styles['footer-bottom']} footer-bottom`}>
        <div className={styles['footer-legal']}>
          {/* Logo SVG - Dynamic based on base URL */}
          <img width="60" src="/logo.svg" />
          <span>
            © {footerData.copyright.year} <a href={footerData.copyright.privacyLink}>{footerData.copyright.text}</a>
          </span>
        </div>

        <ul className={styles['footer-socials']}>
          {footerSocialLinks?.map((item, index) => (
            <li className={styles['footer-socials__item']} key={index}>
              <Magnet>
                <a className={ButtonStyles['button-wrapper']} target="_blank" href={item.href}>
                  <span className={`${ButtonStyles['button']} ${ButtonStyles['button--bg-transparent']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                    <span>{item.title}</span>
                  </span>
                </a>
              </Magnet>
              {ICON_MAP[item.icon?.name]?.(item.icon?.size)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
