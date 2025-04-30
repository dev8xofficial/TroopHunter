import React from 'react';

import styles from './index.module.css';

type PurpleChangeProps = {
  purpleChangeCSSClass: string;
};

export const PurpleChange: React.FC<PurpleChangeProps> = ({ purpleChangeCSSClass }: PurpleChangeProps): JSX.Element => {
  return (
    <>
      <div className={styles['purple-change']}>
        <div></div>
        <div className={`${styles['showreel-wrapper']} ${purpleChangeCSSClass}`}>
          <div className={styles['showreel']}>
            <div className={styles['showreel__inner']}>
              <picture className={`${styles['picture']} ${styles['picture--responsive']} ${styles['showreel__image']}`}>
                <source className={styles['picture']} srcSet="/images/header/1080.png 1x, /images/header/1080.png 2x" media="(min-width: 0px) and (max-width: 479px)" />
                <source className={styles['picture']} srcSet="/images/header/1080.png 1x, /images/header/1080.png 2x" media="(min-width: 480px)" />
                <img src="/images/header/1080.png" loading="eager" width="450" height="364" alt="" className="" draggable="false" />
              </picture>
              <video className={`${styles['showreel__video']} ${styles['showreel__video--desktop']}`} src="/videos/header/header.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
