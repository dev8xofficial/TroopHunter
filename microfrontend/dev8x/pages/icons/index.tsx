'use client';

import React from 'react';
import Head from 'next/head';

import { FooterRevealPageWrap, Footer, Header } from '@repo/components';
import PageData from '../../data/404/index.d';
import SubmenuData from '../../data/navigation/index.d';
import { prefixed } from '../../utils/helpers';
import AccessibilityIcon from '@repo/components/src/Icons/Accessibility';
import AdobeIcon from '@repo/components/src/Icons/Adobe';
import AgileDeliveryIcon from '@repo/components/src/Icons/AgileDelivery';
import AnalysisIcon from '@repo/components/src/Icons/Analysis';
import AnalyticsIcon from '@repo/components/src/Icons/Analytics';
import AnsibleIcon from '@repo/components/src/Icons/Ansible';
import ArchitectureIcon from '@repo/components/src/Icons/Architecture';
import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import AuthenticationIcon from '@repo/components/src/Icons/Authentication';
import AuthorizationIcon from '@repo/components/src/Icons/Authorization';
import AwsIcon from '@repo/components/src/Icons/Aws';
import BackendIcon from '@repo/components/src/Icons/Backend';
import BasketIcon from '@repo/components/src/Icons/Basket';
import BrainIcon from '@repo/components/src/Icons/Brain';
import CanvaIcon from '@repo/components/src/Icons/Canva';
import CardIcon from '@repo/components/src/Icons/Card';
import CaretDownIcon from '@repo/components/src/Icons/CaretDown';
import CaretUpIcon from '@repo/components/src/Icons/CaretUp';
import ClickUpIcon from '@repo/components/src/Icons/ClickUp';
import CoinsIcon from '@repo/components/src/Icons/Coins';
import CollabSpaceIcon from '@repo/components/src/Icons/CollabSpace';
import CreditCardIcon from '@repo/components/src/Icons/CreditCard';
import CrossIcon from '@repo/components/src/Icons/Cross';
import DartIcon from '@repo/components/src/Icons/Dart';
import DataIcon from '@repo/components/src/Icons/Data';
import DatabaseIcon from '@repo/components/src/Icons/Database';
import DataBaseOptimizationIcon from '@repo/components/src/Icons/DataBaseOptimization';
import DentistIcon from '@repo/components/src/Icons/Dentist';
import DevicesIcon from '@repo/components/src/Icons/Devices';
import DockerIcon from '@repo/components/src/Icons/Docker';
import EditIcon from '@repo/components/src/Icons/Edit';
import EndTestingIcon from '@repo/components/src/Icons/EndTesting';
import EyeIcon from '@repo/components/src/Icons/Eye';
import FaceIdIcon from '@repo/components/src/Icons/FaceId';
import FigmaIcon from '@repo/components/src/Icons/Figma';
import FlutterIcon from '@repo/components/src/Icons/Flutter';
import FourDotIcon from '@repo/components/src/Icons/FourDot';
import FullStackIcon from '@repo/components/src/Icons/FullStack';
import GitBranchIcon from '@repo/components/src/Icons/GitBranch';
import GithubIcon from '@repo/components/src/Icons/Github';
import GitlabIcon from '@repo/components/src/Icons/Gitlab';
import GitPullIcon from '@repo/components/src/Icons/GitPull';
import GlobeIcon from '@repo/components/src/Icons/Globe';
import GoogleAnalyticsIcon from '@repo/components/src/Icons/GoogleAnalytics';
import GPSIcon from '@repo/components/src/Icons/GPS';
import GraduateHatIcon from '@repo/components/src/Icons/GraduateHat';
import GraphAnalysisIcon from '@repo/components/src/Icons/GraphAnalysis';
import GraphQLIcon from '@repo/components/src/Icons/GraphQL';
import GroupUsersIcon from '@repo/components/src/Icons/GroupUsers';
import GsapIcon from '@repo/components/src/Icons/Gsap';
import HandPalmIcon from '@repo/components/src/Icons/HandPalm';
import HandshakeIcon from '@repo/components/src/Icons/Handshake';
import HeartIcon from '@repo/components/src/Icons/Heart';
import HighAvailabiltyIcon from '@repo/components/src/Icons/HighAvailabilty';
import HomeIcon from '@repo/components/src/Icons/HomeIcon';
import HotjarIcon from '@repo/components/src/Icons/Hotjar';
import HtmlIcon from '@repo/components/src/Icons/HTML';
import HubspotIcon from '@repo/components/src/Icons/Hubspot';
import InfinityIcon from '@repo/components/src/Icons/Infinity';
import JenkinsIcon from '@repo/components/src/Icons/Jenkins';
import KubernetesIcon from '@repo/components/src/Icons/Kubernetes';
import LaptopIcon from '@repo/components/src/Icons/Laptop';
import LaravelIcon from '@repo/components/src/Icons/Laravel';
import LightningIcon from '@repo/components/src/Icons/Lightning';
import LoadTestingIcon from '@repo/components/src/Icons/LoadTesting';
import MagicWandIcon from '@repo/components/src/Icons/MagicWand';
import MailchimpIcon from '@repo/components/src/Icons/Mailchimp';
import MaintenanceIcon from '@repo/components/src/Icons/Maintenance';
import MapIcon from '@repo/components/src/Icons/Map';
import MobileIcon from '@repo/components/src/Icons/Mobile';
import MonitorIcon from '@repo/components/src/Icons/Monitor';
import MonoRepoArchitectureIcon from '@repo/components/src/Icons/MonoRepoArchitecture';
import NestjsIcon from '@repo/components/src/Icons/Nestjs';
import NextjsIcon from '@repo/components/src/Icons/Nextjs';
import NodejsIcon from '@repo/components/src/Icons/Nodejs';
import OpenBookIcon from '@repo/components/src/Icons/OpenBook';
import OwnershipIcon from '@repo/components/src/Icons/Owernship';
import PaintSwatchIcon from '@repo/components/src/Icons/PaintSwatch';
import PayPalIcon from '@repo/components/src/Icons/PayPal';
import PerformanceOptimizationIcon from '@repo/components/src/Icons/PerformanceOptimization';
import PieChartIcon from '@repo/components/src/Icons/PieChart';
import PlanetRingIcon from '@repo/components/src/Icons/PlanetRing';
import PointerCursorIcon from '@repo/components/src/Icons/PointerCursor';
import PostgresqlIcon from '@repo/components/src/Icons/Postgresql';
import PrettierIcon from '@repo/components/src/Icons/Prettier';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import QAIcon from '@repo/components/src/Icons/QA';
import RapidDeliveryIcon from '@repo/components/src/Icons/RapidDelivery';
import ReactjsIcon from '@repo/components/src/Icons/Reactjs';
import ReduxIcon from '@repo/components/src/Icons/Redux';
import RefreshIcon from '@repo/components/src/Icons/Refresh';
import ResponsiveIcon from '@repo/components/src/Icons/Responsive';
import RestApiIcon from '@repo/components/src/Icons/RestApi';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import RocketIcon from '@repo/components/src/Icons/Rocket';
import SaaSIcon from '@repo/components/src/Icons/SaaS';
import ScaleIcon from '@repo/components/src/Icons/Scale';
import SecureIntegrationsIcon from '@repo/components/src/Icons/SecureIntegrations';
import SecurityIcon from '@repo/components/src/Icons/Security';
import SeismometerIcon from '@repo/components/src/Icons/Seismometer';
import SelectionIcon from '@repo/components/src/Icons/Selection';
import SeleniumIcon from '@repo/components/src/Icons/Selenium';
import SequelizeIcon from '@repo/components/src/Icons/Sequelize';
import ShieldIcon from '@repo/components/src/Icons/Shield';
import ShoppingBagIcon from '@repo/components/src/Icons/ShoppingBag';
import ShoppingCartIcon from '@repo/components/src/Icons/ShoppingCart';
import ShuffleIcon from '@repo/components/src/Icons/Shuffle';
import SlackIcon from '@repo/components/src/Icons/Slack';
import SmileIcon from '@repo/components/src/Icons/Smile';
import SparklerIcon from '@repo/components/src/Icons/Sparkler';
import SquiggleIcon from '@repo/components/src/Icons/Squiggle';
import StarIcon from '@repo/components/src/Icons/StarIcon';
import StripeIcon from '@repo/components/src/Icons/Stripe';
import SupabaseIcon from '@repo/components/src/Icons/Supabase';
import SupportIcon from '@repo/components/src/Icons/Support';
import TailwindIcon from '@repo/components/src/Icons/Tailwind';
import TargetIcon from '@repo/components/src/Icons/Target';
import TerraformIcon from '@repo/components/src/Icons/Terraform';
import TestingIcon from '@repo/components/src/Icons/Testing';
import TubroRepoIcon from '@repo/components/src/Icons/TubroRepo';
import TypeScriptIcon from '@repo/components/src/Icons/TypeScript';
import UnitTestingIcon from '@repo/components/src/Icons/UnitTesting';
import UserIcon from '@repo/components/src/Icons/User';
import UserIdIcon from '@repo/components/src/Icons/UserId';
import VirtualMachinesIcon from '@repo/components/src/Icons/VirtualMachines';
import VoltageIcon from '@repo/components/src/Icons/Voltage';
import WandIcon from '@repo/components/src/Icons/Wand';
import WebServersIcon from '@repo/components/src/Icons/WebServers';
import WordpressIcon from '@repo/components/src/Icons/Wordpress';

