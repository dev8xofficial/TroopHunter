import React from 'react';

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
