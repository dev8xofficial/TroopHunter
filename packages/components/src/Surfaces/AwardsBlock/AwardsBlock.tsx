import React, { CSSProperties } from 'react';
import { LogoGrid } from '../../Layout/LogoGrid/LogoGrid';
// import { Button } from '../Button/Button';
// import CrossIcon from '../../Icons/Cross';

import styles from './index.module.css';

export const AwardsBlock: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={styles['awards-block']}>
        <h2 className={styles['awards-block__intro']} aria-label="80+ awards globally and continually recognised by the best of the best.">
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            Since{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            2019,{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            Dev8X{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            has been{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            partnering{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            with{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            leading{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            brands{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            to{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            deliver{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            meaningful{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            impact{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            through{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            thoughtful{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            digital{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            experiences.{' '}
          </span>
        </h2>
        <LogoGrid />
        {/* <div>
          <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
            <Button
              variant="white"
              startIcon={
                <i className={styles['awards-block__button-icon']} style={{ '--icon-color': 'var(--theme-primary)' } as CSSProperties}>
                  <CrossIcon width="14" />
                </i>
              }
            >
              See all awards
            </Button>
          </div>
        </div> */}
      </div>
    </>
  );
};
