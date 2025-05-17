import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { HeaderSubmenu } from '../HeaderSubmenu/HeaderSubmenu';

import styles from './index.module.css';

export const Header: React.FC = (): JSX.Element => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [dataSubmenuOpen, setDataSubmenuOpen] = useState(false);
  const [height, setHeight] = useState(45);
  const getActiveColumn = (path: string): number => {
    if (path === '/') return 1;
    if (path === '/about') return 2;
    if (path.startsWith('/work')) return 3;
    if (path.startsWith('/expertise') || path.startsWith('/offers')) {
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
            <span className="hidden">Home</span>
            <svg height="32" viewBox="0 0 224 77" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.355 64V24.675H21.645C32.48 24.675 39.135 31.715 39.135 44.365C39.135 57.015 32.7 64 21.81 64H6.355ZM12.9 30.23V58.445H21.315C30.115 58.445 32.59 51.9 32.59 44.365C32.59 36.83 30.115 30.23 21.315 30.23H12.9Z" fill="#3C3C3C" />
              <path d="M68.424 57.746C74.862 57.746 77.452 53.75 78.118 51.456H85.888C83.964 58.634 78.34 64.11 68.646 64.11C56.88 64.11 49.702 55.97 49.702 44.13C49.702 31.846 56.88 24.15 68.276 24.15C80.486 24.15 86.48 32.66 86.48 46.128H57.472C57.472 52.492 61.542 57.746 68.424 57.746ZM68.276 30.292C61.986 30.292 57.472 34.51 57.472 40.356H78.71C78.71 34.51 74.566 30.292 68.276 30.292ZM94.6402 25.186H102.854L112.4 54.786H112.474L122.02 25.186H130.234L116.84 63H108.034L94.6402 25.186Z" fill="#3C3C3C" />
              <path
                d="M138.595 52.275C138.595 47.05 142.005 44.355 145.635 42.76V42.65C142.94 41.22 140.41 38.855 140.41 34.565C140.41 28.02 145.855 24.17 153.28 24.17C160.705 24.17 166.15 28.02 166.15 34.565C166.15 38.855 163.565 41.22 160.925 42.65V42.76C164.5 44.355 168.02 47.05 168.02 52.275C168.02 59.975 161.585 63.825 153.28 63.825C144.975 63.825 138.595 59.975 138.595 52.275ZM153.28 40.395C157.515 40.395 160.155 38.525 160.155 34.84C160.155 31.21 157.515 29.23 153.28 29.23C149.045 29.23 146.405 31.21 146.405 34.84C146.405 38.525 149.045 40.395 153.28 40.395ZM153.28 58.6C158.45 58.6 161.64 56.07 161.64 51.89C161.64 47.765 158.45 45.235 153.28 45.235C148.165 45.235 144.92 47.765 144.92 51.89C144.92 56.07 148.165 58.6 153.28 58.6Z"
                fill="#3C3C3C"
              />
              <path d="M177.776 25.186H186.582L195.166 38.506H195.314L203.898 25.186H212.704L199.976 43.686L214.11 63H205.082L195.314 48.792H195.166L185.546 63H176.444L190.578 43.686L177.776 25.186Z" fill="#3C3C3C" />
            </svg>
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
                <a className={`${styles['menu__link']} ${currentPath.includes('/work') ? styles['menu__link--active'] : ''}`} href="/work">
                  Work
                </a>
              </li>
              <li className={styles['menu__item']}>
                <div className="link-wrap">
                  <button className={`${styles['menu__link']} ${currentPath.includes('/expertise') || currentPath.includes('/offers') ? styles['menu__link--active'] : ''}`} data-faitracker-form-bind="true" onClick={handleExpertiseClick}>
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
            <div className={`${styles['menu__list']} ${styles['menu__list--twin']}`} style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}>
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
