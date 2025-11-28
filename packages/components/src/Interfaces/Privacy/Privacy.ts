import { PageLayoutContent } from '../PageLayout/PageLayout';

export type PrivacyParagraphPart =
  | { type: 'text'; content: string }
  | { type: 'link'; href: string; label: string };

export interface PrivacyParagraphBlock {
  type: 'paragraph';
  parts: PrivacyParagraphPart[];
}

export interface PrivacyListItem {
  parts: PrivacyParagraphPart[];
  subItems?: PrivacyParagraphPart[][];
}

export interface PrivacyOrderedListBlock {
  type: 'orderedList';
  items: PrivacyListItem[];
}

export type PrivacyContentBlock = PrivacyParagraphBlock | PrivacyOrderedListBlock;

export interface PrivacySection {
  title: string;
  blocks: PrivacyContentBlock[];
}

export interface PrivacyContent {
  heading: string;
  sections: PrivacySection[];
}

export interface PrivacyPageContent extends PageLayoutContent {
  privacy: PrivacyContent;
}
