'use client';

import React from 'react';
import { WhyWeAreDifferentQA } from '../../Interfaces/Home/Home';
import { AppearOnScroll } from '../../Animations/AppearOnScroll';

import TextAnimateStyles from '../../Surfaces/TextAnimateUp/index.module.css';
import ContentAsideImageStyles from '../../Layout/ContentAsideImage/index.module.css';
import WhyDev8xStyles from '../WhyDev8x/index.module.css';
import WYSIWYGStyle from '../WYSIWYG/index.module.css';
import styles from './index.module.css';

type WhyProps = {
  heading?: string;
  qa?: WhyWeAreDifferentQA[];
};

export const WhyWeAreDifferent: React.FC<WhyProps> = ({ heading, qa }) => {
  return (
    <div className={WhyDev8xStyles['homepage-bottom']}>
      {/* Animate each word of heading */}
      <span className={`${WhyDev8xStyles['homepage-bottom__heading']} ${styles['homepage-bottom__heading']}`} aria-label={heading}>
        {heading.split(' ').map((word, index) => (
          <AppearOnScroll
            key={index}
            delay={index * 0.05} // stagger words nicely
            duration={0.6}
            yOffset={10}
            as="span"
            className={TextAnimateStyles['word']}
          >
            <span aria-hidden="true">{word + ' '}</span>
          </AppearOnScroll>
        ))}
      </span>

      {/* <div className={WhyDev8xStyles['homepage-bottom__content']}>
        <span className={WhyDev8xStyles['homepage-bottom__heading']} aria-label={heading}>
          {heading.split(' ').map((word, index) => (
            <AppearOnScroll
              key={index}
              delay={index * 0.05} // stagger words nicely
              duration={0.6}
              yOffset={10}
              as="span"
              className={TextAnimateStyles['word']}
            >
              <span aria-hidden="true">{word + ' '}</span>
            </AppearOnScroll>
          ))}
        </span>
      </div> */}

      {/* Animate image wrapper only */}
      <AppearOnScroll delay={0.2} as="div" className={WhyDev8xStyles['homepage-bottom__image-wrapper']}>
        {/* Animate paragraphs and link with delays */}
        {qa.map((item, index) => (
          <>
            <AppearOnScroll delay={0.1} as="div">
              <h2 className={ContentAsideImageStyles['content-aside-image__heading']} aria-label={item.title}>
                {item.title}
              </h2>
              <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <div className={`${WYSIWYGStyle['wysiwyg']} ${styles['content-aside-image__paragraph']}`}>
                  <p>
                    <span style={{ color: 'rgb(0, 0, 0)' }} dangerouslySetInnerHTML={{ __html: item.paragraph }} />
                  </p>
                </div>
              </div>
            </AppearOnScroll>
          </>
        ))}
      </AppearOnScroll>
    </div>
  );
};
