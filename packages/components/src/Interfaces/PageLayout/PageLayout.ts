import { ReactNode } from 'react';

export interface ExpertiseMetaContent {
  title: string;
  description: string;
}

export interface ExpertiseFooterMainContent {
  link: string;
  start: string;
  end: string;
}

export interface ExpertiseFooterForm {
  privacy: {
    year: string;
    text: string;
  };
  button: {
    text: string;
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
  footerForm: ExpertiseFooterForm;
  footerSocialLinks: ExpertiseFooterSocialLink[];
}
