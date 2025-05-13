import React from 'react';
import { WorkDetail } from '../../Interfaces/Work/WorkProjectTypes';

import ButtonStyles from '../Button/index.module.css';
import styles from './index.module.css';

export const CaseStudySideBar: React.FC<Omit<WorkDetail, 'slug' | 'video' | 'path' | 'placeholderImage' | 'images' | 'bgColor'>> = ({ title, websiteUrl, industry, shortIntro, overview, approach, impact, keyContributions }): JSX.Element => {
  return (
    <>
      <div className={styles['sidebar__inner']}>
        <div className={styles['sidebar__header']}>
          <h1 className={styles['sidebar__title']}>{title}</h1>
          <a className={ButtonStyles['button-wrapper']} target="_blank" href={websiteUrl}>
            <span className={`${ButtonStyles['button']} ${ButtonStyles['button--icon']} ${ButtonStyles['button--bg-secondary']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
              Visit Website
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" className="" style={{ '--width': '14', '--height': '13' } as any}>
                <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </span>
          </a>
          <p className={styles['sidebar__industry']}>{industry}</p>
        </div>
        <div className={styles['sidebar__intro']}>
          <p>{shortIntro}</p>
        </div>
        <div className={styles['sidebar__body']}>
          <p>{overview}</p>
          <p>{approach}</p>
          <p>{impact}</p>
        </div>
        <ul className={styles['custom-icon-list']}>
          <li>Digital Strategy &amp; UX</li>
          <li>Interaction Design</li>
          <li>3D Product Visualisation</li>
          <li>Animation and Interaction</li>
          <li>Custom eCommerce</li>
        </ul>
        <table className={styles['sidebar__awards']} summary="A list of awards won for this project. The award organisation is shown in the first column, the award category in the second column, and the year of the award is in the third column.">
          <caption>Awards</caption>
          <thead>
            <tr>
              <th>Organisation</th>
              <th>Category</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PADC Skulls</td>
              <td>Silver Skull – Best Websites Brand Experience</td>
              <td>2023</td>
            </tr>
            <tr>
              <td>PADC Skulls</td>
              <td>Silver Skull – Use of Experience Design</td>
              <td>2023</td>
            </tr>
            <tr>
              <td>Good Design Awards</td>
              <td>Digital – Web Design and Development</td>
              <td>2023</td>
            </tr>
            <tr>
              <td>FWA</td>
              <td>Site of the Day</td>
              <td>2022</td>
            </tr>
            <tr>
              <td>Awwwards</td>
              <td>Site of the Day</td>
              <td>2022</td>
            </tr>
            <tr>
              <td>Awwwards</td>
              <td>Dev Award</td>
              <td>2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
