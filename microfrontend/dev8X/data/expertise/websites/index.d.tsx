import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import BackendIcon from '@repo/components/src/Icons/Backend';
import MonitorIcon from '@repo/components/src/Icons/Monitor';
import PieChartIcon from '@repo/components/src/Icons/PieChart';
import PointerIcon from '@repo/components/src/Icons/Pointer';
import VoltageIcon from '@repo/components/src/Icons/Voltage';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'Idea to Execution',
      description: 'An entire product delivered in-house, from initial strategy to the end result. This means everything we do is fit for purpose, produced to the highest quality.',
      icon: <VoltageIcon width="18" />
    },
    {
      title: 'Full Stack',
      description: 'An entire product delivered in-house, from initial strategy to the end result. This means we everything we do is fit for purpose, produced to the highest quality.',
      icon: <BackendIcon width="28" />
    },
    {
      title: 'Technology Neutral',
      description: 'The best technology is the one that works. We continually listen and observe, so we can recommend the optimal solution for your business problem.',
      icon: <MonitorIcon width="22" />
    },
    {
      title: 'Integrated',
      description: 'We put your website at the heart of your digital ecosystem, providing secure API integrations and automated solutions across your business systems',
      icon: <PieChartIcon width="26" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Elevate your brand',
      paragraph: 'We blend innovative design, cutting-edge technology, and strategic content to deliver websites that are visually appealing and highly functional. Harness the power of deeply engaging digital experiences to take your brand to the next level.',
     icon: <PointerIcon width="64" />
    },
    {
      title: 'Human experiences',
      paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive navigation to immersive storytelling, every website is meticulously crafted to command attention and leave a lasting impression.',
      icon: <PointerIcon width="64" />
    },
    {
      title: 'Robust, Secure, Flexible',
      paragraph: 'Every website we build is backed by secure and performant infrastructure, tailored to the needs of the organisation. This ensures that your digital presence can scale with demand and offer flexibility to meet the needs of your business over time.',
      icon: <PointerIcon width="64" />
    },
    {
      title: 'Rewarding partnerships',
      paragraph: 'Behind every best-in-class website is a collaborative agency–client partnership. We work in close collaboration with you to ensure outcomes that offer extraordinary experiences while delivering results. Awards are nice, but your success means so much more.',
      icon: <PointerIcon width="64" />
    }
  ],
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
      title: (
        <>
          <s>Twitter</s> X
        </>
      ),
      icon: <AsteriskIcon width="13" />,
      href: 'https://x.com/dev8x'
    },
    {
      title: 'Instagram',
      icon: <AsteriskIcon width="13" />,
      href: 'https://instagram.com/dev8x'
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/company/dev8x/posts/'
    }
  ],
  testimonials: [
    {
      name: 'Henry Luong',
      company: 'Unios',
      bgColor: '#ffffff',
      color: '#111111',
      transformOrigin: 'center top',
      image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
      comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Humaan.'
    },
    {
      name: 'Paula McCarville',
      company: 'Curtin University',
      bgColor: '#4C21E2',
      color: '#F0EBFF',
      transformOrigin: 'center top',
      image: 'https://a-us.storyblok.com/f/1017006/1744x1612/4c0927054c/curtin-open-day.jpg',
      comment: 'From the very beginning, it was evident that the team truly grasped our brief and vision, effectively translating it into a remarkable reality.'
    },
    {
      name: 'Steph Jojart',
      company: 'Schrole',
      bgColor: '#1665A3',
      color: '#E8F5FF',
      transformOrigin: 'top center',
      image: 'https://a-us.storyblok.com/f/1017006/3488x3224/f6a5e2a115/schrole-1744px-x-1612px.jpg',
      comment: 'From conception through to launch, the Humaan team has been nothing short of amazing. I wouldn’t hesitate to recommend Humaan to any business.'
    }
  ]
};

export default PageData;
