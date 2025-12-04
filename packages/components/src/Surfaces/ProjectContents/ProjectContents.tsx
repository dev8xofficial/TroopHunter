'use client';

import React, { ReactNode } from 'react';
import { WorkDetail } from '../../Interfaces/Work/WorkProjectTypes';
import { useProjectModal } from '../../../store/useProjectModal';

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
  const { openModal } = useProjectModal(); // only openModal is needed
  const safeBgColor = `${slug}-light` as WorkDetail['bgColor'];
  const safeBgColorNextWorkProject = `${nextWorkProject?.slug}-light` as WorkDetail['bgColor'];

  const getPicture = (imageUrl: string): ReactNode => (
    <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['project-content__picture']}`}>
      <source srcSet={`${imageUrl}/m/460x580/filters:quality(80) 1x, ${imageUrl}/m/920x1160/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 1512px)" />
      <source srcSet={`${imageUrl}/m/616x777/filters:quality(80) 1x, ${imageUrl}/m/1232x1554/filters:quality(80) 2x`} media="(min-width: 1513px)" />
      <img src={`${imageUrl}/m/460x580/filters:quality(80)`} loading="eager" width="460" height="580" alt="" draggable="false" />
    </picture>
  );

  // Correct "Up Next" handling using existing close button
  const handleUpNextClick = (nextSlug: string) => {
    if (!nextSlug) return;
    console.log('1');

    const closeButton = document.querySelector<HTMLButtonElement>('.ModalCloseButton_modal-close-button__h46b_');
    if (!closeButton) return;
    console.log('2');

    // Use MutationObserver to detect when the modal disappears
    const observer = new MutationObserver((mutations, obs) => {
      const modalRemoved = !document.querySelector('.SmoothModal_modal__5j45R');
      if (modalRemoved) {
        console.log('3');
        obs.disconnect();
        openModal(nextSlug); // open the next modal after current modal closes
      }
    });

    console.log('4');
    observer.observe(document.body, { childList: true, subtree: true });

    closeButton.click(); // trigger the modal close animation
  };

  return (
    <div className={`${styles['project-content']} project-content}`}>
      <div className={styles['project-content__body']}>
        <CaseStudySideBar title={title} websiteUrl={websiteUrl} industry={industry} shortIntro={shortIntro} overview={overview} approach={approach} impact={impact} keyContributions={keyContributions} />

        <div className={styles['project-content__blocks']}>
          {/* Video WorkCards */}
          <div className={styles['project-content__block-image']}>
            <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <WorkCard variant="landscape" space="inner" bgColor={safeBgColor} title="" image="" placeholderImage={placeholderImage} video={{ originalFile: video.sequences[0], sequences: video.sequences }} path={slug} openModal={openModal} />
            </div>
          </div>

          {/* Images */}
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

          {/* Second Video */}
          <div className={styles['project-content__block-image']}>
            <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <WorkCard variant="landscape" space="inner" bgColor={safeBgColor} title="" image="" placeholderImage={placeholderImage} video={{ originalFile: video.sequences[1], sequences: video.sequences }} path={slug} openModal={openModal} />
            </div>
          </div>

          {/* Testimonial */}
          <TestimonialSlider testimonial={testimonial} testimonialAuthor={testimonialAuthor} testimonialAuthorPosition={testimonialAuthorPosition} />

          {/* Additional Images */}
          {images[2] && (
            <div className={styles['project-content__block-image']}>
              <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                {getPicture(images[2])}
              </div>
              <div className={`${styles['project-content__image']} ${styles['project-content__image--half']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                {getPicture(images[3])}
              </div>
            </div>
          )}

          {/* Third Video */}
          <div className={styles['project-content__block-image']}>
            <div className={styles['project-content__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <WorkCard variant="landscape" space="inner" bgColor={safeBgColor} title="" image="" placeholderImage={placeholderImage} video={{ originalFile: video.sequences[2], sequences: video.sequences }} path={slug} openModal={openModal} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Up Next */}
      <footer className={styles['project-footer']}>
        <h2 className={styles['project-footer__heading']} aria-label="Up Next">
          <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: 'TextAnimateUp_mask-down__TzvI8 0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards' }}>
            <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
              Up Next
            </span>
          </span>
        </h2>

        {nextWorkProject && (
          <div onClick={() => handleUpNextClick(nextWorkProject.slug)}>
            <WorkCard variant="landscape" space="inner" bgColor={safeBgColorNextWorkProject} title={nextWorkProject.title} image="" placeholderImage={placeholderImage} video={nextWorkProject.video} path={nextWorkProject.slug} />
          </div>
        )}
      </footer>
    </div>
  );
};
