'use client';

import React from 'react';
import NextLink from 'next/link';

import SaaSIcon from '../../Icons/SaaS';
import DentistIcon from '../../Icons/Dentist';
import RocketIcon from '../../Icons/Rocket';
import ArchitectureIcon from '../../Icons/Architecture';
import GroupUsersIcon from '../../Icons/GroupUsers';
import BrainIcon from '../../Icons/Brain';
import PuzzlePieceIcon from '../../Icons/PuzzlePiece';
import CoinsIcon from '../../Icons/Coins';
import ResponsiveIcon from '../../Icons/Responsive';
import MobileIcon from '../../Icons/Mobile';

import { Magnet } from '../../Animations/Magnet';
import { HeaderSubmenuContent } from '../../Interfaces/Navigation/Navigation';

import styles from './index.module.css';

interface Dev8XSubmenuProps {
  height: number;
  onLinkClick?: () => void;
  submenus: HeaderSubmenuContent;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: string | number; className?: string }>> = {
  RocketIcon,
  GroupUsersIcon,
  BrainIcon,
  ResponsiveIcon,
  SaaSIcon,
  DentistIcon,
  ArchitectureIcon,
  CoinsIcon,
  PuzzlePieceIcon,
  MobileIcon
};

export const Dev8XSubmenu: React.FC<Dev8XSubmenuProps> = ({ height, onLinkClick, submenus }) => {
  return (
    <>
      <div className={styles['submenu-container']} style={{ '--height': height } as React.CSSProperties}>
        <div className={styles['submenu-inner']}>
          <nav className={styles['submenu']}>
            {submenus.map((menu, menuIndex) => (
              <div key={`submenu-group-${menuIndex}`} className={styles['submenu__group']}>
                <h2 className={styles['submenu__heading']}>{menu.heading}</h2>
                <ul className={styles['submenu__list']}>
                  {menu.list.map((item, itemIndex) => {
                    const IconComponent = ICON_MAP[item.iconName];
                    const iconClassName = `${styles['submenu__link-icon']}${item.rotateIcon ? ` ${styles['submenu__link--rotate-45deg']}` : ''}`;

                    return (
                      <Magnet key={`nav-anchor-${menuIndex}-${itemIndex}`}>
                        <li>
                          <NextLink href={item.href} passHref legacyBehavior>
                            <a className={`${styles['submenu__link']} ${styles[`submenu__link--${item.color}`]}`} onClick={onLinkClick}>
                              {IconComponent && <IconComponent size="13" className={`SVG_svg-raw-wrap__ODfz9 ${iconClassName}`} />}
                              {item.title}
                            </a>
                          </NextLink>
                        </li>
                      </Magnet>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
          <div className={styles['submenu-inner__gradient']}></div>
          <div className={styles['submenu-inner__spacer']}></div>
        </div>
      </div>
    </>
  );
};
