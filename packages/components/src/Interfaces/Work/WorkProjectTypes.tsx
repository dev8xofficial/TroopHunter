export type Video = {
  originalFile: string;
  sequences: string[];
};

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
  video: Video;
  bgColor: 'cyan' | 'pink' | 'blue' | 'green' | 'purple' | 'yellow' | 'troophunter-light' | 'totalhealthdentalcare-light' | 'scheduler-light' | 'honeydu-light' | 'coral-light' | 'goldendao-light';
  path: string;
  testimonial: string;
  testimonialAuthor: string;
  testimonialAuthorPosition: string;
};

export type CommonWorkCardProps = Omit<WorkDetail, 'slug' | 'websiteUrl' | 'industry' | 'shortIntro' | 'overview' | 'approach' | 'impact' | 'keyContributions'> & {
  space: 'inner' | 'outer';
};

type LandscapeWorkCardProps = CommonWorkCardProps & {
  variant: 'landscape';
};

type PortraitWorkCardProps = CommonWorkCardProps & {
  variant: 'portrait';
};

export type WorkGridCard = LandscapeWorkCardProps | PortraitWorkCardProps[];
