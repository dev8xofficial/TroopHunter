import { PageLayoutContent } from '../PageLayout/PageLayout';
export interface CapabilityItem {
  name: string;
  image?: string;
  iconName?: string;
}

export interface Capability {
  heading?: string;
  items: (string | CapabilityItem)[];
}

export type CapabilitiesContent = Capability[];

export interface WhatWeDoItem {
  heading: string;
  items: string[];
}

export type WhatWeDoContent = WhatWeDoItem[];

export type Testimonials = string[];

export interface TestimonialAuthor {
  name: string;
  position: string;
}

export type TestimonialAuthors = TestimonialAuthor[];

export interface AboutContent extends PageLayoutContent {
  aboutSections: string[];
  capabilities: CapabilitiesContent;
  whatWeDo: WhatWeDoContent;
  testimonials: Testimonials;
  authors: TestimonialAuthors;
}
