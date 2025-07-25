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
}

interface PricingContentsProps {
  roles: Role[];
  peopleOptions: any;
  priceTypesOptions: any;
  updateRoleSkill: any;
  updateRolePricing: any;
}

export const PricingContents: React.FC<PricingContentsProps> = ({ roles, peopleOptions, priceTypesOptions, updateRoleSkill, updateRolePricing }): JSX.Element => {
  return (
    <>
      <div className={`${ProjectContentsStyles['project-content']} project-content}`}>
        <div className={ProjectContentsStyles['project-content__body']}>
          <PricingStudySidebar />
          <PricingList roles={roles} peopleOptions={peopleOptions} priceTypesOptions={priceTypesOptions} updateRoleSkill={updateRoleSkill} updateRolePricing={updateRolePricing} />
        </div>
      </div>
    </>
  );
};
