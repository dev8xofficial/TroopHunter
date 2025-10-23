import React from 'react';
import { ScheduleCallModal } from '../../Modals/ScheduleCallModal/ScheduleCallModal';

import ContactFormModalStyles from '../../Modals/ContactFormModal/index.module.css';
import CaseStudySidebarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';
import ProjectContentsStyles from '../ProjectContents/index.module.css';

type ScheduleCallContentProps = {
  children: React.ReactNode;
};

export const ScheduleCallContent: React.FC<ScheduleCallContentProps> = (): JSX.Element => {
  return (
    <>
      <div className={`${ProjectContentsStyles['project-content']} project-content}`}>
        <div className={ProjectContentsStyles['project-content__body']}>
          <div className={CaseStudySidebarStyles['sidebar']}>
            <div className={CaseStudySidebarStyles['sidebar__inner']}>
              <div className={CaseStudySidebarStyles['sidebar__header']}>
                <h1 className={CaseStudySidebarStyles['sidebar__title']}>Schedule Call</h1>
                {/* <Link variant="secondary" href={websiteUrl} endIcon={<RightArrowIcon width="14" className={CaseStudySidebarStyles['button--icon']} />} anchorClassName={CaseStudySidebarStyles['homepage-bottom__link']}>
                  Visit Website
                </Link> */}
                <p className={CaseStudySidebarStyles['sidebar__industry']}></p>
              </div>
              <div className={CaseStudySidebarStyles['sidebar__intro']}>
                <p>Trusted by 50+ startups</p>
              </div>
              <ul className={CaseStudySidebarStyles['custom-icon-list']}>
                <li key={1}>Free & No Obligation</li>
                <li key={2}>Get Clarity on cost & timelines</li>
                <li key={3}>Meet a real technical lead</li>
              </ul>
            </div>
          </div>
          <div className={ProjectContentsStyles['project-content__blocks']}>
            <ScheduleCallModal />
          </div>
        </div>
      </div>
    </>
  );
};
