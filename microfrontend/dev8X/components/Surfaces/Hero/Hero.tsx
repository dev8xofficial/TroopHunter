import React from 'react';
import Appear from '@repo/components/src/Animations/Appear';
import styles from './index.module.css';

const Hero = () => {
  return (
    <div className={styles['homepage__hero']}>
      <Appear delay={0.2}> 
        <h1 className={styles['homepage__heading']}>
          <span className="block lg:inline-block">
            Solutions
            <br /> Made Simple.
          </span>
        </h1>
      </Appear>
    </div>
  );
};

export default Hero;