import styles from './index.module.css';

const Icons: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={'/icons'} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={'/icons'}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:image:secure_url" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title}></meta>
        <meta name="twitter:description" content={PageData.meta.description}></meta>
        <meta name="twitter:image" content={prefixed('/logo-social.png')}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header submenuData={SubmenuData} />
        <FooterRevealPageWrap variant="page">
          <div className={styles['icons-grid-wrapper']}>
            <style jsx global>{`
              :root {
                --theme-primary: var(--blue-primary);
                --theme-primary-text: var(--blue-primary-text);
                --theme-secondary: var(--blue-secondary);
                --theme-text: var(--blue-text);
                --theme-background: var(--blue-tertiary);
                --theme-logo: var(--blue-secondary);
                --theme-header-face: var(--blue-primary);
              }
            `}</style>
            <div className={styles['icons-grid']}>
              <AccessibilityIcon size={45} />
              <AdobeIcon size={45} />
              <AgileDeliveryIcon size={45} />
              <AnalysisIcon size={45} />
              <AnalyticsIcon size={45} />
              <AnsibleIcon size={45} />
              <ArchitectureIcon size={45} />
              <AsteriskIcon size={45} />
              <AuthenticationIcon size={45} />
              <AuthorizationIcon size={45} />
              <AwsIcon size={45} />
              <BackendIcon size={45} />
              <BasketIcon size={45} />
              <BrainIcon size={45} />
              <CanvaIcon size={45} />
              <CardIcon size={45} />
              {/* <CaretDownIcon size={45} />
                <CaretUpIcon size={45} /> */}
              <ClickUpIcon size={45} />
              <CoinsIcon size={45} />
              <CollabSpaceIcon size={45} />
              <CreditCardIcon size={45} />
              <CrossIcon size={45} />
              <DartIcon size={45} />
              <DataIcon size={45} />
              <DatabaseIcon size={45} />
              <DataBaseOptimizationIcon size={45} />
              <DentistIcon size={45} />
              <DevicesIcon size={45} />
              <DockerIcon size={45} />
              <EditIcon size={45} />
              <EndTestingIcon size={45} />
              <EyeIcon size={45} />
              <FaceIdIcon size={45} />
              <FigmaIcon size={45} />
              <FlutterIcon size={45} />
              <FourDotIcon size={45} />
              <FullStackIcon size={45} />
              <GitBranchIcon size={45} />
              <GithubIcon size={45} />
              <GitlabIcon size={45} />
              <GitPullIcon size={45} />
              <GlobeIcon size={45} />
              <GoogleAnalyticsIcon size={45} />
              <GPSIcon size={45} />
              <GraduateHatIcon size={45} />
              <GraphAnalysisIcon size={45} />
              <GraphQLIcon size={45} />
              <GroupUsersIcon size={45} />
              <GsapIcon size={45} />
              <HandPalmIcon size={45} />
              <HandshakeIcon size={45} />
              <HeartIcon size={45} />
              <HighAvailabiltyIcon size={45} />
              <HomeIcon size={45} />
              <HotjarIcon size={45} />
              <HtmlIcon size={45} />
              <HubspotIcon size={45} />
              <InfinityIcon size={45} />
              <JenkinsIcon size={45} />
              <KubernetesIcon size={45} />
              <LaptopIcon size={45} />
              <LaravelIcon size={45} />
              <LightningIcon size={45} />
              <LoadTestingIcon size={45} />
              <MagicWandIcon size={45} />
              <MailchimpIcon size={45} />
              <MaintenanceIcon size={45} />
              <MapIcon size={45} />
              <MobileIcon size={45} />
              <MonitorIcon size={45} />
              <MonoRepoArchitectureIcon size={45} />
              <NestjsIcon size={45} />
              <NextjsIcon size={45} />
              <NodejsIcon size={45} />
              <OpenBookIcon size={45} />
              <OwnershipIcon size={45} />
              <PaintSwatchIcon size={45} />
              <PayPalIcon size={45} />
              <PerformanceOptimizationIcon size={45} />
              <PieChartIcon size={45} />
              <PlanetRingIcon size={45} />
              <PointerCursorIcon size={45} />
              <PostgresqlIcon size={45} />
              <PrettierIcon size={45} />
              <PuzzlePieceIcon size={45} />
              <QAIcon size={45} />
              <RapidDeliveryIcon size={45} />
              <ReactjsIcon size={45} />
              <ReduxIcon size={45} />
              <RefreshIcon size={45} />
              <ResponsiveIcon size={45} />
              <RestApiIcon size={45} />
              <RightArrowIcon size={45} />
              <RocketIcon size={45} />
              <SaaSIcon size={45} />
              <ScaleIcon size={45} />
              <SecureIntegrationsIcon size={45} />
              <SecurityIcon size={45} />
              <SeismometerIcon size={45} />
              <SelectionIcon size={45} />
              <SeleniumIcon size={45} />
              <SequelizeIcon size={45} />
              <ShieldIcon size={45} />
              <ShoppingBagIcon size={45} />
              <ShoppingCartIcon size={45} />
              <ShuffleIcon size={45} />
              <SlackIcon size={45} />
              <SmileIcon size={45} />
              <SparklerIcon size={45} />
              <SquiggleIcon size={45} />
              <StarIcon size={45} />
              <StripeIcon size={45} />
              <SupabaseIcon size={45} />
              <SupportIcon size={45} />
              <TailwindIcon size={45} />
              <TargetIcon size={45} />
              <TerraformIcon size={45} />
              <TestingIcon size={45} />
              <TubroRepoIcon size={45} />
              <TypeScriptIcon size={45} />
              <UnitTestingIcon size={45} />
              <UserIcon size={45} />
              <UserIdIcon size={45} />
              <VirtualMachinesIcon size={45} />
              <VoltageIcon size={45} />
              <WandIcon size={45} />
              <WebServersIcon size={45} />
              <WordpressIcon size={45} />
            </div>
          </div>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerData={PageData.footerData} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
    </>
  );
};

export default Icons;
