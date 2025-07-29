import React from 'react';
import { atom, useSetAtom } from 'jotai';
import { toggleSmoothModalAtom } from '../../../../..//microfrontend/dev8X/store/smoothModalAtom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Button } from '../../Input/Button/Button';
import RightArrowIcon from '../../Icons/RightArrow';
import CaretDownIcon from '../../Icons/CaretDown';
import CaretUpIcon from '../../Icons/CaretUp';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { CAREER_ROLES } from '../../Constants/Work/Careers';
import { INTERNSHIP_ROLES } from '../../Constants/Work/Internships';

import styles from './index.module.css';

export const selectedRoleAtom = atom<string | null, [string | null], void>(null, (get, set, newValue) => set(selectedRoleAtom, newValue));
export const selectedRoleFirstParagraphAtom = atom<string | null, [string | null], void>(null, (get, set, newValue) => set(selectedRoleFirstParagraphAtom, newValue));
export const selectedRoleThirdParagraphAtom = atom<string | null, [string | null], void>(null, (get, set, newValue) => set(selectedRoleThirdParagraphAtom, newValue));
export const isInternshipAtom = atom<boolean, [boolean], void>(false, (get, set, newValue) => set(isInternshipAtom, newValue));

const firstRoleDescription = (description: React.ReactNode): string => {
  if (React.isValidElement(description)) {
    const children = React.Children.toArray(description.props.children);

    // First, try to find the sidebar__intro div for the first paragraph
    const sidebarIntro = children.find((child) => React.isValidElement(child) && child.type === 'div' && child.props.className && child.props.className.includes('sidebar__intro'));

    if (sidebarIntro && React.isValidElement(sidebarIntro)) {
      const introChildren = React.Children.toArray(sidebarIntro.props.children);
      const firstParagraph = introChildren.find((child) => React.isValidElement(child) && child.type === 'p');

      if (firstParagraph && React.isValidElement(firstParagraph)) {
        const extractText = (children: React.ReactNode): string => {
          if (typeof children === 'string') return children;
          if (Array.isArray(children)) return children.map(extractText).join('');
          if (React.isValidElement(children) && children.props?.children) return extractText(children.props.children);
          return '';
        };
        return extractText(firstParagraph.props.children);
      }
    }
    const sidebarBody = children.find((child) => React.isValidElement(child) && child.type === 'div' && child.props.className && child.props.className.includes('sidebar__body'));

    if (sidebarBody && React.isValidElement(sidebarBody)) {
      const bodyChildren = React.Children.toArray(sidebarBody.props.children);
      const firstMatchingParagraph = bodyChildren.find((child) => React.isValidElement(child) && child.type === 'p' && React.Children.toArray(child.props.children).some((content) => React.isValidElement(content) && content.type === 'caption' && String(content.props.children).includes('Dev8X')));

      if (firstMatchingParagraph && React.isValidElement(firstMatchingParagraph)) {
        const extractText = (children: React.ReactNode): string => {
          if (typeof children === 'string') return children;
          if (Array.isArray(children)) return children.map(extractText).join('');
          if (React.isValidElement(children) && children.props?.children) return extractText(children.props.children);
          return '';
        };
        return extractText(firstMatchingParagraph.props.children);
      }
    }
  }
  return '';
};

const extractRoleDescription = (description: React.ReactNode): string => {
  if (React.isValidElement(description)) {
    const children = React.Children.toArray(description.props.children);
    const sidebarBody = children.find((child) => React.isValidElement(child) && child.type === 'div' && child.props.className && child.props.className.includes('sidebar__body'));

    if (sidebarBody && React.isValidElement(sidebarBody)) {
      const bodyChildren = React.Children.toArray(sidebarBody.props.children);
      // Find the second paragraph (index 1) which is the third paragraph overall
      const thirdParagraph = bodyChildren.find((child, idx) => idx === 1 && React.isValidElement(child) && child.type === 'p');

      if (thirdParagraph && React.isValidElement(thirdParagraph)) {
        const extractText = (children: React.ReactNode): string => {
          if (typeof children === 'string') return children;
          if (Array.isArray(children)) return children.map(extractText).join('');
          if (React.isValidElement(children) && children.props?.children) return extractText(children.props.children);
          return '';
        };
        return extractText(thirdParagraph.props.children);
      }
    }
  }
  return '';
};

