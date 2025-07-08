export type Video = {
  originalFile: string;
  sequences: string[];
};

export type CareerDetail = {
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

export type CommonCareerCardProps = Omit<CareerDetail, 'slug' | 'websiteUrl' | 'industry' | 'shortIntro' | 'overview' | 'approach' | 'impact' | 'keyContributions' | 'testimonial' | 'testimonialAuthor' | 'testimonialAuthorPosition'> & {
  space: 'inner' | 'outer';
};

export type LandscapeCareerCardProps = CommonCareerCardProps & {
  variant: 'landscape';
};

export type PortraitCareerCardProps = CommonCareerCardProps & {
  variant: 'portrait';
};

// Single card (either one)
export type CareerCard = LandscapeCareerCardProps | PortraitCareerCardProps;

// Array of all career cards (grid)
export type CareerGridCard = CareerCard[];
