import React from 'react';

import FooterStyles from '../FooterInternationalContents/index.module.css';
import HeroStyles from '../Hero/index.module.css';
import CaseStudySidebarStyles from '../CaseStudySidebar/index.module.css';

export const CareerStudySidebar: React.FC = () => {
  return (
    <div className={CaseStudySidebarStyles['sidebar']}>
      <div className={HeroStyles['homepage__hero']}>
        <div className={HeroStyles['expertise-heading-container']} data-new-theme="false">
          <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
            <h1 className={HeroStyles['expertise-heading']}>
              <span className="block lg:inline-block">Roles</span>
            </h1>
          </div>
        </div>
      </div>

      <div className={`${FooterStyles['footer-columns']} footer-columns`}>
        <div className={`${FooterStyles['footer-columns__column']} ${FooterStyles['footer-columns__column--initial']}`}>
          <div className={FooterStyles['footer-columns__globally']}>
            <h3>Or Contact us with</h3>
          </div>
          <a href="mailto:contact@dev8x.com">contact@dev8x.com</a>
        </div>
      </div>
    </div>
  );
};
