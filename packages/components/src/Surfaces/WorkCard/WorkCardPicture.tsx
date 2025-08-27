// WorkCardPicture.tsx
import React from 'react';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

interface WorkCardPictureProps {
  backgroundImage: string;
  placeholderImage: string;
  variant?: 'landscape' | 'portrait';
  space?: 'inner' | 'outer';
}

export const WorkCardPicture: React.FC<WorkCardPictureProps> = ({ backgroundImage, placeholderImage, variant, space }) => {
  const imageSrc = backgroundImage || placeholderImage;
  console.log('WorkCardPicture: ', backgroundImage, placeholderImage);
  const landscapeOuterSources = (
    <>
      <source srcSet={`${imageSrc}/m/450x330/filters:quality(80) 1x, ${imageSrc}/m/900x660/filters:quality(80) 2x`} media="(max-width: 479px)" />
      <source srcSet={`${imageSrc}/m/932x685/filters:quality(80) 1x, ${imageSrc}/m/1864x1370/filters:quality(80) 2x`} media="(max-width: 991px)" />
      <source srcSet={`${imageSrc}/m/1452x1068/filters:quality(80) 1x, ${imageSrc}/m/2904x2136/filters:quality(80) 2x`} media="(max-width: 1512px)" />
      <source srcSet={`${imageSrc}/m/1905x1402/filters:quality(80) 1x, ${imageSrc}/m/3810x2804/filters:quality(80) 2x`} media="(min-width: 1513px)" />
      <img src={`${imageSrc}`} loading="lazy" width="450" height="330" alt="" draggable="false" />
    </>
  );

  const portraitOuterSources = (
    <>
      <source srcSet={`${imageSrc}/m/450x677/filters:quality(80) 1x, ${imageSrc}/m/900x1354/filters:quality(80) 2x`} media="(max-width: 479px)" />
      <source srcSet={`${imageSrc}/m/932x1402/filters:quality(80) 1x, ${imageSrc}/m/1864x2804/filters:quality(80) 2x`} media="(max-width: 991px)" />
      <source srcSet={`${imageSrc}/m/710x1068/filters:quality(80) 1x, ${imageSrc}/m/1420x2136/filters:quality(80) 2x`} media="(max-width: 1512px)" />
      <source srcSet={`${imageSrc}/m/933x1403/filters:quality(80) 1x, ${imageSrc}/m/1866x2806/filters:quality(80) 2x`} media="(min-width: 1513px)" />
      <img src={`${imageSrc}/m/450x677/filters:quality(80)`} loading="lazy" width="450" height="677" alt="" draggable="false" />
    </>
  );

  const landscapeInnerSources = (
    <>
      <source srcSet={`${imageSrc}/m/312x178/filters:quality(80) 1x, ${imageSrc}/m/624x356/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
      <source srcSet={`${imageSrc}/m/647x370/filters:quality(80) 1x, ${imageSrc}/m/1294x740/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
      <source srcSet={`${imageSrc}/m/1008x576/filters:quality(80) 1x, ${imageSrc}/m/2016x1152/filters:quality(80) 2x`} media="(min-width: 992px) and (max-width: 1512px)" />
      <source srcSet={`${imageSrc}/m/1322x755/filters:quality(80) 1x, ${imageSrc}/m/2644x1510/filters:quality(80) 2x`} media="(min-width: 1513px)" />
      <img src={`${imageSrc}/m/312x178/filters:quality(80)`} loading="lazy" width="312" height="178" alt="" className="" draggable="false" />
    </>
  );

  const portraitInnerSources = (
    <>
      <source srcSet={`${imageSrc}/m/171x369/filters:quality(80) 1x, ${imageSrc}/m/342x738/filters:quality(80) 2x`} media="(max-width: 479px)" />
      <source srcSet={`${imageSrc}/m/355x765/filters:quality(80) 1x, ${imageSrc}/m/710x1530/filters:quality(80) 2x`} media="(max-width: 991px)" />
      <source srcSet={`${imageSrc}/m/270x582/filters:quality(80) 1x, ${imageSrc}/m/540x1164/filters:quality(80) 2x`} media="(max-width: 1512px)" />
      <source srcSet={`${imageSrc}/m/355x765/filters:quality(80) 1x, ${imageSrc}/m/710x1530/filters:quality(80) 2x`} media="(min-width: 1513px)" />
      <img src={`${imageSrc}/m/171x369/filters:quality(80)`} loading="lazy" width="450" height="677" alt="" draggable="false" />
    </>
  );

  return (
    <picture className={`${PictureStyles['picture']} ${styles['work-card__picture']}`} style={{ height: '100%' }}>
      {space === 'outer' ? (variant === 'landscape' ? landscapeOuterSources : portraitOuterSources) : variant === 'landscape' ? landscapeInnerSources : portraitInnerSources}
    </picture>
  );
};
