import React from 'react';

import { Magnet } from '../../Animations/Magnet';
import { Button } from '../Button/Button';
import RightArrowIcon from '../../Icons/RightArrow';

import FooterStyles from '../FooterInternationalContents/index.module.css';
import HeroStyles from '../Hero/index.module.css';
import CaseStudySidebarStyles from '../CaseStudySidebar/index.module.css';
import OpenRolesStyles from '../OpenRolesList/index.module.css';

export const PricingStudySidebar: React.FC<{ onBookNow?: () => void }> = ({ onBookNow }) => {
  return (
    <div className={CaseStudySidebarStyles['sidebar']}>
      <div className={HeroStyles['homepage__hero']}>
        <div className={HeroStyles['expertise-heading-container']} data-new-theme="false">
          <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
            <h1 className={HeroStyles['expertise-heading']}>
              <span className="block lg:inline-block">Plans &amp; Pricing</span>
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

      <div className={`${FooterStyles['footer-columns']} footer-columns`}>
        <Magnet>
          <Button variant="secondary" context="contact" endIcon={<RightArrowIcon width="14" className={OpenRolesStyles['button--icon']} />} spanClassName={OpenRolesStyles['contact-button']} onClick={onBookNow}>
            Send Request
          </Button>
        </Magnet>
      </div>
    </div>
  );
};
