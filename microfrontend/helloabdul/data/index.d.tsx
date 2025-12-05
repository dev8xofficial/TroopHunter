import { HomeContent } from '@repo/components';
import { prefixed } from '@repo/components/utils/helpers';
import React from 'react';
import SmileIcon from '@repo/components/src/Icons/Smile';

const PageData: HomeContent = {
  meta: {
    title: 'Frontend Made Fearless! — Abdul',
    description: 'I craft fast, accessible, and scalable web experiences that feel effortless for users and reliable for engineering teams. From React to real-world product thinking — I ship code that ships businesses forward.'
  },

  // Title as JSX with SmileIcon inline
  title: (
    <>
      Frontend <br /> Made Friendly. <SmileIcon size={80} />
    </>
  ),

  video: prefixed('/videos/header/header.mp4'),

  paragraph: 'I design, build, and fine-tune web experiences that load fast, look clean, and behave like they actually went through QA.',

  whyDev8XContent: {
    heading: 'Why Me',
    para1: 'I believe great UI starts with empathy — and a tiny pinch of obsession. Every interface I build has one job: make someone’s day a little easier (and sometimes a little cooler).',
    para2: 'With 6+ years in the US tech ecosystem, I mix product thinking, frontend engineering, and a “let’s keep it simple” mindset. I move fast without breaking core-web-vitals and collaborate like someone who’s been in real production fires.',
    image: 'https://a-us.storyblok.com/f/1017006/1200x1400/dc71890964/humaanpeople.jpg/m/450x548/filters:quality(80)',
    stats: [
      { title: '100%', span: ['Frontend-focused ', '& ', 'product-driven'] },
      { title: '6+', span: ['Years ', 'building ', 'production-grade ', 'UI'] },
      { title: '20+', span: ['Products ', 'shipped ', 'across ', 'US teams'] }
    ]
  },

  footerMainContent: {
    link: '/contact',
    start: 'Let’s build',
    end: 'something that actually loads fast!'
  },

  footerData: {
    global: {
      heading: 'I work globally',
      email: 'contact@helloabdul.com',
      buttonText: 'Hire me'
    },
    offices: [
      { country: 'Pakistan (HQ)', city: 'Lahore, Punjab', phone: '+92 (329) 294-7777' },
      { country: 'USA (Remote)', city: 'San Francisco, CA', phone: '+1 (321) 300-2393' }
    ],
    copyright: {
      year: '2025',
      text: 'Privacy Policy',
      privacyLink: '/privacy'
    }
  },

  footerSocialLinks: [
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/helloabdul/'
    }
  ]
};

export default PageData;
