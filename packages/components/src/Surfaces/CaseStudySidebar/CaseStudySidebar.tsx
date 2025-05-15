import React from 'react';
import { WorkDetail } from '../../Interfaces/Work/WorkProjectTypes';
import { Link } from '../Link/Link';
import RightArrowIcon from '../../Icons/RightArrow';

import styles from './index.module.css';

export const CaseStudySideBar: React.FC<Omit<WorkDetail, 'slug' | 'video' | 'path' | 'placeholderImage' | 'images' | 'bgColor'>> = ({ title, websiteUrl, industry, shortIntro, overview, approach, impact, keyContributions }): JSX.Element => {
  return (
    <>
      <div className={styles['sidebar__inner']}>
        <div className={styles['sidebar__header']}>
          <h1 className={styles['sidebar__title']}>{title}</h1>
          <Link variant="secondary" href={websiteUrl} endIcon={<RightArrowIcon width="14" className={styles['button--icon']} />} anchorClassName={styles['homepage-bottom__link']}>
            Visit Website
          </Link>
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
