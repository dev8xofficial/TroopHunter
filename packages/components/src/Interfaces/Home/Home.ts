import { PageLayoutContent } from '../PageLayout/PageLayout';

export interface Stat {
  title: string;
  span: string[];
}

export interface WhyDev8XContent {
  heading: string;
  para1: string;
  para2: string;
  image: string;
  stats: Stat[];
}

export interface HomeContent extends PageLayoutContent {
  title: string;
  video: string;
  paragraph: string;
  whyDev8XContent: WhyDev8XContent;
}
