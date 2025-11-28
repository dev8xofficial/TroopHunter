import React from 'react';
import { useRouter } from 'next/router';
import { AppearOnScroll, CapabilitiesContent } from '@repo/components';
import ReactjsIcon from '../../Icons/Reactjs';
import NextjsIcon from '../../Icons/Nextjs';
import AwsIcon from '../../Icons/Aws';
import KubernetesIcon from '../../Icons/Kubernetes';
import GithubIcon from '../../Icons/Github';
import DockerIcon from '../../Icons/Docker';
import JenkinsIcon from '../../Icons/Jenkins';
import FlutterIcon from '../../Icons/Flutter';
import DartIcon from '../../Icons/Dart';
import NodejsIcon from '../../Icons/Nodejs';
import BackendIcon from '../../Icons/Backend';
import RestApiIcon from '../../Icons/RestApi';
import PostgresqlIcon from '../../Icons/Postgresql';
import ArchitectureIcon from '../../Icons/Architecture';
import AuthenticationIcon from '../../Icons/Authentication';
import PerformanceIcon from '../../Icons/Performance';
import TestingIcon from '../../Icons/Testing';
import TubroRepoIcon from '../../Icons/TubroRepo';
import FullStackIcon from '../../Icons/FullStack';
import OwernshipIcon from '../../Icons/Owernship';
import InfinityIcon from '../../Icons/Infinity';
import TypeScriptIcon from '../../Icons/TypeScript';
import ReduxIcon from '../../Icons/Redux';
import HtmlIcon from '../../Icons/HTML';
import TailwindIcon from '../../Icons/Tailwind';
import SequelizeIcon from '../../Icons/Sequelize';
import DatabaseIcon from '../../Icons/Database';
import TerraformIcon from '../../Icons/Terraform';
import EndTestingIcon from '../../Icons/EndTesting';
import UnitTestingIcon from '../../Icons/UnitTesting';
import CrossPlatformIcon from '../../Icons/CrossPlatform';
import LoadTestingIcon from '../../Icons/LoadTesting';
import MobileIcon from '../../Icons/Mobile';
import AccessibilityIcon from '../../Icons/Accessibility';
import PrettierIcon from '../../Icons/Prettier';
import GitBranchIcon from '../../Icons/GitBranch';
import GitPullIcon from '../../Icons/GitPull';
import MonoRepoIcon from '../../Icons/MonoRepo';
import AgileDeliveryIcon from '../../Icons/AgileDelivery';
import CollaborationIcon from '../../Icons/Collaboration';
import StripeIcon from '../../Icons/Stripe';
import PayPalIcon from '../../Icons/PayPal';
import GoogleAnaIcon from '../../Icons/GoogleAna';
import AnalyticsIcon from '../../Icons/Analytics';
import HotjarIcon from '../../Icons/Hotjar';
import MailchimpIcon from '../../Icons/Mailchimp';
import HubspotIcon from '../../Icons/Hubspot';
import AvailabiltyIcon from '../../Icons/Availabilty';
import SecurityIcon from '../../Icons/Security';
import GsapIcon from '../../Icons/Gsap';
import ResponsiveIcon from '../../Icons/Responsive';
import ClickUpIcon from '../../Icons/ClickUp';
import SlackIcon from '../../Icons/Slack';
import FigmaIcon from '../../Icons/Figma';
import CanvaIcon from '../../Icons/Canva';
import AdobeIcon from '../../Icons/Adobe';
import SeleniumIcon from '../../Icons/Selenium';
import RapidDeliveryIcon from '../../Icons/RapidDelivery';
import MaintenanceIcon from '../../Icons/Maintenance';
import IntegrationsIcon from '../../Icons/Integrations';

import TextAnimateStyles from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

interface CapabilitiesProps {
  capabilitiesHeading: string;
  capabilities: CapabilitiesContent;
}

