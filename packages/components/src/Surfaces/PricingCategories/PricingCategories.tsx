import React from 'react';
import { Magnet } from '../../Animations/Magnet';
import { CheckIcon } from '@heroicons/react/24/outline';

import WorkCategoriesStyles from '../WorkCategories/index.module.css';

interface Role {
  title: string;
  skills: Record<string, boolean>;
  selectedLevel: { id: number; name: string; value: string | number };
}

export const PricingCategories: React.FC<{
  skills: {
    [key: string]: boolean;
  };
  updateRoleSkill: any;
  skillIndex: number;
  role?: Role;
  getSkillsByLevel: (roleTitle: string, level: string) => string[];
}> = ({ skills, updateRoleSkill, skillIndex, role, getSkillsByLevel }): JSX.Element => {
  // Get available skills based on level
  const selectedLevel = role?.selectedLevel?.value || '';
  const availableSkills = selectedLevel ? getSkillsByLevel(role.title, selectedLevel as string) : Object.keys(skills);

  return (
    <>
      <div className={WorkCategoriesStyles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
        <div className={WorkCategoriesStyles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          {Object.keys(skills).map((key) => {
            const isAvailable = role ? (selectedLevel ? availableSkills.includes(key) : true) : true;
            const isSelected = skills[key];

            return (
              <Magnet key={key}>
                <div style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <button className={`${WorkCategoriesStyles['category']} ${isSelected && WorkCategoriesStyles['is-active']} ${!isAvailable ? WorkCategoriesStyles['disabled'] || 'opacity-50' : ''}`} onClick={() => isAvailable && updateRoleSkill(skillIndex, key, !isSelected)} disabled={!isAvailable}>
                    {key}
                    {isSelected && <CheckIcon width="14" className={WorkCategoriesStyles['button--icon']} />}
                  </button>
                </div>
              </Magnet>
            );
          })}
        </div>
      </div>
    </>
  );
};
