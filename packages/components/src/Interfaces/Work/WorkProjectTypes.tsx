export type WorkDetail = {
  slug: string;
  title: string;
  websiteUrl: string;
  industry: string;
  shortIntro: string;
  overview: string;
  approach: string;
  impact: string;
  keyContributions: string[];
  placeholderImage: string;
  images: string[];
  video: string;
  bgColor: 'cyan' | 'green' | 'blue';
  path: string;
};

export type CommonWorkCardProps = Omit<WorkDetail, 'slug' | 'websiteUrl' | 'industry' | 'shortIntro' | 'overview' | 'approach' | 'impact' | 'keyContributions' | 'placeholderImage'> & {
  space: 'inner' | 'outer';
};

type LandscapeWorkCardProps = CommonWorkCardProps & {
  variant: 'landscape';
};

type PortraitWorkCardProps = CommonWorkCardProps & {
  variant: 'portrait';
};

export type WorkGridCard = LandscapeWorkCardProps | PortraitWorkCardProps[];
