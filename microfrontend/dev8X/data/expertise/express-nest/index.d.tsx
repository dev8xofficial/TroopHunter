import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import BackendIcon from '@repo/components/src/Icons/Backend';
import NextjsIcon from '@repo/components/src/Icons/Nextjs';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import ShieldIcon from '@repo/components/src/Icons/Shield';
import VoltageIcon from '@repo/components/src/Icons/Voltage';
import WebServersIcon from '@repo/components/src/Icons/WebServers';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'Battle-tested backends',
      description: 'We build robust, scalable backend services using Express.js and Nest.js—trusted by startups and enterprises alike for high-performance APIs and real-time apps.',
      icon: <BackendIcon width="26" />
    },
    {
      title: 'Speed without compromise',
      description: 'Leverage the simplicity of Express.js or the structured power of Nest.js to move fast while maintaining clean, maintainable, and extensible codebases.',
      icon: <VoltageIcon width="24" />
    },
    {
      title: 'Modular & future-ready',
      description: 'Our backend architecture is built with modularity in mind, enabling seamless scaling, clear separation of concerns, and long-term maintainability.',
      icon: <PuzzlePieceIcon width="28" />
    },
    {
      title: 'Secure foundations',
      description: 'From authentication to request validation, we follow best practices to ensure your backend is safe, stable, and ready to handle production-grade workloads.',
      icon: <ShieldIcon width="28" />
    },
    {
      title: 'Built for integration',
      description: 'Whether it’s REST, GraphQL, or WebSocket-based communication, we create backend systems that play well with the rest of your stack—now and in the future.',
      icon: <WebServersIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Fast, Scalable APIs',
      paragraph: "Harness the power of Express.js and Nest.js to build lightning-fast, scalable APIs that serve your application needs. Whether you're crafting a lightweight API with Express or a full-fledged enterprise solution with Nest.js, we deliver performance-driven backend solutions that adapt as your business grows.",
       icon: <NextjsIcon width="64" />
    },
    {
      title: 'Modular, Maintainable Architecture',
      paragraph: 'With Nest.js, we help you structure your backend using modular, scalable architecture that makes it easier to maintain and extend. For lightweight, minimal overhead solutions, we tailor Express.js for high performance, ensuring your application remains agile and responsive.',
      icon: <NextjsIcon width="64" />
    },
    {
      title: 'Efficient Development Cycles',
      paragraph: 'Accelerate your development cycles by leveraging the simplicity and efficiency of Express.js alongside the powerful features of Nest.js. We implement RESTful APIs, GraphQL, WebSockets, and more, ensuring your application can handle anything your users throw at it—quickly and reliably.',
       icon: <NextjsIcon width="64" />
    },
    {
      title: 'Your Backend Design Partner',
      paragraph: 'Behind every scalable backend is a collaborative agency-client partnership. Whether you choose Express.js or Nest.js, we guide you every step of the way, delivering robust, future-proof solutions. Our team of strategists, designers, and backend experts will collaborate closely with your team to achieve seamless integration and provide custom backend solutions that fit your project perfectly.',
     icon: <NextjsIcon width="64" />
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
