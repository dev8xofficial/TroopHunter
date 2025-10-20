import React from 'react';

import WorkCategoriesStyles from '../WorkCategories/index.module.css';

export const OffersCategories: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={WorkCategoriesStyles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={`${WorkCategoriesStyles['category']} ${WorkCategoriesStyles['is-active']}`} href="/work">
            Developers
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={WorkCategoriesStyles['category']} href="#">
            Mini-Squads
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={WorkCategoriesStyles['category']} href="#">
            How to Hire
          </a>
        </div>
        <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a className={WorkCategoriesStyles['category']} href="#">
            Schedule Call
          </a>
        </div>
      </div>
    </>
  );
};
