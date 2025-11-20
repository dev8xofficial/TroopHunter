export interface HeaderSubmenuItem {
  title: string;
  iconName: string;
  color: 'cyan' | 'pink' | 'blue' | 'green' | 'purple' | 'yellow' | 'default';
  href: string;
  rotateIcon?: boolean;
}

export interface HeaderSubmenuGroup {
  heading: string;
  list: HeaderSubmenuItem[];
}

export type HeaderSubmenuContent = HeaderSubmenuGroup[];

