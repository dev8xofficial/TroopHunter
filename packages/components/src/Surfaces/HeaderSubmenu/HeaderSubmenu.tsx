import React from 'react';
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

import styles from './index.module.css';

interface HeaderSubmenuProps {
  height: number;
}

export const HeaderSubmenu: React.FC<HeaderSubmenuProps> = ({ height }: HeaderSubmenuProps): JSX.Element => {
  const submenus = [
    {
      heading: 'What We Do',
      list: [
        {
          title: 'Websites',
          icon: <PointerIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'cyan',
          href: '/expertise/websites'
        },
        {
          title: 'Web Apps',
          icon: <CardIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'pink',
          href: '/expertise/web-applications'
        },
        {
          title: 'Mobile Apps',
          icon: <MobileIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'blue',
          href: '/expertise/mobile-apps'
        },
        {
          title: 'eCommerce',
          icon: <BasketIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'green',
          href: '/expertise/ecommerce'
        },
        {
          title: 'Data Vis',
          icon: <DataIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'purple',
          href: '/expertise/data-visualisation'
        }
      ]
    },
    {
      heading: 'Backend & Databases',
      list: [
        {
          title: 'Backend',
          icon: <BackendIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'cyan',
          href: '/expertise/backend'
        },
        {
          title: 'Real-Time Apps',
          icon: <SeismometerIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'blue',
          href: '/expertise/real-time-apps'
        },
        {
          title: 'SaaS',
          icon: <SaaSIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'green',
          href: '/expertise/saas'
        },
        {
          title: 'PostgreSQL',
          icon: <PostgresqlIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'purple',
          href: '/expertise/postgresql'
        },
        {
          title: 'ORM (Sequelize, Prisma)',
          icon: <SequelizeIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'pink',
          href: '/expertise/orm-sequelize-prisma'
        }
      ]
    },
    {
      heading: 'Design & UX',
      list: [
        {
          title: 'User Research',
          icon: <MyspaceIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'purple',
          href: '/expertise/user-research-validation'
        },
        {
          title: 'UX Design',
          icon: <MapIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'cyan',
          href: '/expertise/user-experience-design'
        },
        {
          title: 'UI Design',
          icon: <SelectionIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'pink',
          href: '/expertise/user-interface-design'
        },
        {
          title: 'Prototyping',
          icon: <MagicWandIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'blue',
          href: '/expertise/prototyping'
        },
        {
          title: 'Design Systems',
          icon: <PlanetRingIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'purple',
          href: '/expertise/design-systems'
        }
      ]
    },
    {
      heading: 'DevOps & Cloud',
      list: [
        {
          title: 'Docker',
          icon: <DockerIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'purple',
          href: '/expertise/docker'
        },
        {
          title: 'Virtualization',
          icon: <VirtualMachinesIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'blue',
          href: '/expertise/virtualization'
        },
        {
          title: 'Ansible & Web Servers',
          icon: <AnsibleIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'cyan',
          href: '/expertise/ansible-web-servers'
        },
        {
          title: 'AWS, Vercel, DigitalOcean',
          icon: <WebServersIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'pink',
          href: '/expertise/aws-vercel-digitalocean'
        },
        {
          title: 'CI/CD',
          icon: <InfinityIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'green',
          href: '/expertise/ci-cd'
        }
      ]
    },
    {
      heading: 'Technology',
      list: [
        {
          title: 'React.js',
          icon: <ReactjsIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'purple',
          href: '/expertise/react-js'
        },
        {
          title: 'Next.js',
          icon: <NextjsIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'cyan',
          href: '/expertise/next-js'
        },
        {
          title: 'Node.js',
          icon: <NodejsIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'blue',
          href: '/expertise/node-js'
        },
        {
          title: 'Express.js / Nest.js',
          icon: <NextjsIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'pink',
          href: '/expertise/express-nest'
        },
        {
          title: 'Supabase',
          icon: <SupabaseIcon width="11" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} />,
          color: 'green',
          href: '/expertise/supabase'
        }
      ]
    }
  ];
  return (
    <>
      <div className={styles['submenu-container']} style={{ '--height': height } as React.CSSProperties}>
        <div className={styles['submenu-inner']}>
          <nav className={styles['submenu']}>
            {submenus.map((menu, menuIndex) => (
              <div key={`submenu-group-${menuIndex}`} className={styles['submenu__group']}>
                <h2 className={styles['submenu__heading']}>{menu.heading}</h2>
                <ul className={styles['submenu__list']}>
                  {menu.list.map((item, itemIndex) => (
                    <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0)' }} key={`nav-anchor-${menuIndex}-${itemIndex}`}>
                      <a className={`${styles['submenu__link']} ${styles[`submenu__link--${item.color}`]}`} href={item.href}>
                        <>
                          {item.icon}
                          {item.title}
                        </>
                      </a>
                    </li>
                  ))}
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
