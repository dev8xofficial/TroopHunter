import { ReactNode } from 'react';
import { PageLayoutContent } from '../PageLayout/PageLayout';

export interface ExpertiseIconCardItem {
  title: string;
  description: string;
  icon: { name: string; width: number };
}

export interface ExpertiseIconCards {
  title: string;
  paragraph: string;
  items: ExpertiseIconCardItem[];
}

export interface ExpertiseContentAsideImageItem {
  title: string;
  paragraph: string;
  icon?: { name: string; width: number };
  image?: string;
}

export interface ExpertiseTestimonial {
  name: string;
  company: string;
  bgColor: string;
  color: string;
  transformOrigin: string;
  image: string;
  comment: string;
}

export interface ExpertiseFAQS {
  title: string;
  description: string;
}
export interface ExpertiseOffersSliderItem {
  id: string;
  heading?: string;
  price: string;
  description: string;
  features: string[];
  categories: string[];
  buttonText?: string;
  package?: string;
}

export interface ExpertiseContent extends PageLayoutContent {
  slug: string;
  variant: 'cyan' | 'pink' | 'blue' | 'green' | 'purple' | 'yellow';
  tagText: string;
  heading: string;
  paragraph?: string;
  image: string;
  iconCards: ExpertiseIconCards;
  contentAsideImageItems: ExpertiseContentAsideImageItem[];
  testimonials: ExpertiseTestimonial[];
  faqs?: ExpertiseFAQS[];
  offersSlider?: ExpertiseOffersSliderItem[];
  video?: string;
  planItems?: string[];
}
