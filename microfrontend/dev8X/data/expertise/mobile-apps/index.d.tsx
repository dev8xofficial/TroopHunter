import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import FaceIdIcon from '@repo/components/src/Icons/FaceId';
import InfinityIcon from '@repo/components/src/Icons/Infinity';
import LaptopIcon from '@repo/components/src/Icons/Laptop';
import ShuffleIcon from '@repo/components/src/Icons/Shuffle';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'The Right Technolog',
      description: 'We spruik a core collection of robust technologies, chosen for maximum flexibility, useful for every occasion. Our preferred stack includes Swift, Java and React Native.',
      icon: <LaptopIcon width="26" />
    },
    {
      title: 'Handy Experience',
      description: 'We design engaging and immersive mobile experiences, delighting users while solving business problems and keeping your brand at the forefront.',
      icon: <ShuffleIcon width="24" />
    },
    {
      title: 'Not Just a Pretty Fac',
      description: 'As with any digital product, performance, accessibility and usability are paramount. We go to great lengths to ensure every app looks and functions well for all.',
      icon: <FaceIdIcon width="28" />
    },
    {
      title: 'Integrated',
      description: 'A mobile app is just one part of your digital ecosystem. We incorporate secure API integrations to ensure seamless operation across your business.',
      icon: <InfinityIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'From MVP to fully featured',
      paragraph: "Whether you're a startup looking to disrupt the market or an established enterprise seeking to expand your digital footprint, we can build a scalable, robust, and secure mobile app that serves and delights your users.",
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/29a2856a60/communityapp.jpeg'
    },
    {
      title: 'Tailored customer experiences',
      paragraph: 'Our apps are tailored to the needs of the audience, offering compelling journeys to match their behaviour and usage. With a focus on exceptional user experiences, we transform ideas into powerful tools for customer engagement and brand loyalty.',
      image: 'https://a-us.storyblok.com/f/1017006/3728x2628/a06188a927/talk-n-walk-1864-x-1314.jpg'
    },
    {
      title: 'iOS and Android',
      paragraph: 'Blending innovative design, robust functionality, and seamless UX thinking, we create create world-class iOS and Android apps, utilising both native technologies and mobile frameworks to suit the unique requirements of every product.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/633f43cde7/mideasttunes2.jpeg'
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
