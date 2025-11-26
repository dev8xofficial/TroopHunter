import { HeaderSubmenuContent } from '@repo/components';

const SubmenuData = [
  {
    heading: 'Technical Services',
    list: [
      { title: 'MVP Development', iconName: 'RocketIcon', color: 'cyan', href: '/services-for-early-stage-startups' },
      { title: 'Team Augmentation', iconName: 'HandshakeIcon', color: 'pink', href: '/services-for-growth-stage-startups' },
      { title: 'CTO as a Service', iconName: 'TargetIcon', color: 'purple', href: '/cto-as-a-service' }
    ]
  },
  {
    heading: 'Product Development',
    list: [
      { title: 'Web Applications', iconName: 'CardIcon', color: 'blue', href: '/web-applications' },
      { title: 'SaaS Applications', iconName: 'SaaSIcon', color: 'green', href: '/saas-applications' },
      { title: 'Mobile Applications', iconName: 'MobileIcon', color: 'purple', href: '/mobile-applications' }
    ]
  },
  {
    heading: 'Solutions',
    list: [
      { title: 'Saas', iconName: 'SaaSIcon', color: 'purple', href: '/pricing/tech-founders' },
      { title: 'Dentists', iconName: 'DentistIcon', color: 'cyan', href: '/pricing/dentists' },
      { title: 'Real Estate', iconName: 'HomeIcon', color: 'yellow', href: '/pricing/real-estate' }
    ]
  },
  {
    heading: 'Other',
    list: [
      { title: 'Our Process', iconName: 'DataIcon', color: 'cyan', href: '/our-process' },
      { title: 'Pricing', iconName: 'PlanetRingIcon', color: 'pink', href: '/pricing/tech-founders' },
      { title: 'Careers', iconName: 'RightArrowIcon', color: 'blue', href: '/careers', rotateIcon: true }
    ]
  }
] as HeaderSubmenuContent;

export default SubmenuData;
