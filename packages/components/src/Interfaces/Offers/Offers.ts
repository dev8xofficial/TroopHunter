import { ExpertiseContent } from '../Expertise/Expertise';

export interface OffersContent extends ExpertiseContent {
  primaryPlansItems?: string[];
  secondaryPlansItems?: string[];
}
