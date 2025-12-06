import { HeaderSubmenuContent } from '@repo/components';

const SubmenuData = [
  {
    heading: 'Technical Services',
    list: [
      { title: 'MVP Development', iconName: 'RocketIcon', color: 'cyan', href: '/services-for-early-stage-startups' },
      { title: 'Team Augmentation', iconName: 'GroupUsersIcon', color: 'pink', href: '/services-for-growth-stage-startups' },
      { title: 'CTO as a Service', iconName: 'BrainIcon', color: 'blue', href: '/cto-as-a-service' }
    ]
  },
  {
    heading: 'Product Development',
    list: [
      { title: 'Web Applications', iconName: 'ResponsiveIcon', color: 'purple', href: '/web-applications' },
      { title: 'SaaS Applications', iconName: 'SaaSIcon', color: 'cyan', href: '/saas-applications' },
      { title: 'Mobile Applications', iconName: 'MobileIcon', color: 'pink', href: '/mobile-applications' }
    ]
  },
  {
    heading: 'Solutions',
    list: [
      { title: 'Saas', iconName: 'SaaSIcon', color: 'blue', href: '/pricing/tech-founders' },
      { title: 'Dentists', iconName: 'DentistIcon', color: 'pink', href: '/pricing/dentists' },
      { title: 'Real Estate', iconName: 'ArchitectureIcon', color: 'purple', href: '/pricing/real-estate' }
    ]
  },
  {
    heading: 'Other',
    list: [
      { title: 'Pricing', iconName: 'CoinsIcon', color: 'blue', href: '/pricing/tech-founders' },
      { title: 'Our Process', iconName: 'PuzzlePieceIcon', color: 'yellow', href: '/our-process' }
      // { title: 'Careers', iconName: 'RightArrowIcon', color: 'blue', href: '/careers', rotateIcon: true }
    ]
  }
] as HeaderSubmenuContent;

export default SubmenuData;