const ICON_MAP: Record<string, React.ComponentType<{ width?: number | string; className?: string }>> = {
  ReactjsIcon,
  NextjsIcon,
  AwsIcon,
  KubernetesIcon,
  GithubIcon,
  DockerIcon,
  JenkinsIcon,
  FlutterIcon,
  DartIcon,
  NodejsIcon,
  BackendIcon,
  RestApiIcon,
  PostgresqlIcon,
  ArchitectureIcon,
  AuthenticationIcon,
  PerformanceIcon,
  TestingIcon,
  TubroRepoIcon,
  FullStackIcon,
  OwernshipIcon,
  InfinityIcon,
  TypeScriptIcon,
  ReduxIcon,
  HtmlIcon,
  TailwindIcon,
  SequelizeIcon,
  DatabaseIcon,
  TerraformIcon,
  EndTestingIcon,
  UnitTestingIcon,
  CrossPlatformIcon,
  LoadTestingIcon,
  MobileIcon,
  AccessibilityIcon,
  PrettierIcon,
  GitBranchIcon,
  GitPullIcon,
  MonoRepoIcon,
  AgileDeliveryIcon,
  CollaborationIcon,
  StripeIcon,
  PayPalIcon,
  GoogleAnaIcon,
  AnalyticsIcon,
  HotjarIcon,
  MailchimpIcon,
  HubspotIcon,
  AvailabiltyIcon,
  SecurityIcon,
  GsapIcon,
  ResponsiveIcon,
  ClickUpIcon,
  SlackIcon,
  FigmaIcon,
  CanvaIcon,
  AdobeIcon,
  SeleniumIcon,
  RapidDeliveryIcon,
  MaintenanceIcon,
  IntegrationsIcon
};

const Capabilities: React.FC<CapabilitiesProps> = ({ capabilities, capabilitiesHeading }): JSX.Element => {
  const router = useRouter();
  const isAboutPage = router.pathname === '/about';

  return (
    <>
      <AppearOnScroll>
        <div className={styles['about-capabilities']}>
          <h2 className={styles['about-capabilities__intro']} aria-label={capabilitiesHeading || 'Our capabilities'}>
            {(capabilitiesHeading || 'Our capabilities').split(' ').map((word, index) => {
              const isSpecial = word.toLowerCase().includes('capabilities');
              return (
                <span
                  key={index}
                  className={`${TextAnimateStyles['word']} ${isSpecial ? styles['format'] : ''}`}
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'pre',
                    transform: 'translate3d(0px, 0%, 0px)',
                    opacity: 1,
                    transitionDelay: `${index * 0.05}s`
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      whiteSpace: 'pre',
                      opacity: 1
                    }}
                  >
                    {word + ' '}
                  </span>
                </span>
              );
            })}
          </h2>

          <div className={`${styles['about-capabilities__grid']} ${!isAboutPage && styles['about-capabilities__grid--custom-dev8x-grid-columns']}`}>
            {capabilities?.length > 0 &&
              capabilities.map((capability, index) => (
                <section className={styles['about-column']} style={{ opacity: 1, transform: 'translateX(0px)' }} key={capability.heading || index}>
                  {capability.heading && <h3 className={styles['about-column__heading']}>{capability.heading}</h3>}
                  <ul className={`${styles['about-column__list']} ${!isAboutPage && styles['about-column__list--custom-grid-columns-2']}`}>
                    {capability.items.map((item, itemIndex) => {
                      const itemName = typeof item === 'string' ? item : item.name;
                      const itemImage = typeof item === 'object' ? item.image : undefined;
                      const iconName = typeof item === 'object' ? item.iconName : undefined;
                      const IconComponent = iconName ? ICON_MAP[iconName] : undefined;
                      return (
                        <li key={itemIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {IconComponent ? <IconComponent width={32} className={styles['about-column__icon']} /> : itemImage && <img src={itemImage} loading="lazy" width="40" alt={itemName} style={{ display: 'block' }} />}
                          <span>{itemName}</span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
          </div>
        </div>
      </AppearOnScroll>
    </>
  );
};

export default Capabilities;
