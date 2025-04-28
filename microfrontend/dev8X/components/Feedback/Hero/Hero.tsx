// import { Menu, Transition } from '@headlessui/react';
// import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
// import { Bars2Icon, Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
// import { classNames } from '../../../utils/helpers';

import styles from './index.module.css';

const Hero = () => {
  return (
    <>
      <div className={styles['homepage__hero']}>
        <h1 className={styles['homepage__heading']}>
          <span className="block lg:inline-block ">
            Solutions
            <br /> Made Simple.
          </span>
        </h1>
      </div>
    </>
  );
};

export default Hero;
