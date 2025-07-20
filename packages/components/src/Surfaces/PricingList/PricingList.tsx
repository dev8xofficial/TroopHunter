import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import CaretDownIcon from '../../Icons/CaretDown';
import CaretUpIcon from '../../Icons/CaretUp';
import { PricingCategories } from '../PricingCategories/PricingCategories';
import { ListboxField, ListboxOptionType } from '../../Input/ListboxField/ListboxField';

import OpenRolesListStyles from '../OpenRolesList/index.module.css';
import ListboxFieldStyles from '../../Input/ListboxField/index.module.css';

interface Role {
  title: string;
  skills: {
    [key: string]: boolean;
  };
}

interface PricingListProps {
  roles: Role[];
  peopleOptions: ListboxOptionType[];
  priceTypesOptions: ListboxOptionType[];
  updateRoleSkill: (skillIndex: number, skill: string, value: boolean) => void;
  updateRolePricing: (skillIndex: number, skill: string, value: ListboxOptionType) => void;
}

export const PricingList: React.FC<PricingListProps> = ({ roles, peopleOptions, priceTypesOptions, updateRoleSkill, updateRolePricing }): JSX.Element => {
  return (
    <section className={OpenRolesListStyles['rolesSection']}>
      <div className={OpenRolesListStyles['rolesContainer']}>
        {Object.keys(roles).map((key, index) => (
          <Disclosure key={index} defaultOpen={false}>
            {({ open }) => (
              <>
                <DisclosureButton as="div" className={OpenRolesListStyles['roleCard']} aria-label={open ? 'Collapse details' : 'Expand details'}>
                  <div className={OpenRolesListStyles['roleHeader']}>
                    <h3 className={OpenRolesListStyles['roleTitle']}>{roles[key].title}</h3>
                    <div className={OpenRolesListStyles['roleHeaderInner']}>
                      <div className={OpenRolesListStyles['toggleButton']}>{open ? <CaretUpIcon width={24} height={24} className={OpenRolesListStyles['buttonIcon']} /> : <CaretDownIcon width={24} height={24} className={OpenRolesListStyles['buttonIcon']} />}</div>
                    </div>
                  </div>
                </DisclosureButton>

                <DisclosurePanel className={`${OpenRolesListStyles['jobDescriptionWrapper']} ${open ? OpenRolesListStyles['expanded'] : ''}`}>
                  <div className={OpenRolesListStyles['jobDescription']}>
                    <div className={ListboxFieldStyles['formFieldsContainer']}>
                      <div className={ListboxFieldStyles['dropdown-wrapper']}>
                        <ListboxField options={peopleOptions} selected={roles[key]['selectedPeople'] || { id: 0, name: '', value: '' }} setSelected={(option) => updateRolePricing(index, 'selectedPeople', option)} />
                      </div>
                      <div className={ListboxFieldStyles['dropdown-wrapper']}>
                        <ListboxField options={priceTypesOptions} selected={roles[key]['selectedPriceType'] || { id: 0, name: '', value: '' }} setSelected={(option) => updateRolePricing(index, 'selectedPriceType', option)} />
                      </div>
                    </div>

                    <PricingCategories skills={roles[key].skills} updateRoleSkill={updateRoleSkill} skillIndex={index} />
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
};
