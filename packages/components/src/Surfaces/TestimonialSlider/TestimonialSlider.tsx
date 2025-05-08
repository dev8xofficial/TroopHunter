import React from 'react';
import styles from './index.module.css';
import ProjectContactStyles from '../ProjectContents//index.module.css';
import TextAnimateStyles from '../TextAnimateUp/index.module.css';

export const TestimonialSlider: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={`${styles['testimonials']} ${ProjectContactStyles['project-content__block-testimonials']}`}>
        <h2 className="hidden">Testimonials</h2>
        <div className={styles['testimonials__slider']}>
          <figure className={`${styles['testimonial']} ${styles['testimonial--active']}`} style={{ opacity: 1, zIndex: 1, transform: 'none' }}>
            <blockquote className={styles['testimonial__quote']}>
              <span aria-label="“Humaan are true professionals, masters in their field, &nbsp;with meticulous attention to detail. With our dream website complete, we have an asset that can evolve with us for many years to come. Thank you amazing Humaans!”">
                <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                    “Human are true professionals, masters in their{' '}
                  </span>
                </span>
                <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                    field, with meticulous attention to detail. With our{' '}
                  </span>
                </span>
                <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                    dream website complete, we have an asset that can{' '}
                  </span>
                </span>
                <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                    evolve with us for many years to come. Thank you{' '}
                  </span>
                </span>
                <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                    amazing Humaans!”
                  </span>
              </span>
              </span>
            </blockquote>
            <figcaption className={styles['testimonial__author']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <span className={styles['testimonial__author-name']}>Vanessa Katsanevakis</span>
              <span className={styles['testimonial__author-position']}>CEO</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
};
