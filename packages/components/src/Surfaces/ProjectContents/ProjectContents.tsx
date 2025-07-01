import React, { ReactNode } from 'react';
import { WorkDetail } from '../../Interfaces/Work/WorkProjectTypes';

import { CaseStudySideBar } from '../CaseStudySidebar/CaseStudySidebar';
import { TestimonialSlider } from '../TestimonialSlider/TestimonialSlider';
import { WorkCard } from '../WorkCard/WorkCard';

import PictureStyles from '../Picture/index.module.css';
import TextAnimateStyles from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

type WorkDetailWithoutMeta = Omit<WorkDetail, 'path' | 'bgColor'> & {
  nextWorkProject?: WorkDetail;
};

export const ProjectsFormModal: React.FC<WorkDetailWithoutMeta> = ({ slug, title, websiteUrl, industry, shortIntro, overview, approach, impact, keyContributions, placeholderImage, video, nextWorkProject, images, testimonial, testimonialAuthor, testimonialAuthorPosition }): JSX.Element => {
  const safeBgColor = `${slug}-light` as WorkDetail['bgColor'];
  const safeBgColorNextWorkProject = `${nextWorkProject.slug}-light` as WorkDetail['bgColor'];

  const getPicture = (images: string): ReactNode => {
    return (
      <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
        <source srcSet={`${images}/m/460x580/filters:quality(80) 1x, ${images}/m/920x1160/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 1512px)" />
        <source srcSet={`${images}/m/616x777/filters:quality(80) 1x, ${images}/m/1232x1554/filters:quality(80) 2x`} media="(min-width: 1513px)" />
        <img src={`${images}/m/460x580/filters:quality(80)`} loading="eager" width="460" height="580" alt="" className="" draggable="false" />
      </picture>
    );
  };

  return (
    <>
      <div className={`${styles['project-content']} project-content}`}>
        <div className={styles['project-content__body']}>
          <CaseStudySideBar title={title} websiteUrl={websiteUrl} industry={industry} shortIntro={shortIntro} overview={overview} approach={approach} impact={impact} keyContributions={keyContributions} />
          <div className={styles['project-content__blocks']}>
            <div className={styles['project-content__block-image']}>
              <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <WorkCard
                  variant="landscape"
                  space="inner"
                  bgColor={safeBgColor}
                  title=""
                  image=""
                  placeholderImage={placeholderImage}
                  video={{
                    originalFile: video.sequences[0],
                    sequences: video.sequences
                  }}
                  path=""
                />
              </div>
            </div>
            {images[0] && (
              <div className={styles['project-content__block-image']}>
                <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  {getPicture(images[0])}
                </div>
                <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  {getPicture(images[1])}
                </div>
              </div>
            )}
            <div className={styles['project-content__block-image']}>
              <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <WorkCard
                  variant="landscape"
                  space="inner"
                  bgColor={safeBgColor}
                  title=""
                  image=""
                  placeholderImage={placeholderImage}
                  video={{
                    originalFile: video.sequences[1],
                    sequences: video.sequences
                  }}
                  path=""
                />
              </div>
            </div>
            <TestimonialSlider testimonial={testimonial} testimonialAuthor={testimonialAuthor} testimonialAuthorPosition={testimonialAuthorPosition} />
            {images[0] && (
              <div className={styles['project-content__block-image']}>
                <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  {getPicture(images[2])}
                </div>
                <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  {getPicture(images[3])}
                </div>
              </div>
            )}
            <div className={styles['project-content__block-image']}>
              <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <WorkCard
                  variant="landscape"
                  space="inner"
                  bgColor={safeBgColor}
                  title=""
                  image=""
                  placeholderImage={placeholderImage}
                  video={{
                    originalFile: video.sequences[2],
                    sequences: video.sequences
                  }}
                  path=""
                />
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
          {nextWorkProject && <WorkCard variant="landscape" space="inner" bgColor={safeBgColorNextWorkProject} title="" image="" placeholderImage={placeholderImage} video={nextWorkProject.video} path="" />}
        </footer>
      </div>
    </>
  );
};
