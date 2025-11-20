import { ReactNode } from 'react';
import { PrivacyContent } from '../Privacy/Privacy';

export interface ExpertiseMetaContent {
  title: string;
  description: string;
}

export interface ExpertiseFooterMainContent {
  link: string;
  start: string;
  end: string;
}

export interface FooterInternationalContent {
  global: {
    heading: string;
    email: string;
    buttonText: string;
  };
  offices?: {
    country: string;
    city: string;
    phone: string;
  }[];
  careers?: {
    heading: string;
    description: string;
    link: string;
    linkText: string;
  };
  copyright: {
    year: string;
    text: string;
    privacyLink: string;
  };
}

export interface ExpertiseFooterSocialLink {
  title: ReactNode | string;
  icon?: { name: string; width: number };
  href: string;
}

export interface PageLayoutContent {
  meta: ExpertiseMetaContent;
  footerMainContent: ExpertiseFooterMainContent;
  footerData: FooterInternationalContent;
  footerSocialLinks: ExpertiseFooterSocialLink[];
  privacy: PrivacyContent[];
}
