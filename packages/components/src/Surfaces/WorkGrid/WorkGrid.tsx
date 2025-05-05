import React, { ReactNode } from 'react';
import { WorkCard } from '../WorkCard/WorkCard';

import styles from './index.module.css';

type WorkGridRowProps = {
  children: ReactNode;
};

type WorkGridProps = {
  workGridCSSClass: string;
};

const portfolio = {
  thdc: {
    name: 'Total Health Dental Care',
    image: '/images/placeholder/1080.png',
    video: '/videos/work/crm.mp4'
  },
  honeydu: {
    name: 'Honeydu',
    image: '/images/placeholder/1080.png',
    video: '/videos/work/honeydu.mp4'
  },
  coral: {
    name: 'Coral',
    image: '/images/placeholder/1080.png',
    video: '/videos/work/coral.mp4'
  },
  goldenDao: {
    name: 'Golden Dao',
    image: '/images/placeholder/1080.png',
    video: '/videos/work/golden-dao.mp4'
  }
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

export const WorkGrid: React.FC<WorkGridProps> = ({ workGridCSSClass }: WorkGridProps): JSX.Element => {
  return (
    <>
      <div className={`${styles['work-grid']} ${workGridCSSClass}`}>
        <WorkGridRowLandscape>
          <WorkCard variant="landscape" space="inner" bgColor="cyan" name={portfolio['thdc'].name} image={portfolio['thdc'].image} video={portfolio['thdc'].video} />
        </WorkGridRowLandscape>
        <WorkGridRowLandscape>
          <WorkCard variant="landscape" space="inner" bgColor="green" name={portfolio['honeydu'].name} image={portfolio['honeydu'].image} video={portfolio['honeydu'].video} />
        </WorkGridRowLandscape>
        <WorkGridRowLandscape>
          <WorkCard variant="landscape" space="inner" bgColor="blue" name={portfolio['coral'].name} image={portfolio['coral'].image} video={portfolio['coral'].video} />
        </WorkGridRowLandscape>
        <WorkGridRowLandscape>
          <WorkCard variant="landscape" space="inner" bgColor="yellow" name={portfolio['goldenDao'].name} image={portfolio['goldenDao'].image} video={portfolio['goldenDao'].video} />
        </WorkGridRowLandscape>
        {/* <WorkGridRowPortrait>
          <WorkCard variant="portrait" space="inner" name={portfolio['thdc'].name} image={portfolio['thdc'].image} video={portfolio['thdc'].video} />
          <WorkCard variant="portrait" space="inner" name={portfolio['goldenDao'].name} image={portfolio['goldenDao'].image} video={portfolio['goldenDao'].video} />
        </WorkGridRowPortrait> */}
      </div>
    </>
  );
};
