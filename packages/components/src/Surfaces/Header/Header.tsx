import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from './index.module.css';
import { HeaderSubmenu } from '../HeaderSubmenu/HeaderSubmenu';

export const Header: React.FC = (): JSX.Element => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [dataSubmenuOpen, setDataSubmenuOpen] = useState(false);
  const [height, setHeight] = useState(45);
  const getActiveColumn = (path: string): number => {
    if (path === '/') return 1;
    if (path === '/about') return 2;
    if (path === '/work') return 3;
    if (
      path.startsWith('/expertise/websites') ||
      path.startsWith('/expertise/web-applications') ||
      path.startsWith('/expertise/mobile-apps') ||
      path.startsWith('/expertise/ecommerce') ||
      path.startsWith('/expertise/data-visualisation') ||
      path.startsWith('/expertise/user-research-validation') ||
      path.startsWith('/expertise/user-experience-design') ||
      path.startsWith('/expertise/user-interface-design') ||
      path.startsWith('/expertise/prototyping') ||
      path.startsWith('/expertise/design-systems') ||
      path.startsWith('/expertise/headless') ||
      path.startsWith('/expertise/react-js') ||
      path.startsWith('/expertise/payload-cms') ||
      path.startsWith('/expertise/laravel') ||
      path.startsWith('/expertise/wordpress-development') ||
      path.startsWith('/expertise/commercial') ||
      path.startsWith('/expertise/not-for-profit') ||
      path.startsWith('/expertise/startups') ||
      path.startsWith('/expertise/education') ||
      path.startsWith('/expertise/community')
    ) {
      return 4;
    }
    if (path === '/contact') return 5;
    return 1; // fallback
  };
  const activeColumn = getActiveColumn(currentPath);

  const handleExpertiseClick = () => {
    setDataSubmenuOpen((prev) => !prev);
    setHeight((prev) => (prev === 45 ? 661 : 45));
  };

  return (
    <>
      <header>
        <div className={styles['header__inner']}>
          <a href="/" className={styles['header__logo']}>
            <span className={styles['hidden']}>Home</span>
            <img className="mx-auto h-6 lg:h-8" src="/logo.png" alt="Dev8X" />
          </a>
          <nav className={styles['menu']} data-columns="4" data-submenu-open={`${dataSubmenuOpen}`}>
            <ul className={styles['menu__list']}>
              <li className={styles['menu__item']}>
                <a className={`${styles['menu__link']} ${currentPath === '/' ? styles['menu__link--active'] : ''}`} href="/">
                  Home
                </a>
              </li>
              <li className={styles['menu__item']}>
                <a className={`${styles['menu__link']} ${currentPath === '/about' ? styles['menu__link--active'] : ''}`} href="/about">
                  About
                </a>
              </li>
              <li className={styles['menu__item']}>
                <a className={`${styles['menu__link']} ${currentPath === '/work' ? styles['menu__link--active'] : ''}`} href="/work">
                  Work
                </a>
              </li>
              <li className={styles['menu__item']}>
                <div className="link-wrap">
                  <button className={`${styles['menu__link']} ${currentPath.includes('/expertise') ? styles['menu__link--active'] : ''}`} data-faitracker-form-bind="true" onClick={handleExpertiseClick}>
                    Expertise
                  </button>
                  <HeaderSubmenu height={height} />
                </div>
              </li>
              <li className={styles['menu__item']}>
                <a className={`${styles['menu__link']} ${currentPath === '/contact' ? styles['menu__link--active'] : ''}`} href="/contact">
                  Contact
                </a>
              </li>
            </ul>
            <div className={`${styles['menu__list__h']} ${styles['menu__list--twin__w']}`} style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}>
              <span className={`${styles['menu__link']} ${styles['menu__link--twin']}`} style={{ gridColumn: 1 }}>
                Home
              </span>
              <span className={`${styles['menu__link']} ${styles['menu__link--twin']}`} style={{ gridColumn: 2 }}>
                About
              </span>
              <span className={`${styles['menu__link']} ${styles['menu__link--twin']}`} style={{ gridColumn: 3 }}>
                Work
              </span>
              <span className={`${styles['menu__link']} ${styles['menu__link--twin']}`} style={{ gridColumn: 4 }}>
                Expertise
              </span>
              <span className={`${styles['menu__link']} ${styles['menu__link--twin']}`} style={{ gridColumn: 5 }}>
                Contact
              </span>
              <div className={`${styles['menu__hover-pill']}`} style={{ position: 'relative', gridColumn: activeColumn, borderRadius: '100px', transform: 'none', transformOrigin: '50% 50% 0px', left: '0px' }}></div>
              <div className={`${styles['menu__active-pill']}`} style={{ position: 'relative', gridColumn: activeColumn, borderRadius: '100px', transform: 'none', transformOrigin: '50% 50% 0px', left: '0px' }}></div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