// Format role title nicely
const formatRoleTitle = (title: string) => {
  return title
    .trim()
    .split(' ')
    .map((word) => {
      const upper = word.toUpperCase();
      if (['UI/UX', 'AI', 'HR'].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

export const OpenRolesList: React.FC = () => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const setSelectedRole = useSetAtom(selectedRoleAtom);
  const setFirstParagraph = useSetAtom(selectedRoleFirstParagraphAtom);
  const setThirdParagraph = useSetAtom(selectedRoleThirdParagraphAtom);
  const setIsInternship = useSetAtom(isInternshipAtom);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199px)' });
  const router = useRouter();

  const isInternship = router.asPath.toLowerCase().includes('internship');
  let roles = CAREER_ROLES;
  if (isInternship) {
    roles = INTERNSHIP_ROLES;
  } else if (router.asPath.toLowerCase().includes('career')) {
    roles = CAREER_ROLES;
  }

  const handleApplyClick = (roleTitle: string) => {
    const cleanTitle = formatRoleTitle(roleTitle);
    const role = roles.find((r) => r.title === roleTitle);

    setSelectedRole(cleanTitle);
    setIsInternship(isInternship);

    if (role) {
      setFirstParagraph(firstRoleDescription(role.description));
      setThirdParagraph(extractRoleDescription(role.description));
    }

    toggleModal('career');
  };

  return (
    <section className={styles['rolesSection']}>
      <div className={styles['rolesContainer']}>
        {roles.map((role, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <DisclosureButton as="div" className={styles['roleCard']} aria-label={open ? 'Collapse details' : 'Expand details'}>
                  <p className={styles['roleLabel']}>{role.subTitle}</p>

                  <div className={styles['roleHeader']}>
                    <h3 className={styles['roleTitle']}>{role.title}</h3>

                    <div className={styles['roleHeaderInner']}>
                      <button type="button" className={styles['toggleButton']}>
                        {open ? <CaretUpIcon width={24} height={24} className={styles['buttonIcon']} /> : <CaretDownIcon width={24} height={24} className={styles['buttonIcon']} />}
                      </button>

                      <Button
                        variant="secondary"
                        context="contact"
                        endIcon={<RightArrowIcon width="14" className={styles['button--icon']} />}
                        spanClassName={styles['contact-button']}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleApplyClick(role.title);
                        }}
                      >
                        {!isTabletOrMobile && 'Submit Application'}
                      </Button>
                    </div>
                  </div>

                  <div className={styles['roleDetails']}>
                    <span>{role.type}</span>
                    <span>
                      <svg width="11" height="auto" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M38.8737 0.00621275H31.1263V25.6217L13.0221 7.51132L7.54238 12.991L25.6839 31.1263H0V38.8737H25.6776L7.54238 57.009L13.0221 62.4887L31.1201 44.3907V70H38.8675V44.3286L57.0276 62.4887L62.5073 57.009L44.3721 38.8737H70V31.1325H44.3907L62.526 12.9972L57.0462 7.51753L38.8737 25.6901V0.00621275Z" fill="currentColor"></path>
                      </svg>
                    </span>
                    <span>{isInternship ? role.salary : role.experience}</span>
                    <span>
                      <svg width="11" height="auto" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M38.8737 0.00621275H31.1263V25.6217L13.0221 7.51132L7.54238 12.991L25.6839 31.1263H0V38.8737H25.6776L7.54238 57.009L13.0221 62.4887L31.1201 44.3907V70H38.8675V44.3286L57.0276 62.4887L62.5073 57.009L44.3721 38.8737H70V31.1325H44.3907L62.526 12.9972L57.0462 7.51753L38.8737 25.6901V0.00621275Z" fill="currentColor"></path>
                      </svg>
                    </span>
                    <span>{role.location}</span>
                  </div>
                </DisclosureButton>

                <DisclosurePanel className={`${styles['jobDescriptionWrapper']} ${open ? styles['expanded'] : ''}`}>
                  <div className={`${styles['jobDescription']}`}>{role.description}</div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
};
