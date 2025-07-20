import React from 'react';
import { Magnet } from '../../Animations/Magnet';
import { CheckIcon } from '@heroicons/react/24/outline';

import WorkCategoriesStyles from '../WorkCategories/index.module.css';

export const PricingCategories: React.FC<{
  skills: {
    [key: string]: boolean;
  };
  updateRoleSkill: any;
  skillIndex: number;
}> = ({ skills, updateRoleSkill, skillIndex }): JSX.Element => {
  return (
    <>
      <div className={WorkCategoriesStyles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
        <div className={WorkCategoriesStyles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          {Object.keys(skills).map((key) => (
            <Magnet key={key}>
              <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                <button className={`${WorkCategoriesStyles['category']} ${skills[key] && WorkCategoriesStyles['is-active']}`} onClick={() => updateRoleSkill(skillIndex, key, !skills[key])}>
                  {key}
                  {skills[key] && <CheckIcon width="14" className={WorkCategoriesStyles['button--icon']} />}
                </button>
              </div>
            </Magnet>
          ))}
        </div>
      </div>
    </>
  );
};
