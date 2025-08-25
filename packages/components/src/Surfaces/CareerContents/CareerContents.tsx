import React from 'react';

import { CareerStudySidebar } from '../CareerStudySidebar/CareerStudySidebar';
import { OpenRolesList } from '../../Data display/OpenRolesList/OpenRolesList';

import ProjectContentsStyles from '../ProjectContents/index.module.css';

export const CareerContentsModal: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={`${ProjectContentsStyles['project-content']} project-content}`}>
        <div className={ProjectContentsStyles['project-content__body']}>
          <CareerStudySidebar />
          <OpenRolesList />
        </div>
      </div>
    </>
  );
};
