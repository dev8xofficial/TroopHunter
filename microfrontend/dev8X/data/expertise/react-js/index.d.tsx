import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import FrameIcon from '@repo/components/src/Icons/Frame';
import GPSIcon from '@repo/components/src/Icons/GPS';
import HandPalmIcon from '@repo/components/src/Icons/HandPalm';
import HandshakeIcon from '@repo/components/src/Icons/Handshake';
import ReactjsIcon from '@repo/components/src/Icons/Reactjs';
import TargetIcon from '@repo/components/src/Icons/Target';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'Modern Foundations',
      description: 'We build fast, scalable applications using React.js—an open-source JavaScript library designed for creating rich, interactive UIs that adapt to your product needs.',
      icon: <TargetIcon width="26" />
    },
    {
      title: 'Component-first Thinking',
      description: 'React’s modular architecture enables us to design reusable, isolated components that scale with your application and support long-term maintainability.',
      icon: <GPSIcon width="24" />
    },
    {
      title: 'Performance at Scale',
      description: 'Optimised rendering, dynamic routing, and seamless state management ensure high performance even in data-heavy or real-time environments.',
      icon: <FrameIcon width="28" />
    },
    {
      title: 'Built for Integration Design',
      description: 'We craft React.js frontends that work effortlessly with APIs, headless CMSs, and custom backends—adapting to your existing infrastructure with ease.',
      icon: <HandPalmIcon width="28" />
    },
    {
      title: 'Your Development Partner',
      description: 'From architecture to handover, we collaborate closely with your team to create future-ready React applications backed by our expert support and guidance.',
      icon: <HandshakeIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Dynamic user experiences',
      paragraph: 'Build fast, dynamic, and highly interactive user interfaces with React.js. Our approach combines the power of reusable components with seamless state management, ensuring smooth and engaging digital experiences that scale effortlessly.',
      icon: <ReactjsIcon width="26" />
    },
    {
      title: 'Component-based architecture',
      paragraph: 'With React’s component-based structure, we help you break down complex user interfaces into modular, reusable components. This simplifies both development and maintenance, allowing your teams to deliver faster and more efficiently.',
      icon: <ReactjsIcon width="26" />
    },
    {
      title: 'Scalable web applications',
      paragraph: 'Harness the full potential of React to build scalable, high-performance web applications. Whether it’s a single-page app (SPA) or a complex enterprise solution, our React development expertise ensures your app will scale as your user base grows, without sacrificing performance.',
      icon: <ReactjsIcon width="26" />
    },
    {
      title: 'Seamless state management',
      paragraph: 'Leverage modern tools like Redux, Context API, and React Query for robust state management across your application. Our approach ensures that your app remains responsive and consistent, no matter how dynamic the data or interactions may be.',
      icon: <ReactjsIcon width="26" />
    },
    {
      title: 'Your React Partner',
      paragraph: 'Behind every world-class React application is a collaborative agency-client partnership. We work alongside your team to create bespoke solutions, tailored to your business needs, using React as the backbone for modern, interactive user interfaces.',
      icon: <ReactjsIcon width="26" />
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
