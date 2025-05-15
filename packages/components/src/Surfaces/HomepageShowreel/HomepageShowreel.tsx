import React, { CSSProperties, ReactNode } from 'react';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

type HomepageShowreelProps = {
  children?: ReactNode;
  homepageShowreelCSSClass: string;
  src: string;
  isMobile: boolean;
};

export const HomepageShowreel: React.FC<HomepageShowreelProps> = ({ children, homepageShowreelCSSClass, src, isMobile }: HomepageShowreelProps): JSX.Element => {
  return (
    <>
      <div></div>
      <div className={`${styles['showreel-wrapper']} ${homepageShowreelCSSClass}`}>
        <div id="showreel" className={styles['showreel']} style={{ '--progress': 0, transform: 'translateY(0vh) translateZ(0px)' } as CSSProperties}>
          <div id="showreel-inner" className={styles['showreel__inner']} style={{ borderRadius: '30px', transform: 'none', transformOrigin: '50% 50% 0px' }}>
            {children ? (
              children
            ) : (
              <>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['showreel__image']}`}>
                  <source className={styles['picture']} srcSet="/images/header/1080.png 1x, /images/header/1080.png 2x" media="(min-width: 0px) and (max-width: 479px)" />
                  <source className={styles['picture']} srcSet="/images/header/1080.png 1x, /images/header/1080.png 2x" media="(min-width: 480px)" />
                  <img src="/images/header/1080.png" loading="eager" width="450" height="364" alt="" className="" draggable="false" />
                </picture>
                <video className={`${styles['showreel__video']} ${isMobile ? styles['showreel__video--mobile'] : styles['showreel__video--desktop']}`} src={src} preload="none" loop controls={false} autoPlay muted playsInline></video>
              </>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};
