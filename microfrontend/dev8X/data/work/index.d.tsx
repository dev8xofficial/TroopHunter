import { ExpertiseContent } from '@repo/components';

const PageData: Omit<ExpertiseContent, 'slug' | 'variant' | 'tagText' | 'heading' | 'image' | 'iconCards' | 'contentAsideImageItems' | 'testimonials'> = {
  meta: {
    title: 'Our Work — Dev8X | Dev8X: World class digital products',
    description: 'World-class digital products, idea to execution.'
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
      title: 'LinkedIn',
      icon: { name: 'AsteriskIcon', width: 13 },
      href: 'https://www.linkedin.com/company/dev8x/'
    },
    {
      title: 'Instagram',
      icon: { name: 'AsteriskIcon', width: 13 },
      href: 'https://www.instagram.com/dev8xofficial/'
    },
    {
      title: 'Facebook',
      icon: { name: 'AsteriskIcon', width: 13 },
      href: 'https://www.facebook.com/profile.php?id=61569289660818'
    },
    {
      title: 'Youtube',
      href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
    }
  ]
};

export default PageData;
