import { MapIcon } from '@heroicons/react/24/outline';
import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import EyeIcon from '@repo/components/src/Icons/Eye';
import MonitorIcon from '@repo/components/src/Icons/Monitor';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import SeismometerIcon from '@repo/components/src/Icons/Seismometer';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'UX Specialists',
      description: 'Our award-winning UX design approach informs every concept, prototype, key decision and creative solution to help drive your brand forward.',
      icon: <EyeIcon width="26" />
    },
    {
      title: 'Catering for all',
      description: 'As with any digital product, performance, accessibility and usability are paramount. We go to great lengths to offer experiences that meet the needs of each audience.',
      icon: <SeismometerIcon width="24" />
    },
    {
      title: 'Evidence based',
      description: 'Baked into our process is a suite of research and validation to ensure every UX design decision and recommendation is informed by data.',
      icon: <PuzzlePieceIcon width="28" />
    },
    {
      title: 'Leaders in Digital',
      description: 'We push the boundaries of design and technology to achieve new levels in practical, delightful and meaningful online experiences.',
      icon: <MonitorIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Connect with your audience',
      paragraph: 'We draw from over 6 years in building and shipping wonderful things for people, accelerating conversion, generating revenue, amplifying awareness, and boosting ROI for clients big and small across a range of industries. Our first-hand knowledge of what works helps users achieve their objectives, while building emotional connections between brands and people.',
      icon: <MapIcon width="64" />
    },
    {
      title: 'Digital that resonates',
      paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive information architecture to immersive storytelling, every website and web app is meticulously crafted to command attention and leave a lasting impression.',
      icon: <MapIcon width="64" />
    },
    {
      title: 'Elevate your brand experience',
      paragraph: 'Each customer engagement is part of the bigger picture of an overall brand experience. Our approach to ethical UX and conversion design draws from this philosophy, ensuring better customer experiences that last long after the user achieves their goal.',
      icon: <MapIcon width="64" />
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
