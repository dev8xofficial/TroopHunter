'use client';

import React from 'react';
import NextLink from 'next/link';
import PointerIcon from '../../Icons/Pointer';
import CardIcon from '../../Icons/Card';
import MobileIcon from '../../Icons/Mobile';
import BasketIcon from '../../Icons/Basket';
import DataIcon from '../../Icons/Data';
import MyspaceIcon from '../../Icons/Myspace';
import SelectionIcon from '../../Icons/Selection';
import MagicWandIcon from '../../Icons/MagicWand';
import MapIcon from '../../Icons/Map';
import PlanetRingIcon from '../../Icons/PlanetRing';
import ReactjsIcon from '../../Icons/Reactjs';
import NextjsIcon from '../../Icons/Nextjs';
import NodejsIcon from '../../Icons/Nodejs';
import SupabaseIcon from '../../Icons/Supabase';
import BackendIcon from '../../Icons/Backend';
import SaaSIcon from '../../Icons/SaaS';
import PostgresqlIcon from '../../Icons/Postgresql';
import SequelizeIcon from '../../Icons/Sequelize';
import DockerIcon from '../../Icons/Docker';
import VirtualMachinesIcon from '../../Icons/VirtualMachines';
import AnsibleIcon from '../../Icons/Ansible';
import InfinityIcon from '../../Icons/Infinity';
import WebServersIcon from '../../Icons/WebServers';
import SeismometerIcon from '../../Icons/Seismometer';
import RightArrowIcon from '../../Icons/RightArrow';
import TypeScript from '../../Icons/TypeScript';
import GraphQL from '../../Icons/GraphQL';
import DentistIcon from '../../Icons/Dentist';
import RocketIcon from '../../Icons/Rocket';
import HandshakeIcon from '../../Icons/Handshake';
import TargetIcon from '../../Icons/Target';
import HomeIcon from '../../Icons/HomeIcon';
import { Magnet } from '../../Animations/Magnet';
import { HeaderSubmenuContent } from '../../Interfaces/Navigation/Navigation';

import styles from './index.module.css';

interface HeaderSubmenuProps {
  height: number;
  onLinkClick?: () => void;
  submenus: HeaderSubmenuContent;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: string | number; className?: string }>> = {
  PointerIcon,
  CardIcon,
  MobileIcon,
  BasketIcon,
  DataIcon,
  MyspaceIcon,
  SelectionIcon,
  MagicWandIcon,
  MapIcon,
  PlanetRingIcon,
  ReactjsIcon,
  NextjsIcon,
  NodejsIcon,
  SupabaseIcon,
  BackendIcon,
  SaaSIcon,
  PostgresqlIcon,
  SequelizeIcon,
  DockerIcon,
  VirtualMachinesIcon,
  AnsibleIcon,
  InfinityIcon,
  WebServersIcon,
  SeismometerIcon,
  RightArrowIcon,
  TypeScript,
  GraphQL,
  DentistIcon,
  RocketIcon,
  HandshakeIcon,
  TargetIcon,
  HomeIcon
};

export const HeaderSubmenu: React.FC<HeaderSubmenuProps> = ({ height, onLinkClick, submenus }) => {
  return (
    <>
      <div className={styles['submenu-container']} style={{ '--height': height } as React.CSSProperties}>
        <div className={styles['submenu-inner']}>
          {/* customization */}
          <div className={styles['submenu-inner__content']}>
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
          </div>
          <div className={styles['submenu-inner__gradient']}></div>
          <div className={styles['submenu-inner__spacer']}></div>
        </div>
      </div>
    </>
  );
};
