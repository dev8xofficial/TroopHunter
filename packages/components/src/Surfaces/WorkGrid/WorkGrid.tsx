import React, { ReactNode } from 'react';
import { WorkCard } from '../WorkCard/WorkCard';

import styles from './index.module.css';

type WorkGridRowProps = {
  children: ReactNode;
};

type CommonWorkCardProps = {
  space: 'inner' | 'outer';
  bgColor: string;
  name: string;
  image: string;
  video: string;
  href: string;
};

type LandscapeWorkCardProps = CommonWorkCardProps & {
  variant: 'landscape';
};

type PortraitWorkCardProps = CommonWorkCardProps & {
  variant: 'portrait';
};

type WorkGridDataProps = {
  landscape: LandscapeWorkCardProps[];
  portrait: PortraitWorkCardProps[];
};

type WorkGridProps = {
  workGridCSSClass: string;
  // workGridData: WorkGridDataProps;
  openModal?: (slug: string) => void;
};

const workGridData = {
  landscape: [
    {
      variant: 'landscape',
      space: 'inner',
      bgColor: 'cyan',
      name: 'Total Health Dental Care',
      image: '/images/placeholder/1080.png',
      video: '/videos/work/crm.mp4',
      href: 'crm'
    },
    {
      variant: 'landscape',
      space: 'inner',
      bgColor: 'green',
      name: 'Honeydu',
      image: '/images/placeholder/1080.png',
      video: '/videos/work/honeydu.mp4',
      href: 'honeydu'
    },
    {
      variant: 'landscape',
      space: 'inner',
      bgColor: 'blue',
      name: 'Coral',
      image: '/images/placeholder/1080.png',
      video: '/videos/work/coral.mp4',
      href: 'coral'
    },
    {
      variant: 'landscape',
      space: 'inner',
      bgColor: 'yellow',
      name: 'Golden Dao',
      image: '/images/placeholder/1080.png',
      video: '/videos/work/golden-dao.mp4',
      href: 'golden-dao'
    }
  ],
  portrait: [
    {
      variant: 'portrait',
      space: 'inner',
      name: 'Total Health Dental Care',
      image: '/images/placeholder/1080.png',
      video: '/videos/work/crm.mp4',
      href: 'crm'
    },
    {
      variant: 'portrait',
      space: 'inner',
      bgColor: 'cyan',
      name: 'Golden Dao',
      image: '/images/placeholder/1080.png',
      video: '/videos/work/golden-dao.mp4',
      href: 'crm'
    }
  ]
} as const;

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
        {workGridData.landscape.map((item, index) => (
          <WorkGridRowLandscape key={`landscape-${index}`}>
            <WorkCard variant={item.variant} space={item.space} bgColor={item.bgColor} name={item.name} image={item.image} video={item.video} href={item.href} openModal={openModal} />
          </WorkGridRowLandscape>
        ))}
        {/* <WorkGridRowPortrait>
          {workGridData.portrait.map((item, index) => (
            <WorkCard variant={item.variant} space={item.space} bgColor={item.bgColor} name={item.name} image={item.image} video={item.video} href={item.href} openModal={openModal} />
          ))}
        </WorkGridRowPortrait> */}
      </div>
    </>
  );
};
