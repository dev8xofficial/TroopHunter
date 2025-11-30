'use client';

import React, { CSSProperties, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Magnet } from '../../Animations/Magnet';
import { HeaderSubmenu } from '../HeaderSubmenu/HeaderSubmenu';
import { Dev8XSubmenu } from '../Dev8XSubmenu/Dev8XSubmenu';
import { HeaderSubmenuContent } from '../../Interfaces/Navigation/Navigation';
import { isHelloabdulPort, getBrandFromBaseURL } from '../../../utils/helpers';

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
  const [isMounted, setIsMounted] = useState(false);
  const [isDev8X, setIsDev8X] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsHelloabdul(isHelloabdulPort());
    setIsDev8X(getBrandFromBaseURL() === 'dev8x');
  }, []);

  const getActiveColumn = (path: string): number => {
    if (path === '/') return 1;
    if (path === '/about') return 2;
    if (path.startsWith('/work')) return 3;
    if (path.startsWith('/expertise') || path.startsWith('/offers')) return 4;
    if (path === '/contact') return 5;
    return 1;
  };

  const activeColumn = getActiveColumn(currentPath);
  const menuLabel = !isMounted ? 'Services' : isHelloabdul ? 'Expertise' : 'Explore';

  const handleExpertiseClick = () => {
    setDataSubmenuOpen((prev) => !prev);
    setHeight((prev) => (prev === 45 ? 661 : 45));
  };

  const handleSubmenuLinkClick = () => {
    setDataSubmenuOpen(false);
    setHeight(45);
  };

  // ✅ Close submenu when clicking outside Explore area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node) &&
        exploreBtnRef.current &&
        !exploreBtnRef.current.contains(event.target as Node)
      ) {
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
            {!isMounted ? (
              <svg height="32" viewBox="0 0 224 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.355 64V24.675H21.645C32.48 24.675 39.135 31.715 39.135 44.365C39.135 57.015 32.7 64 21.81 64H6.355ZM12.9 30.23V58.445H21.315C30.115 58.445 32.59 51.9 32.59 44.365C32.59 36.83 30.115 30.23 21.315 30.23H12.9Z" fill="#3C3C3C" />
                <path d="M68.424 57.746C74.862 57.746 77.452 53.75 78.118 51.456H85.888C83.964 58.634 78.34 64.11 68.646 64.11C56.88 64.11 49.702 55.97 49.702 44.13C49.702 31.846 56.88 24.15 68.276 24.15C80.486 24.15 86.48 32.66 86.48 46.128H57.472C57.472 52.492 61.542 57.746 68.424 57.746ZM68.276 30.292C61.986 30.292 57.472 34.51 57.472 40.356H78.71C78.71 34.51 74.566 30.292 68.276 30.292ZM94.6402 25.186H102.854L112.4 54.786H112.474L122.02 25.186H130.234L116.84 63H108.034L94.6402 25.186Z" fill="#3C3C3C" />
                <path
                  d="M138.595 52.275C138.595 47.05 142.005 44.355 145.635 42.76V42.65C142.94 41.22 140.41 38.855 140.41 34.565C140.41 28.02 145.855 24.17 153.28 24.17C160.705 24.17 166.15 28.02 166.15 34.565C166.15 38.855 163.565 41.22 160.925 42.65V42.76C164.5 44.355 168.02 47.05 168.02 52.275C168.02 59.975 161.585 63.825 153.28 63.825C144.975 63.825 138.595 59.975 138.595 52.275ZM153.28 40.395C157.515 40.395 160.155 38.525 160.155 34.84C160.155 31.21 157.515 29.23 153.28 29.23C149.045 29.23 146.405 31.21 146.405 34.84C146.405 38.525 149.045 40.395 153.28 40.395ZM153.28 58.6C158.45 58.6 161.64 56.07 161.64 51.89C161.64 47.765 158.45 45.235 153.28 45.235C148.165 45.235 144.92 47.765 144.92 51.89C144.92 56.07 148.165 58.6 153.28 58.6Z"
                  fill="#3C3C3C"
                />
                <path d="M177.776 25.186H186.582L195.166 38.506H195.314L203.898 25.186H212.704L199.976 43.686L214.11 63H205.082L195.314 48.792H195.166L185.546 63H176.444L190.578 43.686L177.776 25.186Z" fill="#3C3C3C" />
              </svg>
            ) : isHelloabdul ? (
              <svg height="32" viewBox="0 0 773 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'auto', height: '32px' } as CSSProperties}>
                <path
                  d="M289 88C289 105.6 278.6 113.8 266.8 117.8V118.2C281.8 120.8 294.6 131.8 294.6 153.2C294.6 180.8 275.6 195 246 195H181.2V52H242.6C272 52 289 65 289 88ZM205 111.2H241.8C258.8 111.2 265.2 104.4 265.2 91.8C265.2 79.2 257.4 72.2 243.2 72.2H205V111.2ZM205 129V174.8H244.2C264.6 174.8 270.8 165.2 270.8 151.8C270.8 137.2 261.8 129 246.8 129H205ZM341.864 195V52H397.464C436.864 52 461.064 77.6 461.064 123.6C461.064 169.6 437.664 195 398.064 195H341.864ZM365.664 72.2V174.8H396.264C428.264 174.8 437.264 151 437.264 123.6C437.264 96.2 428.264 72.2 396.264 72.2H365.664ZM620.945 146.2C620.945 177.4 604.345 198 564.545 198C524.745 198 508.145 177.4 508.145 146.2V52H531.945V146.2C531.945 167.8 542.745 177.6 564.545 177.6C586.545 177.6 597.345 167.8 597.345 146.2V52H620.945V146.2ZM673.544 52H697.344V174.8H768.744V195H673.544V52Z"
                  fill="#3C3C3C"
                />
                <path d="M134 195H103.077L67.1393 83.0626H66.8607L30.9231 195H0L50.4241 52L83.5759 52L134 195Z" fill="#3C3C3C" />
                <path d="M67.1393 182.967C56.8316 182.967 49.0312 175.971 49.0312 164.777C49.0312 153.863 56.8316 146.587 67.1393 146.587C77.1684 146.587 84.9688 153.863 84.9688 164.777C84.9688 175.971 77.1684 182.967 67.1393 182.967Z" fill="#3C3C3C" />
              </svg>
            ) : (
              <svg height="32" viewBox="0 0 224 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.355 64V24.675H21.645C32.48 24.675 39.135 31.715 39.135 44.365C39.135 57.015 32.7 64 21.81 64H6.355ZM12.9 30.23V58.445H21.315C30.115 58.445 32.59 51.9 32.59 44.365C32.59 36.83 30.115 30.23 21.315 30.23H12.9Z" fill="#3C3C3C" />
                <path d="M68.424 57.746C74.862 57.746 77.452 53.75 78.118 51.456H85.888C83.964 58.634 78.34 64.11 68.646 64.11C56.88 64.11 49.702 55.97 49.702 44.13C49.702 31.846 56.88 24.15 68.276 24.15C80.486 24.15 86.48 32.66 86.48 46.128H57.472C57.472 52.492 61.542 57.746 68.424 57.746ZM68.276 30.292C61.986 30.292 57.472 34.51 57.472 40.356H78.71C78.71 34.51 74.566 30.292 68.276 30.292ZM94.6402 25.186H102.854L112.4 54.786H112.474L122.02 25.186H130.234L116.84 63H108.034L94.6402 25.186Z" fill="#3C3C3C" />
                <path
                  d="M138.595 52.275C138.595 47.05 142.005 44.355 145.635 42.76V42.65C142.94 41.22 140.41 38.855 140.41 34.565C140.41 28.02 145.855 24.17 153.28 24.17C160.705 24.17 166.15 28.02 166.15 34.565C166.15 38.855 163.565 41.22 160.925 42.65V42.76C164.5 44.355 168.02 47.05 168.02 52.275C168.02 59.975 161.585 63.825 153.28 63.825C144.975 63.825 138.595 59.975 138.595 52.275ZM153.28 40.395C157.515 40.395 160.155 38.525 160.155 34.84C160.155 31.21 157.515 29.23 153.28 29.23C149.045 29.23 146.405 31.21 146.405 34.84C146.405 38.525 149.045 40.395 153.28 40.395ZM153.28 58.6C158.45 58.6 161.64 56.07 161.64 51.89C161.64 47.765 158.45 45.235 153.28 45.235C148.165 45.235 144.92 47.765 144.92 51.89C144.92 56.07 148.165 58.6 153.28 58.6Z"
                  fill="#3C3C3C"
                />
                <path d="M177.776 25.186H186.582L195.166 38.506H195.314L203.898 25.186H212.704L199.976 43.686L214.11 63H205.082L195.314 48.792H195.166L185.546 63H176.444L190.578 43.686L177.776 25.186Z" fill="#3C3C3C" />
              </svg>
            )}
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
                <button ref={exploreBtnRef} className={`${styles['menu__link']} ${currentPath.includes('/expertise') || currentPath.includes('/offers') || currentPath.includes('/careers') || currentPath.includes('/internships') || currentPath.includes('/plans-and-pricing') || currentPath.includes('/our-process') || currentPath.includes('/web-applications') || currentPath.includes('/mobile-applications') || currentPath.includes('/saas-applications') || currentPath.includes('/cto-as-a-service') || currentPath.includes('/services-for-early-stage-startups') || currentPath.includes('/services-for-growth-stage-startups') || currentPath.includes('/pricing') ? styles['menu__link--active'] : ''}`} onClick={handleExpertiseClick}>
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
                left: '0px',
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
                left: '0px',
              }}
            ></div>
          </div>
        </nav>

        {/* Face / nothing wrapper */}
        <div className={styles['face']}>
          <div>
            <div>
              {!isMounted ? (
                <svg width="40" height="40" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ '--width': 40, '--height': 40 } as CSSProperties}>
                  <g filter="url(#filter0_d_80_102)">
                    <path
                      d="M510.4 878.75C373.55 878.75 310.3 798.25 310.3 715.45C310.3 611.95 383.9 552.15 434.5 508.45V506.15C383.9 462.45 310.3 403.8 310.3 300.3C310.3 217.5 373.55 137 510.4 137C646.1 137 709.35 217.5 709.35 300.3C709.35 403.8 624.25 462.45 573.65 506.15V508.45C624.25 552.15 709.35 611.95 709.35 715.45C709.35 798.25 646.1 878.75 510.4 878.75ZM616.2 695.9C616.2 632.65 549.5 586.65 509.25 554.45C469 586.65 401.15 632.65 401.15 695.9C401.15 748.8 434.5 786.75 509.25 786.75C584 786.75 616.2 748.8 616.2 695.9ZM616.2 319.85C616.2 266.95 584 229 509.25 229C434.5 229 401.15 266.95 401.15 319.85C401.15 383.1 469 429.1 509.25 461.3C549.5 429.1 616.2 383.1 616.2 319.85Z"
                      fill="#3C3C3C"
                    />
                  </g>
                  <defs>
                    <filter id="filter0_d_80_102" x="260.3" y="91" width="499.05" height="841.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="25" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_80_102" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_80_102" result="shape" />
                    </filter>
                  </defs>
                </svg>
              ) : isHelloabdul ? (
                <svg width="32" height="32" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ '--width': 40, '--height': 40 } as CSSProperties}>
                  <g filter="url(#filter0_d_505_1580)">
                    <path d="M860.5 883H699.654L512.725 302.178H511.276L324.346 883H163.5L425.781 141L598.219 141L860.5 883Z" fill="#3C3C3C" />
                    <path d="M511.149 843.289C457.534 843.289 416.96 806.988 416.96 748.906C416.96 692.276 457.534 654.522 511.149 654.522C563.316 654.522 603.89 692.276 603.89 748.906C603.89 806.988 563.316 843.289 511.149 843.289Z" fill="#3C3C3C" />
                  </g>
                  <defs>
                    <filter id="filter0_d_505_1580" x="113.5" y="95" width="797" height="842" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="25" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_505_1580" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_505_1580" result="shape" />
                    </filter>
                  </defs>
                </svg>
              ) : (
                <svg width="40" height="40" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ '--width': 40, '--height': 40 } as CSSProperties}>
                  <g filter="url(#filter0_d_80_102)">
                    <path
                      d="M510.4 878.75C373.55 878.75 310.3 798.25 310.3 715.45C310.3 611.95 383.9 552.15 434.5 508.45V506.15C383.9 462.45 310.3 403.8 310.3 300.3C310.3 217.5 373.55 137 510.4 137C646.1 137 709.35 217.5 709.35 300.3C709.35 403.8 624.25 462.45 573.65 506.15V508.45C624.25 552.15 709.35 611.95 709.35 715.45C709.35 798.25 646.1 878.75 510.4 878.75ZM616.2 695.9C616.2 632.65 549.5 586.65 509.25 554.45C469 586.65 401.15 632.65 401.15 695.9C401.15 748.8 434.5 786.75 509.25 786.75C584 786.75 616.2 748.8 616.2 695.9ZM616.2 319.85C616.2 266.95 584 229 509.25 229C434.5 229 401.15 266.95 401.15 319.85C401.15 383.1 469 429.1 509.25 461.3C549.5 429.1 616.2 383.1 616.2 319.85Z"
                      fill="#3C3C3C"
                    />
                  </g>
                  <defs>
                    <filter id="filter0_d_80_102" x="260.3" y="91" width="499.05" height="841.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="25" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_80_102" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_80_102" result="shape" />
                    </filter>
                  </defs>
                </svg>
              )}
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
