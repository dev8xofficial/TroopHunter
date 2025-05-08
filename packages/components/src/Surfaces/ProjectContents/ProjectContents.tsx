/* eslint-disable prettier/prettier */
import React from 'react';
import styles from './index.module.css';
import PictureStyles from '../Picture/index.module.css';
import TextAnimateStyles from '../TextAnimateUp/index.module.css';

import { CaseStudySideBar } from '../CaseStudySidebar/CaseStudySidebar';
import { TestimonialSlider } from '../TestimonialSlider/TestimonialSlider';

export const ProjectsFormModal: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={`${styles['project-content']} project-content}`}>
        <div className={styles['project-content__body']}>
          <CaseStudySideBar />
          <div className={styles['project-content__blocks']}>
            <div className={styles['project-content__block-image']}>
              <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <video className={styles['project-content__video']} autoPlay playsInline loop preload="none" src="https://player.vimeo.com/progressive_redirect/playback/745004855/rendition/720p/file.mp4?loc=external&amp;signature=1dd35b7b1001be056347f1aa639461cf56f40fc35b3f0ad75170809e8ca7d4e4" aria-describedby="video-description-0-0"></video>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/460x284/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/920x568/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/940x580/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/1880x1160/filters:quality(80) 2x" media="(min-width: 480px) and (max-width: 1512px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/1260x777/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/2520x1554/filters:quality(80) 2x" media="(min-width: 1513px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/460x284/filters:quality(80)" loading="eager" width="460" height="284" alt="" className="" draggable="false" />
                </picture>
              </div>
            </div>
            <div className={styles['project-content__block-image']}>
              <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/460x580/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/920x1160/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 1512px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/616x777/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/1232x1554/filters:quality(80) 2x" media="(min-width: 1513px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/460x580/filters:quality(80)" loading="eager" width="460" height="580" alt="" className="" draggable="false" />
                </picture>
              </div>
              <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/460x580/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/920x1160/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 1512px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/616x777/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/1232x1554/filters:quality(80) 2x" media="(min-width: 1513px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/460x580/filters:quality(80)" loading="eager" width="460" height="580" alt="" className="" draggable="false" />
                </picture>
              </div>
            </div>
            <div className={styles['project-content__block-image']}>
              <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <video className={styles['project-content__video']} autoPlay playsInline loop preload="none" src="https://player.vimeo.com/progressive_redirect/playback/759804705/rendition/720p/file.mp4?loc=external&log_user=0&signature=e183b012e9a5b0b4e4d3f2616ec4ba7f74e0c1cba69a5ef81aeac012deb7f98c" aria-describedby="video-description-0-0"></video>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/460x284/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/920x568/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/940x580/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/1880x1160/filters:quality(80) 2x" media="(min-width: 480px) and (max-width: 1512px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/1260x777/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/2520x1554/filters:quality(80) 2x" media="(min-width: 1513px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/460x284/filters:quality(80)" loading="eager" width="460" height="284" alt="" className="" draggable="false" />
                </picture>
              </div>
            </div>
            <TestimonialSlider />
            <div className={styles['project-content__block-image']}>
              <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/460x580/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/920x1160/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 1512px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/616x777/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/1232x1554/filters:quality(80) 2x" media="(min-width: 1513px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/1232x1554/1b346599d4/sussex-portrait-2.jpg/m/460x580/filters:quality(80)" loading="eager" width="460" height="580" alt="" className="" draggable="false" />
                </picture>
              </div>
              <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/460x580/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/920x1160/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 1512px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/616x777/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/1232x1554/filters:quality(80) 2x" media="(min-width: 1513px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/1232x1554/625e9a2a42/sussex-portrait-3.jpg/m/460x580/filters:quality(80)" loading="eager" width="460" height="580" alt="" className="" draggable="false" />
                </picture>
              </div>
            </div>
            <div className={styles['project-content__block-image']}>
              <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <video className={styles['project-content__video']} autoPlay playsInline loop preload="none" src="https://player.vimeo.com/progressive_redirect/playback/759804705/rendition/720p/file.mp4?loc=external&log_user=0&signature=e183b012e9a5b0b4e4d3f2616ec4ba7f74e0c1cba69a5ef81aeac012deb7f98c" aria-describedby="video-description-0-0"></video>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/460x284/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/920x568/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/940x580/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/1880x1160/filters:quality(80) 2x" media="(min-width: 480px) and (max-width: 1512px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/1260x777/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/2520x1554/filters:quality(80) 2x" media="(min-width: 1513px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/2520x1554/e20e8748c5/sussex-landscape-4.jpg/m/460x284/filters:quality(80)" loading="eager" width="460" height="284" alt="" className="" draggable="false" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles['project-footer']}>
        <h2 className={styles['project-footer__heading']} aria-label="Up Next">
          <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: 'TextAnimateUp_mask-down__TzvI8 0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
              Up Next
            </span>
          </span>
        </h2>
        <div className={styles['project-content__block-image']}>
          <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
            <video className={styles['project-content__video']} autoPlay playsInline loop preload="none" src="https://player.vimeo.com/progressive_redirect/playback/745004855/rendition/720p/file.mp4?loc=external&amp;signature=1dd35b7b1001be056347f1aa639461cf56f40fc35b3f0ad75170809e8ca7d4e4" aria-describedby="video-description-0-0"></video>
            <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
              <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/460x284/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/920x568/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
              <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/940x580/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/1880x1160/filters:quality(80) 2x" media="(min-width: 480px) and (max-width: 1512px)" />
              <source srcSet="https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/1260x777/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/2520x1554/filters:quality(80) 2x" media="(min-width: 1513px)" />
              <img src="https://a-us.storyblok.com/f/1017006/2520x1554/ddf28d429b/sussex-landscape-1.jpg/m/460x284/filters:quality(80)" loading="eager" width="460" height="284" alt="" className="" draggable="false" />
            </picture>
          </div>
        </div>
      </footer>
    </>
  );
};
