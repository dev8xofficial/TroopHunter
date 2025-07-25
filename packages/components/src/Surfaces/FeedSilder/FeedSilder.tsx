import React from 'react';
import { ExpertiseContent } from '../../Interfaces/Expertise/Expertise';

import PictureStyles from '../Picture/index.module.css';
import ButtonStyle from '../../Input/Button/index.module.css';

import styles from './index.module.css';

export const FeedSlider: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={`${styles['feed']} homepage__feed`} data-new-theme="false">
        <h2 className={styles['feed__heading']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          Offers
        </h2>

        <div
          className={styles['feed__inner']}
          draggable={false}
          style={{
            userSelect: 'none',
            touchAction: 'pan-y',
            transform: 'translateX(15px) translateY(0px) translateZ(0px)'
          }}
        >
          {/* ITEM 1 */}
          <article className={styles['feed__shrink-drag']}>
            <div className={styles['feed__item']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
              <div className={styles['feed__image']}>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['feed__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/770x1000/2ef84dad83/surveillance-watch.jpg/m/300x390/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/770x1000/2ef84dad83/surveillance-watch.jpg/m/600x780/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 1511px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/770x1000/2ef84dad83/surveillance-watch.jpg/m/385x500/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/770x1000/2ef84dad83/surveillance-watch.jpg/m/770x1000/filters:quality(80) 2x" media="(min-width: 1512px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/770x1000/2ef84dad83/surveillance-watch.jpg/m/300x390/filters:quality(80)" loading="eager" width="300" height="390" alt="Surveillance Watch Preview" draggable={false} />
                </picture>
                <span className={styles['feed__tag']} style={{ backgroundColor: 'rgb(27, 34, 55)', color: 'white' }}>
                  Site Launch
                </span>
              </div>

              <span className={styles['feed__date']}>28.08.24</span>

              <div className={styles['feed__content']}>
                <h3 className={styles['feed__title']}>Surveillance Watch:</h3>
                An interactive data visualisation highlighting global surveillance connections
              </div>

              <a className={`${ButtonStyle['button-wrapper']}`} target="_blank" href="https://www.surveillancewatch.io/" rel="noopener noreferrer">
                <span
                  className={`${ButtonStyle['button']} ${ButtonStyle['button--bg-transparent']} ${styles['feed__link']}`}
                  style={{
                    transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)'
                  }}
                >
                  Explore
                </span>
              </a>
            </div>
          </article>

          {/* ITEM 2 */}
          <article className={styles['feed__shrink-drag']}>
            <div className={styles['feed__item']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
              <div className={styles['feed__image']}>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['feed__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/770x1000/2b0e547469/unearthed.jpg/m/300x390/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/770x1000/2b0e547469/unearthed.jpg/m/600x780/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 1511px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/770x1000/2b0e547469/unearthed.jpg/m/385x500/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/770x1000/2b0e547469/unearthed.jpg/m/770x1000/filters:quality(80) 2x" media="(min-width: 1512px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/770x1000/2b0e547469/unearthed.jpg/m/300x390/filters:quality(80)" loading="eager" width="300" height="390" alt="Unearthed Preview" draggable={false} />
                </picture>
                <span className={styles['feed__tag']} style={{ backgroundColor: 'rgb(246, 135, 56)', color: 'white' }}>
                  Site Launch
                </span>
              </div>

              <span className={styles['feed__date']}>30.07.24</span>

              <div className={styles['feed__content']}>
                <h3 className={styles['feed__title']}>Unearthed:</h3>
                An all new website to showcase the team's expertise across innovation in the resources.
              </div>

              <a className={`${ButtonStyle['button-wrapper']}`} target="_blank" href="" rel="noopener noreferrer">
                <span
                  className={`${ButtonStyle['button']} ${ButtonStyle['button--bg-transparent']} ${styles['feed__link']}`}
                  style={{
                    transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)'
                  }}
                >
                  Check it out
                </span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};
