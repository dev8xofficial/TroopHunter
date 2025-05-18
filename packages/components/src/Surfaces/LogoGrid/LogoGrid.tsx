import React, { CSSProperties } from 'react';
import Tilt from 'react-parallax-tilt';
import { Spotlight } from '../../Animations/Spotlight';
import TotalhealthdentalcareLogo from '../../Logos/totalhealthdentalcare';
import CoralLogo from '../../Logos/coral';
import HoneyduLogo from '../../Logos/honeydu';
import Society1Logo from '../../Logos/society1';
import GoldendaoLogo from '../../Logos/goldendao';

import styles from './index.module.css';

export const LogoGrid: React.FC = (): JSX.Element => {
  const awards = [
    {
      name: 'TotalHealthDentalCare',
      logo: <TotalhealthdentalcareLogo width={150} height={40} className={`SVG_svg-raw-wrap ${styles['logo-grid__logo']}`} />
    },
    {
      name: 'Coral',
      logo: <CoralLogo width={150} height={40} className={`SVG_svg-raw-wrap ${styles['logo-grid__logo']}`} />
    },
    {
      name: 'Honeydu',
      logo: <HoneyduLogo width={150} height={40} className={`SVG_svg-raw-wrap ${styles['logo-grid__logo']}`} />
    },
    {
      name: 'SocietyOne',
      logo: <Society1Logo width={150} height={40} className={`SVG_svg-raw-wrap ${styles['logo-grid__logo']}`} />
    },
    {
      name: 'GoldenDao',
      logo: <GoldendaoLogo width={150} height={40} className={`SVG_svg-raw-wrap ${styles['logo-grid__logo']}`} />
    }
  ];

  return (
    <>
      <ul className={styles['logo-grid']}>
        {awards.map((item) => (
          <Spotlight strength={0.4}>
            <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} transitionSpeed={4000} glareEnable={false}>
              <li className={styles['logo-grid__item']} style={{ perspective: '1500px', opacity: 1, transform: 'translateX(0px)' }}>
                <span className="sr-only">{item.name}</span>
                <div className={styles['logo-grid__card']} style={{ '--borderTopColor': 'rgba(255, 255, 255, 0)', '--borderLeftColor': 'rgba(255, 255, 255, 0)', backgroundColor: 'rgba(255, 255, 255, 0.3)' } as React.CSSProperties}>
                  <div className={styles['logo-grid__specular']} />
                </div>
                <div>{item.logo}</div>
              </li>
            </Tilt>
          </Spotlight>
        ))}
      </ul>
    </>
  );
};
