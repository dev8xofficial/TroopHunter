'use client';

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
import PerformanceOptimizationIcon from '../../Icons/PerformanceOptimization';
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
import QAIcon from '../../Icons/QA';
import LoadTestingIcon from '../../Icons/LoadTesting';
import MobileIcon from '../../Icons/Mobile';
import AccessibilityIcon from '../../Icons/Accessibility';
import PrettierIcon from '../../Icons/Prettier';
import GitBranchIcon from '../../Icons/GitBranch';
import GitPullIcon from '../../Icons/GitPull';
import MonoRepoIcon from '../../Icons/MonoRepoArchitecture';
import AgileDeliveryIcon from '../../Icons/AgileDelivery';
import CollabSpaceIcon from '../../Icons/CollabSpace';
import StripeIcon from '../../Icons/Stripe';
import PayPalIcon from '../../Icons/PayPal';
import GoogleAnalyticsIcon from '../../Icons/GoogleAnalytics';
import AnalyticsIcon from '../../Icons/Analytics';
import HotjarIcon from '../../Icons/Hotjar';
import MailchimpIcon from '../../Icons/Mailchimp';
import HubspotIcon from '../../Icons/Hubspot';
import HighAvailabiltyIcon from '../../Icons/HighAvailabilty';
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
import SecureIntegrationsIcon from '../../Icons/SecureIntegrations';

import TextAnimateStyles from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

interface CapabilitiesProps {
  capabilitiesHeading: string;
  capabilitiesContent: CapabilitiesContent;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
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
  PerformanceOptimizationIcon,
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
  QAIcon,
  LoadTestingIcon,
  MobileIcon,
  AccessibilityIcon,
  PrettierIcon,
  GitBranchIcon,
  GitPullIcon,
  MonoRepoIcon,
  AgileDeliveryIcon,
  CollabSpaceIcon,
  StripeIcon,
  PayPalIcon,
  GoogleAnalyticsIcon,
  AnalyticsIcon,
  HotjarIcon,
  MailchimpIcon,
  HubspotIcon,
  HighAvailabiltyIcon,
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
  SecureIntegrationsIcon
};

const Capabilities: React.FC<CapabilitiesProps> = ({ capabilitiesContent, capabilitiesHeading }): JSX.Element => {
  const router = useRouter();
  const isAboutPage = router.pathname === '/about';

  return (
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
                <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                  {word + ' '}
                </span>
              </span>
            );
          })}
        </h2>

        <div className={`${styles['about-capabilities__grid']} ${!isAboutPage && styles['about-capabilities__grid--custom-dev8x-grid-columns']}`}>
          {capabilitiesContent?.length > 0 &&
            capabilitiesContent.map((capability, index) => (
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
                        {IconComponent ? <IconComponent size={24} className={styles['about-column__icon']} /> : itemImage && <img src={itemImage} loading="lazy" width="40" alt={itemName} style={{ display: 'block' }} />}
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
  );
};

export default Capabilities;
