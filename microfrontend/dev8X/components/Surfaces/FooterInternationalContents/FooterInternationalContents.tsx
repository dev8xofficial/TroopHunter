import React from 'react';

import styles from './index.module.css';
import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import ButtonStyles from '../Button/index.module.css';

export const FooterInternationalContents: React.FC = (): JSX.Element => {
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
              Submit a brief
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
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="63" height="8" fill="none" viewBox="0 0 125 16" className="" style={{ '--width': 63, '--height': 8 } as React.CSSProperties}>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M65.515 6.047v9.202c0 .196-.16.354-.358.354H62.5a.357.357 0 0 1-.36-.354V7.143c0-2.556-1.332-3.985-3.58-3.985-2.168 0-3.983 1.413-3.983 4.016v8.075c0 .196-.16.354-.358.354h-2.656a.356.356 0 0 1-.358-.354V7.143c0-2.556-1.333-3.985-3.582-3.985-2.167 0-3.983 1.413-3.983 4.016v8.075c0 .196-.16.354-.358.354h-2.656a.356.356 0 0 1-.358-.354V.75c0-.196.16-.354.358-.354h2.624c.198 0 .359.158.359.354v1.502C44.846.46 46.757 0 48.332 0c2.148 0 3.934.866 5.033 2.307.145.19.434.163.578-.029C55.312.466 57.49 0 59.267 0c3.662 0 6.248 2.492 6.248 6.047ZM28.036 16c3.597 0 7.13-2 7.13-6.842V.75a.356.356 0 0 0-.358-.354h-2.656a.356.356 0 0 0-.358.354v8.107c0 2.937-1.654 4.015-3.758 4.015s-3.758-1.078-3.758-4.015V.751a.356.356 0 0 0-.359-.354h-2.655a.356.356 0 0 0-.358.354v8.407C20.906 14 24.422 16 28.036 16ZM11.4 6.681h-7.41a.356.356 0 0 1-.359-.355V.876a.356.356 0 0 0-.358-.354H.359A.356.356 0 0 0 0 .876v14.373a.357.357 0 0 0 .359.355h2.913a.356.356 0 0 0 .358-.354v-4.816a.356.356 0 0 1 .358-.355h7.41a.357.357 0 0 1 .359.355v4.816a.356.356 0 0 0 .358.354h2.913a.356.356 0 0 0 .358-.354V.876a.356.356 0 0 0-.358-.354h-2.913a.356.356 0 0 0-.358.355v5.45a.355.355 0 0 1-.358.354ZM83.709.39H82.3c-.08 0-.14.03-.19.08-.05.05-.08.12-.08.19v1.57a5.68 5.68 0 0 0-2-1.62C79.23.22 78.29 0 77.19 0c-2.15 0-4.07.83-5.46 2.25-1.38 1.42-2.23 3.42-2.23 5.74 0 4.66 3.39 8 7.69 8 1.1 0 2.04-.21 2.84-.6.81-.39 1.47-.94 2-1.62v1.56c0 .15.12.27.27.27H85.11c.08 0 .15-.03.2-.08.04-.05.07-.11.07-.19V.66c0-.15-.12-.27-.27-.27h-1.4Zm-1.6 8.83c-.47 2.15-2.16 3.65-4.51 3.65-2.9 0-4.65-2.21-4.65-4.88 0-2.66 1.75-4.87 4.65-4.87 2.25 0 3.9 1.38 4.44 3.38.13.47.2.97.2 1.49 0 .43-.05.84-.13 1.23ZM92.998 8c0 2.666 1.751 4.873 4.642 4.873 2.778 0 4.64-2.095 4.64-4.873s-1.862-4.873-4.64-4.873c-2.89 0-4.642 2.206-4.642 4.873Zm12.072 7.603h-2.64a.352.352 0 0 1-.252-.103.354.354 0 0 1-.106-.251v-1.471c-1.06 1.349-2.65 2.222-4.834 2.222-4.304 0-7.692-3.35-7.692-8 0-4.651 3.388-8 7.692-8 2.184 0 3.775.889 4.834 2.238V.751c0-.196.16-.354.359-.354h2.639c.198 0 .359.158.359.354V15.25c0 .195-.16.354-.36.354l.001-.001ZM125 15.249V6.047C125 2.492 122.414 0 118.753 0c-1.573 0-3.485.46-4.722 2.252V.75a.356.356 0 0 0-.358-.354h-2.624a.356.356 0 0 0-.358.354v14.499a.357.357 0 0 0 .358.354h2.655c.199 0 .36-.158.36-.354V7.174c0-2.603 1.814-4.016 3.983-4.016 2.247 0 3.58 1.429 3.58 3.985v8.106c.001.047.01.093.028.136a.36.36 0 0 0 .331.218h2.655a.356.356 0 0 0 .359-.354Z"
              clipRule="evenodd"
            ></path>
          </svg> */}
          <img className="mx-auto h-4 lg:h-5" src="/logo.png" alt="Dev8X" style={{ '--width': 63, '--height': 8 } as React.CSSProperties} />
          <span>
            © 2025 <a href="/privacy">Privacy</a>
          </span>
        </div>
        <ul className={styles['footer-socials']}>
          <li className={styles['footer-socials__item']}>
            <a className={ButtonStyles['button-wrapper']} target="_blank" href="https://x.com/dev8x">
              <span className={`${ButtonStyles['button']} ${ButtonStyles['button--bg-transparent']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                <span>
                  <s>Twitter</s> X
                </span>
              </span>
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14" className={styles['footer-socials__separator']} style={{ '--width': 13, '--height': 14 } as React.CSSProperties}>
              <path fill="currentColor" fillRule="evenodd" d="M7.121.87H5.874v4.123L2.96 2.078l-.882.882 2.92 2.919H.864v1.247h4.133l-2.919 2.919.882.882 2.913-2.913v4.122h1.247V8.004l2.923 2.923.882-.882-2.919-2.919h4.125V5.88H8.009l2.919-2.919-.882-.882-2.925 2.925V.869Z" clipRule="evenodd"></path>
            </svg>
          </li>
          <li className={styles['footer-socials__item']}>
            <a className={ButtonStyles['button-wrapper']} target="_blank" href="https://instagram.com/dev8x">
              <span className={`${ButtonStyles['button']} ${ButtonStyles['button--bg-transparent']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                <span>Instagram</span>
              </span>
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14" className={styles['footer-socials__separator']} style={{ '--width': 13, '--height': 14 } as React.CSSProperties}>
              <path fill="currentColor" fillRule="evenodd" d="M7.121.87H5.874v4.123L2.96 2.078l-.882.882 2.92 2.919H.864v1.247h4.133l-2.919 2.919.882.882 2.913-2.913v4.122h1.247V8.004l2.923 2.923.882-.882-2.919-2.919h4.125V5.88H8.009l2.919-2.919-.882-.882-2.925 2.925V.869Z" clipRule="evenodd"></path>
            </svg>
          </li>
          <li className={styles['footer-socials__item']}>
            <a className={ButtonStyles['button-wrapper']} target="_blank" href="https://www.linkedin.com/company/dev8x/posts/">
              <span className={`${ButtonStyles['button']} ${ButtonStyles['button--bg-transparent']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                <span>LinkedIn</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
