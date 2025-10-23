import React, { useEffect, useState } from 'react';

import CaretDown from '../../Icons/CaretDown';
import CaretUp from '../../Icons/CaretUp';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

import HomepageStatsStyles from '../HomepageStats/index.module.css';
import OpenRolesListStyles from '../../DataDisplay/OpenRolesList/index.module.css';
import CaseStudySidebarStyles from '../CaseStudySidebar/index.module.css';
import styles from './index.module.css';

export type FAQs = {
  title: string;
  description: string;
};

type FAQsProps = {
  faqs: FAQs[];
};

export const FAQs: React.FC<FAQsProps> = ({ faqs }) => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 740);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const iconSize = isSmallScreen ? 20 : 32;

  return (
    <div className={HomepageStatsStyles['homepage-bottom__stats']}>
      <ul className={HomepageStatsStyles['homepage-stats']}>
        {faqs.map((stat, index) => {
          return (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <DisclosureButton as="div" className={`${HomepageStatsStyles['homepage-stats__item']} ${styles['faqs-stats__item']}`} aria-label={open ? 'Collapse details' : 'Expand details'} key={index}>
                    <span className={`${styles['homepage-stats__value']} ${styles['faqs-stats__value']}`}>
                      {stat.title}
                    </span>

                    <span className={`${styles['homepage-stats__label']} ${styles['faqs-stats__label']}`}>
                      <button type="button" className={OpenRolesListStyles['toggleButton']}>
                        {open ? (
                          <CaretUp
                            width={iconSize}
                            height={iconSize}
                            className={OpenRolesListStyles['buttonIcon']}
                          />
                        ) : (
                          <CaretDown
                            width={iconSize}
                            height={iconSize}
                            className={OpenRolesListStyles['buttonIcon']}
                          />
                        )}
                      </button>
                    </span>
                  </DisclosureButton>

                  <DisclosurePanel className={`${OpenRolesListStyles['jobDescriptionWrapper']} ${open ? OpenRolesListStyles['expanded'] : ''}`}>
                    <div className={OpenRolesListStyles['jobDescription']}>
                      <div className={`${isSmallScreen ? CaseStudySidebarStyles['sidebar__body'] : CaseStudySidebarStyles['sidebar__intro']}`}><p>{stat.description}</p></div>
                    </div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          )
        })}
      </ul>
    </div>
  );
};
