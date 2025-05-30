import React, { ReactNode } from 'react';
import { WorkCard } from '../WorkCard/WorkCard';
import { WORK_PROJECTS_GRID_DATA } from '../../Constants/Work/WorkProjects';
import { WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';

import styles from './index.module.css';

type WorkGridRowProps = {
  children: ReactNode;
};

type WorkGridProps = {
  workGridCSSClass: string;
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

export const WorkGrid: React.FC<WorkGridProps> = ({ workGridCSSClass, openModal }: WorkGridProps): JSX.Element => {
  return (
    <>
      <div className={`${styles['work-grid']} ${workGridCSSClass}`}>
        {WORK_PROJECTS_GRID_DATA.map((work: WorkGridCard, index) => {
          if (Array.isArray(work)) {
            work.map((item, index) => (
              <WorkGridRowPortrait key={`portrait-card-${index}`}>
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
