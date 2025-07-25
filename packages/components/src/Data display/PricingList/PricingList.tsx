import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import CaretDownIcon from '../../Icons/CaretDown';
import CaretUpIcon from '../../Icons/CaretUp';
import { PricingCategories } from '../../Surfaces/PricingCategories/PricingCategories';
import { ListboxField, ListboxOptionType } from '../../Input/ListboxField/ListboxField';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { UserIcon, CurrencyDollarIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

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
  const isMobile = useBreakpoint();

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
                  <div className={OpenRolesListStyles['roleDetails']}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <UserIcon width={20} height={20} className={OpenRolesListStyles['buttonIcon']} style={{ marginRight: '0.275rem' }} />
                      {roles[key]['selectedPeople']?.name || roles[key]['selectedPeople']?.value || '0'} {!isMobile && 'Experts'}
                    </span>
                    <span style={{ width: '1px', height: '30px', background: 'black' }}></span>

                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <CurrencyDollarIcon width={21} height={21} className={OpenRolesListStyles['buttonIcon']} style={{ marginRight: '0.275rem' }} /> {roles[key]['selectedPriceType']?.name || roles[key]['selectedPriceType']?.value || 'Payment Type'}
                    </span>
                    <span style={{ width: '1px', height: '30px', background: 'black' }}></span>

                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <WrenchScrewdriverIcon width={21} height={21} className={OpenRolesListStyles['buttonIcon']} style={{ marginRight: '0.275rem' }} />
                      {Object.values(roles[key].skills).filter(Boolean).length} {!isMobile ? `Key Skill${Object.values(roles[key].skills).filter(Boolean).length > 1 ? 's' : ''} Included` : `Skill${Object.values(roles[key].skills).filter(Boolean).length > 1 ? 's' : ''}`}
                    </span>
                  </div>
                </DisclosureButton>

                <DisclosurePanel className={`${OpenRolesListStyles['jobDescriptionWrapper']} ${open ? OpenRolesListStyles['expanded'] : ''}`}>
                  <div className={OpenRolesListStyles['jobDescription']}>
                    <div className={ListboxFieldStyles['formFieldsContainer']}>
                      <div style={{ marginBottom: '1rem' }}>
                        <label>How many experts do you need?</label>
                        <div className={ListboxFieldStyles['dropdown-wrapper']}>
                          <ListboxField options={peopleOptions} selected={roles[key]['selectedPeople'] || { id: 0, name: '', value: '' }} setSelected={(option) => updateRolePricing(index, 'selectedPeople', option)} />
                        </div>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <label>How would you like to pay?</label>
                        <div className={ListboxFieldStyles['dropdown-wrapper']}>
                          <ListboxField options={priceTypesOptions} selected={roles[key]['selectedPriceType'] || { id: 0, name: '', value: '' }} setSelected={(option) => updateRolePricing(index, 'selectedPriceType', option)} />
                        </div>
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
