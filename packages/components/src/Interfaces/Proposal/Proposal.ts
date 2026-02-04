import { ExpertiseContent } from '../Expertise/Expertise';
import { PageLayoutContent } from '../PageLayout/PageLayout';

export interface ProposalTag {
  text: string;
  backgroundColor: string;
  color: string;
}

export interface ProposalLink {
  href: string;
  label: string;
}

export interface Proposal {
  companyId: string;
  videoSrc?: string;
  tag: ProposalTag;
  date: string;
  title: string;
  description: string;
  link: ProposalLink;
}

export interface ProposalContent extends ExpertiseContent {
  proposal: Proposal;
}

export interface CompanyContent {
  id: string;
  name: string;
}

export interface Proposals extends PageLayoutContent {
  variant: 'cyan' | 'pink' | 'blue' | 'green' | 'purple' | 'yellow';
}
