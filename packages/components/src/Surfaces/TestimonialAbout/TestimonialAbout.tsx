import React from 'react';

import TestimonialSliderStyles from '../TestimonialSlider/index.module.css';
import TextAnimateStyles from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

type TestimonialAboutProps = {
  testimonialCSSClass: string;
};
export const TestimonialAbout: React.FC<TestimonialAboutProps> = ({ testimonialCSSClass }) => {
  const testimonialLines = ['“It was one of the most extraordinary experiences we have had in 24 years of business. Why? Because you challenged us and helped us articulate something very special.”'];
  return (
    <div className={`${styles['testimonials']} ${testimonialCSSClass}`}>
      <h2 className="hidden">Testimonials</h2>
      <div className={styles['testimonials__slider']}>
        <figure className={`${styles['testimonial']} ${styles['testimonial--active']}`} style={{ opacity: 1, zIndex: 1, transform: 'none' }}>
          <blockquote className={styles['testimonial__quote']}>
            <span aria-label={testimonialLines[0]}>
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
        <div className={styles['testimonials__controls-wrapper']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          <div className={styles['testimonials__controls']} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
            <button className={`${styles['testimonials__button']} ${styles['testimonials__button--prev']}`} data-faitracker-form-bind="true">
              <span className="hidden">Previous Testimonial</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24" className="" style={{ '--width': '22', '--height': '24' } as React.CSSProperties}>
                <path fill="currentColor" d="M21.06 13.06a1.5 1.5 0 0 0 0-2.12l-9.545-9.547a1.5 1.5 0 1 0-2.122 2.122L17.88 12l-8.486 8.485a1.5 1.5 0 1 0 2.122 2.122l9.546-9.546ZM0 13.5h20v-3H0v3Z"></path>
              </svg>
            </button>
            <button className={`${styles['testimonials__button']} ${styles['testimonials__button--next']}`} data-faitracker-form-bind="true">
              <span className="hidden">Next Testimonial</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24" className="" style={{ '--width': '22', '--height': '24' } as React.CSSProperties}>
                <path fill="currentColor" d="M21.06 13.06a1.5 1.5 0 0 0 0-2.12l-9.545-9.547a1.5 1.5 0 1 0-2.122 2.122L17.88 12l-8.486 8.485a1.5 1.5 0 1 0 2.122 2.122l9.546-9.546ZM0 13.5h20v-3H0v3Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
