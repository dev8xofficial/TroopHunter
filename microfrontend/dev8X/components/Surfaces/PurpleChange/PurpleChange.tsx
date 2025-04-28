// import { Menu, Transition } from '@headlessui/react';
// import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
// import { Bars2Icon, Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
// import { classNames } from '../../../utils/helpers';

import styles from './index.module.css';
import homepageStyles from '../../../pages/index.module.css';

const PurpleChange = () => {
  return (
    <>
      <div className={styles['purple-change']}>
        <div></div>
        <div className={`${styles['showreel-wrapper']} ${homepageStyles['homepage__showreel']}`}>
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

export default PurpleChange;
