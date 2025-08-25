import React from 'react';

import { PricingStudySidebar } from '../PricingStudySidebar/PricingStudySidebar';
import { PricingList } from '../../Data display/PricingList/PricingList';

import ProjectContentsStyles from '../ProjectContents/index.module.css';

export interface ListboxOptionType {
  id: number;
  name: string;
  value: string | number;
}

export interface Role {
  title: string;
  skills: Record<string, boolean>;
  selectedPeople: ListboxOptionType;
  selectedPriceType: ListboxOptionType;
  selectedLevel: ListboxOptionType;
}

interface PricingContentsProps {
  roles: Role[];
  peopleOptions: any;
  priceTypesOptions: any;
  levelOptions: any;
  updateRoleSkill: any;
  updateRolePricing: any;
  getSkillsByLevel: (roleTitle: string, level: string) => string[];
}

export const PricingContents: React.FC<PricingContentsProps> = ({ roles, peopleOptions, priceTypesOptions, levelOptions, updateRoleSkill, updateRolePricing, getSkillsByLevel }): JSX.Element => {
  return (
    <>
      <div className={`${ProjectContentsStyles['project-content']} project-content}`}>
        <div className={ProjectContentsStyles['project-content__body']}>
          <PricingStudySidebar />
          <PricingList roles={roles} peopleOptions={peopleOptions} priceTypesOptions={priceTypesOptions} levelOptions={levelOptions} updateRoleSkill={updateRoleSkill} updateRolePricing={updateRolePricing} getSkillsByLevel={getSkillsByLevel} />
        </div>
      </div>
    </>
  );
};
