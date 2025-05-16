import React from 'react';

import TextAnimateStyles from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

export const TestimonialAbout: React.FC = (): JSX.Element => {
  const testimonialLines = ['“It was one of the most extraordinary experiences we have had in 24 years of business. Why? Because you challenged us and helped us articulate something very special.”'];
  return (
    <>
      <div className={`${styles['testimonials']} ${styles['about-testimonials']}`}>
        <h2 className="hidden">Testimonials</h2>
        <div className={styles['testimonials__slider']}>
          <figure className={`${styles['testimonial']} ${styles['testimonial--active']}`} style={{ opacity: 1, zIndex: 1, transform: 'none' }}>
            <blockquote className={styles['testimonial__quote']}>
              <span aria-label="“It was one of the most extraordinary experiences we have had in 24 years of business. Why? Because you challenged us and helped us articulate something very special.”">
                {testimonialLines.map((line, lineIndex) => (
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
              <span className={styles['testimonial__author-name']}>Prof. Dan Haagman</span>
              <span className={styles['testimonial__author-position']}>Chaleit</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
};
