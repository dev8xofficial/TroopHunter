import React from 'react';
import styles from './index.module.css';
import ButtonStyles from '../Button/index.module.css';

export const CaseStudySideBar: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={styles['sidebar__inner']}>
        <div className={styles['sidebar__header']}>
          <h1 className={styles['sidebar__title']}>Sussex Taps</h1>
          <a className={ButtonStyles['button-wrapper']} target="_blank" href="https://sussextaps.com.au">
            <span className={`${ButtonStyles['button']} ${ButtonStyles['button--icon']} ${ButtonStyles['button--bg-secondary']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
              Visit Website
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" className="" style={{ '--width': '14', '--height': '13' } as any}>
                <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vector-effect="non-scaling-stroke"></path>
              </svg>
            </span>
          </a>
          <p className={styles['sidebar__industry']}>Manufacturing</p>
        </div>
        <div className={styles['sidebar__intro']}>
          <p>Sussex Taps is a manufacturer of premium tapware with a deep heritage in Australian manufacturing.</p>
        </div>
        <div className={styles['sidebar__body']}>
          <p>Following a brand repositioning, Sussex Taps engaged Humaan to design an immersive digital experience that communicated the brand's core proposition of quality, heritage and craftsmanship.</p>
          <p>The visual content and product suite played a hero role within the website, which was augmented by bleeding-edge interactivity and animation treatments to give the audiences a tangible and tactile digital showroom experience.</p>
          <p>The result is a sensory-rich experience that pushes the boundaries of UI design and interactive development and which has strengthened the brand’s category-leading position in the market. </p>
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
