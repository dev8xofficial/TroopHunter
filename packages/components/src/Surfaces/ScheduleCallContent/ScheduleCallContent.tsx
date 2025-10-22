import React from 'react';
import { FieldWrapper } from '../../Input/FieldWrapper/FieldWrapper';
import { Button } from '../../Input/Button/Button';
import { Input } from '../../Input/TextField/Input';

import ContactFormModalStyles from '../../Modals/ContactFormModal/index.module.css';
import CaseStudySidebarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';
import ProjectContentsStyles from '../ProjectContents/index.module.css';

type ScheduleCallContentProps = {
  // children: React.ReactNode;
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
                <p className={CaseStudySidebarStyles['sidebar__industry']}>asdfasdf/asdfasdf</p>
              </div>
              <div className={CaseStudySidebarStyles['sidebar__intro']}>
                <p>asdf asdf asdf a sdf as df ads fa sdf</p>
              </div>
              <div className={CaseStudySidebarStyles['sidebar__body']}>
                <p>asdfa sdf asd f asd fa sdf as df</p>
                <p>asdfa sdf asd f asd fa sdf as df</p>
                <p>asdfa sdf asd f asd fa sdf as df</p>
              </div>
              <ul className={CaseStudySidebarStyles['custom-icon-list']}>
                <li key={1}>asdfa sdf asd f asd fa sdf as df</li>
                <li key={2}>asdfa sdf asd f asd fa sdf as df</li>
                <li key={3}>asdfa sdf asd f asd fa sdf as df</li>
              </ul>
            </div>
          </div>
          <div className={ProjectContentsStyles['project-content__blocks']}>
            <form className={`${ContactFormModalStyles['contact-form']} grid-cols-2`}>
              <div className={`col-full ${ContactFormModalStyles['modal-intro']}`}>
                <p>Fill in the blanks and we'll respond in one business day.</p>
                <p>Just want to chat? Call or email, we're a nice bunch.</p>
              </div>

              <FieldWrapper className="col-sm-1" label="What's your name?">
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name here"
                />
              </FieldWrapper>

              <Button type="button" variant="primary" context="contact" fullWidth>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
