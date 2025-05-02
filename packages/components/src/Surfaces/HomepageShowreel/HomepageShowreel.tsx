import React, { CSSProperties } from 'react';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

type HomepageShowreelProps = {
  homepageShowreelCSSClass: string;
};

export const HomepageShowreel: React.FC<HomepageShowreelProps> = ({ homepageShowreelCSSClass }: HomepageShowreelProps): JSX.Element => {
  return (
    <>
      <div></div>
      <div className={`${styles['showreel-wrapper']} ${homepageShowreelCSSClass}`}>
        <div id="showreel" className={styles['showreel']} style={{ '--progress': 0, transform: 'translateY(0vh) translateZ(0px)' } as CSSProperties}>
          <div id="showreel-inner" className={styles['showreel__inner']} style={{ borderRadius: '30px', transform: 'none', transformOrigin: '50% 50% 0px' }}>
            <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['showreel__image']}`}>
              <source className={styles['picture']} srcSet="/images/header/1080.png 1x, /images/header/1080.png 2x" media="(min-width: 0px) and (max-width: 479px)" />
              <source className={styles['picture']} srcSet="/images/header/1080.png 1x, /images/header/1080.png 2x" media="(min-width: 480px)" />
              <img src="/images/header/1080.png" loading="eager" width="450" height="364" alt="" className="" draggable="false" />
            </picture>
            <video className={`${styles['showreel__video']} ${styles['showreel__video--desktop']}`} src="/videos/header/header.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};
