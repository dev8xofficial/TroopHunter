'use client';

import React, { CSSProperties, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Magnet } from '../../Animations/Magnet';
import { HeaderSubmenu } from '../HeaderSubmenu/HeaderSubmenu';
import { Dev8XSubmenu } from '../Dev8XSubmenu/Dev8XSubmenu';
import { HeaderSubmenuContent } from '../../Interfaces/Navigation/Navigation';
import { isHelloabdulPort, getBrandFromBaseURL, prefixed } from '../../../utils/helpers';

import styles from './index.module.css';

interface HeaderProps {
  submenuData?: HeaderSubmenuContent;
}

export const Header: React.FC<HeaderProps> = ({ submenuData }): JSX.Element => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [dataSubmenuOpen, setDataSubmenuOpen] = useState(false);
  const [height, setHeight] = useState(45);
  const submenuRef = useRef<HTMLLIElement | null>(null);
  const exploreBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isHelloabdul, setIsHelloabdul] = useState(false);
  const [isDev8X, setIsDev8X] = useState(false);

  const getActiveColumn = (path: string): number => {
    if (path === '/') return 1;
    if (path === '/about') return 2;
    if (path.startsWith('/work')) return 3;
    if (path.startsWith('/expertise') || path.startsWith('/offers') || path.startsWith('/proposals') || path.startsWith('/share')) return 4;
    if (path === '/contact') return 5;
    return 1;
  };

  const activeColumn = getActiveColumn(currentPath);
  const menuLabel = isHelloabdul ? 'Expertise' : 'Explore';

  const handleExpertiseClick = () => {
    setDataSubmenuOpen((prev) => !prev);
    setHeight((prev) => (prev === 45 ? 661 : 45));
  };

  const handleSubmenuLinkClick = () => {
    setDataSubmenuOpen(false);
    setHeight(45);
  };

  useEffect(() => {
    setIsHelloabdul(isHelloabdulPort());
    setIsDev8X(getBrandFromBaseURL() === 'dev8x');
  }, []);

  // ✅ Close submenu when clicking outside Explore area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node) && exploreBtnRef.current && !exploreBtnRef.current.contains(event.target as Node)) {
        setDataSubmenuOpen(false);
        setHeight(45);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header>
      <div className={styles['header__inner']}>
        <NextLink href="/" passHref legacyBehavior>
          <a className={styles['header__logo']}>
            <span className="hidden">Home</span>
            {/* Logo SVG */}
            <img src={prefixed('/logo.svg')} height="32" />
          </a>
        </NextLink>

        <nav className={styles['menu']} data-columns="4" data-submenu-open={`${dataSubmenuOpen}`}>
          <ul className={styles['menu__list']}>
            <Magnet>
              <li className={styles['menu__item']}>
                <NextLink href="/" passHref legacyBehavior>
                  <a className={`${styles['menu__link']} ${currentPath === '/' ? styles['menu__link--active'] : ''}`}>Home</a>
                </NextLink>
              </li>
            </Magnet>

            <Magnet>
              <li className={styles['menu__item']}>
                <NextLink href="/about" passHref legacyBehavior>
                  <a className={`${styles['menu__link']} ${currentPath === '/about' ? styles['menu__link--active'] : ''}`}>About</a>
                </NextLink>
              </li>
            </Magnet>

            <Magnet>
              <li className={styles['menu__item']}>
                <NextLink href="/work" passHref legacyBehavior>
                  <a className={`${styles['menu__link']} ${currentPath.includes('/work') ? styles['menu__link--active'] : ''}`}>Work</a>
                </NextLink>
              </li>
            </Magnet>

            <li className={styles['menu__item']} ref={submenuRef}>
              <div className="link-wrap">
                <button
                  ref={exploreBtnRef}
                  className={`${styles['menu__link']} ${currentPath.includes('/expertise') || currentPath.includes('/offers') || currentPath.includes('/careers') || currentPath.includes('/internships') || currentPath.includes('/plans-and-pricing') || currentPath.includes('/our-process') || currentPath.includes('/web-applications') || currentPath.includes('/mobile-applications') || currentPath.includes('/saas-applications') || currentPath.includes('/cto-as-a-service') || currentPath.includes('/services-for-early-stage-startups') || currentPath.includes('/services-for-growth-stage-startups') || currentPath.includes('/pricing') || currentPath.includes('/proposals') || currentPath.includes('/share') ? styles['menu__link--active'] : ''}`}
                  onClick={handleExpertiseClick}
                >
                  {menuLabel}
                </button>
                {/* ✅ Pass handleSubmenuLinkClick to close dropdown on link click */}
                {submenuData && (isDev8X ? <Dev8XSubmenu height={height} onLinkClick={handleSubmenuLinkClick} submenus={submenuData} /> : <HeaderSubmenu height={height} onLinkClick={handleSubmenuLinkClick} submenus={submenuData} />)}
              </div>
            </li>

            <Magnet>
              <li className={styles['menu__item']}>
                <NextLink href="/contact" passHref legacyBehavior>
                  <a className={`${styles['menu__link']} ${currentPath === '/contact' ? styles['menu__link--active'] : ''}`}>Contact</a>
                </NextLink>
              </li>
            </Magnet>
          </ul>

          {/* Twin menu for active/hover pill */}
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
              {menuLabel}
            </span>
            <span className={`${styles['menu__link']} ${styles['menu__link--twin']}`} style={{ gridColumn: 5 }}>
              Contact
            </span>

            <div
              className={`${styles['menu__hover-pill']}`}
              style={{
                position: 'relative',
                gridColumn: activeColumn,
                borderRadius: '100px',
                transform: 'none',
                transformOrigin: '50% 50% 0px',
                left: '0px'
              }}
            ></div>
            <div
              className={`${styles['menu__active-pill']}`}
              style={{
                position: 'relative',
                gridColumn: activeColumn,
                borderRadius: '100px',
                transform: 'none',
                transformOrigin: '50% 50% 0px',
                left: '0px'
              }}
            ></div>
          </div>
        </nav>

        {/* Face / nothing wrapper */}
        <div className={styles['face']}>
          <div>
            <div>
              <img src={prefixed('/logo-small.svg')} height="32" />
            </div>
          </div>
          <div className={styles['nothing-wrapper']} aria-hidden="true">
            <div className={styles['nothing']}>
              {/* <img src="/nothing/nothing-2.gif" alt="" width="81" height="200" /> */}
              {/* <audio src="/nothing/nothing.mp3" preload="auto"></audio> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
