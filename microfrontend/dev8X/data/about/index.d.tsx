import { ExpertiseContent } from '@repo/components';

const PageData: Omit<ExpertiseContent, 'slug' | 'variant' | 'tagText' | 'heading' | 'iconCards' | 'contentAsideImageItems' | 'testimonials'> = {
  meta: {
    title: 'About Us — Dev8X | Dev8X: Digital Craft Real Impact',
    description: 'Discover how Dev8X crafts, launches, and scales impactful digital solutions for ambitious businesses. 100% independent and purpose-driven, we design with empathy to transform ideas into meaningful experiences.'
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
