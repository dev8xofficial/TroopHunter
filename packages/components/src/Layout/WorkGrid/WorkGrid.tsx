'use client';

import React, { ReactNode } from 'react';
import { WorkCard } from '../../Surfaces/WorkCard/WorkCard';
import { WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';

import styles from './index.module.css';

type WorkGridRowProps = {
  children: ReactNode;
};

type WorkGridProps = {
  workGridCSSClass: string;
  workProjects: WorkGridCard[];
  openModal?: (slug: string) => void;
};

export const WorkGridRowLandscape: React.FC<WorkGridRowProps> = ({ children }: WorkGridRowProps): JSX.Element => {
  return (
    <>
      <div className={`${styles['work-grid__row']} ${styles['work-grid__row--landscape']}`}>{children}</div>
    </>
  );
};

export const WorkGridRowPortrait: React.FC<WorkGridRowProps> = ({ children }: WorkGridRowProps): JSX.Element => {
  return (
    <>
      <div className={`${styles['work-grid__row']} ${styles['work-grid__row--portrait']}`}>{children}</div>
    </>
  );
};

export const WorkGrid: React.FC<WorkGridProps> = ({ workGridCSSClass, workProjects, openModal }: WorkGridProps): JSX.Element => {
  return (
    <>
      <div className={`${styles['work-grid']} ${workGridCSSClass}`}>
        {workProjects.map((work: WorkGridCard, index) => {
          if (Array.isArray(work)) {
            return work.map((item, itemIndex) => (
              <WorkGridRowPortrait key={`portrait-card-${index}-${itemIndex}`}>
                <WorkCard variant={item.variant} space={item.space} bgColor={item.bgColor} title={item.title} image="" placeholderImage={item.placeholderImage} video={item.video} path={item.path} openModal={openModal} />
              </WorkGridRowPortrait>
            ));
          } else {
            return (
              <WorkGridRowLandscape key={`landscape-${index}`}>
                <WorkCard variant={work.variant} space={work.space} bgColor={work.bgColor} title={work.title} image="" placeholderImage={work.placeholderImage} video={work.video} path={work.path} openModal={openModal} />
              </WorkGridRowLandscape>
            );
          }
        })}
      </div>
    </>
  );
};
