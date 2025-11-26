import { ExpertiseContent } from '../Expertise/Expertise';
import { CapabilitiesContent } from '../About/About';
import { WhyDev8XContent } from '../Home/Home';

export interface OffersFAQS {
  title: string;
  description: string;
}
export interface OffersSliderItem {
  id: string;
  heading?: string;
  price: string;
  description: string;
  features: string[];
  categories: string[];
  buttonText?: string;
  package?: string;
}

export interface WhyWeAreDifferentQA {
  title: string;
  paragraph: string;
}

export interface WhyWeAreDifferentContent {
  heading: string;
  qa: WhyWeAreDifferentQA[];
}

export interface OffersContent extends ExpertiseContent {
  faqs?: OffersFAQS[];
  offersSlider?: OffersSliderItem[];
  primaryPlansItems?: string[];
  secondaryPlansItems?: string[];
  capabilities?: CapabilitiesContent;
  capabilitiesHeading?: string;
  whyWeAreDifferentContent?: WhyWeAreDifferentContent;
}
