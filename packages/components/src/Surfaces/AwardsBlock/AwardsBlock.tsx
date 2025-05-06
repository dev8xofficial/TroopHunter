/* eslint-disable prettier/prettier */
import React, { CSSProperties, ReactNode } from 'react';
import { LogoGrid } from '../LogoGrid/LogoGrid';
import { Button } from '../Button/Button';

import ButtonStyles from '../Button/index.module.css';
import styles from './index.module.css';

type AwardsBlockProps = {
  children: ReactNode;
  variant: 'Stack' | 'Card';
  index?: number;
};

export const AwardsBlock: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={styles['awards-block']}>
        <h2 className={styles['awards-block__intro']} aria-label="80+ awards globally and continually recognised by the best of the best.">
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            80+{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            awards{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            globally{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            and{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            continually{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            recognised{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            by{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            the{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            best{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            of{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            the{' '}
          </span>
          <span className="TextAnimateUp_word__Yvn5A" aria-hidden="true">
            best.
          </span>
        </h2>
        <LogoGrid />
        <div>
          <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
            <Button iconType="i" icon={<i className="fa fa-plus" />} bgClass={ButtonStyles['button--bg-white']}>
              See all awards
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
