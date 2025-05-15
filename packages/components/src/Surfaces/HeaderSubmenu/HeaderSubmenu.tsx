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
            {/* <div className={styles['submenu__group']}>
              <h2 className={styles['submenu__heading']}>What We Do</h2>
              <ul className={styles['submenu__list']}>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--cyan']}`} href="/expertise/websites">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 13, '--height': 13 } as React.CSSProperties}>
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.1394 5.01368L2.39831 2.39886L5.01298 10.1395L5.48339 8.34164C5.84937 6.94286 6.94172 5.85047 8.34048 5.48443L10.1394 5.01368ZM3.03835 0.504042C1.46994 -0.0257391 -0.02629 1.47049 0.503491 3.0389L3.11816 10.7796C3.75352 12.6606 6.4453 12.5665 6.94785 10.6458L7.41826 8.84789C7.60125 8.1485 8.14742 7.6023 8.8468 7.41928L10.6458 6.94853C12.5664 6.44592 12.6604 3.7542 10.7795 3.11886L3.03835 0.504042Z" fill="currentColor"></path>
                    </svg>
                    Websites
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--pink']}`} href="/expertise/web-applications">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.60585 5.36396L6.77742 2.53553C6.3869 2.14501 5.75373 2.14501 5.36321 2.53553L2.53478 5.36396C2.14425 5.75449 2.14425 6.38765 2.53478 6.77817L5.36321 9.6066C5.75373 9.99713 6.3869 9.99713 6.77742 9.6066L9.60585 6.77817C9.99637 6.38765 9.99637 5.75449 9.60585 5.36396ZM8.19163 1.12132C7.02006 -0.0502524 5.12056 -0.0502524 3.94899 1.12132L1.12057 3.94975C-0.0510073 5.12132 -0.0510076 7.02082 1.12057 8.19239L3.94899 11.0208C5.12056 12.1924 7.02006 12.1924 8.19163 11.0208L11.0201 8.19239C12.1916 7.02082 12.1916 5.12132 11.0201 3.94975L8.19163 1.12132Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Web Apps
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--blue']}`} href="/expertise/mobile-apps">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 10, '--height': 12 } as React.CSSProperties}>
                      <path fillRule="evenodd" clipRule="evenodd" d="M3 2H7C7.55228 2 8 2.44772 8 3V9C8 9.55228 7.55228 10 7 10H3C2.44772 10 2 9.55228 2 9V3C2 2.44772 2.44772 2 3 2ZM0 3C0 1.34315 1.34315 0 3 0H7C8.65685 0 10 1.34315 10 3V9C10 10.6569 8.65685 12 7 12H3C1.34315 12 0 10.6569 0 9V3ZM4 8C3.72386 8 3.5 8.22386 3.5 8.5C3.5 8.77614 3.72386 9 4 9H6C6.27614 9 6.5 8.77614 6.5 8.5C6.5 8.22386 6.27614 8 6 8H4Z" fill="currentColor"></path>
                    </svg>
                    Mobile Apps
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--green']}`} href="/expertise/ecommerce">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.78072 1.8437C6.59105 1.32501 6.85778 0.750766 7.37647 0.561094C7.89516 0.371422 8.46941 0.638147 8.65908 1.15684L9.69876 4.00004H10.4389C11.0895 4.00004 11.5669 4.61143 11.4091 5.24258L9.90908 11.2426C9.79779 11.6877 9.39781 12 8.93894 12H2.50049C2.04163 12 1.64164 11.6877 1.53035 11.2426L0.0303501 5.24258C-0.127437 4.61143 0.349922 4.00004 1.00049 4.00004H1.61336L2.79264 1.12148C3.00202 0.610423 3.58604 0.365856 4.0971 0.575227C4.60816 0.784598 4.85273 1.36862 4.64336 1.87968L3.77469 4.00004H7.56924L6.78072 1.8437ZM2.28127 6.00004L3.28127 10H8.15816L9.15816 6.00004H2.28127Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    eCommerce
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--purple']}`} href="/expertise/data-visualisation">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path d="M4.91099 2.67464L4.41211 0.210938C3.02176 0.618889 1.78262 1.52572 0.996094 2.70471L3.17218 3.95928C3.59607 3.37008 4.20075 2.9167 4.91099 2.67464Z" fill="currentColor" fillOpacity="0.2"></path>
                      <path d="M2.50847 6.00065C2.50847 5.50178 2.61414 5.0029 2.8261 4.54949L0.650014 3.29492C0.226707 4.12618 0 5.06308 0 5.99999C0 7.11817 0.302276 8.2069 0.891471 9.14381L2.94725 7.708C2.67449 7.19437 2.50847 6.60522 2.50847 6.00065Z" fill="currentColor" fillOpacity="0.5"></path>
                      <path d="M3.33802 8.25195L1.26758 9.68776C1.9477 10.5344 2.83911 11.1991 3.83692 11.5924L4.62272 9.20427C4.12384 8.99292 3.68575 8.66049 3.33802 8.25195Z" fill="currentColor" fillOpacity="0.8"></path>
                      <path d="M6.01475 0C5.69711 0 5.36473 0.0301097 5.04771 0.0755689L5.54658 2.53927C5.69772 2.52392 5.86421 2.50916 6.01535 2.50916C7.95007 2.50916 9.5216 4.08069 9.5216 6.0154C9.52101 7.94952 7.94946 9.50639 6.01475 9.50639C5.75793 9.50639 5.50112 9.47628 5.2437 9.41547L4.47266 11.8036C4.97153 11.9394 5.48516 12.0002 5.99945 12.0002C9.30907 12.0002 11.9995 9.30979 11.9995 6.00018C12.0001 2.69056 9.32448 0.000154226 6.01472 0.000154226L6.01475 0Z" fill="currentColor"></path>
                    </svg>
                    Data Vis
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles['submenu__group']}>
              <h2 className={styles['submenu__heading']}>Design &amp; UX</h2>
              <ul className={styles['submenu__list']}>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--purple']}`} href="/expertise/user-research-validation">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5 2.5C7.5 3.32843 6.82843 4 6 4C5.17157 4 4.5 3.32843 4.5 2.5C4.5 1.67157 5.17157 1 6 1C6.82843 1 7.5 1.67157 7.5 2.5ZM8.15371 3.77024C7.71864 4.50632 6.91697 5 6 5C5.08303 5 4.28136 4.50632 3.84629 3.77025C3.54465 4.49246 2.83159 5 2 5C0.895431 5 0 4.10457 0 3C0 1.89543 0.895431 1 2 1C2.65397 1 3.23463 1.31388 3.59955 1.79921C3.90255 0.759607 4.86256 0 6 0C7.13744 0 8.09746 0.759608 8.40045 1.79921C8.76537 1.31388 9.34603 1 10 1C11.1046 1 12 1.89543 12 3C12 4.10457 11.1046 5 10 5C9.16841 5 8.45535 4.49246 8.15371 3.77024ZM11 3C11 3.55228 10.5523 4 10 4C9.44772 4 9 3.55228 9 3C9 2.44772 9.44772 2 10 2C10.5523 2 11 2.44772 11 3ZM2 4C2.55228 4 3 3.55228 3 3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4ZM6 5.5C5.10112 5.5 4.29458 5.89533 3.74475 6.5216C3.40212 5.91191 2.74916 5.5 2 5.5C0.895431 5.5 0 6.39543 0 7.5V9C0 9.27614 0.223858 9.5 0.5 9.5C0.776142 9.5 1 9.27614 1 9V7.5C1 6.94772 1.44772 6.5 2 6.5C2.55228 6.5 3 6.94772 3 7.5V8.5V9V11C3 11.2761 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.2761 4 11V9V8.5C4 7.39543 4.89543 6.5 6 6.5C7.10457 6.5 8 7.39543 8 8.5V9V11C8 11.2761 8.22386 11.5 8.5 11.5C8.77614 11.5 9 11.2761 9 11V9V8.5V7.5C9 6.94772 9.44772 6.5 10 6.5C10.5523 6.5 11 6.94772 11 7.5V9C11 9.27614 11.2239 9.5 11.5 9.5C11.7761 9.5 12 9.27614 12 9V7.5C12 6.39543 11.1046 5.5 10 5.5C9.25084 5.5 8.59788 5.91191 8.25525 6.5216C7.70542 5.89533 6.89888 5.5 6 5.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    User Research
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--cyan']}`} href="/expertise/user-experience-design">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 10.2189V2.28049L8.60141 2.88013C8.56774 2.88855 8.53392 2.89608 8.5 2.90271V10.8439L11 10.2189ZM7.5 10.6317L4.77808 9.27072C4.68789 9.22562 4.59492 9.18765 4.5 9.15691L4.5 1.36774L7.22192 2.7287C7.31211 2.7738 7.40508 2.81177 7.5 2.84251L7.5 10.6317ZM3.5 9.09671L3.5 1.15549L1 1.78049L0.999999 9.71893L3.39859 9.11929C3.43226 9.11087 3.46608 9.10334 3.5 9.09671ZM0.757464 0.810343C0.312297 0.921635 0 1.32162 0 1.78049V9.71893C0 10.3695 0.611388 10.8469 1.24254 10.6891L3.64112 10.0894C3.8727 10.0315 4.11736 10.0584 4.33087 10.1651L7.66913 11.8343C7.88264 11.941 8.12729 11.9679 8.35888 11.91L11.2425 11.1891C11.6877 11.0778 12 10.6778 12 10.2189V2.28049C12 1.62991 11.3886 1.15256 10.7575 1.31034L8.35888 1.90999C8.1273 1.96789 7.88264 1.94103 7.66913 1.83427L4.33087 0.165144C4.11736 0.0583895 3.8727 0.031533 3.64112 0.089429L0.757464 0.810343Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    UX Design
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--pink']}`} href="/expertise/user-interface-design">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 1H3V1.5V2.5V3H1V1ZM4 1V1.5L8 1.5V1C8 0.447715 8.44772 0 9 0H11C11.5523 0 12 0.447715 12 1V3C12 3.55228 11.5523 4 11 4H10.5V8H11C11.5523 8 12 8.44772 12 9V11C12 11.5523 11.5523 12 11 12H9C8.44772 12 8 11.5523 8 11V10.5H4V11C4 11.5523 3.55228 12 3 12H1C0.447715 12 0 11.5523 0 11V9C0 8.44772 0.447715 8 1 8H1.5L1.5 4H1C0.447715 4 0 3.55228 0 3V1C0 0.447715 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1ZM3 10.5V9.5V9H2.5H1.5H1V11H3V10.5ZM4 9.5H8V9C8 8.44772 8.44772 8 9 8H9.5V4H9C8.44772 4 8 3.55228 8 3V2.5L4 2.5V3C4 3.55228 3.55228 4 3 4H2.5L2.5 8H3C3.55228 8 4 8.44772 4 9V9.5ZM9 1H11V3H9V1ZM9.5 9H9V11H11V9H10.5H9.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    UI Design
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--blue']}`} href="/expertise/prototyping">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99995 0.999973C9.99995 0.678001 9.73894 0.416992 9.41696 0.416992C9.09499 0.416992 8.83398 0.678001 8.83398 0.999973V1.58301H8.25095C7.92898 1.58301 7.66797 1.84402 7.66797 2.16599C7.66797 2.48796 7.92898 2.74897 8.25095 2.74897H8.83398V3.33189C8.83398 3.65387 9.09499 3.91488 9.41696 3.91488C9.73894 3.91488 9.99995 3.65387 9.99995 3.33189V2.74897H10.5829C10.9048 2.74897 11.1659 2.48796 11.1659 2.16599C11.1659 1.84402 10.9048 1.58301 10.5829 1.58301H9.99995V0.999973ZM3.39252 1.19431C3.39252 0.872337 3.13151 0.611328 2.80954 0.611328C2.48757 0.611328 2.22656 0.872337 2.22656 1.19431V1.77734H1.64353C1.32156 1.77734 1.06055 2.03835 1.06055 2.36032C1.06055 2.6823 1.32156 2.9433 1.64353 2.9433H2.22656V3.52623C2.22656 3.8482 2.48757 4.10921 2.80954 4.10921C3.13151 4.10921 3.39252 3.8482 3.39252 3.52623V2.9433H3.97545C4.29742 2.9433 4.55843 2.6823 4.55843 2.36032C4.55843 2.03835 4.29742 1.77734 3.97545 1.77734H3.39252V1.19431ZM7.47266 9.55075C7.47266 9.22878 7.73367 8.96777 8.05564 8.96777H8.63867V8.38474C8.63867 8.06277 8.89968 7.80176 9.22165 7.80176C9.54362 7.80176 9.80463 8.06277 9.80463 8.38474V8.96777H10.3876C10.7095 8.96777 10.9705 9.22878 10.9705 9.55075C10.9705 9.87273 10.7095 10.1337 10.3876 10.1337H9.80463V10.7167C9.80463 11.0386 9.54362 11.2996 9.22165 11.2996C8.89968 11.2996 8.63867 11.0386 8.63867 10.7167V10.1337H8.05564C7.73367 10.1337 7.47266 9.87273 7.47266 9.55075ZM6.30779 4.80659C6.08048 4.80659 5.86248 4.89688 5.70175 5.05762L5.26847 5.49089L6.48056 6.70298L6.91383 6.2697C7.07457 6.10897 7.16487 5.89097 7.16487 5.66366C7.16487 5.43635 7.07457 5.21835 6.91383 5.05762C6.7531 4.89688 6.5351 4.80659 6.30779 4.80659ZM6.95157 7.88088L7.73829 7.09416C8.11769 6.71477 8.33083 6.2002 8.33083 5.66366C8.33083 5.12712 8.11769 4.61255 7.73829 4.23316C7.3589 3.85377 6.84433 3.64062 6.30779 3.64062C5.77125 3.64062 5.25668 3.85377 4.87729 4.23316L4.0866 5.02384C4.06629 5.03939 4.04676 5.05646 4.02817 5.07505C4.00959 5.09363 3.99252 5.11316 3.97697 5.13348L0.597927 8.51252C0.408776 8.69949 0.258541 8.9221 0.15591 9.16748C0.052996 9.41354 0 9.67759 0 9.9443C0 10.211 0.052996 10.4751 0.15591 10.7211C0.258305 10.9659 0.408086 11.1881 0.596625 11.3748C0.783338 11.5634 1.00549 11.7131 1.25032 11.8155C1.49638 11.9185 1.76044 11.9715 2.02715 11.9715C2.29386 11.9715 2.55791 11.9185 2.80397 11.8155C3.04936 11.7129 3.27197 11.5627 3.45894 11.3735L6.83401 7.99845C6.85595 7.98199 6.87699 7.96378 6.89695 7.94383C6.91691 7.92387 6.93512 7.90282 6.95157 7.88088ZM5.6561 7.52743L4.44402 6.31535L1.41827 9.3411C1.33835 9.41992 1.27489 9.51383 1.23158 9.61738C1.18826 9.72093 1.16596 9.83206 1.16596 9.9443C1.16596 10.0566 1.18826 10.1677 1.23158 10.2712C1.27489 10.3748 1.33834 10.4687 1.41826 10.5475L1.42397 10.5532C1.50279 10.6331 1.59667 10.6966 1.70022 10.7399C1.80377 10.7832 1.9149 10.8055 2.02715 10.8055C2.13939 10.8055 2.25052 10.7832 2.35407 10.7399C2.45763 10.6966 2.55154 10.6331 2.63036 10.5532L2.63318 10.5503L5.6561 7.52743Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Prototyping
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--green']}`} href="/expertise/design-systems">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.09029 1.46604C9.84147 1.00116 10.4828 1.2137 10.6349 1.36576C10.7468 1.47767 10.8367 1.68678 10.8128 2.06764C10.7889 2.44749 10.653 2.93628 10.3918 3.508C9.87128 4.64777 8.89941 6.01698 7.58912 7.32727C6.27883 8.63756 4.90962 9.60943 3.76985 10.13C3.19813 10.3911 2.70934 10.5271 2.32949 10.5509C1.94863 10.5749 1.73952 10.4849 1.62761 10.373C1.50076 10.2462 1.33189 9.78051 1.54742 9.19465C1.68424 9.36994 1.83328 9.53878 1.99453 9.70004C2.18979 9.8953 2.50638 9.8953 2.70164 9.70004C2.8969 9.50478 2.8969 9.1882 2.70164 8.99293C0.964038 7.25533 0.964038 4.43813 2.70164 2.70053C4.43924 0.962929 7.25644 0.962929 8.99404 2.70053C9.1893 2.89579 9.50589 2.89579 9.70115 2.70053C9.89641 2.50527 9.89641 2.18868 9.70115 1.99342C9.50779 1.80006 9.3035 1.62426 9.09029 1.46604ZM8.15939 0.910247C9.33159 -0.0640251 10.7102 0.0268712 11.342 0.658653C11.7303 1.04696 11.845 1.58622 11.8108 2.13036C11.7766 2.67552 11.5915 3.28838 11.3015 3.92344C11.2576 4.01959 11.211 4.11683 11.1618 4.21503C11.7945 6.11711 11.3545 8.29948 9.83922 9.81481C8.24465 11.4094 6.07508 11.9185 4.07376 11.0896C3.47855 11.3509 2.90539 11.5167 2.39222 11.549C1.84807 11.5832 1.30881 11.4684 0.920504 11.0801C0.344755 10.5044 0.217156 9.30844 0.937501 8.21332C-0.0402583 6.18473 0.312086 3.67587 1.99453 1.99342C3.66179 0.326158 6.14062 -0.0349001 8.15939 0.910247ZM5.33015 10.4215C6.66658 10.6568 8.03716 10.2027 9.13211 9.1077C10.1233 8.1165 10.5523 6.77526 10.4176 5.48078C9.85283 6.32343 9.13442 7.19618 8.29623 8.03437C7.32036 9.01023 6.29766 9.82374 5.33015 10.4215Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Design Systems
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles['submenu__group']}>
              <h2 className={styles['submenu__heading']}>Technology</h2>
              <ul className={styles['submenu__list']}>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--purple']}`} href="/expertise/headless">
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 10, '--height': 14 } as React.CSSProperties}>
                      <path d="M6.33279 1L1.07945 7.11733C1.03819 7.16583 1.01169 7.22513 1.00307 7.28822C0.994449 7.35131 1.00408 7.41554 1.03082 7.47333C1.05757 7.53112 1.1003 7.58003 1.15397 7.6143C1.20764 7.64856 1.27 7.66673 1.33368 7.66667H3.66612V13L8.91945 6.88267C8.96066 6.83423 8.98716 6.77501 8.99581 6.712C9.00446 6.64899 8.9949 6.58483 8.96827 6.52707C8.94164 6.46932 8.89903 6.42039 8.8455 6.38606C8.79196 6.35173 8.72972 6.33344 8.66612 6.33333H6.33279V1Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    Headless
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--purple']}`} href="/expertise/react-js">
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 11 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.73853 0.593501C8.91436 0.695013 9.0543 0.899104 9.12704 1.23921C9.19978 1.57927 9.19779 2.02635 9.1128 2.5568C9.08012 2.76076 9.03552 2.97495 8.97922 3.19754C8.48577 3.08589 7.94797 3.00144 7.37947 2.94888C7.04942 2.48239 6.7071 2.05851 6.36339 1.68673C6.52788 1.52682 6.69095 1.38121 6.85113 1.25103C7.26802 0.912202 7.6542 0.686935 7.98508 0.579894C8.31599 0.472842 8.56271 0.491989 8.73853 0.593501ZM5.63539 1.68673C5.47091 1.52683 5.30784 1.38123 5.14768 1.25105C4.73079 0.912227 4.3446 0.68696 4.01373 0.579919C3.68281 0.472867 3.4361 0.492014 3.26027 0.593526C3.08445 0.695038 2.94451 0.89913 2.87176 1.23923C2.79902 1.5793 2.80102 2.02638 2.886 2.55683C2.91869 2.76085 2.96332 2.97513 3.01965 3.19779C3.51303 3.0861 4.05077 3.00161 4.61924 2.949C4.9493 2.48247 5.29165 2.05855 5.63539 1.68673ZM5.99939 1.31295C5.82405 1.14247 5.64935 0.98646 5.47674 0.846171C5.03092 0.483834 4.58794 0.217321 4.17432 0.0835106C3.76073 -0.0502879 3.34762 -0.0593569 2.9994 0.141687C2.65118 0.342731 2.45248 0.705031 2.36156 1.13011C2.27063 1.55522 2.27995 2.07211 2.37083 2.63937C2.40606 2.85923 2.45389 3.08879 2.51395 3.32615C2.27878 3.39273 2.05645 3.46598 1.84877 3.54528C1.31207 3.75021 0.85977 4.00058 0.537076 4.29188C0.21441 4.58316 0 4.93639 0 5.33848C0 5.74057 0.21441 6.0938 0.537076 6.38507C0.85977 6.67637 1.31207 6.92675 1.84877 7.13167C2.05636 7.21094 2.27859 7.28416 2.51364 7.35071C2.45372 7.58764 2.406 7.81679 2.37083 8.03629C2.27995 8.60355 2.27063 9.12044 2.36156 9.54555C2.45248 9.97062 2.65118 10.3329 2.9994 10.534C3.34762 10.735 3.76073 10.7259 4.17432 10.5921C4.58794 10.4583 5.03092 10.1918 5.47674 9.82948C5.64935 9.68919 5.82405 9.53318 5.99939 9.3627C6.17474 9.53319 6.34944 9.68921 6.52207 9.82951C6.96789 10.1918 7.41086 10.4584 7.82449 10.5922C8.23807 10.726 8.65118 10.735 8.9994 10.534C9.34762 10.3329 9.54632 9.97065 9.63724 9.54557C9.72817 9.12046 9.71885 8.60357 9.62797 8.03631C9.59282 7.81691 9.54512 7.58785 9.48524 7.35103C9.7207 7.28439 9.94331 7.21106 10.1512 7.13167C10.6879 6.92675 11.1402 6.67637 11.4629 6.38507C11.7856 6.0938 12 5.74057 12 5.33848C12 4.93639 11.7856 4.58316 11.4629 4.29188C11.1402 4.00058 10.6879 3.75021 10.1512 3.54528C9.94322 3.46586 9.72051 3.3925 9.48493 3.32584C9.54496 3.08858 9.59276 2.85912 9.62797 2.63934C9.71885 2.07208 9.72817 1.55519 9.63724 1.13008C9.54632 0.705005 9.34762 0.342706 8.9994 0.141662C8.65118 -0.0593822 8.23807 -0.0503133 7.82449 0.0834852C7.41086 0.217295 6.96789 0.483808 6.52206 0.846145C6.34944 0.986441 6.17474 1.14246 5.99939 1.31295ZM8.83651 3.70022C8.49968 3.625 8.13935 3.5626 7.76032 3.51505C7.88393 3.70828 8.00505 3.90737 8.12305 4.11175C8.24117 4.31635 8.35313 4.52099 8.45877 4.72487C8.60712 4.37282 8.73324 4.02955 8.83651 3.70022ZM8.75864 5.33783C8.99739 4.81916 9.19317 4.31116 9.3432 3.82795C9.5642 3.89051 9.77209 3.95899 9.96513 4.0327C10.467 4.22433 10.8552 4.44614 11.1133 4.67916C11.3715 4.91221 11.4783 5.13545 11.4783 5.33848C11.4783 5.5415 11.3715 5.76474 11.1133 5.99779C10.8552 6.23082 10.467 6.45263 9.96513 6.64425C9.77219 6.71792 9.56444 6.78637 9.34357 6.8489C9.19349 6.36534 8.99759 5.85692 8.75864 5.33783ZM8.18196 5.33783C8.02861 5.01945 7.85821 4.69653 7.67121 4.37262C7.48433 4.04894 7.29002 3.74012 7.09111 3.44831C6.73876 3.42193 6.37396 3.40804 6 3.40804C5.62559 3.40804 5.26036 3.42196 4.90761 3.4484C4.70874 3.74018 4.51445 4.04896 4.3276 4.3726C4.14059 4.69651 3.97018 5.01944 3.81683 5.33783C3.97018 5.65621 4.14059 5.97915 4.3276 6.30306C4.51474 6.6272 4.70934 6.93644 4.90855 7.22862C5.261 7.25502 5.62592 7.26891 6 7.26891C6.37362 7.26891 6.73812 7.25505 7.09018 7.22871C7.28941 6.9365 7.48404 6.62721 7.67121 6.30303C7.85821 5.97913 8.02861 5.65621 8.18196 5.33783ZM7.75942 7.16202C7.88334 6.96834 8.00476 6.76878 8.12305 6.5639C8.24117 6.35931 8.35313 6.15466 8.45877 5.95079C8.6073 6.30327 8.73355 6.64695 8.83689 6.97665C8.49969 7.05197 8.13893 7.11444 7.75942 7.16202ZM6.69771 7.77489C6.46869 7.78531 6.23586 7.79065 6 7.79065C5.76371 7.79065 5.53046 7.78529 5.30103 7.77484C5.5317 8.07923 5.76587 8.36 5.99939 8.61401C6.2329 8.36001 6.46706 8.07926 6.69771 7.77489ZM6.36339 8.98892C6.70676 8.61751 7.04874 8.1941 7.37848 7.72816C7.94747 7.6756 8.48571 7.5911 8.97953 7.47935C9.03568 7.70149 9.08018 7.91527 9.1128 8.11885C9.19779 8.6493 9.19978 9.09638 9.12704 9.43645C9.0543 9.77655 8.91436 9.98064 8.73853 10.0822C8.56271 10.1837 8.31599 10.2028 7.98508 10.0958C7.6542 9.98872 7.26802 9.76345 6.85113 9.42463C6.69095 9.29445 6.52788 9.14883 6.36339 8.98892ZM5.63539 8.98892C5.29199 8.61748 4.94998 8.19403 4.62022 7.72804C4.05127 7.67543 3.51309 7.59088 3.01933 7.47909C2.96315 7.70131 2.91863 7.91517 2.886 8.11882C2.80102 8.64927 2.79902 9.09635 2.87176 9.43642C2.94451 9.77652 3.08445 9.98061 3.26027 10.0821C3.4361 10.1836 3.68281 10.2028 4.01373 10.0957C4.3446 9.98869 4.73079 9.76343 5.14768 9.4246C5.30784 9.29443 5.47091 9.14882 5.63539 8.98892ZM3.16198 6.9764C3.49912 7.05175 3.85982 7.11424 4.23927 7.16186C4.11539 6.96823 3.99401 6.76874 3.87576 6.56393C3.75763 6.35933 3.64566 6.15467 3.54002 5.95079C3.39153 6.30318 3.26531 6.64678 3.16198 6.9764ZM3.54002 4.72487C3.64566 4.52098 3.75763 4.31633 3.87576 4.11173C3.99372 3.90741 4.1148 3.70839 4.23836 3.51521C3.85939 3.56279 3.49913 3.62522 3.16237 3.70047C3.26562 4.02972 3.39172 4.3729 3.54002 4.72487ZM3.24015 5.33783C3.00125 5.85681 2.80539 6.36512 2.65532 6.84858C2.43487 6.78615 2.22748 6.7178 2.03487 6.64425C1.533 6.45263 1.14482 6.23082 0.886682 5.99779C0.628516 5.76474 0.521739 5.5415 0.521739 5.33848C0.521739 5.13545 0.628516 4.91221 0.886682 4.67916C1.14482 4.44614 1.533 4.22433 2.03487 4.0327C2.22759 3.95912 2.4351 3.89073 2.65569 3.82826C2.80571 4.31137 3.00145 4.81927 3.24015 5.33783ZM5.30001 2.90217C5.52976 2.89168 5.76336 2.8863 6 2.8863C6.23621 2.8863 6.46938 2.89166 6.69873 2.90211C6.46775 2.59722 6.23324 2.31601 5.99939 2.06164C5.76552 2.31603 5.53101 2.59725 5.30001 2.90217ZM7.06882 5.3377C7.06882 5.92841 6.58996 6.40727 5.99925 6.40727C5.40855 6.40727 4.92969 5.92841 4.92969 5.3377C4.92969 4.747 5.40855 4.26814 5.99925 4.26814C6.58996 4.26814 7.06882 4.747 7.06882 5.3377Z"
                        fill="#61DBFB"
                      ></path>
                    </svg>
                    React.js
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--purple']}`} href="/expertise/payload-cms">
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 11, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.28651 0.0193108L10.3588 2.94598L10.3617 2.94884C10.4046 2.97458 10.4332 3.02036 10.4332 3.07185V7.94677C10.4332 8.01257 10.3617 8.05548 10.3045 8.02115L8.98847 7.26302C8.93411 7.23155 8.90264 7.17434 8.90264 7.11426V3.94728C8.90264 3.89578 8.87403 3.85001 8.83112 3.82426L5.29509 1.78446C5.25218 1.75872 5.19496 1.75872 5.15205 1.78446L3.95048 2.47679C3.89613 2.50826 3.83319 2.50826 3.77883 2.47679L2.46283 1.7158C2.40562 1.68147 2.40562 1.60137 2.46283 1.56704L5.14347 0.0193108C5.18638 -0.00643695 5.2436 -0.00643695 5.28651 0.0193108ZM1.61639 8.15269L5.15242 10.1925H5.15528C5.19819 10.2182 5.25541 10.2182 5.29832 10.1925L8.04762 8.6047C8.10197 8.57323 8.16491 8.57323 8.21927 8.6047L9.54671 9.37141C9.60393 9.40574 9.60393 9.48585 9.54671 9.52018L5.28688 11.9805C5.24397 12.0063 5.18675 12.0063 5.14384 11.9805L0.0715216 9.051C0.0286087 9.02525 0 8.97948 0 8.92798V3.07179C0 3.02029 0.0286087 2.97452 0.0715216 2.94877L0.718077 2.574C0.76099 2.54825 0.818208 2.54825 0.861121 2.574L5.79897 5.42342C5.85333 5.45489 5.8848 5.51211 5.8848 5.57219V7.10847C5.8848 7.17427 5.81328 7.21718 5.75606 7.18285L1.65072 4.81406C1.60495 4.78831 1.54487 4.82264 1.54487 4.87699V8.02967C1.54487 8.08116 1.57348 8.12694 1.61639 8.15269Z"
                        fill="#2B2A2D"
                      ></path>
                    </svg>
                    Payload CMS
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--pink']}`} href="/expertise/laravel">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.4522 2.66859C11.4564 2.68431 11.4586 2.70053 11.4586 2.71682V5.24882C11.4586 5.28131 11.45 5.31324 11.4337 5.34136C11.4175 5.36948 11.394 5.3928 11.3658 5.40897L9.24069 6.63251V9.05766C9.24069 9.12366 9.20562 9.18458 9.14839 9.21782L4.71231 11.7715C4.70215 11.7773 4.69108 11.781 4.68 11.7849C4.67585 11.7863 4.67192 11.7888 4.66754 11.79C4.63653 11.7981 4.60393 11.7981 4.57292 11.79C4.56785 11.7886 4.56323 11.7858 4.55838 11.784C4.54823 11.7803 4.53762 11.777 4.52792 11.7715L0.0927692 9.21782C0.064594 9.20163 0.0411832 9.1783 0.0248964 9.15019C0.00860963 9.12207 2.23245e-05 9.09016 0 9.05766L0 1.46166C0 1.44505 0.00230769 1.42889 0.00646154 1.4132C0.00784615 1.40789 0.0110769 1.40305 0.0129231 1.39774C0.0163846 1.38805 0.0196154 1.37812 0.0246923 1.36912C0.0281538 1.36312 0.0332308 1.35828 0.0373846 1.35274C0.0426923 1.34535 0.0475385 1.33774 0.0537692 1.33128C0.0590769 1.32597 0.066 1.32205 0.072 1.31743C0.0786923 1.31189 0.0846923 1.30589 0.0923077 1.30151L2.31023 0.0246626C2.33831 0.00850425 2.37014 0 2.40254 0C2.43494 0 2.46677 0.00850425 2.49485 0.0246626L4.71254 1.30151H4.713C4.72038 1.30612 4.72662 1.31189 4.73331 1.3172C4.73931 1.32182 4.746 1.32597 4.75131 1.33105C4.75777 1.33774 4.76238 1.34535 4.76792 1.35274C4.77185 1.35828 4.77715 1.36312 4.78038 1.36912C4.78569 1.37835 4.78869 1.38805 4.79238 1.39774C4.79423 1.40305 4.79746 1.40789 4.79885 1.41343C4.8031 1.42916 4.80527 1.44537 4.80531 1.46166V6.20605L6.65331 5.14197V2.71659C6.65331 2.70043 6.65562 2.68405 6.65977 2.66859C6.66138 2.66305 6.66438 2.6582 6.66623 2.65289C6.66992 2.6432 6.67315 2.63328 6.67823 2.62428C6.68169 2.61828 6.68677 2.61343 6.69069 2.60789C6.69623 2.60051 6.70085 2.59289 6.70731 2.58643C6.71262 2.58112 6.71931 2.5772 6.72531 2.57259C6.73223 2.56705 6.73823 2.56105 6.74562 2.55666L8.96377 1.27982C8.99184 1.26364 9.02367 1.25512 9.05608 1.25512C9.08848 1.25512 9.12031 1.26364 9.14839 1.27982L11.3661 2.55666C11.3739 2.56128 11.3799 2.56705 11.3868 2.57235C11.3926 2.57697 11.3993 2.58112 11.4046 2.5862C11.4111 2.59289 11.4157 2.60051 11.4212 2.60789C11.4254 2.61343 11.4305 2.61828 11.4337 2.62428C11.439 2.63328 11.442 2.6432 11.4457 2.65289C11.4478 2.6582 11.4508 2.66305 11.4522 2.66859ZM11.0889 5.14197V3.03643L10.3128 3.4832L9.24069 4.10051V6.20605L11.0892 5.14197H11.0889ZM8.87123 8.95082V6.84389L7.81662 7.4462L4.80508 9.16497V11.2917L8.87123 8.95082ZM0.369692 1.78128V8.95082L4.43538 11.2915V9.1652L2.31138 7.96312L2.31069 7.96266L2.30977 7.9622C2.30262 7.95805 2.29662 7.95205 2.28992 7.94697C2.28415 7.94235 2.27746 7.93866 2.27238 7.93359L2.27192 7.93289C2.26592 7.92712 2.26177 7.91997 2.25669 7.91351C2.25208 7.90728 2.24654 7.90197 2.24285 7.89551L2.24262 7.89482C2.23846 7.88789 2.23592 7.87958 2.23292 7.87174C2.22992 7.86482 2.226 7.85835 2.22415 7.85097C2.22185 7.8422 2.22138 7.83274 2.22046 7.82374C2.21954 7.81682 2.21769 7.80989 2.21769 7.80297V7.80251V2.84535L1.14577 2.22782L0.369692 1.78128ZM2.40277 0.398047L0.555 1.46166L2.40231 2.52528L4.24985 1.46143L2.40231 0.398047H2.40277ZM3.36369 7.03589L4.43562 6.41882V1.78128L3.65954 2.22805L2.58738 2.84535V7.48289L3.36369 7.03589ZM9.05608 1.6532L7.20854 2.71682L9.05608 3.78043L10.9034 2.71659L9.05608 1.6532ZM8.87123 4.10051L7.79908 3.4832L7.023 3.03643V5.14197L8.09492 5.75905L8.87123 6.20605V4.10051ZM4.62 8.84535L7.32992 7.29828L8.68454 6.5252L6.83838 5.46228L4.71277 6.68605L2.77546 7.80135L4.62 8.84535Z"
                        fill="#FF2D20"
                      ></path>
                    </svg>
                    Laravel
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--blue']}`} href="/expertise/wordpress-development">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 6C0 2.69158 2.69177 0 6.0002 0C9.30852 0 12.0006 2.69158 12.0007 6C12.0007 9.30882 9.30852 12.0003 6.0002 12.0003C2.69177 12.0003 0 9.30882 0 6ZM0.275122 6C0.275122 9.15691 2.84349 11.7253 6.0002 11.7253C9.15681 11.7253 11.725 9.15691 11.725 6C11.725 2.84329 9.15681 0.275122 6.0002 0.275122C2.84339 0.275122 0.275122 2.84329 0.275122 6ZM9.47473 5.7399C9.47473 5.10376 9.24623 4.66321 9.05025 4.32032L8.99008 4.22299C8.75294 3.84036 8.54476 3.50445 8.54476 3.11326C8.54476 2.6401 8.90363 2.19965 9.40911 2.19965C9.42383 2.19965 9.43807 2.20083 9.45229 2.20201C9.46011 2.20266 9.46792 2.20331 9.47581 2.20376C8.56004 1.36478 7.33996 0.852539 5.9999 0.852539C4.20167 0.852539 2.61959 1.77516 1.69922 3.17262C1.81998 3.17624 1.93379 3.17879 2.03046 3.17879C2.56886 3.17879 3.40226 3.11346 3.40226 3.11346C3.67973 3.0971 3.71244 3.50464 3.43526 3.53746C3.43526 3.53746 3.15642 3.57027 2.84613 3.58653L4.72057 9.16194L5.84701 5.78359L5.04506 3.58633C4.76788 3.57007 4.50529 3.53726 4.50529 3.53726C4.22792 3.521 4.26043 3.09691 4.53781 3.11326C4.53781 3.11326 5.38786 3.17859 5.89364 3.17859C6.43193 3.17859 7.26543 3.11326 7.26543 3.11326C7.5431 3.09691 7.57571 3.50445 7.29844 3.53726C7.29844 3.53726 7.019 3.57007 6.70931 3.58633L8.56944 9.11953L9.08286 7.40386L9.12343 7.2743L9.12343 7.27429C9.32565 6.62905 9.47473 6.15335 9.47473 5.7399ZM0.853516 6.00008C0.853516 8.0375 2.03755 9.79822 3.7545 10.6326L1.29916 3.90527C1.01355 4.54543 0.853516 5.25385 0.853516 6.00008ZM4.54688 10.9379L6.09124 6.4502L7.67361 10.7849C7.6839 10.8103 7.69643 10.8337 7.71024 10.8558C7.17518 11.0439 6.60035 11.1476 6.00094 11.1476C5.49565 11.1476 5.00799 11.0734 4.54688 10.9379ZM10.5169 3.53027C10.539 3.69423 10.5516 3.87023 10.5516 4.05956C10.5516 4.58189 10.454 5.16906 10.1602 5.90324L8.58789 10.4491C10.1182 9.55672 11.1474 7.89883 11.1474 5.99991C11.1475 5.105 10.9189 4.26348 10.5169 3.53027Z"
                        fill="#21759B"
                      ></path>
                    </svg>
                    WordPress
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles['submenu__group']}>
              <h2 className={styles['submenu__heading']}>Experience</h2>
              <ul className={styles['submenu__list']}>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--blue']}`} href="/expertise/commercial">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 10 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.25 2C5.25 1.0335 6.0335 0.25 7 0.25H9C9.9665 0.25 10.75 1.0335 10.75 2V8C10.75 8.08488 10.744 8.16835 10.7323 8.25H11C11.4142 8.25 11.75 8.58579 11.75 9C11.75 9.41421 11.4142 9.75 11 9.75H9.00165C9.0011 9.75 9.00055 9.75 9 9.75H7C6.99952 9.75 6.99905 9.75 6.99857 9.75L5.00117 9.75C5.00078 9.75 5.00039 9.75 5 9.75H3C2.99972 9.75 2.99945 9.75 2.99917 9.75H1C0.585786 9.75 0.25 9.41421 0.25 9C0.25 8.58579 0.585786 8.25 1 8.25H1.26772C1.25604 8.16835 1.25 8.08488 1.25 8V5C1.25 4.0335 2.0335 3.25 3 3.25H5C5.08488 3.25 5.16835 3.25604 5.25 3.26772V2ZM2.99969 8.25C2.99979 8.25 2.9999 8.25 3 8.25H5C5.00015 8.25 5.00029 8.25 5.00044 8.25C5.13831 8.24976 5.25 8.13792 5.25 8V5C5.25 4.86193 5.13807 4.75 5 4.75H3C2.86193 4.75 2.75 4.86193 2.75 5V8C2.75 8.13797 2.86176 8.24983 2.99969 8.25ZM6.99946 8.25C6.99964 8.25 6.99982 8.25 7 8.25H9C9.00021 8.25 9.00042 8.25 9.00062 8.25C9.13841 8.24966 9.25 8.13786 9.25 8V2C9.25 1.86193 9.13807 1.75 9 1.75H7C6.86193 1.75 6.75 1.86193 6.75 2V5V8C6.75 8.13789 6.86164 8.24971 6.99946 8.25Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Commercial
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--pink']}`} href="/expertise/not-for-profit">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 11, '--height': 11 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.17079 0.75C2.26199 0.75 1.44956 1.11992 0.904311 1.76364C0.317158 2.39877 0 3.24128 0 4.13043C0 5.07802 0.323512 5.9153 1.04691 6.78369C1.54552 7.39914 2.21378 7.98177 2.94617 8.6203C3.1115 8.76444 3.28006 8.91148 3.45072 9.06235L3.45477 9.06578C3.79967 9.35787 4.14362 9.64917 4.53618 9.98849C4.74727 10.1929 5.01658 10.25 5.25 10.25C5.48342 10.25 5.75273 10.1929 5.96383 9.98848C6.35623 9.64929 6.70007 9.35809 7.04484 9.0661C8.03841 8.23165 8.84204 7.48826 9.44878 6.78886L9.45194 6.78506C10.1761 5.91619 10.5 5.07852 10.5 4.13043C10.5 3.25038 10.2376 2.40216 9.64119 1.75932C9.05234 1.12461 8.24465 0.75 7.37871 0.75C6.67769 0.75 6.07876 0.965379 5.54052 1.39083L5.52967 1.3994L5.26719 1.65874C5.16561 1.5498 5.06047 1.45752 4.95125 1.38434C4.41711 0.964747 3.82141 0.75 3.17079 0.75ZM2.02132 2.77988C2.31819 2.44465 2.6944 2.27717 3.17079 2.27717C3.46899 2.27717 3.75662 2.36054 4.00198 2.56256L4.01226 2.57102L4.02337 2.57834C4.13958 2.65489 4.23114 2.75331 4.31448 2.86311C4.35646 2.9184 4.39489 2.97456 4.43443 3.03278L4.44201 3.04395L4.44202 3.04396C4.47407 3.09118 4.5082 3.14145 4.54299 3.1884C4.69476 3.4674 4.98115 3.59783 5.25619 3.59783C5.53764 3.59783 5.8319 3.46297 6.00583 3.18799L6.01222 3.17789L6.01762 3.16723C6.10506 2.99443 6.27801 2.74178 6.52613 2.57834L6.53425 2.573L6.54192 2.56704C7.11826 2.11962 7.96241 2.22972 8.48089 2.78237C8.782 3.12372 8.9604 3.60019 8.9604 4.13043C8.9604 4.6876 8.74875 5.17136 8.27414 5.78203C7.78785 6.34884 7.09686 6.95881 6.25618 7.70093L6.25617 7.70093L6.02826 7.90221C5.91338 7.99693 5.80593 8.09167 5.69984 8.18521L5.69984 8.18521L5.69983 8.18522C5.55523 8.31272 5.41315 8.43799 5.25824 8.55791C5.0105 8.35373 4.75775 8.14447 4.47098 7.90161L4.4693 7.90021C3.52618 7.1155 2.75462 6.44672 2.22866 5.78563C1.75209 5.17326 1.5396 4.6887 1.5396 4.13043C1.5396 3.59889 1.71887 3.1214 2.02132 2.77988Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Not for Profit
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--purple']}`} href="/expertise/startups">
                    <svg width="13" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12" fill="none" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 13, '--height': 12 } as React.CSSProperties}>
                      <path
                        d="M10.9408 2.59333C10.4741 2.12 10.0074 1.69333 9.80076 1.78C9.46742 1.91333 9.80076 2.46667 10.0008 2.79333C10.1674 3.07333 11.9074 5.38667 11.9074 7C11.9074 7.85333 11.5874 8.56 11.0141 8.98667C10.5141 9.36 9.85409 9.47333 9.25409 9.29333C8.54076 9.08667 7.95409 8.36 7.21409 7.44667C6.40742 6.45333 5.32742 5.15333 4.49409 5.15333C3.40742 5.15333 3.39409 5.82667 3.32076 6.34667C5.84075 6.77333 6.90742 8.79333 6.90742 9.92667C6.90742 11.06 5.94742 11.9867 4.76742 11.9867C3.68075 11.9867 1.90742 11.1 1.64075 7.92H0.00075531V6.25333H1.64742C1.74742 5.15333 2.37409 3.45333 4.33409 3.45333C5.83409 3.45333 7.12075 4.72667 7.62742 5.34667C8.01409 5.83333 9.00075 7 9.15409 7.16C9.32076 7.36 9.60742 7.72 9.89409 7.72C10.1941 7.72 10.3741 7.16667 10.1341 6.44C9.90075 5.71333 9.20075 4.53333 8.90075 4.09333C8.38075 3.33333 8.03409 2.81333 8.03409 1.90667C8.03409 0.46 9.12742 0 9.70742 0C10.5874 0 11.3541 0.666667 11.5208 0.833333C11.7608 1.07333 11.9608 1.27333 12.1074 1.45333L10.9408 2.59333ZM4.74742 10.3667C4.95409 10.3667 5.24076 10.1933 5.24076 9.88667C5.24076 9.48667 4.75409 8.42 3.32742 8.04667C3.52742 9.84 4.28076 10.3667 4.74742 10.3667Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Innovation
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--yellow']}`} href="/expertise/education">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 12, '--height': 12 } as React.CSSProperties}>
                      <g clipPath="url(#clip0_2715_4746)">
                        <path
                          d="M6.44517 10.848C7.56208 9.90242 8.92969 9.30173 10.3817 9.11897C10.5528 9.09643 10.7099 9.01244 10.8236 8.88266C10.9374 8.75288 11.0001 8.58617 11 8.41359V1.71799C11.0001 1.61541 10.9783 1.514 10.9359 1.4206C10.8935 1.3272 10.8315 1.24398 10.7542 1.17657C10.6769 1.10916 10.586 1.05912 10.4877 1.02984C10.3894 1.00055 10.2859 0.992705 10.1843 1.00682C8.80492 1.22043 7.51112 1.81024 6.44517 2.71139C6.31786 2.80971 6.16153 2.86305 6.00067 2.86305C5.8398 2.86305 5.68348 2.80971 5.55616 2.71139C4.48974 1.81034 3.19546 1.22083 1.81566 1.00771C1.71413 0.993605 1.61076 1.00143 1.51251 1.03066C1.41426 1.05989 1.32342 1.10985 1.24612 1.17717C1.16882 1.24448 1.10685 1.32759 1.06439 1.42088C1.02194 1.51417 0.999978 1.61549 1 1.71799V8.41359C0.999924 8.58617 1.06261 8.75288 1.17637 8.88266C1.29012 9.01244 1.4472 9.09643 1.6183 9.11897C3.07077 9.30148 4.43888 9.90218 5.55616 10.848C5.68338 10.9465 5.83974 11 6.00067 11C6.16159 11 6.31795 10.9465 6.44517 10.848Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path d="M6 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </g>
                    </svg>
                    Education
                  </a>
                </li>
                <li style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0)' }}>
                  <a className={`${styles['submenu__link']} ${styles['submenu__link--cyan']}`} href="/expertise/community">
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={`SVG_svg-raw-wrap__ODfz9 ${styles['submenu__link-icon']}`} style={{ '--width': 10, '--height': 11 } as React.CSSProperties}>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5ZM10 1.5C10 2.32843 9.32843 3 8.5 3C7.67157 3 7 2.32843 7 1.5C7 0.671573 7.67157 0 8.5 0C9.32843 0 10 0.671573 10 1.5ZM2.21843 6.09881C2.16758 5.43943 1.63061 4.94935 1.01907 5.00419C0.407544 5.05902 -0.0469727 5.63801 0.00388392 6.29738C0.107565 7.64164 0.698338 8.88771 1.64819 9.76556C2.57815 10.625 3.77896 11.0638 5 10.9925C6.22104 11.0638 7.42185 10.625 8.35182 9.76556C9.30166 8.88771 9.89244 7.64164 9.99612 6.29738C10.047 5.63801 9.59246 5.05902 8.98093 5.00419C8.3694 4.94935 7.83242 5.43943 7.78157 6.09881C7.72633 6.81491 7.41162 7.4787 6.90563 7.94634C6.39964 8.41398 5.74312 8.6478 5.07835 8.59713C5.02618 8.59316 4.97382 8.59316 4.92165 8.59713C4.25688 8.6478 3.60036 8.41398 3.09437 7.94634C2.58838 7.4787 2.27367 6.81491 2.21843 6.09881Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Community
                  </a>
                </li>
              </ul>
            </div> */}
          </nav>
          <div className={styles['submenu-inner__gradient']}></div>
          <div className={styles['submenu-inner__spacer']}></div>
        </div>
      </div>
    </>
  );
};
