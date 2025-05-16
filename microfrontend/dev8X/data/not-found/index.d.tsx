import { ExpertiseContent } from '@repo/components';

const PageData: Omit<ExpertiseContent, 'slug' | 'variant' | 'tagText' | 'heading' | 'iconCards' | 'contentAsideImageItems' | 'testimonials'> = {
  meta: {
    title: '',
    description: ''
  },
  footerMainContent: {
    link: '/contact',
    start: 'Let’s make',
    end: 'something wonderful'
  },
  footerForm: {
    privacy: {
      year: '2025',
      text: 'Privacy'
    },
    button: {
      text: 'Submit a brief'
    }
  },
  footerSocialLinks: [
    {
      title: 'Twitter',
      icon: { name: 'AsteriskIcon', width: 13 },
      href: 'https://x.com/dev8x'
    },
    {
      title: 'Instagram',
      icon: { name: 'AsteriskIcon', width: 13 },
      href: 'https://instagram.com/dev8x'
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/company/dev8x/posts/'
    }
  ]
};

export default PageData;
