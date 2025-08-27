import React from 'react';
import styles from './index.module.css';
import ProjectContactStyles from '../ProjectContents//index.module.css';
import TextAnimateStyles from '../TextAnimateUp/index.module.css';

export const TestimonialSlider: React.FC<{ testimonial: string; testimonialAuthor: string; testimonialAuthorPosition: string }> = ({ testimonial, testimonialAuthor, testimonialAuthorPosition }): JSX.Element => {
  return (
    <>
      <div className={`${styles['testimonials']} ${ProjectContactStyles['project-content__block-testimonials']}`}>
        <h2 className="hidden">Testimonials</h2>
        <div className={styles['testimonials__slider']}>
          <figure className={`${styles['testimonial']} ${styles['testimonial--active']}`} style={{ opacity: 1, zIndex: 1, transform: 'none' }}>
            <blockquote className={styles['testimonial__quote']}>
              <span aria-label="Humaan are true professionals, masters in their field, with meticulous attention to detail. With our dream website complete, we have an asset that can evolve with us for many years to come. Thank you amazing Dev8x!">
                {testimonial.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex} style={{ display: 'block' }}>
                    {line.split(' ').map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className={TextAnimateStyles['word']}
                        aria-hidden="true"
                        style={{
                          display: 'inline-block',
                          whiteSpace: 'pre',
                          transform: 'translate3d(0px, 0%, 0px)',
                          animation: `0.8s cubic-bezier(0, 0.55, 0.45, 1) ${(lineIndex * 5 + wordIndex) * 0.05}s 1 normal forwards running TextAnimateUp_mask-down__TzvI8`
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            display: 'inline-block',
                            whiteSpace: 'pre',
                            opacity: 1
                          }}
                        >
                          {word + ' '}
                        </span>
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </blockquote>
            <figcaption className={styles['testimonial__author']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <span className={styles['testimonial__author-name']}>{testimonialAuthor}</span>
              <span className={styles['testimonial__author-position']}>{testimonialAuthorPosition}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
};
